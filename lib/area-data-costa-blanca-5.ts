
import { AreaDetail } from '@/types/property';

export const COSTA_BLANCA_AREAS_5: AreaDetail[] = [
    {
        slug: 'vega-baja-inland',
        name: 'Vega Baja (Inland)',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 30, // Aggregate count
        priceRange: { min: 80000, max: 400000 },
        avgPrice: 165000,
        image: '/images/areas/vega-baja-inland.png',
        description: 'Det bördiga inlandet – autentiska byar och vidsträckta odlingar.',
        headline: 'Köp bostad i Vega Baja – Spanska inlandets charm',
        metaDescription: 'Vega Baja inland erbjuder prisvärt boende i genuina spanska byar som Rafal, Catral och Bigastro. Omgiven av grönska och berg. Upptäck livet på landet.',
        keywords: ['köpa hus vega baja', 'inland costa blanca', 'catral', 'rafal', 'bigastro'],
        coordinates: { lat: 38.0667, lng: -0.8333 },
        content: {
            intro: 'Vega Baja del Segura, "låglandet" runt floden Segura, är provinsens trädgård. Inlandet här består av en rad charmiga byar som Almoradí, Catral, Rafal, Bigastro och Callosa de Segura. Här är livet genuint spanskt, prisläget lågt och naturen inpå knuten.',
            lifestyle: 'Traditionellt spanskt byliv blandat med landsbygdsro. Här hälsar man på grannarna och handlar lokalt. Utmärkt för den som vill integreras och lära sig språket. Lugnare tempo än vid kusten.',
            climate: 'Varmt och soligt. Något fler soltimmar än kusten då molnen ofta stannar vid bergen. Torrt inlandsklimat.',
            attractions: 'Vandring i bergen (Sierras de Callosa y Orihuela), lokala marknader, traditionella fiestor, cykling bland apelsinlundarna.',
            transport: 'Alicante flygplats 30-40 min. Bil nödvändigt. Bussförbindelser finns men är glesa.',
            propertyMarket: 'Mycket prisvärt. Stora villor på landet för under 300 000 €. Byhus att renovera från 60 000 °. Perfekt för fyndjägaren.',
            buyingTips: 'Kontrollera att "rustico"-fastigheter är lagliga. Många byar är små, så kolla att det finns den service du behöver (apotek, bank, butik).'
        },
        highlights: [
            { icon: 'leaf', title: 'Natur', description: 'Bördiga odlingar' },
            { icon: 'euro', title: 'Låga priser', description: 'Fyndläge' },
            { icon: 'heart', title: 'Genuint', description: 'Äkta Spanien' },
            { icon: 'mountain', title: 'Berg', description: 'Vacker kuliss' }
        ],
        relatedAreas: ['almoradi', 'dolores', 'orihuela', 'torrevieja'],
        galleryImages: []
    },
    {
        slug: 'mil-palmeras',
        name: 'Mil Palmeras',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 110,
        priceRange: { min: 140000, max: 950000 },
        avgPrice: 285000,
        image: '/images/areas/mil-palmeras.png',
        description: 'Tusen palmer vid havet – en av kustens vackraste stränder.',
        headline: 'Köp bostad i Mil Palmeras – Strandliv bland palmer',
        metaDescription: 'Mil Palmeras är känt för sin vackra strand och gröna omgivningar. Populärt för familjer och solälskare. Moderna bostäder nära havet.',
        keywords: ['köpa lägenhet mil palmeras', 'mil palmeras strand', 'pilar de la horadada kust', 'havsnära bostad'],
        coordinates: { lat: 37.8803, lng: -0.7597 },
        content: {
            intro: 'Mil Palmeras ("Tusen Palmer") lever upp till sitt namn. Denna kustort, som tillhör Pilar de la Horadada, är känd för sin fantastiska sandstrand, sina lummiga grönområden och sin avslappnade atmosfär. En favorit bland familjer och strandälskare.',
            lifestyle: 'Strandfokuserat och familjevänligt. På sommaren sjuder det av liv på chiringuitos och strandpromenader. På vintern lugnare men fortfarande aktivt tack vare en trogen expat-community.',
            climate: 'Milt kustklimat med svalkande havsbris. Perfekt för strandliv från maj till oktober.',
            attractions: 'Playa de Mil Palmeras (Blå Flagg), "Restaurantgatan" (Olympia), paddelbanor, promenadstråk längs havet.',
            transport: 'Murcia flygplats 35 min, Alicante flygplats 50 min. Bil underlättar men allt finns inom gångavstånd.',
            propertyMarket: 'Eftertraktat strandläge. Priserna har stigit tack vare mycket nyproduktion. Lägenheter strandnära från 180 000 €, villor från 350 000 €.',
            buyingTips: 'Nyproduktionen här håller hög klass. Viking-området är populärt. Kontrollera avstånd till stranden – det är den stora dragkraften.'
        },
        highlights: [
            { icon: 'palmtree', title: 'Tusen palmer', description: 'Grönt och lummigt' },
            { icon: 'beach', title: 'Strand', description: 'En av de bästa' },
            { icon: 'utensils', title: 'Restauranger', description: 'Livligt nöjesliv' },
            { icon: 'baby', title: 'Familjer', description: 'Barnvänligt' }
        ],
        relatedAreas: ['torre-de-la-horadada', 'pilar-de-la-horadada', 'campoamor', 'orihuela-costa'],
        galleryImages: []
    },
    {
        slug: 'torre-de-la-horadada',
        name: 'Torre de la Horadada',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 135,
        priceRange: { min: 160000, max: 1200000 },
        avgPrice: 325000,
        image: '/images/areas/torre-de-la-horadada.png',
        description: 'Det gamla vakttornet vid havet – charmig spansk semesterort med fina torg.',
        headline: 'Köp bostad i Torre de la Horadada – Spansk kustcharm',
        metaDescription: 'Torre de la Horadada erbjuder charmigt torgliv, fin marina och kristallklart vatten. En spansk favorit med hög livskvalitet. Upptäck pärlan.',
        keywords: ['köpa hus torre de la horadada', 'torre de la horadada strand', 'pueblo latino', 'costa blanca syd'],
        coordinates: { lat: 37.8697, lng: -0.7583 },
        content: {
            intro: 'Torre de la Horadada är Pilar de la Horadadas hamnstad, känd för sitt ikoniska vakttorn från 1500-talet. Det är en ort med stark spansk identitet, vackra torg och en blandning av sandstränder och klippvikar.',
            lifestyle: 'Traditionellt spanskt sommarfirande blandat med året-runt-boende nordeuropéer. Mycket socialt liv kring torget och marinan. Lugnt, tryggt och vackert.',
            climate: 'Kustklimat. Behagligt året runt. Skyddat från nordliga vindar.',
            attractions: 'Vakttornet, marinan, Pueblo Latino-torget (restauranger), stränderna El Conde och Los Jesuitas, promenaden till Mil Palmeras.',
            transport: 'Murcia flygplats 30 min, Alicante flygplats 50 min. Cykelavstånd till Pilar centrum.',
            propertyMarket: 'Mer exklusivt än grannorterna. Townhouses nära havet från 200 000 €, villor från 350 000 €, lyxiga nybyggen nära Higuericas-stranden från 450 000 €.',
            buyingTips: 'Higuericas-området är trendigast just nu med mycket modern nyproduktion. Gamla Torre har mer spansk charm. Hög uthyrningspotential på sommaren.'
        },
        highlights: [
            { icon: 'landmark', title: 'Tornet', description: 'Historiskt landmärke' },
            { icon: 'anchor', title: 'Marina', description: 'Båtliv och sport' },
            { icon: 'users', title: 'Torgliv', description: 'Social mötesplats' },
            { icon: 'beach', title: 'Stränder', description: 'Varierad kust' }
        ],
        relatedAreas: ['pilar-de-la-horadada', 'mil-palmeras', 'san-pedro-del-pinatar', 'orihuela-costa'],
        galleryImages: []
    },
    {
        slug: 'las-colinas-golf',
        name: 'Las Colinas Golf',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 85,
        priceRange: { min: 350000, max: 4500000 },
        avgPrice: 850000,
        image: '/images/areas/las-colinas-golf.png',
        description: 'Prisbelönt lyxresort – exklusivt boende i naturskyddad dal.',
        headline: 'Köp bostad på Las Colinas Golf & Country Club – Exklusivt',
        metaDescription: 'Las Colinas Golf & Country Club är utsedd till Spaniens bästa golfbana. Exklusiva villor och lägenheter i privat, naturskön miljö. Premium livsstil.',
        keywords: ['köpa villa las colinas', 'las colinas golf property', 'lyx resort spanien', 'bästa golfbana spanien'],
        coordinates: { lat: 37.9286, lng: -0.8039 },
        content: {
            intro: 'Las Colinas Golf & Country Club är en av Europas mest prestigefyllda resorter, belägen i en 330 hektar stor dalgång mellan kullarna. Här handlar allt om integritet, natur och lyx. Golfbanan rankas ständigt som en av Spaniens absolut bästa.',
            lifestyle: 'Exklusiv "Country Club"-livsstil. Inhägnat område med 24h säkerhet. Fokus på golf, wellness och gastronomi. En privat oas för den kräsne.',
            climate: 'Skyddat dalklimat. Svalt och skönt, omgivet av tallskog som ger ren luft.',
            attractions: 'Championship golfbana, Beach Club vid Campoamor, gym, tennis/padel, japansk restaurang (Enso Sushi), vandringsleder i naturreservatet.',
            transport: 'Alicante flygplats 45 min, Murcia flygplats 40 min. Bil nödvändigt.',
            propertyMarket: 'Premiumsegmentet. Lägenheter med panoramautsikt från 350 000 €, villor från 700 000 €, signaturvillor 1,5-4 miljoner €. Håller värdet mycket väl.',
            buyingTips: 'Gated community ger trygghet. Fokus på design och låg bebyggelsedensitet garanterar utsikt och integritet. Perfekt för golfare och naturälskare.'
        },
        highlights: [
            { icon: 'trophy', title: 'Prisbelönt', description: 'Spaniens bästa golf' },
            { icon: 'shield', title: 'Privat', description: '24h säkerhet' },
            { icon: 'tree', title: 'Natur', description: '330 hektar dalgång' },
            { icon: 'star', title: 'Exklusivt', description: 'Premium livsstil' }
        ],
        relatedAreas: ['san-miguel-de-salinas', 'campoamor', 'villamartin', 'orihuela-costa'],
        galleryImages: []
    },
    {
        slug: 'las-ramblas',
        name: 'Las Ramblas',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 75,
        priceRange: { min: 140000, max: 650000 },
        avgPrice: 265000,
        image: '/images/areas/las-ramblas.png',
        description: 'Dramatisk golfbana i kuperad terräng – grönt och lummigt boende.',
        headline: 'Köp bostad i Las Ramblas – Golf i dramatisk natur',
        metaDescription: 'Las Ramblas erbjuder spektakulärt boende inbäddat i grönska vid en av kustens mest utmanande golfbanor. Natur och lugn nära havet.',
        keywords: ['köpa hus las ramblas', 'las ramblas golf', 'golf fastighet spanien', 'orihuela costa golf'],
        coordinates: { lat: 37.9167, lng: -0.7750 },
        content: {
            intro: 'Las Ramblas Golf är känd för sin dramatiska och kuperade terräng, omgiven av tallskogar och raviner ("ramblas"). Bostadsområdet är vackert integrerat i naturen, vilket ger en känsla av avskildhet och grönska som är ovanlig på kusten.',
            lifestyle: 'Lugnt och grönt. Populärt bland golfare och naturälskare. Området är väletablerat med lummiga trädgårdar. Klubbhuslivet är centralt.',
            climate: 'Svalt och skuggigt på sommaren tack vare tallskogen. Skyddat mot vind.',
            attractions: 'Las Ramblas golfbana (tekniskt utmanande), klubbhuset, nära till La Fuente Center (restauranger), Campoamors stränder 5-10 min bort.',
            transport: 'Alicante flygplats 45 min, Murcia flygplats 40 min. Bil rekommenderas.',
            propertyMarket: 'Bra värde. Äldre, charmig arkitektur dominerar. Lägenheter från 140 000 €, radhus från 200 000 €, fristående villor med pool från 350 000 €.',
            buyingTips: 'Många hus har trappor p.g.a. terrängen – kontrollera tillgänglighet. Norr-söderläge är viktigt för vintersol. Mycket grönt och lummigt.'
        },
        highlights: [
            { icon: 'golf', title: 'Utmanande', description: 'Teknisk golfbana' },
            { icon: 'tree', title: 'Grönt', description: 'Integrerat i natur' },
            { icon: 'mountain', title: 'Kuperat', description: 'Spännande terräng' },
            { icon: 'moon', title: 'Lugn', description: 'Etablerat område' }
        ],
        relatedAreas: ['villamartin', 'campoamor', 'las-colinas-golf', 'lomas-de-cabo-roig'],
        galleryImages: []
    },
    {
        slug: 'vistabella-golf',
        name: 'Vistabella Golf',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 80,
        priceRange: { min: 130000, max: 450000 },
        avgPrice: 225000,
        image: '/images/areas/vistabella-golf.png',
        description: 'Växande golfresort i inlandet – modern livsstil till bra pris.',
        headline: 'Köp bostad på Vistabella Golf – Modernt och prisvärt',
        metaDescription: 'Vistabella Golf (Entre Naranjos) är ett snabbväxande område med modern nyproduktion runt en fin golfbana. Prisvärt och familjevänligt. Se erbjudanden.',
        keywords: ['köpa hus vistabella golf', 'entre naranjos', 'nyproduktion golf spanien', 'prisvärt boende'],
        coordinates: { lat: 38.0375, lng: -0.7875 },
        content: {
            intro: 'Vistabella Golf (tidigare känt som Entre Naranjos) är ett område som blomstrat de senaste åren. Beläget bland apelsinlundarna erbjuder det en utmärkt 18-hålsbana, modern nyproduktion och en växande service – allt till mycket konkurrenskraftiga priser.',
            lifestyle: 'Aktivt och familjevänligt. En blandning av permanentboende och semesterfirare. Området har fått ett rejält lyft med nya restauranger, butiker och sportfaciliteter. Trygg och, välskött miljö.',
            climate: 'Inlandsklimat. Varmt och soligt. Torrt.',
            attractions: 'Vistabella Golf, padelbanor, bowls-klubb, lekplatser, närheten till Torrevieja (15 min) och Orihuela stad.',
            transport: 'Alicante flygplats 35 min. Bil nödvändigt.',
            propertyMarket: 'Mycket nyproduktion. Moderna lägenheter från 140 000 €, villor med privat pool från 260 000 €. Äldre bestånd ("Entre Naranjos") billigare.',
            buyingTips: 'Ett område på uppgång – bra investeringspotential. Ligger lite längre från stranden (15-20 min) vilket håller priserna nere. Perfekt för golfare på budget.'
        },
        highlights: [
            { icon: 'golf', title: '18 hål', description: 'Trevlig bana' },
            { icon: 'trending-up', title: 'Växande', description: 'Ny service och hus' },
            { icon: 'euro', title: 'Prisvärt', description: 'Mycket för pengarna' },
            { icon: 'orange', title: 'Apelsiner', description: 'Mitt i lundarna' }
        ],
        relatedAreas: ['los-montesinos', 'san-miguel-de-salinas', 'algorfa', 'torrevieja'],
        galleryImages: []
    },
    {
        slug: 'aguas-nuevas',
        name: 'Aguas Nuevas',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 115,
        priceRange: { min: 100000, max: 450000 },
        avgPrice: 195000,
        image: '/images/areas/aguas-nuevas.png',
        description: 'Högt beläget bostadsområde i Torrevieja – nära till allt.',
        headline: 'Köp bostad i Aguas Nuevas – Centralt och bekvämt',
        metaDescription: 'Aguas Nuevas är ett av Torreviejas mest populära bostadsområden. Högt läge, nära till strand, stad och service. Perfekt för åretruntboende.',
        keywords: ['köpa hus aguas nuevas', 'torrevieja bostad', 'lägenhet aguas nuevas', 'radhus torrevieja'],
        coordinates: { lat: 37.9950, lng: -0.6750 },
        content: {
            intro: 'Aguas Nuevas är ett stort, väletablerat bostadsområde i norra Torrevieja. Beläget på en höjd har många bostäder havsutsikt. Här bor man med gångavstånd till både klippbad, marknader och köpcentrum, vilket gör det mycket populärt för permanentboende.',
            lifestyle: 'Bekvämt förortsliv. Nära till skolor, sportcenter och sjukhus. Blandad befolkning av spanjorer och nordeuropeer. Levande året runt.',
            climate: 'Torrevieja-klimat. Höjden ger svalkande vindar.',
            attractions: 'Torrevieja Sport City (simhall, arenor), fredagsmarknaden, vattenparken Aquopolis, klippbaden vid La Mata.',
            transport: 'Alicante flygplats 40 min. Lokalbussar till centrum. Cykelvänligt.',
            propertyMarket: 'Brett utbud. Mest radhus och bungalows("Quad-houses"). Priser från 110 000 €. Fristående villor från 250 000 €.',
            buyingTips: 'Sektor 25 är nyare med bredare gator. Nära sportcentret är bra för uthyrning till idrottsturister. Ett tryggt och säkert val.'
        },
        highlights: [
            { icon: 'map', title: 'Läge', description: 'Nära all service' },
            { icon: 'dumbbell', title: 'Sport', description: 'Sport City' },
            { icon: 'home', title: 'Bostadsmix', description: 'Radhus och villor' },
            { icon: 'bus', title: 'Transport', description: 'Bra förbindelser' }
        ],
        relatedAreas: ['torrevieja', 'la-mata', 'los-balcones', 'la-siesta'],
        galleryImages: []
    },
    {
        slug: 'la-mata',
        name: 'La Mata',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 145,
        priceRange: { min: 95000, max: 550000 },
        avgPrice: 185000,
        image: '/images/areas/la-mata.png',
        description: 'Lång sandstrand och naturpark – en lugnare sida av Torrevieja.',
        headline: 'Köp bostad i La Mata – Strandliv och naturpark',
        metaDescription: 'La Mata är en charmig kustby med Torreviejas längsta strand och en vacker naturpark. Spansk atmosfär och avslappnat liv. Hitta ditt hem.',
        keywords: ['köpa lägenhet la mata', 'la mata strand', 'torrelamata', 'havsutsikt torrevieja'],
        coordinates: { lat: 38.0250, lng: -0.6556 },
        content: {
            intro: 'La Mata (Torrelamata) är en före detta fiskeby som vuxit ihop med Torrevieja men behållit sin egen karaktär. Känd för sin fantastiska, kilometerlånga sandstrand och naturparken med saltlagunen, är detta en favorit för de som vill ha lugn och ro vid havet.',
            lifestyle: 'Spanskt och avslappnat. Torget vid stranden är samlingspunkten. Mycket populärt bland pensionärer och barnfamiljer. Mindre nattliv, mer strandpromenader.',
            climate: 'Unikt mikroklimat mellan havet och saltsjön. Mycket hälsosamt och stabilt.',
            attractions: 'Playa de La Mata (en av Costa Blancas längsta), Parque Natural de la Mata (vandring/cykling vid lagunen), onsdagsmarknaden, strandpromenaden.',
            transport: 'Alicante flygplats 35 min. Buss till Torrevieja centrum. Gångavstånd till det mesta i byn.',
            propertyMarket: 'Strandnära lägenheter dominerar. Priser från 100 000 € för äldre objekt, 200 000 €+ för frontlinjen. Radhus i "Parquemar" och liknande urbanisationer är populära.',
            buyingTips: 'Hus nära naturparken ("Torreblanca"-sidan) erbjuder lugn och natur. Lägenheter i centrum ("Pueblo") är praktiskt men mer livligt på sommaren. Parkering kan vara svårt i centrum.'
        },
        highlights: [
            { icon: 'waves', title: 'Lång strand', description: 'Kilometerlång sand' },
            { icon: 'tree', title: 'Naturpark', description: 'Vandring vid lagunen' },
            { icon: 'coffee', title: 'Torgliv', description: 'Mysigt centrum' },
            { icon: 'sun', title: 'Hälsa', description: 'Mikroklimat' }
        ],
        relatedAreas: ['torrevieja', 'aguas-nuevas', 'guardamar', 'cabora-roig'],
        galleryImages: []
    },
    {
        slug: 'la-veleta',
        name: 'La Veleta',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 55,
        priceRange: { min: 250000, max: 2500000 },
        avgPrice: 550000,
        image: '/images/areas/la-veleta.png',
        description: 'Exklusivt villaområde vid havet i södra Torrevieja.',
        headline: 'Köp bostad i La Veleta – Torreviejas gräddhylla',
        metaDescription: 'La Veleta är ett prestigefyllt område vid havet med lyxvillor och lummiga trädgårdar. Nära centrum men lugnt och privat. Exklusiva objekt.',
        keywords: ['köpa villa la veleta', 'lyxvilla torrevieja', 'havsnära villa', 'exklusivt boende'],
        coordinates: { lat: 37.9625, lng: -0.6958 },
        content: {
            intro: 'La Veleta är ett av Torreviejas mest prestigefyllda områden. Beläget vid havet i stadens södra utkant, kännetecknas det av stora villor, lummiga trädgårdar och en lugn, exklusiv atmosfär. Här bor du granne med havet men ändå nära stadens puls.',
            lifestyle: 'Lugnt villaliv. Promenadavstånd till havet men inga stora turiststränder mitt i området, vilket håller massorna borta. Exklusivt och privat.',
            climate: 'Kustklimat. Svalkande havsbris.',
            attractions: 'Strandpromenaden, nära till det nya sjukhuset, Cala Ferris (palmkantad vik), närheten till centrum.',
            transport: 'Alicante flygplats 45 min. Buss till centrum. Enkel access till N-332.',
            propertyMarket: 'Premium. Här hittar du några av Torreviejas dyraste villor. Priser från 400 000 € för äldre villor, upp till flera miljoner för frontlinjen. Även några exklusiva lägenhetskomplex.',
            buyingTips: 'Ett område som alltid håller värdet. Perfekt för den som vill ha en stor villa men inte vill bo i en "urbanisation" långt från stan. Kolla renoveringsbehov på äldre objekt.'
        },
        highlights: [
            { icon: 'gem', title: 'Prestigefyllt', description: 'Exklusiv adress' },
            { icon: 'home', title: 'Villor', description: 'Stora tomter' },
            { icon: 'palmtree', title: 'Cala Ferris', description: 'Vacker palmvik' },
            { icon: 'map', title: 'Havsnära', description: 'Första linjen' }
        ],
        relatedAreas: ['torrevieja', 'los-balcones', 'punta-prima', 'rocio-del-mar'],
        galleryImages: []
    },
    {
        slug: 'los-altos',
        name: 'Los Altos',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 125,
        priceRange: { min: 110000, max: 550000 },
        avgPrice: 215000,
        image: '/images/areas/los-altos.png',
        description: 'Väletablerat och populärt område nära Punta Prima och saltsjön.',
        headline: 'Köp bostad i Los Altos – Etablerat och bekvämt',
        metaDescription: 'Los Altos erbjuder väletablerat boende med lummiga trädgårdar nära Punta Primas stränder och service. Perfekt för familjer och pensionärer.',
        keywords: ['köpa hus los altos', 'torrevieja los altos', 'bungalow los altos', 'nära sjukhuset'],
        coordinates: { lat: 37.9611, lng: -0.7167 },
        content: {
            intro: 'Los Altos är ett moget och väletablerat bostadsområde strax söder om Torrevieja. Området är grönt och lummigt med många permanentboende. Läget är strategiskt – nära till stränderna i Punta Prima, sjukhuset och köpcentret La Zenia Boulevard.',
            lifestyle: 'Bekvämt vardagsliv. Här finns skolor, stormarknader (Consum, Aldi) och restauranger i området. Mycket populärt bland britter och skandinaver.',
            climate: 'Skyddat läge men nära havet.',
            attractions: 'Via Park köpcentrum, närheten till Punta Prima strand, Saltsjön, Torrevieja sjukhus.',
            transport: 'Alicante flygplats 40 min. Bra bussförbindelser. Nära motorvägspåfart.',
            propertyMarket: 'Stort utbud av bungalows och fristående villor. Prisvärt. 2-sovrums bungalow från 110 000 €, villor från 220 000 €.',
            buyingTips: 'Många hus har bra uthyrningspotential året runt p.g.a. läget. Kontrollera gemenskapsavgifter (Vissa har pool, andra inte). Södra delarna närmare Orihuela Costa är populärast.'
        },
        highlights: [
            { icon: 'check', title: 'Etablerat', description: 'Färdigt område' },
            { icon: 'shopping-cart', title: 'Service', description: 'Allt finns nära' },
            { icon: 'bus', title: 'Buss', description: 'Goda förbindelser' },
            { icon: 'home', title: 'Varierat', description: 'Alla hustyper' }
        ],
        relatedAreas: ['punta-prima', 'los-balcones', 'la-florida', 'torrevieja'],
        galleryImages: []
    },
    {
        slug: 'los-balcones',
        name: 'Los Balcones',
        region: 'costa-blanca',
        province: 'Alicante',
        propertyCount: 145,
        priceRange: { min: 200000, max: 850000 },
        avgPrice: 345000,
        image: '/images/areas/los-balcones.png',
        description: 'Villastad på kullarna med utsikt över den rosa saltsjön.',
        headline: 'Köp bostad i Los Balcones – Utsikt över rosa sjön',
        metaDescription: 'Los Balcones är ett exklusivt villaområde med stora tomter och tennisklubb. Ligger vid den rosa saltlagunen. Prestigefyllt och lugnt.',
        keywords: ['köpa villa los balcones', 'rosa saltsjön', 'tennis torrevieja', 'stora tomter'],
        coordinates: { lat: 37.9667, lng: -0.7083 },
        content: {
            intro: 'Los Balcones är ett av områdets äldsta och mest prestigefyllda villaområden. Beläget på kullarna precis intill den rosa saltlagunen erbjuder det vida gator, stora tomter och en etablerad grönska. En favorit för den som söker livskvalitet.',
            lifestyle: 'Aktivt livsstil med fokus på tennis och hälsa. Området har en berömd tennisklubb. Luften här anses vara extra hälsosam tack vare mikroklimatet från saltsjön.',
            climate: 'Torrt och hälsosamt. Något svalare på sommaren, varmare på vintern tack vare sjöns värmemagasin.',
            attractions: 'Rosa saltlagunen, Los Balcones Tennis Club, Filton Center (service), nya hundparken och grönområden.',
            transport: 'Alicante flygplats 40 min. Buss till centrum. Bil rekommenderas.',
            propertyMarket: 'Domineras av fristående villor på stora tomter (ofta 500-1000 m2, vilket är ovanligt här). Priser från 250 000 € för äldre villor, 500 000 €+ för renoverat/nytt.',
            buyingTips: 'Hus i första led mot sjön har magisk utsikt och solnedgång. Se upp för sättningar i marken på vissa äldre hus nära branten (ovanligt men förekommer). Mycket populärt område.'
        },
        highlights: [
            { icon: 'droplets', title: 'Saltsjön', description: 'Unik utsikt' },
            { icon: 'activity', title: 'Tennis', description: 'Känd tennisklubb' },
            { icon: 'home', title: 'Stora tomter', description: 'Luftigt boende' },
            { icon: 'heart', title: 'Hälsa', description: 'Hälsosam luft' }
        ],
        relatedAreas: ['los-altos', 'torrevieja', 'san-miguel-de-salinas', 'punta-prima'],
        galleryImages: []
    }
];
