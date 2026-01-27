"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Check, ChevronRight, User, Send, FileText, Download } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Id } from "@/convex/_generated/dataModel";

// Steps - Reduced to 3
const STEPS = [
    { id: 1, label: "Mottagare & Objekt", icon: User },
    { id: 2, label: "Anpassa", icon: FileText },
    { id: 3, label: "Granska & Skicka", icon: Send },
];

import { useSearchParams } from "next/navigation";

export default function NewMailingPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const cloneId = searchParams.get("clone");
    const [currentStep, setCurrentStep] = useState(1);

    // State
    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
    const [customSubject, setCustomSubject] = useState("Förslag på bostäder i Spanien");
    const [customMessage, setCustomMessage] = useState("");
    const [scheduleDate, setScheduleDate] = useState("");
    const [includePdf, setIncludePdf] = useState(false);

    // UI Toggles
    const [hideSent, setHideSent] = useState(false);

    // Backend
    const createMailing = useMutation(api.propertyMailings.create);
    const sendMailingAction = useAction(api.mailingActions.sendMailing);

    const leads = useQuery(api.leads.getAll, {});
    const properties = useQuery(api.properties.getAllAdmin, {});

    // Context Query
    const leadContext = useQuery(api.propertyMailings.getLeadContext,
        selectedLeadId ? { leadId: selectedLeadId as Id<"leads"> } : "skip"
    );

    // Clone Data Query
    const cloneMailing = useQuery(api.propertyMailings.getById,
        cloneId ? { id: cloneId as Id<"propertyMailings"> } : "skip"
    );

    // Populate from Clone
    useEffect(() => {
        if (cloneMailing && !selectedLeadId) { // Only run once/if empty
            setSelectedLeadId(cloneMailing.leadId);
            setSelectedProperties(cloneMailing.propertyIds as string[]);
            setCustomSubject(cloneMailing.subject);
            setCustomMessage(cloneMailing.personalMessage);
            if (cloneMailing.includePdf) setIncludePdf(true);
        }
    }, [cloneMailing]);

    // Auto-fill message when lead changes (ONLY if not cloning)
    useEffect(() => {
        if (selectedLeadId && leads && !cloneId) { // Verify !cloneId
            const lead = leads.find(l => l._id === selectedLeadId);
            if (lead) {
                setCustomMessage(`Hej ${lead.firstName}!\n\nHär kommer några objekt som jag hittat åt dig baserat på våra samtal.\n\nVi hörs snart igen!`);
            }
        }
    }, [selectedLeadId, leads, cloneId]);

    const handleNext = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async (action: 'draft' | 'send' | 'schedule') => {
        if (!selectedLeadId) return;

        try {
            const initialStatus = action === 'schedule' ? 'scheduled' : 'draft';

            const mailingId = await createMailing({
                leadId: selectedLeadId as Id<"leads">,
                propertyIds: selectedProperties as Id<"properties">[],
                subject: customSubject,
                personalMessage: customMessage,
                status: initialStatus,
                scheduledAt: action === 'schedule' ? scheduleDate : undefined,
                // New params will be added to create mutation later (includePdf)
            });

            if (action === 'send') {
                try {
                    await sendMailingAction({ mailingId });
                } catch (sendError) {
                    console.error("Failed to send email:", sendError);
                    alert("Mailet skapades men kunde inte skickas. Kontrollera API-nycklar och loggar.");
                }
            }

            router.push("/admin/mailings");
        } catch (error) {
            console.error(error);
            alert("Ett fel uppstod.");
        }
    };

    // Helper to get selected objects
    const selectedLead = leads?.find(l => l._id === selectedLeadId);
    const selectedPropsList = properties?.filter(p => selectedProperties.includes(p._id));

    return (
        <div className="max-w-6xl mx-auto pb-20">
            {/* Header */}
            <div className="mb-8 mt-4">
                <Link href="/admin/mailings" className="text-sm text-slate-500 hover:text-[#1a365d] mb-2 block">
                    ← Tillbaka till översikt
                </Link>
                <h1 className="text-2xl font-serif font-bold text-[#1a365d]">Skapa nytt utskick</h1>
            </div>

            {/* Stepper */}
            <div className="mb-8">
                <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto">
                    <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-200 -z-10" />
                    {STEPS.map((step) => {
                        const Icon = step.icon;
                        const active = currentStep >= step.id;
                        const current = currentStep === step.id;
                        return (
                            <div key={step.id} className="flex flex-col items-center gap-2 bg-[#f8fafc] px-4">
                                <div className={`
                                    flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors
                                    ${active ? "border-[#1a365d] bg-[#1a365d] text-white" : "border-slate-300 bg-white text-slate-400"}
                                `}>
                                    {active && !current ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                                </div>
                                <span className={`text-xs font-medium ${current ? "text-[#1a365d]" : "text-slate-500"}`}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">

                {/* Main Area */}
                <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border p-6">

                    {/* STEP 1: LEAD & PROPERTIES */}
                    {currentStep === 1 && (
                        <div className="space-y-8">
                            {/* Select Lead */}
                            <div>
                                <h2 className="text-lg font-medium text-[#1a365d] mb-4">1. Välj Mottagare</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto border p-2 rounded-lg">
                                    {leads ? leads.map(lead => (
                                        <div
                                            key={lead._id}
                                            onClick={() => setSelectedLeadId(lead._id)}
                                            className={`
                                                cursor-pointer p-3 rounded-lg border transition-all flex justify-between items-center
                                                ${selectedLeadId === lead._id ? "border-[#1a365d] bg-blue-50 ring-1 ring-[#1a365d]" : "border-slate-200 hover:border-slate-300"}
                                            `}
                                        >
                                            <div>
                                                <p className="font-medium text-sm">{lead.firstName} {lead.lastName}</p>
                                                <p className="text-xs text-slate-500">{lead.email}</p>
                                            </div>
                                            {selectedLeadId === lead._id && <Check className="h-4 w-4 text-[#1a365d]" />}
                                        </div>
                                    )) : <div className="p-4 text-slate-400">Laddar leads...</div>}
                                </div>
                            </div>

                            {/* Select Properties */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-medium text-[#1a365d]">2. Välj Objekt (Max 5)</h2>
                                    <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={hideSent}
                                            onChange={(e) => setHideSent(e.target.checked)}
                                            className="rounded border-slate-300 text-[#1a365d] focus:ring-[#1a365d]"
                                        />
                                        Dölj redan skickade
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {properties ? properties
                                        .filter(p => !hideSent || !leadContext?.sentPropertyIds?.includes(p._id))
                                        .slice(0, 50) // Show reasonable amount
                                        .map(prop => {
                                            const isSelected = selectedProperties.includes(prop._id);
                                            const isSent = leadContext?.sentPropertyIds?.includes(prop._id);

                                            return (
                                                <div
                                                    key={prop._id}
                                                    onClick={() => {
                                                        if (isSelected) {
                                                            setSelectedProperties(prev => prev.filter(id => id !== prop._id));
                                                        } else {
                                                            if (selectedProperties.length >= 5) return;
                                                            setSelectedProperties(prev => [...prev, prop._id]);
                                                        }
                                                    }}
                                                    className={`
                                                    relative cursor-pointer group rounded-lg border overflow-hidden transition-all h-28 flex
                                                    ${isSelected ? "border-[#1a365d] ring-1 ring-[#1a365d]" : "border-slate-200 hover:border-slate-300"}
                                                    ${isSent ? "opacity-75 bg-slate-50" : ""}
                                                `}
                                                >
                                                    <div className="w-28 relative bg-slate-100 flex-shrink-0">
                                                        {prop.images?.[0] && (
                                                            <Image src={prop.images[0]} fill alt="" className="object-cover" />
                                                        )}
                                                    </div>
                                                    <div className="p-3 flex items-center flex-1">
                                                        <div>
                                                            <p className="font-medium text-sm line-clamp-1">{prop.title}</p>
                                                            <p className="text-xs text-slate-500 mb-1">{prop.town} • {prop.price?.toLocaleString()} €</p>

                                                            {isSent && (
                                                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 text-[10px] font-medium">
                                                                    <Send className="h-3 w-3" /> Redan skickat
                                                                </span>
                                                            )}
                                                            {!isSent && (
                                                                <span className="inline-flex px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-[10px] font-medium">
                                                                    ✨ Nyhet
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {isSelected && (
                                                        <div className="absolute top-2 right-2 bg-[#1a365d] text-white rounded-full p-0.5">
                                                            <Check className="h-3 w-3" />
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        }) : <div>Laddar objekt...</div>}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">{selectedProperties.length} av 5 valda</p>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: CUSTOMIZE */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-medium text-[#1a365d]">Anpassa Meddelande</h2>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Ämne</label>
                                <input
                                    type="text"
                                    value={customSubject}
                                    onChange={(e) => setCustomSubject(e.target.value)}
                                    className="w-full rounded-md border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Personligt meddelande</label>
                                <textarea
                                    value={customMessage}
                                    onChange={(e) => setCustomMessage(e.target.value)}
                                    rows={12}
                                    className="w-full rounded-md border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d]"
                                />
                                {leadContext?.latestCommunication && (
                                    <div className="mt-2 p-3 bg-blue-50 rounded text-xs text-blue-800 border border-blue-100">
                                        <strong>💡 Senaste kontakt ({new Date(leadContext.latestCommunication.createdAt).toLocaleDateString()}):</strong>
                                        <p className="italic mt-1">"{leadContext.latestCommunication.content}"</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* STEP 3: REVIEW */}
                    {currentStep === 3 && (
                        <div className="h-full flex flex-col">
                            <h2 className="text-lg font-medium text-[#1a365d] mb-6">Granska & Skicka</h2>

                            <div className="bg-slate-50 rounded-xl border p-8 flex justify-center flex-1 mb-8 overflow-y-auto max-h-[600px]">
                                <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-fit">
                                    <div className="bg-[#1a365d] p-4 text-center">
                                        <span className="text-white font-serif font-bold text-lg">SF</span>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <h1 className="text-lg font-bold text-slate-900 leading-tight">
                                            {customSubject}
                                        </h1>
                                        <p className="text-sm text-slate-600 whitespace-pre-line">
                                            {customMessage}
                                        </p>
                                        <div className="space-y-3 mt-4">
                                            {selectedPropsList?.map(p => (
                                                <div key={p._id} className="border rounded-lg overflow-hidden">
                                                    <div className="h-32 bg-slate-200 relative">
                                                        {p.images?.[0] && <Image src={p.images[0]} fill alt="" className="object-cover" />}
                                                    </div>
                                                    <div className="p-3">
                                                        <p className="font-bold text-sm text-[#1a365d]">{p.town}</p>
                                                        <p className="text-xs text-slate-500">{p.price?.toLocaleString()} € • {p.rooms ?? 3} sov</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border rounded-lg p-4 mb-6">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={includePdf}
                                        onChange={(e) => setIncludePdf(e.target.checked)}
                                        className="h-5 w-5 rounded border-slate-300 text-[#1a365d] focus:ring-[#1a365d]"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-slate-900 flex items-center gap-2">
                                            <Download className="h-4 w-4" /> Bifoga PDF-broschyr
                                        </p>
                                        <p className="text-xs text-slate-500">Skapar en snygg PDF med alla valda objekt som kunden kan spara/skriva ut.</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                {/* Left Side: Context Panel / Preview (Depends on Step) */}
                <div className="lg:col-span-4 space-y-6">
                    {/* CUSTOMER CONTEXT - Only Step 1 & 2 */}
                    {(currentStep === 1 || currentStep === 2) && (
                        <div className="bg-white rounded-xl shadow-sm border p-5 sticky top-6">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">
                                Kundkontext
                            </h3>

                            {selectedLead ? (
                                <div className="space-y-6">
                                    {/* Lead Info */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="h-10 w-10 bg-[#1a365d] rounded-full flex items-center justify-center text-white font-bold">
                                                {selectedLead.firstName[0]}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{selectedLead.firstName} {selectedLead.lastName}</p>
                                                <p className="text-xs text-slate-500">{selectedLead.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Preferences */}
                                    {leadContext?.preferences && (
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <p className="text-xs font-bold text-slate-700 mb-2">❤️ Preferenser</p>
                                            <div className="space-y-1 text-xs text-slate-600">
                                                <p>💰 {leadContext.preferences.minBudget?.toLocaleString()} - {leadContext.preferences.maxBudget?.toLocaleString()} €</p>
                                                <p>📍 {leadContext.preferences.regions?.join(", ")}</p>
                                                <p>🏠 {leadContext.preferences.propertyTypes?.join(", ")}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Previous Mailings */}
                                    <div>
                                        <p className="text-xs font-bold text-slate-700 mb-2">📤 Tidigare utskick</p>
                                        <div className="space-y-2">
                                            {leadContext?.previousMailings?.length ? leadContext.previousMailings.map(m => (
                                                <div key={m._id} className="text-xs border-l-2 border-slate-300 pl-2 py-1">
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-900 font-medium">{new Date(m.createdAt).toLocaleDateString()}</span>
                                                        <span className={`
                                                            px-1.5 rounded text-[10px] 
                                                            ${m.status === 'opened' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}
                                                        `}>
                                                            {m.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-slate-500 mt-0.5">{m.propertyIds.length} objekt</p>
                                                </div>
                                            )) : <p className="text-xs text-slate-400 italic">Inga tidigare utskick</p>}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-slate-400 text-sm">
                                    Välj en mottagare för att se historik och preferenser.
                                </div>
                            )}
                        </div>
                    )}

                    {/* ACTIONS - Step 3 (Summary moved inside main area for better flow, kept empty here or maybe tips) */}
                    {currentStep === 3 && (
                        <div className="bg-blue-50 rounded-xl shadow-sm border border-blue-100 p-5 sticky top-6">
                            <h3 className="text-sm font-bold text-blue-900 mb-2">Redo att skicka?</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => handleSubmit('send')}
                                    className="w-full py-3 rounded-lg bg-[#1a365d] text-white font-medium hover:bg-[#2a4575] shadow-lg flex items-center justify-center gap-2"
                                >
                                    <Send className="h-4 w-4" />
                                    Skicka nu
                                </button>
                                <button
                                    onClick={() => handleSubmit('draft')}
                                    className="w-full py-3 rounded-lg border border-blue-200 bg-white text-blue-900 font-medium hover:bg-blue-50"
                                >
                                    Spara som utkast
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* Footer Navigation */}
            <div className="mt-8 flex justify-between border-t pt-6">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className={`px-6 py-2 rounded-lg font-medium border ${currentStep === 1 ? "invisible" : "border-slate-300 text-slate-600 hover:bg-slate-50"}`}
                >
                    Föregående
                </button>

                {currentStep < 3 && (
                    <button
                        onClick={handleNext}
                        disabled={
                            (currentStep === 1 && (!selectedLeadId || selectedProperties.length === 0))
                        }
                        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#1a365d] text-white font-medium hover:bg-[#2a4575] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Nästa
                        <ChevronRight className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
