
import { queryPerplexity } from '../lib/perplexity';
import * as fs from 'fs/promises';
import * as path from 'path';

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
    console.log('Testing Perplexity API...');
    try {
        const result = await queryPerplexity('Hello, are you working?');
        console.log('Result:', result.content);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
