'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { Heart, ArrowRight, Search, Trash2 } from 'lucide-react';
import PropertyCard from '@/components/property/PropertyCard';
import { Property } from '@/types/property';
import { MOCK_PROPERTIES } from '@/lib/mock-data';

interface FavoritesListProps {
    initialProperties: Property[];
}

export default function FavoritesList({ initialProperties }: FavoritesListProps) {
    const [favorites, setFavorites] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Combine fetched properties with mock properties to ensure we have a fallback
    // and cover cases where some properties might only exist in mock data during dev
    const allProperties = useMemo(() => {
        const merged = [...initialProperties];

        // Add mock properties if they don't exist in the fetched list (by ID)
        MOCK_PROPERTIES.forEach(mockProp => {
            if (!merged.some(p => p.id === mockProp.id)) {
                merged.push(mockProp);
            }
        });

        return merged;
    }, [initialProperties]);

    useEffect(() => {
        const loadFavorites = () => {
            try {
                const stored = localStorage.getItem('spanienfastigheter-favorites');
                const favoriteIds = stored ? JSON.parse(stored) : [];

                // Filter properties that match the stored IDs
                // Using loose comparison for IDs to handle string/number differences
                const favoriteProperties = allProperties.filter(p =>
                    favoriteIds.some((id: string) => String(id) === String(p.id))
                );

                setFavorites(favoriteProperties);
            } catch (error) {
                console.error('Failed to load favorites:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFavorites();

        const handleStorageChange = () => loadFavorites();
        window.addEventListener('favorites-updated', handleStorageChange);

        return () => window.removeEventListener('favorites-updated', handleStorageChange);
    }, [allProperties]);

    const clearFavorites = () => {
        localStorage.removeItem('spanienfastigheter-favorites');
        setFavorites([]);
        window.dispatchEvent(new CustomEvent('favorites-updated', {
            detail: { favorites: [] }
        }));
    };

    if (isLoading) {
        return (
            <div className="py-32 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy"></div>
            </div>
        );
    }

    if (favorites.length === 0) {
        return (
            <div className="max-w-lg mx-auto text-center py-16">
                <div className="w-20 h-20 bg-greige/50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Heart size={36} className="text-sand/50" />
                </div>

                <h2 className="text-2xl font-serif text-navy mb-4">
                    Inga favoriter ännu
                </h2>

                <p className="text-gray-500 mb-8 leading-relaxed">
                    När du hittar en fastighet du gillar, klicka på hjärtat för att spara den här.
                    Så kan du enkelt jämföra och återkomma till dina favoriter.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/fastigheter"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy text-white uppercase tracking-widest text-xs font-bold hover:bg-charcoal transition-colors"
                    >
                        <Search size={16} />
                        Utforska fastigheter
                    </Link>

                    <Link
                        href="/omraden"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-navy text-navy uppercase tracking-widest text-xs font-bold hover:bg-greige transition-colors"
                    >
                        Se områden
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Header with count and clear button */}
            <div className="flex items-center justify-between mb-8">
                <p className="text-gray-600">
                    <span className="font-bold text-navy">{favorites.length}</span> sparade fastigheter
                </p>
                <button
                    onClick={clearFavorites}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
                >
                    <Trash2 size={16} />
                    Rensa alla
                </button>
            </div>

            {/* Grid of favorites */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favorites.map((property) => (
                    <div key={property.id} className="h-full">
                        <PropertyCard property={property} />
                    </div>
                ))}
            </div>
        </>
    );
}
