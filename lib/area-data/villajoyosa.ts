import { AreaDetail } from '@/types/property';

export const VILLAJOYOSA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 36962, year: 2024, source: 'INE' },
        foreignPercentage: { value: 25, source: 'Local Registry' },
        swedesEstimate: { value: 800, note: 'Växande, lockas av den genuina karaktären' },
        airportDistance: { km: 49, minutes: 40, airport: 'Alicante (ALC)' },
        pricePerM2: { value: 2315, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3000 },
        averageTemp: { annual: 18.0, january: 11.0, july: 26.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 50 }
    },
    districts: [
        {
            name: 'Casco Antiguo',
            character: 'Färgglatt & Historiskt',
            pricePerM2: 2100,
            suitableFor: ['Kulturälskare', 'Fotografer', 'Stadsmänniskor'],
            pros: ['Ikoniska färgglada fiskarhus', 'Direkt på stranden', 'Genuin atmosfär'],
            cons: ['Begränsad parkering', 'Många trappor', 'Kan vara bullrigt'],
            coordinates: { lat: 38.5074, lng: -0.2330 }
        },
        {
            name: 'Playa Paraíso',
            character: 'Strand & Lugnt',
            pricePerM2: 2800,
            suitableFor: ['Barnfamiljer', 'Strandälskare', 'Livsnjutare'],
            pros: ['Fantastisk sandstrand med palmer', 'Betydligt lugnare än centrum', 'Hög vattenkvalitet'],
            cons: ['Bil behövs för shopping', 'Färre restauranger i direkt anslutning'],
            coordinates: { lat: 38.4851, lng: -0.2514 }
        },
        {
            name: 'Montíboli',
            character: 'Klippor & Exklusivt',
            pricePerM2: 3500,
            suitableFor: ['Lyxsökare', 'Integritet', 'Utsiktsjägare'],
            pros: ['Dramatisk havsutsikt', 'Privat och tyst', 'Nära lyxhotell'],
            cons: ['Högre prisklass', 'Kräver bil', 'Isolerat från staden'],
            coordinates: { lat: 38.4900, lng: -0.2450 }
        },
        {
            name: 'La Cala',
            character: 'Turistiskt & Livligt',
            pricePerM2: 2600,
            suitableFor: ['Semesterfirare', 'Investerare', 'Barnfamiljer'],
            pros: ['Mycket service och nöjen', 'Platt och lättillgängligt', 'Fin sandstrand'],
            cons: ['Mycket turister (tangerar Benidorm)', 'Mindre "spansk" känsla'],
            coordinates: { lat: 38.5152, lng: -0.2335 }
        }
    ],
    whySwedes: [
        'Chokladstaden: Hemvist för Valor och flera andra chokladtillverkare – doften i staden är magisk.',
        'De färgglada husen: En unik och fotogenisk miljö som skiljer sig från de vanliga vita städerna.',
        'Det genuina: Villajoyosa känns som en "riktig" spansk stad, inte en turistkuliss.',
        'Stranden i centrum: En av få städer där en fantastisk sandstrand ligger mitt i centrum.'
    ],
    notSuitableFor: [
        'De som söker skyskrapor och nattklubbar (då är grannen Benidorm bättre).',
        'Personer med svårt att gå (i gamla stan är det mycket backar och kullersten).',
        'De som vill ha en helsvensk koloni (här är det mer blandat internationellt och spanskt).'
    ],
    market: {
        priceChange5Year: 28.0,
        rentalYield: 5.5,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 120000, max: 150000 },
            twoRoom: { min: 180000, max: 250000 },
            threeRoom: { min: 250000, max: 400000 },
            townhouse: { min: 300000, max: 500000 },
            villa: { min: 500000, max: 2000000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 11, stockholmTemp: -2, difference: 13 },
        { month: 'Apr', areaTemp: 17, stockholmTemp: 5, difference: 12 },
        { month: 'Jul', areaTemp: 26, stockholmTemp: 18, difference: 8, seaTemp: 26 },
        { month: 'Okt', areaTemp: 21, stockholmTemp: 8, difference: 13 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'TRAM (spårvagn) går hela vägen från Alicante centrum. Taxi ca 40 min (~60€).',
        nieInfo: 'Söks hos Policia Nacional i Benidorm.',
        healthcare: 'Sjukhuset Marina Baixa ligger i Villajoyosa och servar hela regionen.',
        swedishServices: ['Svenska Skolan i Alfaz (20 min)', 'Nära Benidorms utbud', 'Svenska konsulatet i Alicante (30 min)']
    },
    faq: [
        {
            question: 'Varför är husen färgglada?',
            answer: 'Historiskt målades de i klara färger för att fiskarna skulle känna igen sitt hus från havet.'
        },
        {
            question: 'Går det tåg hit?',
            answer: 'Ja! TRAM-linjen (L1) stannar i Villajoyosa och tar dig till Alicante eller Benidorm.'
        },
        {
            question: 'Är det en turistfälla?',
            answer: 'Nej, även om turismen ökar är det en levande stad med industri (choklad, fiske) och lokalbefolkning.'
        },
        {
            question: 'Luktar det choklad?',
            answer: 'Ja, när vinden ligger rätt från fabrikerna sprids en doft av rostad kakao över staden!'
        }
    ],
    comparison: [
        {
            area: 'Villajoyosa',
            slug: 'villajoyosa',
            pricePerM2: 2300,
            character: 'Färg, Choklad',
            suitableFor: 'Romantiker'
        },
        {
            area: 'Altea',
            slug: 'altea',
            pricePerM2: 3100,
            character: 'Konst, Vitt',
            suitableFor: 'Esteter'
        },
        {
            area: 'Benidorm',
            slug: 'benidorm',
            pricePerM2: 2700,
            character: 'Skyskrapor, Puls',
            suitableFor: 'Nöjessökare'
        },
        {
            area: 'Alicante',
            slug: 'alicante',
            pricePerM2: 2800,
            character: 'Storstad, Strand',
            suitableFor: 'Urbaniter'
        }
    ]
};
