
import { AreaDetail } from '@/types/property';

export const COSTA_CALIDA_AREAS_2: AreaDetail[] = [
    {
        slug: 'aguilas',
        name: 'Águilas',
        region: 'costa-calida',
        province: 'Murcia',
        propertyCount: 120,
        priceRange: { min: 95000, max: 750000 },
        avgPrice: 185000,
        image: '/images/areas/aguilas.png',
        description: 'Autentisk spansk kuststad med två bukter, slott och kända karnevaler. Ett paradis för den som söker det "äkta" Spanien.',
        headline: 'Köp bostad i Águilas – Spaniens okända pärla',
        metaDescription: 'Águilas erbjuder 28 km kust, ett medeltida slott och en fantastisk karneval. Prisvärt och genuint vid gränsen till Andalusien. Upptäck staden.',
        keywords: ['köpa lägenhet aguilas', 'aguilas karneval', 'calabardina', 'kuststad murcia'],
        coordinates: { lat: 37.4069, lng: -1.5819 },
        content: {
            intro: 'Águilas ligger längst söderut på Costa Cálida, precis vid gränsen till Andalusien. Det är en stad med stark identitet, omgiven av berg och hav. Känd för sitt slott San Juan de las Águilas och sin årliga karneval som är utnämnd till internationellt turistintresse. Här möts du av en genuin spansk atmosfär, långt från massturismens hotellkomplex.',
            lifestyle: 'Livet i Águilas är avslappnat och genuint. Staden lever året runt tack vare sin fasta befolkning. Gastronomin är i toppklass med de berömda röda räkorna och färsk fisk från hamnen. Kvällarna spenderas på Plaza de España, ett av Spaniens vackraste torg, där barnen leker och vuxna njuter av tapas. Det rika kulturlivet inkluderar konserter i auditoriet och den spektakulära karnevalen i februari.',
            climate: 'Klimatet är ett varmt ökenklimat med mycket lite regn och över 3 200 soltimmar per år. Vintrarna är bland de mildaste på det spanska fastlandet, ofta med temperaturer runt 20 grader mitt på dagen. Somrarna är varma men svalkas av havsbrisarna från de två bukterna.',
            attractions: 'Slottet San Juan erbjuder milsvid utsikt. Det ikoniska torget Plaza de España med sina hundraåriga fikusar. Auditoriet Infanta Doña Elena. Stränderna är många och varierade, från stadsstranden Las Delicias till de vilda vikarna i Cuatro Calas och det lugna vattnet i Calabardina.',
            transport: 'Till Murcia flygplats (RMU) tar det ca 55 minuter med bil, och till Almería flygplats ca 60 minuter. Tågförbindelse finns till Murcia stad. Motorvägen AP-7 gör det enkelt att nå resten av kusten.',
            propertyMarket: 'Prisbilden i Águilas är mycket attraktiv jämfört med norra Costa Blanca. Du får mycket bostad för pengarna, oavsett om du söker en lägenhet med havsutsikt i centrum eller en modern villa i områden som Collados eller Calabardina. Intresset från internationella köpare ökar stadigt.',
            buyingTips: 'Centrum passar dig som vill ha gångavstånd till allt och puls. Calabardina är perfekt för den som söker lugnet i en villa nära naturen. Isla del Fraile erbjuder exklusiva lägenheter med resort-känsla. Kontrollera alltid om bostaden har turistlicens om du planerar att hyra ut.'
        },
        highlights: [
            { icon: 'castle', title: 'Slottet', description: 'San Juan fästning' },
            { icon: 'mask', title: 'Karneval', description: 'Internationell fest' },
            { icon: 'waves', title: 'Två bukter', description: 'Levante & Poniente' },
            { icon: 'utensils', title: 'Gastronomi', description: 'Röda räkor & fisk' }
        ],
        quickFacts: {
            population: { value: 36400, year: 2024, source: 'INE' },
            foreignPercentage: { value: 18, source: 'Regional statistik' },
            swedesEstimate: { value: 150, note: 'Liten men växande grupp' },
            airportDistance: { km: 90, minutes: 60, airport: 'Murcia (RMU) / Almería' },
            pricePerM2: { value: 1650, source: 'Idealista 2025', year: 2025 },
            sunshineHours: { value: 3250 },
            averageTemp: { annual: 20, january: 14, july: 28 }
        },
        districts: [
            {
                name: 'El Centro', coordinates: { lat: 37.4069, lng: -1.5819 },
                character: 'Stadspuls, historiska byggnader och närhet till hamnen',
                pricePerM2: 1500,
                suitableFor: ['Stadsmänniskor', 'Kulturintresserade'],
                pros: ['Gångavstånd till allt', 'Levande torg', 'Strandnära'],
                cons: ['Svårt att parkera', 'Livligt på sommaren']
            },
            {
                name: 'Calabardina', coordinates: { lat: 37.4170, lng: -1.5200 },
                character: 'Lugn semesterby vid en egen bukt öster om staden',
                pricePerM2: 2100,
                suitableFor: ['Familjer', 'Naturälskare', 'Dykare'],
                pros: ['Fantastisk strand', 'Nära Cabo Cope', 'Villaområden'],
                cons: ['Bil krävs', 'Stilla på vintern']
            },
            {
                name: 'Los Collados', coordinates: { lat: 37.4200, lng: -1.5500 },
                character: 'Modernt bostadsområde på höjden med utsikt',
                pricePerM2: 1700,
                suitableFor: ['Investerare', 'Semesterboende'],
                pros: ['Havsutsikt', 'Moderna bostäder', 'Prisvärt'],
                cons: ['Kräver bil', 'En bit från stranden']
            }
        ],
        whySwedes: [
            'Det genuina Spanien – här upplever du det riktiga spanska vardagslivet.',
            'Klimatet – Águilas har statistiskt sett "bäst" väder på fastlandet vintertid.',
            'Prisnivån – du får betydligt mer för pengarna än i Nerja eller Marbella.',
            'Dykning och snorkling i världsklass runt Isla del Fraile.'
        ],
        notSuitableFor: [
            'Den som vill ha svenska köttbullar på varje meny och svensktalande personal.',
            'Dig som förlitar dig helt på kollektivtrafik för att ta dig till flygplatsen.',
            'Tonårsfamiljer som söker stora nattklubbar och internationell puls.'
        ],
        market: {
            priceChange5Year: 18.5,
            rentalYield: 5.8,
            touristLicenseAvailable: true,
            typicalPrices: {
                studio: { min: 70000, max: 100000 },
                twoRoom: { min: 110000, max: 180000 },
                threeRoom: { min: 150000, max: 280000 },
                townhouse: { min: 180000, max: 350000 },
                villa: { min: 280000, max: 800000 }
            }
        },
        climateComparison: [
            { month: 'Jan', areaTemp: 14, stockholmTemp: -2, difference: 16 },
            { month: 'Apr', areaTemp: 19, stockholmTemp: 5, difference: 14 },
            { month: 'Jul', areaTemp: 29, stockholmTemp: 18, difference: 11, seaTemp: 26 },
            { month: 'Okt', areaTemp: 23, stockholmTemp: 8, difference: 15 }
        ],
        practical: {
            flights: [{ from: 'Sverige', airline: 'Norwegian, SAS', frequency: 'Till ALC/RMU' }],
            airportTransfer: 'Hyrbil rekommenderas starkt. Transfer finns men är dyrt pga avståndet.',
            nieInfo: 'Söks hos Policia Nacional i Lorca eller Cartagena.',
            healthcare: 'Vårdcentral i centrum. Sjukhus i Lorca (25 min).',
            swedishServices: ['Inga specifika svenska tjänster på orten.']
        },
        faq: [
            { question: 'Är det dött på vintern?', answer: 'Nej, Águilas är en fungerande stad med 36 000 invånare, så butiker och restauranger är öppna året runt.' },
            { question: 'Hur är badvattnet?', answer: 'Fantastiskt. Águilas är känt för sina kristallklara vatten och rika marina liv.' }
        ],
        relatedAreas: ['mazarron', 'lorca', 'mojacar', 'pulpí'],
        galleryImages: []
    },
    {
        slug: 'cartagena',
        name: 'Cartagena',
        region: 'costa-calida',
        province: 'Murcia',
        propertyCount: 450,
        priceRange: { min: 120000, max: 1500000 },
        avgPrice: 280000,
        image: '/images/areas/cartagena-hero.png',
        description: 'En tusenårig hamnstad som blandar romersk historia med modernt stadsliv. Ett kulturellt alternativ för den som söker mer än bara sol och bad.',
        headline: 'Köp bostad i Cartagena – Historia i varje gathörn',
        metaDescription: 'Cartagena är en av Spaniens mest fascinerande städer. Romerska ruiner, marin historia och modern shopping vid havet. Perfekt för kulturintresserade livsnjutare.',
        keywords: ['köpa lägenhet cartagena', 'cartagena hamn', 'historisk stad spanien', 'kulturstad murcia'],
        coordinates: { lat: 37.6000, lng: -0.9833 },
        content: {
            intro: "Cartagena är en historisk hamnstad med 220 000 invånare som unikt kombinerar romerskt kulturarv med modernt stadsliv. För skandinaver som söker ett boende med kulturellt djup, året-runt-puls och närhet till havet är detta ett alltmer populärt val. Staden genomgår en omfattande gentrifiering liknande Málagas förvandling, vilket skapar möjligheter att förvärva både unika sekelskiftsvåningar i centrum och nyproduktion i de växande ytterområdena.",
            lifestyle: "Livet i Cartagena präglas av en levande stadskärna med avslappnad medelhavsrytm. Hamnpromenaden är stadens vardagsrum, och i det historiska Barrio del Carmen trängs tapasbarer med trendiga caféer. Här lever man utomhus året runt. Det kulturella utbudet är i världsklass med den romerska teatern som kronjuvelen. För den som vill ha en aktiv livsstil finns vandringsleder vid fästningarna och vattensporter i hamnen. Staden är inte en renodlad turistort, vilket ger en mer autentisk spansk vardag.",
            climate: "Tack vare sitt skyddade läge mellan bergen har Cartagena ett unikt mikroklimat. Med över 320 soldagar om året och vintrar som sällan går under 12 grader är det en av Europas soligaste platser. Somrarna dämpas av svalkande havsbrisar, vilket gör hettan mer behaglig än i inlandet.",
            attractions: "Den romerska teatern, upptäckts så sent som 1988, är ett måste. Arqua (marinarkeologiska museet) visar skatter från sjunkna skepp. En båttur i hamnen ger perspektiv på stadens marina historia. För badälskare ligger den vackra viken Cala Cortina bara några minuter bort, och naturparken Calblanque erbjuder orörda stränder en kort bilresa österut.",
            transport: "Cartagena har utmärkta förbindelser. Regionen Murcias flygplats (RMU) ligger bara 25 minuter bort, och Alicantes flygplats nås på drygt en timme. Motorvägen AP-7 binder samman staden med resten av kusten. Tåg- och bussstationen i centrum gör det enkelt att resa till Murcia stad eller Madrid utan bil.",
            propertyMarket: "Fastighetsmarknaden i Cartagena är i en spännande fas. Priserna är fortfarande betydligt lägre än i motsvarande städer på Costa Blanca. Här kan du hitta renoveringsobjekt i kulturminnesmärkta hus för under 200 000 €, eller moderna lyxlägenheter med havsutsikt. Uthyrningspotentialen är god året runt tack vare universitetet, turismen och den växande skaran digitala nomader.",
            buyingTips: "Ska du köpa i Casco Antiguo (Gamla stan)? Var noga med att kontrollera byggnadens skick och eventuella renoveringsrestriktioner. Många väljer nu området runt Alameda de San Antón för rymliga våningar, eller hamnnära nybyggen för bekvämlighet. Anlita alltid en oberoende advokat som kan stadsplaneringen här."
        },
        highlights: [
            { icon: "history", title: "Romerskt arv", description: "Teatern är unik" },
            { icon: "beach", title: "Stadsstränder", description: "Cala Cortina" },
            { icon: "sun", title: "Sol & Klimat", description: "Skyddat läge" },
            { icon: "food", title: "Matkultur", description: "Tapas & skaldjur" },
            { icon: "nature", title: "Naturhamn", description: "Mäktig insegling" }
        ],
        quickFacts: {
            population: { value: 220400, year: 2025, source: "INE" },
            foreignPercentage: { value: 12.5, source: "Regional statistik" },
            swedesEstimate: { value: 250, note: "Växande community" },
            airportDistance: { km: 30, minutes: 25, airport: "Murcia (RMU)" },
            directFlights: { airlines: ["Norwegian", "SAS"], frequencyPerWeek: 5, note: "Via Alicante" },
            pricePerM2: { value: 1850, source: "Idealista 2025", year: 2025 },
            sunshineHours: { value: 3200, note: "Över 320 dagar/år" },
            averageTemp: { annual: 19.5, january: 12, july: 27 }
        },
        districts: [
            {
                name: "Casco Antiguo", coordinates: { lat: 37.6000, lng: -0.9833 },
                character: "Historiska stadskärnan med gågator och torg",
                pricePerM2: 2100,
                suitableFor: ["Kulturälskare", "Stadsmänniskor"],
                pros: ["Gångavstånd till allt", "Unik arkitektur", "Pulserande uteliv"],
                cons: ["Kan vara högljutt", "Parkeringsbrist"]
            },
            {
                name: "Ensanche", coordinates: { lat: 37.6100, lng: -0.9900 },
                character: "Bredare boulevarder och statliga byggnader",
                pricePerM2: 1900,
                suitableFor: ["Familjer", "Året-runt-boende"],
                pros: ["Rymliga lägenheter", "Nära service", "Bra kommunikationer"],
                cons: ["Mindre historisk charm", "Stadstrafik"]
            },
            {
                name: "Cala Cortina / Hamnen", coordinates: { lat: 37.5900, lng: -0.9800 },
                character: "Exklusivt läge nära vattnet",
                pricePerM2: 2800,
                suitableFor: ["Livsnjutare", "Semesterboende"],
                pros: ["Havsutsikt", "Strandnära", "Modernt boende"],
                cons: ["Högre priser", "Begränsat utbud"]
            },
            {
                name: "Tentegorra", coordinates: { lat: 37.6150, lng: -1.0100 },
                character: "Grönskande villaområde i utkanten",
                pricePerM2: 1800,
                suitableFor: ["Barnfamiljer", "Naturälskare"],
                pros: ["Stora tomter", "Lugnt och grönt", "Nära naturpark"],
                cons: ["Kräver bil", "Längre från centrum"]
            }
        ],
        faq: [
            { question: "Är Cartagena tryggt?", answer: "Ja, mycket tryggt och välbevakat." },
            { question: "Avstånd till strand?", answer: "5-20 minuter beroende på val av strand." }
        ],
        whySwedes: [
            'Den unika mixen av storstadspuls och avslappnat strandliv.',
            'Det genuina "icke-turistiga" Spanien med lägre priser.',
            'Det fantastiska mikroklimatet som ger varma vintrar.',
            'Kulturen och historian – här finns alltid något nytt att upptäcka.'
        ],
        notSuitableFor: [
            'Dig som vill bo mitt i en svenskkoloni där alla pratar svenska.',
            'Den som söker nattklubbar och festande dygnet runt.',
            'Dig som vill ha all-inclusive och "resort-liv".'
        ],
        market: {
            priceChange5Year: 22.5,
            rentalYield: 6.8,
            touristLicenseAvailable: true,
            typicalPrices: {
                studio: { min: 80000, max: 120000 },
                twoRoom: { min: 130000, max: 220000 },
                threeRoom: { min: 190000, max: 350000 },
                townhouse: { min: 220000, max: 450000 },
                villa: { min: 400000, max: 1500000 }
            }
        },
        climateComparison: [
            { month: 'Jan', areaTemp: 13, stockholmTemp: -2, difference: 15 },
            { month: 'Apr', areaTemp: 18, stockholmTemp: 5, difference: 13 },
            { month: 'Jul', areaTemp: 28, stockholmTemp: 18, difference: 10, seaTemp: 26 },
            { month: 'Okt', areaTemp: 22, stockholmTemp: 8, difference: 14 }
        ],
        practical: {
            flights: [{ from: 'Sverige', airline: 'Norwegian, SAS', frequency: 'Via ALC' }],
            airportTransfer: 'Taxi från Murcia (RMU) ca 30-40€.',
            nieInfo: 'Söks på Policia Nacional i Cartagena.',
            healthcare: 'Hög standard, universitetssjukhuset Santa Lucía är nytt.',
            swedishServices: ['Facebook-grupper, konsulat i Torrevieja.']
        },
        comparison: [
            {
                area: 'Alicante',
                slug: 'alicante',
                pricePerM2: 2850,
                character: 'Större, mer turister',
                suitableFor: 'Storstadspuls'
            },
            {
                area: 'Torrevieja',
                slug: 'torrevieja',
                pricePerM2: 2600,
                character: 'Svenskfavorit, platt',
                suitableFor: 'Sol & Bad/Trygghet'
            }
        ],
        relatedAreas: ['la-manga', 'mar-de-cristal', 'mazarron', 'murcia'],
        galleryImages: [
            '/images/areas/cartagena-roman-theatre.png',
            '/images/areas/cartagena-hero.png'
        ]
    },
    {
        slug: 'mar-de-cristal',
        name: 'Mar de Cristal',
        region: 'costa-calida',
        province: 'Murcia',
        propertyCount: 60,
        priceRange: { min: 140000, max: 600000 },
        avgPrice: 255000,
        image: '/images/areas/mar-de-cristal.png',
        description: 'Kristallklart vatten och lugn atmosfär vid Mar Menor – perfekt för barnfamiljer och den som söker avkoppling.',
        headline: 'Köp bostad i Mar de Cristal – Mar Menors pärla',
        metaDescription: 'Mar de Cristal erbjuder lugnt boende vid Mar Menor. Känd för sitt klara vatten och fina strandpromenad. Nära La Manga Club golf.',
        keywords: ['köpa lägenhet mar de cristal', 'mar menor bostad', 'islas menores', 'calblanque'],
        coordinates: { lat: 37.6333, lng: -0.7333 },
        content: {
            intro: 'Mar de Cristal ("Kristallhavet") har fått sitt namn från det exceptionellt klara vattnet i denna del av Mar Menor. Det är en lugn, välplanerad urbanisation som är mycket populär bland barnfamiljer och pensionärer. Här finns en fin sandstrand med strandpromenad och området ligger strategiskt nära både den berömda golfen på La Manga Club och naturparken Calblanque.',
            lifestyle: 'Här råder en stillsam semesterkänsla. Dagarna spenderas på stranden, vid poolen eller på någon av de lokala restaurangerna. Det är inte ett partyområde, utan fokus ligger på livskvalitet, vattensport och umgänge. Padel och tennis är populärt på den lokala klubben.',
            climate: 'Skyddat läge vid Mar Menor som ofta är några grader varmare i vattnet än Medelhavet. Soligt och torrt. Perfekt för vindsurfing och segling året runt tack vare brisen.',
            attractions: 'Stranden är huvudattraktionen. Strandpromenaden binder samman området med Islas Menores. La Manga Club (5 min bort) erbjuder golf i världsklass. Calblanque (10 min) är en av regionens vackraste naturparker med orörda stränder.',
            transport: 'Bil är nästan ett måste för att ta sig runt. Murcia flygplats ligger ca 30 minuter bort och Alicante ca 60 minuter. Bussförbindelserna är säsongsberoende.',
            propertyMarket: 'Mar de Cristal har en blandning av äldre lägenheter nära stranden och nyproducerade moderna villor och radhus. Priserna har stigit på senare år tack vare nyproduktionen, men det är fortfarande prisvärt för att vara "first line".',
            buyingTips: 'Titta noga på "Communidad"-avgifterna. Om du köper för uthyrning är närheten till stranden avgörande. Området är mycket populärt juli-augusti, men lugnare på vintern.'
        },
        highlights: [
            { icon: 'droplets', title: 'Klart vatten', description: 'Finast i Mar Menor' },
            { icon: 'golf', title: 'Golfnära', description: '5 min till La Manga Club' },
            { icon: 'baby', title: 'Barnvänligt', description: 'Grund och säker strand' },
            { icon: 'tree', title: 'Natur', description: 'Nära Calblanque' }
        ],
        quickFacts: {
            population: { value: 1500, year: 2024, source: 'Estimat' },
            foreignPercentage: { value: 45, source: 'Lokal data' },
            swedesEstimate: { value: 80, note: 'Populärt semesterområde' },
            airportDistance: { km: 48, minutes: 35, airport: 'Murcia (RMU)' },
            pricePerM2: { value: 2400, source: 'Idealista 2025', year: 2025 },
            sunshineHours: { value: 3200 },
            averageTemp: { annual: 19, january: 13, july: 27 }
        },
        districts: [
            { name: 'Strandnära', coordinates: { lat: 37.6333, lng: -0.7333 }, character: 'Äldre lägenheter, bästa läget', pricePerM2: 2600, suitableFor: ['Semesterfirare'], pros: ['Utsikt', 'Nära bad'], cons: ['Äldre standard'] },
            { name: 'Villaområden', coordinates: { lat: 37.6300, lng: -0.7350 }, character: 'Nyproduktion och villor', pricePerM2: 2900, suitableFor: ['Året-runt', 'Lyxsökare'], pros: ['Hög standard', 'Privat pool'], cons: ['Längre från havet'] }
        ],
        whySwedes: [
            'Tryggheten och lugnet – perfekt för barnbarnen.',
            'Det varma vattnet i Mar Menor som förlänger badsäsongen.',
            'Närheten till golf och natur utan att bo mitt i smeten.',
            'Platt och lättillgängligt.'
        ],
        notSuitableFor: [
            'Tonåringar som vill ha nattklubbar (hänvisa till Cabo de Palos/La Manga).',
            'Den som vill ha stadspuls och shopping direkt utanför dörren.',
            'Dig som inte vill vara beroende av bil.'
        ],
        market: {
            priceChange5Year: 28.0,
            rentalYield: 6.2,
            touristLicenseAvailable: true,
            typicalPrices: { studio: { min: 90000, max: 130000 }, twoRoom: { min: 160000, max: 240000 }, threeRoom: { min: 220000, max: 350000 }, townhouse: { min: 280000, max: 450000 }, villa: { min: 450000, max: 950000 } }
        },
        climateComparison: [
            { month: 'Jan', areaTemp: 13, stockholmTemp: -2, difference: 15 },
            { month: 'Jul', areaTemp: 28, stockholmTemp: 18, difference: 10, seaTemp: 28 }
        ],
        practical: {
            flights: [{ from: 'Sverige', airline: 'Norwegian', frequency: 'Till ALC/RMU' }],
            airportTransfer: 'Hyrbil rekommenderas.',
            nieInfo: 'Cartagena.',
            healthcare: 'Vårdcentral i Los Belones (5 min).',
            swedishServices: ['Inga på plats.']
        },
        faq: [{ question: 'Långgrunt?', answer: 'Ja, mycket.' }],
        relatedAreas: ['la-manga', 'los-belones', 'cabo-de-palos', 'cartagena'],
        galleryImages: []
    },
    {
        slug: 'murcia',
        name: 'Murcia (Stad & Inland)',
        region: 'costa-calida',
        province: 'Murcia',
        propertyCount: 220,
        priceRange: { min: 90000, max: 800000 },
        avgPrice: 195000,
        image: '/images/areas/murcia.png',
        description: 'Barockprakt, tapas och universitetsliv i regionens huvudstad. En storstadsupplevelse med spanskt hjärta.',
        headline: 'Köp bostad i Murcia – Barockens och vårens stad',
        metaDescription: 'Murcia stad erbjuder storslagen arkitektur, fantastisk mat och levande torgliv. En universitetsstad full av historia. Upptäck inlandet.',
        keywords: ['köpa lägenhet murcia', 'murcia centrum', 'universitetsstad spanien', 'katedral murcia'],
        coordinates: { lat: 37.9838, lng: -1.1280 },
        content: {
            intro: 'Murcia är regionens huvudstad och Spaniens sjunde största stad. Det är en stad av barockkyrkor, vackra torg och ett vibrerande gatuliv. Här möts det traditionella "huerta"-livet (trädgårdsodlingarna) med modern storstadspuls. Murcia kallas ofta för "Europas trädgård" och är känd för sin vänliga befolkning och sin avslappnade livsstil.',
            lifestyle: 'Livsstilen är utpräglat social. Murcianerna älskar att vara ute. "Tapeo" (tapasrundor) betraktas närmast som en religion här, särskilt runt torgen Plaza de las Flores och Plaza Romea. Universitetsstaden ger liv och rörelse, men tempot är behagligare än i Madrid eller Barcelona. Här får du en genuin spansk vardag med färre turister.',
            climate: 'Klimatet är hett på sommaren (ofta 40°C+ i juli/augusti) men väldigt milt på vintern. Vår och höst är fantastiska. Det regnar sällan.',
            attractions: 'Katedralen vid Plaza Belluga med sin magnifika fasad. Real Casino de Murcia, en arkitektonisk pärla. Salzillo-museet. Den vackra flodpromenaden längs Segura. Djurparken Terra Natura ligger strax utanför.',
            transport: 'Murcia flygplats (RMU) ligger bara 20 minuter bort. Alicante flygplats ca 45-50 minuter. Utmärkta tågförbindelser (AVE höghastighetståg till Madrid finns nu). Spårvagn finns i staden.',
            propertyMarket: 'Murcia är otroligt prisvärt för att vara en storstad. Du kan hitta stora, fina våningar i centrum för priser som är omöjliga i Malaga eller Valencia. Norra förorterna (Altorreal, La Alcayna) är populära för villor och golfboende.',
            buyingTips: 'Juan Carlos I och Juan de Borbón är moderna avenyer med nyare lägenheter. Barrio del Carmen ("El Barrio") söder om floden har en mer bohemisk och traditionell känsla. Perfekt stad för dig som vill ha kultur och puls men inte behöver strand varje dag.'
        },
        highlights: [
            { icon: 'landmark', title: 'Katedralen', description: 'Barockmästerverk' },
            { icon: 'utensils', title: 'Tapas', description: 'Enormt utbud' },
            { icon: 'school', title: 'Universitet', description: 'Ung atmosfär' },
            { icon: 'sun', title: 'Värme', description: 'Soligast i landet' }
        ],
        quickFacts: {
            population: { value: 460000, year: 2024, source: 'INE' },
            foreignPercentage: { value: 14, source: 'INE' },
            swedesEstimate: { value: 100, note: 'Främst studenter/arbetande' },
            airportDistance: { km: 25, minutes: 20, airport: 'Murcia (RMU)' },
            pricePerM2: { value: 1350, source: 'Idealista 2025', year: 2025 },
            sunshineHours: { value: 3300 },
            averageTemp: { annual: 21, january: 11, july: 34 }
        },
        districts: [
            { name: 'Centrum (Catedral)', character: 'Historiskt, exklusivt', pricePerM2: 2500, suitableFor: ['Stadsmänniskor'], pros: ['Nära allt', 'Vackert'], cons: ['Dyrt', 'Parkering'] },
            { name: 'Zona Norte', coordinates: { lat: 38.0200, lng: -1.1300 }, character: 'Nytt, modernt, barnvänligt', pricePerM2: 1800, suitableFor: ['Familjer'], pros: ['Bra skolor', 'Rymligt'], cons: ['Längre till centrum'] }
        ],
        whySwedes: [
            'Den autentiska spanska storstadskänslan.',
            'Matkulturen – rankad som en av Spaniens bästa matstäder.',
            'Det extremt fördelaktiga prisläget.',
            'Närheten till både berg och hav (30-40 min).'
        ],
        notSuitableFor: [
            'De som inte tål stark värme (högsommaren är intensiv).',
            'Den som vill ha gångavstånd till stranden.',
            'Den som inte vill lära sig lite spanska (engelska fungerar sämre här än vid kusten).'
        ],
        market: {
            priceChange5Year: 14.5,
            rentalYield: 6.0,
            touristLicenseAvailable: true,
            typicalPrices: { studio: { min: 60000, max: 90000 }, twoRoom: { min: 100000, max: 160000 }, threeRoom: { min: 150000, max: 250000 }, townhouse: { min: 180000, max: 300000 }, villa: { min: 300000, max: 600000 } }
        },
        climateComparison: [
            { month: 'Jan', areaTemp: 12, stockholmTemp: -2, difference: 14 },
            { month: 'Jul', areaTemp: 34, stockholmTemp: 18, difference: 16 }
        ],
        practical: {
            flights: [{ from: 'Sverige', airline: 'Flera', frequency: 'Via ALC' }],
            airportTransfer: 'Buss/Taxi/Tåg.',
            nieInfo: 'Policia Nacional Murcia.',
            healthcare: 'Toppklass (Morales Meseguer m.fl.).',
            swedishServices: ['IKEA finns!']
        },
        faq: [{ question: 'Långt till havet?', answer: 'Ca 35-40 min med bil.' }],
        relatedAreas: ['cartagena', 'molina-de-segura', 'alcantarilla', 'torrevieja'],
        galleryImages: []
    },
    {
        slug: 'santiago-de-la-ribera',
        name: 'San Javier / Santiago de la Ribera',
        region: 'costa-calida',
        province: 'Murcia',
        propertyCount: 130,
        priceRange: { min: 110000, max: 650000 },
        avgPrice: 225000,
        image: '/images/areas/santiago-de-la-ribera.png',
        description: 'Klassisk badort med milslång strandpromenad, färja till La Manga och en rik flyghistoria.',
        headline: 'Köp bostad i Santiago de la Ribera – Vid Mar Menors strand',
        metaDescription: 'Santiago de la Ribera i San Javier kommun erbjuder klassiskt spanskt semesterliv. Lång strandpromenad, flygakademi och färja till La Manga.',
        keywords: ['köpa hus santiago de la ribera', 'san javier', 'flygakademi spanien', 'strandpromenad mar menor'],
        coordinates: { lat: 37.8000, lng: -0.8000 },
        content: {
            intro: 'Santiago de la Ribera är den kustnära delen av San Javier kommun. Det är en charmig, traditionell spansk badort som vuxit fram ur en gammal fiskeby. Staden är känd för sin fantastiska, palmkantade strandpromenad och som hemvist för spanska flygvapnets akademi ("General Air Academy"). Här blandas lokalbefolkning med turister i en avslappnad atmosfär.',
            lifestyle: 'Här lever man "Paseo-liv". Kvällspromenaden längs havet är helig. Området är levande året runt tack vare en stor bofast befolkning och studenterna från idrottsuniversitetet. Jazzfestivalen på sommaren sätter guldkant på tillvaron. Tempot är lugnare än på Costa Blanca.',
            climate: 'Mar Menors mikroklimat. Varmt, soligt och skyddat från höga vågor. Perfekt för vattensport och bad långt in på hösten.',
            attractions: 'Färjan "Busbåt" till La Manga är en klassiker. San Javier Jazz Festival (internationellt känd). Strandpromenaden Explanada Barnuevo. Flygmuseet. Dos Mares köpcentrum ligger nära.',
            transport: 'Murcia flygplats (RMU) 30 minuter. Alicante ca 50 min. AP-7 passerar precis utanför. Bussar går till Murcia och Cartagena.',
            propertyMarket: 'En intressant mix av objekt. Här finns charmiga äldre "fiskarhus" på markplan, 70-talslägenheter nära havet och helt nya, moderna villakvarter som växer fram mellan stranden och San Javier stad. Prisvärt jämfört med nyproduktion på andra orter.',
            buyingTips: 'Området "San Blas" är populärt friluftsområde. Nyproduktionen erbjuder hög standard. Var medveten om att flygplanen från akademin (Patrulla Águila - Spaniens "Blue Angels") övar här, vilket kan höras, men många ser det som en gratis flyguppvisning.'
        },
        highlights: [
            { icon: 'plane', title: 'Flygtradition', description: 'Militärakademi' },
            { icon: 'music', title: 'Jazzfestival', description: 'Juli varje år' },
            { icon: 'walk', title: 'Promenad', description: '4 km längs havet' },
            { icon: 'ship', title: 'Färja', description: 'Till La Manga' }
        ],
        quickFacts: {
            population: { value: 34500, year: 2024, source: 'INE' },
            foreignPercentage: { value: 22, source: 'INE' },
            swedesEstimate: { value: 300, note: 'Spridda i området' },
            airportDistance: { km: 35, minutes: 30, airport: 'Murcia (RMU)' },
            pricePerM2: { value: 1600, source: 'Idealista 2025', year: 2025 },
            sunshineHours: { value: 3200 },
            averageTemp: { annual: 19, january: 12, july: 27 }
        },
        districts: [
            { name: 'Ribera - Stranden', coordinates: { lat: 37.8000, lng: -0.8000 }, character: 'Turistigt, äldre bebyggelse', pricePerM2: 2200, suitableFor: ['Semester'], pros: ['Läget'], cons: ['Parkering'] },
            { name: 'San Javier - Stad', coordinates: { lat: 37.8060, lng: -0.8350 }, character: 'Vardagsliv, service', pricePerM2: 1300, suitableFor: ['Året-runt'], pros: ['Billigare', 'Service'], cons: ['Ej havsnära'] }
        ],
        whySwedes: [
            'Den genuina småstadskänslan vid havet.',
            'Det lugna vattnet som passar alla åldrar.',
            'Närheten till Dos Mares shopping.',
            'De platta omgivningarna (bra för cykel).'
        ],
        notSuitableFor: [
            'Den som är extremt ljudkänslig (pga flygövningar vissa tider).',
            'Den som vill ha vågsurfing (vattnet är platt).',
            'Den som vill ha lyxig "Marbella-vibe".'
        ],
        market: {
            priceChange5Year: 16.0,
            rentalYield: 5.5,
            touristLicenseAvailable: true,
            typicalPrices: { studio: { min: 70000, max: 100000 }, twoRoom: { min: 110000, max: 170000 }, threeRoom: { min: 140000, max: 250000 }, townhouse: { min: 180000, max: 350000 }, villa: { min: 350000, max: 650000 } }
        },
        climateComparison: [
            { month: 'Jan', areaTemp: 13, stockholmTemp: -2, difference: 15 },
            { month: 'Jul', areaTemp: 27, stockholmTemp: 18, difference: 9 }
        ],
        practical: {
            flights: [{ from: 'Sverige', airline: 'Norwegian', frequency: 'Till ALC/RMU' }],
            airportTransfer: 'Taxi/Buss.',
            nieInfo: 'San Javier Policia.',
            healthcare: 'Hospital Los Arcos (nytt, stort).',
            swedishServices: ['Inga specifika.']
        },
        faq: [{ question: 'Låter flygen?', answer: 'Ja, under övningstid på dagarna.' }],
        relatedAreas: ['san-pedro-del-pinatar', 'los-alcazares', 'lo-pagan', 'pilar-de-la-horadada'],
        galleryImages: []
    },
    {
        slug: 'san-pedro-del-pinatar',
        name: 'San Pedro del Pinatar / Lo Pagán',
        region: 'costa-calida',
        province: 'Murcia',
        propertyCount: 140,
        priceRange: { min: 100000, max: 550000 },
        avgPrice: 205000,
        image: '/images/areas/san-pedro-del-pinatar.png',
        description: 'Hälsocenter utomhus – berömda lerbad, saltsjöar och flamingos i unik naturmiljö.',
        headline: 'Köp bostad i San Pedro – Hälsa och natur',
        metaDescription: 'San Pedro del Pinatar och Lo Pagán är kända för sina hälsobringande lerbad och saliner. Unik natur med flamingos. Hitta ditt hälsosamma boende.',
        keywords: ['köpa hus san pedro del pinatar', 'lo pagan lerbad', 'salinas murcia', 'flamingos spanien'],
        coordinates: { lat: 37.8333, lng: -0.7833 },
        content: {
            intro: 'San Pedro del Pinatar ligger längst norrut i Mar Menor, precis vid gränsen till Costa Blanca. Området är uppdelat i själva staden San Pedro (inåt land) och kustområdet Lo Pagán. Platsen är känd i hela Europa för sina terapeutiska lerbad i saltlagunerna (Las Charcas) och naturparken Salinas y Arenales där flamingos strövar fritt. Här möts två hav: Mar Menor och Medelhavet.',
            lifestyle: 'Livsstilen är aktiv och hälsofokuserad. Många cyklar eller promenerar längs de sju kilometerna ut på piren och sanddynorna. Lerbaden lockar folk som vill lindra värk och hudbesvär. Lo Pagán har en livlig tivoli-känsla på sommaren, medan San Pedro stad är mer vardagsspansk.',
            climate: 'Mycket hälsosamt mikroklimat pga den höga salthalten och joden i luften. Rekommenderas ofta för reumatiker och astmatiker.',
            attractions: 'Lerbaden (gratis!). Naturparken med saliner. Marina de las Salinas. Stranden vid Medelhavet (El Mojón/Torre Derribada) som är helt naturlig. Flamingos!',
            transport: 'Murcia flygplats 30 min, Alicante 45-50 min. Smidigt att ta sig hit via N-332 eller AP-7.',
            propertyMarket: 'Området expanderar kraftigt. Det byggs mycket nytt (moderna radhus och villor) i området mellan stadskärnan och Lo Pagán. Här får du en modern nyproduktion för ca 250-300 000 €, vilket är svårt att hitta norrut på Costa Blanca. Äldre semesterlägenheter i Lo Pagán är billigare.',
            buyingTips: 'Lo Pagán kan vara väldigt intensivt i augusti. Vill du ha lugn o ro, titta på nyproduktionen mot El Mojón-hållet eller inne i San Pedro.'
        },
        highlights: [
            { icon: 'activity', title: 'Lerbad', description: 'Gratis spa' },
            { icon: 'bird', title: 'Flamingos', description: 'Unik natur' },
            { icon: 'droplets', title: 'Två hav', description: 'Mar Menor & Medelhavet' },
            { icon: 'sun', title: 'Hälsa', description: 'Jodrik luft' }
        ],
        quickFacts: {
            population: { value: 27700, year: 2024, source: 'INE' },
            foreignPercentage: { value: 24, source: 'INE' },
            swedesEstimate: { value: 200, note: 'Många hälsoturister' },
            airportDistance: { km: 40, minutes: 35, airport: 'Murcia (RMU)' },
            pricePerM2: { value: 1750, source: 'Idealista 2025', year: 2025 },
            sunshineHours: { value: 3200 },
            averageTemp: { annual: 19, january: 12, july: 27 }
        },
        districts: [
            { name: 'Lo Pagán', coordinates: { lat: 37.8200, lng: -0.7800 }, character: 'Turistpuls, strandnära', pricePerM2: 2100, suitableFor: ['Semester'], pros: ['Nära havet'], cons: ['Sommarträngsel'] },
            { name: 'San Pedro Stad', coordinates: { lat: 37.8350, lng: -0.7900 }, character: 'Vardag, service, lugnare', pricePerM2: 1500, suitableFor: ['Året-runt'], pros: ['Service', 'Öppet'], cons: ['Bit till stranden'] }
        ],
        whySwedes: [
            'Hälsoaspekten – lerbad och saltluft.',
            'Närheten till Alicante flygplats (under timmen).',
            'Den flacka terrängen som är perfekt för promenader och cykel.',
            'Möjligheten att bada i två olika hav.'
        ],
        notSuitableFor: [
            'Den som vill ha klippbad och höga berg direkt inpå.',
            'Den som störs av "doften" från lerbaden (svavel) vissa vindstilla dagar.',
            'Den som söker en renodlad svenskkoloni.'
        ],
        market: {
            priceChange5Year: 24.0,
            rentalYield: 6.5,
            touristLicenseAvailable: true,
            typicalPrices: { studio: { min: 65000, max: 95000 }, twoRoom: { min: 105000, max: 160000 }, threeRoom: { min: 150000, max: 260000 }, townhouse: { min: 230000, max: 350000 }, villa: { min: 350000, max: 700000 } }
        },
        climateComparison: [
            { month: 'Jan', areaTemp: 13, stockholmTemp: -2, difference: 15 },
            { month: 'Jul', areaTemp: 28, stockholmTemp: 18, difference: 10 }
        ],
        practical: {
            flights: [{ from: 'Sverige', airline: 'Norwegian', frequency: 'Till ALC/RMU' }],
            airportTransfer: 'Taxi/Buss.',
            nieInfo: 'San Javier.',
            healthcare: 'Vårdcentral + Los Arcos.',
            swedishServices: ['Nära till Torrevieja (20 min).']
        },
        faq: [{ question: 'Kostar lerbaden?', answer: 'Nej, de i lagunen är gratis.' }],
        relatedAreas: ['pilar-de-la-horadada', 'santiago-de-la-ribera', 'mil-palmeras', 'torre-de-la-horadada'],
        galleryImages: []
    },
    {
        slug: 'torre-pacheco',
        name: 'Torre Pacheco',
        region: 'costa-calida',
        province: 'Murcia',
        propertyCount: 95,
        priceRange: { min: 80000, max: 400000 },
        avgPrice: 165000,
        image: '/images/areas/torre-pacheco.png',
        description: 'Golfdistriktet nummer ett – navet för flera stora golfresorter i inlandet, inklusive Santa Rosalia.',
        headline: 'Köp bostad i Torre Pacheco – Golfarens och livsnjutarens paradis',
        metaDescription: 'Torre Pacheco är centrum för golf på Costa Cálida med flera resorter som Mar Menor Golf och Santa Rosalia. Prisvärt inlandsboende nära kusten.',
        keywords: ['köpa lägenhet torre pacheco', 'santa rosalia lake', 'mar menor golf', 'polaris world'],
        coordinates: { lat: 37.7417, lng: -0.9611 },
        content: {
            intro: 'Torre Pacheco är en kommun i inlandet, ca 15 minuter från havet, som blivit regionens golfcentrum. Själva staden är en typisk spansk jordbruksstad, men runt omkring ligger flera stora, internationella resorter: Mar Menor Golf, La Torre Golf, El Valle Golf och den senaste succén: Santa Rosalia Lake and Life Resort. Här bor du i en grindad, grön miljö med hög säkerhet och service.',
            lifestyle: 'Här handlar det om det goda livet: golf, padel, simning och avkoppling. Livet på resorterna är bekvämt, rent och tryggt. Santa Rosalia erbjuder en unik livsstil runt Europas största konstgjorda lagun. I Torre Pacheco stad (utanför grindarna) hittar du det genuina, mångkulturella Spanien och billigare shopping.',
            climate: 'Inlandsklimat som är något varmare än kusten på sommaren och någon grad kallare på vinternnätterna. Mycket soligt.',
            attractions: 'Golfbanorna är huvudattraktionen! Santa Rosalias lagun (kristallklart vatten med beach clubs). Ifepa-mässhallen. Väderkvarnarna i landskapet. Närheten till Cartagena och Murcia stad.',
            transport: 'Murcia flygplats ligger strategiskt nära, ca 20 minuter. Till stränderna i Los Alcázares tar det 10-15 minuter med bil. Bil är nödvändigt här.',
            propertyMarket: 'Marknaden är tvådelad: 1) Äldre resorter (Polaris World) där du kan göra otroliga fynd på lägenheter (från ca 90 000 €). 2) Santa Rosalia och nyproduktion, där priserna är betydligt högre och standarden är premium. Generellt får du mycket mer yta och lyx för pengarna här än vid kusten.',
            buyingTips: 'Santa Rosalia är "hett" just nu. Vill du ha en investering med potential är det rätt ställe. Vill du ha semesterboende billigt? Titta på La Torre eller Mar Menor Golf. Kolla alltid vad som ingår i "Community fees" (avgiften till samfälligheten) då den kan vara högre på resorter.'
        },
        highlights: [
            { icon: 'golf', title: 'Golfmekka', description: 'Jack Nicklaus-banor' },
            { icon: 'water', title: 'Lagunen', description: 'Unik i Europa' },
            { icon: 'euro', title: 'Prisvärt', description: 'Mycket hus för pengarna' },
            { icon: 'shield', title: 'Trygghet', description: 'Gated communities' }
        ],
        quickFacts: {
            population: { value: 38000, year: 2024, source: 'INE' },
            foreignPercentage: { value: 30, source: 'INE' },
            swedesEstimate: { value: 200, note: 'Många golfare' },
            airportDistance: { km: 20, minutes: 20, airport: 'Murcia (RMU)' },
            pricePerM2: { value: 1400, source: 'Blandat snitt 2025', year: 2025 },
            sunshineHours: { value: 3300 },
            averageTemp: { annual: 19, january: 10, july: 28 }
        },
        districts: [
            { name: 'Santa Rosalia', coordinates: { lat: 37.7600, lng: -0.9000 }, character: 'Exklusivt, lagun, nytt', pricePerM2: 3000, suitableFor: ['Investerare', 'Lyxsökare'], pros: [' unikt', 'Modernt'], cons: ['Dyrare'] },
            { name: 'Mar Menor Golf', coordinates: { lat: 37.7300, lng: -0.9200 }, character: 'Etablerat, nära stad', pricePerM2: 1800, suitableFor: ['Golfare'], pros: ['Välskött', 'Nära service'], cons: ['Äldre hus'] },
            { name: 'La Torre', coordinates: { lat: 37.8000, lng: -0.9800 }, character: 'Prisvärt, lugnt', pricePerM2: 1200, suitableFor: ['Semester', 'Budget'], pros: ['Billigt'], cons: ['Lite ödsligt ibland'] }
        ],
        whySwedes: [
            'Golfmöjligheterna året runt.',
            'Säkerheten i "Gated Communities".',
            'Santa Rosalia – känslan av Karibien mitt i Europa.',
            'Prislappen – mycket lägre än "frontline golf" på Costa del Sol.'
        ],
        notSuitableFor: [
            'Den som vill ha gångavstånd till havet (kräver bil).',
            'Den som vill ha stadspuls utanför dörren (resorterna är isolerade oaser).',
            'Den som inte gillar att köra bil.'
        ],
        market: {
            priceChange5Year: 12.0,
            rentalYield: 6.0,
            touristLicenseAvailable: true,
            typicalPrices: { studio: { min: 70000, max: 100000 }, twoRoom: { min: 90000, max: 150000 }, threeRoom: { min: 140000, max: 250000 }, townhouse: { min: 160000, max: 300000 }, villa: { min: 250000, max: 800000 } }
        },
        climateComparison: [
            { month: 'Jan', areaTemp: 11, stockholmTemp: -2, difference: 13 },
            { month: 'Jul', areaTemp: 29, stockholmTemp: 18, difference: 11 }
        ],
        practical: {
            flights: [{ from: 'Sverige', airline: 'Norwegian', frequency: 'Till ALC/RMU' }],
            airportTransfer: 'Hyrbil nödvändigt.',
            nieInfo: 'Policia T-P.',
            healthcare: 'Los Arcos (15 min).',
            swedishServices: ['Golfproffs finns ofta.']
        },
        faq: [{ question: 'Får man bada i lagunen?', answer: 'Ja, i Santa Rosalia.' }],
        relatedAreas: ['los-alcazares', 'cartagena', 'murcia', 'mar-menor'],
        galleryImages: []
    }
];
