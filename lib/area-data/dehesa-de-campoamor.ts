import { AreaDetail } from '@/types/property';

export const CAMPOAMOR_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 5000, year: 2024, source: 'Estimat (exkl. säsongsgäster)' },
        foreignPercentage: { value: 65, source: 'Estimat' },
        swedesEstimate: { value: 1200, note: 'Uppskattat antal' },
        airportDistance: { km: 50, minutes: 40, airport: 'Alicante-Elche (ALC)' },
        pricePerM2: { value: 3100, source: 'Marknadsanalys', year: 2025 },
        sunshineHours: { value: 3000 },
        averageTemp: { annual: 20, january: 16, july: 29 }
    },
    districts: [
        {
            name: 'Las Villas (Strandsidan)',
            character: 'Exklusiva villor i lummig pinjeskog nära havet.',
            pricePerM2: 3800,
            suitableFor: ['Kapitalstarka köpare', 'Sommarboende'],
            pros: ['Unik miljö', 'Nära stranden', 'Hög status'],
            cons: ['Höga priser', 'Viss insynsskydd krävs']
        },
        {
            name: 'Campoamor Golf (Lomas de Campoamor)',
            character: 'Golfresort ca 3 km från kusten. Mer lägenheter och radhus.',
            pricePerM2: 2600,
            suitableFor: ['Golfare', 'Åretruntboende'],
            pros: ['Säkerhet (vakter)', 'Fantastisk golfutsikt', 'Prisvärt lyxigt'],
            cons: ['Kräver bil till havet', 'Föreningsavgifter']
        },
        {
            name: 'La Regia',
            character: 'Område mellan stranden och N-332. Blandad bebyggelse.',
            pricePerM2: 2400,
            suitableFor: ['Semesterfirare', 'Uthyrning'],
            pros: ['Nära till allt', 'Bra priser'],
            cons: ['Kan vara trafikstört', 'Varierande standard']
        }
    ],
    whySwedes: [
        'Pinjeskogen ("Dehesa") ger en svalkande, nordisk känsla mitt i medelhavsvärmen.',
        'Exklusiviteten: Det känns som ett "spanskt Båstad" eller Djursholm.',
        'Golfen: Royal Campoamor Golf är en av de äldsta och finaste klubbarna.',
        'Tryggheten: Många gator har privat bevakning och området är mycket välskött.'
    ],
    notSuitableFor: [
        'Backpackers eller budgetresenärer – prisnivån är hög.',
        'Den som vill ha nattliv inpå knuten (här är det middagar och lugn som gäller).',
        'De som vill klara sig helt utan bil (särskilt om man bor vid golfen).'
    ],
    market: {
        priceChange5Year: 6.5,
        rentalYield: 5.0,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 110000, max: 150000 },
            twoRoom: { min: 180000, max: 280000 },
            threeRoom: { min: 250000, max: 450000 },
            townhouse: { min: 300000, max: 550000 },
            villa: { min: 850000, max: 3500000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 16, stockholmTemp: -2, difference: 18 },
        { month: 'Apr', areaTemp: 21, stockholmTemp: 5, difference: 16 },
        { month: 'Jul', areaTemp: 31, stockholmTemp: 18, difference: 13, seaTemp: 25 },
        { month: 'Okt', areaTemp: 24, stockholmTemp: 8, difference: 16 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca €65. Många väljer hyrbil direkt på flygplatsen.',
        nieInfo: 'Via polisen i Orihuela Costa/Playa Flamenca.',
        healthcare: 'Privat vårdcentral vid golfklubben. Sjukhuset i Torrevieja 15 min bort.',
        swedishServices: ['Skandinavisk personal på golfklubben', 'Mäklare med svensk personal']
    },
    lifestyle: {
        beaches: [
            { name: 'Playa de la Glea', type: 'Sand', features: 'Stor, familjevänlig, marina' },
            { name: 'Barranco Rubio', type: 'Sand', features: 'Lugnare, vacker vik' }
        ],
        golfCourses: [
            { name: 'Real Club de Golf Campoamor', distance: '0 km' },
            { name: 'Las Ramblas', distance: '1 km' }
        ],
        restaurants: 'Hög klass. Restaurangerna i marinan och klubbhuset håller hög standard.',
        nightlife: 'Sofistikerat. Drinkar i marinan eller på hotellterrasserna.',
        activities: ['Golf', 'Tennis (stort center)', 'Ridning', 'Segling i marinan']
    },
    faq: [
        {
            question: 'Är det dyrt i Campoamor?',
            answer: 'Ja, det är ett av de dyrare områdena på södra Costa Blanca, men du får också mer grönska och större tomter än genomsnittet.'
        },
        {
            question: 'Är det långt till affärer?',
            answer: 'Nej, det finns supermercados både vid stranden och vid golfen, men för storhandling åker man ofta till Zenia Boulevard (5-10 min bil).'
        },
        {
            question: 'Funkar det för barn?',
            answer: 'Absolut. Stränderna är fantastiska och det är ett lugnt område med lite genomfartstrafik.'
        }
    ],
    comparison: [
        {
            area: 'Cabo Roig',
            slug: 'cabo-roig',
            pricePerM2: 3500,
            character: 'Ännu mer exklusivt precis vid udden',
            suitableFor: 'Lyxsökaren'
        },
        {
            area: 'Mil Palmeras',
            slug: 'mil-palmeras',
            pricePerM2: 2800,
            character: 'Plattare, mer strandfokus',
            suitableFor: 'Strandfamiljen'
        },
        {
            area: 'Villamartín',
            slug: 'villamartin',
            pricePerM2: 1535,
            character: 'Billigare, mer golfbana än skog',
            suitableFor: 'Golfaren'
        }
    ]
};
