import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

// Internal mutation to batch upsert properties from sync
export const batchUpsert = internalMutation({
    args: {
        properties: v.array(v.object({
            externalId: v.string(),
            ref: v.string(),
            type: v.string(),
            price: v.number(),
            currency: v.string(),
            beds: v.number(),
            baths: v.number(),
            built: v.number(),
            plot: v.optional(v.number()),

            province: v.string(),
            town: v.string(),
            locationDetail: v.optional(v.string()),
            region: v.optional(v.string()),
            latitude: v.optional(v.number()),
            longitude: v.optional(v.number()),

            pool: v.boolean(),
            poolType: v.optional(v.string()),
            beachDistance: v.optional(v.number()),
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

            newBuild: v.boolean(),
            energyConsumption: v.optional(v.string()),
            energyEmissions: v.optional(v.string()),
            images: v.array(v.string()),
            description: v.optional(v.string()),

            isFeatured: v.boolean(),
            featuredOrder: v.optional(v.number()),
            isHidden: v.boolean(),
            internalNotes: v.optional(v.string()),

            updatedAt: v.number(),
        }))
    },
    handler: async (ctx, args) => {
        let inserted = 0;
        let updated = 0;

        for (const prop of args.properties) {
            const existing = await ctx.db
                .query("properties")
                .withIndex("by_externalId", (q) => q.eq("externalId", prop.externalId))
                .first();

            if (existing) {
                await ctx.db.patch(existing._id, {
                    ...prop,
                    // Preserve specific admin fields if they are not explicitly handled by sync
                    // NOTE: We assume sync handles basic fields, but we should ensure we don't accidentally wipe admin flags
                    // if the source XML doesn't know about them.
                    // The sync action passes default 'false' for isFeatured, etc.
                    // But we WANT to preserve the EXISTING 'isFeatured' status unless we change it manually.
                    // So we override the incoming 'false' with the existing value.
                    isFeatured: existing.isFeatured,
                    featuredOrder: existing.featuredOrder,
                    isHidden: existing.isHidden,
                    internalNotes: existing.internalNotes,
                    createdAt: existing.createdAt,
                });
                updated++;
            } else {
                await ctx.db.insert("properties", {
                    ...prop,
                    createdAt: Date.now(),
                });
                inserted++;
            }
        }
        return { inserted, updated };
    },
});

export const search = query({
    args: {
        // Multi-select filters (arrays)
        regions: v.optional(v.array(v.string())),
        towns: v.optional(v.array(v.string())),
        types: v.optional(v.array(v.string())),

        // Legacy single-value filters (for backward compatibility)
        region: v.optional(v.string()),
        province: v.optional(v.string()),
        town: v.optional(v.string()),
        type: v.optional(v.string()),

        // Numeric filters
        minPrice: v.optional(v.number()),
        maxPrice: v.optional(v.number()),
        minBeds: v.optional(v.number()),
        maxBeds: v.optional(v.number()),

        // Boolean filters (main)
        hasPool: v.optional(v.boolean()),
        hasParking: v.optional(v.boolean()),
        nearGolf: v.optional(v.boolean()),
        newBuild: v.optional(v.boolean()),

        // Advanced boolean filters ("+ Fler" section)
        maxBeachDistance: v.optional(v.number()),
        privatePool: v.optional(v.boolean()),
        hasElevator: v.optional(v.boolean()),
        hasAC: v.optional(v.boolean()),
        isGated: v.optional(v.boolean()),
        hasGarden: v.optional(v.boolean()),
        hasTerrace: v.optional(v.boolean()),
        hasStorage: v.optional(v.boolean()),
        hasHeating: v.optional(v.boolean()),

        sort: v.optional(v.union(v.literal("price-asc"), v.literal("price-desc"), v.literal("newest"))),
        pagination: paginationOptsValidator,
    },

    handler: async (ctx, args) => {
        let q: any = ctx.db.query("properties");

        // 1. Select Index based on primary filter for efficiency
        // Note: Multi-select arrays require full scan, single values can use index
        if (args.region && !args.regions?.length) {
            q = q.withIndex("by_region", (q: any) => q.eq("region", args.region));
        } else if (args.province) {
            q = q.withIndex("by_province", (q: any) => q.eq("province", args.province));
        } else if (args.town && !args.towns?.length) {
            q = q.withIndex("by_town", (q: any) => q.eq("town", args.town));
        } else if (args.type && !args.types?.length) {
            q = q.withIndex("by_type", (q: any) => q.eq("type", args.type));
        } else if (args.sort === "price-asc" || args.sort === "price-desc") {
            q = q.withIndex("by_price");
        }

        // 2. Collect and filter in memory for multi-select support
        // For multi-select, we need to use includes() which Convex filter doesn't support
        const allProperties = await q.collect();

        let filtered = allProperties.filter((p: any) => {
            // Always filter hidden
            if (p.isHidden) return false;

            // Multi-select regions (OR logic)
            if (args.regions?.length && !args.regions.includes(p.region)) {
                return false;
            }
            // Legacy single region
            if (args.region && p.region !== args.region) return false;

            // Multi-select towns/areas (OR logic)
            if (args.towns?.length && !args.towns.includes(p.town)) {
                return false;
            }
            // Legacy single town
            if (args.town && p.town !== args.town) return false;

            // Multi-select types (OR logic)
            if (args.types?.length && !args.types.includes(p.type)) {
                return false;
            }
            // Legacy single type
            if (args.type && p.type !== args.type) return false;

            // Province filter
            if (args.province && p.province !== args.province) return false;

            // Price filters
            if (args.minPrice && p.price < args.minPrice) return false;
            if (args.maxPrice && p.price > args.maxPrice) return false;

            // Bedroom filters
            if (args.minBeds && p.beds < args.minBeds) return false;
            if (args.maxBeds && p.beds > args.maxBeds) return false;

            // Boolean features (main)
            if (args.hasPool && !p.pool) return false;
            if (args.hasParking && !p.hasParking) return false;
            if (args.nearGolf && !p.nearGolf) return false;
            if (args.newBuild && !p.newBuild) return false;

            // Advanced boolean features ("+ Fler" section)
            if (args.maxBeachDistance) {
                if (!p.beachDistance || p.beachDistance > args.maxBeachDistance) {
                    return false;
                }
            }
            if (args.privatePool) {
                // Private pool specifically (not communal)
                if (!p.pool || !p.poolType?.toLowerCase().includes('private')) {
                    return false;
                }
            }
            if (args.hasElevator && !p.hasElevator) return false;
            if (args.hasAC && !p.hasAC) return false;
            if (args.isGated && !p.isGated) return false;
            if (args.hasGarden && !p.hasGarden) return false;
            if (args.hasTerrace && !p.terraceSize) return false;
            if (args.hasStorage && !p.hasStorage) return false;
            if (args.hasHeating && !p.hasHeating) return false;

            return true;
        });

        // 3. Sorting (in-memory since we collected)
        if (args.sort === "price-asc") {
            filtered.sort((a: any, b: any) => a.price - b.price);
        } else if (args.sort === "price-desc") {
            filtered.sort((a: any, b: any) => b.price - a.price);
        } else if (args.sort === "newest") {
            filtered.sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0));
        }

        // 4. Manual pagination
        const { numItems, cursor } = args.pagination;
        const startIndex = cursor ? parseInt(cursor, 10) : 0;
        const page = filtered.slice(startIndex, startIndex + numItems);
        const nextCursor = startIndex + numItems < filtered.length
            ? String(startIndex + numItems)
            : null;

        return {
            page,
            continueCursor: nextCursor,
            isDone: nextCursor === null,
        };
    },
});


