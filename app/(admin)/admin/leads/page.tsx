"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    Search,
    Filter,
    Plus,
    Mail,
    Phone,
    Calendar,
    MoreHorizontal,
    Kanban,
    Users,
    UserPlus,
    Flame,
    TrendingUp,
    LayoutGrid,
    List,
    Download,
    Upload,
    Home,
    ArrowDownToLine,
    UserCircle,
    MessageSquare,
    Edit,
    Send,
    ArrowRight,
    Archive
} from "lucide-react";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";
import { formatDistanceToNow } from "date-fns";
import { sv } from "date-fns/locale";

// --- Types & Interfaces ---

interface Lead {
    _id: Id<"leads">;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    source: string;
    status: string;
    temperature: "cold" | "warm" | "hot";
    notes?: string;
    createdAt: string;
    lastContactedAt?: string;
    assignedToId?: Id<"users">;
    preferences?: {
        minBudget?: number;
        maxBudget?: number;
        regions?: string[];
        propertyTypes?: string[];
    };
}

interface User {
    _id: Id<"users">;
    name: string;
    email: string;
    avatar?: string;
}

// --- Helper Functions ---

const getInitials = (firstName: string, lastName: string) => {
    return ((firstName[0] || '') + (lastName[0] || '')).toUpperCase();
};

const getLastContactLabel = (dateString?: string) => {
    if (!dateString) return null;
    return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: sv });
};

const LEAD_TABS = [
    { id: 'all', label: 'Alla' },
    { id: 'new', label: 'Nya', statuses: ['new', 'ny'] },
    { id: 'contacted', label: 'Kontaktade', statuses: ['contacted', 'kontaktad'] },
    { id: 'qualified', label: 'Kvalificerade', statuses: ['qualified', 'kvalificerad'] },
    { id: 'viewing', label: 'Visning', statuses: ['viewing_scheduled', 'viewing scheduled', 'visning bokad'] },
    { id: 'negotiation', label: 'Förhandling', statuses: ['negotiation', 'negotiating', 'förhandling'] },
    { id: 'won', label: 'Vunna', statuses: ['won', 'vunnen'] },
];

// --- Sub-Components ---

