import { AreaDetail } from '@/types/property';

// Costa de Almería Areas
export const COSTA_ALMERIA_AREAS: AreaDetail[] = [
    {
        slug: 'mojacar',
        name: 'Mojácar',
        region: 'costa-almeria',
        province: 'Almería',
        propertyCount: 165,
        priceRange: { min: 120000, max: 850000 },
        avgPrice: 265000,
        image: '/images/areas/mojacar.png',
        description: 'Ikonisk vit bergsby med spektakulär utsikt och livlig strandpromenad – Andalusiens östra pärla.',
        headline: 'Köp bostad i Mojácar – Vita hus och medelhavsdrömmar',
        metaDescription: 'Mojácar erbjuder pittoresk vit by på berget och livlig strand. Prisvärt alternativ till Costa del Sol med samma charm. Kontakta oss.',
        keywords: ['köpa bostad mojacar', 'mojacar pueblo', 'mojacar playa', 'costa almeria bostad'],
        coordinates: { lat: 37.1389, lng: -1.8514 },
        content: {
            intro: 'Mojácar är Costa de Almerías mest kända destination, delad i två distinkta delar: det pittoreska Mojácar Pueblo på bergstoppen och det livliga Mojácar Playa längs kusten. Kombinationen av autentisk andalusisk charm och modern bekvämlighet gör detta till ett unikt val.',
            lifestyle: 'Avslappnat bohemskt liv med stark konstnärlig tradition. Mojácar Pueblo bjuder på gallerier, tapas och spektakulära solnedgångar. Mojácar Playa har strandpromenad, restauranger och nattliv. Växande internationell gemenskap.',
            climate: 'Europas soligaste hörn med 320+ soldagar och endast 200mm nederbörd årligen. Milda vintrar (15-20°C), varma somrar (28-35°C). Ökenklimat med låg luftfuktighet.',
            attractions: 'Vit labyrintby med moriskt arv, Fuente mora-källan, konstgallerier, 17 km strand, nära Cabo de Gata naturreservat, golf, ökenlandskap.',
            transport: 'Almería flygplats 90 km (1h), Murcia flygplats 120 km (1.5h). Bil nödvändigt. Goda motorvägsanslutningar via A-7.',
            propertyMarket: 'Prisvärt jämfört med Costa del Sol. Lägenheter i Playa från €120 000, townhouses från €180 000, villor med utsikt i Pueblo från €350 000. Stabil efterfrågan.',
            buyingTips: 'Mojácar Pueblo för charm och utsikt men parkering är problem. Mojácar Playa för strand och bekvämlighet. Marina del Mar Mojacar är nybyggt och attraktivt.'
        },
        highlights: [
            { icon: 'home', title: 'Vit by', description: 'Pittoresk och historisk' },
            { icon: 'sun', title: '320+ soldagar', description: 'Europas soligaste' },
            { icon: 'palette', title: 'Konstnärsby', description: 'Gallerier och ateljéer' },
            { icon: 'euro', title: 'Prisvärt', description: 'Alternativ till Costa del Sol' }
        ],
        relatedAreas: ['vera', 'garrucha', 'carboneras', 'cabo-de-gata'],
        galleryImages: []
    },
    {
        slug: 'vera',
        name: 'Vera',
        region: 'costa-almeria',
        province: 'Almería',
        propertyCount: 125,
        priceRange: { min: 85000, max: 550000 },
        avgPrice: 195000,
        image: '/images/areas/vera.png',
        description: 'Naturistparadis och familjevänlig kust – känt för sina otroliga stränder och avslappnade livsstil.',
        headline: 'Köp bostad i Vera – Strandparadis på Costa de Almería',
        metaDescription: 'Vera Playa erbjuder kilometerlånga stränder, naturistområden och familjevänligt boende. Prisvärt med hög livskvalitet. Utforska våra objekt.',
        keywords: ['köpa bostad vera', 'vera playa', 'costa almeria familj', 'naturism spanien'],
        coordinates: { lat: 37.2450, lng: -1.8617 },
        content: {
            intro: 'Vera kombinerar historisk inlandsstad med en av Spaniens finaste kuststräckor. Vera Playa är känt för sina långa, breda stränder och inkluderar Europas största naturistsamhälle. Perfekt för den som söker avskildhet och vacker natur.',
            lifestyle: 'Avslappnat och öppet. Vera Playa lockar en mix av familjer och naturister (separata zoner). Liten internationell gemenskap, mestadels spansk. Fokus på strand, sol och enkel livsstil.',
            climate: 'Semi-aridt klimat med minimal nederbörd. 3000+ soltimmar årligen. Varma somrar, milda vintrar. Havet svalkar på sommaren.',
            attractions: 'Stränderna (inkl. naturiststranden), Aqua Vera vattenpark, nära Mojácar och Garrucha, ökenlandskap, gruvhistoria i inlandet.',
            transport: 'Almería flygplats 85 km, Murcia flygplats 115 km. Bil nödvändigt. Bra A-7 motorvägsanslutning.',
            propertyMarket: 'Mycket prisvärt. Lägenheter från €85 000, townhouses från €130 000, villor från €220 000. Naturistområdet har egen marknad med god efterfrågan.',
            buyingTips: 'Vera Playa Naturista för specifik målgrupp, Puerto Rey för marina och familj, Las Marinas för budgetvänligt. Kontrollera strandbefästningar vid strandnära köp.'
        },
        highlights: [
            { icon: 'beach', title: 'Breda stränder', description: 'Långa sandstränder' },
            { icon: 'sun', title: '3000+ soltimmar', description: 'Extremt soligt' },
            { icon: 'euro', title: 'Låga priser', description: 'Budgetvänligt' },
            { icon: 'heart', title: 'Naturism', description: 'Europas största samhälle' }
        ],
        relatedAreas: ['mojacar', 'garrucha', 'cuevas-del-almanzora', 'aguilas'],
        galleryImages: []
    },
    {
        slug: 'almeria',
        name: 'Almería',
        region: 'costa-almeria',
        province: 'Almería',
        propertyCount: 195,
        priceRange: { min: 95000, max: 750000 },
        avgPrice: 175000,
        image: '/images/areas/almeria.png',
        description: 'Historisk hamnstad med moriskt arv, filmhistoria och Andalusiens sista orörda kust.',
        headline: 'Köp bostad i Almería – Historisk stad vid orörda stränder',
        metaDescription: 'Almería stad erbjuder morisk historia, filmlocations och prisvärt stadsliv. Nära Cabo de Gata naturreservat. Utforska våra fastigheter.',
        keywords: ['köpa bostad almeria', 'almeria stad', 'cabo de gata', 'andalusien öst'],
        coordinates: { lat: 36.8340, lng: -2.4637 },
        content: {
            intro: 'Almería är provinshuvudstaden och en historisk skatt med sin mäktiga moriska fästning Alcazaba, autentiska spanska atmosfär och närhet till det spektakulära Cabo de Gata naturreservat. Staden är Hollywoodberömda – Sergio Leones spagettiwesterns spelades in här.',
            lifestyle: 'Autentiskt spanskt stadsliv utan turistmassor. Tapaskultur, strandpromenader, historia och kultur. Liten men växande internationell närvaro. Universitetet ger ung energi.',
            climate: 'Europas torraste stad med endast 200mm nederbörd. 3000+ soltimmar, varm men behaglig tack vare havsbrisen. Sällan under 10°C på vintern.',
            attractions: 'Alcazaba (Europas näst största moriska fästning), katedralen-fästning, Cabo de Gata naturreservat, Hollywood-ökenlandskap i Tabernas, filmstudior.',
            transport: 'Almería flygplats 9 km (10 min). Direktflyg till flera europeiska städer. Tågförbindelse till Granada, Sevilla, Madrid. Färjor till Melilla och Algeriet.',
            propertyMarket: 'Spaniens mest prisvärda provinsstad. Lägenheter i centrum från €95 000, strandnära från €130 000, villor från €250 000. Enorm potential för värdeökning.',
            buyingTips: 'Centro Histórico för charm, Playa de Zapillo för strand, El Toyo för modernt. Cabo de Gata-området är skyddat – begränsad nybyggnation ger värdestabilitet.'
        },
        highlights: [
            { icon: 'castle', title: 'Alcazaba', description: 'Morisk fästning' },
            { icon: 'film', title: 'Hollywood', description: 'Spagettiwestern-locations' },
            { icon: 'euro', title: 'Låga priser', description: 'Spaniens billigaste stad' },
            { icon: 'leaf', title: 'Cabo de Gata', description: 'Spektakulär natur' }
        ],
        relatedAreas: ['roquetas-de-mar', 'aguadulce', 'mojacar', 'nijar'],
        galleryImages: []
    }
];
