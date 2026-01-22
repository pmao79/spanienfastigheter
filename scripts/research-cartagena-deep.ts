
import { researchArea, queryPerplexity } from '../lib/perplexity';
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

async function main() {
    await loadEnv();
    console.log('Starting deep research for Cartagena...');

    const prompts = {
        quickFacts: `Research Cartagena in Costa Cálida, Spain. Return a valid JSON object (no markdown) with this structure:
        {
            "quickFacts": {
                "population": { "value": number, "year": number, "source": "string" },
                "foreignPercentage": { "value": number, "source": "string" },
                "swedesEstimate": { "value": number, "note": "string" },
                "airportDistance": { "km": number, "minutes": number, "airport": "string" },
                "directFlights": { "airlines": ["string"], "frequencyPerWeek": number },
                "pricePerM2": { "value": number, "source": "string", "year": number },
                "sunshineHours": { "value": number },
                "averageTemp": { "annual": number, "january": number, "july": number }
            },
            "whySwedes": ["string", "string", "string"],
            "notSuitableFor": ["string", "string"]
        }`,
        content: `Research Cartagena in Costa Cálida, Spain. Return a valid JSON object (no markdown) with this structure:
        {
            "intro": "concise, engaging introduction for Scandinavian buyers",
            "lifestyle": "detailed description of daily life, atmosphere, and vibe",
            "climate": "climate description focused on winter warmth and summer heat",
            "attractions": "key sights and activities",
            "transport": "detailed transport options including distance to Alicante/Murcia airports",
            "propertyMarket": "current market analysis 2024/2025, price trends, areas to watch",
            "buyingTips": "specific advice for buyers in this area (best streets, pitfalls)"
        }`,
        details: `Research Cartagena in Costa Cálida, Spain. Return a valid JSON object (no markdown) with this structure:
        {
            "districts": [
                {
                    "name": "string",
                    "character": "string",
                    "pricePerM2": number,
                    "suitableFor": ["string"],
                    "pros": ["string"],
                    "cons": ["string"]
                }
            ],
            "highlights": [
                { "icon": "string (choose from: sun, beach, golf, history, food, nature)", "title": "string", "description": "string" }
            ],
            "faq": [
                { "question": "string", "answer": "string" }
            ]
        }`
    };

    const results: any = {};

    try {
        console.log('Fetching Quick Facts...');
        const r1 = await queryPerplexity(prompts.quickFacts);
        const j1 = JSON.parse(r1.content.replace(/```json|```/g, '').trim());
        Object.assign(results, j1);

        console.log('Fetching Content...');
        const r2 = await queryPerplexity(prompts.content);
        const j2 = JSON.parse(r2.content.replace(/```json|```/g, '').trim());
        results.content = j2;

        console.log('Fetching Details...');
        const r3 = await queryPerplexity(prompts.details);
        const j3 = JSON.parse(r3.content.replace(/```json|```/g, '').trim());
        Object.assign(results, j3);

        await fs.writeFile('cartagena_deep_data.json', JSON.stringify(results, null, 2));
        console.log('Deep research complete!');

    } catch (error) {
        console.error('Research failed:', error);
    }
}

main().catch(console.error);
