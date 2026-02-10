
"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    Plus,
    Trash,
    Edit,
    Save,
    X,
    Check,
    Loader2
} from "lucide-react";

export default function CommissionProfilesPage() {
    const profiles = useQuery(api.commissions.getProfiles);
    const createProfile = useMutation(api.commissions.createProfile);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type: "fixed_percent" as "fixed_percent" | "tiered" | "per_deal",
        fixedPercent: 0,
        tiers: [{ minDeals: 1, maxDeals: 10, percent: 10, bonus: 0 }]
    });

    if (!profiles) {
        return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-slate-400" /></div>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createProfile({
                name: formData.name,
                description: formData.description,
                type: formData.type,
                fixedPercent: formData.type === "fixed_percent" ? Number(formData.fixedPercent) : undefined,
                tiers: formData.type === "tiered" ? formData.tiers.map(t => ({
                    minDeals: Number(t.minDeals),
                    maxDeals: Number(t.maxDeals),
                    percent: Number(t.percent),
                    bonus: Number(t.bonus)
                })) : undefined
            });
            setIsModalOpen(false);
            setFormData({
                name: "",
                description: "",
                type: "fixed_percent",
                fixedPercent: 0,
                tiers: [{ minDeals: 1, maxDeals: 10, percent: 10, bonus: 0 }]
            });
        } catch (error) {
            console.error("Failed to create profile", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Provisionsprofiler</h1>
                    <p className="text-slate-500">Hantera lönemodeller för agenter och partners</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-medium text-white hover:bg-[#153e75]"
                >
                    <Plus className="h-4 w-4" />
                    Ny Profil
                </button>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {profiles.map((profile) => (
                    <div key={profile._id} className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-900">{profile.name}</h3>
                                {profile.description && <p className="text-sm text-slate-500">{profile.description}</p>}
                                <div className="mt-2 text-sm">
                                    <span className="font-medium text-slate-700">Typ: </span>
                                    <span className="capitalize">{profile.type.replace('_', ' ')}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${profile.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                                    {profile.isActive ? 'Aktiv' : 'Inaktiv'}
                                </span>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="mt-4 border-t border-slate-100 pt-4">
                            {profile.type === "fixed_percent" && (
                                <p className="text-lg font-bold text-slate-900">{profile.fixedPercent}% provision</p>
                            )}
                            {profile.type === "tiered" && (
                                <div className="space-y-1">
                                    {profile.tiers?.map((tier: any, idx: number) => (
                                        <div key={idx} className="flex justify-between text-sm">
                                            <span className="text-slate-600">{tier.minDeals}-{tier.maxDeals || "∞"} affärer</span>
                                            <span className="font-medium text-slate-900">{tier.percent}% {tier.bonus ? `+ €${tier.bonus} bonus` : ''}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-900">Skapa Provisionsprofil</h2>
                            <button onClick={() => setIsModalOpen(false)}><X className="h-5 w-5 text-slate-400" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Namn</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Typ</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="fixed_percent"
                                            checked={formData.type === "fixed_percent"}
                                            onChange={() => setFormData({ ...formData, type: "fixed_percent" })}
                                        />
                                        <span className="text-sm">Fast %</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="tiered"
                                            checked={formData.type === "tiered"}
                                            onChange={() => setFormData({ ...formData, type: "tiered" })}
                                        />
                                        <span className="text-sm">Trappsteg</span>
                                    </label>
                                </div>
                            </div>

                            {formData.type === "fixed_percent" && (
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">Procent (%)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2"
                                        value={formData.fixedPercent}
                                        onChange={e => setFormData({ ...formData, fixedPercent: Number(e.target.value) })}
                                    />
                                </div>
                            )}

                            {formData.type === "tiered" && (
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">Nivåer</label>
                                    {formData.tiers.map((tier, idx) => (
                                        <div key={idx} className="mb-2 flex gap-2">
                                            <input type="number" placeholder="Min" className="w-16 rounded border px-2 py-1" value={tier.minDeals} onChange={e => {
                                                const newTiers = [...formData.tiers];
                                                newTiers[idx].minDeals = Number(e.target.value);
                                                setFormData({ ...formData, tiers: newTiers });
                                            }} />
                                            <span className="self-center">-</span>
                                            <input type="number" placeholder="Max" className="w-16 rounded border px-2 py-1" value={tier.maxDeals} onChange={e => {
                                                const newTiers = [...formData.tiers];
                                                newTiers[idx].maxDeals = Number(e.target.value);
                                                setFormData({ ...formData, tiers: newTiers });
                                            }} />
                                            <input type="number" placeholder="%" className="w-16 rounded border px-2 py-1" value={tier.percent} onChange={e => {
                                                const newTiers = [...formData.tiers];
                                                newTiers[idx].percent = Number(e.target.value);
                                                setFormData({ ...formData, tiers: newTiers });
                                            }} />
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => setFormData({ ...formData, tiers: [...formData.tiers, { minDeals: 0, maxDeals: 0, percent: 0, bonus: 0 }] })} className="text-xs text-blue-600 hover:underline">+ Lägg till nivå</button>
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100">Avbryt</button>
                                <button type="submit" className="rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-medium text-white hover:bg-[#153e75]">Spara</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
