'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
    propertyId: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    variant?: 'glass' | 'outline';
}

const STORAGE_KEY = 'spanienfastigheter-favorites';

function getFavorites(): string[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function saveFavorites(favorites: string[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export default function FavoriteButton({
    propertyId,
    className = '',
    size = 'md',
    showLabel = false,
    variant = 'glass'
}: FavoriteButtonProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // ... (keep effects and handlers)

    const toggleFavorite = (e: React.MouseEvent) => {
        // ... (keep implementation)
        e.preventDefault();
        e.stopPropagation();

        const favorites = getFavorites();
        let newFavorites: string[];

        if (favorites.includes(propertyId)) {
            newFavorites = favorites.filter(id => id !== propertyId);
            setIsFavorite(false);
        } else {
            newFavorites = [...favorites, propertyId];
            setIsFavorite(true);
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 300);
        }

        saveFavorites(newFavorites);

        window.dispatchEvent(new CustomEvent('favorites-updated', {
            detail: { favorites: newFavorites }
        }));
    };

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
    };

    const iconSizes = {
        sm: 16,
        md: 20,
        lg: 24,
    };

    // Variant styles
    const getVariantClasses = () => {
        if (variant === 'outline') {
            return isFavorite
                ? 'bg-white border-gray-200 text-rose-500 shadow-md'
                : 'bg-white border-gray-200 text-navy hover:bg-gray-50 hover:border-gray-300 shadow-sm';
        }
        // Default glass
        return isFavorite
            ? 'bg-white border-white text-rose-500 shadow-md'
            : 'bg-white/30 border-white/40 text-inherit hover:bg-white/50 hover:border-white/60';
    };

    return (
        <button
            onClick={toggleFavorite}
            className={`
                group relative flex items-center justify-center gap-2 
                ${sizeClasses[size]}
                rounded-full transition-all duration-300
                backdrop-blur-md border
                ${getVariantClasses()}
                ${isAnimating ? 'scale-125' : 'hover:scale-110'}
                ${className}
            `}
            aria-label={isFavorite ? 'Ta bort från favoriter' : 'Lägg till i favoriter'}
            title={isFavorite ? 'Ta bort från favoriter' : 'Lägg till i favoriter'}
        >
            <Heart
                size={iconSizes[size]}
                className={`
                    transition-all duration-300 drop-shadow-sm
                    ${isFavorite
                        ? 'fill-current'
                        : 'fill-transparent stroke-[2.5px] group-hover:scale-110'
                    }
                `}
            />

            {showLabel && (
                <span className={`text-xs font-medium whitespace-nowrap ${isFavorite ? 'text-rose-500' : 'text-white drop-shadow-md'}`}>
                    {isFavorite ? 'Sparad' : 'Spara'}
                </span>
            )}
        </button>
    );
}

// Hook for getting favorites count (useful for header badge)
export function useFavoritesCount() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            setCount(getFavorites().length);
        };

        updateCount();

        window.addEventListener('favorites-updated', updateCount);
        return () => window.removeEventListener('favorites-updated', updateCount);
    }, []);

    return count;
}
