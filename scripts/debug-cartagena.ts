
import * as fs from 'fs/promises';
import * as path from 'path';

async function main() {
    const researchFile = path.join(process.cwd(), 'area_research_results.json');
    const content = await fs.readFile(researchFile, 'utf-8');
    const data = JSON.parse(content);

    const cartagena = data.find((r: any) => r.area === 'Cartagena' || r.areaName === 'Cartagena');

    if (cartagena) {
        console.log('Found Cartagena!');
        console.log('Keys:', Object.keys(cartagena));
        console.log('Data keys:', cartagena.data ? Object.keys(cartagena.data) : 'No data object');
        console.log('Content preview:', JSON.stringify(cartagena, null, 2).substring(0, 500));
    } else {
        console.log('Cartagena NOT found in JSON.');
        console.log('Total entries:', data.length);
        console.log('Areas present:', data.map((r: any) => r.area).join(', '));
    }
}

main();
