import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PropertyDetails from '@/components/property/PropertyDetails';
import { fetchProperties, getPropertyBySlug } from '@/lib/xml-parser';
import { MOCK_PROPERTIES } from '@/lib/mock-data';

interface Props {
    params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    // Try XML feed first, then mock data
    let property = await getPropertyBySlug(slug);
    if (!property) {
        property = MOCK_PROPERTIES.find((p) => p.slug === slug);
    }

    if (!property) {
        return {
            title: 'Fastighet hittades inte | Spanienfastigheter.se',
        };
    }

    return {
        title: `${property.type} i ${property.town} - ${property.price.toLocaleString('sv-SE')}€ | Spanienfastigheter.se`,
        description:
            property.descriptions.sv ||
            property.descriptions.en ||
            `${property.beds} sovrum, ${property.baths} badrum, ${property.builtArea} m² i ${property.town}`,
        openGraph: {
            title: `${property.type} i ${property.town}`,
            description: `${property.beds} sovrum, ${property.baths} badrum, ${property.builtArea} m²`,
            images: property.images[0] ? [property.images[0]] : [],
        },
    };
}

export async function generateStaticParams() {
    // Generate paths for mock properties (XML properties loaded at runtime)
    return MOCK_PROPERTIES.map((property) => ({
        slug: property.slug,
    }));
}

export default async function PropertyPage({ params }: Props) {
    const { slug } = await params;

    // Try XML feed first, then mock data
    let property = await getPropertyBySlug(slug);
    if (!property) {
        property = MOCK_PROPERTIES.find((p) => p.slug === slug);
    }

    if (!property) {
        notFound();
    }

    return <PropertyDetails property={property} />;
}
