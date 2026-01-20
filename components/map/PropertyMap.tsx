'use client';

import Map, { Marker, NavigationControl } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

interface PropertyMapProps {
    latitude: number;
    longitude: number;
    zoom?: number;
    className?: string; // Allow custom sizing/positioning
}

export default function PropertyMap({
    latitude,
    longitude,
    zoom = 14,
    className = "w-full h-[400px] rounded-lg overflow-hidden"
}: PropertyMapProps) {
    const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

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
                initialViewState={{
                    latitude,
                    longitude,
                    zoom
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={MAPBOX_TOKEN}
                scrollZoom={false} // Prevent accidental zooming when scrolling page
            >
                <NavigationControl position="top-right" />

                {/* Approximate Location Circle (Privacy) */}
                <Marker latitude={latitude} longitude={longitude} anchor="center">
                    <div className="relative flex items-center justify-center w-32 h-32">
                        <div className="absolute w-full h-full bg-sand/20 rounded-full animate-pulse"></div>
                        <div className="absolute w-20 h-20 bg-sand/30 rounded-full"></div>

                        {/* Pin */}
                        <div className="relative z-10 bg-navy text-white p-2 rounded-full shadow-lg border-2 border-white transform -translate-y-1/2">
                            <MapPin size={24} fill="currentColor" />
                        </div>
                    </div>
                </Marker>
            </Map>
        </div>
    );
}
