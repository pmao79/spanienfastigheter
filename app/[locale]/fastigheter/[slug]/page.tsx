import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import ConvexPropertyDetail from './ConvexPropertyDetail';

// Server-side Convex Client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

interface Props {
    params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    // Fetch from Convex (Server Side)
    const property = await convex.query(api.properties.getByRef, { ref: slug });

    if (!property) {
        return {
            title: 'Fastighet hittades inte | Spanienfastigheter.se',
        };
    }

    return {
        title: `${property.type} i ${property.town} - ${property.price.toLocaleString('sv-SE')}€ | Spanienfastigheter.se`,
        description:
            property.description ||
            `${property.beds} sovrum, ${property.baths} badrum, ${property.built} m² i ${property.town}`,
        openGraph: {
            title: `${property.type} i ${property.town}`,
            description: `${property.beds} sovrum, ${property.baths} badrum, ${property.built} m²`,
            images: property.images[0] ? [property.images[0]] : [],
        },
    };
}

export default async function PropertyPage({ params }: Props) {
    const { slug } = await params;

    return <ConvexPropertyDetail refId={slug} />;
}
