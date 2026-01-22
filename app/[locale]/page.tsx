import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import TrustSignals from '@/components/TrustSignals';
import PropertyCard from '@/components/property/PropertyCard';
import FilterWithModal from '@/components/search/FilterWithModal';
import ExploreSection from '@/components/home/ExploreSection';
import VisningsresaTeaser from '@/components/home/VisningsresaTeaser';
import RegionCards from '@/components/home/RegionCards';
import { fetchProperties } from '@/lib/xml-parser';

export default async function HomePage() {
    // Fetch real properties from XML API
    const allProperties = await fetchProperties();
    const properties = allProperties.slice(0, 4); // Show first 4 properties
    const totalCount = allProperties.length;
    return (
        <>
            <Hero />

            {/* Properties Section - MOVED UP */}
            <section className="py-32 bg-greige/30 border-y border-gray-100 relative">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Filter Sidebar - Desktop */}
                        <aside className="hidden lg:block w-80 flex-shrink-0">
                            <FilterWithModal />
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1">
                            <div className="flex justify-between items-end mb-12">
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-serif text-navy mb-3">
                                        Utvalda bostäder till salu i Spanien
                                    </h2>
                                    <p className="text-gray-500 font-light text-sm">
                                        Visar {properties.length} av {totalCount.toLocaleString('sv-SE')} objekt på Costa Blanca, Costa del Sol och fler regioner
                                    </p>
                                </div>
                                <div className="hidden md:flex gap-8 border-b border-gray-200 pb-2">
                                    <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy border-b-2 border-navy pb-2 -mb-2.5">
                                        Senast inkommet
                                    </button>
                                    <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-navy transition-colors">
                                        Exklusivt
                                    </button>
                                    <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-navy transition-colors">
                                        Prissänkt
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                                {properties.map((property) => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </div>

                            <div className="mt-20 text-center">
                                <Link
                                    href="/fastigheter"
                                    className="bg-transparent border border-navy text-navy px-12 py-5 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-navy hover:text-white transition-all duration-300 inline-block"
                                >
                                    Visa alla bostäder till salu i Spanien
                                </Link>
                            </div>
                        </div>
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


