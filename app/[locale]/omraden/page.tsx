'use client';

import { useState, useMemo } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ALL_COSTA_BLANCA_AREAS, ALL_COSTA_DEL_SOL_AREAS, ALL_COSTA_CALIDA_AREAS, ALL_COSTA_ALMERIA_AREAS, getAreaStats } from '@/lib/area-data';

type RegionTab = 'all' | 'costa-blanca' | 'costa-del-sol' | 'costa-calida' | 'costa-almeria';

export default function AreasPage() {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Hem',
                item: 'https://spanienfastigheter.se'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Områden',
                item: 'https://spanienfastigheter.se/omraden'
            }
        ]
    };
    const [activeTab, setActiveTab] = useState<RegionTab>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const stats = getAreaStats();

    // Combine and sort all areas by property count (popularity)
    const allAreasSorted = useMemo(() => {
        return [...ALL_COSTA_BLANCA_AREAS, ...ALL_COSTA_DEL_SOL_AREAS, ...ALL_COSTA_CALIDA_AREAS, ...ALL_COSTA_ALMERIA_AREAS]
            .sort((a, b) => b.propertyCount - a.propertyCount);
    }, []);

    // Get the top 6 slugs for the "Popular" badge
    const popularSlugs = useMemo(() => {
        return new Set(allAreasSorted.slice(0, 6).map(a => a.slug));
    }, [allAreasSorted]);

    // Filter areas based on tab and search
    const filteredAreas = useMemo(() => {
        let areas: typeof allAreasSorted;
        switch (activeTab) {
            case 'costa-blanca':
                areas = [...ALL_COSTA_BLANCA_AREAS].sort((a, b) => b.propertyCount - a.propertyCount);
                break;
            case 'costa-del-sol':
                areas = [...ALL_COSTA_DEL_SOL_AREAS].sort((a, b) => b.propertyCount - a.propertyCount);
                break;
            case 'costa-calida':
                areas = [...ALL_COSTA_CALIDA_AREAS].sort((a, b) => b.propertyCount - a.propertyCount);
                break;
            case 'costa-almeria':
                areas = [...ALL_COSTA_ALMERIA_AREAS].sort((a, b) => b.propertyCount - a.propertyCount);
                break;
            default:
                areas = allAreasSorted;
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            areas = areas.filter(area =>
                area.name.toLowerCase().includes(query) ||
                area.description?.toLowerCase().includes(query)
            );
        }

        return areas;
    }, [activeTab, searchQuery, allAreasSorted]);

    const tabs: { key: RegionTab; label: string; count: number }[] = [
        { key: 'all', label: 'Alla', count: stats.totalAreas },
        { key: 'costa-blanca', label: 'Costa Blanca', count: stats.costaBlancaCount },
        { key: 'costa-del-sol', label: 'Costa del Sol', count: stats.costaDelSolCount },
        { key: 'costa-calida', label: 'Costa Cálida', count: stats.costaCalidaCount },
        { key: 'costa-almeria', label: 'Costa de Almería', count: stats.costaAlmeriaCount },
    ];

    return (
        <div className="min-h-screen bg-alabaster">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {/* Hero Section */}
            <section className="relative bg-navy text-white pt-24 pb-16 md:pt-32 md:pb-20">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-serif mb-4">
                            Utforska <span className="text-sand italic">Spanien</span>
                        </h1>

                        <p className="text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto mb-8">
                            Från Costa Blancas kritvita stränder till Costa del Sols glamorösa livsstil,
                            Costa Cálidas unika laguner och Costa de Almerías orörda natur.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-md mx-auto relative mb-10">
                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Sök område..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-sand transition-colors"
                            />
                        </div>

                        {/* Tabs - Text only, centered */}
                        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab.key
                                        ? 'bg-slate-800 text-white'
                                        : 'text-white/60 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {tab.label} <span className="text-xs opacity-70">({tab.count})</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* All Areas Grid */}
            <section className="py-12 md:py-16 bg-alabaster">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl md:text-3xl font-serif text-navy">
                            {tabs.find(t => t.key === activeTab)?.label || 'Alla'}{' '}
                            <span className="text-sand italic">områden</span>
                            {searchQuery && <span className="text-lg font-sans text-gray-500 ml-2">({filteredAreas.length} resultat)</span>}
                        </h2>
                    </div>

                    {filteredAreas.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredAreas.map((area) => (
                                <Link
                                    key={area.slug}
                                    href={`/omraden/${area.region}/${area.slug}`}
                                    className="group bg-white rounded-lg shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        {area.image && (
                                            <Image
                                                src={area.image}
                                                alt={area.name}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        )}
                                        {/* Region Badge */}
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-2.5 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-sm backdrop-blur-md shadow-sm ${{
                                                'costa-blanca': 'bg-white/20 text-white border border-white/30',
                                                'costa-del-sol': 'bg-amber-100/40 text-amber-950 border border-amber-200/50',
                                                'costa-calida': 'bg-cyan-100/40 text-cyan-950 border border-cyan-200/50',
                                                'costa-almeria': 'bg-orange-100/40 text-orange-950 border border-orange-200/50'
                                            }[area.region] || 'bg-white/20 text-white border border-white/30'}`}>
                                                {{
                                                    'costa-blanca': 'Costa Blanca',
                                                    'costa-del-sol': 'Costa del Sol',
                                                    'costa-calida': 'Costa Cálida',
                                                    'costa-almeria': 'Costa de Almería'
                                                }[area.region] || area.region}
                                            </span>
                                        </div>
                                        {/* Popular Badge */}
                                        {popularSlugs.has(area.slug) && (
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2 py-1 text-[10px] uppercase tracking-widest font-bold rounded bg-sand text-navy">
                                                    Populärt
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="font-serif text-xl text-navy mb-2 group-hover:text-sand transition-colors">
                                            {area.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                            {area.description}
                                        </p>
                                        <div className="flex items-center justify-end">
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
                        <div className="text-center py-16 bg-white rounded-lg shadow-soft">
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
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sand text-navy uppercase tracking-widest text-xs font-bold rounded-lg hover:bg-white transition-colors"
                        >
                            Se alla fastigheter
                            <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/kontakt"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white uppercase tracking-widest text-xs font-bold rounded-lg hover:bg-white/10 transition-colors"
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
