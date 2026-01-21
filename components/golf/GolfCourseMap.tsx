'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface GolfCourseMapProps {
    coordinates: {
        lat: number;
        lng: number;
    };
    courseName: string;
    className?: string;
}

export default function GolfCourseMap({ coordinates, courseName, className = '' }: GolfCourseMapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    // Check if coordinates are valid (not 0,0)
    const hasValidCoordinates = coordinates.lat !== 0 && coordinates.lng !== 0;

    useEffect(() => {
        if (!mapContainerRef.current || !hasValidCoordinates) return;

        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        if (!token) {
            console.error('Mapbox token missing');
            return;
        }

        mapboxgl.accessToken = token;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [coordinates.lng, coordinates.lat],
            zoom: 14,
            attributionControl: false
        });

        // Add navigation controls
        mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Add marker for golf course
        new mapboxgl.Marker({ color: '#1B365D' })
            .setLngLat([coordinates.lng, coordinates.lat])
            .setPopup(new mapboxgl.Popup().setHTML(`<strong>${courseName}</strong>`))
            .addTo(mapRef.current);

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, [coordinates, courseName, hasValidCoordinates]);

    if (!hasValidCoordinates) {
        return (
            <div className={`bg-greige rounded-sm flex items-center justify-center ${className}`} style={{ minHeight: '300px' }}>
                <div className="text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm">Kartposition ej tillgänglig</p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={mapContainerRef}
            className={`rounded-sm overflow-hidden ${className}`}
            style={{ minHeight: '300px' }}
        />
    );
}
