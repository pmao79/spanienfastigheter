"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { User, Phone, Mail, Globe, Hash, Save } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
    const user = useQuery(api.users.getMyProfile);
    const updateProfile = useMutation(api.users.updateProfile);

    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        displayName: "",
        title: "",
        phone: "",
        emailPublic: "",
        bio: "",
        initials: "",
        avatarUrl: ""
    });

    // Load user data
    useEffect(() => {
        if (user) {
            setFormData({
                displayName: user.displayName || user.name || "",
                title: user.title || "",
                phone: user.phone || "",
                emailPublic: user.emailPublic || user.email || "",
                bio: user.bio || "",
                initials: user.initials || "",
                avatarUrl: user.avatarUrl || user.avatar || ""
            });
        }
    }, [user]);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            await updateProfile({
                displayName: formData.displayName,
                title: formData.title,
                phone: formData.phone,
                emailPublic: formData.emailPublic,
                bio: formData.bio,
                initials: formData.initials,
                avatarUrl: formData.avatarUrl,
            });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error("Failed to save profile:", error);
            alert("Kunde inte spara profilen.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return <div className="p-8 text-slate-500">Laddar profil...</div>;

    return (
        <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-8 pb-32">
            <h1 className="text-2xl font-bold text-[#1a365d] font-serif">Min Profil</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* FORM */}
                <div className="space-y-6">

                    {/* AVATAR */}
                    <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm flex items-center gap-6">
                        <div className="relative w-20 h-20 rounded-full bg-[#1a365d] text-white flex items-center justify-center text-2xl font-bold shrink-0 overflow-hidden">
                            {formData.avatarUrl ? (
                                <Image
                                    src={formData.avatarUrl}
                                    alt="Avatar"
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                    unoptimized
                                />
                            ) : (
                                formData.initials || "SF"
                            )}
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="block text-sm font-medium text-slate-700">Avatar URL</label>
                            <input
                                type="text"
                                placeholder="https://..."
                                value={formData.avatarUrl}
                                onChange={e => setFormData({ ...formData, avatarUrl: e.target.value })}
                                className="w-full rounded-md border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d] text-sm"
                            />
                            <p className="text-xs text-slate-500">Visas i email-signaturer och på hemsidan.</p>
                        </div>
                    </div>

                    <div className="space-y-5 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-800 border-b pb-4 mb-4">Personuppgifter</h2>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Visningsnamn *</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={formData.displayName}
                                    onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                                    className="pl-9 w-full rounded-md border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d] text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Titel</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                placeholder="t.ex. Senior Mäklare"
                                className="w-full rounded-md border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d] text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Telefon</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+46 70..."
                                    className="pl-9 w-full rounded-md border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d] text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Publik Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    type="email"
                                    value={formData.emailPublic}
                                    onChange={e => setFormData({ ...formData, emailPublic: e.target.value })}
                                    className="pl-9 w-full rounded-md border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d] text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Initialer (för signatur)</label>
                            <div className="relative">
                                <Hash className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={formData.initials}
                                    onChange={e => setFormData({ ...formData, initials: e.target.value.toUpperCase() })}
                                    maxLength={3}
                                    className="pl-9 w-full rounded-md border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d] text-sm uppercase"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                            <textarea
                                value={formData.bio}
                                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                rows={4}
                                className="w-full rounded-md border-slate-300 shadow-sm focus:border-[#1a365d] focus:ring-[#1a365d] text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* VISUALIZATION */}
                <div className="space-y-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 sticky top-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Förhandsgranskning Signatur</h3>
                            {showSuccess && (
                                <span className="text-green-600 text-sm font-medium flex items-center gap-1 animate-fadeIn">
                                    <Save className="h-4 w-4" /> Sparat!
                                </span>
                            )}
                        </div>

                        {/* SIGNATURE PREVIEW */}
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 max-w-md mx-auto">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative w-14 h-14 rounded-full bg-[#1a365d] text-white flex items-center justify-center font-bold text-xl shrink-0 overflow-hidden">
                                    {formData.avatarUrl ? (
                                        <Image
                                            src={formData.avatarUrl}
                                            alt="Avatar"
                                            fill
                                            sizes="56px"
                                            className="object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        formData.initials || "SF"
                                    )}
                                </div>
                                <div>
                                    <div className="text-[#1a365d] font-bold text-lg">{formData.displayName || "Ditt Namn"}</div>
                                    <div className="text-slate-500 text-sm">{formData.title || "Din Titel"}</div>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-slate-600 pl-1">
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-slate-400" />
                                    {formData.phone || "+46 ..."}
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                    {formData.emailPublic || "email@spanienfastigheter.se"}
                                </div>
                                <div className="flex items-center gap-3">
                                    <Globe className="h-4 w-4 text-slate-400" />
                                    spanienfastigheter.se
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                                className="bg-[#1a365d] hover:bg-[#152b4d] text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>Sparar...</>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        Spara ändringar
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
