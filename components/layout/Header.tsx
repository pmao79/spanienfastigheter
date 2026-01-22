'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Search, Menu, Heart } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';
import { useFavoritesCount } from '@/components/ui/FavoriteButton';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const t = useTranslations('nav');
    const favoritesCount = useFavoritesCount();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { key: 'forSale', href: '/fastigheter' },
        { key: 'guide', href: '/guide/kopa-salja-spanien-2025' },
        { key: 'areas', href: '/omraden' },
        { key: 'golf', href: '/golf' },
        { key: 'sell', href: '/salja' },
        { key: 'contact', href: '/kontakt' },
    ];

    return (
        <>
            <header
                className={`fixed w-full z-50 transition-all duration-500 border-b ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md border-gray-100 py-3 shadow-sm'
                    : 'bg-transparent border-transparent py-6'
                    }`}
            >
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2 z-50">
                        <Link
                            href="/"
                            className={`text-2xl md:text-3xl font-serif font-medium tracking-tight ${isScrolled ? 'text-navy' : 'text-white'
                                }`}
                        >
                            Spanienfastigheter<span className="text-sand">.se</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav
                        className={`hidden lg:flex items-center gap-10 ${isScrolled ? 'text-charcoal' : 'text-white/90'
                            }`}
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                className="text-[11px] uppercase tracking-[0.2em] font-semibold hover:text-sand transition-colors relative group"
                            >
                                {t(item.key)}
                                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-sand transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* Utilities */}
                    <div
                        className={`hidden lg:flex items-center gap-6 ${isScrolled ? 'text-navy' : 'text-white'
                            }`}
                    >
                        <LanguageSwitcher />

                        <div className="h-4 w-px bg-current opacity-20" />

                        <Link href="/favoriter" className="relative hover:text-sand transition-colors">
                            <Heart size={18} />
                            {favoritesCount > 0 && (
                                <span className="absolute -top-2 -right-2 w-4 h-4 bg-sand text-navy text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                                    {favoritesCount}
                                </span>
                            )}
                        </Link>

                        <button className="hover:text-sand transition-colors">
                            <Search size={18} />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`lg:hidden z-[60] p-2 transition-colors ${isScrolled ? 'text-navy' : 'text-white'
                            }`}
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Öppna meny"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* Premium Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </>
    );
}

