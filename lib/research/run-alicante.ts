/**
 * Research script for Alicante - Run via Node.js
 * Usage: npx ts-node --esm lib/research/run-alicante.ts
 */

const PERPLEXITY_API_KEY = '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';
const API_URL = 'https://api.perplexity.ai/chat/completions';

interface PerplexityResponse {
    choices: Array<{
        message: { content: string };
    }>;
    citations?: string[];
}

async function queryPerplexity(query: string): Promise<{ content: string; citations: string[] }> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'sonar-pro',
            messages: [
                {
                    role: 'system',
                    content: 'You are a research assistant specializing in Spanish real estate for Swedish buyers. Always provide specific numbers, dates, and cite sources. Focus on facts relevant to Scandinavian expatriates. Respond in English with precise data.'
                },
                { role: 'user', content: query }
            ],
            max_tokens: 2000,
            temperature: 0.2,
            return_citations: true
        })
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const data: PerplexityResponse = await response.json();
    return {
        content: data.choices[0]?.message?.content || '',
        citations: data.citations || []
    };
}

// Research queries for Alicante
const ALICANTE_QUERIES = [
    'Alicante city Spain population 2024 2025 demographics foreigners residents expats breakdown statistics',
    'Alicante city Spain property prices per square meter average 2024 2025 apartments villas real estate market Playa San Juan vs Centro',
    'Alicante city Spain Swedish Scandinavian expat community how many Swedish residents',
    'Alicante city Spain best neighborhoods districts areas for living Playa San Juan Cabo de las Huertas Centro Casco Antiguo character prices',
    'Alicante city Spain climate temperature sunshine hours rain annual averages compared Stockholm weather',
    'Alicante airport distance km transport options tram bus taxi flights Sweden',
    'Alicante city Spain healthcare hospital General Hospital private clinics English speaking doctors',
    'Alicante city Spain real estate market trend 2024 2025 rental yield tourist license investment',
    'Alicante city Spain beaches Postiguet San Juan restaurants nightlife lifestyle amenities castle',
    'Alicante city vs Malaga vs Valencia comparison property prices lifestyle pros cons'
];

async function runResearch() {
    console.log('🔍 Starting Alicante research...\n');

    const results: Record<string, { content: string; citations: string[] }> = {};
    const allSources: string[] = [];

    for (let i = 0; i < ALICANTE_QUERIES.length; i++) {
        const query = ALICANTE_QUERIES[i];
        console.log(`📝 Query ${i + 1}/${ALICANTE_QUERIES.length}: ${query.substring(0, 50)}...`);

        try {
            const result = await queryPerplexity(query);
            results[`query_${i + 1}`] = result;
            allSources.push(...result.citations);
            console.log(`   ✅ Got ${result.content.length} chars, ${result.citations.length} citations\n`);

            // Delay 1.5s between queries to respect rate limits
            if (i < ALICANTE_QUERIES.length - 1) {
                await new Promise(r => setTimeout(r, 1500));
            }
        } catch (error) {
            console.log(`   ❌ Error: ${error}\n`);
            results[`query_${i + 1}`] = { content: '', citations: [] };
        }
    }

    // Dedupe and save
    const uniqueSources = [...new Set(allSources)];

    console.log('\n📊 Research complete!');
    console.log(`   Total queries: ${ALICANTE_QUERIES.length}`);
    console.log(`   Unique sources: ${uniqueSources.length}`);

    // Save to file
    const fs = await import('fs/promises');
    const path = await import('path');
    const outputPath = path.resolve('lib/research/alicante.json');

    await fs.writeFile(outputPath, JSON.stringify({
        date: new Date().toISOString(),
        queries: results,
        sources: uniqueSources
    }, null, 2));

    console.log(`\n💾 Saved results to: ${outputPath}`);
}

runResearch().catch(console.error);
