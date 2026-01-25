'use client';

import { useState } from 'react';
import { usePaginatedQuery, useMutation, useAction } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Search, Eye, EyeOff, Star, RefreshCw, Edit, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils'; // Assuming this exists or I'll implement inline

function formatPriceInline(price: number, currency: string) {
    return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(price);
}

export default function PropertiesPage() {
    const [search, setSearch] = useState('');
    const { results, status, loadMore } = usePaginatedQuery(
        api.adminProperties.getAll,
        { search: search || undefined },
        { initialNumItems: 20 }
    );

    const toggleFeatured = useMutation(api.adminProperties.toggleFeatured);
    const toggleHidden = useMutation(api.adminProperties.toggleHidden);
    const syncProperties = useAction(api.sync.syncProperties);
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            await syncProperties({});
            alert('Synkronisering startad/klar!');
        } catch (error) {
            console.error(error);
            alert('Misslyckades med att synka.');
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h1 className="text-2xl font-bold text-slate-800">Fastigheter</h1>
                <div className="flex gap-3">
                    <button
                        onClick={handleSync}
                        disabled={isSyncing}
                        className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
                    >
                        <RefreshCw size={16} className={`${isSyncing ? 'animate-spin' : ''}`} />
                        {isSyncing ? 'Synkar...' : 'Synka nu'}
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 rounded-xl bg-white p-4 shadow-sm">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Sök på referens..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Bostad</th>
                                <th className="px-6 py-4 font-medium">Plats</th>
                                <th className="px-6 py-4 font-medium">Pris</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Featured</th>
                                <th className="px-6 py-4 font-medium text-right">Åtgärder</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {results.length === 0 && status !== 'LoadingMore' ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">Inga fastigheter hittades.</td>
                                </tr>
                            ) : (
                                results.map((prop) => (
                                    <tr key={prop._id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
                                                    {prop.images?.[0] ? (
                                                        <Image
                                                            src={prop.images[0]}
                                                            alt={prop.ref}
                                                            fill
                                                            className="object-cover"
                                                            sizes="64px"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">No Img</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">{prop.type}</div>
                                                    <div className="text-xs text-slate-500">Ref: {prop.ref}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-slate-600">
                                                <MapPin size={14} />
                                                <span>{prop.town}, {prop.province}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {formatPriceInline(prop.price, prop.currency)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${prop.isHidden
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-green-100 text-green-800'
                                                }`}>
                                                {prop.isHidden ? 'Dold' : 'Aktiv'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleFeatured({ id: prop._id })}
                                                className={`transition-colors ${prop.isFeatured ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-400'}`}
                                            >
                                                <Star size={18} fill={prop.isFeatured ? 'currentColor' : 'none'} />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => toggleHidden({ id: prop._id })}
                                                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                                    title={prop.isHidden ? "Visa" : "Dölj"}
                                                >
                                                    {prop.isHidden ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                                <Link
                                                    href={`/admin/properties/${prop._id}`}
                                                    className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {status === 'CanLoadMore' && (
                    <div className="border-t border-slate-100 bg-slate-50 p-4 text-center">
                        <button
                            onClick={() => loadMore(20)}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                            Ladda fler
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
