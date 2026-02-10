"use client";

import { Id } from "@/convex/_generated/dataModel";
import { format } from "date-fns";
import { User, Building, Euro, Calendar, Phone, Mail, FileText } from "lucide-react";

interface DealInfoProps {
    deal: any; // Using any for now as the type implies enriched data
}

export default function DealInfo({ deal }: DealInfoProps) {
    if (!deal) return null;

    return (
        <div className="space-y-6">
            {/* Financials Card */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 mb-4">
                    <Euro className="h-5 w-5 text-blue-600" />
                    Ekonomi
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <p className="text-sm text-slate-500">Avtalat Pris</p>
                        <p className="text-xl font-bold text-slate-900">
                            {deal.agreedPrice?.toLocaleString() ?? 0} {deal.currency}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Listpris</p>
                        <p className="text-base font-medium text-slate-700">
                            {deal.listPrice?.toLocaleString() ?? 0} {deal.currency}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Reservationsavgift</p>
                        <p className="text-base font-medium text-slate-700">
                            {deal.reservationFee?.toLocaleString() ?? "-"} {deal.currency}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Handpenning (10%)</p>
                        <p className="text-base font-medium text-slate-700">
                            {deal.depositAmount?.toLocaleString() ?? "-"} {deal.currency}
                        </p>
                    </div>
                    <div className="border-t pt-4 sm:col-span-2">
                        <p className="text-sm text-slate-500">Estimerad Provision ({deal.commissionPercent}%)</p>
                        <p className="text-lg font-semibold text-green-600">
                            {Math.round((deal.agreedPrice || 0) * ((deal.commissionPercent || 0) / 100)).toLocaleString()} {deal.currency}
                        </p>
                    </div>
                </div>
            </div>

            {/* Contacts Card */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 mb-4">
                    <User className="h-5 w-5 text-blue-600" />
                    Kontakter
                </h3>
                <div className="space-y-4">
                    {/* Lead */}
                    <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs">
                            K
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-900">Kund (Lead)</p>
                            <p className="text-slate-600">{deal.lead?.firstName} {deal.lead?.lastName}</p>
                            <p className="text-xs text-slate-500">{deal.lead?.email}</p>
                        </div>
                    </div>

                    {/* Agent */}
                    <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 font-bold text-xs">
                            A
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-900">Ansvarig Mäklare</p>
                            <p className="text-slate-600">{deal.assignedTo?.name}</p>
                            <p className="text-xs text-slate-500">{deal.assignedTo?.email}</p>
                        </div>
                    </div>

                    {/* Partner (if exists) */}
                    {deal.partner && (
                        <div className="flex items-start gap-3">
                            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold text-xs">
                                P
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">Partner</p>
                                <p className="text-slate-600">{deal.partner.name}</p>
                            </div>
                        </div>
                    )}

                    {/* Lawyers */}
                    {(deal.buyerLawyerName || deal.notaryName) && (
                        <div className="mt-4 border-t pt-4 space-y-3">
                            {deal.buyerLawyerName && (
                                <div>
                                    <p className="text-sm font-medium text-slate-900 mb-1">Köparens Advokat</p>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <User className="h-3 w-3" /> {deal.buyerLawyerName}
                                    </div>
                                    {deal.buyerLawyerEmail && (
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Mail className="h-3 w-3" /> {deal.buyerLawyerEmail}
                                        </div>
                                    )}
                                </div>
                            )}
                            {deal.notaryName && (
                                <div>
                                    <p className="text-sm font-medium text-slate-900 mb-1">Notarie</p>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <FileText className="h-3 w-3" /> {deal.notaryName}
                                    </div>
                                    <div className="text-xs text-slate-500 ml-5">{deal.notaryAddress}</div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Key Dates Card */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 mb-4">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Viktiga Datum
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Reservation</span>
                        <span className="font-medium text-slate-900">
                            {deal.reservationDate ? format(new Date(deal.reservationDate), 'yyyy-MM-dd') : '-'}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Kontrakt (Arras)</span>
                        <span className="font-medium text-slate-900">
                            {deal.contractDate ? format(new Date(deal.contractDate), 'yyyy-MM-dd') : '-'}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Tillträde (Escritura)</span>
                        <span className="font-medium text-slate-900">
                            {deal.escrituraDate ? format(new Date(deal.escrituraDate), 'yyyy-MM-dd') : '-'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Notes */}
            {deal.notes && (
                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">Anteckningar</h3>
                    <p className="text-sm text-slate-600 whitespace-pre-wrap">{deal.notes}</p>
                </div>
            )}
        </div>
    );
}
