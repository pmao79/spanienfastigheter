import { XMLParser } from 'fast-xml-parser';
import {
    Property,
    PropertyType,
    EnergyRating,
    PROVINCE_TO_REGION,
} from '@/types/property';

// Raw XML types from Kyero v3 feed
interface KyeroImage {
    url: string;
    tags?: { tag: string | string[] };
}

interface KyeroProperty {
    id: string;
    date: string;
    ref: string;
    price: number;
    currency: string;
    price_freq: string;
    new_build: number | string;
    type: string;
    town: string;
    province: string;
    country: string;
    location?: {
        latitude: number;
        longitude: number;
    };
    location_detail?: string;
    beds: number;
    baths: number;
    pool?: number | string;
    surface_area?: {
        built?: number;
        plot?: number;
    };
    energy_rating?: {
        consumption?: string;
        emissions?: string;
    };
    desc?: {
        en?: string;
        es?: string;
        sv?: string;
        [key: string]: string | undefined;
    };
    features?: {
        feature: string | string[];
    };
    images?: {
        image: KyeroImage | KyeroImage[];
    };
}

interface KyeroFeed {
    root: {
        kyero: { feed_version: number };
        property: KyeroProperty | KyeroProperty[];
    };
}

// Helper to slugify property titles
function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/å/g, 'a')
        .replace(/ä/g, 'a')
        .replace(/ö/g, 'o')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// Parse features array into our structured format
function parseFeatures(features?: { feature: string | string[] }) {
    const featureList = features?.feature
        ? Array.isArray(features.feature)
            ? features.feature
            : [features.feature]
        : [];

    const parsed = {
        pool: 'none' as 'private' | 'communal' | 'none',
        parking: false,
        parkingSpaces: undefined as number | undefined,
        elevator: false,
        garden: false,
        gated: false,
        terrace: false,
        terraceArea: undefined as number | undefined,
        airConditioning: false,
        heating: false,
        storage: false,
        furnished: false,
    };

    const distances = {
        beach: undefined as number | undefined,
        golf: false,
        schools: false,
        commercialCenter: false,
    };

    for (const feature of featureList) {
        const lower = feature.toLowerCase();

        // Pool
        if (lower.includes('private pool') || lower === 'pool') {
            parsed.pool = 'private';
        } else if (lower.includes('communal pool')) {
            parsed.pool = 'communal';
        }

        // Parking
        if (lower.includes('parking')) {
            parsed.parking = true;
            const match = feature.match(/number of parking spaces:\s*(\d+)/i);
            if (match) parsed.parkingSpaces = parseInt(match[1]);
        }

        // Other features
        if (lower.includes('elevator') || lower.includes('lift'))
            parsed.elevator = true;
        if (lower.includes('garden')) parsed.garden = true;
        if (lower.includes('gated')) parsed.gated = true;
        if (lower.includes('terrace')) {
            parsed.terrace = true;
            const match = feature.match(/terrace:\s*(\d+)/i);
            if (match) parsed.terraceArea = parseInt(match[1]);
        }
        if (lower.includes('air con')) parsed.airConditioning = true;
        if (lower.includes('heating')) parsed.heating = true;
        if (lower.includes('storage') || lower.includes('trastero'))
            parsed.storage = true;
        if (lower.includes('furnished')) parsed.furnished = true;

        // Distances
        const beachMatch = feature.match(/beach:\s*(\d+)\s*meters?/i);
        if (beachMatch) distances.beach = parseInt(beachMatch[1]);
        if (lower.includes('golf')) distances.golf = true;
        if (lower.includes('school')) distances.schools = true;
        if (lower.includes('commercial')) distances.commercialCenter = true;
    }

    return { features: parsed, distances };
}

// Parse images and extract floorplan
function parseImages(images?: { image: KyeroImage | KyeroImage[] }) {
    if (!images?.image) return { images: [], floorPlanImage: undefined };

    const imageList = Array.isArray(images.image)
        ? images.image
        : [images.image];

    const regularImages: string[] = [];
    let floorPlanImage: string | undefined;

    for (const img of imageList) {
        const tags = img.tags?.tag
            ? Array.isArray(img.tags.tag)
                ? img.tags.tag
                : [img.tags.tag]
            : [];

        if (tags.includes('floorplan')) {
            floorPlanImage = img.url;
        } else {
            regularImages.push(img.url);
        }
    }

    return { images: regularImages, floorPlanImage };
}

// Map property type from feed to our types
function mapPropertyType(type: string): PropertyType {
    const typeMap: Record<string, PropertyType> = {
        apartment: 'Apartment',
        villa: 'Villa',
        townhouse: 'Townhouse',
        penthouse: 'Penthouse',
        bungalow: 'Bungalow',
        plot: 'Plot',
        // Add more mappings as needed
    };

    return typeMap[type.toLowerCase()] || 'Apartment';
}

