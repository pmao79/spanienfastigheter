import { AreaDetail } from '@/types/property';

export const BENALMADENA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 78000, year: 2024, source: 'INE' },
        foreignPercentage: { value: 30, source: 'Estimate' },
        swedesEstimate: { value: 2000, note: 'Populärt semestermål' },
        airportDistance: { km: 15, minutes: 15, airport: 'Malaga (AGP)' },
        pricePerM2: { value: 3100, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 19.5, january: 13.0, july: 27.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Benalmádena Pueblo',
            character: 'Vit by & Utsikt',
            pricePerM2: 2900,
            suitableFor: ['Lugnsökare', 'Esteter', 'Par'],
            pros: ['Helt fantastisk vit by högt över havet', 'Magisk utsikt', 'Lugnare tempo än kusten'],
            cons: ['Kräver bil (branta backar)', 'Långt till stranden'],
            coordinates: { lat: 36.5950, lng: -4.5690 }
        },
        {
            name: 'Arroyo de la Miel',
            character: 'Stad & Praktiskt',
            pricePerM2: 2400,
            suitableFor: ['Vardagsliv', 'Pendlare', 'Barnfamiljer'],
            pros: ['Här bor lokalbefolkningen', 'Tågstation (linjen Malaga-Fuengirola)', 'Tivoli World och linbana'],
            cons: ['Inte lika "vackert" som Pueblo eller Marina', 'Mycket trafik'],
            coordinates: { lat: 36.5980, lng: -4.5350 }
        },
        {
            name: 'Puerto Marina (Costa)',
            character: 'Hamn & Nattliv',
            pricePerM2: 3800,
            suitableFor: ['Investerare', 'Semesterfirare', 'Nattugglor'],
            pros: ['Prisbelönad arkitektur (Arabisk stil)', 'Båtliv och restauranger precis utanför dörren', 'Strandnära'],
            cons: ['Kan vara högljutt', 'Dyrt'],
            coordinates: { lat: 36.5920, lng: -4.5150 }
        },
        {
            name: 'Torrequebrada',
            character: 'Golf & Lyx',
            pricePerM2: 3300,
            suitableFor: ['Golfare', 'Kvalitetsmedvetna'],
            pros: ['Känd golfbana och kasino', 'Fina bostadskomplex med havsutsikt', 'Lugnare än marinan'],
            cons: ['Kuperat', 'Kräver oftast bil'],
            coordinates: { lat: 36.5800, lng: -4.5450 }
        }
    ],
    whySwedes: [
        'Närheten till flyget: På bara 15 minuter med taxi eller tåg är du framme. Perfekt för weekendpendlare.',
        'Mångfalden: Du har tre städer i en – en vit bergsby, en levande stadskärna (Arroyo) och en lyxig hamn.',
        'Svenska Skolan: Ligger precis i närheten (Fuengirola) och är lättillgänglig med tåg.',
        'Parkerna: Parque de la Paloma är en av kustens finaste parker med frigående djur och kaktuspark.'
    ],
    notSuitableFor: [
        'De som avskyr backar (Benalmádena är extremt kuperat, förutom precis vid hamnen).',
        'De som vill ha det absolut tystaste läget (det är en livlig kommun).',
        'De som vill ha 100% platt strandpromenad hela vägen (det går upp och ner).',
    ],
    market: {
        priceChange5Year: 30.0,
        rentalYield: 5.3,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 130000, max: 180000 },
            twoRoom: { min: 200000, max: 320000 },
            threeRoom: { min: 280000, max: 500000 },
            townhouse: { min: 350000, max: 600000 },
            villa: { min: 700000, max: 2000000 }
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
        airportTransfer: 'Tåg (Cernanías) direkt från flygplatsen till Arroyo de la Miel (20 min). Taxi 15 min.',
        nieInfo: 'Söks hos Policia Nacional i Torremolinos eller Benalmádena.',
        healthcare: 'Vårdcentral i Arroyo. Hospital Costa del Sol (25 min).',
        swedishServices: ['Svenska skolan i Fuengirola (10 min med tåg)', 'Svenska kyrkan i Fuengirola', 'Nordiska butiker']
    },
    faq: [
        {
            question: 'Är det backigt?',
            answer: 'Ja, väldigt. Benalmádena klättrar från havet upp mot bergen. Arroyo och Pueblo ligger högt.'
        },
        {
            question: 'Hur fungerar tåget?',
            answer: 'Utmärkt. Cernanías-tåget går var 20:e minut mellan Malaga och Fuengirola, med stopp i Benalmádena.'
        },
        {
            question: 'Var ska barnfamiljen bo?',
            answer: 'Arroyo de la Miel är populärt för att det är nära till skolor, parker och tågstationen.'
        },
        {
            question: 'Är marinan dyr?',
            answer: 'Ja, Puerto Marina är ett av de dyrare områdena att bo i och äta i.'
        },
        {
            question: 'Hur köper man bostad i Spanien?',
            answer: 'Steg-för-steg guide:\n\n1. Förberedelser (1-2 veckor)\n- Ansök om NIE-nummer (skattenummer)\n- Öppna spanskt bankkonto\n- Anlita svensk-talande mäklare\n\n2. Hitta bostad (2-8 veckor)\n- Besök fastigheter\n- Jämför priser och områden\n- Gör besiktning (rekommenderas)\n\n3. Förhandsavtal (1 vecka)\n- Skriva under förhandsavtal (contrato de arras)\n- Betala handpenning (10% av köpesumman)\n\n4. Slutavtal (4-8 veckor)\n- Notariebesök\n- Betala resterande summa + kostnader\n- Få nycklar!\n\nTotal tid: 2-4 månader från start till färdigt.'
        },
        {
            question: 'Vad kostar det att köpa en lägenhet i Spanien?',
            answer: 'Utöver köpesumman tillkommer följande kostnader:\n\nObligatoriska kostnader:\n- Stämpelskatt (ITP): 8-10% av köpesumman\n- Notariekostnader: 600-1 200 EUR\n- Registrering: 400-800 EUR\n- Juridisk rådgivning: 1 000-2 000 EUR\n\nTotalt: Räkna med 10-13% av köpesumman i tillkommande kostnader.\n\nExempel: Lägenhet för 150 000 EUR = 15 000-19 500 EUR i tillkommande kostnader.'
        },
        {
            question: 'Vilka skatter betalar man i Spanien?',
            answer: 'Vid köp:\n- Stämpelskatt (ITP): 8-10% (befintlig bostad)\n- Moms (IVA): 10% (nyproduktion)\n\nÅrliga skatter:\n- Fastighetsskatt (IBI): 200-600 EUR/år (beroende på taxeringsvärde)\n- Avfallsskatt: 50-150 EUR/år\n- Inkomstskatt (om uthyrning): 19-24% på hyresintäkter\n- Förmögenhetsskatt (IRNR): 19-24% på uppskattat hyresvärde (även om du inte hyr ut)\n\nSamfällighetsavgift (lägenheter):\n- 300-1 200 EUR/år (beroende på faciliteter)\n\nTotalt per år: 800-2 500 EUR för en genomsnittlig lägenhet.'
        },
        {
            question: 'Behöver man NIE-nummer för att köpa bostad i Spanien?',
            answer: 'Ja, NIE-nummer är OBLIGATORISKT för att köpa fastighet i Spanien.\n\nVad är NIE?\n- Número de Identificación de Extranjero\n- Spanskt skattenummer för utlänningar\n- Behövs för alla ekonomiska transaktioner\n\nHur får man NIE?\n1. Boka tid på spanska konsulatet i Sverige\n2. Fyll i ansökan (EX-15)\n3. Betala avgift (~10 EUR)\n4. Vänta 2-4 veckor\n\nEller: Ansök direkt i Spanien (snabbare, 1-2 dagar)'
        }
    ],
    comparison: [
        {
            area: 'Benalmádena',
            slug: 'benalmadena',
            pricePerM2: 3100,
            character: 'Tre-i-en, Backigt',
            suitableFor: 'Alla'
        },
        {
            area: 'Fuengirola',
            slug: 'fuengirola',
            pricePerM2: 2900,
            character: 'Platt, Stad',
            suitableFor: 'Bekvämlighet'
        },
        {
            area: 'Torremolinos',
            slug: 'torremolinos',
            pricePerM2: 2600,
            character: 'Gayvänligt, Stränder',
            suitableFor: 'Livsnjutare'
        },
        {
            area: 'Mijas Pueblo',
            slug: 'mijas',
            pricePerM2: 2800,
            character: 'Vitt, Utsikt',
            suitableFor: 'Romantiker'
        }
    ]
};
