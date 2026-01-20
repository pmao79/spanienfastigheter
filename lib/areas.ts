import { Property, Area } from '@/types/property';

// Generate area slugs from town names
function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/å/g, 'a')
        .replace(/ä/g, 'a')
        .replace(/ö/g, 'o')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// Group properties by town and generate area data
export function generateAreasFromProperties(properties: Property[]): Area[] {
    const areaMap = new Map<
        string,
        {
            name: string;
            region: 'costa-blanca' | 'costa-del-sol';
            province: string;
            properties: Property[];
        }
    >();

    for (const property of properties) {
        const key = property.town.toLowerCase();

        if (!areaMap.has(key)) {
            areaMap.set(key, {
                name: property.town,
                region: property.region,
                province: property.province,
                properties: [],
            });
        }

        areaMap.get(key)!.properties.push(property);
    }

    return Array.from(areaMap.values())
        .map(({ name, region, province, properties }) => {
            const prices = properties.map((p) => p.price).sort((a, b) => a - b);
            const avgPrice = Math.round(
                prices.reduce((sum, p) => sum + p, 0) / prices.length
            );

            // Use first property's image as area image
            const image = properties.find((p) => p.images.length > 0)?.images[0];

            return {
                slug: slugify(name),
                name,
                region,
                province,
                propertyCount: properties.length,
                priceRange: {
                    min: prices[0] || 0,
                    max: prices[prices.length - 1] || 0,
                },
                avgPrice,
                image,
            };
        })
        .sort((a, b) => b.propertyCount - a.propertyCount); // Sort by property count
}

// Get areas grouped by region
export function getAreasByRegion(areas: Area[]): {
    'costa-blanca': Area[];
    'costa-del-sol': Area[];
} {
    return {
        'costa-blanca': areas.filter((a) => a.region === 'costa-blanca'),
        'costa-del-sol': areas.filter((a) => a.region === 'costa-del-sol'),
    };
}

// Get area by slug
export function getAreaBySlug(
    areas: Area[],
    slug: string
): Area | undefined {
    return areas.find((a) => a.slug === slug);
}

// Filter properties by area
export function getPropertiesByArea(
    properties: Property[],
    areaSlug: string
): Property[] {
    return properties.filter(
        (p) => slugify(p.town) === areaSlug
    );
}

// Filter properties by region
export function getPropertiesByRegion(
    properties: Property[],
    region: 'costa-blanca' | 'costa-del-sol'
): Property[] {
    return properties.filter((p) => p.region === region);
}
