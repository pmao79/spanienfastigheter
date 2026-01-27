"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import CreateDealModal from "./_components/CreateDealModal";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const STAGES = [
    { id: "reservation", label: "Reservation", color: "bg-blue-500" },
    { id: "contract", label: "Kontrakt", color: "bg-indigo-500" },
    { id: "due_diligence", label: "Due Diligence", color: "bg-purple-500" },
    { id: "escritura", label: "Escritura", color: "bg-orange-500" },
    { id: "completion", label: "Avslutad", color: "bg-green-500" },
];

export default function DealsPage() {
    const deals = useQuery(api.deals.getAll, {}) || [];
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { user } = useUser();

    // Calculate totals
    const totalPipelineValue = deals.reduce((sum, deal) => sum + (deal.agreedPrice || 0), 0);
    const activeDealsCount = deals.filter(d => d.stage !== 'closed_lost' && d.stage !== 'closed_won').length;

    return (
        <div className="flex h-[calc(100vh-6rem)] flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Deals Pipeline</h1>
                    <div className="flex gap-4 text-sm text-slate-500 mt-1">
                        <span>{activeDealsCount} aktiva</span>
                        <span className="text-slate-300">|</span>
                        <span>Pipeline värde: {totalPipelineValue.toLocaleString()} €</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-medium text-white hover:bg-[#153e75]"
                    >
                        <Plus className="h-4 w-4" />
                        Ny Deal
                    </button>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto pb-4">
                <div className="flex h-full min-w-[1200px] gap-4">
                    {STAGES.map((stage) => {
                        const stageDeals = deals.filter(d => d.stage === stage.id);
                        const stageTotal = stageDeals.reduce((sum, d) => sum + (d.agreedPrice || 0), 0);

                        return (
                            <div key={stage.id} className="flex h-full w-80 flex-col rounded-xl bg-slate-50/50 border border-slate-100">
                                {/* Column Header */}
                                <div className="p-4 border-b border-slate-100 bg-white/50 backdrop-blur rounded-t-xl">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-slate-700">{stage.label}</h3>
                                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                                            {stageDeals.length}
                                        </span>
                                    </div>
                                    <div className={`h-1 w-full rounded-full ${stage.color} opacity-20`}>
                                        <div className={`h-full rounded-full ${stage.color}`} style={{ width: '100%' }}></div>
                                    </div>
                                    <div className="mt-2 text-xs font-medium text-slate-500">
                                        {stageTotal.toLocaleString()} €
                                    </div>
                                </div>

                                {/* Deals List */}
                                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                                    {stageDeals.map((deal) => (
                                        <Link
                                            key={deal._id}
                                            href={`/admin/deals/${deal._id}`}
                                            className="block group"
                                        >
                                            <div className="rounded-lg bg-white p-4 shadow-sm border border-slate-200 hover:shadow-md hover:border-[#1a365d]/30 transition-all">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="font-medium text-slate-900 line-clamp-1">
                                                        {deal.lead?.firstName} {deal.lead?.lastName}
                                                    </div>
                                                    {/* Warning indicator logic could go here */}
                                                </div>

                                                <div className="text-sm text-slate-500 mb-3 line-clamp-1">
                                                    {deal.property?.title}
                                                </div>

                                                <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                                    <span className="text-sm font-semibold text-[#1a365d]">
                                                        {deal.agreedPrice?.toLocaleString()} €
                                                    </span>
                                                    {deal.progress !== undefined && (
                                                        <div className="flex items-center gap-1.5" title={`${deal.progress}% klart`}>
                                                            <div className="h-1.5 w-12 rounded-full bg-slate-100 overflow-hidden">
                                                                <div
                                                                    className={`h-full rounded-full ${deal.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                                                                        }`}
                                                                    style={{ width: `${deal.progress}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                                                    <div className="flex items-center gap-1">
                                                        <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                                            {deal.assignedTo?.name?.[0] || 'U'}
                                                        </div>
                                                        <span>{deal.assignedTo?.name?.split(' ')[0]}</span>
                                                    </div>
                                                    <span>{deal.property?.reference}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
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
