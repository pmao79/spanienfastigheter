import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { GOLF_COURSES } from '@/data/golf/courses';
import GolfCourseHero from '@/components/golf/GolfCourseHero';
import GolfPricingTable from '@/components/golf/GolfPricingTable';
import GolfFacilities from '@/components/golf/GolfFacilities';
import GolfBreadcrumbs from '@/components/golf/GolfBreadcrumbs';
import GolfCTA from '@/components/golf/GolfCTA';
import GolfCourseSchema from '@/components/golf/GolfCourseSchema';
import GolfBreadcrumbSchema from '@/components/golf/GolfBreadcrumbSchema';
import GolfCourseMap from '@/components/golf/GolfCourseMap';
import NearbyProperties from '@/components/golf/NearbyProperties';

interface PageProps {
    params: Promise<{
        locale: string;
        region: string;
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug, region } = await params;
    const course = GOLF_COURSES.find(c => c.slug === slug && c.region === region);

    if (!course) return {};

    return {
        title: `${course.name} - Golf i ${course.region === 'costa-blanca' ? 'Costa Blanca' : 'Costa del Sol'}`,
        description: course.description,
        openGraph: {
            images: course.media?.heroImage ? [course.media.heroImage] : [],
        },
    };
}

export default async function GolfCoursePage({ params }: PageProps) {
    const { slug, region } = await params;
    const course = GOLF_COURSES.find(c => c.slug === slug && c.region === region);

    if (!course) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-alabaster">
            <GolfCourseSchema course={course} />
            <GolfBreadcrumbSchema
                items={[
                    { name: 'Golf', url: '/golf' },
                    { name: course.region === 'costa-blanca' ? 'Costa Blanca' : 'Costa del Sol', url: `/golf/${course.region}` },
                    { name: course.name, url: `/golf/${course.region}/${course.slug}` }
                ]}
            />

            <GolfCourseHero course={course} />

            <div className="container mx-auto px-4 -mt-10 relative z-10">
                <div className="bg-white rounded-sm shadow-lg p-6 mb-8 text-sm text-center md:text-left flex flex-col md:flex-row gap-4 justify-between items-center text-gray-500">
                    <GolfBreadcrumbs region={course.region} courseName={course.name} />
                    <div className="text-xs">
                        Betyg: {course.rating.overall > 0 ? `${course.rating.overall}/5` : 'Ej betygsatt'}
                        {course.rating.totalReviews > 0 && ` (${course.rating.totalReviews} omdömen)`}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-white p-8 rounded-sm shadow-soft">
                            <h2 className="font-serif text-3xl text-navy mb-6">Om banan</h2>
                            <div className="prose max-w-none text-charcoal">
                                <p className="text-lg leading-relaxed mb-6 font-medium">
                                    {course.longDescription || course.description}
                                </p>

                                {/* Additional details if available */}
                                {(course.courseLayout || course.difficulty.description || (course.signatureHoles && course.signatureHoles.length > 0)) && (
                                    <div className="grid md:grid-cols-2 gap-6 my-8 bg-greige/30 p-6 rounded-sm">
                                        <div>
                                            <h4 className="font-bold text-navy mb-2">Banans karaktär</h4>
                                            {course.courseLayout?.courseType && (
                                                <p className="text-sm">{course.courseLayout.courseType}</p>
                                            )}
                                            {course.difficulty.description && (
                                                <p className="text-sm mt-2 italic">&quot;{course.difficulty.description}&quot;</p>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-navy mb-2">Signaturhål</h4>
                                            {course.signatureHoles && course.signatureHoles.length > 0 ? (
                                                <ul className="list-disc pl-4 text-sm space-y-1">
                                                    {course.signatureHoles.map((hole, nr) => (
                                                        <li key={nr}>
                                                            <span className="font-medium">Hål {hole.number || hole.holeNumber || hole.hole}:</span> {hole.description}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-sm text-gray-400">Information saknas.</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Facilities */}
                        <GolfFacilities course={course} />

                        {/* Map */}
                        <div className="bg-white p-8 rounded-sm shadow-soft">
                            <h3 className="font-serif text-2xl text-navy mb-4">Hitta hit</h3>
                            <GolfCourseMap
                                coordinates={course.coordinates}
                                courseName={course.name}
                                className="h-80"
                            />
                            <div className="mt-4 text-sm text-charcoal">
                                <p className="font-bold">{course.name}</p>
                                {course.address.street && <p>{course.address.street}</p>}
                                <p>{course.address.postalCode} {course.address.city}</p>
                                {course.contact.phone && (
                                    <p className="mt-2">
                                        <a href={`tel:${course.contact.phone}`} className="text-navy hover:text-sand transition-colors">
                                            {course.contact.phone}
                                        </a>
                                    </p>
                                )}
                                {course.contact.website && (
                                    <p>
                                        <a
                                            href={course.contact.website.startsWith('http') ? course.contact.website : `https://${course.contact.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-navy hover:text-sand transition-colors"
                                        >
                                            {course.contact.website}
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <GolfPricingTable course={course} />
                        <GolfCTA />
                    </div>
                </div>
            </div>

            {/* Nearby Properties Section */}
            <div className="mt-16">
                <NearbyProperties
                    courseCoordinates={course.coordinates}
                    courseName={course.shortName || course.name}
                    courseSlug={course.slug}
                    region={course.region}
                />
            </div>
        </div>
    );
}
