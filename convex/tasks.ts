import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("tasks").collect();
    },
});

export const getMyTasks = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user) return [];

        return await ctx.db
            .query("tasks")
            .withIndex("by_assignedTo", (q) => q.eq("assignedToId", user._id))
            .filter(q => q.neq(q.field("status"), "done")) // Show active tasks by default? Or separate query?
            // Let's return all and filter on frontend for now, or just active.
            // Usually "My Tasks" implies todo/in-progress.
            .collect();
    },
});

export const getByLead = query({
    args: { leadId: v.id("leads") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("tasks")
            .withIndex("by_leadId", (q) => q.eq("leadId", args.leadId))
            .collect();
    }
});

export const create = mutation({
    args: {
        title: v.string(),
        description: v.optional(v.string()),
        leadId: v.optional(v.id("leads")),
        propertyId: v.optional(v.id("properties")),
        assignedToId: v.optional(v.id("users")),
        priority: v.union(
            v.literal("low"),
            v.literal("medium"),
            v.literal("high"),
            v.literal("urgent")
        ),
        dueAt: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");

        const currentUser = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (!currentUser) throw new Error("User not found");

        return await ctx.db.insert("tasks", {
            ...args,
            createdById: currentUser._id,
            status: "todo",
            createdAt: new Date().toISOString(),
        });
    },
});

export const updateStatus = mutation({
    args: {
        id: v.id("tasks"),
        status: v.union(
            v.literal("todo"),
            v.literal("in_progress"),
            v.literal("done"),
            v.literal("cancelled")
        )
    },
    handler: async (ctx, args) => {
        const updates: any = { status: args.status };
        if (args.status === "done") {
            updates.completedAt = new Date().toISOString();
        }
        await ctx.db.patch(args.id, updates);
    }
});
