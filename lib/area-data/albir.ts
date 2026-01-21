import { AreaDetail } from '@/types/property';

export const ALBIR_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 9500, year: 2024, source: 'INE (Albir del)' },
        foreignPercentage: { value: 50, source: 'Local Registry' },
        swedesEstimate: { value: 4000, note: 'Kallas "Lilla Norge", men mycket stor svensk koloni också' },
        airportDistance: { km: 63, minutes: 45, airport: 'Alicante (ALC)' },
        pricePerM2: { value: 3165, source: 'Ideaista', year: 2025 },
        sunshineHours: { value: 3000 },
        averageTemp: { annual: 18.5, january: 12.0, july: 26.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Albir Strand / Promenade',
            character: 'Platt & Tillgängligt',
            pricePerM2: 3800,
            suitableFor: ['Pensionärer', 'Rörelsehindrade', 'Semesterfirare'],
            pros: ['Helt platt terräng (unikt för kusten)', 'Pablossom "Paseo de las Estrellas"', 'Blå flagg-strand'],
            cons: ['Stenstrand (badskor krävs)', 'Mycket folk på sommaren', 'Svårt att parkera'],
            coordinates: { lat: 38.5739, lng: 0.0678 }
        },
        {
            name: 'Albir Centrum / Boulevard',
            character: 'Service & Bostad',
            pricePerM2: 3200,
            suitableFor: ['Året-runt-boende', 'Barnfamiljer', 'Bekvämlighetssökare'],
            pros: ['Gångavstånd till allt (bank, vård, mat)', 'Levande året runt', 'Tryggt och välskött'],
            cons: ['Stadsljud', 'Färre bostäder med havsutsikt'],
            coordinates: { lat: 38.5685, lng: 0.0655 }
        },
        {
            name: 'Sierra Helada-sidan',
            character: 'Utsikt & Natur',
            pricePerM2: 4000,
            suitableFor: ['Utsiktsjägare', 'Vandrare', 'Lyxsökare'],
            pros: ['Fantastisk utsikt över bukten', 'Lugnt villaområde', 'Direkt access till naturparken'],
            cons: ['Brantare (bil kan behövas)', 'Längre till service'],
            coordinates: { lat: 38.5630, lng: 0.0710 }
        }
    ],
    whySwedes: [
        'Tillgängligheten: Det platta landskapet gör det idealiskt för promenader, cykling och för äldre.',
        'Den nordiska gemenskapen: Här finns nordiska läkare, tandläkare, butiker och klubbar i varje hörn.',
        'Tryggheten: Albir är känt som en mycket lugn, ren och säker ort utan stökigt nattliv.',
        'Naturen: Fyren i Albir (Faro del Albir) är en av kustens vackraste och mest tillgängliga vandringar.'
    ],
    notSuitableFor: [
        'De som vill ha sandstrand (Albir har runda stenar, vilket dock ger kristallklart vatten).',
        'Partysökare (här råder lugnet, nattklubbar finns i Benidorm 10 min bort).',
        'De som söker "budgetkapet" (priserna är höga på grund av den stora efterfrågan).'
    ],
    market: {
        priceChange5Year: 18.5,
        rentalYield: 5.0,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 130000, max: 160000 },
            twoRoom: { min: 240000, max: 320000 },
            threeRoom: { min: 360000, max: 500000 },
            townhouse: { min: 420000, max: 650000 },
            villa: { min: 750000, max: 2800000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 12, stockholmTemp: -2, difference: 14 },
        { month: 'Apr', areaTemp: 18, stockholmTemp: 5, difference: 13 },
        { month: 'Jul', areaTemp: 26, stockholmTemp: 18, difference: 8, seaTemp: 26 },
        { month: 'Okt', areaTemp: 21, stockholmTemp: 8, difference: 13 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Direktbuss till Alicante flygplats (Beniconnect). Taxi ca 65€.',
        nieInfo: 'Söks hos Policia Nacional i Benidorm.',
        healthcare: 'Clinica Albir (privat) har nordiska läkare. Sjukhus (IMED) i Benidorm (10 min).',
        swedishServices: ['Svenska Skolan Costa Blanca (Alfaz, 8 min)', 'Norska Sjömanskyrkan', 'Flera svenska mäklare']
    },
    faq: [
        {
            question: 'Är det bara norskar?',
            answer: 'Det kallas "Lilla Norge", men det finns en mycket stor och aktiv svensk grupp också, samt britter och holländare.'
        },
        {
            question: 'Kan man dricka kranvattnet?',
            answer: 'Ja, men smaken kan vara kloraktig så många väljer filter eller flaskvatten.'
        },
        {
            question: 'Hur är vintern?',
            answer: 'Albir lever året runt. Tack vare den stora bofasta befolkningen stänger nästan ingenting ner.'
        },
        {
            question: 'Måste man ha bil?',
            answer: 'Nej, Albir är en av få orter där du klarar dig utmärkt utan bil tack vare det platta läget och bra bussar.'
        }
    ],
    comparison: [
        {
            area: 'Albir',
            slug: 'albir',
            pricePerM2: 3165,
            character: 'Platt, Nordiskt',
            suitableFor: 'Bekvämlighet'
        },
        {
            area: 'Altea',
            slug: 'altea',
            pricePerM2: 3100,
            character: 'Konst, Backigt',
            suitableFor: 'Esteter'
        },
        {
            area: 'Benidorm',
            slug: 'benidorm',
            pricePerM2: 2700,
            character: 'Skyskrapor, Puls',
            suitableFor: 'Stadsmänniskor'
        },
        {
            area: 'Calpe',
            slug: 'calpe',
            pricePerM2: 3350,
            character: 'Klippa, Cykling',
            suitableFor: 'Aktiva'
        }
    ]
};
