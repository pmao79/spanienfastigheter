'use client';

import { useState } from 'react';
import { Property } from '@/types/property';
import PropertyCard from './PropertyCard';
import SearchResultsMap from '@/components/map/SearchResultsMap';
import { LayoutGrid, Map as MapIcon } from 'lucide-react';

interface PropertyListingProps {
    properties: Property[];
    totalProperties: number;
}

export default function PropertyListing({ properties, totalProperties }: PropertyListingProps) {
    const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
                <p className="text-gray-500 font-light text-sm">
                    Visar {properties.length} av {totalProperties} objekt
                </p>

                <div className="flex items-center gap-2 bg-white p-1 rounded-md border border-gray-200 shadow-sm">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider font-bold rounded-sm transition-all ${viewMode === 'grid'
                                ? 'bg-navy text-white shadow-md'
                                : 'text-gray-500 hover:text-navy hover:bg-gray-50'
                            }`}
                    >
                        <LayoutGrid size={16} />
                        <span className="hidden sm:inline">Lista</span>
                    </button>
                    <button
                        onClick={() => setViewMode('map')}
                        className={`flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider font-bold rounded-sm transition-all ${viewMode === 'map'
                                ? 'bg-navy text-white shadow-md'
                                : 'text-gray-500 hover:text-navy hover:bg-gray-50'
                            }`}
                    >
                        <MapIcon size={16} />
                        <span className="hidden sm:inline">Karta</span>
                    </button>
                </div>
            </div>

            {properties.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-xl text-gray-500">Inga fastigheter hittades</p>
                    <p className="text-sm text-gray-400 mt-2">
                        Försök justera dina sökkriterier
                    </p>
                </div>
            ) : (
                <>
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 animate-fade-in">
                            {properties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    ) : (
                        <div className="h-[800px] w-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-inner animate-fade-in relative z-0">
                            <SearchResultsMap
                                properties={properties}
                                className="w-full h-full"
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
