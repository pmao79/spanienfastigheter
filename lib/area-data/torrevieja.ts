import { AreaDetail } from '@/types/property';

export const TORREVIEJA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 110500, year: 2026, source: 'Torrevieja kommun' },
        foreignPercentage: { value: 53.6, source: 'Torrevieja kommun' },
        swedesEstimate: { value: 1921, note: 'Registrerade (mörkertal finns)' },
        airportDistance: { km: 44, minutes: 45, airport: 'Alicante-Elche (ALC)' },
        pricePerM2: { value: 2602, source: 'Idealista/Indomio', year: 2025 },
        sunshineHours: { value: 2660 },
        averageTemp: { annual: 18.9, january: 12.2, july: 26.8 }
    },
    districts: [
        {
            name: 'La Mata',
            character: 'Naturskönt, sanddyner, lugnare tempo. Populärt bland skandinaver.',
            pricePerM2: 2702,
            suitableFor: ['Pensionärer', 'Naturälskare', 'Långtidsboende'],
            pros: ['Fantastisk strand', 'Nära naturpark', 'Lugnt område'],
            cons: ['Längre från centrum', 'Färre nattklubbar']
        },
        {
            name: 'Los Balcones',
            character: 'Villakvarter, grönt, kuperat med utsikt över saltsjöarna.',
            pricePerM2: 3087,
            suitableFor: ['Barnfamiljer', 'Villaägare', 'Golfare'],
            pros: ['Större tomter', 'Utsikt', 'Nära sjukhuset'],
            cons: ['Kräver bil', 'Backigt']
        },
        {
            name: 'Centrum',
            character: 'Puls, hamn, strandpromenad och stadsliv.',
            pricePerM2: 2161,
            suitableFor: ['Stadsmänniskor', 'Semesterfirare', 'Investerare'],
            pros: ['Gångavstånd till allt', 'Busstation', 'Restaurangutbud'],
            cons: ['Mer trafik', 'Äldre fastigheter', 'Mindre grönska']
        },
        {
            name: 'Los Locos',
            character: 'Aktivt strandområde, mycket tapasbarer och liv.',
            pricePerM2: 2946,
            suitableFor: ['Semesterfirare', 'Uthyrning'],
            pros: ['Strandnära', 'Livligt', 'Bra uthyrningspotential'],
            cons: ['Kan vara högljutt', 'Svårt med parkering sommartid']
        }
    ],
    whySwedes: [
        'Unikt mikroklimat som rekommenderas av WHO – salthalten i luften är bra för hälsan.',
        'Sveriges största utlandskoloni ger trygghet och socialt nätverk direkt vid ankomst.',
        'Prisvärt boende jämfört med norra Costa Blanca och Costa del Sol.',
        'Aktivt året runt – staden "stänger" inte på vintern som mindre orter kan göra.'
    ],
    notSuitableFor: [
        'Den som söker total tystnad under högsäsong (juli-augusti är intensivt).',
        'Dig som vill ha klippbad och skärgårdsmiljö – här är det långgrunda sandstränder.',
        'De som vill undvika andra nordbor helt och hållet.',
        'Naturälskare som vill ha stora skogar direkt inpå knuten (se hellre Guardamar).'
    ],
    market: {
        priceChange5Year: 11.8,
        rentalYield: 7.5,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 65000, max: 95000 },
            twoRoom: { min: 95000, max: 160000 },
            threeRoom: { min: 140000, max: 250000 },
            townhouse: { min: 160000, max: 280000 },
            villa: { min: 250000, max: 650000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 12, stockholmTemp: -2, difference: 14 },
        { month: 'Apr', areaTemp: 16, stockholmTemp: 5, difference: 11 },
        { month: 'Jul', areaTemp: 27, stockholmTemp: 18, difference: 9, seaTemp: 25 },
        { month: 'Okt', areaTemp: 20, stockholmTemp: 8, difference: 12 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian, Ryanair', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: '3-4 ggr/vecka' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Flygbuss direkt till Torrevieja centrum (ca 7€). Taxi ca 50-60€. Hyrbil rekommenderas för utforskning.',
        nieInfo: 'NIE-nummer krävs för köp. Kan sökas på polisen i Torrevieja (kräver tidsbokning) eller via spanska ambassaden i Sverige.',
        healthcare: 'Svenska vårdcentraler finns i området. Stora sjukhuset Quirón är privat och tar emot försäkringspatienter. Allmänna sjukhuset är högt rankat.',
        swedishServices: ['Svenska Kyrkan', 'Svenska Skolan', 'Svenska konsulatet', 'Skandinaviska läkare', 'Svensk mataffär']
    },
    faq: [
        {
            question: 'Är Torrevieja säkert?',
            answer: 'Torrevieja är generellt en mycket säker stad. Som i alla turistorter bör man vara uppmärksam på ficktjuvar i folkmassor och på marknader, men våldsbrottsligheten är låg.'
        },
        {
            question: 'Kan man dricka kranvattnet?',
            answer: 'Ja, vattnet är säkert att dricka men kan smaka mycket klor. Många väljer att installera filter eller köpa vatten på flaska för smaken, men för matlagning och tandborstning är det inga problem.'
        },
        {
            question: 'Behöver man bil?',
            answer: 'Bor du centralt behöver du inte bil, bussförbindelserna är goda. För urbanisationerna som Los Balcones eller Aguas Nuevas underlättar bil avsevärt.'
        },
        {
            question: 'Hur är det på vintern?',
            answer: 'Torrevieja lever året runt. Även om turisterna är färre är nästan alla restauranger och butiker öppna. Klimatet är milt med lunchtemperaturer ofta runt 15-20 grader.'
        }
    ],
    comparison: [
        {
            area: 'Torrevieja',
            slug: 'torrevieja',
            pricePerM2: 2602,
            character: 'Levande stad, svenskkoloni',
            suitableFor: 'Alla'
        },
        {
            area: 'Alicante',
            slug: 'alicante',
            pricePerM2: 2850,
            character: 'Storstadspuls, historisk',
            suitableFor: 'Stadälskare'
        },
        {
            area: 'Orihuela Costa',
            slug: 'orihuela-costa',
            pricePerM2: 2726,
            character: 'Resortkänsla, golf',
            suitableFor: 'Golfare/Semester'
        },
        {
            area: 'Guardamar',
            slug: 'guardamar',
            pricePerM2: 2400,
            character: 'Natur, lugnare',
            suitableFor: 'Naturälskare'
        }
    ]
};
