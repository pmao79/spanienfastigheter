export function translatePropertyType(type: string): string {
    const map: Record<string, string> = {
        'Apartment': 'Lägenhet',
        'Villa': 'Villa',
        'Bungalow': 'Bungalow',
        'Townhouse': 'Radhus',
        'Penthouse': 'Takvåning',
        'Studio': 'Studio',
        'Plot': 'Tomt',
    };
    return map[type] || type;
}
