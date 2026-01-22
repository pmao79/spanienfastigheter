'use client';

import { GoogleMap, useLoadScript, Marker, Libraries } from '@react-google-maps/api';

const libraries: Libraries = ['places'];

interface GolfCourseMapProps {
    coordinates: {
        lat: number;
        lng: number;
    };
    courseName: string;
    className?: string;
}

export default function GolfCourseMap({ coordinates, courseName, className = '' }: GolfCourseMapProps) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries,
    });

    const hasValidCoordinates = coordinates.lat !== 0 && coordinates.lng !== 0;

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

    if (!isLoaded) {
        return (
            <div className={`bg-gray-100 rounded-sm flex items-center justify-center ${className}`} style={{ minHeight: '300px' }}>
                <p className="text-sm text-gray-500">Laddar karta...</p>
            </div>
        );
    }

    return (
        <div className={`rounded-sm overflow-hidden ${className}`}>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '300px' }}
                center={coordinates}
                zoom={15}
                mapTypeId='satellite'
                options={{
                    disableDefaultUI: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: true,
                }}
            >
                <Marker
                    position={coordinates}
                    title={courseName}
                />
            </GoogleMap>
        </div>
    );
}
