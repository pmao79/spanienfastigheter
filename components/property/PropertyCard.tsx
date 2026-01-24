import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Expand, MapPin, Sun, Car, Zap, Waves, Home } from 'lucide-react';
import { Property } from '@/types/property';
import FavoriteButton from '@/components/ui/FavoriteButton';
import BitcoinPrice from './BitcoinPrice';
import { translatePropertyType } from '@/lib/property-utils';

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const getBadgeStyle = (tag: string) => {
        if (tag === 'Exklusiv') return 'bg-navy text-white border border-navy';
        if (tag === 'Nyproduktion')
            return 'bg-alabaster text-navy border border-gray-200';
        if (tag === 'Turistlicens') return 'bg-sage text-white';
        return 'bg-white/95 text-charcoal';
    };

    // Calculate dynamic highlight
    const getDynamicHighlight = () => {
        const { features, terraceArea, energyRating } = property;

        // 1. Terrace Area (Priority)
        if (terraceArea && terraceArea > 0) {
            return { icon: Sun, value: `${terraceArea}`, label: 'm² terrass' };
        }
        // 2. Parking
        if (features.parkingSpaces && features.parkingSpaces > 0) {
            return { icon: Car, value: `${features.parkingSpaces}`, label: 'p-plats' };
        }
        if (features.parking) {
            return { icon: Car, value: '1', label: 'p-plats' };
        }
        // 3. Energy Rating
        if (energyRating) {
            return { icon: Zap, value: energyRating, label: 'energi' };
        }
        // 4. Pool
        if (features.pool !== 'none') {
            return { icon: Waves, value: 'Ja', label: 'pool' };
        }
        return null;
    };

    const dynamicHighlight = getDynamicHighlight();

    // Format distance helper
    const formatDistance = (meters: number) => {
        if (meters >= 1000) {
            return `${(meters / 1000).toLocaleString('sv-SE', { maximumFractionDigits: 1 })} km`;
        }
        return `${meters} m`;
    };

    return (
        <Link
            href={`/fastigheter/${property.slug}`}
            className="group bg-white rounded-sm overflow-hidden hover:shadow-hover transition-all duration-500 border border-gray-100 flex flex-col h-full"
        >
            {/* Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                {property.images?.[0] ? (
                    <Image
                        src={property.images[0]}
                        alt={property.title || 'Fastighet utan bild'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-xs">Ingen bild</span>
                    </div>
                )}

                {/* Badges - REMOVED from top left as per request */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 items-start z-10">
                    {/* Empty or kept for future badges if needed, but NYPRODUKTION is moved */}
                </div>

                {/* Favorite Button */}
                <div className="absolute top-4 right-4 z-10">
                    <FavoriteButton propertyId={property.id} />
                </div>

                {/* Distance Overlay - Improved Gradient */}
                {property.distances.beach && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="inline-flex items-center gap-1.5 bg-white/95 px-2 py-1 rounded text-[10px] font-medium text-navy shadow-sm translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                            <MapPin size={12} className="text-sand" />
                            {formatDistance(property.distances.beach)} till strand
                        </span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-auto">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-wrap gap-2">
                            {property.isNewBuild && (
                                <span className="bg-navy/5 text-navy px-2 py-1 text-[9px] uppercase tracking-widest font-semibold rounded-sm">
                                    Nyproduktion
                                </span>
                            )}
                            <span className="bg-navy/5 text-navy px-2 py-1 text-[9px] uppercase tracking-widest font-semibold rounded-sm">
                                {translatePropertyType(property.type)}
                            </span>
                        </div>
                    </div>
                    <h3 className="text-lg font-serif text-navy font-medium leading-snug group-hover:text-sand transition-colors duration-300 line-clamp-2" title={`${property.type} i ${property.town}`}>
                        {property.type} i {property.town}
                    </h3>
                    <p className="text-sm text-gray-500 font-light mt-1 truncate">
                        {property.locationDetail || property.town}, {property.province}
                    </p>

                    {/* Price - Closer to title */}
                    <div className="mt-2 flex flex-col gap-1">
                        <span className="text-xl font-serif text-navy leading-none">
                            {property.price.toLocaleString('sv-SE')} €
                        </span>
                        <BitcoinPrice priceEur={property.price} size="sm" />
                    </div>
                </div>

                {/* Specs Divider */}
                <div className="w-full h-px bg-gray-100 my-4" />

                {/* Specs Row - Improved Hierarchy */}
                <div className="flex items-center justify-between text-charcoal">
                    {/* Beds */}
                    <div className="flex flex-col items-center gap-0.5 group/icon">
                        <div className="flex items-center gap-1.5">
                            <Bed
                                size={16}
                                strokeWidth={1.5}
                                className="text-gray-400 group-hover/icon:text-navy transition-colors"
                            />
                            <span className="text-sm font-semibold text-navy">
                                {property.beds}
                            </span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-normal">sovrum</span>
                    </div>

                    <div className="text-gray-300 font-light">·</div>

                    {/* Baths */}
                    <div className="flex flex-col items-center gap-0.5 group/icon">
                        <div className="flex items-center gap-1.5">
                            <Bath
                                size={16}
                                strokeWidth={1.5}
                                className="text-gray-400 group-hover/icon:text-navy transition-colors"
                            />
                            <span className="text-sm font-semibold text-navy">
                                {property.baths}
                            </span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-normal">badrum</span>
                    </div>

                    <div className="text-gray-300 font-light">·</div>

                    {/* Area */}
                    <div className="flex flex-col items-center gap-0.5 group/icon">
                        <div className="flex items-center gap-1.5">
                            <Expand
                                size={16}
                                strokeWidth={1.5}
                                className="text-gray-400 group-hover/icon:text-navy transition-colors"
                            />
                            <span className="text-sm font-semibold text-navy">
                                {property.builtArea}
                            </span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-normal">m² boyta</span>
                    </div>

                    {/* Dynamic Highlight (4th item) */}
                    {dynamicHighlight && (
                        <>
                            <div className="text-gray-300 font-light">·</div>
                            <div className="flex flex-col items-center gap-0.5 group/icon">
                                <div className="flex items-center gap-1.5">
                                    <dynamicHighlight.icon
                                        size={16}
                                        strokeWidth={1.5}
                                        className="text-gray-400 group-hover/icon:text-navy transition-colors"
                                    />
                                    <span className="text-sm font-semibold text-navy">
                                        {dynamicHighlight.value}
                                    </span>
                                </div>
                                <span className="text-[10px] text-gray-400 font-normal whitespace-nowrap">
                                    {dynamicHighlight.label}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
}
