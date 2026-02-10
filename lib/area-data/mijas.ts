import { AreaDetail } from '@/types/property';

export const MIJAS_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 93000, year: 2024, source: 'INE (3rd largest in province)' },
        foreignPercentage: { value: 38, source: 'Estimate' },
        swedesEstimate: { value: 3000, note: 'Väldigt populärt område' },
        airportDistance: { km: 25, minutes: 20, airport: 'Malaga (AGP)' },
        pricePerM2: { value: 2900, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3200 },
        averageTemp: { annual: 19.0, january: 13.0, july: 27.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Mijas Pueblo',
            character: 'Vit by & Utsikt',
            pricePerM2: 2800,
            suitableFor: ['Romantiker', 'Kulturälskare', 'De som vill ha utsikt'],
            pros: ['En av Andalusiens vackraste vita byar', 'Autentisk spansk charm', 'Oslagbar utsikt över kusten'],
            cons: ['Mycket turister på dagen', 'Bergigt (backigt att gå)'],
            coordinates: { lat: 36.5950, lng: -4.6370 }
        },
        {
            name: 'La Cala de Mijas',
            character: 'Kustby & Charm',
            pricePerM2: 3600,
            suitableFor: ['Barnfamiljer', 'Strandälskare', 'Matintresserade'],
            pros: ['Platt och promenadvänligt', 'Fantastisk strand och strandpromenad', 'Mysig "by-känsla" vid havet'],
            cons: ['Har blivit dyrt', 'Svårt med parkering på sommaren'],
            coordinates: { lat: 36.5020, lng: -4.6750 }
        },
        {
            name: 'Las Lagunas',
            character: 'Stad & Praktiskt',
            pricePerM2: 2300,
            suitableFor: ['Året-runt-boende', 'Arbetande', 'Prismedvetna'],
            pros: ['Helt integrerat med Fuengirola', 'Alla butiker och service (El Corte Inglés)', 'Prisvärt'],
            cons: ['Stadsmiljö (betong)', 'Långt från "semesterkänslan" i vissa delar'],
            coordinates: { lat: 36.5400, lng: -4.6400 }
        },
        {
            name: 'Calahonda',
            character: 'Residential & Engelskt',
            pricePerM2: 2500,
            suitableFor: ['Pensionärer', 'Semesterfirare', 'De som vill ha service på engelska'],
            pros: ['Enorma urbanisationer med poler och trädgårdar', 'Eget "strip" med restauranger och barer', 'Mycket prisvärt'],
            cons: ['Kräver bil (backigt)', 'Kan kännas lite isolerat från Spanien'],
            coordinates: { lat: 36.4880, lng: -4.7200 }
        }
    ],
    whySwedes: [
        'Två världar i en: Du kan välja mellan den pittoreska bergsbyn Mijas Pueblo eller badlivet i La Cala.',
        'La Cala de Mijas: Denna gamla fiskeby har blivit en av svenskarnas absoluta favoriter tack vare sin charm och fina strand.',
        'Närheten till flygplatsen: Bara 20 minuter med bil gör det perfekt för weekendresor.',
        'Golfen: Området kallas "Golf Valley" av en anledning – här kryllar det av banor som La Cala Golf Resort.'
    ],
    notSuitableFor: [
        'De som vill ha storstadspuls (välj Malaga eller Marbella).',
        'Personer utan bil som väljer att bo i Calahonda eller Mijas Pueblo (kan bli isolerat).',
        'De som söker det absolut billigaste (priserna i La Cala har rusat).'
    ],
    market: {
        priceChange5Year: 35.0,
        rentalYield: 5.1,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 140000, max: 190000 },
            twoRoom: { min: 200000, max: 350000 },
            threeRoom: { min: 300000, max: 550000 },
            townhouse: { min: 350000, max: 600000 },
            villa: { min: 600000, max: 2500000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 13, stockholmTemp: -2, difference: 15 },
        { month: 'Apr', areaTemp: 19, stockholmTemp: 5, difference: 14 },
        { month: 'Jul', areaTemp: 27, stockholmTemp: 18, difference: 9, seaTemp: 24 },
        { month: 'Okt', areaTemp: 22, stockholmTemp: 8, difference: 14 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen (AGP)' },
            { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Taxi ca 20-25 min (~40-50€). Tåg går till Fuengirola, sen buss.',
        nieInfo: 'Söks hos Policia Nacional i Fuengirola.',
        healthcare: 'Vårdcentraler i La Cala och Las Lagunas. Hospital Costa del Sol (20 min).',
        swedishServices: ['Svenska föreningar i Fuengirola (granne)', 'Svenska mäklare i La Cala', 'Nordiska butiker i Calahonda']
    },
    faq: [
        {
            question: 'Är Mijas en stad?',
            answer: 'Det är en kommun som består av tre delar: Byn (Pueblo), Kusten (Costa) och Staden (Las Lagunas).'
        },
        {
            question: 'Behöver man bil?',
            answer: 'I La Cala och Las Lagunas klarar du dig utan. I Pueblo och Calahonda rekommenderas bil.'
        },
        {
            question: 'Hur är stranden?',
            answer: 'El Bombo och Butibamba i La Cala är fantastiska sandstränder med Blå Flagg.'
        },
        {
            question: 'Finns det svenska skolan?',
            answer: 'Svenska Skolan ligger i Fuengirola, som gränsar direkt till Mijas (Las Lagunas). Väldigt smidigt.'
        },
        {
            question: 'Hur köper man bostad i Spanien?',
            answer: 'Steg-för-steg guide:\n\n1. Förberedelser (1-2 veckor)\n- Ansök om NIE-nummer (skattenummer)\n- Öppna spanskt bankkonto\n- Anlita svensk-talande mäklare\n\n2. Hitta bostad (2-8 veckor)\n- Besök fastigheter\n- Jämför priser och områden\n- Gör besiktning (rekommenderas)\n\n3. Förhandsavtal (1 vecka)\n- Skriva under förhandsavtal (contrato de arras)\n- Betala handpenning (10% av köpesumman)\n\n4. Slutavtal (4-8 veckor)\n- Notariebesök\n- Betala resterande summa + kostnader\n- Få nycklar!\n\nTotal tid: 2-4 månader från start till färdigt.'
        },
        {
            question: 'Vad kostar det att köpa en lägenhet i Spanien?',
            answer: 'Utöver köpesumman tillkommer följande kostnader:\n\nObligatoriska kostnader:\n- Stämpelskatt (ITP): 8-10% av köpesumman\n- Notariekostnader: 600-1 200 EUR\n- Registrering: 400-800 EUR\n- Juridisk rådgivning: 1 000-2 000 EUR\n\nTotalt: Räkna med 10-13% av köpesumman i tillkommande kostnader.\n\nExempel: Lägenhet för 150 000 EUR = 15 000-19 500 EUR i tillkommande kostnader.'
        },
        {
            question: 'Vilka skatter betalar man i Spanien?',
            answer: 'Vid köp:\n- Stämpelskatt (ITP): 8-10% (befintlig bostad)\n- Moms (IVA): 10% (nyproduktion)\n\nÅrliga skatter:\n- Fastighetsskatt (IBI): 200-600 EUR/år (beroende på taxeringsvärde)\n- Avfallsskatt: 50-150 EUR/år\n- Inkomstskatt (om uthyrning): 19-24% på hyresintäkter\n- Förmögenhetsskatt (IRNR): 19-24% på uppskattat hyresvärde (även om du inte hyr ut)\n\nSamfällighetsavgift (lägenheter):\n- 300-1 200 EUR/år (beroende på faciliteter)\n\nTotalt per år: 800-2 500 EUR för en genomsnittlig lägenhet.'
        },
        {
            question: 'Behöver man NIE-nummer för att köpa bostad i Spanien?',
            answer: 'Ja, NIE-nummer är OBLIGATORISKT för att köpa fastighet i Spanien.\n\nVad är NIE?\n- Número de Identificación de Extranjero\n- Spanskt skattenummer för utlänningar\n- Behövs för alla ekonomiska transaktioner\n\nHur får man NIE?\n1. Boka tid på spanska konsulatet i Sverige\n2. Fyll i ansökan (EX-15)\n3. Betala avgift (~10 EUR)\n4. Vänta 2-4 veckor\n\nEller: Ansök direkt i Spanien (snabbare, 1-2 dagar)'
        }
    ],
    comparison: [
        {
            area: 'Mijas Pueblo',
            slug: 'mijas',
            pricePerM2: 2800,
            character: 'Berg, Utsikt',
            suitableFor: 'Romantiker'
        },
        {
            area: 'La Cala de Mijas',
            slug: 'la-cala',
            pricePerM2: 3600,
            character: 'Strand, By',
            suitableFor: 'Familjer'
        },
        {
            area: 'Fuengirola',
            slug: 'fuengirola',
            pricePerM2: 2900,
            character: 'Stad, Puls',
            suitableFor: 'Bekvämlighet'
        },
        {
            area: 'Benalmádena',
            slug: 'benalmadena',
            pricePerM2: 2700,
            character: 'Nöje, Backigt',
            suitableFor: 'Semester'
        }
    ]
};
