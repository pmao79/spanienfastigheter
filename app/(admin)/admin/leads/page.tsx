'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Search, Filter, Plus, User, Phone, Mail, Calendar } from 'lucide-react';

export default function LeadsPage() {
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const leads = useQuery(api.leads.getAll, {
        status: statusFilter || undefined
    });

    // Status colors
    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            new: 'bg-blue-100 text-blue-800',
            contacted: 'bg-yellow-100 text-yellow-800',
            qualified: 'bg-purple-100 text-purple-800',
            viewing_scheduled: 'bg-orange-100 text-orange-800',
            viewing_done: 'bg-indigo-100 text-indigo-800',
            negotiating: 'bg-cyan-100 text-cyan-800',
            won: 'bg-green-100 text-green-800',
            lost: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-slate-100 text-slate-800';
    };

    const getTemperatureEmoji = (temp: string) => {
        if (temp === 'hot') return '🔥';
        if (temp === 'warm') return '☀️';
        return '❄️';
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-2xl font-bold text-slate-800">Leads</h1>
                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                    <Plus size={18} />
                    Ny Lead
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Sök namn, email..."
                        className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                    <Filter size={18} className="text-slate-400" />
                    {['new', 'contacted', 'qualified', 'won'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(statusFilter === status ? null : status)}
                            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors ${statusFilter === status
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Namn</th>
                                <th className="px-6 py-4 font-medium">Kontakt</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Temp</th>
                                <th className="px-6 py-4 font-medium">Skapad</th>
                                <th className="px-6 py-4 font-medium text-right">Åtgärder</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {!leads ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">Laddar leads...</td>
                                </tr>
                            ) : leads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">Inga leads matchar filtret.</td>
                                </tr>
                            ) : (
                                leads.map((lead: any) => (
                                    <tr key={lead._id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{lead.firstName} {lead.lastName}</div>
                                            <div className="text-xs text-slate-500">{lead.source}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1 text-xs text-slate-600">
                                                <div className="flex items-center gap-1.5">
                                                    <Mail size={12} /> {lead.email}
                                                </div>
                                                {lead.phone && (
                                                    <div className="flex items-center gap-1.5">
                                                        <Phone size={12} /> {lead.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(lead.status)}`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span title={lead.temperature} className="cursor-help text-lg">
                                                {getTemperatureEmoji(lead.temperature)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            <div className="flex items-center gap-1.5 whitespace-nowrap">
                                                <Calendar size={14} />
                                                {new Date(lead.createdAt).toLocaleDateString('sv-SE')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                                                Hantera
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
