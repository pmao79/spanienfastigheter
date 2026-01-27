import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const create = mutation({
    args: {
        dealId: v.optional(v.id("deals")),
        leadId: v.optional(v.id("leads")),
        propertyId: v.optional(v.id("properties")),
        name: v.string(),
        type: v.union(
            v.literal("passport"),
            v.literal("nie"),
            v.literal("proof_of_funds"),
            v.literal("reservation_agreement"),
            v.literal("purchase_contract"),
            v.literal("nota_simple"),
            v.literal("energy_certificate"),
            v.literal("floor_plan"),
            v.literal("lawyer_report"),
            v.literal("bank_transfer"),
            v.literal("escritura"),
            v.literal("keys_protocol"),
            v.literal("other")
        ),
        storageId: v.string(),
        mimeType: v.string(),
        size: v.number(),
        uploadedById: v.id("users"),
        isPublicToCustomer: v.boolean(),
        requiresSignature: v.boolean(),
        notes: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("documents", {
            ...args,
            createdAt: new Date().toISOString(),
        });
    },
});

export const getByDeal = query({
    args: { dealId: v.id("deals") },
    handler: async (ctx, args) => {
        const documents = await ctx.db
            .query("documents")
            .withIndex("by_dealId", (q) => q.eq("dealId", args.dealId))
            .collect();

        return await Promise.all(documents.map(async (doc) => ({
            ...doc,
            url: await ctx.storage.getUrl(doc.storageId),
        })));
    },
});

export const deleteDocument = mutation({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const doc = await ctx.db.get(args.id);
        if (!doc) throw new Error("Document not found");

        // Delete file from storage
        await ctx.storage.delete(doc.storageId);

        // Delete metadata
        await ctx.db.delete(args.id);
    },
});

export const getMyDocuments = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity || !identity.email) return [];

        // 1. Find lead
        const lead = await ctx.db
            .query("leads")
            .withIndex("by_email", (q) => q.eq("email", identity.email!))
            .first();

        if (!lead) return [];

        // 2. Find deal
        const deal = await ctx.db
            .query("deals")
            .withIndex("by_leadId", (q) => q.eq("leadId", lead._id))
            .first();

        if (!deal) return [];

        // 3. Get public documents
        const documents = await ctx.db
            .query("documents")
            .withIndex("by_dealId", (q) => q.eq("dealId", deal._id))
            .filter((q) => q.eq(q.field("isPublicToCustomer"), true))
            .collect();

        // 4. Enrich with URLs
        return await Promise.all(documents.map(async (doc) => ({
            ...doc,
            url: await ctx.storage.getUrl(doc.storageId),
        })));
    },
});
