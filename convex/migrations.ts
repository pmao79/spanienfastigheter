import { mutation } from "./_generated/server";

export const backfillProperties = mutation({
    args: {},
    handler: async (ctx) => {
        const properties = await ctx.db.query("properties").collect();
        let count = 0;
        for (const prop of properties) {
            const updates: any = {};

            // Check and fill missing fields
            if (prop.isFeatured === undefined) updates.isFeatured = false;
            if (prop.isHidden === undefined) updates.isHidden = false;
            if (prop.createdAt === undefined) updates.createdAt = Date.now();
            if (prop.updatedAt === undefined) updates.updatedAt = Date.now();

            // Also check status if we added it as required? 
            // In step 61, I added status: v.optional(...). So it's fine if missing.

            if (Object.keys(updates).length > 0) {
                await ctx.db.patch(prop._id, updates);
                count++;
            }
        }
        return `Backfilled ${count} properties`;
    },
});

export const backfillUsers = mutation({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db.query("users").collect();
        let count = 0;
        for (const user of users) {
            const updates: any = {};

            if (user.role === undefined) updates.role = "customer";
            if (user.isActive === undefined) updates.isActive = true;
            if (user.createdAt === undefined) updates.createdAt = new Date().toISOString();
            if (user.updatedAt === undefined) updates.updatedAt = new Date().toISOString();

            if (Object.keys(updates).length > 0) {
                await ctx.db.patch(user._id, updates);
                count++;
            }
        }
        return `Backfilled ${count} users`;
    },
});
