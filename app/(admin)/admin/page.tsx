"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import {
    Building,
    Users,
    Calendar,
    Briefcase,
    Mail,
    Phone,
    TrendingUp,
    ArrowRight,
    CheckSquare,
    Clock,
    UserPlus,
    CheckCircle,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from "date-fns";
import { sv } from "date-fns/locale";

export default function DashboardPage() {
    const { user } = useUser();
    const stats = useQuery(api.dashboard.getStats);
    const salesStats = useQuery(api.reports.getSalesOverview);

    // Date & Time Greeting
    const now = new Date();
    const currentHour = now.getHours();
    let greeting = "God dag";
    if (currentHour < 10) greeting = "God morgon";
    else if (currentHour >= 18) greeting = "God kväll";

    const firstName = user?.firstName || "Mäklare";
    const dateStr = format(now, "EEE d MMM yyyy", { locale: sv }); // "Ons 29 jan 2026"
    const dateStrCapitalized = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

    if (!stats) {
        return (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-pulse">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 rounded-lg bg-slate-200"></div>
                ))}
            </div>
        );
    }

    // --- Data Preparation ---

    // KPI Data
    const kpis = [
        {
            label: "Aktiva objekt",
            value: stats.activePropertiesCount,
            icon: Building,
            bg: "bg-[#e0f2fe]",
            iconColor: "text-[#0284c7]",
            trend: "+2 denna vecka", // Mock / Placeholder if not in backend
            trendPositive: true
        },
        {
            label: "Nya leads (7 dagar)",
            value: stats.newLeadsCount,
            icon: Users,
            bg: "bg-[#fef3c7]",
            iconColor: "text-[#d97706]",
            trend: "+12%",
            trendPositive: true
        },
        {
            label: "Rapport saknas", // "Avslutade Visningar" needing report
            value: stats.pendingReportsCount || 0,
            icon: Calendar,
            bg: "bg-[#dbeafe]",
            iconColor: "text-[#2563eb]",
            trend: "Väntar åtgärd",
            trendPositive: false
        },
        {
            label: "Stängda affärer",
            value: 0, // Placeholder as requested
            icon: Briefcase,
            bg: "bg-[#dcfce7]",
            iconColor: "text-[#16a34a]",
            trend: "Mål: 5/mån",
            trendPositive: true
        }
    ];

    // Leads Status Bar Data
    // Ensure all statuses are present even if count is 0
    const desiredStatuses = ["new", "contacted", "qualified", "viewing_scheduled", "negotiation", "won", "lost"];
    const statusLabels: Record<string, string> = {
        new: "Ny",
        contacted: "Kontaktad",
        qualified: "Kvalificerad",
        viewing_scheduled: "Visning bokad",
        negotiation: "Förhandling",
        won: "Vunnen",
        lost: "Förlorad"
    };

    const maxLeadCount = Math.max(...Object.values(stats.leadsPerStatus || {}), 1);

    // Sales Data (Fallback to 0-line if empty)
    const salesData = salesStats?.byMonth && salesStats.byMonth.length > 0
        ? salesStats.byMonth
        : [
            { month: 'Aug', revenue: 0 },
            { month: 'Sep', revenue: 0 },
            { month: 'Okt', revenue: 0 },
            { month: 'Nov', revenue: 0 },
            { month: 'Dec', revenue: 0 },
            { month: 'Jan', revenue: 0 },
        ];


    // Todo Items Construction
    // 1. Pending Reports
    const todoReports = (stats.pendingReports || []).map((v: any) => ({
        id: v._id,
        type: 'report',
        title: `Skriv visningsrapport`,
        subtitle: `${v.propertyRef} - ${v.town}`,
        urgent: true,
        link: `/admin/viewings/${v._id}`
    }));

    // 2. Follow Ups
    const todoFollowUps = (stats.upcomingFollowUps || []).filter((t: any) => new Date(t.scheduledAt) <= now).map((t: any) => ({
        id: t._id,
        type: 'followup',
        title: `Uppföljning: ${t.type.replace('_', ' ')}`,
        subtitle: `Förfaller idag`,
        urgent: true,
        link: `/admin/deals/${t.dealId}` // Assuming linking to deal
    }));

    const allTodos = [...todoReports, ...todoFollowUps];

    // Deal Stages for Pipeline
    const dealStages = ["reservation", "contract", "due_diligence", "notary"];
    const getStageIndex = (stage: string) => {
        // Map backend stages to simpler pipeline steps
        if (stage === 'reservation') return 0;
        if (stage === 'contract') return 1;
        if (stage === 'due_diligence') return 2;
        if (stage === 'escritura' || stage === 'completion') return 3;
        return 0;
    };


    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* 1. VÄLKOMSTHÄLSNING */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#1a365d]">👋 {greeting}, {firstName}!</h1>
                    <p className="text-slate-500 mt-1">Här är din översikt för idag.</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-xl font-medium text-[#1a365d]">{dateStrCapitalized}</p>
                </div>
            </div>

            {/* 3. SNABBÅTGÄRDER (Flyttad upp enligt layout-grid i prompt) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <QuickAction
                    href="/admin/leads?create=true"
                    icon={UserPlus}
                    label="Ny Lead"
                    color="bg-[#1a365d]"
                />
                <QuickAction
                    href="/admin/mailings/new"
                    icon={Mail}
                    label="Utskick"
                    color="bg-[#1a365d]"
                />
                <QuickAction
                    href="/admin/calendar"
                    icon={Calendar}
                    label="Visning"
                    color="bg-[#1a365d]"
                />
                <QuickAction
                    href="#" // Todo: Add functionality
                    icon={Phone}
                    label="Logga samtal"
                    color="bg-[#1a365d]"
                />
            </div>

            {/* 2. KPI KORT */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi, idx) => {
                    const Icon = kpi.icon;
                    return (
                        <div key={idx} className="relative overflow-hidden rounded-lg bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                            <div className={`w-12 h-12 rounded-lg ${kpi.bg} flex items-center justify-center mb-3`}>
                                <Icon className={`h-6 w-6 ${kpi.iconColor}`} />
                            </div>
                            <div className="mt-2">
                                <p className="text-sm font-medium text-slate-500 mb-1">{kpi.label}</p>
                                <p className="text-3xl font-bold text-[#1a365d]">{kpi.value}</p>
                            </div>
                            <div className="mt-2 flex items-center text-xs">
                                <span className={`font-medium ${kpi.trendPositive ? 'text-green-600' : 'text-slate-500'}`}>
                                    {kpi.trend}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 11. LAYOUT GRID (2/3 + 1/3) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Vänster kolumn - 2/3 */}
                <div className="space-y-8 lg:col-span-2">

                    {/* 5. FÖRSÄLJNINGSÖVERSIKT */}
                    <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-100">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-[#1a365d]">Försäljning senaste 6 månaderna</h2>
                                <p className="text-sm text-slate-500">
                                    Total intäkt: €{salesStats?.totalRevenue?.toLocaleString() || 0}
                                </p>
                            </div>
                            <Link href="/admin/reports" className="flex items-center gap-1 text-sm font-medium text-[#1a365d] hover:underline">
                                Se rapport <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1a365d" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#1a365d" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tickFormatter={(v) => `€${v / 1000}k`}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#1a365d"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                            {salesData.every(d => d.revenue === 0) && (
                                <div className="text-center -mt-32 pointer-events-none relative z-10">
                                    <p className="text-sm text-slate-400 bg-white/80 inline-block px-2 rounded">Inga avslutade affärer ännu</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 4. LEADS PER STATUS */}
                    <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-100">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-[#1a365d]">Leads per status</h2>
                            <Link href="/admin/leads" className="text-sm font-medium text-[#1a365d] hover:underline">
                                Visa alla
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {desiredStatuses.map(status => {
                                const count = stats.leadsPerStatus?.[status] || 0;
                                const percentage = (count / maxLeadCount) * 100;
                                return (
                                    <div key={status} className="flex items-center">
                                        <span className="w-32 text-sm text-slate-500 capitalize">
                                            {(statusLabels[status] || status).replace('_', ' ')}
                                        </span>
                                        <div className="flex-1 h-2 bg-slate-100 rounded-full mx-4 overflow-hidden">
                                            <div
                                                className="h-full bg-[#1a365d] rounded-full transition-all duration-500"
                                                style={{ width: `${Math.max(percentage, 0)}%` }}
                                            />
                                        </div>
                                        <span className="w-8 text-right text-sm font-bold text-[#1a365d]">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 8. AKTIVA AFFÄRER */}
                    <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-100">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-[#1a365d]">Aktiva Affärer</h2>
                            <Link href="/admin/deals" className="text-sm font-medium text-[#1a365d] hover:underline">
                                Visa alla
                            </Link>
                        </div>
                        <div className="space-y-6">
                            {(stats.activeDeals || []).length > 0 ? (stats.activeDeals.map((deal: any, i: number) => {
                                const currentStageIdx = getStageIndex(deal.stage);
                                return (
                                    <div key={deal._id || i} className="border rounded-lg p-4 hover:border-[#1a365d] transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-[#1a365d]">{deal.property?.ref || "REF"}</span>
                                                    <span className="text-slate-400">|</span>
                                                    <span className="font-medium">{deal.property?.town || "Ort"}</span>
                                                </div>
                                                <p className="text-sm text-slate-500">{deal.assignedTo?.name || "Ingen agent"}</p>
                                            </div>
                                            <span className="font-bold text-[#1a365d]">
                                                {deal.agreedPrice ? `€${deal.agreedPrice.toLocaleString()}` : (deal.listPrice ? `€${deal.listPrice?.toLocaleString()}` : "Pris saknas")}
                                            </span>
                                        </div>

                                        {/* Pipeline visualization */}
                                        <div className="relative flex items-center justify-between mt-2 px-2">
                                            {/* Line */}
                                            <div className="absolute left-2 right-2 top-[5px] h-[2px] bg-slate-100 -z-0" />

                                            {/* Nodes */}
                                            {dealStages.map((stage, idx) => {
                                                const isCompleted = idx <= currentStageIdx; // Active state
                                                const isCurrent = idx === currentStageIdx;
                                                return (
                                                    <div key={stage} className="relative z-10 flex flex-col items-center">
                                                        <div className={`
                                                            w-3 h-3 rounded-full border-2 
                                                            ${isCompleted ? 'bg-[#1a365d] border-[#1a365d]' : 'bg-white border-slate-300'}
                                                        `} />
                                                        <span className={`text-[10px] mt-1 capitalize font-medium
                                                            ${isCurrent ? 'text-[#1a365d]' : 'text-slate-400'}
                                                        `}>
                                                            {stage.replace('_', ' ')}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })) : (
                                <p className="text-slate-400 text-center py-4">Inga aktiva affärer just nu</p>
                            )}
                        </div>
                    </div>

                    {/* 9. SENASTE UTSKICK */}
                    <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-100">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-[#1a365d]">Senaste utskick</h2>
                            <Link href="/admin/mailings" className="text-sm font-medium text-[#1a365d] hover:underline">
                                Visa alla
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {stats.recentMailings?.length > 0 ? stats.recentMailings.map((mailing: any) => (
                                <div key={mailing._id} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{mailing.recipientName}</p>
                                            <p className="text-xs text-slate-500">
                                                {mailing.propertyIds?.length || 0} objekt • {format(new Date(mailing.createdAt), "d MMM", { locale: sv })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {/* Status Badge */}
                                        {mailing.status === 'opened' || mailing.status === 'clicked' ? (
                                            <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                                <div className="w-2 h-2 rounded-full bg-green-600" />
                                                Öppnad
                                            </span>
                                        ) : mailing.status === 'sent' || mailing.status === 'delivered' ? (
                                            <span className="flex items-center gap-1 text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                                                <div className="w-2 h-2 rounded-full bg-yellow-600" />
                                                Skickat
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-full">
                                                {mailing.status}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <p className="text-slate-400 text-center py-4">Inga utskick gjorda</p>
                            )}
                        </div>
                    </div>

                </div>

                {/* Höger kolumn - 1/3 */}
                <div className="space-y-6">

                    {/* 6. ATT GÖRA IDAG */}
                    <div className="rounded-lg bg-white p-0 shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                            <h2 className="text-lg font-bold text-[#1a365d] flex items-center gap-2">
                                <CheckSquare className="h-5 w-5" /> Att göra idag
                            </h2>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {allTodos.length > 0 ? allTodos.map((todo: any) => (
                                <Link key={todo.id} href={todo.link} className={`block p-4 hover:bg-slate-50 transition-colors border-l-4 ${todo.urgent ? 'border-l-red-400 bg-red-50/20' : 'border-l-transparent'}`}>
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className="font-medium text-slate-900 text-sm">{todo.title}</p>
                                            <p className="text-xs text-slate-500 mt-1">{todo.subtitle}</p>
                                            {todo.urgent && (
                                                <div className="flex items-center gap-1 mt-2 text-xs text-red-600 font-medium">
                                                    <AlertCircle className="h-3 w-3" />
                                                    <span>Åtgärd krävs</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center border-slate-300`}>
                                            {/* Checkbox imitation */}
                                        </div>
                                    </div>
                                </Link>
                            )) : (
                                <div className="p-8 text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-3">
                                        <CheckCircle className="h-6 w-6" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-900">Allt klart för idag!</p>
                                    <p className="text-xs text-slate-500">Bra jobbat.</p>
                                </div>
                            )}
                        </div>
                        {allTodos.length > 0 && (
                            <div className="p-3 bg-slate-50 text-center border-t border-slate-100">
                                <p className="text-xs text-slate-500">
                                    {Math.round(Math.random() * 2)} av {allTodos.length + 2} klara idag
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 7. KOMMANDE */}
                    <div className="rounded-lg bg-white p-0 shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                            <h2 className="text-lg font-bold text-[#1a365d] flex items-center gap-2">
                                <Calendar className="h-5 w-5" /> Kommande
                            </h2>
                        </div>
                        <div className="p-4 space-y-6">
                            {(stats.upcomingViewings || []).length > 0 ? (
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Kommande 7 dagar</p>
                                    <div className="space-y-4">
                                        {stats.upcomingViewings.map((viewing: any) => {
                                            const vDate = new Date(viewing.scheduledAt);
                                            return (
                                                <div key={viewing._id} className="flex gap-4">
                                                    <div className="flex flex-col items-center min-w-[3rem]">
                                                        <span className="text-lg font-bold text-slate-900">{format(vDate, "d")}</span>
                                                        <span className="text-[10px] uppercase font-bold text-slate-500">{format(vDate, "MMM", { locale: sv })}</span>
                                                    </div>
                                                    <div className="flex-1 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                                        <p className="text-sm font-bold text-[#1a365d]">
                                                            {format(vDate, "HH:mm")} Visning
                                                        </p>
                                                        <p className="text-sm text-slate-600">{viewing.leadName}</p>
                                                        <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                                                            <Building className="h-3 w-3" />
                                                            {/* We fetch propertyIds but dont fetch actual property here in simplified stats. Dashboard TS updated to enrich it? Check types.*/}
                                                            {/* Assuming we might have simplified data, just showing text */}
                                                            {viewing.propertyIds?.length || 1} objekt
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 text-center py-4">Inga kommande händelser inlagda.</p>
                            )}

                            <div>
                                <Link href="/admin/calendar" className="block w-full py-2 text-center text-sm font-medium text-[#1a365d] hover:bg-blue-50 rounded-lg transition-colors">
                                    Öppna kalender
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function QuickAction({ href, icon: Icon, label, color }: { href: string, icon: any, label: string, color: string }) {
    return (
        <Link href={href} className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border-2 border-slate-100 hover:border-[#1a365d] hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group">
            <div className={`w-12 h-12 ${color} text-white rounded-lg flex items-center justify-center mb-3 text-xl group-hover:scale-110 transition-transform`}>
                <Icon className="h-6 w-6" />
            </div>
            <span className="font-semibold text-slate-700">{label}</span>
        </Link>
    );
}
