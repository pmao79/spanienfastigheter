"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    Search,
    Filter,
    Plus,
    Mail,
    Phone,
    Calendar,
    MoreHorizontal,
    Kanban
} from "lucide-react";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";

export default function LeadsPage() {
    const [statusFilter, setStatusFilter] = useState<string>("");
    // const [search, setSearch] = useState(""); // Not implemented in backend 'getAll' yet properly for text search

    const leads = useQuery(api.leads.getAll, {
        status: statusFilter || undefined
    });

    const createLead = useMutation(api.leads.create);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLead, setNewLead] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        source: "website",
        temperature: "cold" as "cold" | "warm" | "hot",
        notes: ""
    });

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        await createLead({
            firstName: newLead.firstName,
            lastName: newLead.lastName,
            email: newLead.email,
            phone: newLead.phone,
            source: newLead.source,
            temperature: newLead.temperature,
            notes: newLead.notes
        });
        setIsModalOpen(false);
        setNewLead({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            source: "website",
            temperature: "cold",
            notes: ""
        });
    };


    // Import/Export Logic
    const handleExport = () => {
        if (!leads) return;
        const csvContent = "data:text/csv;charset=utf-8,"
            + "First Name,Last Name,Email,Phone,Status,Source,Temperature,Created At\n"
            + leads.map(l => `${l.firstName},${l.lastName},${l.email},${l.phone || ''},${l.status},${l.source},${l.temperature},${new Date(l.createdAt).toLocaleDateString()}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "leads_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (evt) => {
            const text = evt.target?.result as string;
            if (!text) return;
            // Simple CSV parser: Assumes First Name, Last Name, Email are first 3 columns
            const rows = text.split("\n").slice(1); // Skip header
            let importedCount = 0;
            for (const row of rows) {
                const cols = row.split(",");
                if (cols.length < 3) continue;
                const [firstName, lastName, email, phone] = cols;
                if (!firstName || !email) continue;

                // Simple validation/sanitization
                // In production: Use a proper CSV library
                await createLead({
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    phone: phone?.trim(),
                    source: "import",
                    temperature: "cold",
                    notes: "Imported from CSV"
                });
                importedCount++;
            }
            alert(`Importerade ${importedCount} leads.`);
        };
        reader.readAsText(file);
    };

    const statusColors: Record<string, string> = {
        new: "bg-blue-50 text-blue-700",
        contacted: "bg-yellow-50 text-yellow-700",
        qualified: "bg-purple-50 text-purple-700",
        viewing_scheduled: "bg-orange-50 text-orange-700",
        viewing_done: "bg-indigo-50 text-indigo-700",
        negotiating: "bg-cyan-50 text-cyan-700",
        won: "bg-green-50 text-green-700",
        lost: "bg-red-50 text-red-700",
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Leads & Kunder</h1>
                    <p className="text-slate-500">Hantera dina leads, kunder och affärer</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleExport}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Exportera CSV
                    </button>
                    <label className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center">
                        Importera CSV
                        <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
                    </label>
                    <Link
                        href="/admin/leads/pipeline"
                        className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        <Kanban className="h-4 w-4" />
                        Pipeline
                    </Link>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-medium text-white hover:bg-[#153e75]"
                    >
                        <Plus className="h-4 w-4" />
                        Ny Lead
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Sök på namn eller email..."
                        // value={search}
                        // onChange={(e) => setSearch(e.target.value)}
                        disabled // Search not enabled in backend getAll yet
                        className="w-full rounded-md border-0 bg-slate-50 py-2 pl-10 text-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-[#1a365d]"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-slate-400" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-md border-0 bg-slate-50 py-2 pl-3 pr-8 text-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-[#1a365d]"
                    >
                        <option value="">Alla statusar</option>
                        <option value="new">Ny</option>
                        <option value="contacted">Kontaktad</option>
                        <option value="qualified">Kvalificerad</option>
                        <option value="viewing_scheduled">Visning bokad</option>
                        <option value="won">Vunnen</option>
                        <option value="lost">Förlorad</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Namn</th>
                                <th className="px-6 py-4 font-medium">Kontakt</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Temp</th>
                                <th className="px-6 py-4 font-medium">Källa</th>
                                <th className="px-6 py-4 font-medium">Skapad</th>
                                <th className="px-6 py-4 font-medium text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {leads?.map((lead) => (
                                <tr key={lead._id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <Link href={`/admin/leads/${lead._id}`} className="block">
                                            <p className="font-medium text-slate-900">{lead.firstName} {lead.lastName}</p>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-3 w-3" />
                                                {lead.email}
                                            </div>
                                            {lead.phone && (
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Phone className="h-3 w-3" />
                                                    {lead.phone}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium capitalize ${statusColors[lead.status] || 'bg-slate-100'}`}>
                                            {lead.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-1">
                                            {lead.temperature === 'cold' && <span className="h-2 w-2 rounded-full bg-blue-400"></span>}
                                            {lead.temperature === 'warm' && <span className="h-2 w-2 rounded-full bg-yellow-400"></span>}
                                            {lead.temperature === 'hot' && <span className="h-2 w-2 rounded-full bg-red-500"></span>}
                                            <span className="text-xs text-slate-500 capitalize">{lead.temperature}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{lead.source}</td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/admin/leads/${lead._id}`} className="text-slate-400 hover:text-slate-600">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {leads?.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                                        Inga leads hittades.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* New Lead Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
                        <h2 className="mb-4 text-xl font-bold text-slate-900">Ny Lead</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Förnamn *</label>
                                    <input required type="text" value={newLead.firstName} onChange={e => setNewLead({ ...newLead, firstName: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Efternamn *</label>
                                    <input required type="text" value={newLead.lastName} onChange={e => setNewLead({ ...newLead, lastName: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Email *</label>
                                <input required type="email" value={newLead.email} onChange={e => setNewLead({ ...newLead, email: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Telefon</label>
                                <input type="text" value={newLead.phone} onChange={e => setNewLead({ ...newLead, phone: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Källa</label>
                                    <select value={newLead.source} onChange={e => setNewLead({ ...newLead, source: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2">
                                        <option value="website">Hemsida</option>
                                        <option value="phone">Telefon</option>
                                        <option value="referral">Referral</option>
                                        <option value="partner">Partner</option>
                                        <option value="other">Annat</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Temperatur</label>
                                    <select value={newLead.temperature} onChange={e => setNewLead({ ...newLead, temperature: e.target.value as any })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2">
                                        <option value="cold">Cold 🔵</option>
                                        <option value="warm">Warm 🟡</option>
                                        <option value="hot">Hot 🔴</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Anteckningar</label>
                                <textarea value={newLead.notes} onChange={e => setNewLead({ ...newLead, notes: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" rows={3} />
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100">Avbryt</button>
                                <button type="submit" className="rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a365d]/90">Skapa</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
