import type { ElementType } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
    Home,
    ChevronRight,
    MapPin,
    Sun,
    Plane,
    Euro,
    Users,
    Mountain,
    Building2,
    Umbrella,
    Thermometer,
    ArrowRight,
    Waves,
    Heart,
    GraduationCap,
    Stethoscope,
    ShoppingBag,
    Clock,
    Globe,
    Plug,
    Phone,
    Car,
    CheckCircle,
    AlertCircle,
    Check,
    AlertTriangle,
    HelpCircle,
    Palmtree,
    Building,
    Warehouse
} from 'lucide-react';
import AreaCard from '@/components/areas/AreaCard';
import AnimatedCTA from '@/components/areas/AnimatedCTA';
import { getAreaDetailsByRegion } from '@/lib/area-data';
import { getRegionBySlug, REGION_SLUGS } from '@/data/regions';

const iconMap: Record<string, ElementType> = {
    sun: Sun,
    plane: Plane,
    euro: Euro,
    users: Users,
    mountain: Mountain,
    building: Building2,
    beach: Umbrella,
    home: MapPin,
    golf: Palmtree
};

const reasonIcons = [Sun, Euro, Users, Plane, Heart, Building2];

function reasonTitle(text: string) {
    const trimmed = text.split(',')[0].trim();
    const words = trimmed.split(' ').slice(0, 3).join(' ');
    return words.length > 0 ? words : 'Fördel';
}

export function generateStaticParams() {
    return REGION_SLUGS.map(region => ({ region }));
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ region: string }>
}): Promise<Metadata> {
    const { region: regionSlug } = await params;
    const region = getRegionBySlug(regionSlug);

    if (!region) {
        return { title: 'Region hittades inte' };
    }

    return {
        title: `${region.name} - Köp bostad i Spanien | Spanienfastigheter`,
        description: `Utforska fastigheter i ${region.name}. ${region.shortDescription} ✓ Svensk support ✓ Personlig rådgivning`,
        keywords: [
            `${region.name.toLowerCase()} bostad`,
            `köpa hus ${region.name.toLowerCase()}`,
            `fastigheter ${region.name.toLowerCase()}`,
            `${region.name.toLowerCase()} lägenhet`,
            `svenskar ${region.name.toLowerCase()}`
        ],
        openGraph: {
            title: `${region.name} - Hitta din bostad i Spanien`,
            description: region.shortDescription,
            images: [{ url: region.heroImage, width: 1200, height: 630 }],
            locale: 'sv_SE',
            type: 'website'
        },
        alternates: {
            canonical: `https://spanienfastigheter.se/omraden/${region.slug}`
        }
    };
}

