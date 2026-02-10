type TownLandingData = {
    cityName: string;
    citySlug: string;
    metaTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
    intro: string;
    highlights: { title: string; description: string }[];
    priceNote: string;
    areaHighlights: string[];
};

export const commonFaq = [
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
    },
    {
        question: 'Kan man få lån i Spanien som svensk?',
        answer: 'Ja, men det är svårare än i Sverige.\n\nKrav:\n- Fast anställning (minst 1 år)\n- Inkomst minst 25 000 EUR/år\n- Kontantinsats 30-40% (banker lånar max 60-70%)\n- NIE-nummer\n- Spanskt bankkonto\n\nRäntor: 3-5% (högre än Sverige)\n\nAlternativ:\n- Lån i svensk bank (ofta bättre villkor)\n- Belåna befintlig bostad i Sverige'
    },
    {
        question: 'Hur lång tid tar det att köpa hus i Spanien?',
        answer: 'Total tid: 2-4 månader\n\nTidsplan:\n- Vecka 1-2: NIE-nummer + bankkonto\n- Vecka 3-8: Hitta bostad\n- Vecka 9: Förhandsavtal + handpenning\n- Vecka 10-16: Juridisk granskning\n- Vecka 16: Slutavtal hos notarie\n\nSnabbaste: 6 veckor (om allt går smidigt)\nLångsammaste: 6 månader (vid komplikationer)'
    }
];

