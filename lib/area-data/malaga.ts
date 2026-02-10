import { AreaDetail } from '@/types/property';

export const MALAGA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 580000, year: 2024, source: 'INE (6th largest in Spain)' },
        foreignPercentage: { value: 16, source: 'Estimate' },
        swedesEstimate: { value: 1500, note: 'Växande trend bland stadsälskare' },
        airportDistance: { km: 8, minutes: 15, airport: 'Malaga (AGP)' },
        pricePerM2: { value: 3200, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 19.5, january: 13.0, july: 27.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair', 'Alla stora'], frequencyPerWeek: 300 }
    },
    districts: [
        {
            name: 'Centro Histórico',
            character: 'Kultur & Historia',
            pricePerM2: 4500,
            suitableFor: ['Kulturälskare', 'City-människor', 'Investerare'],
            pros: ['Picassomuseet, katedralen och all kultur runt hörnet', 'Otroligt restaurangutbud', 'Gågator och vacker arkitektur'],
            cons: ['Mycket turister', 'Hög ljudnivå', 'Dyrt'],
            coordinates: { lat: 36.7213, lng: -4.4214 }
        },
        {
            name: 'La Malagueta',
            character: 'Strand & Exklusivt',
            pricePerM2: 5200,
            suitableFor: ['Livsnjutare', 'De som vill ha både stad och strand'],
            pros: ['Stadens bästa strand precis utanför dörren', 'Gångavstånd till centrum via hamnen Muelle Uno', 'Prestigefullt område'],
            cons: ['Mycket dyrt', 'Trafikerat'],
            coordinates: { lat: 36.7200, lng: -4.4100 }
        },
        {
            name: 'Pedregalejo / El Palo',
            character: 'Fiskeby & Bohemiskt',
            pricePerM2: 3800,
            suitableFor: ['Barnfamiljer', 'Hipsters', 'Matälskare'],
            pros: ['Gamla fiskarhus direkt på stranden', 'Avslappnad och unik atmosfär', 'Kustens bästa chiringuitos'],
            cons: ['Gamla hus kan vara dragiga', 'Längre från centrum (kräver buss/cykel)'],
            coordinates: { lat: 36.7286, lng: -4.3800 }
        },
        {
            name: 'Soho / Teatinos',
            character: 'Konst & Modernt',
            pricePerM2: 3000,
            suitableFor: ['Unga professionella', 'Studenter', 'Digitala nomader'],
            pros: ['Soho: "Art District" med gallerier och cool vibe. Teatinos: Modernt, universitetet och bra priser.', 'Bra hyrespotential', 'Nära stationen (Soho)'],
            cons: ['Soho kan vara stökigt', 'Teatinos ligger en bit från havet'],
            coordinates: { lat: 36.7150, lng: -4.4250 }
        }
    ],
    whySwedes: [
        'Kulturen: Malaga har gått från "transit-stad" till en av Europas hetaste kulturstäder med 40 museer.',
        'Pulsen: Det är en riktig storstad (Spaniens sjätte största) som lever året runt, inte bara en semesterort.',
        'Matscenen: Från Michelin-stjärnor till enkla tapasbarer – maten är i världsklass.',
        'Kombinationen: Att kunna bo i en storstad men ändå ha stranden fem minuter bort är unikt.'
    ],
    notSuitableFor: [
        'De som söker tystnad och lugn (Malaga är en livlig spansk storstad).',
        'De som vill ha "Svenskbyar" (här integreras man med lokalbefolkningen).',
        'De som vill ha bil (i centrum är bil bara ett besvär, allt nås till fots).'
    ],
    market: {
        priceChange5Year: 42.0,
        rentalYield: 5.0,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 180000, max: 250000 },
            twoRoom: { min: 250000, max: 450000 },
            threeRoom: { min: 350000, max: 700000 },
            townhouse: { min: 400000, max: 800000 },
            villa: { min: 800000, max: 3000000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 13, stockholmTemp: -2, difference: 15 },
        { month: 'Apr', areaTemp: 19, stockholmTemp: 5, difference: 14 },
        { month: 'Jul', areaTemp: 27, stockholmTemp: 18, difference: 9, seaTemp: 24 },
        { month: 'Okt', areaTemp: 22, stockholmTemp: 8, difference: 14 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian, Ryanair', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Dagligen' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Tåg (Cernanías) 12 min till centrum. Taxi 15 min.',
        nieInfo: 'Söks hos Policia Nacional i Malaga.',
        healthcare: 'Stort utbud av offentliga och privata sjukhus (länetssjukhus).',
        swedishServices: ['Svenska konsulatet ligger i Malaga', 'Internationella skolor', 'Stort expat-community']
    },
    faq: [
        {
            question: 'Är Malaga säkert?',
            answer: 'Ja, det är en av Spaniens säkraste storstäder, men se upp för ficktjuvar i turiststråken.'
        },
        {
            question: 'Behöver man bil?',
            answer: 'Nej, tvärtom. I Malaga City är bil oftast ivägen. Gå, cykla, ta buss eller metro.'
        },
        {
            question: 'Kan man bada i stan?',
            answer: 'Ja, La Malagueta ligger 10 minuters promenad från katedralen.'
        },
        {
            question: 'Är det dyrt?',
            answer: 'Priserna har stigit rejält, men det är fortfarande billigare än Barcelona eller Madrid.'
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
            area: 'Málaga City',
            slug: 'malaga',
            pricePerM2: 3200,
            character: 'Kultur, Storstad',
            suitableFor: 'Cityälskare'
        },
        {
            area: 'Torremolinos',
            slug: 'torremolinos',
            pricePerM2: 2900,
            character: 'Strand, Turister',
            suitableFor: 'Semester'
        },
        {
            area: 'Marbella',
            slug: 'marbella',
            pricePerM2: 4300,
            character: 'Lyx, Småstad',
            suitableFor: 'Status'
        },
        {
            area: 'Nerja',
            slug: 'nerja',
            pricePerM2: 3400,
            character: 'Charm, Natur',
            suitableFor: 'Livskvalitet'
        }
    ]
};
