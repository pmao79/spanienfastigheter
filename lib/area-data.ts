import { AreaDetail } from '@/types/property';
import { COSTA_BLANCA_AREAS } from './area-data-costa-blanca';
import { COSTA_BLANCA_AREAS_2 } from './area-data-costa-blanca-2';
import { COSTA_DEL_SOL_AREAS } from './area-data-costa-del-sol';
import { COSTA_DEL_SOL_AREAS_2 } from './area-data-costa-del-sol-2';

import { TORREVIEJA_ENHANCED_DATA } from './area-data/torrevieja';
import { BENIDORM_ENHANCED_DATA } from './area-data/benidorm';
import { MARBELLA_ENHANCED_DATA } from './area-data/marbella';
import { NERJA_ENHANCED_DATA } from './area-data/nerja';
import { ORIHUELA_COSTA_ENHANCED_DATA } from './area-data/orihuela-costa';
import { ALICANTE_ENHANCED_DATA } from './area-data/alicante';
import { MORAIRA_ENHANCED_DATA } from './area-data/moraira';
import { FUENGIROLA_ENHANCED_DATA } from './area-data/fuengirola';
import { GUARDAMAR_ENHANCED_DATA } from './area-data/guardamar';
import { SANTA_POLA_ENHANCED_DATA } from './area-data/santa-pola';
import { JAVEA_ENHANCED_DATA } from './area-data/javea';
import { CALPE_ENHANCED_DATA } from './area-data/calpe';
import { DENIA_ENHANCED_DATA } from './area-data/denia';
import { ALTEA_ENHANCED_DATA } from './area-data/altea';
import { VILLAJOYOSA_ENHANCED_DATA } from './area-data/villajoyosa';
import { LA_ZENIA_ENHANCED_DATA } from './area-data/la-zenia';
import { FINESTRAT_ENHANCED_DATA } from './area-data/finestrat';
import { ALBIR_ENHANCED_DATA } from './area-data/albir';
import { EL_CAMPELLO_ENHANCED_DATA } from './area-data/el-campello';
import { ALFAZ_DEL_PI_ENHANCED_DATA } from './area-data/alfaz-del-pi';
import { ROJALES_ENHANCED_DATA } from './area-data/rojales';
import { PLAYA_SAN_JUAN_ENHANCED_DATA } from './area-data/playa-san-juan';
import { CIUDAD_QUESADA_ENHANCED_DATA } from './area-data/ciudad-quesada';
import { ESTEPONA_ENHANCED_DATA } from './area-data/estepona';
import { SAN_PEDRO_ENHANCED_DATA } from './area-data/san-pedro-de-alcantara';
import { PUERTO_BANUS_ENHANCED_DATA } from './area-data/puerto-banus';
import { MIJAS_ENHANCED_DATA } from './area-data/mijas';
import { BENALMADENA_ENHANCED_DATA } from './area-data/benalmadena';
import { TORREMOLINOS_ENHANCED_DATA } from './area-data/torremolinos';
import { MALAGA_ENHANCED_DATA } from './area-data/malaga';
import { TORROX_ENHANCED_DATA } from './area-data/torrox';
import { RINCON_ENHANCED_DATA } from './area-data/rincon-de-la-victoria';
import { MANILVA_ENHANCED_DATA } from './area-data/manilva';
import { CASARES_ENHANCED_DATA } from './area-data/casares';
import { SOTOGRANDE_ENHANCED_DATA } from './area-data/sotogrande';
import { NUEVA_ANDALUCIA_ENHANCED_DATA } from './area-data/nueva-andalucia';
import { VELEZ_MALAGA_ENHANCED_DATA } from './area-data/velez-malaga';

// Combined area data
export const ALL_COSTA_BLANCA_AREAS: AreaDetail[] = [
    ...COSTA_BLANCA_AREAS,
    ...COSTA_BLANCA_AREAS_2
];

export const ALL_COSTA_DEL_SOL_AREAS: AreaDetail[] = [
    ...COSTA_DEL_SOL_AREAS,
    ...COSTA_DEL_SOL_AREAS_2
];

export const ALL_AREAS: AreaDetail[] = [
    ...ALL_COSTA_BLANCA_AREAS,
    ...ALL_COSTA_DEL_SOL_AREAS
];

