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
const DATA_DIR = path.join(__dirname, '..', 'data', 'golf');

// All courses
const COURSES = [
    { slug: 'alenda', name: 'Alenda Golf' },
    { slug: 'bonalba', name: 'Bonalba Golf' },
    { slug: 'campoamor', name: 'Real Club de Golf Campoamor' },
    { slug: 'el-plantio', name: 'El Plantio Golf' },
    { slug: 'la-finca', name: 'La Finca Golf' },
    { slug: 'la-marquesa', name: 'La Marquesa Golf' },
    { slug: 'las-colinas', name: 'Las Colinas Golf & Country Club' },
    { slug: 'lo-romero', name: 'Lo Romero Golf' },
    { slug: 'villamartin', name: 'Villamartin Golf' },
    { slug: 'vistabella', name: 'Vistabella Golf' },
    { slug: 'aloha', name: 'Aloha Golf Club Marbella' },
    { slug: 'cabopino', name: 'Cabopino Golf Marbella' },
    { slug: 'la-cala', name: 'La Cala Golf Resort' },
    { slug: 'la-quinta', name: 'La Quinta Golf & Country Club Marbella' },
    { slug: 'lauro', name: 'Lauro Golf Resort' },
    { slug: 'los-naranjos', name: 'Los Naranjos Golf Club Marbella' },
    { slug: 'miraflores', name: 'Miraflores Golf Club' },
    { slug: 'santa-clara', name: 'Santa Clara Golf Marbella' },
    { slug: 'torrequebrada', name: 'Torrequebrada Golf' },
    { slug: 'valderrama', name: 'Real Club Valderrama' }
];

const PRICE_PROMPT = (courseName) => `
Du är en golfexpert. Jag behöver EXAKTA green fee priser för golfbanan "${courseName}" i Spanien.

Sök på internet och hitta de aktuella priserna från banans officiella hemsida eller pålitliga bokningssidor som Chronogolf, Teeoff, GolfBookingSpain.

Returnera ENDAST JSON (inga markdown ticks, ingen förklarande text):

{
  "courseName": "${courseName}",
  "found": true,
  "source": "URL eller källa där du hittade priserna",
  "greenFee": {
    "highSeason": {
      "weekday": { "min": 0, "max": 0 },
      "weekend": { "min": 0, "max": 0 }
    },
    "lowSeason": {
      "weekday": { "min": 0, "max": 0 },
      "weekend": { "min": 0, "max": 0 }
    }
  },
  "extras": {
    "buggy": 0,
    "clubRental": 0,
    "trolley": 0
  },
  "notes": "Eventuella anmärkningar om priserna"
}

Om du INTE kan hitta pris, returnera:
{
  "courseName": "${courseName}",
  "found": false,
  "reason": "Varför du inte hittade priser"
}

VIKTIGT: Returnera riktiga priser i EUR, gissa inte! Om du inte hittar exakta siffror, sätt "found": false.
`;

async function fetchPrices() {
    console.log(`\n💰 Fetching green fee prices for ${COURSES.length} courses...\n`);

    const results = [];

    for (const course of COURSES) {
        console.log(`🔍 Searching prices for ${course.name}...`);

        try {
            const response = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'sonar-pro',
                    messages: [
                        { role: 'system', content: 'Du är en golfprisexpert. Sök på internet för att hitta aktuella green fee priser. Returnera endast JSON.' },
                        { role: 'user', content: PRICE_PROMPT(course.name) }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            let content = data.choices[0].message.content;

            // Clean markdown
            content = content.replace(/```json/g, '').replace(/```/g, '').trim();
            const firstBrace = content.indexOf('{');
            const lastBrace = content.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1) {
                content = content.substring(firstBrace, lastBrace + 1);
            }

            const priceData = JSON.parse(content);
            results.push({ slug: course.slug, ...priceData });

            if (priceData.found) {
                const hs = priceData.greenFee.highSeason;
                console.log(`  ✅ Found: €${hs.weekday.min}-${hs.weekday.max} (weekday), €${hs.weekend.min}-${hs.weekend.max} (weekend)`);
            } else {
                console.log(`  ⚠️ Not found: ${priceData.reason}`);
            }

            // Rate limit
            await new Promise(r => setTimeout(r, 2000));

        } catch (e) {
            console.error(`  ❌ Error: ${e.message}`);
            results.push({ slug: course.slug, found: false, error: e.message });
        }
    }

    // Save results
    const outputPath = path.join(DATA_DIR, 'prices.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`\n💾 Saved results to ${outputPath}`);

    // Update individual course files
    console.log('\n📝 Updating course files with prices...');
    for (const result of results) {
        if (!result.found) continue;

        const coursePath = path.join(DATA_DIR, `${result.slug}.json`);
        if (!fs.existsSync(coursePath)) continue;

        try {
            const courseData = JSON.parse(fs.readFileSync(coursePath, 'utf8'));

            // Update pricing
            courseData.pricing = {
                ...courseData.pricing,
                greenFee: result.greenFee,
                priceSource: result.source || 'perplexity',
                lastUpdated: new Date().toISOString()
            };

            if (result.extras) {
                courseData.pricing.extras = {
                    ...courseData.pricing.extras,
                    ...result.extras,
                    rangeBalls: courseData.pricing.extras?.rangeBalls || 5,
                    rangeBallsIncluded: courseData.pricing.extras?.rangeBallsIncluded || false
                };
            }

            fs.writeFileSync(coursePath, JSON.stringify(courseData, null, 2));
            console.log(`  ✅ Updated ${result.slug}.json`);
        } catch (e) {
            console.error(`  ❌ Error updating ${result.slug}: ${e.message}`);
        }
    }

    console.log('\n🏁 Done!');
}

fetchPrices();
