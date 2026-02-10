'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bed, Bath, Maximize, Heart, MapPin, ChevronRight, Home, Sun, Euro, Users, Mountain, Plane, Building2, Umbrella, Car, GraduationCap, ShoppingBag } from 'lucide-react';
import { AreaDetail } from '@/types/property';
import { Property } from '@/types/property'; // Assuming Property type is needed for the list
import AnimatedCTA from '@/components/areas/AnimatedCTA';
import AreaMap from '@/components/areas/AreaMap';
import AreaDistricts from '@/components/areas/AreaDistricts';
import AreaClimate from '@/components/areas/AreaClimate';
import AreaMarket from '@/components/areas/AreaMarket';
import AreaPractical from '@/components/areas/AreaPractical';
import AreaComparison from '@/components/areas/AreaComparison';
import AreaFAQ from '@/components/areas/AreaFAQ';
import QuickFacts from '@/components/areas/QuickFacts';

// Icon mapping for highlights (reused from page.tsx)
const iconMap: Record<string, React.ElementType> = {
    'sun': Sun, 'euro': Euro, 'users': Users, 'mountain': Mountain,
    'plane': Plane, 'heart': Heart, 'building': Building2, 'building-2': Building2,
    'beach': Umbrella, 'palm': Palmtree, 'car': Car, 'school': GraduationCap,
    'shopping-bag': ShoppingBag, 'eye': MapPin, 'gem': Heart, 'tree': Mountain,
    'anchor': Plane, 'golf': Sun, 'star': Heart, 'baby': Heart, 'train': Car,
    'utensils': ShoppingBag, 'palette': Heart, 'flower': Heart, 'music': Heart,
    'castle': Building2, 'waves': Umbrella, 'fish': Umbrella, 'cave': Mountain,
    'horse': Heart, 'crown': Heart, 'yacht': Plane, 'grape': Heart, 'moon': Sun,
    'flag': Heart, 'hiking': Mountain, 'store': ShoppingBag, 'map': MapPin,
    'layers': Building2, 'candy': Heart, 'trending-up': Euro, 'home': Home,
    'shield': Heart, 'book': GraduationCap, 'thermometer': Sun, 'island': Umbrella,
    'landmark': Building2, 'leaf': Mountain, 'droplets': Umbrella, 'church': Building2,
    'wine': ShoppingBag, 'dumbbell': Heart, 'ferris-wheel': Heart, 'cable-car': Mountain
};

// Import Palmtree separately if it's missing in lucide-react (it was in the original file imports)
import { Palmtree } from 'lucide-react';

interface AreaContentProps {
    area: AreaDetail;
    properties: Property[]; // Or specific type
    relatedAreas: any[]; // Or specific type
    regionSlug: string;
    regionName: string;
}