function LeadsKPIs({ leads }: { leads: Lead[] }) {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const totalLeads = leads.length;
    const newThisWeek = leads.filter(l => new Date(l.createdAt) > oneWeekAgo).length;
    const hotLeads = leads.filter(l => l.temperature === 'hot').length;
    const wonLeads = leads.filter(l => l.status === 'won' || l.status === 'vunnen').length;
    const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;

    const Card = ({ label, value, subtext, icon: Icon }: any) => (
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
                <Icon className="w-4 h-4 text-slate-400" />
            </div>
            <div>
                <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
                {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <Card
                label="Totalt"
                value={totalLeads}
                icon={Users}
                subtext="Aktiva leads"
            />
            <Card
                label="Nya (7d)"
                value={newThisWeek}
                icon={UserPlus}
                subtext="Senaste veckan"
            />
            <Card
                label="Hot Leads"
                value={hotLeads}
                icon={Flame}
                subtext="Hög prioritet"
            />
            <Card
                label="Konvertering"
                value={`${conversionRate}%`}
                icon={TrendingUp}
                subtext="Vunna affärer"
            />
        </div>
    );
}

function LeadCard({ lead, agentName }: { lead: Lead; agentName?: string }) {
    // Professional color palette
    const tempStyles: Record<string, any> = {
        hot: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', icon: '🔥', label: 'Hot' },
        warm: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', icon: '☀️', label: 'Warm' },
        cold: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100', icon: '❄️', label: 'Cold' },
    };

    const statusStyles: Record<string, any> = {
        'new': { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Ny' },
        'contacted': { bg: 'bg-purple-50', text: 'text-purple-700', label: 'Kontaktad' },
        'qualified': { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Kvalificerad' },
        'viewing_scheduled': { bg: 'bg-indigo-50', text: 'text-indigo-700', label: 'Visning' },
        'negotiation': { bg: 'bg-orange-50', text: 'text-orange-700', label: 'Förhandling' },
        'won': { bg: 'bg-green-50', text: 'text-green-700', label: 'Vunnen' },
        'lost': { bg: 'bg-slate-100', text: 'text-slate-500', label: 'Förlorad' },
    };

    const temp = tempStyles[lead.temperature] || tempStyles.cold;
    const status = statusStyles[lead.status] || { bg: 'bg-slate-50', text: 'text-slate-600', label: lead.status };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-all group relative">
            <div className="flex flex-col gap-3">
                {/* Header Row: Avatar + Name + Temp */}
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1a365d] text-white flex items-center justify-center font-semibold text-sm flex-shrink-0 shadow-sm">
                        {getInitials(lead.firstName, lead.lastName)}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                            <Link href={`/admin/leads/${lead._id}`} className="block truncate pr-2 group-hover:text-[#1a365d] transition-colors">
                                <h3 className="font-semibold text-slate-900 text-base truncate">
                                    {lead.firstName} {lead.lastName}
                                </h3>
                            </Link>
                            <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium border ${temp.bg} ${temp.text} ${temp.border} flex items-center gap-1`}>
                                {temp.icon} {temp.label}
                            </span>
                        </div>

                        <div className="flex flex-col text-xs text-slate-500 mt-0.5 space-y-0.5">
                            {lead.email && (
                                <div className="flex items-center gap-1.5 truncate">
                                    <Mail className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                    <a href={`mailto:${lead.email}`} className="truncate hover:text-slate-700 hover:underline">
                                        {lead.email}
                                    </a>
                                </div>
                            )}
                            {lead.phone && (
                                <div className="flex items-center gap-1.5 truncate">
                                    <Phone className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                    <a href={`tel:${lead.phone}`} className="hover:text-slate-700 hover:underline">
                                        {lead.phone}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Status & Meta Info */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-50">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${status.bg} ${status.text}`}>
                        {status.label}
                    </span>

                    {lead.lastContactedAt && (
                        <span className="text-[10px] text-slate-400">
                            {getLastContactLabel(lead.lastContactedAt)}
                        </span>
                    )}

                    {(lead.preferences?.minBudget || lead.preferences?.maxBudget) && (
                        <span className="text-[10px] text-slate-500 flex items-center gap-1 ml-auto">
                            <span className="font-medium text-slate-700">
                                {lead.preferences.minBudget ? `€${(lead.preferences.minBudget / 1000).toFixed(0)}k` : '0'}
                                -
                                {lead.preferences.maxBudget ? `€${(lead.preferences.maxBudget / 1000).toFixed(0)}k` : '∞'}
                            </span>
                        </span>
                    )}
                </div>

                {/* Agent & Source - Minimal */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                    <div className="flex items-center gap-2">
                        {agentName && (
                            <span className="flex items-center gap-1">
                                <UserCircle className="w-3 h-3" /> {agentName}
                            </span>
                        )}
                        {lead.source && (
                            <span className="capitalize px-1.5 py-0.5 bg-slate-50 rounded text-slate-500 border border-slate-100">
                                {lead.source}
                            </span>
                        )}
                    </div>
                </div>

                {/* Actions Footer */}
                <div className="grid grid-cols-4 gap-2 mt-2 pt-3 border-t border-slate-100">
                    <a href={lead.phone ? `tel:${lead.phone}` : '#'} className={`flex items-center justify-center p-2 rounded bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors ${!lead.phone ? 'opacity-50 pointer-events-none' : ''}`}>
                        <Phone className="w-4 h-4" />
                    </a>
                    <a href={lead.email ? `mailto:${lead.email}` : '#'} className={`flex items-center justify-center p-2 rounded bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors ${!lead.email ? 'opacity-50 pointer-events-none' : ''}`}>
                        <Mail className="w-4 h-4" />
                    </a>
                    <a href={lead.phone ? `sms:${lead.phone}` : '#'} className={`flex items-center justify-center p-2 rounded bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors ${!lead.phone ? 'opacity-50 pointer-events-none' : ''}`}>
                        <MessageSquare className="w-4 h-4" />
                    </a>

                    <div className="relative">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsMenuOpen(!isMenuOpen);
                            }}
                            className="w-full flex items-center justify-center p-2 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                        >
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                        {isMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
                                <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-1 z-20">
                                    <Link href={`/admin/leads/${lead._id}`} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4" /> Öppna kort
                                    </Link>
                                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                        <Edit className="w-4 h-4" /> Redigera
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" /> Boka visning
                                    </button>
                                    <div className="h-px bg-slate-100 my-1" />
                                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                        <Archive className="w-4 h-4" /> Arkivera
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ... LeadsTable component stays mostly the same but with color tweaks ...
function LeadsTable({ leads, users }: { leads: Lead[], users: User[] }) {
    const statusStyles: Record<string, any> = {
        'new': { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Ny' },
        'contacted': { bg: 'bg-purple-50', text: 'text-purple-700', label: 'Kontaktad' },
        'qualified': { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Kvalificerad' },
        'viewing_scheduled': { bg: 'bg-indigo-50', text: 'text-indigo-700', label: 'Visning' },
        'negotiation': { bg: 'bg-orange-50', text: 'text-orange-700', label: 'Förhandling' },
        'won': { bg: 'bg-green-50', text: 'text-green-700', label: 'Vunnen' },
        'lost': { bg: 'bg-slate-100', text: 'text-slate-500', label: 'Förlorad' },
    };

    const tempStyles: Record<string, any> = {
        hot: { bg: 'bg-red-50', text: 'text-red-700', icon: '🔥' },
        warm: { bg: 'bg-amber-50', text: 'text-amber-700', icon: '☀️' },
        cold: { bg: 'bg-slate-50', text: 'text-slate-600', icon: '❄️' },
    };

    return (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Lead</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Kontakt</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Temp</th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Källa</th>
                            <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {leads.map(lead => {
                            const status = statusStyles[lead.status] || { bg: 'bg-slate-50', text: 'text-slate-600', label: lead.status };
                            const temp = tempStyles[lead.temperature] || tempStyles.cold;

                            return (
                                <tr key={lead._id} className="hover:bg-slate-50">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#1a365d] text-white text-xs flex items-center justify-center font-medium">
                                                {getInitials(lead.firstName, lead.lastName)}
                                            </div>
                                            <Link href={`/admin/leads/${lead._id}`} className="font-medium text-slate-900 hover:text-[#1a365d]">
                                                {lead.firstName} {lead.lastName}
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-sm">
                                            <div className="text-slate-900">{lead.email}</div>
                                            <div className="text-slate-500 text-xs">{lead.phone || '-'}</div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${status.bg} ${status.text}`}>
                                            {status.label}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${temp.bg} ${temp.text}`}>
                                            <span className="mr-1">{temp.icon}</span>
                                            <span className="capitalize">{lead.temperature}</span>
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-600 capitalize">
                                        {lead.source}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link href={`/admin/leads/${lead._id}`} className="inline-block p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function LeadsPage() {
    const leadsData = useQuery(api.leads.getAll, {}) as Lead[] | undefined;
    const usersData = useQuery(api.users.getAll, {}) as User[] | undefined;
    const createLead = useMutation(api.leads.create);

    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
    const [activeTab, setActiveTab] = useState('all');
    const [filters, setFilters] = useState({
        search: '',
        temperature: 'all',
        source: 'all',
        agent: 'all',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLead, setNewLead] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        source: "website",
        temperature: "cold" as "cold" | "warm" | "hot",
        notes: ""
    });

    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    // Derived Data
    const sources = useMemo(() => {
        if (!leadsData) return [];
        return [...new Set(leadsData.map(l => l.source).filter(Boolean))].sort();
    }, [leadsData]);

    const filteredLeads = useMemo(() => {
        if (!leadsData) return [];
        return leadsData.filter(lead => {
            // Tab filter
            if (activeTab !== 'all') {
                const tab = LEAD_TABS.find(t => t.id === activeTab);
                if (!tab?.statuses?.includes(lead.status?.toLowerCase())) return false;
            }

            // Text Search
            if (filters.search) {
                const q = filters.search.toLowerCase();
                const matches =
                    lead.firstName.toLowerCase().includes(q) ||
                    lead.lastName.toLowerCase().includes(q) ||
                    lead.email.toLowerCase().includes(q) ||
                    (lead.phone && lead.phone.includes(q));
                if (!matches) return false;
            }

            // Dropdown filters
            if (filters.temperature !== 'all' && lead.temperature !== filters.temperature) return false;
            if (filters.source !== 'all' && lead.source !== filters.source) return false;
            if (filters.agent !== 'all' && lead.assignedToId !== filters.agent) return false;

            return true;
        });
    }, [leadsData, activeTab, filters]);

    const getTabCount = (tabId: string) => {
        if (!leadsData) return 0;
        if (tabId === 'all') return leadsData.length;
        const tab = LEAD_TABS.find(t => t.id === tabId);
        return leadsData.filter(l => tab?.statuses?.includes(l.status?.toLowerCase())).length;
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        await createLead({
            firstName: newLead.firstName,
            lastName: newLead.lastName,
            email: newLead.email,
            phone: newLead.phone,
            source: newLead.source,
            temperature: newLead.temperature,
            notes: newLead.notes
        });
        setIsModalOpen(false);
        setNewLead({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            source: "website",
            temperature: "cold",
            notes: ""
        });
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto p-4 sm:p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
                    <p className="text-slate-500 text-sm">Hantera dina leads</p>
                </div>
                <div className="flex gap-2">
                    <Link
                        href="/admin/leads/pipeline"
                        className="hidden sm:flex px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 items-center gap-2 shadow-sm"
                    >
                        <Kanban className="w-4 h-4" />
                        Pipeline
                    </Link>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full sm:w-auto px-4 py-2 bg-[#1a365d] text-white rounded-lg text-sm font-medium hover:bg-[#2d4a7c] flex items-center justify-center gap-2 shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Ny Lead
                    </button>
                </div>
            </div>

            {/* KPIs */}
            {leadsData && <LeadsKPIs leads={leadsData} />}

            {/* Tabs */}
            <div className="flex gap-1 mb-6 border-b border-slate-200 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                {LEAD_TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2
                            ${activeTab === tab.id
                                ? 'border-[#1a365d] text-[#1a365d]'
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-200'
                            }
                        `}
                    >
                        {tab.label}
                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-[#1a365d]/10 text-[#1a365d]' : 'bg-slate-100 text-slate-500'
                            }`}>
                            {getTabCount(tab.id)}
                        </span>
                    </button>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Sök..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20 bg-slate-50"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                        <select
                            value={filters.temperature}
                            onChange={(e) => setFilters({ ...filters, temperature: e.target.value })}
                            className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20 shrink-0"
                        >
                            <option value="all">Temp</option>
                            <option value="hot">🔥 Hot</option>
                            <option value="warm">☀️ Warm</option>
                            <option value="cold">❄️ Cold</option>
                        </select>

                        <select
                            value={filters.source}
                            onChange={(e) => setFilters({ ...filters, source: e.target.value })}
                            className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20 shrink-0"
                        >
                            <option value="all">Källa</option>
                            {sources.map(source => (
                                <option key={source} value={source}>{source}</option>
                            ))}
                        </select>

                        {/* View toggle - Desktop Only */}
                        <div className="hidden lg:flex border border-slate-200 rounded-lg overflow-hidden ml-auto">
                            <button
                                onClick={() => setViewMode('cards')}
                                className={`p-2 transition-colors ${viewMode === 'cards' ? 'bg-[#1a365d] text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                                title="Kortvy"
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-2 transition-colors ${viewMode === 'table' ? 'bg-[#1a365d] text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                                title="Tabellvy"
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* List/Grid Content */}
            {filteredLeads.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg border border-dashed border-slate-300">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-50 flex items-center justify-center">
                        <Users className="w-6 h-6 text-slate-400" />
                    </div>
                    <h3 className="text-sm font-medium text-slate-900 mb-1">
                        Inga resultat
                    </h3>
                    <p className="text-slate-500 text-xs mb-4">
                        Justera dina filter eller lägg till nya leads.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors shadow-sm text-sm"
                    >
                        + Ny Lead
                    </button>
                </div>
            ) : viewMode === 'cards' || isMobile ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredLeads.map(lead => (
                        <LeadCard
                            key={lead._id}
                            lead={lead}
                            agentName={usersData?.find(u => u._id === lead.assignedToId)?.name}
                        />
                    ))}
                </div>
            ) : (
                <LeadsTable leads={filteredLeads} users={usersData || []} />
            )}

            {/* New Lead Modal - Simplified */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h2 className="mb-4 text-xl font-bold text-slate-900 border-b pb-2">Ny Lead</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Förnamn *</label>
                                    <input required type="text" value={newLead.firstName} onChange={e => setNewLead({ ...newLead, firstName: e.target.value })} className="w-full rounded-lg border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d] text-sm p-2.5 bg-slate-50 border" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Efternamn *</label>
                                    <input required type="text" value={newLead.lastName} onChange={e => setNewLead({ ...newLead, lastName: e.target.value })} className="w-full rounded-lg border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d] text-sm p-2.5 bg-slate-50 border" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                                <input required type="email" value={newLead.email} onChange={e => setNewLead({ ...newLead, email: e.target.value })} className="w-full rounded-lg border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d] text-sm p-2.5 bg-slate-50 border" />
                            </div>
                            {/* ... more fields ... */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Telefon</label>
                                <input type="text" value={newLead.phone} onChange={e => setNewLead({ ...newLead, phone: e.target.value })} className="w-full rounded-lg border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d] text-sm p-2.5 bg-slate-50 border" />
                            </div>

                            <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">Avbryt</button>
                                <button type="submit" className="rounded-lg bg-[#1a365d] px-6 py-2 text-sm font-medium text-white hover:bg-[#1a365d]/90 shadow-lg shadow-blue-900/10 transition-all hover:scale-[1.02]">Skapa</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
