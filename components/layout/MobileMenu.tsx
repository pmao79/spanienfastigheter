'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { X, Search, Heart, Phone, MessageCircle, MapPin, ChevronRight } from 'lucide-react';
import { useFavoritesCount } from '@/components/ui/FavoriteButton';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

// Regions we sell in (Costa del Sol and Costa Blanca)
const regions = [
    { name: 'Costa del Sol', href: '/omraden/costa-del-sol', emoji: '☀️' },
    { name: 'Costa Blanca', href: '/omraden/costa-blanca', emoji: '🌊' },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const t = useTranslations('nav');
    const favoritesCount = useFavoritesCount();
    const menuRef = useRef<HTMLDivElement>(null);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchCurrentX, setTouchCurrentX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const navItems = [
        { key: 'forSale', href: '/fastigheter', label: 'Till Salu' },
        { key: 'newBuild', href: '/fastigheter?newBuild=true', label: 'Nyproduktion' },
        { key: 'areas', href: '/omraden', label: 'Områden' },
        { key: 'sell', href: '/salja', label: 'Sälja din bostad' },
        { key: 'contact', href: '/kontakt', label: 'Kontakt' },
    ];

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Touch gesture handling for swipe-to-close
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
        setTouchCurrentX(e.touches[0].clientX);
        setIsDragging(true);
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!isDragging) return;
        setTouchCurrentX(e.touches[0].clientX);
    }, [isDragging]);

    const handleTouchEnd = useCallback(() => {
        if (!isDragging) return;
        const deltaX = touchCurrentX - touchStartX;
        // If swiped right more than 100px, close the menu
        if (deltaX > 100) {
            onClose();
        }
        setIsDragging(false);
        setTouchStartX(0);
        setTouchCurrentX(0);
    }, [isDragging, touchCurrentX, touchStartX, onClose]);

    // Calculate drag offset for visual feedback
    const dragOffset = isDragging ? Math.max(0, touchCurrentX - touchStartX) : 0;

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Menu Panel */}
            <div
                ref={menuRef}
                className="fixed inset-y-0 right-0 w-full max-w-md bg-alabaster z-50 lg:hidden shadow-2xl animate-slide-in-right overflow-y-auto"
                style={{
                    transform: isDragging ? `translateX(${dragOffset}px)` : undefined,
                    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
            >
                {/* Header */}
                <div className="sticky top-0 bg-alabaster/95 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
                    <span className="font-serif text-xl text-navy font-medium">
                        Meny
                    </span>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors text-navy"
                        aria-label="Stäng meny"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="px-6 py-6 space-y-8">
                    {/* Search Bar */}
                    <div
                        className="relative animate-fade-in-up"
                        style={{ animationDelay: '50ms' }}
                    >
                        <Link
                            href="/fastigheter"
                            onClick={onClose}
                            className="flex items-center gap-3 w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-charcoal/60 hover:border-sand hover:shadow-soft transition-all group"
                        >
                            <Search size={20} className="text-sand" />
                            <span className="text-sm">Sök fastigheter...</span>
                            <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-sand" />
                        </Link>
                    </div>

                    {/* Primary Navigation */}
                    <nav className="space-y-1">
                        {navItems.map((item, index) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                onClick={onClose}
                                className="flex items-center justify-between px-4 py-4 rounded-xl text-navy hover:bg-white hover:shadow-soft transition-all group animate-fade-in-up"
                                style={{ animationDelay: `${100 + index * 50}ms` }}
                            >
                                <span className="font-serif text-xl">{t(item.key)}</span>
                                <ChevronRight size={20} className="text-sand opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        ))}
                    </nav>

                    {/* Favorites */}
                    <div
                        className="animate-fade-in-up"
                        style={{ animationDelay: '350ms' }}
                    >
                        <Link
                            href="/favoriter"
                            onClick={onClose}
                            className="flex items-center gap-4 px-4 py-4 bg-white rounded-xl border border-gray-100 hover:border-sand hover:shadow-soft transition-all group"
                        >
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-sand/10 flex items-center justify-center">
                                    <Heart size={24} className="text-sand" />
                                </div>
                                {favoritesCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-navy text-white text-xs font-bold rounded-full flex items-center justify-center">
                                        {favoritesCount}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1">
                                <span className="font-serif text-lg text-navy">Mina Favoriter</span>
                                <p className="text-sm text-charcoal/60">
                                    {favoritesCount === 0 ? 'Inga sparade objekt' : `${favoritesCount} sparade objekt`}
                                </p>
                            </div>
                            <ChevronRight size={20} className="text-sand opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </div>

                    {/* Regions We Sell In */}
                    <div
                        className="animate-fade-in-up"
                        style={{ animationDelay: '400ms' }}
                    >
                        <h3 className="text-xs uppercase tracking-widest text-charcoal/40 font-semibold mb-3 px-4">
                            Våra regioner
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {regions.map((region, index) => (
                                <Link
                                    key={region.name}
                                    href={region.href}
                                    onClick={onClose}
                                    className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 hover:border-sand hover:shadow-soft transition-all group animate-fade-in-up"
                                    style={{ animationDelay: `${450 + index * 50}ms` }}
                                >
                                    <span className="text-2xl">{region.emoji}</span>
                                    <span className="text-xs text-center font-medium text-navy group-hover:text-sand transition-colors">
                                        {region.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact CTAs */}
                    <div
                        className="grid grid-cols-2 gap-3 animate-fade-in-up"
                        style={{ animationDelay: '550ms' }}
                    >
                        <a
                            href="https://wa.me/34600000000"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-3.5 bg-navy text-white rounded-xl hover:bg-navy/90 transition-colors font-medium"
                        >
                            <MessageCircle size={18} />
                            <span className="text-sm">WhatsApp</span>
                        </a>
                        <a
                            href="tel:+34600000000"
                            className="flex items-center justify-center gap-2 px-4 py-3.5 bg-sand text-navy rounded-xl hover:bg-sand/90 transition-colors font-medium"
                        >
                            <Phone size={18} />
                            <span className="text-sm">Ring oss</span>
                        </a>
                    </div>

                    {/* Language Switcher */}
                    <div
                        className="flex items-center justify-center gap-6 pt-4 border-t border-gray-100 animate-fade-in-up"
                        style={{ animationDelay: '600ms' }}
                    >
                        <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-white transition-colors group">
                            <span className="text-2xl">🇸🇪</span>
                            <span className="text-xs text-charcoal/60 group-hover:text-navy transition-colors">Svenska</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-white transition-colors group">
                            <span className="text-2xl">🇬🇧</span>
                            <span className="text-xs text-charcoal/60 group-hover:text-navy transition-colors">English</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-white transition-colors group">
                            <span className="text-2xl">🇪🇸</span>
                            <span className="text-xs text-charcoal/60 group-hover:text-navy transition-colors">Español</span>
                        </button>
                    </div>

                    {/* Bottom padding for safe area on notched devices */}
                    <div className="h-8" />
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slide-in-right {
                    from { 
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to { 
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes fade-in-up {
                    from { 
                        transform: translateY(12px);
                        opacity: 0;
                    }
                    to { 
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out forwards;
                }
                
                .animate-slide-in-right {
                    animation: slide-in-right 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                
                .animate-fade-in-up {
                    opacity: 0;
                    animation: fade-in-up 0.4s ease-out forwards;
                }
                
                /* Respect reduced motion preferences */
                @media (prefers-reduced-motion: reduce) {
                    .animate-fade-in,
                    .animate-slide-in-right,
                    .animate-fade-in-up {
                        animation: none;
                        opacity: 1;
                        transform: none;
                    }
                }
            `}</style>
        </>
    );
}
