import { AreaDetail } from '@/types/property';

export const VELEZ_MALAGA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 85000, year: 2024, source: 'INE' },
        foreignPercentage: { value: 12, source: 'INE' },
        swedesEstimate: { value: 150, note: 'Litet men växande community' },
        airportDistance: { km: 50, minutes: 40, airport: 'Malaga (AGP)' },
        pricePerM2: { value: 1900, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 2900 },
        averageTemp: { annual: 18.0, january: 12.0, july: 26.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Torre del Mar',
            character: 'Strand & Stad',
            pricePerM2: 2400,
            suitableFor: ['Strandälskare', 'De som vill ha allt'],
            pros: ['Har en av kustens finaste strandpromenader', 'Levande stad året runt', 'Helt platt (bra för äldre)'],
            cons: ['Kan bli väldigt varmt (stadsmiljö)', 'Parkering är svårt på sommaren'],
            coordinates: { lat: 36.7420, lng: -4.0950 }
        },
        {
            name: 'Vélez-Málaga (Centro)',
            character: 'Historia & Kultur',
            pricePerM2: 1500,
            suitableFor: ['Kulturintresserade', 'Budgetköpare'],
            pros: ['Fantastisk historisk stadskärna', 'Mycket billigare än kusten', 'Kulturellt centrum i Axarquía'],
            cons: ['4-5 km till stranden', 'Varmt på sommaren (inland)'],
            coordinates: { lat: 36.7820, lng: -4.1000 }
        },
        {
            name: 'Caleta de Vélez',
            character: 'Hamn & Fiske',
            pricePerM2: 2200,
            suitableFor: ['Båtfolk', 'Pensionärer'],
            pros: ['Här ligger fiskehamnen och marinan', 'Lugnare än Torre del Mar', 'Nära golfbanan (Baviera Golf)'],
            cons: ['Lite "mellanmjölk" (varken stad eller by)', 'Trafiken på kustvägen'],
            coordinates: { lat: 36.7500, lng: -4.0680 }
        },
        {
            name: 'Chilches / Benajarafe',
            character: 'Lantligt & Kust',
            pricePerM2: 2100,
            suitableFor: ['Husägare', 'Lugnsökare'],
            pros: ['Möjlighet att köpa villa till bra pris', 'Långa, oexploaterade stränder', 'Nära naturen'],
            cons: ['Bil är ett absolut måste', 'Lite service på vintern'],
            coordinates: { lat: 36.7150, lng: -4.2200 }
        }
    ],
    whySwedes: [
        'Priset: Du får otroligt mycket mer för pengarna här än väster om Malaga.',
        'Det genuina: Torre del Mar känns som en "riktig" spansk stad, inte en turistkuliss.',
        'Klimatet: Axarquía har ett unikt mikroklimat (subtropiskt) som gör att man odlar mango och avokado här.',
        'Strandpromenaden: Den i Torre del Mar är legendarisk, bred och full av liv.'
    ],
    notSuitableFor: [
        'De som vill ha svenskt kaffe på varje hörn (här är det spanskt som gäller).',
        'De som vill ha "glitz & glam" (åk till Marbella).',
        'De som inte gillar att ta bilen (om man bor utanför Torre del Mar).'
    ],
    market: {
        priceChange5Year: 24.0,
        rentalYield: 5.1,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 80000, max: 120000 },
            twoRoom: { min: 130000, max: 200000 },
            threeRoom: { min: 180000, max: 300000 },
            townhouse: { min: 200000, max: 350000 },
            villa: { min: 350000, max: 700000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 13, stockholmTemp: -2, difference: 15 },
        { month: 'Apr', areaTemp: 19, stockholmTemp: 5, difference: 14 },
        { month: 'Jul', areaTemp: 27, stockholmTemp: 18, difference: 9, seaTemp: 23 },
        { month: 'Okt', areaTemp: 21, stockholmTemp: 8, difference: 13 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen (AGP)' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca 40 min (~55€). Buss går ofta från Malaga centrum.',
        nieInfo: 'Söks hos Policia Nacional i Torre del Mar (smidigt!).',
        healthcare: 'Sjukhuset Comarcal de la Axarquía ligger i Torre del Mar.',
        swedishServices: ['Begränsat. Närmaste stora community är Nerja eller Rincón.']
    },
    faq: [
        {
            question: 'Vad är skillnaden på Vélez och Torre del Mar?',
            answer: 'Vélez är den historiska huvudstaden (inland), Torre del Mar är hamnstaden/semesterorten.'
        },
        {
            question: 'Är det mycket insekter?',
            answer: 'Eftersom det odlas mycket frukt (mango/avokado) kan det finnas mer lantbruk, men inget besvärande.'
        },
        {
            question: 'Finns spårvagn?',
            answer: 'Det byggdes en spårvagn mellan Vélez och Torre del Mar, men den har varit stängd i åratal (politisk fråga).'
        },
        {
            question: 'Varför är det billigare?',
            answer: 'Det är mindre känt internationellt och ligger öster om Malaga (som historiskt varit billigare).'
        }
    ],
    comparison: [
        {
            area: 'Vélez-Málaga',
            slug: 'velez-malaga',
            pricePerM2: 1900,
            character: 'Jordbruk, Stad',
            suitableFor: 'Året-runt'
        },
        {
            area: 'Nerja',
            slug: 'nerja',
            pricePerM2: 3400,
            character: 'Turistigt, Vackert',
            suitableFor: 'Semesterfirare'
        },
        {
            area: 'Torrox',
            slug: 'torrox',
            pricePerM2: 2400,
            character: 'Klimat, Tyskt',
            suitableFor: 'Pensionärer'
        },
        {
            area: 'Rincón',
            slug: 'rincon-de-la-victoria',
            pricePerM2: 2600,
            character: 'Förort, Spanskt',
            suitableFor: 'Pendlare'
        }
    ]
};
