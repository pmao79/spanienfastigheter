import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

interface GoogleReviewV1 {
    name: string;
    relativePublishTimeDescription: string;
    rating: number;
    text: {
        text: string;
        languageCode: string;
    };
    originalText: {
        text: string;
        languageCode: string;
    };
    authorAttribution: {
        displayName: string;
        uri: string;
        photoUri: string;
    };
    publishTime: string;
}

interface PlaceDetailsV1 {
    name: string;
    id: string;
    displayName: {
        text: string;
        languageCode: string;
    };
    rating: number;
    userRatingCount: number;
    reviews: GoogleReviewV1[];
    googleMapsUri: string;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const placeId = searchParams.get('placeId');
    const query = searchParams.get('query');

    if (!GOOGLE_API_KEY) {
        return NextResponse.json(
            { error: 'Google Places API key not configured' },
            { status: 500 }
        );
    }

    try {
        let resolvedPlaceId = placeId;

        // If no placeId provided, search for the place first using Text Search (New)
        if (!resolvedPlaceId && query) {
            const searchUrl = 'https://places.googleapis.com/v1/places:searchText';
            const searchResponse = await fetch(searchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': GOOGLE_API_KEY,
                    'X-Goog-FieldMask': 'places.id,places.displayName'
                },
                body: JSON.stringify({
                    textQuery: query
                })
            });

            const searchData = await searchResponse.json();

            if (searchData.places && searchData.places.length > 0) {
                resolvedPlaceId = searchData.places[0].id;
            } else {
                return NextResponse.json(
                    { error: 'Place not found', query },
                    { status: 404 }
                );
            }
        }

        if (!resolvedPlaceId) {
            return NextResponse.json(
                { error: 'Either placeId or query parameter is required' },
                { status: 400 }
            );
        }

        // Fetch place details with reviews using Place Details (New)
        // Fields to fetch: displayName, rating, userRatingCount, reviews, googleMapsUri
        const detailsUrl = `https://places.googleapis.com/v1/places/${resolvedPlaceId}`;
        const fields = 'id,displayName,rating,userRatingCount,reviews,googleMapsUri';

        const detailsResponse = await fetch(`${detailsUrl}?fields=${fields}`, {
            method: 'GET',
            headers: {
                'X-Goog-Api-Key': GOOGLE_API_KEY,
                'X-Goog-FieldMask': fields,
                'Accept-Language': 'sv' // Request Swedish language
            }
        });

        const placeData = await detailsResponse.json();

        if (placeData.error) {
            return NextResponse.json(
                { error: 'Failed to fetch place details', details: placeData.error },
                { status: 500 }
            );
        }

        // Map to existing frontend contract
        return NextResponse.json({
            placeId: resolvedPlaceId,
            name: placeData.displayName?.text || '',
            rating: placeData.rating || 0,
            totalReviews: placeData.userRatingCount || 0,
            googleMapsUrl: placeData.googleMapsUri || '',
            reviews: (placeData.reviews || []).map((review: GoogleReviewV1) => ({
                authorName: review.authorAttribution?.displayName || 'Anonym',
                authorUrl: review.authorAttribution?.uri || '',
                profilePhoto: review.authorAttribution?.photoUri || '',
                rating: review.rating,
                relativeTime: review.relativePublishTimeDescription,
                text: review.text?.text || review.originalText?.text || '',
                timestamp: new Date(review.publishTime).getTime()
            }))
        });
    } catch (error) {
        console.error('Google Places API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch reviews' },
            { status: 500 }
        );
    }
}
