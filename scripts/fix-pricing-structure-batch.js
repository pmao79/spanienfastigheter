const fs = require('fs');
const path = require('path');

const golfDir = path.join(__dirname, '../data/golf');
const files = fs.readdirSync(golfDir).filter(f => f.endsWith('.json'));

let fixedCount = 0;

files.forEach(file => {
    if (file === 'courses.ts') return;

    const filePath = path.join(golfDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let course;

    try {
        course = JSON.parse(content);
    } catch (e) {
        console.error(`Error parsing ${file}:`, e);
        return;
    }

    let modified = false;

    // Helper to fix a season object
    const fixSeason = (seasonObj) => {
        if (!seasonObj) return seasonObj;

        let newSeasonObj = {};

        // Handle "18holes" property
        if (typeof seasonObj['18holes'] === 'number') {
            const price = seasonObj['18holes'];
            newSeasonObj.weekday = { min: price, max: price };
            newSeasonObj.weekend = { min: price, max: price };
            return newSeasonObj;
        }

        // Handle "18holes" object
        if (typeof seasonObj['18holes'] === 'object') {
            // If it has weekday/weekend inside
            if (seasonObj['18holes'].weekday !== undefined) {
                // Check if it's number or object
                let wdMin = 0, wdMax = 0;
                if (typeof seasonObj['18holes'].weekday === 'number') {
                    wdMin = wdMax = seasonObj['18holes'].weekday;
                } else {
                    wdMin = seasonObj['18holes'].weekday.min;
                    wdMax = seasonObj['18holes'].weekday.max;
                }

                let weMin = 0, weMax = 0;
                if (seasonObj['18holes'].weekend !== undefined) {
                    if (typeof seasonObj['18holes'].weekend === 'number') {
                        weMin = weMax = seasonObj['18holes'].weekend;
                    } else {
                        weMin = seasonObj['18holes'].weekend.min;
                        weMax = seasonObj['18holes'].weekend.max;
                    }
                } else {
                    weMin = wdMin; weMax = wdMax;
                }

                newSeasonObj.weekday = { min: wdMin, max: wdMax };
                newSeasonObj.weekend = { min: weMin, max: weMax };
                return newSeasonObj;
            }
        }

        // Already correct?
        if (seasonObj.weekday && seasonObj.weekday.min !== undefined) {
            return seasonObj;
        }

        return seasonObj;
    };

    if (course.pricing && course.pricing.greenFee) {
        const oldHigh = JSON.stringify(course.pricing.greenFee.highSeason);
        const newHigh = fixSeason(course.pricing.greenFee.highSeason);

        const oldLow = JSON.stringify(course.pricing.greenFee.lowSeason);
        const newLow = fixSeason(course.pricing.greenFee.lowSeason);

        if (JSON.stringify(newHigh) !== oldHigh) {
            course.pricing.greenFee.highSeason = newHigh;
            modified = true;
        }
        if (JSON.stringify(newLow) !== oldLow) {
            course.pricing.greenFee.lowSeason = newLow;
            modified = true;
        }
    }

    if (modified) {
        console.log(`Fixing pricing in ${file}`);
        fs.writeFileSync(filePath, JSON.stringify(course, null, 2));
        fixedCount++;
    }
});

console.log(`Fixed ${fixedCount} files.`);
