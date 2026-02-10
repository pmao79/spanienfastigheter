export function translatePropertyType(type: string): string {
    const normalized = (type || '').trim();
    if (!normalized) return type;
    const key = normalized.toLowerCase();
    const map: Record<string, string> = {
        apartment: 'Lägenhet',
        villa: 'Villa',
        bungalow: 'Bungalow',
        townhouse: 'Radhus',
        'town house': 'Radhus',
        penthouse: 'Takvåning',
        studio: 'Studio',
        plot: 'Tomt',
        'quad house': 'Quad hus',
        quad: 'Quad hus',
        quadhouse: 'Quad hus',
    };
    return map[key] || normalized;
}
