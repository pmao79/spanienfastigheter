/**
 * Research script for Benidorm - Run via Node.js
 * Usage: npx ts-node --esm lib/research/run-benidorm.ts
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

// Research queries for Benidorm
const BENIDORM_QUERIES = [
    'Benidorm Spain population 2024 2025 demographics foreigners residents expats breakdown statistics',
    'Benidorm Spain property prices per square meter average 2024 2025 apartments villas real estate market',
    'Benidorm Spain Swedish Scandinavian Norwegian expat community how many Swedish residents',
    'Benidorm Spain best neighborhoods districts areas for living Poniente Levante Rincon de Loix Old Town character prices',
    'Benidorm Spain climate temperature sunshine hours rain annual averages compared Stockholm weather',
    'Benidorm Alicante airport distance km transport options shuttle bus tram flights Sweden',
    'Benidorm Spain healthcare hospital clinic IMED Levante Hospital Clinica Benidorm international private English speaking doctors',
    'Benidorm Spain real estate market trend 2024 2025 rental yield tourist license VUT investment Airbnb',
    'Benidorm Spain beaches golf courses restaurants nightlife lifestyle amenities Terra Mitica shopping',
    'Benidorm vs Calpe vs Altea comparison property prices lifestyle pros cons'
];

async function runResearch() {
    console.log('🔍 Starting Benidorm research...\n');

    const results: Record<string, { content: string; citations: string[] }> = {};
    const allSources: string[] = [];

    for (let i = 0; i < BENIDORM_QUERIES.length; i++) {
        const query = BENIDORM_QUERIES[i];
        console.log(`📝 Query ${i + 1}/${BENIDORM_QUERIES.length}: ${query.substring(0, 50)}...`);

        try {
            const result = await queryPerplexity(query);
            results[`query_${i + 1}`] = result;
            allSources.push(...result.citations);
            console.log(`   ✅ Got ${result.content.length} chars, ${result.citations.length} citations\n`);

            // Delay 1.5s between queries to respect rate limits
            if (i < BENIDORM_QUERIES.length - 1) {
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
    console.log(`   Total queries: ${BENIDORM_QUERIES.length}`);
    console.log(`   Unique sources: ${uniqueSources.length}`);

    // Save to file
    const fs = await import('fs/promises');
    const path = await import('path');
    const outputPath = path.resolve('lib/research/benidorm.json');

    await fs.writeFile(outputPath, JSON.stringify({
        date: new Date().toISOString(),
        queries: results,
        sources: uniqueSources
    }, null, 2));

    console.log(`\n💾 Saved results to: ${outputPath}`);
}

runResearch().catch(console.error);
