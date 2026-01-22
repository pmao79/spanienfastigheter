import { AreaDetail } from '@/types/property';

export const PLAYA_FLAMENCA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 5000, year: 2025, source: 'Estimat (Orihuela Costa total 30k)' },
        foreignPercentage: { value: 50, source: 'Lokala estimat' },
        swedesEstimate: { value: 800, note: 'Uppskattat antal' },
        airportDistance: { km: 55, minutes: 45, airport: 'Alicante-Elche (ALC)' },
        pricePerM2: { value: 2750, source: 'Marknadsanalys 2026', year: 2026 },
        sunshineHours: { value: 2900 },
        averageTemp: { annual: 19, january: 14, july: 28 }
    },
    districts: [
        {
            name: 'Strandnära (Cala Mosca)',
            character: 'Exklusivt läge nära de vackra vikarna och strandpromenaden.',
            pricePerM2: 3200,
            suitableFor: ['Semesterfirare', 'Investerare'],
            pros: ['Hög uthyrningspotential', 'Havsutsikt', 'Gångavstånd strand'],
            cons: ['Högre prislapp', 'Livligt på sommaren']
        },
        {
            name: 'Centrala Playa Flamenca',
            character: 'Området kring lördagsmarknaden och Mercadona. Praktiskt och levande.',
            pricePerM2: 2500,
            suitableFor: ['Åretruntboende', 'Pensionärer'],
            pros: ['Nära all service', 'Bra bussförbindelser', 'Prisvärt'],
            cons: ['trafik vid marknadsdagar', 'Mindre semesterkänsla än vid havet']
        },
        {
            name: 'La Florida',
            character: 'Etablerat villaområde strax ovanför N-332. Mycket populärt bland expats.',
            pricePerM2: 2200,
            suitableFor: ['Husägare', 'Barnfamiljer'],
            pros: ['Lugnare tempo', 'Större tomter', 'Kända restauranger (Waldemars)'],
            cons: ['Längre till havet (cykel/bil krävs)', 'Backigt']
        }
    ],
    whySwedes: [
        'Perfekt balans: Inte lika hektiskt som Torrevieja centrum, men mer liv än rena sovstäder.',
        'Lördagsmarknaden: En veckotradition för många svenskar att köpa frukt och grönt här.',
        'Zenia Boulevard: Närheten till kustens största köpcentrum (gångavstånd från många delar).',
        'Svensk service: Här finns skandinaviska mäklare, frisörer och restauranger runt hörnet.'
    ],
    notSuitableFor: [
        'Den som vill ha total ödslighet – det är ett populärt och bebyggt område.',
        'Den som söker autentisk, gammal spansk arkitektur (här är det mestadels byggt efter 1990).',
        'Festprissen som vill ha nattklubbar öppna till 06 (då är Benidorm eller Torrevieja hamn bättre).'
    ],
    market: {
        priceChange5Year: 7.7,
        rentalYield: 5.5,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 80000, max: 110000 },
            twoRoom: { min: 140000, max: 190000 },
            threeRoom: { min: 190000, max: 280000 },
            townhouse: { min: 220000, max: 350000 },
            villa: { min: 450000, max: 900000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 14, stockholmTemp: -2, difference: 16 },
        { month: 'Apr', areaTemp: 19, stockholmTemp: 5, difference: 14 },
        { month: 'Jul', areaTemp: 29, stockholmTemp: 18, difference: 11, seaTemp: 26 },
        { month: 'Okt', areaTemp: 22, stockholmTemp: 8, difference: 14 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian, Ryanair', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: '3-4 ggr/vecka' }
        ],
        airportTransfer: 'Flygbuss till Torrevieja (€7) sen taxi (€15). Direkt taxi ca €55-60. Många svenskar har "parkeringsservice" på flygplatsen för egen bil.',
        nieInfo: 'Hanteras via polisen i Orihuela Costa (vid kommunhuset i Playa Flamenca).',
        healthcare: 'Svenska vårdcentraler finns. Universitetssjukhuset i Torrevieja ligger bara 5 min biltur bort.',
        swedishServices: ['Skandinaviska kyrkan', 'Svenska butiker i närheten', 'Svenskt föreningsliv']
    },
    lifestyle: {
        beaches: [
            { name: 'Cala Mosca', type: 'Sandstrand/Vik', features: 'Naturlig, badvänlig, strandpromenad' },
            { name: 'Cala Estaca', type: 'Sandstrand', features: 'Blå flagg, chiringuito' }
        ],
        golfCourses: [
            { name: 'Villamartín', distance: '3 km' },
            { name: 'Las Ramblas', distance: '5 km' },
            { name: 'Campoamor', distance: '6 km' }
        ],
        restaurants: 'Enormt utbud. Allt från Burger King vid köpcentret till finsmakarmat vid havet (The Lobster).',
        nightlife: 'Avslappnat. Många pubar med livemusik och karaoke, särskilt i kommersiella centra som Via Park.',
        activities: ['Go-kart (populärt)', 'Marknadsshopping', 'Strandpromenad till Punta Prima', 'Shopping på Zenia Blvd']
    },
    faq: [
        {
            question: 'Är det backigt?',
            answer: 'Nej, Playa Flamenca är relativt platt jämfört med områden längre inåt land, vilket gör det cykelvänligt.'
        },
        {
            question: 'Hur är lördagsmarknaden?',
            answer: 'Det är en av kustens största marknader. Här köper du färsk frukt, grönsaker, kläder och skor till fyndpriser. Men se upp för trafiken på förmiddagarna!'
        },
        {
            question: 'Kan man bo här utan bil?',
            answer: 'Ja, faktiskt. Om du bor centralt har du gångavstånd till mataffär, strand och köpcentrum. Bussförbindelserna till Torrevieja är också helt okej.'
        }
    ],
    comparison: [
        {
            area: 'Torrevieja',
            slug: 'torrevieja',
            pricePerM2: 2600,
            character: 'Mer stad, högre hus',
            suitableFor: 'Stadsmänniskan'
        },
        {
            area: 'La Zenia',
            slug: 'la-zenia',
            pricePerM2: 2900,
            character: 'Mer kommersiellt, dyrare strandläge',
            suitableFor: 'Shopparen'
        },
        {
            area: 'Villamartín',
            slug: 'villamartin',
            pricePerM2: 1535,
            character: 'Mer golf och grönska, längre från havet',
            suitableFor: 'Golfaren'
        }
    ]
};
