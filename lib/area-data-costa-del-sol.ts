import { AreaDetail } from '@/types/property';

// Costa del Sol Areas (first 12)
export const COSTA_DEL_SOL_AREAS: AreaDetail[] = [
    {
        slug: 'marbella',
        name: 'Marbella',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 520,
        priceRange: { min: 250000, max: 15000000 },
        avgPrice: 895000,
        image: '/images/areas/marbella.png',
        description: 'Glamour och lyx vid Medelhavets mest exklusiva kuststräcka.',
        headline: 'Fastigheter i Marbella | Lyx, golf och strand',
        metaDescription: 'Köp bostad i Marbella med svensk mäklare. Exklusiva villor, golf och strandklubbar på Costa del Sols mest eftertraktade adress.',
        keywords: ['fastigheter marbella', 'köpa bostad marbella', 'marbella lägenheter', 'marbella villor'],
        coordinates: { lat: 36.5097, lng: -4.8857 },
        content: {
            intro: 'Marbella är synonymt med lyx, glamour och exklusivitet. Belägen vid foten av Sierra Blanca-bergen erbjuder staden en unik kombination av strand, golf och internationell jet-set-livsstil som lockar världens elit.',
            lifestyle: 'Lyx är normen i Marbella. Strandklubbar som Nikki Beach, exklusiva restauranger, designerbutiker på Golden Mile och ett socialt liv som aldrig sover. Internationell skola och stark skandinavisk gemenskap.',
            climate: 'Perfekt mikroklimat skyddat av bergen. 320+ soldagar, milda vintrar och varma somrar. Sällan extremt.',
            attractions: 'Puerto Banús marina, Gamla stan med apelsinträd, Golden Mile, 15+ golfbanor inom 20 min, beach clubs, Michelin-restauranger.',
            transport: 'Málaga flygplats 45 min. Lyxbilar till uthyrning överallt. Helikoptertransfer till flygplatsen.',
            propertyMarket: 'En av Europas hetaste lyxmarknader. Lägenheter från 300 000 €, townhouses från 500 000 €, villor från 1 000 000 €, lyxvillor på Golden Mile 3-15 miljoner €.',
            buyingTips: 'Golden Mile för prestige, Nueva Andalucía för golf och familj, Gamla stan för charm. Anlita alltid erfaren advokat – marknaden har många fallgropar.'
        },
        highlights: [
            { icon: 'gem', title: 'Ultra lyx', description: 'Europas mest exklusiva' },
            { icon: 'anchor', title: 'Puerto Banús', description: 'Ikonisk marina' },
            { icon: 'golf', title: '15+ golfbanor', description: 'Golf Valley' },
            { icon: 'star', title: 'Jet-set', description: 'Internationell elit' }
        ],
        relatedAreas: ['nueva-andalucia', 'puerto-banus', 'san-pedro', 'benahavis', 'estepona'],
        galleryImages: []
    },
    {
        slug: 'malaga',
        name: 'Málaga',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 380,
        priceRange: { min: 150000, max: 2500000 },
        avgPrice: 345000,
        image: '/images/areas/malaga.png',
        description: 'Kulturell huvudstad med Picasso-arv, fantastisk gastronomi och urban charm.',
        headline: 'Fastigheter i Málaga | Kultur, stad och strand',
        metaDescription: 'Köp bostad i Málaga med svensk rådgivning. Stadsliv, gastronomi och närhet till strand. Se lägenheter och villor till salu.',
        keywords: ['fastigheter málaga', 'köpa bostad málaga', 'málaga lägenheter', 'málaga villor'],
        coordinates: { lat: 36.7213, lng: -4.4214 },
        content: {
            intro: 'Málaga har gått från industristad till en av Europas mest eftertraktade destinationer. Picassos födelsestad erbjuder världsklassmuseer, fantastisk gastronomi och ett puls som få andra spanska städer kan matcha.',
            lifestyle: 'Urban kosmopolitisk livsstil. Museer, tapasbarer, flamenco och strandliv. Stark internationell närvaro med digitala nomader och entreprenörer. Málaga Tech Park växer snabbt.',
            climate: 'Milt året om med behagliga vintrar och varma somrar. Havsbrisen svalkar och bergen skyddar.',
            attractions: 'Picasso-museet, Carmen Thyssen-museet, Alcazaba, hamnen med pop-up museum, stränderna, fantastisk mat.',
            transport: 'Málaga-Costa del Sol flygplats (internationellt nav) 15 min. Höghastighetståg AVE till Madrid (2.5h). Utmärkt kollektivtrafik.',
            propertyMarket: 'Starkt stigande priser i centrum. Lägenheter i gamla stan från 200 000 €, moderna lägenheter från 250 000 €, penthouses från 500 000 €.',
            buyingTips: 'Centro Histórico för charm och hyresintäkt, Malagueta för strand och status, Pedregalejo för lokal atmosfär. Undvik turistfällor vid flygplatsen.'
        },
        highlights: [
            { icon: 'palette', title: 'Picassos stad', description: 'Världsklassmuseer' },
            { icon: 'plane', title: 'Flygplatsnära', description: 'Internationellt nav' },
            { icon: 'utensils', title: 'Gastronomi', description: 'Tapaskultur' },
            { icon: 'trending-up', title: 'Tech hub', description: 'Digital nomader' }
        ],
        relatedAreas: ['torremolinos', 'rincon-de-la-victoria', 'benalmadena', 'nerja'],
        galleryImages: []
    },
    {
        slug: 'estepona',
        name: 'Estepona',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 385,
        priceRange: { min: 180000, max: 5000000 },
        avgPrice: 485000,
        image: '/images/areas/estepona.png',
        description: 'Costa del Sols trädgårdsstad – tradition möter modern lyx.',
        headline: 'Fastigheter i Estepona | Charmigt centrum & nya projekt',
        metaDescription: 'Köp bostad i Estepona med svensk mäklare. Blommande gamla stan, strand och moderna projekt. Prisvärt alternativ till Marbella.',
        keywords: ['fastigheter estepona', 'köpa bostad estepona', 'estepona lägenheter', 'estepona villor'],
        coordinates: { lat: 36.4277, lng: -5.1458 },
        content: {
            intro: 'Estepona har förvandlats till "Costa del Sols trädgårdsstad" med ett vackert renoverat centrum fyllt av blommor och muralmålningar. Staden erbjuder charm och kvalitet till mer rimliga priser än grannen Marbella.',
            lifestyle: 'Avslappnat men sofistikerat. Vackra brunnar och blomsterprakt på varje gata. Nya lyxiga marinan. Autentiskt spanskt men med alla internationella bekvämligheter.',
            climate: 'Typiskt Costa del Sol-klimat, skyddat av bergen i norr. Behagligt året runt.',
            attractions: 'Blomstrande gamla stan med 50+ väggmålningar, nya marinan, orchidémuseet, golfbanor, nära till Gibraltar.',
            transport: 'Málaga flygplats 70 min, Gibraltar flygplats 45 min. Bil nödvändigt men bra parkeringsmöjligheter.',
            propertyMarket: 'Bästa värdet på västra Costa del Sol. Lägenheter från 200 000 €, townhouses från 300 000 €, villor från 450 000 €, strandnära lyx från 800 000 €.',
            buyingTips: 'New Golden Mile öster om centrum för moderna projekt. Gamla stan för charm. Kontrollera utvecklingsplaner – området växer snabbt.'
        },
        highlights: [
            { icon: 'flower', title: 'Trädgårdsstad', description: 'Blommor överallt' },
            { icon: 'palette', title: 'Street art', description: '50+ väggmålningar' },
            { icon: 'anchor', title: 'Marina', description: 'Ny lyxhamn' },
            { icon: 'euro', title: 'Bra värde', description: 'Alternativ till Marbella' }
        ],
        relatedAreas: ['marbella', 'benahavis', 'manilva', 'casares'],
        galleryImages: []
    },
    {
        slug: 'fuengirola',
        name: 'Fuengirola',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 295,
        priceRange: { min: 120000, max: 1200000 },
        avgPrice: 265000,
        image: '/images/areas/fuengirola.png',
        description: 'Familjevänlig kuststad med 8 km strand och alla bekvämligheter.',
        headline: 'Fastigheter i Fuengirola | Svenskfavorit på Solkusten',
        metaDescription: 'Köp bostad i Fuengirola med svensk mäklare. 8 km strand, familjevänligt och stark svensk gemenskap. Se aktuella objekt.',
        keywords: ['fastigheter fuengirola', 'köpa bostad fuengirola', 'fuengirola lägenheter', 'fuengirola villor'],
        coordinates: { lat: 36.5439, lng: -4.6249 },
        content: {
            intro: 'Fuengirola är Costa del Sols mest familjevänliga stad med sin 8 km långa strandpromenad, djurpark, vattenpark och en väletablerad skandinavisk gemenskap. Allt finns på gångavstånd.',
            lifestyle: 'Perfekt för familjer med barn. Tryggt, bekvämt och med allt inom räckhåll. Stark svensk och finsk gemenskap med egna föreningar och evenemang.',
            climate: 'Typiskt behagligt Costa del Sol-klimat. Varm sommar, mild vinter, sällan regn.',
            attractions: 'Bioparc Fuengirola, 8 km strandpromenad, Castillo Sohail, tisdagsmarknaden (en av Spaniens största), Mijas pueblo.',
            transport: 'Málaga flygplats 25 min. Pendeltåg Cercanías till Málaga och längs kusten. Enkel vardag utan bil.',
            propertyMarket: 'Brett utbud för alla budgetar. Studiolägenheter från 100 000 €, lägenheter från 150 000 €, townhouses från 250 000 €, villor från 400 000 €.',
            buyingTips: 'Los Boliches för strandnärhet, Torreblanca för lugn, centrum för service. Pendeltågsnära är populärt. Undvik högst upp på berget utan bil.'
        },
        highlights: [
            { icon: 'baby', title: 'Familjevänligt', description: 'Tryggt och bekvämt' },
            { icon: 'beach', title: '8 km strand', description: 'Promenad hela vägen' },
            { icon: 'train', title: 'Pendeltåg', description: 'Till Málaga' },
            { icon: 'users', title: 'Svenskar', description: 'Stark gemenskap' }
        ],
        relatedAreas: ['mijas-costa', 'benalmadena', 'mijas', 'torremolinos'],
        galleryImages: []
    },
    {
        slug: 'benalmadena',
        name: 'Benalmádena',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 265,
        priceRange: { min: 130000, max: 1500000 },
        avgPrice: 295000,
        image: '/images/areas/benalmadena.png',
        description: 'Tre byar i en – strand, by och högsta linbanan i Spanien.',
        headline: 'Fastigheter i Benalmádena | Marina, by och strand',
        metaDescription: 'Köp bostad i Benalmádena med svensk rådgivning. Puerto Marina, bykänsla och strandliv. Se lägenheter och villor till salu.',
        keywords: ['fastigheter benalmadena', 'köpa bostad benalmadena', 'benalmadena lägenheter', 'benalmadena villor'],
        coordinates: { lat: 36.5988, lng: -4.5168 },
        content: {
            intro: 'Benalmádena är tre destinationer i en: sol och bad vid Costa, traditionellt vitkalkat Pueblo i bergen, och spektakulära utsikter från Arroyo de la Miel. Något för alla smaker och budgetar.',
            lifestyle: 'Varierat – från beach party vid marinan till lugnt byliv uppe i Pueblo. Familjeattraktioner, nattliv och kulturaktiviteter. Stor skandinavisk och brittisk gemenskap.',
            climate: 'Costa del Sol-standard med extra variation på höjden. Pueblo är svalare, Costa är varmare.',
            attractions: 'puerto Marina (prisbelönt), Tivoli World nöjespark, linbanan till Calamorro (770m), Sea Life akvarium, buddhisttempel, Selwo Marina.',
            transport: 'Málaga flygplats 20 min. Pendeltåg Cercanías. Linbana mellan olika nivåer.',
            propertyMarket: 'Varierande priser beroende på område. Lägenheter vid Costa från 150 000 €, Pueblo från 180 000 €, villor från 350 000 €, lyxvillor med utsikt från 700 000 €.',
            buyingTips: 'Costa för strand och uthyrning, Pueblo för charm och lugn, Arroyo de la Miel för praktiskt vardagsliv. Kontrollera parkering i Pueblo – trångt.'
        },
        highlights: [
            { icon: 'layers', title: 'Tre nivåer', description: 'Costa, Pueblo, Arroyo' },
            { icon: 'cable-car', title: 'Linbana', description: 'Spektakulär utsikt' },
            { icon: 'anchor', title: 'Puerto Marina', description: 'Prisbelönt marina' },
            { icon: 'ferris-wheel', title: 'Nöjespark', description: 'Tivoli World' }
        ],
        relatedAreas: ['torremolinos', 'fuengirola', 'mijas', 'malaga'],
        galleryImages: []
    },
    {
        slug: 'mijas',
        name: 'Mijas Pueblo',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 145,
        priceRange: { min: 180000, max: 1200000 },
        avgPrice: 345000,
        image: '/images/areas/mijas.png',
        description: 'Andalusiens vitaste by – tradition och charm på bergssluttningen.',
        headline: 'Fastigheter i Mijas | Vit by och kustnära liv',
        metaDescription: 'Köp bostad i Mijas Pueblo med svensk mäklare. Vitkalkade hus, utsikt och andalusisk charm. Se aktuella objekt.',
        keywords: ['fastigheter mijas', 'köpa bostad mijas', 'mijas lägenheter', 'mijas villor'],
        coordinates: { lat: 36.5959, lng: -4.6367 },
        content: {
            intro: 'Mijas Pueblo är den klassiska andalusiska bergsbyns inkarnation med sina vitkallade hus, blommande balkonger och åsnor som transportmedel. Beläget 428 meter över havet med spektakulär utsikt över kusten.',
            lifestyle: 'Traditionellt men bekvämt. Liten internationell gemenskap som uppskattar lugn och autenticitet. Konstnärer och kulturintresserade trivs här. 15 min till stranden med bil.',
            climate: 'Svalare än kusten tack vare höjden. Friskare luft. Vintrarna kan vara kyliga på kvällarna.',
            attractions: 'La Ermita de la Virgen de la Peña (charmig grotta-kyrka), åsnor-taxi, konstgallerier, veckomarknad, minigolfbana, fantastiska restauranger med utsikt.',
            transport: 'Málaga flygplats 30 min. Bil nödvändigt. Parkering kan vara utmanande i centrum.',
            propertyMarket: 'Charmiga men ofta äldre fastigheter. Lägenheter från 180 000 €, townhouses från 250 000 €, traditionella hus från 350 000 €, villor med utsikt från 500 000 €.',
            buyingTips: 'Renovering ofta nödvändig – budgetera för detta. Kontrollera tillgänglighet för äldre. Vissa gator är för smala för bilkörning. Pool ovanligt i centrum.'
        },
        highlights: [
            { icon: 'home', title: 'Vitkalkat', description: 'Klassisk andalusisk' },
            { icon: 'eye', title: 'Utsikt', description: '428m över havet' },
            { icon: 'heart', title: 'Åsnor', description: 'Charmigt transport' },
            { icon: 'palette', title: 'Konstbyar', description: 'Gallerier och ateljéer' }
        ],
        relatedAreas: ['mijas-costa', 'fuengirola', 'benalmadena', 'alhaurin-el-grande'],
        galleryImages: []
    },
    {
        slug: 'nerja',
        name: 'Nerja',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 195,
        priceRange: { min: 150000, max: 1800000 },
        avgPrice: 385000,
        image: '/images/areas/nerja.png',
        description: 'Balcón de Europa – spektakulär utsiktsplats och genuint spanskt fiske by.',
        headline: 'Fastigheter i Nerja | Balcón de Europa och vikar',
        metaDescription: 'Köp bostad i Nerja med svensk rådgivning. Balcón de Europa, grottor och vikar. Se lägenheter och villor till salu.',
        keywords: ['fastigheter nerja', 'köpa bostad nerja', 'nerja lägenheter', 'nerja villor'],
        coordinates: { lat: 36.7449, lng: -3.8779 },
        content: {
            intro: 'Nerja är östra Costa del Sols juvel med sin berömda Balcón de Europa-terrass, spektakulära grottor och centrum som behållit sin andalusiska charm. Här möts dramatisk natur och autentiskt spanskt liv.',
            lifestyle: 'Mer avslappnat och genuint spanskt än västra Costa del Sol. Stark internationell gemenskap men utan masstourismens avigsidor. Perfekt för den som söker kvalitet och lugn.',
            climate: 'Mikroklimat med svalare somrar än västerut. Sierra de Almijara ger dramatisk bakgrund och skydd.',
            attractions: 'Balcón de Europa utsiktsplats, Cueva de Nerja (förhistoriska grottor med konserter), naturparken Sierra de Tejeda, kristallklara stränder i vikar.',
            transport: 'Málaga flygplats 65 min. Buss till Málaga. Bil rekommenderas för att utforska området.',
            propertyMarket: 'Stabil marknad med god värdeutveckling. Lägenheter från 170 000 €, townhouses från 280 000 €, villor från 400 000 €, lyxvillor från 800 000 €.',
            buyingTips: 'Carabeo för exklusivt och utsikt, Burriana för strand, centrum för bekvämlighet. Undvik turisttäta området kring Balcón under högsäsong.'
        },
        highlights: [
            { icon: 'eye', title: 'Balcón de Europa', description: 'Ikonisk utsiktsplats' },
            { icon: 'cave', title: 'Grottorna', description: 'Förhistoriskt under' },
            { icon: 'mountain', title: 'Sierra de Almijara', description: 'Dramatisk natur' },
            { icon: 'heart', title: 'Genuint', description: 'Äkta Andalusien' }
        ],
        relatedAreas: ['torrox', 'frigiliana', 'malaga', 'velez-malaga'],
        galleryImages: []
    },
    {
        slug: 'torremolinos',
        name: 'Torremolinos',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 215,
        priceRange: { min: 110000, max: 800000 },
        avgPrice: 225000,
        image: '/images/areas/torremolinos.png',
        description: 'Klassisk turistort med La Carihuela-stranden och prisvärt boende.',
        headline: 'Fastigheter i Torremolinos | Prisvärt nära flygplats',
        metaDescription: 'Köp bostad i Torremolinos med svensk mäklare. Strandliv, La Carihuela och nära Málaga flygplats. Se aktuella objekt.',
        keywords: ['fastigheter torremolinos', 'köpa bostad torremolinos', 'torremolinos lägenheter', 'torremolinos villor'],
        coordinates: { lat: 36.6242, lng: -4.4996 },
        content: {
            intro: 'Torremolinos var Costa del Sols första turistort och har återuppfunnit sig själv. La Carihuela-stranden med sina chiringuitos och fiskrestauranger är legendarisk. Prisvärt och bekvämt nära Málagas flygplats.',
            lifestyle: 'Internationellt och tolerant – staden har stark HBTQ+-vänlig profil. Levande nattliv, fiskrestauranger och strandkultur. Blandning av turister och fast boende.',
            climate: 'Standard Costa del Sol, mycket nära Málaga. Milt och behagligt året runt.',
            attractions: 'La Carihuela strand och promenad, Crocodile Park, Aqualand vattenpark, nära Málagas kulturutbud, shopping i Málaga Plaza.',
            transport: 'Málaga flygplats 10 min! Pendeltåg Cercanías. Bus och taxi lättillängligt. Perfekt för weekend-pendlare.',
            propertyMarket: 'Prisvärt nära flygplatsen. Studiolägenheter från 80 000 €, lägenheter från 130 000 €, townhouses från 220 000 €, villor från 350 000 €.',
            buyingTips: 'La Carihuela för strand och charm, centrum för service, Montemar för lugn. Kontrollera bullernivå nära nattklubbar. Hyresmarknaden är stark.'
        },
        highlights: [
            { icon: 'plane', title: '10 min flygplats', description: 'Perfekt läge' },
            { icon: 'fish', title: 'La Carihuela', description: 'Fiskarkvarter' },
            { icon: 'heart', title: 'Inkluderande', description: 'HBTQ+-vänligt' },
            { icon: 'euro', title: 'Prisvärt', description: 'Budgetligt' }
        ],
        relatedAreas: ['benalmadena', 'malaga', 'fuengirola', 'alhaurin-de-la-torre'],
        galleryImages: []
    },
    {
        slug: 'benahavis',
        name: 'Benahavís',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 185,
        priceRange: { min: 350000, max: 8000000 },
        avgPrice: 785000,
        image: '/images/areas/benahavis.png',
        description: 'Gastronomins by – lyx i bergen med fantastiska restauranger.',
        headline: 'Fastigheter i Benahavís | Lyx, natur och gastronomi',
        metaDescription: 'Köp bostad i Benahavís med svensk rådgivning. Lyxvillor, natur och prisbelönta restauranger nära Marbella och Estepona.',
        keywords: ['köpa villa benahavis', 'benahavis lyx', 'golden triangle', 'gastronomi andalusien'],
        coordinates: { lat: 36.5271, lng: -5.0467 },
        content: {
            intro: 'Benahavís är ett av Andalusiens mest prestigefyllda områden, känt för sina lyxvillor, fantastiska natur och exceptionella restauranger. Del av "Golden Triangle" tillsammans med Marbella och Estepona.',
            lifestyle: 'Exklusivt och diskret. Stora tomter, impressive villor och en av Spaniens högsta koncentrationer av golfbanor. Mat är religion här.',
            climate: 'Bergsklimat – svalare än kusten, speciellt på kvällarna. Frisk luft och naturskön miljö.',
            attractions: '40+ restauranger i en liten by, världsklassgolf (Marbella Club Golf, La Zagaleta), vandring i Sierra de las Nieves, flodpooler.',
            transport: 'Málaga flygplats 55 min. Bil absolut nödvändigt. Helikopterplattor på vissa fastigheter.',
            propertyMarket: 'Premium-segment. Townhouses från 400 000 €, villor från 600 000 €, lyxvillor 1-3 miljoner, La Zagaleta från 3 miljoner €.',
            buyingTips: 'La Zagaleta för ultimat lyx, Los Flamingos för golf, El Madroñal för utsikt. Säkerhetsvaktade områden vanliga och uppskattade.'
        },
        highlights: [
            { icon: 'utensils', title: '40+ restauranger', description: 'Gastronomins by' },
            { icon: 'golf', title: 'Golfparadis', description: 'Flera mästerskapsbanor' },
            { icon: 'shield', title: 'Säkerhet', description: 'Gated communities' },
            { icon: 'tree', title: 'Natur', description: 'Sierra de las Nieves' }
        ],
        relatedAreas: ['marbella', 'estepona', 'nueva-andalucia', 'san-pedro'],
        galleryImages: []
    },
    {
        slug: 'mijas-costa',
        name: 'Mijas Costa',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 245,
        priceRange: { min: 160000, max: 1500000 },
        avgPrice: 335000,
        image: '/images/areas/mijas-costa.png',
        description: 'Kustzonen under Mijas med strand, golf och familjeboende.',
        headline: 'Fastigheter i Mijas Costa | Strand och golf',
        metaDescription: 'Köp bostad i Mijas Costa med svensk mäklare. La Cala de Mijas, Calahonda och Riviera del Sol med strand och golf.',
        keywords: ['köpa bostad mijas costa', 'la cala de mijas', 'calahonda', 'riviera del sol'],
        coordinates: { lat: 36.5167, lng: -4.7000 },
        content: {
            intro: 'Mijas Costa är kustzonen under bergsbyn Mijas och sträcker sig från Fuengirola till Marbella. Här finns populära områden som La Cala de Mijas, Calahonda och Riviera del Sol med strand, golf och familjevänligt boende.',
            lifestyle: 'Avslappnat familjeliv med strand och golf. Stark internationell gemenskap utan att vara lika turistigt som de större orterna. Bra skolor och service.',
            climate: 'Typiskt Costa del Sol med milt klimat året runt. Stränder och pooler kan användas större delen av året.',
            attractions: 'La Cala Golf, Miraflores Golf, stränder, söndagsmarknad i La Cala, nära till Fuengirola och Marbella.',
            transport: 'Málaga flygplats 35 min. Bil nödvändigt utanför La Cala centrum. Goda vägar längs kusten.',
            propertyMarket: 'Varierat utbud för medelklassen. Lägenheter från 180 000 €, townhouses från 280 000 €, villor från 400 000 €, frontline golf från 600 000 €.',
            buyingTips: 'La Cala för service och strand, Riviera del Sol för golf, El Faro för lugn. Kontrollera urbanisationens skick och avgifter.'
        },
        highlights: [
            { icon: 'golf', title: 'Golf', description: 'Flera banor' },
            { icon: 'beach', title: 'Stränder', description: 'Familjväänliga' },
            { icon: 'shopping-bag', title: 'La Cala', description: 'Mysigt centrum' },
            { icon: 'home', title: 'Urbanisationer', description: 'Ordnat boende' }
        ],
        relatedAreas: ['fuengirola', 'mijas', 'marbella', 'benalmadena'],
        galleryImages: []
    },
    {
        slug: 'sotogrande',
        name: 'Sotogrande',
        region: 'costa-del-sol',
        province: 'Cádiz',
        propertyCount: 125,
        priceRange: { min: 400000, max: 12000000 },
        avgPrice: 985000,
        image: '/images/areas/sotogrande.png',
        description: 'Polo, golf och extrem exklusivitet vid Costa del Sols gräns.',
        headline: 'Fastigheter i Sotogrande | Polo, golf och lyx',
        metaDescription: 'Köp bostad i Sotogrande med svensk rådgivning. Polo, golf och exklusiva villor i Costa del Sols mest exklusiva område.',
        keywords: ['köpa villa sotogrande', 'sotogrande lyx', 'polo spanien', 'golf sotogrande'],
        coordinates: { lat: 36.2833, lng: -5.2833 },
        content: {
            intro: 'Sotogrande är Costa del Sols ultimata lyxdestination, känd för världens största poloclub, championship golfbanor och en diskret men glamorös livsstil som lockar europeisk och arabisk elit.',
            lifestyle: 'Ultra-exklusivt och diskret. Polo-matcher, golf, segling och exklusiva beach clubs. Välkänd för kungligheter och kändisar som bor här.',
            climate: 'Milt året runt med atlantisk bris som mildrar sommarhettan. Något blåsigare än östra Costa del Sol.',
            attractions: 'Santa María Polo Club (världens ledande), Valderrama Golf (Ryder Cup-bana), marina med lyx-yachter, beach clubs, Gibraltar nära.',
            transport: 'Málaga flygplats 80 min, Gibraltar flygplats 25 min. Helikopterservice tillgänglig. Bil nödvändigt.',
            propertyMarket: 'Ultra-premium segment. Lägenheter från 500 000 €, townhouses från 700 000 €, villor 1-4 miljoner €, mega-villor 5-12 miljoner €.',
            buyingTips: 'La Reserva för nyproduktion och lyx, Kings & Queens för familj, Almenara för golf. Förvänta dig byråkrati – detta är Cádiz-provinsen.'
        },
        highlights: [
            { icon: 'horse', title: 'Polo', description: 'Världens största club' },
            { icon: 'golf', title: 'Valderrama', description: 'Ryder Cup-bana' },
            { icon: 'crown', title: 'Royalty', description: 'Kunglig närvaro' },
            { icon: 'anchor', title: 'Marina', description: 'Lyx-yachter' }
        ],
        relatedAreas: ['manilva', 'estepona', 'san-roque', 'gibraltar'],
        galleryImages: []
    }
];
