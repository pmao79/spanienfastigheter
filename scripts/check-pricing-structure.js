const fs = require('fs');
const path = require('path');

const golfDir = path.join(__dirname, '../data/golf');
const files = fs.readdirSync(golfDir).filter(f => f.endsWith('.json'));

console.log(`Checking pricing structure for ${files.length} golf courses...`);

files.forEach(file => {
    if (file === 'courses.ts') return;

    try {
        const content = fs.readFileSync(path.join(golfDir, file), 'utf8');
        const course = JSON.parse(content);

        // Navigate safely to highSeason.weekday.min
        if (!course.pricing) {
            console.error(`[${file}] FAIL: Missing 'pricing' object`);
            return;
        }
        if (!course.pricing.greenFee) {
            console.error(`[${file}] FAIL: Missing 'pricing.greenFee'`);
            return;
        }
        if (!course.pricing.greenFee.highSeason) {
            console.error(`[${file}] FAIL: Missing 'pricing.greenFee.highSeason'`);
            return;
        }
        if (!course.pricing.greenFee.highSeason.weekday) {
            console.error(`[${file}] FAIL: Missing 'pricing.greenFee.highSeason.weekday'`);
            return;
        }
        if (typeof course.pricing.greenFee.highSeason.weekday.min === 'undefined') {
            console.error(`[${file}] FAIL: Missing 'pricing.greenFee.highSeason.weekday.min'`);
            return;
        }

        // console.log(`[${file}] PASS`);
    } catch (e) {
        console.error(`[${file}] JSON Parse Error: ${e.message}`);
    }
});
