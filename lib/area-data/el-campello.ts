import { AreaDetail } from '@/types/property';

export const EL_CAMPELLO_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 30600, year: 2024, source: 'INE' },
        foreignPercentage: { value: 24, source: 'Local Registry' },
        swedesEstimate: { value: 400, note: 'Växande, lockas av spårvagnen och närheten till Alicante' },
        airportDistance: { km: 30, minutes: 25, airport: 'Alicante (ALC)' },
        pricePerM2: { value: 2299, source: 'Idealista', year: 2024 },
        sunshineHours: { value: 3000 },
        averageTemp: { annual: 18.0, january: 12.0, july: 26.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'El Campello Centrum',
            character: 'Traditionellt & Puls',
            pricePerM2: 2200,
            suitableFor: ['Året-runt-boende', 'Familjer', 'Pendlare'],
            pros: ['Utmärkta kommunikationer (TRAM)', 'Levande fiskeby med moderna bekvämligheter', 'Mycket service året runt'],
            cons: ['Mycket folk på sommaren', 'Parkering kan vara svårt i centrum'],
            coordinates: { lat: 38.4285, lng: -0.3995 }
        },
        {
            name: 'Playa Muchavista',
            character: 'Strand & Modernt',
            pricePerM2: 2800,
            suitableFor: ['Strandälskare', 'Pendlare till Alicante', 'Semesterfirare'],
            pros: ['3 km lång sandstrand (förlängning av San Juan)', 'Moderna lägenhetskomplex', 'Direkt spårvagn till Alicante'],
            cons: ['Mindre "spansk" bykänsla', 'Kan vara blåsigt på vintern'],
            coordinates: { lat: 38.3965, lng: -0.4075 }
        },
        {
            name: 'Coveta Fumá',
            character: 'Klippor & Villor',
            pricePerM2: 3200,
            suitableFor: ['Villaköpare', 'Lugnsökare', 'Exklusivitet'],
            pros: ['Fantastisk havsutsikt från klipporna', 'Privat och lugnt', 'Eget litet centrum med restauranger'],
            cons: ['Kuperat (bil behövs oftast)', 'Inga stora sandstränder (små badvikar)'],
            coordinates: { lat: 38.4520, lng: -0.3660 }
        },
        {
            name: 'Venta Lanuza',
            character: 'Natur & Lugn',
            pricePerM2: 2600,
            suitableFor: ['Pensionärer', 'Naturälskare', 'Andra hemmet'],
            pros: ['Oslagbar utsikt och natur', 'Mycket tyst och fridfullt', 'Egen spårvagnsstation'],
            cons: ['Längre från centrum', 'Begränsat med butiker'],
            coordinates: { lat: 38.4835, lng: -0.3345 }
        }
    ],
    whySwedes: [
        'Kommunikationerna: TRAM-linjen (L1 och L3) gör det extremt enkelt att bo här och jobba/a i Alicante stad.',
        'Stranden: Muchavista är en av kustens absolut bästa stränder, bred och välskött.',
        'Balansen: Det är en perfekt mix av en fungerande spansk stad och en semesterort.',
        'Prisnivån: Fortfarande mycket prisvärt jämfört med norra Alicante och Altea.'
    ],
    notSuitableFor: [
        'De som söker nattliv dygnet runt (Benidorm är nära men Campello är lugnare).',
        'De som vill ha "Mall-shopping" precis utanför dörren (kräver en kort tur till San Juan).',
    ],
    market: {
        priceChange5Year: 25.0,
        rentalYield: 4.5,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 100000, max: 130000 },
            twoRoom: { min: 160000, max: 220000 },
            threeRoom: { min: 220000, max: 350000 },
            townhouse: { min: 280000, max: 450000 },
            villa: { min: 450000, max: 1500000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 12, stockholmTemp: -2, difference: 14 },
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
        airportTransfer: 'TRAM till Alicante C, sedan flygbuss (C6). Taxi ca 25 min (~40€).',
        nieInfo: 'Söks hos Policia Nacional i Alicante eller Benidorm.',
        healthcare: 'Vårdcentral i centrum. Universitetssjukhuset i San Juan ligger 10 min bort.',
        swedishServices: ['Skandinaviska Skolan (San Juan, 10 min)', 'Bonalba Golf (10 min)', 'Nära Alicante stads utbud']
    },
    faq: [
        {
            question: 'Går spårvagnen hela vägen?',
            answer: 'Ja, TRAM L3 går från El Campello till Alicante, och L1 går hela vägen till Benidorm/Denia.'
        },
        {
            question: 'Är det dött på vintern?',
            answer: 'Nej, El Campello har över 30 000 invånare och är en fungerande stad året runt.'
        },
        {
            question: 'Vilket område är bäst?',
            answer: 'Vill du ha puls och strand? Välj Muchavista. Vill du ha utsikt och lugn? Välj Coveta Fumá.'
        },
        {
            question: 'Finns det hundstrand?',
            answer: 'Ja, Playa de Punta del Riu är en populär hundvänlig strand (vid mynningen av Rio Seco).'
        }
    ],
    comparison: [
        {
            area: 'El Campello',
            slug: 'el-campello',
            pricePerM2: 2300,
            character: 'Tågpendling, Strand',
            suitableFor: 'Mångsidiga'
        },
        {
            area: 'Alicante',
            slug: 'alicante',
            pricePerM2: 2000,
            character: 'Storstad, Puls',
            suitableFor: 'Urbaniter'
        },
        {
            area: 'Villajoyosa',
            slug: 'villajoyosa',
            pricePerM2: 2300,
            character: 'Färg, Choklad',
            suitableFor: 'Romantiker'
        },
        {
            area: 'San Juan',
            slug: 'san-juan',
            pricePerM2: 2900,
            character: 'Bred strand, Lyx',
            suitableFor: 'Strandälskare'
        }
    ]
};
