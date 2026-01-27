
import { v } from "convex/values";
import { query } from "./_generated/server";

// === SALES REPORTS ===

export const getSalesOverview = query({
    args: {},
    handler: async (ctx) => {
        const deals = await ctx.db.query("deals").collect();

        const closedDeals = deals.filter(d => d.stage === "closed_won");

        const totalRevenue = closedDeals.reduce((sum, d) => sum + (d.agreedPrice || 0), 0);
        const totalDeals = closedDeals.length;
        const avgDealValue = totalDeals > 0 ? totalRevenue / totalDeals : 0;

        // Group by month
        const byMonthMap = new Map<string, { deals: number, revenue: number }>();

        closedDeals.forEach(d => {
            const dateStr = d.completionDate || d.updatedAt; // Fallback
            if (!dateStr) return;

            const date = new Date(dateStr);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            const current = byMonthMap.get(monthKey) || { deals: 0, revenue: 0 };
            current.deals += 1;
            current.revenue += (d.agreedPrice || 0);
            byMonthMap.set(monthKey, current);
        });

        const byMonth = Array.from(byMonthMap.entries())
            .map(([month, stats]) => ({ month, ...stats }))
            .sort((a, b) => a.month.localeCompare(b.month));

        // Group by Property Type (Need to fetch properties efficiently)
        // For MVP/small scale, fetching all is fine. For scale, use denormalization or separate aggregation.
        const byTypeMap = new Map<string, { deals: number, revenue: number }>();

        // We'll need to fetch properties for closed deals.
        // This is N+1, but acceptable for report generation on admin dashboard with < 1000 deals.
        for (const deal of closedDeals) {
            const property = await ctx.db.get(deal.propertyId);
            const type = property?.type || "Unknown";

            const current = byTypeMap.get(type) || { deals: 0, revenue: 0 };
            current.deals += 1;
            current.revenue += (deal.agreedPrice || 0);
            byTypeMap.set(type, current);
        }

        const byPropertyType = Array.from(byTypeMap.entries())
            .map(([type, stats]) => ({ type, ...stats }))
            .sort((a, b) => b.revenue - a.revenue);

        // Group by Region
        const byRegionMap = new Map<string, { deals: number, revenue: number }>();
        for (const deal of closedDeals) {
            const property = await ctx.db.get(deal.propertyId);
            const region = property?.region || property?.province || "Unknown";

            const current = byRegionMap.get(region) || { deals: 0, revenue: 0 };
            current.deals += 1;
            current.revenue += (deal.agreedPrice || 0);
            byRegionMap.set(region, current);
        }

        const byRegion = Array.from(byRegionMap.entries())
            .map(([region, stats]) => ({ region, ...stats }))
            .sort((a, b) => b.revenue - a.revenue);


        return {
            totalRevenue,
            totalDeals,
            avgDealValue,
            conversionRate: deals.length > 0 ? (closedDeals.length / deals.length) * 100 : 0,
            byMonth,
            byPropertyType,
            byRegion
        };
    },
});

// === LEAD ANALYTICS ===

export const getLeadStats = query({
    args: {},
    handler: async (ctx) => {
        const leads = await ctx.db.query("leads").collect();
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

        const totalLeads = leads.length;
        const newThisMonth = leads.filter(l => l.createdAt >= startOfMonth).length;

        // By Status
        const byStatusMap = new Map<string, number>();
        leads.forEach(l => {
            byStatusMap.set(l.status, (byStatusMap.get(l.status) || 0) + 1);
        });
        const byStatus = Array.from(byStatusMap.entries()).map(([status, count]) => ({ status, count }));

        // By Source
        const bySourceMap = new Map<string, number>();
        leads.forEach(l => {
            bySourceMap.set(l.source, (bySourceMap.get(l.source) || 0) + 1);
        });
        const bySource = Array.from(bySourceMap.entries())
            .map(([source, count]) => ({ source, count }))
            .sort((a, b) => b.count - a.count);

        // Funnel stats (Approximation based on status)
        // Lead -> Viewing (status="viewing" or has viewings)
        // Viewing -> Deal (status="negotiation" or has deal)
        // Deal -> Closed (status="won")

        // This is simpler if we just count current status, but for funnel we want historical flow.
        // For MVP, snapshots based on current status is standard.
        const funnel = {
            total: totalLeads,
            viewings: leads.filter(l => ["qualified", "viewing", "negotiation", "won"].includes(l.status)).length,
            deals: leads.filter(l => ["negotiation", "won"].includes(l.status)).length,
            closed: leads.filter(l => l.status === "won").length
        };

        return {
            totalLeads,
            newThisMonth,
            byStatus,
            bySource,
            funnel
        };
    },
});

// === TEAM PERFORMANCE ===

export const getAgentPerformance = query({
    args: {
        startDate: v.optional(v.string()),
        endDate: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const agents = await ctx.db.query("users")
            .filter(q => q.or(
                q.eq(q.field("role"), "agent"),
                q.eq(q.field("role"), "sales_partner"),
                q.eq(q.field("role"), "owner"),
                q.eq(q.field("role"), "admin")
            ))
            .collect();

        // Fetch deals and leads to aggregate
        const allDeals = await ctx.db.query("deals").collect(); // Filter by date if provided
        const allLeads = await ctx.db.query("leads").collect();

        const stats = await Promise.all(agents.map(async (agent) => {
            const agentDeals = allDeals.filter(d => d.assignedToId === agent._id || d.partnerId === agent._id);
            const closedDeals = agentDeals.filter(d => d.stage === "closed_won");

            const revenue = closedDeals.reduce((sum, d) => sum + (d.agreedPrice || 0), 0);

            // Commission calculation would go here if we had the payouts table populated
            // For now, let's estimate or fetch from payouts if available
            const payouts = await ctx.db.query("commissionPayouts")
                .withIndex("by_userId", q => q.eq("userId", agent._id))
                .collect();

            // Filter payouts by date if needed
            const totalCommission = payouts
                .filter(p => p.status === "paid" || p.status === "approved")
                .reduce((sum, p) => sum + p.amount, 0);

            return {
                id: agent._id,
                name: agent.name,
                role: agent.role,
                image: agent.avatar,
                dealsClosed: closedDeals.length,
                revenue,
                commission: totalCommission,
                leadsAssigned: allLeads.filter(l => l.assignedToId === agent._id).length,
            };
        }));

        return stats.sort((a, b) => b.revenue - a.revenue);
    },
});
