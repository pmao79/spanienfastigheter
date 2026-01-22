import { AreaDetail } from '@/types/property';

export const LA_MANGA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 5000, year: 2024, source: 'Est. Winter Population' },
        foreignPercentage: { value: 20, source: 'Est. Seasonal' }, // Explicit data unavailable, estimate based on context
        swedesEstimate: { value: 500, note: 'Uppskattat antal (säsongsberoende)' },
        airportDistance: { km: 36, minutes: 30, airport: 'Murcia International (RMU)' },
        pricePerM2: { value: 1947, source: 'Idealista/Real Estate Trends', year: 2024 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 19, january: 13, july: 28 }
    },
    districts: [
        {
            name: 'La Manga Club',
            character: 'Exklusiv sport- och golfresort i världsklass.',
            pricePerM2: 3500,
            suitableFor: ['Golfare', 'Lyxsökare', 'Aktiva familjer'],
            pros: ['Världsklassfaciliteter', 'Hög säkerhet', 'Gröna omgivningar'],
            cons: ['Dyrt', 'Längre från stranden (vissa delar)', 'Kräver bil']
        },
        {
            name: 'Polígono Y / Playa del Galán',
            character: 'Premiumområde mitt på landtungan med exklusiva villor.',
            pricePerM2: 3000,
            suitableFor: ['Investerare', 'Strandälskare'],
            pros: ['Direkt strandläge', 'Rymliga tomter', 'Centralt'],
            cons: ['Höga priser', 'Trafik under högsäsong']
        },
        {
            name: 'Islas Menores / Mar de Cristal',
            character: 'Lugnare områden vid Mar Menors södra strand, populärt bland fastboende.',
            pricePerM2: 2500,
            suitableFor: ['Barnfamiljer', 'Åretruntboende', 'Seglare'],
            pros: ['Lugnt tempo', 'Grund badstrand', 'Nära marina'],
            cons: ['Begränsat nattliv', 'Viss säsongsvariation']
        },
        {
            name: 'Veneziola (Norra La Manga)',
            character: 'Den tystaste delen längst norrut, naturnära och glesbebyggd.',
            pricePerM2: 2000,
            suitableFor: ['Naturälskare', 'De som söker tystnad'],
            pros: ['Fantastiska vyer', 'Lägre priser', 'Mindre trängsel'],
            cons: ['Långt till service', 'Kan kännas ödsligt vintertid']
        }
    ],
    whySwedes: [
        'Det unika läget mellan två hav ger en exceptionell livskvalitet.',
        'La Manga Club erbjuder sportfaciliteter som saknar motstycke i Europa.',
        'Det hälsosamma mikroklimatet och det läkande vattnet i Mar Menor.',
        'Möjligheten att välja mellan det lugna Mar Menor och det öppna Medelhavet.'
    ],
    notSuitableFor: [
        'Dig som vill ha storstadspuls året runt (vintern är mycket lugn).',
        'De som är beroende av kollektivtrafik (bil är nästan ett måste).',
        'Den som vill undvika turister helt (sommaren är intensiv).'
    ],
    market: {
        priceChange5Year: 15,
        rentalYield: 7.4, // Explicitly mentioned in research
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 80000, max: 120000 },
            twoRoom: { min: 140000, max: 220000 },
            threeRoom: { min: 200000, max: 350000 },
            townhouse: { min: 250000, max: 450000 },
            villa: { min: 500000, max: 1800000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 13, stockholmTemp: -2, difference: 15 },
        { month: 'Apr', areaTemp: 18, stockholmTemp: 5, difference: 13 },
        { month: 'Jul', areaTemp: 28, stockholmTemp: 18, difference: 10 },
        { month: 'Okt', areaTemp: 22, stockholmTemp: 8, difference: 14 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'Norwegian, SAS', frequency: 'Säsongsvis/Via Alicante' },
            { from: 'Köpenhamn', airline: 'Norwegian, SAS', frequency: 'Dagligen (till ALC)' },
            { from: 'Oslo', airline: 'Norwegian', frequency: 'Flera ggr/vecka (till ALC)' }
        ],
        airportTransfer: 'Taxi från RMU ca €50-60. Buss finns men tar tid. Hyrbil rekommenderas starkt för att utforska regionen.',
        nieInfo: 'Söks i Cartagena eller via ombud. Engelsktalande hjälp finns tillgänglig.',
        healthcare: 'Vårdcentraler finns på La Manga. Sjukhuset Santa Lucía i Cartagena (25 min) är toppmodernt.',
        swedishServices: ['Skandinaviska mäklare', 'Nordisk klubb i närheten', 'Svenska menyer på turistorter']
    },
    lifestyle: {
        beaches: [
            { name: 'Cala del Pino', type: 'Sand', features: 'Tallskog, lugnt vatten, solnedgång' },
            { name: 'Playa de Levante', type: 'Sand', features: 'Långgrund, familjevänlig, service' }
        ],
        golfCourses: [
            { name: 'La Manga Club (North, South, West)', distance: '5 km' },
            { name: 'La Serena Golf', distance: '20 km' },
            { name: 'Roda Golf', distance: '25 km' }
        ],
        restaurants: 'Enormt utbud, särskilt av fisk och skaldjur. "Caldero" är den lokala specialiteten som måste prövas.',
        nightlife: 'Intensivt under sommaren runt Plaza Bohemia och Zoco. Lugnare men trevligt på La Manga Club.',
        activities: ['Vindsurfing', 'Dykning (Cabo de Palos)', 'Tennis/Padel', 'Cykling']
    },
    faq: [
        {
            question: 'Är La Manga dött på vintern?',
            answer: 'Det är mycket lugnare än på sommaren, ja. Passar perfekt för den som söker ro, promenader och golf. Vissa restauranger stänger, men det finns alltid service öppet.'
        },
        {
            question: 'Vilken flygplats ska jag välja?',
            answer: 'Murcia International (RMU) ligger närmast (30 min), men Alicante (ALC) har fler flygavgångar och ligger ca 1 timme bort.'
        },
        {
            question: 'Kan man dricka kranvattnet?',
            answer: 'Ja, det är säkert, men många föredrar smaken av flaskvatten.'
        },
        {
            question: 'Hur är internetuppkopplingen?',
            answer: 'Fiber finns i de flesta urbanisationer och fungerar utmärkt för distansarbete.'
        }
    ],
    comparison: [
        {
            area: 'Torrevieja',
            slug: 'torrevieja',
            pricePerM2: 1800,
            character: 'Mer stadspuls, mer svenskar',
            suitableFor: 'Åretruntboende som vill ha allt nära'
        },
        {
            area: 'Marbella',
            slug: 'marbella',
            pricePerM2: 4500,
            character: 'Lyxigare, dyrare, mer glamoröst',
            suitableFor: 'Den med stor budget'
        }
    ]
};
