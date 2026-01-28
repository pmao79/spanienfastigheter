"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    ThumbsUp,
    ThumbsDown,
    Minus,
    Home,
    User,
    Briefcase,
    Save
} from "lucide-react";

export default function ViewingReportPage() {
    const params = useParams();
    const router = useRouter();
    const viewingId = params.id as Id<"viewings">;

    const viewing = useQuery(api.viewings.getById, { id: viewingId });
    const createReport = useMutation(api.viewingReports.create);

    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [propertyFeedback, setPropertyFeedback] = useState<Record<string, any>>({});
    const [customerFeedback, setCustomerFeedback] = useState({
        budgetUpdate: "",
        timeline: "",
        financingStatus: ""
    });
    const [agentAssessment, setAgentAssessment] = useState({
        purchaseProbability: "",
        readiness: "",
        nextSteps: ""
    });

    if (!viewing) return <div className="p-8 text-center">Laddar visning...</div>;

    const properties = viewing.properties || [];
    const totalSteps = properties.length + 2; // Properties + Customer + Agent

    // Helper to get current property for Property Steps
    const currentPropertyIndex = step - 1;
    const isPropertyStep = currentPropertyIndex < properties.length;
    const currentProperty = isPropertyStep ? properties[currentPropertyIndex] : null;

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Format payload
            const reportPayload = {
                viewingId,
                propertyFeedback: properties.filter((p): p is NonNullable<typeof p> => p !== null).map(p => ({
                    propertyId: p._id,
                    ...propertyFeedback[p._id],
                    interestLevel: propertyFeedback[p._id]?.interestLevel || 3, // Default neutral
                    reaction: propertyFeedback[p._id]?.reaction || "neutral"
                })),
                customerFeedback: {
                    ...customerFeedback,
                    timeline: customerFeedback.timeline as any,
                    financingStatus: customerFeedback.financingStatus as any
                },
                agentAssessment: {
                    ...agentAssessment,
                    purchaseProbability: agentAssessment.purchaseProbability as any,
                    readiness: agentAssessment.readiness as any
                }
            };

            await createReport(reportPayload);
            router.push("/admin/viewings");
        } catch (error) {
            console.error("Failed to submit report:", error);
            alert("Kunde inte spara rapporten. Försök igen.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const updatePropertyFeedback = (field: string, value: any) => {
        if (!currentProperty) return;
        setPropertyFeedback(prev => ({
            ...prev,
            [currentProperty._id]: {
                ...prev[currentProperty._id],
                [field]: value
            }
        }));
    };

    return (
        <div className="flex h-screen flex-col bg-slate-50">
            {/* Header */}
            <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
                <button onClick={() => router.back()} className="text-slate-500">
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <div className="text-center">
                    <h1 className="text-sm font-bold text-slate-900">Visningsrapport</h1>
                    <p className="text-xs text-slate-500">Steg {step} av {totalSteps}</p>
                </div>
                <div className="w-6" /> {/* Spacer */}
            </header>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-slate-200">
                <div
                    className="h-full bg-[#1a365d] transition-all duration-300"
                    style={{ width: `${(step / totalSteps) * 100}%` }}
                />
            </div>

            {/* Content */}
            <main className="flex-1 overflow-y-auto p-4 pb-24">

                {/* STEP: Property Feedback */}
                {isPropertyStep && currentProperty && (
                    <div className="space-y-6">
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                            <div className="h-32 bg-slate-200">
                                {/* Ideally show property image here */}
                                {currentProperty.images?.[0] && (
                                    <img src={currentProperty.images[0]} alt="" className="h-full w-full object-cover" />
                                )}
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-slate-900">{currentProperty.type} i {currentProperty.town}</h2>
                                <p className="text-sm text-slate-500">{currentProperty.locationDetail || currentProperty.town}</p>
                                <p className="font-mono text-sm text-[#1a365d]">{currentProperty.ref}</p>
                            </div>
                        </div>

                        <div className="rounded-xl bg-white p-6 shadow-sm space-y-6">
                            <h3 className="font-medium text-slate-900">Vad tyckte kunden?</h3>

                            {/* Reaction */}
                            <div className="grid grid-cols-4 gap-2">
                                {[
                                    { val: 'disliked', icon: ThumbsDown, label: 'Gillade ej', color: 'text-red-500 bg-red-50' },
                                    { val: 'neutral', icon: Minus, label: 'Neutral', color: 'text-slate-500 bg-slate-50' },
                                    { val: 'liked', icon: ThumbsUp, label: 'Gillade', color: 'text-blue-500 bg-blue-50' },
                                    { val: 'loved', icon: Home, label: 'Älskade', color: 'text-green-500 bg-green-50' },
                                ].map((opt) => {
                                    const isSelected = propertyFeedback[currentProperty._id]?.reaction === opt.val;
                                    return (
                                        <button
                                            key={opt.val}
                                            onClick={() => updatePropertyFeedback('reaction', opt.val)}
                                            className={`flex flex-col items-center justify-center gap-2 rounded-lg border p-3 transition-all
                                                ${isSelected
                                                    ? `border-${opt.color.split('-')[1]}-500 ring-2 ring-${opt.color.split('-')[1]}-500 ring-offset-1 ${opt.color}`
                                                    : 'border-slate-200 hover:bg-slate-50'
                                                }
                                            `}
                                        >
                                            <opt.icon className="h-6 w-6" />
                                            <span className="text-[10px] font-medium">{opt.label}</span>
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Pros / Cons Inputs */}
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Positivt</label>
                                    <textarea
                                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d]"
                                        rows={2}
                                        placeholder="Ljusinsläpp, utsikt..."
                                        value={propertyFeedback[currentProperty._id]?.pros || ""}
                                        onChange={(e) => updatePropertyFeedback('pros', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Negativt</label>
                                    <textarea
                                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d]"
                                        rows={2}
                                        placeholder="Trafikstörning, planlösning..."
                                        value={propertyFeedback[currentProperty._id]?.cons || ""}
                                        onChange={(e) => updatePropertyFeedback('cons', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP: Customer Status */}
                {step === properties.length + 1 && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <User className="h-5 w-5" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">Kundstatus</h2>
                        </div>

                        <div className="rounded-xl bg-white p-6 shadow-sm space-y-6">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Tidsplan</label>
                                <select
                                    className="w-full rounded-lg border-slate-300 py-3"
                                    value={customerFeedback.timeline}
                                    onChange={(e) => setCustomerFeedback({ ...customerFeedback, timeline: e.target.value })}
                                >
                                    <option value="">Välj tidsplan...</option>
                                    <option value="asap">Omgående</option>
                                    <option value="1_3_months">1-3 månader</option>
                                    <option value="3_6_months">3-6 månader</option>
                                    <option value="just_looking">Bara tittar</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Finansiering</label>
                                <select
                                    className="w-full rounded-lg border-slate-300 py-3"
                                    value={customerFeedback.financingStatus}
                                    onChange={(e) => setCustomerFeedback({ ...customerFeedback, financingStatus: e.target.value })}
                                >
                                    <option value="">Välj status...</option>
                                    <option value="cash">Kontant</option>
                                    <option value="mortgage_approved">Lånelöfte klart</option>
                                    <option value="mortgage_pending">Väntar på lånelöfte</option>
                                    <option value="not_started">Ej påbörjat</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Budget uppdatering (valfritt)</label>
                                <input
                                    type="text"
                                    placeholder="T.ex. +50k EUR"
                                    className="w-full rounded-lg border-slate-300 py-3"
                                    value={customerFeedback.budgetUpdate}
                                    onChange={(e) => setCustomerFeedback({ ...customerFeedback, budgetUpdate: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP: Agent Assessment */}
                {step === totalSteps && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                <Briefcase className="h-5 w-5" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">Din Bedömning</h2>
                        </div>

                        <div className="rounded-xl bg-white p-6 shadow-sm space-y-6">
                            <div>
                                <label className="mb-3 block text-sm font-medium text-slate-700">Sannolikhet till köp</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['low', 'medium', 'high', 'very_high'].map(prob => (
                                        <button
                                            key={prob}
                                            onClick={() => setAgentAssessment({ ...agentAssessment, purchaseProbability: prob })}
                                            className={`rounded-lg border py-3 text-sm font-medium transition-all
                                                ${agentAssessment.purchaseProbability === prob
                                                    ? 'bg-[#1a365d] text-white border-[#1a365d]'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                                }
                                            `}
                                        >
                                            {prob === 'low' && 'Låg'}
                                            {prob === 'medium' && 'Medel'}
                                            {prob === 'high' && 'Hög'}
                                            {prob === 'very_high' && 'Mycket Hög'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-medium text-slate-700">Köpmognad</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { val: 'early_stage', label: 'Tidigt skede' },
                                        { val: 'active_search', label: 'Aktivt sökande' },
                                        { val: 'ready_to_buy', label: 'Köpredo' }
                                    ].map(opt => (
                                        <button
                                            key={opt.val}
                                            onClick={() => setAgentAssessment({ ...agentAssessment, readiness: opt.val })}
                                            className={`rounded-lg border py-3 text-sm font-medium transition-all
                                                ${agentAssessment.readiness === opt.val
                                                    ? 'bg-[#1a365d] text-white border-[#1a365d]'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                                }
                                            `}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Nästa steg</label>
                                <textarea
                                    className="w-full rounded-lg border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d]"
                                    rows={3}
                                    placeholder="Vad behöver göras härnäst?"
                                    value={agentAssessment.nextSteps}
                                    onChange={(e) => setAgentAssessment({ ...agentAssessment, nextSteps: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                )}

            </main>

            {/* Footer / Navigation */}
            <footer className="fixed bottom-0 left-0 right-0 border-t bg-white p-4 pb-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] lg:pb-4">
                <div className="flex gap-4">
                    {step > 1 && (
                        <button
                            onClick={handleBack}
                            className="flex-1 rounded-xl border border-slate-300 py-3 text-sm font-bold text-slate-700 active:bg-slate-50"
                        >
                            Tillbaka
                        </button>
                    )}

                    {step < totalSteps ? (
                        <button
                            onClick={handleNext}
                            className="flex-[2] rounded-xl bg-[#1a365d] py-3 text-sm font-bold text-white shadow-lg active:scale-[0.98] active:bg-[#153e75]"
                        >
                            Nästa
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold text-white shadow-lg active:scale-[0.98] disabled:opacity-50"
                        >
                            {isSubmitting ? 'Sparar...' : <><Save className="h-4 w-4" /> Slutför rapport</>}
                        </button>
                    )}
                </div>
            </footer>
        </div>
    );
}
