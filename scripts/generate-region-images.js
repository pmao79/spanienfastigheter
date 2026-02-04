const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REGION_PROMPTS = {
    'costa-blanca': {
        hero: 'Aerial photograph of Benidorm skyline and beach, Costa Blanca, Spain, crystal clear Mediterranean water, white sandy beach, high-rise buildings, sunny day, professional travel photography, 8k',
        beach: 'Playa de Levante beach in Benidorm, Costa Blanca, Spain, turquoise water, palm trees, Mediterranean coastline, summer day, photorealistic, travel magazine quality',
        town: 'Traditional Spanish old town of Altea, Costa Blanca, white buildings with blue domes, Mediterranean sea in background, cobblestone streets, golden hour, professional photography'
    },
    'costa-del-sol': {
        hero: 'Aerial view of Puerto Banus marina, Marbella, Costa del Sol, Spain, luxury yachts, Mediterranean sea, mountains in background, sunny day, professional travel photography, 8k',
        beach: 'Playa de la Malagueta beach, Malaga, Costa del Sol, Spain, palm trees, chiringuitos, Mediterranean coastline, summer atmosphere, photorealistic',
        town: 'Mijas Pueblo white village, Costa del Sol, Spain, whitewashed buildings, flower pots, narrow streets, mountain views, golden hour lighting, travel photography'
    },
    'costa-calida': {
        hero: 'Mar Menor lagoon aerial view, La Manga del Mar Menor, Costa Calida, Murcia, Spain, turquoise waters, sandbar peninsula, Mediterranean sea, professional aerial photography, 8k',
        beach: 'Playa de Bolnuevo beach with eroded rock formations, Mazarron, Costa Calida, Spain, unique geological formations, clear water, sunny day, travel photography',
        town: 'Historic center of Cartagena, Costa Calida, Spain, Roman amphitheater, port city, Mediterranean architecture, blue sky, professional travel photography'
    },
    'costa-almeria': {
        hero: 'Cabo de Gata natural park coastline, Costa de Almeria, Spain, volcanic cliffs, pristine beaches, crystal clear water, untouched nature, professional landscape photography, 8k',
        beach: 'Playa de los Muertos beach, Carboneras, Costa de Almeria, Spain, dramatic cliffs, turquoise water, unspoiled beach, travel photography',
        town: 'Mojacar Pueblo white village on hilltop, Costa de Almeria, Spain, traditional Andalusian architecture, sea views, whitewashed buildings, sunset light, professional photography'
    }
};

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'regions');
const SKILL_SCRIPT = path.join(__dirname, '..', '.agents', 'skills', 'nano-banana-pro', 'scripts', 'generate_image.py');
const envLocalPath = path.join(__dirname, '..', '.env.local');
let envLocal = '';

if (fs.existsSync(envLocalPath)) {
    envLocal = fs.readFileSync(envLocalPath, 'utf8');
}

function readEnvKey(key) {
    const match = envLocal.match(new RegExp(`^${key}=(.*)$`, 'm'));
    if (!match) return undefined;
    return match[1].replace(/^"|"$/g, '').trim();
}

const API_KEY = process.env.GEMINI_API_KEY
    || process.env.GOOGLE_NANOBANANA_KEY
    || readEnvKey('GEMINI_API_KEY')
    || readEnvKey('GOOGLE_NANOBANANA_KEY');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateImages() {
    const imageTypes = ['hero', 'beach', 'town'];
    const regions = Object.keys(REGION_PROMPTS);

    console.log(`Starting image generation for ${regions.length} regions...`);

    for (const region of regions) {
        for (const type of imageTypes) {
            const prompt = REGION_PROMPTS[region][type];
            const outputPath = path.join(OUTPUT_DIR, `${region}-${type}.png`);

            if (fs.existsSync(outputPath)) {
                console.log(`Skipping ${region}-${type} (already exists)`);
                continue;
            }

            console.log(`Generating ${region}-${type}...`);

            try {
                const apiKeyArg = API_KEY ? ` --api-key "${API_KEY}"` : '';
                const cmd = `uv run "${SKILL_SCRIPT}" --prompt "${prompt}" --filename "${outputPath}" --resolution 2K${apiKeyArg}`;
                execSync(cmd, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
                console.log(`Saved ${region}-${type}`);
                await new Promise(r => setTimeout(r, 3000));
            } catch (error) {
                console.error(`Failed ${region}-${type}: ${error.message}`);
            }
        }
    }

    console.log('Image generation complete.');
}

generateImages();
