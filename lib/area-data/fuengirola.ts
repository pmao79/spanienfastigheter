import { AreaDetail } from '@/types/property';

export const FUENGIROLA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 85646, year: 2024, source: 'INE' },
        foreignPercentage: { value: 37, source: 'Local Registry' },
        swedesEstimate: { value: 5000, note: 'Svenskarnas "huvudstad" på Solkusten' },
        airportDistance: { km: 24, minutes: 20, airport: 'Málaga (AGP)' },
        pricePerM2: { value: 4798, source: 'Indomio', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 18.2, january: 12.0, july: 26.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 40 }
    },
    districts: [
        {
            name: 'Los Boliches',
            character: 'Svenskfavorit med egen bykänsla och strandpromenad.',
            pricePerM2: 3796,
            suitableFor: ['Pensionärer', 'Barnfamiljer'],
            pros: ['Svenska kyrkan & butiker', 'Vettiga priser', 'Platt och lättillgängligt'],
            cons: ['Tätbebyggt', 'Kan vara mycket turister'],
            coordinates: { lat: 36.5563, lng: -4.6125 }
        },
        {
            name: 'Torreblanca',
            character: 'Lugnare bostadsområde på höjden med fin utsikt.',
            pricePerM2: 5116,
            suitableFor: ['Utsiktsälskare', 'De som vill ha lugn'],
            pros: ['Fantastisk havsutsikt', 'Egen tågstation', 'Mer villor'],
            cons: ['Branta backar', 'Kräver ofta bil'],
            coordinates: { lat: 36.5658, lng: -4.5986 }
        },
        {
            name: 'Fuengirola Centro',
            character: 'Stadspuls, shopping och nattliv.',
            pricePerM2: 4063,
            suitableFor: ['Citymänniskor', 'Shoppare'],
            pros: ['Nära tåg & buss', 'Stort utbud av allt', 'Strandnära'],
            cons: ['Ljudnivån', 'Svårt med parkering'],
            coordinates: { lat: 36.5398, lng: -4.6235 }
        },
        {
            name: 'Los Pacos',
            character: 'Bostadsområde med många skolor och grönska.',
            pricePerM2: 3200,
            suitableFor: ['Barnfamiljer', 'Permanentboende'],
            pros: ['Svenska Skolan ligger här', 'Finska Skolan', 'Lugnt och tryggt'],
            cons: ['Lite längre till havet', 'Backigt i övre delen'],
            coordinates: { lat: 36.5623, lng: -4.6163 }
        }
    ],
    whySwedes: [
        'Svenska Skolan – en av de största utlandsskolorna finns i Los Pacos.',
        'Svenska Kyrkan – en aktiv samlingsplats vid strandpromenaden.',
        'Tågförbindelsen – pendeltåget (C1) går direkt från flygplatsen till stan.',
        'Svensk service – här finns svenska tandläkare, mäklare, frisörer och matbutiker.'
    ],
    notSuitableFor: [
        'Den som söker det "genuina, orörda Spanien" (detta är en modern turistort).',
        'Personer som vill ha absolut tystnad (det är en levande stad året runt).',
        'De som vill ha en stor tomt till lågt pris (markpriserna är höga).',
        'Den som ogillar höghus (stadssiluetten domineras av hotell och lägenhetshus).'
    ],
    market: {
        priceChange5Year: 28.5,
        rentalYield: 5.2,
        touristLicenseAvailable: true, // Controlled zones
        typicalPrices: {
            studio: { min: 140000, max: 200000 },
            twoRoom: { min: 220000, max: 350000 },
            threeRoom: { min: 300000, max: 550000 },
            townhouse: { min: 350000, max: 600000 },
            villa: { min: 650000, max: 2000000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 12, stockholmTemp: -2, difference: 14 },
        { month: 'Apr', areaTemp: 17, stockholmTemp: 5, difference: 12 },
        { month: 'Jul', areaTemp: 26, stockholmTemp: 18, difference: 8, seaTemp: 23 },
        { month: 'Okt', areaTemp: 20, stockholmTemp: 8, difference: 12 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian, Ryanair', frequency: 'Flera dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Dagligen' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Tåg (C1) direkt från flygplatsen var 20:e minut. Tar ca 30 min och kostar ~3€.',
        nieInfo: 'Söks hos Policia Nacional på Avenida Conde San Isidro.',
        healthcare: 'Vithas Xanit Medical Center finns i stan. Stora sjukhuset Costa del Sol ligger 15 min bort.',
        swedishServices: ['Svenska Skolan Costa del Sol', 'Svenska Kyrkan', 'Casa Nordica (matbutik)']
    },
    faq: [
        {
            question: 'Varför kallas det "Svenskarnas huvudstad"?',
            answer: 'Här finns den största koncentrationen av svensk service: skola, kyrka, butiker och föreningar.'
        },
        {
            question: 'Är det mest pensionärer?',
            answer: 'Nej, tack vare Svenska Skolan flyttar många barnfamiljer hit, vilket ger en bra mix av åldrar.'
        },
        {
            question: 'Hur fungerar tåget?',
            answer: 'Fantastiskt! Pendeltåget går mellan Malaga City och Fuengirola med stopp på flygplatsen. Du klarar dig utan bil.'
        },
        {
            question: 'Var ska man bo med barn?',
            answer: 'Los Pacos är populärast tack vare närheten till Svenska Skolan och de lugna gatorna.'
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
            area: 'Fuengirola',
            slug: 'fuengirola',
            pricePerM2: 4798,
            character: 'Svenskservice, Tåg',
            suitableFor: 'Alla kategorier'
        },
        {
            area: 'Marbella',
            slug: 'marbella',
            pricePerM2: 5258,
            character: 'Lyx, Status',
            suitableFor: 'Livsnjutare'
        },
        {
            area: 'Torrevieja',
            slug: 'torrevieja',
            pricePerM2: 2595,
            character: 'Budget, Sol',
            suitableFor: 'Prismedvetna'
        },
        {
            area: 'Benalmádena',
            slug: 'benalmadena',
            pricePerM2: 3500,
            character: 'Nöje, Familj',
            suitableFor: 'Semesterfirare'
        }
    ]
};
