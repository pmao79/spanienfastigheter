'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Region {
    slug: string;
    name: string;
    propertyCount: number;
    image: string;
    imageAlt: string;
    description: string;
}

const regions: Region[] = [
    {
        slug: 'costa-blanca',
        name: 'Costa Blanca',
        propertyCount: 50,
        image: '/images/areas/benidorm.png',
        imageAlt: 'Köp bostad på Costa Blanca, Spanien - stränder och kustlinje',
        description: 'Milslånga vita stränder, saltlaguner och ett fantastiskt klimat året runt. Från Torrevieja till Denia.',
    },
    {
        slug: 'costa-del-sol',
        name: 'Costa del Sol',
        propertyCount: 21,
        image: '/images/areas/marbella.png',
        imageAlt: 'Köp bostad på Costa del Sol, Spanien - Marbella och solkusten',
        description: 'Lyx, golf och stränder i världsklass. Från Marbella till Málaga – Europas mest glamorösa kust.',
    },
    {
        slug: 'costa-calida',
        name: 'Costa Cálida',
        propertyCount: 10,
        image: '/images/areas/la-manga.png',
        imageAlt: 'Köp bostad på Costa Cálida, Spanien - Mar Menor och La Manga',
        description: 'Den varma kusten med Mar Menor och La Manga. Idealt klimat och autentisk spansk livsstil.',
    },
    {
        slug: 'costa-de-almeria',
        name: 'Costa de Almería',
        propertyCount: 8,
        image: '/images/areas/mojacar.png',
        imageAlt: 'Köp bostad på Costa de Almería, Spanien - orörda stränder',
        description: 'Orörda stränder och dramatiska landskap. Spaniens mest soldränkta kust med genuina vita byar.',
    },
];

export default function RegionCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.map((region) => (
                <Link
                    key={region.slug}
                    href={`/omraden/${region.slug}`}
                    className="group relative overflow-hidden rounded-sm aspect-[4/5] shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                    {/* Background Image */}
                    <Image
                        src={region.image}
                        alt={region.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        {/* Property Count Badge */}
                        <span className="text-sand text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block">
                            {region.propertyCount} fastigheter
                        </span>

                        {/* Region Name */}
                        <h3 className="font-serif text-2xl mb-3 group-hover:text-sand transition-colors">
                            {region.name}
                        </h3>

                        {/* Description */}
                        <p className="text-white/80 text-sm font-light line-clamp-2 mb-4">
                            {region.description}
                        </p>

                        {/* CTA */}
                        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-semibold text-sand group-hover:text-white transition-colors">
                            Utforska →
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
