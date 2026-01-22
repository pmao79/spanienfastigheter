const https = require('https');
const fs = require('fs');
const path = require('path');

let API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!API_KEY) {
    const envPath = path.join(__dirname, '..', '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GOOGLE_PLACES_API_KEY=(.+)/);
    if (match) API_KEY = match[1].trim();
}

console.log('API KEY:', API_KEY ? 'Found' : 'Missing');

const query = "El Plantio Golf Resort Alicante Spain";
console.log('Query:', query);

const req = https.request('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location'
    }
}, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Body:', data);
    });
});

req.write(JSON.stringify({ textQuery: query }));
req.end();
