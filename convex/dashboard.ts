import { query } from "./_generated/server";

export const getStats = query({
    args: {},
    handler: async (ctx) => {

        // Properties stats
        const activePropertiesCount = (await ctx.db
            .query("properties")
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

        // Pending Reports (Viewings that are completed but typically need a report - checking implementation plan)
        // Ideally we check if a report exists, but simplistic check is 'completed' status without a link to report?
        // Or we just assume recently completed viewings need reports.
        // Let's just fetch the viewings with status 'completed' and let the frontend decide or filtered by those without reports if we had that link.
        // For now, let's just return the latest 5 completed viewings as "Pending Reports" candidates.
        const pendingReportsRaw = await ctx.db.query("viewings")
            .withIndex("by_status", q => q.eq("status", "completed"))
            .take(5);

        const pendingReports = await Promise.all(pendingReportsRaw.map(async (v) => {
            const lead = await ctx.db.get(v.leadId);
            // We want property info too
            const property = v.propertyIds && v.propertyIds.length > 0 ? await ctx.db.get(v.propertyIds[0]) : null;
            return {
                ...v,
                leadName: lead ? `${lead.firstName} ${lead.lastName}` : "Unknown Lead",
                propertyRef: property ? property.ref : "N/A",
                town: property ? property.town : "Unknown"
            };
        }));

        const pendingReportsCount = (await ctx.db.query("viewings")
            .withIndex("by_status", q => q.eq("status", "completed"))
            .collect()).length;

        // Active Deals (Last 5, excluding closed)
        const allDeals = await ctx.db.query("deals").order("desc").collect();
        const activeDealsRaw = allDeals
            .filter(d => d.stage !== "closed_won" && d.stage !== "closed_lost")
            .slice(0, 5);

        const activeDeals = await Promise.all(activeDealsRaw.map(async (deal) => {
            const property = deal.propertyId ? await ctx.db.get(deal.propertyId) : null;
            const assignedTo = deal.assignedToId ? await ctx.db.get(deal.assignedToId) : null;
            return {
                ...deal,
                property,
                assignedTo
            };
        }));

        // === PHASE 6 ADDITIONS ===

        // Upcoming Follow-ups (After-Sales)
        const upcomingFollowUpsRaw = await ctx.db
            .query("customerFollowUps")
            .filter(q => q.eq(q.field("completedAt"), undefined)) // Filter completed
            .collect(); // In-memory filter/sort for now as 'scheduledAt' sort with filter might need index

        // Sort and take 5
        const upcomingFollowUps = upcomingFollowUpsRaw
            .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))
            .slice(0, 5);

        // Recent Mailings
        const recentMailingsRaw = await ctx.db.query("propertyMailings").order("desc").take(5);
        const recentMailings = await Promise.all(recentMailingsRaw.map(async (m) => {
            const lead = await ctx.db.get(m.leadId);
            return {
                ...m,
                leadName: lead ? `${lead.firstName} ${lead.lastName}` : "Unknown"
            };
        }));

        return {
            activePropertiesCount,
            newLeadsCount,
            leadsPerStatus,
            recentActivity,
            upcomingViewings: enrichedViewings,
            pendingReportsCount,
            pendingReports,
            activeDeals,
            upcomingFollowUps,
            recentMailings
        };
    },
});
