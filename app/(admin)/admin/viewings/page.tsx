"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    Search,
    Filter,
    Calendar,
    MapPin,
    User,
    MoreHorizontal,
    CheckCircle2,
    XCircle,
    Clock,
    Eye
} from "lucide-react";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";

export default function ViewingsPage() {
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [assignedToFilter, setAssignedToFilter] = useState<string>("");
    const [dateFilter, setDateFilter] = useState("");

    // Queries
    const viewings = useQuery(api.viewings.getAll, {
        status: statusFilter || undefined,
        assignedToId: assignedToFilter ? (assignedToFilter as Id<"users">) : undefined,
        // dateFrom: dateFilter // TODO: implementing date filtering in backend properly
    });

    const users = useQuery(api.users.getAll, {});

    const updateStatus = useMutation(api.viewings.updateStatus);

    const handleStatusChange = async (id: Id<"viewings">, newStatus: string) => {
        await updateStatus({ id, status: newStatus as any });
    };

    const statusColors: Record<string, string> = {
        scheduled: "bg-blue-50 text-blue-700 border-blue-100",
        confirmed: "bg-green-50 text-green-700 border-green-100",
        in_progress: "bg-yellow-50 text-yellow-700 border-yellow-100",
        completed: "bg-slate-100 text-slate-700 border-slate-200",
        cancelled: "bg-red-50 text-red-700 border-red-100",
        no_show: "bg-red-50 text-red-700 border-red-100",
    };

    const statusLabels: Record<string, string> = {
        scheduled: "Bokad",
        confirmed: "Bekräftad",
        in_progress: "Pågående",
        completed: "Genomförd",
        cancelled: "Avbokad",
        no_show: "No Show",
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Visningar</h1>
                    <p className="text-slate-500">Översikt över alla visningar</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/admin/calendar"
                        className="flex items-center gap-2 rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-medium text-white hover:bg-[#153e75]"
                    >
                        <Calendar className="h-4 w-4" />
                        Gå till Kalender
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                <div className="flex-1 flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Sök visning..."
                            disabled
                            className="w-full rounded-md border-0 bg-slate-50 py-2 pl-10 text-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-[#1a365d]"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-slate-400" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-md border-0 bg-slate-50 py-2 pl-3 pr-8 text-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-[#1a365d]"
                    >
                        <option value="">Alla statusar</option>
                        <option value="scheduled">Bokad</option>
                        <option value="confirmed">Bekräftad</option>
                        <option value="completed">Genomförd</option>
                        <option value="cancelled">Avbokad</option>
                    </select>

                    <select
                        value={assignedToFilter}
                        onChange={(e) => setAssignedToFilter(e.target.value)}
                        className="rounded-md border-0 bg-slate-50 py-2 pl-3 pr-8 text-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-[#1a365d]"
                    >
                        <option value="">Alla partners</option>
                        {users?.map(u => (
                            <option key={u._id} value={u._id}>{u.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* List */}
            <div className="space-y-4">
                {viewings?.map((viewing) => (
                    <div key={viewing._id} className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md sm:flex-row">
                        {/* Status Strip */}
                        <div className={`w-full sm:w-2 ${statusColors[viewing.status]?.split(' ')[0] || 'bg-slate-200'}`} />

                        <div className="flex flex-1 flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">

                            {/* Time & Date */}
                            <div className="flex min-w-[140px] flex-col justify-center border-b pb-4 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">
                                <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
                                    <Clock className="h-5 w-5 text-slate-400" />
                                    {new Date(viewing.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                <div className="ml-7 text-sm text-slate-500">
                                    {new Date(viewing.scheduledAt).toLocaleDateString()} ({viewing.estimatedDuration} min)
                                </div>
                            </div>

                            {/* Main Info */}
                            <div className="flex flex-1 flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-slate-400" />
                                    <span className="font-medium text-slate-900">
                                        {viewing.lead ? `${viewing.lead.firstName} ${viewing.lead.lastName}` : "Okänd Lead"}
                                    </span>
                                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                                        {viewing.propertyIds.length} objekt
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <MapPin className="h-4 w-4" />
                                    {viewing.meetingPoint || "Ingen mötesplats angiven"}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <span>Partner: {viewing.assignedTo?.name || "Ej tilldelad"}</span>
                                </div>
                            </div>

                            {/* Actions & Status */}
                            <div className="flex items-center justify-between gap-4 pt-4 sm:justify-end sm:pt-0">
                                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[viewing.status]}`}>
                                    {statusLabels[viewing.status] || viewing.status}
                                </span>

                                <div className="flex gap-2">
                                    {viewing.status === 'scheduled' && (
                                        <button
                                            onClick={() => handleStatusChange(viewing._id, 'confirmed')}
                                            className="rounded p-2 text-green-600 hover:bg-green-50"
                                            title="Bekräfta"
                                        >
                                            <CheckCircle2 className="h-5 w-5" />
                                        </button>
                                    )}
                                    {(viewing.status === 'scheduled' || viewing.status === 'confirmed') && (
                                        <button
                                            onClick={() => handleStatusChange(viewing._id, 'cancelled')}
                                            className="rounded p-2 text-red-600 hover:bg-red-50"
                                            title="Avboka"
                                        >
                                            <XCircle className="h-5 w-5" />
                                        </button>
                                    )}
                                    <Link
                                        href={`/admin/viewings/${viewing._id}`}
                                        className="rounded p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                                        title="Visa detaljer"
                                    >
                                        <Eye className="h-5 w-5" />
                                    </Link>
                                    <Link
                                        href={`/admin/viewings/${viewing._id}/report`}
                                        className="flex items-center gap-1 rounded bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 hover:bg-blue-100"
                                    >
                                        Skapa rapport
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {viewings?.length === 0 && (
                    <div className="rounded-xl bg-white p-12 text-center text-slate-500">
                        <Calendar className="mx-auto mb-4 h-12 w-12 text-slate-300" />
                        <h3 className="text-lg font-medium text-slate-900">Inga visningar</h3>
                        <p>Det finns inga visningar som matchar dina filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
