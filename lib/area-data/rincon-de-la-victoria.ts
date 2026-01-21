import { AreaDetail } from '@/types/property';

export const RINCON_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 52000, year: 2024, source: 'INE' },
        foreignPercentage: { value: 10, source: 'Estimate' },
        swedesEstimate: { value: 200, note: 'Ökande intresse' },
        airportDistance: { km: 28, minutes: 25, airport: 'Malaga (AGP)' },
        pricePerM2: { value: 2600, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 19.0, january: 13.0, july: 27.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Rincón de la Victoria (Centro)',
            character: 'Stad & Strand',
            pricePerM2: 2700,
            suitableFor: ['Barnfamiljer', 'Året-runt-boende'],
            pros: ['All service året runt (det är en riktig stad)', 'Fin strandpromenad med tunnlar i berget', 'Nära Malaga'],
            cons: ['Mycket trafik på huvudgatan', 'Svårt med parkering'],
            coordinates: { lat: 36.7200, lng: -4.2800 }
        },
        {
            name: 'La Cala del Moral',
            character: 'Förort & Charm',
            pricePerM2: 2800,
            suitableFor: ['Pendlare', 'Par'],
            pros: ['Ligger närmast Malaga (10-15 min)', 'Mysig liten bukt och strand', 'Bra bussförbindelser'],
            cons: ['Tättbebyggt', 'Priserna har gått upp'],
            coordinates: { lat: 36.7300, lng: -4.2500 }
        },
        {
            name: 'Torre de Benagalbón',
            character: 'Villor & Lugn',
            pricePerM2: 2500,
            suitableFor: ['Villaägare', 'Pensionärer'],
            pros: ['Här finns fler hus och villor än lägenheter', 'Lugnare tempo', 'Nära golfbanan Añoreta'],
            cons: ['Lite längre till affärer', 'Bil behövs oftast'],
            coordinates: { lat: 36.7200, lng: -4.3100 }
        },
        {
            name: 'Añoreta Golf',
            character: 'Golf & Utsikt',
            pricePerM2: 2300,
            suitableFor: ['Golfare', 'Utsiktsälskare'],
            pros: ['Bo mitt på golfbanan', 'Fantastisk utsikt över kusten', 'Moderna radhus och villor'],
            cons: ['Ligger på andra sidan motorvägen (långt till havet)', 'Backigt'],
            coordinates: { lat: 36.7350, lng: -4.2900 }
        }
    ],
    whySwedes: [
        'Närheten till Malaga: Perfekt för den som vill ha tillgång till storstadens utbud men bo vid havet.',
        'Det "riktiga" Spanien: Här är du granne med spanjorer, inte bara turister. Prisnivån på restauranger är lägre.',
        'Stranden: Kilometerlång strand som är bred och fin, med massor av chiringuitos.',
        'Grottorna: Cueva del Tesoro är världens enda marina grotta som går att besöka – en unik sevärdhet.'
    ],
    notSuitableFor: [
        'De som inte vill prata spanska (engelska fungerar sämre här än i Marbella).',
        'De som vill ha internationella lyxbutiker runt hörnet.',
        'De som söker ett resort-liv med all-inclusive.'
    ],
    market: {
        priceChange5Year: 32.0,
        rentalYield: 4.8,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 120000, max: 160000 },
            twoRoom: { min: 170000, max: 280000 },
            threeRoom: { min: 250000, max: 400000 },
            townhouse: { min: 300000, max: 500000 },
            villa: { min: 450000, max: 1200000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 13, stockholmTemp: -2, difference: 15 },
        { month: 'Apr', areaTemp: 19, stockholmTemp: 5, difference: 14 },
        { month: 'Jul', areaTemp: 27, stockholmTemp: 18, difference: 9, seaTemp: 24 },
        { month: 'Okt', areaTemp: 22, stockholmTemp: 8, difference: 14 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen (AGP)' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca 25 min (~35€). Buss M-160 går ofta till Malaga.',
        nieInfo: 'Söks hos Policia Nacional i Malaga (eller Torre del Mar).',
        healthcare: 'Vårdcentral i Rincón. Nära till Malaga sjukhus.',
        swedishServices: ['Inte mycket svensk service lokalt', 'Svenska skolan i Malaga (börjar bli ett alternativ)']
    },
    faq: [
        {
            question: 'Är det mest spanjorer?',
            answer: 'Ja, Rincón är en populär förort till Malaga för spanjorer. Det ger en autentisk känsla.'
        },
        {
            question: 'Hur långt är det till Malaga?',
            answer: 'Bara 12 km. Det går snabbt med bil eller buss.'
        },
        {
            question: 'Finns det golf?',
            answer: 'Ja, Añoreta Golf är en 18-hålsbana som ligger mitt i kommunen.'
        },
        {
            question: 'Är det dyrt?',
            answer: 'Nej, det är generellt billigare än västra Costa del Sol (Marbella-sidan).'
        }
    ],
    comparison: [
        {
            area: 'Rincón de la Victoria',
            slug: 'rincon-de-la-victoria',
            pricePerM2: 2600,
            character: 'Spanskt, Förort',
            suitableFor: 'Året-runt'
        },
        {
            area: 'Málaga City',
            slug: 'malaga',
            pricePerM2: 3200,
            character: 'Storstad',
            suitableFor: 'Cityälskare'
        },
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
            character: 'Turistigt, Vackert',
            suitableFor: 'Semesterfirare'
        }
    ]
};