// Get area by slug
export function getAreaDetailBySlug(slug: string): AreaDetail | undefined {
    const area = ALL_AREAS.find(area => area.slug === slug);
    if (!area) return undefined;

    if (slug === 'torrevieja') {
        return { ...area, ...TORREVIEJA_ENHANCED_DATA };
    }
    if (slug === 'benidorm') {
        return { ...area, ...BENIDORM_ENHANCED_DATA };
    }
    if (slug === 'marbella') {
        return { ...area, ...MARBELLA_ENHANCED_DATA };
    }
    if (slug === 'nerja') {
        return { ...area, ...NERJA_ENHANCED_DATA };
    }
    if (slug === 'costa-blanca/orihuela-costa' || slug === 'orihuela-costa') {
        return { ...area, ...ORIHUELA_COSTA_ENHANCED_DATA };
    }
    if (slug === 'alicante') {
        return { ...area, ...ALICANTE_ENHANCED_DATA };
    }
    if (slug === 'moraira') {
        return { ...area, ...MORAIRA_ENHANCED_DATA };
    }
    if (slug === 'fuengirola') {
        return { ...area, ...FUENGIROLA_ENHANCED_DATA };
    }
    if (slug === 'guardamar') {
        return { ...area, ...GUARDAMAR_ENHANCED_DATA };
    }
    if (slug === 'santa-pola') {
        return { ...area, ...SANTA_POLA_ENHANCED_DATA };
    }
    if (slug === 'javea') {
        return { ...area, ...JAVEA_ENHANCED_DATA };
    }
    if (slug === 'calpe') {
        return { ...area, ...CALPE_ENHANCED_DATA };
    }
    if (slug === 'denia') {
        return { ...area, ...DENIA_ENHANCED_DATA };
    }
    if (slug === 'altea') {
        return { ...area, ...ALTEA_ENHANCED_DATA };
    }
    if (slug === 'villajoyosa') {
        return { ...area, ...VILLAJOYOSA_ENHANCED_DATA };
    }
    if (slug === 'la-zenia') {
        return { ...area, ...LA_ZENIA_ENHANCED_DATA };
    }
    if (slug === 'finestrat') {
        return { ...area, ...FINESTRAT_ENHANCED_DATA };
    }
    if (slug === 'albir') {
        return { ...area, ...ALBIR_ENHANCED_DATA };
    }
    if (slug === 'el-campello') {
        return { ...area, ...EL_CAMPELLO_ENHANCED_DATA };
    }
    if (slug === 'alfaz-del-pi') {
        return { ...area, ...ALFAZ_DEL_PI_ENHANCED_DATA };
    }
    if (slug === 'rojales') {
        return { ...area, ...ROJALES_ENHANCED_DATA };
    }
    if (slug === 'playa-san-juan') {
        return { ...area, ...PLAYA_SAN_JUAN_ENHANCED_DATA };
    }
    if (slug === 'ciudad-quesada') {
        return { ...area, ...CIUDAD_QUESADA_ENHANCED_DATA };
    }
    if (slug === 'estepona') {
        return { ...area, ...ESTEPONA_ENHANCED_DATA };
    }
    if (slug === 'san-pedro-de-alcantara') {
        return { ...area, ...SAN_PEDRO_ENHANCED_DATA };
    }
    if (slug === 'puerto-banus') {
        return { ...area, ...PUERTO_BANUS_ENHANCED_DATA };
    }
    if (slug === 'mijas') {
        return { ...area, ...MIJAS_ENHANCED_DATA };
    }
    if (slug === 'benalmadena') {
        return { ...area, ...BENALMADENA_ENHANCED_DATA };
    }
    if (slug === 'torremolinos') {
        return { ...area, ...TORREMOLINOS_ENHANCED_DATA };
    }
    if (slug === 'malaga') {
        return { ...area, ...MALAGA_ENHANCED_DATA };
    }
    if (slug === 'torrox') {
        return { ...area, ...TORROX_ENHANCED_DATA };
    }
    if (slug === 'rincon-de-la-victoria') {
        return { ...area, ...RINCON_ENHANCED_DATA };
    }
    if (slug === 'manilva') {
        return { ...area, ...MANILVA_ENHANCED_DATA };
    }
    if (slug === 'casares') {
        return { ...area, ...CASARES_ENHANCED_DATA };
    }
    if (slug === 'sotogrande') {
        return { ...area, ...SOTOGRANDE_ENHANCED_DATA };
    }
    if (slug === 'nueva-andalucia') {
        return { ...area, ...NUEVA_ANDALUCIA_ENHANCED_DATA };
    }
    if (slug === 'velez-malaga') {
        return { ...area, ...VELEZ_MALAGA_ENHANCED_DATA };
    }

    return area;
}

// Get areas by region
export function getAreaDetailsByRegion(region: 'costa-blanca' | 'costa-del-sol'): AreaDetail[] {
    return region === 'costa-blanca' ? ALL_COSTA_BLANCA_AREAS : ALL_COSTA_DEL_SOL_AREAS;
}

// Get related areas for an area
export function getRelatedAreas(areaSlug: string, limit: number = 4): AreaDetail[] {
    const area = getAreaDetailBySlug(areaSlug);
    if (!area) return [];

    return area.relatedAreas
        .map(slug => getAreaDetailBySlug(slug))
        .filter((a): a is AreaDetail => a !== undefined)
        .slice(0, limit);
}

// Get all area slugs for static generation
export function getAllAreaSlugs(): { region: string; area: string }[] {
    return ALL_AREAS.map(area => ({
        region: area.region,
        area: area.slug
    }));
}

// Search areas by keyword
export function searchAreas(query: string): AreaDetail[] {
    const lowerQuery = query.toLowerCase();
    return ALL_AREAS.filter(area =>
        area.name.toLowerCase().includes(lowerQuery) ||
        area.description?.toLowerCase().includes(lowerQuery) ||
        area.keywords.some(k => k.toLowerCase().includes(lowerQuery))
    );
}

// Get featured areas (top areas by property count per region)
export function getFeaturedAreas(limit: number = 4): { costaBlanca: AreaDetail[]; costaDelSol: AreaDetail[] } {
    return {
        costaBlanca: ALL_COSTA_BLANCA_AREAS
            .sort((a, b) => b.propertyCount - a.propertyCount)
            .slice(0, limit),
        costaDelSol: ALL_COSTA_DEL_SOL_AREAS
            .sort((a, b) => b.propertyCount - a.propertyCount)
            .slice(0, limit)
    };
}

// Get total statistics
export function getAreaStats() {
    return {
        totalAreas: ALL_AREAS.length,
        costaBlancaCount: ALL_COSTA_BLANCA_AREAS.length,
        costaDelSolCount: ALL_COSTA_DEL_SOL_AREAS.length,
        totalProperties: ALL_AREAS.reduce((sum, a) => sum + a.propertyCount, 0),
        avgPrice: Math.round(
            ALL_AREAS.reduce((sum, a) => sum + a.avgPrice, 0) / ALL_AREAS.length
        )
    };
}
