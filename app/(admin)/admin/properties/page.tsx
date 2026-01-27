"use client";

import { useState } from "react";
import { usePaginatedQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    EyeOff,
    Star,
    Edit,
    RefreshCcw
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PropertiesPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("");

    const { results, status, loadMore } = usePaginatedQuery(
        api.adminProperties.getAll,
        {
            search: search || undefined,
            status: statusFilter || undefined,
        },
        { initialNumItems: 20 }
    );

    const toggleFeatured = useMutation(api.adminProperties.toggleFeatured);
    const toggleHidden = useMutation(api.adminProperties.toggleHidden);
    const syncXml = useAction(api.sync.syncProperties); // Assuming this exists or similar

    const handleSync = async () => {
        // Trigger sync
        await syncXml({}); // Only if needed/implemented
        alert("Sync triggered");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-2xl font-bold text-slate-900">Objekt</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleSync()}
                        className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        <RefreshCcw className="h-4 w-4" />
                        Synka XML
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Sök på Ref..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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
                        <option value="active">Active</option>
                        <option value="reserved">Reserved</option>
                        <option value="sold">Sold</option>
                        <option value="paused">Paused</option>
                        <option value="hidden">Hidden</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Objekt</th>
                                <th className="px-6 py-4 font-medium">Ref</th>
                                <th className="px-6 py-4 font-medium">Typ</th>
                                <th className="px-6 py-4 font-medium">Pris</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Featured</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {results?.map((prop) => (
                                <tr key={prop._id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-12 w-16 overflow-hidden rounded bg-slate-100">
                                                {prop.images?.[0] ? (
                                                    <Image
                                                        src={prop.images[0]}
                                                        alt={prop.ref}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">No img</div>
                                                )}
                                            </div>
                                            <div>
                                                {prop.town && <p className="font-medium text-slate-900">{prop.town}</p>}
                                                {prop.region && <p className="text-xs text-slate-500">{prop.region}</p>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-slate-600">{prop.ref}</td>
                                    <td className="px-6 py-4 text-slate-600">{prop.type}</td>
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        {new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(prop.price)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`
                        inline-flex rounded-full px-2 py-1 text-xs font-medium capitalize
                        ${prop.status === 'active' ? 'bg-green-50 text-green-700' :
                                                prop.status === 'sold' ? 'bg-red-50 text-red-700' :
                                                    prop.status === 'reserved' ? 'bg-orange-50 text-orange-700' :
                                                        'bg-slate-100 text-slate-700'}
                    `}>
                                            {prop.status || 'Unknown'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleFeatured({ id: prop._id })}
                                            className={`transition-colors ${prop.isFeatured ? 'text-yellow-400' : 'text-slate-200 hover:text-yellow-400'}`}
                                        >
                                            <Star className="h-5 w-5 fill-current" />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => toggleHidden({ id: prop._id })}
                                                className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                                title={prop.isHidden ? "Visa" : "Dölj"}
                                            >
                                                {prop.isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                            <Link
                                                href={`/admin/properties/${prop._id}`}
                                                className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-blue-600"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Load More */}
                <div className="border-t p-4 text-center">
                    {status === "CanLoadMore" && (
                        <button
                            onClick={() => loadMore(20)}
                            className="text-sm font-medium text-[#1a365d] hover:underline"
                        >
                            Ladda fler...
                        </button>
                    )}
                    {status === "LoadingMore" && (
                        <span className="text-sm text-slate-400">Laddar...</span>
                    )}
                </div>
            </div>
        </div>
    );
}
