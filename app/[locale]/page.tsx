import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import TrustSignals from '@/components/TrustSignals';
import FilterWithModal from '@/components/search/FilterWithModal';
import ExploreSection from '@/components/home/ExploreSection';
import VisningsresaTeaser from '@/components/home/VisningsresaTeaser';
import RegionCards from '@/components/home/RegionCards';
import FeaturedProperties from '@/components/home/FeaturedProperties';

export default async function HomePage() {
    return (
        <>
            <Hero />

            {/* Properties Section - MOVED UP */}
            <section className="py-32 bg-greige/30 border-y border-gray-100 relative">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Filter Sidebar - Desktop */}
                        <aside className="hidden lg:block w-80 flex-shrink-0">
                            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-sm" />}>
                                <FilterWithModal />
                            </Suspense>
                        </aside>

                        {/* Main Content: Featured Properties (Client Component) */}
                        <FeaturedProperties />
                    </div>
                </div>
            </section>

            {/* Areas Section */}
            <section className="py-24 bg-slate-50 relative">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    {/* Dark Navy Header Block */}
                    <div className="bg-navy p-10 md:p-16 mb-12 rounded-sm shadow-xl flex flex-col md:flex-row justify-between items-end gap-8 relative overflow-hidden group">
                        {/* Decorative subtle light leak */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-700 group-hover:opacity-70" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sand/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

                        <div className="max-w-xl relative z-10">
                            <span className="text-sand text-[10px] uppercase tracking-[0.25em] font-bold mb-4 block">
                                Destinationer
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
                                Populära områden för <br />
                                bostadsköp i Spanien
                            </h2>
                            <p className="text-white/70 font-light leading-relaxed text-lg">
                                Från Costa Blancas kritvita stränder till Costa del Sols glamorösa livsstil – hitta ditt perfekta område bland 89 destinationer i 4 regioner.
                            </p>
                        </div>

                        <Link
                            href="/omraden"
                            className="group/link flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold text-white hover:text-sand transition-colors relative z-10 whitespace-nowrap pb-1 border-b border-transparent hover:border-sand"
                        >
                            Utforska alla 89 områden
                            <ArrowRight
                                size={16}
                                className="group-hover/link:translate-x-1 transition-transform text-sand"
                            />
                        </Link>
                    </div>

                    {/* Region Cards Grid - 4 regions */}
                    <RegionCards />
                </div>
            </section>

            {/* Explore/Guide Section - NEW */}
            <ExploreSection />

            {/* Visningsresa Teaser - NEW */}
            <VisningsresaTeaser />

            <TrustSignals />
        </>
    );
}
