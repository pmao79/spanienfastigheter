export interface RegionData {
    slug: 'costa-blanca' | 'costa-del-sol' | 'costa-calida' | 'costa-almeria';
    name: string;
    tagline: string;
    shortDescription: string;
    overview: string;
    heroImage: string;
    lifestyleImage: string;
    coordinates: { lat: number; lng: number };
    province: string;
    coastlineKm: number;
    climateLabel: string;
    knownFor: string;
    highlights: Array<{ icon: string; text: string }>;
    facts: {
        sunDays?: number | null;
        avgTemp?: number | null;
        flightTime?: string | null;
        avgPrice?: string | null;
    };
    whySwedes: string;
    swedesReasons: string[];
    prices: {
        apartmentMin?: number | null;
        apartmentMax?: number | null;
        apartmentNote: string;
        villaMin?: number | null;
        villaMax?: number | null;
        villaNote: string;
        townhouseMin?: number | null;
        townhouseMax?: number | null;
        townhouseNote: string;
    };
    airports: Array<{
        name: string;
        code: string;
        distance: string;
        flightTime: string;
        airlines: string[];
    }>;
    faqs: Array<{
        question: string;
        answer: string;
    }>;
    sections: {
        climate: string;
        lifestyle: string;
        market: string;
        transport: string;
        pros: string[];
        cons: string[];
        practical: string;
    };
}

