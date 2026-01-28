import { query, mutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

// Helper to generate initials from name
function generateInitials(name: string): string {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

// === EXISTING FUNCTIONS RESTORED ===

export const getByClerkId = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .first();
    },
});

// Internal version for Actions to use
export const getByClerkIdInternal = internalQuery({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .first();
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        clerkId: v.string(),
        avatar: v.optional(v.string()),
        role: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .first();

        if (existing) return existing._id;

        // Check if this is the FIRST user -> make admin
        const anyUser = await ctx.db.query("users").first();
        const role = args.role || (anyUser ? "customer" : "admin");

        return await ctx.db.insert("users", {
            name: args.name,
            email: args.email,
            clerkId: args.clerkId || "",
            avatar: args.avatar,
            role: role as any,
            isActive: true,
            createdAt: new Date().toISOString(),
            displayName: args.name,
            initials: generateInitials(args.name),
        });
    },
});

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("users").collect();
    },
});

// === NEW PROFILE FUNCTIONS ===

export const getMyProfile = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null; // Or throw, but null is safer for frontend checks

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        return user;
    },
});

export const updateProfile = mutation({
    args: {
        displayName: v.optional(v.string()),
        title: v.optional(v.string()),
        phone: v.optional(v.string()),
        emailPublic: v.optional(v.string()),
        avatarUrl: v.optional(v.string()),
        bio: v.optional(v.string()),
        initials: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user) throw new Error("User not found");

        const updates: any = { ...args };

        // Auto-generate initials if display name changes and no initials provided
        if (args.displayName && !args.initials) {
            updates.initials = generateInitials(args.displayName);
        }

        await ctx.db.patch(user._id, updates);
        return await ctx.db.get(user._id);
    },
});

// Sätt roll för en användare
export const setRole = mutation({
    args: {
        userId: v.id("users"),
        role: v.union(v.literal("admin"), v.literal("agent"), v.literal("customer")),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.userId, { role: args.role });
    },
});

// Inaktivera en användare
export const deactivate = mutation({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.userId, { isActive: false });
    },
});

// Återaktivera en användare
export const reactivate = mutation({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.userId, { isActive: true });
    },
});
