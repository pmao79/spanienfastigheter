"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Plus, Edit, Trash, Check, X, Search } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

export default function EmailTemplatesPage() {
    const templates = useQuery(api.emailTemplates.getAll);
    const createTemplate = useMutation(api.emailTemplates.create);
    const updateTemplate = useMutation(api.emailTemplates.update);
    const deleteTemplate = useMutation(api.emailTemplates.deleteTemplate);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<any>(null);
    const [search, setSearch] = useState("");

    const filteredTemplates = templates?.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.subject.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            subject: formData.get("subject") as string,
            body: formData.get("body") as string,
            category: formData.get("category") as "welcome" | "follow_up" | "general",
            isActive: true
        };

        if (editingTemplate) {
            await updateTemplate({ id: editingTemplate._id, ...data });
        } else {
            await createTemplate(data);
        }
        setIsModalOpen(false);
        setEditingTemplate(null);
    };

    return (
        <div className="mx-auto max-w-5xl space-y-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">E-postmallar</h1>
                <button
                    onClick={() => { setEditingTemplate(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-medium text-white hover:bg-[#153e75]"
                >
                    <Plus className="h-4 w-4" /> Ny mall
                </button>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Sök mallar..."
                    className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-slate-400"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates?.map((template) => (
                    <div key={template._id} className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <span className={`rounded-full px-2 py-1 text-xs font-medium uppercase tracking-wider ${template.category === 'welcome' ? 'bg-green-50 text-green-700' :
                                    template.category === 'follow_up' ? 'bg-blue-50 text-blue-700' :
                                        'bg-slate-50 text-slate-700'
                                }`}>
                                {template.category}
                            </span>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => { setEditingTemplate(template); setIsModalOpen(true); }}
                                    className="rounded p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                                >
                                    <Edit className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => { if (confirm('Är du säker?')) deleteTemplate({ id: template._id }) }}
                                    className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
                                >
                                    <Trash className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        <h3 className="mt-3 font-semibold text-slate-900">{template.name}</h3>
                        <p className="mb-4 text-sm text-slate-500">{template.subject}</p>
                        <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                            <span>{new Date(template.updatedAt).toLocaleDateString()}</span>
                            <span className={template.isActive ? "text-green-600 font-medium" : "text-slate-400"}>
                                {template.isActive ? "Aktiv" : "Inaktiv"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b p-6">
                            <h2 className="text-xl font-bold">{editingTemplate ? 'Redigera mall' : 'Ny mall'}</h2>
                            <button onClick={() => setIsModalOpen(false)}><X className="h-5 w-5 text-slate-400" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">Namn</label>
                                    <input name="name" defaultValue={editingTemplate?.name} required className="w-full rounded-lg border-slate-300 text-sm" placeholder="T.ex. Välkomstmail" />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">Kategori</label>
                                    <select name="category" defaultValue={editingTemplate?.category || "general"} className="w-full rounded-lg border-slate-300 text-sm">
                                        <option value="welcome">Välkomst</option>
                                        <option value="follow_up">Uppföljning</option>
                                        <option value="viewing_confirmation">Visningsbekräftelse</option>
                                        <option value="property_matching">Matchning</option>
                                        <option value="general">Allmänt</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Ämne</label>
                                <input name="subject" defaultValue={editingTemplate?.subject} required className="w-full rounded-lg border-slate-300 text-sm" placeholder="Mailets ämnesrad..." />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">Innehåll</label>
                                <div className="mb-2 text-xs text-slate-500">
                                    Tillgängliga variabler: {'{{firstName}}'}, {'{{lastName}}'}, {'{{agentName}}'}
                                </div>
                                <textarea name="body" defaultValue={editingTemplate?.body} required rows={10} className="w-full rounded-lg border-slate-300 text-sm font-mono" placeholder="Hej {{firstName}}, ..." />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800">Avbryt</button>
                                <button type="submit" className="rounded-lg bg-[#1a365d] px-6 py-2 text-sm font-medium text-white hover:bg-[#153e75]">Spara mall</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
