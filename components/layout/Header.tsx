'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Search, Menu, Heart } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';
import { useFavoritesCount } from '@/components/ui/FavoriteButton';

import { usePathname } from 'next/navigation';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations('nav');
    const favoritesCount = useFavoritesCount();

    // Check if we are on the homepage (localized or root)
    const isHomePage = pathname === '/' || pathname === '/sv' || pathname === '/en' || pathname === '/es';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Force solid state if NOT on homepage
    const shouldBeSolid = !isHomePage || isScrolled;

    const navItems = [
        { key: 'forSale', href: '/fastigheter' },
        { key: 'viewingTrip', href: '/visningsresa' },
        { key: 'guide', href: '/guide/kopa-bostad-spanien' },
        { key: 'areas', href: '/omraden' },
        { key: 'golf', href: '/golf' },
        { key: 'sell', href: '/salja' },
        { key: 'contact', href: '/kontakt' },
    ];

    return (
        <>
            <header
                className={`fixed w-full z-50 transition-all duration-500 border-b ${shouldBeSolid
                    ? 'bg-white/95 backdrop-blur-md border-gray-100 py-3 shadow-sm'
                    : 'bg-transparent border-transparent py-6'
                    }`}
            >
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-3 z-50 lg:mr-12">
                        <Link href="/" className="flex items-center gap-2">
                            <span
                                className={`text-2xl md:text-3xl font-serif font-medium tracking-tight leading-none ${shouldBeSolid ? 'text-navy' : 'text-white'
                                    }`}
                            >
                                Spanienfastigheter<span className="text-sand">.se</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav
                        className={`hidden lg:flex items-center gap-10 ${shouldBeSolid ? 'text-charcoal' : 'text-white/90'
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
                        className={`hidden lg:flex items-center gap-6 ${shouldBeSolid ? 'text-navy' : 'text-white'
                            }`}
                    >
                        <LanguageSwitcher />

                        <Link
                            href="/portal"
                            className="text-[11px] uppercase tracking-[0.2em] font-semibold hover:text-sand transition-colors"
                        >
                            {t('login')}
                        </Link>

                        <div className="h-4 w-px bg-current opacity-20" />

                        <Link
                            href="/favoriter"
                            className="relative hover:text-sand transition-colors"
                            aria-label="Favoriter"
                        >
                            <Heart size={18} />
                            {favoritesCount > 0 && (
                                <span className="absolute -top-2 -right-2 w-4 h-4 bg-sand text-navy text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-in">
                                    {favoritesCount}
                                </span>
                            )}
                        </Link>

                        <button className="hover:text-sand transition-colors" aria-label="Sök">
                            <Search size={18} />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className={`lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-colors ${shouldBeSolid ? 'bg-gray-100 hover:bg-gray-200 text-navy' : 'bg-white/10 hover:bg-white/20 text-white'
                            }`}
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Öppna meny"
                    >
                        <Menu size={20} />
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

