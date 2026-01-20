import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Expand, MapPin } from 'lucide-react';
import { Property } from '@/types/property';
import FavoriteButton from '@/components/ui/FavoriteButton';

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

    return (
        <Link
            href={`/fastigheter/${property.slug}`}
            className="group bg-white rounded-sm overflow-hidden hover:shadow-hover transition-all duration-500 border border-gray-100 flex flex-col h-full"
        >
            {/* Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
                    {property.isNewBuild && (
                        <span
                            className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest shadow-sm ${getBadgeStyle('Nyproduktion')}`}
                        >
                            Nyproduktion
                        </span>
                    )}
                    {property.features.pool !== 'none' && (
                        <span
                            className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest shadow-sm bg-white/95 text-charcoal`}
                        >
                            Pool
                        </span>
                    )}
                </div>

                {/* Favorite Button */}
                <div className="absolute top-4 right-4">
                    <FavoriteButton propertyId={property.id} />
                </div>

                {/* Distance Overlay */}
                {property.distances.beach && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent pt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs font-medium flex items-center gap-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                            <MapPin size={14} className="text-sand" />
                            {property.distances.beach}m till strand
                        </p>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-[10px] text-sage uppercase tracking-[0.15em] font-bold">
                            {property.region === 'costa-del-sol'
                                ? 'Costa del Sol'
                                : 'Costa Blanca'}
                        </p>
                    </div>
                    <h3 className="text-xl font-serif text-navy font-medium leading-snug group-hover:text-sand transition-colors duration-300">
                        {property.type} i {property.town}
                    </h3>
                    <p className="text-sm text-gray-500 font-light mt-1">
                        {property.locationDetail || property.town}, {property.province}
                    </p>
                </div>

                {/* Price Section */}
                <div className="flex flex-col gap-1 mb-6 pb-6 border-b border-greige">
                    <span className="text-2xl font-serif text-navy">
                        {property.price.toLocaleString('sv-SE')} €
                    </span>
                </div>

                {/* Specs */}
                <div className="flex items-center justify-between text-charcoal mt-auto">
                    <div className="flex flex-col items-center gap-1 group/icon">
                        <Bed
                            size={18}
                            strokeWidth={1}
                            className="text-gray-400 group-hover/icon:text-navy transition-colors"
                        />
                        <span className="text-xs font-medium">
                            {property.beds}{' '}
                            <span className="text-gray-400 font-light">sov</span>
                        </span>
                    </div>
                    <div className="w-px h-8 bg-greige" />
                    <div className="flex flex-col items-center gap-1 group/icon">
                        <Bath
                            size={18}
                            strokeWidth={1}
                            className="text-gray-400 group-hover/icon:text-navy transition-colors"
                        />
                        <span className="text-xs font-medium">
                            {property.baths}{' '}
                            <span className="text-gray-400 font-light">bad</span>
                        </span>
                    </div>
                    <div className="w-px h-8 bg-greige" />
                    <div className="flex flex-col items-center gap-1 group/icon">
                        <Expand
                            size={18}
                            strokeWidth={1}
                            className="text-gray-400 group-hover/icon:text-navy transition-colors"
                        />
                        <span className="text-xs font-medium">
                            {property.builtArea}{' '}
                            <span className="text-gray-400 font-light">m²</span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
