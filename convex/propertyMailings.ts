import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// === QUERIES ===

export const getLeadContext = query({
    args: { leadId: v.id("leads") },
    handler: async (ctx, { leadId }) => {
        // 1. Hämta senaste kommunikation
        const latestComm = await ctx.db
            .query("communications")
            .withIndex("by_leadId", q => q.eq("leadId", leadId))
            .order("desc")
            .first();

        // 2. Hämta tidigare mailings
        const mailings = await ctx.db
            .query("propertyMailings")
            .withIndex("by_leadId", q => q.eq("leadId", leadId))
            .order("desc")
            .take(5);

        // 3. Hämta lead med preferences
        const lead = await ctx.db.get(leadId);

        // 4. Samla alla tidigare skickade propertyIds
        const sentPropertyIds = mailings.flatMap(m => m.propertyIds);

        return {
            latestCommunication: latestComm,
            previousMailings: mailings,
            preferences: lead?.preferences,
            sentPropertyIds: [...new Set(sentPropertyIds)]
        };
    },
});

export const getAll = query({
    args: {
        status: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        let mailings;

        if (args.status) {
            mailings = await ctx.db
                .query("propertyMailings")
                .withIndex("by_status", (q) => q.eq("status", args.status as any))
                .order("desc")
                .collect();
        } else {
            mailings = await ctx.db
                .query("propertyMailings")
                .order("desc")
                .collect();
        }

        // Always join details
        const mailingsWithDetails = await Promise.all(mailings.map(async (m) => {
            const lead = await ctx.db.get(m.leadId);
            const user = await ctx.db.get(m.createdById);

            return {
                ...m,
                leadName: lead ? `${lead.firstName} ${lead.lastName}` : "Unknown Lead",
                createdByUser: user // Return full user object
            };
        }));

        return mailingsWithDetails;
    },
});

export const getById = query({
    args: { id: v.id("propertyMailings") },
    handler: async (ctx, args) => {
        const mailing = await ctx.db.get(args.id);
        if (!mailing) return null;

        const lead = await ctx.db.get(mailing.leadId);
        const properties = await Promise.all(
            mailing.propertyIds.map(id => ctx.db.get(id))
        );
        const template = mailing.templateId ? await ctx.db.get(mailing.templateId) : null;
        const createdByUser = await ctx.db.get(mailing.createdById);

        return {
            ...mailing,
            lead,
            properties: properties.filter(p => p !== null),
            template,
            createdByUser
        };
    },
});

export const getByLead = query({
    args: { leadId: v.id("leads") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("propertyMailings")
            .withIndex("by_leadId", (q) => q.eq("leadId", args.leadId))
            .order("desc")
            .collect();
    },
});

// === MUTATIONS ===

export const create = mutation({
    args: {
        leadId: v.id("leads"),
        propertyIds: v.array(v.id("properties")),
        subject: v.string(),
        personalMessage: v.string(),
        templateId: v.optional(v.id("mailingTemplates")),
        status: v.optional(v.union(
            v.literal("draft"),
            v.literal("scheduled"),
            v.literal("sent"),
            v.literal("delivered"),
            v.literal("opened"),
            v.literal("clicked"),
            v.literal("bounced"),
            v.literal("failed")
        )),
        scheduledAt: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .unique();
        if (!user) throw new Error("User not found");

        const lead = await ctx.db.get(args.leadId);
        if (!lead) throw new Error("Lead not found");

        return await ctx.db.insert("propertyMailings", {
            leadId: args.leadId,
            propertyIds: args.propertyIds,
            subject: args.subject,
            personalMessage: args.personalMessage,
            templateId: args.templateId,
            status: args.status || "draft",
            scheduledAt: args.scheduledAt,

            recipientEmail: lead.email,
            recipientName: `${lead.firstName} ${lead.lastName}`,
            createdById: user._id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("propertyMailings"),
        propertyIds: v.optional(v.array(v.id("properties"))),
        subject: v.optional(v.string()),
        personalMessage: v.optional(v.string()),
        templateId: v.optional(v.id("mailingTemplates")),
        status: v.optional(v.union(
            v.literal("draft"),
            v.literal("scheduled"),
            v.literal("sent"),
            v.literal("delivered"),
            v.literal("opened"),
            v.literal("clicked"),
            v.literal("bounced"),
            v.literal("failed")
        )),
        scheduledAt: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        await ctx.db.patch(id, {
            ...updates,
            updatedAt: new Date().toISOString(),
        });
    },
});

export const deleteMailing = mutation({
    args: { id: v.id("propertyMailings") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const updateStatus = mutation({
    args: {
        id: v.id("propertyMailings"),
        status: v.union(
            v.literal("draft"),
            v.literal("scheduled"),
            v.literal("sent"),
            v.literal("delivered"),
            v.literal("opened"),
            v.literal("clicked"),
            v.literal("bounced"),
            v.literal("failed")
        ),
        sentAt: v.optional(v.string()),
        resendMessageId: v.optional(v.string()),
        openedAt: v.optional(v.string()),
        clickedAt: v.optional(v.string()),
        error: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;

        const mailing = await ctx.db.get(id);
        if (!mailing) return;

        // Increment open count if opened
        let openCountUpdates = {};
        if (updates.status === 'opened') {
            openCountUpdates = { openCount: (mailing.openCount || 0) + 1 };
        }

        await ctx.db.patch(id, {
            ...updates,
            ...openCountUpdates,
            updatedAt: new Date().toISOString(),
        });
    },
});
export const getRecent = query({
    args: {},
    handler: async (ctx) => {
        const mailings = await ctx.db.query("propertyMailings").order("desc").take(5);

        return await Promise.all(mailings.map(async (m) => {
            const lead = await ctx.db.get(m.leadId);
            return {
                ...m,
                leadName: lead ? `${lead.firstName} ${lead.lastName}` : "Unknown"
            };
        }));
    },
});
