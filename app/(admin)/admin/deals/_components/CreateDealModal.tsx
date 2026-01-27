"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { X, Search } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

interface CreateDealModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateDealModal({ isOpen, onClose }: CreateDealModalProps) {
    const createDeal = useMutation(api.deals.create);
    const leads = useQuery(api.leads.getAll, {}) || [];
    const properties = useQuery(api.properties.list, {}) || [];
    const users = useQuery(api.users.getAll, {}) || [];

    const [formData, setFormData] = useState({
        leadId: "",
        propertyId: "",
        listPrice: 0,
        agreedPrice: 0,
        reservationFee: 6000,
        commissionPercent: 5,
        assignedToId: "",
        partnerId: "",
        notes: ""
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            await createDeal({
                leadId: formData.leadId as Id<"leads">,
                propertyId: formData.propertyId as Id<"properties">,
                listPrice: Number(formData.listPrice),
                agreedPrice: Number(formData.agreedPrice),
                reservationFee: Number(formData.reservationFee),
                commissionPercent: Number(formData.commissionPercent),
                assignedToId: formData.assignedToId as Id<"users">,
                partnerId: formData.partnerId ? formData.partnerId as Id<"users"> : undefined,
                notes: formData.notes
            });
            setStatus("success");
            onClose();
            // Reset form
            setFormData({
                leadId: "",
                propertyId: "",
                listPrice: 0,
                agreedPrice: 0,
                reservationFee: 6000,
                commissionPercent: 5,
                assignedToId: "",
                partnerId: "",
                notes: ""
            });
        } catch (error) {
            console.error("Failed to create deal:", error);
            setStatus("idle");
        }
    };

    const handlePropertySelect = (propertyId: string) => {
        const property = properties.find(p => p._id === propertyId);
        setFormData(prev => ({
            ...prev,
            propertyId,
            listPrice: property?.price || 0,
            agreedPrice: property?.price || 0 // Default to list price
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-100 p-6">
                    <h2 className="text-xl font-bold text-slate-900">Skapa ny deal</h2>
                    <button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Customer & Property Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Kund (Lead)</label>
                            <select
                                required
                                value={formData.leadId}
                                onChange={(e) => setFormData({ ...formData, leadId: e.target.value })}
                                className="w-full rounded-lg border-slate-200 focus:border-[#1a365d] focus:ring-[#1a365d]"
                            >
                                <option value="">Välj kund...</option>
                                {leads.map(lead => (
                                    <option key={lead._id} value={lead._id}>
                                        {lead.firstName} {lead.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Objekt</label>
                            <select
                                required
                                value={formData.propertyId}
                                onChange={(e) => handlePropertySelect(e.target.value)}
                                className="w-full rounded-lg border-slate-200 focus:border-[#1a365d] focus:ring-[#1a365d]"
                            >
                                <option value="">Välj objekt...</option>
                                {properties.map(property => (
                                    <option key={property._id} value={property._id}>
                                        {property.town}, {property.type} ({property.ref}) - {property.price?.toLocaleString()} €
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Economics */}
                    <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-4">
                        <h3 className="text-sm font-semibold text-slate-900">Ekonomi</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs text-slate-500 mb-1">Listpris (€)</label>
                                <input
                                    type="number"
                                    value={formData.listPrice}
                                    readOnly
                                    className="w-full rounded bg-slate-200 border-transparent text-slate-500 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Avtalat Pris (€)</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.agreedPrice}
                                    onChange={(e) => setFormData({ ...formData, agreedPrice: Number(e.target.value) })}
                                    className="w-full rounded border-slate-200 focus:border-[#1a365d] focus:ring-[#1a365d]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-700 mb-1">Reservationsavgift (€)</label>
                                <input
                                    type="number"
                                    value={formData.reservationFee}
                                    onChange={(e) => setFormData({ ...formData, reservationFee: Number(e.target.value) })}
                                    className="w-full rounded border-slate-200 focus:border-[#1a365d] focus:ring-[#1a365d]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Team & Commission */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Ansvarig</label>
                            <select
                                required
                                value={formData.assignedToId}
                                onChange={(e) => setFormData({ ...formData, assignedToId: e.target.value })}
                                className="w-full rounded-lg border-slate-200 focus:border-[#1a365d] focus:ring-[#1a365d]"
                            >
                                <option value="">Välj ansvarig...</option>
                                {users.filter(u => u.role === 'admin' || u.role === 'agent' || u.role === 'owner').map(user => (
                                    <option key={user._id} value={user._id}>{user.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Partner (Optionellt)</label>
                            <select
                                value={formData.partnerId}
                                onChange={(e) => setFormData({ ...formData, partnerId: e.target.value })}
                                className="w-full rounded-lg border-slate-200 focus:border-[#1a365d] focus:ring-[#1a365d]"
                            >
                                <option value="">Ingen partner</option>
                                {users.filter(u => u.role === 'sales_partner').map(user => (
                                    <option key={user._id} value={user._id}>{user.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Provision (%)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.1"
                                    value={formData.commissionPercent}
                                    onChange={(e) => setFormData({ ...formData, commissionPercent: Number(e.target.value) })}
                                    className="w-full rounded-lg border-slate-200 pl-3 pr-8 focus:border-[#1a365d] focus:ring-[#1a365d]"
                                />
                                <span className="absolute right-3 top-2.5 text-slate-400">%</span>
                            </div>
                            <p className="text-xs text-slate-500">
                                Estimerad: {Math.round(formData.agreedPrice * (formData.commissionPercent / 100)).toLocaleString()} €
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
                        >
                            Avbryt
                        </button>
                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="rounded-lg bg-[#1a365d] px-6 py-2 text-sm font-medium text-white hover:bg-[#153e75] disabled:opacity-50"
                        >
                            {status === "submitting" ? "Skapar..." : "Skapa Deal"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
