import { AreaDetail } from '@/types/property';

export const SAN_PEDRO_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 35500, year: 2024, source: 'Estimate (Municipal Register)' },
        foreignPercentage: { value: 30, source: 'Estimate' },
        swedesEstimate: { value: 1200, note: 'Växande populärt val för barnfamiljer' },
        airportDistance: { km: 60, minutes: 45, airport: 'Malaga (AGP)' },
        pricePerM2: { value: 4200, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 19.5, january: 13.0, july: 27.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Beachside (Linda Vista)',
            character: 'Strandnära & Lugnt',
            pricePerM2: 5200,
            suitableFor: ['Barnfamiljer', 'Strandälskare', 'Villaägare'],
            pros: ['Gångavstånd till stranden och strandpromenaden', 'Lugna gator utan genomfartstrafik', 'Internationell skola i närheten'],
            cons: ['Dyrare än centrum', 'Vissa hus är äldre och kräver renovering'],
            coordinates: { lat: 36.4750, lng: -5.0050 }
        },
        {
            name: 'Centrum & Boulevarden',
            character: 'Modernt & Spanskt',
            pricePerM2: 3500,
            suitableFor: ['Året-runt-boende', 'Par', 'De som vill ha puls'],
            pros: ['Den fantastiska Boulevarden med lekparker och gastro-barer', 'All service runt hörnet', 'Prisvärt jämfört med stranden'],
            cons: ['Viss trafik', 'Mindre semesterkänsla än vid havet'],
            coordinates: { lat: 36.4850, lng: -5.0150 }
        },
        {
            name: 'Guadalmina Alta',
            character: 'Golf & Elegant',
            pricePerM2: 4500,
            suitableFor: ['Golfare', 'Pensionärer', 'Fast boende'],
            pros: ['Direkt vid golfbanan Royal Guadalmina', 'Lugnt och grönt', 'Eget kommersiellt centrum'],
            cons: ['Kräver bil (oftast)', 'Längre till stranden'],
            coordinates: { lat: 36.4700, lng: -5.0250 }
        },
        {
            name: 'Guadalmina Baja',
            character: 'Exklusivt & Kustnära',
            pricePerM2: 7000,
            suitableFor: ['Lyxsökare', 'Kändisar', 'Investerare'],
            pros: ['Ett av kustens mest exklusiva villaområden', 'Stora tomter och privat läge', 'Nära stranden och golf'],
            cons: ['Mycket höga priser', 'Kräver stor plånbok'],
            coordinates: { lat: 36.4650, lng: -5.0200 }
        }
    ],
    whySwedes: [
        'Boulevarden: Den nya parken/promenaden som delar staden har blivit en enorm succé och mötesplats för barnfamiljer.',
        'Det "lagom" valet: Mer spanskt och avslappnat än Marbella/Puerto Banús, men ändå lyxigare än många andra orter.',
        'Platt och promenadvänligt: Till skillnad från många andra orter är San Pedro helt platt, vilket gör det enkelt att cykla och gå.',
        'Närheten till allt: Du har stranden, golfen och bergen inom några minuter.'
    ],
    notSuitableFor: [
        'De som söker extremt nattliv (det är ganska lugnt på natten).',
        'De som vill ha höghus och "Benidorm-känsla" (här dominerar låg bebyggelse).',
        'Budgetköpare som vill ha det absolut billigaste (priserna har gått upp rejält).'
    ],
    market: {
        priceChange5Year: 32.0,
        rentalYield: 4.5,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 180000, max: 250000 },
            twoRoom: { min: 280000, max: 450000 },
            threeRoom: { min: 380000, max: 650000 },
            townhouse: { min: 500000, max: 850000 },
            villa: { min: 900000, max: 5000000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 13, stockholmTemp: -2, difference: 15 },
        { month: 'Apr', areaTemp: 19, stockholmTemp: 5, difference: 14 },
        { month: 'Jul', areaTemp: 28, stockholmTemp: 18, difference: 10, seaTemp: 23 },
        { month: 'Okt', areaTemp: 22, stockholmTemp: 8, difference: 14 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen (AGP)' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca 45 min (~80€). Transferbuss finns.',
        nieInfo: 'Söks hos Policia Nacional i Marbella eller Estepona.',
        healthcare: 'Lokala vårdcentraler finns. Hospital Costa del Sol ligger 15 min bort.',
        swedishServices: ['Svenska Skolan Marbella (ligger i La Alzambra, 5-10 min med bil)', 'Svenska tandläkare och mäklare i Guadalmina', 'Scandi Supermarket i närheten']
    },
    faq: [
        {
            question: 'Är San Pedro en egen stad?',
            answer: 'Nej, det tillhör Marbella kommun, men har en mycket stark egen identitet och centrum.'
        },
        {
            question: 'Hur långt är det till Puerto Banús?',
            answer: 'Du kan faktiskt promenera längs strandpromenaden på ca 30-40 minuter, eller köra på 5 minuter.'
        },
        {
            question: 'Finns det svenska skolan?',
            answer: 'Svenska Skolan ligger i La Alzambra, strax öster om San Pedro (nära Puerto Banús). Många elever bor i San Pedro.'
        },
        {
            question: 'Är det bra för barn?',
            answer: 'Fantastiskt. Boulevarden har flera lekparker och staden är lugn och trygg.'
        }
    ],
    comparison: [
        {
            area: 'San Pedro',
            slug: 'san-pedro-de-alcantara',
            pricePerM2: 4200,
            character: 'Familjärt, Platt',
            suitableFor: 'Barnfamiljer'
        },
        {
            area: 'Puerto Banús',
            slug: 'puerto-banus',
            pricePerM2: 6500,
            character: 'Lyx, Puls',
            suitableFor: 'Playboys'
        },
        {
            area: 'Estepona',
            slug: 'estepona',
            pricePerM2: 3300,
            character: 'Traditionellt, Trädgård',
            suitableFor: 'Livskvalitet'
        },
        {
            area: 'Nueva Andalucía',
            slug: 'nueva-andalucia',
            pricePerM2: 4800,
            character: 'Golf, Villor',
            suitableFor: 'Golfare'
        }
    ]
};
