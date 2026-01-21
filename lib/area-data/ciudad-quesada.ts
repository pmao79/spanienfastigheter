import { AreaDetail } from '@/types/property';

export const CIUDAD_QUESADA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 13000, year: 2024, source: 'Estimate (part of Rojales)' },
        foreignPercentage: { value: 75, source: 'Estimate' },
        swedesEstimate: { value: 1500, note: 'En av de största svenska kolonierna' },
        airportDistance: { km: 38, minutes: 35, airport: 'Alicante (ALC)' },
        pricePerM2: { value: 2450, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 19.0, january: 12.0, july: 28.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Doña Pepa',
            character: 'Modernt & Rymligt',
            pricePerM2: 2700,
            suitableFor: ['Nyproduktionsköpare', 'Barnfamiljer', 'Investerare'],
            pros: ['Breda gator och modern infrastruktur', 'Nära naturparken (saltsjöarna)', 'Mycket nybyggda villor'],
            cons: ['Kräver bil för att ta sig till centrum', 'Lite "sterilt" i vissa delar'],
            coordinates: { lat: 38.0680, lng: -0.7150 }
        },
        {
            name: 'La Marquesa Golf',
            character: 'Golf & Dal',
            pricePerM2: 2300,
            suitableFor: ['Golfare', 'Pensionärer', 'Semesterfirare'],
            pros: ['Bo mitt på golfbanan', 'Eget kommersiellt centrum med restauranger', 'Trevlig, grön atmosfär'],
            cons: ['Ligger i en dal (kan bli varmt på sommaren)', 'Äldre bebyggelse blandat med nytt'],
            coordinates: { lat: 38.0830, lng: -0.7100 }
        },
        {
            name: 'Ciudad Quesada Centrum (The Arches)',
            character: 'Puls & Kommers',
            pricePerM2: 2200,
            suitableFor: ['Året-runt-boende', 'Sociala', 'De som vill ha gångavstånd'],
            pros: ['All service inom räckhåll (bank, post, butiker)', 'Enormt utbud av restauranger', 'Livligt året runt'],
            cons: ['Högre ljudnivå', 'Trafikerat'],
            coordinates: { lat: 38.0770, lng: -0.7200 }
        },
        {
            name: 'Lo Marabu',
            character: 'Praktiskt & Bostäder',
            pricePerM2: 2400,
            suitableFor: ['Barnfamiljer', 'Handling', 'Praktiskt lagda'],
            pros: ['Nära stora matbutiker (Consum, Aldi)', 'Bra förbindelser ut till vägen', 'Blandad bebyggelse'],
            cons: ['Lite mindre "charm"', 'Trafikbrus från huvudvägen kan höras'],
            coordinates: { lat: 38.0620, lng: -0.7080 }
        }
    ],
    whySwedes: [
        'Det internationella livet: Här behöver du knappt kunna spanska, allt finns på engelska och skandinaviska.',
        'Självförsörjningen: Quesada är byggt som en egen stad med egen vattenpark, golfbana, minigolf och bowling.',
        'Den Norska Skolan: Att ha en skandinavisk skola (Den Norske Skole Rojales) mitt i byn drar till sig många barnfamiljer.',
        'Året-runt-pulsen: Till skillnad från rena semesterorter lever Quesada 365 dagar om året.'
    ],
    notSuitableFor: [
        'De som söker det "äkta" Spanien (detta är en modern internationell stad).',
        'Personer utan bil (avstånden inom urbaniseringen är stora).',
        'Strandälskare som vill kunna gå till havet (stranden ligger 10 min bort med bil).'
    ],
    market: {
        priceChange5Year: 26.0,
        rentalYield: 5.2,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 80000, max: 110000 },
            twoRoom: { min: 140000, max: 200000 },
            threeRoom: { min: 220000, max: 350000 },
            townhouse: { min: 250000, max: 400000 },
            villa: { min: 350000, max: 1200000 }
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
        airportTransfer: 'Taxi ca 35 min (~50€). Hyrbil rekommenderas starkt.',
        nieInfo: 'Söks hos Policia Nacional i Elche eller Torrevieja.',
        healthcare: 'Privata vårdcentraler finns i Quesada. Torrevieja sjukhus ligger 15 min bort.',
        swedishServices: ['Den Norske Skole (skandinavisk läroplan)', 'Svenska butiker och mäklare', 'Norska Sjömanskyrkan i Torrevieja (nära)']
    },
    faq: [
        {
            question: 'Hur långt är det till stranden?',
            answer: 'Det tar cirka 10 minuter med bil till Guardamar del Seguras stränder.'
        },
        {
            question: 'Är det mest pensionärer?',
            answer: 'Tidigare var det så, men med Den Norske Skole och moderna jobb (distansarbete) har medelåldern sjunkit rejält.'
        },
        {
            question: 'Finns det bussar?',
            answer: 'Ja, men de går sällan. Bil är nästan ett måste för att leva smidigt här.'
        },
        {
            question: 'Är det dyrt?',
            answer: 'Det är medelprisnivå. Du får mycket hus för pengarna jämfört med kusten, men nyproduktion i Doña Pepa kan vara dyrt.'
        }
    ],
    comparison: [
        {
            area: 'Ciudad Quesada',
            slug: 'ciudad-quesada',
            pricePerM2: 2450,
            character: 'Villor, Expat-liv',
            suitableFor: 'Året-runt'
        },
        {
            area: 'Torrevieja',
            slug: 'torrevieja',
            pricePerM2: 2100,
            character: 'Stad, Puls',
            suitableFor: 'Budget'
        },
        {
            area: 'Orihuela Costa',
            slug: 'orihuela-costa',
            pricePerM2: 2300,
            character: 'Strand, Golf',
            suitableFor: 'Semester'
        },
        {
            area: 'Rojales',
            slug: 'rojales',
            pricePerM2: 1950,
            character: 'Genuint, By',
            suitableFor: 'Kultur'
        }
    ]
};