export default async function RegionPage({
    params
}: {
    params: Promise<{ region: string }>
}) {
    const { region: regionSlug } = await params;
    const region = getRegionBySlug(regionSlug);

    if (!region) {
        notFound();
    }

    const areas = getAreaDetailsByRegion(region.slug);
    const popularAreas = [...areas]
        .sort((a, b) => b.propertyCount - a.propertyCount)
        .slice(0, 8);
    const propertyCount = areas.reduce((sum, area) => sum + area.propertyCount, 0);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Place',
        name: region.name,
        description: region.shortDescription,
        geo: {
            '@type': 'GeoCoordinates',
            latitude: region.coordinates.lat,
            longitude: region.coordinates.lng
        },
        image: region.heroImage,
        containedInPlace: {
            '@type': 'Country',
            name: 'Spain'
        }
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Hem',
                item: 'https://spanienfastigheter.se'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Områden',
                item: 'https://spanienfastigheter.se/omraden'
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: region.name,
                item: `https://spanienfastigheter.se/omraden/${region.slug}`
            }
        ]
    };

    const formatNumber = (value?: number | null) =>
        value === null || value === undefined ? '—' : value.toLocaleString('sv-SE');

    const formatPrice = (value?: number | null) =>
        value === null || value === undefined ? '—' : `€${value.toLocaleString('sv-SE')}`;

    const avgPriceLabel = region.facts.avgPrice && region.facts.avgPrice.includes('/m²')
        ? 'Snittpris/m²'
        : 'Snittpris lägenhet';

    return (
        <div className="min-h-screen bg-alabaster">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Hero Section */}
            <section className="relative bg-navy text-white py-20 md:py-32 overflow-hidden">
                {region.heroImage && (
                    <div className="absolute inset-0">
                        <Image
                            src={region.heroImage}
                            alt={`${region.name} kustlinje, Spanien`}
                            fill
                            priority
                            className="object-cover opacity-35"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/50" />
                    </div>
                )}

                <div className="container mx-auto px-4 relative z-10">
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
                        <span className="text-white">{region.name}</span>
                    </nav>

                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded mb-6">
                            <MapPin size={14} className="text-sand" />
                            <span className="text-xs uppercase tracking-widest">
                                {areas.length} områden • {propertyCount.toLocaleString('sv-SE')} fastigheter
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif mb-4">
                            {region.name}
                        </h1>

                        <p className="text-lg md:text-2xl text-sand italic font-serif mb-4">
                            “{region.tagline}”
                        </p>

                        <p className="text-lg text-white/70 font-light leading-relaxed max-w-2xl">
                            {region.shortDescription}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-10">
                        <AnimatedCTA href={`/fastigheter?region=${region.slug}`} text="Se alla fastigheter" variant="primary" />
                        <AnimatedCTA href="/kontakt" text="Boka rådgivning" variant="outline-white" />
                    </div>
                </div>
            </section>

            {/* Highlights */}
            <section className="bg-white border-b border-gray-100 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                        {region.highlights.map((highlight, index) => {
                            const Icon = iconMap[highlight.icon] || MapPin;
                            return (
                                <div key={index} className="flex items-center gap-3 text-gray-700">
                                    <span className="text-sand">
                                        <Icon size={18} />
                                    </span>
                                    <span className="text-sm md:text-base">{highlight.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-5 gap-12 items-center">
                        <div className="lg:col-span-3">
                            <span className="text-sand text-sm font-medium uppercase tracking-wider mb-3 block">
                                Om regionen
                            </span>
                            <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">
                                Om <span className="text-sand italic">{region.name}</span>
                            </h2>

                            <div className="prose prose-lg text-gray-600 mb-8">
                                <p className="leading-relaxed">{region.overview}</p>
                            </div>

                            <Link
                                href={`/till-salu?region=${region.slug}`}
                                className="inline-flex items-center gap-2 text-navy font-medium hover:text-sand transition-colors"
                            >
                                Utforska bostäder i {region.name}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="bg-alabaster rounded-lg p-6 md:p-8 border border-sand/10 shadow-soft">
                                <h3 className="text-lg font-semibold text-navy mb-6">
                                    {region.name} i korthet
                                </h3>

                                <div className="space-y-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-sand/10 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-5 h-5 text-sand" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Provins</div>
                                            <div className="font-medium text-navy">{region.province}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-sand/10 flex items-center justify-center flex-shrink-0">
                                            <Waves className="w-5 h-5 text-sand" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Kustlinje</div>
                                            <div className="font-medium text-navy">{region.coastlineKm} km</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-sand/10 flex items-center justify-center flex-shrink-0">
                                            <Sun className="w-5 h-5 text-sand" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Klimat</div>
                                            <div className="font-medium text-navy">{region.climateLabel}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-sand/10 flex items-center justify-center flex-shrink-0">
                                            <Palmtree className="w-5 h-5 text-sand" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Känt för</div>
                                            <div className="font-medium text-navy">{region.knownFor}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Facts */}
            <section className="py-20 bg-navy relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sand rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 max-w-6xl relative">
                    <h2 className="text-2xl md:text-3xl font-serif text-white text-center mb-12">
                        {region.name} <span className="text-sand">i siffror</span>
                    </h2>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { value: region.facts.sunDays ? `${formatNumber(region.facts.sunDays)}+` : '—', label: 'Soldagar per år', icon: Sun },
                            { value: region.facts.avgTemp ? `${formatNumber(region.facts.avgTemp)}°C` : '—', label: 'Medeltemperatur', icon: Thermometer },
                            { value: region.facts.flightTime || '—', label: 'Från Stockholm', icon: Plane },
                            { value: region.facts.avgPrice ? `€${region.facts.avgPrice}` : '—', label: avgPriceLabel, icon: Euro }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-md rounded-lg p-6 md:p-8 border border-white/10 text-center hover:bg-white/15 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full bg-sand/20 flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="w-6 h-6 text-sand" />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-white/70 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Swedes */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-sand text-sm font-medium uppercase tracking-wider mb-3 block">
                            Fördelarna
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif text-navy">
                            Varför svenskar väljer <span className="text-sand italic">{region.name}</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                            {region.whySwedes}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {region.swedesReasons.map((reason, index) => {
                            const Icon = reasonIcons[index % reasonIcons.length];
                            return (
                                <div
                                    key={index}
                                    className="group p-6 rounded-lg bg-white border border-gray-100 hover:border-sand/30 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="w-14 h-14 rounded-lg bg-navy/5 group-hover:bg-sand/10 flex items-center justify-center mb-5 transition-colors">
                                        <Icon className="w-7 h-7 text-navy group-hover:text-sand transition-colors" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-navy mb-2">
                                        {reasonTitle(reason)}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {reason}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-12 grid md:grid-cols-2 gap-8 items-center">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-soft">
                            <Image
                                src={region.lifestyleImage}
                                alt={`Livsstil i ${region.name}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="bg-alabaster rounded-lg p-8 border border-sand/10">
                            <h3 className="text-xl font-semibold text-navy mb-4">
                                Svensk trygghet på plats
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Vi hjälper dig hela vägen - från visning till nyckel. Med svensk rådgivning och lokal expertis blir köpet tryggt och effektivt.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Market */}
            <section className="py-20 md:py-28 bg-alabaster">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-sand text-sm font-medium uppercase tracking-wider mb-3 block">
                            Prisöversikt
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif text-navy">
                            Fastighetsmarknaden i <span className="text-sand italic">{region.name}</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                icon: Building2,
                                title: 'Lägenheter',
                                min: region.prices.apartmentMin,
                                max: region.prices.apartmentMax,
                                description: 'Från studios till lyxiga penthouses med havsutsikt.',
                                link: `/till-salu?region=${region.slug}&type=apartment`
                            },
                            {
                                icon: Home,
                                title: 'Villor',
                                min: region.prices.villaMin,
                                max: region.prices.villaMax,
                                description: 'Fristående hus med pool och privat trädgård.',
                                link: `/till-salu?region=${region.slug}&type=villa`
                            },
                            {
                                icon: Warehouse,
                                title: 'Radhus',
                                min: region.prices.townhouseMin,
                                max: region.prices.townhouseMax,
                                description: 'Perfekt för familjer som söker mer utrymme.',
                                link: `/till-salu?region=${region.slug}&type=townhouse`
                            }
                        ].map((type, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-lg p-8 shadow-sm hover:shadow-xl transition-all duration-300 border-b-4 border-transparent hover:border-sand"
                            >
                                <div className="w-16 h-16 rounded-lg bg-navy/5 flex items-center justify-center mb-6">
                                    <type.icon className="w-8 h-8 text-navy" />
                                </div>

                                <h3 className="text-xl font-semibold text-navy mb-4">{type.title}</h3>

                                <div className="mb-4">
                                    <span className="text-3xl font-bold text-sand">{formatPrice(type.min)}</span>
                                    <span className="text-gray-400 mx-2">–</span>
                                    <span className="text-3xl font-bold text-sand">{formatPrice(type.max)}</span>
                                </div>

                                <p className="text-gray-600 mb-6 leading-relaxed">{type.description}</p>

                                <Link
                                    href={type.link}
                                    className="inline-flex items-center gap-2 text-navy font-medium group-hover:text-sand transition-colors"
                                >
                                    Se {type.title.toLowerCase()}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="prose prose-lg text-gray-600 max-w-none mt-10">
                        <p>{region.sections.market}</p>
                    </div>

                    <div className="mt-12 text-center text-gray-500 max-w-2xl mx-auto">
                        Priserna är vägledande och varierar beroende på läge, skick och faciliteter. Kontakta oss för aktuella objekt.
                    </div>
                </div>
            </section>

            {/* Popular Areas */}
            <section className="py-16 md:py-24 bg-alabaster">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                            <div className="h-px bg-navy/10 w-12" />
                            <h2 className="text-2xl md:text-3xl font-serif text-navy">
                                Populära områden i <span className="text-sand italic">{region.name}</span>
                            </h2>
                        </div>
                        <Link
                            href="/omraden"
                            className="hidden md:inline-flex items-center gap-2 text-sm text-gray-500 hover:text-navy transition-colors"
                        >
                            ← Alla regioner
                        </Link>
                    </div>

                    {popularAreas.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {popularAreas.map((area) => (
                                <AreaCard key={area.slug} area={area} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-lg shadow-soft">
                            <p className="text-gray-500">Inga områden hittades i denna region.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Climate and Lifestyle */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                        <div className="bg-gradient-to-br from-navy to-[#2d4a7c] rounded-lg p-8 md:p-10 text-white">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                                    <Sun className="w-6 h-6 text-sand" />
                                </div>
                                <h3 className="text-2xl font-serif">Klimat och väder</h3>
                            </div>

                            <div className="space-y-5">
                                {[
                                    { icon: Sun, label: 'Soldagar per år', value: region.facts.sunDays ? `${formatNumber(region.facts.sunDays)}+` : '—' },
                                    { icon: Thermometer, label: 'Medeltemperatur', value: region.facts.avgTemp ? `${formatNumber(region.facts.avgTemp)}°C` : '—' },
                                    { icon: Umbrella, label: 'Bästa tid att besöka', value: 'Apr - Okt' },
                                    { icon: Waves, label: 'Kustklimat', value: region.climateLabel }
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-5 h-5 text-sand" />
                                            <span className="text-white/80">{item.label}</span>
                                        </div>
                                        <span className="font-semibold">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-8 md:p-10 border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-lg bg-sand/10 flex items-center justify-center">
                                    <Heart className="w-6 h-6 text-sand" />
                                </div>
                                <h3 className="text-2xl font-serif text-navy">Livsstil och faciliteter</h3>
                            </div>

                            <div className="space-y-5">
                                {[
                                    { icon: Palmtree, label: 'Golfbanor', value: '20+' },
                                    { icon: Umbrella, label: 'Blå Flagg-stränder', value: '50+' },
                                    { icon: Stethoscope, label: 'Internationell sjukvård', value: 'Tillgänglig' },
                                    { icon: GraduationCap, label: 'Internationella skolor', value: 'Flera alternativ' },
                                    { icon: ShoppingBag, label: 'Shopping & service', value: 'Brett utbud' }
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-5 h-5 text-navy" />
                                            <span className="text-gray-600">{item.label}</span>
                                        </div>
                                        <span className="font-semibold text-navy">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 mt-12">
                        <div className="text-gray-600 leading-relaxed">{region.sections.climate}</div>
                        <div className="text-gray-600 leading-relaxed">{region.sections.lifestyle}</div>
                    </div>
                </div>
            </section>

            {/* Transport */}
            <section className="py-20 md:py-28 bg-alabaster">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-sand text-sm font-medium uppercase tracking-wider mb-3 block">
                            Transport
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif text-navy">
                            Resa till <span className="text-sand italic">{region.name}</span>
                        </h2>
                    </div>

                    {region.airports.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {region.airports.map((airport, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                                >
                                    <div className="bg-navy px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                                <Plane className="w-5 h-5 text-sand" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white">{airport.name}</h3>
                                                <span className="text-white/60 text-sm">{airport.code}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <MapPin className="w-5 h-5 text-sand" />
                                            <span>{airport.distance} från {region.name}</span>
                                        </div>

                                        <div className="flex items-center gap-3 text-gray-600">
                                            <Clock className="w-5 h-5 text-sand" />
                                            <span>{airport.flightTime} från Stockholm</span>
                                        </div>

                                        <div className="flex items-center gap-3 text-gray-600">
                                            <Building className="w-5 h-5 text-sand" />
                                            <span>{airport.airlines.join(', ')}</span>
                                        </div>
                                    </div>

                                    <div className="px-6 pb-6">
                                        <a
                                            href={`https://www.google.com/flights?q=flights+to+${airport.code}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full py-3 text-center border border-navy text-navy rounded-md font-medium hover:bg-navy hover:text-white transition-colors"
                                        >
                                            Sök flyg
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-white rounded-lg shadow-soft">
                            <p className="text-gray-500">Transportinformation uppdateras efter research.</p>
                        </div>
                    )}

                    <div className="prose prose-lg text-gray-600 max-w-none mt-10">
                        <p>{region.sections.transport}</p>
                    </div>
                </div>
            </section>

            {/* Pros and Cons */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-emerald-800">Fördelar</h3>
                            </div>

                            <ul className="space-y-4">
                                {region.sections.pros.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-emerald-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5 text-amber-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-amber-800">Att tänka på</h3>
                            </div>

                            <ul className="space-y-4">
                                {region.sections.cons.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-amber-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Practical Info */}
            <section className="py-20 md:py-28 bg-navy">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-serif text-white">
                            Praktisk information
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { icon: Clock, label: 'Tidszon', value: 'CET (UTC+1)', subtext: 'Samma som Sverige' },
                            { icon: Globe, label: 'Språk', value: 'Spanska', subtext: 'Engelska fungerar' },
                            { icon: Euro, label: 'Valuta', value: 'Euro (€)', subtext: 'Kort accepteras' },
                            { icon: Plug, label: 'Elkontakt', value: 'Typ C/F', subtext: '230V, 50Hz' },
                            { icon: Phone, label: 'Riktnummer', value: '+34', subtext: 'Mobilnät som hemma' },
                            { icon: Car, label: 'Körkort', value: 'Svenskt gäller', subtext: 'Högertrafik' }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white/5 backdrop-blur-sm rounded-lg p-5 text-center border border-white/10"
                            >
                                <div className="w-10 h-10 rounded-full bg-sand/20 flex items-center justify-center mx-auto mb-3">
                                    <item.icon className="w-5 h-5 text-sand" />
                                </div>
                                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">{item.label}</div>
                                <div className="text-white font-semibold mb-1">{item.value}</div>
                                <div className="text-white/50 text-xs">{item.subtext}</div>
                            </div>
                        ))}
                    </div>

                    <p className="text-white/70 leading-relaxed text-center max-w-3xl mx-auto mt-10">
                        {region.sections.practical}
                    </p>
                </div>
            </section>

            {/* FAQ */}
            {region.faqs.length > 0 && (
                <section className="py-20 md:py-28 bg-white">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify({
                                    '@context': 'https://schema.org',
                                    '@type': 'FAQPage',
                                    mainEntity: region.faqs.map((faq) => ({
                                        '@type': 'Question',
                                        name: faq.question,
                                        acceptedAnswer: {
                                            '@type': 'Answer',
                                            text: faq.answer
                                        }
                                    }))
                                })
                            }}
                        />
                        <div className="text-center mb-16">
                            <div className="w-16 h-16 rounded-lg bg-sand/10 flex items-center justify-center mx-auto mb-6">
                                <HelpCircle className="w-8 h-8 text-sand" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif text-navy">
                                Vanliga frågor om <span className="text-sand italic">{region.name}</span>
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {region.faqs.map((faq, index) => (
                                <details
                                    key={index}
                                    className="group rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-all"
                                >
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none marker:content-none">
                                        <span className="font-medium text-gray-700 pr-4 group-open:text-navy">
                                            {faq.question}
                                        </span>
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors bg-gray-100 text-gray-400 group-open:bg-sand group-open:text-white">
                                            <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                                        </div>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-16 md:py-24 bg-navy text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-4xl font-serif mb-6">
                        Hitta din drömbostad i <span className="text-sand italic">{region.name}</span>
                    </h2>
                    <p className="text-white/70 max-w-xl mx-auto mb-8">
                        Vi har {propertyCount.toLocaleString('sv-SE')} fastigheter i {region.name}. Kontakta oss för personlig rådgivning.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <AnimatedCTA href={`/fastigheter?region=${region.slug}`} text="Se alla fastigheter" variant="secondary" />
                        <AnimatedCTA href="/kontakt" text="Kontakta oss" variant="outline-white" />
                    </div>
                </div>
            </section>
        </div>
    );
}
