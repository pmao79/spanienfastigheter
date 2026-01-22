const fs = require('fs');
const path = require('path');
const https = require('https');

// 1. Load API Key
let API_KEY = process.env.GOOGLE_PLACES_API_KEY;

if (!API_KEY) {
    try {
        const envPath = path.join(__dirname, '..', '.env.local');
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            const match = envContent.match(/GOOGLE_PLACES_API_KEY=(.+)/);
            if (match) API_KEY = match[1].trim();
        }
    } catch (e) {
        // ignore
    }
}

if (!API_KEY) {
    console.error('❌ GOOGLE_PLACES_API_KEY not found in env or .env.local');
    process.exit(1);
}

const DATA_DIR = path.join(__dirname, '..', 'data', 'golf');

// Helper for https request
function httpsRequest(url, options, body = null) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    console.error('Failed to parse JSON:', data);
                    resolve({ error: 'JSON parse error' });
                }
            });
        });
        req.on('error', reject);
        if (body) req.write(body);
        req.end();
    });
}

function normalizeRating(val) {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
}

async function updateCourse(file) {
    const filePath = path.join(DATA_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Skip if valid rating exists (and is recent? nah, force update for "La Cala" fix)
    // Actually, force update is better to be safe.

    console.log(`\n⛳ Processing: ${data.name}`);

    // 1. Find Place ID
    let placeId = data.googlePlaceId;

    if (!placeId) {
        let query = `${data.name} ${data.subRegion || ''} Spain`;
        if (!data.name.toLowerCase().includes('golf')) {
            query = `${data.name} golf ${data.subRegion || ''} Spain`;
        }

        const searchRes = await httpsRequest(
            'https://places.googleapis.com/v1/places:searchText',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': API_KEY,
                    'X-Goog-FieldMask': 'places.id,places.displayName'
                }
            },
            JSON.stringify({ textQuery: query })
        );

        if (searchRes.places && searchRes.places.length > 0) {
            placeId = searchRes.places[0].id;
            console.log(`   🔍 Found Place ID via search: ${placeId}`);
            // Save Place ID for future
            data.googlePlaceId = placeId;
        } else {
            console.warn(`   ⚠️ Place ID not found for query: ${query}`);
            return;
        }
    }

    // 2. Fetch Details
    const detailsRes = await httpsRequest(
        `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount`,
        {
            method: 'GET',
            headers: {
                'X-Goog-Api-Key': API_KEY,
                'X-Goog-FieldMask': 'rating,userRatingCount'
            }
        }
    );

    if (detailsRes.rating) {
        const oldRating = data.rating?.overall || 0;
        const newRating = normalizeRating(detailsRes.rating);
        const newCount = normalizeRating(detailsRes.userRatingCount);

        data.rating = {
            overall: newRating,
            totalReviews: newCount
        };

        console.log(`   🌟 Updated Rating: ${oldRating} -> ${newRating} (${newCount} reviews)`);

        // Write back
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } else {
        console.warn('   ⚠️ No rating data returned');
    }
}

async function main() {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && f !== 'prices.json');
    console.log(`Found ${files.length} course files.`);

    for (const file of files) {
        try {
            await updateCourse(file);
            // new delay to be nice to API
            await new Promise(r => setTimeout(r, 200));
        } catch (e) {
            console.error(`Error updating ${file}:`, e);
        }
    }
    console.log('\n✅ All Done!');
}

main();
