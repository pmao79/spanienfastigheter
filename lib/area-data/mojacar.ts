import { AreaDetail } from '@/types/property';

export const MOJACAR_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 7500, year: 2024, source: 'Local Registry' },
        foreignPercentage: { value: 54, source: 'Municipal Statistics' },
        swedesEstimate: { value: 250, note: 'Ingår i skandinavisk grupp' },
        airportDistance: { km: 90, minutes: 60, airport: 'Almería (LEI)' },
        pricePerM2: { value: 2150, source: 'Real Estate Estimates', year: 2025 },
        sunshineHours: { value: 3050 },
        averageTemp: { annual: 20, january: 14, july: 29 }
    },
    districts: [
        {
            name: 'Mojácar Pueblo',
            character: 'Den ikoniska vita byn på bergstoppen. Gågator, historia och magisk utsikt.',
            pricePerM2: 2400,
            suitableFor: ['Romantiker', 'Kulturintresserade', 'De som har bra benmuskler'],
            pros: ['Unik atmosfär', 'Fantastisk utsikt', 'Ingen trafik (i gränderna)'],
            cons: ['Svårt med parkering', 'Mycket trappor', 'Turisttätt på dagen']
        },
        {
            name: 'Mojácar Playa',
            character: 'Den långsträckta kustremsan med stränder, "chiringuitos" och nattliv.',
            pricePerM2: 2200,
            suitableFor: ['Barnfamiljer', 'Festprissar', 'Solbadare'],
            pros: ['Nära havet', 'Stort utbud av restauranger', 'Livligt året runt'],
            cons: ['Trafik längs kustvägen', 'Långa avstånd (kräver ofta bil/buss)']
        },
        {
            name: 'Marina del la Torre',
            character: 'Modernt område i norra änden med golfbana och stora hotell.',
            pricePerM2: 2000,
            suitableFor: ['Golfare', 'Investerare'],
            pros: ['Nyare byggnader', 'Nära golf', 'Lugnare'],
            cons: ['Mindre ,äkta, känsla', 'Lite isolerat']
        }
    ],
    whySwedes: [
        'Kombinationen av berg och hav är oslagbar.',
        'Den bohemiska och konstnärliga atmosfären tilltalar många kreativa själar.',
        'Klimatet är extremt soligt men fläktar ofta skönt.',
        'Det känns mindre "massturism" än delar av Costa Blanca.'
    ],
    notSuitableFor: [
        'Den som vill ha en stor svensk skola runt hörnet.',
        'Personer med rörelsehinder (om man väljer Pueblo).',
        'De som vill ha absolut tystnad (Playa har ett aktivt nattliv).'
    ],
    market: {
        priceChange5Year: 10,
        rentalYield: 6.5,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 90000, max: 130000 },
            twoRoom: { min: 140000, max: 190000 },
            threeRoom: { min: 180000, max: 280000 },
            townhouse: { min: 220000, max: 350000 },
            villa: { min: 450000, max: 1200000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 14, stockholmTemp: -2, difference: 16 },
        { month: 'Apr', areaTemp: 19, stockholmTemp: 5, difference: 14 },
        { month: 'Jul', areaTemp: 29, stockholmTemp: 18, difference: 11 },
        { month: 'Okt', areaTemp: 23, stockholmTemp: 8, difference: 15 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'Norwegian (säsong)', frequency: '1-2 ggr/vecka (LEI)' },
            { from: 'Köpenhamn, Oslo', airline: 'Mix', frequency: 'Via Alicante/Malága ofta smidigare' }
        ],
        airportTransfer: 'Almería (LEI) 60 min, Alicante (ALC) 2 timmar. Hyrbil rekommenderas starkt då kollektivtrafiken mellan flygplatserna är begränsad.',
        nieInfo: 'Söks i Almería stad eller via ombud.',
        healthcare: 'Vårdcentral (Centro de Salud) i Mojácar Playa. Sjukhus i Huércal-Overa (30 min).',
        swedishServices: ['Fåtal svenska tjänster', 'Engelska fungerar bra tack vare stor brittisk befolkning']
    },
    lifestyle: {
        beaches: [
            { name: 'Playa de los Muertos', type: 'Naturstrand', features: 'Känd som Spaniens vackraste (en bit bort)' },
            { name: 'Playa del Cantal', type: 'Sand', features: 'Populärast, strandbarer, ungdomligt' },
            { name: 'Playa de la Marina de la Torre', type: 'Sand', features: 'Lugnare, nära golf, familjevänligt' }
        ],
        golfCourses: [
            { name: 'Marina Golf Mojácar', distance: '1 km' },
            { name: 'Valle del Este', distance: '15 km' },
            { name: 'Desert Springs', distance: '20 km' }
        ],
        restaurants: 'Hög nivå och stor variation. Allt från high-end gastrobarer i Pueblo till enkla strandhak.',
        nightlife: 'Legendariskt nattliv längs "The Golden Mile" på sommaren. Mandala Beach Club är en institution.',
        activities: ['Vandring i Sierra Cabrera', 'Golf', 'Konstvandringar', 'Vattensporter']
    },
    faq: [
        {
            question: 'Är det jobbigt att bo i Pueblo?',
            answer: 'Om du har problem att gå – ja. Det är brant. Men det finns bussar som går upp och ner frekvent.'
        },
        {
            question: 'Vilken flygplats är bäst?',
            answer: 'Almería ligger närmast, men Alicante har oftast fler och billigare flyg från Skandinavien, trots att det är längre bort.'
        },
        {
            question: 'Är det dött på vintern?',
            answer: 'Nej, tack vare den stora bofasta utländska befolkningen (över 50%) lever Mojácar året runt, även om tempot är lugnare.'
        }
    ],
    comparison: [
        {
            area: 'Frigiliana',
            slug: 'frigiliana',
            pricePerM2: 2800,
            character: 'Också vit by, närmare Málaga',
            suitableFor: 'Den som vill ha närmare flygplats'
        },
        {
            area: 'Altea',
            slug: 'altea',
            pricePerM2: 2900,
            character: 'Liknande konstnärlig vibb, dyrare',
            suitableFor: 'Den med högre budget'
        }
    ]
};
