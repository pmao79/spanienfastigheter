import { AreaDetail } from '@/types/property';

export const ALICANTE_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 358608, year: 2024, source: 'INE' },
        foreignPercentage: { value: 15, source: 'Local Estimate' }, // City is lower than province (27%)
        swedesEstimate: { value: 1500, note: 'Utspridda i city/playan' },
        airportDistance: { km: 12, minutes: 20, airport: 'Alicante (ALC)' },
        pricePerM2: { value: 2435, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 19.3, january: 12.0, july: 27.0 }
    },
    districts: [
        {
            name: 'Playa San Juan',
            character: 'Modernt, exklusivt och strandnära. Som en egen stad i staden.',
            pricePerM2: 3424,
            suitableFor: ['Barnfamiljer', 'Strandälskare'],
            pros: ['Fantastisk 7km strand', 'Moderna lägenheter med pool', 'Spårvagn till city'],
            cons: ['Dyrare än centrum', 'Kan kännas lite "tomt" vintertid']
        },
        {
            name: 'Alicante Centrum (Centro/Mercado)',
            character: 'Stadspuls, saluhall, shopping och kultur.',
            pricePerM2: 3156,
            suitableFor: ['City-människor', 'Kulturintresserade'],
            pros: ['Gångavstånd till allt', 'Stort utbud av restauranger', 'Nära Postiguet-stranden'],
            cons: ['Biltrafik och ljud', 'Äldre fastigheter (ofta utan hiss)']
        },
        {
            name: 'Cabo de las Huertas',
            character: 'Stadens mest exklusiva område. Villor och klippbad.',
            pricePerM2: 3600,
            suitableFor: ['Livsnjutare', 'Investerare'],
            pros: ['Fantastiska vyer', 'Lugnt och privat', 'Nära naturen'],
            cons: ['Högt pris', 'Kräver oftast bil']
        },
        {
            name: 'Vistahermosa',
            character: 'Fint bostadsområde med villor och rymliga lägenheter.',
            pricePerM2: 2800,
            suitableFor: ['Familjer', 'De som vill ha yta'],
            pros: ['Bra skolor i närheten', 'Rymligt', 'Nära köpcentrum'],
            cons: ['Längre från citykärnan', 'Inte strandnära']
        }
    ],
    whySwedes: [
        'Direktflygen – Arlanda/Landvetter till Alicante på 3,5h och sen 15 min taxi till city.',
        'Kombinationen av äkta spansk storstadspuls och strandliv (Postiguet/San Juan).',
        'Prisnivån – du får mycket mer för pengarna här än i Malaga eller Barcelona.',
        'Det fantastiska klimatet med mildare vintrar än inåt landet.'
    ],
    notSuitableFor: [
        'Den som söker total tystnad (det är en storstad).',
        'De som vill bo i en "svenskby" (här bor man bland spanjorer).',
        'Personer som vill ha gångavstånd till golfbanan (banorna ligger i utkanten).',
        'Den som vill ha en stor trädgård mitt i stan (då krävs villa i utkanten).'
    ],
    market: {
        priceChange5Year: 16.4,
        rentalYield: 6.3,
        touristLicenseAvailable: true, // Varies by zone, but generally yes
        typicalPrices: {
            studio: { min: 120000, max: 180000 },
            twoRoom: { min: 180000, max: 300000 },
            threeRoom: { min: 250000, max: 450000 },
            townhouse: { min: 350000, max: 600000 },
            villa: { min: 600000, max: 2000000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 17, stockholmTemp: -2, difference: 19 },
        { month: 'Apr', areaTemp: 20, stockholmTemp: 5, difference: 15 },
        { month: 'Jul', areaTemp: 30, stockholmTemp: 18, difference: 12, seaTemp: 26 },
        { month: 'Okt', areaTemp: 24, stockholmTemp: 8, difference: 16 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian, Ryanair', frequency: 'Flera dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Dagligen' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi 20 min (ca 25€). Flygbuss C6 går dygnet runt var 20:e minut (ca 4€).',
        nieInfo: 'Söks på Policia Nacional på Calle Campo de Mirra. Kräver tidsbokning (cita previa).',
        healthcare: 'Hospital General är det stora offentliga. Vithas Perpetuo Socorro är bra privat alternativ.',
        swedishServices: ['Svenska konsulatet ligger här', 'Svenska kyrkan (finns i Torrevieja)', 'Skandinaviska klubbar']
    },
    faq: [
        {
            question: 'Är Alicante bara en flygplatsstad?',
            answer: 'Nej, det har blivit en destination i sig själv med fantastiska restauranger, kultur och stränder.'
        },
        {
            question: 'Ska man bo i City eller Playa San Juan?',
            answer: 'City för puls, kultur och historia. Playa San Juan för moderna lägenheter, pool och strandliv.'
        },
        {
            question: 'Hur fungerar spårvagnen (TRAM)?',
            answer: 'Utmärkt! Den tar dig från city längs hela kusten upp till Benidorm och Denia. Billigt och smidigt.'
        },
        {
            question: 'Är det tryggt?',
            answer: 'Ja, Alicante är en mycket trygg stad, men som i alla städer ska man se upp för ficktjuvar i turiststråken.'
        },
        {
            question: 'Hur köper man bostad i Spanien?',
            answer: 'Steg-för-steg guide:\n\n1. Förberedelser (1-2 veckor)\n- Ansök om NIE-nummer (skattenummer)\n- Öppna spanskt bankkonto\n- Anlita svensk-talande mäklare\n\n2. Hitta bostad (2-8 veckor)\n- Besök fastigheter\n- Jämför priser och områden\n- Gör besiktning (rekommenderas)\n\n3. Förhandsavtal (1 vecka)\n- Skriva under förhandsavtal (contrato de arras)\n- Betala handpenning (10% av köpesumman)\n\n4. Slutavtal (4-8 veckor)\n- Notariebesök\n- Betala resterande summa + kostnader\n- Få nycklar!\n\nTotal tid: 2-4 månader från start till färdigt.'
        },
        {
            question: 'Vad kostar det att köpa en lägenhet i Spanien?',
            answer: 'Utöver köpesumman tillkommer följande kostnader:\n\nObligatoriska kostnader:\n- Stämpelskatt (ITP): 8-10% av köpesumman\n- Notariekostnader: 600-1 200 EUR\n- Registrering: 400-800 EUR\n- Juridisk rådgivning: 1 000-2 000 EUR\n\nTotalt: Räkna med 10-13% av köpesumman i tillkommande kostnader.\n\nExempel: Lägenhet för 150 000 EUR = 15 000-19 500 EUR i tillkommande kostnader.'
        },
        {
            question: 'Vilka skatter betalar man i Spanien?',
            answer: 'Vid köp:\n- Stämpelskatt (ITP): 8-10% (befintlig bostad)\n- Moms (IVA): 10% (nyproduktion)\n\nÅrliga skatter:\n- Fastighetsskatt (IBI): 200-600 EUR/år (beroende på taxeringsvärde)\n- Avfallsskatt: 50-150 EUR/år\n- Inkomstskatt (om uthyrning): 19-24% på hyresintäkter\n- Förmögenhetsskatt (IRNR): 19-24% på uppskattat hyresvärde (även om du inte hyr ut)\n\nSamfällighetsavgift (lägenheter):\n- 300-1 200 EUR/år (beroende på faciliteter)\n\nTotalt per år: 800-2 500 EUR för en genomsnittlig lägenhet.'
        },
        {
            question: 'Behöver man NIE-nummer för att köpa bostad i Spanien?',
            answer: 'Ja, NIE-nummer är OBLIGATORISKT för att köpa fastighet i Spanien.\n\nVad är NIE?\n- Número de Identificación de Extranjero\n- Spanskt skattenummer för utlänningar\n- Behövs för alla ekonomiska transaktioner\n\nHur får man NIE?\n1. Boka tid på spanska konsulatet i Sverige\n2. Fyll i ansökan (EX-15)\n3. Betala avgift (~10 EUR)\n4. Vänta 2-4 veckor\n\nEller: Ansök direkt i Spanien (snabbare, 1-2 dagar)'
        }
    ],
    comparison: [
        {
            area: 'Alicante City',
            slug: 'alicante',
            pricePerM2: 2435,
            character: 'Storstad & Strand',
            suitableFor: 'City-älskare'
        },
        {
            area: 'Málaga',
            slug: 'malaga',
            pricePerM2: 2819,
            character: 'Kultur & Lyx',
            suitableFor: 'Kulturintresserade'
        },
        {
            area: 'Valencia',
            slug: 'valencia',
            pricePerM2: 2639,
            character: 'Storstad & Park',
            suitableFor: 'Matälskare'
        },
        {
            area: 'Torrevieja',
            slug: 'torrevieja',
            pricePerM2: 1850,
            character: 'Svenskfavorit',
            suitableFor: 'Budget/Sol'
        }
    ]
};
