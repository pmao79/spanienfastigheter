import { AreaDetail } from '@/types/property';

// Remaining Costa Blanca Areas (8 more to complete 20)
export const COSTA_BLANCA_AREAS_2: AreaDetail[] = [
    {
        slug: 'santa-pola',
        name: 'Santa Pola',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 125,
        priceRange: { min: 95000, max: 650000 },
        avgPrice: 185000,
        image: '/images/areas/santa-pola.png',
        description: 'Autentisk spansk hamnstad med salt, strand och genuint fiskarliv.',
        headline: 'Köp bostad i Santa Pola – Äkta spanskt kustliv',
        metaDescription: 'Santa Pola – genuin spansk fiskestad med fantastiska stränder och saltsjöar. Prisvärt boende nära Alicante flygplats. Upptäck våra fastigheter.',
        keywords: ['köpa bostad santa pola', 'santa pola strand', 'alicante fastigheter', 'äkta spanien'],
        coordinates: { lat: 38.1927, lng: -0.5545 },
        content: {
            intro: 'Santa Pola är en genuint spansk fiskestad som behållit sin karaktär trots turismen. Med sin aktiva fiskehamn, saltpannor med flamingor och kilometerlånga stränder erbjuder staden autentiskt spanskt kustliv bara 20 minuter från Alicante flygplats.',
            lifestyle: 'Santa Pola är mer spansk än skandinavisk – perfekt för den som vill integreras. Fiskauktioner på hamnen, tapas på torg och livet som rullar på i lugn takt. Växande internationell gemenskap men fortfarande genuint.',
            climate: 'Skyddat läge vid saltlagunerna ger ett unikt mikroklimat. Havsbrisen svalkar somrarna, vintrarna är milda. Saltpartiklarna i luften anses hälsosamma.',
            attractions: 'Saltsjöarna med flamingor (El Parque Natural de las Salinas), Isla de Tabarca (Spaniens enda bebodda medelhavö), dykning, segling, daglig fiskauktion.',
            transport: 'Alicante flygplats endast 15 min! Bussar till Alicante centrum. Bil underlättar men inte nödvändigt.',
            propertyMarket: 'Prisvärt köp nära flygplatsen. Lägenheter från 100 000 €, bungalows från 130 000 €, villor från 220 000 €. Bra hyrespotential tack vare flygplatsnärhet.',
            buyingTips: 'Gran Playa-området bäst för strand, centrum för bekvämlighet. Undvik område nära saltverk om du är känslig för dofter. Tabarca är charmigt men opraktiskt för permanent boende.'
        },
        highlights: [
            { icon: 'plane', title: 'Nära flygplats', description: '15 min till Alicante' },
            { icon: 'fish', title: 'Fiskehamn', description: 'Daglig fiskauktion' },
            { icon: 'bird', title: 'Flamingor', description: 'Naturreservat' },
            { icon: 'island', title: 'Tabarca', description: 'Unik ö-utflykt' }
        ],
        relatedAreas: ['alicante', 'el-campello', 'guardamar', 'torrevieja'],
        galleryImages: []
    },
    {
        slug: 'el-campello',
        name: 'El Campello',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 135,
        priceRange: { min: 130000, max: 900000 },
        avgPrice: 265000,
        image: '/images/areas/el-campello.png',
        description: 'Familjevänlig kustort mellan Alicante och Benidorm med fantastiska stränder.',
        headline: 'Köp bostad i El Campello – Familjeliv vid havet',
        metaDescription: 'El Campello erbjuder familjevänligt boende med fantastiska stränder nära Alicante. Bekvämt läge med spårvagn till stan. Hitta din bostad.',
        keywords: ['köpa bostad el campello', 'familj costa blanca', 'el campello strand', 'alicante bostad'],
        coordinates: { lat: 38.4271, lng: -0.3977 },
        content: {
            intro: 'El Campello är den perfekta förorten för barnfamiljer som vill ha strand, trygghet och bekvämlighet. Beläget mellan Alicante och Benidorm med utmärkt spårvägsförbindelse erbjuder staden det bästa av två världar.',
            lifestyle: 'Lugnt familjeliv med strandpromenader, lokala marknader och trygg miljö. Nära till Alicantes shopping och kultur utan storstadshets. Växande skandinavisk gemenskap.',
            climate: 'Typiskt Costa Blanca-klimat med över 300 soldagar. Sjöbrisen gör somrarna behagliga. Milda vintrar.',
            attractions: 'Muchavista-stranden (en av områdets bästa), Torre de la Illeta (iberiskt fornlämning), båtutflykter, vattensporter. Nära till terra Mítica och Benidorms nöjen.',
            transport: 'Alicante flygplats 25 min. TRAM-spårvagn till Alicante centrum och Benidorm. Utmärkt för pendling utan bil.',
            propertyMarket: 'Bra värde mellan dyra Alicante och turistiga Benidorm. Lägenheter från 140 000 €, townhouses från 200 000 €, villor från 350 000 €.',
            buyingTips: 'Muchavista bäst för strand, Coveta Fumá mer exklusivt. Spårvagnsnära fastigheter är populärast – enklare att sälja vidare.'
        },
        highlights: [
            { icon: 'train', title: 'Spårvagn', description: 'TRAM-förbindelse' },
            { icon: 'baby', title: 'Familjevänligt', description: 'Lugnt och tryggt' },
            { icon: 'beach', title: 'Muchavista', description: 'Prisad strand' },
            { icon: 'landmark', title: 'Historia', description: 'Iberiska ruiner' }
        ],
        relatedAreas: ['alicante', 'san-juan', 'villajoyosa', 'benidorm'],
        galleryImages: []
    },
    {
        slug: 'la-nucia',
        name: 'La Nucía',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 115,
        priceRange: { min: 150000, max: 800000 },
        avgPrice: 295000,
        image: '/images/areas/la-nucia.png',
        description: 'Bergsby med utsikt – modern infrastruktur och internationell gemenskap.',
        headline: 'Köp bostad i La Nucía – Bergsliv med havsutsikt',
        metaDescription: 'La Nucía kombinerar bergscharm med modern infrastruktur. Villor med utsikt och ett aktivt expatliv nära Benidorm. Utforska våra objekt.',
        keywords: ['köpa villa la nucia', 'la nucia bostad', 'berg costa blanca', 'benidorm närhet'],
        coordinates: { lat: 38.6172, lng: -0.1283 },
        content: {
            intro: 'La Nucía är bergsortens svar på modernt boende. Med prisbelönt sportanläggning, internationella skolor och spektakulär utsikt lockar staden aktiva familjer och pensionärer som söker livskvalitet utan strandpremien.',
            lifestyle: 'Aktivt liv med fokus på sport och hälsa. Kommunen satsar stort på faciliteter – olympisk sportanläggning, golfbanor, vandringsleder. Stark skandinavisk och nordeuropeisk gemenskap.',
            climate: 'Lite svalare än kusten tack vare höjden. Perfekta förhållande för utomhusaktiviteter. Klarare luftkvalitet.',
            attractions: 'Ciudad Deportiva Camilo Cano (olympisk standard), flera golfbanor, vandring i bergen, söndagsmarknad, nära till Altea och Benidorm.',
            transport: 'Alicante flygplats 55 min. Bil nödvändigt – begränsad kollektivtrafik. Nära motorvägen AP-7.',
            propertyMarket: 'Mer för pengarna än kusten. Townhouses från 180 000 €, villor med utsikt från 280 000 €, lyxvillor med pool från 450 000 €.',
            buyingTips: 'Kontrollera bilväg – vissa fastigheter har brant infart. Pooluppvärmning rekommenderas för året-runt-användning. Mycket gott rykte bland expats.'
        },
        highlights: [
            { icon: 'dumbbell', title: 'Sport', description: 'Olympisk standard' },
            { icon: 'mountain', title: 'Bergsläge', description: 'Spektakulär utsikt' },
            { icon: 'school', title: 'Skolor', description: 'Internationella alternativ' },
            { icon: 'euro', title: 'Värde', description: 'Mer för pengarna' }
        ],
        relatedAreas: ['alfaz-del-pi', 'albir', 'benidorm', 'altea', 'finestrat'],
        galleryImages: []
    },
    {
        slug: 'alfaz-del-pi',
        name: 'Alfaz del Pi',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 145,
        priceRange: { min: 140000, max: 850000 },
        avgPrice: 275000,
        image: '/images/areas/alfaz-del-pi.png',
        description: 'Norsk by i Spanien – Skandinaviens största koloni utanför Norden.',
        headline: 'Köp bostad i Alfaz del Pi – Skandinavernas hemvist',
        metaDescription: 'Alfaz del Pi har Europas största skandinaviska koloni. Norskt kulturhus, nordisk gemenskap och stranden i Albir. Välkommen hem i solen.',
        keywords: ['köpa bostad alfaz del pi', 'albir bostad', 'skandinaver spanien', 'norsk koloni'],
        coordinates: { lat: 38.5824, lng: -0.1015 },
        content: {
            intro: 'Alfaz del Pi är unikt – här bor fler skandinaver än någon annanstans utanför Norden. Med eget norskt kulturhus, nordiska affärer och närheten till Albirs strand har orten blivit ett hem hemifrån för tusentals nordbor.',
            lifestyle: 'Nästan som att bo i Skandinavien – fast med sol. Nordiska föreningar, bekanta varor i butikerna, grannar som talar ditt språk. Samtidigt finns det spanska runt hörnet för den som vill.',
            climate: 'Skyddat av Sierra Helada, behagligt året runt. Något svalare än inlandet men fortfarande 300+ soldagar.',
            attractions: 'Albir strand och promenad, Lighthouse of Albir vandring, Norska kulturhuset, friluftsmuseum, nära till Benidorm och Altea.',
            transport: 'Alicante flygplats 50 min. TRAM-spårvagn till Benidorm och vidare. Goda bussförbindelser.',
            propertyMarket: 'Stabil marknad med hög skandinavisk efterfrågan. Lägenheter från 150 000 €, bungalows från 190 000 €, villor från 320 000 €.',
            buyingTips: 'Nära skandinaviska faciliteter = lättare att sälja. Albir är dyrare men bekvämare. Kontrollera gemenskapsregler om husdjur och uthyrning.'
        },
        highlights: [
            { icon: 'flag', title: 'Skandinaviskt', description: 'Norska kulturhuset' },
            { icon: 'beach', title: 'Albir', description: 'Stenig charmig strand' },
            { icon: 'hiking', title: 'Vandring', description: 'Fyren vid Albir' },
            { icon: 'users', title: 'Gemenskap', description: 'Stark nordisk närvaro' }
        ],
        relatedAreas: ['albir', 'la-nucia', 'altea', 'benidorm'],
        galleryImages: []
    },
    {
        slug: 'finestrat',
        name: 'Finestrat',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 95,
        priceRange: { min: 180000, max: 1200000 },
        avgPrice: 345000,
        image: '/images/areas/finestrat.png',
        description: 'Modernt bergsboende med spektakulär utsikt och nära till Benidorm.',
        headline: 'Köp bostad i Finestrat – Lyxigt läge med panoramautsikt',
        metaDescription: 'Finestrat erbjuder moderna villor med havs- och bergsutsikt, endast minuter från Benidorm. Lugn lyx i spektakulär miljö. Kontakta oss.',
        keywords: ['köpa villa finestrat', 'finestrat lyx', 'puig campana', 'benidorm villa'],
        coordinates: { lat: 38.5677, lng: -0.2181 },
        content: {
            intro: 'Finestrat ligger i skuggan av det majestätiska Puig Campana-berget med spektakulär utsikt över Benidorm och kusten. Moderna urbanisationer erbjuder lyxboende i lugn miljö, bara minuter från all service.',
            lifestyle: 'Lugnt och exklusivt boende för de som vill undvika turistmassorna men ha dem inom räckhåll. Golfbanor, vandringsleder och utsökta restauranger.',
            climate: 'Bergsnärhet ger något svalare klimat. Frisk luft från Puig Campana. Ljuvliga sommarkvällar.',
            attractions: 'Puig Campana vandring (1406m), Terra Mítica nöjespark, Villaitana golfresort, Terra Natura djurpark.',
            transport: 'Alicante flygplats 45 min. Bil nödvändigt. Benidorm 10 min.',
            propertyMarket: 'Premium bergsnära fastigheter. Townhouses från 200 000 €, moderna villor från 350 000 €, lyxvillor med infinity pool från 600 000 €.',
            buyingTips: 'Sierra Cortina-området mest eftertraktat. Kontrollera vattentryck på höjden. Pool- och trädgårdsskötsel ingår ofta i gemenskapsavgift.'
        },
        highlights: [
            { icon: 'mountain', title: 'Puig Campana', description: '1406m bergstopp' },
            { icon: 'eye', title: 'Panoramautsikt', description: 'Hav och berg' },
            { icon: 'swim', title: 'Infinity pools', description: 'Lyxigt boende' },
            { icon: 'golf', title: 'Villaitana', description: 'Golfresort' }
        ],
        relatedAreas: ['benidorm', 'la-nucia', 'polop', 'villajoyosa'],
        galleryImages: []
    },
    {
        slug: 'villajoyosa',
        name: 'Villajoyosa',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 125,
        priceRange: { min: 120000, max: 900000 },
        avgPrice: 245000,
        image: '/images/areas/villajoyosa.png',
        description: 'Chokladstadens färgglada hus och genuina spanska atmosfär.',
        headline: 'Köp bostad i Villajoyosa – Färg, choklad och charm',
        metaDescription: 'Villajoyosa – chokladstaden med de färgglada husen. Autentiskt spanskt liv och vackra stränder. Unika fastigheter med karaktär.',
        keywords: ['köpa bostad villajoyosa', 'la vila joiosa', 'chokladstad spanien', 'färgglada hus'],
        coordinates: { lat: 38.5081, lng: -0.2356 },
        content: {
            intro: 'Villajoyosa (La Vila Joiosa) är känd för sina ikoniska färgglada fiskarhus vid stranden och sin långa chokladtradition. Staden erbjuder genuin spansk atmosfär mellan turistiga Benidorm och kosmopolitiska Alicante.',
            lifestyle: 'Äkta spanskt fiskarliv blandat med modern bekvämlighet. Chokladfabriker att besöka, traditionella fester, levande marknad. Mindre internationellt än grannorterna.',
            climate: 'Typiskt Costa Blanca-klimat, skyddat läge med behagliga temperaturer året runt.',
            attractions: 'Färgglada gamla stan, Valor chokladmuseum, Moros y Cristianos-festival, vackra stränder, romerska ruiner.',
            transport: 'Alicante flygplats 35 min. TRAM-spårvagn till Benidorm och Alicante. Goda bussförbindelser.',
            propertyMarket: 'Prisvärt alternativ mellan Alicante och Benidorm. Lägenheter från 130 000 €, townhouses från 180 000 €, villor från 280 000 €.',
            buyingTips: 'Gamla stan charmig men parkeringen kan vara problem. Strandnära områden populärast. Kontrollera byggnadens skick – äldre hus kan behöva renovering.'
        },
        highlights: [
            { icon: 'palette', title: 'Färgglatt', description: 'Ikoniska fiskarbus' },
            { icon: 'candy', title: 'Choklad', description: 'Valor-fabriken' },
            { icon: 'flag', title: 'Traditioner', description: 'Moros y Cristianos' },
            { icon: 'euro', title: 'Prisvärt', description: 'Bra värde' }
        ],
        relatedAreas: ['benidorm', 'el-campello', 'finestrat', 'alicante'],
        galleryImages: []
    },
    {
        slug: 'rojales',
        name: 'Rojales',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 95,
        priceRange: { min: 85000, max: 450000 },
        avgPrice: 165000,
        image: '/images/areas/rojales.png',
        description: 'Unika grotthus och prisvärt inlandsboende med spansk charm.',
        headline: 'Köp bostad i Rojales – Grotthus och spansk tradition',
        metaDescription: 'Rojales erbjuder unika grotthus och prisvärt boende i genuint spansk miljö. Nära stränderna men långt från masstourism. Upptäck möjligheterna.',
        keywords: ['köpa bostad rojales', 'grotthus spanien', 'cuevas del rodeo', 'costa blanca inlandet'],
        coordinates: { lat: 38.0873, lng: -0.7243 },
        content: {
            intro: 'Rojales är en charmig inlandsstad mest känd för sina unika Cuevas del Rodeo – konstnärligt utsmyckade grotthus som blivit turistattraktion. Staden erbjuder genuint spanskt liv och prisvärt boende bara 20 minuter från stranden.',
            lifestyle: 'Autentiskt spanskt vardagsliv med marknadsdagar, lokala fester och avslappnat tempo. Internationell gemenskap växer men staden behåller sin karaktär.',
            climate: 'Inlandsklimat – varmare på sommaren, svalare på vintern än kusten. Torrare luft.',
            attractions: 'Cuevas del Rodeo (utsmyckade grotthus), historisk bro, söndagsmarknad, nära till stränder och golfbanor.',
            transport: 'Alicante flygplats 40 min, Murcia flygplats 35 min. Bil nödvändigt. Nära motorvägen.',
            propertyMarket: 'Mycket prisvärt. Lägenheter från 70 000 €, townhouses från 100 000 €, villor med pool från 150 000 €.',
            buyingTips: 'Perfekt för stram budget utan att ge avkall på kvalitet. Kontrollera att fastigheten har alla papper i ordning – äldre hus kan ha problem. Grotthus är charm men ofta opraktiska.'
        },
        highlights: [
            { icon: 'cave', title: 'Grotthus', description: 'Cuevas del Rodeo' },
            { icon: 'euro', title: 'Låga priser', description: 'Budgetvänligt' },
            { icon: 'store', title: 'Marknad', description: 'Traditionell söndag' },
            { icon: 'map', title: 'Läge', description: '20 min till strand' }
        ],
        relatedAreas: ['ciudad-quesada', 'guardamar', 'torrevieja', 'orihuela-costa'],
        galleryImages: []
    },
    {
        slug: 'playa-san-juan',
        name: 'Playa San Juan',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 175,
        priceRange: { min: 150000, max: 1200000 },
        avgPrice: 325000,
        image: '/images/areas/playa-san-juan.png',
        description: 'Alicantes finaste strandområde – urban bekvämlighet möter havsutsikt.',
        headline: 'Köp bostad vid Playa San Juan – Alicantes pärlstrand',
        metaDescription: 'Playa San Juan erbjuder Alicantes bästa strand med urban bekvämlighet. Moderna bostäder med havsutsikt och alla faciliteter. Boka visning.',
        keywords: ['köpa bostad playa san juan', 'san juan strand', 'alicante strand bostad', 'havsutsikt alicante'],
        coordinates: { lat: 38.3871, lng: -0.4098 },
        content: {
            intro: 'Playa San Juan är Alicantes mest eftertrakte bostadsområde med sin 6 km långa gyllene sandstrand och perfekta mix av urban bekvämlighet och havsnärhet. Hit kommer de som vill ha strand, stad och kvalitet.',
            lifestyle: 'Bekvämt modernt liv vid havet. Strandpromenader, restauranger, shopping – allt inom gångavstånd. Populärt bland spanskätriater och internationella köpare.',
            climate: 'Perfekt strandklimat med havsbrisen som svalkar. Mild vinter, varm men behaglig sommar.',
            attractions: '6 km strand med promenad, restauranger vid havet, golfbanor, kort till Alicantes kulturutbud.',
            transport: 'Alicante flygplats 20 min. TRAM-spårvagn till Alicante centrum. Utmärkt för bilfritt liv.',
            propertyMarket: 'Premium strandpriser. Lägenheter från 180 000 €, havsutsikt från 280 000 €, penthouses från 450 000 €.',
            buyingTips: 'Första linjen dyrast men bäst hyrespotential. Kontrollera störande nattliv på sommaren i vissa delar. TRAM-nära uppskattas.'
        },
        highlights: [
            { icon: 'beach', title: '6 km strand', description: 'Gyllene sand' },
            { icon: 'building', title: 'Urban', description: 'Alla bekvämligheter' },
            { icon: 'train', title: 'TRAM', description: 'Bilfritt möjligt' },
            { icon: 'sun', title: 'Sommar', description: 'Levande strandliv' }
        ],
        relatedAreas: ['alicante', 'el-campello', 'santa-pola', 'villajoyosa'],
        galleryImages: []
    }
];
