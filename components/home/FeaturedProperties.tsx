"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PropertyCard from "@/components/property/PropertyCard";
import Link from "next/link";
import { Doc } from "@/convex/_generated/dataModel";
import { Property, PropertyType, PROVINCE_TO_REGION } from "@/types/property";

export default function FeaturedProperties() {
    // 1. Fetch Featured
    const featuredDocs = useQuery(api.properties.getFeatured);

    // 2. Fetch Latest (as fallback)
    // Note: search returns a paginated object { page: [], ... }
    const latestResults = useQuery(api.properties.search, {
        sort: "newest",
        pagination: { numItems: 6, cursor: null }
    });

    // Determine which data to use
    // If featuredDocs is loaded and has items, use it.
    // If featuredDocs is loaded and EMPTY, use latestResults.page

    const showFeatured = featuredDocs && featuredDocs.length > 0;
    const docsToUse = showFeatured ? featuredDocs : (latestResults?.page || []);

    // Limits
    // Featured fetch already limits to 10 in backend query
    // Latest fetch limits to 6 via pagination
    // Display only 4-6 as requested. Let's show 4 to match original design slice.
    // User asked for "always 4-6".
    // Original code sliced to 4.
    const displayDocs = docsToUse.slice(0, 4);

    // Map properties
    const properties: Property[] = displayDocs.map((doc: Doc<"properties">) => ({
        id: doc._id,
        ref: doc.ref,
        slug: doc.ref,
        price: doc.price,
        currency: 'EUR',
        type: (doc.type as PropertyType) || 'Apartment',
        title: `${doc.type} i ${doc.town}`,
        isNewBuild: doc.newBuild,
        town: doc.town,
        province: doc.province,
        country: 'Spanien',
        locationDetail: doc.locationDetail,
        coordinates: { lat: doc.latitude || 0, lng: doc.longitude || 0 },
        region: (PROVINCE_TO_REGION[doc.province] || 'costa-del-sol'),
        beds: doc.beds,
        baths: doc.baths,
        builtArea: doc.built,
        plotArea: doc.plot,
        terraceArea: doc.terraceSize,
        energyRating: (doc.energyConsumption as any) || undefined,
        features: {
            pool: doc.pool ? ((doc.poolType?.toLowerCase().includes('communal') ? 'communal' : 'private')) : 'none',
            parking: doc.hasParking,
            parkingSpaces: doc.parkingSpaces,
            elevator: doc.hasElevator,
            garden: doc.hasGarden,
            gated: doc.isGated,
            terrace: !!doc.terraceSize,
            airConditioning: doc.hasAC,
            heating: doc.hasHeating,
            storage: doc.hasStorage,
            furnished: false,
        },
        distances: { beach: doc.beachDistance, golf: doc.nearGolf },
        descriptions: { sv: doc.description || '', en: '', es: '' },
        images: doc.images,
        dateUpdated: new Date(doc.updatedAt).toISOString(),
        dateListed: new Date(doc.createdAt).toISOString(),
    }));

    // Loading State
    // If we are waiting for featured check OR (if fallback needed) waiting for latest
    // If featuredDocs is undefined -> Loading
    // If featuredDocs is empty AND latestResults is undefined -> Loading
    const isLoading = featuredDocs === undefined || (featuredDocs.length === 0 && latestResults === undefined);

    if (isLoading) {
        return (
            <div className="flex-1">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <div className="h-10 bg-gray-200 rounded w-96 mb-3 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white animate-pulse rounded-sm h-96" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl md:text-4xl font-serif text-navy mb-3">
                        Utvalda bostäder till salu i Spanien
                    </h2>
                    <p className="text-gray-500 font-light text-sm">
                        {showFeatured
                            ? "Utvalda objekt från Costa Blanca och Costa del Sol"
                            : "Senaste objekten från Costa Blanca och Costa del Sol"
                        }
                    </p>
                </div>
                <div className="hidden md:flex gap-8 border-b border-gray-200 pb-2">
                    <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy border-b-2 border-navy pb-2 -mb-2.5">
                        Senast inkommet
                    </button>
                    {/* Other tabs could be implemented via component state */}
                </div>
            </div>

            {properties.length === 0 ? (
                <div className="py-12 text-center bg-gray-50 rounded">
                    <p className="text-gray-500">Inga bostäder att visa just nu.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    {properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            )}

            <div className="mt-20 text-center">
                <Link
                    href="/fastigheter"
                    className="bg-transparent border border-navy text-navy px-12 py-5 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-navy hover:text-white transition-all duration-300 inline-block"
                >
                    Visa alla bostäder till salu i Spanien
                </Link>
            </div>
        </div>
    );
}
