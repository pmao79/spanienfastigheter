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
        },
        {
            question: 'Är det en bra investering att köpa lägenhet i Spanien?',
            answer: 'Ja, Torrevieja och Costa Blanca är utmärkta investeringar tack vare:\n\nFördelar:\n- Stark hyresmarknad: Turister + vinterboende ger 8-12 månaders uthyrning/år\n- Prisökning: Historiskt 3-5% per år\n- Låga driftskostnader: Avgifter från 300-800 EUR/år\n- Hög efterfrågan: Många svenska köpare = lätt att sälja vidare\n- Klimat: 300 soldagar/år = attraktivt året runt\n\nHyresavkastning: 4-7% per år (beroende på läge och uthyrningsgrad)\n\nPrisexempel Torrevieja:\n- 2015: 100 000 EUR\n- 2020: 120 000 EUR (+20%)\n- 2025: 145 000 EUR (+21%)'
        },
        {
            question: 'Vad kostar det att köpa en lägenhet i Spanien?',
            answer: 'Utöver köpesumman tillkommer följande kostnader:\n\nObligatoriska kostnader:\n- Stämpelskatt (ITP): 8-10% av köpesumman\n- Notariekostnader: 600-1 200 EUR\n- Registrering: 400-800 EUR\n- Juridisk rådgivning: 1 000-2 000 EUR\n\nTotalt: Räkna med 10-13% av köpesumman i tillkommande kostnader.\n\nExempel: Lägenhet för 150 000 EUR = 15 000-19 500 EUR i tillkommande kostnader.'
        },
        {
            question: 'Hur köper man bostad i Spanien?',
            answer: 'Steg-för-steg guide:\n\n1. Förberedelser (1-2 veckor)\n- Ansök om NIE-nummer (skattenummer)\n- Öppna spanskt bankkonto\n- Anlita svensk-talande mäklare\n\n2. Hitta bostad (2-8 veckor)\n- Besök fastigheter\n- Jämför priser och områden\n- Gör besiktning (rekommenderas)\n\n3. Förhandsavtal (1 vecka)\n- Skriva under förhandsavtal (contrato de arras)\n- Betala handpenning (10% av köpesumman)\n\n4. Slutavtal (4-8 veckor)\n- Notariebesök\n- Betala resterande summa + kostnader\n- Få nycklar!\n\nTotal tid: 2-4 månader från start till färdigt.'
        },
        {
            question: 'Behöver man NIE-nummer för att köpa bostad i Spanien?',
            answer: 'Ja, NIE-nummer är OBLIGATORISKT för att köpa fastighet i Spanien.\n\nVad är NIE?\n- Número de Identificación de Extranjero\n- Spanskt skattenummer för utlänningar\n- Behövs för alla ekonomiska transaktioner\n\nHur får man NIE?\n1. Boka tid på spanska konsulatet i Sverige\n2. Fyll i ansökan (EX-15)\n3. Betala avgift (~10 EUR)\n4. Vänta 2-4 veckor\n\nEller: Ansök direkt i Spanien (snabbare, 1-2 dagar)'
        },
        {
            question: 'Hur lång tid tar det att köpa hus i Spanien?',
            answer: 'Total tid: 2-4 månader\n\nTidsplan:\n- Vecka 1-2: NIE-nummer + bankkonto\n- Vecka 3-8: Hitta bostad\n- Vecka 9: Förhandsavtal + handpenning\n- Vecka 10-16: Juridisk granskning\n- Vecka 16: Slutavtal hos notarie\n\nSnabbaste: 6 veckor (om allt går smidigt)\nLångsammaste: 6 månader (vid komplikationer)'
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
