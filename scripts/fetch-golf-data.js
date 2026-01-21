const fs = require('fs');
const path = require('path');

// Read .env.local
function getEnvValue(key) {
    try {
        const envPath = path.join(__dirname, '..', '.env.local');
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf8');
            const match = content.match(new RegExp(`^${key}=(.+)`, 'm'));
            return match ? match[1].trim() : null;
        }
    } catch (e) {
        console.error('Error reading .env.local', e);
    }
    return process.env[key];
}

const PERPLEXITY_API_KEY = getEnvValue('PERPLEXITY_API_KEY');

const COURSES = [
    // Costa Blanca
    { name: 'Las Colinas Golf & Country Club', region: 'costa-blanca', slug: 'las-colinas' },
    { name: 'Real Club de Golf Campoamor', region: 'costa-blanca', slug: 'campoamor' },
    { name: 'Villamartin Golf', region: 'costa-blanca', slug: 'villamartin' },
    { name: 'Lo Romero Golf', region: 'costa-blanca', slug: 'lo-romero' },
    { name: 'La Finca Golf', region: 'costa-blanca', slug: 'la-finca' },
    { name: 'Vistabella Golf', region: 'costa-blanca', slug: 'vistabella' },
    { name: 'La Marquesa Golf', region: 'costa-blanca', slug: 'la-marquesa' },
    { name: 'Alenda Golf', region: 'costa-blanca', slug: 'alenda' },
    { name: 'Bonalba Golf', region: 'costa-blanca', slug: 'bonalba' },
    { name: 'El Plantio Golf', region: 'costa-blanca', slug: 'el-plantio' },
    // Costa del Sol
    { name: 'Valderrama Golf Club', region: 'costa-del-sol', slug: 'valderrama' },
    { name: 'La Cala Golf Resort', region: 'costa-del-sol', slug: 'la-cala' },
    { name: 'Los Naranjos Golf Club', region: 'costa-del-sol', slug: 'los-naranjos' },
    { name: 'Aloha Golf Club', region: 'costa-del-sol', slug: 'aloha' },
    { name: 'La Quinta Golf & Country Club', region: 'costa-del-sol', slug: 'la-quinta' },
    { name: 'Miraflores Golf Club', region: 'costa-del-sol', slug: 'miraflores' },
    { name: 'Cabopino Golf Marbella', region: 'costa-del-sol', slug: 'cabopino' },
    { name: 'Santa Clara Golf Marbella', region: 'costa-del-sol', slug: 'santa-clara' },
    { name: 'Torrequebrada Golf', region: 'costa-del-sol', slug: 'torrequebrada' },
    { name: 'Lauro Golf', region: 'costa-del-sol', slug: 'lauro' }
];

const OUTPUT_DIR = path.join(__dirname, '..', 'data', 'golf');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const PROMPT_TEMPLATE = (course) => `
Du är en svensk golfexpert. VIKTIGT: Svara ALLTID på SVENSKA. Skriv ALDRIG på engelska, tyska eller andra språk.

Jag bygger en databas för en svensk golfresurs och behöver strukturerad JSON-data för golfbanan "${course.name}" i ${course.region === 'costa-blanca' ? 'Costa Blanca' : 'Costa del Sol'}, Spanien.

KRITISKT: Alla textfält (description, longDescription, tagline, difficulty.description) MÅSTE vara skrivna på SVENSKA.

Returnera ENDAST valid JSON (inga markdown ticks!) som matchar följande struktur exakt:

{
  "id": "${course.slug}",
  "slug": "${course.slug}",
  "name": "${course.name}",
  "shortName": "Kortnamn på svenska",
  "tagline": "Kort slogan på SVENSKA",
  "description": "Kort beskrivning på SVENSKA (max 150 tecken)",
  "longDescription": "Detaljerad beskrivning på SVENSKA med 2-3 paragrafer om banans karaktär, layout, svårighet och upplevelse",
  "region": "${course.region}",
  "subRegion": "Delområde/stad",
  "province": "Provins",
  "address": { "street": "Gatuadress", "postalCode": "Postnummer", "city": "Stad", "country": "ES" },
  "coordinates": { "lat": 38.0, "lng": -0.7 },
  "courseInfo": {
    "holes": 18,
    "par": 72,
    "length": { "meters": 6000, "yards": 6560 },
    "architect": "Arkitektens namn",
    "openedYear": 2000
  },
  "difficulty": { "level": "medium", "description": "Svårighetsbeskrivning på SVENSKA" },
  "pricing": {
    "greenFee": {
      "lowSeason": { "weekday": { "min": 50, "max": 70 }, "weekend": { "min": 60, "max": 80 } },
      "highSeason": { "weekday": { "min": 80, "max": 120 }, "weekend": { "min": 100, "max": 150 } }
    },
    "currency": "EUR"
  },
  "facilities": {
    "course": { "drivingRange": true, "puttingGreen": true, "chippingGreen": true, "practiceBunker": true },
    "clubhouse": { "restaurant": true, "proshop": true, "locker": true, "bar": true, "terrace": true, "shower": true },
    "services": { "golfSchool": true, "proAvailable": true, "clubFitting": false, "clubRepair": false, "caddie": false },
    "other": { "spa": false, "pool": false, "gym": false, "tennis": false, "padel": false, "hotel": false }
  },
  "contact": { "phone": "+34 XXX XXX XXX", "email": "info@example.com", "website": "www.example.com" },
  "rating": { "overall": 4.0, "totalReviews": 100 },
  "holes": [],
  "signatureHoles": [{ "number": 1, "description": "Beskrivning på SVENSKA" }]
}

VIKTIGT: Om du inte hittar exakta priser, ange 0 för alla prisfält. Gissa ALDRIG priser.
`;

async function main() {
    for (const course of COURSES) {
        if (fs.existsSync(path.join(OUTPUT_DIR, `${course.slug}.json`)) && course.slug !== 'las-colinas') {
            // Skip existing except las-colinas which we want to overwrite with better data
            // console.log(`Skipping ${course.name}`);
            // continue;
        }

        console.log(`Fetching ${course.name}...`);

        try {
            const response = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
                },
                body: JSON.stringify({
                    model: 'sonar-pro',
                    messages: [
                        { role: 'system', content: 'Du är en svensk golfexpert. Svara ALLTID på svenska. Returnera endast ren JSON utan markdown.' },
                        { role: 'user', content: PROMPT_TEMPLATE(course) }
                    ]
                })
            });

            if (!response.ok) throw new Error(response.statusText);

            const data = await response.json();
            let content = data.choices[0].message.content;

            // Clean up markdown
            content = content.replace(/```json/g, '').replace(/```/g, '').trim();
            // Remove any text before/after { }
            const firstBrace = content.indexOf('{');
            const lastBrace = content.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1) {
                content = content.substring(firstBrace, lastBrace + 1);
            }

            fs.writeFileSync(path.join(OUTPUT_DIR, `${course.slug}.json`), content);
            console.log(`✅ Saved ${course.slug}`);

            // Rate limit safety
            await new Promise(r => setTimeout(r, 1500));

        } catch (e) {
            console.error(`❌ Error ${course.name}:`, e.message);
        }
    }
}

main();
