import { AreaDetail } from '@/types/property';

// Costa Blanca Missing High Priority Areas
export const COSTA_BLANCA_AREAS_3: AreaDetail[] = [
    {
        slug: 'dehesa-de-campoamor',
        name: 'Dehesa de Campoamor',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 145,
        priceRange: { min: 210000, max: 2950000 },
        avgPrice: 580000,
        image: '/images/areas/campoamor.png',
        description: 'Exklusivt område känt för sina pinjeskogar som möter havet, lyxiga villor och privat marina.',
        headline: 'Fastigheter i Campoamor | Skog och hav',
        metaDescription: 'Köp bostad i Campoamor med svensk rådgivning. Pinjeskogar, stränder och marina i ett exklusivt område.',
        keywords: ['köpa bostad campoamor', 'dehesa de campoamor', 'lyxvillor costa blanca', 'campoamor golf'],
        coordinates: { lat: 37.9056, lng: -0.7633 },
        content: {
            intro: 'Dehesa de Campoamor är ett av Costa Blancas mest exklusiva områden, känt för sin unika kombination av lummiga pinjeskogar som sträcker sig ända ner till de vita sandstränderna. Här möts natur och lyx i en avslappnad men sofistikerad miljö med egen marina och ridklubb.',
            lifestyle: 'Sofistikerat och lugnt. Livet kretsar kring den privata marinan, de exklusiva strandklubbarna och golfen. Området lockar en kräsen internationell och spansk publik som söker integritet och natur.',
            climate: 'Skyddat mikroklimat tack vare omfattande vegetation. Svala sommarkvällar och milda vintrar. 320 soldagar om året.',
            attractions: 'Marina de Campoamor, Las Colinas Golf & Country Club (nära), stränderna Playa de la Glea och Barranco Rubio, ridcenter.',
            transport: 'Alicante flygplats 50 min, Murcia flygplats 40 min. Bil rekommenderas. Direkt tillgång till motorväg AP-7.',
            propertyMarket: 'Premiummarknad. Lägenheter med havsutsikt från €210 000, men fokus ligger på fristående villor som ofta startar runt €800 000 och går upp till flera miljoner euro.',
            buyingTips: 'Lomas de Campoamor för golfnära lägenheter, strandsidan för villor (högre prisbild). Kolla urbanisationsavgifter då många områden har privat bevakning.'
        },
        highlights: [
            { icon: 'tree', title: 'Pinjeskogar', description: 'Unik grön miljö' },
            { icon: 'anchor', title: 'Marina', description: 'Privat båthamn' },
            { icon: 'star', title: 'Exklusivt', description: 'Premiumområde' },
            { icon: 'waves', title: 'Fina stränder', description: 'Playa de la Glea' }
        ],
        relatedAreas: ['cabo-roig', 'mil-palmeras', 'pilar-de-la-horadada', 'villamartin'],
        galleryImages: []
    },
    {
        slug: 'playa-flamenca',
        name: 'Playa Flamenca',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 210,
        priceRange: { min: 140000, max: 650000 },
        avgPrice: 245000,
        image: '/images/areas/playa-flamenca.png',
        description: 'Livligt och populärt område med vackra badvikar, lördagsmarknad och närhet till Zenia Boulevard.',
        headline: 'Fastigheter i Playa Flamenca | Strand och shopping',
        metaDescription: 'Köp bostad i Playa Flamenca med svensk mäklare. Nära Zenia Boulevard, stränder och service.',
        keywords: ['köpa bostad playa flamenca', 'playa flamenca marknad', 'orihuela costa bostad', 'lägenhet vid havet'],
        coordinates: { lat: 37.9388, lng: -0.7289 },
        content: {
            intro: 'Playa Flamenca är hjärtat av Orihuela Costa – ett levande område året runt med en perfekt balans mellan strandliv, shopping och nöjen. Känd för sina två vackra badvikar, Cala Mosca och Cala Estaca, och den enormt populära lördagsmarknaden.',
            lifestyle: 'Aktivt och socialt. Här finns allt inom gångavstånd: stränder, hundratals restauranger, go-kart, och kustens största köpcentrum Zenia Boulevard precis intill. Mycket populärt bland skandinaver och britter.',
            climate: 'Typiskt soligt Costa Blanca-klimat. Öppna ytor ger svalkande havsbris på sommaren.',
            attractions: 'Lördagsmarknaden (en av områdets största), Zenia Boulevard, strandpromenaden som binder ihop vikarna, kommunalt sportcenter.',
            transport: 'Alicante flygplats 45 min. Bra bussförbindelser till Torrevieja och stränderna. Enkel access till N-332.',
            propertyMarket: 'Mycket likvid marknad med stor efterfrågan. Prisvärda lägenheter från €140 000, radhus ("quads") från €190 000. Mycket god uthyrningspotential.',
            buyingTips: 'Områden norr om N-332 är ofta lugnare, södra sidan närmare strand och puls. Perfekt för förstagångsköpare.'
        },
        highlights: [
            { icon: 'shopping-bag', title: 'Marknad', description: 'Stor lördagsmarknad' },
            { icon: 'shopping-cart', title: 'Zenia Blvd', description: 'Nära köpcentrum' },
            { icon: 'users', title: 'Levande', description: 'Året runt-puls' },
            { icon: 'euro', title: 'Prisvärt', description: 'Bra instegspriser' }
        ],
        relatedAreas: ['la-zenia', 'punta-prima', 'villamartin', 'torrevieja'],
        galleryImages: []
    },
    {
        slug: 'villamartin',
        name: 'Villamartín',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 320,
        priceRange: { min: 130000, max: 1200000 },
        avgPrice: 275000,
        image: '/images/areas/villamartin.png',
        description: 'Golfparadis med livlig Plaza, grönskande omgivningar och ett stort internationellt community.',
        headline: 'Fastigheter i Villamartín | Golf och community',
        metaDescription: 'Köp bostad i Villamartín med svensk rådgivning. Golf, Villamartín Plaza och stark community.',
        keywords: ['köpa bostad villamartin', 'villamartin golf', 'villamartin plaza', 'golfbostad spanien'],
        coordinates: { lat: 37.9456, lng: -0.7656 },
        content: {
            intro: 'Villamartín är mer än bara en golfbana; det är en hel livsstil. Byggt kring en av Spaniens mest etablerade golfbanor, erbjuder området en grön, kuperad miljö med den berömda "Villamartín Plaza" som socialt nav – fyllt av restauranger och palmer.',
            lifestyle: 'Golf- och njutningsinriktat. Mycket stark expat-community. Dagarna spenderas på golfbanan eller vid poolen, kvällarna på Plazan som ofta har livemusik. Avslappnat men socialt.',
            climate: 'Något varmare än kusten på sommaren då det ligger 3-4 km inåt land, men lummig grönska ger skugga.',
            attractions: 'Villamartín Golf Club, Villamartín Plaza (nöjescentrum), nära till Las Ramblas och Campoamor golfbanor, internationella skolan El Limonar.',
            transport: 'Bil rekommenderas. 50 min till Alicante flygplats. Bussar finns till havet (La Zenia) men går ej ofta.',
            propertyMarket: 'Varierat. Äldre charmiga lägenheter vid golfen från €130 000, nyproduktion (mycket aktivt) från €240 000, fristående villor €400 000+.',
            buyingTips: 'Kolla samfällighetsavgifter (community fees) noga då grönområden kostar. "Los Dolses" och "Rioja" är populära delområden.'
        },
        highlights: [
            { icon: 'golf', title: 'Golf', description: 'Hemma på banan' },
            { icon: 'music', title: 'Plaza', description: 'Uteliv & musik' },
            { icon: 'leaf', title: 'Grönska', description: 'Etablerade trädgårdar' },
            { icon: 'users', title: 'Community', description: 'Starkt expat-fäste' }
        ],
        relatedAreas: ['los-dolses', 'las-ramblas', 'campoamor', 'san-miguel-de-salinas'],
        galleryImages: []
    },
    {
        slug: 'punta-prima',
        name: 'Punta Prima',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 185,
        priceRange: { min: 180000, max: 950000 },
        avgPrice: 310000,
        image: '/images/areas/punta-prima.png',
        description: 'Kustnära område med modern nyproduktion, fin strandpromenad och kända restaurangen Nautilus.',
        headline: 'Fastigheter i Punta Prima | Modernt vid havet',
        metaDescription: 'Köp bostad i Punta Prima med svensk mäklare. Nyproduktion, strandpromenad och havsnära läge.',
        keywords: ['köpa bostad punta prima', 'nyproduktion punta prima', 'lägenhet havsutsikt', 'torrevieja syd'],
        coordinates: { lat: 37.9536, lng: -0.7108 },
        content: {
            intro: 'Punta Prima markerar gränsen mellan Torrevieja och Orihuela Costa. Området har genomgått en enorm förvandling och är idag känt för sina lyxiga nyproduktionsprojekt precis vid havet, sin vackra strandpromenad och ikoniska restaurangen Nautilus som svävar över vågorna.',
            lifestyle: 'Bekvämt kustliv. Här bor du ofta i moderna komplex med spa och gym, med havet som granne. Blandad publik av semesterfirare och åretruntboende. Promenadvänligt.',
            climate: 'Direkt havsläge ger svalkande bris. Mildaste vintrarna i området.',
            attractions: 'Restaurang Nautilus, strandpromenaden, Punta Prima-stranden (hiss finns), kommersiella centret Punta Marina.',
            transport: 'Mycket bra bussförbindelser till Torrevieja centrum. 40 min till Alicante flygplats.',
            propertyMarket: 'Fokus på modern nyproduktion. 2-sovrums lägenheter i Panorama Mar/Posidonia-klass kostar €300 000-€600 000. Äldre inlandsobjekt billigare.',
            buyingTips: 'Sjösidan (söder om N-332) är dyrast och mest eftertraktad. Norra sidan mer prisvärd men längre till havet.'
        },
        highlights: [
            { icon: 'home', title: 'Nyproduktion', description: 'Moderna komplex' },
            { icon: 'coffee', title: 'Nautilus', description: 'Ikonisk restaurang' },
            { icon: 'waves', title: 'Havsnära', description: 'Första linjen' },
            { icon: 'sun', title: 'Promenad', description: 'Vinderlig strandpromenad' }
        ],
        relatedAreas: ['rocio-del-mar', 'torrevieja', 'playa-flamenca', 'los-altos'],
        galleryImages: []
    },
    {
        slug: 'gran-alacant',
        name: 'Gran Alacant',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 230,
        priceRange: { min: 145000, max: 750000 },
        avgPrice: 260000,
        image: '/images/areas/gran-alacant.png',
        description: 'Nära flygplatsen med fantastiska Carabassí-stranden, sanddyner och storslagen havsutsikt från höjden.',
        headline: 'Fastigheter i Gran Alacant | Nära flygplats och strand',
        metaDescription: 'Köp bostad i Gran Alacant med svensk rådgivning. Havsutsikt, Carabassí-stranden och nära Alicante flygplats.',
        keywords: ['köpa bostad gran alacant', 'nära alicante flygplats', 'carabassi strand', 'santa pola'],
        coordinates: { lat: 38.2267, lng: -0.5267 },
        content: {
            intro: 'Gran Alacant är byggt på en udde ("Cabo de Santa Pola") vilket ger många bostäder en spektakulär havsutsikt. Känd för sin omedelbara närhet till flygplatsen (utan att störas av buller) och den fantastiska, orörda Carabassí-stranden med sina sanddyner.',
            lifestyle: 'Praktiskt och naturnära. Perfekt för pendlare eller frekventa resenärer. Mycket utomhusaktiviteter: skärmflygning, vandring i Clot de Galvany, och strandliv. Stor skandinavisk och brittisk koloni.',
            climate: 'Högt läge ger fläktande vindar. Mycket soligt.',
            attractions: 'Carabassí-stranden (blå flagg, inga byggnader), naturreservatet Clot de Galvany, fyren Faro de Santa Pola, köpcentrumet GA Centre.',
            transport: 'Oslagbart: 10 min till Alicante flygplats, 15 min till Alicante stad. Utmärkta bussar.',
            propertyMarket: 'Prisvärt. Många radhus ("urbanisations") med pool. Lägenheter från €145 000, parhus med utsikt från €250 000. Mycket populärt semesterboende.',
            buyingTips: 'Nedre delen (Novamar) är platt och nära strand. Övre delen har utsikt men kräver bil/buss till strand. "Monte y Mar" är största området.'
        },
        highlights: [
            { icon: 'plane', title: 'Flygplatsnära', description: '10 minuter bort' },
            { icon: 'waves', title: 'Carabassí', description: 'Naturskön strand' },
            { icon: 'eye', title: 'Utsikt', description: 'Panoramavyer' },
            { icon: 'tree', title: 'Natur', description: 'Clot de Galvany' }
        ],
        relatedAreas: ['santa-pola', 'arenales-del-sol', 'alicante', 'el-che'],
        galleryImages: []
    },
    {
        slug: 'pilar-de-la-horadada',
        name: 'Pilar de la Horadada',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 190,
        priceRange: { min: 160000, max: 850000 },
        avgPrice: 285000,
        image: '/images/areas/pilar-de-la-horadada.png',
        description: 'Costa Blancas sydligaste pärla – genuin spansk stad med vackra kustdelen Torre de la Horadada.',
        headline: 'Fastigheter i Pilar de la Horadada | Stad och kust',
        metaDescription: 'Köp bostad i Pilar de la Horadada med svensk mäklare. Genuin stad och kustdelen Torre de la Horadada.',
        keywords: ['köpa bostad pilar de la horadada', 'torre de la horadada', 'nyproduktion costa blanca syd', 'higuericas'],
        coordinates: { lat: 37.8667, lng: -0.7944 },
        content: {
            intro: 'Pilar de la Horadada är den sydligaste kommunen på Costa Blanca. Här får du det bästa av två världar: en levande, genuin spansk stad (Pilar) några kilometer inåt land, och den charmiga kustorten Torre de la Horadada med sina vakttorn och vackra torg vid havet.',
            lifestyle: 'Autentiskt och familjärt. I Pilar lever du spanskt vardagsliv med siesta och fiestor. I Torre är det mer semesterpuls längs strandpromenaden. Mycket populärt för cykling och vandring i den torrlagda flodbädden "Río Seco".',
            climate: 'Varmt och torrt. Gränsar till Murcia-regionen. Fantastiska kvällar vid havet.',
            attractions: 'Torre vigía (vakttornet), kyrkotorget i Torre med sina restauranger, stranden Higuericas (trendigast just nu), Río Seco vandringsled, Lo Romero Golf.',
            transport: 'Mitt emellan flygplatserna: 40 min till Murcia, 50 min till Alicante. Bil behövs.',
            propertyMarket: 'Hotspot för nyproduktion. Moderna villor och lägenheter byggs både i staden och vid kusten. Prisbild €200 000-€500 000 för nytt. Äldre spanska radhus i Pilar billigare.',
            buyingTips: 'Higuericas-området är dyrast och trendigast. Pilar centrum ger mest hus för pengarna och liv året runt. Mil Palmeras för ren strandfokus.'
        },
        highlights: [
            { icon: 'map-pin', title: 'Två centrum', description: 'Stad & Kust' },
            { icon: 'star', title: 'Trendigt', description: 'Modern nyproduktion' },
            { icon: 'sun', title: 'Higuericas', description: 'Populär strand' },
            { icon: 'bicycle', title: 'Aktivt', description: 'Vandring & Cykling' }
        ],
        relatedAreas: ['mil-palmeras', 'torre-de-la-horadada', 'lo-pagan', 'san-pedro-del-pinatar'],
        galleryImages: []
    }
];