export const getByRef = query({
    args: { ref: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("properties")
            .withIndex("by_ref", (q) => q.eq("ref", args.ref))
            .first();
    },
});

export const getById = query({
    args: { id: v.id("properties") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const getFeatured = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("properties")
            .withIndex("by_featured", (q) => q.eq("isFeatured", true))
            .order("asc") // respects featuredOrder if compound index is [isFeatured, featuredOrder]
            .take(10); // Limit to reasonable number
    },
});

export const getRegions = query({
    args: {},
    handler: async (ctx) => {
        // Aggregation: count properties per region
        // Note: Full scan required. Expensive for huge datasets.
        const properties = await ctx.db.query("properties").collect();
        const counts: Record<string, number> = {};

        for (const p of properties) {
            if (p.region) {
                counts[p.region] = (counts[p.region] || 0) + 1;
            }
        }

        return Object.entries(counts).map(([region, count]) => ({ region, count }));
    },
});

export const getTownsByRegion = query({
    args: { region: v.string() },
    handler: async (ctx, args) => {
        const properties = await ctx.db
            .query("properties")
            .withIndex("by_region", (q) => q.eq("region", args.region))
            .collect();

        const counts: Record<string, number> = {};
        for (const p of properties) {
            counts[p.town] = (counts[p.town] || 0) + 1;
        }

        return Object.entries(counts).map(([town, count]) => ({ town, count }));
    },
});

export const getFilterOptions = query({
    args: { regions: v.optional(v.array(v.string())) },
    handler: async (ctx, args) => {
        // Fetch all visible properties
        const properties = await ctx.db.query("properties")
            .filter(q => q.eq(q.field("isHidden"), false))
            .collect();

        const types = new Set<string>();
        const regions = new Map<string, number>();
        const areas = new Map<string, { count: number; region: string }>();
        let minPrice = Infinity;
        let maxPrice = 0;

        for (const p of properties) {
            // Types
            if (p.type) types.add(p.type);

            // Regions with count
            if (p.region) {
                regions.set(p.region, (regions.get(p.region) || 0) + 1);
            }

            // Areas (towns) with count and region association
            // Filter by selected regions if provided
            if (p.town) {
                const shouldIncludeArea = !args.regions?.length ||
                    (p.region && args.regions.includes(p.region));

                if (shouldIncludeArea) {
                    const existing = areas.get(p.town);
                    if (existing) {
                        existing.count++;
                    } else {
                        areas.set(p.town, { count: 1, region: p.region || '' });
                    }
                }
            }

            // Price range
            if (p.price < minPrice) minPrice = p.price;
            if (p.price > maxPrice) maxPrice = p.price;
        }

        return {
            types: Array.from(types).sort(),
            regions: Array.from(regions.entries())
                .map(([region, count]) => ({ name: region, count }))
                .sort((a, b) => a.name.localeCompare(b.name)),
            areas: Array.from(areas.entries())
                .map(([town, data]) => ({ name: town, count: data.count, region: data.region }))
                .sort((a, b) => a.name.localeCompare(b.name)),
            priceRange: {
                min: minPrice === Infinity ? 0 : minPrice,
                max: maxPrice
            },
        };
    },
});


export const list = query({
    args: {},
    handler: async (ctx) => {
        // Lightweight list for dropdowns
        return await ctx.db.query("properties")
            .filter(q => q.eq(q.field("isHidden"), false))
            .take(100);
    },
});
export const getAllAdmin = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("properties")
            .order("desc")
            .take(100);
    },
});
