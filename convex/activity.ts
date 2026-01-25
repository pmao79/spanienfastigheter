import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const log = mutation({
    args: {
        userId: v.optional(v.id("users")),
        action: v.string(),
        entityType: v.string(),
        entityId: v.string(),
        description: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("activityLog", {
            ...args,
            createdAt: new Date().toISOString(),
        });
    },
});

export const getRecent = query({
    args: { limit: v.optional(v.number()) },
    handler: async (ctx, args) => {
        const limit = args.limit || 10;
        return await ctx.db.query("activityLog").order("desc").take(limit);
    },
});
