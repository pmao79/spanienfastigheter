import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    properties: defineTable({
        // Grund
        externalId: v.string(), // ID from XML
        ref: v.string(),
        type: v.string(),
        price: v.number(),
        currency: v.string(),
        beds: v.number(),
        baths: v.number(),
        built: v.number(),
        plot: v.optional(v.number()), // Plot might be missing for apartments

        // Geo
        province: v.string(),
        town: v.string(),
        locationDetail: v.optional(v.string()),
        region: v.optional(v.string()), // Derived from province/town
        latitude: v.optional(v.number()),
        longitude: v.optional(v.number()),

        // Features
        pool: v.boolean(),
        poolType: v.optional(v.string()), // "Private" | "Communal" | string
        beachDistance: v.optional(v.number()), // meters
        hasElevator: v.boolean(),
        hasParking: v.boolean(),
        parkingSpaces: v.optional(v.number()),
        hasAC: v.boolean(),
        hasGarden: v.boolean(),
        isGated: v.boolean(),
        hasStorage: v.boolean(),
        hasHeating: v.boolean(),
        nearGolf: v.boolean(),
        terraceSize: v.optional(v.number()),

        // Meta
        newBuild: v.boolean(),
        energyConsumption: v.optional(v.string()), // e.g., "A", "B"
        energyEmissions: v.optional(v.string()),
        images: v.array(v.string()),
        description: v.optional(v.string()), // Swedish description

        // Admin
        isFeatured: v.boolean(),
        featuredOrder: v.optional(v.number()),
        isHidden: v.boolean(),
        internalNotes: v.optional(v.string()),

        // Timestamps (in addition to _creationTime)
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_externalId", ["externalId"])
        .index("by_ref", ["ref"])
        .index("by_region", ["region"])
        .index("by_province", ["province"])
        .index("by_town", ["town"])
        .index("by_type", ["type"])
        .index("by_price", ["price"])
        .index("by_featured", ["isFeatured", "featuredOrder"]), // Compound index for efficient featured fetching

    users: defineTable({
        email: v.string(),
        name: v.string(),
        phone: v.optional(v.string()),
        avatar: v.optional(v.string()),
        role: v.union(
            v.literal("owner"),
            v.literal("equity_partner"),
            v.literal("admin"),
            v.literal("sales_partner"),
            v.literal("agent"),
            v.literal("referral"),
            v.literal("customer")
        ),
        isActive: v.boolean(),
        clerkId: v.optional(v.string()),
        createdAt: v.string(),
        updatedAt: v.string(),
    })
        .index("by_email", ["email"])
        .index("by_role", ["role"])
        .index("by_clerkId", ["clerkId"]),

    leads: defineTable({
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        phone: v.optional(v.string()),
        country: v.optional(v.string()),

        status: v.union(
            v.literal("new"),
            v.literal("contacted"),
            v.literal("qualified"),
            v.literal("viewing_scheduled"),
            v.literal("viewing_done"),
            v.literal("negotiating"),
            v.literal("won"),
            v.literal("lost")
        ),

        temperature: v.union(
            v.literal("cold"),
            v.literal("warm"),
            v.literal("hot")
        ),

        source: v.string(),
        sourceDetail: v.optional(v.string()),
        assignedToId: v.optional(v.id("users")),

        preferences: v.optional(v.object({
            minBudget: v.optional(v.number()),
            maxBudget: v.optional(v.number()),
            regions: v.optional(v.array(v.string())),
            propertyTypes: v.optional(v.array(v.string())),
            minBeds: v.optional(v.number()),
            notes: v.optional(v.string()),
        })),

        notes: v.optional(v.string()),
        createdAt: v.string(),
        updatedAt: v.string(),
        lastContactedAt: v.optional(v.string()),
    })
        .index("by_email", ["email"])
        .index("by_status", ["status"])
        .index("by_assignedTo", ["assignedToId"])
        .index("by_temperature", ["temperature"]),

    activityLog: defineTable({
        userId: v.optional(v.id("users")),
        action: v.string(),
        entityType: v.string(),
        entityId: v.string(),
        description: v.string(),
        createdAt: v.string(),
    })
        .index("by_createdAt", ["createdAt"])
        .index("by_entityType", ["entityType"]),
});
