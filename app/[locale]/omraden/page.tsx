'use client';

import { useTranslations } from 'next-intl';
import { MapPin, ArrowRight, Sun, Palmtree } from 'lucide-react';
import Link from 'next/link';
import AreaCard from '@/components/areas/AreaCard';
import { MOCK_AREAS } from '@/lib/mock-data';
import { getAreasByRegion } from '@/lib/areas';

export default function AreasPage() {
    const t = useTranslations('common');
    const areasByRegion = getAreasByRegion(MOCK_AREAS);

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
                            <span className="text-xs uppercase tracking-widest">Spaniens Guldkust</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif mb-6">
                            Utforska <span className="text-sand italic">Spanien</span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
                            Från Costa Blancas kritvita stränder till Costa del Sols glamorösa livsstil –
                            hitta din perfekta plats i solen.
                        </p>
                    </div>
                </div>

                {/* Decorative Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8F7F4" />
                    </svg>
                </div>
            </section>

            {/* Region Quick Links */}
            <section className="py-12 bg-alabaster">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
                        <a
                            href="#costa-blanca"
                            className="group flex items-center gap-4 p-6 bg-white rounded-sm shadow-soft hover:shadow-hover transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                                <Sun size={24} />
                            </div>
                            <div>
                                <h3 className="font-serif text-xl text-navy group-hover:text-sand transition-colors">Costa Blanca</h3>
                                <p className="text-sm text-gray-500">{areasByRegion['costa-blanca'].length} områden</p>
                            </div>
                            <ArrowRight size={20} className="ml-auto text-gray-300 group-hover:text-sand group-hover:translate-x-1 transition-all" />
                        </a>

                        <a
                            href="#costa-del-sol"
                            className="group flex items-center gap-4 p-6 bg-white rounded-sm shadow-soft hover:shadow-hover transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                <Palmtree size={24} />
                            </div>
                            <div>
                                <h3 className="font-serif text-xl text-navy group-hover:text-sand transition-colors">Costa del Sol</h3>
                                <p className="text-sm text-gray-500">{areasByRegion['costa-del-sol'].length} områden</p>
                            </div>
                            <ArrowRight size={20} className="ml-auto text-gray-300 group-hover:text-sand group-hover:translate-x-1 transition-all" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Costa Blanca Section */}
            <section id="costa-blanca" className="py-16 md:py-24 bg-white scroll-mt-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-navy/10 w-12"></div>
                        <h2 className="text-3xl md:text-4xl font-serif text-navy">
                            Costa <span className="text-sand italic">Blanca</span>
                        </h2>
                    </div>

                    <p className="text-gray-600 max-w-2xl mb-12 leading-relaxed">
                        Costa Blanca, &quot;Den vita kusten&quot;, sträcker sig längs Alicante-provinsen och är känd för sina
                        över 300 soldagar per år, kristallklara vatten och charmiga fiskebyar.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {areasByRegion['costa-blanca'].map((area) => (
                            <AreaCard key={area.slug} area={area} />
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <Link
                            href="/omraden/costa-blanca"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white uppercase tracking-widest text-xs font-bold hover:bg-charcoal transition-colors"
                        >
                            Alla områden i Costa Blanca
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Costa del Sol Section */}
            <section id="costa-del-sol" className="py-16 md:py-24 bg-greige/30 scroll-mt-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-navy/10 w-12"></div>
                        <h2 className="text-3xl md:text-4xl font-serif text-navy">
                            Costa del <span className="text-sand italic">Sol</span>
                        </h2>
                    </div>

                    <p className="text-gray-600 max-w-2xl mb-12 leading-relaxed">
                        Costa del Sol, &quot;Solkusten&quot;, erbjuder en unik blandning av glamour och tradition.
                        Från lyxiga Marbella till pittoreska Nerja – här finns något för alla.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {areasByRegion['costa-del-sol'].map((area) => (
                            <AreaCard key={area.slug} area={area} />
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <Link
                            href="/omraden/costa-del-sol"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white uppercase tracking-widest text-xs font-bold hover:bg-charcoal transition-colors"
                        >
                            Alla områden i Costa del Sol
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-navy text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif mb-6">
                        Osäker på vilket <span className="text-sand italic">område</span>?
                    </h2>
                    <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
                        Vi hjälper dig hitta rätt. Berätta om dina önskemål så guidar vi dig till
                        de områden som passar dig bäst.
                    </p>
                    <Link
                        href="/kontakt"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-sand text-navy uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors"
                    >
                        Kontakta oss
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
