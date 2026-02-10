import { Suspense } from 'react';
import ConvexPropertySearch from '@/components/search/ConvexPropertySearch';

export const metadata = {
    title: 'Fastigheter till salu i Spanien | Costa Blanca & Costa del Sol',
    description:
        'Hitta bostäder till salu i Spanien: lägenheter, villor och radhus på Costa Blanca och Costa del Sol. Svensk mäklare, trygg köpprocess och personlig rådgivning.',
    alternates: {
        canonical: 'https://spanienfastigheter.se/fastigheter'
    }
};

export default function PropertiesPage() {
    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Fastigheter till salu i Spanien',
        itemListOrder: 'https://schema.org/ItemListUnordered'
    };
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Hem',
                item: 'https://spanienfastigheter.se'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Fastigheter',
                item: 'https://spanienfastigheter.se/fastigheter'
            }
        ]
    };

    return (
        <main className="min-h-screen bg-alabaster">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            {/* Hero */}
            <section className="bg-navy py-20">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <span className="text-sand text-[10px] uppercase tracking-[0.25em] font-bold mb-4 block">
                        Fastigheter
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
                        Alla fastigheter till salu
                    </h1>
                    <p className="text-white/70 font-light max-w-2xl">
                        Utforska vårt kompletta utbud av bostäder på Costa del Sol och
                        Costa Blanca. Filtrera efter region, pris, storlek och egenskaper
                        för att hitta ditt drömboende.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-greige/30">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <Suspense fallback={<div>Laddar sökning...</div>}>
                        <ConvexPropertySearch />
                    </Suspense>
                </div>
            </section>
        </main>
    );
}
