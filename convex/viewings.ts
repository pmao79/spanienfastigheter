import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

// Queries

export const getAll = query({
    args: {
        status: v.optional(v.string()),
        assignedToId: v.optional(v.id("users")),
        dateFrom: v.optional(v.string()),
        dateTo: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        let q: any = ctx.db.query("viewings");

        // Basic filtering
        if (args.status) {
            q = q.withIndex("by_status", (q: any) => q.eq("status", args.status));
        } else if (args.assignedToId) {
            q = q.withIndex("by_assignedTo", (q: any) => q.eq("assignedToId", args.assignedToId!));
        } else {
            q = q.order("desc"); // Default to scheduledAt or createdAt depending on index, but "desc" usually creates generic
        }

        let viewings = await q.collect();

        // Manual filtering for things not indexed together or complex ranges
        if (args.dateFrom || args.dateTo) {
            viewings = viewings.filter((v: any) => {
                if (args.dateFrom && v.scheduledAt < args.dateFrom) return false;
                if (args.dateTo && v.scheduledAt > args.dateTo) return false;
                return true;
            });
        }

        // Relation fetching (Manual join)
        const enrichedViewings = await Promise.all(viewings.map(async (viewing: any) => {
            const lead = await ctx.db.get(viewing.leadId);
            const assignedTo = await ctx.db.get(viewing.assignedToId);

            // Fetch first property with details for list view
            let property = null;
            const propertyId = (viewing.propertyIds && viewing.propertyIds.length > 0
                ? viewing.propertyIds[0]
                : undefined) as Id<"properties"> | undefined;

            if (propertyId) {
                const fullProperty = await ctx.db.get(propertyId);
                if (fullProperty) {
                    property = {
                        _id: fullProperty._id,
                        referenceNumber: fullProperty.ref,
                        title: `${fullProperty.type} i ${fullProperty.town}`,
                        region: fullProperty.region,
                        price: fullProperty.price,
                        bedrooms: fullProperty.beds,
                        bathrooms: fullProperty.baths,
                        hasPool: fullProperty.pool,
                        images: fullProperty.images || [],
                        location: fullProperty.locationDetail || fullProperty.town,
                    };
                }
            }

            // Check if report exists
            const report = viewing.reportId ? await ctx.db.get(viewing.reportId) : null;

            return {
                ...viewing,
                lead,
                assignedTo,
                property,
                hasReport: !!report,
            };
        }));

        return enrichedViewings;
    },
});

export const getById = query({
    args: { id: v.id("viewings") },
    handler: async (ctx, args) => {
        const viewing = await ctx.db.get(args.id);
        if (!viewing) return null;

        const lead = await ctx.db.get(viewing.leadId);
        const assignedTo = await ctx.db.get(viewing.assignedToId);
        const createdBy = await ctx.db.get(viewing.createdById);
        const properties = await Promise.all(viewing.propertyIds.map(id => ctx.db.get(id)));

        return {
            ...viewing,
            lead,
            assignedTo,
            createdBy,
            properties
        };
    },
});

export const getByDateRange = query({
    args: {
        start: v.string(),
        end: v.string(),
        assignedToId: v.optional(v.id("users"))
    },
    handler: async (ctx, args) => {
        // Use by_scheduledAt index?
        // Convex range queries on string ISO dates work well
        let q = ctx.db.query("viewings")
            .withIndex("by_scheduledAt", (q) =>
                q.gte("scheduledAt", args.start).lte("scheduledAt", args.end)
            );

        let viewings = await q.collect();

        if (args.assignedToId) {
            viewings = viewings.filter(v => v.assignedToId === args.assignedToId);
        }

        // Enrich with minimal data for Calendar
        return await Promise.all(viewings.map(async (v) => {
            const lead = await ctx.db.get(v.leadId);
            const assignedTo = await ctx.db.get(v.assignedToId);
            // Fetch first property for calendar display
            const property = v.propertyIds && v.propertyIds.length > 0
                ? await ctx.db.get(v.propertyIds[0])
                : null;

            return {
                ...v,
                lead,
                assignedTo,
                property: property ? {
                    title: property.town,
                    fullTitle: property.town, // Schema doesn't have title, use town or construct "Type in Town"
                    ref: property.ref,
                    price: property.price,
                    beds: property.beds,
                    region: property.region || property.province, // Added region
                    location: property.locationDetail || property.town, // Added location
                    features: [
                        property.beds ? `${property.beds} sov` : null,
                        property.built ? `${property.built}m²` : null,
                        property.pool ? 'Pool' : null // Added pool
                    ].filter(Boolean).join(' • ')
                } : null
            };
        }));
    }
});

export const getByLead = query({
    args: { leadId: v.id("leads") },
    handler: async (ctx, args) => {
        return await ctx.db.query("viewings")
            .withIndex("by_leadId", (q) => q.eq("leadId", args.leadId))
            .collect();
    }
});


// Mutations

export const create = mutation({
    args: {
        leadId: v.id("leads"),
        propertyIds: v.array(v.id("properties")),
        assignedToId: v.id("users"),
        scheduledAt: v.string(), // ISO
        estimatedDuration: v.number(), // minutes
        meetingPoint: v.optional(v.string()),
        notes: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // TODO: Re-enable strict auth once Convex Auth is fully configured
        // const identity = await ctx.auth.getUserIdentity();
        // if (!identity) throw new Error("Unauthorized");

        // Temporary fallback: Get the first admin/user
        const user = await ctx.db.query("users").first();
        // const user = await ctx.db.query("users")
        //     .withIndex("by_email", (q) => q.eq("email", identity.email!))
        //     .first();

        if (!user) throw new Error("User not found (System has no users)");

        const viewingId = await ctx.db.insert("viewings", {
            ...args,
            createdById: user._id,
            status: "scheduled",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        // Log activity
        await ctx.db.insert("activityLog", {
            type: "viewing_created",
            description: `Viewing scheduled for lead`,
            userId: user._id,
            meta: { viewingId, leadId: args.leadId },
            createdAt: new Date().toISOString()
        });

        // Update lead status? Maybe to "viewing_scheduled"?
        await ctx.db.patch(args.leadId, {
            status: "viewing_scheduled",
            lastActivityAt: new Date().toISOString()
        });

        return viewingId;
    }
});

export const updateStatus = mutation({
    args: {
        id: v.id("viewings"),
        status: v.union(
            v.literal("scheduled"),
            v.literal("confirmed"),
            v.literal("in_progress"),
            v.literal("completed"),
            v.literal("cancelled"),
            v.literal("no_show")
        )
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            status: args.status,
            updatedAt: new Date().toISOString()
        });
    }
});

export const update = mutation({
    args: {
        id: v.id("viewings"),
        updates: v.object({
            scheduledAt: v.optional(v.string()),
            estimatedDuration: v.optional(v.number()),
            propertyIds: v.optional(v.array(v.id("properties"))),
            assignedToId: v.optional(v.id("users")),
            meetingPoint: v.optional(v.string()),
            notes: v.optional(v.string())
        })
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            ...args.updates,
            updatedAt: new Date().toISOString()
        });
    }
});
