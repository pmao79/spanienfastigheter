"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { X, Search, Calendar, User, MapPin, Building, Clock } from "lucide-react";
import Image from "next/image";
import { Id } from "@/convex/_generated/dataModel";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialDate?: string;
    initialLeadId?: Id<"leads">;
    initialPropertyId?: Id<"properties">;
}

export default function BookingModal({
    isOpen,
    onClose,
    initialDate,
    initialLeadId,
    initialPropertyId
}: BookingModalProps) {
    const [step, setStep] = useState(1);
    const [leadSearch, setLeadSearch] = useState("");
    const [propertySearch, setPropertySearch] = useState("");

    // Form State
    const [selectedLeadId, setSelectedLeadId] = useState<Id<"leads"> | undefined>(initialLeadId);
    const [selectedPropertyIds, setSelectedPropertyIds] = useState<Id<"properties">[]>(
        initialPropertyId ? [initialPropertyId] : []
    );
    const [assignedToId, setAssignedToId] = useState<Id<"users"> | undefined>();

    const [scheduledDate, setScheduledDate] = useState(initialDate?.split('T')[0] || new Date().toISOString().split('T')[0]);
    const [scheduledTime, setScheduledTime] = useState(initialDate ? initialDate.split('T')[1]?.substring(0, 5) : "10:00");
    const [duration, setDuration] = useState(60); // minutes
    const [meetingPoint, setMeetingPoint] = useState("");
    const [notes, setNotes] = useState("");

    // Data Fetching
    const leads = useQuery(api.leads.getAll, {}); // TODO: Implement search in backend for efficiency
    const properties = useQuery(api.properties.list, {}); // Lightweight list for dropdown
    const users = useQuery(api.users.getAll, {}); // For selected partner

    const createViewing = useMutation(api.viewings.create);

    // Initial load effects
    useEffect(() => {
        if (isOpen) {
            if (initialDate) {
                const [d, t] = initialDate.split('T');
                setScheduledDate(d);
                setScheduledTime(t?.substring(0, 5) || "10:00");
            }
            if (initialLeadId) setSelectedLeadId(initialLeadId);
            if (initialPropertyId) setSelectedPropertyIds([initialPropertyId]);
        }
    }, [isOpen, initialDate, initialLeadId, initialPropertyId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedLeadId || !assignedToId || selectedPropertyIds.length === 0) return;

        await createViewing({
            leadId: selectedLeadId,
            propertyIds: selectedPropertyIds,
            assignedToId: assignedToId,
            scheduledAt: `${scheduledDate}T${scheduledTime}:00`,
            estimatedDuration: duration,
            meetingPoint,
            notes
        });

        onClose();
        resetForm();
    };

    const resetForm = () => {
        setSelectedLeadId(undefined);
        setSelectedPropertyIds([]);
        setAssignedToId(undefined);
        setMeetingPoint("");
        setNotes("");
        setStep(1);
    };

    if (!isOpen) return null;

    // Filtered lists
    const filteredLeads = leads?.filter(l =>
        filterSearch(l.firstName + " " + l.lastName + l.email, leadSearch)
    ).slice(0, 5);

    const filteredProperties = properties?.filter(p =>
        filterSearch(p.ref + " " + p.town + " " + p.type, propertySearch)
    ).slice(0, 5);

    // Get selected objects for display
    const selectedLead = leads?.find(l => l._id === selectedLeadId);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-xl font-bold text-slate-900">Boka visning</h2>
                    <button onClick={onClose} className="rounded-full p-1 hover:bg-slate-100">
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">

                        {/* 1. KUND */}
                        <div className="space-y-3">
                            <label className="block text-sm font-semibold text-slate-900 uppercase tracking-wider text-xs">Kund</label>

                            {!selectedLead ? (
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Sök lead..."
                                        value={leadSearch}
                                        onChange={(e) => setLeadSearch(e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 py-2 pl-10 focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d]"
                                    />
                                    {leadSearch && (
                                        <div className="absolute top-full z-10 mt-1 w-full rounded-lg border bg-white shadow-lg">
                                            {filteredLeads?.map(lead => (
                                                <button
                                                    key={lead._id}
                                                    type="button"
                                                    onClick={() => { setSelectedLeadId(lead._id); setLeadSearch(""); }}
                                                    className="w-full px-4 py-2 text-left hover:bg-slate-50"
                                                >
                                                    <div className="font-medium">{lead.firstName} {lead.lastName}</div>
                                                    <div className="text-xs text-slate-500">{lead.email}</div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50 p-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-blue-900">{selectedLead.firstName} {selectedLead.lastName}</div>
                                            <div className="text-xs text-blue-700">{selectedLead.email} • {selectedLead.phone}</div>
                                        </div>
                                    </div>
                                    <button type="button" onClick={() => setSelectedLeadId(undefined)} className="text-sm font-medium text-blue-600 hover:text-blue-800">Ändra</button>
                                </div>
                            )}
                        </div>

                        {/* 2. OBJEKT */}
                        <div className="space-y-3">
                            <label className="block text-sm font-semibold text-slate-900 uppercase tracking-wider text-xs">Objekt att visa</label>

                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Sök objekt..."
                                    value={propertySearch}
                                    onChange={(e) => setPropertySearch(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 py-2 pl-10 focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d]"
                                />
                                {propertySearch && (
                                    <div className="absolute top-full z-10 mt-1 w-full rounded-lg border bg-white shadow-lg max-h-48 overflow-y-auto">
                                        {filteredProperties?.map(prop => (
                                            <button
                                                key={prop._id}
                                                type="button"
                                                disabled={selectedPropertyIds.includes(prop._id)}
                                                onClick={() => {
                                                    if (!selectedPropertyIds.includes(prop._id)) {
                                                        setSelectedPropertyIds([...selectedPropertyIds, prop._id]);
                                                        setPropertySearch("");
                                                    }
                                                }}
                                                className="w-full px-4 py-2 text-left hover:bg-slate-50 disabled:opacity-50"
                                            >
                                                <div className="font-medium">{prop.ref} - {prop.type} i {prop.town}</div>
                                                <div className="text-xs text-slate-500">€{prop.price.toLocaleString()} • {prop.beds} sovrum</div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                {selectedPropertyIds.map(id => {
                                    const prop: any = properties?.find((p: any) => p._id === id);
                                    if (!prop) return null;
                                    return (
                                        <div key={id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-10 w-16 overflow-hidden rounded bg-slate-100">
                                                    {prop.images?.[0] ? (
                                                        <Image
                                                            src={prop.images[0]}
                                                            alt={prop.ref ? `Fastighet ${prop.ref}` : 'Fastighet'}
                                                            fill
                                                            sizes="64px"
                                                            className="object-cover"
                                                            unoptimized
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full bg-slate-200" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">{prop.ref}</div>
                                                    <div className="text-xs text-slate-500">{prop.town}</div>
                                                </div>
                                            </div>
                                            <button type="button" onClick={() => setSelectedPropertyIds(selectedPropertyIds.filter(pid => pid !== id))} className="text-xs font-medium text-red-600 hover:text-red-800">Ta bort</button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 3. PARTNER & TID */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Partner */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-slate-900 uppercase tracking-wider text-xs">Partner</label>
                                <select
                                    value={assignedToId || ""}
                                    onChange={(e) => setAssignedToId(e.target.value as Id<"users">)}
                                    className="w-full rounded-lg border-slate-300 focus:border-[#1a365d] focus:ring-[#1a365d]"
                                    required
                                >
                                    <option value="">Välj partner...</option>
                                    {users?.map(user => (
                                        <option key={user._id} value={user._id}>{user.name} ({user.role})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Mötesplats */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-slate-900 uppercase tracking-wider text-xs">Mötesplats</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="T.ex. Utanför första objektet..."
                                        value={meetingPoint}
                                        onChange={(e) => setMeetingPoint(e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 py-2 pl-10 focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Datum & Tid */}
                        <div className="space-y-3">
                            <label className="block text-sm font-semibold text-slate-900 uppercase tracking-wider text-xs">Datum & Tid</label>
                            <div className="grid grid-cols-3 gap-4">
                                <input
                                    type="date"
                                    value={scheduledDate}
                                    onChange={(e) => setScheduledDate(e.target.value)}
                                    className="rounded-lg border-slate-300 focus:border-[#1a365d] focus:ring-[#1a365d]"
                                    required
                                />
                                <input
                                    type="time"
                                    value={scheduledTime}
                                    onChange={(e) => setScheduledTime(e.target.value)}
                                    className="rounded-lg border-slate-300 focus:border-[#1a365d] focus:ring-[#1a365d]"
                                    required
                                />
                                <select
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                    className="rounded-lg border-slate-300 focus:border-[#1a365d] focus:ring-[#1a365d]"
                                >
                                    <option value={30}>30 min</option>
                                    <option value={60}>1 timme</option>
                                    <option value={90}>1.5 timmar</option>
                                    <option value={120}>2 timmar</option>
                                    <option value={180}>3 timmar</option>
                                    <option value={240}>4 timmar</option>
                                </select>
                            </div>
                        </div>

                        {/* Anteckningar */}
                        <div className="space-y-3">
                            <label className="block text-sm font-semibold text-slate-900 uppercase tracking-wider text-xs">Anteckningar</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="T.ex. kunden har barn, vill se poolen..."
                                className="w-full rounded-lg border-slate-300 focus:border-[#1a365d] focus:ring-[#1a365d]"
                                rows={3}
                            />
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="border-t bg-slate-50 px-6 py-4 flex justify-end gap-3 rounded-b-xl">
                    <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-200">Avbryt</button>
                    <button
                        type="submit"
                        form="booking-form"
                        disabled={!selectedLeadId || selectedPropertyIds.length === 0 || !assignedToId}
                        className="rounded-lg bg-[#1a365d] px-6 py-2 text-sm font-medium text-white hover:bg-[#153e75] disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                        Boka visning
                    </button>
                </div>
            </div>
        </div>
    );
}

function filterSearch(text: string, search: string) {
    if (!search) return false; // Don't show if no search
    return text.toLowerCase().includes(search.toLowerCase());
}
