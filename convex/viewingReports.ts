import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByViewing = query({
    args: { viewingId: v.id("viewings") },
    handler: async (ctx, args) => {
        return await ctx.db.query("viewingReports")
            .withIndex("by_viewingId", (q) => q.eq("viewingId", args.viewingId))
            .first();
    }
});

export const create = mutation({
    args: {
        viewingId: v.id("viewings"),
        propertyFeedback: v.array(v.object({
            propertyId: v.id("properties"),
            reaction: v.union(
                v.literal("loved"),
                v.literal("liked"),
                v.literal("neutral"),
                v.literal("disliked")
            ),
            interestLevel: v.number(),
            pros: v.optional(v.string()),
            cons: v.optional(v.string()),
            priceOpinion: v.optional(v.union(
                v.literal("too_expensive"),
                v.literal("fair"),
                v.literal("good_value")
            )),
            wantSecondViewing: v.optional(v.boolean()),
            photos: v.optional(v.array(v.string())),
        })),
        customerFeedback: v.object({
            favoritePropertyId: v.optional(v.id("properties")),
            budgetUpdate: v.optional(v.string()),
            newRequirements: v.optional(v.string()),
            timeline: v.optional(v.union(
                v.literal("asap"),
                v.literal("1_3_months"),
                v.literal("3_6_months"),
                v.literal("6_12_months"),
                v.literal("just_looking")
            )),
            financingStatus: v.optional(v.union(
                v.literal("cash"),
                v.literal("mortgage_approved"),
                v.literal("mortgage_pending"),
                v.literal("not_started")
            )),
            decisionMakers: v.optional(v.string()),
        }),
        agentAssessment: v.object({
            purchaseProbability: v.union(
                v.literal("low"),
                v.literal("medium"),
                v.literal("high"),
                v.literal("very_high")
            ),
            readiness: v.union(
                v.literal("early_stage"),
                v.literal("active_search"),
                v.literal("ready_to_buy")
            ),
            obstacles: v.optional(v.array(v.string())),
            recommendation: v.optional(v.string()),
            nextSteps: v.optional(v.string()),
        }),
        followUpDate: v.optional(v.string()),
        followUpNotes: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // TODO: Re-enable strict auth
        // const identity = await ctx.auth.getUserIdentity();
        // if (!identity) throw new Error("Unauthorized");

        // Temporary fallback
        const user = await ctx.db.query("users").first();
        // const user = await ctx.db.query("users")
        //     .withIndex("by_email", (q) => q.eq("email", identity.email!))
        //     .first();

        if (!user) throw new Error("User not found");

        const reportId = await ctx.db.insert("viewingReports", {
            ...args,
            submittedById: user._id,
            submittedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        });

        // Auto-update viewing status to completed
        await ctx.db.patch(args.viewingId, {
            status: "completed",
            updatedAt: new Date().toISOString()
        });

        // Log activity
        await ctx.db.insert("activityLog", {
            type: "viewing_report_submitted",
            description: `Report submitted for viewing`,
            userId: user._id,
            meta: { reportId, viewingId: args.viewingId },
            createdAt: new Date().toISOString()
        });

        return reportId;
    }
});
