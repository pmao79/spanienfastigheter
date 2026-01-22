
import * as fs from 'fs/promises';
import * as path from 'path';

async function main() {
    const targetPath = path.join(process.cwd(), 'lib/area-data-costa-calida-2.ts');
    let content = await fs.readFile(targetPath, 'utf-8');

    // Mappings of District Name -> Coordinates
    // Using loose matching to find the district block and insert coordinates
    const districtCoords: Record<string, string> = {
        // Águilas
        "'El Centro'": "coordinates: { lat: 37.4069, lng: -1.5819 },",
        "'Calabardina'": "coordinates: { lat: 37.4170, lng: -1.5200 },",
        "'Los Collados'": "coordinates: { lat: 37.4200, lng: -1.5500 },",

        // Cartagena
        '"Casco Antiguo"': "coordinates: { lat: 37.6000, lng: -0.9833 },",
        '"Ensanche"': "coordinates: { lat: 37.6100, lng: -0.9900 },",
        '"Cala Cortina / Hamnen"': "coordinates: { lat: 37.5900, lng: -0.9800 },",
        '"Tentegorra"': "coordinates: { lat: 37.6150, lng: -1.0100 },",

        // Mar de Cristal
        "'Strandnära'": "coordinates: { lat: 37.6333, lng: -0.7333 },",
        "'Villaområden'": "coordinates: { lat: 37.6300, lng: -0.7350 },",

        // Murcia
        "'Centrum (Catedral)'": "coordinates: { lat: 37.9838, lng: -1.1280 },",
        "'Zona Norte'": "coordinates: { lat: 38.0200, lng: -1.1300 },",

        // San Javier
        "'Ribera - Stranden'": "coordinates: { lat: 37.8000, lng: -0.8000 },",
        "'San Javier - Stad'": "coordinates: { lat: 37.8060, lng: -0.8350 },",

        // San Pedro
        "'Lo Pagán'": "coordinates: { lat: 37.8200, lng: -0.7800 },",
        "'San Pedro Stad'": "coordinates: { lat: 37.8350, lng: -0.7900 },",

        // Torre Pacheco
        "'Santa Rosalia'": "coordinates: { lat: 37.7600, lng: -0.9000 },",
        "'Mar Menor Golf'": "coordinates: { lat: 37.7300, lng: -0.9200 },",
        "'La Torre'": "coordinates: { lat: 37.8000, lng: -0.9800 },",
    };

    let updatedContent = content;

    for (const [name, coordString] of Object.entries(districtCoords)) {
        // Regex to find the name property and insert coordinates after it, if not already present
        // Looking for: name: 'El Centro', ...
        // We want: name: 'El Centro', coordinates: { ... }, ...
        const regex = new RegExp(`(name:\\s*${name}\\s*,)`, 'g');

        if (updatedContent.match(regex)) {
            // Check if it already has coordinates to avoid double insertion matching simplisticly
            const checkRegex = new RegExp(`name:\\s*${name}[\\s\\S]{0,100}coordinates:`, 'g');
            if (!updatedContent.match(checkRegex)) {
                updatedContent = updatedContent.replace(regex, `$1 ${coordString}`);
                console.log(`Updated ${name}`);
            } else {
                console.log(`Skipped ${name} (already has coords)`);
            }
        } else {
            console.warn(`Could not find district ${name}`);
        }
    }

    await fs.writeFile(targetPath, updatedContent, 'utf-8');
}

main().catch(console.error);
