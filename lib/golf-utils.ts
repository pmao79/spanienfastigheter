import { GolfCourse, GolfFilter } from '@/types/golf';
import { GOLF_COURSES } from '@/data/golf/courses';

export function getGolfCoursesByRegion(region: 'costa-blanca' | 'costa-del-sol'): GolfCourse[] {
    return GOLF_COURSES.filter(course => course.region === region);
}

export function getGolfCourseBySlug(slug: string): GolfCourse | undefined {
    return GOLF_COURSES.find(course => course.slug === slug);
}

export function filterGolfCourses(courses: GolfCourse[], filter: GolfFilter): GolfCourse[] {
    return courses.filter(course => {
        if (filter.region && course.region !== filter.region) return false;
        if (filter.subRegion && course.subRegion !== filter.subRegion) return false;

        // Price
        if (filter.priceMax) {
            const price = course.pricing.greenFee.highSeason.weekday.min;
            if (price > filter.priceMax) return false;
        }

        // Holes
        if (filter.holes && course.courseInfo.holes !== filter.holes) return false;

        // Difficulty
        if (filter.difficulty && course.difficulty.level !== filter.difficulty) return false;

        return true;
    });
}

export function formatPrice(price: number, currency: string = 'EUR'): string {
    return new Intl.NumberFormat('sv-SE', { style: 'currency', currency }).format(price);
}