export const regions: Record<RegionData['slug'], RegionData> = {
    'costa-blanca': {
        slug: 'costa-blanca',
        name: 'Costa Blanca',
        tagline: 'Den vita kusten',
        shortDescription: 'Kustremsan i Alicante-provinsen med vita stränder, medelhavsklimat och populära orter som Alicante, Altea och Torrevieja.',
        overview:
            'Costa Blanca är en cirka 200 km lång kuststräcka i provinsen Alicante, från Dénia i norr till Pilar de la Horadada i söder. ' +
            'Namnet myntades på 1900-talet som turistbegrepp för att lyfta fram de ljusa stränderna och det klara vattnet. ' +
            'Regionen omfattar städer och orter som Dénia, Jávea (Xàbia), Moraira, Altea, Calpe, Benidorm, Alicante, Santa Pola, Guardamar del Segura och Torrevieja.',
        heroImage: '/images/regions/costa-blanca-hero.png',
        lifestyleImage: '/images/regions/costa-blanca-town.png',
        coordinates: { lat: 38.3452, lng: -0.4810 },
        province: 'Alicante',
        coastlineKm: 200,
        climateLabel: 'Medelhavsklimat',
        knownFor: 'Vita stränder och golf',
        highlights: [
            { icon: 'sun', text: 'Över 300 soldagar per år' },
            { icon: 'beach', text: '200 km kustlinje' },
            { icon: 'plane', text: 'Direktflyg till Alicante' },
            { icon: 'home', text: 'Prisvärda bostäder' }
        ],
        facts: {
            sunDays: 300,
            avgTemp: 20,
            flightTime: '3,5-4 h',
            avgPrice: '250 000'
        },
        whySwedes:
            'Costa Blanca har en stark nordisk närvaro, särskilt runt Torrevieja, där svenska föreningar och kyrklig verksamhet gör det lätt att komma in i vardagen. ' +
            'Direktflyg från Sverige, stabilt klimat och ett stort utbud av bostäder gör regionen attraktiv både för permanentboende och fritidsboende.',
        swedesReasons: [
            'Stabilt klimat med milda vintrar och låga regnmängder',
            'Direktflyg från Stockholm, Göteborg och Malmö till Alicante',
            'Etablerade svenska nätverk i Torrevieja, Moraira och Benidorm',
            'Prisnivåer som ofta ligger under Costa del Sol',
            'Brett utbud av stränder, golf och service på engelska'
        ],
        prices: {
            apartmentMin: 150000,
            apartmentMax: 400000,
            apartmentNote: '2-3 rum i kustnära lägen; läge och standard styr priset.',
            villaMin: 300000,
            villaMax: 1000000,
            villaNote: 'Lyxvillor i Jávea och Moraira kan överstiga 2 M€.',
            townhouseMin: 220000,
            townhouseMax: 550000,
            townhouseNote: 'Stort utbud i Orihuela Costa, Guardamar och runt golfresorter.'
        },
        airports: [
            {
                name: 'Alicante-Elche',
                code: 'ALC',
                distance: '20-60 min till kusten',
                flightTime: '3,5-4 h från Stockholm',
                airlines: ['Norwegian', 'Ryanair', 'SAS', 'TUI']
            }
        ],
        faqs: [
            {
                question: 'Hur lång är Costa Blanca?',
                answer: 'Kusten är cirka 200 km lång och sträcker sig från Dénia i norr till Pilar de la Horadada i söder.'
            },
            {
                question: 'Hur många soldagar per år har regionen?',
                answer: 'Costa Blanca har över 300 soldagar per år med en genomsnittlig årstemperatur runt 20 °C.'
            },
            {
                question: 'Finns svensk service i området?',
                answer: 'Ja, det finns svenska föreningar och kyrklig verksamhet i bland annat Torrevieja och Alicante, samt nordiska mötesplatser i flera kustorter.'
            },
            {
                question: 'Vilka områden är mest populära bland utlänningar?',
                answer: 'Torrevieja, Orihuela Costa, Alicante, Benidorm och Jávea är särskilt efterfrågade tack vare klimat, service och etablerade communities.'
            }
        ],
        sections: {
            climate:
                'Costa Blanca har över 300 soldagar per år och en genomsnittlig årstemperatur på cirka 20 °C. ' +
                'Sommarens medeltemperatur ligger runt 25-30 °C medan vintrarna ofta håller 10-18 °C. ' +
                'Nederbörden är låg, ofta under 300 mm per år i kustnära lägen, med mest regn under höst och vinter. ' +
                'Bästa tid att resa är april-juni och september-oktober för varmare väder utan högsäsongstryck.',
            lifestyle:
                'Regionen har över 20 golfbanor, bland annat Las Colinas Golf & Country Club och Villamartín. ' +
                'Stränderna är kända för blå flagg, som Playa de la Fossa i Calpe och Playa del Postiguet i Alicante. ' +
                'Sjukvården är välutvecklad med sjukhus som Hospital Universitario de Alicante och privata kliniker i Torrevieja. ' +
                'Internationella skolor och stora handelsplatser som Zenia Boulevard gör vardagen enkel för inflyttade familjer.',
            market:
                'Lägenheter ligger ofta mellan 150 000-400 000 € för 2-3 rum i kustnära lägen, medan villor vanligtvis börjar runt 300 000 € och når över 1 000 000 € i premiumområden. ' +
                'Prisutvecklingen har legat omkring 5-10 % per år de senaste tre åren, drivet av internationell efterfrågan. ' +
                'Populära områden för utländska köpare är Torrevieja, Orihuela Costa, Alicante, Benidorm och Jávea.',
            transport:
                'Alicante-Elche flygplats är regionens nav med direktflyg från Stockholm, Göteborg och Malmö, ofta 3,5-4 timmars flygtid. ' +
                'Motorvägen AP-7 löper längs kusten och gör bilresor mellan orterna smidiga. ' +
                'Kollektivtrafiken består av ALSA-bussar och TRAM-tåg mellan Alicante, Benidorm och Dénia, vilket ger bra rörlighet utan bil.',
            pros: [
                'Stabilt medelhavsklimat och låga regnmängder',
                'Prisnivåer som ofta är lägre än på Costa del Sol',
                'God infrastruktur med direktflyg och motorvägar',
                'Stark nordisk närvaro och svenska nätverk',
                'Brett utbud av stränder, golf och service'
            ],
            cons: [
                'Högsäsong ger trängsel i orter som Benidorm och Torrevieja',
                'Vattenbrist kan påverka trädgårdar och pooler under torra somrar',
                'Byråkrati kring NIE-nummer och skatter kräver planering'
            ],
            practical:
                'Tidszonen är CET (samma som Sverige) med sommartid CEST. Spanska är huvudspråk, och i norra delen förekommer valencianska. ' +
                'Engelska fungerar bra i turistområden, särskilt runt Alicante och Torrevieja. ' +
                'Levnadskostnaderna är ofta 40-60 % lägre än i Sverige, med hyror för en 2-rumslägenhet på cirka 600-1 000 € per månad beroende på läge.'
        }
    },
    'costa-del-sol': {
        slug: 'costa-del-sol',
        name: 'Costa del Sol',
        tagline: 'Solkusten',
        shortDescription: 'Andalusisk kust mellan Nerja och Manilva med Marbella, Málaga och ett stort utbud av golf, restauranger och stadsliv.',
        overview:
            'Costa del Sol är en 150-200 km lång kustremsa i Andalusiens södra del, huvudsakligen i provinsen Málaga. ' +
            'Kusten sträcker sig från Nerja i öster till Manilva i väster och omfattar orter som Málaga, Torremolinos, Benalmádena, Fuengirola, Marbella och Estepona. ' +
            'Namnet betyder "Solkusten" och används sedan tidigt 1900-tal som varumärke för regionens solrika klimat.',
        heroImage: '/images/regions/costa-del-sol-hero.png',
        lifestyleImage: '/images/regions/costa-del-sol-town.png',
        coordinates: { lat: 36.5097, lng: -4.8857 },
        province: 'Málaga',
        coastlineKm: 160,
        climateLabel: 'Soligt året runt',
        knownFor: 'Golf, marina och stadsliv',
        highlights: [
            { icon: 'sun', text: 'Över 300 soldagar per år' },
            { icon: 'golf', text: 'Över 50 golfbanor' },
            { icon: 'plane', text: 'Flyg till Málaga' },
            { icon: 'building', text: 'Stadsliv och strand i samma region' }
        ],
        facts: {
            sunDays: 300,
            avgTemp: 20,
            flightTime: '3,5-4 h',
            avgPrice: '320 000'
        },
        whySwedes:
            'Costa del Sol är en av de mest populära regionerna för svenskar i Spanien, särskilt kring Fuengirola och Marbella. ' +
            'Starka expatnätverk, direktflyg till Málaga och ett stort utbud av golf, restauranger och internationella skolor gör det enkelt att bosätta sig eller investera.',
        swedesReasons: [
            'Etablerade svenska klubbar och kyrklig verksamhet i Fuengirola',
            'Málaga flygplats med frekventa direktflyg från Sverige',
            'Starkt utbud av golf, strandliv och restauranger',
            'Stabil hyresmarknad i populära områden',
            'Kombination av kustliv och storstad i Málaga'
        ],
        prices: {
            apartmentMin: 150000,
            apartmentMax: 500000,
            apartmentNote: 'Brett spann i Fuengirola, Benalmádena och Málaga.',
            villaMin: 400000,
            villaMax: 2000000,
            villaNote: 'Marbella och Golf Valley har högre prisläge.',
            townhouseMin: 250000,
            townhouseMax: 650000,
            townhouseNote: 'Vanligt i Mijas, Estepona och Manilva.'
        },
        airports: [
            {
                name: 'Málaga-Costa del Sol',
                code: 'AGP',
                distance: '20-60 min till kusten',
                flightTime: '3,5-4 h från Stockholm',
                airlines: ['Ryanair', 'Norwegian', 'SAS', 'Vueling']
            }
        ],
        faqs: [
            {
                question: 'Hur lång är Costa del Sol?',
                answer: 'Kusten är cirka 150-200 km lång och sträcker sig från Nerja i öster till Manilva i väster.'
            },
            {
                question: 'Var bor flest svenskar?',
                answer: 'Fuengirola, Benalmádena och Marbella har störst svensk närvaro med svenska klubbar och service.'
            },
            {
                question: 'Hur är klimatet på vintern?',
                answer: 'Vintrarna är milda med temperaturer runt 15-18 °C och låga regnmängder.'
            },
            {
                question: 'Finns det bra kommunikationer?',
                answer: 'Ja, Málaga flygplats, motorvägen A-7 och pendeltåg C1 ger god rörlighet längs kusten.'
            }
        ],
        sections: {
            climate:
                'Costa del Sol har över 300 soldagar per år. Sommartemperaturerna ligger runt 25-30 °C, medan vintrarna ofta håller 15-18 °C. ' +
                'Nederbörden är låg, omkring 500-600 mm per år, främst under höst och vinter. ' +
                'Vår och höst ger behagliga 20-25 °C och är populära perioder för både besök och långvistelser.',
            lifestyle:
                'Regionen är Europas ledande golfdestination med över 50 banor, inklusive Valderrama, La Quinta och Aloha. ' +
                'Stränder som Playa de la Malagueta och Los Boliches har blå flagg, och längs kusten finns marina områden som Puerto Banús. ' +
                'Sjukvård erbjuds via privata kliniker som Quirónsalud i Marbella, och internationella skolor finns i Benalmádena och Marbella. ' +
                'Shopping och kultur är starkt i Málaga, medan Marbella erbjuder exklusiva restauranger och nattliv.',
            market:
                'Lägenheter ligger ofta mellan 150 000-500 000 €, medan villor i premiumområden kan ligga mellan 400 000 och 2 000 000 €. ' +
                'Priserna har ökat cirka 5-10 % per år de senaste tre åren, och efterfrågan är särskilt stark i Marbella, Estepona, Fuengirola och Mijas. ' +
                'Hyresmarknaden är stabil, med hög efterfrågan under stora delar av året.',
            transport:
                'Málaga-Costa del Sol flygplats är en av Spaniens största, med direktflyg från flera svenska städer. ' +
                'Motorvägen A-7 löper längs kusten och binder samman orterna snabbt. ' +
                'Pendeltåget C1 mellan Málaga och Fuengirola gör det enkelt att resa utan bil, och höghastighetståg (AVE) når Madrid på cirka 2 timmar 46 minuter.',
            pros: [
                'Solrikt klimat med milda vintrar',
                'Stark infrastruktur och internationell flygplats',
                'Stort utbud av golf, service och internationella skolor',
                'Etablerad svensk community och nordisk service',
                'Stabil hyresmarknad och lång säsong'
            ],
            cons: [
                'Högsäsong ger trängsel i populära orter',
                'Vattenbrist kan förekomma under torra perioder',
                'Högre prisnivåer än på Costa Blanca och Costa Cálida'
            ],
            practical:
                'Tidszonen är CET/CEST, samma som i Sverige. Spanska är huvudspråk, men engelska fungerar bra i turistorter. ' +
                'Levnadskostnaderna är 40-60 % lägre än i Sverige, men Marbella och Málaga har högre prisnivåer än mindre orter. ' +
                'Hyror för en 2-rumslägenhet ligger ofta mellan 800 och 1 500 € per månad beroende på läge.'
        }
    },
    'costa-calida': {
        slug: 'costa-calida',
        name: 'Costa Cálida',
        tagline: 'Den varma kusten',
        shortDescription: 'Murcias kust med Mar Menor, lugnare tempo och populära orter som Cartagena, La Manga och Los Alcázares.',
        overview:
            'Costa Cálida är en cirka 250 km lång kust i regionen Murcia, från El Mojón i norr till Águilas i söder. ' +
            'Namnet betyder "Varma kusten" och syftar på mikroklimatet med hög medeltemperatur och låg nederbörd. ' +
            'Kända orter är Cartagena, Mazarrón, La Manga del Mar Menor, Los Alcázares, San Javier och Santiago de la Ribera.',
        heroImage: '/images/regions/costa-calida-hero.png',
        lifestyleImage: '/images/regions/costa-calida-town.png',
        coordinates: { lat: 37.6413, lng: -0.7169 },
        province: 'Murcia',
        coastlineKm: 250,
        climateLabel: 'Varmt mikroklimat',
        knownFor: 'Mar Menor-lagunen',
        highlights: [
            { icon: 'sun', text: 'Varmt mikroklimat' },
            { icon: 'beach', text: 'Mar Menor-lagunen' },
            { icon: 'plane', text: 'Murcia och Alicante flygplatser' },
            { icon: 'home', text: 'Prisvärt jämfört med norr' }
        ],
        facts: {
            sunDays: 300,
            avgTemp: 22,
            flightTime: 'ca 4 h',
            avgPrice: '280 000'
        },
        whySwedes:
            'Costa Cálida uppskattas av svenskar som söker lugnare tempo, varmare vatten och mer prisvärda bostäder. ' +
            'Mar Menor-lagunen ger unika badförhållanden och regionen har färre turismtoppar än grannkusterna, vilket passar familjer och långtidboende.',
        swedesReasons: [
            'Mar Menor ger varmt, lugnt och barnvänligt badvatten',
            'Lägre prisnivåer än Costa Blanca och Costa del Sol',
            'Golfresorter och spa-inriktad turism',
            'Två flygplatser inom rimligt avstånd',
            'Mindre trängsel än på mer exploaterade kuster'
        ],
        prices: {
            apartmentMin: 90000,
            apartmentMax: 300000,
            apartmentNote: 'Typiska 50-100 m² bostäder i Los Alcázares och Cartagena.',
            villaMin: 200000,
            villaMax: 600000,
            villaNote: 'Nyproduktion och golfresorter ligger högre, premium ofta över 400 000 €.',
            townhouseMin: 140000,
            townhouseMax: 350000,
            townhouseNote: 'Vanligt nära Mar Menor och La Manga.'
        },
        airports: [
            {
                name: 'Murcia-Corvera',
                code: 'RMU',
                distance: '30-70 min till Mar Menor',
                flightTime: 'ca 4 h från Stockholm',
                airlines: ['Ryanair', 'Norwegian']
            },
            {
                name: 'Alicante-Elche',
                code: 'ALC',
                distance: '60-90 min till norra kusten',
                flightTime: '3,5-4 h från Stockholm',
                airlines: ['Norwegian', 'Ryanair', 'SAS']
            }
        ],
        faqs: [
            {
                question: 'Vad gör Costa Cálida unik?',
                answer: 'Mar Menor-lagunen gör vattnet varmare och lugnare än öppet hav, vilket ger bra badklimat.'
            },
            {
                question: 'Hur lång är kusten?',
                answer: 'Costa Cálida är cirka 250 km lång från El Mojón i norr till Águilas i söder.'
            },
            {
                question: 'Finns direktflyg från Sverige?',
                answer: 'Flyg går främst via Murcia-Corvera eller Alicante. Direktflyg är säsongsbetonade och varierar per år.'
            },
            {
                question: 'Är bostäderna billigare än på Costa Blanca?',
                answer: 'Generellt ja. Prisnivåerna är ofta lägre tack vare mindre turisttryck och större utbud av nyproduktion.'
            }
        ],
        sections: {
            climate:
                'Costa Cálida har över 300 soldagar per år och ett varmt mikroklimat. Somrarna når ofta 30-35 °C medan vintrarna ligger runt 15-20 °C. ' +
                'Nederbörden är låg, ofta under 310 mm per år, vilket ger ett torrt och stabilt klimat. ' +
                'Bästa perioden för bad är maj-oktober, särskilt runt Mar Menor där vattnet värms upp extra snabbt.',
            lifestyle:
                'Området erbjuder flera PGA-golfbanor som La Manga Club, El Valle och Hacienda Riquelme. ' +
                'Stränderna varierar från lugna sandstränder vid Los Alcázares till mer dramatiska vikar i söder. ' +
                'Mar Menor är känt för sina mineralrika lerbad och hälsoinriktad turism. ' +
                'Cartagena ger ett kulturellt utbud med historiska sevärdheter och ett aktivt restaurangliv.',
            market:
                'Fastighetsmarknaden är generellt mer prisvärd än på Costa Blanca. Lägenheter ligger ofta mellan 90 000 och 300 000 €, medan villor vanligtvis börjar runt 200 000 € och når 600 000 € i premiumlägen. ' +
                'La Manga och Los Alcázares är särskilt efterfrågade, och Mar Menor lockar både familjer och investerare som söker lugnare semesterboenden.',
            transport:
                'Regionen har två närliggande flygplatser: Murcia-Corvera och Alicante-Elche. Restiden från Sverige är ungefär 4 timmar med direktflyg. ' +
                'AP-7-motorvägen går norr-söder längs kusten och binder ihop Murcia med Valencia och Andalusien. ' +
                'Buss- och tågförbindelser via Murcia och Cartagena gör det möjligt att resa utan bil, men bil är ofta mest praktiskt.',
            pros: [
                'Varmt mikroklimat och mycket sol',
                'Mar Menor ger unikt och barnvänligt badvatten',
                'Prisnivåer ofta lägre än på andra costas',
                'Golfresorter och spa-inriktade miljöer',
                'Mindre trängsel under stora delar av året'
            ],
            cons: [
                'Färre internationella skolor än på Costa del Sol',
                'Säsongsvariation i La Manga med kraftig sommartopp',
                'Torrt klimat kan ge vattenbrist under varma perioder'
            ],
            practical:
                'Tidszonen är CET/CEST, samma som i Sverige. Spanska är huvudspråk, men engelska fungerar i turistorter runt Mar Menor och Cartagena. ' +
                'Levnadskostnaderna är lägre än i Sverige, särskilt boende och vardagsservice, vilket gör regionen attraktiv för långtidboende.'
        }
    },
    'costa-almeria': {
        slug: 'costa-almeria',
        name: 'Costa de Almería',
        tagline: 'Den orörda kusten',
        shortDescription: 'Andalusisk kust med nationalparken Cabo de Gata, ljusa stränder och orter som Mojácar, Vera och Almería.',
        overview:
            'Costa de Almería är en cirka 217 km lång kust i provinsen Almería, från Pulpí i nordost till Adra i sydväst. ' +
            'Regionen omfattar 13 kustkommuner som Mojácar, Roquetas de Mar, Vera och Almería stad. ' +
            'Kusten är känd för sin natur, särskilt Cabo de Gata-Níjar, och ett torrare klimat än många andra spanska kuster.',
        heroImage: '/images/regions/costa-almeria-hero.png',
        lifestyleImage: '/images/regions/costa-almeria-town.png',
        coordinates: { lat: 36.8340, lng: -2.4637 },
        province: 'Almería',
        coastlineKm: 217,
        climateLabel: 'Torrt och solrikt',
        knownFor: 'Cabo de Gata och orörda stränder',
        highlights: [
            { icon: 'sun', text: 'En av Europas torraste kuster' },
            { icon: 'mountain', text: 'Cabo de Gata naturpark' },
            { icon: 'plane', text: 'Flyg till Almería' },
            { icon: 'home', text: 'Prisvärda kustlägen' }
        ],
        facts: {
            sunDays: 300,
            avgTemp: 21,
            flightTime: '3,5-4 h',
            avgPrice: '1 790/m²'
        },
        whySwedes:
            'Costa de Almería lockar svenskar som söker natur, lugnare tempo och lägre priser än på mer exploaterade kuster. ' +
            'Direktflyg under delar av året och ett växande utbud av resorter gör regionen allt mer attraktiv för både fritids- och permanentboende.',
        swedesReasons: [
            'Orörda stränder och naturparken Cabo de Gata',
            'Lägre prisnivåer än Costa del Sol',
            'Färre turister och mer lokal prägel',
            'Golfresorter som Almerimar',
            'Direktflyg säsongsvis till Almería'
        ],
        prices: {
            apartmentMin: 120000,
            apartmentMax: 300000,
            apartmentNote: 'Baserat på 1 200-2 554 €/m² i kustkommuner.',
            villaMin: 350000,
            villaMax: 1750000,
            villaNote: 'Mojácar och Vera har flera premiumvillor över 1 M€.',
            townhouseMin: 180000,
            townhouseMax: 450000,
            townhouseNote: 'Vanligt i Roquetas de Mar, Aguadulce och Almerimar.'
        },
        airports: [
            {
                name: 'Almería',
                code: 'LEI',
                distance: '15-60 min till kustorter',
                flightTime: '3,5-4 h från Stockholm',
                airlines: ['Norwegian', 'Ryanair']
            }
        ],
        faqs: [
            {
                question: 'Hur lång är Costa de Almería?',
                answer: 'Kusten är cirka 217 km lång från Pulpí i nordost till Adra i sydväst.'
            },
            {
                question: 'Är klimatet torrare än på andra kuster?',
                answer: 'Ja, nederbörden ligger ofta under 200 mm per år, vilket gör området till en av Europas torraste kuster.'
            },
            {
                question: 'Vilka orter är mest populära?',
                answer: 'Mojácar, Roquetas de Mar, Aguadulce och Almerimar är särskilt populära för bostadsköp.'
            },
            {
                question: 'Finns direktflyg från Sverige?',
                answer: 'Direktflyg till Almería finns periodvis och är oftast säsongsbetonade.'
            }
        ],
        sections: {
            climate:
                'Costa de Almería har över 300 soldagar per år och mycket låg nederbörd, ofta under 200 mm. ' +
                'Sommarens temperaturer ligger runt 25-30 °C och vintrarna runt 15-18 °C. ' +
                'Vår och höst är särskilt behagliga med cirka 20-25 °C och mindre turism.',
            lifestyle:
                'Kusten erbjuder över 200 km stränder med naturpärlor som Playa de los Muertos och Playa de Mónsul. ' +
                'Cabo de Gata-Níjar är en av Spaniens mest unika naturparker med orörda vikar och vandringsleder. ' +
                'Golfbanor som Almerimar och Roquetas de Mar ger bra fritidsutbud, och Almería stad erbjuder kultur, shopping och restauranger.',
            market:
                'Prisnivåerna ligger ofta mellan 1 200 och 2 554 €/m² i kustkommuner, vilket gör regionen prisvärd jämfört med andra andalusiska kuster. ' +
                'Lägenheter ligger ofta runt 120 000-300 000 €, medan villor i premiumlägen som Mojácar och Vera kan ligga från 350 000 € upp till över 1,5 M€. ' +
                'Efterfrågan ökar i Roquetas de Mar, Aguadulce och Almerimar tack vare strandliv och golf.',
            transport:
                'Almería flygplats har europeiska rutter och säsongsvis direktflyg från Sverige. ' +
                'Motorvägen A-7 löper längs kusten och A-92 binder regionen med inlandet och Granada. ' +
                'Kollektivtrafiken är begränsad utanför större orter, vilket gör bil till det vanligaste alternativet.',
            pros: [
                'Mycket sol och låg nederbörd året runt',
                'Orörda stränder och stark naturprofil',
                'Prisvärd fastighetsmarknad jämfört med andra kuster',
                'Mindre massturism och lugnare tempo',
                'Golf och marina miljöer i Almerimar och Roquetas de Mar'
            ],
            cons: [
                'Begränsad kollektivtrafik utanför större orter',
                'Torrt klimat kan påverka vattenförsörjning och grönska',
                'Säsongsbetonade flygförbindelser'
            ],
            practical:
                'Tidszonen är CET/CEST. Spanska är huvudspråk, men engelska fungerar i turistområden och resorter. ' +
                'Levnadskostnaderna är generellt lägre än i Sverige, särskilt boende och restaurangpriser, vilket gör regionen attraktiv för långtidboende.'
        }
    }
};

export function getRegionBySlug(slug: string): RegionData | undefined {
    if (slug === 'costa-de-almeria') {
        return regions['costa-almeria'];
    }
    return regions[slug as RegionData['slug']];
}

export const REGION_SLUGS = Object.keys(regions) as RegionData['slug'][];
