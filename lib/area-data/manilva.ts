import { AreaDetail } from '@/types/property';

export const MANILVA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 18000, year: 2024, source: 'INE' },
        foreignPercentage: { value: 39, source: 'INE' },
        swedesEstimate: { value: 600, note: 'Växande community' },
        airportDistance: { km: 95, minutes: 60, airport: 'Malaga (AGP)' },
        pricePerM2: { value: 2200, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3000 },
        averageTemp: { annual: 18.5, january: 13.0, july: 26.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'San Luis de Sabinillas',
            character: 'Puls & Strand',
            pricePerM2: 2300,
            suitableFor: ['Barnfamiljer', 'Året-runt-boende'],
            pros: ['Levande stadskärna precis vid havet', 'All service finns tillgänglig', 'Mycket prisvärt jämfört med Marbella'],
            cons: ['Kan kännas tättbebyggt på sommaren', 'Trafikerat'],
            coordinates: { lat: 36.3700, lng: -5.2200 }
        },
        {
            name: 'Puerto de la Duquesa',
            character: 'Marina & Turism',
            pricePerM2: 2500,
            suitableFor: ['Semesterfirare', 'Investerare'],
            pros: ['Charmig marina utan biltrafik', 'Stort utbud av restauranger och barer', 'Internationell atmosfär'],
            cons: ['Högre ljudnivå kvällstid', 'Mest turister, färre fastboende'],
            coordinates: { lat: 36.3580, lng: -5.2250 }
        },
        {
            name: 'Manilva Pueblo',
            character: 'Vitt & Vin',
            pricePerM2: 1900,
            suitableFor: ['Kulturintresserade', 'Lugnsökare'],
            pros: ['Autentisk andalusisk bykänsla', 'Känt för sina vingårdar (Moscatel)', 'Vacker utsikt över kusten'],
            cons: ['Beroende av bil', 'Längre till stranden (2-3 km)'],
            coordinates: { lat: 36.3760, lng: -5.2500 }
        },
        {
            name: 'La Duquesa Golf',
            character: 'Golf & Utsikt',
            pricePerM2: 2100,
            suitableFor: ['Golfare', 'Pensionärer'],
            pros: ['Lugnt boende nära golfbanan', 'Ofta fin havsutsikt', 'Mycket boende för pengarna'],
            cons: ['Backigt landskap', 'Kräver oftast bil'],
            coordinates: { lat: 36.3600, lng: -5.2350 }
        }
    ],
    whySwedes: [
        'Prisnivån: Manilva är fortfarande en av de mest prisvärda kommunerna på Costa del Sol.',
        'Sabinillas: En av få städer där "centrum" ligger precis på stranden, vilket ger en unik livskvalitet.',
        'Marinan: Puerto de la Duquesa är mindre och mysigare än Puerto Banús, men har ändå ett stort utbud.',
        'Läget: Nära till både Estepona och Sotogrande, men till en bråkdel av priset.'
    ],
    notSuitableFor: [
        'De som söker extrem lyx och flärd (välj Sotogrande eller Marbella).',
        'De som vill ha absolut tystnad i juli/augusti (Sabinillas är livligt).',
        'De som vill ha 5-stjärniga hotell i mängder.'
    ],
    market: {
        priceChange5Year: 28.0,
        rentalYield: 5.2,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 90000, max: 130000 },
            twoRoom: { min: 140000, max: 220000 },
            threeRoom: { min: 190000, max: 300000 },
            townhouse: { min: 220000, max: 350000 },
            villa: { min: 400000, max: 900000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 14, stockholmTemp: -2, difference: 16 },
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
        airportTransfer: 'Taxi ca 60 min (~90€). Det finns transferbussar men hyrbil rekommenderas.',
        nieInfo: 'Söks hos Policia Nacional i Estepona.',
        healthcare: 'Vårdcentral i Sabinillas (24h akut). Sjukhus i Estepona (HOSPITEN).',
        swedishServices: ['Svenska mäklare finns lokalt', 'Närmaste svenska skola är i Marbella eller Sotogrande']
    },
    faq: [
        {
            question: 'Är det blåsigt?',
            answer: 'Manilva kan vara lite blåsigare än Marbella pga närheten till Gibraltar, men inte som Tarifa.'
        },
        {
            question: 'Behöver man bil?',
            answer: 'I Sabinillas och hamnen klarar man sig utan. I Manilva Pueblo och golfområdena behövs bil.'
        },
        {
            question: 'Hur är stränderna?',
            answer: 'Breda och fina familjestränder. Vattnet kan vara någon grad kallare än Malaga pga Atlantströmmar.'
        },
        {
            question: 'Är det dött på vintern?',
            answer: 'Sabinillas lever året runt tack vare en stor bofast befolkning.'
        }
    ],
    comparison: [
        {
            area: 'Manilva',
            slug: 'manilva',
            pricePerM2: 2200,
            character: 'Prisvärt, Familjärt',
            suitableFor: 'Budgetmedvetna'
        },
        {
            area: 'Estepona',
            slug: 'estepona',
            pricePerM2: 3200,
            character: 'Blomstrande, Stad',
            suitableFor: 'Livsnjutare'
        },
        {
            area: 'Casares',
            slug: 'casares',
            pricePerM2: 2700,
            character: 'Bergsby & Kust',
            suitableFor: 'Naturälskare'
        },
        {
            area: 'Sotogrande',
            slug: 'sotogrande',
            pricePerM2: 4500,
            character: 'Lyx, Sport',
            suitableFor: 'Eliten'
        }
    ]
};
