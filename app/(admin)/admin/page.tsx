"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    Building,
    Users,
    Calendar,
    Briefcase,
    Plus,
    RefreshCcw,
    ArrowRight,
    Activity,
    Clock,
    TrendingUp
} from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
    const stats = useQuery(api.dashboard.getStats);
    const myTasks = useQuery(api.tasks.getMyTasks);
    const salesStats = useQuery(api.reports.getSalesOverview);

    if (!stats) {
        return (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-pulse">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 rounded-lg bg-slate-200"></div>
                ))}
            </div>
        );
    }

    const kpis = [
        {
            label: "Aktiva objekt",
            value: stats.activePropertiesCount,
            icon: Building,
            color: "bg-blue-500",
            trend: "+2 denna vecka" // Placeholder
        },
        {
            label: "Nya leads (7 dagar)",
            value: stats.newLeadsCount,
            icon: Users,
            color: "bg-green-500",
            trend: "+12%" // Placeholder
        },
        {
            label: "Avslutade Visningar",
            value: stats.pendingReportsCount || 0,
            icon: Calendar,
            color: "bg-orange-500",
            trend: "Väntar på rapport"
        },
        {
            label: "Stängda affärer",
            value: 0, // Placeholder
            icon: Briefcase,
            color: "bg-purple-500",
            trend: "Mål: 5/mån"
        }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500">Översikt över fastigheter och leads</p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi, idx) => {
                    const Icon = kpi.icon;
                    return (
                        <div key={idx} className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
                                    <p className="mt-2 text-3xl font-bold text-slate-900">{kpi.value}</p>
                                </div>
                                <div className={`rounded-xl p-3 ${kpi.color} bg-opacity-10`}>
                                    <Icon className={`h-6 w-6 ${kpi.color.replace('bg-', 'text-')}`} />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs text-slate-500">
                                <span className="font-medium text-green-600">{kpi.trend}</span>
                                <span className="ml-2">senaste månaden</span>
                            </div>
                        </div>
                    );
                })}
            </div>



            {/* Sales Chart Mobile/Desktop */}
            {
                salesStats && (
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Försäljningsöversikt</h2>
                                <p className="text-sm text-slate-500">Intäkter: €{salesStats.totalRevenue.toLocaleString()}</p>
                            </div>
                            <Link href="/admin/reports" className="flex items-center gap-1 text-sm font-medium text-[#1a365d] hover:underline">
                                Se rapport <TrendingUp className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesStats.byMonth}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1a365d" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#1a365d" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="month" hide />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="revenue" stroke="#1a365d" fillOpacity={1} fill="url(#colorRevenue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )
            }

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Content Area: Leads Chart & My Tasks */}
                <div className="space-y-8 lg:col-span-2">
                    {/* Leads Chart */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-900">Leads per status</h2>
                            <Link href="/admin/leads" className="text-sm font-medium text-[#1a365d] hover:underline">
                                Visa alla
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {Object.entries(stats.leadsPerStatus || {}).map(([status, count]) => {
                                const max = Math.max(...Object.values(stats.leadsPerStatus));
                                const percentage = (count / (max || 1)) * 100;

                                return (
                                    <div key={status} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="capitalize font-medium text-slate-700">{status.replace('_', ' ')}</span>
                                            <span className="text-slate-500">{count}</span>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                            <div
                                                className="h-full rounded-full bg-[#1a365d] transition-all duration-500"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )
                            })}

                            {Object.keys(stats.leadsPerStatus || {}).length === 0 && (
                                <div className="flex h-40 items-center justify-center text-slate-400">
                                    Inga leads att visa
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Active Deals Widget */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-900">Aktiva Affärer</h2>
                            <Link href="/admin/deals" className="text-sm font-medium text-[#1a365d] hover:underline">
                                Visa alla
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {stats.activeDeals?.map((deal: any) => (
                                <Link key={deal._id} href={`/admin/deals/${deal._id}`} className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs ring-1 ring-blue-100">
                                            {deal.property?.ref || "REF"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 line-clamp-1">
                                                {deal.property?.town || "Okänd ort"} - {deal.stage.replace('_', ' ')}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {deal.agreedPrice?.toLocaleString()} EUR
                                            </p>
                                        </div>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-slate-300" />
                                </Link>
                            ))}
                            {(!stats.activeDeals || stats.activeDeals.length === 0) && (
                                <p className="text-sm text-slate-400 py-4 text-center">Inga aktiva affärer</p>
                            )}
                        </div>
                    </div>

                    {/* My Tasks Widget */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-900">Mina uppgifter</h2>
                            <Link href="/admin/tasks" className="text-sm font-medium text-[#1a365d] hover:underline">
                                Hantera
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {myTasks?.slice(0, 5).map((task) => (
                                <div key={task._id} className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-slate-50">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-2 w-2 rounded-full ${task.priority === 'urgent' ? 'bg-red-500' :
                                            task.priority === 'high' ? 'bg-orange-400' : 'bg-blue-400'
                                            }`} />
                                        <span className="text-sm font-medium text-slate-700">{task.title}</span>
                                    </div>
                                    <span className="text-xs text-slate-500">
                                        {task.dueAt ? new Date(task.dueAt).toLocaleDateString() : ''}
                                    </span>
                                </div>
                            ))}
                            {(!myTasks || myTasks.length === 0) && (
                                <p className="text-sm text-slate-400 py-4 text-center">Inga aktiva uppgifter</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Activity & Actions */}
                <div className="space-y-8">
                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/admin/leads?create=true" className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white p-4 shadow-sm transition-colors hover:bg-slate-50">
                            <div className="rounded-full bg-blue-50 p-3 text-blue-600">
                                <Plus className="h-6 w-6" />
                            </div>
                            <span className="text-sm font-medium text-slate-700">Ny Lead</span>
                        </Link>
                        <button className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white p-4 shadow-sm transition-colors hover:bg-slate-50">
                            <div className="rounded-full bg-orange-50 p-3 text-orange-600">
                                <RefreshCcw className="h-6 w-6" />
                            </div>
                            <span className="text-sm font-medium text-slate-700">Synka Objekt</span>
                        </button>
                    </div>

                    {/* Upcoming Viewings Widget */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-900">Kommande visningar</h2>
                            <Link href="/admin/calendar" className="text-sm font-medium text-[#1a365d] hover:underline">
                                Kalender
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {stats.upcomingViewings?.map((viewing: any) => (
                                <div key={viewing._id} className="flex items-start gap-3 rounded-lg border border-slate-100 p-3">
                                    <div className="flex h-10 w-10 flex-col items-center justify-center rounded bg-blue-50 text-blue-700">
                                        <span className="text-xs font-bold">{new Date(viewing.scheduledAt).getDate()}</span>
                                        <span className="text-[10px] uppercase">{new Date(viewing.scheduledAt).toLocaleString('default', { month: 'short' })}</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-slate-900">{viewing.leadName}</p>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Clock className="h-3 w-3" />
                                            {new Date(viewing.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                    <span className={`rounded px-1.5 py-0.5 text-[10px] uppercase font-bold
                                        ${viewing.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}
                                    `}>
                                        {viewing.status === 'confirmed' ? 'OK' : 'Bokad'}
                                    </span>
                                </div>
                            ))}
                            {(!stats.upcomingViewings || stats.upcomingViewings.length === 0) && (
                                <p className="text-sm text-slate-400">Inga kommande visningar</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-bold text-slate-900">Senaste aktivitet</h2>
                        <div className="space-y-6">
                            {stats.recentActivity.map((activity: any, idx: number) => (
                                <div key={idx} className="relative pl-6">
                                    <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-slate-300"></div>
                                    {idx !== stats.recentActivity.length - 1 && (
                                        <div className="absolute left-[3.5px] top-4 h-full w-[1px] bg-slate-200"></div>
                                    )}
                                    <div className="text-sm">
                                        <p className="font-medium text-slate-900">{activity.description}</p>
                                        <p className="text-xs text-slate-500">
                                            {new Date(activity.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {stats.recentActivity.length === 0 && (
                                <p className="text-sm text-slate-400">Ingen aktivitet registrerad</p>
                            )}
                        </div>
                        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                            Visa historik <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}
