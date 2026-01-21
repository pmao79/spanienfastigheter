const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Image prompts for each course - all unique based on course characteristics
const COURSES = [
    { slug: 'las-colinas', prompt: 'Photorealistic aerial view of Las Colinas Golf course in Orihuela Costa Spain, lush green fairways winding through natural terrain, Mediterranean landscape with palm trees, golden hour lighting, professional golf photography' },
    { slug: 'campoamor', prompt: 'Photorealistic view of Campoamor Golf course in Torrevieja Spain, well-manicured fairways with strategic bunkers, oak and pine trees lining the course, blue sky, professional golf photography' },
    { slug: 'villamartin', prompt: 'Photorealistic view of Villamartin Golf course in Orihuela Costa Spain, mature trees and challenging layout, green fairways against Mediterranean backdrop, early morning light, professional golf photography' },
    { slug: 'lo-romero', prompt: 'Photorealistic aerial view of Lo Romero Golf course near Pilar de la Horadada Spain, modern links-style design, coastal Spanish landscape, dramatic shadows, professional golf photography' },
    { slug: 'la-finca', prompt: 'Photorealistic view of La Finca Golf course in Algorfa Spain, award-winning design with lake hazards, palm trees and colorful vegetation, sunny day, professional golf photography' },
    { slug: 'vistabella', prompt: 'Photorealistic view of Vistabella Golf course in Orihuela Costa Spain, desert-style design with mountain backdrop, bunkers and water features, clear blue sky, professional golf photography' },
    { slug: 'la-marquesa', prompt: 'Photorealistic panoramic view of La Marquesa Golf course near Ciudad Quesada Spain, rolling fairways through natural terrain, Spanish countryside, warm sunlight, professional golf photography' },
    { slug: 'alenda', prompt: 'Photorealistic view of Alenda Golf course near Alicante Spain, parkland style with mature trees, green fairways with bunkers, Mediterranean hills background, professional golf photography' },
    { slug: 'bonalba', prompt: 'Photorealistic view of Bonalba Golf course near Alicante Spain, resort course with water features, palm trees and lush vegetation, sunset colors, professional golf photography' },
    { slug: 'el-plantio', prompt: 'Photorealistic view of El Plantio Golf course near Alicante Spain, classic parkland design with old trees, wide fairways, traditional Spanish golf club atmosphere, professional golf photography' },
    { slug: 'valderrama', prompt: 'Photorealistic view of Valderrama Golf Club in Sotogrande Spain, legendary cork oak trees, perfectly manicured Bermuda grass, famous 17th hole, prestigious championship course, professional golf photography' },
    { slug: 'la-cala', prompt: 'Photorealistic aerial view of La Cala Golf Resort in Mijas Spain, three championship courses in mountain setting, stunning Mediterranean coastline views, golden hour, professional golf photography' },
    { slug: 'los-naranjos', prompt: 'Photorealistic view of Los Naranjos Golf Club in Marbella Spain, elegant course with orange trees, lake reflections, Sierra Blanca mountains backdrop, professional golf photography' },
    { slug: 'aloha', prompt: 'Photorealistic view of Aloha Golf Club in Nueva Andalucia Marbella Spain, mature landscaping with water features, La Concha mountain backdrop, luxurious Golf Valley setting, professional golf photography' },
    { slug: 'la-quinta', prompt: 'Photorealistic view of La Quinta Golf in Marbella Spain, 27-hole resort with lakes and bunkers, Sierra Blanca views, palm trees, Mediterranean luxury, professional golf photography' },
    { slug: 'miraflores', prompt: 'Photorealistic view of Miraflores Golf Club in Mijas Costa Spain, undulating parkland course, mature trees and strategic layout, Costa del Sol sunshine, professional golf photography' },
    { slug: 'cabopino', prompt: 'Photorealistic view of Cabopino Golf Marbella Spain, coastal course with pine forest, glimpses of Mediterranean sea, natural beauty, morning mist, professional golf photography' },
    { slug: 'santa-clara', prompt: 'Photorealistic view of Santa Clara Golf Marbella Spain, modern design with ocean views, dramatic elevation changes, whitewashed clubhouse, professional golf photography' },
    { slug: 'torrequebrada', prompt: 'Photorealistic view of Torrequebrada Golf in Benalmadena Spain, classic course with sea views, signature par-3 over ravine, Costa del Sol coastline, professional golf photography' },
    { slug: 'lauro', prompt: 'Photorealistic view of Lauro Golf Resort near Malaga Spain, challenging mountain course, Andalusian countryside, cork oaks and olive trees, authentic Spanish golf experience, professional golf photography' }
];

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'golf');

// Ensure directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generateImages() {
    console.log(`🎨 Starting image generation for ${COURSES.length} courses...\n`);

    for (const course of COURSES) {
        const outputPath = path.join(OUTPUT_DIR, `${course.slug}-hero.png`);

        // Skip if already exists
        if (fs.existsSync(outputPath)) {
            console.log(`⏭️  Skipping ${course.slug} (already exists)`);
            continue;
        }

        console.log(`📸 Generating ${course.slug}...`);

        try {
            const cmd = `python .agent/skills/nanobanana/scripts/generate_image.py "${course.prompt}" --model pro --output "${outputPath}"`;
            execSync(cmd, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
            console.log(`✅ Saved ${course.slug}\n`);

            // Rate limit - wait 3 seconds between requests
            await new Promise(r => setTimeout(r, 3000));
        } catch (e) {
            console.error(`❌ Failed ${course.slug}: ${e.message}\n`);
        }
    }

    console.log('\n🏁 Image generation complete!');
}

generateImages();
