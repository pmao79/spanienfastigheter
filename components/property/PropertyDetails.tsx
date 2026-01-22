'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    MapPin,
    Bed,
    Bath,
    Expand,
    Heart,
    Share2,
    ArrowLeft,
    Check,
    Sun,
    Calendar,
    Euro,
    Home,
    Plane,
    Trees,
    Mail,
    FileText,
    Waves,
    Car,
    Wind,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    ChevronDown,
    ArrowRight,
    Star,
    Zap,
    School,
    ShoppingBag,
    Scan,
} from 'lucide-react';
import { Property } from '@/types/property';
import ImageLightbox from './ImageLightbox';
import FavoriteButton from '@/components/ui/FavoriteButton';
import PropertyMap from '@/components/map/PropertyMap';
import SearchServiceModal from '@/components/modals/SearchServiceModal';
import CostCalculator from '@/app/[locale]/guide/kopa-salja-spanien-2025/CostCalculator';
import BookingModal from '@/components/modals/BookingModal';
import ContactAgentModal from '@/components/modals/ContactAgentModal';
import dynamic from 'next/dynamic';
import PropertyProspectus from './PropertyProspectus';
import { usePropertyDistances } from '@/hooks/usePropertyDistances';
interface PropertyDetailsProps {
    property: Property;
}

// Helper to select icon based on feature text
const getFeatureIcon = (text: string, size: number = 20, className: string = '') => {
    const t = text.toLowerCase();
    const props = { size, className };

    if (t.includes('pool') || t.includes('jacuzzi'))
        return <Waves {...props} />;
    if (t.includes('garage') || t.includes('park')) return <Car {...props} />;
    if (t.includes('ac') || t.includes('klimat') || t.includes('air'))
        return <Wind {...props} />;
    if (t.includes('sol') || t.includes('terrass'))
        return <Sun {...props} />;
    return <Check {...props} />;
};

const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => (
            <div className="bg-charcoal text-white p-6 flex justify-between items-center opacity-70">
                <div>
                    <span className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">
                        Dokument
                    </span>
                    <span className="font-serif text-lg">
                        Laddar PDF-verktyg...
                    </span>
                </div>
            </div>
        ),
    }
);

const ClientOnlyPDFDownload = ({ property }: { property: Property }) => {
    // Create a human-readable filename from property type and location
    const sanitizedFileName = `${property.type} i ${property.town}`
        .replace(/[^a-zA-ZåäöÅÄÖ0-9\s]/g, '')
        .replace(/\s+/g, '_');

    return (
        <PDFDownloadLink
            document={<PropertyProspectus property={property} />}
            fileName={`${sanitizedFileName}.pdf`}
            className="block"
        >
            {/* Using 'any' for the render prop because typings with dynamic imports can be tricky */}
            {({ blob, url, loading, error }: any) => (
                <div className="bg-charcoal text-white p-6 flex justify-between items-center cursor-pointer hover:bg-navy transition-colors group">
                    <div>
                        <span className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">
                            Dokument
                        </span>
                        <span className="font-serif text-lg group-hover:text-sand transition-colors">
                            {loading
                                ? 'Skapar prospekt...'
                                : error
                                    ? 'Fel vid skapande'
                                    : 'Ladda ner prospekt'}
                        </span>
                    </div>
                    <FileText
                        size={24}
                        className={`text-sand/50 group-hover:text-sand transition-colors transform duration-300 ${loading ? 'animate-pulse' : 'group-hover:-translate-y-1'
                            }`}
                    />
                </div>
            )}
        </PDFDownloadLink>
    );
};

