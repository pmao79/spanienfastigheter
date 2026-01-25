export const REGION_MAPPING: Record<string, string[]> = {
    "Costa Blanca": [
        "Alicante",
        "Torrevieja",
        "Orihuela",
        "Orihuela Costa",
        "Guardamar del Segura",
        "San Fulgencio",
        "Benidorm",
        "Altea",
        "Calpe",
        "Jávea",
        "Dénia",
        "Villajoyosa",
        "El Campello",
        "Santa Pola",
        "Pilar de la Horadada",
        "Rojales",
        "Ciudad Quesada",
        "Finestrat",
        "Benissa",
        "Moraira",
        "Alfep", // Alfaz del Pi matches?
        "L'Alfàs del Pi",
        "Polop",
        "La Nucia",
    ],
    "Costa del Sol": [
        "Málaga",
        "Mijas",
        "Marbella",
        "Fuengirola",
        "Estepona",
        "Benalmádena",
        "Nerja",
        "Torremolinos",
        "Manilva",
        "Casares",
        "Rincón de la Victoria",
        "Vélez-Málaga",
        "Torre del Mar",
        "Benahavís",
        "San Pedro de Alcántara",
        "Puerto Banús",
        "Nueva Andalucía",
        "Sotogrande", // technically Cadiz but often grouped here
    ],
    "Costa Cálida": [
        "Murcia",
        "San Pedro del Pinatar",
        "Cartagena",
        "La Manga del Mar Menor",
        "Mazarrón",
        "Águilas",
        "Los Alcázares",
        "San Javier",
        "Torre-Pacheco",
        "Balsicas",
        "Sucina",
    ],
    "Costa de Almería": [
        "Almería",
        "Mojácar",
        "Roquetas de Mar",
        "Vera",
        "Garrucha",
        "Cuevas del Almanzora",
        "Carboneras",
        "Pulpi",
        "San Juan de los Terreros",
    ],
};

export const PROVINCE_MAPPING: Record<string, string> = {
    "Alicante": "Costa Blanca",
    "Málaga": "Costa del Sol",
    "Murcia": "Costa Cálida",
    "Almería": "Costa de Almería",
};

export function getRegion(province: string, town: string): string {
    // First try to match specific towns if they are special cases or override province
    // But mostly province is the main driver
    if (PROVINCE_MAPPING[province]) {
        return PROVINCE_MAPPING[province];
    }

    // Inconsistent data fallback: check if town belongs to a known region list
    for (const [region, towns] of Object.entries(REGION_MAPPING)) {
        if (towns.includes(town)) {
            return region;
        }
    }

    return "Other";
}
