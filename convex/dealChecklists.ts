import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByDeal = query({
    args: { dealId: v.id("deals") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("dealChecklists")
            .withIndex("by_dealId", (q) => q.eq("dealId", args.dealId))
            .collect();
    },
});

export const toggleItem = mutation({
    args: {
        checklistId: v.id("dealChecklists"),
        itemId: v.string(),
        isCompleted: v.boolean(),
        userId: v.optional(v.id("users")), // Who completed it
    },
    handler: async (ctx, args) => {
        const checklist = await ctx.db.get(args.checklistId);
        if (!checklist) throw new Error("Checklist not found");

        const updatedItems = checklist.items.map((item: any) => {
            if (item.id === args.itemId) {
                return {
                    ...item,
                    isCompleted: args.isCompleted,
                    completedAt: args.isCompleted ? new Date().toISOString() : undefined,
                    completedById: args.userId,
                };
            }
            return item;
        });

        await ctx.db.patch(args.checklistId, {
            items: updatedItems,
            updatedAt: new Date().toISOString(),
        });
    },
});

export const updateItemNotes = mutation({
    args: {
        checklistId: v.id("dealChecklists"),
        itemId: v.string(),
        notes: v.string()
    },
    handler: async (ctx, args) => {
        const checklist = await ctx.db.get(args.checklistId);
        if (!checklist) throw new Error("Checklist not found");

        const updatedItems = checklist.items.map((item: any) => {
            if (item.id === args.itemId) {
                return { ...item, notes: args.notes };
            }
            return item;
        });

        await ctx.db.patch(args.checklistId, {
            items: updatedItems,
            updatedAt: new Date().toISOString(),
        });
    }
});
