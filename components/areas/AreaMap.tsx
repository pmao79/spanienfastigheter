'use client';

import { useState, useEffect, useRef } from 'react';
import Map, { Marker, NavigationControl, MapRef } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

interface AreaMapProps {
    lat: number;
    lng: number;
    zoom?: number;
    className?: string;
    flyTo?: { lat: number; lng: number; zoom?: number } | null;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

/**
 * Interactive Mapbox component for area pages
 */
export default function AreaMap({
    lat,
    lng,
    zoom = 12,
    className = '',
    flyTo
}: AreaMapProps) {
    const mapRef = useRef<MapRef>(null);
    const [viewState, setViewState] = useState({
        latitude: lat,
        longitude: lng,
        zoom: zoom
    });

    // Handle flyTo requests
    useEffect(() => {
        if (flyTo && mapRef.current) {
            mapRef.current.flyTo({
                center: [flyTo.lng, flyTo.lat],
                zoom: flyTo.zoom || 14,
                duration: 2000,
                essential: true
            });
        }
    }, [flyTo]);

    if (!MAPBOX_TOKEN) {
        console.error('Missing NEXT_PUBLIC_MAPBOX_TOKEN');
        return (
            <div className={`bg-gray-100 flex items-center justify-center text-gray-500 text-sm ${className}`}>
                Karta inte tillgänglig
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden rounded-lg ${className}`}>
            <Map
                ref={mapRef}
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/outdoors-v12"
                mapboxAccessToken={MAPBOX_TOKEN}
                scrollZoom={false}
            >
                <NavigationControl position="bottom-right" />

                {/* Main Area Marker */}
                <Marker latitude={lat} longitude={lng} anchor="bottom">
                    <div className="relative">
                        <div className="w-8 h-8 bg-navy text-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                            <MapPin size={18} />
                        </div>
                        <div className="w-2 h-2 bg-navy rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                    </div>
                </Marker>

                {/* Optional flyTo Marker (if different from main) */}
                {flyTo && (flyTo.lat !== lat || flyTo.lng !== lng) && (
                    <Marker latitude={flyTo.lat} longitude={flyTo.lng} anchor="bottom">
                        <div className="relative animate-bounce">
                            <div className="w-8 h-8 bg-sand text-white rounded-full flex items-center justify-center shadow-lg">
                                <MapPin size={18} />
                            </div>
                            <div className="w-2 h-2 bg-sand rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                        </div>
                    </Marker>
                )}
            </Map>
        </div>
    );
}
