import { GolfCourse } from '@/types/golf';

export default function GolfCourseSchema({ course }: { course: GolfCourse }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'GolfCourse',
        name: course.name,
        description: course.description,
        image: course.media?.heroImage ? [course.media.heroImage] : [],
        address: {
            '@type': 'PostalAddress',
            streetAddress: course.address.street,
            addressLocality: course.address.city,
            postalCode: course.address.postalCode,
            addressCountry: course.address.country
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: course.coordinates.lat,
            longitude: course.coordinates.lng
        },
        telephone: course.contact.phone,
        url: course.contact.website,
        priceRange: `€${course.pricing.greenFee.highSeason.weekday.min} - €${course.pricing.greenFee.highSeason.weekday.max}`,
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '08:00',
                closes: '20:00'
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
