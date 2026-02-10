
import { AreaDetail } from '@/types/property';

export const COSTA_DEL_SOL_AREAS_3: AreaDetail[] = [
    {
        slug: 'ojen',
        name: 'Ojén',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 85,
        priceRange: { min: 250000, max: 2500000 },
        avgPrice: 650000,
        image: '/images/areas/ojen.png',
        description: 'Vacker vit bergsby bara minuter från Marbella – natur, lyx och lugn.',
        headline: 'Fastigheter i Ojén | Bergsby nära Marbella',
        metaDescription: 'Köp bostad i Ojén med svensk rådgivning. Bergsby med utsikt och nära Marbella.',
        keywords: ['köpa hus ojen', 'palo alto marbella', 'bergsby costa del sol', 'havsutsikt marbella'],
        coordinates: { lat: 36.5650, lng: -4.8550 },
        content: {
            intro: 'Ojén är en vacker vit by inbäddad i bergen strax ovanför Marbella. Det är en plats där traditionellt andalusiskt byliv möter ultramodern lyx i projekt som Palo Alto. Här bor man mitt i naturen men med Puerto Banús bara 15 minuter bort.',
            lifestyle: 'Lugnt och naturnära men sofistikerat. Byn är känd för sin musikfestival (Ojeando) och sina vandringsleder. Många köper här för utsikten och den friskare bergsluften.',
            climate: 'Svalare och friskare än vid kusten. Fantastiska sommarkvällar.',
            attractions: 'Vandringsleden till La Concha, grottorna i byn, Ojeando festival, olivoljemuseet, infinitypoolerna på Palo Alto (för boende).',
            transport: 'Málaga flygplats 35 min. Marbella 10 min. Bil nödvändigt.',
            propertyMarket: 'Tudelat. Charmiga, billigare byhus i gamla stan från 150 000 €. Exklusiva moderna lägenheter i nyproduktion (Palo Alto, Gran Soto) från 600 000 €.',
            buyingTips: 'Palo Alto är ett livsstilskoncept med gym, spa och co-working som lockar digitala nomader. Byn är perfekt för den som vill ha "äkta" Spanien.'
        },
        highlights: [
            { icon: 'mountain', title: 'Bergsvy', description: 'Panoramautsikt' },
            { icon: 'tree', title: 'Natur', description: 'Biosfärreservat' },
            { icon: 'star', title: 'Palo Alto', description: 'Lyxprojekt' },
            { icon: 'home', title: 'Vit by', description: 'Andalusisk charm' }
        ],
        relatedAreas: ['marbella', 'mijas', 'istan', 'monda'],
        galleryImages: []
    },
    {
        slug: 'marbella-east',
        name: 'Marbella East (Östra Marbella)',
        region: 'costa-del-sol',
        province: 'Málaga',
        propertyCount: 310,
        priceRange: { min: 250000, max: 15000000 },
        avgPrice: 950000,
        image: '/images/areas/marbella-east.png',
        description: 'Kustens bästa stränder och exklusiva villaområden i tallskogsmiljö.',
        headline: 'Fastigheter i Östra Marbella | Stränder och lyx',
        metaDescription: 'Köp bostad i Östra Marbella med svensk rådgivning. Elviria, Los Monteros och Cabopino med strand och lugn.',
        keywords: ['köpa villa elviria', 'los monteros', 'cabopino', 'marbella strand'],
        coordinates: { lat: 36.5000, lng: -4.8000 },
        content: {
            intro: 'Östra Marbella anses ha Costa del Sols absolut bästa stränder – breda, gyllene och kantade av sanddyner. Området sträcker sig från Rio Real till Cabopino och inkluderar exklusiva enklaver som Los Monteros, Elviria och Las Chapas.',
            lifestyle: 'Avslappnad lyx. Här är tempot lugnare än i Puerto Banús. Kända strandklubbar (Nikki Beach, La Plage Casanis) blandas med familjevänliga chiringuitos. Mycket grönt och låg exploateringsgrad.',
            climate: 'Mikroklimat. Skyddat och soligt.',
            attractions: 'Stränderna!, Nikki Beach, Cabopino Marina (lilla hamnen), Santa Clara Golf, Rio Real Golf.',
            transport: 'Málaga flygplats 30 min. Marbella centrum 5-10 min.',
            propertyMarket: 'Premium. Los Monteros är ett av kustens dyraste områden (frontline beach-villor). Elviria erbjuder bra mix av lägenheter och villor. Cabopino är populärt för hamnen. Startpriser c:a 250 000 € för lägenheter.',
            buyingTips: 'Elviria är centrum för service och skolor. Los Monteros för absolut exklusivitet. Cabopino för charm. Östra sidan är generellt grönare och mindre tätbebyggd än västra.'
        },
        highlights: [
            { icon: 'waves', title: 'Bästa stranden', description: 'Gyllene sand' },
            { icon: 'tree', title: 'Grönt', description: 'Låg bebyggelse' },
            { icon: 'cocktail', title: 'Nikki Beach', description: 'Kända beach clubs' },
            { icon: 'golf', title: 'Golf', description: 'Rio Real & Santa Clara' }
        ],
        relatedAreas: ['marbella', 'mijas', 'calahonda', 'san-pedro-de-alcantara'],
        galleryImages: []
    }
];
