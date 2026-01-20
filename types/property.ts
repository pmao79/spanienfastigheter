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

// Extended Area type for SEO-rich area pages
export interface AreaDetail extends Area {
    // SEO fields
    headline: string;
    metaDescription: string;
    keywords: string[];

    // Location
    coordinates: {
        lat: number;
        lng: number;
    };

    // Content sections
    content: {
        intro: string;
        lifestyle: string;
        climate: string;
        attractions: string;
        transport: string;
        propertyMarket: string;
        buyingTips: string;
    };

    // Highlights
    highlights: {
        icon: string;
        title: string;
        description: string;
    }[];

    // Related areas (slugs)
    relatedAreas: string[];

    // Gallery images
    galleryImages: string[];

    // === NEW SEO-RICH FIELDS ===

    // Quick facts with sources
    quickFacts?: {
        population?: { value: number; year: number; source: string };
        foreignPercentage?: { value: number; source: string };
        swedesEstimate?: { value: number; note: string };
        airportDistance?: { km: number; minutes: number; airport: string };
        directFlights?: { airlines: string[]; frequencyPerWeek: number };
        pricePerM2?: { value: number; source: string; year: number };
        sunshineHours?: { value: number };
        averageTemp?: { annual: number; january: number; july: number };
    };

    // Districts/neighborhoods
    districts?: {
        name: string;
        character: string;
        pricePerM2: number;
        suitableFor: string[];
        pros: string[];
        cons: string[];
    }[];

    // Why Swedes choose this area
    whySwedes?: string[];

    // Market data
    market?: {
        priceChange5Year: number; // percentage
        rentalYield: number; // percentage
        touristLicenseAvailable: boolean;
        typicalPrices: {
            studio: { min: number; max: number };
            twoRoom: { min: number; max: number };
            threeRoom: { min: number; max: number };
            townhouse: { min: number; max: number };
            villa: { min: number; max: number };
        };
    };

    // Climate comparison with Stockholm
    climateComparison?: {
        month: string;
        areaTemp: number;
        stockholmTemp: number;
        difference: number;
        seaTemp?: number;
    }[];

    // Practical info for Swedes
    practical?: {
        flights: { from: string; airline: string; frequency: string }[];
        airportTransfer: string;
        nieInfo: string;
        healthcare: string;
        swedishServices: string[];
    };

    // Lifestyle
    lifestyle?: {
        beaches: { name: string; type: string; features: string }[];
        golfCourses: { name: string; distance: string }[];
        restaurants: string;
        nightlife: string;
        activities: string[];
    };

    // FAQ for schema markup
    faq?: {
        question: string;
        answer: string;
    }[];

    // Comparison with nearby areas
    comparison?: {
        area: string;
        slug: string;
        pricePerM2: number;
        character: string;
        suitableFor: string;
    }[];

    // Honest assessment
    notSuitableFor?: string[];
}

// Research data from Perplexity
export interface AreaResearch {
    areaName: string;
    researchDate: string;
    population?: string;
    prices?: string;
    scandinavians?: string;
    neighborhoods?: string;
    climate?: string;
    transport?: string;
    healthcare?: string;
    market?: string;
    lifestyle?: string;
    comparison?: string;
    sources: string[];
}

