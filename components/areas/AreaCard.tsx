import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Area } from '@/types/property';

interface AreaCardProps {
    area: Area;
}

export default function AreaCard({ area }: AreaCardProps) {
    return (
        <Link
            href={`/omraden/${area.region}/${area.slug}`}
            className="group relative aspect-[4/5] overflow-hidden rounded-lg"
        >
            {/* Background Image */}
            {area.image && (
                <Image
                    src={area.image}
                    alt={area.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-sand text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
                    {area.propertyCount} fastigheter
                </p>
                <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-sand transition-colors">
                    {area.name}
                </h3>
                {area.description && (
                    <p className="text-white/70 text-sm font-light line-clamp-2 mb-4">
                        {area.description}
                    </p>
                )}
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-semibold text-white group-hover:text-sand transition-colors">
                    Utforska
                    <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                    />
                </span>
            </div>
        </Link>
    );
}
