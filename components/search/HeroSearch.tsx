'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { translatePropertyType } from '@/lib/property-utils';
import {
    Search,
    MapPin,
    ChevronDown,
    ChevronUp,
    Building2,
    Palmtree,
    Car,
    Check,
    X,
    Plus,
} from 'lucide-react';

interface HeroSearchProps {
    variant?: 'hero' | 'sidebar';
}

// Dual Range Slider Component
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
    const trackRef = useRef<HTMLDivElement>(null);

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
        <div className="w-full px-2 py-4">
            {/* Price labels */}
            <div className="flex justify-between mb-2 text-sm">
                <span className="font-medium text-navy">{formatPrice(localValues[0])}</span>
                <span className="font-medium text-navy">{formatPrice(localValues[1])}</span>
            </div>

            {/* Slider track */}
            <div ref={trackRef} className="relative h-2 w-full">
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

            {/* Quick select buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
                {[
                    { label: 'Max €250k', value: 250000 },
                    { label: 'Max €500k', value: 500000 },
                    { label: 'Max €1M', value: 1000000 },
                ].map((preset) => (
                    <button
                        key={preset.value}
                        onClick={() => onChange([localValues[0], preset.value])}
                        className={`px-3 py-1.5 text-xs border rounded-md transition-colors ${localValues[1] === preset.value
                                ? 'bg-navy text-white border-navy'
                                : 'border-gray-200 text-gray-600 hover:border-navy'
                            }`}
                    >
                        {preset.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function HeroSearch({ variant = 'hero' }: HeroSearchProps) {
    const router = useRouter();

    // Fetch dynamic filter options from Convex
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const filterOptions = useQuery(api.properties.getFilterOptions, {
        regions: selectedRegions.length > 0 ? selectedRegions : undefined
    });

    // Dropdown states
    const [openDropdown, setOpenDropdown] = useState<
        'region' | 'area' | 'type' | 'price' | 'beds' | null
    >(null);

    // Selection states
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([50000, 2000000]);
    const [selectedBeds, setSelectedBeds] = useState<number | null>(null);

    // Quick filters
    const [isNewBuild, setIsNewBuild] = useState(false);
    const [hasPool, setHasPool] = useState(false);
    const [hasParking, setHasParking] = useState(false);

    // Advanced filters ("+ Fler")
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [advancedFilters, setAdvancedFilters] = useState({
        nearBeach: false,
        nearGolf: false,
        privatePool: false,
        hasElevator: false,
        hasAC: false,
        isGated: false,
        hasGarden: false,
        hasTerrace: false,
        hasStorage: false,
        hasHeating: false,
    });

    // Count active advanced filters
    const activeAdvancedCount = Object.values(advancedFilters).filter(Boolean).length;

    // Search input for areas
    const [areaSearch, setAreaSearch] = useState('');

    // Close dropdowns when clicking outside
    const searchContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target as Node)
            ) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = (dropdown: typeof openDropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    // Region toggle (multi-select)
    const toggleRegion = (region: string) => {
        setSelectedRegions((prev) =>
            prev.includes(region)
                ? prev.filter((r) => r !== region)
                : [...prev, region]
        );
        // Clear areas when regions change
        setSelectedAreas([]);
    };

    // Area toggle (multi-select)
    const toggleArea = (area: string) => {
        setSelectedAreas((prev) =>
            prev.includes(area)
                ? prev.filter((a) => a !== area)
                : [...prev, area]
        );
    };

    // Type toggle (multi-select)
    const toggleType = (type: string) => {
        setSelectedTypes((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [...prev, type]
        );
    };

    // Toggle advanced filter
    const toggleAdvancedFilter = (key: keyof typeof advancedFilters) => {
        setAdvancedFilters((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    // Filtered areas based on search
    const filteredAreas =
        filterOptions?.areas?.filter((area) =>
            area.name.toLowerCase().includes(areaSearch.toLowerCase())
        ) || [];

    // Build and execute search
    const handleSearch = () => {
        const params = new URLSearchParams();

        if (selectedRegions.length > 0) {
            params.set('regions', selectedRegions.join(','));
        }
        if (selectedAreas.length > 0) {
            params.set('towns', selectedAreas.join(','));
        }
        if (selectedTypes.length > 0) {
            params.set('types', selectedTypes.join(','));
        }
        if (priceRange[0] > 50000) {
            params.set('minPrice', String(priceRange[0]));
        }
        if (priceRange[1] < 2000000) {
            params.set('maxPrice', String(priceRange[1]));
        }
        if (selectedBeds) {
            params.set('bedrooms', String(selectedBeds));
        }

        // Quick filters
        if (isNewBuild) params.set('newBuild', 'true');
        if (hasPool) params.set('pool', 'true');
        if (hasParking) params.set('parking', 'true');

        // Advanced filters
        if (advancedFilters.nearBeach) params.set('nearBeach', 'true');
        if (advancedFilters.nearGolf) params.set('nearGolf', 'true');
        if (advancedFilters.privatePool) params.set('privatePool', 'true');
        if (advancedFilters.hasElevator) params.set('elevator', 'true');
        if (advancedFilters.hasAC) params.set('ac', 'true');
        if (advancedFilters.isGated) params.set('gated', 'true');
        if (advancedFilters.hasGarden) params.set('garden', 'true');
        if (advancedFilters.hasTerrace) params.set('terrace', 'true');
        if (advancedFilters.hasStorage) params.set('storage', 'true');
        if (advancedFilters.hasHeating) params.set('heating', 'true');

        router.push(`/fastigheter?${params.toString()}`);
    };

    // Display text helpers
    const getRegionDisplayText = () => {
        if (selectedRegions.length === 0) return 'Välj region';
        if (selectedRegions.length === 1) return selectedRegions[0];
        return `${selectedRegions.length} regioner`;
    };

    const getAreaDisplayText = () => {
        if (selectedAreas.length === 0) return 'Välj område';
        if (selectedAreas.length === 1) return selectedAreas[0];
        return `${selectedAreas.length} områden`;
    };

    const getTypeDisplayText = () => {
        if (selectedTypes.length === 0) return 'Alla typer';
        if (selectedTypes.length === 1) return translatePropertyType(selectedTypes[0]);
        return `${selectedTypes.length} typer`;
    };

    const getPriceDisplayText = () => {
        const formatPrice = (price: number) => {
            if (price >= 1000000) return `€${(price / 1000000).toFixed(1)}M`;
            return `€${(price / 1000).toFixed(0)}k`;
        };
        return `${formatPrice(priceRange[0])} - ${formatPrice(priceRange[1])}`;
    };

    // Advanced filter labels
    const advancedFilterLabels: { key: keyof typeof advancedFilters; label: string }[] = [
        { key: 'nearBeach', label: 'Nära havet (< 1 km)' },
        { key: 'nearGolf', label: 'Nära golfbana' },
        { key: 'privatePool', label: 'Privat pool' },
        { key: 'hasElevator', label: 'Hiss' },
        { key: 'hasAC', label: 'Luftkonditionering' },
        { key: 'isGated', label: 'Inhägnat område' },
        { key: 'hasGarden', label: 'Trädgård' },
        { key: 'hasTerrace', label: 'Terrass' },
        { key: 'hasStorage', label: 'Förråd' },
        { key: 'hasHeating', label: 'Uppvärmning' },
    ];

    // Clear all filters
    const clearAllFilters = () => {
        setSelectedRegions([]);
        setSelectedAreas([]);
        setSelectedTypes([]);
        setPriceRange([50000, 2000000]);
        setSelectedBeds(null);
        setIsNewBuild(false);
        setHasPool(false);
        setHasParking(false);
        setAdvancedFilters({
            nearBeach: false,
            nearGolf: false,
            privatePool: false,
            hasElevator: false,
            hasAC: false,
            isGated: false,
            hasGarden: false,
            hasTerrace: false,
            hasStorage: false,
            hasHeating: false,
        });
    };

    const hasActiveFilters =
        selectedRegions.length > 0 ||
        selectedAreas.length > 0 ||
        selectedTypes.length > 0 ||
        priceRange[0] > 50000 ||
        priceRange[1] < 2000000 ||
        selectedBeds ||
        isNewBuild ||
        hasPool ||
        hasParking ||
        activeAdvancedCount > 0;

    return (
        <div
            ref={searchContainerRef}
            className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-2xl transition-all duration-300 relative"
        >
            {/* Main Search Layout */}
            <div className="flex flex-col md:grid md:grid-cols-12 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100 p-2 relative">
                {/* Region Selector */}
                <div
                    className="md:col-span-2 p-4 hover:bg-greige/30 transition-colors cursor-pointer group relative"
                    onClick={() => toggleDropdown('region')}
                >
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-1 block group-hover:text-navy transition-colors">
                        Region
                    </label>
                    <div className="flex items-center justify-between">
                        <div className="text-navy font-serif text-base truncate pr-2">
                            {getRegionDisplayText()}
                        </div>
                        <ChevronDown
                            size={16}
                            className={`text-gray-300 group-hover:text-navy transition-all ${openDropdown === 'region' ? 'rotate-180' : ''}`}
                        />
                    </div>

                    {/* Region Dropdown */}
                    {openDropdown === 'region' && (
                        <div className="absolute top-full left-0 w-64 bg-white shadow-xl border border-gray-100 rounded-b-lg z-50 animate-fade-in mt-2 md:mt-0">
                            <div className="p-2 space-y-1">
                                {filterOptions?.regions?.map((region) => (
                                    <label
                                        key={region.name}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-greige/30 rounded-md cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleRegion(region.name);
                                        }}
                                    >
                                        <div className="relative flex items-center">
                                            <div
                                                className={`w-4 h-4 border rounded-md transition-colors ${selectedRegions.includes(region.name)
                                                        ? 'bg-navy border-navy'
                                                        : 'border-gray-300'
                                                    }`}
                                            >
                                                {selectedRegions.includes(region.name) && (
                                                    <Check size={12} className="text-white absolute top-0.5 left-0.5" />
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-navy flex-1">
                                            {region.name}
                                        </span>
                                        <span className="text-xs text-gray-400">({region.count})</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Area Selector */}
                <div
                    className="md:col-span-3 p-4 hover:bg-greige/30 transition-colors cursor-pointer group relative"
                    onClick={() => toggleDropdown('area')}
                >
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-1 block group-hover:text-navy transition-colors">
                        Område
                    </label>
                    <div className="flex items-center justify-between">
                        <div className="text-navy font-serif text-base truncate pr-2">
                            {getAreaDisplayText()}
                        </div>
                        <MapPin
                            size={16}
                            className="text-gray-300 group-hover:text-sand transition-colors"
                        />
                    </div>

                    {/* Area Dropdown */}
                    {openDropdown === 'area' && (
                        <div className="absolute top-full left-0 w-80 bg-white shadow-xl border border-gray-100 rounded-b-lg z-50 animate-fade-in mt-2 md:mt-0">
                            {/* Search input */}
                            <div className="p-3 border-b border-gray-100">
                                <div className="relative">
                                    <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Sök område..."
                                        value={areaSearch}
                                        onChange={(e) => setAreaSearch(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full pl-9 pr-3 py-2 bg-greige/50 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-navy"
                                    />
                                    {areaSearch && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setAreaSearch('');
                                            }}
                                            className="absolute right-3 top-2.5 text-gray-400 hover:text-navy"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Selected areas */}
                            {selectedAreas.length > 0 && (
                                <div className="p-2 border-b border-gray-100 flex flex-wrap gap-1">
                                    {selectedAreas.map((area) => (
                                        <span
                                            key={area}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-navy text-white text-xs rounded"
                                        >
                                            {area}
                                            <X
                                                size={12}
                                                className="cursor-pointer hover:text-sand"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleArea(area);
                                                }}
                                            />
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Area list */}
                            <div className="max-h-60 overflow-y-auto p-2 space-y-1">
                                {filteredAreas.length > 0 ? (
                                    filteredAreas.map((area) => (
                                        <label
                                            key={area.name}
                                        className="flex items-center gap-3 px-4 py-2 hover:bg-greige/30 rounded-md cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleArea(area.name);
                                            }}
                                        >
                                            <div className="relative flex items-center">
                                                <div
                                                    className={`w-4 h-4 border rounded-md transition-colors ${selectedAreas.includes(area.name)
                                                            ? 'bg-navy border-navy'
                                                            : 'border-gray-300'
                                                        }`}
                                                >
                                                    {selectedAreas.includes(area.name) && (
                                                        <Check size={12} className="text-white absolute top-0.5 left-0.5" />
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-sm text-charcoal flex-1">{area.name}</span>
                                            <span className="text-xs text-gray-400">({area.count})</span>
                                        </label>
                                    ))
                                ) : (
                                    <div className="px-4 py-3 text-sm text-gray-400 text-center">
                                        Inga områden hittades
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Type Selector */}
                <div
                    className="md:col-span-2 p-4 hover:bg-greige/30 transition-colors cursor-pointer group relative"
                    onClick={() => toggleDropdown('type')}
                >
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-1 block group-hover:text-navy transition-colors">
                        Typ av bostad
                    </label>
                    <div className="flex items-center justify-between">
                        <div className="text-navy font-serif text-base truncate">
                            {getTypeDisplayText()}
                        </div>
                        <ChevronDown
                            size={16}
                            className={`text-gray-300 group-hover:text-navy transition-all ${openDropdown === 'type' ? 'rotate-180' : ''}`}
                        />
                    </div>

                    {/* Type Dropdown */}
                    {openDropdown === 'type' && (
                        <div className="absolute top-full left-0 w-56 bg-white shadow-xl border border-gray-100 rounded-b-lg z-50 animate-fade-in mt-2 md:mt-0">
                            <div className="p-2 space-y-1">
                                {filterOptions?.types?.map((type) => (
                                    <label
                                        key={type}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-greige/30 rounded-md cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleType(type);
                                        }}
                                    >
                                        <div className="relative flex items-center">
                                            <div
                                                className={`w-4 h-4 border rounded-md transition-colors ${selectedTypes.includes(type)
                                                        ? 'bg-navy border-navy'
                                                        : 'border-gray-300'
                                                    }`}
                                            >
                                                {selectedTypes.includes(type) && (
                                                    <Check size={12} className="text-white absolute top-0.5 left-0.5" />
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-navy">
                                            {translatePropertyType(type)}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Price Range Selector with Dual Slider */}
                <div
                    className="md:col-span-2 p-4 hover:bg-greige/30 transition-colors cursor-pointer group relative"
                    onClick={() => toggleDropdown('price')}
                >
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-1 block group-hover:text-navy transition-colors">
                        Budget
                    </label>
                    <div className="flex items-center justify-between">
                        <div className="text-navy font-serif text-base truncate">
                            {getPriceDisplayText()}
                        </div>
                        <ChevronDown
                            size={16}
                            className={`text-gray-300 group-hover:text-navy transition-all ${openDropdown === 'price' ? 'rotate-180' : ''}`}
                        />
                    </div>

                    {/* Price Dropdown with Dual Range Slider */}
                    {openDropdown === 'price' && (
                        <div
                            className="absolute top-full left-0 w-80 bg-white shadow-xl border border-gray-100 rounded-b-lg z-50 animate-fade-in mt-2 md:mt-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <DualRangeSlider
                                min={50000}
                                max={2000000}
                                step={25000}
                                values={priceRange}
                                onChange={setPriceRange}
                            />
                        </div>
                    )}
                </div>

                {/* Beds Selector */}
                <div
                    className="md:col-span-1 p-4 hover:bg-greige/30 transition-colors cursor-pointer group relative"
                    onClick={() => toggleDropdown('beds')}
                >
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-1 block group-hover:text-navy transition-colors">
                        Sovrum
                    </label>
                    <div className="flex items-center justify-between">
                        <div className="text-navy font-serif text-base">
                            {selectedBeds ? `${selectedBeds}+` : 'Alla'}
                        </div>
                        <ChevronDown
                            size={16}
                            className={`text-gray-300 group-hover:text-navy transition-all ${openDropdown === 'beds' ? 'rotate-180' : ''}`}
                        />
                    </div>

                    {/* Beds Dropdown */}
                    {openDropdown === 'beds' && (
                        <div className="absolute top-full left-0 w-48 bg-white shadow-xl border border-gray-100 rounded-b-lg z-50 animate-fade-in mt-2 md:mt-0 p-3">
                            <div className="flex flex-wrap gap-2">
                                {[null, 1, 2, 3, 4, 5].map((beds) => (
                                    <button
                                        key={beds ?? 'all'}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedBeds(beds);
                                            setOpenDropdown(null);
                                        }}
                                        className={`w-10 h-10 border text-sm font-medium transition-all rounded-md ${selectedBeds === beds
                                                ? 'bg-navy text-white border-navy'
                                                : 'border-gray-200 text-gray-500 hover:border-navy hover:text-navy'
                                            }`}
                                    >
                                        {beds === null ? 'Alla' : beds === 5 ? '5+' : beds}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Search Button */}
                <div className="md:col-span-2 p-2">
                    <button
                        onClick={handleSearch}
                        className="w-full h-14 md:h-full bg-navy text-white rounded-md hover:bg-charcoal transition-all duration-300 flex flex-row md:flex-col items-center justify-center gap-2 shadow-lg group"
                    >
                        <Search
                            size={20}
                            className="group-hover:scale-110 transition-transform"
                        />
                        <span className="uppercase tracking-[0.15em] text-xs font-semibold">
                            Sök
                        </span>
                    </button>
                </div>
            </div>

            {/* Quick Filters & Advanced Toggle */}
            <div className="border-t border-gray-100 bg-gray-50/50 px-4 md:px-6 py-3">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    {/* Quick filters row */}
                    <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold whitespace-nowrap hidden md:block">
                            Snabbval:
                        </span>

                        {/* Nyproduktion */}
                        <label className="flex items-center gap-2 cursor-pointer group flex-shrink-0">
                            <div
                                className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${isNewBuild ? 'bg-navy border-navy' : 'border-gray-300 bg-white group-hover:border-navy'
                                    }`}
                                onClick={() => setIsNewBuild(!isNewBuild)}
                            >
                                {isNewBuild && <Check size={12} className="text-white" />}
                            </div>
                            <span className="text-xs text-charcoal font-medium group-hover:text-navy flex items-center gap-1.5 transition-colors">
                                <Building2 size={14} className="text-sand" /> Nyproduktion
                            </span>
                        </label>

                        {/* Pool */}
                        <label className="flex items-center gap-2 cursor-pointer group flex-shrink-0">
                            <div
                                className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${hasPool ? 'bg-navy border-navy' : 'border-gray-300 bg-white group-hover:border-navy'
                                    }`}
                                onClick={() => setHasPool(!hasPool)}
                            >
                                {hasPool && <Check size={12} className="text-white" />}
                            </div>
                            <span className="text-xs text-charcoal font-medium group-hover:text-navy flex items-center gap-1.5 transition-colors">
                                <Palmtree size={14} className="text-sand" /> Pool
                            </span>
                        </label>

                        {/* Parkering */}
                        <label className="flex items-center gap-2 cursor-pointer group flex-shrink-0">
                            <div
                                className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${hasParking ? 'bg-navy border-navy' : 'border-gray-300 bg-white group-hover:border-navy'
                                    }`}
                                onClick={() => setHasParking(!hasParking)}
                            >
                                {hasParking && <Check size={12} className="text-white" />}
                            </div>
                            <span className="text-xs text-charcoal font-medium group-hover:text-navy flex items-center gap-1.5 transition-colors">
                                <Car size={14} className="text-sand" /> Parkering
                            </span>
                        </label>
                    </div>

                    {/* Advanced toggle & clear */}
                    <div className="flex items-center gap-4">
                        {/* "+ Fler" toggle */}
                        <button
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest transition-colors ${showAdvanced || activeAdvancedCount > 0 ? 'text-navy' : 'text-navy/60 hover:text-navy'
                                }`}
                        >
                            <Plus size={14} className={showAdvanced ? 'rotate-45' : ''} />
                            Fler
                            {activeAdvancedCount > 0 && (
                                <span className="bg-navy text-white text-[10px] px-1.5 py-0.5 rounded">
                                    {activeAdvancedCount}
                                </span>
                            )}
                            {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>

                        {/* Clear filters */}
                        {hasActiveFilters && (
                            <button
                                onClick={clearAllFilters}
                                className="text-xs font-semibold text-gray-400 hover:text-navy uppercase tracking-widest flex items-center gap-1 transition-colors"
                            >
                                <X size={12} />
                                Rensa
                            </button>
                        )}
                    </div>
                </div>

                {/* Advanced Filters Panel */}
                {showAdvanced && (
                    <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {advancedFilterLabels.map(({ key, label }) => (
                                <label
                                    key={key}
                                    className="flex items-center gap-2 cursor-pointer group"
                                >
                                    <div
                                        className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${advancedFilters[key]
                                                ? 'bg-navy border-navy'
                                                : 'border-gray-300 bg-white group-hover:border-navy'
                                            }`}
                                        onClick={() => toggleAdvancedFilter(key)}
                                    >
                                        {advancedFilters[key] && <Check size={12} className="text-white" />}
                                    </div>
                                    <span className="text-xs text-charcoal group-hover:text-navy transition-colors">
                                        {label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
