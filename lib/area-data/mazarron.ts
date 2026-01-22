import { AreaDetail } from '@/types/property';

export const MAZARRON_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 35642, year: 2025, source: 'City Population' },
        foreignPercentage: { value: 37, source: 'Municipal Registry' },
        swedesEstimate: { value: 200, note: 'Uppskattat antal, lägre än norra Costa Blanca' },
        airportDistance: { km: 55, minutes: 45, airport: 'Murcia International (RMU)' },
        pricePerM2: { value: 1615, source: 'Real Estate Market Report', year: 2025 },
        sunshineHours: { value: 3100 },
        averageTemp: { annual: 18, january: 16, july: 29 }
    },
    districts: [
        {
            name: 'Puerto de Mazarrón',
            character: 'Den kustnära delen med marina, stränder och turism.',
            pricePerM2: 1800,
            suitableFor: ['Semesterfirare', 'Investerare', 'Strandälskare'],
            pros: ['Gångavstånd till strand', 'Bra uthyrning', 'Stort restaurangutbud'],
            cons: ['Högre priser än inlandet', 'Mycket folk sommartid']
        },
        {
            name: 'Mazarrón Pueblo',
            character: 'Den historiska stadskärnan ca 3 km inåt landet.',
            pricePerM2: 1300,
            suitableFor: ['Åretruntboende', 'Kulturintresserade'],
            pros: ['Billigare boende', 'Autentisk spansk känsla', 'Service året runt'],
            cons: ['Ingen havsutsikt', 'Körsbart avstånd till strand']
        },
        {
            name: 'Bolnuevo',
            character: 'Charmigt område känt för sina sandstensformationer och långa strand.',
            pricePerM2: 1900,
            suitableFor: ['Naturälskare', 'Pensionärer'],
            pros: ['Unik natur', 'Lugnare tempo', 'Vacker strand'],
            cons: ['Begränsat utbud vintertid', 'Dyrare objekt']
        },
        {
            name: 'Camposol',
            character: 'Stor urbanisation i inlandet med mycket stor expat-befolkning.',
            pricePerM2: 1100,
            suitableFor: ['Budgetköpare', 'Golfare', 'Gemenskapssökande'],
            pros: ['Mycket hus för pengarna', 'Engelsktalande gemenskap', 'Egen golfbana'],
            cons: ['Längre till havet (15 min)', 'Vissa sektorer har infrastrukturproblem']
        }
    ],
    whySwedes: [
        'Prisnivån är betydligt lägre än på norra Costa Blanca.',
        'Det "äkta" Spanien är mer närvarande här, särskilt i inlandet.',
        'Den dramatiska naturen med berg som möter hav tilltalar nordbor.',
        'Klimatet är extremt milt tack vare bergskedjan som skyddar mot nordvindar.'
    ],
    notSuitableFor: [
        'Den som vill ha ett stort svenskt community runt hörnet (här är fler britter).',
        'De som vill ha nattklubbar och intensivt partyliv.',
        'Personer utan körkort (avstånden kräver ofta bil).'
    ],
    market: {
        priceChange5Year: 24, // Nearly 24% over 4 years
        rentalYield: 10.5, // 10-11% gross mentioned
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 50000, max: 80000 },
            twoRoom: { min: 90000, max: 140000 },
            threeRoom: { min: 130000, max: 200000 },
            townhouse: { min: 150000, max: 250000 },
            villa: { min: 250000, max: 600000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 16, stockholmTemp: -2, difference: 18 },
        { month: 'Apr', areaTemp: 20, stockholmTemp: 5, difference: 15 },
        { month: 'Jul', areaTemp: 29, stockholmTemp: 18, difference: 11 },
        { month: 'Okt', areaTemp: 23, stockholmTemp: 8, difference: 15 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm, Göteborg', airline: 'Norwegian, Ryanair', frequency: 'Dagligen (till Alicante)' },
            { from: 'Oslo', airline: 'Norwegian', frequency: 'Flera ggr/vecka (till Alicante)' }
        ],
        airportTransfer: 'Murcia (RMU) är närmast (45 min), men Alicante (ALC) har fler flyg (1h 15m). Hyrbil är nästan ett krav.',
        nieInfo: 'Söks hos Policia Nacional i Cartagena eller Lorca. Ombud rekommenderas.',
        healthcare: 'Vårdcentral (Centro de Salud) finns i Puerto de Mazarrón och Mazarrón by. Sjukhus i Cartagena.',
        swedishServices: ['Begränsat utbud av svenska tjänster', 'Engelska fungerar överallt', 'Skandinaviska klubbar finns i närområdet']
    },
    lifestyle: {
        beaches: [
            { name: 'Playa de Bolnuevo', type: 'Sand', features: 'Lång, bred, vid sandstensformationer' },
            { name: 'Playa de la Reya', type: 'Sand', features: 'Centralt, barnvänligt, blå flagg' },
            { name: 'Percheles', type: 'Naturstrand', features: 'Palmkantad, vildare, "Murcias sista paradis"' }
        ],
        golfCourses: [
            { name: 'Camposol Golf', distance: '10 km' },
            { name: 'Condado de Alhama', distance: '15 km' }
        ],
        restaurants: 'Fokus på färsk fisk i hamnen. Prisvärt jämfört med turistfällor längre norrut.',
        nightlife: 'Avslappnat sommartid längs hamnpromenaden. Ingen stor klubbscen.',
        activities: ['Dykning (klart vatten)', 'Vandring i gruvbergen', 'Cykling', 'Marknader']
    },
    faq: [
        {
            question: 'Är Mazarrón säkert?',
            answer: 'Ja, det är ett lugnt område. Som i alla turistorter ska man vara vaksam, men brottsligheten är generellt låg.'
        },
        {
            question: 'Varför är det billigare här?',
            answer: 'Infrastrukturen kom senare än på Costa Blanca, och det ligger lite längre från Alicante flygplats. Det ses som en "up-and-coming" marknad.'
        },
        {
            question: 'Finns det svenska skolor?',
            answer: 'Nej, närmaste skandinaviska skola finns på Costa Blanca (ca 1 timme bort). Här gäller spanska eller internationella skolor (i Cartagena/Murcia).'
        }
    ],
    comparison: [
        {
            area: 'Torrevieja',
            slug: 'torrevieja',
            pricePerM2: 1800,
            character: 'Mycket mer bebyggt, fler svenskar',
            suitableFor: 'Den som vill ha enkelhet och språkstöd'
        },
        {
            area: 'Nerja',
            slug: 'nerja',
            pricePerM2: 3200,
            character: 'Liknande klippkust men dubbelt så dyrt',
            suitableFor: 'Den med stor plånbok'
        }
    ]
};
