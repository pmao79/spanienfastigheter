"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    Plus,
    Search,
    Home,
    User,
    Clock,
    Eye,
    Edit,
    ArrowRight,
    Inbox
} from "lucide-react";
import CreateDealModal from "./_components/CreateDealModal";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const STAGES = [
    { id: "reservation", label: "Reservation", color: "amber" },
    { id: "contract", label: "Kontrakt", color: "blue" },
    { id: "due_diligence", label: "Due Diligence", color: "purple" },
    { id: "escritura", label: "Escritura", color: "emerald" },
    { id: "completion", label: "Avslutad", color: "green" },
];

const COLUMN_COLORS: Record<string, any> = {
    amber: { dot: 'bg-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
    blue: { dot: 'bg-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    purple: { dot: 'bg-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
    emerald: { dot: 'bg-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    green: { dot: 'bg-green-500', bg: 'bg-green-50', border: 'border-green-200' },
};

export default function DealsPage() {
    const rawDeals = useQuery(api.deals.getAll, {}) || [];
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { user } = useUser();

    // Filters State
    const [searchTerm, setSearchTerm] = useState("");
    const [agentFilter, setAgentFilter] = useState("Alla agenter");
    const [regionFilter, setRegionFilter] = useState("Alla regioner");

    // Filter Logic
    const deals = rawDeals.filter((deal: any) => {
        const matchesSearch = searchTerm === "" ||
            deal.property?.town?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deal.lead?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deal.property?.ref?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesAgent = agentFilter === "Alla agenter" || deal.assignedTo?._id === agentFilter;
        // Mock region filtering logic as proper region might be deeply nested or just 'town'
        const matchesRegion = regionFilter === "Alla regioner" || deal.property?.region === regionFilter || deal.property?.province === regionFilter;

        return matchesSearch && matchesAgent && matchesRegion;
    });

    // Stats
    const totalPipelineValue = deals.reduce((sum: number, deal: any) => sum + (deal.agreedPrice || deal.listPrice || 0), 0);
    const activeDealsCount = deals.filter((d: any) => d.stage !== 'closed_lost' && d.stage !== 'closed_won').length;
    const avgDealValue = activeDealsCount > 0 ? Math.round(totalPipelineValue / activeDealsCount) : 0;

    // Unique Agents for Filter
    const agents = Array.from(new Set(rawDeals.map((d: any) => d.assignedTo).filter(Boolean))).map((a: any) => ({ id: a._id, name: a.name }));
    // Unique Regions (mocked or derived)
    const regions = ["Costa del Sol", "Costa Blanca", "Mallorca"]; // Ideally derived from properties

    function formatCurrency(amount: number) {
        return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);
    }

    return (
        <div className="flex h-[calc(100vh-6rem)] flex-col gap-6">
            {/* 1. PAGE Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl bg-white p-4 shadow-sm border border-slate-100">
                <div className="min-w-0">
                    <h1 className="text-xl font-bold text-[#1a365d]">Deals Pipeline</h1>
                    <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 text-sm text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            {activeDealsCount} aktiva
                        </span>
                        <span className="hidden sm:inline text-slate-300">•</span>
                        <span className="truncate">Pipeline värde: <span className="font-semibold text-slate-700">{formatCurrency(totalPipelineValue)}</span></span>
                        <span className="hidden sm:inline text-slate-300">•</span>
                        <span className="truncate">Snitt per deal: <span className="font-semibold text-slate-700">{formatCurrency(avgDealValue)}</span></span>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-medium text-white hover:bg-[#153e75] shadow-sm hover:shadow transition-all"
                    >
                        <Plus className="h-4 w-4" />
                        Ny Deal
                    </button>
                </div>
            </div>

            {/* 2. FILTER RAD */}
            <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex-1 relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Sök deal eller objekt..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20 focus:border-[#1a365d]"
                    />
                </div>

                <select
                    className="w-full md:w-auto px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20"
                    value={agentFilter}
                    onChange={(e) => setAgentFilter(e.target.value)}
                >
                    <option value="Alla agenter">Alla agenter</option>
                    {agents.map((agent: any) => (
                        <option key={agent.id} value={agent.id}>{agent.name}</option>
                    ))}
                </select>

                <select
                    className="w-full md:w-auto px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20"
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                >
                    <option value="Alla regioner">Alla regioner</option>
                    {regions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>

                {(searchTerm || agentFilter !== "Alla agenter" || regionFilter !== "Alla regioner") && (
                    <button
                        onClick={() => { setSearchTerm(""); setAgentFilter("Alla agenter"); setRegionFilter("Alla regioner"); }}
                        className="text-sm text-slate-500 hover:text-slate-700 font-medium whitespace-nowrap"
                    >
                        Rensa
                    </button>
                )}
            </div>

            {/* 3. KANBAN BOARD */}
            <div className="flex-1 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="flex h-full min-w-max gap-3 sm:gap-4">
                    {STAGES.map((stage) => {
                        const stageDeals = deals.filter((d: any) => d.stage === stage.id);
                        const stageTotal = stageDeals.reduce((sum: number, d: any) => sum + (d.agreedPrice || d.listPrice || 0), 0);
                        const colors = COLUMN_COLORS[stage.color];

                        return (
                            <div key={stage.id} className="flex h-full w-[280px] sm:w-[340px] flex-col rounded-xl bg-slate-50/50">
                                {/* Column Header */}
                                <div className={`p-3 rounded-t-xl border-b-2 ${colors.bg} ${colors.border} !border-b-${stage.color}-200`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-3 h-3 rounded-full ${colors.dot}`} />
                                            <span className="font-bold text-slate-800 uppercase tracking-wide text-xs">{stage.label}</span>
                                        </div>
                                        <span className="bg-white/60 px-2 py-0.5 rounded-full text-xs font-semibold text-slate-600 shadow-sm border border-black/5">
                                            {stageDeals.length}
                                        </span>
                                    </div>
                                    <div className="text-xs font-medium text-slate-600 mt-2 pl-5">
                                        {formatCurrency(stageTotal)}
                                    </div>
                                </div>

                                {/* Deals List */}
                                <div className="flex-1 overflow-y-auto p-2 space-y-3 custom-scrollbar">
                                    {stageDeals.map((deal: any) => (
                                        <DealCard key={deal._id} deal={deal} />
                                    ))}

                                    {stageDeals.length === 0 && (
                                        <div className="p-8 text-center opacity-60">
                                            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
                                                <Inbox className="w-6 h-6 text-slate-400" />
                                            </div>
                                            <p className="text-sm text-slate-500">Inga deals</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <CreateDealModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    );
}

function DealCard({ deal }: { deal: any }) {
    const deadlineStatus = getDeadlineStatus(deal.nextStepDeadline);

    return (
        <div className="group relative bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-[#1a365d]/40 cursor-pointer">
            {/* Header: Objekt-info */}
            <div className="p-3 border-b border-slate-50">
                <div className="flex gap-3">
                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 relative">
                        {deal.property?.images && deal.property.images.length > 0 ? (
                            <img src={deal.property.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <Home className="w-5 h-5" />
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                                {deal.property?.ref || "REF"}
                            </span>
                            <span className="font-bold text-slate-900 text-sm">
                                {new Intl.NumberFormat('en-IE', { notation: "compact", style: 'currency', currency: 'EUR' }).format(deal.agreedPrice || deal.listPrice || 0)}
                            </span>
                        </div>
                        <div className="font-medium text-slate-800 truncate text-sm mt-1" title={deal.property?.town || "Okänt objekt"}>
                            {deal.property?.town || "Okänt objekt"}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">{deal.property?.region || deal.property?.province || "Spanien"}</div>
                    </div>
                </div>
            </div>

            {/* Köpare */}
            <div className="px-3 py-2 border-b border-slate-50 bg-slate-50/30">
                <div className="flex items-center gap-2 text-sm">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-700 text-xs font-medium">
                        {deal.lead ? `${deal.lead.firstName} ${deal.lead.lastName}` : "Ingen köpare"}
                    </span>
                </div>
            </div>

            {/* Nästa steg + Deadline */}
            {deal.nextStep && (
                <div className="px-3 py-2 border-b border-slate-50">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2">
                            <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                            <div>
                                <div className="text-xs font-medium text-slate-700 line-clamp-1" title={deal.nextStep}>
                                    Nästa: {deal.nextStep}
                                </div>
                                {deal.nextStepDeadline && (
                                    <div className={`text-[10px] font-medium mt-0.5 ${deadlineStatus.textColor}`}>
                                        {deadlineStatus.text}
                                    </div>
                                )}
                            </div>
                        </div>
                        <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${deadlineStatus.dotColor}`} />
                    </div>
                </div>
            )}

            {/* Footer: Agent + Provision */}
            <div className="px-3 py-2 flex items-center justify-between bg-white rounded-b-lg">
                <div className="flex items-center gap-2">
                    {deal.assignedTo?.avatarUrl ? (
                        <img src={deal.assignedTo.avatarUrl} className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-100" />
                    ) : (
                        <div className="w-5 h-5 rounded-full bg-[#1a365d] text-white text-[9px] flex items-center justify-center font-bold ring-1 ring-slate-100">
                            {(deal.assignedTo?.name || "??").substring(0, 2).toUpperCase()}
                        </div>
                    )}
                    <span className="text-[10px] font-medium text-slate-600 truncate max-w-[80px]">
                        {deal.assignedTo?.name?.split(' ')[0] || "Ingen"}
                    </span>
                </div>
                {deal.commissionPercent && (
                    <span className="text-[10px] font-medium text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                        Prov: {deal.commissionPercent}%
                    </span>
                )}
            </div>

            {/* Hover Actions Overlay */}
            <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 flex items-center justify-center gap-2 backdrop-blur-[1px] m-1 rounded-lg border border-[#1a365d]/10">
                <Link href={`/admin/deals/${deal._id}`} className="flex flex-col items-center gap-1 p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-700">
                        <Eye className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-medium text-slate-600">Visa</span>
                </Link>
                {/* Edit could open modal, for now same link or separate handler */}
                <button className="flex flex-col items-center gap-1 p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-700">
                        <Edit className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-medium text-slate-600">Redigera</span>
                </button>
            </div>
        </div>
    );
}

function getDeadlineStatus(deadline?: string) {
    if (!deadline) {
        return {
            text: 'Ingen deadline',
            textColor: 'text-slate-400',
            dotColor: 'bg-slate-300',
        };
    }

    const d = new Date(deadline);
    const now = new Date();
    // Reset time parts for day comparison
    d.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = d.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
        return {
            text: `${Math.abs(diffDays)} dagar försenad`,
            textColor: 'text-red-600',
            dotColor: 'bg-red-500',
        };
    } else if (diffDays === 0) {
        return {
            text: 'Idag!',
            textColor: 'text-red-600',
            dotColor: 'bg-red-500',
        };
    } else if (diffDays <= 3) {
        return {
            text: `Om ${diffDays} dag${diffDays > 1 ? 'ar' : ''}`,
            textColor: 'text-amber-600',
            dotColor: 'bg-amber-500',
        };
    } else if (diffDays <= 7) {
        return {
            text: `Om ${diffDays} dagar`,
            textColor: 'text-blue-600',
            dotColor: 'bg-blue-500',
        };
    } else {
        return {
            text: `Om ${diffDays} dagar`,
            textColor: 'text-slate-500',
            dotColor: 'bg-green-500',
        };
    }
}
