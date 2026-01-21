import { AreaDetail } from '@/types/property';

export const MORAIRA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 14778, year: 2024, source: 'INE (Teulada-Moraira)' },
        foreignPercentage: { value: 56, source: 'Local Registry' },
        swedesEstimate: { value: 800, note: 'Exklusiv, mindre koloni' },
        airportDistance: { km: 95, minutes: 75, airport: 'Alicante (ALC)' },
        pricePerM2: { value: 4472, source: 'Indomio/Idealista', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 19.0, january: 11.0, july: 27.0 }
    },
    districts: [
        {
            name: 'El Portet',
            character: 'Costa Blancas mest exklusiva adress. "Lilla Saint-Tropez".',
            pricePerM2: 5100,
            suitableFor: ['Lyxsökare', 'Investerare'],
            pros: ['Den berömda sandstranden', 'Skyddat mikroklimat', 'Extremt exklusivt'],
            cons: ['Mycket höga priser', 'Backigt (kräver ofta bil)', 'Ont om objekt']
        },
        {
            name: 'Pla del Mar',
            character: 'Prestigefyllt villaområde med gångavstånd till ALLT.',
            pricePerM2: 5000,
            suitableFor: ['Året-runt-boende', 'Pensionärer'],
            pros: ['Gångavstånd till city & marina', 'Platta tomter (ovanligt här)', 'Söderläge'],
            cons: ['Äldre hus kan behöva renovering', 'Hög prisnivå']
        },
        {
            name: 'Moravit & San Jaime',
            character: 'Grönt, lugnt och nära golfbanan.',
            pricePerM2: 3900,
            suitableFor: ['Golfare', 'Naturälskare'],
            pros: ['Nära Ifach Golf Club', 'Grönskande omgivningar', 'Lite större tomter'],
            cons: ['Längre till centrum', 'Viss trafik från kustvägen']
        },
        {
            name: 'Benimeit',
            character: 'Bergsområde med fantastisk havsutsikt.',
            pricePerM2: 3800,
            suitableFor: ['Utsiktsjägare', 'Husägare'],
            pros: ['Panoramavyer över havet', 'Lugnt och privat', 'Prisvärt för lyxsegmentet'],
            cons: ['Branta backar', 'Kräver bil', 'Kan vara blåsigt']
        }
    ],
    whySwedes: [
        'Den låga exploateringsgraden – inga höghus, bara villor och grönska.',
        'Det exklusiva lugnet – här slipper man massturismen men har ändå lyxrestauranger.',
        'Mikroklimatet – dalen är skyddad av bergen vilket ger mildare vintrar.',
        'Tryggheten – ett av Spaniens säkraste och mest vårdade områden.'
    ],
    notSuitableFor: [
        'Den som söker nattliv och fest (här är det middagar och vin som gäller).',
        'Budgetköparen (kvadratmeterpriserna är bland de högsta på kusten).',
        'Den som vill klara sig helt utan bil (förutom om du bor i dyra Pla del Mar).',
        'Tonårsfamiljer som vill ha action och shoppinggallerior runt hörnet.'
    ],
    market: {
        priceChange5Year: 25.0, // Significant growth in luxury sector
        rentalYield: 4.5, // Lower yield due to high entry price, but high absolute value
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 150000, max: 200000 },
            twoRoom: { min: 250000, max: 400000 },
            threeRoom: { min: 350000, max: 600000 },
            townhouse: { min: 400000, max: 700000 },
            villa: { min: 800000, max: 5000000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 16, stockholmTemp: -2, difference: 18 },
        { month: 'Apr', areaTemp: 19, stockholmTemp: 5, difference: 14 },
        { month: 'Jul', areaTemp: 29, stockholmTemp: 18, difference: 11, seaTemp: 25 },
        { month: 'Okt', areaTemp: 23, stockholmTemp: 8, difference: 15 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian, Ryanair', frequency: 'Dagligen (till ALC)' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera/vecka' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Hyrbil är nästan ett måste. Privat transfer ca 130€. Ingen direktbuss.',
        nieInfo: 'Söks hos Policia Nacional i Denia (huvudort för området).',
        healthcare: 'IMED Teulada (privat) finns lokalt. Huvudsjukhuset ligger i Denia (20 min).',
        swedishServices: ['Svenska mäklare finns representerade', 'Internationella klubbar', 'Nära till svenskkolonin i Albir/Altea']
    },
    faq: [
        {
            question: 'Varför är Moraira så dyrt?',
            answer: 'Strikta byggregler förbjuder höghus vilket begränsar utbudet. Detta har skapat en exklusiv "villa-oas" som attraherar köpstarka européer.'
        },
        {
            question: 'Behöver man bil?',
            answer: 'Ja, absolut. Om du inte bor i dyra Pla del Mar eller byn, så är avstånden och backarna krävande.'
        },
        {
            question: 'Är det dött på vintern?',
            answer: 'Nej, eftersom 56% är utländska residenta lever staden året runt, men i ett lugnare tempo än på sommaren.'
        },
        {
            question: 'El Portet eller Pla del Mar?',
            answer: 'El Portet för stranden och charmen. Pla del Mar för bekvämligheten att kunna gå till allt.'
        }
    ],
    comparison: [
        {
            area: 'Moraira',
            slug: 'moraira',
            pricePerM2: 4472,
            character: 'Lyx, Lågmält',
            suitableFor: 'Livsnjutare'
        },
        {
            area: 'Jávea',
            slug: 'javea',
            pricePerM2: 3800,
            character: 'Trendigt, Mer liv',
            suitableFor: 'Aktiva familjer'
        },
        {
            area: 'Altea',
            slug: 'altea',
            pricePerM2: 3616,
            character: 'Konstnärligt, Backigt',
            suitableFor: 'Kulturintresserade'
        },
        {
            area: 'Calpe',
            slug: 'calpe',
            pricePerM2: 3200,
            character: 'Höghus, Natur',
            suitableFor: 'Blandat'
        }
    ]
};
