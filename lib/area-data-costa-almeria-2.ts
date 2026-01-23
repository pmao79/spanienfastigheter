
import { AreaDetail } from '@/types/property';

export const COSTA_ALMERIA_AREAS_2: AreaDetail[] = [
    {
        slug: 'almerimar',
        name: 'Almerimar',
        region: 'costa-almeria',
        province: 'Almería',
        propertyCount: 140,
        priceRange: { min: 110000, max: 650000 },
        avgPrice: 225000,
        image: '/images/areas/almerimar.png',
        description: 'Modern marina-resort med golf, långa stränder och aktiv livsstil. En oas av palmer och båtar.',
        headline: 'Köp bostad i Almerimar – Sol, Golf och Segling',
        metaDescription: 'Almerimar erbjuder en av Spaniens största marinor, 27-håls golfbana och milslånga stränder. Ett modernt och tryggt resortliv nära naturen.',
        keywords: ['köpa lägenhet almerimar', 'almerimar golf', 'marina almeria', 'punta entinas'],
        coordinates: { lat: 36.6972, lng: -2.7931 },
        content: {
            intro: 'Almerimar är en unik "oas" i det annars torra landskapet väster om Almería. Det är en specialbyggd resortstad (byggd på 70-taket och framåt) som kretsar kring en av Spaniens största sporthamnar och en 27-håls golfbana. Här är allt grönt, välskött och rymligt. Arkitekturen är enhetlig och lågmäld, vilket ger en harmonisk känsla.',
            lifestyle: 'Livet här är aktivt och utomhusorienterat. "Paseon" runt hamnen är den sociala medelpunkten med massor av restauranger och caféer. Många cyklar eller joggar i naturreservatet Punta Entinas-Sabinar som ligger granne. Det bor många skandinaver och britter här året runt, vilket ger en internationell men lugn atmosfär.',
            climate: 'Almerimar har flest soltimmar i hela Europa. Det regnar nästan aldrig. Det blåser ofta en frisk bris (Poniente) vilket håller luften ren och gör hettan dräglig på sommaren. Surfare älskar det!',
            attractions: 'Marinan (c:a 1100 platser). Gary Player-golfbanan. Naturreservatet med flamingos och sanddyner. Stranden som sträcker sig miltals österut.',
            transport: 'Almería flygplats ca 35-40 min. Málaga flygplats ca 2 timmar. Bil behövs för storhandling (Lidl/Mercadona finns i byn men större i El Ejido 10 min bort).',
            propertyMarket: 'Mycket prisvärt jämfört med Costa del Sol. Du kan få en lägenhet med 2 sovrum och havsutsikt i hamnen för under 150 000 €. Villorna runt golfbanan är stora och prisvärda. Hyresmarknaden är stark, både för semester och långtid.',
            buyingTips: 'Titta på väderstrecken – balkong mot syd-väst ger fantastiska solnedgångar över bergen. Puerto Marina är "centrum", medan Alta Entinas är lugnare och närmare naturreservatet.'
        },
        highlights: [
            { icon: 'anchor', title: 'Marina', description: 'Enorm & levande' },
            { icon: 'golf', title: 'Golf', description: '27 hål i byn' },
            { icon: 'wind', title: 'Vind', description: 'Surfingparadis' },
            { icon: 'sun', title: 'Solsäkrast', description: 'Flest timmar i EU' }
        ],
        quickFacts: {
            population: { value: 10500, year: 2024, source: 'INE Estimat' },
            foreignPercentage: { value: 35, source: 'Lokal data' },
            swedesEstimate: { value: 400, note: 'Populärt vinterboende' },
            airportDistance: { km: 55, minutes: 40, airport: 'Almería (LEI)' },
            pricePerM2: { value: 1950, source: 'Idealista 2025', year: 2025 },
            sunshineHours: { value: 3400 },
            averageTemp: { annual: 20, january: 14, july: 27 }
        },
        districts: [
            { name: 'Puerto Marina', coordinates: { lat: 36.6970, lng: -2.7930 }, character: 'Puls, restauranger, båtar', pricePerM2: 2100, suitableFor: ['Livsnjutare'], pros: ['Nära allt', 'Utsikt'], cons: ['Kan va högljutt'] },
            { name: 'Alta Entinas', coordinates: { lat: 36.7050, lng: -2.7800 }, character: 'Lugnt, nära naturreservat', pricePerM2: 1800, suitableFor: ['Naturvänner'], pros: ['Tyst', 'Nära strand'], cons: ['Längre till centrum'] },
            { name: 'Golfområdet', coordinates: { lat: 36.7000, lng: -2.8000 }, character: 'Villor och radhus, grönt', pricePerM2: 2400, suitableFor: ['Familjer', 'Golfare'], pros: ['Rymligt', 'Pooler'], cons: ['Kräver bil/cykel'] }
        ],
        whySwedes: [
            'Solsäkerheten – här lyser solen när det regnar i Málaga.',
            'Det platta, lättillgängliga landskapet (perfekt för cykel).',
            'Den avslappnade "resort-känslan" utan att det känns instängt.',
            'Priserna – mycket hög standard för pengarna.'
        ],
        notSuitableFor: [
            'Den som hatar vind (det blåser ofta här).',
            'Den som vill ha historiska gränder och gamla kyrkor (allt är nytt).',
            'Den som vill ha nattklubbar och fest till 06.00.'
        ],
        market: {
            priceChange5Year: 18.0,
            rentalYield: 6.5,
            touristLicenseAvailable: true,
            typicalPrices: { studio: { min: 80000, max: 110000 }, twoRoom: { min: 125000, max: 190000 }, threeRoom: { min: 160000, max: 280000 }, townhouse: { min: 220000, max: 350000 }, villa: { min: 450000, max: 900000 } }
        },
        climateComparison: [
            { month: 'Jan', areaTemp: 14, stockholmTemp: -2, difference: 16 },
            { month: 'Jul', areaTemp: 27, stockholmTemp: 18, difference: 9, seaTemp: 24 }
        ],
        practical: {
            flights: [{ from: 'Sverige', airline: 'Norwegian', frequency: 'Till ALC/AGP' }],
            airportTransfer: 'Hyrbil nödvändigt.',
            nieInfo: 'El Ejido Policia.',
            healthcare: 'Vårdcentral i byn, sjukhus i El Ejido (15 min).',
            swedishServices: ['Svenska mäklare finns.']
        },
        faq: [
            { question: 'Blåser det alltid?', answer: 'Ofta, men det gör sommaren behaglig.' },
            { question: 'Finns mygg?', answer: 'Ibland, pga naturreservatets våtmarker.' }
        ],
        relatedAreas: ['roquetas-de-mar', 'aguadulce', 'almeria', 'adra'],
        galleryImages: []
    },
    {
        slug: 'cuevas-del-almanzora',
        name: 'Cuevas del Almanzora',
        region: 'costa-almeria',
        province: 'Almería',
        propertyCount: 85,
        priceRange: { min: 70000, max: 450000 },
        avgPrice: 165000,
        image: '/images/areas/cuevas-del-almanzora.png',
        description: 'Historisk stad med grottbostäder och mästerskapsgolf i unik ökenmiljö.',
        headline: 'Köp bostad i Cuevas – Historia och Unik Golf',
        metaDescription: 'Cuevas del Almanzora erbjuder unika grottbostäder, historiska slott och Desert Springs Golf Resort. Ett annorlunda och spännande Spanien.',
        keywords: ['köpa grottbostad spanien', 'desert springs golf', 'cuevas del almanzora', 'lantligt boende'],
        coordinates: { lat: 37.2972, lng: -1.8817 },
        content: {
            intro: 'Cuevas del Almanzora är en fascinerande historisk stad i Almanzora-dalen. Den är känd för sitt rika arv från silvergruvbranschen på 1800-talet, vilket syns i de vackra palatsen. Men mest känd är staden för sina bebodda grottor (Cuevas) och det exklusiva "Desert Springs Resort", Europas enda golfbana i ökenstil. Här möts gammalt och hypermodernt.',
            lifestyle: 'Här väljer du antingen det genuina, spanska bylivet (kanske i en grotta!) eller det exklusiva klubblivet på Desert Springs. Det är lugnt, lantligt och mycket solsäkert. Perfekt för den som vill komma bort från kusten men ändå ha nära till havet (15 min).',
            climate: 'Torrt, varmt ökenklimat. Vintrarna är milda och soliga.',
            attractions: 'Desert Springs Golf (världsklass). Grottmuseet. Slottet Chateau del Marques de los Velez. Lunar Cable Park (wakeboard). Badsjön Embalse de Cuevas.',
            transport: 'Almería flygplats 60 min. Murcia 1h 15 min. Bil är ett absolut måste.',
            propertyMarket: 'Mycket varierad. Du kan köpa en orenoverad grotta för 30 000 €, en färdig för 90 000 €, eller en lyxvilla på golfbanan för 500 000 €. Prisvärt och unikt.',
            buyingTips: 'Desert Springs har höga community fees men erbjuder en livsstil i toppklass (Cricket club, exklusiva restauranger). Grottboende är klimatsmart – svalt på sommaren, varmt på vintern!'
        },
        highlights: [
            { icon: 'cave', title: 'Grottor', description: 'Unikt boende' },
            { icon: 'golf', title: 'Desert Springs', description: 'Arizona-stil' },
            { icon: 'history', title: 'Historia', description: 'Palats & Slott' },
            { icon: 'sun', title: 'Öken', description: 'Vilda västern' }
        ],
        quickFacts: {
            population: { value: 15000, year: 2024, source: 'INE' },
            foreignPercentage: { value: 25, source: 'INE' },
            swedesEstimate: { value: 50, note: 'Villaägare/Golfare' },
            airportDistance: { km: 90, minutes: 60, airport: 'Almería (LEI)' },
            pricePerM2: { value: 1400, source: 'Snitt 2025', year: 2025 },
            sunshineHours: { value: 3350 },
            averageTemp: { annual: 20, january: 12, july: 29 }
        },
        districts: [
            { name: 'Desert Springs', coordinates: { lat: 37.2600, lng: -1.8600 }, character: 'Lyxresort, golf, gated', pricePerM2: 2800, suitableFor: ['Golfare', 'Lyxsökare'], pros: ['Världsklass', 'Säkerhet'], cons: ['Dyrt', 'Isolerat'] },
            { name: 'Centrum / Grottorna', coordinates: { lat: 37.3000, lng: -1.8800 }, character: 'Historiskt, enkelt', pricePerM2: 1100, suitableFor: ['Bohemer', 'Historiker'], pros: ['Billigt', 'Unikt'], cons: ['Renoveringsbehov'] },
            { name: 'Villaricos', coordinates: { lat: 37.2400, lng: -1.7700 }, character: 'Fiskeby vid kusten (kommunen)', pricePerM2: 1900, suitableFor: ['Semester'], pros: ['Vid havet', 'Charmigt'], cons: ['Litet'] }
        ],
        whySwedes: [
            'Desert Springs – för den seriösa golfaren som vill ha något annat än "parkbanor".',
            'Möjligheten att äga en unik grottbostad (kul samtalssmne!).',
            'Det dramatiska, vackra landskapet.',
            'Närheten till orörda stränder men boende i lugnet.'
        ],
        notSuitableFor: [
            'Den som vill ha gröna gräsmattor (det är öken).',
            'Den som vill ha gångavstånd till strandbarer (från inlandet).',
            'Den som är mörkrädd (landsbygden är mörk om natten).'
        ],
        market: {
            priceChange5Year: 12.0,
            rentalYield: 5.0,
            touristLicenseAvailable: true,
            typicalPrices: { studio: { min: 40000, max: 70000 }, twoRoom: { min: 70000, max: 150000 }, threeRoom: { min: 90000, max: 200000 }, townhouse: { min: 120000, max: 250000 }, villa: { min: 250000, max: 800000 } }
        },
        climateComparison: [
            { month: 'Jan', areaTemp: 12, stockholmTemp: -2, difference: 14 },
            { month: 'Jul', areaTemp: 30, stockholmTemp: 18, difference: 12 }
        ],
        practical: {
            flights: [{ from: 'Sverige', airline: 'Norwegian', frequency: 'Till ALC/AGP' }],
            airportTransfer: 'Hyrbil.',
            nieInfo: 'Vera eller Albox.',
            healthcare: 'Vårdcentral i Cuevas, Sjukhus i Huercal-Overa (15 min).',
            swedishServices: ['Inga.']
        },
        faq: [
            { question: 'Är grottorna fuktiga?', answer: 'Nej, i detta torra klimat är de perfekta.' },
            { question: 'Hur är vägen till havet?', answer: 'Bra, ca 10-15 min till Villaricos.' }
        ],
        relatedAreas: ['vera', 'palomares', 'mojacar', 'garrucha'],
        galleryImages: []
    },
    {
        slug: 'palomares',
        name: 'Palomares',
        region: 'costa-almeria',
        province: 'Almería',
        propertyCount: 65,
        priceRange: { min: 80000, max: 250000 },
        avgPrice: 145000,
        image: '/images/areas/palomares.png',
        description: 'Liten kustby med låga priser och lugn atmosfär. Mycket prisvärt nära havet.',
        headline: 'Köp bostad i Palomares – Kustens Prispressare',
        metaDescription: 'Palomares är en fridfull spansk by nära havet. Känd för låga fastighetspriser och lugn atmosfär. Perfekt för budgetköp på kusten.',
        keywords: ['köpa lägenhet palomares', 'billigt boende spanien', 'costa almeria budget', 'strandnära'],
        coordinates: { lat: 37.2478, lng: -1.7972 },
        content: {
            intro: 'Palomares är en "vanlig" spansk by som råkar ligga 800 meter från havet. Det är inte en uppbyggd turistort utan en levande by med jordbrukstradition. Området blev känt för sina mycket billiga bostäder efter finanskrisen, och än idag är det en av de billigaste platserna på kusten att köpa en modern lägenhet nära stranden.',
            lifestyle: 'Väldigt lugnt och prestigelöst. Här bor man för att det är enkelt och billigt. Man cyklar till stranden, handlar i den lokala butiken och tar en kaffe på torget. Många pensionärer från norra Europa trivs här.',
            climate: 'Varmt och soligt. Skugga av träden på stranden Quitapellejos är skönt på sommaren.',
            attractions: 'Stranden Playa de Quitapellejos (med fin tallskog). Närheten till Vera Water Park (5 min). Golfbanan Desert Springs (5 min).',
            transport: 'Almería flygplats 55 min. Bil är bra att ha, men cykel funkar lokalt.',
            propertyMarket: 'Oslagbara priser. 2 sovrum med terrass för under 100 000 € är standard. Radhus med takterrass för 140 000 €. Stor efterfrågan på långtidshyra.',
            buyingTips: 'Kolla exakt läge – vissa urbanisationer ligger en bit från bykärnan. Perfekt "instegs-köp" för den med mindre budget.'
        },
        highlights: [
            { icon: 'euro', title: 'Billigt', description: 'Kustens bästa priser' },
            { icon: 'moon', title: 'Lugnt', description: 'Ingen massturism' },
            { icon: 'tree', title: 'Tallskog', description: 'Unik strandmiljö' },
            { icon: 'map', title: 'Läge', description: 'Nära Vera & Mojacar' }
        ],
        quickFacts: {
            population: { value: 1800, year: 2024, source: 'Estimat' },
            foreignPercentage: { value: 40, source: 'Lokal data' },
            swedesEstimate: { value: 60, note: 'Budgetsmarta' },
            airportDistance: { km: 85, minutes: 55, airport: 'Almería (LEI)' },
            pricePerM2: { value: 1300, source: 'Idealista 2025', year: 2025 },
            sunshineHours: { value: 3300 },
            averageTemp: { annual: 20, january: 13, july: 28 }
        },
        districts: [
            { name: 'Palomares Beach', coordinates: { lat: 37.2400, lng: -1.7900 }, character: 'Nyare komplex närmare havet', pricePerM2: 1500, suitableFor: ['Semester'], pros: ['Moderna', 'Pooler'], cons: ['Lite ödsligt vintertid'] },
            { name: 'Byn', coordinates: { lat: 37.2500, lng: -1.8000 }, character: 'Äldre hus, service', pricePerM2: 1100, suitableFor: ['Året-runt'], pros: ['Nära butik', 'Levande'], cons: ['Längre till hav'] }
        ],
        whySwedes: [
            'Prislappen – här kan man köpa utan att belåna huset hemma.',
            'Lugnet – ingen stress, ingen trängsel.',
            'Den fina stranden med sin skuggande tallskog.'
        ],
        notSuitableFor: [
            'Den som vill ha shoppinggator och märkesbutiker.',
            'Den som vill ha havsutsikt från första linjen (byn ligger lite indraget).',
            'Ungdomar (här händer inget på kvällarna).'
        ],
        market: {
            priceChange5Year: 15.0,
            rentalYield: 5.5,
            touristLicenseAvailable: true,
            typicalPrices: { studio: { min: 50000, max: 70000 }, twoRoom: { min: 75000, max: 110000 }, threeRoom: { min: 110000, max: 160000 }, townhouse: { min: 130000, max: 190000 }, villa: { min: 200000, max: 350000 } }
        },
        climateComparison: [
            { month: 'Jan', areaTemp: 13, stockholmTemp: -2, difference: 15 },
            { month: 'Jul', areaTemp: 29, stockholmTemp: 18, difference: 11 }
        ],
        practical: {
            flights: [{ from: 'Sverige', airline: 'Norwegian', frequency: 'Till ALC/AGP' }],
            airportTransfer: 'Hyrbil.',
            nieInfo: 'Vera.',
            healthcare: 'Lokal läkare. Sjukhus Huercal-Overa (20 min).',
            swedishServices: ['Inga.']
        },
        faq: [
            { question: 'Hur långt är det till stranden?', answer: 'Ca 800m - 1.5km beroende på var du bor.' }
        ],
        relatedAreas: ['vera', 'garrucha', 'cuevas-del-almanzora', 'villaricos'],
        galleryImages: []
    },
    {
        slug: 'pulpi',
        name: 'Pulpí',
        region: 'costa-almeria',
        province: 'Almería',
        propertyCount: 90,
        priceRange: { min: 140000, max: 450000 },
        avgPrice: 205000,
        image: '/images/areas/pulpi.png',
        description: 'Världsberömd geod och en kommun som sträcker sig från berg till hav.',
        headline: 'Köp bostad i Pulpí – Kristaller och kust',
        metaDescription: 'Pulpí är hem för världens största besökningsbara geod. Kommunen erbjuder både inlandscharm och vackra kustområden vid San Juan de los Terreros (se egen sida).',
        keywords: ['geoda pulpi', 'köpa hus pulpi', 'san juan de los terreros', 'almeria fastigheter'],
        coordinates: { lat: 37.4167, lng: -1.7500 },
        content: {
            intro: 'Pulpí är kommunen som alla pratar om, mycket tack vare upptäckten av "La Geoda" – världens största besökningsbara kristallgrotta. Men Pulpí är mer än så; det är en välmående jordbrukskommun som sträcker sig ända ut till kusten (San Juan de los Terreros). Tätorten Pulpí ligger i inlandet omgiven av berg och odlingar.',
            lifestyle: 'Äkta spanskt småstadsliv. Här bor man rymligt i villor eller radhus. Det är tryggt, rent och välskött. Man lever med naturen inpå knuten och har en stark lokal gemenskap. Många pendlar till kusten på 10-15 minuter.',
            climate: 'Något svalare nätter än vid kusten, vilket är skönt på sommaren. Torrt.',
            attractions: 'Geoda de Pulpí (världsunik!). Golfen på Aguilon. Vandring i bergen. Marknaden varje vecka.',
            transport: 'Murcia flygplats 50 min. Tågstation i Jaravía (förbinder med Águilas/Murcia).',
            propertyMarket: 'I inlandet (Pulpí stad) får du stora hus för 150 000 € som skulle kosta det dubbla vid kusten. Perfekt för fastboende som vill ha yta.',
            buyingTips: 'Missa inte att boka tid till Geoden månader i förväg om du vill besöka den. För boende: Jaravía-området är vackert med utsikt över havet på avstånd.'
        },
        highlights: [
            { icon: 'gem', title: 'Geod', description: 'Världsunik kristall' },
            { icon: 'leaf', title: 'Grönt', description: 'Bördiga omgivningar' },
            { icon: 'golf', title: 'Aguilon', description: 'Spektakulär golf' },
            { icon: 'train', title: 'Tåg', description: 'Station finns' }
        ],
        quickFacts: {
            population: { value: 11000, year: 2024, source: 'INE' },
            foreignPercentage: { value: 20, source: 'INE' },
            swedesEstimate: { value: 40, note: 'Mest vid kusten' },
            airportDistance: { km: 60, minutes: 50, airport: 'Murcia (RMU)' },
            pricePerM2: { value: 1400, source: 'Idealista 2025 (Inland)', year: 2025 },
            sunshineHours: { value: 3300 },
            averageTemp: { annual: 19, january: 11, july: 28 }
        },
        districts: [
            { name: 'Pulpí Stad', coordinates: { lat: 37.4100, lng: -1.7500 }, character: 'Spanskt vardagsliv', pricePerM2: 1200, suitableFor: ['Fastboende'], pros: ['Service', 'Prisvärt'], cons: ['Inland'] },
            { name: 'Jaravía', coordinates: { lat: 37.3900, lng: -1.6900 }, character: 'Lantligt nära havet', pricePerM2: 1600, suitableFor: ['Naturvänner'], pros: ['Utsikt', 'Golfnära'], cons: ['Bil krävs'] }
        ],
        whySwedes: [
            'Geoden – en magisk upplevelse.',
            'Aguilon Golf – en av de vackraste banorna i Spanien.',
            'Möjligheten att bo stort och billigt nära Águilas och Terreros.'
        ],
        notSuitableFor: [
            'Den som vill ha havsutsikt från vardagsrummet (i Pulpí stad).',
            'Den som inte har bil.'
        ],
        market: {
            priceChange5Year: 14.0,
            rentalYield: 5.0,
            touristLicenseAvailable: true,
            typicalPrices: { studio: { min: 50000, max: 70000 }, twoRoom: { min: 80000, max: 130000 }, threeRoom: { min: 120000, max: 180000 }, townhouse: { min: 140000, max: 220000 }, villa: { min: 200000, max: 400000 } }
        },
        climateComparison: [
            { month: 'Jan', areaTemp: 11, stockholmTemp: -2, difference: 13 },
            { month: 'Jul', areaTemp: 30, stockholmTemp: 18, difference: 12 }
        ],
        practical: {
            flights: [{ from: 'Sverige', airline: 'Norwegian', frequency: 'Via ALC' }],
            airportTransfer: 'Hyrbil.',
            nieInfo: 'Vera/Lorca.',
            healthcare: 'Vårdcentral.',
            swedishServices: ['Inga.']
        },
        faq: [
            { question: 'Kan man gå in i kristallen?', answer: 'Ja, med guidad tur.' }
        ],
        relatedAreas: ['san-juan-de-los-terreros', 'aguilas', 'cuevas-del-almanzora', 'huercal-overa'],
        galleryImages: []
    },
    {
        slug: 'san-juan-de-los-terreros',
        name: 'San Juan de los Terreros',
        region: 'costa-almeria',
        province: 'Almería',
        propertyCount: 155,
        priceRange: { min: 130000, max: 650000 },
        avgPrice: 235000,
        image: '/images/areas/san-juan-de-los-terreros.png',
        description: 'Porten till Andalusien – långgrunda stränder, modern nyproduktion och växande popularitet.',
        headline: 'Köp bostad i Terreros – Andalusiens Pärla',
        metaDescription: 'San Juan de los Terreros erbjuder fantastiska, barnvänliga stränder och modern nyproduktion. En växande favorit bland skandinaver. Missa inte Mar de Pulpí.',
        keywords: ['köpa lägenhet terreros', 'mar de pulpi', 'san juan de los terreros', 'strandnära almeria'],
        coordinates: { lat: 37.3589, lng: -1.6575 },
        content: {
            intro: 'San Juan de los Terreros är en kustpärla som exploderat i popularitet de senaste åren. Det är den sista byn i Andalusien innan Murcia-gränsen. Här möts man av breda, gyllene stränder som är otroligt långgrunda och barnvänliga. Byn har vuxit från en sömnig samling hus till en modern destination, mycket tack vare TM Gruppens projekt "Mar de Pulpí" som skapat en helt ny stadsdel i vacker andalusisk stil.',
            lifestyle: 'Avslappnat, modernt familjeliv. Sommartid sjuder det av liv med konserter på strandpromenaden och fullsatta chiringuitos. Vintertid är det lugnare men Mar de Pulpí-centret håller öppet service året runt. Det är en mycket trygg och välskött miljö med mycket blommor och grönområden.',
            climate: 'Fantastiskt. Skyddat av bergen i norr. Ett av de torraste områdena i Europa.',
            attractions: 'Stränderna (Mar Rabiosa, Mar Serena). Slottet på kullen med 360-graders utsikt. Den svarta vulkaniska klippön "Pichirichi". Aguilon Golf (5 min). Världens största Geod (10 min bort).',
            transport: 'Murcia flygplats ca 55 min. Alicante 1h 45 min. Almería 60 min. Bil rekommenderas.',
            propertyMarket: 'Hett! Nyproduktion dominerar. Mar de Pulpí erbjuder allt från 1-4 sovrum med poolområden, gym och havsutsikt. Priserna stiger stadigt men ligger fortfarande lägre än motsvarande standard på Costa del Sol.',
            buyingTips: 'Gillar du Mar de Pulpí-stilen (vitt, blommor, organiserat)? Då är detta paradiset. Vill du ha "gammalt spanskt"? Titta inne i gamla byn. Frontline-lägenheter här är en mycket bra investering.'
        },
        highlights: [
            { icon: 'baby', title: 'Barnvänligt', description: 'Perfekta stränder' },
            { icon: 'home', title: 'Mar de Pulpí', description: 'Bäst i klassen' },
            { icon: 'golf', title: 'Golfnära', description: 'Aguilon Golf' },
            { icon: 'sun', title: 'Solsäkert', description: 'Ljust året runt' }
        ],
        quickFacts: {
            population: { value: 3500, year: 2024, source: 'Estimat' },
            foreignPercentage: { value: 45, source: 'Lokal data' },
            swedesEstimate: { value: 300, note: 'Snabbt växande' },
            airportDistance: { km: 85, minutes: 55, airport: 'Murcia (RMU)' },
            pricePerM2: { value: 2400, source: 'Idealista 2025', year: 2025 },
            sunshineHours: { value: 3300 },
            averageTemp: { annual: 20, january: 13, july: 28 }
        },
        districts: [
            { name: 'Mar de Pulpí', coordinates: { lat: 37.3500, lng: -1.6400 }, character: 'Modern andalusisk by, resort', pricePerM2: 2600, suitableFor: ['Familjer', 'Investerare'], pros: ['Allt nytt', 'Pooler'], cons: ['Community fees'] },
            { name: 'Gamla byn', coordinates: { lat: 37.3600, lng: -1.6600 }, character: 'Spanskt, strandnära', pricePerM2: 2200, suitableFor: ['Solbadare'], pros: ['Charmigt', 'Inga avgifter'], cons: ['Äldre standard'] },
            { name: 'Beverly Hills', coordinates: { lat: 37.3700, lng: -1.6700 }, character: 'Villor på höjden', pricePerM2: 2500, suitableFor: ['Utsiktsjägare'], pros: ['Panoramavy'], cons: ['Backigt'] }
        ],
        whySwedes: [
            'Stränderna – kanske de bästa och mest barnvänliga på hela kusten.',
            'Mar de Pulpí – tryggt, snyggt och enkelt att äga.',
            'Känslan av att vara i Andalusien men med Murcias prislapp.',
            'Närheten till Águilas stad (10 km).'
        ],
        notSuitableFor: [
            'Den som vill ha en storstadspuls (det är en semesterort).',
            'Den som vill ha vilda vågor (vattnet är oftast lugnt).',
            'Den som inte gillar nyproduktion.'
        ],
        market: {
            priceChange5Year: 28.0,
            rentalYield: 6.0,
            touristLicenseAvailable: true,
            typicalPrices: { studio: { min: 110000, max: 140000 }, twoRoom: { min: 140000, max: 220000 }, threeRoom: { min: 180000, max: 350000 }, townhouse: { min: 220000, max: 400000 }, villa: { min: 350000, max: 800000 } }
        },
        climateComparison: [
            { month: 'Jan', areaTemp: 13, stockholmTemp: -2, difference: 15 },
            { month: 'Jul', areaTemp: 28, stockholmTemp: 18, difference: 10 }
        ],
        practical: {
            flights: [{ from: 'Sverige', airline: 'Norwegian', frequency: 'Till ALC/RMU' }],
            airportTransfer: 'Hyrbil.',
            nieInfo: 'Albox.',
            healthcare: 'Lokal mottagning. Sjukhus Lorca/Huercal-Overa.',
            swedishServices: ['TM Gruppen har svensk personal.']
        },
        faq: [
            { question: 'Vad är Mar de Pulpí?', answer: 'Ett prisbelönt bostadsområde vid stranden.' }
        ],
        relatedAreas: ['aguilas', 'pulpi', 'mojacar', 'vera'],
        galleryImages: []
    }
];
