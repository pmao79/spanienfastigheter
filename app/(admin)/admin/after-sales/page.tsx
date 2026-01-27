"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Plus, Check, Search, Calendar, Phone, CheckCircle, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { sv } from "date-fns/locale";

export default function AfterSalesPage() {
    const [activeTab, setActiveTab] = useState<"followups" | "services">("followups");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-[#1a365d]">After-Sales</h1>
                    <p className="text-slate-500">
                        Hantera uppföljningar och extratjänster för sålda bostäder.
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex gap-6">
                    <button
                        onClick={() => setActiveTab("followups")}
                        className={`
                            border-b-2 py-4 text-sm font-medium transition-colors
                            ${activeTab === "followups"
                                ? "border-[#1a365d] text-[#1a365d]"
                                : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"}
                        `}
                    >
                        Uppföljningar
                    </button>
                    <button
                        onClick={() => setActiveTab("services")}
                        className={`
                            border-b-2 py-4 text-sm font-medium transition-colors
                            ${activeTab === "services"
                                ? "border-[#1a365d] text-[#1a365d]"
                                : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"}
                        `}
                    >
                        Tjänster & Partners
                    </button>
                </nav>
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
                {activeTab === "followups" && <FollowUpsTab />}
                {activeTab === "services" && <ServicesTab />}
            </div>
        </div>
    );
}

function FollowUpsTab() {
    const [filter, setFilter] = useState("upcoming");
    const followUps = useQuery(api.afterSales.getFollowUps, { status: filter });

    // Dummy helper to create follow-up not strictly needed if we assume auto-creation on deal close
    // But manual creation is good.

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                <div className="flex gap-2">
                    {["upcoming", "overdue", "completed"].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${filter === f ? "bg-blue-50 text-[#1a365d]" : "text-slate-600 hover:bg-slate-50"}`}
                        >
                            {f === "upcoming" ? "Kommande" : f === "overdue" ? "Försenade" : "Avklarade"}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border divide-y">
                {!followUps ? (
                    <div className="p-8 text-center text-slate-500">Laddar...</div>
                ) : followUps.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">Inga uppföljningar i denna vy.</div>
                ) : (
                    followUps.map(task => (
                        <FollowUpItem key={task._id} task={task} />
                    ))
                )}
            </div>
        </div>
    );
}

function FollowUpItem({ task }: { task: any }) {
    const complete = useMutation(api.afterSales.completeFollowUp);

    const handleComplete = async () => {
        if (confirm("Markera som klar?")) {
            await complete({
                id: task._id,
                notes: "Completed via dashboard",
                customerSatisfaction: 5
            });
        }
    };

    return (
        <div className="p-4 flex items-center justify-between hover:bg-slate-50">
            <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${task.completedAt ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                    {task.completedAt ? <CheckCircle className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
                </div>
                <div>
                    <h3 className="font-medium text-slate-900 capitalize">
                        {task.type.replace('_', ' ')} uppföljning
                    </h3>
                    <p className="text-sm text-slate-500">
                        Planerad: {new Date(task.scheduledAt).toLocaleDateString()}
                        {task.notes && <span className="ml-2 text-slate-400">• {task.notes}</span>}
                    </p>
                </div>
            </div>

            {!task.completedAt && (
                <button
                    onClick={handleComplete}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                >
                    <Check className="h-4 w-4" /> Klarmarkera
                </button>
            )}
        </div>
    );
}

function ServicesTab() {
    const services = useQuery(api.afterSales.getServices, {});
    const [isCreating, setIsCreating] = useState(false);

    // Form state
    const [newName, setNewName] = useState("");
    const [newCategory, setNewCategory] = useState("maintenance");

    const createService = useMutation(api.afterSales.createService);

    const handleCreate = async () => {
        await createService({
            name: newName,
            description: "Default description", // Simplified for UI
            category: newCategory as any,
            revenueType: "referral_fee",
        });
        setIsCreating(false);
        setNewName("");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Tjänstekatalog</h2>
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1a365d] text-white rounded-lg text-sm"
                >
                    <Plus className="h-4 w-4" /> Ny Tjänst
                </button>
            </div>

            {isCreating && (
                <div className="bg-slate-50 p-4 rounded-lg border flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="text-xs font-medium text-slate-700">Namn</label>
                        <input className="w-full rounded-md border-slate-300 text-sm" value={newName} onChange={e => setNewName(e.target.value)} />
                    </div>
                    <div className="w-48">
                        <label className="text-xs font-medium text-slate-700">Kategori</label>
                        <select className="w-full rounded-md border-slate-300 text-sm" value={newCategory} onChange={e => setNewCategory(e.target.value)}>
                            <option value="utilities">Utilities</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="reform">Reform</option>
                            <option value="legal">Legal</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <button onClick={handleCreate} className="px-4 py-2 bg-green-600 text-white rounded-md text-sm">Spara</button>
                    <button onClick={() => setIsCreating(false)} className="px-4 py-2 text-slate-500 text-sm">Avbryt</button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services?.map(service => (
                    <div key={service._id} className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-100 text-slate-600 mb-2">
                                {service.category}
                            </span>
                            {service.partnerName && (
                                <span className="text-xs text-blue-600 font-medium">{service.partnerName}</span>
                            )}
                        </div>
                        <h3 className="font-bold text-[#1a365d]">{service.name}</h3>
                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{service.description}</p>

                        <div className="mt-4 pt-4 border-t flex justify-between items-center text-xs text-slate-500">
                            <span>Type: {service.revenueType}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

