import { AreaDetail } from '@/types/property';

export const MARBELLA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 172063, year: 2025, source: 'INE/Local Registry' },
        foreignPercentage: { value: 30, source: 'INE' },
        swedesEstimate: { value: 2500, note: 'Registrerade (mörkertal finns)' },
        airportDistance: { km: 51, minutes: 45, airport: 'Málaga (AGP)' },
        pricePerM2: { value: 5410, source: 'Idealista/Notaries', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 17.3, january: 11.0, july: 26.0 }
    },
    districts: [
        {
            name: 'Golden Mile',
            character: 'Exklusivt, lyxvillor, strandpromenad och 5-stjärniga hotell.',
            pricePerM2: 7500,
            suitableFor: ['Lyxletare', 'Investerare', 'Kändisar'],
            pros: ['Världsklass status', 'Strandnära', 'Bästa restaurangerna'],
            cons: ['Extremt dyrt', 'Mycket trafik sommartid']
        },
        {
            name: 'Nueva Andalucía',
            character: 'Golfdalen. Svenskkolonin nummer ett med villor och nattliv.',
            pricePerM2: 5578,
            suitableFor: ['Golfare', 'Barnfamiljer', 'Svenskar'],
            pros: ['Svenska skolan', 'Nära Puerto Banús', 'Fantastisk golf'],
            cons: ['Kräver bil', 'Höga priser']
        },
        {
            name: 'Elviria',
            character: 'Grönskande, lugnare, fina sandstränder och klättrarpark.',
            pricePerM2: 4375,
            suitableFor: ['Barnfamiljer', 'Naturälskare'],
            pros: ['Bästa stränderna', 'Mer prisvärt', 'Lugnt tempo'],
            cons: ['Längre från centrum', 'Färre nattklubbar']
        },
        {
            name: 'San Pedro',
            character: 'Autentisk spansk stadskänsla med modern boulevard och strand.',
            pricePerM2: 3800,
            suitableFor: ['Året-runt-boende', 'Familjer'],
            pros: ['Platt och promenadvänligt', 'Bra priser', 'Levande året runt'],
            cons: ['Mindre "glamour"', 'Längre från flygplatsen']
        }
    ],
    whySwedes: [
        'Den oslagbara livskvalitén med 320 soldagar och Europas bästa golf.',
        'Svenska skolan i Marbella (Nueva Andalucía) är en magnet för barnfamiljer.',
        'Det väletablerade skandinaviska communityt – du klarar dig bra på svenska/engelska.',
        'Känslan av lyx och trygghet i de många "gated communities" som finns.'
    ],
    notSuitableFor: [
        'Den som söker en budgetbostad (titta hellre på Estepona eller Fuengirola).',
        'Dig som vill uppleva det "ursprungliga, enkla Spanien" utan internationell prägel.',
        'De som ogillar biltrafik – Marbella är utbrett och kräver ofta bil.',
        'Personer som vill ha total tystnad (sommartid är pulsen hög överallt).'
    ],
    market: {
        priceChange5Year: 9.0,
        rentalYield: 4.5,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 200000, max: 350000 },
            twoRoom: { min: 350000, max: 600000 },
            threeRoom: { min: 500000, max: 950000 },
            townhouse: { min: 600000, max: 1200000 },
            villa: { min: 1500000, max: 8000000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 17, stockholmTemp: -2, difference: 19 },
        { month: 'Apr', areaTemp: 20, stockholmTemp: 5, difference: 15 },
        { month: 'Jul', areaTemp: 29, stockholmTemp: 18, difference: 11, seaTemp: 24 },
        { month: 'Okt', areaTemp: 23, stockholmTemp: 8, difference: 15 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian, Ryanair', frequency: 'Flera dagligen' },
            { from: 'Göteborg', airline: 'Norwegian, Ryanair', frequency: 'Dagligen' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Flygbuss (Avanza) går direkt från AGP till Marbella Busstation (ca 9€). Taxi kostar ca 70-90€. Hyrbil är standard för boende här.',
        nieInfo: 'NIE krävs. Kan sökas på Policia Nacional i Marbella (C/ Duque de Lerma). Mycket långa väntetider – anlita ombud (gestoria).',
        healthcare: 'Hospital Quirónsalud är regionens främsta privatsjukhus. Det finns även många svenska läkare och tandläkare i Nueva Andalucía.',
        swedishServices: ['Svenska Skolan Marbella', 'Svenska Kyrkan i Fuengirola (nära)', 'Spanska Fastigheter (svenska mäklare)', 'Svenska frisörer & butiker']
    },
    faq: [
        {
            question: 'Var bor flest svenskar?',
            answer: 'Nueva Andalucía är tveklöst svenskarnas favorit, ofta kallat "Lilla Stockholm". Även Elviria och San Pedro är populärt.'
        },
        {
            question: 'Är det dyrt att leva i Marbella?',
            answer: 'Boendekostnaden är hög, men levnadsomkostnader (mat, dryck, tjänster) är fortfarande lägre än i Sverige. Golf och lyxrestauranger drar dock upp snittet.'
        },
        {
            question: 'Hur är skolorna?',
            answer: 'Toppklass. Förutom Svenska Skolan finns Aloha College, Swans, och Laude som erbjuder internationell läroplan (IB/brittisk).'
        },
        {
            question: 'Kan man klara sig utan bil?',
            answer: 'Nja. Om du bor i själva centrum eller precis vid strandpromenaden går det, men för att nå golfbanor, köpcentrum och skolor är bil nästan ett måste.'
        }
    ],
    comparison: [
        {
            area: 'Marbella',
            slug: 'marbella',
            pricePerM2: 5410,
            character: 'Lyx, puls, golf',
            suitableFor: 'Livsnjutare'
        },
        {
            area: 'Estepona',
            slug: 'estepona',
            pricePerM2: 3800,
            character: 'Blommigt, familjärt',
            suitableFor: 'Familjer/Värde'
        },
        {
            area: 'Mijas',
            slug: 'mijas',
            pricePerM2: 3000,
            character: 'Charmigt, natur',
            suitableFor: 'Pensionärer'
        },
        {
            area: 'Fuengirola',
            slug: 'fuengirola',
            pricePerM2: 3200,
            character: 'Svensk-vänligt, tåg',
            suitableFor: 'Bekvämlighet'
        }
    ]
};
