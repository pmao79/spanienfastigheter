'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight, MapPin } from 'lucide-react';
import GolfRegionCard from '@/components/golf/GolfRegionCard';
import GolfCourseCard from '@/components/golf/GolfCourseCard';
import { GOLF_COURSES } from '@/data/golf/courses';

export default function GolfPage() {
    const t = useTranslations('golf');

    // Featured courses (Top rated > 4.6)
    const topCourses = [...GOLF_COURSES]
        .filter(course => course.rating.overall >= 4.6)
        .sort((a, b) => b.rating.overall - a.rating.overall)
        .slice(0, 4);

    // Best value (Rating > 4.2 sorted by price)
    const valueCourses = [...GOLF_COURSES]
        .filter(course => course.rating.overall >= 4.2)
        .sort((a, b) => (a.pricing?.greenFee?.highSeason?.weekday?.min || 999) - (b.pricing?.greenFee?.highSeason?.weekday?.min || 999))
        .slice(0, 4);

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative h-[70vh] min-h-[500px]">
                {/* Placeholder hero image until we generate one specific for main page */}
                <div className="absolute inset-0 bg-navy">
                    <Image
                        src="/images/golf/las-colinas-hero.png" // Fallback to one of the generated ones if available
                        alt="Golf Spain"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white max-w-4xl px-4">
                        <p className="text-sand text-[10px] uppercase tracking-[0.3em] mb-4">
                            {t('subtitle')}
                        </p>
                        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6">
                            {t('title')}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Upptäck 87 golfbanor på Spaniens solkust. Vi hjälper dig hitta rätt bana och boende.
                        </p>

                        {/* Quick stats grid */}
                        <div className="flex justify-center flex-wrap gap-8 mt-8 text-sm">
                            <div>
                                <span className="text-2xl font-serif text-sand">{GOLF_COURSES.length || '20+'}</span>
                                <span className="text-white/70 ml-2">{t('courses')}</span>
                            </div>
                            <div>
                                <span className="text-2xl font-serif text-sand">€35</span>
                                <span className="text-white/70 ml-2">från</span>
                            </div>
                            <div>
                                <span className="text-2xl font-serif text-sand">320</span>
                                <span className="text-white/70 ml-2">soldagar</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Regions */}
            <section className="py-20 bg-alabaster">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-sand text-[10px] uppercase tracking-[0.3em] mb-2">
                            Destinationer
                        </p>
                        <h2 className="font-serif text-4xl text-navy">
                            Välj din region
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <GolfRegionCard
                            region="costa-blanca"
                            title="Costa Blanca"
                            subtitle="32 golfbanor"
                            priceFrom={35}
                            image="/images/golf/las-colinas-hero.png" // Placeholder
                            highlights={['Las Colinas', 'Villamartin', 'Lo Romero']}
                        />
                        <GolfRegionCard
                            region="costa-del-sol"
                            title="Costa del Sol"
                            subtitle="55 golfbanor"
                            priceFrom={45}
                            image="/images/golf/valderrama-hero.png" // Placeholder
                            highlights={['Valderrama', 'La Cala', 'Los Naranjos']}
                        />
                    </div>
                </div>
            </section>

            {/* Top Rated */}
            <section className="py-20 bg-greige">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <p className="text-sand text-[10px] uppercase tracking-[0.3em] mb-2">
                                Populärast just nu
                            </p>
                            <h2 className="font-serif text-4xl text-navy">
                                Topprankade banor
                            </h2>
                        </div>
                        <Link href="/golf" className="text-navy hover:text-sand transition-colors font-medium">
                            {t('viewAll')} →
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {topCourses.map(course => (
                            <GolfCourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Best Value */}
            <section className="py-20 bg-alabaster">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <p className="text-sand text-[10px] uppercase tracking-[0.3em] mb-2">
                                Prisvärt
                            </p>
                            <h2 className="font-serif text-4xl text-navy">
                                Mest golf för pengarna
                            </h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {valueCourses.map(course => (
                            <GolfCourseCard key={course.id} course={course} showPrice />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-navy text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="font-serif text-4xl mb-6">Drömmer du om ett hus vid banan?</h2>
                    <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
                        Vi har över 150 fastigheter med direkt anslutning till golfbanor.
                        Från lägenheter med utsikt över 18:e hålet till lyxvillor med privat pool.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/fastigheter?golf=true"
                            className="bg-sand text-navy px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-colors"
                        >
                            Visa golffastigheter
                        </Link>
                        <Link
                            href="/kontakt"
                            className="border border-white/30 px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                        >
                            Kontakta mäklare
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
