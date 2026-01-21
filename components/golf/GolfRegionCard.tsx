'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface GolfRegionCardProps {
    region: string;
    title: string;
    subtitle: string;
    priceFrom: number;
    image: string;
    highlights: string[];
}

export default function GolfRegionCard({
    region,
    title,
    subtitle,
    priceFrom,
    image,
    highlights
}: GolfRegionCardProps) {
    return (
        <Link
            href={`/golf/${region}`}
            className="group relative h-[500px] w-full block overflow-hidden rounded-sm"
        >
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="text-sand text-[10px] uppercase tracking-[0.3em] mb-2 block">
                    {subtitle}
                </span>
                <h3 className="font-serif text-4xl mb-4 group-hover:text-sand transition-colors">
                    {title}
                </h3>

                <div className="space-y-4 mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex flex-wrap gap-2 text-sm text-white/80">
                        {highlights.map(h => (
                            <span key={h} className="bg-white/10 px-3 py-1 rounded-full">{h}</span>
                        ))}
                    </div>
                    <div>
                        <span className="text-white/60 text-sm">Green fee från </span>
                        <span className="text-xl font-serif">€{priceFrom}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium">
                    Utforska regionen <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
            </div>
        </Link>
    );
}
