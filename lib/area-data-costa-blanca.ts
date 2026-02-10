import { AreaDetail } from '@/types/property';

// Costa Blanca Areas (20 areas)
export const COSTA_BLANCA_AREAS: AreaDetail[] = [
    {
        slug: 'alicante',
        name: 'Alicante',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 380,
        priceRange: { min: 120000, max: 1500000 },
        avgPrice: 285000,
        image: '/images/areas/alicante.png',
        description: 'En livlig kuststad med rik historia, vacker strandpromenad och utmärkta restauranger.',
        headline: 'Fastigheter i Alicante | Stadsliv & strand på Costa Blanca',
        metaDescription: 'Köp bostad i Alicante med svensk mäklare. Stadspuls, stränder och bra kommunikationer. Se lägenheter, radhus och villor till salu.',
        keywords: ['fastigheter alicante', 'köpa bostad alicante', 'alicante lägenheter', 'alicante villor'],
        coordinates: { lat: 38.3452, lng: -0.4815 },
        content: {
            intro: 'Alicante är Costa Blancas pulserande huvudstad med en perfekt blandning av urban livsstil och medelhavscharm. Staden erbjuder prisvärt boende, utmärkta kommunikationer och en genuin spansk atmosfär som lockar både familjer och pensionärer.',
            lifestyle: 'Livet i Alicante präglas av den avslappnade medelhavsmentaliteten. Morgonkaffe på någon av de mysiga kaféerna i Barrio Santa Cruz, promenad längs den palmkantade Explanada de España och kvällstapas i den gamla staden. Här finns allt från internationella skolor till golf och marina aktiviteter.',
            climate: 'Alicante njuter av över 320 soldagar per år med milda vintrar (12-18°C) och varma somrar (25-35°C). Den låga luftfuktigheten gör värmen behaglig. Regn är ovanligt, med mest nederbörd under höstmånaderna.',
            attractions: 'Upptäck det majestätiska Santa Bárbara-slottet med fantastisk utsikt, strosa genom det färgglada Barrio Santa Cruz, slappna av på Playa del Postiguet eller utforska MARQ-museet. För golfentusiaster finns flera banor inom 30 minuters bilresa.',
            transport: 'Alicante-Elche flygplats ligger bara 15 minuter bort med direktflyg till Stockholm, Göteborg och andra europeiska städer. Utmärkt tågnät med höghastighetståg till Madrid och Barcelona. Lokaltrafik med spårvagn längs kusten.',
            propertyMarket: 'Fastighetsmarknaden i Alicante erbjuder utmärkt valuta för pengarna. Moderna lägenheter i centrum från 150 000 €, strandnära bostäder från 200 000 € och exklusiva villor i La Albufereta från 500 000 €.',
            buyingTips: 'Köp i centrala Alicante för bekvämlighet och hyrespotential, eller i San Juan-området för familjer. Undvik överprissatta turistområden. Kontrollera alltid att fastigheten har rätt bygglov och registrering.'
        },
        highlights: [
            { icon: 'plane', title: 'Flygplats 15 min', description: 'Direktflyg till Skandinavien' },
            { icon: 'sun', title: '320 soldagar/år', description: 'Perfekt medelhavsklimat' },
            { icon: 'euro', title: 'Prisvärt', description: 'Lägre priser än turistorterna' },
            { icon: 'building', title: 'Stadsliv', description: 'Alla bekvämligheter nära' }
        ],
        relatedAreas: ['el-campello', 'san-juan', 'torrevieja', 'benidorm'],
        galleryImages: []
    },
    {
        slug: 'altea',
        name: 'Altea',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 145,
        priceRange: { min: 200000, max: 2500000 },
        avgPrice: 425000,
        image: '/images/areas/altea.png',
        description: 'Den vita pärlan vid havet – artisternas och kulturälskarnas favoritdestination.',
        headline: 'Fastigheter i Altea | Konst, havsutsikt och charm',
        metaDescription: 'Upptäck Altea med vitkalkade gränder och havsutsikt. Köpa bostad i Altea med svensk rådgivning. Se aktuella objekt till salu.',
        keywords: ['fastigheter altea', 'köpa bostad altea', 'altea lägenheter', 'altea villor'],
        coordinates: { lat: 38.5989, lng: -0.0519 },
        content: {
            intro: 'Altea är Costa Blancas mest pittoreska stad med sitt ikoniska vitkallade centrum, blåkupoliga kyrka och konstnärliga själ. Här möts tradition och sofistikering i en unik blandning som lockar kultursökande köpare från hela Europa.',
            lifestyle: 'Altea attraherar konstnärer, författare och de som söker ett lugnare tempo. Gamla staden bjuder på gallerier, ateljéer och mysiga restauranger. Den internationella gemenskapen är stark men integrerad med den lokala spanska kulturen.',
            climate: 'Skyddat läge mellan bergen och havet ger Altea ett behagligt mikroklimat. Somrarna är varma men sällan tryckande, vintrarna milda. Sierra de Bernia skyddar mot nordliga vindar.',
            attractions: 'Vandra i Gamla stans smala gränder, besök konstgallerier och keramikverkstäder, njut av solnedgången från kyrkoplatsen. Närliggande Sierra de Bernia erbjuder vandringsleder med spektakulär utsikt.',
            transport: 'Alicante flygplats 60 km, Valencia flygplats 120 km. TRAM-spårvagn till Benidorm och Alicante. Motorväg AP-7 för snabb biltransport längs kusten.',
            propertyMarket: 'Fastigheter i Altea håller sitt värde väl. Lägenheter i gamla staden från 250 000 €, villor med havsutsikt från 450 000 €, exklusiva fastigheter i Sierra de Altea från 800 000 €.',
            buyingTips: 'Gamla stadens fastigheter kräver ofta renovering – budgetera för detta. Kontrollera parkeringsmöjligheter då gatorna är smala. Villor i backarna erbjuder bäst utsikt men sämre tillgänglighet för äldre.'
        },
        highlights: [
            { icon: 'palette', title: 'Konstnärsparadis', description: 'Gallerier och ateljéer' },
            { icon: 'church', title: 'Historiskt centrum', description: 'Vitkalkat och pittoreskt' },
            { icon: 'mountain', title: 'Berg och hav', description: 'Spektakulär natur' },
            { icon: 'wine', title: 'Gastronomi', description: 'Prisbelönta restauranger' }
        ],
        relatedAreas: ['benidorm', 'calpe', 'moraira', 'albir'],
        galleryImages: []
    },
    {
        slug: 'benidorm',
        name: 'Benidorm',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 520,
        priceRange: { min: 95000, max: 1200000 },
        avgPrice: 195000,
        image: '/images/areas/benidorm.png',
        description: 'Spaniens Miami – livlig turistmetropol med fantastiska stränder och ändlöst nöjesliv.',
        headline: 'Fastigheter i Benidorm | Strand, service och investering',
        metaDescription: 'Köp bostad i Benidorm med svensk mäklare. Prisvärda lägenheter nära strand och service, stark hyresmarknad året runt.',
        keywords: ['fastigheter benidorm', 'köpa bostad benidorm', 'benidorm lägenheter', 'benidorm villor'],
        coordinates: { lat: 38.5411, lng: -0.1225 },
        content: {
            intro: 'Benidorm är en stad som aldrig sover. Med sina ikoniska skyskrapor, gyllene stränder och ändlösa utbud av restauranger och nöjen är detta Costa Blancas mest dynamiska destination. Perfekt för den som vill ha tillgång till allt.',
            lifestyle: 'Benidorm erbjuder något för alla – från pensionärer som njuter av vintersolens värme till unga familjer som uppskattar stränderna och ungdomar som lockas av nattlivet. Stark skandinavisk och brittisk gemenskap.',
            climate: 'Benidorm har ett av Europas bästa klimat med över 320 soldagar och medeltemperaturer på 18°C året runt. Skyddat läge mellan Sierra Cortina och havet.',
            attractions: 'Playa de Levante och Playa de Poniente rankas bland Spaniens bästa stränder. Terra Mítica nöjespark, Aqualandia vattenpark, Balcón del Mediterráneo med panoramautsikt. Gamla staden bjuder på tapas och flamenco.',
            transport: 'Alicante flygplats 50 km (45 min bil). Utmärkt bussnät. TRAM-spårvagn till Alicante. Taxibåt till andra kuststäder under sommaren.',
            propertyMarket: 'Benidorm erbjuder stora möjligheter till både boende och investering med hög hyresefterfrågan året runt. Studiolägenheter från 80 000 €, 2:or med havsutsikt från 150 000 €, penthouses från 300 000 €.',
            buyingTips: 'Välj mellan lugna Poniente för familjer eller livliga Levante för handel och nöjen. Undersök turismuthyrningslicenser om du planerar korttidsuthyrning. Äldre byggnader kan ha höga gemenskapsavgifter.'
        },
        highlights: [
            { icon: 'beach', title: '2 guldstränder', description: 'Levante och Poniente' },
            { icon: 'building-2', title: 'Modern stad', description: 'All service på plats' },
            { icon: 'music', title: 'Nöjesliv', description: '365 dagar om året' },
            { icon: 'trending-up', title: 'Investering', description: 'Hög hyresefterfrågan' }
        ],
        relatedAreas: ['altea', 'finestrat', 'villajoyosa', 'la-nucia'],
        galleryImages: []
    },
    {
        slug: 'calpe',
        name: 'Calpe',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 285,
        priceRange: { min: 150000, max: 2000000 },
        avgPrice: 320000,
        image: '/images/areas/calpe.png',
        description: 'Vid foten av den ikoniska Peñón de Ifach – spektakulär natur möter modern bekvämlighet.',
        headline: 'Fastigheter i Calpe | Bo vid Peñon de Ifach',
        metaDescription: 'Calpe kombinerar natur och bekvämlighet. Köp bostad nära strand och marina. Lägenheter och villor med svensk rådgivning.',
        keywords: ['fastigheter calpe', 'köpa bostad calpe', 'calpe lägenheter', 'calpe villor'],
        coordinates: { lat: 38.6446, lng: 0.0456 },
        content: {
            intro: 'Calpe domineras av den majestätiska Peñón de Ifach, en 332 meter hög klippa som reser sig ur havet. Denna dramatiska naturskönhet kombineras med moderna bekvämligheter och ett aktivt expatliv som gör Calpe till en av Costa Blancas mest attraktiva destinationer.',
            lifestyle: 'Calpe är perfekt för den aktiva pensionären eller familjen. Vandring, dykning, segling och golf finns inom räckhåll. Den internationella gemenskapen är välorganiserad med klubbar och aktiviteter.',
            climate: 'Mikroklimat skapat av Peñón de Ifach och omgivande berg ger behagliga temperaturer året runt. Sällan över 30°C på sommaren eller under 10°C på vintern.',
            attractions: 'Klättra Peñón de Ifach för otrolig utsikt (UNESCO-skyddat naturreservat). Fiskauktion på hamnen, romerska saltbassänger, kristallklart vatten perfekt för dykning.',
            transport: 'Alicante flygplats 65 km, Valencia flygplats 120 km. TRAM-spårvagn under uppbyggnad. Båtförbindelser till närliggande kuststäder under sommaren.',
            propertyMarket: 'Calpe erbjuder varierat utbud från strandnära lägenheter till lyxvillor i backarna. Lägenheter från 150 000 €, townhouses från 250 000 €, villor med havsutsikt från 450 000 €.',
            buyingTips: 'Välj läge baserat på prioritet – strand, utsikt eller lugn. Controllera att villor har laglig pool (många äldre pooler saknar tillstånd). Första linjen är dyrare men håller värdet bäst.'
        },
        highlights: [
            { icon: 'mountain', title: 'Peñón de Ifach', description: 'UNESCO naturreservat' },
            { icon: 'fish', title: 'Färsk fisk', description: 'Daglig fiskauktion' },
            { icon: 'anchor', title: 'Marinan', description: 'Segling och dykning' },
            { icon: 'heart', title: 'Expatliv', description: 'Stark gemenskap' }
        ],
        relatedAreas: ['moraira', 'altea', 'benissa', 'javea'],
        galleryImages: []
    },
    {
        slug: 'denia',
        name: 'Denia',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 195,
        priceRange: { min: 180000, max: 1800000 },
        avgPrice: 365000,
        image: '/images/areas/denia.png',
        description: 'Gastronomisk huvudstad med färjeförbindelse till Ibiza – autentiskt spansk med internationell touch.',
        headline: 'Fastigheter i Denia | Gastronomi, hamn och strandliv',
        metaDescription: 'Köp bostad i Denia med svensk mäklare. UNESCO-gastronomi, hamn och stränder. Se lägenheter och villor till salu.',
        keywords: ['fastigheter denia', 'köpa bostad denia', 'denia lägenheter', 'denia villor'],
        coordinates: { lat: 38.8409, lng: 0.1057 },
        content: {
            intro: 'Denia är norra Costa Blancas juvel – en autentisk spansk stad med UNESCO-utmärkelse som gastronomisk huvudstad. Härifrån går färjor till Ibiza och Formentera, vilket ger en unik känsla av medelhavsglamour blandat med traditionell charm.',
            lifestyle: 'Denia attraherar matälskare, seglare och kulturintresserade. Staden behåller sin spanska karaktär samtidigt som den välkomnar internationella invånare. Starka traditioner med fester och fyrverkerier.',
            climate: 'Behagligt klimat året runt med Montgó-berget som vindskydd. Somrar är varma men inte tryckande, vintrar milda. Området är ett av Spaniens soligaste.',
            attractions: 'Slottet med arkeologiskt museum, 20 km sandstränder, Montgó naturpark för vandring, hamnen med färjor till Balearerna. Michelin-restauranger och traditionella tapasställen.',
            transport: 'Alicante flygplats 95 km, Valencia flygplats 100 km. Färjeförbindelser till Ibiza (2h), Mallorca och Formentera. AP-7 motorväg.',
            propertyMarket: 'Högre priser än södra Costa Blanca men med bättre värdestabilitet. Lägenheter i centrum från 200 000 €, strandnära villor från 400 000 €, lyxfastigheter vid Montgó från 700 000 €.',
            buyingTips: 'Les Rotes-området erbjuder bäst strandtillgång, Montgó-sluttningarna bäst utsikt. Undvik översvämningsområden nära flodmynningen. Sommarpriserna är högre – köp på vintern.'
        },
        highlights: [
            { icon: 'utensils', title: 'Gastronomi', description: 'UNESCO Creative City' },
            { icon: 'ship', title: 'Ibiza-färja', description: '2 timmar till paradis' },
            { icon: 'castle', title: 'Slottet', description: 'Medeltida historia' },
            { icon: 'waves', title: '20 km strand', description: 'Sand och klippor' }
        ],
        relatedAreas: ['javea', 'ondara', 'pedreguer', 'altea'],
        galleryImages: []
    },
    {
        slug: 'javea',
        name: 'Jávea',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 310,
        priceRange: { min: 220000, max: 3500000 },
        avgPrice: 485000,
        image: '/images/areas/javea.png',
        description: 'Den exklusiva favoriten bland skandinaver – tre unika zoner med strand, hamn och historiskt centrum.',
        headline: 'Fastigheter i Jávea | Skandinavernas favorit',
        metaDescription: 'Köp bostad i Jávea med svensk rådgivning. Exklusiva vikar, stark gemenskap och premiumvillor. Se aktuella objekt.',
        keywords: ['fastigheter jávea', 'köpa bostad jávea', 'jávea lägenheter', 'jávea villor'],
        coordinates: { lat: 38.7875, lng: 0.1661 },
        content: {
            intro: 'Jávea (Xàbia) är Costa Blancas mest exklusiva destination och en favorit bland skandinaviska köpare i generationer. Staden delas i tre distinkta zoner – det historiska centret, den livliga hamnen och den spektakulära Arenal-stranden.',
            lifestyle: 'Jávea erbjuder det bästa av två världar – autentiskt spanskt liv och en välintegrerad internationell gemenskap. Internationella skolor, svenska klubbar och nordiska restauranger. Perfekt för barnfamiljer och pensionärer.',
            climate: 'WHO har utnämnt Jáveas klimat till ett av världens hälsosammaste. Milt året runt, skyddat av Cap de Sant Antoni och Montgó.',
            attractions: 'Arenal-stranden med promenad och restauranger, grottor vid Cap de la Nau, vattensporter, golf, vandring i Montgó. Historiska kyrkan San Bartolomé.',
            transport: 'Alicante flygplats 90 km, Valencia flygplats 110 km. Egen hamn med båttrafik. Väl utbyggt lokalt bussnät.',
            propertyMarket: 'Premium-priser men utmärkt värdestabilitet och hög efterfrågan. Lägenheter vid Arenal från 280 000 €, townhouses från 350 000 €, villor med havsutsikt från 600 000 €, lyxvillor från 1 500 000 €.',
            buyingTips: 'Köp i Arenal för strandnärhet och hyrespotential, Balcón al Mar för utsikt, Pinosol för lugn och stora tomter. Var beredd på konkurrens – populära objekt säljs snabbt.'
        },
        highlights: [
            { icon: 'sun', title: 'Bäst klimat', description: 'WHO-rekommenderat' },
            { icon: 'users', title: 'Skandinaviskt', description: 'Stark nordisk gemenskap' },
            { icon: 'school', title: 'Skolor', description: 'Internationella skolor' },
            { icon: 'gem', title: 'Exklusivt', description: 'Premium fastigheter' }
        ],
        relatedAreas: ['denia', 'moraira', 'calpe', 'benitachell'],
        galleryImages: []
    },
    {
        slug: 'moraira',
        name: 'Moraira',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 175,
        priceRange: { min: 280000, max: 4000000 },
        avgPrice: 595000,
        image: '/images/areas/moraira.png',
        description: 'Den lilla lyxorten – exklusiva villor i en pittoresk före detta fiskeby.',
        headline: 'Fastigheter i Moraira | Exklusiva villor vid havet',
        metaDescription: 'Moraira erbjuder premiumvillor och lugn fiskebyscharm. Köp bostad med svensk mäklare och personlig service.',
        keywords: ['fastigheter moraira', 'köpa bostad moraira', 'moraira lägenheter', 'moraira villor'],
        coordinates: { lat: 38.6877, lng: 0.1407 },
        content: {
            intro: 'Moraira är den lilla orten som har det stora. En gång en enkel fiskeby är Moraira idag en av Costa Blancas mest exklusiva adresser. Pittoreska gator, charmig hamn och spektakulära lyxvillor i backarna skapar en unik atmosfär.',
            lifestyle: 'Moraira attraherar förmögna köpare som söker kvalitet och diskretion. Utmärkta restauranger, en av Spaniens bästa golfbanor och en gemenskap av likasinnade. Litet men komplett.',
            climate: 'Skyddat läge mellan Cabo de la Nau och Ifach ger idealiskt mikroklimat. Aldrig för varmt, sällan kallt. Perfekta odlingsförhållanden för vin – lokala Moraira-viner är berömda.',
            attractions: 'Den lilla hamnen med fiskerestauranger, historiskt vakttorn, vacker kustlinje för promenader, El Portet-viken för bad, Club de Golf Ifach.',
            transport: 'Alicante flygplats 80 km, Valencia flygplats 120 km. Mindre bra kollektivtrafik – bil rekommenderas. Nära motorväg AP-7.',
            propertyMarket: 'Premiummarknad med villor som huvudfokus. Få lägenheter tillgängliga. Townhouses från 300 000 €, villor från 500 000 €, lyxvillor med havsutsikt 1-4 miljoner €.',
            buyingTips: 'Moraira är dyrast på Costa Blanca – förvänta dig premiumpris för premiumläge. Benimeit-området erbjuder mer prisvärt alternativ med Moraira-adress. Kontrollera tomtgränser noga.'
        },
        highlights: [
            { icon: 'gem', title: 'Exklusivt', description: 'Premium fastigheter' },
            { icon: 'anchor', title: 'Fiskebyscharm', description: 'Pittoresk hamn' },
            { icon: 'golf', title: 'Golf', description: 'Ifach golfklubb' },
            { icon: 'grape', title: 'Vin', description: 'Lokala vinodlingar' }
        ],
        relatedAreas: ['calpe', 'javea', 'benissa', 'altea'],
        galleryImages: []
    },
    {
        slug: 'torrevieja',
        name: 'Torrevieja',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 480,
        priceRange: { min: 75000, max: 800000 },
        avgPrice: 165000,
        image: '/images/areas/torrevieja.png',
        description: 'Skandinavernas sommarparadis – prisvärt, bekvämt och med stark nordisk gemenskap.',
        headline: 'Fastigheter i Torrevieja | Prisvärt boende vid kusten',
        metaDescription: 'Köp bostad i Torrevieja med svensk mäklare. Prisvärda lägenheter, radhus och villor nära strand och service.',
        keywords: ['fastigheter torrevieja', 'köpa bostad torrevieja', 'torrevieja lägenheter', 'torrevieja villor'],
        coordinates: { lat: 37.9789, lng: -0.6822 },
        content: {
            intro: 'Torrevieja är det självklara valet för skandinaver som söker prisvärt boende i solen. Med Spaniens största nordiska gemenskap, rosa saltlaguner och över tio kilometer strand erbjuder staden allt man behöver för ett gott liv.',
            lifestyle: 'Torrevieja är som ett litet Skandinavien i Spanien. Svenska kyrkan, nordiska klubbar, bekanta matvaror i butikerna. Samtidigt finns det äkta spanska livet runt hörnet. Perfekt mix för den som vill ha det bästa av två världar.',
            climate: 'WHO rekommenderar Torreviejas luft som en av de hälsosammaste i Europa tack vare saltlagunerna. Över 300 soldagar, milda vintrar. Salthalten renar luften.',
            attractions: 'Rosa saltlagungen (selfie-paradis!), Habaneras-musiken, långa stränder, vattenparker. Nära till Murcia och Elche för större shopping och kultur.',
            transport: 'Alicante flygplats 40 minuter, Murcia flygplats 45 minuter. Utmärkt bussnät. Bil underlättar för inlandet.',
            propertyMarket: 'Torrevieja är en av Spaniens mest prisvärda kuststäder. Studiolägenheter från 60 000 €, 2:or från 100 000 €, villor med pool från 200 000 €. Utmärkt för förstagångsköpare.',
            buyingTips: 'Undvik de allra billigaste objekten – ofta finns det anledning till det låga priset. La Mata är lugnare, centrala Torrevieja mer livligt. Kontrollera gemenskapsavgifter – de varierar enormt.'
        },
        highlights: [
            { icon: 'euro', title: 'Prisvärda', description: 'Bland Spaniens billigaste' },
            { icon: 'users', title: 'Skandinaviskt', description: 'Sveriges största koloni' },
            { icon: 'droplets', title: 'Saltlagunerna', description: 'Rosa naturunder' },
            { icon: 'heart', title: 'Hälsosamt', description: 'WHO-rekommenderad luft' }
        ],
        relatedAreas: ['orihuela-costa', 'guardamar', 'ciudad-quesada', 'la-mata'],
        galleryImages: []
    },
    {
        slug: 'orihuela-costa',
        name: 'Orihuela Costa',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 395,
        priceRange: { min: 85000, max: 950000 },
        avgPrice: 185000,
        image: '/images/areas/orihuela-costa.png',
        description: 'Golfparadis med kilometerlånga stränder – flera populära urbanisationer i ett område.',
        headline: 'Fastigheter i Orihuela Costa | Golf och strandliv',
        metaDescription: 'Upptäck Orihuela Costa med La Zenia, Cabo Roig och Villamartin. Golf, stränder och stark community. Svensk rådgivning.',
        keywords: ['fastigheter orihuela costa', 'köpa bostad orihuela costa', 'orihuela costa lägenheter', 'orihuela costa villor'],
        coordinates: { lat: 37.9335, lng: -0.7356 },
        content: {
            intro: 'Orihuela Costa är ett samlingsnamn för flera populära urbanisationer längs kusten söder om Torrevieja. Cabo Roig, Punta Prima, La Zenia, Playa Flamenca och Villamartin erbjuder golf, strand och en stark internationell gemenskap.',
            lifestyle: 'Här lever man "urbanisation-livet" med gemenskapspooler, golfbanor och välskötta områden. Stort utbud av restauranger och barer. Stark brittisk och skandinavisk närvaro.',
            climate: 'Torrt och soligt klimat med över 320 soldagar. Milda vintrar gör området populärt för vinterboende. Lite svalare vid kusten tack vare havsbrisen.',
            attractions: 'Flera golfbanor (Villamartin, Campoamor, Las Ramblas), La Zenia Boulevard – ett av Europas största utomhusköpcentra, vackra stränder och criques.',
            transport: 'Alicante flygplats 45 min, Murcia flygplats 30 min. Bussnät täcker de flesta urbanisationerna. Bil underlättar för att röra sig mellan områdena.',
            propertyMarket: 'Varierat utbud från bungalows till villor. Bungalows från 100 000 €, lägenheter från 120 000 €, townhouses från 180 000 €, villor med pool från 280 000 €.',
            buyingTips: 'Cabo Roig är mest exklusivt, La Zenia mest centralt för shopping, Villamartin för golf. Kontrollera att urbanisationen är välskött – gemenskapsavgifterna varierar.'
        },
        highlights: [
            { icon: 'golf', title: '5 golfbanor', description: 'Inom 10 min' },
            { icon: 'shopping-bag', title: 'La Zenia Boulevard', description: 'Europas största' },
            { icon: 'beach', title: 'Vackra stränder', description: 'Cabo Roig m.fl.' },
            { icon: 'home', title: 'Urbanisationer', description: 'Ordnat boende' }
        ],
        relatedAreas: ['torrevieja', 'ciudad-quesada', 'campoamor', 'pilar-de-la-horadada'],
        galleryImages: []
    },
    {
        slug: 'ciudad-quesada',
        name: 'Ciudad Quesada',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 165,
        priceRange: { min: 95000, max: 600000 },
        avgPrice: 195000,
        image: '/images/areas/ciudad-quesada.png',
        description: 'Det lugna inlandsalternativet med utsikt över saltsjöarna – prisvärt och stillsamt.',
        headline: 'Fastigheter i Ciudad Quesada | Lugn nära kusten',
        metaDescription: 'Köp bostad i Ciudad Quesada med svensk mäklare. Prisvärda villor och lugnt inlandsliv nära Costa Blancas stränder.',
        keywords: ['köpa villa ciudad quesada', 'quesada bostad', 'rojales fastigheter', 'costa blanca inlandet'],
        coordinates: { lat: 38.0234, lng: -0.7712 },
        content: {
            intro: 'Ciudad Quesada ligger på en höjd strax inåt landet med fantastisk utsikt över Torreviejas rosa saltlaguner och kusten. Hit kommer de som söker lugn och ro, större tomter och lägre priser – men ändå bara 10 minuter från stranden.',
            lifestyle: 'Avslappnat liv i villaområden med gemensamma pooler och golfbanor. Stark expat-gemenskap med många aktiviteter. Perfekt för pensionärer som vill undvika turisternas stress men ändå ha tillgång till allt.',
            climate: 'Samma fantastiska klimat som kusten men lite torrare. Sommarkvällarna kan vara svalare på höjden. Vintertemperaturerna är angenäma.',
            attractions: 'La Marquesa golfbana, promenader vid Laguna Rosa, nära till Rojales med dess fascinerande grotthus. Enkelt till stränderna i Guardamar.',
            transport: 'Alicante flygplats 45 min, Murcia flygplats 35 min. Bil nödvändigt då det saknas kollektivtrafik. Nära motorvägen AP-7.',
            propertyMarket: 'Prisvärt alternativ till kusten med större tomter och mer för pengarna. Bungalows från 100 000 €, villor med pool från 180 000 €, större villor från 300 000 €.',
            buyingTips: 'Perfekt för den som inte behöver vara på stranden dagligen. Kontrollera vattentillgång – äldre fastigheter kan ha problem. Pooluppvärmning kan behövas på vintern.'
        },
        highlights: [
            { icon: 'euro', title: 'Prisvärt', description: 'Mer för pengarna' },
            { icon: 'eye', title: 'Utsikt', description: 'Rosa lagunen' },
            { icon: 'golf', title: 'Golf', description: 'La Marquesa Golf' },
            { icon: 'moon', title: 'Lugn', description: 'Stillsamt boende' }
        ],
        relatedAreas: ['rojales', 'torrevieja', 'guardamar', 'orihuela-costa'],
        galleryImages: []
    },
    {
        slug: 'guardamar',
        name: 'Guardamar del Segura',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 145,
        priceRange: { min: 110000, max: 750000 },
        avgPrice: 225000,
        image: '/images/areas/guardamar.png',
        description: 'Naturnära pärla med vidsträckta tallskogar och orörd kustlinje.',
        headline: 'Fastigheter i Guardamar | Natur, tallskog och strand',
        metaDescription: 'Köp bostad i Guardamar del Segura med svensk mäklare. Långa stränder, tallskog och lugn livsstil nära service.',
        keywords: ['fastigheter guardamar', 'köpa bostad guardamar', 'guardamar lägenheter', 'guardamar villor'],
        coordinates: { lat: 38.0896, lng: -0.6542 },
        content: {
            intro: 'Guardamar del Segura är en naturskön oas där tallskogar möter sanddyner och milslånga stränder. Denna genuint spanska stad erbjuder en lugnare livsstil än de större turistorterna, men med alla bekvämligheter inom räckhåll.',
            lifestyle: 'Guardamar lockar naturälskare och aktiva pensionärer. Promenader i tallskogarna, cykling längs kusten och bad vid orörda stränder. Mer spanskt än skandinaviskt – perfekt för den som vill integrera sig.',
            climate: 'Milt medelhavsklimat med skyddande tallskogar som ger naturlig skugga och svalka. Havsbrisen håller somrarna behagliga.',
            attractions: 'Över 800 hektar tallskog planterad på sanddyner, arkeologisk park med feniciska ruiner, kilometerlånga stränder med blå flagg, naturreservat vid Seguraflodens mynning.',
            transport: 'Alicante flygplats 35 min. Lokalbussar till Torrevieja och Alicante. Bil underlättar för vardagslivet.',
            propertyMarket: 'Bra värde för pengarna jämfört med grannorterna. Lägenheter nära strand från 130 000 €, bungalows från 150 000 €, villor med trädgård från 250 000 €.',
            buyingTips: 'Välj mellan strandnära (dyrare, populärt för uthyrning) eller centrum (billigare, bekvämare). Undvik områden nära Seguras utlopp vid höstregn.'
        },
        highlights: [
            { icon: 'tree', title: 'Tallskogar', description: '800+ hektar natur' },
            { icon: 'waves', title: 'Stränder', description: 'Blå flagg-cert.' },
            { icon: 'landmark', title: 'Historia', description: 'Feniciska ruiner' },
            { icon: 'leaf', title: 'Naturreservat', description: 'Orörda miljöer' }
        ],
        relatedAreas: ['torrevieja', 'ciudad-quesada', 'santa-pola', 'orihuela-costa'],
        galleryImages: []
    }
];
