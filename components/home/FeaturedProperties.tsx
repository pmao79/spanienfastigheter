"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PropertyCard from "@/components/property/PropertyCard";
import Link from "next/link";
import { Property, PropertyType, PROVINCE_TO_REGION } from "@/types/property";

export default function FeaturedProperties() {
    const featuredDocs = useQuery(api.properties.getFeatured);

    // Filter Sidebar used property 'totalCount' logic, handled in page text.
    // The main page shows "Visar X av Y objekt".
    // Since getFeatured only returns top 10, 'totalCount' isn't really appropriate here unless we fetch stats.
    // But for the "Featured" section, we just show what we have.

    // Map properties
    const properties: Property[] = (featuredDocs || []).map(doc => ({
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
    })).slice(0, 4); // Limit to 4 as per design

    if (featuredDocs === undefined) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white animate-pulse rounded-sm h-96" />
                ))}
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
                        Senaste objekten från Costa Blanca och Costa del Sol
                    </p>
                </div>
                <div className="hidden md:flex gap-8 border-b border-gray-200 pb-2">
                    <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy border-b-2 border-navy pb-2 -mb-2.5">
                        Senast inkommet
                    </button>
                    {/* Other tabs could be implemented via component state */}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>

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
