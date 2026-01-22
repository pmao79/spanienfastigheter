import { AreaDetail } from '@/types/property';

export const LOS_ALCAZARES_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 20163, year: 2025, source: 'City Population' },
        foreignPercentage: { value: 37, source: 'Municipal Registry' },
        swedesEstimate: { value: 400, note: 'Uppskattat antal landsmän' },
        airportDistance: { km: 35, minutes: 30, airport: 'Murcia International (RMU)' },
        pricePerM2: { value: 1750, source: 'Real Estate Estimate', year: 2025 },
        sunshineHours: { value: 3150 },
        averageTemp: { annual: 19, january: 12, july: 28 }
    },
    districts: [
        {
            name: 'Los Narejos',
            character: 'Populär och livlig stadsdel med stor internationell befolkning.',
            pricePerM2: 2200,
            suitableFor: ['Familjer', 'Solbadare', 'Sociala köpare'],
            pros: ['Nära strand', 'Stort utbud av restauranger', 'Bra nattliv'],
            cons: ['Kan vara högljutt sommartid', 'Tätbebyggt']
        },
        {
            name: 'Gamla Stan (Centro)',
            character: 'Stadens historiska hjärta vid strandpromenaden.',
            pricePerM2: 2000,
            suitableFor: ['Kulturälskare', 'De som vill ha allt nära'],
            pros: ['Charmiga gator', 'Direkt vid stranden', 'Ingen bil behövs'],
            cons: ['Äldre fastigheter', 'Parkering kan vara svårt']
        },
        {
            name: 'Las Lomas del Rame / Bahía Bella',
            character: 'Lugnare bostadsområden strax utanför centrum, nära golf.',
            pricePerM2: 3300,
            suitableFor: ['Golfare', 'Lyxsökare', 'Naturvänner'],
            pros: ['Hög standard', 'Lugnt och privat', 'Nära Serena Golf'],
            cons: ['Kräver bil', 'Längre till stranden']
        }
    ],
    whySwedes: [
        'Mar Menors grunda och varma vatten är perfekt för alla åldrar.',
        'Den långa strandpromenaden är en av de bästa i regionen för morgonpromenader.',
        'Området lever året runt tack vare en stor bofast befolkning.',
        'Närheten till Murcia flygplats gör resan smidig.'
    ],
    notSuitableFor: [
        'Den som vill surfa i stora vågor (Mar Menor är nästan alltid stilla).',
        'De som söker total ensamhet (det är en populär ort).',
        'Personer som vill ha kuperad terräng direkt vid huset (det är mycket platt).'
    ],
    market: {
        priceChange5Year: 14,
        rentalYield: 7.5,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 60000, max: 90000 },
            twoRoom: { min: 110000, max: 160000 },
            threeRoom: { min: 160000, max: 250000 },
            townhouse: { min: 180000, max: 280000 },
            villa: { min: 300000, max: 650000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 12, stockholmTemp: -2, difference: 14 },
        { month: 'Apr', areaTemp: 18, stockholmTemp: 5, difference: 13 },
        { month: 'Jul', areaTemp: 28, stockholmTemp: 18, difference: 10 },
        { month: 'Okt', areaTemp: 22, stockholmTemp: 8, difference: 14 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'Norwegian, Ryanair', frequency: 'Dagligen (till ALC)' },
            { from: 'Göteborg', airline: 'Ryanair', frequency: 'Flera ggr/vecka (till ALC)' }
        ],
        airportTransfer: 'Murcia (RMU) 30 min, Alicante (ALC) 55 min.bussförbindelser finns men taxi/hyrbil är enklast.',
        nieInfo: 'Hanteras smidigast i San Javier eller via byrå.',
        healthcare: 'Vårdcentral i centrum. Sjukhuset Los Arcos ligger bara 10 min bort.',
        swedishServices: ['Svensktalande personal i vissa butiker', 'Skandinavisk klubb i närheten']
    },
    lifestyle: {
        beaches: [
            { name: 'Playa de los Narejos', type: 'Sand', features: 'Långgrund, vattensport, chiringuitos' },
            { name: 'Playa de las Palmeras', type: 'Sand', features: 'Centralt, palmer, strandpromenad' },
            { name: 'Playa del Espejo', type: 'Sand', features: 'Lugnt vatten, familjefavorit' }
        ],
        golfCourses: [
            { name: 'La Serena Golf', distance: '1 km' },
            { name: 'Roda Golf', distance: '3 km' },
            { name: 'Mar Menor Golf', distance: '10 km' }
        ],
        restaurants: 'Det lokala köket dominerar med färsk fisk, men det finns även ett stort utbud av internationella restauranger runt "The Strip".',
        nightlife: 'Välutvecklat med många barer och pubar, särskilt runt Rio Nalón.',
        activities: ['Kitesurfing', 'Vindsurfing', 'Golf', 'Cykling längs kusten']
    },
    faq: [
        {
            question: 'Är det sant att Mar Menor är smutsigt?',
            answer: 'Lagunen har haft miljöproblem, men enorma insatser görs för att återställa balansen. Vattnet övervakas konstant och kvaliteten har förbättrats avsevärt.'
        },
        {
            question: 'Varför är vattnet så varmt?',
            answer: 'Eftersom det är en grund lagun (max 7m djup) värms vattnet upp snabbare än havet, vilket gör det perfekt för bad långt in på hösten.'
        },
        {
            question: 'Finns det risk för översvämning?',
            answer: 'Vissa låglänta delar har drabbats vid extremväder (Gota Fría), men kommunen har investerat stort i dagvattensystem för att minska risken.'
        }
    ],
    comparison: [
        {
            area: 'Torrevieja',
            slug: 'torrevieja',
            pricePerM2: 1800,
            character: 'Mer svenskar, öppet hav',
            suitableFor: 'Den som vill ha svenskt kaffe runt hörnet'
        },
        {
            area: 'La Manga',
            slug: 'la-manga',
            pricePerM2: 1950,
            character: 'Unik natur, två hav',
            suitableFor: 'Vattenälskaren som vill ha variation'
        }
    ]
};
