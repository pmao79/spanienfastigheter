export type PropertyType =
    | 'Apartment'
    | 'Villa'
    | 'Townhouse'
    | 'Penthouse'
    | 'Bungalow'
    | 'Plot';

export type EnergyRating = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export interface PropertyFeatures {
    pool: 'private' | 'communal' | 'none';
    parking: boolean;
    parkingSpaces?: number;
    elevator: boolean;
    garden: boolean;
    gated: boolean;
    terrace: boolean;
    airConditioning: boolean;
    heating: boolean;
    storage: boolean;
    furnished: boolean;
}

export interface PropertyDistances {
    beach?: number; // meters
    golf?: boolean;
    schools?: boolean;
    commercialCenter?: boolean;
}

export interface PropertyDescriptions {
    sv: string;
    en: string;
    es: string;
}

export interface Property {
    id: string;
    ref: string;
    slug: string;

    // Price
    price: number;
    currency: 'EUR';

    // Type and status
    type: PropertyType;
    title: string;
    isNewBuild: boolean;

    // Location
    town: string;
    province: string;
    country: string;
    locationDetail?: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    region: 'costa-blanca' | 'costa-del-sol';

    // Specifications
    beds: number;
    baths: number;
    builtArea: number;
    plotArea?: number;
    terraceArea?: number;

    // Energy
    energyRating?: EnergyRating;

    // Features
    features: PropertyFeatures;

    // Distances
    distances: PropertyDistances;

    // Descriptions (per language)
    descriptions: PropertyDescriptions;

    // Images
    images: string[];
    floorPlanImage?: string;

    // Metadata
    dateUpdated: string;
    dateListed: string;
}

// Province to region mapping
export const PROVINCE_TO_REGION: Record<
    string,
    'costa-blanca' | 'costa-del-sol'
> = {
    Alicante: 'costa-blanca',
    Murcia: 'costa-blanca',
    Málaga: 'costa-del-sol',
    Granada: 'costa-del-sol',
    Cádiz: 'costa-del-sol',
};

// Area type for generated areas
export interface Area {
    slug: string;
    name: string;
    region: 'costa-blanca' | 'costa-del-sol';
    province: string;
    propertyCount: number;
    priceRange: { min: number; max: number };
    avgPrice: number;
    image?: string;
    description?: string;
}
