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
        region: v.optional(v.string()),
        province: v.optional(v.string()),
        town: v.optional(v.string()),
        type: v.optional(v.string()),
        minPrice: v.optional(v.number()),
        maxPrice: v.optional(v.number()),
        minBeds: v.optional(v.number()),
        maxBeds: v.optional(v.number()),
        hasPool: v.optional(v.boolean()),
        maxBeachDistance: v.optional(v.number()),
        nearGolf: v.optional(v.boolean()),
        newBuild: v.optional(v.boolean()),

        sort: v.optional(v.union(v.literal("price-asc"), v.literal("price-desc"), v.literal("newest"))),
        pagination: paginationOptsValidator,
    },
    handler: async (ctx, args) => {
        let q: any = ctx.db.query("properties");

        // 1. Select Index based on primary filter for efficiency
        if (args.region) {
            q = q.withIndex("by_region", (q: any) => q.eq("region", args.region));
        } else if (args.province) {
            q = q.withIndex("by_province", (q: any) => q.eq("province", args.province));
        } else if (args.town) {
            q = q.withIndex("by_town", (q: any) => q.eq("town", args.town));
        } else if (args.type) {
            q = q.withIndex("by_type", (q: any) => q.eq("type", args.type));
        } else if (args.sort === "price-asc" || args.sort === "price-desc") {
            q = q.withIndex("by_price");
            // Note: if you use by_price index, you can't equality filter on other things easily in Convex 
            // without compound indexes. But we can .filter() after.
        }
        // Default to strict ordering if no specific index matched

        // 2. Apply Custom Filters
        // Note: If we used an index above, some of these might be redundant if the index covered it, 
        // but .filter() is safe to apply on top.

        // Filter hidden properties
        let finalQuery = q.filter((q: any) => q.eq(q.field("isHidden"), false));

        if (args.region && !args.region) { /* already handled by index if primary */ }
        // We add conditions that weren't the primary index match or are additional

        if (args.region) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("region"), args.region));
        if (args.province) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("province"), args.province));
        if (args.town) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("town"), args.town));
        if (args.type) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("type"), args.type));

        if (args.minPrice) finalQuery = finalQuery.filter(q => q.gte(q.field("price"), args.minPrice!));
        if (args.maxPrice) finalQuery = finalQuery.filter(q => q.lte(q.field("price"), args.maxPrice!));

        if (args.minBeds) finalQuery = finalQuery.filter(q => q.gte(q.field("beds"), args.minBeds!));
        if (args.maxBeds) finalQuery = finalQuery.filter(q => q.lte(q.field("beds"), args.maxBeds!));

        if (args.hasPool) finalQuery = finalQuery.filter(q => q.eq(q.field("pool"), true));
        if (args.nearGolf) finalQuery = finalQuery.filter(q => q.eq(q.field("nearGolf"), true));
        if (args.newBuild) finalQuery = finalQuery.filter(q => q.eq(q.field("newBuild"), true));

        if (args.maxBeachDistance) {
            // Handle properties with undefined beachDistance gracefully? 
            // q.field("beachDistance") might be undefined.
            // We only want those where beachDistance is defined AND <= max
            // But logic: if beachDistance is missing, it's not "close".
            // Use logic: has(beachDistance) && beachDistance <= max
            finalQuery = finalQuery.filter(q =>
                q.and(
                    q.neq(q.field("beachDistance"), undefined),
                    q.lte(q.field("beachDistance"), args.maxBeachDistance!)
                )
            );
        }

        // 3. Sorting
        // Convex `paginate` requires the query to be ordered if using cursor?
        // Actually, `order` must be called on the query builder BEFORE `filter` if using index ordering,
        // OR we just use basic query and let pagination handle it if we didn't pick a specific index.
        // BUT we picked an index potentially.
        // Constraints: "You cannot use 'order' with an index query unless it matches the index direction"
        // If we used `by_price`, we can sort by price.

        // Simplification for this task:
        // If `sort` is provided, we prefer the index related to sort if valid.
        // If we filtered by Region, we are using `by_region`. We cannot sort by Price efficiently using that index.
        // Convex requires complex compound indexes for "Region + Price".
        // For now, we will just return the filtered results.
        // Handling "Sort by Price" perfectly with flexible filters requires many compound indexes.

        // Strategy: If user explicitly sorts, we might need to do client-side sort if results are small,
        // OR, we just use the sort index and filter everything else (scanning).
        // Given the requirements, scanning with `by_price` is likely better if sort is active.

        // Let's RE-BUILD the query logic to prioritize Sort if present, as users care about order.

        if (args.sort === "price-asc" || args.sort === "price-desc") {
            q = ctx.db.query("properties").withIndex("by_price");
            if (args.sort === "price-desc") q = q.order("desc");
            else q = q.order("asc");

            // Now apply all filters
            finalQuery = q.filter((q) => q.eq(q.field("isHidden"), false));
            // Apply all filters... (same as above)
            // Repeat filter logic...
            if (args.region) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("region"), args.region));
            if (args.province) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("province"), args.province));
            if (args.town) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("town"), args.town));
            if (args.type) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("type"), args.type));
            if (args.minPrice) finalQuery = finalQuery.filter((q: any) => q.gte(q.field("price"), args.minPrice!));
            if (args.maxPrice) finalQuery = finalQuery.filter((q: any) => q.lte(q.field("price"), args.maxPrice!));
            if (args.minBeds) finalQuery = finalQuery.filter((q: any) => q.gte(q.field("beds"), args.minBeds!));
            if (args.maxBeds) finalQuery = finalQuery.filter((q: any) => q.lte(q.field("beds"), args.maxBeds!));
            if (args.hasPool) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("pool"), true));
            if (args.nearGolf) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("nearGolf"), true));
            if (args.newBuild) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("newBuild"), true));
            if (args.maxBeachDistance) {
                finalQuery = finalQuery.filter((q: any) =>
                    q.and(q.neq(q.field("beachDistance"), undefined), q.lte(q.field("beachDistance"), args.maxBeachDistance!))
                );
            }

        } else if (args.sort === "newest") {
            // No "by_createdAt" index requested in step 1, but we have fields.
            // Assuming implicit default order (often creation time or _creationTime)
            // If we want explicit newest, we should use _creationTime desc
            q = ctx.db.query("properties").order("desc"); // Default is creation time

            finalQuery = q.filter((q: any) => q.eq(q.field("isHidden"), false));
            // Apply filters...
            if (args.region) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("region"), args.region));
            if (args.province) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("province"), args.province));
            if (args.town) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("town"), args.town));
            if (args.type) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("type"), args.type));
            if (args.minPrice) finalQuery = finalQuery.filter((q: any) => q.gte(q.field("price"), args.minPrice!));
            if (args.maxPrice) finalQuery = finalQuery.filter((q: any) => q.lte(q.field("price"), args.maxPrice!));
            if (args.minBeds) finalQuery = finalQuery.filter((q: any) => q.gte(q.field("beds"), args.minBeds!));
            if (args.maxBeds) finalQuery = finalQuery.filter((q: any) => q.lte(q.field("beds"), args.maxBeds!));
            if (args.hasPool) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("pool"), true));
            if (args.nearGolf) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("nearGolf"), true));
            if (args.newBuild) finalQuery = finalQuery.filter((q: any) => q.eq(q.field("newBuild"), true));
            if (args.maxBeachDistance) {
                finalQuery = finalQuery.filter((q: any) =>
                    q.and(q.neq(q.field("beachDistance"), undefined), q.lte(q.field("beachDistance"), args.maxBeachDistance!))
                );
            }

        } else {
            // No sort, use filters for index
            // ... (Logic from the top of the function)
            // Reuse the logic? Just stick to ONE path for simplicity if possible.
            // But without sort, we want to maximize filtering speed by using index.

            // Duplicating filter logic is messy. Let's make a clear choice:
            // Prioritize Region/Town/Prov index if available and no sort.
            if (args.region) q = ctx.db.query("properties").withIndex("by_region", (q: any) => q.eq("region", args.region!));
            else if (args.province) q = ctx.db.query("properties").withIndex("by_province", (q: any) => q.eq("province", args.province!));
            else if (args.town) q = ctx.db.query("properties").withIndex("by_town", (q: any) => q.eq("town", args.town!));
            else if (args.type) q = ctx.db.query("properties").withIndex("by_type", (q: any) => q.eq("type", args.type!));
            else q = ctx.db.query("properties"); // Full scan default

            finalQuery = q.filter((q) => q.eq(q.field("isHidden"), false));

            // Apply remaining filters (check if already applied by index to avoid redundancy, or just apply all safely)
            // Applying eq filter on indexed field is cheap/safe.
            if (args.region) finalQuery = finalQuery.filter(q => q.eq(q.field("region"), args.region));
            if (args.province) finalQuery = finalQuery.filter(q => q.eq(q.field("province"), args.province));
            if (args.town) finalQuery = finalQuery.filter(q => q.eq(q.field("town"), args.town));
            if (args.type) finalQuery = finalQuery.filter(q => q.eq(q.field("type"), args.type));
            if (args.minPrice) finalQuery = finalQuery.filter(q => q.gte(q.field("price"), args.minPrice!));
            if (args.maxPrice) finalQuery = finalQuery.filter(q => q.lte(q.field("price"), args.maxPrice!));
            if (args.minBeds) finalQuery = finalQuery.filter(q => q.gte(q.field("beds"), args.minBeds!));
            if (args.maxBeds) finalQuery = finalQuery.filter(q => q.lte(q.field("beds"), args.maxBeds!));
            if (args.hasPool) finalQuery = finalQuery.filter(q => q.eq(q.field("pool"), true));
            if (args.nearGolf) finalQuery = finalQuery.filter(q => q.eq(q.field("nearGolf"), true));
            if (args.newBuild) finalQuery = finalQuery.filter(q => q.eq(q.field("newBuild"), true));
            if (args.maxBeachDistance) {
                finalQuery = finalQuery.filter(q =>
                    q.and(q.neq(q.field("beachDistance"), undefined), q.lte(q.field("beachDistance"), args.maxBeachDistance!))
                );
            }
        }

        return await finalQuery.paginate(args.pagination);
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
    args: {},
    handler: async (ctx) => {
        // Collect distinct types, logical price ranges, etc.
        // Doing this fully dynamic is expensive.
        const properties = await ctx.db.query("properties").take(1000); // Sample? Or all?
        // Using Take(1000) for performance as an example

        const types = new Set<string>();
        for (const p of properties) {
            types.add(p.type);
        }

        return {
            types: Array.from(types).sort(),
            // can add min/max price dynamically here
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
