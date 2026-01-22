
import { useState, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

export interface Distances {
    golf: string | null;
    beach: string | null;
    airport: string | null;
    shopping: string | null;
}

const LIBRARIES: ("places" | "geometry")[] = ['places', 'geometry'];

export function usePropertyDistances(lat: number, lng: number, address?: string) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries: LIBRARIES
    });

    const [distances, setDistances] = useState<Distances>({
        golf: null,
        beach: null,
        airport: null,
        shopping: null,
    });

    const [elevation, setElevation] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoaded || !lat || !lng || !window.google) return;

        const placesService = new google.maps.places.PlacesService(document.createElement('div'));
        const distanceService = new google.maps.DistanceMatrixService();
        const elevationService = new google.maps.ElevationService();
        const origin = new google.maps.LatLng(lat, lng);
        // Use exact address for driving calculations if available, otherwise lat/lng
        const originForRouting = address || origin;

        // Get Elevation
        elevationService.getElevationForLocations({
            locations: [origin]
        }, (results, status) => {
            console.log('[DEBUG] Elevation Status:', status, results);
            if (status === 'OK' && results && results[0]) {
                const elev = Math.round(results[0].elevation);
                setElevation(`${elev} m.ö.h`);
            } else {
                console.error('ElevationService failed:', status);
                if (status === 'REQUEST_DENIED') {
                    console.warn('[FIX ME] Elevation API REQUEST_DENIED. Check: 1) API Key enabled for Elevation API. 2) Referrer restrictions (localhost). 3) Billing account linked.');
                }
                setElevation('Ej tillgängligt'); // Fallback so it doesn't stay in "Loading"
            }
        });

        const searchAndMeasure = (
            type: string | undefined, // Type or keyword
            keyword: string | undefined,
            key: keyof Distances
        ) => {
            const request: google.maps.places.PlaceSearchRequest = {
                location: origin,
                rankBy: google.maps.places.RankBy.DISTANCE,
                type: type, // 'airport', 'supermarket'
                keyword: keyword // 'golf course', 'beach'
            };

            placesService.nearbySearch(request, (results, status) => {
                if (
                    status === google.maps.places.PlacesServiceStatus.OK &&
                    results &&
                    results.length > 0
                ) {
                    // Filter out real estate agencies when searching for golf/beach/etc.
                    // unless we specifically want them. 
                    let bestMatch = results[0];
                    if (key === 'golf') {
                        const actualGolf = results.find(r =>
                            r.types?.includes('golf_course') ||
                            r.name?.toLowerCase().includes('golf')
                        );
                        // If the first result is a real estate agency and we have another option, skip it
                        if (bestMatch.types?.includes('real_estate_agency') && results.length > 1) {
                            bestMatch = results.find(r => !r.types?.includes('real_estate_agency')) || results[0];
                        } else if (actualGolf) {
                            bestMatch = actualGolf;
                        }
                    }

                    if (bestMatch.geometry?.location) {
                        const destination = bestMatch.geometry.location;

                        // 1. Try Distance Matrix (Best for simple distance)
                        distanceService.getDistanceMatrix(
                            {
                                origins: [originForRouting],
                                destinations: [destination],
                                travelMode: google.maps.TravelMode.DRIVING,
                                unitSystem: google.maps.UnitSystem.METRIC,
                            },
                            (response, status) => {
                                if (
                                    status === 'OK' &&
                                    response?.rows[0]?.elements[0]?.status === 'OK'
                                ) {
                                    const distText = response.rows[0].elements[0].distance.text;
                                    setDistances((prev) => ({ ...prev, [key]: distText }));
                                } else {
                                    // 2. Fallback: Try Directions Service (Route) if Matrix fails
                                    const directionsService = new google.maps.DirectionsService();
                                    directionsService.route(
                                        {
                                            origin: originForRouting,
                                            destination: destination,
                                            travelMode: google.maps.TravelMode.DRIVING,
                                        },
                                        (routeResult, routeStatus) => {
                                            if (
                                                routeStatus === 'OK' &&
                                                routeResult?.routes[0]?.legs[0]?.distance?.text
                                            ) {
                                                setDistances((prev) => ({
                                                    ...prev,
                                                    [key]: routeResult!.routes[0].legs[0].distance!.text,
                                                }));
                                            } else {
                                                // 3. Final Fallback: Straight-line distance
                                                // Always use coordinates for straight line
                                                const distMeters = google.maps.geometry.spherical.computeDistanceBetween(
                                                    origin,
                                                    destination
                                                );
                                                let text = "";
                                                if (distMeters < 1000) {
                                                    text = `${Math.round(distMeters)} m`;
                                                } else {
                                                    text = `${(distMeters / 1000).toFixed(1)} km`;
                                                }
                                                setDistances((prev) => ({ ...prev, [key]: text }));
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                }
            });
        };

        // Golf: Search for 'golf club' or 'golf course' keyword is often more reliable
        searchAndMeasure(undefined, 'golf club', 'golf');

        // Beach: Search for 'beach' keyword (most reliable)
        searchAndMeasure(undefined, 'beach', 'beach');

        // Airport: Search for 'airport' type
        searchAndMeasure('airport', undefined, 'airport');

        // Shopping: 'supermarket' is a good proxy for daily shopping
        searchAndMeasure('supermarket', undefined, 'shopping');

    }, [isLoaded, lat, lng, address]);

    return { distances, isLoaded, elevation };
}
