"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Plus, Search, Filter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { sv } from "date-fns/locale";

export default function MailingsPage() {
    const [statusFilter, setStatusFilter] = useState<string>("");
    const mailings = useQuery(api.propertyMailings.getAll, {
        status: statusFilter || undefined
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-[#1a365d]">Objektutskick</h1>
                    <p className="text-slate-500">
                        Skicka handplockade objekt till dina leads med personliga meddelanden.
                    </p>
                </div>
                <Link
                    href="/admin/mailings/new"
                    className="flex items-center gap-2 rounded-lg bg-[#1a365d] px-4 py-2 text-white hover:bg-[#2a4575] transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Nytt utskick
                </Link>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Sök mottagare..."
                        className="w-full rounded-md border-0 bg-slate-50 py-2 pl-10 text-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-[#1a365d]"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-slate-500" />
                    <select
                        className="rounded-md border-0 bg-slate-50 py-2 text-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-[#1a365d]"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">Alla statusar</option>
                        <option value="draft">Utkast</option>
                        <option value="scheduled">Schemalagd</option>
                        <option value="sent">Skickad</option>
                        <option value="opened">Öppnad</option>
                        <option value="clicked">Klickad</option>
                    </select>
                </div>
            </div>

            {/* List */}
            <div className="rounded-lg border bg-white shadow-sm">
                <div className="grid grid-cols-7 border-b bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <div className="col-span-2">Mottagare & Ämne</div>
                    <div>Skapad av</div>
                    <div>Status</div>
                    <div>Skickad</div>
                    <div className="text-right">Interaktion</div>
                    <div className="text-right">Åtgärd</div>
                </div>

                <div className="divide-y">
                    {!mailings ? (
                        <div className="p-8 text-center text-slate-500">Laddar utskick...</div>
                    ) : mailings.length === 0 ? (
                        <div className="p-12 text-center">
                            <h3 className="text-lg font-medium text-slate-900">Inga utskick än</h3>
                            <p className="text-slate-500">Skapa ditt första objektutskick för att komma igång.</p>
                        </div>
                    ) : (
                        mailings.map((mailing) => (
                            <div key={mailing._id} className="grid grid-cols-7 items-center px-6 py-4 hover:bg-slate-50">
                                <div className="col-span-2">
                                    <h3 className="font-medium text-[#1a365d]">{mailing.recipientName}</h3>
                                    <p className="truncate text-sm text-slate-500">{mailing.subject}</p>
                                    <div className="mt-1 flex gap-1">
                                        {mailing.propertyIds.map((id) => (
                                            <div key={id} className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                                        ))}
                                        <span className="text-[10px] text-slate-400">
                                            {mailing.propertyIds.length} objekt
                                        </span>
                                    </div>
                                </div>
                                <div className="text-sm">
                                    {mailing?.createdByName}
                                </div>
                                <div>
                                    <StatusBadge status={mailing.status} />
                                </div>
                                <div className="text-sm text-slate-500">
                                    {mailing.sentAt
                                        ? formatDistanceToNow(new Date(mailing.sentAt), { addSuffix: true, locale: sv })
                                        : mailing.scheduledAt
                                            ? `Schemalagd: ${mailing.scheduledAt}`
                                            : "-"}
                                </div>
                                <div className="text-right text-sm">
                                    {mailing.openCount ? (
                                        <span className="inline-flex items-center gap-1 text-green-600">
                                            {mailing.openCount} öppningar
                                        </span>
                                    ) : (
                                        <span className="text-slate-400">-</span>
                                    )}
                                </div>
                                <div className="text-right flex items-center justify-end gap-3">
                                    <Link
                                        href={`/admin/mailings/new?clone=${mailing._id}`}
                                        className="text-sm font-medium text-slate-500 hover:text-[#1a365d]"
                                        title="Skicka igen / Kopiera"
                                    >
                                        Repetera
                                    </Link>
                                    <Link
                                        href={`/admin/mailings/${mailing._id}`}
                                        className="text-sm font-medium text-[#1a365d] hover:underline"
                                    >
                                        Visa
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        draft: "bg-slate-100 text-slate-700",
        scheduled: "bg-blue-50 text-blue-700",
        sent: "bg-indigo-50 text-indigo-700",
        delivered: "bg-green-50 text-green-700",
        opened: "bg-emerald-100 text-emerald-800",
        clicked: "bg-purple-100 text-purple-800",
        bounced: "bg-red-50 text-red-700",
        failed: "bg-red-100 text-red-800",
    };

    const labels: Record<string, string> = {
        draft: "Utkast",
        scheduled: "Schemalagd",
        sent: "Skickad",
        delivered: "Levererad",
        opened: "Öppnad",
        clicked: "Klickad",
        bounced: "Studsad",
        failed: "Misslyckad",
    };

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] || styles.draft}`}>
            {labels[status] || status}
        </span>
    );
}
