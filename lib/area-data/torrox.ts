import { AreaDetail } from '@/types/property';

export const TORROX_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 22000, year: 2024, source: 'INE' },
        foreignPercentage: { value: 35, source: 'Estimate' },
        swedesEstimate: { value: 400, note: 'Tyskarnas favorit, men växande bland svenskar' },
        airportDistance: { km: 60, minutes: 45, airport: 'Malaga (AGP)' },
        pricePerM2: { value: 2400, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3000 },
        averageTemp: { annual: 18.0, january: 12.0, july: 26.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Torrox Costa',
            character: 'Tyskfavorit & Strand',
            pricePerM2: 2600,
            suitableFor: ['Strandälskare', 'Pensionärer', 'Solsökare'],
            pros: ['Lång strandpromenad med många restauranger', 'Väldigt platt (ovanligt för att vara öster om Malaga)', 'Officiellt Europas bästa klimat'],
            cons: ['Arkitekturen är lite blandad (en del höghus)', 'Mycket tyska turister (om man vill ha svenskt)'],
            coordinates: { lat: 36.7320, lng: -3.9680 }
        },
        {
            name: 'Torrox Pueblo',
            character: 'Vit by & Historia',
            pricePerM2: 2100,
            suitableFor: ['Romantiker', 'Utsiktsälskare', 'De som vill ha lugn'],
            pros: ['Genuin andalusisk by med charmiga torg', 'Billigare än kusten', 'Fantastisk utsikt över havet'],
            cons: ['Kräver bil eller buss för att nå havet', 'Backigt'],
            coordinates: { lat: 36.7600, lng: -3.9520 }
        },
        {
            name: 'El Morche',
            character: 'Spanskt & Sommar',
            pricePerM2: 2300,
            suitableFor: ['Barnfamiljer', 'Budgetköpare'],
            pros: ['Otroligt fin och bred sandstrand (med sanddyner)', 'Mer spanskt än Torrox Costa', 'Prisvärt'],
            cons: ['Stilla på vintern', 'Längre från motorvägen'],
            coordinates: { lat: 36.7380, lng: -3.9950 }
        },
        {
            name: 'Peñoncillo',
            character: 'Nytt & Havsnära',
            pricePerM2: 2800,
            suitableFor: ['Investerare', 'De som vill ha nytt'],
            pros: ['Här byggs det mycket nytt just nu', 'Precis vid havet mellan Torrox och Nerja', 'Modernt'],
            cons: ['Det är en "sträcka" snarare än en by', 'Bil behövs för service'],
            coordinates: { lat: 36.7340, lng: -3.9400 }
        }
    ],
    whySwedes: [
        'Klimatet: "Sveriges Radio" för vädret – Torrox marknadsför sig stenhårt som "Europas bästa klimat" och det ligger något i det (skyddat läge).',
        'Priset: Det är betydligt billigare än Nerja (bara 10 min bort) och västra kusten.',
        'Lugnet: Här är tempot lugnare. Många köper här och åker in till Nerja för middagar.',
        'Promenaden: Torrox Costa har en lång, platt strandpromenad som är perfekt för morgonpromenader.'
    ],
    notSuitableFor: [
        'De som vill ha nattliv och party (här är det lugnt).',
        'De som söker ett stort svenskt community (här dominerar tyskarna och britterna).',
        'De som vill ha lyxshopping (då får man åka till Malaga eller Marbella).'
    ],
    market: {
        priceChange5Year: 22.0,
        rentalYield: 4.8,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 90000, max: 140000 },
            twoRoom: { min: 140000, max: 250000 },
            threeRoom: { min: 200000, max: 350000 },
            townhouse: { min: 200000, max: 350000 },
            villa: { min: 350000, max: 800000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 14, stockholmTemp: -2, difference: 16 },
        { month: 'Apr', areaTemp: 19, stockholmTemp: 5, difference: 14 },
        { month: 'Jul', areaTemp: 28, stockholmTemp: 18, difference: 10, seaTemp: 24 },
        { month: 'Okt', areaTemp: 22, stockholmTemp: 8, difference: 14 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen (AGP)' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca 45 min (~60€). Buss finns men tar tid.',
        nieInfo: 'Söks hos Policia Nacional i Torre del Mar.',
        healthcare: 'Vårdcentral i Torrox Costa. Sjukhuset i Vélez-Málaga (20 min).',
        swedishServices: ['Tandläkare och mäklare finns i Nerja (10 min bort)', 'Internationella skolor i Almuñécar eller Malaga']
    },
    faq: [
        {
            question: 'Är det verkligen Europas bästa klimat?',
            answer: 'Lokalt säger man det! Bergen skyddar mot nordliga vindar och havet svalkar. Det är mikroklimat.'
        },
        {
            question: 'Är det mycket norrmän?',
            answer: 'Nej, Torrox är känt som "Little Germany". Nerja har fler svenskar.'
        },
        {
            question: 'Måste man ha bil?',
            answer: 'I Torrox Costa: Nej. I Torrox Pueblo eller Peñoncillo: Ja.'
        },
        {
            question: 'Hur långt är det till Nerja?',
            answer: 'Bara ca 7-10 minuter med bil. Man kan nästan cykla.'
        }
    ],
    comparison: [
        {
            area: 'Torrox',
            slug: 'torrox',
            pricePerM2: 2400,
            character: 'Klimat, Tyskt',
            suitableFor: 'Pensionärer'
        },
        {
            area: 'Nerja',
            slug: 'nerja',
            pricePerM2: 3400,
            character: 'Charm, Grottor',
            suitableFor: 'Livskvalitet'
        },
        {
            area: 'Torremolinos',
            slug: 'torremolinos',
            pricePerM2: 2900,
            character: 'Nära flyget, Strand',
            suitableFor: 'Weekendpendlare'
        },
        {
            area: 'Almuñécar',
            slug: 'almunecar',
            pricePerM2: 2200,
            character: 'Tropiskt, Spanskt',
            suitableFor: 'Upptäckare'
        }
    ]
};
