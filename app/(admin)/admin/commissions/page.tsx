
"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    Check,
    X,
    CreditCard,
    Filter,
    Search,
    Loader2,
    AlertCircle
} from "lucide-react";

export default function CommissionsPage() {
    const [statusFilter, setStatusFilter] = useState("pending");
    const [selectedPayouts, setSelectedPayouts] = useState<string[]>([]);

    const payouts = useQuery(api.commissions.getPayouts, { status: statusFilter !== "all" ? statusFilter : undefined });
    const summary = useQuery(api.commissions.getCommissionSummary);

    const approve = useMutation(api.commissions.approvePayout);
    const markPaid = useMutation(api.commissions.markAsPaid);

    if (!payouts || !summary) {
        return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-slate-400" /></div>;
    }

    const handleApprove = async (id: any) => {
        try {
            await approve({ payoutId: id });
        } catch (error) {
            console.error("Failed to approve", error);
            alert("Kunde inte godkänna. Kontrollera dina rättigheter.");
        }
    };

    const handlePay = async (id: any) => {
        const ref = prompt("Ange betalningsreferens (löne-ID eller fakturanummer):");
        if (ref) {
            try {
                await markPaid({ payoutId: id, paymentReference: ref });
            } catch (error) {
                console.error("Failed to pay", error);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Provisioner</h1>
                    <p className="text-slate-500">Hantera utbetalningar och godkännanden</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-orange-50 p-4 border border-orange-100">
                    <p className="text-xs font-medium text-orange-600 uppercase">Väntar</p>
                    <p className="mt-2 text-2xl font-bold text-orange-900">€{summary.pendingTotal.toLocaleString()}</p>
                    <p className="text-sm text-orange-700">{summary.pendingCount} affärer</p>
                </div>
                <div className="rounded-lg bg-green-50 p-4 border border-green-100">
                    <p className="text-xs font-medium text-green-600 uppercase">Godkända</p>
                    <p className="mt-2 text-2xl font-bold text-green-900">€{summary.approvedTotal.toLocaleString()}</p>
                    <p className="text-sm text-green-700">{summary.approvedCount} affärer</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                    <p className="text-xs font-medium text-slate-600 uppercase">Utbetalt {new Date().getFullYear()}</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">€{summary.paidThisYear.toLocaleString()}</p>
                    <p className="text-sm text-slate-500">{summary.paidCount} affärer</p>
                </div>
                <div className="rounded-lg bg-white p-4 border border-slate-200 shadow-sm flex items-center justify-center text-center">
                    <div>
                        <p className="text-slate-500 text-sm">Totalt provision</p>
                        <p className="font-medium text-slate-900">{(summary.paidThisYear + summary.approvedTotal + summary.pendingTotal).toLocaleString()} €</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 border-b border-slate-200 pb-4">
                {["pending", "approved", "paid", "all"].map((s) => (
                    <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`
                            rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors
                            ${statusFilter === s
                                ? "bg-[#1a365d] text-white"
                                : "bg-white text-slate-600 hover:bg-slate-50"}
                        `}
                    >
                        {s === "all" ? "Alla" : s === "pending" ? "Väntar" : s === "approved" ? "Godkända" : "Utbetalda"}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="rounded-lg bg-white shadow-sm overflow-hidden border border-slate-200">
                {payouts.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">Inga provisioner hittades med status &quot;{statusFilter}&quot;.</div>
                ) : (
                    <ul className="divide-y divide-slate-200">
                        {payouts.map((p: any) => (
                            <li key={p._id} className="p-6 hover:bg-slate-50 transition-colors">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className={`
                                            mt-1 flex h-10 w-10 items-center justify-center rounded-full
                                            ${p.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                                                p.status === 'approved' ? 'bg-green-100 text-green-600' :
                                                    p.status === 'paid' ? 'bg-slate-100 text-slate-600' : 'bg-red-100 text-red-600'}
                                        `}>
                                            <CreditCard className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-slate-900">{p.userName || "Okänd Agent"}</h3>
                                                <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize
                                                    ${p.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                                        p.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                            p.status === 'paid' ? 'bg-slate-100 text-slate-700' : 'bg-red-100 text-red-700'}
                                                `}>{p.status}</span>
                                            </div>
                                            <p className="text-sm text-slate-600">
                                                Affär: {p.dealRef || "N/A"} • Datum: {p.dealDate ? new Date(p.dealDate).toLocaleDateString() : "-"}
                                            </p>
                                            {p.notes && <p className="mt-1 text-sm text-slate-500 italic">&quot;{p.notes}&quot;</p>}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-slate-900">€{p.amount.toLocaleString()}</p>
                                            <p className="text-xs text-slate-500">{p.percent}% andel</p>
                                        </div>

                                        <div className="flex gap-2">
                                            {p.status === "pending" && (
                                                <button
                                                    onClick={() => handleApprove(p._id)}
                                                    className="rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
                                                >
                                                    Godkänn
                                                </button>
                                            )}
                                            {p.status === "approved" && (
                                                <button
                                                    onClick={() => handlePay(p._id)}
                                                    className="rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-medium text-white hover:bg-[#153e75]"
                                                >
                                                    Betala
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
