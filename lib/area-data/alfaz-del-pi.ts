import { AreaDetail } from '@/types/property';

export const ALFAZ_DEL_PI_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 12500, year: 2024, source: 'INE (exkl Albir)' },
        foreignPercentage: { value: 52, source: 'Local Registry' },
        swedesEstimate: { value: 2000, note: 'Navet för nordbor i regionen (inlandet)' },
        airportDistance: { km: 63, minutes: 45, airport: 'Alicante (ALC)' },
        pricePerM2: { value: 2600, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3000 },
        averageTemp: { annual: 19.0, january: 12.0, july: 27.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Alfaz Pueblo',
            character: 'Spanskt Centrum',
            pricePerM2: 2400,
            suitableFor: ['Året-runt-boende', 'Budgetmedvetna', 'Pensionärer'],
            pros: ['Gångavstånd till all service', 'Mer genuint spanskt än kusten', 'Prisvärt'],
            cons: ['Stadsljud', 'Begränsat med pooler (lägenheter)'],
            coordinates: { lat: 38.5804, lng: -0.1038 }
        },
        {
            name: 'Colonia Escandinavia',
            character: 'Nordiskt nav',
            pricePerM2: 3000,
            suitableFor: ['Barnfamiljer', 'Sociala nordbor', 'Trygghetssökare'],
            pros: ['Nära Norska Skolan', 'Mycket välorganiserat och rent', 'Stor social gemenskap'],
            cons: ['Högre priser pga efterfrågan', 'Lite "egen bubbla"'],
            coordinates: { lat: 38.5833, lng: -0.0863 }
        },
        {
            name: 'Arabi',
            character: 'Villor & Lugn',
            pricePerM2: 2800,
            suitableFor: ['Familjer', 'Integritet', 'Villaköpare'],
            pros: ['Stora tomter och privata pooler', 'Väldigt nära centrum men tyst', 'Plattare än många andra områden'],
            cons: ['Bil rekommenderas', 'Trädgårdsskötsel krävs'],
            coordinates: { lat: 38.5819, lng: -0.1130 }
        },
        {
            name: 'Bello Horizonte',
            character: 'Kuperat & Utsikt',
            pricePerM2: 2700,
            suitableFor: ['Utsiktsjägare', 'Andra hemmet', 'Pensionärer'],
            pros: ['Panoramautsikt över havet och bergen', 'Lugnt bostadsområde', 'Blandad bebyggelse'],
            cons: ['Kräver bil (backigt)', 'Längre till service'],
            coordinates: { lat: 38.5910, lng: -0.0811 }
        }
    ],
    whySwedes: [
        'Den nordiska infrastrukturen: Här finns allt på svenska/norska – skolor, läkare, vårdhem (Reuma-Sol) och butiker.',
        'Livskvaliteten: Det inre läget ger större tomter, mer privatliv och lugnare tempo än nere vid stranden.',
        'Kulturen: Kulturhuset i Alfaz har ett enormt utbud av konserter, bio (på originalspråk) och festivaler.',
        'Närheten: Du är 5 minuter från Albir strand men slipper turistträngseln under högsäsong.'
    ],
    notSuitableFor: [
        'Nattklubbsälskare (staden sover på natten).',
        'De som inte kör bil (i villaområdena är bil nästan ett måste).',
        'De som söker 100% spanskt "by-liv" (här är det väldigt internationellt).'
    ],
    market: {
        priceChange5Year: 22.0,
        rentalYield: 5.0,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 140000, max: 180000 },
            twoRoom: { min: 200000, max: 300000 },
            threeRoom: { min: 280000, max: 450000 },
            townhouse: { min: 300000, max: 450000 },
            villa: { min: 500000, max: 1800000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 12, stockholmTemp: -2, difference: 14 },
        { month: 'Apr', areaTemp: 19, stockholmTemp: 5, difference: 14 },
        { month: 'Jul', areaTemp: 27, stockholmTemp: 18, difference: 9, seaTemp: 26 },
        { month: 'Okt', areaTemp: 21, stockholmTemp: 8, difference: 13 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen (ALC)' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Direktbuss till Alicante flygplats (Beniconnect). Taxi ca 60€.',
        nieInfo: 'Söks hos Policia Nacional i Benidorm.',
        healthcare: 'Reuma-Sol (norskägt rehabcenter) och vårdcentraler med tolkar.',
        swedishServices: ['Norska Skolan (följer liknande läroplan)', 'Skandinaviska Skolan i Albir', 'Supermercado Scandia']
    },
    faq: [
        {
            question: 'Vad är skillnaden på Alfaz och Albir?',
            answer: 'Alfaz är huvudorten inåt landet (villor, service), medan Albir är kommunens strandort. De hör ihop men har olika karaktär.'
        },
        {
            question: 'Är det bara pensionärer?',
            answer: 'Nej, tack vare skolorna finns det väldigt många barnfamiljer här året runt.'
        },
        {
            question: 'Behöver jag lära mig spanska?',
            answer: 'Det uppskattas, men i Alfaz klarar du dig chockerande långt på svenska/norska och engelska.'
        },
        {
            question: 'Finns det buss till stranden?',
            answer: 'Ja, lokalbussarna (nr 10) går ofta mellan Alfaz centrum, Albir och Altea.'
        }
    ],
    comparison: [
        {
            area: 'Alfaz del Pi',
            slug: 'alfaz-del-pi',
            pricePerM2: 2600,
            character: 'Villor, Nordiskt',
            suitableFor: 'Året-runt-boende'
        },
        {
            area: 'Albir',
            slug: 'albir',
            pricePerM2: 3165,
            character: 'Strand, Platt',
            suitableFor: 'Bekvämlighet'
        },
        {
            area: 'La Nucia',
            slug: 'la-nucia',
            pricePerM2: 2100,
            character: 'Sport, Natur',
            suitableFor: 'Aktiva'
        },
        {
            area: 'Altea',
            slug: 'altea',
            pricePerM2: 3100,
            character: 'Konst, Backigt',
            suitableFor: 'Esteter'
        }
    ]
};
