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
});
