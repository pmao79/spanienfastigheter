import { AreaDetail } from '@/types/property';

export const FINESTRAT_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 8206, year: 2023, source: 'INE' },
        foreignPercentage: { value: 42, source: 'Local Registry' },
        swedesEstimate: { value: 400, note: 'Växande, dras till "det bästa av två världar"' },
        airportDistance: { km: 55, minutes: 45, airport: 'Alicante (ALC)' },
        pricePerM2: { value: 3200, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 2900 },
        averageTemp: { annual: 17.0, january: 11.0, july: 26.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Finestrat Pueblo',
            character: 'Bergsby & Arv',
            pricePerM2: 2200,
            suitableFor: ['Vandrare', 'Kulturälskare', 'Lugnsökare'],
            pros: ['Autentisk spansk bykänsla', 'Magnifik utsikt över berget', 'Lugnt och tyst'],
            cons: ['Branta, smala gator', 'Långt till stranden (8 km)', 'Svårt med bil'],
            coordinates: { lat: 38.5674, lng: -0.2125 }
        },
        {
            name: 'Cala Finestrat',
            character: 'Strandresort',
            pricePerM2: 3500,
            suitableFor: ['Barnfamiljer', 'Strandälskare', 'Investerare'],
            pros: ['Direkt på sandstranden', 'Gångavstånd till allt', 'Hög uthyrningspotential'],
            cons: ['Mycket livligt på sommaren', 'Parkering kan vara svårt', 'Mer "turistigt"'],
            coordinates: { lat: 38.5282, lng: -0.1691 }
        },
        {
            name: 'Sierra Cortina',
            character: 'Lyx & Resort',
            pricePerM2: 4000,
            suitableFor: ['Lyxsökare', 'Golfare', 'Säkerhetsmedvetna'],
            pros: ['Exklusiva nya villor', 'Fantastisk havsutsikt', 'Nära golf och shopping'],
            cons: ['Kräver bil', 'Känns lite isolerat', 'Höga priser'],
            coordinates: { lat: 38.5492, lng: -0.1642 }
        },
        {
            name: 'Balcón de Finestrat',
            character: 'Modernt & Utsikt',
            pricePerM2: 3300,
            suitableFor: ['Husägare', 'Familjer', 'Modernister'],
            pros: ['Nyproducerade energieffektiva hus', 'Panoramautsikt över skyline', 'Prisvärt jämfört med kusten'],
            cons: ['Mycket byggnation pågår', 'Vindutsatt läge', 'Brant terräng'],
            coordinates: { lat: 38.5611, lng: -0.1753 }
        }
    ],
    whySwedes: [
        'Det bästa av två världar: Du bor i bergen med lugnet, men har 10 minuter till stranden och Benidorm.',
        'Shoppingen: La Marina Shopping Center (ett av kustens största) ligger precis nedanför.',
        'Naturen: Berget Puig Campana är ikoniskt och erbjuder fantastisk vandring direkt från byn.',
        'Klimatet: Det skyddade läget bakom bergen ger svala nätter på sommaren och lä på vintern.'
    ],
    notSuitableFor: [
        'De som vill ha allt inom gångavstånd (om man inte bor i Cala Finestrat).',
        'Personer utan körkort (mellan byn, shoppingen och stranden är det avstånd).',
        'Rörelsehindrade i Pueblo-delen (extremt brant).'
    ],
    market: {
        priceChange5Year: 35.0,
        rentalYield: 6.0,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 130000, max: 160000 },
            twoRoom: { min: 220000, max: 380000 },
            threeRoom: { min: 350000, max: 550000 },
            townhouse: { min: 280000, max: 450000 },
            villa: { min: 550000, max: 2000000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 11, stockholmTemp: -2, difference: 13 },
        { month: 'Apr', areaTemp: 17, stockholmTemp: 5, difference: 12 },
        { month: 'Jul', areaTemp: 26, stockholmTemp: 18, difference: 8, seaTemp: 26 },
        { month: 'Okt', areaTemp: 21, stockholmTemp: 8, difference: 13 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen (ALC)' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Buss till Benidorm (45 min) sedan taxi. Hyrbil rekommenderas starkt.',
        nieInfo: 'Söks hos Policia Nacional i Benidorm.',
        healthcare: 'Vårdcentral i byn och vid kusten. Sjukhus (IMED Levante) ligger precis vid kommungränsen (5 min).',
        swedishServices: ['Svenska Skolan i Alfaz (15 min)', 'IKEA (Murcia eller Valencia, leverans hit)', 'Nordiska butiker i La Nucia']
    },
    faq: [
        {
            question: 'Är Finestrat en strandort?',
            answer: 'Både ja och nej. Kommunen har en liten strandremsa (Cala), men huvudbyn ligger 8 km upp i bergen.'
        },
        {
            question: 'Är det blåsigt?',
            answer: 'I Balcón de Finestrat kan det vara blåsigt på grund av höjden, men byn ligger skyddad av berget.'
        },
        {
            question: 'Passar det barnfamiljer?',
            answer: 'Absolut. Nära till nöjesparkerna (Terra Mítica), stranden och skolor. Mycket nyproduktion anpassad för familjer.'
        },
        {
            question: 'Kan man gå upp på berget?',
            answer: 'Ja, vandringsleden upp till toppen av Puig Campana (1406 möh) startar mitt i byn.'
        }
    ],
    comparison: [
        {
            area: 'Finestrat',
            slug: 'finestrat',
            pricePerM2: 3200,
            character: 'Berg & Strand',
            suitableFor: 'Mångsidiga'
        },
        {
            area: 'Benidorm',
            slug: 'benidorm',
            pricePerM2: 2700,
            character: 'Stad, Puls',
            suitableFor: 'Nöjessökare'
        },
        {
            area: 'Polop',
            slug: 'polop',
            pricePerM2: 2400,
            character: 'Bara Berg, Lugnt',
            suitableFor: 'Naturälskare'
        },
        {
            area: 'Altea',
            slug: 'altea',
            pricePerM2: 3100,
            character: 'Konst, Backigt',
            suitableFor: 'Esteter'
        }
    ]
};
