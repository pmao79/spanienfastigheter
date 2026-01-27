import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByLead = query({
    args: { leadId: v.id("leads") },
    handler: async (ctx, args) => {
        const comms = await ctx.db
            .query("communications")
            .withIndex("by_leadId", (q) => q.eq("leadId", args.leadId))
            .order("desc") // Most recent first
            .collect();

        // Optionally fetch user details for each log if needed for UI, 
        // or handled on frontend by storing user name/avatar in log or separate fetch.
        // For now returning raw logs.
        return comms;
    },
});

export const create = mutation({
    args: {
        leadId: v.id("leads"),
        type: v.union(
            v.literal("email_sent"),
            v.literal("email_received"),
            v.literal("call_outgoing"),
            v.literal("call_incoming"),
            v.literal("sms_sent"),
            v.literal("sms_received"),
            v.literal("whatsapp"),
            v.literal("meeting"),
            v.literal("note")
        ),
        subject: v.optional(v.string()),
        content: v.string(),
        templateId: v.optional(v.id("emailTemplates")),
        emailStatus: v.optional(v.union(
            v.literal("sent"),
            v.literal("delivered"),
            v.literal("opened"),
            v.literal("clicked"),
            v.literal("bounced")
        )),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");

        // Find the user in our DB to link userId
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        const commId = await ctx.db.insert("communications", {
            ...args,
            userId: user?._id,
            createdAt: new Date().toISOString(),
        });

        // Also update last activity on lead
        await ctx.db.patch(args.leadId, {
            lastActivityAt: new Date().toISOString(),
        });

        return commId;
    },
});

export const logCall = mutation({
    args: {
        leadId: v.id("leads"),
        direction: v.union(v.literal("inbound"), v.literal("outbound")),
        summary: v.string(),
        outcome: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const type = args.direction === "inbound" ? "call_incoming" : "call_outgoing";
        return await create(ctx, {
            leadId: args.leadId,
            type,
            content: args.summary + (args.outcome ? `\n\nOutcome: ${args.outcome}` : ""),
        });
    }
});

export const logNote = mutation({
    args: {
        leadId: v.id("leads"),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        return await create(ctx, {
            leadId: args.leadId,
            type: "note",
            content: args.content,
        });
    }
});
