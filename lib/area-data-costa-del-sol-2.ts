import { AreaDetail } from '@/types/property';

// Remaining Costa del Sol Areas (8 more to complete 20)
export const COSTA_DEL_SOL_AREAS_2: AreaDetail[] = [
    {
        slug: 'manilva',
        name: 'Manilva',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 95,
        priceRange: { min: 130000, max: 800000 },
        avgPrice: 225000,
        image: '/images/areas/manilva.png',
        description: 'Costa del Sols bäst bevarade hemlighet – prisvärt vid Duquesa marina.',
        headline: 'Fastigheter i Manilva | Prisvärt på Solkusten',
        metaDescription: 'Köp bostad i Manilva med svensk rådgivning. Duquesa marina, stränder och golf i västra Costa del Sol.',
        keywords: ['köpa bostad manilva', 'duquesa marina', 'puerto de la duquesa', 'billigt costa del sol'],
        coordinates: { lat: 36.3808, lng: -5.2517 },
        content: {
            intro: 'Manilva är Costa del Sols bäst bevarade hemlighet. Med den charmiga Puerto de la Duquesa marina, långa stränder och betydligt lägre priser än grannarterna är detta perfekt för den budgetmedvetne köparen.',
            lifestyle: 'Avslappnat liv utan pretentioner. Stark brittisk gemenskap, vindruvsodling och genuint spanskt marknads- och festliv i byn.',
            climate: 'Typiskt Costa del Sol med milt klimat året runt. Nära Gibraltar som ger viss atlantisk påverkan.',
            attractions: 'Puerto de la Duquesa marina, vingårdar (druvcasorter), söndagsmarknad, nära Sotogrande och Gibraltar, vandring i bergen.',
            transport: 'Málaga flygplats 75 min, Gibraltar flygplats 30 min. Bil nödvändigt men utbyggnad sker.',
            propertyMarket: 'Bästa värdet på Costa del Sol. Lägenheter från 120 000 €, townhouses från 180 000 €, villor från 280 000 €.',
            buyingTips: 'Duquesa Port för bekvämlighet och hyres potentials, Castillo de la Duquesa för strand, San Luis de Sabinillas för spanskt liv. Området utvecklas – köp nu för framtida värdestegring.'
        },
        highlights: [
            { icon: 'euro', title: 'Bäst pris', description: 'Kostnadeffektivt' },
            { icon: 'anchor', title: 'Duquesa marina', description: 'Charmig hamn' },
            { icon: 'grape', title: 'Vindruvor', description: 'Lokala viner' },
            { icon: 'trending-up', title: 'Potential', description: 'Utvecklingsområde' }
        ],
        relatedAreas: ['estepona', 'sotogrande', 'casares', 'sabinillas'],
        galleryImages: []
    },
    {
        slug: 'nueva-andalucia',
        name: 'Nueva Andalucía',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 245,
        priceRange: { min: 350000, max: 8000000 },
        avgPrice: 695000,
        image: '/images/areas/nueva-andalucia.png',
        description: 'Golf Valley – Marbellas lummigaste och mest familjevänliga område.',
        headline: 'Fastigheter i Nueva Andalucía | Golf Valley',
        metaDescription: 'Köp bostad i Nueva Andalucía med svensk mäklare. Golfbanor, familjevänligt och nära Marbella.',
        keywords: ['köpa villa nueva andalucia', 'golf valley marbella', 'marbella familj', 'las brisas'],
        coordinates: { lat: 36.5000, lng: -4.9167 },
        content: {
            intro: 'Nueva Andalucía, känt som Golf Valley, är Marbellas gröna hjärta. Omgiven av världsklassgolfbanor erbjuder området lyxigt men avslappnat familjliv utan att vara lika påkostat som Golden Mile.',
            lifestyle: 'Internationellt familjeliv med fokus på golf och friluftsliv. Nära till Puerto Banús men lugnare och grönare. Europeisk och skandinavisk gemenskap.',
            climate: 'Marbellas mikroklimat – skyddat och behagligt. De gröna golfbanorna bevarar fukt och svalka.',
            attractions: 'Las Brisas Golf, Los Naranjos Golf, Aloha Golf, nära Puerto Banús, restauranger och barer i området.',
            transport: 'Málaga flygplats 50 min. Bil nödvändigt men väl utbyggt vägnät. Närhet till motorväg.',
            propertyMarket: 'Premium men väldiversifierat. Lägenheter från 350 000 €, townhouses från 500 000 €, villor från 800 000 €, lyxvillor från 2 miljoner €.',
            buyingTips: 'Golf frontline kostar mer men håller värdet. Centro Plaza-området mest centralt för service. Kontrollera utsikt – bergens silhuett är populär.'
        },
        highlights: [
            { icon: 'golf', title: 'Golf Valley', description: '5+ golfbanor' },
            { icon: 'tree', title: 'Grönt', description: 'Lummig miljö' },
            { icon: 'baby', title: 'Familjer', description: 'Barnvänligt' },
            { icon: 'store', title: 'Centro Plaza', description: 'Mysigt centrum' }
        ],
        relatedAreas: ['marbella', 'puerto-banus', 'san-pedro', 'benahavis'],
        galleryImages: []
    },
    {
        slug: 'puerto-banus',
        name: 'Puerto Banús',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 165,
        priceRange: { min: 400000, max: 10000000 },
        avgPrice: 895000,
        image: '/images/areas/puerto-banus.png',
        description: 'Glamourens epicentrum – superyachter, design och nattliv.',
        headline: 'Fastigheter i Puerto Banús | Marina och lyx',
        metaDescription: 'Köp bostad i Puerto Banús med svensk rådgivning. Lyxig marina, shopping och strandliv.',
        keywords: ['köpa bostad puerto banus', 'puerto banus lyx', 'marina marbella', 'superyachter'],
        coordinates: { lat: 36.4833, lng: -4.9500 },
        content: {
            intro: 'Puerto Banús är synonymt med glamour. Denna legendariska marina lockar superyachter, sporttbilar och internationell jet-set. Designerbutiker, exklusiva restauranger och nattliv i världsklass.',
            lifestyle: 'See-and-be-seen. Champagne vid marinan, shopping på Louis Vuitton, nattliv på exklusiva klubbar. Inte för alla, men perfekt för den som söker det bästa.',
            climate: 'Marbellas skyddade mikroklimat. Perfekt för helårsboende eller sommarparadis.',
            attractions: 'Marinan med superyachter, designerbutiker (Gucci, Dior, Louis Vuitton), nattklubbar (Olivia Valère, Pangea), beach clubs, restauranger.',
            transport: 'Málaga flygplats 55 min. Bil eller taxi vanligast. Helikopterservice tillgänglig.',
            propertyMarket: 'Ultra-premium. Lägenheter från 500 000 €, penthouses från 1 miljon €, villor från 2 miljoner €. Frontline marina exceptionellt.',
            buyingTips: 'Marina-vy är allt – betala premium för det. Nya byggnader väster om hamnen erbjuder bättre värde. Kontrollera högsäsongbuller nattetid.'
        },
        highlights: [
            { icon: 'yacht', title: 'Superyachter', description: 'Världsklass marina' },
            { icon: 'shopping-bag', title: 'Designer', description: 'Lyxbutiker' },
            { icon: 'music', title: 'Nattliv', description: 'Exklusiva klubbar' },
            { icon: 'star', title: 'Kändisar', description: 'Jet-set livsstil' }
        ],
        relatedAreas: ['marbella', 'nueva-andalucia', 'san-pedro', 'golden-mile'],
        galleryImages: []
    },
    {
        slug: 'san-pedro',
        name: 'San Pedro Alcántara',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 195,
        priceRange: { min: 200000, max: 2500000 },
        avgPrice: 425000,
        image: '/images/areas/san-pedro.png',
        description: 'Marbellas lugna granne – autentiskt spanskt med moder bekvämligheter.',
        headline: 'Fastigheter i San Pedro | Marbellas lugnare sida',
        metaDescription: 'Köp bostad i San Pedro Alcántara med svensk mäklare. Strandpromenad och familjevänligt nära Marbella.',
        keywords: ['köpa bostad san pedro', 'san pedro alcantara', 'marbella alternativ', 'guadalmina'],
        coordinates: { lat: 36.4717, lng: -5.0167 },
        content: {
            intro: 'San Pedro Alcántara är Marbellas lugnade storasyster. Med sin nyrenoverade boulevard, genuina spanska centrum och fantastiska stränder erbjuds livskvalitet utan Marbellas prislapp.',
            lifestyle: 'Mer jordnära än Marbella men med alla bekvämligheter. Spansk atmosfär med internationell touch. Bra skolor och familjevänlig miljö.',
            climate: 'Marbellas mikroklimat – behagligt året runt med skydd från Sierra Blanca.',
            attractions: 'Ny havspromenad, söndagsmarknad, Guadalmina golf, Las Salinas strand, nära Puerto Banús och Marbella centrum.',
            transport: 'Málaga flygplats 55 min. Bil praktiskt men många promenadvänliga områden. Buss till Marbella.',
            propertyMarket: 'Bättre värde än Marbella centrum. Lägenheter från 220 000 €, townhouses från 350 000 €, villor från 550 000 €, lyxvillor från 1 miljon €.',
            buyingTips: 'Centro Historico för charm, strandnära för uthyrning, Guadalmina för golf. Kontrollera planering – områden utvecklas snabbt.'
        },
        highlights: [
            { icon: 'map-pin', title: 'Ny promenad', description: 'Modern bouleverd' },
            { icon: 'heart', title: 'Spanskt', description: 'Genuint liv' },
            { icon: 'euro', title: 'Värde', description: 'Billigare än Marbella' },
            { icon: 'golf', title: 'Guadalmina', description: 'Golfklubb' }
        ],
        relatedAreas: ['marbella', 'benahavis', 'estepona', 'nueva-andalucia'],
        galleryImages: []
    },
    {
        slug: 'casares',
        name: 'Casares',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 85,
        priceRange: { min: 180000, max: 1500000 },
        avgPrice: 345000,
        image: '/images/areas/casares.png',
        description: 'Vit bergsby med filosofisk historia – lugn och panoramautsikt.',
        headline: 'Fastigheter i Casares | Vit by och utsikt',
        metaDescription: 'Köp bostad i Casares med svensk rådgivning. Pittoresk vit by med utsikt och nära kusten.',
        keywords: ['köpa bostad casares', 'vit by spanien', 'casares costa', 'pueblo blanco'],
        coordinates: { lat: 36.4333, lng: -5.2667 },
        content: {
            intro: 'Casares är en av Andalusiens mest pittoreska vita byar, känd som födelseorten för filosofen Blas Infante, "Andalusiens fader". Med sina vitkallade hus klamrade till bergssidan erbjuds spektakulär utsikt över kusten och Afrika.',
            lifestyle: 'Lugnt och traditionellt byliv med internationell färg. Perfekt för den som söker autenticitet och stillhet, men ändå vill ha kusten inom räckhåll.',
            climate: 'Bergsklimat – svalare somrar och svala vinterkvällar. Frisk luft och fantastiska stjärnhimmel.',
            attractions: 'Ruinslottet med utsikt, kyrkan, Blas Infante-museet, vandringleder, nära till Casares Costa och stränder.',
            transport: 'Málaga flygplats 70 min, Gibraltar flygplats 35 min. Bil absolut nödvändigt.',
            propertyMarket: 'Varierat – från billiga läenheter till lyxvillor med utsikt. Lägenheter från 150 000 €, townhouses från 220 000 €, villor från 400 000 €.',
            buyingTips: 'Pueblo för charm men opraktiskt, Casares Costa för strand, landsbygden för utrymme. Kontrollera vägar och tillgänglighet på vintern.'
        },
        highlights: [
            { icon: 'home', title: 'Pueblo Blanco', description: 'Klassisk vit by' },
            { icon: 'eye', title: 'Afrika-utsikt', description: 'Spektakulär panorama' },
            { icon: 'book', title: 'Historia', description: 'Blas Infantes födelseplats' },
            { icon: 'moon', title: 'Stillhet', description: 'Lugnt och fridfullt' }
        ],
        relatedAreas: ['manilva', 'estepona', 'gaucin', 'sotogrande'],
        galleryImages: []
    },
    {
        slug: 'torrox',
        name: 'Torrox',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 115,
        priceRange: { min: 120000, max: 750000 },
        avgPrice: 225000,
        image: '/images/areas/torrox.png',
        description: 'Europas bästa klimat – officiellt certifierat år efter år.',
        headline: 'Fastigheter i Torrox | Europas bästa klimat',
        metaDescription: 'Köp bostad i Torrox med svensk rådgivning. Strand och byliv i topprankat klimat.',
        keywords: ['köpa bostad torrox', 'torrox klimat', 'torrox costa', 'bästa klimat europa'],
        coordinates: { lat: 36.7567, lng: -3.9517 },
        content: {
            intro: 'Torrox marknadsför sig stolt som "Det bästa klimatet i Europa" – och har certifikaten för att bevisa det. Med sin vita by uppe på höjden och strandorten Torrox Costa nere vid havet erbjuds det bästa av två världar.',
            lifestyle: 'Avslappnat liv i sol året runt. Stark tysk gemenskap som uppskattar klimatet. Genuint spanskt med internationell touch. Billigare än västra Costa del Sol.',
            climate: 'Officiellt Europas bästa! 18°C snitttemperatur, 320+ soldagar, skyddad från nordliga vindar av bergen.',
            attractions: 'Vit by med utsikt, stränder vid Torrox Costa, fyrkantig fyr, romerska ruiner, nära Nerja och dess grottor.',
            transport: 'Málaga flygplats 55 min. Bil behövs för vardagslivet. Buss till Málaga och Nerga.',
            propertyMarket: 'Prisvärt östra kusten. Lägenheter från 130 000 €, townhouses från 200 000 €, villor från 320 000 €.',
            buyingTips: 'Torrox Costa för strand och bekvämlighet, Torrox Pueblo för charm och utsikt. Klimatet lockar vinterboende – bra hyrespotential.'
        },
        highlights: [
            { icon: 'sun', title: 'Bästa klimat', description: 'Officiellt certifierat' },
            { icon: 'thermometer', title: '18°C snitt', description: 'Året runt' },
            { icon: 'euro', title: 'Prisvärt', description: 'Budgetvänligt' },
            { icon: 'layers', title: 'Pueblo + Costa', description: 'Två områden' }
        ],
        relatedAreas: ['nerja', 'frigiliana', 'velez-malaga', 'almunecar'],
        galleryImages: []
    },
    {
        slug: 'rincon-de-la-victoria',
        name: 'Rincón de la Victoria',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 125,
        priceRange: { min: 140000, max: 900000 },
        avgPrice: 275000,
        image: '/images/areas/rincon-de-la-victoria.png',
        description: 'Málagas exklusiva förort – strand och bekvämlighet nära staden.',
        headline: 'Fastigheter i Rincón de la Victoria | Nära Málaga',
        metaDescription: 'Köp bostad i Rincón de la Victoria med svensk rådgivning. Stränder och pendlarläge nära Málaga.',
        keywords: ['köpa bostad rincon de la victoria', 'malaga förort', 'strand malaga', 'pendla malaga'],
        coordinates: { lat: 36.7167, lng: -4.2833 },
        content: {
            intro: 'Rincón de la Victoria är Málagas mest eftertraktade förort – strandliv och villakvarter bara 15 minuter från stadens centrum. Perfekt för den som vill ha strand utan att offra urban bekvämlighet.',
            lifestyle: 'Bekvämt suburban liv med strandtillgång. Populärt bland spanska familjer som pendlar till Málaga. Mindre internationellt men med växande expat-gemenskap.',
            climate: 'Málagas klimat – milt och behagligt. Skyddat läge i bukten ger stabila förhållanden.',
            attractions: 'Cueva del Tesoro (skattkammargrotta), stränder, strandpromensd, nära Málagas kultur. La Cala del Moral mysigt centrum.',
            transport: 'Málaga centrum 15 min, flygplats 25 min. Utmärkt kollektivtrafik med buss. Bil bekvämt men inte nödvändigt.',
            propertyMarket: 'Populärt bland spanskingar – priserna stiger. Lägenheter från 160 000 €, townhouses från 280 000 €, villor från 450 000 €.',
            buyingTips: 'La Cala för charm, Rincón centrum för service, Torre de Benagalbón för villor. Pendlarläge premieras – nära busshållplats eller motorväg.'
        },
        highlights: [
            { icon: 'train', title: 'Pendlarläge', description: '15 min till Málaga' },
            { icon: 'beach', title: 'Stränder', description: 'Familjevänliga vikar' },
            { icon: 'cave', title: 'Cueva del Tesoro', description: 'Unik havs grotta' },
            { icon: 'home', title: 'Villaområden', description: 'Suburban charm' }
        ],
        relatedAreas: ['malaga', 'velez-malaga', 'nerja', 'torremolinos'],
        galleryImages: []
    },
    {
        slug: 'velez-malaga',
        name: 'Vélez-Málaga',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 105,
        priceRange: { min: 100000, max: 650000 },
        avgPrice: 195000,
        image: '/images/areas/velez-malaga.png',
        description: 'Axarquías huvudstad – autentisk andalusisk stad med historia.',
        headline: 'Fastigheter i Vélez-Málaga | Andalusisk stad',
        metaDescription: 'Köp bostad i Vélez-Málaga med svensk rådgivning. Historia, kultur och nära kusten.',
        keywords: ['köpa bostad velez malaga', 'axarquia', 'torre del mar', 'costa del sol öst autentikt'],
        coordinates: { lat: 36.7800, lng: -4.1000 },
        content: {
            intro: 'Vélez-Málaga är Axarquías historiska huvudstad med moriskt arv, vackra kyrkor och autentiskt andalusiskt vardagsliv. Med Torre del Mar som sin kustaort erbjuds det bästa av två världar till lågt pris.',
            lifestyle: 'Genuint spanskt utan internationellt filter. Stark lokal kultur, traditionella fester, marknader och spansk gastronomi. Perfect för integration.',
            climate: 'Milt klimat, skyddat av bergen. Något svalare på vintern än kusten.',
            attractions: 'Morisk fästning, Palacio de Beniel, påskprocessioner (berömda), söndagsmarknad, nära Torre del Mar strand.',
            transport: 'Málaga flygplats 40 min. Bil rekommenderas för vardagen. Lokalbuss till Torre del Mar.',
            propertyMarket: 'Extremt prisvärt för kvaliteten. Lägenheter från 90 000 €, townhouses från 150 000 €, villor från 250 000 €.',
            buyingTips: 'Centro Histórico för charm (kan behöva renovering), Triana för bekvämlighet, landsbygden för rymd och utsikt. Torre del Mar för strand.'
        },
        highlights: [
            { icon: 'castle', title: 'Moriskt arv', description: 'Historisk stad' },
            { icon: 'euro', title: 'Låga priser', description: 'Mycket prisvärt' },
            { icon: 'flag', title: 'Semana Santa', description: 'Berömda påskfester' },
            { icon: 'heart', title: 'Autentiskt', description: 'Äkta Andalusien' }
        ],
        relatedAreas: ['torre-del-mar', 'nerja', 'torrox', 'rincon-de-la-victoria'],
        galleryImages: []
    }
];
