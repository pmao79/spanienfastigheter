
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    Loader2,
    TrendingUp,
    CheckCircle,
    Clock,
    DollarSign
} from "lucide-react";

export default function MyCommissionsPage() {
    const payouts = useQuery(api.commissions.getMyPayouts);

    if (!payouts) {
        return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-slate-400" /></div>;
    }

    const pending = payouts.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);
    const approved = payouts.filter(p => p.status === "approved").reduce((sum, p) => sum + p.amount, 0);
    const paid = payouts.filter(p => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
    const totalDeals = payouts.length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Mina Provisioner</h1>
                    <p className="text-slate-500">Översikt över din intjäning och status</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Väntar utbetalning</p>
                            <p className="mt-2 text-2xl font-bold text-orange-600">€{(pending + approved).toLocaleString()}</p>
                        </div>
                        <div className="rounded-full bg-orange-50 p-3">
                            <Clock className="h-6 w-6 text-orange-600" />
                        </div>
                    </div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Utbetalt totalt</p>
                            <p className="mt-2 text-2xl font-bold text-green-600">€{paid.toLocaleString()}</p>
                        </div>
                        <div className="rounded-full bg-green-50 p-3">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Antal affärer</p>
                            <p className="mt-2 text-2xl font-bold text-slate-900">{totalDeals}</p>
                        </div>
                        <div className="rounded-full bg-blue-50 p-3">
                            <TrendingUp className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="rounded-xl bg-white shadow-sm overflow-hidden border border-slate-200">
                <div className="px-6 py-4 border-b border-slate-100">
                    <h3 className="font-medium text-slate-900">Historik</h3>
                </div>
                {payouts.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">Inga provisioner registrerade än.</div>
                ) : (
                    <ul className="divide-y divide-slate-200">
                        {payouts.map((p: any) => (
                            <li key={p._id} className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                                                ${p.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                                                    p.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                        p.status === 'paid' ? 'bg-slate-100 text-slate-800' : 'bg-red-100 text-red-800'}
                                            `}>
                                                {p.status === 'pending' ? 'Väntar' : p.status === 'approved' ? 'Godkänd' : p.status === 'paid' ? 'Utbetald' : 'Avbruten'}
                                            </span>
                                            <span className="text-sm text-slate-500">
                                                {p.dealDate ? new Date(p.dealDate).toLocaleDateString() : "Okänt datum"}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-sm font-medium text-slate-900">
                                            Affär ID: {p.dealRef?.substring(0, 8) || "..."}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-slate-900">€{p.amount.toLocaleString()}</p>
                                        <p className="text-xs text-slate-500">{p.percent}% provision</p>
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
