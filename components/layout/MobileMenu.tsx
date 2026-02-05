'use client';
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
    X,
    Search,
    Home,
    Sparkles,
    MapPin,
    Flag,
    Briefcase,
    Calendar,
    BookOpen,
    Heart,
    MessageCircle,
    Phone,
    Mail,
    ChevronRight,
    ArrowRight
} from 'lucide-react';
import { useFavoritesCount } from '@/components/ui/FavoriteButton';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const regions = [
    {
        slug: 'costa-blanca',
        name: 'Costa Blanca',
        image: '/images/regions/costa-blanca-thumb.jpg',
        propertyCount: 50,
    },
    {
        slug: 'costa-del-sol',
        name: 'Costa del Sol',
        image: '/images/regions/costa-del-sol-thumb.jpg',
        propertyCount: 21,
    },
    {
        slug: 'costa-calida',
        name: 'Costa Cálida',
        image: '/images/regions/costa-calida-thumb.jpg',
        propertyCount: 10,
    },
    {
        slug: 'costa-de-almeria',
        name: 'Costa de Almería',
        image: '/images/regions/costa-de-almeria-thumb.jpg',
        propertyCount: 8,
    }
];

const languages = [
    { code: 'sv', label: 'Svenska' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const t = useTranslations('nav');
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale();
    const favoritesCount = useFavoritesCount();
    const menuRef = useRef<HTMLDivElement>(null);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchCurrentX, setTouchCurrentX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [query, setQuery] = useState('');

    const mainMenu = [
        { href: '/fastigheter', label: t('forSale'), icon: Home },
        { href: '/fastigheter?newBuild=true', label: t('newBuild'), icon: Sparkles },
        { href: '/omraden', label: t('areas'), icon: MapPin },
        { href: '/golf', label: t('golf'), icon: Flag }
    ];

    const services = [
        { href: '/salja', label: t('sell'), icon: Briefcase },
        { href: '/visningsresa', label: t('viewingTrip'), icon: Calendar },
        { href: '/guide', label: t('guide'), icon: BookOpen }
    ];

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

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

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
        if (deltaX > 100) {
            onClose();
        }
        setIsDragging(false);
        setTouchStartX(0);
        setTouchCurrentX(0);
    }, [isDragging, touchCurrentX, touchStartX, onClose]);

    const dragOffset = isDragging ? Math.max(0, touchCurrentX - touchStartX) : 0;

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = query.trim();
        const base = '/fastigheter';
        const path = trimmed ? `${base}?q=${encodeURIComponent(trimmed)}` : base;
        onClose();
        router.push(path);
    };

    const handleLanguageChange = (newLocale: string) => {
        const segments = pathname.split('/').filter(Boolean);
        if (['sv', 'en', 'es'].includes(segments[0])) {
            segments.shift();
        }
        const newPath = newLocale === 'sv' ? `/${segments.join('/')}` : `/${newLocale}/${segments.join('/')}`;
        onClose();
        router.push(newPath || '/');
    };

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-[#1a365d]/60 z-40 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                ref={menuRef}
                className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{
                    transform: isDragging ? `translateX(${dragOffset}px)` : undefined,
                    transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
            >
                <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] px-5 py-4 flex items-center justify-between z-10">
                    <Link href="/" onClick={onClose} className="flex items-center gap-2">
                        <span className="text-xl font-serif font-bold text-[#1a365d]">
                            Spanienfastigheter<span className="text-[#c9a962]">.se</span>
                        </span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full border border-[#e5e7eb] text-[#6b7280] hover:border-[#1a365d] hover:bg-[#1a365d] hover:text-white flex items-center justify-center transition-all duration-200"
                        aria-label="Stäng meny"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="px-5 py-6 space-y-8">
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1a365d]/40" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Sök fastigheter..."
                            className="w-full pl-12 pr-4 py-3.5 bg-[#f9fafb] border border-[#e5e7eb] rounded-xl text-[#111827] placeholder-[#6b7280] focus:outline-none focus:border-[#c9a962] focus:ring-1 focus:ring-[#c9a962] transition-all"
                        />
                    </form>

                    <div>
                        <h3 className="text-xs font-semibold text-[#1a365d]/40 uppercase tracking-wider mb-3 px-1">
                            Utforska
                        </h3>
                        <nav className="space-y-1">
                            {mainMenu.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={onClose}
                                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${isActive
                                            ? 'bg-[#1a365d] text-white'
                                            : 'text-[#111827] hover:bg-[#f9fafb]'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className={`w-5 h-5 ${isActive ? 'text-[#c9a962]' : 'text-[#1a365d]/40'}`} />
                                            <span className="font-medium">{item.label}</span>
                                        </div>
                                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white/60' : 'text-[#6b7280]'}`} />
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-[#1a365d]/40 uppercase tracking-wider mb-3 px-1">
                            Våra regioner
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {regions.map((region) => (
                                <Link
                                    key={region.slug}
                                    href={`/omraden/${region.slug}`}
                                    onClick={onClose}
                                    className="group relative aspect-[4/3] rounded-xl overflow-hidden"
                                >
                                    {region.image ? (
                                        <Image
                                            src={region.image}
                                            alt={region.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d] to-[#1a365d]/80" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d]/90 via-[#1a365d]/40 to-transparent" />
                                    <div className="absolute inset-0 p-3 flex flex-col justify-end">
                                        <h4 className="font-semibold text-white text-sm leading-tight mb-0.5">
                                            {region.name}
                                        </h4>
                                        <div className="flex items-center justify-between">
                                            <span className="text-white/70 text-xs">
                                                {region.propertyCount} objekt
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-[#c9a962] opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-[#1a365d]/40 uppercase tracking-wider mb-3 px-1">
                            Tjänster
                        </h3>
                        <nav className="space-y-1">
                            {services.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={onClose}
                                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${isActive
                                            ? 'bg-[#1a365d] text-white'
                                            : 'text-[#111827] hover:bg-[#f9fafb]'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className={`w-5 h-5 ${isActive ? 'text-[#c9a962]' : 'text-[#1a365d]/40'}`} />
                                            <span className="font-medium">{item.label}</span>
                                        </div>
                                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white/60' : 'text-[#6b7280]'}`} />
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div>
                        <Link
                            href="/favoriter"
                            onClick={onClose}
                            className="flex items-center justify-between px-4 py-3.5 rounded-xl border border-[#e5e7eb] hover:border-[#c9a962] transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <Heart className="w-5 h-5 text-[#c9a962]" />
                                <div>
                                    <span className="font-semibold text-[#111827] block">Mina Favoriter</span>
                                    <span className="text-sm text-[#6b7280]">
                                        {favoritesCount === 0 ? 'Inga sparade objekt' : `${favoritesCount} sparade objekt`}
                                    </span>
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#6b7280]" />
                        </Link>
                    </div>

                    <div className="border-t border-[#e5e7eb]" />

                    <div>
                        <h3 className="text-xs font-semibold text-[#1a365d]/40 uppercase tracking-wider mb-4 px-1">
                            Behöver du hjälp?
                        </h3>

                        <div className="space-y-3 mb-5">
                            <a
                                href="tel:+34600000000"
                                className="flex items-center gap-3 text-[#111827] hover:text-[#c9a962] transition-colors"
                            >
                                <Phone className="w-5 h-5 text-[#1a365d]/40" />
                                <span>+34 600 000 000</span>
                            </a>
                            <a
                                href="mailto:info@spanienfastigheter.se"
                                className="flex items-center gap-3 text-[#111827] hover:text-[#c9a962] transition-colors"
                            >
                                <Mail className="w-5 h-5 text-[#1a365d]/40" />
                                <span>info@spanienfastigheter.se</span>
                            </a>
                        </div>

                        <Link
                            href="/kontakt"
                            onClick={onClose}
                            className="block w-full py-4 bg-[#1a365d] hover:bg-[#1a365d]/90 text-white text-center font-semibold rounded-xl transition-colors mb-3"
                        >
                            Kontakta oss
                        </Link>

                        <div className="grid grid-cols-2 gap-3">
                            <a
                                href="https://wa.me/34600000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-4 py-3 border border-[#e5e7eb] hover:border-[#1a365d] text-[#1a365d] font-medium rounded-xl transition-colors"
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span>WhatsApp</span>
                            </a>
                            <a
                                href="mailto:info@spanienfastigheter.se"
                                className="flex items-center justify-center gap-2 px-4 py-3 border border-[#e5e7eb] hover:border-[#1a365d] text-[#1a365d] font-medium rounded-xl transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                <span>Mejla</span>
                            </a>
                        </div>
                    </div>

                    <div className="border-t border-[#e5e7eb]" />

                    <div>
                        <h3 className="text-xs font-semibold text-[#1a365d]/40 uppercase tracking-wider mb-3 px-1">
                            Språk
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl border transition-all duration-200 ${locale === lang.code
                                        ? 'bg-[#1a365d] text-white border-[#1a365d]'
                                        : 'border-[#e5e7eb] text-[#6b7280] hover:border-[#1a365d] hover:text-[#1a365d]'
                                        }`}
                                >
                                    <span className="text-sm font-medium">{lang.code.toUpperCase()}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#e5e7eb] px-5 py-4 bg-[#f9fafb]">
                    <p className="text-xs text-[#6b7280] text-center">
                        © 2024 Spanienfastigheter AB. Alla rättigheter förbehållna.
                    </p>
                </div>
            </div>
        </>
    );
}
