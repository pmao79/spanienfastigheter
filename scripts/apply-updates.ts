
import * as fs from 'fs/promises';
import * as path from 'path';

const RESEARCH_FILE = 'area_research_results.json';
const TARGET_FILES = [
    'lib/area-data-costa-blanca-4.ts',
    'lib/area-data-costa-blanca-5.ts',
    'lib/area-data-costa-calida-2.ts',
    'lib/area-data-costa-almeria-2.ts',
    'lib/area-data-costa-del-sol-3.ts'
];

function cleanText(text: string | null): string {
    if (!text) return 'Information coming soon.';
    // Remove markdown
    let clean = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#/g, '');
    // Remove citation brackets like [1]
    clean = clean.replace(/\[\d+\]/g, '');
    // Escape single quotes
    clean = clean.replace(/'/g, "\\'");
    // Collapse whitespace
    clean = clean.replace(/\s+/g, ' ').trim();
    // Remove "Based on the search results..." type intros
    clean = clean.replace(/^Based on the provided search results,?\s*/i, '');
    clean = clean.replace(/^(?:Here is|This is) a (?:brief |comprehensive |detailed )?(?:overview|guide|summary) (?:of|to).*?(?:\n|$)/i, '');
    clean = clean.replace(/^[A-Za-z\s]+, Spain: A (?:Comprehensive )?Guide.*?(?:\n|$)/i, '');
    clean = clean.replace(/^[A-Za-z\s]+: (?:An )?Overview.*?(?:\n|$)/i, '');

    // Truncate if too long (arbitrary max length to keep code clean)
    if (clean.length > 800) clean = clean.substring(0, 797) + '...';
    return clean;
}

function findContentBlock(fileContent: string, areaName: string, areaSlug: string): { start: number, end: number } | null {
    // Look for name or slug
    const nameMatch = new RegExp(`name:\\s*['"]${areaName}['"]`, 'i').exec(fileContent);
    const slugMatch = new RegExp(`slug:\\s*['"]${areaSlug}['"]`, 'i').exec(fileContent);

    const matchIndex = nameMatch ? nameMatch.index : (slugMatch ? slugMatch.index : -1);
    if (matchIndex === -1) return null;

    // Search forward for "content: {"
    const contentStartRegex = /content:\s*\{/g;
    contentStartRegex.lastIndex = matchIndex;
    const contentMatch = contentStartRegex.exec(fileContent);

    if (!contentMatch) return null;

    // Ensure we haven't skipped to another area (check distance, e.g. < 500 chars)
    if (contentMatch.index - matchIndex > 1000) return null;

    const startIndex = contentMatch.index;
    const openBraceIndex = startIndex + contentMatch[0].length - 1;

    // Find closing brace
    let depth = 1;
    let i = openBraceIndex + 1;
    while (i < fileContent.length && depth > 0) {
        if (fileContent[i] === '{') depth++;
        else if (fileContent[i] === '}') depth--;
        i++;
    }

    if (depth !== 0) return null;

    return { start: startIndex, end: i };
}

async function main() {
    const researchFile = path.join(process.cwd(), RESEARCH_FILE);

    let researchData: any[];
    try {
        researchData = JSON.parse(await fs.readFile(researchFile, 'utf-8'));
    } catch (e) {
        console.error("Research file not found or invalid.");
        return;
    }

    const researchMap = new Map();
    researchData.forEach((r: any) => {
        if (r.data && r.data.areaName) {
            researchMap.set(r.area, r.data);
            researchMap.set(r.area.toLowerCase(), r.data);
            researchMap.set(r.data.areaName, r.data);
        }
    });

    for (const file of TARGET_FILES) {
        const filePath = path.join(process.cwd(), file);
        if (!require('fs').existsSync(filePath)) {
            console.log(`Skipping missing file: ${file}`);
            continue;
        }

        console.log(`Processing ${file}...`);

        let content = await fs.readFile(filePath, 'utf-8');
        let modified = false;

        // Iterate through all research data and try to find matches in this file
        // Warning: This updates the string in-place, so offsets shift!
        // Strategy: Build a list of replacements, then apply them from bottom to top to preserve offsets.

        const replacements: { start: number, end: number, text: string }[] = [];

        // Identify all areas in the file roughly
        const areaRegex = /slug:\s*'([^']+)',\s*name:\s*'([^']+)'/g;
        let match;

        while ((match = areaRegex.exec(content)) !== null) {
            const slug = match[1];
            const name = match[2];

            // Find data
            let data = researchMap.get(name) || researchMap.get(name.split(' / ')[0]) || researchMap.get(slug); // Try simple slug match too

            // Try fuzzy
            if (!data) {
                for (const [key, val] of researchMap.entries()) {
                    if (name.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(name.toLowerCase())) {
                        data = val;
                        break;
                    }
                }
            }

            if (!data) {
                console.log(`  No data for ${name}`);
                continue;
            }

            const block = findContentBlock(content, name, slug);
            if (!block) {
                console.log(`  Could not find content block for ${name}`);
                continue;
            }

            console.log(`  Queueing update for ${name}`);

            const intro = cleanText(data.neighborhoods || data.market || data.areaName);
            const lifestyle = cleanText(data.lifestyle);
            const climate = cleanText(data.climate);
            const attractions = cleanText(data.lifestyle ? data.lifestyle : "");
            const transport = cleanText(data.transport);
            const market = cleanText((data.market || "") + " " + (data.prices || ""));
            const tips = cleanText(data.comparison || data.neighborhoods);

            const newBlock = `content: {
            intro: '${intro}',
            lifestyle: '${lifestyle}',
            climate: '${climate}',
            attractions: '${attractions}',
            transport: '${transport}',
            propertyMarket: '${market}',
            buyingTips: '${tips}'
        }`;

            replacements.push({
                start: block.start,
                end: block.end,
                text: newBlock
            });
        }

        // Apply replacements from bottom to top
        replacements.sort((a, b) => b.start - a.start);

        for (const rep of replacements) {
            content = content.substring(0, rep.start) + rep.text + content.substring(rep.end);
            modified = true;
        }

        if (modified) {
            await fs.writeFile(filePath, content, 'utf-8');
            console.log(`  Saved updates to ${file}`);
        }
    }
}

main().catch(console.error);