export default function PropertyDetails({ property }: PropertyDetailsProps) {
    const [activeImage, setActiveImage] = useState(0);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const { distances: googleDistances, isLoaded: googleLoaded, elevation } = usePropertyDistances(
        property.coordinates?.lat || 0,
        property.coordinates?.lng || 0,
        property.locationDetail || property.town // Using locationDetail as address proxy
    );

    const galleryImages =
        property.images.length > 0
            ? property.images
            : ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070'];

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveImage((prev) => (prev + 1) % galleryImages.length);
    };

    const handlePrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveImage(
            (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
        );
    };

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    };

    // Build display features from our structured data
    const displayFeatures: string[] = [];
    if (property.features.pool === 'private') displayFeatures.push('Privat pool');
    if (property.features.pool === 'communal')
        displayFeatures.push('Gemensam pool');
    if (property.features.parking) displayFeatures.push('Parkering');
    if (property.features.elevator) displayFeatures.push('Hiss');
    if (property.features.garden) displayFeatures.push('Trädgård');
    if (property.features.gated) displayFeatures.push('Gated community');
    if (property.features.terrace) displayFeatures.push('Terrass');
    if (property.features.airConditioning) displayFeatures.push('AC');
    if (property.features.heating) displayFeatures.push('Uppvärmning');
    if (property.features.storage) displayFeatures.push('Förråd');

    return (
        <div className="bg-alabaster min-h-screen pb-32 animate-fade-in pt-[69px] md:pt-[73px]">
            <SearchServiceModal
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
            />

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                property={property}
            />

            <ContactAgentModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                property={property}
            />

            <ImageLightbox
                images={galleryImages}
                initialIndex={lightboxIndex}
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
            />

            {/* 1. Header Navigation */}
            <div className="bg-white border-b border-gray-100 sticky top-[69px] md:top-[73px] z-40">
                <div className="max-w-[1400px] mx-auto px-4 md:px-12 h-16 md:h-20 flex items-center justify-between">
                    <Link
                        href="/fastigheter"
                        className="flex items-center gap-2 text-sm uppercase tracking-widest font-semibold hover:text-navy transition-colors text-gray-500"
                    >
                        <ArrowLeft size={16} />
                        <span className="hidden md:inline">Tillbaka till sök</span>
                        <span className="md:hidden">Tillbaka</span>
                    </Link>

                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 text-sm font-medium hover:text-navy transition-colors">
                            <Share2 size={18} />
                            <span className="hidden md:inline">Dela</span>
                        </button>
                        <button className="flex items-center gap-2 text-sm font-medium hover:text-red-500 transition-colors">
                            <Heart size={18} />
                            <span className="hidden md:inline">Spara</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. Editorial Gallery */}
            <div className="max-w-[1400px] mx-auto px-0 md:px-12 mt-0 md:mt-8">
                {/* Mobile Gallery Slider */}
                <div className="md:hidden aspect-[4/3] relative group bg-gray-100 cursor-pointer" onClick={() => openLightbox(activeImage)}>
                    <Image
                        src={galleryImages[activeImage]}
                        alt={`${property.title} - Bild ${activeImage + 1}`}
                        fill
                        className="object-cover"
                        priority
                    />

                    <button
                        onClick={(e) => { e.stopPropagation(); handlePrevImage(e); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2.5 rounded-full text-navy hover:bg-white shadow-sm z-10"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); handleNextImage(e); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2.5 rounded-full text-navy hover:bg-white shadow-sm z-10"
                    >
                        <ChevronRight size={20} />
                    </button>

                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium tracking-widest px-3 py-1.5 rounded-full">
                        {activeImage + 1} / {galleryImages.length}
                    </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[600px] rounded-lg overflow-hidden">
                    <div
                        className="col-span-2 row-span-2 relative group cursor-pointer"
                        onClick={() => openLightbox(0)}
                    >
                        <Image
                            src={galleryImages[0]}
                            alt="Main"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                    {[1, 2, 3, 4].map((idx) => (
                        <div
                            key={idx}
                            className="col-span-1 row-span-1 relative group cursor-pointer"
                            onClick={() => openLightbox(idx)}
                        >
                            <Image
                                src={galleryImages[idx] || galleryImages[0]}
                                alt={`Detail ${idx}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

                            {idx === 4 && galleryImages.length > 5 && (
                                <div className="absolute inset-0 bg-navy/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white font-serif italic text-lg">
                                        Visa alla bilder
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Main Content Container */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-8 md:mt-12">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* LEFT COLUMN (Content) */}
                    <div className="flex-1">
                        {/* Title & Price Header */}
                        <div className="border-b border-gray-200 pb-8 mb-8">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {property.isNewBuild && (
                                    <span className="px-3 py-1 bg-navy/5 text-navy text-[10px] uppercase tracking-widest font-bold rounded-sm">
                                        Nyproduktion
                                    </span>
                                )}
                                <span className="px-3 py-1 bg-sand/20 text-charcoal text-[10px] uppercase tracking-widest font-bold rounded-sm flex items-center gap-1">
                                    <MapPin size={10} />
                                    {property.region === 'costa-del-sol'
                                        ? 'Costa del Sol'
                                        : 'Costa Blanca'}
                                </span>
                                <FavoriteButton
                                    propertyId={property.id}
                                    variant="outline"
                                    size="sm"
                                />
                                <span className="px-3 py-1 bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest font-bold rounded-sm border border-gray-100">
                                    Ref: {property.ref}
                                </span>
                                {property.energyRating && (
                                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] uppercase tracking-widest font-bold rounded-sm border border-green-100 flex items-center gap-1">
                                        <Zap size={10} />
                                        Energiklass: {property.energyRating}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-serif text-navy mb-4 leading-tight">
                                {property.type} i {property.town}
                            </h1>
                            <p className="text-lg text-gray-500 font-light flex items-center gap-2 mb-6">
                                <MapPin size={18} className="text-sand" />
                                {property.locationDetail || property.town}, {property.province}
                            </p>

                            <div className="flex items-end gap-4">
                                <span className="text-3xl md:text-4xl font-serif text-navy">
                                    {property.price.toLocaleString('sv-SE')} €
                                </span>
                                <span className="text-sm text-gray-400 mb-2">
                                    ca {Math.round(property.price * 11.2).toLocaleString('sv-SE')}{' '}
                                    SEK
                                </span>
                            </div>
                        </div>

                        {/* Key Specs Bar */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            <div className="p-4 bg-white border border-gray-100 rounded-sm hover:shadow-soft transition-shadow">
                                <div className="flex items-center gap-3 mb-1">
                                    <Bed size={20} className="text-sand" />
                                    <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                                        Sovrum
                                    </span>
                                </div>
                                <span className="text-xl font-serif text-navy">
                                    {property.beds} st
                                </span>
                            </div>
                            <div className="p-4 bg-white border border-gray-100 rounded-sm hover:shadow-soft transition-shadow">
                                <div className="flex items-center gap-3 mb-1">
                                    <Bath size={20} className="text-sand" />
                                    <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                                        Badrum
                                    </span>
                                </div>
                                <span className="text-xl font-serif text-navy">
                                    {property.baths} st
                                </span>
                            </div>
                            <div className="p-4 bg-white border border-gray-100 rounded-sm hover:shadow-soft transition-shadow">
                                <div className="flex items-center gap-3 mb-1">
                                    <Expand size={20} className="text-sand" />
                                    <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                                        Boyta
                                    </span>
                                </div>
                                <span className="text-xl font-serif text-navy">
                                    {property.builtArea} m²
                                </span>
                            </div>
                            {property.terraceArea && (
                                <div className="p-4 bg-white border border-gray-100 rounded-sm hover:shadow-soft transition-shadow">
                                    <div className="flex items-center gap-3 mb-1">
                                        <Sun size={20} className="text-sand" />
                                        <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                                            Terrass
                                        </span>
                                    </div>
                                    <span className="text-xl font-serif text-navy">
                                        {property.terraceArea} m²
                                    </span>
                                </div>
                            )}
                            {property.plotArea && (
                                <div className="p-4 bg-white border border-gray-100 rounded-sm hover:shadow-soft transition-shadow">
                                    <div className="flex items-center gap-3 mb-1">
                                        <Scan size={20} className="text-sand" />
                                        <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                                            Tomt
                                        </span>
                                    </div>
                                    <span className="text-xl font-serif text-navy">
                                        {property.plotArea} m²
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-12 relative">
                            <h3 className="text-xl font-serif text-navy mb-6">Om bostaden</h3>

                            <div
                                className={`prose prose-lg text-gray-600 font-light leading-relaxed border-l-2 border-sand pl-6 transition-all duration-700 ease-in-out relative overflow-hidden ${isExpanded ? 'max-h-[2000px]' : 'max-h-[300px]'
                                    }`}
                            >
                                {(
                                    property.descriptions.sv ||
                                    property.descriptions.en ||
                                    'Ingen beskrivning tillgänglig.'
                                )
                                    .split('\n\n')
                                    .map((paragraph, idx) => (
                                        <p key={idx} className="mb-4 last:mb-0 text-gray-600">
                                            {paragraph}
                                        </p>
                                    ))}

                                {/* Gradient Fade Overlay */}
                                {!isExpanded && (
                                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-alabaster via-alabaster/80 to-transparent pointer-events-none"></div>
                                )}
                            </div>

                            {/* Premium Read More Button */}
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="mt-4 group flex items-center gap-2 text-navy text-sm font-bold uppercase tracking-widest hover:text-sand transition-colors"
                            >
                                {isExpanded ? (
                                    <>
                                        Visa mindre <ChevronUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
                                    </>
                                ) : (
                                    <>
                                        Läs hela beskrivningen <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Features List - "Floating Premium Cards" Redesign (Compact) */}
                        <div className="mb-16">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-px bg-navy/10 w-12"></div>
                                <h3 className="text-2xl md:text-3xl font-serif text-navy tracking-wide">
                                    Egenskaper <span className="text-sand font-serif italic">&</span> Faciliteter
                                </h3>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                                {displayFeatures.map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative p-3 rounded-xl bg-navy border border-navy/5 hover:border-sand/30 hover:shadow-lg hover:shadow-navy/20 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center text-center gap-2 overflow-hidden"
                                    >
                                        {/* Subtle internal gradient/glow on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-sand group-hover:scale-110 group-hover:bg-sand group-hover:text-navy transition-all duration-300 shadow-inner shadow-black/20">
                                            {getFeatureIcon(feature, 18, "stroke-[1.5]")}
                                        </div>
                                        <span className="text-alabaster/90 text-[10px] md:text-xs font-medium tracking-wide relative z-10 group-hover:text-white transition-colors leading-tight">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Location / Distances */}
                        <div className="mb-12">
                            <h3 className="text-xl font-serif text-navy mb-6">
                                Avstånd & Område
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 text-center gap-3 hover:border-sand hover:shadow-soft transition-all duration-300 group">
                                    <Waves
                                        size={24}
                                        className="text-gray-300 group-hover:text-sage transition-colors"
                                        strokeWidth={1.5}
                                    />
                                    <span className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-navy">
                                        Strand
                                    </span>
                                    <span className="font-serif text-navy text-lg">
                                        {googleDistances.beach || (property.distances.beach
                                            ? `${property.distances.beach}m`
                                            : 'N/A')}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 text-center gap-3 hover:border-sand hover:shadow-soft transition-all duration-300 group">
                                    <Plane
                                        size={24}
                                        className="text-gray-300 group-hover:text-sage transition-colors"
                                        strokeWidth={1.5}
                                    />
                                    <span className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-navy">
                                        Flygplats
                                    </span>
                                    <span className="font-serif text-navy text-lg">
                                        {googleDistances.airport || '45 min'}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 text-center gap-3 hover:border-sand hover:shadow-soft transition-all duration-300 group">
                                    <Trees
                                        size={24}
                                        className="text-gray-300 group-hover:text-sage transition-colors"
                                        strokeWidth={1.5}
                                    />
                                    <span className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-navy">
                                        Golf
                                    </span>
                                    <span className="font-serif text-navy text-lg">
                                        {googleDistances.golf || (property.distances.golf ? 'Nära' : 'N/A')}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 text-center gap-3 hover:border-sand hover:shadow-soft transition-all duration-300 group">
                                    <Home
                                        size={24}
                                        className="text-gray-300 group-hover:text-sage transition-colors"
                                        strokeWidth={1.5}
                                    />
                                    <span className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-navy">
                                        Centrum
                                    </span>
                                    <span className="font-serif text-navy text-lg">
                                        {googleDistances.shopping ? 'Nära' : '5 min'}
                                    </span>
                                </div>
                                {(property.distances.schools || googleDistances.shopping) && (
                                    <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 text-center gap-3 hover:border-sand hover:shadow-soft transition-all duration-300 group">
                                        <School
                                            size={24}
                                            className="text-gray-300 group-hover:text-sage transition-colors"
                                            strokeWidth={1.5}
                                        />
                                        <span className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-navy">
                                            Skolor
                                        </span>
                                        <span className="font-serif text-navy text-lg">Nära</span>
                                    </div>
                                )}
                                {(property.distances.commercialCenter || googleDistances.shopping) && (
                                    <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 text-center gap-3 hover:border-sand hover:shadow-soft transition-all duration-300 group">
                                        <ShoppingBag
                                            size={24}
                                            className="text-gray-300 group-hover:text-sage transition-colors"
                                            strokeWidth={1.5}
                                        />
                                        <span className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-navy">
                                            Shopping
                                        </span>
                                        <span className="font-serif text-navy text-lg">
                                            {googleDistances.shopping || 'Nära'}
                                        </span>
                                    </div>
                                )}
                                <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 text-center gap-3 hover:border-sand hover:shadow-soft transition-all duration-300 group">
                                    <Expand
                                        size={24}
                                        className="text-gray-300 group-hover:text-sage transition-colors"
                                        strokeWidth={1.5}
                                    />
                                    <span className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-navy">
                                        Höjd
                                    </span>
                                    <span className="font-serif text-navy text-lg">
                                        {elevation || 'Hämtar...'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Map Section */}
                        {(property.coordinates?.lat && property.coordinates?.lng) && (
                            <div className="mt-8 rounded-sm overflow-hidden border border-gray-100 shadow-sm relative z-0">
                                <PropertyMap
                                    latitude={property.coordinates.lat}
                                    longitude={property.coordinates.lng}
                                    className="w-full h-[400px]"
                                />
                            </div>
                        )}


                        {/* Concierge CTA */}
                        <div
                            className="mb-12 relative rounded-sm overflow-hidden group cursor-pointer"
                            onClick={() => setIsSearchModalOpen(true)}
                        >
                            <Image
                                src="/images/fastigheter-spanien-bg.png"
                                alt="Search service"
                                width={1200}
                                height={400}
                                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/50 transition-colors"></div>

                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
                                <span className="text-sand text-[10px] uppercase tracking-[0.25em] font-bold mb-4">
                                    Personlig Söktjänst
                                </span>
                                <h3 className="text-3xl md:text-4xl font-serif text-white mb-6">
                                    Låt oss hitta din dröm.
                                </h3>
                                <p className="text-white/80 max-w-lg mb-8 font-light leading-relaxed hidden md:block">
                                    Som medlem i vårt spekulantregister får du tillgång till
                                    bostäder innan de når den öppna marknaden. Berätta vad du
                                    söker, så gör vi jobbet.
                                </p>
                                <button className="bg-white text-navy px-8 py-4 uppercase tracking-[0.15em] text-xs font-bold hover:bg-sand hover:text-white transition-all duration-300 flex items-center gap-3 shadow-lg">
                                    Ange dina önskemål <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN (Sticky Sidebar) */}
                    <div className="lg:w-96 flex-shrink-0">
                        <div className="sticky top-32 space-y-6">
                            {/* Agent Card - Premium Redesign */}
                            <div className="bg-white p-8 border border-gray-100 shadow-xl shadow-navy/5 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-navy via-sand to-navy"></div>

                                <div className="flex items-center gap-5 mb-8">
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
                                            <Image
                                                src="/images/marcus-ohlander.png"
                                                alt="Marcus Ohlander"
                                                width={80}
                                                height={80}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-sand text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                            SV/EN
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-xl text-navy leading-tight mb-1">
                                            Marcus Ohlander
                                        </h4>
                                        <p className="text-sm text-sand font-medium italic">
                                            Mäklare
                                        </p>
                                    </div>
                                </div>

                                <div className="relative mb-8">
                                    <span className="text-6xl text-greige/20 absolute -top-4 -left-2 font-serif leading-none">
                                        &quot;
                                    </span>
                                    <p className="text-gray-600 italic leading-relaxed text-sm relative z-10 pl-4 border-l-2 border-sand/30">
                                        {/* Dynamic Quote Logic: Use specific agent quote if exists, otherwise first 140 chars of description */}
                                        {(property as any).agentQuote ||
                                            (property.descriptions.sv ? property.descriptions.sv.substring(0, 140).trim() + "..." :
                                                "Kontakta mig för en personlig visning av detta unika objekt.")}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => setIsBookingModalOpen(true)}
                                        className="w-full bg-navy text-white h-12 uppercase tracking-[0.2em] text-xs font-bold hover:bg-charcoal transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group/btn"
                                    >
                                        <Calendar size={16} className="group-hover/btn:text-sand transition-colors" />
                                        Boka Visning
                                    </button>
                                    <button
                                        onClick={() => setIsContactModalOpen(true)}
                                        className="w-full bg-white border border-navy text-navy h-12 uppercase tracking-[0.2em] text-xs font-bold hover:bg-navy hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
                                    >
                                        <Mail size={16} />
                                        Kontakta mig
                                    </button>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                                    <a
                                        href="tel:+46708625253"
                                        className="font-serif text-lg text-navy hover:text-sand transition-colors border-b border-transparent hover:border-sand"
                                    >
                                        +46 0708 62 52 53
                                    </a>
                                </div>
                            </div>

                            {/* PDF Download - Dynamic Generation */}
                            {/* We use a client-side only wrapper for PDFDownloadLink to avoid hydration mismatch/SSR issues */}
                            <ClientOnlyPDFDownload property={property} />

                            {/* Cost Calculator */}
                            <div className="mt-6">
                                <CostCalculator
                                    initialPrice={property.price}
                                    fixedRegion={property.region === 'costa-blanca' ? 'valencia' : 'andalusia'}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Sticky Action Bar */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                    <button
                        onClick={() => setIsContactModalOpen(true)}
                        className="flex-1 bg-white border border-navy text-navy py-3 uppercase tracking-widest text-xs font-bold rounded-sm flex items-center justify-center gap-2"
                    >
                        Kontakta
                    </button>
                    <button
                        onClick={() => setIsBookingModalOpen(true)}
                        className="flex-[2] bg-navy text-white py-3 uppercase tracking-widest text-xs font-bold rounded-sm flex items-center justify-center gap-2"
                    >
                        Boka Visning
                    </button>
                </div>
            </div>
        </div>
    );
}
