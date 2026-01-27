"use client";

import { useState } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Check, ChevronRight, User, Building2, LayoutTemplate, Send, Calendar, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Steps
const STEPS = [
    { id: 1, label: "Mottagare & Objekt", icon: User },
    { id: 2, label: "Välj Mall", icon: LayoutTemplate },
    { id: 3, label: "Anpassa", icon: FileText },
    { id: 4, label: "Granska & Skicka", icon: Send },
];

import { FileText } from "lucide-react";

export default function NewMailingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);

    // State
    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
    const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
    const [customSubject, setCustomSubject] = useState("");
    const [customMessage, setCustomMessage] = useState("");
    const [scheduleDate, setScheduleDate] = useState("");

    // Mutations
    const createMailing = useMutation(api.propertyMailings.create);
    const sendMailingAction = useAction(api.mailingActions.sendMailing);
    // Wait, actions are called via `useAction` usually, or just `useMutation` if wrapped? 
    // Convex `useAction` is proper for actions.
    // But I defined `sendMailing` as an action. 
    // Let's import `useAction`.

    // Actually, I won't send immediately in the browser usually, 
    // I creates a mailing (draft/scheduled) then call `sendMailing` on that ID.
    // For simplicity, "Send Now" button will call create -> then send.

    const leads = useQuery(api.leads.getAll, {}); // Optimized in real app
    const properties = useQuery(api.properties.getAllAdmin, {}); // Optimized in real app
    const templates = useQuery(api.mailingTemplates.getAll, {});

    const handleNext = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async (action: 'draft' | 'send' | 'schedule') => {
        if (!selectedLeadId) return;

        try {
            // 1. Create Mailing (Initial status: draft if sending, or whatever user chose)
            // If sending now, we create as draft first, then let the action update to 'sent' on success
            // or 'failed'.
            const initialStatus = action === 'schedule' ? 'scheduled' : 'draft';

            const mailingId = await createMailing({
                leadId: selectedLeadId as any,
                propertyIds: selectedProperties as any[],
                subject: customSubject,
                personalMessage: customMessage,
                templateId: selectedTemplateId === 'default' ? undefined : (selectedTemplateId as any),
                status: initialStatus,
                scheduledAt: action === 'schedule' ? scheduleDate : undefined,
            });

            // 2. If Send Now
            if (action === 'send') {
                try {
                    await sendMailingAction({ mailingId });
                    // We don't manually set status to 'sent' here, the action does it.
                } catch (sendError) {
                    console.error("Failed to send email:", sendError);
                    alert("Mailet skapades men kunde inte skickas. Kontrollera API-nycklar och loggar.");
                    // We still redirect to list, where it will show as 'failed' (updated by action catch block ideally)
                    // or 'draft' if action completely crashed before updating.
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
        <div className="max-w-5xl mx-auto pb-20">
            {/* Header */}
            <div className="mb-8 mt-4">
                <Link href="/admin/mailings" className="text-sm text-slate-500 hover:text-[#1a365d] mb-2 block">
                    ← Tillbaka till översikt
                </Link>
                <h1 className="text-2xl font-serif font-bold text-[#1a365d]">Skapa nytt utskick</h1>
            </div>

            {/* Stepper */}
            <div className="mb-8">
                <div className="relative flex items-center justify-between w-full max-w-3xl mx-auto">
                    <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-slate-200 -z-10" />
                    {STEPS.map((step) => {
                        const Icon = step.icon;
                        const active = currentStep >= step.id;
                        const current = currentStep === step.id;
                        return (
                            <div key={step.id} className="flex flex-col items-center gap-2 bg-[#f8fafc] px-2">
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
            <div className="bg-white rounded-xl shadow-sm border p-6 min-h-[500px]">

                {/* STEP 1: LEAD & PROPERTIES */}
                {currentStep === 1 && (
                    <div className="space-y-8">
                        {/* Select Lead */}
                        <div>
                            <h2 className="text-lg font-medium text-[#1a365d] mb-4">1. Välj Mottagare</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto border p-2 rounded-lg">
                                {leads ? leads.map(lead => (
                                    <div
                                        key={lead._id}
                                        onClick={() => setSelectedLeadId(lead._id)}
                                        className={`
                                            cursor-pointer p-3 rounded-lg border transition-all
                                            ${selectedLeadId === lead._id ? "border-[#1a365d] bg-blue-50 ring-1 ring-[#1a365d]" : "border-slate-200 hover:border-slate-300"}
                                        `}
                                    >
                                        <p className="font-medium text-sm">{lead.firstName} {lead.lastName}</p>
                                        <p className="text-xs text-slate-500">{lead.email}</p>
                                    </div>
                                )) : <div className="p-4 text-slate-400">Laddar leads...</div>}
                            </div>
                        </div>

                        {/* Select Properties */}
                        <div>
                            <h2 className="text-lg font-medium text-[#1a365d] mb-4">2. Välj Objekt (Max 5)</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {properties ? properties.slice(0, 12).map(prop => {
                                    const isSelected = selectedProperties.includes(prop._id);
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
                                                relative cursor-pointer group rounded-lg border overflow-hidden transition-all h-24 flex
                                                ${isSelected ? "border-[#1a365d] ring-1 ring-[#1a365d]" : "border-slate-200 hover:border-slate-300"}
                                            `}
                                        >
                                            <div className="w-24 relative bg-slate-100 flex-shrink-0">
                                                {prop.images?.[0] && (
                                                    <Image src={prop.images[0]} fill alt="" className="object-cover" />
                                                )}
                                            </div>
                                            <div className="p-3 flex items-center">
                                                <div>
                                                    <p className="font-medium text-sm line-clamp-1">{prop.title}</p>
                                                    <p className="text-xs text-slate-500">{prop.town} • {prop.price?.toLocaleString()} €</p>
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

                {/* STEP 2: TEMPLATE */}
                {currentStep === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-medium text-[#1a365d]">Välj E-postmall</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {templates ? templates.map(tpl => (
                                <div
                                    key={tpl._id}
                                    onClick={() => {
                                        setSelectedTemplateId(tpl._id);
                                        // Auto-fill content if needed
                                    }}
                                    className={`
                                        cursor-pointer rounded-xl border-2 p-4 transition-all hover:shadow-md
                                        ${selectedTemplateId === tpl._id ? "border-[#1a365d] bg-blue-50/50" : "border-slate-100 hover:border-slate-200"}
                                    `}
                                >
                                    <div className="h-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-slate-400">
                                        <LayoutTemplate className="h-8 w-8" />
                                    </div>
                                    <h3 className="font-medium text-slate-900">{tpl.name}</h3>
                                    <p className="text-sm text-slate-500 mt-1">{tpl.description || "Ingen beskrivning"}</p>
                                </div>
                            )) : <div>Laddar mallar... (Skapa en mall i settings först)</div>}

                            {/* Fallback option if no templates */}
                            <div
                                onClick={() => setSelectedTemplateId("default")}
                                className={`
                                    cursor-pointer rounded-xl border-2 p-4 transition-all hover:shadow-md
                                    ${selectedTemplateId === "default" ? "border-[#1a365d] bg-blue-50/50" : "border-slate-100 hover:border-slate-200"}
                                `}
                            >
                                <div className="h-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-slate-400">
                                    <FileText className="h-8 w-8" />
                                </div>
                                <h3 className="font-medium text-slate-900">Standardmall</h3>
                                <p className="text-sm text-slate-500 mt-1">Enkel layout med utvalda objekt.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 3: CUSTOMIZE */}
                {currentStep === 3 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                        <div className="space-y-6">
                            <h2 className="text-lg font-medium text-[#1a365d]">Anpassa Meddelande</h2>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Ämne</label>
                                <input
                                    type="text"
                                    value={customSubject}
                                    onChange={(e) => setCustomSubject(e.target.value)}
                                    placeholder={`Förslag på bostäder i Spanien`}
                                    className="w-full rounded-md border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Personligt meddelande</label>
                                <textarea
                                    value={customMessage}
                                    onChange={(e) => setCustomMessage(e.target.value)}
                                    rows={10}
                                    placeholder={`Hej ${selectedLead?.firstName},\n\nHär kommer några objekt jag tror skulle passa dig...`}
                                    className="w-full rounded-md border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d]"
                                />
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="bg-slate-50 rounded-xl border p-8 flex justify-center">
                            <div className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden flex flex-col min-h-[500px]">
                                {/* Email Header */}
                                <div className="bg-[#1a365d] p-4 text-center">
                                    <span className="text-white font-serif font-bold text-lg">SF</span>
                                </div>
                                <div className="p-6 flex-1 space-y-4">
                                    <h1 className="text-lg font-bold text-slate-900 leading-tight">
                                        {customSubject || "Rubrik visas här"}
                                    </h1>
                                    <p className="text-sm text-slate-600 whitespace-pre-line">
                                        {customMessage || "Ditt meddelande visas här..."}
                                    </p>

                                    {/* Properties Preview */}
                                    <div className="space-y-3 mt-4">
                                        {selectedPropsList?.map(p => (
                                            <div key={p._id} className="border rounded-lg overflow-hidden">
                                                <div className="h-24 bg-slate-200 relative">
                                                    {p.images?.[0] && <Image src={p.images[0]} fill alt="" className="object-cover" />}
                                                </div>
                                                <div className="p-2">
                                                    <p className="font-bold text-xs text-[#1a365d]">{p.town}</p>
                                                    <p className="text-xs text-slate-500">{p.price?.toLocaleString()} €</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 4: REVIEW */}
                {currentStep === 4 && (
                    <div className="max-w-2xl mx-auto text-center space-y-8 py-8">
                        <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-[#1a365d]">
                            <Send className="h-10 w-10" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-serif font-bold text-[#1a365d]">Redo att skicka?</h2>
                            <p className="text-slate-600 mt-2">
                                Du är på väg att skicka förslag på <strong>{selectedProperties.length} objekt</strong> till <strong>{selectedLead?.firstName} {selectedLead?.lastName}</strong> ({selectedLead?.email}).
                            </p>
                        </div>

                        <div className="flex justify-center gap-4 pt-4">
                            <button
                                onClick={() => handleSubmit('draft')}
                                className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50"
                            >
                                Spara som utkast
                            </button>
                            <button
                                onClick={() => handleSubmit('send')}
                                className="px-6 py-3 rounded-lg bg-[#1a365d] text-white font-medium hover:bg-[#2a4575] shadow-lg flex items-center gap-2"
                            >
                                <Send className="h-4 w-4" />
                                Skicka nu
                            </button>
                        </div>

                        <div className="border-t pt-6 mt-6">
                            <h3 className="text-sm font-medium text-slate-900 mb-3">Eller schemalägg</h3>
                            <div className="flex justify-center items-center gap-2">
                                <input
                                    type="datetime-local"
                                    className="rounded-md border-slate-300 text-sm"
                                    onChange={(e) => setScheduleDate(e.target.value)}
                                />
                                <button
                                    onClick={() => handleSubmit('schedule')}
                                    disabled={!scheduleDate}
                                    className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Schemalägg
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Footer Actions */}
            <div className="mt-6 flex justify-between">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className={`px-6 py-2 rounded-lg font-medium ${currentStep === 1 ? "invisible" : "text-slate-600 hover:bg-slate-100"}`}
                >
                    Föregående
                </button>

                {currentStep < 4 && (
                    <button
                        onClick={handleNext}
                        disabled={
                            (currentStep === 1 && (!selectedLeadId || selectedProperties.length === 0)) ||
                            (currentStep === 2 && !selectedTemplateId)
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
