import { query } from "./_generated/server";

export const getStats = query({
    args: {},
    handler: async (ctx) => {

        // Properties stats
        // Note: This is efficient only for small datasets or if appropriate indexes are used.
        // For large datasets, we might need to denormalize counts.
        const activePropertiesCount = (await ctx.db
            .query("properties")
            // We'd ideally need an index on status if we tracked it explicitly as 'status' field.
            // Schema has isHidden, but prompt said "status='active'". 
            // Based on prompt, properties doesn't have a status field in the schema provided in Del 1,
            // but Del 5 mentions "Status (active, reserved, sold, paused)".
            // Wait, the schema I added in Del 1 only has isFeatured, isHidden.
            // Let's assume !isHidden is active for now, or check if specific status field was requested in schema update?
            // Checking schema update instruction: it was "users" and "leads". 
            // Properties table was existing.
            // Del 5 says "Tabell med alla objekt... Status (badge)".
            // Del 5 Filter says "Status (active, reserved, sold, paused)".
            // I should probably add a status field to properties if it doesn't exist?
            // But schema provided in Del 1 didn't explicitly ask to modify properties table except implied existance.
            // Let's stick to what we have: isHidden? 
            // Actually, let's count all non-hidden properties as active for this MVP step.
            .filter(q => q.eq(q.field("isHidden"), false))
            .collect()).length;


        // Leads stats
        const allLeads = await ctx.db.query("leads").collect();
        // New leads this week
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const oneWeekAgoStr = oneWeekAgo.toISOString();

        const newLeadsCount = allLeads.filter(l => l.createdAt > oneWeekAgoStr).length;

        // Leads per status
        const leadsPerStatus = allLeads.reduce((acc, lead) => {
            acc[lead.status] = (acc[lead.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        // Recent activity
        const recentActivity = await ctx.db.query("activityLog").order("desc").take(5);

        return {
            activePropertiesCount,
            newLeadsCount,
            leadsPerStatus,
            recentActivity
        };
    },
});
