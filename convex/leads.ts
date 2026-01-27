import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAll = query({
    args: { status: v.optional(v.string()) },
    handler: async (ctx, args) => {
        let q = ctx.db.query("leads");
        if (args.status) {
            q = q.withIndex("by_status", (q) => q.eq("status", args.status as string));
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
        temperature: v.union(
            v.literal("cold"),
            v.literal("warm"),
            v.literal("hot")
        ),
        notes: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const leadId = await ctx.db.insert("leads", {
            ...args,
            status: "new",
            createdAt: new Date().toISOString(),
            lastActivityAt: new Date().toISOString(),
        });

        // Log creation
        await ctx.db.insert("activityLog", {
            type: "lead_create",
            description: `Lead created: ${args.firstName} ${args.lastName}`,
            createdAt: new Date().toISOString(),
            meta: { leadId }
        });

        return leadId;
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
        temperature: v.optional(v.union(
            v.literal("cold"),
            v.literal("warm"),
            v.literal("hot")
        )),
        // New fields
        nextFollowUpAt: v.optional(v.string()),
        lostReason: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        await ctx.db.patch(id, {
            ...updates,
            lastActivityAt: new Date().toISOString()
        });
    },
});

export const updateStatus = mutation({
    args: {
        id: v.id("leads"),
        status: v.string() // "new", "contacted", etc.
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            status: args.status,
            lastActivityAt: new Date().toISOString()
        });

        // Log activity
        await ctx.db.insert("activityLog", {
            type: "lead_status_change",
            description: `Lead status changed to ${args.status}`,
            createdAt: new Date().toISOString(),
            meta: { leadId: args.id, newStatus: args.status }
        });
    },
});

// For Kanban View
export const getPipeline = query({
    args: {},
    handler: async (ctx) => {
        // We want all active leads, arguably.
        // For now, fetch all and frontend can group.
        // Optimization: We could use specific indexes if we had millions,
        // but for now finding all leads is fine.
        // We typically exclude "lost" or "won" from active pipeline view maybe?
        // Let's just return all and let frontend filter/columnize.
        return await ctx.db.query("leads").collect();
    }
});
