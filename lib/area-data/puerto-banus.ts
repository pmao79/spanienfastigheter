import { AreaDetail } from '@/types/property';

export const PUERTO_BANUS_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 3500, year: 2024, source: 'Estimate (Resident)' },
        foreignPercentage: { value: 65, source: 'Estimate' },
        swedesEstimate: { value: 500, note: 'Många deltidsboende' },
        airportDistance: { km: 58, minutes: 40, airport: 'Malaga (AGP)' },
        pricePerM2: { value: 6500, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 20.0, january: 14.0, july: 28.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Hamnen (The Marina)',
            character: 'Superlyx & Nattliv',
            pricePerM2: 8500,
            suitableFor: ['Jetsetters', 'Festprissar', 'De som vill synas'],
            pros: ['Bo mitt i smeten bland yachter och lyxbilar', 'Gångavstånd till allt', 'Världsklass shopping (Dior, Gucci etc.)'],
            cons: ['Väldigt hög ljudnivå på nätterna', 'Ingen privatliv', 'Dyrt'],
            coordinates: { lat: 36.4860, lng: -4.9530 }
        },
        {
            name: 'Playas del Duque',
            character: 'Exklusivt & Lugnt',
            pricePerM2: 7200,
            suitableFor: ['Förmögna pensionärer', 'Familjer', 'Kvalitetsmedvetna'],
            pros: ['Enorma privata trädgårdar (30 000 kvm)', 'Direkt tillgång till stranden', 'Bevakat och säkert'],
            cons: ['Dyrt underhåll (community fees)', 'Äldre byggnader (men välskötta)'],
            coordinates: { lat: 36.4880, lng: -4.9580 }
        },
        {
            name: 'La Alzambra / Vasari',
            character: 'Modernt & Nära',
            pricePerM2: 5500,
            suitableFor: ['Svenska barnfamiljer', 'Golfare'],
            pros: ['Precis intill Svenska Skolan', 'Lyxiga lägenheter och radhus', 'Gångavstånd till hamnen men lugnare'],
            cons: ['Ligger på "andra sidan" vägen (oftast)', 'Kräver bil för storhandling'],
            coordinates: { lat: 36.4920, lng: -4.9480 }
        }
    ],
    whySwedes: [
        'Statusen: Att ha en lägenhet i "Banús" är för många den ultimata symbolen för framgång.',
        'Svenska Skolan: Ligger precis här (i La Alzambra), vilket gör området extremt populärt för svenskar som flyttar ner med barn.',
        'Shopping och nöje: El Corte Inglés och alla lyxmärken finns runt hörnet.',
        'Strandklubbarna: Ocean Club, La Sala by the Sea och Plaza Beach lockar många svenskar.'
    ],
    notSuitableFor: [
        'De som söker lugn och ro (särskilt under högsäsong).',
        'Budgetköpare (här är allt dyrt, från kaffe till kvadratmeter).',
        'De som ogillar "visa upp sig"-kulturen.'
    ],
    market: {
        priceChange5Year: 45.0,
        rentalYield: 5.5,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 300000, max: 450000 },
            twoRoom: { min: 450000, max: 800000 },
            threeRoom: { min: 700000, max: 1500000 },
            townhouse: { min: 900000, max: 2000000 },
            villa: { min: 3000000, max: 15000000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 14, stockholmTemp: -2, difference: 16 },
        { month: 'Apr', areaTemp: 20, stockholmTemp: 5, difference: 15 },
        { month: 'Jul', areaTemp: 28, stockholmTemp: 18, difference: 10, seaTemp: 24 },
        { month: 'Okt', areaTemp: 23, stockholmTemp: 8, difference: 15 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen (AGP)' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca 40 min (~85€).',
        nieInfo: 'Söks hos Policia Nacional i Marbella.',
        healthcare: 'Många privata kliniker i området. Hospital Costa del Sol nära.',
        swedishServices: ['Svenska Skolan Marbella (La Alzambra)', 'Svenska kyrkan i Fuengirola (20 min)', 'Scandi Supermarket i Nueva Andalucia']
    },
    faq: [
        {
            question: 'Är det säkert?',
            answer: 'Ja, men som i alla lyxområden bör man vara uppmärksam på ficktjuvar och klockstölder under högsäsong.'
        },
        {
            question: 'Är det bara fest?',
            answer: 'Nej, områden som Playas del Duque är väldigt lugna och familjära. Hamnen är festen.'
        },
        {
            question: 'Kan man hyra ut bra?',
            answer: 'Ja, uthyrningspotentialen är enorm, särskilt på sommaren då veckopriserna är skyhöga.'
        },
        {
            question: 'Finns det parkering?',
            answer: 'Det är svårt och dyrt i hamnen. Se till att bostaden har garageplats.'
        }
    ],
    comparison: [
        {
            area: 'Puerto Banús',
            slug: 'puerto-banus',
            pricePerM2: 6500,
            character: 'Lyx, Nattliv',
            suitableFor: 'Investerare'
        },
        {
            area: 'Marbella (Golden Mile)',
            slug: 'marbella',
            pricePerM2: 6000,
            character: 'Elegant, Klassiskt',
            suitableFor: 'Livsnjutare'
        },
        {
            area: 'Nueva Andalucía',
            slug: 'nueva-andalucia',
            pricePerM2: 4800,
            character: 'Golf, Villor',
            suitableFor: 'Golfare'
        },
        {
            area: 'San Pedro',
            slug: 'san-pedro-de-alcantara',
            pricePerM2: 4200,
            character: 'Spanskt, Familj',
            suitableFor: 'Barnfamiljer'
        }
    ]
};
