import { AreaDetail } from '@/types/property';

export const GRAN_ALACANT_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 12000, year: 2024, source: 'Estimat (exkl. turister)' },
        foreignPercentage: { value: 45, source: 'Estimat' },
        swedesEstimate: { value: 2000, note: 'Betydande koloni' },
        airportDistance: { km: 15, minutes: 12, airport: 'Alicante-Elche (ALC)' },
        pricePerM2: { value: 2400, source: 'Marknadsanalys', year: 2025 },
        sunshineHours: { value: 2900 },
        averageTemp: { annual: 19, january: 16, july: 29 }
    },
    districts: [
        {
            name: 'Escandinavia',
            character: 'Svenskkvarteret (Calle Suecia/Noruega). Mycket populärt bland nordbor.',
            pricePerM2: 2400,
            suitableFor: ['Svenskar', 'Barnfamiljer'],
            pros: ['Svensk gemenskap', 'Gångavstånd till skola', 'Välskött'],
            cons: ['Kan kännas mindre "spanskt"']
        },
        {
            name: 'Monte y Mar',
            character: 'Största området med blandad bebyggelse. Nära service.',
            pricePerM2: 2100,
            suitableFor: ['Åretruntboende', 'Prismedvetna'],
            pros: ['Nära affärer', 'Prisvärt', 'Stora gemensamma pooler'],
            cons: ['Längre till stranden (bil/buss/tåg (turisttåg) krävs)']
        },
        {
            name: 'Novamar',
            character: 'Nedre delen närmast stranden och naturreservatet.',
            pricePerM2: 2600,
            suitableFor: ['Strandälskare', 'Hundägare'],
            pros: ['Gångavstånd till Carabassí', 'Platt', 'Nära Clot de Galvany'],
            cons: ['Högre prislapp']
        },
        {
            name: 'Panorama / Altara',
            character: 'Ligger högt med fantastisk utsikt över Alicante-bukten.',
            pricePerM2: 2800,
            suitableFor: ['Utsiktssökare'],
            pros: ['Panoramavyer', 'Friska brisar'],
            cons: ['Backigt', 'Vindutsatt']
        }
    ],
    whySwedes: [
        'Närheten till flygplatsen (10 min) gör det till den perfekta weekend-destinationen.',
        'Carabassí-stranden anses av många vara en av kustens bästa naturstränder.',
        'Det finns ett dedikerat "skandinaviskt kvarter" där man känner sig hemma direkt.',
        'Naturen med Clot de Galvany och sanddynerna inbjuder till promenader året runt.'
    ],
    notSuitableFor: [
        'Den som vill ha stadspuls och nattklubbar (det är en renodlad bostadsort).',
        'De som vill ha en gammal spansk stadskärna med kyrktorg (Gran Alacant är en modern urbanisation).',
        'Den som är helt beroende av kollektivtrafik utanför sommarsäsongen (även om bussar finns).'
    ],
    market: {
        priceChange5Year: 7.0,
        rentalYield: 7.5,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 95000, max: 130000 },
            twoRoom: { min: 150000, max: 220000 },
            threeRoom: { min: 210000, max: 320000 },
            townhouse: { min: 240000, max: 380000 },
            villa: { min: 450000, max: 950000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 16, stockholmTemp: -2, difference: 18 },
        { month: 'Apr', areaTemp: 20, stockholmTemp: 5, difference: 15 },
        { month: 'Jul', areaTemp: 29, stockholmTemp: 18, difference: 11, seaTemp: 26 },
        { month: 'Okt', areaTemp: 23, stockholmTemp: 8, difference: 15 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian, Ryanair', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: '3-4 ggr/vecka' }
        ],
        airportTransfer: 'Taxi kostar knappt €25 eftersom det är så nära. Buss finns också.',
        nieInfo: 'Hanteras via polisen i Santa Pola eller Elche.',
        healthcare: 'Vårdcentral (Salud) finns mitt i området. Sjukhus i Elche (15 min).',
        swedishServices: ['Svenska mäklare', 'Skandinaviska frisörer', 'Svenska varor på Aldi/lokala butiker']
    },
    lifestyle: {
        beaches: [
            { name: 'Carabassí', type: 'Naturstrand/Sand', features: 'Sanddyner, nakenbad (delvis), strandbar' },
            { name: 'Arenales del Sol', type: 'Sand', features: 'Promenadstråk, långgrund' }
        ],
        golfCourses: [
            { name: 'Alicante Golf', distance: '15 km' },
            { name: 'El Plantío', distance: '12 km' }
        ],
        restaurants: 'Samlat kring köpcentret GA Centre. Blandat utbud – indiskt, italienskt, amerikanskt, spanskt.',
        nightlife: 'Lugnt. Några pubar och barer vid köpcentret som visar sport och har quiz nights.',
        activities: ['Skärmflygning (känt ställe)', 'Vandring i Clot de Galvany', 'Cykling till Santa Pola fyren']
    },
    faq: [
        {
            question: 'Hör man flygen?',
            answer: 'Trots närheten till flygplatsen ligger Gran Alacant inte i den huvudsakliga inflygningskorridoren, så ljudet är sällan störande. Men man ser planen!'
        },
        {
            question: 'Behöver man bil?',
            answer: 'Det underlättar enormt. Det går ett "turisttåg" runt området, men för att handla eller åka till stranden smidigt är bil bäst.'
        },
        {
            question: 'Är det blåsigt?',
            answer: 'Eftersom det ligger på en höjd ("Cape") kan det fläkta mer än inne i vikar, vilket är *skönt* på sommaren men kan vara kyligt på vintern.'
        }
    ],
    comparison: [
        {
            area: 'Santa Pola',
            slug: 'santa-pola',
            pricePerM2: 2200,
            character: 'Genuin fiskestad med hamn',
            suitableFor: 'Den som vill bo i en spansk stad'
        },
        {
            area: 'Arenales del Sol',
            slug: 'arenales-del-sol',
            pricePerM2: 2600,
            character: 'Mer lägenhetskomplex precis vid stranden',
            suitableFor: 'Strandälskaren'
        },
        {
            area: 'La Marina',
            slug: 'la-marina',
            pricePerM2: 1800,
            character: 'Lugnare, mer utspritt',
            suitableFor: 'Pensionären'
        }
    ]
};
