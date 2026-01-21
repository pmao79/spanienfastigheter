import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAreaDetailBySlug, getRelatedAreas, ALL_AREAS } from '@/lib/area-data';
import { MOCK_PROPERTIES } from '@/lib/mock-data';
import { getPropertiesByArea } from '@/lib/areas';
import AreaContent from '@/components/areas/AreaContent';

const REGION_NAMES: Record<string, string> = {
    'costa-blanca': 'Costa Blanca',
    'costa-del-sol': 'Costa del Sol',
};

// Generate static params for all areas
export function generateStaticParams() {
    return ALL_AREAS.map(area => ({
        region: area.region,
        area: area.slug
    }));
}

// Generate metadata for SEO
export async function generateMetadata({
    params
}: {
    params: Promise<{ region: string; area: string }>
}): Promise<Metadata> {
    const { area: areaSlug } = await params;
    const area = getAreaDetailBySlug(areaSlug);

    if (!area) {
        return { title: 'Område ej hittat' };
    }

    return {
        title: area.headline,
        description: area.metaDescription,
        keywords: area.keywords.join(', '),
        openGraph: {
            title: area.headline,
            description: area.metaDescription,
            type: 'website',
            locale: 'sv_SE',
        }
    };
}

export default async function AreaDetailPage({
    params
}: {
    params: Promise<{ region: string; area: string }>
}) {
    const { region: regionSlug, area: areaSlug } = await params;

    const area = getAreaDetailBySlug(areaSlug);
    const properties = getPropertiesByArea(MOCK_PROPERTIES, areaSlug);
    const relatedAreas = getRelatedAreas(areaSlug, 4);
    const regionName = REGION_NAMES[regionSlug] || regionSlug;

    if (!area) {
        notFound();
    }

    // JSON-LD structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Place',
        name: area.name,
        description: area.metaDescription,
        geo: {
            '@type': 'GeoCoordinates',
            latitude: area.coordinates.lat,
            longitude: area.coordinates.lng
        },
        address: {
            '@type': 'PostalAddress',
            addressRegion: area.province,
            addressCountry: 'ES'
        },
        ...(area.faq && {
            mainEntity: {
                '@type': 'FAQPage',
                mainEntity: area.faq.map(item => ({
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: item.answer
                    }
                }))
            }
        })
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <AreaContent
                area={area}
                properties={properties}
                relatedAreas={relatedAreas}
                regionSlug={regionSlug}
                regionName={regionName}
            />
        </>
    );
}
