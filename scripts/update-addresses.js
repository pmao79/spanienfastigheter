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

function httpsRequest(url, options, body = null) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve({ error: 'JSON parse error' });
                }
            });
        });
        req.on('error', reject);
        if (body) req.write(body);
        req.end();
    });
}

function findComponent(components, type) {
    const comp = components.find(c => c.types.includes(type));
    return comp ? comp.longText : '';
}

async function updateCourseAddress(file) {
    const filePath = path.join(DATA_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (!data.googlePlaceId) {
        console.warn(`⚠️ No Place ID for ${data.name} (${file})`);
        return;
    }

    console.log(`\n📍 Processing: ${data.name}`);

    // Fetch Details: addressComponents, location, formattedAddress
    const detailsRes = await httpsRequest(
        `https://places.googleapis.com/v1/places/${data.googlePlaceId}?fields=addressComponents,location,formattedAddress`,
        {
            method: 'GET',
            headers: {
                'X-Goog-Api-Key': API_KEY,
                'X-Goog-FieldMask': 'addressComponents,location,formattedAddress',
                'Accept-Language': 'sv' // Get address in Swedish/Global format
            }
        }
    );

    if (detailsRes.location) {
        // Update Coordinates
        data.coordinates = {
            lat: detailsRes.location.latitude,
            lng: detailsRes.location.longitude
        };
        console.log(`   🌍 Coords: ${data.coordinates.lat}, ${data.coordinates.lng}`);

        // Update Address
        if (detailsRes.addressComponents) {
            const comps = detailsRes.addressComponents;
            const street = findComponent(comps, 'route');
            const number = findComponent(comps, 'street_number');
            const city = findComponent(comps, 'locality') || findComponent(comps, 'administrative_area_level_3') || findComponent(comps, 'postal_town');
            const postalCode = findComponent(comps, 'postal_code');
            const country = 'ES'; // Hardcode spain code or extract country code

            data.address = {
                street: street + (number ? ` ${number}` : ''),
                postalCode: postalCode,
                city: city,
                country: country
            };

            console.log(`   🏠 Address: ${data.address.street}, ${data.address.postalCode} ${data.address.city}`);
        } else if (detailsRes.formattedAddress) {
            // Fallback if components missing (unlikely)
            console.log(`   📝 Using formatted address: ${detailsRes.formattedAddress}`);
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } else {
        console.warn('   ⚠️ No location data returned', detailsRes);
    }
}

async function main() {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && f !== 'prices.json');
    console.log(`Found ${files.length} course files.`);

    for (const file of files) {
        try {
            await updateCourseAddress(file);
            await new Promise(r => setTimeout(r, 200));
        } catch (e) {
            console.error(`Error updating ${file}:`, e);
        }
    }
    console.log('\n✅ All Addresses Updated!');
}

main();
