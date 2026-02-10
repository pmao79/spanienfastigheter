'use client';

import { Search, X, Check, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCallback, useState, useEffect, useRef } from 'react';
import { translatePropertyType } from '@/lib/property-utils';

interface FilterSidebarProps {
    onOpenSearchService?: () => void;
    propertyCount?: number;
}

// Dual Range Slider Component (simplified for sidebar)
function DualRangeSlider({
    min,
    max,
    step,
    values,
    onChange,
}: {
    min: number;
    max: number;
    step: number;
    values: [number, number];
    onChange: (values: [number, number]) => void;
}) {
    const [localValues, setLocalValues] = useState(values);

    useEffect(() => {
        setLocalValues(values);
    }, [values]);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Math.min(Number(e.target.value), localValues[1] - step);
        setLocalValues([newMin, localValues[1]]);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Math.max(Number(e.target.value), localValues[0] + step);
        setLocalValues([localValues[0], newMax]);
    };

    const handleMouseUp = () => {
        onChange(localValues);
    };

    const minPercent = ((localValues[0] - min) / (max - min)) * 100;
    const maxPercent = ((localValues[1] - min) / (max - min)) * 100;

    const formatPrice = (price: number) => {
        if (price >= 1000000) {
            return `€${(price / 1000000).toFixed(1)}M`;
        }
        return `€${(price / 1000).toFixed(0)}k`;
    };

    return (
        <div className="w-full py-2">
            {/* Price labels */}
            <div className="flex justify-between mb-2 text-sm">
                <span className="font-medium text-navy">{formatPrice(localValues[0])}</span>
                <span className="font-medium text-navy">{formatPrice(localValues[1])}</span>
            </div>

            {/* Slider track */}
            <div className="relative h-2 w-full">
                {/* Background track */}
                <div className="absolute inset-0 bg-gray-200 rounded-full" />

                {/* Active track */}
                <div
                    className="absolute h-full bg-navy rounded-full"
                    style={{
                        left: `${minPercent}%`,
                        width: `${maxPercent - minPercent}%`,
                    }}
                />

                {/* Min thumb */}
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={localValues[0]}
                        onChange={handleMinChange}
                        onMouseUp={handleMouseUp}
                        onTouchEnd={handleMouseUp}
                        aria-label="Minsta pris"
                        className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none 
            [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-navy 
            [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none 
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full 
            [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-navy 
            [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                />

                {/* Max thumb */}
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={localValues[1]}
                        onChange={handleMaxChange}
                        onMouseUp={handleMouseUp}
                        onTouchEnd={handleMouseUp}
                        aria-label="Högsta pris"
                        className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none 
            [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-navy 
            [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none 
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full 
            [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-navy 
            [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                />
            </div>
        </div>
    );
}

export default function FilterSidebar({ onOpenSearchService, propertyCount }: FilterSidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const basePath = (() => {
        if (pathname.includes('/fastigheter')) return pathname;
        const segments = pathname.split('/').filter(Boolean);
        const locale = segments[0];
        return locale ? `/${locale}/fastigheter` : '/fastigheter';
    })();

    // Parse current URL params
    const currentRegions = searchParams.get('regions')?.split(',').filter(Boolean) || [];
    const currentTowns = searchParams.get('towns')?.split(',').filter(Boolean) || [];
    const currentTypes = searchParams.get('types')?.split(',').filter(Boolean) || [];

    // Fetch dynamic filter options from Convex
    const filterOptions = useQuery(api.properties.getFilterOptions, {
        regions: currentRegions.length > 0 ? currentRegions : undefined
    });

    // Local State
    const [priceRange, setPriceRange] = useState<[number, number]>([
        Number(searchParams.get('minPrice')) || 50000,
        Number(searchParams.get('maxPrice')) || 2000000
    ]);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('ref') || '');
    const [areaSearch, setAreaSearch] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Sync URL state
    useEffect(() => {
        setPriceRange([
            Number(searchParams.get('minPrice')) || 50000,
            Number(searchParams.get('maxPrice')) || 2000000
        ]);
    }, [searchParams]);

    // Update URL Helper
    const updateFilters = useCallback((updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        router.push(`${basePath}?${params.toString()}`, { scroll: false });
    }, [router, searchParams, basePath]);

    // Toggle handlers for multi-select
    const toggleArrayParam = useCallback((paramName: string, value: string, currentValues: string[]) => {
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];

        updateFilters({ [paramName]: newValues.length > 0 ? newValues.join(',') : null });
    }, [updateFilters]);

    // Price handler
    const applyPriceFilter = (values: [number, number]) => {
        setPriceRange(values);
        updateFilters({
            minPrice: values[0] > 50000 ? String(values[0]) : null,
            maxPrice: values[1] < 2000000 ? String(values[1]) : null,
        });
    };

    // Bedroom handler
    const handleBedChange = (beds: number | string) => {
        const val = beds === '5+' ? '5' : String(beds);
        const current = searchParams.get('bedrooms');
        updateFilters({ bedrooms: current === val ? null : val });
    };

    // Feature handler
    const handleFeatureChange = (key: string, isChecked: boolean) => {
        updateFilters({ [key]: isChecked ? 'true' : null });
    };

    // Ref search
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilters({ ref: searchTerm || null });
    };

    // Clear all
    const clearAllFilters = () => {
        router.push(basePath, { scroll: false });
    };

    // Filtered areas
    const filteredAreas = filterOptions?.areas?.filter(area =>
        area.name.toLowerCase().includes(areaSearch.toLowerCase())
    ) || [];

    // Advanced filter config
    const advancedFilters = [
        { key: 'nearBeach', label: 'Nära havet (< 1 km)' },
        { key: 'nearGolf', label: 'Nära golfbana' },
        { key: 'privatePool', label: 'Privat pool' },
        { key: 'elevator', label: 'Hiss' },
        { key: 'ac', label: 'Luftkonditionering' },
        { key: 'gated', label: 'Inhägnat område' },
        { key: 'garden', label: 'Trädgård' },
        { key: 'terrace', label: 'Terrass' },
        { key: 'storage', label: 'Förråd' },
        { key: 'heating', label: 'Uppvärmning' },
    ];

    // Count active advanced filters
    const activeAdvancedCount = advancedFilters.filter(f =>
        searchParams.get(f.key) === 'true'
    ).length;

    return (
        <div className="bg-white p-8 border border-gray-100 sticky top-32 shadow-soft">
            <div className="flex justify-between items-center mb-8 border-b border-greige pb-4">
                <h2 className="text-xl font-serif text-navy">Filtrera</h2>
                <button
                    onClick={clearAllFilters}
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

                {/* Regions (Multi-select) */}
                <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-4 block">
                        Region
                    </label>
                    <div className="space-y-3">
                        {filterOptions?.regions ? filterOptions.regions.map((r) => (
                            <label
                                key={r.name}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={currentRegions.includes(r.name)}
                                        onChange={() => toggleArrayParam('regions', r.name, currentRegions)}
                                        className="peer appearance-none w-4 h-4 border border-gray-300 rounded-md checked:bg-navy checked:border-navy transition-colors"
                                    />
                                    {currentRegions.includes(r.name) && (
                                        <Check size={12} className="absolute left-0.5 top-0.5 text-white pointer-events-none" />
                                    )}
                                </div>
                                <span className="text-sm font-light text-charcoal group-hover:text-navy transition-colors flex justify-between w-full">
                                    <span>{r.name}</span>
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

                {/* Areas/Towns (Multi-select with search) */}
                <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-4 block">
                        Område
                    </label>

                    {/* Search input */}
                    <div className="relative mb-3">
                        <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Sök område..."
                            value={areaSearch}
                            onChange={(e) => setAreaSearch(e.target.value)}
                            className="w-full pl-9 pr-8 py-2 bg-greige/50 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-navy"
                            aria-label="Sök område"
                        />
                        {areaSearch && (
                            <button
                                onClick={() => setAreaSearch('')}
                                className="absolute right-3 top-2.5 text-gray-400 hover:text-navy"
                                aria-label="Rensa område"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* Selected areas */}
                    {currentTowns.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                            {currentTowns.map((town) => (
                                <span
                                    key={town}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-navy text-white text-xs rounded"
                                >
                                    {town}
                                    <X
                                        size={12}
                                        className="cursor-pointer hover:text-sand"
                                        onClick={() => toggleArrayParam('towns', town, currentTowns)}
                                    />
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Area list */}
                    <div className="max-h-48 overflow-y-auto space-y-2">
                        {filterOptions?.areas ? (
                            filteredAreas.length > 0 ? (
                                filteredAreas.slice(0, 20).map((area) => (
                                    <label
                                        key={area.name}
                                        className="flex items-center gap-3 cursor-pointer group"
                                    >
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={currentTowns.includes(area.name)}
                                                onChange={() => toggleArrayParam('towns', area.name, currentTowns)}
                                                className="peer appearance-none w-4 h-4 border border-gray-300 rounded-md checked:bg-navy checked:border-navy transition-colors"
                                            />
                                            {currentTowns.includes(area.name) && (
                                                <Check size={12} className="absolute left-0.5 top-0.5 text-white pointer-events-none" />
                                            )}
                                        </div>
                                        <span className="text-sm font-light text-charcoal group-hover:text-navy transition-colors flex justify-between w-full">
                                            <span>{area.name}</span>
                                            <span className="text-xs text-gray-400">({area.count})</span>
                                        </span>
                                    </label>
                                ))
                            ) : (
                                <div className="text-sm text-gray-400 text-center py-2">
                                    Inga områden hittades
                                </div>
                            )
                        ) : (
                            <div className="animate-pulse space-y-2">
                                <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Property Types (Multi-select) */}
                <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-4 block">
                        Typ av bostad
                    </label>
                    <div className="space-y-3">
                        {filterOptions?.types?.map((type) => (
                            <label
                                key={type}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={currentTypes.includes(type)}
                                        onChange={() => toggleArrayParam('types', type, currentTypes)}
                                        className="peer appearance-none w-4 h-4 border border-gray-300 rounded-md checked:bg-navy checked:border-navy transition-colors"
                                    />
                                    {currentTypes.includes(type) && (
                                        <Check size={12} className="absolute left-0.5 top-0.5 text-white pointer-events-none" />
                                    )}
                                </div>
                                <span className="text-sm font-light text-charcoal group-hover:text-navy transition-colors">
                                    {translatePropertyType(type)}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range with Dual Slider */}
                <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-4 block">
                        Pris (€)
                    </label>
                    <DualRangeSlider
                        min={50000}
                        max={2000000}
                        step={25000}
                        values={priceRange}
                        onChange={applyPriceFilter}
                    />
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
                                    className={`w-10 h-10 border text-sm font-medium transition-all rounded-md ${isActive
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

                {/* Quick Features */}
                <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-4 block">
                        Egenskaper
                    </label>
                    <div className="space-y-3">
                        {[
                            { label: 'Pool', key: 'pool' },
                            { label: 'Nyproduktion', key: 'newBuild' },
                            { label: 'Parkering', key: 'parking' },
                        ].map((feature) => (
                            <label
                                key={feature.key}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={searchParams.get(feature.key) === 'true'}
                                        onChange={(e) => handleFeatureChange(feature.key, e.target.checked)}
                                        className="peer appearance-none w-4 h-4 border border-gray-300 rounded-md checked:bg-navy checked:border-navy transition-colors"
                                    />
                                    {searchParams.get(feature.key) === 'true' && (
                                        <Check size={12} className="absolute left-0.5 top-0.5 text-white pointer-events-none" />
                                    )}
                                </div>
                                <span className="text-sm font-light text-charcoal group-hover:text-navy transition-colors">
                                    {feature.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Advanced Features ("+ Fler") */}
                <div>
                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold mb-4 transition-colors ${showAdvanced || activeAdvancedCount > 0 ? 'text-navy' : 'text-sage hover:text-navy'
                            }`}
                    >
                        <Plus size={14} className={showAdvanced ? 'rotate-45 transition-transform' : 'transition-transform'} />
                        Fler egenskaper
                        {activeAdvancedCount > 0 && (
                            <span className="bg-navy text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1">
                                {activeAdvancedCount}
                            </span>
                        )}
                        {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {showAdvanced && (
                        <div className="space-y-3 animate-fade-in">
                            {advancedFilters.map((feature) => (
                                <label
                                    key={feature.key}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={searchParams.get(feature.key) === 'true'}
                                            onChange={(e) => handleFeatureChange(feature.key, e.target.checked)}
                                        className="peer appearance-none w-4 h-4 border border-gray-300 rounded-md checked:bg-navy checked:border-navy transition-colors"
                                        />
                                        {searchParams.get(feature.key) === 'true' && (
                                            <Check size={12} className="absolute left-0.5 top-0.5 text-white pointer-events-none" />
                                        )}
                                    </div>
                                    <span className="text-sm font-light text-charcoal group-hover:text-navy transition-colors">
                                        {feature.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => router.push(`${basePath}?${searchParams.toString()}`, { scroll: false })}
                    className="w-full bg-navy text-white py-4 uppercase tracking-[0.15em] text-xs font-semibold text-center shadow-lg shadow-navy/20 cursor-pointer rounded-md"
                >
                    {propertyCount === undefined
                        ? 'Visa bostäder'
                        : `Visa ${propertyCount} bostäder`}
                </button>

                {/* Concierge Helper Card */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                    <div
                        className="bg-navy p-6 text-center rounded-lg relative overflow-hidden group cursor-pointer"
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
