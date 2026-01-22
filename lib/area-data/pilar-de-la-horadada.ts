import { AreaDetail } from '@/types/property';

export const PILAR_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 38000, year: 2024, source: 'INE/Estimat' },
        foreignPercentage: { value: 45, source: 'Estimat (hög andel britter/skandinaver)' },
        swedesEstimate: { value: 2500, note: 'Stor koloni i Torre/Mil Palmeras' },
        airportDistance: { km: 45, minutes: 40, airport: 'Alicante-Elche (ALC)' },
        pricePerM2: { value: 3300, source: 'Idealista/Marknadsdata 2025', year: 2025 },
        sunshineHours: { value: 3200 }, // Extremt soligt
        averageTemp: { annual: 20, january: 16, july: 28 }
    },
    districts: [
        {
            name: 'Torre de la Horadada',
            character: 'Kustpärlan med det ikoniska utsiktstornet. Charmigt och genuint.',
            pricePerM2: 3500,
            suitableFor: ['Semesterfirare', 'Livsnjutare'],
            pros: ['Genuin spansk charm', 'Fina torg med restauranger', 'Vackra stränder'],
            cons: ['Begränsat utbud vintertid', 'Högre priser nära havet']
        },
        {
            name: 'Mil Palmeras',
            character: 'Modernt strandområde känt för sina "tusen palmer".',
            pricePerM2: 3200,
            suitableFor: ['Barnfamiljer', 'Strandälskare'],
            pros: ['Fantastisk sandstrand', 'Mycket nyproduktion', 'Platt och lättillgängligt'],
            cons: ['Mycket turister på sommaren']
        },
        {
            name: 'Pilar Pueblo (Centrum)',
            character: 'Huvudorten som ligger 2-3 km inåt land. Levande året runt.',
            pricePerM2: 1900,
            suitableFor: ['Pensionärer', 'Budgetmedvetna'],
            pros: ['All service året runt', 'Billigare bostäder', 'Riktigt spanskt vardagsliv'],
            cons: ['Inte gångavstånd till stranden', 'Mindre semesterkänsla']
        },
        {
            name: 'Lo Romero Golf',
            character: 'Exklusivt golfområde ("The Golf Island") strax utanför staden.',
            pricePerM2: 2900,
            suitableFor: ['Golfare', 'Tystnadssökande'],
            pros: ['Naturskönt', 'Prestigefylld bana', 'Moderna villor'],
            cons: ['Bilberoende']
        }
    ],
    whySwedes: [
        'Kombinationen av gammalt och nytt: Det gamla tornet i Torre möter ultramoderna villor i Higuericas.',
        'Cykelvänligheten: Området är platt och har utmärkta cykelbanor (inklusive den gröna leden mot havet).',
        'Sportcentret: Pilar har en av kustens bästa kommunala sportanläggningar med simhall och tennis.',
        'Det "äkta" Spanien: Inne i Pilar bor spanjorerna själva, vilket ger liv året runt.'
    ],
    notSuitableFor: [
        'Den som vill ha skyskrapor och neonljus (här får man inte bygga högt nära kusten).',
        'Festprissen (det är lugnt och familjärt, nattlivet är begränsat).',
        'Den som vill ha klippbad och djupa vikar (här är det långgrunda sandstränder).'
    ],
    market: {
        priceChange5Year: 15.0, // Stark värdeökning enligt research
        rentalYield: 6.5,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 110000, max: 140000 },
            twoRoom: { min: 180000, max: 250000 },
            threeRoom: { min: 240000, max: 350000 },
            townhouse: { min: 280000, max: 450000 },
            villa: { min: 450000, max: 1200000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 16, stockholmTemp: -2, difference: 18 },
        { month: 'Apr', areaTemp: 21, stockholmTemp: 5, difference: 16 },
        { month: 'Jul', areaTemp: 30, stockholmTemp: 18, difference: 12, seaTemp: 26 },
        { month: 'Okt', areaTemp: 24, stockholmTemp: 8, difference: 16 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian, Ryanair', frequency: 'Dagligen' },
            { from: 'Göteborg', airline: 'Ryanair', frequency: '3-4 ggr/vecka' }
        ],
        airportTransfer: 'Lika smidigt till Alicante (50 min) som till Murcia (40 min). Taxi ca €60-70.',
        nieInfo: 'Söks lokalt (polisen). Bra service på kommunhuset för utlänningar (CIC).',
        healthcare: 'Vårdcentral i Pilar centrum samt sommaröppet i Torre. Sjukhus i Torrevieja (15 min).',
        swedishServices: ['Svenska mäklare finns lokalt', 'Padelcenter med svensk anknytning']
    },
    lifestyle: {
        beaches: [
            { name: 'Las Higuericas', type: 'Sand', features: 'Trendig strandbar, sanddyner, brett' },
            { name: 'Mil Palmeras', type: 'Sand', features: 'Blå flagg, livräddare, mycket service' },
            { name: 'El Conde', type: 'Vik/Sand', features: 'Vid tornet, barnvänligt' }
        ],
        golfCourses: [
            { name: 'Lo Romero Golf', distance: '3 km' },
            { name: 'Las Ramblas', distance: '10 km' }
        ],
        restaurants: 'Torget i Torre de la Horadada ("Pueblo Latino") och hamnen är matcentrum. Mycket färsk fisk och tapas.',
        nightlife: 'Avslappnat "hänget" på strandbarerna (Chiringuitos) eller middagar som drar ut på tiden på torget.',
        activities: ['Cykling längs Ramblan', 'Vandring i Rio Seco', 'Sailing club i Torre', 'Padel']
    },
    faq: [
        {
            question: 'Vad är skillnaden på Pilar och Torre?',
            answer: 'Pilar är huvudorten inåt land med stadshus, skolor och året-runt-liv. Torre är kustdelen med stränder och semesterbostäder.'
        },
        {
            question: 'Är det mycket mygg?',
            answer: 'Nej, generellt sett inte, men nära naturområden (Rio Seco) kan det förekomma tidvis. Kommunen bekämpar aktivt.'
        },
        {
            question: 'Kan man bo i Mil Palmeras på vintern?',
            answer: 'Ja, det blir lugnare men det bor folk där året runt. Affärer och restauranger har öppet.'
        }
    ],
    comparison: [
        {
            area: 'Orihuela Costa',
            slug: 'orihuela-costa',
            pricePerM2: 2700,
            character: 'Mer engelskt, mer kommersiellt',
            suitableFor: 'Den som vill ha "Little Britain"'
        },
        {
            area: 'San Pedro',
            slug: 'san-pedro-del-pinatar',
            pricePerM2: 2100,
            character: 'Mer spanskt, lerbad',
            suitableFor: 'Hälsointresserade'
        },
        {
            area: 'Torrevieja',
            slug: 'torrevieja',
            pricePerM2: 2600,
            character: 'Större stad, högre hus',
            suitableFor: 'Stadsmänniskan'
        }
    ]
};
