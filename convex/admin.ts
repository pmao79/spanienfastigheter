import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { internal } from "./_generated/api";

export const setFeatured = mutation({
    args: { id: v.id("properties"), isFeatured: v.boolean() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { isFeatured: args.isFeatured });
    },
});

export const setFeaturedOrder = mutation({
    args: { id: v.id("properties"), order: v.number() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { featuredOrder: args.order });
    },
});

export const setHidden = mutation({
    args: { id: v.id("properties"), isHidden: v.boolean() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { isHidden: args.isHidden });
    },
});

export const addInternalNote = mutation({
    args: { id: v.id("properties"), note: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { internalNotes: args.note });
    },
});

export const triggerSync = mutation({
    args: {},
    handler: async (ctx) => {
        // Schedule the sync action to run immediately
        await ctx.scheduler.runAfter(0, internal.sync.syncProperties, {});
        return "Sync scheduled";
    },
});
