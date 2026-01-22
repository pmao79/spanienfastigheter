import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { GOLF_COURSES } from '@/data/golf/courses';
import GolfCourseCard from '@/components/golf/GolfCourseCard';
import GolfBreadcrumbs from '@/components/golf/GolfBreadcrumbs';
import { Metadata } from 'next';

// Define valid regions
const VALID_REGIONS = ['costa-blanca', 'costa-del-sol', 'costa-calida', 'costa-almeria'];

interface RegionPageProps {
    params: Promise<{
        locale: string;
        region: string;
    }>;
}

// Helper to get region display name
function getRegionDisplayName(region: string): string {
    switch (region) {
        case 'costa-blanca': return 'Costa Blanca';
        case 'costa-del-sol': return 'Costa del Sol';
        case 'costa-calida': return 'Costa Cálida';
        case 'costa-almeria': return 'Costa de Almería';
        default: return region;
    }
}

// Metadata generation (basic version, ideally uses translations)
export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
    const { region } = await params;
    if (!VALID_REGIONS.includes(region)) return {};

    const regionName = getRegionDisplayName(region);

    return {
        title: `Golfbanor i ${regionName} | Golfguiden Spanien`,
        description: `Utforska alla golfbanor i ${regionName}. Se greenfee priser, boka starttider och läs recensioner.`,
    };
}

export default async function GolfRegionPage({ params }: RegionPageProps) {
    const { region } = await params;

    if (!VALID_REGIONS.includes(region)) {
        notFound();
    }

    const typedRegion = region as 'costa-blanca' | 'costa-del-sol' | 'costa-calida' | 'costa-almeria';
    const regionName = getRegionDisplayName(region);
    const courses = GOLF_COURSES.filter(c => c.region === typedRegion);

    // Region specific content
    let heroImage = '/images/golf/las-colinas-hero.png'; // Default
    let description = '';

    switch (region) {
        case 'costa-blanca':
            heroImage = '/images/golf/las-colinas-hero.png';
            description = 'Costa Blanca är känt för sina prisvärda banor och fantastiska klimat året runt. Här hittar du mästerskapsbanor som Las Colinas blandat med klassiska semesterbanor.';
            break;
        case 'costa-del-sol':
            heroImage = '/images/golf/valderrama-hero.png';
            description = 'Costa del Sol, även känd som Costa del Golf, är Europas främsta golfdestination med över 70 banor. Här finns legendariska klubbar som Valderrama och Sotogrande.';
            break;
        case 'costa-calida':
            heroImage = '/images/areas/la-manga.png';
            description = 'Costa Cálida och Murcia-regionen erbjuder fantastisk golf, inklusive det kända La Manga Club. Här spelar du i ett ökenlandskap med över 300 soldagar om året.';
            break;
        case 'costa-almeria':
            heroImage = '/images/areas/mojacar.png';
            description = 'Costa de Almería erbjuder unika golfupplevelser i ett torrt och solsäkert klimat, med banor som Desert Springs som påminner om Arizona.';
            break;
    }

    return (
        <div className="min-h-screen bg-alabaster">
            {/* Hero */}
            <section className="relative h-[40vh] min-h-[400px]">
                <div className="absolute inset-0 bg-navy">
                    {/* Fallback image if specific one doesn't exist */}
                    <div className="w-full h-full bg-navy/80" />
                    {/* Ideally we use the next/image here but allow failover */}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white container px-4">
                        <span className="text-sand text-[10px] uppercase tracking-[0.3em] mb-4 block">
                            Region
                        </span>
                        <h1 className="font-serif text-5xl md:text-6xl mb-6">
                            {regionName}
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            {description}
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <GolfBreadcrumbs region={typedRegion} />

                    <div className="mb-12 flex justify-between items-end">
                        <div>
                            <h2 className="font-serif text-3xl text-navy mb-2">Alla golfbanor</h2>
                            <p className="text-gray-500">{courses.length} banor hittades</p>
                        </div>
                        {/* Future: Add filters here */}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map(course => (
                            <GolfCourseCard key={course.id} course={course} showPrice />
                        ))}
                    </div>

                    {courses.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-sm">
                            <p className="text-gray-500">Inga golfbanor hittades i denna region än.</p>
                            <p className="text-xs text-gray-400 mt-2">(Data laddas...)</p>
                        </div>
                    )}
                </div>
            </section>

            {/* SEO Content or FAQ could go here */}
        </div>
    );
}
