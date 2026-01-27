import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const getAll = query({
    args: {
        search: v.optional(v.string()), // ref or town
        isHidden: v.optional(v.boolean()),
        isFeatured: v.optional(v.boolean()),
        status: v.optional(v.string()),
        paginationOpts: paginationOptsValidator,
    },
    handler: async (ctx, args) => {
        // Start fresh with a clean query selection logic
        let q;

        // 1. Select Index based on primary filter
        if (args.status) {
            q = ctx.db.query("properties").withIndex("by_status", q => q.eq("status", args.status as any));
        } else if (args.isFeatured !== undefined) {
            // If we strictly want featured, we could use the index, but we often want to sort/filter more.
            // Let's just use full scan for mixed filters if no status is selected, 
            // to allow all other filters to apply freely.
            q = ctx.db.query("properties");
        } else {
            q = ctx.db.query("properties");
        }

        // 2. Apply Filters
        if (args.isHidden !== undefined) {
            q = q.filter((q) => q.eq(q.field("isHidden"), args.isHidden));
        }

        if (args.isFeatured !== undefined) {
            q = q.filter((q) => q.eq(q.field("isFeatured"), args.isFeatured));
        }

        // If we didn't use status index (e.g. status was not passed), we don't need to filter by it
        // UNLESS we want to support it as a filter even if not indexed (redundant if using index, but safe)
        // However, if we used withIndex("by_status"), we presumably ALREADY filtered by status.
        // It's safe to NOT double filter if we trust withIndex.
        // But if args.status was passed, q IS indexed.

        // Search Filter
        if (args.search) {
            // const searchLower = args.search.toLowerCase(); // not using for exact match
            q = q.filter((q) =>
                q.or(
                    q.eq(q.field("ref"), args.search),
                    q.eq(q.field("externalId"), args.search)
                )
            );
        }

        return await q.order("desc").paginate(args.paginationOpts);
    },
});

export const toggleFeatured = mutation({
    args: { id: v.id("properties") },
    handler: async (ctx, args) => {
        const prop = await ctx.db.get(args.id);
        if (prop) {
            await ctx.db.patch(args.id, {
                isFeatured: !prop.isFeatured,
                featuredOrder: !prop.isFeatured ? Date.now() : undefined, // easy ordering by time added
                updatedAt: Date.now()
            });
        }
    },
});

export const toggleHidden = mutation({
    args: { id: v.id("properties") },
    handler: async (ctx, args) => {
        const prop = await ctx.db.get(args.id);
        if (prop) {
            await ctx.db.patch(args.id, {
                isHidden: !prop.isHidden,
                updatedAt: Date.now()
            });
        }
    },
});

export const update = mutation({
    args: {
        id: v.id("properties"),
        price: v.optional(v.number()),
        description: v.optional(v.string()),
        internalNotes: v.optional(v.string()),
        isFeatured: v.optional(v.boolean()),
        isHidden: v.optional(v.boolean()),
        status: v.optional(v.union(
            v.literal("active"),
            v.literal("reserved"),
            v.literal("sold"),
            v.literal("paused"),
            v.literal("hidden")
        )),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        await ctx.db.patch(id, {
            ...updates,
            updatedAt: Date.now()
        });
    },
});

export const getById = query({
    args: { id: v.id("properties") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});
