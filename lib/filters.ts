import { Property } from '@/types/property';

export interface FilterState {
    region?: 'costa-blanca' | 'costa-del-sol';
    priceMin?: number;
    priceMax?: number;
    beds?: number;
    baths?: number;
    type?: string;
    features?: {
        pool?: boolean;
        parking?: boolean;
        garden?: boolean;
        terrace?: boolean;
        newBuild?: boolean;
        seaView?: boolean;
    };
    sortBy?: 'price-asc' | 'price-desc' | 'date-desc' | 'beds-desc';
}

export function filterProperties(
    properties: Property[],
    filters: FilterState
): Property[] {
    let result = [...properties];

    // Region filter
    if (filters.region) {
        result = result.filter((p) => p.region === filters.region);
    }

    // Price range
    if (filters.priceMin !== undefined) {
        result = result.filter((p) => p.price >= filters.priceMin!);
    }
    if (filters.priceMax !== undefined) {
        result = result.filter((p) => p.price <= filters.priceMax!);
    }

    // Beds
    if (filters.beds !== undefined) {
        result = result.filter((p) => p.beds >= filters.beds!);
    }

    // Baths
    if (filters.baths !== undefined) {
        result = result.filter((p) => p.baths >= filters.baths!);
    }

    // Type
    if (filters.type) {
        result = result.filter(
            (p) => p.type.toLowerCase() === filters.type!.toLowerCase()
        );
    }

    // Features
    if (filters.features) {
        if (filters.features.pool) {
            result = result.filter((p) => p.features.pool !== 'none');
        }
        if (filters.features.parking) {
            result = result.filter((p) => p.features.parking);
        }
        if (filters.features.garden) {
            result = result.filter((p) => p.features.garden);
        }
        if (filters.features.terrace) {
            result = result.filter((p) => p.features.terrace);
        }
        if (filters.features.newBuild) {
            result = result.filter((p) => p.isNewBuild);
        }
    }

    // Sorting
    if (filters.sortBy) {
        switch (filters.sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'date-desc':
                result.sort(
                    (a, b) =>
                        new Date(b.dateUpdated).getTime() -
                        new Date(a.dateUpdated).getTime()
                );
                break;
            case 'beds-desc':
                result.sort((a, b) => b.beds - a.beds);
                break;
        }
    }

    return result;
}

// Parse URL search params to filter state
export function parseSearchParams(
    searchParams: Record<string, string | string[] | undefined>
): FilterState {
    const getString = (key: string): string | undefined => {
        const val = searchParams[key];
        return typeof val === 'string' ? val : undefined;
    };

    const getNumber = (key: string): number | undefined => {
        const val = getString(key);
        return val ? parseInt(val, 10) : undefined;
    };

    return {
        region: getString('region') as FilterState['region'],
        priceMin: getNumber('priceMin'),
        priceMax: getNumber('priceMax'),
        beds: getNumber('beds'),
        baths: getNumber('baths'),
        type: getString('type'),
        features: {
            pool: getString('pool') === 'true',
            parking: getString('parking') === 'true',
            garden: getString('garden') === 'true',
            terrace: getString('terrace') === 'true',
            newBuild: getString('newBuild') === 'true',
        },
        sortBy: getString('sortBy') as FilterState['sortBy'],
    };
}
