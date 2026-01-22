
import * as fs from 'fs/promises';
import * as path from 'path';

async function main() {
    const targetPath = path.join(process.cwd(), 'lib/area-data-costa-calida-2.ts');
    let fileContent = await fs.readFile(targetPath, 'utf-8');

    // Fully translated and corrected Cartagena object
    const cartagenaSwedish = `    {
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
            {
                icon: "history",
                title: "Romerskt arv",
                description: "En 2000 år gammal teater mitt i staden vittnar om stadens storhetstid."
            },
            {
                icon: "beach",
                title: "Stadsstränder",
                description: "Cala Cortina och närheten till Calblanque ger unika badmöjligheter."
            },
            {
                icon: "sun",
                title: "Sol & Klimat",
                description: "Ett av Spaniens torraste och soligaste hörn - perfekt för vinterboende."
            },
            {
                icon: "food",
                title: "Matkultur",
                description: "Färsk fisk och skaldjur från hamnen och regionens berömda tapas."
            },
            {
                icon: "nature",
                title: "Naturhamn",
                description: "En av Medelhavets viktigaste naturliga hamnar omgiven av berg."
            }
        ],
        quickFacts: {
            population: {
                value: 220400,
                year: 2025,
                source: "INE"
            },
            foreignPercentage: {
                value: 12.5,
                source: "Regional statistik"
            },
            swedesEstimate: {
                value: 250,
                note: "Växande community, ej separerad statistik"
            },
            airportDistance: {
                km: 30,
                minutes: 25,
                airport: "Murcia (RMU)"
            },
            directFlights: {
                airlines: ["Norwegian", "Ryanair", "SAS"],
                frequencyPerWeek: 5,
                note: "Fler avgångar till Alicante (1h bort)"
            },
            pricePerM2: {
                value: 1850,
                source: "Idealista 2025",
                year: 2025
            },
            sunshineHours: {
                value: 3200,
                note: "Över 320 dagar/år"
            },
            averageTemp: {
                annual: 19.5,
                january: 12,
                july: 27,
                note: "Milda vintrar, varma somrar"
            }
        },
        districts: [
            {
                name: "Casco Antiguo",
                character: "Historiska stadskärnan med gågator och torg",
                pricePerM2: 2100,
                suitableFor: ["Kulturälskare", "Stadsmänniskor", "Investerare"],
                pros: ["Gångavstånd till allt", "Unik arkitektur", "Pulserande uteliv"],
                cons: ["Kan vara högljutt", "Parkeringsbrist", "Små gränder"]
            },
            {
                name: "Ensanche / Alameda",
                character: "Bredare boulevarder och statliga byggnader",
                pricePerM2: 1900,
                suitableFor: ["Familjer", "Året-runt-boende"],
                pros: ["Rymliga lägenheter", "Nära service", "Bra kommunikationer"],
                cons: ["Mindre historisk charm", "Stadstrafik"]
            },
            {
                name: "Cala Cortina / Hamnen",
                character: "Exklusivt läge nära vattnet",
                pricePerM2: 2800,
                suitableFor: ["Livsnjutare", "Semesterboende"],
                pros: ["Havsutsikt", "Strandnära", "Modernt boende"],
                cons: ["Högre priser", "Begränsat utbud"]
            },
            {
                name: "Tentegorra",
                character: "Grönskande villaområde i utkanten",
                pricePerM2: 1800,
                suitableFor: ["Barnfamiljer", "Naturälskare"],
                pros: ["Stora tomter", "Lugnt och grönt", "Nära naturpark"],
                cons: ["Kräver bil", "Längre från centrum"]
            }
        ],
        faq: [
            {
                question: "Är Cartagena tryggt att bo i?",
                answer: "Ja, Cartagena är en mycket trygg stad. Centrum och turistområdena är säkra och välbevakade. Som i alla städer bör man vara uppmärksam, men brottsligheten är låg."
            },
            {
                question: "Hur långt är det till stranden?",
                answer: "Stadsstranden Cala Cortina ligger bara 5 minuter (bil/buss) eller en vacker 20 minuters promenad från hamnen. Fantastiska naturstränder i Calblanque ligger ca 20 minuter bort med bil."
            },
            {
                question: "Finns det svenska skolor?",
                answer: "Nej, det finns ingen svensk skola i Cartagena (närmaste finns på Costa Blanca). Däremot finns internationella/tvåspråkiga skolor av hög klass, t.ex. ISEN."
            },
            {
                question: "Kan man klara sig utan bil?",
                answer: "Absolut. Om du bor i centrum (Casco Antiguo eller Ensanche) har du gångavstånd till allt. Tåg och buss tar dig enkelt vidare i Spanien."
            }
        ],
        whySwedes: [
            'Den unika mixen av storstadspuls och avslappnat strandliv.',
            'Det genuina "icke-turistiga" Spanien med lägre priser.',
            'Det fantastiska mikroklimatet som ger varma vintrar.',
            'Kulturen och historian – här finns alltid något nytt att upptäcka.'
        ],
        notSuitableFor: [
            'Dig som vill bo mitt i en svenskkoloni där alla pratar svenska.',
            'Den som söker nattklubbar och festande dygnet runt (välj hellre Benidorm).',
            'Dig som vill ha ' + "'resort-liv'" + ' med all-inclusive (välj hellre La Manga).'
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
            flights: [
                { from: 'Stockholm', airline: 'Norwegian, SAS, Ryanair', frequency: 'Dagligen (till ALC)' },
                { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: '3-4 ggr/vecka (till ALC)' },
                { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
            ],
            airportTransfer: 'Taxi från Murcia (RMU) ca 30-40€. Från Alicante 100-120€. Buss finns till båda, men bil är smidigast.',
            nieInfo: 'NIE-nummer krävs. Kan sökas på Policia Nacional i Cartagena (C/ Menéndez Pelayo). Tidsbokning krävs.',
            healthcare: 'Hög standard. Universitetssjukhuset Santa Lucía är nytt och modernt. Privat vård finns på Hospital Perpetuo Socorro.',
            swedishServices: ['Finns ingen officiell svensk förening i staden, men grupper på Facebook är aktiva.', 'Svenska konsulatet finns i Torrevieja (45 min bort).']
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
    },`;

    // Find start index
    let startIndex = fileContent.indexOf("    {\n        slug: 'cartagena',");
    if (startIndex === -1) {
        startIndex = fileContent.indexOf("    {\r\n        slug: 'cartagena',");
    }
    // Try less strict search
    if (startIndex === -1) {
        startIndex = fileContent.indexOf("slug: 'cartagena'");
        if (startIndex !== -1) {
            startIndex = fileContent.lastIndexOf('{', startIndex);
            startIndex = startIndex - 4;
        }
    }

    if (startIndex === -1) {
        console.error('Could not find start index of Cartagena object');
        return;
    }

    // Find end index (start of mar-de-cristal)
    const nextSlug = "slug: 'mar-de-cristal'";
    const nextIndex = fileContent.indexOf(nextSlug, startIndex);

    if (nextIndex === -1) {
        console.error('Could not find next object mar-de-cristal');
        return;
    }

    // Find the last "}," before the next object
    const endIndex = fileContent.lastIndexOf('},', nextIndex) + 2;

    const updatedContent = fileContent.slice(0, startIndex) + cartagenaSwedish + fileContent.slice(endIndex);

    await fs.writeFile(targetPath, updatedContent, 'utf-8');
    console.log('Successfully updated Cartagena to Swedish Standards');
}

main().catch(console.error);
