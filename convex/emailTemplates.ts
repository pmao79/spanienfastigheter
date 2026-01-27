import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("emailTemplates").collect();
    },
});

export const getByCategory = query({
    args: { category: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("emailTemplates")
            .withIndex("by_category", (q) => q.eq("category", args.category as any))
            .collect();
    },
});

export const getById = query({
    args: { id: v.id("emailTemplates") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        subject: v.string(),
        body: v.string(),
        category: v.union(
            v.literal("welcome"),
            v.literal("follow_up"),
            v.literal("viewing_confirmation"),
            v.literal("property_matching"),
            v.literal("general")
        ),
        isActive: v.boolean(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");

        return await ctx.db.insert("emailTemplates", {
            ...args,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("emailTemplates"),
        name: v.optional(v.string()),
        subject: v.optional(v.string()),
        body: v.optional(v.string()),
        category: v.optional(v.union(
            v.literal("welcome"),
            v.literal("follow_up"),
            v.literal("viewing_confirmation"),
            v.literal("property_matching"),
            v.literal("general")
        )),
        isActive: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");

        const { id, ...updates } = args;
        await ctx.db.patch(id, {
            ...updates,
            updatedAt: new Date().toISOString(),
        });
    },
});

export const deleteTemplate = mutation({
    args: { id: v.id("emailTemplates") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");
        await ctx.db.delete(args.id);
    }
});
