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

    if (!API_KEY) { console.error('No API Key'); process.exit(1); }

    const filePath = path.join(__dirname, '..', 'data', 'golf', 'el-plantio.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log('Original Name:', data.name);
    const query = "El Plantio Golf Resort Alicante Spain";

    try {
        const searchRes = await fetch('https://places.googleapis.com/v1/places:searchText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': API_KEY,
                'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.addressComponents'
            },
            body: JSON.stringify({ textQuery: query })
        });

        const json = await searchRes.json();

        if (json.places && json.places.length > 0) {
            const place = json.places[0];
            console.log('Found:', place.displayName.text);
            console.log('Location:', place.location);

            data.googlePlaceId = place.id;
            data.coordinates = {
                lat: place.location.latitude,
                lng: place.location.longitude
            };

            if (place.addressComponents) {
                const comps = place.addressComponents;
                const find = (t) => (comps.find(c => c.types.includes(t)) || {}).longText || '';

                data.address = {
                    street: find('route') + (find('street_number') ? ' ' + find('street_number') : ''),
                    postalCode: find('postal_code'),
                    city: find('locality') || find('postal_town') || 'Alicante', // Fallback
                    country: 'ES'
                };
                console.log('Address:', data.address);
            }

            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            console.log('✅ Updated el-plantio.json');
        } else {
            console.log('❌ No places found');
        }

    } catch (e) {
        console.error('Error:', e);
    }
}

main();
