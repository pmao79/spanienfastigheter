"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import {
    Search,
    Filter,
    Calendar,
    MapPin,
    User,
    Phone,
    MessageSquare,
    CheckCircle,
    AlertTriangle,
    FileText,
    Eye,
    Edit,
    Plus,
    Home,
    FileCheck,
    Clock
} from "lucide-react";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";
import { format } from "date-fns";
import { sv } from "date-fns/locale";

// Helper functions
function formatRelativeDate(dateStr: string) {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    if (targetDate.getTime() === today.getTime()) return 'IDAG';
    if (targetDate.getTime() === tomorrow.getTime()) return 'IMORGON';
    if (targetDate.getTime() === yesterday.getTime()) return 'IGÅR';

    const diffDays = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 0 && diffDays <= 7) return `OM ${diffDays} DAGAR`;
    if (diffDays < 0 && diffDays >= -7) return `${Math.abs(diffDays)} DAGAR SEDAN`;

    return format(date, 'd MMM yyyy', { locale: sv }).toUpperCase();
}

function formatDayName(dateStr: string) {
    return format(new Date(dateStr), 'EEEE d MMM', { locale: sv });
}

// KPI Cards Component
function ViewingsKPIs({ viewings }: { viewings: any[] }) {
    const now = new Date();
    const upcoming = viewings.filter(v => new Date(v.scheduledAt) > now && v.status !== 'cancelled' && v.status !== 'no_show');
    const completedThisMonth = viewings.filter(v =>
        v.status === 'completed' &&
        new Date(v.scheduledAt).getMonth() === now.getMonth() &&
        new Date(v.scheduledAt).getFullYear() === now.getFullYear()
    );
    const missingReports = viewings.filter(v =>
        v.status === 'completed' && !v.hasReport
    );
    const reportRate = completedThisMonth.length > 0
        ? Math.round((completedThisMonth.filter(v => v.hasReport).length / completedThisMonth.length) * 100)
        : 100;

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                        <div className="text-2xl font-bold text-gray-900">{upcoming.length}</div>
                        <div className="text-sm text-gray-500">Kommande</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="min-w-0">
                        <div className="text-2xl font-bold text-gray-900">{completedThisMonth.length}</div>
                        <div className="text-sm text-gray-500">Genomförda denna månad</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${missingReports.length > 0 ? 'bg-amber-100' : 'bg-gray-100'}`}>
                        <AlertTriangle className={`w-5 h-5 ${missingReports.length > 0 ? 'text-amber-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="min-w-0">
                        <div className={`text-2xl font-bold ${missingReports.length > 0 ? 'text-amber-600' : 'text-gray-900'}`}>
                            {missingReports.length}
                        </div>
                        <div className="text-sm text-gray-500">Rapport saknas</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="min-w-0">
                        <div className="text-2xl font-bold text-gray-900">{reportRate}%</div>
                        <div className="text-sm text-gray-500">Rapportfrekvens</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Viewing Card Component
function ViewingCard({ viewing }: { viewing: any }) {
    const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
        scheduled: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Bokad' },
        confirmed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Bekräftad' },
        in_progress: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pågår' },
        completed: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Genomförd' },
        cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Avbokad' },
        no_show: { bg: 'bg-red-100', text: 'text-red-700', label: 'No Show' },
    };

    const status = statusStyles[viewing.status] || statusStyles.scheduled;
    const viewingDate = new Date(viewing.scheduledAt);
    const isOverdue = viewing.status === 'completed' && !viewing.hasReport &&
        (Date.now() - viewingDate.getTime()) > 48 * 60 * 60 * 1000; // 48 hours

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Property Image */}
                <div className="relative w-full sm:w-24 h-48 sm:h-24 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    {viewing.property?.images?.[0] ? (
                        <Image
                            src={viewing.property.images[0]}
                            alt={viewing.property.title || 'Fastighet'}
                            fill
                            sizes="96px"
                            className="object-cover"
                            unoptimized
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Home className="w-8 h-8" />
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    {/* Header: Date + Status */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2 sm:gap-4">
                        <div className="min-w-0">
                            <div className="text-sm font-semibold text-gray-500 uppercase">
                                {formatRelativeDate(viewing.scheduledAt)} • {formatDayName(viewing.scheduledAt)}
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                                {new Date(viewing.scheduledAt).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
                                <span className="text-sm font-normal text-gray-500 ml-2">
                                    ({viewing.estimatedDuration} min)
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {/* Status badge */}
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text} whitespace-nowrap`}>
                                {status.label}
                            </span>

                            {/* Report status */}
                            {viewing.status === 'completed' && (
                                viewing.hasReport ? (
                                    <span className="flex items-center gap-1 text-xs text-green-600">
                                        <FileCheck className="w-4 h-4" />
                                        Rapport klar
                                    </span>
                                ) : (
                                    <span className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-600 font-semibold' : 'text-amber-600'}`}>
                                        <AlertTriangle className="w-4 h-4" />
                                        {isOverdue ? 'Rapport försenad!' : 'Rapport saknas'}
                                    </span>
                                )
                            )}
                        </div>
                    </div>

                    {/* Property Info */}
                    {viewing.property && (
                        <div className="mb-3">
                            <div className="font-semibold text-gray-800">
                                {viewing.property.referenceNumber} • {viewing.property.title}
                            </div>
                            <div className="text-sm text-gray-500">
                                {viewing.property.region}
                                {viewing.property.price && ` • €${viewing.property.price.toLocaleString()}`}
                                {viewing.property.bedrooms && ` • ${viewing.property.bedrooms} sov`}
                                {viewing.property.hasPool && ' • Pool'}
                            </div>
                        </div>
                    )}

                    {/* Lead + Contact */}
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-x-6 sm:gap-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">
                                {viewing.lead ? `${viewing.lead.firstName} ${viewing.lead.lastName}` : 'Okänd kund'}
                            </span>
                        </div>

                        {viewing.lead?.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <a href={`tel:${viewing.lead.phone}`} className="text-gray-600 hover:text-[#1a365d]">
                                    {viewing.lead.phone}
                                </a>
                            </div>
                        )}

                        {viewing.meetingPoint && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 truncate">{viewing.meetingPoint}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">Partner: {viewing.assignedTo?.name || 'Ej tilldelad'}</span>
                        </div>
                    </div>

                    {/* Notes */}
                    {viewing.notes && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-sm text-gray-600 italic">
                                &ldquo;{viewing.notes}&rdquo;
                            </p>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-2 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 sm:flex-shrink-0">
                    {/* Quick buttons */}
                    <div className="flex gap-2 sm:flex-col sm:gap-1 order-2 sm:order-1">
                        {viewing.lead?.phone && (
                            <>
                                <a
                                    href={`tel:${viewing.lead.phone}`}
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 transition-colors"
                                    title="Ring"
                                >
                                    <Phone className="w-4 h-4" />
                                </a>
                                <a
                                    href={`sms:${viewing.lead.phone}`}
                                    className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors"
                                    title="SMS"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                </a>
                            </>
                        )}
                        {viewing.meetingPoint && (
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(viewing.meetingPoint)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-600 transition-colors"
                                title="Visa på karta"
                            >
                                <MapPin className="w-4 h-4" />
                            </a>
                        )}
                    </div>

                    {/* Main button */}
                    <div className="order-1 sm:order-2">
                        {viewing.status === 'completed' && !viewing.hasReport ? (
                            <Link
                                href={`/admin/viewings/${viewing._id}/report`}
                                className="px-4 py-2 bg-[#1a365d] text-white text-sm font-medium rounded-lg hover:bg-[#2d4a7c] transition-colors flex items-center justify-center gap-2"
                            >
                                <FileText className="w-4 h-4" />
                                Skapa rapport
                            </Link>
                        ) : viewing.status === 'completed' && viewing.hasReport ? (
                            <Link
                                href={`/admin/viewings/${viewing._id}`}
                                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <Eye className="w-4 h-4" />
                                Visa rapport
                            </Link>
                        ) : (
                            <Link
                                href={`/admin/viewings/${viewing._id}`}
                                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <Edit className="w-4 h-4" />
                                Redigera
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ViewingsPage() {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled' | 'all'>('upcoming');

    // Queries
    const viewings = useQuery(api.viewings.getAll, {});

    const filteredViewings = useMemo(() => {
        if (!viewings) return [];
        const now = new Date();
        switch (activeTab) {
            case 'upcoming':
                return viewings.filter(v => new Date(v.scheduledAt) >= now && v.status !== 'cancelled' && v.status !== 'no_show');
            case 'completed':
                return viewings.filter(v => v.status === 'completed');
            case 'cancelled':
                return viewings.filter(v => v.status === 'cancelled' || v.status === 'no_show');
            default:
                return viewings;
        }
    }, [viewings, activeTab]);

    // Tab counts
    const counts = useMemo(() => {
        if (!viewings) return { upcoming: 0, completed: 0, cancelled: 0, all: 0 };
        const now = new Date();
        return {
            upcoming: viewings.filter(v => new Date(v.scheduledAt) >= now && v.status !== 'cancelled' && v.status !== 'no_show').length,
            completed: viewings.filter(v => v.status === 'completed').length,
            cancelled: viewings.filter(v => v.status === 'cancelled' || v.status === 'no_show').length,
            all: viewings.length,
        };
    }, [viewings]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Visningar</h1>
                    <p className="text-sm sm:text-base text-gray-500">Översikt över alla visningar</p>
                </div>
                <div className="flex gap-2 sm:gap-3">
                    <Link
                        href="/admin/calendar"
                        className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
                        <Calendar className="w-4 h-4" />
                        <span className="hidden sm:inline">Kalender</span>
                    </Link>
                    <button
                        className="flex-1 sm:flex-none px-4 py-2 bg-[#1a365d] text-white rounded-lg text-sm font-medium hover:bg-[#2d4a7c] flex items-center justify-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Ny visning</span>
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            {viewings && <ViewingsKPIs viewings={viewings} />}

            {/* Tabs */}
            <div className="flex gap-1 border-b border-gray-200 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                {[
                    { id: 'upcoming' as const, label: 'Kommande', count: counts.upcoming },
                    { id: 'completed' as const, label: 'Genomförda', count: counts.completed },
                    { id: 'cancelled' as const, label: 'Avbokade', count: counts.cancelled },
                    { id: 'all' as const, label: 'Alla', count: counts.all },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            px-3 sm:px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                            ${activeTab === tab.id
                                ? 'border-[#1a365d] text-[#1a365d]'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }
                        `}
                    >
                        {tab.label}
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-[#1a365d] text-white' : 'bg-gray-100 text-gray-600'
                            }`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Viewing List */}
            <div className="space-y-4">
                {filteredViewings.map((viewing) => (
                    <ViewingCard key={viewing._id} viewing={viewing} />
                ))}

                {/* Empty State */}
                {filteredViewings.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                            <Calendar className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                            {activeTab === 'upcoming' && 'Inga kommande visningar'}
                            {activeTab === 'completed' && 'Inga genomförda visningar'}
                            {activeTab === 'cancelled' && 'Inga avbokade visningar'}
                            {activeTab === 'all' && 'Inga visningar'}
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {activeTab === 'upcoming' && 'Boka en visning för att komma igång'}
                            {activeTab === 'completed' && 'Inga visningar har genomförts ännu'}
                            {activeTab === 'cancelled' && 'Inga visningar har avbokats'}
                            {activeTab === 'all' && 'Det finns inga visningar i systemet'}
                        </p>
                        {activeTab === 'upcoming' && (
                            <button className="px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors inline-flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Boka ny visning
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
