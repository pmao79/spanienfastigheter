import { AreaDetail } from '@/types/property';

export const ALMERIA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 205000, year: 2025, source: 'INE Estimate' },
        foreignPercentage: { value: 12, source: 'Municipal Registry' },
        swedesEstimate: { value: 50, note: 'Mycket få fastboende svenskar' },
        airportDistance: { km: 9, minutes: 15, airport: 'Almería (LEI)' },
        pricePerM2: { value: 1550, source: 'Fotocasa Index 2025', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 19, january: 13, july: 27 }
    },
    districts: [
        {
            name: 'Nueva Almería / Zapillo',
            character: 'Strandnära stadsdelar med fin promenad och modernt boende.',
            pricePerM2: 2200,
            suitableFor: ['Stadsmänniskan', 'Strandälskaren'],
            pros: ['Direkt på stranden', 'Nära centrum', 'Livligt'],
            cons: ['Dyrare än snittet', 'Parkering kan vara svårt']
        },
        {
            name: 'Centro Histórico',
            character: 'Gamla stan med katedralen, Alcazaba och tapasbarer.',
            pricePerM2: 1600,
            suitableFor: ['Kulturälskare', 'Unga par'],
            pros: ['Unik miljö', 'Kultur runt hörnet', 'Gångavstånd'],
            cons: ['Trånga gränder', 'Äldre hus utan hiss']
        },
        {
            name: 'El Toyo / Retamar',
            character: 'Modern förort nära flygplatsen och naturreservatet Cabo de Gata.',
            pricePerM2: 1900,
            suitableFor: ['Familjer', 'Golfare'],
            pros: ['Gott om plats', 'Moderna lägenheter', 'Nära naturen'],
            cons: ['Kräver bil/buss in till city', 'Känns lite "byggt"']
        }
    ],
    whySwedes: [
        'En autentisk spansk storstadsupplevelse med minimal turism.',
        'Priserna är bland de lägsta i Andalusien för en kuststad.',
        'Närheten till det spektakulära Cabo de Gata-reservatet.',
        'Flygplatsen ligger extremt nära och smidigt.'
    ],
    notSuitableFor: [
        'Den som vill ha "Sverige i solen" (här pratar man spanska).',
        'De som söker en renodlad resort-känsla.',
        'Personer som vill ha direktflyg från varenda svensk flygplats året runt.'
    ],
    market: {
        priceChange5Year: 12,
        rentalYield: 6.8,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 65000, max: 100000 },
            twoRoom: { min: 95000, max: 150000 },
            threeRoom: { min: 120000, max: 200000 },
            townhouse: { min: 150000, max: 280000 },
            villa: { min: 250000, max: 550000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 13, stockholmTemp: -2, difference: 15 },
        { month: 'Apr', areaTemp: 18, stockholmTemp: 5, difference: 13 },
        { month: 'Jul', areaTemp: 27, stockholmTemp: 18, difference: 9 },
        { month: 'Okt', areaTemp: 21, stockholmTemp: 8, difference: 13 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'Norwegian (säsong)', frequency: '1-2 ggr/vecka' },
            { from: 'Övriga', airline: 'Byte i Madrid/Barcelona', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Lokalbuss eller taxi (15 min). Oslagbart smidigt.',
        nieInfo: 'Söks hos Policia Nacional i Almería centrum.',
        healthcare: 'Stort universitetssjukhus (Torrecárdenas) med full specialistvård.',
        swedishServices: ['Obefintliga. Här lever du spanskt!']
    },
    lifestyle: {
        beaches: [
            { name: 'Playa del Zapillo', type: 'Sand', features: 'Stadsstrand, livlig, lång strandpromenad' },
            { name: 'Playa de las Salinas (Cabo de Gata)', type: 'Naturstrand', features: 'Vild, vacker, nära flamingos' }
        ],
        golfCourses: [
            { name: 'Alborán Golf (El Toyo)', distance: '12 km' },
            { name: 'La Envía Golf', distance: '15 km' }
        ],
        restaurants: 'Tapas-himmel. Almería utsågs till Spaniens mathuvudstad 2019. Det är billigt och otroligt gott.',
        nightlife: 'Vibrerande studentliv och lokalt uteliv. Mindre "turistklubbar", mer barer och musikställen.',
        activities: ['Besöka Alcazaba', 'Utforska Cabo de Gata', 'Filmstudios i öknen (Oasys)', 'Shopping']
    },
    faq: [
        {
            question: 'Är Almería bara öken?',
            answer: 'Inlandet är öken (Spaniens enda!), men kusten är grönare och staden har fina parker. Kontrasten är unik.'
        },
        {
            question: 'Är det säkert?',
            answer: 'Ja, som vilken medelstor spansk stad som helst. Vissa kvarter (som La Chanca) har haft sämre rykte men är också kulturellt intressanta.'
        },
        {
            question: 'Pratar folk engelska?',
            answer: 'Sämre än på Costa Blanca. Här uppskattas det om du kan några ord spanska.'
        }
    ],
    comparison: [
        {
            area: 'Málaga',
            slug: 'malaga',
            pricePerM2: 3000,
            character: 'Större, dyrare, mer internationell',
            suitableFor: 'Den som vill ha storstadspuls på riktigt'
        },
        {
            area: 'Alicante',
            slug: 'alicante',
            pricePerM2: 2400,
            character: 'Fler svenskar, bättre flyg',
            suitableFor: 'Bekvämlighetssökaren'
        }
    ]
};
