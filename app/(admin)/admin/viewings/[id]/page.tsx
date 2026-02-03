"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    Calendar,
    Clock,
    MapPin,
    User,
    Home,
    MessageSquare,
    CheckCircle2,
    XCircle,
    FileText,
    Edit
} from "lucide-react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

export default function ViewingDetailPage() {
    const params = useParams();
    const id = params.id as Id<"viewings">;

    const viewing = useQuery(api.viewings.getById, { id });
    const updateStatus = useMutation(api.viewings.updateStatus);

    if (!viewing) return <div className="p-8">Laddar visning...</div>;

    const statusLabels: Record<string, string> = {
        scheduled: "Bokad",
        confirmed: "Bekräftad",
        in_progress: "Pågående",
        completed: "Genomförd",
        cancelled: "Avbokad",
        no_show: "No Show",
    };

    const statusColors: Record<string, string> = {
        scheduled: "bg-blue-100 text-blue-700",
        confirmed: "bg-green-100 text-green-700",
        in_progress: "bg-yellow-100 text-yellow-700",
        completed: "bg-slate-100 text-slate-700",
        cancelled: "bg-red-100 text-red-700",
        no_show: "bg-red-100 text-red-700",
    };

    return (
        <div className="mx-auto max-w-5xl space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/viewings" className="rounded-full bg-white p-2 text-slate-500 shadow-sm hover:text-slate-900">
                    <ArrowLeft className="h-4 w-4" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Visning</h1>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[viewing.status]}`}>
                            {statusLabels[viewing.status]}
                        </span>
                        <span className="text-slate-300">|</span>
                        <span>Skapad {new Date(viewing.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="ml-auto flex gap-2">
                    {viewing.status === 'scheduled' && (
                        <button
                            onClick={() => updateStatus({ id, status: 'confirmed' })}
                            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                        >
                            <CheckCircle2 className="h-4 w-4" /> Bekräfta
                        </button>
                    )}
                    {(viewing.status === 'scheduled' || viewing.status === 'confirmed') && (
                        <button
                            onClick={() => updateStatus({ id, status: 'cancelled' })}
                            className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                            <XCircle className="h-4 w-4" /> Avboka
                        </button>
                    )}
                    <Link
                        href={`/admin/viewings/${viewing._id}/report`}
                        className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                    >
                        <FileText className="h-4 w-4" />
                        {viewing.status === 'completed' ? 'Visa rapport' : 'Skapa rapport'}
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Date & Time Card */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-xs font-semibold uppercase text-slate-500">Tid & Plats</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="font-medium text-slate-900">
                                        {format(new Date(viewing.scheduledAt), "EEEE d MMMM yyyy", { locale: sv })}
                                    </p>
                                    <p className="text-sm text-slate-500">Datum</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="font-medium text-slate-900">
                                        {format(new Date(viewing.scheduledAt), "HH:mm")} ({viewing.estimatedDuration} min)
                                    </p>
                                    <p className="text-sm text-slate-500">Tid</p>
                                </div>
                            </div>
                            <div className="col-span-2 flex items-start gap-3 pt-4 border-t border-slate-100">
                                <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="font-medium text-slate-900">
                                        {viewing.meetingPoint || "Ingen mötesplats angiven"}
                                    </p>
                                    <p className="text-sm text-slate-500">Mötesplats</p>
                                </div>
                            </div>
                            {viewing.notes && (
                                <div className="col-span-2 flex items-start gap-3 pt-4 border-t border-slate-100">
                                    <MessageSquare className="h-5 w-5 text-slate-400 mt-0.5" />
                                    <div>
                                        <p className="text-slate-900">{viewing.notes}</p>
                                        <p className="text-sm text-slate-500">Anteckningar</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Properties List */}
                    <div className="rounded-xl bg-white shadow-sm overflow-hidden">
                        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                            <h3 className="text-sm font-medium text-slate-900">Objekt ({viewing.properties?.length || 0})</h3>
                        </div>
                        <ul className="divide-y divide-slate-100">
                            {viewing.properties?.map((property: any) => (
                                <li key={property._id} className="flex gap-4 p-4 hover:bg-slate-50 transition-colors">
                                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-200">
                                        {property.images?.[0] ? (
                                            <Image
                                                src={property.images[0]}
                                                alt={property.title || 'Fastighet'}
                                                fill
                                                sizes="112px"
                                                className="object-cover"
                                                unoptimized
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                <Home className="h-8 w-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-medium text-slate-900">{property.title}</h4>
                                                <p className="text-sm text-slate-500">{property.location}</p>
                                            </div>
                                            <span className="font-mono text-xs text-slate-400">{property.reference}</span>
                                        </div>
                                        <div className="mt-2 text-sm font-medium text-[#1a365d]">
                                            €{property.price?.toLocaleString()}
                                        </div>
                                    </div>
                                    <div>
                                        <Link
                                            href={`/admin/properties/${property._id}`}
                                            className="rounded p-2 text-slate-400 hover:bg-white hover:text-slate-600"
                                        >
                                            <ArrowLeft className="h-4 w-4 rotate-180" />
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Lead Card */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xs font-semibold uppercase text-slate-500">Kund</h3>
                            <Link href={`/admin/leads/${viewing.lead?._id}`} className="text-xs font-medium text-[#1a365d] hover:underline">
                                Visa profil
                            </Link>
                        </div>
                        {viewing.lead ? (
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600">
                                    {viewing.lead.firstName[0]}{viewing.lead.lastName[0]}
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">{viewing.lead.firstName} {viewing.lead.lastName}</p>
                                    <p className="text-sm text-slate-500">{viewing.lead.email}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500">Ingen kund kopplad</p>
                        )}
                        {viewing.lead?.phone && (
                            <div className="mt-4 pt-4 border-t border-slate-100 text-sm">
                                <p className="text-slate-500">Telefon</p>
                                <p className="font-medium text-slate-900">{viewing.lead.phone}</p>
                            </div>
                        )}
                    </div>

                    {/* Assigned Partner */}
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-xs font-semibold uppercase text-slate-500">Ansvarig Partner</h3>
                        {viewing.assignedTo ? (
                            <div className="flex items-center gap-3">
                                {viewing.assignedTo.avatar ? (
                                    <Image
                                        src={viewing.assignedTo.avatar}
                                        alt={viewing.assignedTo.name || 'Profilbild'}
                                        width={40}
                                        height={40}
                                        className="h-10 w-10 rounded-full object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                                        <User className="h-5 w-5 text-slate-400" />
                                    </div>
                                )}
                                <div>
                                    <p className="font-medium text-slate-900">{viewing.assignedTo.name}</p>
                                    <p className="text-xs text-slate-500 capitalize">{viewing.assignedTo.role}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500">Ej tilldelad</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
