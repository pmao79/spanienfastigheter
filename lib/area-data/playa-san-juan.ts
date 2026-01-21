import { AreaDetail } from '@/types/property';

export const PLAYA_SAN_JUAN_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 35000, year: 2024, source: 'INE (District 4)' },
        foreignPercentage: { value: 25, source: 'Estimate' },
        swedesEstimate: { value: 800, note: 'Populärt bland city-älskande svenskar' },
        airportDistance: { km: 22, minutes: 20, airport: 'Alicante (ALC)' },
        pricePerM2: { value: 3100, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 19.5, january: 13.0, july: 27.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'PAU 5',
            character: 'Nytt & Trendigt',
            pricePerM2: 3800,
            suitableFor: ['Trendkänsliga', 'Investerare', 'Unga familjer'],
            pros: ['Helt nybyggt område', 'Trendiga restauranger och parker', 'Nära stranden'],
            cons: ['Mycket byggdamm fortfarande', 'Högre prislapp'],
            coordinates: { lat: 38.3750, lng: -0.4200 }
        },
        {
            name: 'Cabo de las Huertas',
            character: 'Exklusivt & Klippor',
            pricePerM2: 4200,
            suitableFor: ['Lyxsökare', 'Dykare', 'Naturälskare'],
            pros: ['Oslagbar havsutsikt', 'Privata badvikar (calas)', 'Alicantes dyraste adress'],
            cons: ['Krävande terräng vid havet', 'Sämre bussförbindelser än stranden'],
            coordinates: { lat: 38.3565, lng: -0.4080 }
        },
        {
            name: 'Alicante Golf',
            character: 'Golf & Grönt',
            pricePerM2: 2900,
            suitableFor: ['Golfare', 'Barnfamiljer', 'Lugnsökare'],
            pros: ['Bo direkt vid banan', 'Mycket grönområden (Parque La Marjal)', 'Radhus med trädgård'],
            cons: ['Lite längre till havet (promenadavstånd)', 'Mygg kan förekomma nära dammarna'],
            coordinates: { lat: 38.3715, lng: -0.4290 }
        },
        {
            name: 'Playa San Juan (Stranden)',
            character: 'Strand & Puls',
            pricePerM2: 3200,
            suitableFor: ['Semesterfirare', 'Strandälskare', 'Utan bil'],
            pros: ['7 km fantastisk sandstrand', 'Perfekta spårvagnsförbindelser', 'Restauranger året runt'],
            cons: ['Mycket livligt på sommaren', 'Parkering är svårt'],
            coordinates: { lat: 38.3650, lng: -0.4150 }
        }
    ],
    whySwedes: [
        'Kombinationen av storstad och strand: Du bor på en av Spaniens bästa stränder men har Alicantes citypuls 15 min bort med spårvagnen.',
        'Moderniteten: PAU 5 erbjuder den typ av hypermoderna lägenhetskomplex som många svenskar efterfrågar.',
        'Aktiviteterna: Golf, surfing, beachvolleyboll och enorma parker gör det perfekt för aktiva livsstilar.',
        'Kommunikationerna: Spårvagnen (TRAM) gör att man absolut inte behöver bil för att leva här.'
    ],
    notSuitableFor: [
        'De som söker "gammaldags spansk charm" (här dominerar höghus och breda avenyer).',
        'Budgetköpare (priserna är bland de högsta på fastlandet).',
        'De som vill bo helt isolerat (det är ett tättbebyggt område).'
    ],
    market: {
        priceChange5Year: 28.0,
        rentalYield: 4.8,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 140000, max: 190000 },
            twoRoom: { min: 220000, max: 350000 },
            threeRoom: { min: 320000, max: 550000 },
            townhouse: { min: 400000, max: 650000 },
            villa: { min: 800000, max: 3500000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 13, stockholmTemp: -2, difference: 15 },
        { month: 'Apr', areaTemp: 19, stockholmTemp: 5, difference: 14 },
        { month: 'Jul', areaTemp: 27, stockholmTemp: 18, difference: 9, seaTemp: 26 },
        { month: 'Okt', areaTemp: 22, stockholmTemp: 8, difference: 14 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen (ALC)' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca 20 min (~30€). Flygbuss C6 till Alicante C och byte till TRAM.',
        nieInfo: 'Söks hos Policia Nacional i Alicante stad.',
        healthcare: 'Universitetssjukhuset i San Juan ligger i utkanten av distriktet.',
        swedishServices: ['Europaskolan i Alicante (har svensk sektion)', 'Svenska konsulatet i Alicante stad', 'IKEA (20 min)']
    },
    faq: [
        {
            question: 'Är Playa San Juan en egen stad?',
            answer: 'Nej, det är ett distrikt som tillhör Alicante stad, men fungerar som en egen stad med all service.'
        },
        {
            question: 'Vad är PAU 5?',
            answer: 'PAU 5 är det nyaste expansionsområdet i norra delen av stranden, känt för modern lyx och trendiga restauranger.'
        },
        {
            question: 'Är det dött på vintern?',
            answer: 'Absolut inte. Det bor tiotusentals människor här året runt, och spårvagnen går hela tiden.'
        },
        {
            question: 'Finns det golf?',
            answer: 'Ja, Alicante Golf ligger mitt i området och designades av Seve Ballesteros.'
        }
    ],
    comparison: [
        {
            area: 'Playa San Juan',
            slug: 'playa-san-juan',
            pricePerM2: 3100,
            character: 'Strand, Modernt',
            suitableFor: 'City-strand-mix'
        },
        {
            area: 'Alicante Centrum',
            slug: 'alicante',
            pricePerM2: 2400,
            character: 'City, Historia',
            suitableFor: 'Urbaniter'
        },
        {
            area: 'El Campello',
            slug: 'el-campello',
            pricePerM2: 2300,
            character: 'Fiskeby, Lugnare',
            suitableFor: 'Familjer'
        },
        {
            area: 'Benidorm',
            slug: 'benidorm',
            pricePerM2: 2700,
            character: 'Skyskrapor, Puls',
            suitableFor: 'Nöjeslystna'
        }
    ]
};
