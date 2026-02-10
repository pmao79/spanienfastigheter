import { AreaDetail } from '@/types/property';

export const DENIA_ENHANCED_DATA: Partial<AreaDetail> = {
    quickFacts: {
        population: { value: 49000, year: 2024, source: 'INE' },
        foreignPercentage: { value: 33, source: 'Local Registry' },
        swedesEstimate: { value: 800, note: 'Växande community, lockas av gastronomin' },
        airportDistance: { km: 106, minutes: 75, airport: 'Alicante (ALC) / Valencia (VLC)' },
        pricePerM2: { value: 3428, source: 'Idealista', year: 2025 },
        sunshineHours: { value: 3000 },
        averageTemp: { annual: 19.0, january: 12.0, july: 26.0 },
        directFlights: { airlines: ['SAS', 'Norwegian', 'Ryanair'], frequencyPerWeek: 60 }
    },
    districts: [
        {
            name: 'Las Marinas',
            character: 'Sandstränder',
            pricePerM2: 3400,
            suitableFor: ['Barnfamiljer', 'Solbadare', 'Investerare'],
            pros: ['Milslång mjuk sandstrand', 'Gott om strandrestauranger', 'Platt och lättillgängligt'],
            cons: ['Mycket folk i augusti', 'Huvudvägen kan vara trafikerad'],
            coordinates: { lat: 38.8543, lng: 0.0933 }
        },
        {
            name: 'Las Rotas',
            character: 'Klippor & Natur',
            pricePerM2: 4000,
            suitableFor: ['Dykare', 'Naturälskare', 'Lyxsökare'],
            pros: ['Kristallklart vatten (marinreservat)', 'Spektakulär strandpromenad', 'Exklusivt och lugnt'],
            cons: ['Inte optimalt för små barn (stenigt)', 'Begränsat med parkering', 'Dyrare prisnivå'],
            coordinates: { lat: 38.8255, lng: 0.1345 }
        },
        {
            name: 'Montgó',
            character: 'Berg & Utsikt',
            pricePerM2: 3000,
            suitableFor: ['Husägare', 'Paret', 'Integritet'],
            pros: ['Magnifik utsikt över hav och borg', 'Stora tomter och privatliv', 'Naturnära (nationalpark)'],
            cons: ['Bil är ett måste', 'Skugga på vintern i vissa delar', 'Längre till havet'],
            coordinates: { lat: 38.8150, lng: 0.0820 }
        },
        {
            name: 'Casco Urbano',
            character: 'Histora & Stad',
            pricePerM2: 2500,
            suitableFor: ['Urbaniter', 'Matälskare', 'Kulturvänner'],
            pros: ['Allt inom gångavstånd', 'Levande året runt', 'Autentisk spansk puls'],
            cons: ['Svårt med parkering', 'Stadsljud', 'Äldre fastigheter'],
            coordinates: { lat: 38.8415, lng: 0.1065 }
        }
    ],
    whySwedes: [
        'Gastronomin: Utsett till UNESCO City of Gastronomy – ett paradis för matälskare.',
        'Läget: Mitt emellan Alicante och Valencia, samt färjan direkt till Ibiza/Formentera.',
        'Autenticiteten: En riktig spansk stad som lever året runt med slott, fiskhamn och handel.',
        'Naturvariation: Både milslånga sandstränder (nord) och dramatiska klippvikar (syd).'
    ],
    notSuitableFor: [
        'De som vill ha en "svensk bubbla" (här dominerar det spanska och internationella).',
        'Partysökare (nattlivet är trevligt men inte intensivt som Benidorm).',
        'Personer som vill ha allt på svenska (engelska funkar bra, men spanska uppskattas).'
    ],
    market: {
        priceChange5Year: 28.0,
        rentalYield: 5.5,
        touristLicenseAvailable: true,
        typicalPrices: {
            studio: { min: 130000, max: 170000 },
            twoRoom: { min: 250000, max: 350000 },
            threeRoom: { min: 350000, max: 550000 },
            townhouse: { min: 400000, max: 700000 },
            villa: { min: 750000, max: 2500000 }
        }
    },
    climateComparison: [
        { month: 'Jan', areaTemp: 12, stockholmTemp: -2, difference: 14 },
        { month: 'Apr', areaTemp: 18, stockholmTemp: 5, difference: 13 },
        { month: 'Jul', areaTemp: 26, stockholmTemp: 18, difference: 8, seaTemp: 26 },
        { month: 'Okt', areaTemp: 21, stockholmTemp: 8, difference: 13 }
    ],
    practical: {
        flights: [
            { from: 'Stockholm', airline: 'SAS, Norwegian', frequency: 'Dagligen (ALC)' },
            { from: 'Göteborg', airline: 'Ryanair', frequency: 'Flera i veckan' },
            { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
        ],
        airportTransfer: 'Både Alicante och Valencia ligger ca 1h bort. Hyrbil rekommenderas. Tåg (TRAM) från Benidorm byggs ut.',
        nieInfo: 'Söks hos Policia Nacional i Denia (Carrer Castell d\'Olimbroi).',
        healthcare: 'Huvudsjukhuset "Marina Salud" ligger i Denia och är mycket modernt.',
        swedishServices: ['Svenska konsulatet i Torrevieja', 'Skandinaviska Skolan (40 min)', 'Många skandinaviska föreningar']
    },
    faq: [
        {
            question: 'Är det blåsigt?',
            answer: 'Denia kan vara blåsigt på eftermiddagarna, vilket gör det populärt för kitesurfing och segling.'
        },
        {
            question: 'Las Marinas eller Las Rotas?',
            answer: 'Marinas = Sandstränder & barnvänligt. Rotas = Klippor, dykning & lyxvillor.'
        },
        {
            question: 'Hur tar man sig till Ibiza?',
            answer: 'Färjan (Balearia) går direkt från hamnen i centrum. Tar ca 2 timmar med snabbfärjan.'
        },
        {
            question: 'Är det säsongsdött?',
            answer: 'Inte alls. Denia är huvudort i Marina Alta och lever året runt med skolor, sjukhus och tingsrätt.'
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
            area: 'Denia',
            slug: 'denia',
            pricePerM2: 3400,
            character: 'Gastronomi, Hamn',
            suitableFor: 'Livsnjutare'
        },
        {
            area: 'Javea',
            slug: 'javea',
            pricePerM2: 3000,
            character: 'Exklusivt, Grönt',
            suitableFor: 'Kvalitet'
        },
        {
            area: 'Alicante',
            slug: 'alicante',
            pricePerM2: 2800,
            character: 'Storstad, Puls',
            suitableFor: 'Urbaniter'
        },
        {
            area: 'Altea',
            slug: 'altea',
            pricePerM2: 3100,
            character: 'Konst, Charm',
            suitableFor: 'Esteter'
        }
    ]
};
