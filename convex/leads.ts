import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
    args: {
        status: v.optional(v.string()),
        assignedToId: v.optional(v.id("users")),
    },
    handler: async (ctx, args) => {
        let q = ctx.db.query("leads");

        if (args.status) {
            q = q.withIndex("by_status", (q) => q.eq("status", args.status as any));
        } else if (args.assignedToId) {
            q = q.withIndex("by_assignedTo", (q) => q.eq("assignedToId", args.assignedToId));
        }

        return await q.order("desc").collect();
    },
});

export const getById = query({
    args: { id: v.id("leads") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const create = mutation({
    args: {
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        phone: v.optional(v.string()),
        source: v.string(),
        temperature: v.union(v.literal("cold"), v.literal("warm"), v.literal("hot")),
        notes: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("leads", {
            ...args,
            status: "new",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("leads"),
        firstName: v.optional(v.string()),
        lastName: v.optional(v.string()),
        email: v.optional(v.string()),
        phone: v.optional(v.string()),
        notes: v.optional(v.string()),
        temperature: v.optional(v.union(v.literal("cold"), v.literal("warm"), v.literal("hot"))),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        await ctx.db.patch(id, {
            ...updates,
            updatedAt: new Date().toISOString(),
        });
    },
});

export const updateStatus = mutation({
    args: {
        id: v.id("leads"),
        status: v.union(
            v.literal("new"),
            v.literal("contacted"),
            v.literal("qualified"),
            v.literal("viewing_scheduled"),
            v.literal("viewing_done"),
            v.literal("negotiating"),
            v.literal("won"),
            v.literal("lost")
        ),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            status: args.status,
            updatedAt: new Date().toISOString(),
        });
    },
});

export const assign = mutation({
    args: {
        id: v.id("leads"),
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            assignedToId: args.userId,
            updatedAt: new Date().toISOString(),
        });
    },
});

export const getStats = query({
    args: {},
    handler: async (ctx) => {
        const leads = await ctx.db.query("leads").collect();
        const stats = leads.reduce((acc, lead) => {
            acc[lead.status] = (acc[lead.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return stats;
    }
});
