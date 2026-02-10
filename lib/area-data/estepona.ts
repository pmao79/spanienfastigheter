import { AreaDetail } from '@/types/property';

export const ESTEPONA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 74000, year: 2024, source: 'INE' },
        foreignPercentage: { value: 28, source: 'Estimate' },
        swedesEstimate: { value: 2500, note: 'Växande svensk community' },
        airportDistance: { km: 80, minutes: 55, airport: 'Malaga (AGP)' },
        pricePerM2: { value: 3300, source: 'Idealista', year: 2024 },
        sunshineHours: { value: 3250 },
        averageTemp: { annual: 19.8, january: 14.0, july: 27.5 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Gamla Stan (Centro Histórico)',
            character: 'Charm & Blommor',
            pricePerM2: 3600,
            suitableFor: ['Kulturälskare', 'Livsnjutare', 'Par'],
            pros: ['Gågator fyllda med blomkrukor', 'Autentisk andalusisk känsla', 'Nära stranden La Rada'],
            cons: ['Ingen parkering', 'Kan vara livligt på kvällarna'],
            coordinates: { lat: 36.4250, lng: -5.1450 }
        },
        {
            name: 'Hamnen (Puerto Deportivo)',
            character: 'Marint & Nöje',
            pricePerM2: 3100,
            suitableFor: ['Nöjeslystna', 'Seglare', 'Uthyrning'],
            pros: ['Stort utbud av restauranger och barer', 'Fantastisk havsutsikt', 'Söndagsmarknaden'],
            cons: ['Hög musik från barer på natten', 'Turistigt'],
            coordinates: { lat: 36.4160, lng: -5.1580 }
        },
        {
            name: 'Seghers',
            character: 'Lugnt & Exklusivt',
            pricePerM2: 3900,
            suitableFor: ['Familjer', 'Villaägare', 'Lugnsökare'],
            pros: ['Nära den kända stranden El Cristo', 'Bara villor och radhus', 'Gångavstånd till hamnen'],
            cons: ['Kuperat (backigt)', 'Dyrt instegspris'],
            coordinates: { lat: 36.4120, lng: -5.1650 }
        },
        {
            name: 'New Golden Mile',
            character: 'Lyx & Strandnära',
            pricePerM2: 4500,
            suitableFor: ['Lyxköpare', 'Golfare', 'Semesterfirare'],
            pros: ['Moderna lyxkomplex med spa', 'Nära golfbanor och lyxhotell', 'Frontline beach-lägenheter'],
            cons: ['Kräver bil', 'Kan kännas avskilt från staden'],
            coordinates: { lat: 36.4500, lng: -5.0800 }
        }
    ],
    whySwedes: [
        '"Solkustens Trädgård": Estepona har satsat enormt på att göra staden grön och vacker med tusentals blomkrukor.',
        'Autenciteten: Till skillnad från Marbella känns Estepona fortfarande som en "riktig" spansk stad.',
        'Stranden mitt i stan: La Rada-stranden är enorm och ligger precis utanför gamla stans gränder.',
        'Utvecklingen: Staden har genomgått en otrolig uppryckning de senaste 10 åren och anses nu vara en av kustens pärlor.'
    ],
    notSuitableFor: [
        'De som vill ha extremt nattliv (Marbella/Puerto Banús är bättre för det).',
        'Budgetköpare som söker renoveringsobjekt (priserna har stigit kraftigt).',
        'De som vill ha 100% platt mark (staden klättrar uppåt från havet).'
    ],
    market: {
        priceChange5Year: 38.0,
        rentalYield: 4.9,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 160000, max: 220000 },
            twoRoom: { min: 250000, max: 380000 },
            threeRoom: { min: 350000, max: 600000 },
            townhouse: { min: 450000, max: 750000 },
            villa: { min: 900000, max: 4000000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 14, stockholmTemp: -2, difference: 16 },
        { month: 'Apr', areaTemp: 20, stockholmTemp: 5, difference: 15 },
        { month: 'Jul', areaTemp: 28, stockholmTemp: 18, difference: 10, seaTemp: 23 },
        { month: 'Okt', areaTemp: 23, stockholmTemp: 8, difference: 15 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen (AGP)' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca 55 min (~90€). Flygbuss direkt till Estepona busstation finns.',
        nieInfo: 'Söks hos Policia Nacional i Estepona (Avenida de España).',
        healthcare: 'Hospiten Estepona (Privat) och nya sjukhuset Hospital de Alta Resolución.',
        swedishServices: ['Svenska Skolan i Marbella (20 min)', 'Nordiska mäklare finns i överflöd', 'Carrefour har svenskhylla']
    },
    faq: [
        {
            question: 'Är det långt till Marbella?',
            answer: 'Nej, bara ca 20 minuter med bil. Du har lyxen nära men bor lugnare.'
        },
        {
            question: 'Behöver man bil?',
            answer: 'I gamla stan och hamnen klarar du dig utan. På New Golden Mile eller Seghers behövs bil.'
        },
        {
            question: 'Är det blåsigt?',
            answer: 'Estepona ligger skyddat av berget Sierra Bermeja, vilket ger ett fantastiskt mikroklimat.'
        },
        {
            question: 'Hur är stränderna?',
            answer: 'La Rada och El Cristo är två av kustens bästa sandstränder, båda med Blå Flagg.'
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
            area: 'Estepona',
            slug: 'estepona',
            pricePerM2: 3300,
            character: 'Trädgård, Familj',
            suitableFor: 'Livskvalitet'
        },
        {
            area: 'Marbella',
            slug: 'marbella',
            pricePerM2: 4200,
            character: 'Lyx, Status',
            suitableFor: 'Prestige'
        },
        {
            area: 'Fuengirola',
            slug: 'fuengirola',
            pricePerM2: 2900,
            character: 'Svenskfavorit, Puls',
            suitableFor: 'Bekvämlighet'
        },
        {
            area: 'Manilva',
            slug: 'manilva',
            pricePerM2: 2100,
            character: 'Budget, Lugnt',
            suitableFor: 'Prisvärt'
        }
    ]
};
