import { v } from "convex/values";
import { query } from "./_generated/server";

export const getEvents = query({
    args: {
        start: v.string(), // ISO Date
        end: v.string(),   // ISO Date
        assignedToId: v.optional(v.id("users"))
    },
    handler: async (ctx, args) => {
        // 1. Fetch VIEWINGS
        const viewingsQuery = ctx.db.query("viewings")
            .withIndex("by_scheduledAt", (q) =>
                q.gte("scheduledAt", args.start).lte("scheduledAt", args.end)
            );

        let viewings = await viewingsQuery.collect();
        if (args.assignedToId) {
            viewings = viewings.filter(v => v.assignedToId === args.assignedToId);
        }

        const enrichedViewings = await Promise.all(viewings.map(async (v) => {
            const lead = await ctx.db.get(v.leadId);
            const assignedTo = await ctx.db.get(v.assignedToId);
            const property = v.propertyIds && v.propertyIds.length > 0
                ? await ctx.db.get(v.propertyIds[0])
                : null;

            return {
                _id: v._id,
                type: 'viewing',
                title: property ? property.town : 'Visning', // Fallback title
                start: v.scheduledAt,
                end: new Date(new Date(v.scheduledAt).getTime() + (v.estimatedDuration || 60) * 60000).toISOString(),
                status: v.status,
                lead: lead ? { ...lead } : null,
                property: property ? {
                    ...property,
                    fullTitle: property.town,
                    location: property.locationDetail || property.town,
                    features: [
                        property.beds ? `${property.beds} sov` : null,
                        property.built ? `${property.built}m²` : null,
                        property.pool ? 'Pool' : null
                    ].filter(Boolean).join(' • ')
                } : null,
                assignedTo,
                meetingPoint: v.meetingPoint
            };
        }));

        // 2. Fetch TASKS (Deadlines)
        const tasksQuery = ctx.db.query("tasks")
            .withIndex("by_dueAt", (q) =>
                q.gte("dueAt", args.start).lte("dueAt", args.end)
            );

        let tasks = await tasksQuery.collect();
        if (args.assignedToId) {
            tasks = tasks.filter(t => t.assignedToId === args.assignedToId);
        }

        const enrichedTasks = await Promise.all(tasks.map(async (t) => {
            const lead = t.leadId ? await ctx.db.get(t.leadId) : null;
            const property = t.propertyId ? await ctx.db.get(t.propertyId) : null;
            const assignedTo = t.assignedToId ? await ctx.db.get(t.assignedToId) : null;

            return {
                _id: t._id,
                type: 'deadline',
                title: t.title,
                start: t.dueAt!,
                end: new Date(new Date(t.dueAt!).getTime() + 60 * 60000).toISOString(), // Default 1h
                status: t.status,
                lead,
                property: property ? {
                    ...property,
                    fullTitle: property.town,
                    location: property.locationDetail || property.town,
                    features: [
                        property.beds ? `${property.beds} sov` : null,
                        property.built ? `${property.built}m²` : null
                    ].filter(Boolean).join(' • ')
                } : null,
                assignedTo,
                description: t.description
            };
        }));

        // 3. Fetch DEALS (Notary/Escritura)
        // Deals don't have a date index, so we fetch active ones and filter in memory.
        // Or restrict to 'escritura' stage if we only care about that, but deadlines exist in other stages.
        // We look for 'escrituraDate' specifically for "Notary" events.

        let deals = await ctx.db.query("deals").collect(); // Potentially heavy, but assuming low volume for now.

        if (args.assignedToId) {
            deals = deals.filter(d => d.assignedToId === args.assignedToId);
        }

        const dealEvents = await Promise.all(deals
            .filter(d => d.escrituraDate && d.escrituraDate >= args.start && d.escrituraDate <= args.end)
            .map(async (d) => {
                const lead = await ctx.db.get(d.leadId);
                const property = await ctx.db.get(d.propertyId);
                const assignedTo = d.assignedToId ? await ctx.db.get(d.assignedToId) : null;

                return {
                    _id: d._id,
                    type: 'notary',
                    title: `Notarie: ${d.notaryName || 'Okänd'}`,
                    start: d.escrituraDate!,
                    end: new Date(new Date(d.escrituraDate!).getTime() + 120 * 60000).toISOString(), // Default 2h
                    status: 'confirmed',
                    lead,
                    property: property ? {
                        ...property,
                        fullTitle: property.town,
                        location: property.locationDetail || property.town,
                        features: [
                            property.beds ? `${property.beds} sov` : null,
                            property.built ? `${property.built}m²` : null
                        ].filter(Boolean).join(' • ')
                    } : null,
                    assignedTo,
                    meetingPoint: d.notaryAddress
                };
            })
        );


        // Combine and Sort
        const allEvents = [
            ...enrichedViewings,
            ...enrichedTasks,
            ...dealEvents
        ].sort((a, b) => a.start.localeCompare(b.start));

        return allEvents;
    }
});
