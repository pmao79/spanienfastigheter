'use client';

import { useMemo, useState, useRef, useCallback } from 'react';
import Map, { Marker, NavigationControl, Popup, MapRef } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Property } from '@/types/property';
import Link from 'next/link';
import Image from 'next/image';

interface SearchResultsMapProps {
    properties: Property[];
    className?: string;
}

export default function SearchResultsMap({
    properties,
    className = "w-full h-full"
}: SearchResultsMapProps) {
    const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const [popupInfo, setPopupInfo] = useState<Property | null>(null);
    const mapRef = useRef<MapRef>(null);

    // Calculate bounds from properties
    const bounds = useMemo(() => {
        const validProperties = properties.filter(p => p.coordinates?.lat && p.coordinates?.lng);
        if (validProperties.length === 0) return null;

        const lats = validProperties.map(p => p.coordinates.lat);
        const lngs = validProperties.map(p => p.coordinates.lng);

        return {
            minLng: Math.min(...lngs),
            maxLng: Math.max(...lngs),
            minLat: Math.min(...lats),
            maxLat: Math.max(...lats)
        };
    }, [properties]);

    // Default view for Spain
    const initialViewState = useMemo(() => ({
        latitude: 36.7,
        longitude: -4.4,
        zoom: 8
    }), []);

    // Fit bounds when map loads
    const onMapLoad = useCallback(() => {
        if (mapRef.current && bounds) {
            mapRef.current.fitBounds(
                [[bounds.minLng, bounds.minLat], [bounds.maxLng, bounds.maxLat]],
                { padding: 60, duration: 500 }
            );
        }
    }, [bounds]);

    if (!MAPBOX_TOKEN) {
        return (
            <div className={`bg-gray-100 flex items-center justify-center text-gray-400 text-sm ${className}`}>
                Karta inte tillgänglig
            </div>
        );
    }

    return (
        <div className={className}>
            <Map
                ref={mapRef}
                initialViewState={initialViewState}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={MAPBOX_TOKEN}
                onLoad={onMapLoad}
            >
                <NavigationControl position="top-right" />

                {properties.map((property) => (
                    property.coordinates?.lat && (
                        <Marker
                            key={property.id}
                            latitude={property.coordinates.lat}
                            longitude={property.coordinates.lng}
                            anchor="bottom"
                            onClick={e => {
                                // If we want to prevent map click...
                                e.originalEvent.stopPropagation();
                                setPopupInfo(property);
                            }}
                        >
                            <div className="text-navy hover:text-rose-500 transition-colors cursor-pointer transform hover:scale-110 duration-200 drop-shadow-md">
                                <MapPin size={24} fill="currentColor" />
                            </div>
                        </Marker>
                    )
                ))}

                {popupInfo && (
                    <Popup
                        anchor="top"
                        latitude={popupInfo.coordinates.lat}
                        longitude={popupInfo.coordinates.lng}
                        onClose={() => setPopupInfo(null)}
                        className="z-50"
                        maxWidth="300px"
                    >
                        <div className="p-0 overflow-hidden rounded-md min-w-[240px]">
                            <div className="relative h-32 w-full">
                                <Image
                                    src={popupInfo.images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070'}
                                    alt={popupInfo.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-3 bg-white">
                                <h3 className="font-serif text-navy text-sm font-bold mb-1 line-clamp-1">{popupInfo.title}</h3>
                                <p className="text-gray-500 text-xs mb-2">{popupInfo.town}</p>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-navy">{popupInfo.price.toLocaleString()} €</span>
                                    <Link
                                        href={`/fastigheter/${popupInfo.slug}`}
                                        className="text-[10px] uppercase font-bold text-white bg-navy px-2 py-1 rounded-sm hover:bg-sand transition-colors"
                                    >
                                        Visa
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}
