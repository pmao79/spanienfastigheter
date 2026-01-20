import { AreaDetail } from '@/types/property';

export const ORIHUELA_COSTA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 30171, year: 2025, source: 'INE/Local Registry' },
        foreignPercentage: { value: 60, source: 'Local Estimate' }, // Municipality is 32%, but Coast is much higher (est 60-70%)
        swedesEstimate: { value: 2000, note: 'Stor sprindning (La Zenia/Punta Prima)' },
        airportDistance: { km: 52, minutes: 45, airport: 'Alicante (ALC)' },
        pricePerM2: { value: 3248, source: 'Indomio/Idealista', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 18.2, january: 11.0, july: 27.0 }
    },
    districts: [
        {
            name: 'La Zenia',
            character: 'Områdets kommersiella hjärta med Zenia Boulevard och strand.',
            pricePerM2: 3300,
            suitableFor: ['Shoppingsugna', 'Puls-sökare'],
            pros: ['Zenia Boulevard (shopping)', 'Två fina stränder', 'Liv och rörelse året om'],
            cons: ['Mycket trafik', 'Turisttätt på sommaren']
        },
        {
            name: 'Cabo Roig',
            character: 'Exklusiv udde med lyxvillor, marina och The Strip.',
            pricePerM2: 3800,
            suitableFor: ['Livsnjutare', 'Investerare'],
            pros: ['Fantastisk strandpromenad', 'Exklusiv känsla', 'Bra nattliv (The Strip)'],
            cons: ['Dyrare priser', 'Kan vara högljutt vid The Strip']
        },
        {
            name: 'Villamartín',
            character: 'Golfparadiset nummer ett. Grönt, lummigt och internationellt.',
            pricePerM2: 2600,
            suitableFor: ['Golfare', 'Pensionärer'],
            pros: ['4 golfbanor i närheten', 'Villamartin Plaza', 'Prisvärt'],
            cons: ['Kräver bil (långt till havet)', 'Vissa delar äldre']
        },
        {
            name: 'Playa Flamenca',
            character: 'Levande område med lördagsmarknad och fina vikar.',
            pricePerM2: 2900,
            suitableFor: ['Barnfamiljer', 'Året-runt-boende'],
            pros: ['Bra skolor närheten', 'Lördagsmarknaden', 'Promenadvänligt'],
            cons: ['Viss trafikbuller från N-332']
        }
    ],
    whySwedes: [
        'Zenia Boulevard – Alicantes största köpcentrum som har "allt".',
        'Golfutbudet i världsklass med Villamartín, Las Ramblas och Campoamor runt hörnet.',
        'Den långa säsongen där allt är öppet året runt tack vare den stora expat-befolkningen.',
        'Prisnivån som fortfarande är lägre än norra Costa Blanca, trots standardhöjningen.'
    ],
    notSuitableFor: [
        'Den som vill bo i en "autentisk spansk by" (detta är ett internationellt resort-område).',
        'Dig som vill klara dig helt utan bil (avstånden mellan urbanisationerna är stora).',
        'Personer som störs av byggkranar – området expanderar kraftigt med nyproduktion.',
        'De som vill ha absolut tystnad (det är livligt här).'
    ],
    market: {
        priceChange5Year: 15.0,
        rentalYield: 6.0,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 110000, max: 160000 },
            twoRoom: { min: 160000, max: 250000 },
            threeRoom: { min: 220000, max: 350000 },
            townhouse: { min: 250000, max: 400000 },
            villa: { min: 450000, max: 1500000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 16, stockholmTemp: -2, difference: 18 },
        { month: 'Apr', areaTemp: 21, stockholmTemp: 5, difference: 16 },
        { month: 'Jul', areaTemp: 30, stockholmTemp: 18, difference: 12, seaTemp: 25 },
        { month: 'Okt', areaTemp: 24, stockholmTemp: 8, difference: 16 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian, Ryanair', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera/vecka' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca 55-65€. Flygbussen till Torrevieja funkar, sen taxi därifrån (krånligt). Hyrbil rekommenderas starkt.',
        nieInfo: 'Söks hos Policia Nacional i Orihuela (långt borta) eller Torrevieja. Använd ombud!',
        healthcare: 'Torrevieja Universitetssjukhus (offentligt) är i världsklass. Privat finns Quirón i Torrevieja nära.',
        swedishServices: ['Skandinaviska Skolan Costa Blanca (ligger här!)', 'Svenska kyrkan i Torrevieja (nära)', 'Matbutiker med svenskt sortiment']
    },
    faq: [
        {
            question: 'Vad är skillnaden på Orihuela Costa och Torrevieja?',
            answer: 'Orihuela Costa är renare, grönare och mer utspritt med fler villor/radhus. Torrevieja är mer "stad" med lägenhetshus.'
        },
        {
            question: 'Behöver man bil?',
            answer: 'I princip ja. Kollektivtrafiken mellan urbanisationerna är begränsad, även om det går bussar till Zenia Boulevard.'
        },
        {
            question: 'Finns det svenska skolor?',
            answer: 'Ja! Skandinaviska Skolan Costa Blanca ligger i Playa Flamenca och är mycket populär.'
        },
        {
            question: 'Är det bra för golfare?',
            answer: 'Bäst i regionen. Du bor mitt i "Golf-triangeln" med banor som Villamartín, Las Ramblas och Campoamor.'
        }
    ],
    comparison: [
        {
            area: 'Orihuela Costa',
            slug: 'orihuela-costa',
            pricePerM2: 3248,
            character: 'Golf, shopping, nytt',
            suitableFor: 'Golfare/Familjer'
        },
        {
            area: 'Torrevieja',
            slug: 'torrevieja',
            pricePerM2: 2500,
            character: 'Stadspuls, billigare',
            suitableFor: 'Budget/Stad'
        },
        {
            area: 'Ciudad Quesada',
            slug: 'ciudad-quesada',
            pricePerM2: 2600,
            character: 'Villor, inland',
            suitableFor: 'Året-runt'
        },
        {
            area: 'Guardamar',
            slug: 'guardamar',
            pricePerM2: 2800,
            character: 'Spanskt, sanddyner',
            suitableFor: 'Strandälskare'
        }
    ]
};
