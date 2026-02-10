
"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    Download,
    TrendingUp,
    Users,
    Briefcase,
    Calendar,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Loader2
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { exportToExcel, exportToPDF } from "@/lib/exports";

const COLORS = ['#1a365d', '#22c55e', '#eab308', '#ef4444', '#6b7280'];

export default function ReportsPage() {
    const [activeTab, setActiveTab] = useState("sales");
    const [dateRange, setDateRange] = useState("this_month");

    // Fetch Data
    const salesStats = useQuery(api.reports.getSalesOverview);
    const leadStats = useQuery(api.reports.getLeadStats);
    const agentStats = useQuery(api.reports.getAgentPerformance, {});

    if (!salesStats || !leadStats) {
        return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-slate-400" /></div>;
    }

    // Export Handlers
    const handleExportExcel = () => {
        if (activeTab === "sales") {
            const data = salesStats.byMonth; // Example
            exportToExcel(data, "sales_report");
        } else if (activeTab === "leads") {
            exportToExcel(leadStats.bySource, "lead_source_report");
        } else if (activeTab === "team" && agentStats) {
            exportToExcel(agentStats, "agent_performance_report");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Rapporter</h1>
                    <p className="text-slate-500">Analys och statistik för verksamheten</p>
                </div>
                <div className="flex gap-2">
                    <select
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                    >
                        <option value="this_month">Denna månad</option>
                        <option value="last_month">Förra månaden</option>
                        <option value="this_year">Detta år</option>
                    </select>
                    <button
                        onClick={handleExportExcel}
                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
                    >
                        <Download className="h-4 w-4" />
                        Exportera Excel
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <KpiCard
                    title="Total Försäljning"
                    value={`€${salesStats.totalRevenue.toLocaleString()}`}
                    change="+23%"
                    trend="up"
                    icon={TrendingUp}
                />
                <KpiCard
                    title="Nya Leads"
                    value={leadStats.newThisMonth.toString()}
                    change="+15%"
                    trend="up"
                    icon={Users}
                />
                <KpiCard
                    title="Slutförda Affärer"
                    value={salesStats.totalDeals.toString()}
                    change="-5%"
                    trend="down"
                    icon={Briefcase}
                />
                <KpiCard
                    title="Konvertering"
                    value={`${salesStats.conversionRate.toFixed(1)}%`}
                    change="+2.1%"
                    trend="up"
                    icon={Filter}
                />
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8">
                    {["sales", "leads", "team"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                border-b-2 py-4 px-1 text-sm font-medium
                                ${activeTab === tab
                                    ? "border-[#1a365d] text-[#1a365d]"
                                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"}
                            `}
                        >
                            {tab === "sales" ? "Försäljning" : tab === "leads" ? "Leads & Tratt" : "Team Performance"}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">

                {/* SALES TAB */}
                {activeTab === "sales" && (
                    <>
                        {/* Revenue Chart */}
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-base font-semibold text-slate-900">Försäljning per månad</h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={salesStats.byMonth}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="revenue" fill="#1a365d" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {/* Sales by Region */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-base font-semibold text-slate-900">Försäljning per Region</h3>
                                <div className="space-y-4">
                                    {salesStats.byRegion.slice(0, 5).map((item, index) => (
                                        <div key={index}>
                                            <div className="mb-1 flex justify-between text-sm">
                                                <span className="font-medium text-slate-700">{item.region}</span>
                                                <span className="text-slate-900">€{item.revenue.toLocaleString()}</span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                                <div
                                                    className="h-full bg-[#1a365d]"
                                                    style={{ width: `${(item.revenue / salesStats.totalRevenue) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Sales by Type */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-base font-semibold text-slate-900">Försäljning per Typ</h3>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={salesStats.byPropertyType}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                paddingAngle={5}
                                                dataKey="revenue"
                                            >
                                                {salesStats.byPropertyType.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="mt-4 flex flex-wrap justify-center gap-4">
                                    {salesStats.byPropertyType.slice(0, 4).map((entry, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                            <span className="text-xs text-slate-600">{entry.type}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* LEADS TAB */}
                {activeTab === "leads" && (
                    <>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {/* Funnel */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-base font-semibold text-slate-900">Konverteringstratt</h3>
                                <div className="space-y-6">
                                    <FunnelStage label="Total Leads" count={leadStats.funnel.total} percent={100} color="bg-blue-100" barColor="bg-blue-500" />
                                    <FunnelStage label="Visningar" count={leadStats.funnel.viewings} percent={(leadStats.funnel.viewings / leadStats.funnel.total) * 100} color="bg-indigo-100" barColor="bg-indigo-500" />
                                    <FunnelStage label="Deals" count={leadStats.funnel.deals} percent={(leadStats.funnel.deals / leadStats.funnel.total) * 100} color="bg-purple-100" barColor="bg-purple-500" />
                                    <FunnelStage label="Stängda" count={leadStats.funnel.closed} percent={(leadStats.funnel.closed / leadStats.funnel.total) * 100} color="bg-green-100" barColor="bg-green-500" />
                                </div>
                            </div>

                            {/* Sources */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-base font-semibold text-slate-900">Leads per Källa</h3>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={leadStats.bySource} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                            <XAxis type="number" />
                                            <YAxis dataKey="source" type="category" width={100} />
                                            <Tooltip />
                                            <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* TEAM TAB */}
                {activeTab === "team" && agentStats && (
                    <div className="rounded-lg bg-white shadow-sm overflow-hidden">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Agent</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Roll</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Leads</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Stängda</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Intäkt</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Provision</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {agentStats.map((agent: any) => (
                                    <tr key={agent.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                                    {agent.name.charAt(0)}
                                                </div>
                                                <div className="ml-3 font-medium text-slate-900">{agent.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 capitalize">{agent.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-right">{agent.leadsAssigned}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-right">{agent.dealsClosed}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium text-right">€{agent.revenue.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium text-right">€{agent.commission.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

function KpiCard({ title, value, change, trend, icon: Icon }: any) {
    return (
        <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
                </div>
                <div className="rounded-full bg-slate-50 p-3">
                    <Icon className="h-6 w-6 text-slate-600" />
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
                <span className={`flex items-center font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {trend === 'up' ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
                    {change}
                </span>
                <span className="ml-2 text-slate-400">vs förra månaden</span>
            </div>
        </div>
    );
}

function FunnelStage({ label, count, percent, color, barColor }: any) {
    return (
        <div>
            <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-slate-700">{label}</span>
                <span className="text-slate-900">{count} ({Math.round(percent)}%)</span>
            </div>
            <div className={`h-3 w-full overflow-hidden rounded-full ${color}`}>
                <div
                    className={`h-full ${barColor}`}
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}
