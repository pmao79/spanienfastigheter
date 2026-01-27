import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// === SERVICES ===

export const getServices = query({
    args: {
        category: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        if (args.category) {
            return await ctx.db
                .query("afterSalesServices")
                .withIndex("by_category", (q) => q.eq("category", args.category as any))
                .collect();
        } else {
            return await ctx.db
                .query("afterSalesServices")
                .withIndex("by_isActive", (q) => q.eq("isActive", true))
                .collect();
        }
    },
});

export const createService = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        category: v.union(
            v.literal("utilities"),
            v.literal("maintenance"),
            v.literal("rental"),
            v.literal("legal"),
            v.literal("renovation"),
            v.literal("insurance"),
            v.literal("other")
        ),
        partnerName: v.optional(v.string()),
        partnerContact: v.optional(v.string()),
        partnerWebsite: v.optional(v.string()),
        revenueType: v.union(
            v.literal("referral_fee"),
            v.literal("percentage"),
            v.literal("monthly"),
            v.literal("none")
        ),
        revenueAmount: v.optional(v.number()),
        revenuePercent: v.optional(v.number()),
        sortOrder: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("afterSalesServices", {
            ...args,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    },
});

// === DEAL SERVICES ===

export const getDealServices = query({
    args: { dealId: v.id("deals") },
    handler: async (ctx, args) => {
        const leads = await ctx.db
            .query("afterSalesLeads")
            .withIndex("by_dealId", (q) => q.eq("dealId", args.dealId))
            .collect();

        const withDetails = await Promise.all(leads.map(async (l) => {
            const service = await ctx.db.get(l.serviceId);
            return { ...l, service };
        }));

        return withDetails;
    },
});

export const updateDealServiceStatus = mutation({
    args: {
        id: v.id("afterSalesLeads"),
        status: v.union(
            v.literal("suggested"),
            v.literal("interested"),
            v.literal("contacted"),
            v.literal("completed"),
            v.literal("declined")
        ),
        revenueEarned: v.optional(v.number()),
        notes: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        await ctx.db.patch(id, {
            ...updates,
            updatedAt: new Date().toISOString(),
        });
    },
});

export const addServiceToDeal = mutation({
    args: {
        dealId: v.id("deals"),
        serviceId: v.id("afterSalesServices"),
        status: v.optional(v.string()), // 'suggested'
        notes: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("afterSalesLeads")
            .withIndex("by_dealId", (q) => q.eq("dealId", args.dealId))
            .filter(q => q.eq(q.field("serviceId"), args.serviceId))
            .first();

        if (existing) return existing._id;

        return await ctx.db.insert("afterSalesLeads", {
            dealId: args.dealId,
            serviceId: args.serviceId,
            status: (args.status as any) || "suggested",
            notes: args.notes,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    },
});


// === FOLLOW UPS ===

export const getFollowUps = query({
    args: {
        status: v.string(), // "upcoming" | "overdue" | "completed"
    },
    handler: async (ctx, args) => {
        const now = new Date().toISOString();
        let q = ctx.db.query("customerFollowUps");

        if (args.status === 'completed') {
            // Basic scan for now, optimization later if needed
            const all = await q.withIndex("by_scheduledAt").collect(); // Use index for sort if possible
            return all.filter(f => f.completedAt !== undefined);
        }

        const active = (await q.collect()).filter(f => !f.completedAt); // In-memory filter for now

        if (args.status === 'overdue') {
            return active.filter(f => f.scheduledAt < now);
        } else {
            return active.filter(f => f.scheduledAt >= now);
        }
    },
});


export const scheduleFollowUp = mutation({
    args: {
        dealId: v.id("deals"),
        type: v.union(
            v.literal("1_week"),
            v.literal("1_month"),
            v.literal("6_months"),
            v.literal("1_year"),
            v.literal("custom")
        ),
        scheduledAt: v.string(),
        notes: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("customerFollowUps", {
            ...args,
            createdAt: new Date().toISOString(),
        });
    },
});

export const completeFollowUp = mutation({
    args: {
        id: v.id("customerFollowUps"),
        customerSatisfaction: v.optional(v.number()),
        notes: v.optional(v.string()),
        nextAction: v.optional(v.string()),
        nextFollowUpAt: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const user = identity ? await ctx.db.query("users").withIndex("by_clerkId", q => q.eq("clerkId", identity.subject)).unique() : null;

        await ctx.db.patch(args.id, {
            customerSatisfaction: args.customerSatisfaction,
            notes: args.notes,
            nextAction: args.nextAction,
            nextFollowUpAt: args.nextFollowUpAt,
            completedAt: new Date().toISOString(),
            completedById: user?._id,
        });

        // Optionally schedule next one immediately
        if (args.nextFollowUpAt) {
            const current = await ctx.db.get(args.id);
            if (current) {
                await ctx.db.insert("customerFollowUps", {
                    dealId: current.dealId,
                    type: "custom",
                    scheduledAt: args.nextFollowUpAt,
                    createdAt: new Date().toISOString(),
                });
            }
        }
    },
});
