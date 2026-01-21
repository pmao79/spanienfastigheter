import { AreaDetail } from '@/types/property';

export const CASARES_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 7800, year: 2024, source: 'INE' },
        foreignPercentage: { value: 45, source: 'Estimate' },
        swedesEstimate: { value: 300, note: 'Populärt för golfare' },
        airportDistance: { km: 90, minutes: 55, airport: 'Malaga (AGP)' },
        pricePerM2: { value: 2700, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 18.2, january: 12.5, july: 26.5 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Casares Costa',
            character: 'Strand & Lyx',
            pricePerM2: 3200,
            suitableFor: ['Lyxsökare', 'Strandälskare'],
            pros: ['Exklusiva bostadsområden nära stranden', 'Strandklubbar av hög klass', 'Lugnt och privat'],
            cons: ['Kräver bil', 'Ingen egentlig "stadskärna"'],
            coordinates: { lat: 36.3850, lng: -5.1800 }
        },
        {
            name: 'Casares Pueblo',
            character: 'Vykortsvackert',
            pricePerM2: 2400,
            suitableFor: ['Romantiker', 'Konstnärer'],
            pros: ['En av spaniens vackraste vita byar', 'Fantastisk natur och vandring', 'UNESCO-skyddad atmosfär'],
            cons: ['Branta backar och smala gator', 'Långt till kusten (15 min bil)'],
            coordinates: { lat: 36.4430, lng: -5.2720 }
        },
        {
            name: 'Doña Julia / Golf',
            character: 'Golf & Utsikt',
            pricePerM2: 2600,
            suitableFor: ['Golfare', 'Investerare'],
            pros: ['Moderna lägenheter med stor terrass', 'Panoramautsikt över kusten', 'Prisvärt jämfört med Marbella'],
            cons: ['Vissa områden känns lite isolerade', 'Bil är ett måste'],
            coordinates: { lat: 36.3900, lng: -5.1900 }
        },
        {
            name: 'Finca Cortesín',
            character: 'Ultra-Lyx',
            pricePerM2: 6000,
            suitableFor: ['Eliten', 'Kändisar'],
            pros: ['En av Europas bästa golfresorter', 'Absolut högsta standard och service', 'Total privacy'],
            cons: ['Extremt dyrt', 'Avskilt'],
            coordinates: { lat: 36.3950, lng: -5.2200 }
        }
    ],
    whySwedes: [
        'Kontrasterna: Möjligheten att bo i en modern lägenhet vid havet men ha en uråldrig bergsby 15 minuter bort.',
        'Golfen: Finca Cortesín och Doña Julia lockar många golfintresserade svenskar.',
        'Lagunen: Europas första "Crystal Lagoon" (konstgjord lagun) ligger i Casares (Alcazaba Lagoon), vilket är en stor attraktion.',
        'Lugnet: Betydligt lugnare än grannarna Estepona och Manilva.'
    ],
    notSuitableFor: [
        'De som vill ha stadspuls och nattliv utanför dörren.',
        'De som vill klara sig helt utan bil (det är nästan omöjligt här).',
        'Tonårsfamiljer som vill ha "allt" inom gångavstånd.'
    ],
    market: {
        priceChange5Year: 35.0,
        rentalYield: 4.9,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 110000, max: 150000 },
            twoRoom: { min: 180000, max: 280000 },
            threeRoom: { min: 250000, max: 400000 },
            townhouse: { min: 280000, max: 450000 },
            villa: { min: 600000, max: 2500000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 13, stockholmTemp: -2, difference: 15 },
        { month: 'Apr', areaTemp: 18, stockholmTemp: 5, difference: 13 },
        { month: 'Jul', areaTemp: 28, stockholmTemp: 18, difference: 10, seaTemp: 23 },
        { month: 'Okt', areaTemp: 21, stockholmTemp: 8, difference: 13 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen (AGP)' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca 55 min (~85€). Hyrbil rekommenderas starkt.',
        nieInfo: 'Söks hos Policia Nacional i Estepona.',
        healthcare: 'Vårdcentral i Casares Costa. Sjukhus i Estepona (10 min).',
        swedishServices: ['Begränsat utbud lokalt', 'Närmaste svenska skola och affär finns i Marbella/Fuengirola']
    },
    faq: [
        {
            question: 'Är Casares bara en bergsby?',
            answer: 'Nej, Casares har en lång kustremsa (Casares Costa) med moderna bostäder, separerad från byn.'
        },
        {
            question: 'Vad är Alcazaba Lagoon?',
            answer: 'En enorm konstgjord lagun med turkost vatten, exklusiv för boende i området och gäster.'
        },
        {
            question: 'Är det dyrt?',
            answer: 'Både och. Byn och Doña Julia är prisvärda. Finca Cortesín är bland det dyraste i Spanien.'
        },
        {
            question: 'Hur långt är det till Marbella?',
            answer: 'Cirka 25-30 minuter med bil.'
        }
    ],
    comparison: [
        {
            area: 'Casares',
            slug: 'casares',
            pricePerM2: 2700,
            character: 'Bergsby & Lyx',
            suitableFor: 'Natur/Golf'
        },
        {
            area: 'Estepona',
            slug: 'estepona',
            pricePerM2: 3200,
            character: 'Stad & Blommor',
            suitableFor: 'Allround'
        },
        {
            area: 'Manilva',
            slug: 'manilva',
            pricePerM2: 2200,
            character: 'Prisvärt',
            suitableFor: 'Budget'
        },
        {
            area: 'Benahavís',
            slug: 'benahavis',
            pricePerM2: 3800,
            character: 'Golf & Mat',
            suitableFor: 'Livsjutare'
        }
    ]
};
