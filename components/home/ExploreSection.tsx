'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface GuideCard {
    badge: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    href: string;
    ctaText: string;
}

const guideCards: GuideCard[] = [
    {
        badge: '89 områden',
        title: 'Områdesguiden',
        description: 'Detaljerad info om varje område – priser, stadsdelar, klimat och livsstil för svenskar',
        image: '/images/areas/benidorm.png',
        imageAlt: 'Områdesguide Spanien - 89 områden på Costa Blanca och Costa del Sol',
        href: '/omraden',
        ctaText: 'Utforska områden',
    },
    {
        badge: '87 golfbanor',
        title: 'Golfguiden',
        description: 'Ratings, green fees, faciliteter och tips för alla banor på Costa Blanca & Costa del Sol',
        image: '/images/golf/las-colinas-hero.png',
        imageAlt: 'Golfbanor i Spanien - 87 banor på Costa Blanca och Costa del Sol',
        href: '/golf',
        ctaText: 'Utforska banor',
    },
    {
        badge: '2026',
        title: 'Köpa bostad i Spanien',
        description: 'Skatter, köpprocess, kostnader och vanliga fällor – komplett guide',
        image: '/images/guide-hero-2025.png',
        imageAlt: 'Guide till att köpa bostad i Spanien 2026',
        href: '/guide/kopa-bostad-spanien',
        ctaText: 'Läs guiden',
    },
    {
        badge: '3-5 dagar',
        title: 'Visningsresa',
        description: 'Upplev Spanien på plats – vi guidar dig till 8-12 utvalda fastigheter',
        image: '/images/areas/mojacar.png',
        imageAlt: 'Visningsresa till Spanien - besök bostäder med svensk guide',
        href: '/visningsresa',
        ctaText: 'Läs mer',
    },
];

export default function ExploreSection() {
    return (
        <section className="py-24 bg-alabaster">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-sand text-[10px] uppercase tracking-[0.25em] font-bold mb-4 block">
                        Utforska
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">
                        Allt du behöver för att hitta rätt i Spanien
                    </h2>
                    <p className="text-gray-500 font-light max-w-2xl mx-auto">
                        Detaljerade guider om områden, golfbanor, skatter och köpprocessen – allt samlat på ett ställe.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {guideCards.map((card) => (
                        <Link
                            key={card.href}
                            href={card.href}
                            className="group bg-white rounded-sm overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="aspect-[16/10] relative overflow-hidden">
                                <Image
                                    src={card.image}
                                    alt={card.imageAlt}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="bg-navy/90 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-sm">
                                        {card.badge}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="font-serif text-xl text-navy mb-2 group-hover:text-sand transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-gray-500 text-sm font-light mb-4 line-clamp-2">
                                    {card.description}
                                </p>
                                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-semibold text-navy group-hover:text-sand transition-colors">
                                    {card.ctaText}
                                    <ArrowRight
                                        size={14}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
