import { AreaDetail } from '@/types/property';

export const PUNTA_PRIMA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 5000, year: 2024, source: 'Estimat (hög säsongsvariation)' },
        foreignPercentage: { value: 60, source: 'Estimat' },
        swedesEstimate: { value: 1500, note: 'Uppskattat antal' },
        airportDistance: { km: 40, minutes: 35, airport: 'Alicante-Elche (ALC)' },
        pricePerM2: { value: 3900, source: 'Marknadsdata 2025', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 20, january: 16, july: 29 }
    },
    districts: [
        {
            name: 'Punta Prima Strip',
            character: 'Det kommersiella hjärtat längs N-332. Restauranger och liv.',
            pricePerM2: 3500,
            suitableFor: ['Semesterfirare', 'Uthyrning'],
            pros: ['Nära till allt', 'Goda bussförbindelser', 'Stort restaurangutbud'],
            cons: ['Trafikstört under högsäsong', 'Mindre privat']
        },
        {
            name: 'Sea Senses / Posidonia',
            character: 'Exklusiva nybyggen i första linjen mot havet. "Manhattan vid havet".',
            pricePerM2: 5000,
            suitableFor: ['Lyxletare', 'Investerare'],
            pros: ['Oslagbar havsutsikt', 'Lyxiga faciliteter (gym, spa)', 'Hög status'],
            cons: ['Högt pris', 'Hög exploateringsgrad']
        },
        {
            name: 'Parque Recoleta',
            character: 'Etablerat, lummigt område med medelhavsarkitektur.',
            pricePerM2: 3800,
            suitableFor: ['Barnfamiljer', 'Åretruntboende'],
            pros: ['Grönt och lummigt', 'Säkert (bevakning)', 'Nära havet men lugnt'],
            cons: ['Äldre standard i vissa delar']
        },
        {
            name: 'Villasidan (Norra)',
            character: 'Fristående villor på större tomter.',
            pricePerM2: 4200,
            suitableFor: ['Husägare', 'Privatpersoner'],
            pros: ['Privatliv', 'Egen pool', 'Ingen insyn'],
            cons: ['Kräver mer underhåll', 'Högre inköpspris']
        }
    ],
    whySwedes: [
        'Lyxen: Möjligheten att köpa nyproduktion i absolut toppklass precis vid havet.',
        'Restaurangutbudet: "Strippen" och Punta Marina har ett enormt utbud av internationella kök.',
        'Läget: Mitt emellan Torrevieja stad och Orihuela Costas stränder. Det bästa av två världar.',
        'Strandpromenaden: Den nyrenoverade strandpromenaden in till Torrevieja är perfekt för morgonpromenader.'
    ],
    notSuitableFor: [
        'Den som söker en tyst by på landet (här är det kustliv och kommers som gäller).',
        'Budgetköparen som vill ha havsutsikt (det kostar här).',
        'Den som vill undvika höghus (Sea Senses etc är höga byggnader, ovanligt för området).'
    ],
    market: {
        priceChange5Year: 12.0,
        rentalYield: 6.4,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 140000, max: 180000 },
            twoRoom: { min: 220000, max: 350000 },
            threeRoom: { min: 350000, max: 650000 },
            townhouse: { min: 400000, max: 600000 },
            villa: { min: 750000, max: 2500000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 16, stockholmTemp: -2, difference: 18 },
        { month: 'Apr', areaTemp: 20, stockholmTemp: 5, difference: 15 },
        { month: 'Jul', areaTemp: 29, stockholmTemp: 18, difference: 11, seaTemp: 26 },
        { month: 'Okt', areaTemp: 24, stockholmTemp: 8, difference: 16 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian, Ryanair', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: '3-4 ggr/vecka' }
        ],
        airportTransfer: 'Buss från flygplatsen stannar i Torrevieja, sen lokalbuss. Taxi ca €55.',
        nieInfo: 'Hanteras via polisen i Orihuela Costa.',
        healthcare: 'Torrevieja Universitetssjukhus (offentligt) ligger precis i närheten. Privata kliniker på "strippen".',
        swedishServices: ['Svenska restauranger (ex. Nautilus strax intill)', 'Svenska mäklare']
    },
    lifestyle: {
        beaches: [
            { name: 'Punta Prima Beach', type: 'Vik/Sand', features: 'Hiss (tillgänglighet), strandbar (Nautilus), klippor' },
            { name: 'Cala Piteras', type: 'Sten/Sand', features: 'Lugnare, bra för snorkling' }
        ],
        golfCourses: [
            { name: 'Villamartín', distance: '5 km' },
            { name: 'Las Colinas', distance: '12 km' }
        ],
        restaurants: 'Hög koncentration. Allt från McDonalds till fine dining vid havet. Nautilus är en klassiker.',
        nightlife: 'Livligt på "strippen" med pubar och livemusik, men lugnare nere vid bostäderna.',
        activities: ['Promenad till Torrevieja', 'Minigolf (på taket av köpcentret)', 'Gym/Spa på hotellen']
    },
    faq: [
        {
            question: 'Är det mycket trafik?',
            answer: 'N-332 går genom området vilket gör det lättillgängligt men kan skapa köer under juli-augusti.'
        },
        {
            question: 'Finns det sandstrand?',
            answer: 'Ja, men den är mindre än t.ex. La Zenia. Många badar också från klipporna eller piren.'
        },
        {
            question: 'Är det dyrt?',
            answer: 'Ja, Punta Prima är ett av de dyrare områdena pga närheten till havet och nyproduktionen, men det finns äldre områden med lägre priser.'
        }
    ],
    comparison: [
        {
            area: 'La Zenia',
            slug: 'la-zenia',
            pricePerM2: 3500,
            character: 'Mer shopping, större sandstrand',
            suitableFor: 'Shopparen'
        },
        {
            area: 'Torrevieja',
            slug: 'torrevieja',
            pricePerM2: 2600,
            character: 'Stadspuls, billigare',
            suitableFor: 'Stadsmänniskan'
        },
        {
            area: 'Cabo Roig',
            slug: 'cabo-roig',
            pricePerM2: 4200,
            character: 'Ännu mer exklusivt, "The Golden Mile"',
            suitableFor: 'Eliten'
        }
    ]
};
