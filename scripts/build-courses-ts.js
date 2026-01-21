const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data', 'golf');
const OUTPUT_FILE = path.join(DATA_DIR, 'courses.ts');

if (!fs.existsSync(DATA_DIR)) {
    console.error('Data dir not found');
    process.exit(1);
}

const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
const courses = [];

for (const file of files) {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));

        // Inject Media
        const heroPath = `/images/golf/${data.slug}-hero.png`;
        // Check if file exists in public/images/golf (optional, but good practice)
        // For now we assume the generate script ran/will run.

        data.media = {
            heroImage: heroPath,
            gallery: []
        };

        // Normalize region to lowercase slug format
        if (data.region) {
            const regionNormalize = {
                'Costa del Sol': 'costa-del-sol',
                'Costa Blanca': 'costa-blanca',
                'costa del sol': 'costa-del-sol',
                'costa blanca': 'costa-blanca'
            };
            if (regionNormalize[data.region]) {
                data.region = regionNormalize[data.region];
            }
        }

        // Inject Season Dates if missing
        if (!data.pricing.seasonDates) {
            data.pricing.seasonDates = {
                highSeason: { from: '01-10', to: '31-05' },
                lowSeason: { from: '01-06', to: '30-09' }
            };
        }

        // Inject Defaults for strict Types
        if (!data.pricing.lastUpdated) data.pricing.lastUpdated = new Date().toISOString();

        // Replace null values with 0 in pricing
        const fixNullPrices = (obj) => {
            if (!obj) return obj;
            for (const key of Object.keys(obj)) {
                if (obj[key] === null) obj[key] = 0;
                else if (typeof obj[key] === 'object') fixNullPrices(obj[key]);
            }
            return obj;
        };
        if (data.pricing.greenFee) fixNullPrices(data.pricing.greenFee);

        // Fix null coordinates
        if (data.coordinates) {
            if (data.coordinates.lat === null) data.coordinates.lat = 0;
            if (data.coordinates.lng === null) data.coordinates.lng = 0;
        }

        // Fix null rating
        if (data.rating) {
            if (data.rating.overall === null) data.rating.overall = 0;
        }

        // Merge extras defaults
        const defaultExtras = {
            buggy: 40,
            clubRental: 30,
            trolley: 5,
            rangeBalls: 4,
            rangeBallsIncluded: false
        };
        data.pricing.extras = { ...defaultExtras, ...(data.pricing.extras || {}) };

        // Ensure all required fields from interface are present (defaults)
        if (!data.contact.phoneInternational) data.contact.phoneInternational = data.contact.phone || '';
        if (!data.contact.email) data.contact.email = ''; // Ensure email is at least empty string

        // Ensure facilities structure exists and merge defaults
        if (!data.facilities) data.facilities = { course: {}, clubhouse: {}, services: {}, other: {} };

        // Defaults for sub-objects
        const defaultCourse = { drivingRange: true, puttingGreen: true, chippingGreen: true, practiceBunker: true };
        const defaultClubhouse = { restaurant: true, proshop: true, locker: true, bar: true, terrace: true, shower: true };
        const defaultServices = { golfSchool: false, proAvailable: false, clubFitting: false, clubRepair: false, caddie: false };
        const defaultOther = {};

        data.facilities.course = { ...defaultCourse, ...(data.facilities.course || {}) };
        data.facilities.clubhouse = { ...defaultClubhouse, ...(data.facilities.clubhouse || {}) };
        data.facilities.services = { ...defaultServices, ...(data.facilities.services || {}) };
        data.facilities.other = { ...defaultOther, ...(data.facilities.other || {}) };

        // Fix null booleans in facilities
        const fixNullBooleans = (obj) => {
            if (!obj) return obj;
            for (const key of Object.keys(obj)) {
                if (obj[key] === null) obj[key] = false;
            }
            return obj;
        };
        fixNullBooleans(data.facilities.course);
        fixNullBooleans(data.facilities.clubhouse);
        fixNullBooleans(data.facilities.services);
        fixNullBooleans(data.facilities.other);

        // Normalize signatureHoles: convert raw numbers and strings to objects
        if (data.signatureHoles && Array.isArray(data.signatureHoles)) {
            data.signatureHoles = data.signatureHoles.map(hole => {
                if (typeof hole === 'number') {
                    return { number: hole, description: '' };
                }
                if (typeof hole === 'string') {
                    // Extract hole number if possible, e.g. "Hål 12 (...)"
                    const match = hole.match(/(\d+)/);
                    const num = match ? parseInt(match[1], 10) : 0;
                    return { number: num, description: hole };
                }
                return hole;
            });
        }

        courses.push(data);
    } catch (e) {
        console.error(`Error parsing ${file}`, e);
    }
}

const content = `import { GolfCourse } from '@/types/golf';

export const GOLF_COURSES: GolfCourse[] = ${JSON.stringify(courses, null, 2)};
`;

fs.writeFileSync(OUTPUT_FILE, content);
console.log(`✅ Wrote ${courses.length} courses to courses.ts`);
