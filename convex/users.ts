import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("users").order("desc").collect();
    },
});

export const getById = query({
    args: { id: v.id("users") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const getByClerkId = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .unique();
    },
});

export const create = mutation({
    args: {
        email: v.string(),
        name: v.string(),
        clerkId: v.optional(v.string()),
        role: v.union(
            v.literal("owner"),
            v.literal("equity_partner"),
            v.literal("admin"),
            v.literal("sales_partner"),
            v.literal("agent"),
            v.literal("referral"),
            v.literal("customer")
        ),
        avatar: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .unique();

        if (existing) {
            // If user exists but no clerkId, update it? Or just return existing?
            // For now, let's just return existing ID if it matches? 
            // Or throw error?
            // The prompt says "skapa användare automatiskt vid första inloggning".
            if (args.clerkId && !existing.clerkId) {
                await ctx.db.patch(existing._id, { clerkId: args.clerkId, avatar: args.avatar });
            }
            return existing._id;
        }

        // Default isActive to true
        return await ctx.db.insert("users", {
            ...args,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("users"),
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        phone: v.optional(v.string()),
        avatar: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        await ctx.db.patch(id, {
            ...updates,
            updatedAt: new Date().toISOString(),
        });
    },
});

export const setRole = mutation({
    args: {
        id: v.id("users"),
        role: v.union(
            v.literal("owner"),
            v.literal("equity_partner"),
            v.literal("admin"),
            v.literal("sales_partner"),
            v.literal("agent"),
            v.literal("referral"),
            v.literal("customer")
        )
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            role: args.role,
            updatedAt: new Date().toISOString()
        });
    },
});

export const deactivate = mutation({
    args: { id: v.id("users") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            isActive: false,
            updatedAt: new Date().toISOString()
        });
    },
});

export const reactivate = mutation({
    args: { id: v.id("users") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            isActive: true,
            updatedAt: new Date().toISOString()
        });
    },
});
