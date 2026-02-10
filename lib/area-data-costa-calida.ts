import { AreaDetail } from '@/types/property';

// Costa Cálida Areas (Murcia Region)
export const COSTA_CALIDA_AREAS: AreaDetail[] = [
    {
        slug: 'la-manga',
        name: 'La Manga del Mar Menor',
        region: 'costa-calida',
        province: 'Murcia',
        propertyCount: 260,
        priceRange: { min: 162000, max: 1720000 },
        avgPrice: 485000,
        image: '/images/areas/la-manga.png',
        description: 'Unik sandremsa mellan Medelhavet och Mar Menor-lagunen – Europas största saltvattenlagung.',
        headline: 'Fastigheter i La Manga | Mellan två hav',
        metaDescription: 'Köp bostad i La Manga med svensk rådgivning. Unikt läge mellan Medelhavet och Mar Menor.',
        keywords: ['köpa bostad la manga', 'la manga del mar menor', 'mar menor fastigheter', 'costa calida bostad'],
        coordinates: { lat: 37.6417, lng: -0.7250 },
        content: {
            intro: 'La Manga del Mar Menor är en unik 21 km lång sandremsa som skiljer Medelhavet från Mar Menor, Europas största saltvattenlagung. Med dubbla stränder, kristallklart vatten och 300+ soldagar per år är detta ett paradis för vattensportentusiaster och solsökare.',
            lifestyle: 'Livet i La Manga kretsar kring havet. På ena sidan har du det lugna, grunda Mar Menor (perfekt för familjer) och på andra det öppna Medelhavet. Sommaren exploderar populationen från 5 000 till över 300 000. Stark nordisk gemenskap i närområdet.',
            climate: 'Ett av Europas hälsosammaste klimat enligt WHO. 300+ soldagar, vintertemperaturer 18-20°C, sommartemperaturer 25-32°C. Mar Menor-lagunen värms upp till 33°C på sommaren – som ett naturligt spa.',
            attractions: 'La Manga Club (världsklassgolf), Mar Menor för segling och windsurfing, naturreservat, dykning i Medelhavet, nära Cartagenas romerska ruiner.',
            transport: 'Murcia-Corvera flygplats (RMU) 36 km, 30 minuter. Alicante flygplats 93 km, 50 minuter. Motorväg AP-7 för snabba resor längs kusten.',
            propertyMarket: 'Fastighetsmarknaden når rekordnivåer med €1 947/m² (11,9% ökning 2024). Lägenheter från €162 500, villor €780 000-€1 720 000. Murcia har 7,4% hyresavkastning – bäst i Spanien.',
            buyingTips: 'Km 3-6 är mest eftertraktat och dyrt. La Manga Club för golf och lyx. Norra La Manga/Los Nietos för budgetköp. Kontrollera att fastigheten har turistuthyrningslicens (VUT) om du vill hyra ut.'
        },
        highlights: [
            { icon: 'waves', title: 'Två hav', description: 'Medelhavet & Mar Menor' },
            { icon: 'sun', title: '300+ soldagar', description: 'WHO-rekommenderat klimat' },
            { icon: 'golf', title: 'La Manga Club', description: 'Världsklassgolf' },
            { icon: 'trending-up', title: '7,4% yield', description: 'Spaniens bästa avkastning' }
        ],
        relatedAreas: ['los-alcazares', 'mazarron', 'cartagena', 'san-javier'],
        galleryImages: []
    },
    {
        slug: 'mazarron',
        name: 'Mazarrón',
        region: 'costa-calida',
        province: 'Murcia',
        propertyCount: 145,
        priceRange: { min: 85000, max: 650000 },
        avgPrice: 195000,
        image: '/images/areas/mazarron.png',
        description: 'Orörd kustpärla med dramatiska klippor, kristallklart vatten och autentiskt spanskt liv.',
        headline: 'Fastigheter i Mazarrón | Orörd kust och vikar',
        metaDescription: 'Köp bostad i Mazarrón med svensk mäklare. Orörda stränder, klippor och prisvärt boende.',
        keywords: ['köpa bostad mazarron', 'mazarron fastigheter', 'costa calida prisvärt', 'puerto de mazarron'],
        coordinates: { lat: 37.5986, lng: -1.3144 },
        content: {
            intro: 'Mazarrón är Costa Cálidas bäst bevarade hemlighet. Med sina orörda stränder, dramatiska klippformationer och kristallklara vatten lockar området dykare, naturälskare och köpare som söker äkta Spanien utan masstourismens avigsidor.',
            lifestyle: 'Lugnt och autentiskt spanskt liv. Fiskare som landar dagens fångst, lokala tapasbarer och en växande men diskret internationell gemenskap. Puerto de Mazarrón är livligare centrum, Mazarrón by mer traditionell.',
            climate: 'Typiskt Costa Cálida-klimat med 315+ soldagar, milt året runt. Somrar 28-34°C, vintrar 12-18°C. Låg luftfuktighet och frisk havsbris.',
            attractions: 'Över 35 km strand, dramatiska klippvikar, dykning vid skeppsvrak och undervattensgrottor, gruvhistoria, nära Cartagena och Sierra Espuña naturpark.',
            transport: 'Murcia-Corvera flygplats 55 km, Alicante flygplats 110 km. Bil nödvändig för vardagslivet. Bra motorvägsanslutning via RM-3.',
            propertyMarket: 'Prisvärt alternativ till övriga Costa Cálida. Lägenheter från €85 000, townhouses från €150 000, villor med havsutsikt från €280 000. Utvecklingsområde med potential.',
            buyingTips: 'Puerto de Mazarrón för service och marina, Bolnuevo för unika erosionsformationer, Isla Plana för lugn. Kontrollera vattenförsörjning i inlandsområden.'
        },
        highlights: [
            { icon: 'anchor', title: 'Dykparadis', description: 'Skeppsvrak och grottor' },
            { icon: 'euro', title: 'Prisvärt', description: 'Låga fastighetspriser' },
            { icon: 'waves', title: '35 km strand', description: 'Orörda vikar' },
            { icon: 'heart', title: 'Autentiskt', description: 'Genuint spanskt' }
        ],
        relatedAreas: ['cartagena', 'aguilas', 'la-manga', 'lorca'],
        galleryImages: []
    },
    {
        slug: 'los-alcazares',
        name: 'Los Alcázares',
        region: 'costa-calida',
        province: 'Murcia',
        propertyCount: 175,
        priceRange: { min: 95000, max: 450000 },
        avgPrice: 185000,
        image: '/images/areas/los-alcazares.png',
        description: 'Familjevänlig badort vid Mar Menor med kilometerlånga stränder och stark internationell gemenskap.',
        headline: 'Fastigheter i Los Alcázares | Mar Menor',
        metaDescription: 'Köp bostad i Los Alcázares med svensk rådgivning. Familjevänliga stränder vid Mar Menor.',
        keywords: ['köpa bostad los alcazares', 'los alcazares mar menor', 'familj costa calida', 'grunda stränder spanien'],
        coordinates: { lat: 37.7433, lng: -0.8556 },
        content: {
            intro: 'Los Alcázares ligger vid Mar Menors grunda, trygga vatten och är perfekt för barnfamiljer. Med sin 7 km långa strandpromenad, internationella gemenskap och alla bekvämligheter är detta ett av Costa Cálidas populäraste områden.',
            lifestyle: 'Familjeorienterat liv med strand, sport och gemenskap. Mar Menor (max 7m djupt) är som en naturlig barnpool. Stark windsurfingkultur, aktiv pensionärsgemenskap, nordiska butiker och restauranger.',
            climate: 'Mikroklimat skapad av Mar Menor ger milda temperaturer året runt. Vatten 15-30°C. Salthalten och mineralerna anses hälsosamma – området marknadsförs som "hälsans kust".',
            attractions: 'Mar Menor vattensporter (windsurf, kite, segling), Club Náutico Mar Menor, promenader, söndagsmarknad, nära La Manga och golfbanor.',
            transport: 'Murcia-Corvera flygplats 25 km, Alicante flygplats 75 km. Goda bussförbindelser. Bil underlättar men inte nödvändigt i centrum.',
            propertyMarket: 'Bra värde nära Mar Menor. Lägenheter från €95 000, townhouses från €145 000, villor från €220 000. Populärt bland skandinaver – enkel vidareförsäljning.',
            buyingTips: 'Strandfront dyrare men bäst hyrespotential. Centro för bekvämlighet. Kontrollera eventuell översvämningshistorik – DANA-händelser har drabbat området.'
        },
        highlights: [
            { icon: 'baby', title: 'Familjevänligt', description: 'Grunda, trygga vatten' },
            { icon: 'wind', title: 'Windsurfing', description: 'Internationella tävlingar' },
            { icon: 'heart', title: 'Hälsosamt', description: 'Mineralrikt havsvatten' },
            { icon: 'users', title: 'Gemenskap', description: 'Stark nordisk närvaro' }
        ],
        relatedAreas: ['la-manga', 'san-javier', 'torre-pacheco', 'cartagena'],
        galleryImages: []
    }
];
