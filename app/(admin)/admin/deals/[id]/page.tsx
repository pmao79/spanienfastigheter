"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import DealInfo from "../_components/DealInfo";
import DealChecklist from "../_components/DealChecklist";
import DealDocuments from "../_components/DealDocuments";
import { useState } from "react";

const STAGES = [
    { id: "reservation", label: "Reservation" },
    { id: "contract", label: "Kontrakt" },
    { id: "due_diligence", label: "Due Diligence" },
    { id: "escritura", label: "Escritura" },
    { id: "completion", label: "Avslutad" },
];

export default function DealDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useUser();
    const dealId = params.id as Id<"deals">;

    const deal = useQuery(api.deals.getById, { id: dealId });
    const userProfile = useQuery(api.users.getByClerkId, { clerkId: user?.id || "" });
    const updateStage = useMutation(api.deals.updateStage);

    const [isUpdatingStage, setIsUpdatingStage] = useState(false);

    if (deal === undefined) {
        return <div className="p-8 text-center">Laddar deal...</div>;
    }

    if (deal === null) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-bold">Deal hittades inte</h2>
                <Link href="/admin/deals" className="text-blue-600 hover:underline mt-2 inline-block">
                    Tillbaka till pipeline
                </Link>
            </div>
        );
    }

    const currentStageIndex = STAGES.findIndex(s => s.id === deal.stage);

    // Safety check for unknown stages (e.g. closed_lost)
    const activeStageIndex = currentStageIndex === -1 ? STAGES.length : currentStageIndex;

    const handleStageChange = async (newStage: string) => {
        if (confirm(`Vill du flytta dealen till fasen "${newStage}"?`)) {
            setIsUpdatingStage(true);
            try {
                // @ts-ignore
                await updateStage({ id: dealId, stage: newStage });
            } catch (error) {
                console.error("Failed to update stage:", error);
                alert("Kunde inte uppdatera fasen.");
            } finally {
                setIsUpdatingStage(false);
            }
        }
    };

    return (
        <div className="flex h-[calc(100vh-6rem)] flex-col gap-6">
            {/* Header */}
            <div>
                <div className="mb-4">
                    <Link
                        href="/admin/deals"
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Tillbaka till Pipeline
                    </Link>
                </div>

                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            {deal.property?.town || "Okänt objekt"}, {deal.property?.type}
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-normal text-slate-600">
                                {deal.property?.ref}
                            </span>
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Affär med <span className="font-medium text-slate-900">{deal.lead?.firstName} {deal.lead?.lastName}</span>
                        </p>
                    </div>
                    <div className="flex gap-3">
                        {/* Actions like Edit or Delete could go here */}
                        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                            <Edit2 className="h-4 w-4" />
                            Redigera
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-8 relative">
                    <div className="overflow-hidden rounded-full bg-slate-100 h-2 mb-4">
                        <div
                            className="h-full bg-green-500 transition-all duration-500"
                            style={{ width: `${(Math.max(0, currentStageIndex) / (STAGES.length - 1)) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-between relative px-2">
                        {STAGES.map((stage, index) => {
                            const isCompleted = index <= currentStageIndex;
                            const isCurrent = index === currentStageIndex;

                            return (
                                <button
                                    key={stage.id}
                                    onClick={() => !isCurrent && handleStageChange(stage.id)}
                                    className={`flex flex-col items-center gap-2 relative z-10 group ${isCurrent ? 'cursor-default' : 'cursor-pointer'
                                        }`}
                                >
                                    <div className={`
                                        h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                                        ${isCompleted
                                            ? 'bg-green-500 text-white'
                                            : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                                        }
                                        ${isCurrent ? 'ring-4 ring-green-100' : ''}
                                    `}>
                                        {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                                    </div>
                                    <span className={`text-xs font-medium ${isCurrent ? 'text-slate-900' : isCompleted ? 'text-green-600' : 'text-slate-400'
                                        }`}>
                                        {stage.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden min-h-0">
                {/* Left Column: Deal Info (Scrollable) */}
                <div className="overflow-y-auto pr-2 pb-6 space-y-6">
                    <DealInfo deal={deal} />
                </div>

                {/* Middle Column: Checklist (Scrollable) */}
                <div className="overflow-y-auto pr-2 pb-6 flex flex-col gap-6">
                    <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4">
                        <h3 className="font-semibold text-blue-900 flex items-center gap-2 mb-2">
                            <AlertCircle className="h-4 w-4" />
                            Aktuell Fas: {STAGES[currentStageIndex]?.label || deal.stage}
                        </h3>
                        <p className="text-sm text-blue-700">
                            Följ checklistan nedan för att slutföra denna fas och gå vidare till nästa steg i processen.
                        </p>
                    </div>
                    <DealChecklist
                        dealId={deal._id}
                        currentStage={deal.stage}
                    />
                </div>

                {/* Right Column: Documents (Scrollable) */}
                <div className="overflow-y-auto pr-2 pb-6">
                    {userProfile?._id && (
                        <DealDocuments
                            dealId={deal._id}
                            uploadedById={userProfile._id}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