// Clean description text
function cleanDescription(text?: string): string {
    if (!text) return '';
    return text
        .replace(/&#13;/g, '\n') // Replace XML entity newlines
        .replace(/\r\n/g, '\n') // Standardize mixed newlines
        .replace(/\n\s*\n/g, '\n\n') // Ensure max 2 newlines
        .replace(/<br\s*\/?>/gi, '\n') // Convert html breaks
        .trim();
}

// Convert raw Kyero property to our Property type
function convertProperty(raw: KyeroProperty): Property {
    const { features, distances } = parseFeatures(raw.features);
    const { images, floorPlanImage } = parseImages(raw.images);

    // Determine region from province
    const region =
        PROVINCE_TO_REGION[raw.province] ||
        (raw.province.toLowerCase().includes('alicante')
            ? 'costa-blanca'
            : 'costa-del-sol');

    const propertyType = mapPropertyType(raw.type);
    const title = `${propertyType} i ${raw.town}`;
    const slug = slugify(`${raw.ref}-${propertyType}-${raw.town}`);

    return {
        id: raw.id,
        ref: raw.ref,
        slug,
        price: raw.price,
        currency: 'EUR',
        type: propertyType,
        title,
        isNewBuild: raw.new_build === 1 || raw.new_build === '1',
        town: raw.town,
        province: raw.province,
        country: raw.country || 'Spain',
        locationDetail: raw.location_detail,
        coordinates: {
            lat: raw.location?.latitude || 0,
            lng: raw.location?.longitude || 0,
        },
        region,
        beds: raw.beds || 0,
        baths: raw.baths || 0,
        builtArea: raw.surface_area?.built || 0,
        plotArea: raw.surface_area?.plot,
        terraceArea: features.terraceArea,
        energyRating: (raw.energy_rating?.consumption ||
            undefined) as EnergyRating | undefined,
        features: {
            pool: features.pool,
            parking: features.parking,
            parkingSpaces: features.parkingSpaces,
            elevator: features.elevator,
            garden: features.garden,
            gated: features.gated,
            terrace: features.terrace,
            airConditioning: features.airConditioning,
            heating: features.heating,
            storage: features.storage,
            furnished: features.furnished,
        },
        distances,
        descriptions: {
            sv: cleanDescription(raw.desc?.sv || raw.desc?.en),
            en: cleanDescription(raw.desc?.en),
            es: cleanDescription(raw.desc?.es),
        },
        images,
        floorPlanImage,
        dateUpdated: raw.date,
        dateListed: raw.date,
    };
}

// Parse XML string to Property array
export function parseKyeroXml(xmlString: string): Property[] {
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
        textNodeName: '#text',
        parseTagValue: true,
        trimValues: true,
    });

    const parsed = parser.parse(xmlString) as KyeroFeed;

    const rawProperties = parsed.root.property;
    const properties = Array.isArray(rawProperties)
        ? rawProperties
        : [rawProperties];

    return properties.map(convertProperty);
}

// Fetch and parse XML from URL
export async function fetchProperties(): Promise<Property[]> {
    const feedUrl = process.env.XML_FEED_URL;

    if (!feedUrl) {
        const errorMsg = '❌ XML_FEED_URL environment variable is not set! Add it in Vercel Settings → Environment Variables';
        console.error(errorMsg);
        console.error('Expected variable: XML_FEED_URL=https://www.redsp.net/trial/trial-feed-kyero.xml');

        // In production, throw error to make problem visible
        if (process.env.NODE_ENV === 'production') {
            throw new Error(errorMsg);
        }
        return [];
    }

    try {
        console.log(`🔄 Fetching properties from: ${feedUrl}`);

        const response = await fetch(feedUrl, {
            next: { revalidate: 3600 }, // Cache for 1 hour
            headers: {
                'User-Agent': 'Spanienfastigheter/1.0',
            },
        });

        if (!response.ok) {
            const errorMsg = `❌ Failed to fetch XML feed: ${response.status} ${response.statusText}`;
            console.error(errorMsg);
            console.error('Feed URL:', feedUrl);
            throw new Error(errorMsg);
        }

        const xmlString = await response.text();
        console.log(`✅ XML fetched successfully (${xmlString.length} characters)`);

        const properties = parseKyeroXml(xmlString);
        console.log(`✅ Parsed ${properties.length} properties from XML feed`);

        return properties;
    } catch (error) {
        console.error('❌ Error fetching properties:', error);
        console.error('Feed URL:', feedUrl);
        console.error('Error details:', error instanceof Error ? error.message : String(error));

        // In production, throw the error to make it visible in Vercel logs
        if (process.env.NODE_ENV === 'production') {
            throw error;
        }

        return [];
    }
}

// Get property by slug
export async function getPropertyBySlug(
    slug: string
): Promise<Property | undefined> {
    const properties = await fetchProperties();
    return properties.find((p) => p.slug === slug);
}

// Get property by reference
export async function getPropertyByRef(
    ref: string
): Promise<Property | undefined> {
    const properties = await fetchProperties();
    return properties.find((p) => p.ref === ref);
}
