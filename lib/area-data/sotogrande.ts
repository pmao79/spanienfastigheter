import { AreaDetail } from '@/types/property';

export const SOTOGRANDE_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 10000, year: 2024, source: 'Estimate' },
        foreignPercentage: { value: 50, source: 'Estimate' },
        swedesEstimate: { value: 500, note: 'Väletablerat, hög status' },
        airportDistance: { km: 105, minutes: 65, airport: 'Malaga (AGP)' },
        pricePerM2: { value: 3800, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3100 },
        averageTemp: { annual: 18.8, january: 13.5, july: 25.5 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'British Airways'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Sotogrande Marina',
            character: 'Båtar & Lyx',
            pricePerM2: 4500,
            suitableFor: ['Seglare', 'Livsnjutare'],
            pros: ['Unik kanalstad ("Lilla Venedig")', 'Gångavstånd till strand och restauranger', 'Livligt på sommaren'],
            cons: ['Begränsade parkeringsmöjligheter', 'Fuktigare klimat (vid vattnet)'],
            coordinates: { lat: 36.2790, lng: -5.2750 }
        },
        {
            name: 'Sotogrande Costa (Kings & Queens)',
            character: 'Villor & Avenyer',
            pricePerM2: 5000,
            suitableFor: ['Familjer', 'Golfare'],
            pros: ['Breda, palmkantade avenyer', 'Platt och cykelvänligt', 'Nära stranden och Real Club de Golf'],
            cons: ['Höga priser', 'Kräver underhåll av stora trädgårdar'],
            coordinates: { lat: 36.2850, lng: -5.2850 }
        },
        {
            name: 'Sotogrande Alto',
            character: 'Utsikt & Golf',
            pricePerM2: 3200,
            suitableFor: ['Året-runt-boende', 'Skolfamiljer'],
            pros: ['Nära internationella skolan (SIS)', 'Valderrama Golf ligger här', 'Större tomter och mer kuperat'],
            cons: ['Beroende av bil', 'Längre till havet'],
            coordinates: { lat: 36.2950, lng: -5.3000 }
        },
        {
            name: 'La Reserva',
            character: 'Exklusivt & Nytt',
            pricePerM2: 5500,
            suitableFor: ['Moderna familjer', 'Eliten'],
            pros: ['Sotograndes nyaste och lyxigaste område', 'Fantastisk Beach Club (i bergen)', 'Moderna villor'],
            cons: ['Prisnivån är mycket hög', 'Fortfarande under viss utbyggnad'],
            coordinates: { lat: 36.2900, lng: -5.3100 }
        }
    ],
    whySwedes: [
        'Skolan: Sotogrande International School (SIS) anses vara en av Spaniens absolut bästa, vilket drar många svenska familjer.',
        'Livsstilen: Det är "Florida i Europa". Privat, säkert, rent och extremt välskött.',
        'Sporten: Golf (Valderrama!), polo, segling och tennis i världsklass.',
        'Gemenskapen: Ett starkt internationellt community där det är lätt att komma in i det sociala livet.'
    ],
    notSuitableFor: [
        'Budgetköpare (här är allt lite dyrare).',
        'De som vill ha "typisk spansk" atmosfär (Sotogrande är en privat resort).',
        'De som vill bo mitt i smeten (här bor man i villakvarter).'
    ],
    market: {
        priceChange5Year: 40.0,
        rentalYield: 4.5,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 180000, max: 250000 },
            twoRoom: { min: 250000, max: 450000 },
            threeRoom: { min: 350000, max: 600000 },
            townhouse: { min: 400000, max: 800000 },
            villa: { min: 900000, max: 15000000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 14, stockholmTemp: -2, difference: 16 },
        { month: 'Apr', areaTemp: 19, stockholmTemp: 5, difference: 14 },
        { month: 'Jul', areaTemp: 26, stockholmTemp: 18, difference: 8, seaTemp: 22 },
        { month: 'Okt', areaTemp: 21, stockholmTemp: 8, difference: 13 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS (via AGP)', frequency: 'Gibraltar alt. (nära)' },
            { from: 'Malaga', airline: 'Alla bolag', frequency: '60 min bort' },
            { from: 'Gibraltar', airline: 'British Airways', frequency: '20 min bort' }
        ],
        airportTransfer: 'Från Malaga: ca 65 min. Från Gibraltar: 20 min.',
        nieInfo: 'Söks hos Policia Nacional i La Línea eller Estepona.',
        healthcare: 'Privatkliniker i Sotogrande. Sjukhus i Estepona eller Gibraltar.',
        swedishServices: ['Svenska nätverk runt skolan', 'Golfproffs och tränare']
    },
    faq: [
        {
            question: 'Är Sotogrande en stad?',
            answer: 'Nej, det är en privatägd "urbanisation" (resort) som är öppen för allmänheten, men sköts av ett bolag.'
        },
        {
            question: 'Varför är det så dyrt?',
            answer: 'Säkerhet, skötsel, låg bebyggelsetäthet och exklusiviteten håller priserna uppe.'
        },
        {
            question: 'Kan man bo där året runt?',
            answer: 'Absolut. Tack vare skolan bor många barnfamiljer här permanent.'
        },
        {
            question: 'Ligger det i Marbella?',
            answer: 'Nej, det ligger i Cadiz-provinsen, ca 40 minuter väster om Marbella.'
        }
    ],
    comparison: [
        {
            area: 'Sotogrande',
            slug: 'sotogrande',
            pricePerM2: 3800,
            character: 'Exklusiv Resort',
            suitableFor: 'Familjer/Golf'
        },
        {
            area: 'Nueva Andalucía',
            slug: 'nueva-andalucia',
            pricePerM2: 4200,
            character: 'Golfdalen, Puls',
            suitableFor: 'De som vill synas'
        },
        {
            area: 'Marbella',
            slug: 'marbella',
            pricePerM2: 4500,
            character: 'Lyx, Stad',
            suitableFor: 'Cityälskare'
        },
        {
            area: 'Manilva',
            slug: 'manilva',
            pricePerM2: 2200,
            character: 'Enklare, Prisvärt',
            suitableFor: 'Budget'
        }
    ]
};
