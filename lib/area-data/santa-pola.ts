import { AreaDetail } from '@/types/property';

export const SANTA_POLA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 37816, year: 2023, source: 'INE' },
        foreignPercentage: { value: 28, source: 'Local Registry' },
        swedesEstimate: { value: 1800, note: 'Stark närvaro i Gran Alacant' },
        airportDistance: { km: 15, minutes: 15, airport: 'Alicante (ALC)' },
        pricePerM2: { value: 2150, source: 'Idealista', year: 2024 },
        sunshineHours: { value: 3050 },
        averageTemp: { annual: 18.5, january: 11.5, july: 26.5 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 50 }
    },
    districts: [
        {
            name: 'Santa Pola del Este',
            character: 'Premium & Lugnt',
            pricePerM2: 2900,
            suitableFor: ['Pensionärer', 'Livsnjutare', 'Lyxsökare'],
            pros: ['Fantastisk utsikt', 'Exklusiv atmosfär', 'Vackra vikar'],
            cons: ['Högre prisläge', 'Lite längre till centrum'],
            coordinates: { lat: 38.1885, lng: -0.5305 }
        },
        {
            name: 'Gran Alacant',
            character: 'Modernt & Internationellt',
            pricePerM2: 2600,
            suitableFor: ['Barnfamiljer', 'Pendlande', 'Semesterfirare'],
            pros: ['Otrolig havsutsikt', 'Nära flygplatsen', 'Stort köpcentrum nära'],
            cons: ['Kräver bil (backigt)', 'Mer "resort" än spansk stad'],
            coordinates: { lat: 38.2280, lng: -0.5235 }
        },
        {
            name: 'Centro / Puerto',
            character: 'Puls & Marint',
            pricePerM2: 2100,
            suitableFor: ['Året-runt-boende', 'Stadsälskare', 'Båtägare'],
            pros: ['Gångavstånd till allt', 'Levande året runt', 'Spaniens bästa fiskrestauranger'],
            cons: ['Parkeringsutmaningar', 'Livligt under sommaren'],
            coordinates: { lat: 38.1915, lng: -0.5595 }
        },
        {
            name: 'Gran Playa / Playa Lisa',
            character: 'Strand & Familj',
            pricePerM2: 1950,
            suitableFor: ['Barnfamiljer', 'Sommargäster', 'Seniorer'],
            pros: ['Platt terräng', 'Långgrunda stränder', 'Prisvärt'],
            cons: ['Lugnt på vintern', 'Kan vara fuktigt nära saltverken'],
            coordinates: { lat: 38.1895, lng: -0.5750 }
        }
    ],
    whySwedes: [
        'Oslagbar logistik: Var hemma i soffan 15 minuter efter att du landat på flygplatsen.',
        'Autentisk spansk känsla: En levande fiskestad som inte bara är en turistkuliss.',
        'Tabarca-ön: Möjligheten att ta en båttur till Spaniens enda bebodda ö för snorkling och lunch.',
        'Prisvärdheten: Du får betydligt mer boyta för pengarna här än i norra Costa Blanca.'
    ],
    notSuitableFor: [
        'De som söker en "Little England"-bubbla (här dominerar det spanska livet).',
        'Partysugna som vill ha nattklubbar som i Benidorm.',
        'Personer som vill ha lummig tropisk grönska (landskapet är torrt och mediterrant).'
    ],
    market: {
        priceChange5Year: 28.0,
        rentalYield: 5.5,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 90000, max: 120000 },
            twoRoom: { min: 140000, max: 200000 },
            threeRoom: { min: 190000, max: 350000 },
            townhouse: { min: 250000, max: 400000 },
            villa: { min: 450000, max: 1500000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 12, stockholmTemp: -2, difference: 14 },
        { month: 'Apr', areaTemp: 19, stockholmTemp: 5, difference: 14 },
        { month: 'Jul', areaTemp: 27, stockholmTemp: 18, difference: 9, seaTemp: 26 },
        { month: 'Okt', areaTemp: 22, stockholmTemp: 8, difference: 14 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian, Ryanair', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca 15 min (~25€). Buss (C-6) går regelbundet.',
        nieInfo: 'Söks hos Policia Nacional i Elche eller Alicante. Lokala gestorias hjälper till.',
        healthcare: 'Stort hälsocenter (Centro de Salud) i centrum. Sjukhus i Elche (20 min).',
        swedishServices: ['Skandinaviska Skolan Alicante (15 min)', 'Svenska klubbar i Gran Alacant', 'El Plantío Golf (12 min)']
    },
    faq: [
        {
            question: 'Är det bullrigt från flygplatsen?',
            answer: 'Trots närheten ligger Santa Pola inte i flygkorridoren, så det är förvånansvärt tyst. Gran Alacant kan höra mer trafik beroende på vind.'
        },
        {
            question: 'Passar det för barnfamiljer?',
            answer: 'Absolut! Gran Playa och Playa Lisa är extremt långgrunda och säkra. Pola Park är en stor favorit bland barnen.'
        },
        {
            question: 'Hur är Gran Alacant vs Santa Pola city?',
            answer: 'Gran Alacant är en modern "urba" på höjden (kräver bil, internationellt). Santa Pola city är platt, genuint spanskt och gångvänligt.'
        },
        {
            question: 'Finns det tåg?',
            answer: 'Nej, men Alicantes tågstation är bara 20 minuter bort med buss eller taxi.'
        }
    ],
    comparison: [
        {
            area: 'Santa Pola',
            slug: 'santa-pola',
            pricePerM2: 2150,
            character: 'Fiskeby, Flygnära',
            suitableFor: 'Bekvämlighet'
        },
        {
            area: 'Guardamar',
            slug: 'guardamar',
            pricePerM2: 2450,
            character: 'Natur, Strand',
            suitableFor: 'Naturälskare'
        },
        {
            area: 'Alicante',
            slug: 'alicante',
            pricePerM2: 2850,
            character: 'Storstad, Puls',
            suitableFor: 'Urbaniter'
        },
        {
            area: 'Torrevieja',
            slug: 'torrevieja',
            pricePerM2: 1850,
            character: 'Svenskkoloni',
            suitableFor: 'Prismedvetna'
        }
    ]
};
