"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSearchParams } from "next/navigation";
import PropertyListing from "@/components/property/PropertyListing";
import FilterWithModal from "@/components/search/FilterWithModal";
import { useMemo } from "react";
import { Property, PropertyType, PROVINCE_TO_REGION } from "@/types/property";

export default function ConvexPropertySearch() {
    const searchParams = useSearchParams();

    const filters = useMemo(() => {
        const p = Object.fromEntries(searchParams.entries());
        return {
            region: p.region || undefined,
            town: p.town || undefined,
            type: p.type || undefined,
            minPrice: p.minPrice ? Number(p.minPrice) : undefined,
            maxPrice: p.maxPrice ? Number(p.maxPrice) : undefined,
            minBeds: p.bedrooms ? Number(p.bedrooms) : undefined,
            hasPool: p.pool === 'true' ? true : undefined,
            nearGolf: p.nearGolf === 'true' ? true : undefined, // Check functionality on backend
            newBuild: p.newBuild === 'true' ? true : undefined,
            ref: p.ref || undefined,
            sort: p.sort as "price-asc" | "price-desc" | "newest" | undefined,
        };
    }, [searchParams]);

    // Handle pagination (initial page for now)
    const results = useQuery(api.properties.search, {
        ...filters,
        pagination: { numItems: 20, cursor: null },
    });

    const convexProperties = results ? results.page : [];

    // Map Convex docs to Frontend Property type
    const mappedProperties: Property[] = convexProperties.map(doc => ({
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
        coordinates: {
            lat: doc.latitude || 0,
            lng: doc.longitude || 0
        },
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

        distances: {
            beach: doc.beachDistance,
            golf: doc.nearGolf,
        },

        descriptions: {
            sv: doc.description || '',
            en: '',
            es: ''
        },

        images: doc.images,

        dateUpdated: new Date(doc.updatedAt).toISOString(),
        dateListed: new Date(doc.createdAt).toISOString(),
    }));

    return (
        <div className="flex flex-col lg:flex-row gap-16">
            {/* Filter Sidebar */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
                <FilterWithModal propertyCount={mappedProperties.length} />
            </aside>

            {/* Property Grid */}
            <div className="flex-1">
                {results === undefined ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-white animate-pulse rounded-sm h-96"
                            />
                        ))}
                    </div>
                ) : (
                    <PropertyListing
                        properties={mappedProperties}
                        totalProperties={mappedProperties.length} // Approx or just shown
                    />
                )}
            </div>
        </div>
    );
}
