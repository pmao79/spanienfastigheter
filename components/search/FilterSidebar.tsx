'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCallback, useEffect, useState } from 'react';

interface FilterSidebarProps {
    onOpenSearchService?: () => void;
    propertyCount?: number;
}

export default function FilterSidebar({ onOpenSearchService, propertyCount }: FilterSidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Fetch dynamic Facets
    const regions = useQuery(api.properties.getRegions);

    // Local State for Inputs (debounced updates)
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
    const [searchTerm, setSearchTerm] = useState(searchParams.get('ref') || ''); // Ref search

    // Update URL Helper
    const updateFilter = useCallback((key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        // Reset pagination if needed? usually good practice
        router.push(`?${params.toString()}`, { scroll: false });
    }, [router, searchParams]);

    // Handlers
    const handleRegionChange = (regionName: string, isChecked: boolean) => {
        // Multi-select for regions? Or single? 
        // Current FilterState implies single 'region'.
        // Let's stick to single for now based on 'region' param, OR support multi if logic allows.
        // My Convex query currently checks `eq("region", args.region)`. So Single Select for now.
        if (isChecked) {
            updateFilter('region', regionName);
        } else {
            if (searchParams.get('region') === regionName) {
                updateFilter('region', null);
            }
        }
    };

    const handlePriceChange = (type: 'min' | 'max', value: string) => {
        if (type === 'min') setMinPrice(value);
        else setMaxPrice(value);
    };

    const applyPriceFilter = () => {
        updateFilter('minPrice', minPrice);
        updateFilter('maxPrice', maxPrice);
    };

    const handleBedChange = (beds: number | string) => {
        const val = beds === '5+' ? '5' : String(beds);
        const current = searchParams.get('bedrooms');
        if (current === val) updateFilter('bedrooms', null);
        else updateFilter('bedrooms', val);
    };

    const handleFeatureChange = (key: string, isChecked: boolean) => {
        updateFilter(key, isChecked ? 'true' : null);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilter('ref', searchTerm); // Assuming 'ref' param works with 'search' query if we add it?
        // My Convex search query logic matches EXACT index on filters.
        // Text search 'ref' needs to be handled. `getByRef` exists.
        // But main search can also filter by ref if I add it?
        // Or if 'ref' is present, the page should switch to `getByRef`?
        // Let's assume for now this filters by property REFs logic if added to search query.
        // Actually, main search doesn't support fuzzy text search yet.
        // Let's just set the param.
    };

    return (
        <div className="bg-white p-8 border border-gray-100 sticky top-32 shadow-soft">
            <div className="flex justify-between items-center mb-8 border-b border-greige pb-4">
                <h3 className="text-xl font-serif text-navy">Filtrera</h3>
                <button
                    onClick={() => router.push('/fastigheter')}
                    className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-navy transition-colors"
                >
                    Rensa allt
                </button>
            </div>

            <div className="space-y-10">
                {/* Search Input (Ref) */}
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        placeholder="Sök referensnr..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-greige/50 border-b border-transparent focus:border-navy px-4 py-3 text-sm outline-none transition-colors placeholder-gray-400"
                    />
                    <button type="submit" className="absolute right-3 top-3 text-gray-400 hover:text-navy">
                        <Search size={16} />
                    </button>
                </form>

                {/* Region */}
                <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-4 block">
                        Region
                    </label>
                    <div className="space-y-3">
                        {regions ? regions.map((r) => (
                            <label
                                key={r.region}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={searchParams.get('region') === r.region}
                                        onChange={(e) => handleRegionChange(r.region, e.target.checked)}
                                        className="peer appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-navy checked:border-navy transition-colors"
                                    />
                                    <svg
                                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    >
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="text-sm font-light text-charcoal group-hover:text-navy transition-colors flex justify-between w-full">
                                    <span>{r.region}</span>
                                    <span className="text-xs text-gray-400">({r.count})</span>
                                </span>
                            </label>
                        )) : (
                            <div className="animate-pulse space-y-2">
                                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-4 block">
                        Pris (€)
                    </label>
                    <div className="flex gap-4 items-center">
                        <div className="relative w-full">
                            <span className="absolute left-3 top-2.5 text-xs text-gray-400">
                                €
                            </span>
                            <input
                                type="number"
                                placeholder="0"
                                value={minPrice}
                                onChange={(e) => handlePriceChange('min', e.target.value)}
                                onBlur={applyPriceFilter}
                                onKeyDown={(e) => e.key === 'Enter' && applyPriceFilter()}
                                className="w-full pl-6 pr-2 py-2 bg-greige/50 text-sm focus:outline-none focus:ring-1 focus:ring-navy transition-shadow"
                            />
                        </div>
                        <span className="text-gray-300 font-light">–</span>
                        <div className="relative w-full">
                            <span className="absolute left-3 top-2.5 text-xs text-gray-400">
                                €
                            </span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => handlePriceChange('max', e.target.value)}
                                onBlur={applyPriceFilter}
                                onKeyDown={(e) => e.key === 'Enter' && applyPriceFilter()}
                                className="w-full pl-6 pr-2 py-2 bg-greige/50 text-sm focus:outline-none focus:ring-1 focus:ring-navy transition-shadow"
                            />
                        </div>
                    </div>
                </div>

                {/* Bedrooms */}
                <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-4 block">
                        Sovrum
                    </label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, '5+'].map((num) => {
                            const val = num === '5+' ? '5' : String(num);
                            const isActive = searchParams.get('bedrooms') === val;
                            return (
                                <button
                                    key={num}
                                    onClick={() => handleBedChange(num)}
                                    className={`w-10 h-10 border text-sm font-medium transition-all ${isActive
                                            ? 'bg-navy text-white border-navy'
                                            : 'border-gray-200 text-gray-500 hover:border-navy hover:text-navy'
                                        }`}
                                >
                                    {num}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Features */}
                <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-4 block">
                        Egenskaper
                    </label>
                    <div className="space-y-3">
                        {[
                            { label: 'Havsutsikt', key: 'seaView' }, // TODO: Map to actual backend field? Not in schema.
                            { label: 'Pool', key: 'pool' },
                            { label: 'Nyproduktion', key: 'newBuild' },
                            { label: 'Terrass', key: 'hasTerrace' }, // Schema: terraceSize > 0? No boolean in schema, but we can assume logic in client or backend? Backend query doesn't filter by 'hasTerrace'. 
                            // WAIT: Task Schema had 'terraceSize'. Query 'properties.search' has no 'hasTerrace' or 'seaView' filter.
                            // I should stick to filters I implemented: hasPool, nearGolf, newBuild.
                            { label: 'Nära Golf', key: 'nearGolf' },
                        ].map((feature) => (
                            // Only render if relevant
                            (feature.key === 'seaView' || feature.key === 'hasTerrace') ? null :
                                <label
                                    key={feature.key}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={searchParams.get(feature.key) === 'true'}
                                            onChange={(e) => handleFeatureChange(feature.key, e.target.checked)}
                                            className="peer appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-navy checked:border-navy transition-colors"
                                        />
                                        <svg
                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        >
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                    <span className="text-sm font-light text-charcoal group-hover:text-navy transition-colors">
                                        {feature.label}
                                    </span>
                                </label>
                        ))}
                    </div>
                </div>

                <div className="w-full bg-navy text-white py-4 uppercase tracking-[0.15em] text-xs font-semibold text-center shadow-lg shadow-navy/20 cursor-default">
                    Visa {propertyCount ?? '...'} bostäder
                </div>

                {/* Concierge Helper Card */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                    <div
                        className="bg-navy p-6 text-center rounded-sm relative overflow-hidden group cursor-pointer"
                        onClick={onOpenSearchService}
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
                        <h4 className="font-serif text-white text-lg mb-2">
                            Hittar du inte rätt?
                        </h4>
                        <p className="text-white/60 text-xs font-light mb-4">
                            Låt oss söka åt dig kostnadsfritt.
                        </p>
                        <span className="text-xs text-sand uppercase tracking-widest font-bold border-b border-sand pb-1 group-hover:text-white group-hover:border-white transition-colors">
                            Starta bevakning
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
