import { AreaDetail } from '@/types/property';

export const GUARDAMAR_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 17500, year: 2024, source: 'INE' },
        foreignPercentage: { value: 30, source: 'Local Registry' },
        swedesEstimate: { value: 1500, note: 'Populärt bland skandinaver' },
        airportDistance: { km: 33, minutes: 35, airport: 'Alicante (ALC)' },
        pricePerM2: { value: 2850, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3000 },
        averageTemp: { annual: 19.0, january: 12.0, july: 27.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 45 }
    },
    districts: [
        {
            name: 'Centro (Pueblo)',
            character: 'Puls & Service',
            pricePerM2: 2400,
            suitableFor: ['Familjer', 'Pensionärer', 'Året-runt-boende'],
            pros: ['Gångavstånd till allt', 'Autentisk spansk atmosfär', 'Nära Reina Sofía-parken'],
            cons: ['Svårt med parkering', 'Mer bykänsla än strand'],
            coordinates: { lat: 38.0894, lng: -0.6552 }
        },
        {
            name: 'Playa Centro / La Roqueta',
            character: 'Strand & Semester',
            pricePerM2: 3200,
            suitableFor: ['Semesterfirare', 'Investerare', 'Solälskare'],
            pros: ['Direkt tillgång till strand', 'Hög uthyrningspotential', 'Fantastisk havsutsikt'],
            cons: ['Mycket folk på sommaren', 'Dyrare bostäder'],
            coordinates: { lat: 38.0805, lng: -0.6485 }
        },
        {
            name: 'El Raso',
            character: 'Modernt Expat-boende',
            pricePerM2: 2750,
            suitableFor: ['Pensionärer', 'Familjer', 'Golfare'],
            pros: ['Moderna villor', 'Lugnt och fridfullt', 'Social internationell gemenskap'],
            cons: ['Kräver bil', 'Mindre spansk känsla'],
            coordinates: { lat: 38.0565, lng: -0.6845 }
        },
        {
            name: 'Campomar (Moncayo)',
            character: 'Natur & Lugn',
            pricePerM2: 2600,
            suitableFor: ['Naturälskare', 'Semesterboende'],
            pros: ['Omgiven av natur', 'Gångavstånd till vilda stränder', 'Mycket lugnt'],
            cons: ['Begränsad service', 'Kräver ofta bil'],
            coordinates: { lat: 38.0690, lng: -0.6520 }
        }
    ],
    whySwedes: [
        '11 km av världsklassiga sandstränder som aldrig känns överfulla.',
        'Den unika "Pinada" – en massiv kusttallskog perfekt för vandring och cykling.',
        'Platt terräng genom hela staden som gör det extremt enkelt att ta sig fram till fots eller cykel.',
        'Behåller en autentisk spansk själ samtidigt som den erbjuder högkvalitativ service.'
    ],
    notSuitableFor: [
        'De som söker det hektiska nattlivet i en storstad.',
        'Personer som vill ha dramatiska, branta bergslandskap direkt vid kusten.',
        'Icke-bilburna som föredrar att bo i ytterområden som El Raso.'
    ],
    market: {
        priceChange5Year: 18.0,
        rentalYield: 5.5,
        touristLicenseAvailable: true, // Controlled
        typicalPrices: {
            studio: { min: 95000, max: 130000 },
            twoRoom: { min: 160000, max: 260000 },
            threeRoom: { min: 220000, max: 450000 },
            townhouse: { min: 240000, max: 480000 },
            villa: { min: 450000, max: 1200000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 12, stockholmTemp: -2, difference: 14 },
        { month: 'Apr', areaTemp: 18, stockholmTemp: 5, difference: 13 },
        { month: 'Jul', areaTemp: 27, stockholmTemp: 18, difference: 9, seaTemp: 25 },
        { month: 'Okt', areaTemp: 21, stockholmTemp: 8, difference: 13 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian, Ryanair', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca 40 min (~50€). Buss finns men kräver byte.',
        nieInfo: 'Söks hos Policia Nacional eller via ombud. Vi hjälper till med kontakterna.',
        healthcare: 'Vårdcentral (Centro de Salud) i centrum. Universitetssjukhuset i Torrevieja (15 min) för specialistvård.',
        swedishServices: ['Skandinaviska Skolan i Torrevieja (16 km)', 'La Marquesa Golf (6 km)', 'Svenska butiker i närheten']
    },
    faq: [
        {
            question: 'Är det livligt året runt?',
            answer: 'Guardamar är lugnare än Torrevieja på vintern, men har en bofast befolkning som håller service och restauranger öppna året runt.'
        },
        {
            question: 'Behöver jag bil?',
            answer: 'I centrum och nära stranden klarar du dig utmärkt utan bil. För områden som El Raso eller Moncayo rekommenderas bil.'
        },
        {
            question: 'Hur är stränderna?',
            answer: 'Bland de bästa på Costa Blanca. Bred, finkornig sand och backas upp av skyddade sanddyner och tallskog istället för höga hus.'
        },
        {
            question: 'Finns det svenska skolor?',
            answer: 'Närmaste svenska skola är Skandinaviska Skolan i Torrevieja, ca 20 minuters bilresa bort.'
        },
        {
            question: 'Var ska man köpa hus i Spanien?',
            answer: 'Bästa områdena för svenska köpare:\n\nCosta Blanca (populärast):\n- Torrevieja – Störst svensk community, billigare\n- Orihuela Costa – Strandnära, golfbanor\n- Guardamar – Lugnare, familjevänligt\n- Alicante – Storstad, flygplats nära\n\nCosta del Sol:\n- Marbella – Exklusivt, dyrare\n- Fuengirola – Svensk community\n- Estepona – Charmigt, växande\n\nVälj baserat på:\n- Budget (Torrevieja billigast, Marbella dyrast)\n- Livsstil (lugnt vs. puls)\n- Avstånd till flygplats\n- Svensk community (viktigt för många)'
        },
        {
            question: 'Vad kostar det att köpa hus i Spanien?',
            answer: 'För hus/villor gäller samma kostnader som lägenheter, men ofta högre belopp:\n\n- Stämpelskatt: 8-10% (vid befintlig bostad) eller 10% moms (vid nyproduktion)\n- Notarie: 1 000-2 000 EUR (högre för dyrare fastigheter)\n- Registrering: 600-1 200 EUR\n- Juridisk rådgivning: 1 500-3 000 EUR\n- Besiktning: 300-600 EUR (rekommenderas starkt)\n\nTotalt: 10-15% av köpesumman.'
        },
        {
            question: 'Hur köper man bostad i Spanien?',
            answer: 'Steg-för-steg guide:\n\n1. Förberedelser (1-2 veckor)\n- Ansök om NIE-nummer (skattenummer)\n- Öppna spanskt bankkonto\n- Anlita svensk-talande mäklare\n\n2. Hitta bostad (2-8 veckor)\n- Besök fastigheter\n- Jämför priser och områden\n- Gör besiktning (rekommenderas)\n\n3. Förhandsavtal (1 vecka)\n- Skriva under förhandsavtal (contrato de arras)\n- Betala handpenning (10% av köpesumman)\n\n4. Slutavtal (4-8 veckor)\n- Notariebesök\n- Betala resterande summa + kostnader\n- Få nycklar!\n\nTotal tid: 2-4 månader från start till färdigt.'
        },
        {
            question: 'Behöver man NIE-nummer för att köpa bostad i Spanien?',
            answer: 'Ja, NIE-nummer är OBLIGATORISKT för att köpa fastighet i Spanien.\n\nVad är NIE?\n- Número de Identificación de Extranjero\n- Spanskt skattenummer för utlänningar\n- Behövs för alla ekonomiska transaktioner\n\nHur får man NIE?\n1. Boka tid på spanska konsulatet i Sverige\n2. Fyll i ansökan (EX-15)\n3. Betala avgift (~10 EUR)\n4. Vänta 2-4 veckor\n\nEller: Ansök direkt i Spanien (snabbare, 1-2 dagar)'
        }
    ],
    comparison: [
        {
            area: 'Guardamar',
            slug: 'guardamar',
            pricePerM2: 2450,
            character: 'Natur, Strand',
            suitableFor: 'Naturälskare'
        },
        {
            area: 'Torrevieja',
            slug: 'torrevieja',
            pricePerM2: 1850,
            character: 'Puls, Svenskkoloni',
            suitableFor: 'Prismedvetna'
        },
        {
            area: 'Santa Pola',
            slug: 'santa-pola',
            pricePerM2: 2100,
            character: 'Fiskeby, Familj',
            suitableFor: 'Kustälskare'
        },
        {
            area: 'La Mata',
            slug: 'la-mata',
            pricePerM2: 2300,
            character: 'Strand, Lugnt',
            suitableFor: 'Semesterfirare'
        }
    ]
};
