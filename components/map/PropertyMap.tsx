'use client';

import { useMemo, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, CircleF } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';

interface PropertyMapProps {
    latitude: number;
    longitude: number;
    zoom?: number;
    className?: string;
}

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '0.5rem',
};

// Custom map styles to match the site's premium feel (desaturated/clean)
const mapStyles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": -60
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#cbd5e0"
            },
            {
                "visibility": "on"
            }
        ]
    }
];

export default function PropertyMap({
    latitude,
    longitude,
    zoom = 14,
    className = "w-full h-[400px] rounded-lg overflow-hidden"
}: PropertyMapProps) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries: ['places', 'geometry'] // Synchronized with distance hook
    });

    const center = useMemo(() => ({ lat: latitude, lng: longitude }), [latitude, longitude]);

    // Privacy circle options
    const circleOptions = useMemo(() => ({
        strokeColor: '#C5A572', // Sand color
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#C5A572',
        fillOpacity: 0.20,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 300, // 300 meters radius for privacy
        zIndex: 1
    }), []);

    const [map, setMap] = useState<google.maps.Map | null>(null);

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        return (
            <div className={`bg-gray-100 flex items-center justify-center text-gray-400 text-sm ${className}`}>
                Google Maps API key saknas
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className={`bg-gray-50 flex items-center justify-center text-gray-300 ${className}`}>
                <div className="animate-pulse flex flex-col items-center">
                    <MapPin size={32} className="mb-2 opacity-20" />
                    <span className="text-xs uppercase tracking-widest">Laddar karta...</span>
                </div>
            </div>
        );
    }

    return (
        <div className={className}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    styles: mapStyles,
                    disableDefaultUI: false, // Keep default UI for better UX
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: true,
                    fullscreenControl: true,
                    scrollwheel: false, // Prevent accidental scrolling
                }}
            >
                {/* Privacy Circle */}
                <CircleF
                    center={center}
                    options={circleOptions}
                />

                {/* Exact Marker (or center of circle) */}
                <MarkerF
                    position={center}
                    icon={{
                        // We can use a custom SVG path or an image. 
                        // For simplicity/reliability, standard Google pin or slightly modified color URL
                        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                        fillColor: "#1B2433", // Navy
                        fillOpacity: 1,
                        strokeWeight: 2,
                        strokeColor: "#FFFFFF",
                        scale: 1.5,
                        anchor: { x: 12, y: 22 } as any // Type assertion needed sometimes
                    }}
                />
            </GoogleMap>
        </div>
    );
}
