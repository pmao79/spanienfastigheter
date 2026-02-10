import { AreaDetail } from '@/types/property';

export const CALPE_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 26637, year: 2024, source: 'INE' },
        foreignPercentage: { value: 53.1, source: 'Local Registry' },
        swedesEstimate: { value: 1200, note: 'Växande community, populärt cykeldestination' },
        airportDistance: { km: 77, minutes: 60, airport: 'Alicante (ALC)' },
        pricePerM2: { value: 3348, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 18.5, january: 12.0, july: 27.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 50 }
    },
    districts: [
        {
            name: 'Arenal-Bol',
            character: 'Strand & Centrum',
            pricePerM2: 4200,
            suitableFor: ['Investerare', 'Strandälskare', 'Urbaniter'],
            pros: ['Direkt på stranden', 'Gångavstånd till allt', 'Hög uthyrningspotential'],
            cons: ['Mycket livligt på sommaren', 'Turistigt', 'Parkering svårt'],
            coordinates: { lat: 38.6417, lng: 0.0468 }
        },
        {
            name: 'Playa de la Fossa / Levante',
            character: 'Familj & Utsikt',
            pricePerM2: 3800,
            suitableFor: ['Barnfamiljer', 'Semesterfirare', 'Utsiktsjägare'],
            pros: ['Ikonisk utsikt över Klippan', 'Familjevänlig strand', 'Nära saltsjöarna'],
            cons: ['Väldigt säsongsbetonat', 'Hög bebyggelse (skyskrapor)', 'Mycket folk juli-augusti'],
            coordinates: { lat: 38.6535, lng: 0.0681 }
        },
        {
            name: 'Maryvilla',
            character: 'Panorama & Villor',
            pricePerM2: 3500,
            suitableFor: ['Livsnjutare', 'Villaköpare', 'Integritet'],
            pros: ['Kustens kanske bästa utsikt', 'Privat och lugnt', 'Exklusiva villor'],
            cons: ['Brant terräng (kräver bil)', 'Få butiker i området', 'Vissa delar skuggas av berget'],
            coordinates: { lat: 38.6315, lng: 0.0245 }
        },
        {
            name: 'Casco Antiguo',
            character: 'Historiskt & Charm',
            pricePerM2: 2600,
            suitableFor: ['Kulturintresserade', 'Budgetmedvetna', 'Par'],
            pros: ['Genuin spansk atmosfär', 'Vackra gränder och torg', 'Lugnare än stranden'],
            cons: ['15-20 min promenad till havet', 'Backigt och trappor', 'Svårt med bil'],
            coordinates: { lat: 38.6445, lng: 0.0445 }
        }
    ],
    whySwedes: [
        'Klippan (Peñón de Ifach): Ett ikoniskt landmärke som ger karaktär och fantastiska vandringsmöjligheter.',
        'Cykelkulturen: Calpe är ett världscentrum för cykling där många proffslag vintertränar.',
        'Kontrasterna: Blandningen av långa sandstränder, dramatisk natur och en charmig gammal stadskärna.',
        'Mikroklimatet: Skyddat av bergen är vintrarna milda och soliga.'
    ],
    notSuitableFor: [
        'De som söker total tystnad och avskildhet (Calpe är en levande stad året runt).',
        'Rörelsehindrade som vill bo i Maryvilla eller Gamla stan (mycket backigt).',
        'Personer som ogillar höghus (Calpe har en "liten Manhattan"-känsla vid stranden).'
    ],
    market: {
        priceChange5Year: 42.0,
        rentalYield: 6.5,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 135000, max: 180000 },
            twoRoom: { min: 280000, max: 450000 },
            threeRoom: { min: 400000, max: 650000 },
            townhouse: { min: 350000, max: 700000 },
            villa: { min: 700000, max: 2500000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 12, stockholmTemp: -2, difference: 14 },
        { month: 'Apr', areaTemp: 18, stockholmTemp: 5, difference: 13 },
        { month: 'Jul', areaTemp: 27, stockholmTemp: 18, difference: 9, seaTemp: 26 },
        { month: 'Okt', areaTemp: 22, stockholmTemp: 8, difference: 14 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Buss (ALSA) tar ca 1,5h. Taxi/Transfer ca 60 min (~80-100€).',
        nieInfo: 'Söks hos Policia Nacional i Benidorm eller Denia.',
        healthcare: 'Centro de Salud i centrum. Sjukhus i Denia (20 min). Privata kliniker finns.',
        swedishServices: ['Svenska kyrkan i Altea (15 min)', 'Svenska mäklare på plats', 'Skandinaviska Skolan i Altea']
    },
    faq: [
        {
            question: 'Är Calpe bara höghus?',
            answer: 'Nej, även om strandlinjen har höga hus finns en mycket charmig gammal stad och stora villaområden som Maryvilla.'
        },
        {
            question: 'Hur är cyklingen?',
            answer: 'Världsklass! Många hotell är "bike-friendly" och vägarna upp i bergen är fantastiska.'
        },
        {
            question: 'Passar det barnfamiljer?',
            answer: 'Absolut. Stränderna är långgrunda och har blå flagg. Det finns lekparker och nära till nöjesparkerna i Benidorm.'
        },
        {
            question: 'Behöver man bil?',
            answer: 'Om du bor vid stranden eller i centrum klarar du dig utan. För Maryvilla eller utflykter är bil ett måste.'
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
            area: 'Calpe',
            slug: 'calpe',
            pricePerM2: 3350,
            character: 'Klippa, Cykling',
            suitableFor: 'Aktiva'
        },
        {
            area: 'Altea',
            slug: 'altea',
            pricePerM2: 3100,
            character: 'Konstnärligt, Stenstrand',
            suitableFor: 'Esteter'
        },
        {
            area: 'Benidorm',
            slug: 'benidorm',
            pricePerM2: 2700,
            character: 'Skyskrapor, Fest',
            suitableFor: 'Pulsälskare'
        },
        {
            area: 'Moraira',
            slug: 'moraira',
            pricePerM2: 3600,
            character: 'Lyx, Låghus',
            suitableFor: 'Exklusivt'
        }
    ]
};
