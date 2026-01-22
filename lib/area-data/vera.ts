import { AreaDetail } from '@/types/property';

export const VERA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 20000, year: 2025, source: 'Local Census' },
        foreignPercentage: { value: 20, source: 'Municipal Registry' },
        swedesEstimate: { value: 100, note: 'Mindre men växande community' },
        airportDistance: { km: 85, minutes: 50, airport: 'Almería (LEI)' },
        pricePerM2: { value: 2300, source: 'Market Trends (High Demand)', year: 2025 },
        sunshineHours: { value: 3100 },
        averageTemp: { annual: 19, january: 13, july: 28 }
    },
    districts: [
        {
            name: 'Vera Playa Naturista',
            character: 'Världskänt naturistområde med egna hotell och restauranger.',
            pricePerM2: 2500,
            suitableFor: ['Naturister', 'Frihetssökare'],
            pros: ['Unik livsstil', 'Hög uthyrningspotential (nisch)', 'Välskött'],
            cons: ['Passar inte alla', 'Kan vara dyrare']
        },
        {
            name: 'Las Marinas / Puerto Rey',
            character: 'Familjevänliga textilområden med breda stränder och laguner.',
            pricePerM2: 2400,
            suitableFor: ['Barnfamiljer', 'Pensionärer'],
            pros: ['Fantastiska stränder', 'Lugnt och tryggt', 'Grönområden'],
            cons: ['Lite avstånd till stadskärnan', 'Säsongsbetonat']
        },
        {
            name: 'Vera Pueblo',
            character: 'Den historiska staden några kilometer inåt land.',
            pricePerM2: 1400,
            suitableFor: ['Åretruntboende', 'Budgetköpare'],
            pros: ['Autentiskt', 'Billigt', 'All service året runt'],
            cons: ['Ingen havsutsikt', 'Kräver bil till stranden']
        }
    ],
    whySwedes: [
        'Friheten i naturistlivsstilen lockar en specifik grupp nordbor.',
        'De enorma, breda sandstränderna påminner om Skagen men med medelhavsklimat.',
        'Prisnivån är fortfarande attraktiv jämfört med andra spanska kuster.',
        'Det torra, soliga klimatet är perfekt för reumatiker.'
    ],
    notSuitableFor: [
        'Den som störs av nakenhet (om man råkar hamna i fel zon).',
        'Personer som vill ha intensivt nattliv (det är ganska lugnt).',
        'De som vill ha en storstadspuls.'
    ],
    market: {
        priceChange5Year: 18, // Significant rise noted research
        rentalYield: 8, // Niche market high yield
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 70000, max: 110000 },
            twoRoom: { min: 120000, max: 180000 },
            threeRoom: { min: 160000, max: 250000 },
            townhouse: { min: 190000, max: 300000 },
            villa: { min: 320000, max: 650000 }
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
            { from: 'Stockholm', airline: 'Norwegian', frequency: 'Säsong till LEI, annars Alicante' },
            { from: 'Köpenhamn', airline: 'Mix', frequency: 'Via Alicante smidigast' }
        ],
        airportTransfer: 'Almería 50 min, Alicante 1h 45m. Buss finns men bil är klart bäst.',
        nieInfo: 'Söks i Vera (viss service finns) eller Almería.',
        healthcare: 'Vårdcentral i Vera Pueblo och i Puerto Rey (sommar). Sjukhus i Huércal-Overa.',
        swedishServices: ['Nej, här får man klara sig på engelska eller spanska.']
    },
    lifestyle: {
        beaches: [
            { name: 'El Playazo', type: 'Sand', features: 'Enormt bred (över 100m ibland), delvis naturist' },
            { name: 'Puerto Rey', type: 'Sand', features: 'Lagunmynning, familjevänlig, textil' },
            { name: 'Las Marinas-Bolaga', type: 'Sand', features: 'Fin promenad, certifierad kvalitet' }
        ],
        golfCourses: [
            { name: 'Valle del Este', distance: '5 km' },
            { name: 'Desert Springs', distance: '10 km' }
        ],
        restaurants: 'Bra mix av strandbarer och traditionella krogar. Maraú Beach Club är populärt.',
        nightlife: 'Avslappnat. Några bra beach clubs men ingen "party-ort".',
        activities: ['Naturism', 'Vattenpark (AquaVera)', 'Golf', 'Cykling']
    },
    faq: [
        {
            question: 'Är hela Vera naturistiskt?',
            answer: 'Nej, det är tydligt uppdelat. Naturistzonen är välkänd, men resten av Vera Playa och Vera Pueblo är "textil" (med kläder).'
        },
        {
            question: 'Är det blåsigt?',
            answer: 'Som på många öppna kuststräckor kan vinden ligga på ibland, vilket uppskattas under heta sommardagar men kan vara svalt på vintern.'
        },
        {
            question: 'Varför ska jag välja Vera?',
            answer: 'För stränderna. De är i en klass för sig om man gillar breda, långa sandstränder med gott om plats.'
        }
    ],
    comparison: [
        {
            area: 'Torrevieja',
            slug: 'torrevieja',
            pricePerM2: 1800,
            character: 'Mer bebyggt, trängre stränder',
            suitableFor: 'Den som vill ha stadskänsla'
        },
        {
            area: 'Mojácar',
            slug: 'mojacar',
            pricePerM2: 2150,
            character: 'Mer kuperat och pittoreskt',
            suitableFor: 'Den som vill ha utsikt'
        }
    ]
};
