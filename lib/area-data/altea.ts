import { AreaDetail } from '@/types/property';

export const ALTEA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 24397, year: 2024, source: 'INE' },
        foreignPercentage: { value: 35, source: 'Local Registry' },
        swedesEstimate: { value: 2000, note: 'Stor norsk och svensk befolkning i området' },
        airportDistance: { km: 70, minutes: 50, airport: 'Alicante (ALC)' },
        pricePerM2: { value: 3100, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3000 },
        averageTemp: { annual: 18.0, january: 12.0, july: 26.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 50 }
    },
    districts: [
        {
            name: 'Casco Antiguo',
            character: 'Historiskt & Konst',
            pricePerM2: 3200,
            suitableFor: ['Kulturälskare', 'Par', 'Semesterfirare'],
            pros: ['Ikoniska vitkalkade gränder', 'Fantastisk utsikt vid kyrkan', 'Unik atmosfär'],
            cons: ['Mycket brant och trappor', 'Svårt med parkering', 'Turisttätt på sommaren'],
            coordinates: { lat: 38.5997, lng: -0.0515 }
        },
        {
            name: 'Altea Hills',
            character: 'Lyx & Privacy',
            pricePerM2: 4500,
            suitableFor: ['Lyxsökare', 'Kändisar', 'Integritet'],
            pros: ['24/7 säkerhet', 'Oslagbar havsutsikt', 'Exklusivt grannskap'],
            cons: ['Kräver bil (brant)', 'Långt till service', 'Höga samfällighetsavgifter'],
            coordinates: { lat: 38.6316, lng: -0.0099 }
        },
        {
            name: 'Mascarat',
            character: 'Hamn & Marint',
            pricePerM2: 3800,
            suitableFor: ['Båtägare', 'Livsnjutare', 'Solbadare'],
            pros: ['Direkt vid Greenwich Marina', 'Lyxig känsla', 'Fina vikar'],
            cons: ['Trafikbrus från motorvägen kan höras', 'Lugnt (stängt) på vintern'],
            coordinates: { lat: 38.6336, lng: 0.0023 }
        },
        {
            name: 'Cap Negret / L\'Olla',
            character: 'Strand & Grönt',
            pricePerM2: 3400,
            suitableFor: ['Familjer', 'Naturälskare', 'Villaägare'],
            pros: ['Direkt tillgång till strand', 'Grönare och lummigare', 'Nära staden men lugnt'],
            cons: ['Stenstrand (inte sand)', 'Järnvägen går genom området'],
            coordinates: { lat: 38.6092, lng: -0.0384 }
        }
    ],
    whySwedes: [
        'Konstnärsatmosfären: Känd som "Medelhavets kupol", en magnet för konstnärer och bohemer.',
        'Skandinaviska bekvämligheter: Mycket nära Alfaz del Pi där Svenska Skolan och nordiska butiker finns.',
        'Det genuina: Gamla stan är en av de vackraste i Spanien och strikta byggregler bevarar karaktären.',
        'Naturen: En dramatisk kombination av berg (Sierra Bernia) och hav.'
    ],
    notSuitableFor: [
        'Rörelsehindrade: Gamla stan och många urbanisationer är extremt backiga.',
        'Partysökare: Nattlivet är sofistikerat snarare än intensivt (Benidorm är dock nära).',
        'De som söker sandstrand: Altea har nästan uteslutande klapperstensstränder (bättre vattenkvalitet, men hårdare underlag).'
    ],
    market: {
        priceChange5Year: 28.0,
        rentalYield: 5.2,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 160000, max: 220000 },
            twoRoom: { min: 280000, max: 450000 },
            threeRoom: { min: 400000, max: 700000 },
            townhouse: { min: 450000, max: 900000 },
            villa: { min: 800000, max: 5000000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 12, stockholmTemp: -2, difference: 14 },
        { month: 'Apr', areaTemp: 18, stockholmTemp: 5, difference: 13 },
        { month: 'Jul', areaTemp: 26, stockholmTemp: 18, difference: 8, seaTemp: 26 },
        { month: 'Okt', areaTemp: 21, stockholmTemp: 8, difference: 13 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Transferbuss (Beniconnect) fungerar bra. Taxi ca 50 min (~75-90€).',
        nieInfo: 'Söks hos Policia Nacional i Benidorm.',
        healthcare: 'Vårdcentral i centrum. Sjukhus (IMED Levante) i Benidorm (15 min).',
        swedishServices: ['Svenska Skolan i Alfaz (10 min)', 'Norska klubben i Alfaz', 'Svenska butiker i närheten']
    },
    faq: [
        {
            question: 'Är stranden av sand?',
            answer: 'Nej, Altea har klapperstensstränder. Det gör vattnet kristallklart, men badskor rekommenderas.'
        },
        {
            question: 'Behöver man bil?',
            answer: 'Ja, särskilt om du bor i Altea Hills eller en bit utanför centrum. Backarna gör det tungt att gå/cykla.'
        },
        {
            question: 'Är det dött på vintern?',
            answer: 'Det är lugnare än på sommaren men absolut inte dött. Många nordeuropéer bor här året runt.'
        },
        {
            question: 'Passar Altea Hills för permanentboende?',
            answer: 'Ja, om du har bil och värdesätter utsikt och säkerhet. Många bor där året runt.'
        }
    ],
    comparison: [
        {
            area: 'Altea',
            slug: 'altea',
            pricePerM2: 3100,
            character: 'Konstnärligt, Stenstrand',
            suitableFor: 'Esteter'
        },
        {
            area: 'Calpe',
            slug: 'calpe',
            pricePerM2: 3350,
            character: 'Klippa, Cykling',
            suitableFor: 'Aktiva'
        },
        {
            area: 'Alfaz del Pi',
            slug: 'alfaz-del-pi',
            pricePerM2: 2750,
            character: 'Norskt, Lugnt',
            suitableFor: 'Trygghetssökare'
        },
        {
            area: 'Benidorm',
            slug: 'benidorm',
            pricePerM2: 2700,
            character: 'Skyskrapor, Puls',
            suitableFor: 'Stadsmänniskor'
        }
    ]
};
