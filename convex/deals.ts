import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { STAGE_CHECKLISTS } from "./lib/dealChecklists";

// Force rebuild
// Get all deals, optionally filtered by stage or user
export const getAll = query({
    args: {
        stage: v.optional(v.string()),
        assignedToId: v.optional(v.id("users")),
    },
    handler: async (ctx, args) => {
        let q: any = ctx.db.query("deals");

        if (args.stage) {
            q = q.withIndex("by_stage", (q: any) => q.eq("stage", args.stage));
        }

        let deals = await q.collect();

        if (args.assignedToId) {
            deals = deals.filter((d: any) => d.assignedToId === args.assignedToId);
        }

        // Enrich with Lead and Property info
        const enrichedDeals = await Promise.all(deals.map(async (deal: any) => {
            const lead = deal.leadId ? await ctx.db.get(deal.leadId) : null;
            const property = deal.propertyId ? await ctx.db.get(deal.propertyId) : null;
            const assignedTo = deal.assignedToId ? await ctx.db.get(deal.assignedToId) : null;

            // Calculate checklist progress
            // This assumes we have a checklist for the current stage. 
            // In a real app we might want to fetch this specific checklist efficiently.
            const checklists = await ctx.db
                .query("dealChecklists")
                .withIndex("by_dealId", (q) => q.eq("dealId", deal._id))
                .collect();

            const currentChecklist = checklists.find((c: any) => c.stage === deal.stage);
            const totalItems = currentChecklist?.items.length || 0;
            const completedItems = currentChecklist?.items.filter((i: any) => i.isCompleted).length || 0;
            const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

            // Find next step (first uncompleted item)
            // If all completed in current stage, maybe show "Move to next stage"? 
            // For now, just show first uncompleted.
            const nextStepItem = currentChecklist?.items.find((i: any) => !i.isCompleted);
            const nextStep = nextStepItem?.title;
            const nextStepDeadline = nextStepItem?.dueDate;

            return {
                ...deal,
                lead,
                property,
                assignedTo,
                progress,
                nextStep,
                nextStepDeadline
            };
        }));

        return enrichedDeals;
    },
});

export const getById = query({
    args: { id: v.id("deals") },
    handler: async (ctx, args) => {
        const deal = await ctx.db.get(args.id);
        if (!deal) return null;

        const lead = deal.leadId ? await ctx.db.get(deal.leadId) : null;
        const property = deal.propertyId ? await ctx.db.get(deal.propertyId) : null;
        const assignedTo = deal.assignedToId ? await ctx.db.get(deal.assignedToId) : null;
        const partner = deal.partnerId ? await ctx.db.get(deal.partnerId) : null;

        const checklists = await ctx.db
            .query("dealChecklists")
            .withIndex("by_dealId", (q) => q.eq("dealId", deal._id))
            .collect();

        const documents = await ctx.db
            .query("documents")
            .withIndex("by_dealId", (q) => q.eq("dealId", deal._id))
            .collect();

        return {
            ...deal,
            lead,
            property,
            assignedTo,
            partner,
            checklists,
            documents
        };
    },
});

export const getMyDeal = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const email = identity.email;
        if (!email) return null;

        // Find matches by email in leads
        const lead = await ctx.db
            .query("leads")
            .withIndex("by_email", (q) => q.eq("email", email))
            .first();

        if (!lead) return null;

        // Find active deal for this lead
        const deal = await ctx.db
            .query("deals")
            .withIndex("by_leadId", (q) => q.eq("leadId", lead._id))
            .first();

        if (!deal) return null;

        // Enrich the deal data
        const property = await ctx.db.get(deal.propertyId);
        const assignedTo = deal.assignedToId ? await ctx.db.get(deal.assignedToId) : null;

        // Get customer-visible checklist items (if we had that distinction, for now just basic info)

        return {
            ...deal,
            property,
            assignedTo
        };
    },
});

export const create = mutation({
    args: {
        leadId: v.id("leads"),
        propertyId: v.id("properties"),
        assignedToId: v.id("users"),
        partnerId: v.optional(v.id("users")),
        listPrice: v.number(),
        agreedPrice: v.number(),
        reservationFee: v.optional(v.number()),
        commissionPercent: v.optional(v.number()),
        notes: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        // Create Deal
        const dealId = await ctx.db.insert("deals", {
            ...args,
            stage: "reservation",
            currency: "EUR",
            reservationDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        // Auto-generate checklists for all stages
        const stages = Object.keys(STAGE_CHECKLISTS);

        for (const stage of stages) {
            const templateItems = STAGE_CHECKLISTS[stage as keyof typeof STAGE_CHECKLISTS];

            await ctx.db.insert("dealChecklists", {
                dealId,
                stage,
                items: templateItems.map(item => ({
                    ...item,
                    isCompleted: false,
                })),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
        }

        // Update Lead status to 'viewing_scheduled' or appropriate deal status (e.g. 'negotiating')
        // Ideally we should have a 'deal_started' or similar status.
        await ctx.db.patch(args.leadId, { status: "negotiating" });

        return dealId;
    },
});

export const updateStage = mutation({
    args: {
        id: v.id("deals"),
        stage: v.union(
            v.literal("reservation"),
            v.literal("contract"),
            v.literal("due_diligence"),
            v.literal("escritura"),
            v.literal("completion"),
            v.literal("after_sales"),
            v.literal("closed_won"),
            v.literal("closed_lost")
        )
    },
    handler: async (ctx, args) => {
        const deal = await ctx.db.get(args.id);
        if (!deal) throw new Error("Deal not found");

        // Validate if previous stage is "complete enough"? 
        // For now, allow manual jumps.

        await ctx.db.patch(args.id, {
            stage: args.stage,
            updatedAt: new Date().toISOString(),
            // Set stage specific dates if entering that stage
            ...(args.stage === "contract" && !deal.contractDate ? { contractDate: new Date().toISOString() } : {}),
            ...(args.stage === "escritura" && !deal.escrituraDate ? { escrituraDate: new Date().toISOString() } : {}),
            ...(args.stage === "completion" && !deal.completionDate ? { completionDate: new Date().toISOString() } : {}),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("deals"),
        // Allow updating any fields except static ones
        data: v.object({
            listPrice: v.optional(v.number()),
            agreedPrice: v.optional(v.number()),
            depositAmount: v.optional(v.number()),
            commissionPercent: v.optional(v.number()),
            commissionAmount: v.optional(v.number()),
            notaryName: v.optional(v.string()),
            notaryAddress: v.optional(v.string()),
            buyerLawyerName: v.optional(v.string()),
            buyerLawyerEmail: v.optional(v.string()),
            buyerLawyerPhone: v.optional(v.string()),
            notes: v.optional(v.string()),
        })
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            ...args.data,
            updatedAt: new Date().toISOString(),
        });
    },
});
