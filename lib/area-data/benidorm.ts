import { AreaDetail } from '@/types/property';

export const BENIDORM_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 77211, year: 2025, source: 'INE/City Population' },
        foreignPercentage: { value: 36, source: 'INE' },
        swedesEstimate: { value: 2000, note: 'Uppskattat (del av EU-grupp)' },
        airportDistance: { km: 58, minutes: 40, airport: 'Alicante-Elche (ALC)' },
        pricePerM2: { value: 3617, source: 'Idealista/Indomio', year: 2025 },
        sunshineHours: { value: 3000 },
        averageTemp: { annual: 18.2, january: 12.0, july: 26.0 }
    },
    districts: [
        {
            name: 'Poniente',
            character: 'Lugnare, lyxigare, bred sandstrand och nya skyskrapor.',
            pricePerM2: 4425,
            suitableFor: ['Livsnjutare', 'Investerare', 'Pensionärer'],
            pros: ['Moderna byggnader', 'Fantastisk strand', 'Lugnare tempo'],
            cons: ['Dyrare', 'Längre avstånd till nattliv']
        },
        {
            name: 'Levante & Rincón de Loix',
            character: 'Puls dygnet runt, nära allt, mycket turister.',
            pricePerM2: 4079,
            suitableFor: ['De som vill ha liv', 'Uthyrningsinvestering'],
            pros: ['Allt inom gångavstånd', 'Stort utbud av restauranger', 'Livligt'],
            cons: ['Högljutt', 'Trångt under sommaren', 'Mycket turister']
        },
        {
            name: 'Gamla Stan (Centro)',
            character: 'Charmiga gränder, tapasbarer och spansk atmosfär.',
            pricePerM2: 2789,
            suitableFor: ['Kulturintresserade', 'Par'],
            pros: ['Autentisk känsla', 'Nära båda stränderna', 'Spansk matkultur'],
            cons: ['Ingen parkering', 'Äldre fastigheter', 'Backigt']
        },
        {
            name: 'Cala de Finestrat',
            character: 'Enklav strax utanför centrum, populärt bland barnfamiljer.',
            pricePerM2: 3500,
            suitableFor: ['Barnfamiljer', 'Semesterfirare'],
            pros: ['Egen vik', 'Familjevänligt', 'Platt och lättillgängligt'],
            cons: ['Trafikerat på sommaren', 'Tekniskt sett egen kommun']
        }
    ],
    whySwedes: [
        'Klimatet – Benidorm har ett unikt mikroklimat tack vare bergen som skyddar mot vind.',
        'Det enorma utbudet av nöjen, golf och aktiviteter året runt.',
        'Tryggheten i att ha både svensk skola (i närheten) och skandinaviska läkare.',
        'Möjligheten att leva billigt men ändå ha tillgång till storstadspuls.'
    ],
    notSuitableFor: [
        'Den som söker en tyst, traditionell spansk fiskeby.',
        'Naturälskare som vill undvika höghus och betong.',
        'De som störs av massturism och brittiska pubar (särskilt i Levante).',
        'Personer som vill ha en helt "svensk" miljö (gå hellre till Torrevieja).'
    ],
    market: {
        priceChange5Year: 13.9,
        rentalYield: 5.7,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 100000, max: 180000 },
            twoRoom: { min: 180000, max: 350000 },
            threeRoom: { min: 250000, max: 500000 },
            townhouse: { min: 280000, max: 450000 },
            villa: { min: 500000, max: 2000000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 17, stockholmTemp: -2, difference: 19 },
        { month: 'Apr', areaTemp: 20, stockholmTemp: 5, difference: 15 },
        { month: 'Jul', areaTemp: 29, stockholmTemp: 18, difference: 11, seaTemp: 26 },
        { month: 'Okt', areaTemp: 23, stockholmTemp: 8, difference: 15 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian, Ryanair', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: '3-4 ggr/vecka' },
            { from: 'Malmö', airline: 'Ryanair', frequency: '2-3 ggr/vecka' }
        ],
        airportTransfer: 'Buss (ALSA) direkt från flygplatsen kostar ca 10€. Taxi kostar ca 70-80€. Många shuttle-tjänster som Beniconnect finns.',
        nieInfo: 'NIE-nummer är obligatoriskt. Kan sökas på Policia Nacional i Benidorm (C/ Apolo XI). Tidsbokning krävs långt i förväg.',
        healthcare: 'IMED Levante är ett toppmodernt privatsjukhus med skandinaviska tolkar. Hospital Clinica Benidorm (HCB) är också mycket populärt bland nordbor.',
        swedishServices: ['Svenska Kyrkan Costa Blanca', 'Skandinaviska Klubben', 'Svenska konsulatet (Alicante)', 'Norska skolan (Costa Blanca)']
    },
    faq: [
        {
            question: 'Är Benidorm bara för turister?',
            answer: 'Nej, Benidorm har en fast befolkning på över 75 000 invånare. Poniente-sidan och Gamla Stan har en mer bofast karaktär med lugnare tempo.'
        },
        {
            question: 'Kan man bo där med barn?',
            answer: 'Absolut. Det finns internationella skolor, nöjesparker (Terra Mítica, Aqualandia) och stränderna är mycket barnvänliga och rena.'
        },
        {
            question: 'Är det dyrt att leva i Benidorm?',
            answer: 'Det är generellt billigare än Sverige, särskilt utemat och alkohol. Hyrorna har dock stigit på senare år, men är fortfarande lägre än i svenska storstäder.'
        },
        {
            question: 'Hur är säkerheten?',
            answer: 'Benidorm är tryggt med hög polisnärvaro. Fickstölder förekommer i turistområdena, men våldsbrott är ovanliga.'
        }
    ],
    comparison: [
        {
            area: 'Benidorm',
            slug: 'benidorm',
            pricePerM2: 3617,
            character: 'Skyskrapor, puls',
            suitableFor: 'Alla'
        },
        {
            area: 'Calpe',
            slug: 'calpe',
            pricePerM2: 2800,
            character: 'Klippa, familjärt',
            suitableFor: 'Familjer'
        },
        {
            area: 'Altea',
            slug: 'altea',
            pricePerM2: 3200,
            character: 'Konstnärligt, lugnt',
            suitableFor: 'Livsnjutare'
        },
        {
            area: 'Alicante',
            slug: 'alicante',
            pricePerM2: 2850,
            character: 'Storstad, historia',
            suitableFor: 'Stadsmänniskan'
        }
    ]
};
