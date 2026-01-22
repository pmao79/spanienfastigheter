const fs = require('fs');
const path = require('path');

async function main() {
    let API_KEY = process.env.GOOGLE_PLACES_API_KEY;
    if (!API_KEY) {
        const envPath = path.join(__dirname, '..', '.env.local');
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            const match = envContent.match(/GOOGLE_PLACES_API_KEY=(.+)/);
            if (match) API_KEY = match[1].trim();
        }
    }

    if (!API_KEY) { console.error('❌ No API Key found'); process.exit(1); }

    const DATA_DIR = path.join(__dirname, '..', 'data', 'golf');
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json') && f !== 'prices.json');

    console.log(`🔍 Verifying ${files.length} courses...`);

    for (const file of files) {
        const filePath = path.join(DATA_DIR, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Construct a specific query
        let query = `${data.name} Golf Course ${data.subRegion || ''} Spain`;
        // Handle specific cases if needed, but general query usually works well

        console.log(`\n⛳ Checking: ${data.name} (${file})`);

        try {
            const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': API_KEY,
                    'X-Goog-FieldMask': 'places.id,places.displayName,places.location,places.addressComponents'
                },
                body: JSON.stringify({ textQuery: query })
            });

            const json = await res.json();

            if (json.places && json.places.length > 0) {
                const place = json.places[0];

                // Compare IDs
                if (data.googlePlaceId && data.googlePlaceId !== place.id) {
                    console.log(`   🔄 Place ID Changed: ${data.googlePlaceId} -> ${place.id}`);
                }

                // Update ID
                data.googlePlaceId = place.id;

                // Update Coordinates
                const oldLat = data.coordinates?.lat;
                const oldLng = data.coordinates?.lng;
                const newLat = place.location.latitude;
                const newLng = place.location.longitude;

                // Check drift (notify if significant change)
                const drift = Math.abs(oldLat - newLat) + Math.abs(oldLng - newLng);
                if (drift > 0.001) {
                    console.log(`   📍 Coordinates Updated: (${oldLat}, ${oldLng}) -> (${newLat}, ${newLng})`);
                } else {
                    console.log(`   ✅ Coordinates verified (match)`);
                }

                data.coordinates = { lat: newLat, lng: newLng };

                // Update Address
                if (place.addressComponents) {
                    const comps = place.addressComponents;
                    const find = (t) => (comps.find(c => c.types.includes(t)) || {}).longText || '';

                    const street = find('route');
                    const number = find('street_number');
                    const postalCode = find('postal_code');
                    const city = find('locality') || find('postal_town') || find('administrative_area_level_3');

                    // Only update if we found meaningful data
                    if (street || city) {
                        data.address = {
                            street: street + (number ? ` ${number}` : ''),
                            postalCode: postalCode,
                            city: city,
                            country: 'ES' // Always Spain for this app
                        };
                        console.log(`   🏠 Address: ${data.address.street}, ${data.address.postalCode} ${data.address.city}`);
                    }
                }

                fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

            } else {
                console.warn(`   ⚠️ No results found for query: "${query}"`);
            }

            // Rate limit
            await new Promise(r => setTimeout(r, 200));

        } catch (e) {
            console.error(`   ❌ Error verifying ${file}:`, e.message);
        }
    }

    console.log('\n✨ Verification Complete!');
}

main();
