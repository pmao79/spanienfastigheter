import { AreaResearch } from '@/types/property';

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const API_URL = 'https://api.perplexity.ai/chat/completions';

interface PerplexityMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface PerplexityResponse {
    choices: Array<{
        message: {
            content: string;
        };
    }>;
    citations?: string[];
}

/**
 * Query Perplexity API for area research
 */
export async function queryPerplexity(
    query: string,
    systemPrompt?: string
): Promise<{ content: string; citations: string[] }> {
    const messages: PerplexityMessage[] = [
        {
            role: 'system',
            content: systemPrompt ||
                'You are a research assistant specializing in Spanish real estate for Swedish buyers. ' +
                'Always provide specific numbers, dates, and sources. ' +
                'Focus on facts relevant to Scandinavian expatriates. ' +
                'Respond in English with precise data.'
        },
        {
            role: 'user',
            content: query
        }
    ];

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'sonar-pro',
            messages,
            max_tokens: 2000,
            temperature: 0.2,
            return_citations: true
        })
    });

    if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.status} ${response.statusText}`);
    }

    const data: PerplexityResponse = await response.json();

    return {
        content: data.choices[0]?.message?.content || '',
        citations: data.citations || []
    };
}

/**
 * Research queries for a specific area
 */
export const RESEARCH_QUERIES = {
    population: (area: string) =>
        `${area} Spain population 2024 2025 demographics foreigners residents breakdown`,

    prices: (area: string) =>
        `${area} Spain property prices per square meter average 2024 2025 apartments villas`,

    scandinavians: (area: string) =>
        `${area} Spain Swedish Scandinavian Norwegian expat community population`,

    neighborhoods: (area: string) =>
        `${area} Spain best neighborhoods districts areas for living character prices pros cons`,

    climate: (area: string) =>
        `${area} Spain climate temperature sunshine hours rain annual averages compared Stockholm`,

    transport: (area: string) =>
        `${area} Spain Alicante OR Malaga airport distance km flights Sweden SAS Norwegian direct`,

    healthcare: (area: string) =>
        `${area} Spain healthcare hospital clinic international private Swedish speaking doctors`,

    market: (area: string) =>
        `${area} Spain real estate market trend 2024 2025 rental yield tourist license VUT`,

    lifestyle: (area: string) =>
        `${area} Spain beaches golf courses restaurants nightlife lifestyle amenities`,

    comparison: (area: string, nearby: string) =>
        `${area} vs ${nearby} Spain property comparison prices lifestyle pros cons`
};

/**
 * Comprehensive research for an area - runs multiple queries
 */
export async function researchArea(
    areaName: string,
    nearbyArea: string
): Promise<AreaResearch> {
    console.log(`🔍 Researching ${areaName}...`);

    const results: Partial<AreaResearch> = {
        areaName,
        researchDate: new Date().toISOString(),
        sources: []
    };

    // Run queries (with delay to avoid rate limiting)
    const queries = [
        { key: 'population', query: RESEARCH_QUERIES.population(areaName) },
        { key: 'prices', query: RESEARCH_QUERIES.prices(areaName) },
        { key: 'scandinavians', query: RESEARCH_QUERIES.scandinavians(areaName) },
        { key: 'neighborhoods', query: RESEARCH_QUERIES.neighborhoods(areaName) },
        { key: 'climate', query: RESEARCH_QUERIES.climate(areaName) },
        { key: 'transport', query: RESEARCH_QUERIES.transport(areaName) },
        { key: 'healthcare', query: RESEARCH_QUERIES.healthcare(areaName) },
        { key: 'market', query: RESEARCH_QUERIES.market(areaName) },
        { key: 'lifestyle', query: RESEARCH_QUERIES.lifestyle(areaName) },
        { key: 'comparison', query: RESEARCH_QUERIES.comparison(areaName, nearbyArea) }
    ];

    for (const { key, query } of queries) {
        try {
            console.log(`  📝 Query: ${key}`);
            const result = await queryPerplexity(query);
            (results as Record<string, unknown>)[key] = result.content;
            results.sources = [...(results.sources || []), ...result.citations];

            // Delay between queries (1 second)
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(`  ❌ Error in ${key}:`, error);
            (results as Record<string, unknown>)[key] = null;
        }
    }

    // Deduplicate sources
    results.sources = [...new Set(results.sources)];

    return results as AreaResearch;
}

/**
 * Parse population data from research
 */
export function parsePopulation(text: string): {
    population: number;
    year: number;
    foreignPercentage: number;
    swedesEstimate: number;
} | null {
    // Extract numbers from research text
    const popMatch = text.match(/population[^0-9]*(\d{1,3}(?:,\d{3})*|\d+)/i);
    const foreignMatch = text.match(/(\d{1,2}(?:\.\d+)?)\s*%?\s*(?:foreign|international|expat)/i);
    const swedesMatch = text.match(/(\d{1,3}(?:,\d{3})*|\d+)\s*(?:swedish|swedes|scandinavian)/i);

    if (!popMatch) return null;

    return {
        population: parseInt(popMatch[1].replace(/,/g, '')),
        year: 2024,
        foreignPercentage: foreignMatch ? parseFloat(foreignMatch[1]) : 0,
        swedesEstimate: swedesMatch ? parseInt(swedesMatch[1].replace(/,/g, '')) : 0
    };
}

/**
 * Parse price data from research
 */
export function parsePrices(text: string): {
    pricePerM2: number;
    priceRange: { min: number; max: number };
    trend: string;
} | null {
    const priceMatch = text.match(/€?\s*(\d{1,2}(?:,\d{3})*|\d+)\s*(?:€|EUR)?\s*(?:per|\/)\s*(?:m²|sqm|square meter)/i);

    if (!priceMatch) return null;

    const price = parseInt(priceMatch[1].replace(/,/g, ''));

    return {
        pricePerM2: price,
        priceRange: { min: price * 0.7, max: price * 1.5 },
        trend: text.includes('increas') ? 'rising' : text.includes('decreas') ? 'falling' : 'stable'
    };
}
