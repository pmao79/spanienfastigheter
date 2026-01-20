'use client';

import { useParams } from 'next/navigation';
import { MapPin, ArrowRight, Home, ChevronRight, Bed, Bath, Maximize } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { MOCK_AREAS, MOCK_PROPERTIES } from '@/lib/mock-data';
import { getAreaBySlug, getPropertiesByArea } from '@/lib/areas';

const REGION_NAMES: Record<string, string> = {
    'costa-blanca': 'Costa Blanca',
    'costa-del-sol': 'Costa del Sol',
};

export default function AreaDetailPage() {
    const params = useParams();
    const regionSlug = params.region as string;
    const areaSlug = params.area as string;

    const area = getAreaBySlug(MOCK_AREAS, areaSlug);
    const properties = getPropertiesByArea(MOCK_PROPERTIES, areaSlug);
    const regionName = REGION_NAMES[regionSlug] || regionSlug;

    if (!area) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-alabaster">
                <div className="text-center">
                    <h1 className="text-4xl font-serif text-navy mb-4">Område hittades inte</h1>
                    <Link href="/omraden" className="text-sand hover:underline">
                        Tillbaka till områden
                    </Link>
                </div>
            </div>
        );
    }

    // Format price helper
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('sv-SE', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-alabaster">
            {/* Hero Section */}
            <section className="relative bg-navy text-white py-20 md:py-28 overflow-hidden">
                {/* Background Image */}
                {area.image && (
                    <div className="absolute inset-0">
                        <Image
                            src={area.image}
                            alt={area.name}
                            fill
                            className="object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/50" />
                    </div>
                )}

                <div className="container mx-auto px-4 relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-white/60 mb-8 flex-wrap">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <Home size={14} />
                            Hem
                        </Link>
                        <ChevronRight size={14} />
                        <Link href="/omraden" className="hover:text-white transition-colors">
                            Områden
                        </Link>
                        <ChevronRight size={14} />
                        <Link href={`/omraden/${regionSlug}`} className="hover:text-white transition-colors">
                            {regionName}
                        </Link>
                        <ChevronRight size={14} />
                        <span className="text-white">{area.name}</span>
                    </nav>

                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
                            <MapPin size={14} className="text-sand" />
                            <span className="text-xs uppercase tracking-widest">{area.province}, Spanien</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif mb-6">
                            {area.name}
                        </h1>

                        {area.description && (
                            <p className="text-lg text-white/70 font-light leading-relaxed mb-8">
                                {area.description}
                            </p>
                        )}

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-6">
                            <div className="bg-white/10 px-6 py-4 rounded-sm">
                                <p className="text-sand text-xs uppercase tracking-widest mb-1">Fastigheter</p>
                                <p className="text-2xl font-serif">{area.propertyCount}</p>
                            </div>
                            <div className="bg-white/10 px-6 py-4 rounded-sm">
                                <p className="text-sand text-xs uppercase tracking-widest mb-1">Från</p>
                                <p className="text-2xl font-serif">{formatPrice(area.priceRange.min)}</p>
                            </div>
                            <div className="bg-white/10 px-6 py-4 rounded-sm">
                                <p className="text-sand text-xs uppercase tracking-widest mb-1">Snittpris</p>
                                <p className="text-2xl font-serif">{formatPrice(area.avgPrice)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Properties Grid */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px bg-navy/10 w-12"></div>
                        <h2 className="text-2xl md:text-3xl font-serif text-navy">
                            Fastigheter i <span className="text-sand italic">{area.name}</span>
                        </h2>
                    </div>

                    {properties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {properties.map((property) => (
                                <Link
                                    key={property.id}
                                    href={`/fastigheter/${property.slug}`}
                                    className="group bg-white rounded-sm shadow-soft hover:shadow-hover transition-all duration-300 overflow-hidden"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        {property.images[0] && (
                                            <Image
                                                src={property.images[0]}
                                                alt={property.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        )}
                                        {property.isNewBuild && (
                                            <span className="absolute top-4 left-4 px-3 py-1 bg-sage text-white text-[10px] uppercase tracking-widest font-bold">
                                                Nyproduktion
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <p className="text-sand text-[10px] uppercase tracking-widest font-bold mb-2">
                                            {property.type}
                                        </p>
                                        <h3 className="font-serif text-xl text-navy mb-2 group-hover:text-sand transition-colors">
                                            {property.title}
                                        </h3>
                                        <p className="text-2xl font-serif text-navy mb-4">
                                            {formatPrice(property.price)}
                                        </p>

                                        {/* Specs */}
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Bed size={16} />
                                                <span>{property.beds}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Bath size={16} />
                                                <span>{property.baths}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Maximize size={16} />
                                                <span>{property.builtArea} m²</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-sm shadow-soft">
                            <p className="text-gray-500 mb-4">Inga fastigheter tillgängliga i detta område just nu.</p>
                            <Link
                                href="/fastigheter"
                                className="inline-flex items-center gap-2 text-sand hover:underline"
                            >
                                Se alla fastigheter
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Back Link */}
            <section className="pb-16">
                <div className="container mx-auto px-4 text-center">
                    <Link
                        href={`/omraden/${regionSlug}`}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-navy transition-colors"
                    >
                        <ArrowRight size={14} className="rotate-180" />
                        Tillbaka till {regionName}
                    </Link>
                </div>
            </section>
        </div>
    );
}
