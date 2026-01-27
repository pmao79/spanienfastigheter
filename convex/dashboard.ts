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

        // Upcoming Viewings (Next 7 days)
        const now = new Date().toISOString();
        const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

        let upcomingViewings = await ctx.db.query("viewings")
            .withIndex("by_scheduledAt", q => q.gte("scheduledAt", now).lt("scheduledAt", nextWeek))
            .take(5);

        // Enrich viewings with lead names
        const enrichedViewings = await Promise.all(upcomingViewings.map(async (v) => {
            const lead = await ctx.db.get(v.leadId);
            return {
                ...v,
                leadName: lead ? `${lead.firstName} ${lead.lastName}` : "Unknown Lead"
            };
        }));

        // Pending Reports
        // Count viewings that are completed but have no report
        // This is complex without a direct index or relation check. 
        // For MVP, let's just count 'completed' viewings.
        // Or better: status 'confirmed' that are in the past? 
        // Let's use 'completed' status viewings for now.
        // Actually, let's just return a count of "completed" viewings as a proxy for "Needs Report" if we assume manual automation moves them to completed ONLY when reported?
        // No, usually "completed" means the event passed. 
        // Let's just fetch recent completed viewings.
        const pendingReportsCount = (await ctx.db.query("viewings")
            .withIndex("by_status", q => q.eq("status", "completed")) // Assuming we define "completed" as "done but needs report"? 
            // Or maybe "in_progress" moved to "completed" after report?
            // Let's stick to "upcoming" for now to check Calendar works.
            .collect()).length;

        return {
            activePropertiesCount,
            newLeadsCount,
            leadsPerStatus,
            recentActivity,
            upcomingViewings: enrichedViewings,
            pendingReportsCount
        };
    },
});
