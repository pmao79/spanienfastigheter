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
    console.error('❌ GOOGLE_PLACES_API_KEY not found');
    process.exit(1);
}

const DATA_DIR = path.join(__dirname, '..', 'data', 'golf');

function httpsRequest(method, url, headers, body = null) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, { method, headers }, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve({ error: 'JSON parse error', raw: data });
                }
            });
        });
        req.on('error', reject);
        if (body) req.write(body);
        req.end();
    });
}

function findComponent(components, type) {
    if (!components) return '';
    const comp = components.find(c => c.types.includes(type));
    return comp ? comp.longText : '';
}

async function findPlace(courseName) {
    const response = await httpsRequest(
        'POST',
        'https://places.googleapis.com/v1/places:searchText',
        {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.addressComponents',
        },
        JSON.stringify({
            textQuery: `${courseName} golf spain`,
            languageCode: 'sv'
        })
    );

    if (response.places && response.places.length > 0) {
        return response.places[0];
    }
    return null;
}

async function processBatch(files) {
    for (const file of files) {
        const filePath = path.join(DATA_DIR, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        console.log(`Processing ${data.name}...`);

        try {
            const place = await findPlace(data.name);

            if (place) {
                console.log(`  ✅ Found: ${place.displayName.text}`);
                console.log(`     ID: ${place.id}`);
                console.log(`     Address: ${place.formattedAddress}`);

                // Update basic fields
                data.googlePlaceId = place.id;

                if (place.location) {
                    data.coordinates = {
                        lat: place.location.latitude,
                        lng: place.location.longitude
                    };
                }

                if (place.rating) {
                    data.rating = {
                        overall: place.rating,
                        totalReviews: place.userRatingCount || 0
                    };
                }

                // Update Address Struct
                if (place.addressComponents) {
                    const comps = place.addressComponents;
                    const street = findComponent(comps, 'route');
                    const number = findComponent(comps, 'street_number');
                    const city = findComponent(comps, 'locality') ||
                        findComponent(comps, 'administrative_area_level_3') ||
                        findComponent(comps, 'postal_town');
                    const postalCode = findComponent(comps, 'postal_code');

                    data.address = {
                        street: street + (number ? ` ${number}` : ''),
                        postalCode: postalCode,
                        city: city,
                        country: 'ES'
                    };
                }

                fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            } else {
                console.log(`  ⚠️ Not found via API`);
            }
        } catch (error) {
            console.error(`  ❌ Error: ${error.message}`);
        }

        // Random delay between 1-3 seconds
        const delay = 1000 + Math.random() * 2000;
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

async function main() {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && f !== 'prices.json');
    console.log(`Found ${files.length} courses to update.`);

    const BATCH_SIZE = 10;
    for (let i = 0; i < files.length; i += BATCH_SIZE) {
        const batch = files.slice(i, i + BATCH_SIZE);
        console.log(`\n📦 Batch ${Math.floor(i / BATCH_SIZE) + 1} (${i + 1}-${Math.min(i + BATCH_SIZE, files.length)})`);
        await processBatch(batch);

        if (i + BATCH_SIZE < files.length) {
            console.log('⏳ Resting for 5 seconds...');
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }

    console.log('\n✨ All updates complete!');
}

main();
