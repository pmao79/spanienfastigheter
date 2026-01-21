import { AreaDetail } from '@/types/property';

export const ROJALES_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 16500, year: 2024, source: 'INE' },
        foreignPercentage: { value: 65, source: 'Local Registry' },
        swedesEstimate: { value: 1200, note: 'Stor koloni, blandat med britter och holländare' },
        airportDistance: { km: 38, minutes: 35, airport: 'Alicante (ALC)' },
        pricePerM2: { value: 1950, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3100 },
        averageTemp: { annual: 19.5, january: 12.0, july: 28.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Rojales Pueblo',
            character: 'Traditionellt & Historiskt',
            pricePerM2: 1700,
            suitableFor: ['Kulturintresserade', 'Året-runt-boende', 'Budgetmedvetna'],
            pros: ['Autentisk spansk bykänsla', 'Vackra bron "Puente de Carlos III"', 'Mycket service och marknader'],
            cons: ['Äldre bebyggelse (renoveringsbehov)', 'Inte havsutsikt'],
            coordinates: { lat: 38.0885, lng: -0.7250 }
        },
        {
            name: 'Cuevas del Rodeo',
            character: 'Konstnärligt & Unikt',
            pricePerM2: 2100,
            suitableFor: ['Konstnärer', 'Bohemer', 'Utsiktsjägare'],
            pros: ['Unika grottbostäder', 'Konsthantverksmarknad varje månad', 'Häftig utsikt över dalen'],
            cons: ['Speciell boendeform (fukt kan vara problem)', 'Brant terräng'],
            coordinates: { lat: 38.0855, lng: -0.7285 }
        },
        {
            name: 'Los Palacios',
            character: 'Bostadsområde',
            pricePerM2: 1900,
            suitableFor: ['Familjer', 'Pendlare', 'Bekvämlighetssökare'],
            pros: ['Nära till huvudvägar', 'Blandad bebyggelse', 'Nära golfbanan'],
            cons: ['Mindre charmigt än gamla stan', 'Trafikerat'],
            coordinates: { lat: 38.0910, lng: -0.7300 }
        },
        {
            name: 'Heredades',
            character: 'Lantligt & Lugnt',
            pricePerM2: 1600,
            suitableFor: ['Lugnsökare', 'Djurägare', 'Lokalpatrioter'],
            pros: ['Mycket prisvärt', 'Omgivet av odlingar', 'Tyst och fridfullt'],
            cons: ['Beroende av bil', 'Litet utbud av service'],
            coordinates: { lat: 38.0995, lng: -0.7450 }
        }
    ],
    whySwedes: [
        'Det genuina Spanien: Rojales stad har behållit sin spanska själ trots den stora turismen i kommunen.',
        'La Marquesa Golf: En av kustens mest populära banor ligger i utkanten av staden.',
        'Grottorna: Cuevas del Rodeo är en unik attraktion där konstnärer ställer ut och bor.',
        'Prisläget: Betydligt billigare än kusten men ändå bara 10 minuter från Guardamar-stranden.'
    ],
    notSuitableFor: [
        'Strandfantaster (du måste ta bilen/bussen 10 minuter till havet).',
        'De som vill ha nattklubbar och puls (Rojales är lugnt och traditionellt).',
        'Personer som vill bo i nybyggda lyxkomplex (då är Ciudad Quesada bättre).'
    ],
    market: {
        priceChange5Year: 18.0,
        rentalYield: 5.5,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 60000, max: 90000 },
            twoRoom: { min: 90000, max: 150000 },
            threeRoom: { min: 140000, max: 220000 },
            townhouse: { min: 150000, max: 250000 },
            villa: { min: 250000, max: 600000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 12, stockholmTemp: -2, difference: 14 },
        { month: 'Apr', areaTemp: 19, stockholmTemp: 5, difference: 14 },
        { month: 'Jul', areaTemp: 28, stockholmTemp: 18, difference: 10, seaTemp: 26 },
        { month: 'Okt', areaTemp: 22, stockholmTemp: 8, difference: 14 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen (ALC)' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca 40 min (~50€). Hyrbil rekommenderas.',
        nieInfo: 'Söks hos Policia Nacional i Elche eller Torrevieja.',
        healthcare: 'Vårdcentral i Rojales. Torrevieja sjukhus ligger 15 min bort.',
        swedishServices: ['Svenska skolan i Ciudad Quesada (5 min)', 'La Marquesa Golf', 'Norska Sjömanskyrkan i Torrevieja']
    },
    faq: [
        {
            question: 'Är Rojales och Ciudad Quesada samma sak?',
            answer: 'Nej, Quesada är en urbanisering som tillhör Rojales kommun, men Rojales är den gamla spanska huvudorten.'
        },
        {
            question: 'Kan man bo i en grotta?',
            answer: 'Ja, det finns renoverade grottbostäder till salu, vilket ger ett naturligt svalt klimat på sommaren.'
        },
        {
            question: 'Är det långt till havet?',
            answer: 'Ca 7-8 km. Det tar ca 10 minuter med bil till stränderna i Guardamar del Segura.'
        },
        {
            question: 'Finns det översvämningsrisk?',
            answer: 'Floden Segura rinner genom staden, men omfattande översvämningsskydd har byggts de senaste åren.'
        }
    ],
    comparison: [
        {
            area: 'Rojales',
            slug: 'rojales',
            pricePerM2: 1950,
            character: 'Genuint, Golf',
            suitableFor: 'Året-runt-boende'
        },
        {
            area: 'Ciudad Quesada',
            slug: 'ciudad-quesada',
            pricePerM2: 2400,
            character: 'Villor, Expat-liv',
            suitableFor: 'Soltörstande'
        },
        {
            area: 'Guardamar',
            slug: 'guardamar',
            pricePerM2: 2100,
            character: 'Strand, Parker',
            suitableFor: 'Strandälskare'
        },
        {
            area: 'Torrevieja',
            slug: 'torrevieja',
            pricePerM2: 2400,
            character: 'Stad, Puls',
            suitableFor: 'Budget'
        }
    ]
};