export default function AreaContent({
    area,
    properties,
    relatedAreas,
    regionSlug,
    regionName
}: AreaContentProps) {
    const [activeLocation, setActiveLocation] = useState<{ lat: number; lng: number, zoom?: number } | null>(null);

    // Helper to format price
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
            <section className="relative bg-navy text-white py-20 md:py-32 overflow-hidden">
                {/* Background Image */}
                {area.image && (
                    <div className="absolute inset-0">
                        <Image
                            src={area.image}
                            alt={area.name}
                            fill
                            className="object-cover opacity-30"
                            priority
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

                    <div className="max-w-4xl text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 mx-auto md:mx-0">
                            <MapPin size={14} className="text-sand" />
                            <span className="text-xs uppercase tracking-widest">{area.province}, Spanien</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                            {area.headline || `Köp bostad i ${area.name}`}
                        </h1>

                        <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0">
                            {area.content.intro}
                        </p>

                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12">
                        <AnimatedCTA href={`/fastigheter?area=${area.slug}`} text="Se bostäder till salu" variant="primary" />
                        <AnimatedCTA href="/kontakt" text="Kostnadsfri rådgivning" variant="outline-white" />
                    </div>
                </div>
            </section >

            {/* Quick Facts Section */}
            {area.quickFacts && (
                <section className="py-12 bg-white border-b border-gray-100">
                    <div className="container mx-auto px-4">
                        <QuickFacts
                            areaName={area.name}
                            facts={[
                                { label: 'Befolkning', value: area.quickFacts.population?.value ? area.quickFacts.population.value.toLocaleString('sv-SE') : '', subtext: area.quickFacts.population?.year?.toString(), source: area.quickFacts.population?.source },
                                { label: 'Utländsk andel', value: area.quickFacts.foreignPercentage?.value ? `${area.quickFacts.foreignPercentage.value}%` : '', source: area.quickFacts.foreignPercentage?.source },
                                { label: 'Svenska invånare', value: area.quickFacts.swedesEstimate?.value ? area.quickFacts.swedesEstimate.value.toLocaleString('sv-SE') : '', subtext: area.quickFacts.swedesEstimate?.note },
                                { label: 'Avstånd till flygplats', value: area.quickFacts.airportDistance ? `${area.quickFacts.airportDistance.minutes} min` : '', subtext: area.quickFacts.airportDistance?.airport },
                                { label: 'Pris/m²', value: area.quickFacts.pricePerM2?.value ? `${area.quickFacts.pricePerM2.value.toLocaleString('sv-SE')} €` : '', source: area.quickFacts.pricePerM2?.source },
                                { label: 'Soltimmar/år', value: area.quickFacts.sunshineHours?.value ? area.quickFacts.sunshineHours.value.toString() : '' },
                                { label: 'Medeltemperatur', value: area.quickFacts.averageTemp?.annual ? `${area.quickFacts.averageTemp.annual}°C` : '', subtext: 'Årsmedeltemperatur' }
                            ].filter(f => f.value !== '')}
                        />
                    </div>
                </section>
            )}

            {/* Main Content Layout */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column (Content) */}
                    <div className="lg:col-span-8 space-y-16">

                        {area.slug === 'torrevieja' && (
                            <section className="bg-white border border-gray-100 p-6 rounded-sm shadow-soft">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-px bg-navy/10 w-12"></div>
                                    <h2 className="text-xl md:text-2xl font-serif text-navy">
                                        Populära sökningar i <span className="text-sand italic">Torrevieja</span>
                                    </h2>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    Utforska specifika bostadstyper och lägen som är extra efterfrågade just nu.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href="/fastigheter/torrevieja/strandnara"
                                        className="px-4 py-2 text-xs uppercase tracking-widest font-semibold border border-sand text-sand hover:bg-sand hover:text-navy transition-colors"
                                    >
                                        Strandnära lägenheter
                                    </Link>
                                    <Link
                                        href="/fastigheter/torrevieja/radhus"
                                        className="px-4 py-2 text-xs uppercase tracking-widest font-semibold border border-sand text-sand hover:bg-sand hover:text-navy transition-colors"
                                    >
                                        Radhus i Torrevieja
                                    </Link>
                                    <Link
                                        href="/fastigheter/torrevieja/bungalow"
                                        className="px-4 py-2 text-xs uppercase tracking-widest font-semibold border border-sand text-sand hover:bg-sand hover:text-navy transition-colors"
                                    >
                                        Bungalow i Torrevieja
                                    </Link>
                                </div>
                            </section>
                        )}

                        {/* Lifestyle Section */}
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-px bg-navy/10 w-12"></div>
                                <h2 className="text-2xl md:text-3xl font-serif text-navy">
                                    Livsstil i <span className="text-sand italic">{area.name}</span>
                                </h2>
                            </div>
                            <div className="prose prose-lg text-gray-600 max-w-none">
                                <p className="leading-relaxed">{area.content.lifestyle}</p>

                                {/* Why Swedes Love It */}
                                {area.whySwedes && (
                                    <div className="bg-alabaster p-6 rounded-sm border-l-4 border-sand my-8">
                                        <h3 className="text-lg font-serif text-navy mb-3 flex items-center gap-2">
                                            <Heart size={18} className="text-sand" />
                                            Varför svenskar älskar {area.name}
                                        </h3>
                                        <ul className="space-y-2">
                                            {area.whySwedes.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <span className="text-green-500 mt-1">✓</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Honest Assessment */}
                                {area.notSuitableFor && area.notSuitableFor.length > 0 && (
                                    <div className="bg-gray-50 p-6 rounded-sm border-l-4 border-gray-300 my-8">
                                        <h3 className="text-lg font-serif text-gray-700 mb-3 flex items-center gap-2">
                                            <span className="text-xl">🤔</span>
                                            Vem passar det INTE för?
                                        </h3>
                                        <ul className="space-y-2">
                                            {area.notSuitableFor.map((item, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                                    <span className="text-red-400 mt-1">•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Districts Section */}
                        {area.districts && area.districts.length > 0 && (
                            <section>
                                <AreaDistricts
                                    districts={area.districts}
                                    areaName={area.name}
                                    onShowOnMap={(coords) => setActiveLocation({ ...coords, zoom: 15 })}
                                />
                            </section>
                        )}

                        {/* Climate Section */}
                        {area.climateComparison && (
                            <section>
                                <AreaClimate data={area.climateComparison} areaName={area.name} />
                            </section>
                        )}
                        {!area.climateComparison && area.content.climate && (
                            <section>
                                <h2 className="text-2xl font-serif text-navy mb-4">Klimat</h2>
                                <p className="text-gray-600 leading-relaxed">{area.content.climate}</p>
                            </section>
                        )}

                        {/* Market Section */}
                        {area.market && (
                            <section>
                                <AreaMarket {...area.market} areaName={area.name} />
                            </section>
                        )}
                        {!area.market && area.content.propertyMarket && (
                            <section>
                                <h2 className="text-2xl font-serif text-navy mb-4">Fastighetsmarknaden</h2>
                                <p className="text-gray-600 leading-relaxed">{area.content.propertyMarket}</p>
                            </section>
                        )}

                        {/* Highlights Grid */}
                        <section className="bg-alabaster p-8 rounded-sm">
                            <h3 className="text-xl font-serif text-navy mb-6 text-center">Det bästa med {area.name}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {area.highlights.map((highlight, index) => {
                                    const IconComponent = iconMap[highlight.icon] || Heart;
                                    return (
                                        <div key={index} className="text-center p-4 bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow">
                                            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-sand/10 flex items-center justify-center">
                                                <IconComponent size={20} className="text-sand" />
                                            </div>
                                            <h4 className="font-serif text-base text-navy mb-1">{highlight.title}</h4>
                                            <p className="text-xs text-gray-500">{highlight.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Practical Info */}
                        {area.practical && (
                            <section>
                                <AreaPractical {...area.practical} />
                            </section>
                        )}

                        {/* Comparison */}
                        {area.comparison && (
                            <section>
                                <AreaComparison areas={area.comparison} currentArea={area.name} region={regionSlug} />
                            </section>
                        )}

                        {/* Buying Tips */}
                        <div className="p-8 bg-white border border-gray-100 rounded-sm shadow-soft">
                            <h2 className="text-2xl font-serif text-navy mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-sand/20 flex items-center justify-center text-sand">
                                    💡
                                </div>
                                Tips för att köpa i {area.name}
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">{area.content.buyingTips}</p>

                            {area.notSuitableFor && (
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <h4 className="font-bold text-navy text-sm uppercase tracking-wide mb-2">Tänk på detta</h4>
                                    <p className="text-gray-500 text-sm italic">
                                        &quot;{Array.isArray(area.notSuitableFor) ? area.notSuitableFor.join(', ') : area.notSuitableFor}&quot;
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Sticky Map Card */}
                        <div className="bg-white p-4 rounded-sm shadow-soft sticky top-24">
                            <h3 className="font-serif text-lg text-navy mb-4">Plats</h3>
                            <div className="aspect-square bg-gray-100 rounded-sm overflow-hidden mb-4 relative group">
                                <AreaMap
                                    lat={area.coordinates.lat}
                                    lng={area.coordinates.lng}
                                    className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                                    flyTo={activeLocation}
                                />
                            </div>
                            <div className="space-y-3 text-sm text-gray-600">
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span>Region</span>
                                    <span className="font-semibold text-navy">{regionName}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span>Provins</span>
                                    <span className="font-semibold text-navy">{area.province}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span>Avstånd flygplats</span>
                                    <span className="font-semibold text-navy">
                                        {area.quickFacts?.airportDistance
                                            ? `${area.quickFacts.airportDistance.minutes} min`
                                            : "45 min"}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-6">
                                <AnimatedCTA href="/kontakt" text="Boka visningsresa" variant="secondary" className="w-full justify-center" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            {area.faq && area.faq.length > 0 && (
                <section className="py-16 md:py-24 bg-white border-t border-gray-100">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <AreaFAQ items={area.faq} areaName={area.name} />
                    </div>
                </section>
            )}

            {/* Properties Section */}
            <section className="py-16 md:py-24 bg-alabaster">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-navy/10 w-12"></div>
                            <h2 className="text-2xl md:text-3xl font-serif text-navy">
                                Fastigheter i <span className="text-sand italic">{area.name}</span>
                            </h2>
                        </div>
                        <Link
                            href={`/fastigheter?area=${area.slug}`}
                            className="hidden md:inline-flex items-center gap-2 text-sm text-sand hover:text-navy transition-colors"
                        >
                            Se alla fastigheter
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                    {properties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {properties.slice(0, 6).map((property) => (
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

                    {/* Mobile CTA */}
                    <div className="mt-8 text-center md:hidden">
                        <AnimatedCTA href={`/fastigheter?area=${area.slug}`} text={`Se alla bostäder i ${area.name}`} variant="primary" />
                    </div>
                </div>
            </section>

            {/* Related Areas */}
            {relatedAreas.length > 0 && (
                <section className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-px bg-navy/10 w-12"></div>
                            <h2 className="text-2xl md:text-3xl font-serif text-navy">
                                Utforska <span className="text-sand italic">närliggande områden</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedAreas.map((relatedArea) => (
                                <Link
                                    key={relatedArea.slug}
                                    href={`/omraden/${relatedArea.region}/${relatedArea.slug}`}
                                    className="group relative aspect-[4/5] overflow-hidden rounded-sm"
                                >
                                    {relatedArea.image && (
                                        <Image
                                            src={relatedArea.image}
                                            alt={relatedArea.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="text-xl font-serif text-white mb-2 group-hover:text-sand transition-colors">
                                            {relatedArea.name}
                                        </h3>
                                        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-semibold text-white group-hover:text-sand transition-colors">
                                            Utforska
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Final CTA Section */}
            <section className="py-16 md:py-24 bg-navy text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-4xl font-serif mb-6">
                        Intresserad av att bo i <span className="text-sand italic">{area.name}</span>?
                    </h2>
                    <p className="text-white/70 max-w-xl mx-auto mb-8">
                        Vi hjälper dig hitta din drömbostad. Kontakta oss för personlig rådgivning och guidade visningar.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <AnimatedCTA href="/kontakt" text="Kontakta oss" variant="secondary" />
                        <AnimatedCTA href={`/fastigheter?area=${area.slug}`} text="Se fastigheter" variant="outline-white" />
                    </div>
                </div>
            </section>
        </div>
    );
}
