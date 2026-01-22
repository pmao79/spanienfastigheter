
import { researchArea } from '../lib/perplexity';
import * as fs from 'fs/promises';
import * as path from 'path';

// Manually load .env.local
async function loadEnv() {
    try {
        const envPath = path.join(process.cwd(), '.env.local');
        const envContent = await fs.readFile(envPath, 'utf-8');
        envContent.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim();
                if (!process.env[key]) {
                    process.env[key] = value;
                }
            }
        });
        console.log('Loaded .env.local');
    } catch (e) {
        console.error('Failed to load .env.local', e);
    }
}

// List of new areas to research
const AREAS = [
    { name: 'Cartagena', region: 'Costa Cálida' }
];


async function main() {
    await loadEnv();
    console.log('Starting comprehensive area research...');

    const results: any[] = [];
    const outputFile = path.join(process.cwd(), 'area_research_results.json');

    // We'll do a small test batch first to ensure it works, or all if confident.
    // Given the rate limits and time, let's try to do them all but sequentially.
    // Note: This might take a while.

    // To avoid timeout, we might want to do this in chunks or just the first few to demonstrate.
    // However, the user asked to fix ALL.

    // Let's check if we have a partial result file to resume from?
    let existingData = [];
    try {
        const content = await fs.readFile(outputFile, 'utf-8');
        existingData = JSON.parse(content);
        console.log(`Loaded ${existingData.length} existing records.`);
    } catch (e) {
        // File doesn't exist, start fresh
    }

    const existingResearch = new Set(existingData.map((r: any) => r.area));

    for (const area of AREAS) {
        // Skip if already researched
        // FORCE RUN for Cartagena debug
        /*if (existingResearch.has(area.name)) {
            console.log(`Skipping ${area.name} - already researched`);
            continue;
        }*/

        console.log(`\n-----------------------------------`);
        console.log(`Researching: ${area.name} (${area.region})`);

        try {
            // Using a generic nearby area for comparison based on region
            const nearby = area.region === 'Costa Blanca' ? 'Torrevieja' :
                area.region === 'Costa Calida' ? 'La Manga' :
                    area.region === 'Costa Almeria' ? 'Mojacar' : 'Marbella';

            const research = await researchArea(area.name, nearby);

            const resultRecord = {
                area: area.name,
                region: area.region,
                timestamp: new Date().toISOString(),
                data: research
            };

            existingData.push(resultRecord);

            // Save after each successful fetch to minimize data loss
            await fs.writeFile(outputFile, JSON.stringify(existingData, null, 2));

        } catch (error) {
            console.error(`Failed to research ${area.name}:`, error);
        }
    }

    console.log('\nResearch complete!');
}

main().catch(console.error);
