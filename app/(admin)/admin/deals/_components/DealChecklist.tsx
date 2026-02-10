"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { format } from "date-fns";

interface DealChecklistProps {
    dealId: Id<"deals">;
    currentStage: string;
}

export default function DealChecklist({ dealId, currentStage }: DealChecklistProps) {
    const checklists = useQuery(api.dealChecklists.getByDeal, { dealId });
    const toggleItem = useMutation(api.dealChecklists.toggleItem);

    // Sort logic to put the current stage first, then logical order
    // For simplicity, we'll just find the current stage checklist

    if (!checklists) return <div className="p-4 text-center text-slate-500">Laddar checklista...</div>;

    const currentChecklist = checklists.find(c => c.stage === currentStage);
    const otherChecklists = checklists.filter(c => c.stage !== currentStage);

    const handleToggle = async (checklistId: Id<"dealChecklists">, itemId: string, currentStatus: boolean) => {
        await toggleItem({
            checklistId,
            itemId,
            isCompleted: !currentStatus
        });
    };

    if (!currentChecklist) {
        return (
            <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
                Ingen checklista för denna fas ({currentStage}).
            </div>
        );
    }

    const completedCount = currentChecklist.items.filter(i => i.isCompleted).length;
    const totalCount = currentChecklist.items.length;
    const progress = Math.round((completedCount / totalCount) * 100);

    return (
        <div className="space-y-6">
            {/* Current Stage Card */}
            <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="border-b border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-900 capitalize flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                            {currentStage.replace('_', ' ')}
                        </h3>
                        <span className="text-xs font-medium text-slate-500">
                            {completedCount} av {totalCount} klara
                        </span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="divide-y divide-slate-100">
                    {currentChecklist.items.map((item) => (
                        <div
                            key={item.id}
                            className={`flex items-start gap-3 p-4 hover:bg-slate-50 transition-colors ${item.isCompleted ? 'bg-slate-50/50' : ''}`}
                        >
                            <button
                                onClick={() => handleToggle(currentChecklist._id, item.id, item.isCompleted)}
                                className={`mt-0.5 flex-shrink-0 ${item.isCompleted ? 'text-green-600' : 'text-slate-300 hover:text-slate-400'}`}
                            >
                                {item.isCompleted ? (
                                    <CheckCircle2 className="h-6 w-6" />
                                ) : (
                                    <Circle className="h-6 w-6" />
                                )}
                            </button>
                            <div className="flex-1">
                                <p className={`text-sm font-medium ${item.isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                                    {item.title}
                                </p>
                                {item.description && (
                                    <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                                )}
                                {item.completedAt && (
                                    <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        Klar {format(new Date(item.completedAt), "d MMM HH:mm")}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Other Stages (Collapsed/Compact) could go here if needed */}
        </div>
    );
}
