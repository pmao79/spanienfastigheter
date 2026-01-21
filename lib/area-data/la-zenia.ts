import { AreaDetail } from '@/types/property';

export const LA_ZENIA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 35000, year: 2024, source: 'INE (Orihuela Costa)' },
        foreignPercentage: { value: 65, source: 'Local Registry' },
        swedesEstimate: { value: 2500, note: 'Mycket starkt fäste för svenskar' },
        airportDistance: { km: 50, minutes: 45, airport: 'Alicante (ALC)' },
        pricePerM2: { value: 3200, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 19.0, january: 11.0, july: 27.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Cala Bosque (Strand)',
            character: 'Strand & Puls',
            pricePerM2: 3800,
            suitableFor: ['Strandälskare', 'Semesterfirare', 'Investerare'],
            pros: ['Direkt på den populära stranden', 'Nära till alla restauranger', 'Livligt året runt'],
            cons: ['Mycket folk på sommaren', 'Svårt att parkera', 'Högre ljudnivå'],
            coordinates: { lat: 37.9189, lng: -0.7219 }
        },
        {
            name: 'Zenia Boulevard (Området)',
            character: 'Shopping & Modernt',
            pricePerM2: 3200,
            suitableFor: ['Shoppare', 'Året-runt-boende', 'Barnfamiljer'],
            pros: ['Gångavstånd till 150+ butiker', 'Moderna nybyggen', 'Utmärkt uthyrningspotential'],
            cons: ['Trafikerat', 'Inte så "spanskt"', 'Längre till havet (15 min)'],
            coordinates: { lat: 37.929, lng: -0.729 }
        },
        {
            name: 'Cala Cerrada / La Mirada',
            character: 'Utsikt & Lugnare',
            pricePerM2: 3500,
            suitableFor: ['Par', 'Utsiktsjägare', 'Promenerare'],
            pros: ['Fantastisk klipputsikt', 'Lite lugnare än huvudstranden', 'Fina promenadstråk'],
            cons: ['Brantare terräng', 'Äldre bebyggelse blandat med nytt'],
            coordinates: { lat: 37.923, lng: -0.720 }
        },
        {
            name: 'La Zenia Norr',
            character: 'Bostadsområde & Familj',
            pricePerM2: 2800,
            suitableFor: ['Långtidsboende', 'Familjer', 'Trygghetssökare'],
            pros: ['Nära Svenska Skolan (Playa Flamenca)', 'Platt och lättillgängligt', 'Etablerat villaområde'],
            cons: ['Lite längre till stranden', 'Monoton arkitektur'],
            coordinates: { lat: 37.935, lng: -0.730 }
        }
    ],
    whySwedes: [
        'Zenia Boulevard: Kustens största köpcentrum är en social hubb och drar folk året runt.',
        'Svensk service: Här finns svensktalande personal i bank, vård och butiker överallt.',
        'Det platta landskapet: Till skillnad från norra Costa Blanca är det enkelt att cykla och gå här.',
        'Klimatet: Orihuela Costa har ett av de torraste och soligaste klimaten i Spanien.'
    ],
    notSuitableFor: [
        'De som söker det "äkta Spanien" (La Zenia är en internationell enklav).',
        'Personer som vill ha total tystnad (sommartid är det mycket folk och aktivitet).',
        'Vandrare som vill ha berg direkt inpå knuten (då är Altea/Calpe bättre).'
    ],
    market: {
        priceChange5Year: 28.0,
        rentalYield: 6.2,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 95000, max: 125000 },
            twoRoom: { min: 165000, max: 260000 },
            threeRoom: { min: 275000, max: 480000 },
            townhouse: { min: 210000, max: 380000 },
            villa: { min: 550000, max: 2000000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 11, stockholmTemp: -2, difference: 13 },
        { month: 'Apr', areaTemp: 19, stockholmTemp: 5, difference: 14 },
        { month: 'Jul', areaTemp: 27, stockholmTemp: 18, difference: 9, seaTemp: 26 },
        { month: 'Okt', areaTemp: 22, stockholmTemp: 8, difference: 14 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair', frequency: 'Flera i veckan' },
            { from: 'Växjö/Örebro', airline: 'Ryanair', frequency: 'Säsong' }
        ],
        airportTransfer: 'Buss till Torrevieja (45 min) sedan lokalbuss/taxi. Taxi direkt ca 60€.',
        nieInfo: 'Söks hos Policia Nacional i Orihuela eller Torrevieja.',
        healthcare: 'Universitetssjukhuset i Torrevieja (10 min) är toppmodernt.',
        swedishServices: ['Svenska Skolan (Playa Flamenca)', 'Svenska kyrkan i Torrevieja', 'Skandinaviska center']
    },
    faq: [
        {
            question: 'Är det bara turister?',
            answer: 'Nej, La Zenia har en mycket stor befolkning av åretruntboende utlänningar, så det lever även på vintern.'
        },
        {
            question: 'Hur är stranden?',
            answer: 'La Zenia-stranden (Cala Bosque) är en bred sandstrand med blå flagg och en populär strandbar (Chiringuito).'
        },
        {
            question: 'Behöver man bil?',
            answer: 'Egentligen inte. Om du bor centralt har du gångavstånd till både strand, matbutiker och Zenia Boulevard.'
        },
        {
            question: 'Finns det golf?',
            answer: 'Ja, inom 10 minuter når du 4 banor: Villamartin, Las Ramblas, Campoamor och Las Colinas.'
        }
    ],
    comparison: [
        {
            area: 'La Zenia',
            slug: 'la-zenia',
            pricePerM2: 3200,
            character: 'Shopping, Strand',
            suitableFor: 'Bekvämlighet'
        },
        {
            area: 'Torrevieja',
            slug: 'torrevieja',
            pricePerM2: 2400,
            character: 'Stad, Prisvärt',
            suitableFor: 'Budget'
        },
        {
            area: 'Villamartin',
            slug: 'villamartin',
            pricePerM2: 2900,
            character: 'Golf, Grönt',
            suitableFor: 'Golfare'
        },
        {
            area: 'Altea',
            slug: 'altea',
            pricePerM2: 3100,
            character: 'Backigt, Konst',
            suitableFor: 'Esteter'
        }
    ]
};
