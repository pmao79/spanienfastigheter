"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Save,
    Mail,
    Phone,
    Calendar,
    Clock,
    MessageSquare,
    CheckSquare,
    Activity,
    Plus,
    Send,
    FileText,
    Eye
} from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { formatDistanceToNow } from "date-fns";
import { sv } from "date-fns/locale";

export default function LeadDetailPage() {
    const params = useParams();
    const id = params.id as Id<"leads">;

    const lead = useQuery(api.leads.getById, { id });
    const communications = useQuery(api.communications.getByLead, { leadId: id });
    const tasks = useQuery(api.tasks.getByLead, { leadId: id });
    const viewings = useQuery(api.viewings.getByLead, { leadId: id });

    const updateLead = useMutation(api.leads.update);
    const updateStatus = useMutation(api.leads.updateStatus);
    const logCall = useMutation(api.communications.logCall);
    const logNote = useMutation(api.communications.logNote);
    const createTask = useMutation(api.tasks.create);
    const updateTaskStatus = useMutation(api.tasks.updateStatus);

    const [activeTab, setActiveTab] = useState<"overview" | "communications" | "tasks" | "activity" | "viewings">("overview");

    // Quick Actions State
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    // Forms state
    const [noteContent, setNoteContent] = useState("");
    const [callSummary, setCallSummary] = useState("");
    const [taskTitle, setTaskTitle] = useState("");

    if (!lead) return <div className="p-8">Laddar...</div>;

    const handleStatusChange = async (newStatus: string) => {
        await updateStatus({ id, status: newStatus as any });
    };

    const handleAddNote = async (e: React.FormEvent) => {
        e.preventDefault();
        await logNote({ leadId: id, content: noteContent });
        setNoteContent("");
        setIsNoteModalOpen(false);
    };

    const handleLogCall = async (e: React.FormEvent) => {
        e.preventDefault();
        await logCall({ leadId: id, direction: "outbound", summary: callSummary });
        setCallSummary("");
        setIsCallModalOpen(false);
    };

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        await createTask({ leadId: id, title: taskTitle, priority: "medium", dueAt: new Date().toISOString() });
        setTaskTitle("");
        setIsTaskModalOpen(false);
    };

    return (
        <div className="mx-auto max-w-6xl space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/leads" className="rounded-full bg-white p-2 text-slate-500 shadow-sm hover:text-slate-900">
                    <ArrowLeft className="h-4 w-4" />
                </Link>
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-slate-900">
                        {lead.firstName} {lead.lastName}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Mail className="h-3 w-3" /> {lead.email}
                        <span className="text-slate-300">|</span>
                        <Phone className="h-3 w-3" /> {lead.phone || "-"}
                    </div>
                </div>
                <div className="ml-auto flex gap-2">
                    <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="rounded-lg border-0 bg-white py-2 pl-3 pr-8 text-sm font-medium text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-[#1a365d]"
                    >
                        <option value="new">Ny</option>
                        <option value="contacted">Kontaktad</option>
                        <option value="qualified">Kvalificerad</option>
                        <option value="viewing_scheduled">Visning bokad</option>
                        <option value="negotiating">Förhandling</option>
                        <option value="won">Vunnen</option>
                        <option value="lost">Förlorad</option>
                    </select>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {[
                        { id: 'overview', name: 'Översikt', icon: FileText },
                        { id: 'communications', name: 'Kommunikation', icon: MessageSquare },
                        { id: 'tasks', name: 'Uppgifter', icon: CheckSquare },
                        { id: 'viewings', name: 'Visningar', icon: Calendar },
                        { id: 'activity', name: 'Aktivitet', icon: Activity },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`
                        group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium
                        ${activeTab === tab.id
                                    ? 'border-[#1a365d] text-[#1a365d]'
                                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}
                    `}
                        >
                            <tab.icon className={`-ml-0.5 mr-2 h-4 w-4 ${activeTab === tab.id ? 'text-[#1a365d]' : 'text-slate-400 group-hover:text-slate-500'}`} />
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main Content Area */}
                <div className="lg:col-span-2">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div className="rounded-xl bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-medium text-slate-900">Preferenser</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <label className="block text-slate-500">Budget</label>
                                        <span className="font-medium text-slate-900">
                                            €{lead.preferences?.minBudget || 0} - €{lead.preferences?.maxBudget || 'Max'}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="block text-slate-500">Regioner</label>
                                        <span className="font-medium text-slate-900">
                                            {lead.preferences?.regions?.join(", ") || "-"}
                                        </span>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-slate-500">Anteckningar</label>
                                        <p className="text-slate-900">{lead.notes || "Inga anteckningar"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'communications' && (
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="flex gap-2">
                                <button onClick={() => setIsCallModalOpen(true)} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50">
                                    <Phone className="h-4 w-4" /> Logga Samtal
                                </button>
                                <button onClick={() => setIsNoteModalOpen(true)} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50">
                                    <FileText className="h-4 w-4" /> Ny Anteckning
                                </button>
                            </div>

                            {/* Timeline */}
                            <div className="flow-root">
                                <ul role="list" className="-mb-8">
                                    {communications?.map((comm, commIdx) => (
                                        <li key={comm._id}>
                                            <div className="relative pb-8">
                                                {commIdx !== communications.length - 1 ? (
                                                    <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
                                                ) : null}
                                                <div className="relative flex space-x-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 ring-8 ring-white">
                                                        {comm.type.includes('call') && <Phone className="h-4 w-4 text-slate-500" />}
                                                        {comm.type.includes('email') && <Mail className="h-4 w-4 text-slate-500" />}
                                                        {comm.type === 'note' && <FileText className="h-4 w-4 text-slate-500" />}
                                                    </div>
                                                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                        <div>
                                                            <p className="text-sm text-slate-500">
                                                                {comm.content}
                                                            </p>
                                                        </div>
                                                        <div className="whitespace-nowrap text-right text-sm text-slate-500">
                                                            {formatDistanceToNow(new Date(comm.createdAt), { addSuffix: true, locale: sv })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    {communications?.length === 0 && (
                                        <p className="text-center text-sm text-slate-500 py-8">Ingen kommunikation loggad än.</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === 'tasks' && (
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <h3 className="text-lg font-medium text-slate-900">Uppgifter</h3>
                                <button onClick={() => setIsTaskModalOpen(true)} className="flex items-center gap-2 text-sm text-[#1a365d] hover:underline">
                                    <Plus className="h-4 w-4" /> Ny uppgift
                                </button>
                            </div>
                            <ul className="divide-y divide-slate-100 rounded-xl bg-white shadow-sm">
                                {tasks?.map((task) => (
                                    <li key={task._id} className="flex items-center justify-between p-4 hover:bg-slate-50">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => updateTaskStatus({ id: task._id, status: task.status === 'done' ? 'todo' : 'done' })}
                                                className={`flex h-5 w-5 items-center justify-center rounded border ${task.status === 'done' ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300'}`}
                                            >
                                                {task.status === 'done' && <CheckSquare className="h-3 w-3" />}
                                            </button>
                                            <span className={`text-sm ${task.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                                                {task.title}
                                            </span>
                                        </div>
                                        <span className="text-xs text-slate-500">
                                            {task.dueAt ? new Date(task.dueAt).toLocaleDateString() : 'Inget datum'}
                                        </span>
                                    </li>
                                ))}
                                {tasks?.length === 0 && (
                                    <li className="p-8 text-center text-sm text-slate-500">Inga uppgifter.</li>
                                )}
                            </ul>
                        </div>
                    )}

                    {activeTab === 'viewings' && (
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <h3 className="text-lg font-medium text-slate-900">Visningar</h3>
                                <Link
                                    href="/admin/calendar"
                                    className="flex items-center gap-2 text-sm text-[#1a365d] hover:underline"
                                >
                                    <Plus className="h-4 w-4" /> Boka visning
                                </Link>
                            </div>
                            <div className="rounded-xl bg-white shadow-sm overflow-hidden">
                                {viewings?.map((viewing) => (
                                    <div key={viewing._id} className="flex flex-col sm:flex-row p-4 border-b border-slate-100 gap-4 hover:bg-slate-50 transition-colors">
                                        {/* Status Strip */}
                                        <div className={`w-1 rounded-full ${viewing.status === 'confirmed' ? 'bg-green-500' :
                                            viewing.status === 'completed' ? 'bg-slate-400' :
                                                viewing.status === 'cancelled' ? 'bg-red-500' :
                                                    'bg-blue-500'
                                            }`} />

                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-slate-900">
                                                    {new Date(viewing.scheduledAt).toLocaleDateString()}
                                                </span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${viewing.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                    viewing.status === 'completed' ? 'bg-slate-100 text-slate-600' :
                                                        'bg-blue-50 text-blue-700'
                                                    }`}>
                                                    {viewing.status === 'scheduled' ? 'Bokad' :
                                                        viewing.status === 'confirmed' ? 'Bekräftad' :
                                                            viewing.status === 'completed' ? 'Genomförd' : viewing.status}
                                                </span>
                                            </div>
                                            <div className="text-sm text-slate-600 flex items-center gap-2">
                                                <Clock className="h-3 w-3" />
                                                {new Date(viewing.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                <span className="text-slate-300">|</span>
                                                <span>{viewing.propertyIds.length} objekt</span>
                                            </div>
                                            {viewing.meetingPoint && (
                                                <div className="text-xs text-slate-500 mt-1">
                                                    Mötesplats: {viewing.meetingPoint}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/admin/viewings/${viewing._id}`}
                                                className="p-2 text-slate-400 hover:text-[#1a365d] hover:bg-blue-50 rounded transition-colors"
                                                title="Visa detaljer"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            {viewing.status === 'completed' && (
                                                <Link
                                                    href={`/admin/viewings/${viewing._id}/${viewing.status === 'completed' ? 'report' : ''}`} // Assuming report edit/view logic
                                                    className="px-3 py-1.5 text-xs font-medium bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors"
                                                >
                                                    Se rapport
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {viewings?.length === 0 && (
                                    <div className="p-8 text-center text-slate-500">
                                        <Calendar className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                                        <p>Inga visningar bokade än.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-sm font-semibold uppercase text-slate-500">Info</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-slate-500">Skapad</label>
                                <span className="text-sm text-slate-900">{new Date(lead.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <label className="block text-xs text-slate-500">Källa</label>
                                <span className="text-sm text-slate-900">{lead.source}</span>
                            </div>
                            <div>
                                <label className="block text-xs text-slate-500">Temperatur</label>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 capitalize">
                                    {lead.temperature === "hot" && <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>}
                                    {lead.temperature === "warm" && <span className="h-1.5 w-1.5 rounded-full bg-yellow-400"></span>}
                                    {lead.temperature === "cold" && <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>}
                                    {lead.temperature}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {isNoteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                        <h3 className="mb-4 text-lg font-bold">Ny anteckning</h3>
                        <form onSubmit={handleAddNote}>
                            <textarea
                                required
                                className="w-full rounded-md border-slate-300 p-2 text-sm"
                                rows={4}
                                placeholder="Skriv din anteckning..."
                                value={noteContent}
                                onChange={e => setNoteContent(e.target.value)}
                            />
                            <div className="mt-4 flex justify-end gap-2">
                                <button type="button" onClick={() => setIsNoteModalOpen(false)} className="px-4 py-2 text-sm text-slate-500">Avbryt</button>
                                <button type="submit" className="rounded-md bg-[#1a365d] px-4 py-2 text-sm text-white">Spara</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isCallModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                        <h3 className="mb-4 text-lg font-bold">Logga samtal</h3>
                        <form onSubmit={handleLogCall}>
                            <textarea
                                required
                                className="w-full rounded-md border-slate-300 p-2 text-sm"
                                rows={3}
                                placeholder="Vad pratade ni om?"
                                value={callSummary}
                                onChange={e => setCallSummary(e.target.value)}
                            />
                            <div className="mt-4 flex justify-end gap-2">
                                <button type="button" onClick={() => setIsCallModalOpen(false)} className="px-4 py-2 text-sm text-slate-500">Avbryt</button>
                                <button type="submit" className="rounded-md bg-[#1a365d] px-4 py-2 text-sm text-white">Spara</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isTaskModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                        <h3 className="mb-4 text-lg font-bold">Ny uppgift</h3>
                        <form onSubmit={handleCreateTask}>
                            <input
                                required
                                type="text"
                                className="w-full rounded-md border-slate-300 p-2 text-sm"
                                placeholder="Titel..."
                                value={taskTitle}
                                onChange={e => setTaskTitle(e.target.value)}
                            />
                            <div className="mt-4 flex justify-end gap-2">
                                <button type="button" onClick={() => setIsTaskModalOpen(false)} className="px-4 py-2 text-sm text-slate-500">Avbryt</button>
                                <button type="submit" className="rounded-md bg-[#1a365d] px-4 py-2 text-sm text-white">Skapa</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
