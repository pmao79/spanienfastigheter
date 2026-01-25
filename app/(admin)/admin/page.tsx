'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {
    Users,
    Home,
    Megaphone,
    CheckCircle,
    ArrowRight,
    Activity
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const stats = useQuery(api.dashboard.getStats);

    if (!stats) {
        return <div className="p-8 text-center text-slate-500">Laddar dashboard...</div>;
    }

    const cards = [
        {
            label: 'Aktiva Objekt',
            value: stats.activePropertiesCount,
            icon: Home,
            color: 'bg-blue-500',
            href: '/admin/properties'
        },
        {
            label: 'Nya Leads (7 dagar)',
            value: stats.newLeadsCount,
            icon: Megaphone,
            color: 'bg-yellow-500',
            href: '/admin/leads'
        },
        {
            label: 'Pågående Visningar',
            value: stats.leadsPerStatus['viewing_scheduled'] || 0,
            icon: Users,
            color: 'bg-indigo-500',
            href: '/admin/leads'
        },
        {
            label: 'Stängda Affärer',
            value: stats.leadsPerStatus['won'] || 0,
            icon: CheckCircle,
            color: 'bg-green-500',
            href: '/admin/leads'
        }
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((card) => (
                    <Link
                        key={card.label}
                        href={card.href}
                        className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                                <p className="mt-2 text-3xl font-bold text-slate-900">{card.value}</p>
                            </div>
                            <div className={`rounded-lg p-3 ${card.color} bg-opacity-10 text-white`}>
                                <card.icon className={`${card.color.replace('bg-', 'text-')}`} size={24} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Recent Activity */}
                <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-800">Senaste Aktivitet</h2>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Visa alla</button>
                    </div>
                    <div className="space-y-4">
                        {stats.recentActivity.length === 0 ? (
                            <p className="text-slate-500">Ingen aktivitet ännu.</p>
                        ) : (
                            stats.recentActivity.map((activity: any, idx: number) => (
                                <div key={idx} className="flex items-start gap-4 border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                                    <div className="mt-1 rounded-full bg-slate-100 p-2 text-slate-600">
                                        <Activity size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800">{activity.description}</p>
                                        <p className="text-xs text-slate-500">
                                            {new Date(activity.createdAt).toLocaleString('sv-SE')}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions & Leads Breakdown */}
                <div className="space-y-6">
                    {/* Actions */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-slate-800">Snabbåtgärder</h2>
                        <div className="space-y-3">
                            <button className="flex w-full items-center justify-between rounded-lg border border-slate-200 p-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                                Implementeras Senare
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Leads Status */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-slate-800">Leads Status</h2>
                        <div className="space-y-3">
                            {Object.entries(stats.leadsPerStatus).map(([status, count]) => (
                                <div key={status} className="flex items-center justify-between text-sm">
                                    <span className="capitalize text-slate-600">{status.replace('_', ' ')}</span>
                                    <span className="font-semibold text-slate-900">{String(count)}</span>
                                </div>
                            ))}
                            {Object.keys(stats.leadsPerStatus).length === 0 && (
                                <p className="text-sm text-slate-500">Inga leads ännu.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
