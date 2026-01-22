const fs = require('fs');
const path = require('path');

// Read courses.ts content directly to avoid needing TS compilation for this check
// We'll simplisticly parse the JSON-like structure or just require it if we can transpile.
// Easier: Read the compiled `courses.ts`? No, it's TS.
// Let's read the JSON files in data/golf/ instead, as courses.ts is built from them.

const golfDir = path.join(__dirname, '../data/golf');
const files = fs.readdirSync(golfDir).filter(f => f.endsWith('.json'));

console.log(`Checking ${files.length} golf course JSON files...`);

let errors = 0;

files.forEach(file => {
    const content = fs.readFileSync(path.join(golfDir, file), 'utf8');
    try {
        const course = JSON.parse(content);

        // Check 1: courseInfo.length.meters
        if (!course.courseInfo) {
            console.error(`[${file}] Missing courseInfo`);
            errors++;
        } else if (!course.courseInfo.length) {
            console.error(`[${file}] Missing courseInfo.length`);
            errors++;
        } else if (typeof course.courseInfo.length.meters === 'undefined') {
            console.error(`[${file}] Missing courseInfo.length.meters`);
            errors++;
        }

        // Check 2: media.gallery (array check)
        if (course.media && typeof course.media.gallery === 'undefined') {
            console.error(`[${file}] Missing media.gallery (should be array)`);
            errors++; // Though optional in TS maybe?
        }

        // Check 3: rating (used in Hero)
        if (!course.rating) {
            console.error(`[${file}] Missing rating`);
            errors++;
        }

    } catch (e) {
        console.error(`[${file}] JSON Parse Error: ${e.message}`);
        errors++;
    }
});

if (errors === 0) {
    console.log("All JSON files pass basic checks.");
} else {
    console.log(`Found ${errors} errors.`);
}
