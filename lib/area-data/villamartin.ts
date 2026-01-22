import { AreaDetail } from '@/types/property';

export const VILLAMARTIN_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 29000, year: 2024, source: 'Orihuela Costa (est.)' }, // Using broader Orihuela Costa estimate as specific is unavailable
        foreignPercentage: { value: 55, source: 'Orihuela Costa Demographics' },
        swedesEstimate: { value: 1500, note: 'Uppskattat antal i området' },
        airportDistance: { km: 55, minutes: 45, airport: 'Alicante-Elche (ALC)' },
        pricePerM2: { value: 1535, source: 'Idealista/Real Estate Trends', year: 2024 },
        sunshineHours: { value: 2900 }, // format mismatch in type? property.ts says value:number. Using 320 days ~ 2800-3000 hours. Let's stick to days in note or convert. property.ts implies 'sunshineHours' so value should be hours usually, but Torrevieja used 2660. 320 days * 9h avg = 2880. Let's use 2900.
        averageTemp: { annual: 19, january: 13, july: 27 }
    },
    districts: [
        {
            name: 'Villamartín Plaza',
            character: 'Områdets hjärta med restauranger, barer och livemusik.',
            pricePerM2: 1800,
            suitableFor: ['Sociala pensionärer', 'Semesterfirare', 'Nöjeslystna'],
            pros: ['Gångavstånd till allt', 'Levande året runt', 'Bra uthyrning'],
            cons: ['Kan vara högljutt på kvällen', 'Mindre privat']
        },
        {
            name: 'Villacosta',
            character: 'Etablerat, lugnare bostadsområde med lummiga trädgårdar.',
            pricePerM2: 1500,
            suitableFor: ['Permanentboende', 'Barnfamiljer'],
            pros: ['Lugnt och grönt', 'Blandad nationalitet', 'Nära service'],
            cons: ['Äldre fastigheter', 'Kräver ofta renovering']
        },
        {
            name: 'Golfbanan (The Course)',
            character: 'Exklusiva villor och lägenheter i första linjen mot golfen.',
            pricePerM2: 2000,
            suitableFor: ['Golfare', 'Livsnjutare'],
            pros: ['Fantastisk utsikt', 'Prestigefullt läge', 'Lugnt'],
            cons: ['Högre priser', 'Risk för golfbollar (beroende på läge)']
        },
        {
            name: 'Los Dolses',
            character: 'Modernt och välplanerat område strax intill Villamartín.',
            pricePerM2: 1700,
            suitableFor: ['Investerare', 'Modernister'],
            pros: ['Nyare byggnation', 'Nära Zenia Boulevard', 'Bra infrastruktur'],
            cons: ['Vissa delar under utveckling']
        }
    ],
    whySwedes: [
        'Villamartín Plaza är en legendarisk mötesplats där man alltid träffar landsmän.',
        'Golfen är central – att kunna bo med gångavstånd till första tee är en dröm för många.',
        'Åretrunt-liv: Till skillnad från rena sommarorter lever Villamartín upp under vinterhalvåret tack vare golfare.',
        'Det gröna landskapet med kullar och pinjeträd påminner mer om hemma än det platta kustlandskapet.'
    ],
    notSuitableFor: [
        'Dig som vill ha havsutsikt från vardagsrummet (kräver specifika höga lägen).',
        'De som vill gå till stranden varje dag (det är 3-4 km ner, bil/buss/cykel krävs).',
        'Den som söker absolut tystnad nära Plazan (där är det liv och rörelse).'
    ],
    market: {
        priceChange5Year: 10.2, // Based on research +10.26%
        rentalYield: 5.5, // Range 4-6.5%
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 70000, max: 95000 },
            twoRoom: { min: 110000, max: 160000 },
            threeRoom: { min: 150000, max: 240000 },
            townhouse: { min: 180000, max: 280000 },
            villa: { min: 350000, max: 850000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 13, stockholmTemp: -2, difference: 15 },
        { month: 'Apr', areaTemp: 17, stockholmTemp: 5, difference: 12 },
        { month: 'Jul', areaTemp: 27, stockholmTemp: 18, difference: 9 },
        { month: 'Okt', areaTemp: 21, stockholmTemp: 8, difference: 13 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian, Ryanair', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: '3-4 ggr/vecka' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca €60. Flygbuss till Torrevieja (€7) sen lokalbuss/taxi. Hyrbil är starkt rekommenderat för golfare.',
        nieInfo: 'Söks smidigast via ombud då Orihuela Costa-kontoret har långa väntetider.',
        healthcare: 'Villamartín Medical Centre finns lokalt. Torrevieja-sjukhuset 15 min bort.',
        swedishServices: ['Svenska mäklare i mängder', 'Skandinaviska menyer på restauranger', 'Svenska golfföreningar']
    },
    lifestyle: {
        beaches: [
            { name: 'La Zenia', type: 'Sandstrand', features: 'Blå flagg, strandbar, livräddare' },
            { name: 'Cabo Roig', type: 'Vik/Strand', features: 'Marina, promenadstråk, klippor' }
        ],
        golfCourses: [
            { name: 'Villamartín Golf', distance: '0 km' },
            { name: 'Las Ramblas', distance: '3 km' },
            { name: 'Campoamor', distance: '5 km' },
            { name: 'Las Colinas', distance: '10 km' }
        ],
        restaurants: 'Hundratals alternativ. Plazan är epicentrum med mat från hela världen. Hög standard tack vare kräsna expats.',
        nightlife: 'Mycket aktivt i Plazan med livemusik varje kväll under säsong. Mer pub-känsla än nattklubb.',
        activities: ['Golf', 'Padel (flera center)', 'Bowling', 'Shopping på Zenia Boulevard']
    },
    faq: [
        {
            question: 'Måste man spela golf för att trivas?',
            answer: 'Nej, många köper här för den gröna miljön, det sociala livet och de fina bostäderna. Men gillar du golf är det ett paradis.'
        },
        {
            question: 'Hur långt är det till stranden?',
            answer: 'Det är ca 3-4 km till La Zenia-stranden. Det tar 5-10 minuter med bil eller 15 minuter med elcykel.'
        },
        {
            question: 'Är det dött på vintern?',
            answer: 'Tvärtom! Villamartín har en av de mest aktiva vintersäsongerna på kusten eftersom golfsäsongen pågår för fullt då.'
        },
        {
            question: 'Behöver jag bil?',
            answer: 'Ja, det rekommenderas. Området är utspritt och kollektivtrafiken är inte lika tät som inne i Torrevieja stad.'
        }
    ],
    comparison: [
        {
            area: 'Lomas de Cabo Roig',
            slug: 'lomas-de-cabo-roig',
            pricePerM2: 1800,
            character: 'Nyare, mer modernt',
            suitableFor: 'Den som vill ha nytt'
        },
        {
            area: 'San Miguel de Salinas',
            slug: 'san-miguel-de-salinas',
            pricePerM2: 1200,
            character: 'Spansk bykänsla, längre in',
            suitableFor: 'Kulturintresserade'
        },
        {
            area: 'La Zenia',
            slug: 'la-zenia',
            pricePerM2: 2200,
            character: 'Strandnära, dyrare',
            suitableFor: 'Strandälskare'
        }
    ]
};
