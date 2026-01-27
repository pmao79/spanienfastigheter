import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("mailingTemplates")
            .withIndex("by_isActive", (q) => q.eq("isActive", true))
            .collect();
    },
});

export const getById = query({
    args: { id: v.id("mailingTemplates") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        description: v.optional(v.string()),
        layout: v.union(
            v.literal("elegant"),
            v.literal("modern"),
            v.literal("compact"),
            v.literal("single")
        ),
        headerText: v.optional(v.string()),
        footerText: v.optional(v.string()),
        ctaButtonText: v.string(),
        primaryColor: v.optional(v.string()),
        isDefault: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        if (args.isDefault) {
            // Unset other defaults
            const defaults = await ctx.db
                .query("mailingTemplates")
                .filter(q => q.eq(q.field("isDefault"), true))
                .collect();

            for (const d of defaults) {
                await ctx.db.patch(d._id, { isDefault: false });
            }
        }

        return await ctx.db.insert("mailingTemplates", {
            ...args,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("mailingTemplates"),
        name: v.optional(v.string()),
        description: v.optional(v.string()),
        layout: v.optional(v.union(
            v.literal("elegant"),
            v.literal("modern"),
            v.literal("compact"),
            v.literal("single")
        )),
        headerText: v.optional(v.string()),
        footerText: v.optional(v.string()),
        ctaButtonText: v.optional(v.string()),
        primaryColor: v.optional(v.string()),
        isActive: v.optional(v.boolean()),
        isDefault: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;

        if (updates.isDefault) {
            const defaults = await ctx.db
                .query("mailingTemplates")
                .filter(q => q.neq(q.field("_id"), id))
                .filter(q => q.eq(q.field("isDefault"), true))
                .collect();

            for (const d of defaults) {
                await ctx.db.patch(d._id, { isDefault: false });
            }
        }

        await ctx.db.patch(id, {
            ...updates,
            updatedAt: new Date().toISOString(),
        });
    },
});

export const deleteTemplate = mutation({
    args: { id: v.id("mailingTemplates") },
    handler: async (ctx, args) => {
        // Soft delete usually better, but hard delete for now
        await ctx.db.patch(args.id, { isActive: false });
    },
});
