import { AreaDetail } from '@/types/property';

export const TORREMOLINOS_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 74000, year: 2024, source: 'INE' },
        foreignPercentage: { value: 24, source: 'Estimate' },
        swedesEstimate: { value: 800, note: 'Många deltidsboende' },
        airportDistance: { km: 7, minutes: 10, airport: 'Malaga (AGP)' },
        pricePerM2: { value: 2900, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3250 },
        averageTemp: { annual: 19.8, january: 14.0, july: 27.5 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'La Carihuela',
            character: 'Charm & Strand',
            pricePerM2: 3800,
            suitableFor: ['Strandälskare', 'Matgourmeter', 'Semesterfirare'],
            pros: ['Det gamla fiskarkvarteret är fullt av charm', 'Kustens bästa fiskrestauranger', 'Inga backar (vid stranden)'],
            cons: ['Mycket turister på sommaren', 'Kan vara dyrt för att vara Torremolinos'],
            coordinates: { lat: 36.6250, lng: -4.4920 }
        },
        {
            name: 'El Bajondillo',
            character: 'Centralt & Strand',
            pricePerM2: 3400,
            suitableFor: ['Turister', 'Uthyrning', 'De som vill ha nära till allt'],
            pros: ['Ligger precis nedanför centrum (hissen går hit)', 'Lång och bred strandpromenad', 'Nära till allt'],
            cons: ['Mycket hotell och turism', 'Livligt på sommaren'],
            coordinates: { lat: 36.6200, lng: -4.4980 }
        },
        {
            name: 'Centrum (Calle San Miguel)',
            character: 'Puls & Stad',
            pricePerM2: 2600,
            suitableFor: ['Året-runt-boende', 'Par', 'De som gillar stadsliv'],
            pros: ['Gågator med butiker och liv året runt', 'Tågstationen ligger mitt i', 'Prisvärt'],
            cons: ['Ingen havsutsikt (om man inte bor högt)', 'Lite betongkänsla i vissa delar'],
            coordinates: { lat: 36.6240, lng: -4.5010 }
        },
        {
            name: 'Montemar/El Pinillo',
            character: 'Lugnt & Grönt',
            pricePerM2: 2800,
            suitableFor: ['Barnfamiljer', 'Pensionärer', 'Fast boende'],
            pros: ['Lugna bostadsområden med parker', 'Nära till tåget', 'Mer "bostadskänsla" än nere vid stranden'],
            cons: ['Kräver ofta en promenad till havet', 'Backigt'],
            coordinates: { lat: 36.6300, lng: -4.4800 }
        }
    ],
    whySwedes: [
        'Närheten till flyget: Du landar, tar en taxi och är hemma på 15 minuter. Oslagbart för weekendresor.',
        'La Carihuela: Detta område har behållit sin charm och har en speciell plats i många svenskars hjärtan.',
        'Tåget: Pendeltåget gör det enkelt att åka till Malaga eller flygplatsen utan bil.',
        'Året-runt-liv: Torremolinos stänger aldrig, här finns liv och rörelse 12 månader om året.'
    ],
    notSuitableFor: [
        'De som söker total ensamhet (Torremolinos är en stad).',
        'De som vill ha ultralyx ("Golden Mile" känsla finns inte riktigt här).',
        'De som avskyr höghus från 70-talets turistboom (arkitekturen är blandad).'
    ],
    market: {
        priceChange5Year: 28.0,
        rentalYield: 5.8,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 110000, max: 160000 },
            twoRoom: { min: 180000, max: 300000 },
            threeRoom: { min: 250000, max: 450000 },
            townhouse: { min: 300000, max: 500000 },
            villa: { min: 500000, max: 1500000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 14, stockholmTemp: -2, difference: 16 },
        { month: 'Apr', areaTemp: 20, stockholmTemp: 5, difference: 15 },
        { month: 'Jul', areaTemp: 28, stockholmTemp: 18, difference: 10, seaTemp: 24 },
        { month: 'Okt', areaTemp: 23, stockholmTemp: 8, difference: 15 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen (AGP)' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca 10-15 min (~20€). Tåg direkt från flygplatsen (10 min).',
        nieInfo: 'Söks hos Policia Nacional i Torremolinos.',
        healthcare: 'Vårdcentraler finns. Nära till både Malaga och Benalmádena sjukhus.',
        swedishServices: ['Svenska kyrkan i Fuengirola (nära)', 'Skandinaviska läkare i området', 'Många svenska turister']
    },
    faq: [
        {
            question: 'Är Torremolinos bara betong?',
            answer: 'Nej, även om det finns höghus, så är Carihuela och delar av centrum mycket charmiga.'
        },
        {
            question: 'Är det bra för HBTQ?',
            answer: 'Ja, Torremolinos är känt som en av Europas mest öppna och HBTQ-vänliga städer (speciellt La Nogalera).'
        },
        {
            question: 'Kan man bo där utan bil?',
            answer: 'Ja, absolut. Tåget och bussarna fungerar utmärkt.'
        },
        {
            question: 'Hur är stranden?',
            answer: 'Fantastisk. Flera kilometer bred sandstrand med strandpromenad hela vägen till Benalmádena.'
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
            area: 'Torremolinos',
            slug: 'torremolinos',
            pricePerM2: 2900,
            character: 'Nära flyget, Strand',
            suitableFor: 'Weekendpendlare'
        },
        {
            area: 'Benalmádena',
            slug: 'benalmadena',
            pricePerM2: 3100,
            character: 'Backigt, Tivoli',
            suitableFor: 'Familjer'
        },
        {
            area: 'Fuengirola',
            slug: 'fuengirola',
            pricePerM2: 2900,
            character: 'Svenskfavorit, Tåg',
            suitableFor: 'Bekvämlighet'
        },
        {
            area: 'Málaga City',
            slug: 'malaga',
            pricePerM2: 3200,
            character: 'Storstad, Kultur',
            suitableFor: 'Urbana'
        }
    ]
};
