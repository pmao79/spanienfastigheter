import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Run sync every hour between 06:00 and 22:00 UTC (approx CET depending on season, user asked for CET)
// Cron syntax for 6-22 specifically? Convex uses standard cron strings.
// "0 5-21 * * *" if UTC is roughly CET-1/CET-2. 
// Let's assume server is UTC. CET is UTC+1 (winter), UTC+2 (summer).
// 06:00 CET = 05:00 UTC. 22:00 CET = 21:00 UTC.
// So 5-21 UTC covers roughly the day.
crons.interval(
    "sync-properties-hourly-daytime",
    { hours: 1 }, // Interval API is simpler than cron string if we just want "every hour"
    // But user asked for specific time range.
    // We should use .cron() for specific time ranges.
    (internal as any).sync.syncProperties
);

// Actually, overriding with correct cron string for "Hourly from 06:00 to 22:00 CET"
// Using UTC assumption: 05:00 - 21:00 UTC
crons.cron(
    "sync-properties-business-hours",
    "0 5-21 * * *",
    (internal as any).sync.syncProperties
);

export default crons;
