
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// === CALCULATIONS ===

export const calculateCommission = mutation({
    args: { dealId: v.id("deals") },
    handler: async (ctx, args) => {
        const deal = await ctx.db.get(args.dealId);
        if (!deal || !deal.agreedPrice) throw new Error("Deal not ready for commission calculation");

        // Logic:
        // 1. Determine total commission for the deal (e.g. 5% of price, or specific amount)
        // 2. Check for manual splits in deal.commissionSplits
        // 3. If no manual splits, apply default logic based on assigned agents' profiles.

        // Get assigned agents
        const agents = [];
        if (deal.assignedToId) agents.push({ id: deal.assignedToId, role: "lead_agent" });
        if (deal.partnerId) agents.push({ id: deal.partnerId, role: "partner" });

        // Calculate potential payouts
        const payouts = [];

        for (const agent of agents) {
            const user = await ctx.db.get(agent.id);
            if (!user) continue;

            let amount = 0;
            let percent = 0;
            let currency = deal.currency || "EUR";

            // Check if user has a commission profile
            if (user.commissionProfileId) {
                const profile = await ctx.db.get(user.commissionProfileId);
                if (profile) {
                    if (profile.type === "fixed_percent" && profile.fixedPercent) {
                        percent = profile.fixedPercent;
                        amount = (deal.agreedPrice * percent) / 100;
                    } else if (profile.type === "tiered" && profile.tiers) {
                        // Calculate based on yearly deals
                        const yearDeals = user.yearlyDealsCount || 0;
                        // Find matching tier
                        const tier = profile.tiers.find(t =>
                            yearDeals >= t.minDeals &&
                            (!t.maxDeals || yearDeals <= t.maxDeals)
                        );

                        if (tier) {
                            percent = tier.percent;
                            amount = (deal.agreedPrice * percent) / 100;
                            // Bonus check could happen here or on deal close event
                        }
                    }
                }
            } else {
                // Default fallback if no profile?
                // Maybe 10% defaults? Let's leave at 0 or handle manually for now.
                // Or use data from deal.commissionSplits if available
            }

            if (amount > 0) {
                payouts.push({
                    userId: user._id,
                    dealId: deal._id,
                    amount,
                    currency,
                    percent,
                    status: "pending", // Default to pending
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                });
            }
        }

        // Save payouts
        for (const payout of payouts) {
            await ctx.db.insert("commissionPayouts", payout as any);
        }

        return payouts;
    },
});

// === QUERIES ===

export const getCommissionSummary = query({
    args: {},
    handler: async (ctx) => {
        const payouts = await ctx.db.query("commissionPayouts").collect();
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        const pending = payouts.filter(p => p.status === "pending");
        const approved = payouts.filter(p => p.status === "approved");
        const paid = payouts.filter(p => p.status === "paid");

        const pendingTotal = pending.reduce((sum, p) => sum + p.amount, 0);
        const approvedTotal = approved.reduce((sum, p) => sum + p.amount, 0);

        const paidThisYear = paid.filter(p => {
            const d = p.paidAt ? new Date(p.paidAt) : null;
            return d && d.getFullYear() === currentYear;
        }).reduce((sum, p) => sum + p.amount, 0);

        return {
            pendingTotal,
            pendingCount: pending.length,
            approvedTotal,
            approvedCount: approved.length,
            paidThisYear,
            paidCount: paid.length
        };
    },
});

export const getPayouts = query({
    args: {
        status: v.optional(v.string()), // "pending", "approved", "paid"
        userId: v.optional(v.id("users")),
    },
    handler: async (ctx, args) => {
        let payouts;

        if (args.status) {
            payouts = await ctx.db.query("commissionPayouts")
                .withIndex("by_status", q => q.eq("status", args.status as any))
                .collect();
        } else if (args.userId) {
            payouts = await ctx.db.query("commissionPayouts")
                .withIndex("by_userId", q => q.eq("userId", args.userId))
                .collect();
        } else {
            payouts = await ctx.db.query("commissionPayouts").collect();
        }

        // If filtering by userId AND status, we need manual filter since we picked one index
        if (args.status && args.userId) {
            payouts = payouts.filter(p => p.userId === args.userId);
        }

        // Enrich with Deal and User info
        return await Promise.all(payouts.map(async (p) => {
            const user = await ctx.db.get(p.userId);
            const deal = await ctx.db.get(p.dealId);
            const property = deal?.propertyId ? await ctx.db.get(deal.propertyId) : null;

            return {
                ...p,
                userName: user?.name,
                dealRef: deal?.propertyId, // Placeholder, ideally fetch property ref
                propertyRef: property?.ref,
                dealDate: deal?.completionDate || deal?.updatedAt, // Fallback
            };
        }));
    },
});

export const getMyPayouts = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user) return [];

        const payouts = await ctx.db.query("commissionPayouts")
            .withIndex("by_userId", q => q.eq("userId", user._id))
            .collect();

        return await Promise.all(payouts.map(async (p) => {
            const deal = await ctx.db.get(p.dealId);
            return {
                ...p,
                dealRef: deal?.propertyId,
                dealDate: deal?.completionDate || deal?.updatedAt,
            };
        }));
    },
});

// === MUTATIONS ===

export const approvePayout = mutation({
    args: { payoutId: v.id("commissionPayouts") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        // Only Admin/Owner can approve
        if (!user || (user.role !== "admin" && user.role !== "owner")) {
            throw new Error("Permission denied");
        }

        await ctx.db.patch(args.payoutId, {
            status: "approved",
            approvedById: user._id,
            approvedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    },
});

export const markAsPaid = mutation({
    args: {
        payoutId: v.id("commissionPayouts"),
        paymentReference: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user || (user.role !== "admin" && user.role !== "owner")) {
            throw new Error("Permission denied");
        }

        await ctx.db.patch(args.payoutId, {
            status: "paid",
            paidAt: new Date().toISOString(),
            paymentReference: args.paymentReference,
            updatedAt: new Date().toISOString(),
        });
    },
});

// === PROFILES ===

export const createProfile = mutation({
    args: {
        name: v.string(),
        description: v.optional(v.string()),
        type: v.union(v.literal("fixed_percent"), v.literal("tiered"), v.literal("per_deal")),
        fixedPercent: v.optional(v.number()),
        tiers: v.optional(v.array(v.object({
            minDeals: v.number(),
            maxDeals: v.optional(v.number()),
            percent: v.number(),
            bonus: v.optional(v.number()),
        }))),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("commissionProfiles", {
            ...args,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    },
});

export const getProfiles = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("commissionProfiles").withIndex("by_isActive").collect();
    },
});
