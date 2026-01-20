'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { MapPin, ArrowRight, Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import AreaCard from '@/components/areas/AreaCard';
import { MOCK_AREAS } from '@/lib/mock-data';
import { getAreasByRegion } from '@/lib/areas';

const REGION_DATA: Record<string, { name: string; description: string; heroColor: string }> = {
    'costa-blanca': {
        name: 'Costa Blanca',
        description: 'Costa Blanca, "Den vita kusten", sträcker sig längs Alicante-provinsen och är känd för sina över 300 soldagar per år, kristallklara vatten och charmiga fiskebyar. Från livliga Benidorm till lugna Torrevieja – här finns områden för alla smaker.',
        heroColor: 'from-sky-900 to-navy',
    },
    'costa-del-sol': {
        name: 'Costa del Sol',
        description: 'Costa del Sol, "Solkusten", erbjuder en unik blandning av glamour och tradition. Från lyxiga Marbella med sina exklusiva strandklubbar till pittoreska Nerja med sina spektakulära grottor – här upplevs Spanien på riktigt.',
        heroColor: 'from-amber-900 to-navy',
    },
};

export default function RegionPage() {
    const params = useParams();
    const regionSlug = params.region as string;

    const regionInfo = REGION_DATA[regionSlug];
    const areasByRegion = getAreasByRegion(MOCK_AREAS);
    const areas = areasByRegion[regionSlug as keyof typeof areasByRegion] || [];

    if (!regionInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-alabaster">
                <div className="text-center">
                    <h1 className="text-4xl font-serif text-navy mb-4">Region hittades inte</h1>
                    <Link href="/omraden" className="text-sand hover:underline">
                        Tillbaka till områden
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-alabaster">
            {/* Hero Section */}
            <section className={`relative bg-gradient-to-br ${regionInfo.heroColor} text-white py-20 md:py-28`}>
                <div className="container mx-auto px-4">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <Home size={14} />
                            Hem
                        </Link>
                        <ChevronRight size={14} />
                        <Link href="/omraden" className="hover:text-white transition-colors">
                            Områden
                        </Link>
                        <ChevronRight size={14} />
                        <span className="text-white">{regionInfo.name}</span>
                    </nav>

                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
                            <MapPin size={14} className="text-sand" />
                            <span className="text-xs uppercase tracking-widest">{areas.length} områden</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif mb-6">
                            {regionInfo.name}
                        </h1>

                        <p className="text-lg text-white/70 font-light leading-relaxed">
                            {regionInfo.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Areas Grid */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-navy/10 w-12"></div>
                            <h2 className="text-2xl md:text-3xl font-serif text-navy">
                                Alla områden i <span className="text-sand italic">{regionInfo.name}</span>
                            </h2>
                        </div>

                        <Link
                            href="/omraden"
                            className="hidden md:inline-flex items-center gap-2 text-sm text-gray-500 hover:text-navy transition-colors"
                        >
                            <ArrowRight size={14} className="rotate-180" />
                            Alla regioner
                        </Link>
                    </div>

                    {areas.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {areas.map((area) => (
                                <AreaCard key={area.slug} area={area} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-sm shadow-soft">
                            <p className="text-gray-500">Inga områden hittades i denna region.</p>
                        </div>
                    )}

                    {/* Mobile back link */}
                    <div className="mt-10 text-center md:hidden">
                        <Link
                            href="/omraden"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-navy transition-colors"
                        >
                            <ArrowRight size={14} className="rotate-180" />
                            Alla regioner
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-navy text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-serif mb-4">
                        Hitta din drömbostad i <span className="text-sand italic">{regionInfo.name}</span>
                    </h2>
                    <p className="text-white/70 max-w-xl mx-auto mb-8">
                        Vi har ett brett utbud av fastigheter i regionen. Kontakta oss för personlig rådgivning.
                    </p>
                    <Link
                        href="/fastigheter"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-sand text-navy uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors"
                    >
                        Se alla fastigheter
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
