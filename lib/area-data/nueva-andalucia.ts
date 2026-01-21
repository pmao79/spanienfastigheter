import { AreaDetail } from '@/types/property';

export const NUEVA_ANDALUCIA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 18500, year: 2024, source: 'Estimate' },
        foreignPercentage: { value: 65, source: 'Estimate' },
        swedesEstimate: { value: 2500, note: 'Ett av de svensktätaste områdena' },
        airportDistance: { km: 60, minutes: 45, airport: 'Malaga (AGP)' },
        pricePerM2: { value: 4200, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 18.5, january: 13.0, july: 26.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Golf Valley (Las Brisas / Aloha)',
            character: 'Golf & Villor',
            pricePerM2: 4800,
            suitableFor: ['Golfare', 'Svenska familjer'],
            pros: ['Här ligger de bästa banorna (Las Brisas, Aloha, Los Naranjos)', 'Väldigt svensktätt med svenska butiker/skolor', 'Grönt och lummigt'],
            cons: ['Kräver bil', 'Höga priser'],
            coordinates: { lat: 36.5100, lng: -4.9600 }
        },
        {
            name: 'Centro Plaza',
            character: 'Puls & Utsikt',
            pricePerM2: 4200,
            suitableFor: ['Shoppingsugna', 'Sociala'],
            pros: ['Gångavstånd till Puerto Banús', 'Lördagsmarknaden är en klassiker', 'Bra restauranger och gym'],
            cons: ['Backigt att gå hem', 'Trafikerat'],
            coordinates: { lat: 36.5050, lng: -4.9550 }
        },
        {
            name: 'La Campana',
            character: 'Lokalt & Prisvärt',
            pricePerM2: 2900,
            suitableFor: ['Året-runt-boende', 'Budgetmedvetna'],
            pros: ['Mer spansk känsla', 'Betydligt billigare bostäder (lägenheter)', 'All service runt hörnet'],
            cons: ['Mindre "lyxkänsla"', 'Tätare bebyggelse'],
            coordinates: { lat: 36.5150, lng: -4.9700 }
        },
        {
            name: 'La Cerquilla',
            character: 'Ultra-Lyx',
            pricePerM2: 7000,
            suitableFor: ['Eliten', 'Investerare'],
            pros: ['Ett av kustens mest exklusiva villaområden', 'Total privacy', 'Fantastiska vyer'],
            cons: ['Priserna startar ofta på 3-4 miljoner Euro', 'Tillträde begränsat'],
            coordinates: { lat: 36.5200, lng: -4.9650 }
        }
    ],
    whySwedes: [
        'Svenskheten: Det kallas "Lilla Stockholm". Här finns Svenska Skolan Marbella, Scandi Supermarket och svenska mäklare i drivor.',
        'Golfen: "The Golf Valley" är inte en underdrift. Här bor man mitt på banan.',
        'Livsstilen: Lunch på Centro Plaza, middag i Puerto Banús (5 min bort) och padel på Aloha.',
        'Smindigheten: Allt finns här. Man behöver egentligen inte lämna området.'
    ],
    notSuitableFor: [
        'De som vill träna på sin spanska (här pratar "alla" svenska eller engelska).',
        'De som söker en autentisk fiskeby (detta är ett uppbyggt bostadsområde).',
        'Budgetköpare som vill ha hus (då får man söka sig till La Campana eller längre bort).'
    ],
    market: {
        priceChange5Year: 38.0,
        rentalYield: 4.2,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 200000, max: 280000 },
            twoRoom: { min: 280000, max: 450000 },
            threeRoom: { min: 400000, max: 700000 },
            townhouse: { min: 500000, max: 900000 },
            villa: { min: 1200000, max: 8000000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 14, stockholmTemp: -2, difference: 16 },
        { month: 'Apr', areaTemp: 19, stockholmTemp: 5, difference: 14 },
        { month: 'Jul', areaTemp: 28, stockholmTemp: 18, difference: 10, seaTemp: 23 },
        { month: 'Okt', areaTemp: 21, stockholmTemp: 8, difference: 13 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen (AGP)' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca 45-50 min. Flygbuss till Marbella busstation, sen taxi.',
        nieInfo: 'Söks hos Policia Nacional i Marbella.',
        healthcare: 'Många privata kliniker (Magna Clinic etc). Sjukhuset Costa del Sol ligger 10 min bort.',
        swedishServices: ['Svenska Skolan Marbella ligger här', 'Svenska kyrkan i Fuengirola (25 min)', 'Hundratals svenska företag']
    },
    faq: [
        {
            question: 'Är det gångavstånd till stranden?',
            answer: 'Från nedre delen (Centro Plaza/Aloha): Ja, ca 15-20 min promenad. Från övre delen: Nej, bil/taxi krävs.'
        },
        {
            question: 'Är det säkert?',
            answer: 'Ja, många områden är "gated" med vakt under natten.'
        },
        {
            question: 'Passar det barnfamiljer?',
            answer: 'Extremt bra. Svenska Skolan ligger mitt i området och det finns massor av aktiviteter.'
        },
        {
            question: 'Vad är skillnaden mot Marbella stad?',
            answer: 'Detta är ett rent bostadsområde/resort, medan Marbella är en riktig stad med spanskt liv.'
        }
    ],
    comparison: [
        {
            area: 'Nueva Andalucía',
            slug: 'nueva-andalucia',
            pricePerM2: 4200,
            character: 'Svenskt, Golf',
            suitableFor: 'Barnfamiljer'
        },
        {
            area: 'Puerto Banús',
            slug: 'puerto-banus',
            pricePerM2: 5500,
            character: 'Lyx, Party',
            suitableFor: 'Jetset'
        },
        {
            area: 'San Pedro',
            slug: 'san-pedro-de-alcantara',
            pricePerM2: 3600,
            character: 'Spanskt, Strand',
            suitableFor: 'Allround'
        },
        {
            area: 'Benahavís',
            slug: 'benahavis',
            pricePerM2: 3800,
            character: 'Bergsby, Lyx',
            suitableFor: 'Livsnjutare'
        }
    ]
};
