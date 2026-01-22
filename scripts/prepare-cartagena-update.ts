
import * as fs from 'fs/promises';
import * as path from 'path';

async function main() {
    // Read the deep research data
    const researchPath = path.join(process.cwd(), 'cartagena_deep_data.json');
    const researchContent = await fs.readFile(researchPath, 'utf-8');
    const researchData = JSON.parse(researchContent);

    // Read the target file
    const targetPath = path.join(process.cwd(), 'lib/area-data-costa-calida-2.ts');
    let fileContent = await fs.readFile(targetPath, 'utf-8');

    // Construct the new object string for replacement
    // We match the indentation of the existing file (4 spaces)
    const newObjectString = `    {
        slug: 'cartagena',
        name: 'Cartagena',
        region: 'costa-calida',
        province: 'Murcia',
        propertyCount: 450,
        priceRange: { min: 120000, max: 1500000 },
        avgPrice: 280000,
        image: '/images/areas/cartagena-hero.png',
        description: ${JSON.stringify(researchData.content.intro.substring(0, 150) + '...')},
        headline: 'Cartagena – Historic Port with Modern Lifestyle',
        metaDescription: ${JSON.stringify(researchData.content.intro.substring(0, 160))},
        keywords: ['Cartagena spain real estate', 'buy property cartagena', 'costa calida property', 'cartagena roman theatre'],
        coordinates: { lat: 37.6000, lng: -0.9833 },
        content: {
            intro: ${JSON.stringify(researchData.content.intro)},
            lifestyle: ${JSON.stringify(researchData.content.lifestyle)},
            climate: ${JSON.stringify(researchData.content.climate)},
            attractions: ${JSON.stringify(researchData.content.attractions)},
            transport: ${JSON.stringify(researchData.content.transport)},
            propertyMarket: ${JSON.stringify(researchData.content.propertyMarket)},
            buyingTips: ${JSON.stringify(researchData.content.buyingTips)}
        },
        highlights: ${JSON.stringify(researchData.highlights, null, 12).replace(/\n/g, '\n        ')},
        quickFacts: ${JSON.stringify(researchData.availableData.quickFacts, null, 12).replace(/\n/g, '\n        ')},
        districts: ${JSON.stringify(researchData.districts, null, 12).replace(/\n/g, '\n        ')},
        faq: ${JSON.stringify(researchData.faq, null, 12).replace(/\n/g, '\n        ')},
        whySwedes: [
            'Unikt romerskt kulturarv och storstadspuls vid havet – en kulturell pärla.',
            'Autentisk spansk livsstil med färre turister än norra Costa Blanca.',
            'Mildare vintrar och över 320 soldagar om året tack vare det skyddade läget.',
            'Växande skandinavisk gemenskap och digital nomad-hub för långtidsboende.'
        ],
        notSuitableFor: [
            'Den som söker en renodlad sol-och-bad resort (välj hellre La Manga).',
            'Dig som vill bo i en "svenskby" – här är det mer blandat och internationellt.',
            'Den som ogillar stadstrafik och ljudnivåer i centrum.'
        ],
        market: {
            priceChange5Year: 19.8,
            rentalYield: 6.6,
            touristLicenseAvailable: true,
            typicalPrices: {
                studio: { min: 70000, max: 110000 },
                twoRoom: { min: 120000, max: 190000 },
                threeRoom: { min: 180000, max: 350000 },
                townhouse: { min: 200000, max: 400000 },
                villa: { min: 350000, max: 1500000 }
            }
        },
        climateComparison: [
            { month: 'Jan', areaTemp: 12, stockholmTemp: -2, difference: 14 },
            { month: 'Apr', areaTemp: 17, stockholmTemp: 5, difference: 12 },
            { month: 'Jul', areaTemp: 26, stockholmTemp: 18, difference: 8, seaTemp: 25 },
            { month: 'Okt', areaTemp: 21, stockholmTemp: 8, difference: 13 }
        ],
        practical: {
            flights: [
                { from: 'Stockholm', airline: 'Norwegian, SAS, Ryanair', frequency: 'Dagligen (till ALC)' },
                { from: 'Göteborg', airline: 'Ryanair, Norwegian', frequency: '3-4 ggr/vecka (till ALC)' },
                { from: 'Köpenhamn', airline: 'SAS, Norwegian', frequency: 'Dagligen' }
            ],
            airportTransfer: 'Taxi från Murcia flygplats (RMU) tar ca 25 min (30€). Bussar finns men bil rekommenderas för att utforska regionen.',
            nieInfo: 'NIE-nummer krävs. Kan sökas på polisen i Cartagena eller via konsulatet. Advokat rekommenderas.',
            healthcare: 'Santa Lucía universitetssjukhus är ett av regionens modernaste. Flera privata kliniker med engelsktalande läkare finns.',
            swedishServices: ['Skandinaviska mäklare', 'Internationella skolor (ISEN)', 'Svenska träffpunkter (via Facebook-grupper)']
        },
        comparison: [
            {
                area: 'Alicante',
                slug: 'alicante',
                pricePerM2: 2850,
                character: 'Större stad, fler flyg',
                suitableFor: 'Storstadspuls'
            },
            {
                area: 'Torrevieja',
                slug: 'torrevieja',
                pricePerM2: 2600,
                character: 'Fler svenskar, plattare',
                suitableFor: 'Sol & Bad'
            }
        ],
        relatedAreas: ['la-manga', 'mar-de-cristal', 'mazarron', 'murcia'],
        galleryImages: [
            '/images/areas/cartagena-roman-theatre.png',
            '/images/areas/cartagena-hero.png'
        ]
    }`;

    // Find start index
    // Try inclusive search with newlines
    let startIndex = fileContent.indexOf("    {\n        slug: 'cartagena',");
    if (startIndex === -1) {
        startIndex = fileContent.indexOf("    {\r\n        slug: 'cartagena',");
    }
    // Try less strict search if above failed
    if (startIndex === -1) {
        startIndex = fileContent.indexOf("slug: 'cartagena'");
        // Backtrack to the opening brace
        if (startIndex !== -1) {
            startIndex = fileContent.lastIndexOf('{', startIndex);
            // Backtrack to the 4 spaces
            startIndex = startIndex - 4;
        }
    }

    if (startIndex === -1) {
        console.error('Could not find start index of Cartagena object');
        return;
    }

    console.log(`Found start index at: ${startIndex}`);

    // Find the end of this object.
    // We look for the start of the NEXT object "mar-de-cristal"
    const nextSlug = "slug: 'mar-de-cristal'";
    const nextIndex = fileContent.indexOf(nextSlug, startIndex);

    if (nextIndex === -1) {
        console.error('Could not find next object mar-de-cristal');
        return;
    }

    // Find the last "}," before the next object
    const endIndex = fileContent.lastIndexOf('},', nextIndex) + 2;

    console.log(`Found end index at: ${endIndex}`);

    if (endIndex <= startIndex) {
        console.error('End index <= Start index. Logic error.');
        return;
    }

    const updatedContent = fileContent.slice(0, startIndex) + newObjectString + fileContent.slice(endIndex);

    await fs.writeFile(targetPath, updatedContent, 'utf-8');
    console.log('Successfully updated lib/area-data-costa-calida-2.ts');
}

main().catch(console.error);
