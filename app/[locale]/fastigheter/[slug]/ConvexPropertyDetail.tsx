"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Property, PropertyType, PROVINCE_TO_REGION } from "@/types/property";
import PropertyDetails from "@/components/property/PropertyDetails";

export default function ConvexPropertyDetail({ refId }: { refId: string }) {
    const propertyDoc = useQuery(api.properties.getByRef, { ref: refId });

    if (propertyDoc === undefined) {
        return <div className="min-h-screen flex items-center justify-center bg-alabaster">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>
        </div>;
    }

    if (propertyDoc === null) {
        return <div className="min-h-screen flex items-center justify-center bg-alabaster">
            <div className="text-center">
                <h1 className="text-2xl font-serif text-navy mb-2">Hittade inte fastigheten</h1>
                <p className="text-gray-500">Ref: {refId}</p>
            </div>
        </div>;
    }

    // Map to Frontend Property Type
    const property: Property = {
        id: propertyDoc._id,
        ref: propertyDoc.ref,
        slug: propertyDoc.ref,
        price: propertyDoc.price,
        currency: 'EUR',
        type: (propertyDoc.type as PropertyType) || 'Apartment',
        title: `${propertyDoc.type} i ${propertyDoc.town}`,
        isNewBuild: propertyDoc.newBuild,
        town: propertyDoc.town,
        province: propertyDoc.province,
        country: 'Spanien',
        locationDetail: propertyDoc.locationDetail,
        coordinates: {
            lat: propertyDoc.latitude || 0,
            lng: propertyDoc.longitude || 0
        },
        region: (PROVINCE_TO_REGION[propertyDoc.province] || 'costa-del-sol'),

        beds: propertyDoc.beds,
        baths: propertyDoc.baths,
        builtArea: propertyDoc.built,
        plotArea: propertyDoc.plot,
        terraceArea: propertyDoc.terraceSize,

        energyRating: (propertyDoc.energyConsumption as any) || undefined,

        features: {
            pool: propertyDoc.pool ? ((propertyDoc.poolType?.toLowerCase().includes('communal') ? 'communal' : 'private')) : 'none',
            parking: propertyDoc.hasParking,
            parkingSpaces: propertyDoc.parkingSpaces,
            elevator: propertyDoc.hasElevator,
            garden: propertyDoc.hasGarden,
            gated: propertyDoc.isGated,
            terrace: !!propertyDoc.terraceSize,
            airConditioning: propertyDoc.hasAC,
            heating: propertyDoc.hasHeating,
            storage: propertyDoc.hasStorage,
            furnished: false,
        },

        distances: {
            beach: propertyDoc.beachDistance,
            golf: propertyDoc.nearGolf,
        },

        descriptions: {
            sv: propertyDoc.description || '',
            en: '',
            es: ''
        },

        images: propertyDoc.images,

        dateUpdated: new Date(propertyDoc.updatedAt).toISOString(),
        dateListed: new Date(propertyDoc.createdAt).toISOString(),
    };

    return <PropertyDetails property={property} />;
}
