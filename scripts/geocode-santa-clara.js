const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || require('fs').readFileSync('.env.local', 'utf8').match(/GOOGLE_PLACES_API_KEY=(.+)/)[1].trim();

function httpsRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

async function main() {
    console.log('Geocoding Santa Clara Address...');

    // Search for the specific address provided by the user
    // "Calle Sand, Carr. de Cadiz, 17, Km 187,5, 29603 Marbella, Málaga, Spanien"
    const query = "Calle Sand, Carr. de Cadiz, 17, Km 187,5, 29603 Marbella, Málaga, Spanien";

    const searchUrl = `https://places.googleapis.com/v1/places:searchText?fields=places.id,places.formattedAddress,places.location,places.name&key=${API_KEY}`;

    const req = https.request(searchUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-FieldMask': 'places.id,places.formattedAddress,places.location,places.name'
        }
    }, (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
            const response = JSON.parse(data);
            console.log(`Search Results for "${query}":`);
            if (response.places) {
                response.places.forEach(p => {
                    console.log(`- ${p.name}`);
                    console.log(`  ID: ${p.id}`);
                    console.log(`  Address: ${p.formattedAddress}`);
                    console.log(`  Location: ${p.location.latitude}, ${p.location.longitude}`);
                });
            } else {
                console.log('No places found for address. Trying generic "Santa Clara Golf Marbella" search to compare.');
                // Fallback search if address fails
                const fallbackReq = https.request(searchUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-Goog-FieldMask': 'places.id,places.formattedAddress,places.location,places.name' }
                }, (res2) => {
                    let data2 = '';
                    res2.on('data', c => data2 += c);
                    res2.on('end', () => {
                        console.log("Fallback search result:", JSON.parse(data2));
                    })
                });
                fallbackReq.write(JSON.stringify({ textQuery: "Santa Clara Golf Marbella" }));
                fallbackReq.end();
            }
        });
    });

    req.write(JSON.stringify({ textQuery: query }));
    req.end();
}

main();