export const townLandingData: Record<string, TownLandingData> = {
    torrevieja: {
        cityName: 'Torrevieja',
        citySlug: 'torrevieja',
        metaTitle: 'Fastigheter Torrevieja | Lägenheter & villor till salu',
        metaDescription: 'Köp bostad i Torrevieja med svensk mäklare. Prisvärda lägenheter, radhus och villor nära strand och service.',
        title: 'Fastigheter i Torrevieja',
        subtitle: 'Prisvärt kustliv, stark svensk community och lång säsong för uthyrning.',
        intro: 'Torrevieja är en av Costa Blancas mest populära orter med lång strandpromenad, bra service och året‑runt‑liv. Här hittar du lägenheter, radhus och villor i flera prisklasser.',
        highlights: [
            { title: 'Strandliv', description: 'Långa stränder och strandpromenad i centrum.' },
            { title: 'Prisvärt', description: 'Bra värde jämfört med många andra kustorter.' },
            { title: 'Community', description: 'Stor skandinavisk närvaro och service.' },
            { title: 'Uthyrning', description: 'Efterfrågan stora delar av året.' }
        ],
        priceNote: 'Torrevieja erbjuder ofta ett brett utbud från prisvärda lägenheter till större radhus och villor. Strandnära lägen ligger generellt i det övre spannet.',
        areaHighlights: [
            'Playa del Cura och Los Locos för centralt strandliv.',
            'La Mata för lugnare strandläge.',
            'Aguas Nuevas för familjevänligt boende.',
            'Los Balcones för villor och utsikt.'
        ]
    },
    marbella: {
        cityName: 'Marbella',
        citySlug: 'marbella',
        metaTitle: 'Fastigheter Marbella | Lyx, golf och strand',
        metaDescription: 'Köp bostad i Marbella med svensk mäklare. Exklusiva villor, golf och strandklubbar på Costa del Sol.',
        title: 'Fastigheter i Marbella',
        subtitle: 'Lyx, golf och strandliv på Costa del Sols mest eftertraktade adress.',
        intro: 'Marbella kombinerar exklusiva områden, internationella skolor och ett aktivt uteliv. Här finns allt från lyxvillor till moderna lägenheter nära stranden.',
        highlights: [
            { title: 'Lyxliv', description: 'Premiumboende nära Puerto Banus och Golden Mile.' },
            { title: 'Golf', description: 'Flera av Europas bästa golfbanor.' },
            { title: 'Strandklubbar', description: 'Högklassiga restauranger och beach clubs.' },
            { title: 'Internationellt', description: 'Stark internationell community året runt.' }
        ],
        priceNote: 'Marbella ligger i premiumsegmentet med bred variation beroende på läge och standard. Strandnära och golfnära lägen är mest eftertraktade.',
        areaHighlights: [
            'Nueva Andalucia för golf och familjeliv.',
            'Golden Mile för lyx och strand.',
            'San Pedro för mer avslappnat stadsliv.',
            'Östra Marbella för strand och lugn.'
        ]
    },
    villamartin: {
        cityName: 'Villamartin',
        citySlug: 'villamartin',
        metaTitle: 'Fastigheter Villamartin | Golf och community',
        metaDescription: 'Köp bostad i Villamartin med svensk mäklare. Golf, service och nära Orihuela Costa och La Zenia.',
        title: 'Fastigheter i Villamartin',
        subtitle: 'Golfområde med stark community och service nära La Zenia.',
        intro: 'Villamartin är känt för golfbanan och den levande Villamartin Plaza. Området är populärt för både semesterboende och långtid.',
        highlights: [
            { title: 'Golf', description: 'Klassisk bana och golfcommunity.' },
            { title: 'Plaza', description: 'Restauranger och service året runt.' },
            { title: 'Läge', description: 'Nära La Zenia och flera stränder.' },
            { title: 'Prisnivå', description: 'Bra värde jämfört med strandläge.' }
        ],
        priceNote: 'Här hittar du främst lägenheter och radhus med bra prisläge, ofta i urbanisationer med pool och gemensamma ytor.',
        areaHighlights: [
            'Villamartin Plaza som social mittpunkt.',
            'Golfnära urbanisationer.',
            'Nära La Zenia Boulevard.',
            'Kort bilresa till stranden.'
        ]
    },
    'orihuela-costa': {
        cityName: 'Orihuela Costa',
        citySlug: 'orihuela-costa',
        metaTitle: 'Fastigheter Orihuela Costa | Golf och strandliv',
        metaDescription: 'Köp bostad i Orihuela Costa med svensk rådgivning. La Zenia, Cabo Roig och Villamartin nära strand och golf.',
        title: 'Fastigheter i Orihuela Costa',
        subtitle: 'Kustliv med golf, shopping och flera strandnära områden.',
        intro: 'Orihuela Costa sträcker sig över flera populära kustområden med bra service, golf och stränder. Området är särskilt populärt bland skandinaver.',
        highlights: [
            { title: 'Stränder', description: 'Många stränder och vikar längs kusten.' },
            { title: 'Golf', description: 'Flera banor inom kort avstånd.' },
            { title: 'Shopping', description: 'Zenia Boulevard som regionalt nav.' },
            { title: 'Community', description: 'Stark internationell närvaro.' }
        ],
        priceNote: 'Orihuela Costa har stort utbud av lägenheter och radhus i olika prisklasser, ofta med gemensam pool och bra service.',
        areaHighlights: [
            'La Zenia för strand och shopping.',
            'Cabo Roig för marina och restauranger.',
            'Playa Flamenca för centralt läge.',
            'Villamartin för golf.'
        ]
    },
    'la-zenia': {
        cityName: 'La Zenia',
        citySlug: 'la-zenia',
        metaTitle: 'Fastigheter La Zenia | Strand och shopping',
        metaDescription: 'Köp bostad i La Zenia med svensk mäklare. Strand, Zenia Boulevard och bra service året runt.',
        title: 'Fastigheter i La Zenia',
        subtitle: 'Strandnära område med shopping, restauranger och service.',
        intro: 'La Zenia kombinerar strandläge med ett av Costa Blancas största shoppingcenter. Området passar både semester och helårsboende.',
        highlights: [
            { title: 'Strand', description: 'Kort avstånd till populära stränder.' },
            { title: 'Shopping', description: 'Zenia Boulevard intill.' },
            { title: 'Service', description: 'Restauranger och butiker året runt.' },
            { title: 'Läge', description: 'Nära golf och Orihuela Costa.' }
        ],
        priceNote: 'Här finns ett brett utbud av lägenheter och radhus, ofta i modern standard med gemensamma faciliteter.',
        areaHighlights: [
            'La Zenia Beach och strandpromenad.',
            'Nära Cabo Roig och Playa Flamenca.',
            'Smidiga bussförbindelser.',
            'Golfbanor inom 10–15 min.'
        ]
    },
    'playa-flamenca': {
        cityName: 'Playa Flamenca',
        citySlug: 'playa-flamenca',
        metaTitle: 'Fastigheter Playa Flamenca | Strandnära och centralt',
        metaDescription: 'Köp bostad i Playa Flamenca med svensk rådgivning. Nära strand, Zenia Boulevard och service.',
        title: 'Fastigheter i Playa Flamenca',
        subtitle: 'Centralt läge nära strand, shopping och service.',
        intro: 'Playa Flamenca är ett populärt område med bra läge och kort avstånd till både strand och shopping. Området är livligt året runt.',
        highlights: [
            { title: 'Läge', description: 'Nära strand och Zenia Boulevard.' },
            { title: 'Service', description: 'Restauranger och butiker året runt.' },
            { title: 'Uthyrning', description: 'Efterfrågan under stora delar av året.' },
            { title: 'Familjevänligt', description: 'Tryggt område med många faciliteter.' }
        ],
        priceNote: 'Playa Flamenca har många urbanisationer med pool och gemensamma ytor, ofta i gångavstånd till service.',
        areaHighlights: [
            'Playa Flamenca Beach och Paseo.',
            'Gångavstånd till Zenia Boulevard.',
            'Nära Punta Prima och La Zenia.',
            'Kort bilresa till golfbanor.'
        ]
    },
    'punta-prima': {
        cityName: 'Punta Prima',
        citySlug: 'punta-prima',
        metaTitle: 'Fastigheter Punta Prima | Havsnära boende',
        metaDescription: 'Köp bostad i Punta Prima med svensk mäklare. Strandpromenad, service och havsnära lägen.',
        title: 'Fastigheter i Punta Prima',
        subtitle: 'Havsnära och modernt med strandpromenad och service.',
        intro: 'Punta Prima är ett populärt kustläge med strandpromenad, moderna bostäder och bra kommunikationer. Passar både permanentboende och semester.',
        highlights: [
            { title: 'Havsnära', description: 'Strandpromenad och badvikar.' },
            { title: 'Modernt', description: 'Många nyare projekt.' },
            { title: 'Service', description: 'Restauranger och butiker nära.' },
            { title: 'Läge', description: 'Nära Torrevieja och Orihuela Costa.' }
        ],
        priceNote: 'Punta Prima erbjuder ofta modern nyproduktion och lägenheter med havsnära läge.',
        areaHighlights: [
            'Punta Prima strand och promenad.',
            'Nära Zenia Boulevard.',
            'Snabb access till N‑332.',
            'Kort avstånd till Torrevieja centrum.'
        ]
    },
    'ciudad-quesada': {
        cityName: 'Ciudad Quesada',
        citySlug: 'ciudad-quesada',
        metaTitle: 'Fastigheter Ciudad Quesada | Lugn nära kusten',
        metaDescription: 'Köp bostad i Ciudad Quesada med svensk mäklare. Lugn villastad nära Guardamar och Torrevieja.',
        title: 'Fastigheter i Ciudad Quesada',
        subtitle: 'Grönskande villastad med lugn livsstil nära kusten.',
        intro: 'Ciudad Quesada är ett etablerat område med villor, radhus och lägenheter, populärt för sitt lugn och närhet till service.',
        highlights: [
            { title: 'Villastad', description: 'Mycket grönska och lugn.' },
            { title: 'Golf', description: 'La Marquesa golfbana i området.' },
            { title: 'Service', description: 'Restauranger, butiker och service nära.' },
            { title: 'Läge', description: 'Kort bilresa till Guardamar.' }
        ],
        priceNote: 'Ciudad Quesada ger ofta större bostäder för pengarna jämfört med strandnära orter.',
        areaHighlights: [
            'La Marquesa Golf som lokal attraktion.',
            'Nära Guardamars stränder.',
            'Familjevänliga urbanisationer.',
            'Bra långtidboende året runt.'
        ]
    },
    rojales: {
        cityName: 'Rojales',
        citySlug: 'rojales',
        metaTitle: 'Fastigheter Rojales | Prisvärt nära kusten',
        metaDescription: 'Köp bostad i Rojales med svensk rådgivning. Spansk småstad nära Guardamar och Ciudad Quesada.',
        title: 'Fastigheter i Rojales',
        subtitle: 'Prisvärt inlandsläge nära kusten och service.',
        intro: 'Rojales är en traditionell spansk småstad nära kusten. Här får du ofta bättre pris per kvadrat än vid strandlägena.',
        highlights: [
            { title: 'Prisvärt', description: 'Bra värde i inlandsläge.' },
            { title: 'Läge', description: 'Nära Guardamar och Quesada.' },
            { title: 'Spanskt', description: 'Genuin småstadskänsla.' },
            { title: 'Service', description: 'Bra vardagsservice.' }
        ],
        priceNote: 'Rojales passar dig som vill ha mer bostad för pengarna men ändå nära stranden.',
        areaHighlights: [
            'Nära Guardamar del Segura.',
            'Kort bilresa till stranden.',
            'Närhet till golfbanor.',
            'Lugn vardagsmiljö.'
        ]
    },
    benijofar: {
        cityName: 'Benijofar',
        citySlug: 'benijofar',
        metaTitle: 'Fastigheter Benijofar | Modernt byliv',
        metaDescription: 'Köp bostad i Benijofar med svensk mäklare. Nyproduktion nära Quesada och kusten.',
        title: 'Fastigheter i Benijofar',
        subtitle: 'Modernt byliv med nyproduktion nära kusten.',
        intro: 'Benijofar är en växande by med nyproduktion och god service. Området är populärt för lugn och bra kommunikationer.',
        highlights: [
            { title: 'Nyproduktion', description: 'Många moderna projekt.' },
            { title: 'Läge', description: 'Nära Quesada och Guardamar.' },
            { title: 'Service', description: 'Bra vardagsservice.' },
            { title: 'Pris', description: 'Prisvärt jämfört med strandläge.' }
        ],
        priceNote: 'Benijofar erbjuder ofta nya bostäder till konkurrenskraftiga priser, med närhet till både service och kust.',
        areaHighlights: [
            'Närhet till Ciudad Quesada.',
            'Kort bilresa till Guardamar.',
            'Goda vägförbindelser.',
            'Lugn miljö för helårsboende.'
        ]
    }
};
