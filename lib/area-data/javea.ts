import { AreaDetail } from '@/types/property';

export const JAVEA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 30131, year: 2024, source: 'INE' },
        foreignPercentage: { value: 53, source: 'Local Registry' },
        swedesEstimate: { value: 2500, note: 'Hög närvaro av välbärgade skandinaver' },
        airportDistance: { km: 98, minutes: 70, airport: 'Alicante (ALC)' },
        pricePerM2: { value: 3007, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3100 },
        averageTemp: { annual: 18.0, january: 11.0, july: 26.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 50 }
    },
    districts: [
        {
            name: 'Playa del Arenal',
            character: 'Strand & Nöje',
            pricePerM2: 2900,
            suitableFor: ['Barnfamiljer', 'Semesterfirare', 'Investerare'],
            pros: ['Sandstrand (ovanligt här)', 'Stort restaurangutbud', 'Platt och gåvänligt'],
            cons: ['Mycket turister på sommaren', 'Kan vara bullrigt'],
            coordinates: { lat: 38.7715, lng: 0.1912 }
        },
        {
            name: 'Javea Puerto',
            character: 'Hamn & Genuint',
            pricePerM2: 3400,
            suitableFor: ['Pensionärer', 'Året-runt-boende', 'Livsnjutare'],
            pros: ['Öppet året runt', 'Fantastiska fiskrestauranger', 'Mer traditionellt'],
            cons: ['Stenstrand', 'Begränsat med parkering'],
            coordinates: { lat: 38.7941, lng: 0.1855 }
        },
        {
            name: 'Casco Antiguo',
            character: 'Historiskt & Kultur',
            pricePerM2: 2400,
            suitableFor: ['Kulturälskare', 'Yngre par', 'Prismedvetna'],
            pros: ['Vacker arkitektur', 'Betydligt billigare', 'Lokalt spanskt liv'],
            cons: ['2 km till havet', 'Smala gator (parkering!)'],
            coordinates: { lat: 38.7891, lng: 0.1636 }
        },
        {
            name: 'Balcón al Mar',
            character: 'Lyxvillor & Utsikt',
            pricePerM2: 3800,
            suitableFor: ['Lyxsökare', 'Pensionärer', 'Integritetssökande'],
            pros: ['Otrolig havsutsikt', 'Lugnt och privat', 'Exklusiva villor'],
            cons: ['Kräver bil', 'Långt till service'],
            coordinates: { lat: 38.7408, lng: 0.2225 }
        }
    ],
    whySwedes: [
        'Hälsosamt mikroklimat: Utnämnt av WHO som en av världens mest hälsosamma platser.',
        'Grönskan: Till skillnad från södra Costa Blanca är Jávea frodigt och grönt tack vare Montgó-berget.',
        'Inga höghus: Strikta byggregler har bevarat stadens charm och förhindrat massturism-arkitektur.',
        'Exklusivitet: En "tröskel" som håller massturismen borta och attraherar kvalitetsmedvetna.'
    ],
    notSuitableFor: [
        'Partyprissar som söker nattklubbar och neonljus (Benidorm är bättre).',
        'Budgetköpare som söker fynd under 150 000 € (utbudet är mycket begränsat).',
        'De som inte vill köra bil: Utanför Arenal och hamnen är kollektivtrafiken begränsad.'
    ],
    market: {
        priceChange5Year: 35.0,
        rentalYield: 5.8,
        touristLicenseAvailable: true, // Controlled
        typicalPrices: {
            studio: { min: 140000, max: 180000 },
            twoRoom: { min: 220000, max: 350000 },
            threeRoom: { min: 320000, max: 550000 },
            townhouse: { min: 380000, max: 650000 },
            villa: { min: 750000, max: 3000000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 11, stockholmTemp: -2, difference: 13 },
        { month: 'Apr', areaTemp: 17, stockholmTemp: 5, difference: 12 },
        { month: 'Jul', areaTemp: 26, stockholmTemp: 18, difference: 8, seaTemp: 25 },
        { month: 'Okt', areaTemp: 21, stockholmTemp: 8, difference: 13 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: '3-4 ggr/vecka' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Hyrbil rekommenderas starkt (1h 10min). Det finns direktbuss (ALSA), men få avgångar.',
        nieInfo: 'Söks hos Policia Nacional i Denia. Väntetider kan vara långa.',
        healthcare: 'Två vårdcentraler i stan. Huvudsjukhuset "Marina Salud" i Denia (15 min) är mycket modernt.',
        swedishServices: ['Svenska butiker i närheten', 'Club de Golf Jávea (populärt bland svenskar)', 'Svenska Skolan i Benidorm (45 min)']
    },
    faq: [
        {
            question: 'Är det dött på vintern?',
            answer: 'Nej, hamnen (Puerto) och gamla stan (Pueblo) lever året runt. Arenal är lugnare men många restauranger håller öppet.'
        },
        {
            question: 'Vilket område är bäst?',
            answer: 'Arenal för barnfamiljer (strand), Hamnen för året-runt-boende, Balcón al Mar för utsikt och lyx.'
        },
        {
            question: 'Krävs det bil?',
            answer: 'I princip ja. Jávea är utspritt och för att nå vikar, stormarknader och golfbanan behöver du bil.'
        },
        {
            question: 'Alicante eller Valencia flygplats?',
            answer: 'Det är ungefär lika långt (ca 100-110 km). Många väljer Valencia för en lugnare flygplatsupplevelse.'
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
            area: 'Jávea',
            slug: 'javea',
            pricePerM2: 3000,
            character: 'Exklusivt, Grönt',
            suitableFor: 'Kvalitetssökare'
        },
        {
            area: 'Moraira',
            slug: 'moraira',
            pricePerM2: 3600,
            character: 'Lyxvillor, Lugnt',
            suitableFor: 'Förmögna'
        },
        {
            area: 'Denia',
            slug: 'denia',
            pricePerM2: 2300,
            character: 'Gastronomi, Stad',
            suitableFor: 'Matälskare'
        },
        {
            area: 'Calpe',
            slug: 'calpe',
            pricePerM2: 2800,
            character: 'Klippa, Höghus',
            suitableFor: 'Utsikt'
        }
    ]
};
