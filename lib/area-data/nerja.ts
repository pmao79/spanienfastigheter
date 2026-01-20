import { AreaDetail } from '@/types/property';

export const NERJA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 22186, year: 2024, source: 'INE/Padrón' },
        foreignPercentage: { value: 34, source: 'INE' },
        swedesEstimate: { value: 1018, note: 'Registrerade (2:a största gruppen)' },
        airportDistance: { km: 65, minutes: 50, airport: 'Málaga (AGP)' },
        pricePerM2: { value: 4432, source: 'Indomio/Idealista', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 18.0, january: 13.0, july: 26.0 }
    },
    districts: [
        {
            name: 'Capistrano (Village & San Juan)',
            character: 'Vykortsvackert, vitkalkade hus, blomsterprakt och havsutsikt.',
            pricePerM2: 4440,
            suitableFor: ['Barnfamiljer', 'Pensionärer'],
            pros: ['Extremt välskött', 'Svenskfavorit', 'Fantastiska poolområden'],
            cons: ['Kräver ofta bil/buss', 'Många trappor i vissa delar']
        },
        {
            name: 'Burriana',
            character: 'Strandnära puls, branta backar och stadens populäraste strand.',
            pricePerM2: 4358,
            suitableFor: ['Strandälskare', 'Uthyrningsinvestering'],
            pros: ['Direkt strandaccess', 'Stort utbud av restauranger', 'Hög uthyrningspotential'],
            cons: ['Mycket turister', 'Svårt med parkering', 'Tuff "mördarbacke" upp']
        },
        {
            name: 'Balcón de Europa (Centrum)',
            character: 'Stadens hjärta. Smala gränder, folkliv och historia.',
            pricePerM2: 4600,
            suitableFor: ['Puls-sökare', 'De utan bil'],
            pros: ['Nära till allt', 'Charmigt och autentiskt', 'Platt (i själva stadskärnan)'],
            cons: ['Högt tryck sommartid', 'Ljudnivån', 'Begränsat med pool']
        },
        {
            name: 'Maro',
            character: 'Liten charmig by strax österut. Mer lantligt och naturnära.',
            pricePerM2: 3500,
            suitableFor: ['Naturälskare', 'De som söker lugnet'],
            pros: ['Nära grottorna och naturreservat', 'Betydligt lugnare', 'Unika strandvikar'],
            cons: ['Kräver bil/buss till Nerja', 'Mindre serviceutbud']
        }
    ],
    whySwedes: [
        'Klimatet – "Europas bästa klimat" tack vare skyddande berg och mikroklimat.',
        'Den starka svenskföreningen AHN och det väletablerade skandinaviska nätverket.',
        'Capistrano-områdena som känns som en idyllisk svensk sommardröm året om.',
        'Avsaknaden av höghus – här har man bevarat den andalusiska charmen.'
    ],
    notSuitableFor: [
        'Den som har svårt att gå i backar och trappor (Nerja är kuperat!).',
        'Personer som älskar storstadspuls och shoppingscenter (åk hellre till Málaga).',
        'De som vill ha en superbillig bostad (Nerja är dyrare än genomsnittet).',
        'Strandälskare som hatar stenstränder (sandstränderna är lite grövre här).'
    ],
    market: {
        priceChange5Year: 12.7,
        rentalYield: 5.2,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 180000, max: 250000 },
            twoRoom: { min: 250000, max: 400000 },
            threeRoom: { min: 350000, max: 600000 },
            townhouse: { min: 400000, max: 700000 },
            villa: { min: 800000, max: 2500000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 16, stockholmTemp: -2, difference: 18 },
        { month: 'Apr', areaTemp: 20, stockholmTemp: 5, difference: 15 },
        { month: 'Jul', areaTemp: 29, stockholmTemp: 18, difference: 11, seaTemp: 23 },
        { month: 'Okt', areaTemp: 23, stockholmTemp: 8, difference: 15 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera/vecka' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca 70€, tar 50 min. Det går direktbuss (ALSA) från flygplatsen, men oftast byte i Málaga centrum.',
        nieInfo: 'Söks hos Policia Nacional i Torre del Mar (närmast) eller Málaga. Kräver tidsbokning.',
        healthcare: 'Nerja Medical Center har svenska läkare/personal. Vithas (privat) finns också lokalt. Stora sjukhuset är Comarcal de la Axarquía (20 min).',
        swedishServices: ['AHN Nerja (Sjukhuskjyrkan/Klubb)', 'Svenska Mäklare (flera)', 'Butiker med svenskt sortiment', 'Svenska tandläkare']
    },
    faq: [
        {
            question: 'Varför är Nerja så populärt bland svenskar?',
            answer: 'Kombinationen av en levande stad året runt, avsaknad av fula höghus och det oslagbara mikroklimatet.'
        },
        {
            question: 'Är det backigt?',
            answer: 'Ja, mycket. Nerja ligger vid foten av bergen. Men centrum runt Balcón de Europa är platt.'
        },
        {
            question: 'Får man hyra ut sin bostad?',
            answer: 'Ja, men du behöver licens (VUT). Nerja har goda möjligheter till uthyrning året runt tack vare sitt mikroklimat.'
        },
        {
            question: 'Finns det svenska skolor?',
            answer: 'Nej, närmaste Svenska Skolan finns i Málaga/Fuengirola (ca 45-60 min bort).'
        }
    ],
    comparison: [
        {
            area: 'Nerja',
            slug: 'nerja',
            pricePerM2: 4432,
            character: 'Charmigt, kuperat',
            suitableFor: 'Alla åldrar'
        },
        {
            area: 'Frigiliana',
            slug: 'frigiliana',
            pricePerM2: 2800,
            character: 'Bergsby, utsikt',
            suitableFor: 'Naturälskare'
        },
        {
            area: 'Torrox',
            slug: 'torrox',
            pricePerM2: 2400,
            character: 'Lugnare, billigare',
            suitableFor: 'Pensionärer'
        },
        {
            area: 'Almuñécar',
            slug: 'almunecar',
            pricePerM2: 2200,
            character: 'Spanskt, stenstrand',
            suitableFor: 'Vinterboende'
        }
    ]
};
