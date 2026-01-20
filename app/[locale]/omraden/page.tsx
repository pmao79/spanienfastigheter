'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, ArrowRight, Sun, Palmtree, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ALL_COSTA_BLANCA_AREAS, ALL_COSTA_DEL_SOL_AREAS, getAreaStats, getFeaturedAreas } from '@/lib/area-data';

type RegionTab = 'all' | 'costa-blanca' | 'costa-del-sol';

export default function AreasPage() {
    const [activeTab, setActiveTab] = useState<RegionTab>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const stats = getAreaStats();
    const featured = getFeaturedAreas(4);

    // Filter areas based on tab and search
    const getFilteredAreas = () => {
        let areas = activeTab === 'costa-blanca'
            ? ALL_COSTA_BLANCA_AREAS
            : activeTab === 'costa-del-sol'
                ? ALL_COSTA_DEL_SOL_AREAS
                : [...ALL_COSTA_BLANCA_AREAS, ...ALL_COSTA_DEL_SOL_AREAS];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            areas = areas.filter(area =>
                area.name.toLowerCase().includes(query) ||
                area.description?.toLowerCase().includes(query)
            );
        }

        return areas;
    };

    const filteredAreas = getFilteredAreas();

    return (
        <div className="min-h-screen bg-alabaster">
            {/* Hero Section */}
            <section className="relative bg-navy text-white py-24 md:py-32 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
                            <MapPin size={14} className="text-sand" />
                            <span className="text-xs uppercase tracking-widest">{stats.totalAreas} områden i Spanien</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif mb-6">
                            Utforska <span className="text-sand italic">Spanien</span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto mb-10">
                            Från Costa Blancas kritvita stränder till Costa del Sols glamorösa livsstil –
                            hitta din perfekta plats i solen bland våra {stats.totalAreas} unika områden.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-md mx-auto relative">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Sök område..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-sm text-white placeholder-white/50 focus:outline-none focus:border-sand transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Decorative Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8F7F4" />
                    </svg>
                </div>
            </section>

            {/* Region Tabs */}
            <section className="py-12 bg-alabaster">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`group flex items-center gap-4 p-6 rounded-sm shadow-soft transition-all duration-300 ${activeTab === 'all'
                                    ? 'bg-navy text-white'
                                    : 'bg-white hover:shadow-hover'
                                }`}
                        >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${activeTab === 'all'
                                    ? 'bg-sand text-navy'
                                    : 'bg-gray-100 text-gray-600 group-hover:bg-navy group-hover:text-white'
                                }`}>
                                <MapPin size={24} />
                            </div>
                            <div className="text-left">
                                <h3 className={`font-serif text-xl ${activeTab === 'all' ? 'text-white' : 'text-navy'}`}>
                                    Alla områden
                                </h3>
                                <p className={`text-sm ${activeTab === 'all' ? 'text-white/70' : 'text-gray-500'}`}>
                                    {stats.totalAreas} områden
                                </p>
                            </div>
                        </button>

                        <button
                            onClick={() => setActiveTab('costa-blanca')}
                            className={`group flex items-center gap-4 p-6 rounded-sm shadow-soft transition-all duration-300 ${activeTab === 'costa-blanca'
                                    ? 'bg-navy text-white'
                                    : 'bg-white hover:shadow-hover'
                                }`}
                        >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${activeTab === 'costa-blanca'
                                    ? 'bg-sand text-navy'
                                    : 'bg-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white'
                                }`}>
                                <Sun size={24} />
                            </div>
                            <div className="text-left">
                                <h3 className={`font-serif text-xl ${activeTab === 'costa-blanca' ? 'text-white' : 'text-navy'}`}>
                                    Costa Blanca
                                </h3>
                                <p className={`text-sm ${activeTab === 'costa-blanca' ? 'text-white/70' : 'text-gray-500'}`}>
                                    {stats.costaBlancaCount} områden
                                </p>
                            </div>
                        </button>

                        <button
                            onClick={() => setActiveTab('costa-del-sol')}
                            className={`group flex items-center gap-4 p-6 rounded-sm shadow-soft transition-all duration-300 ${activeTab === 'costa-del-sol'
                                    ? 'bg-navy text-white'
                                    : 'bg-white hover:shadow-hover'
                                }`}
                        >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${activeTab === 'costa-del-sol'
                                    ? 'bg-sand text-navy'
                                    : 'bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white'
                                }`}>
                                <Palmtree size={24} />
                            </div>
                            <div className="text-left">
                                <h3 className={`font-serif text-xl ${activeTab === 'costa-del-sol' ? 'text-white' : 'text-navy'}`}>
                                    Costa del Sol
                                </h3>
                                <p className={`text-sm ${activeTab === 'costa-del-sol' ? 'text-white/70' : 'text-gray-500'}`}>
                                    {stats.costaDelSolCount} områden
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Areas (only show when not searching) */}
            {!searchQuery && activeTab === 'all' && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-px bg-navy/10 w-12"></div>
                            <h2 className="text-2xl md:text-3xl font-serif text-navy">
                                Populära <span className="text-sand italic">områden</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Costa Blanca Featured */}
                            <div>
                                <h3 className="font-serif text-xl text-navy mb-6 flex items-center gap-2">
                                    <Sun size={20} className="text-sky-500" />
                                    Costa Blanca
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {featured.costaBlanca.map((area) => (
                                        <Link
                                            key={area.slug}
                                            href={`/omraden/costa-blanca/${area.slug}`}
                                            className="group relative aspect-[4/5] overflow-hidden rounded-sm"
                                        >
                                            {area.image && (
                                                <Image
                                                    src={area.image}
                                                    alt={area.name}
                                                    fill
                                                    sizes="(max-width: 768px) 50vw, 25vw"
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <h4 className="text-lg font-serif text-white mb-1 group-hover:text-sand transition-colors">
                                                    {area.name}
                                                </h4>
                                                <p className="text-xs text-white/70">{area.propertyCount} objekt</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Costa del Sol Featured */}
                            <div>
                                <h3 className="font-serif text-xl text-navy mb-6 flex items-center gap-2">
                                    <Palmtree size={20} className="text-amber-500" />
                                    Costa del Sol
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {featured.costaDelSol.map((area) => (
                                        <Link
                                            key={area.slug}
                                            href={`/omraden/costa-del-sol/${area.slug}`}
                                            className="group relative aspect-[4/5] overflow-hidden rounded-sm"
                                        >
                                            {area.image && (
                                                <Image
                                                    src={area.image}
                                                    alt={area.name}
                                                    fill
                                                    sizes="(max-width: 768px) 50vw, 25vw"
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <h4 className="text-lg font-serif text-white mb-1 group-hover:text-sand transition-colors">
                                                    {area.name}
                                                </h4>
                                                <p className="text-xs text-white/70">{area.propertyCount} objekt</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* All Areas Grid */}
            <section className="py-16 md:py-24 bg-greige/30">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-navy/10 w-12"></div>
                            <h2 className="text-2xl md:text-3xl font-serif text-navy">
                                {activeTab === 'all' ? 'Alla' : activeTab === 'costa-blanca' ? 'Costa Blanca' : 'Costa del Sol'}{' '}
                                <span className="text-sand italic">områden</span>
                                {searchQuery && <span className="text-lg font-sans text-gray-500 ml-2">({filteredAreas.length} resultat)</span>}
                            </h2>
                        </div>
                    </div>

                    {filteredAreas.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredAreas.map((area) => (
                                <Link
                                    key={area.slug}
                                    href={`/omraden/${area.region}/${area.slug}`}
                                    className="group bg-white rounded-sm shadow-soft hover:shadow-hover transition-all duration-300 overflow-hidden"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        {area.image && (
                                            <Image
                                                src={area.image}
                                                alt={area.name}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        )}
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-2 py-1 text-[10px] uppercase tracking-widest font-bold rounded-sm ${area.region === 'costa-blanca'
                                                    ? 'bg-sky-500 text-white'
                                                    : 'bg-amber-500 text-white'
                                                }`}>
                                                {area.region === 'costa-blanca' ? 'Costa Blanca' : 'Costa del Sol'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="font-serif text-xl text-navy mb-2 group-hover:text-sand transition-colors">
                                            {area.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                            {area.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-400">
                                                {area.propertyCount} fastigheter
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-sand text-sm font-semibold group-hover:translate-x-1 transition-transform">
                                                Utforska
                                                <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-sm shadow-soft">
                            <p className="text-gray-500">Inga områden hittades för &quot;{searchQuery}&quot;</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-navy text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-serif mb-4">
                        Hitta din drömbostad i <span className="text-sand italic">Spanien</span>
                    </h2>
                    <p className="text-white/70 max-w-xl mx-auto mb-8">
                        Vi har över {stats.totalProperties.toLocaleString('sv-SE')} fastigheter i {stats.totalAreas} områden.
                        Kontakta oss för personlig rådgivning.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/fastigheter"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sand text-navy uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors"
                        >
                            Se alla fastigheter
                            <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/kontakt"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white uppercase tracking-widest text-xs font-bold hover:bg-white/10 transition-colors"
                        >
                            Kontakta oss
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
