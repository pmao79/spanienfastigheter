import { Suspense } from 'react';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyListing from '@/components/property/PropertyListing';
import FilterWithModal from '@/components/search/FilterWithModal';
import { fetchProperties } from '@/lib/xml-parser';
import { filterProperties, parseSearchParams } from '@/lib/filters';

interface Props {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata = {
    title: 'Fastigheter till salu i Spanien | Spanienfastigheter.se',
    description:
        'Upptäck vårt utbud av fastigheter till salu på Costa del Sol och Costa Blanca. Villor, lägenheter och radhus i Spaniens mest eftertraktade områden.',
};

async function PropertyGrid({
    searchParams,
    properties,
}: {
    searchParams: Record<string, string | string[] | undefined>;
    properties: Awaited<ReturnType<typeof fetchProperties>>;
}) {
    // Apply filters
    const filters = parseSearchParams(searchParams);
    const filteredProperties = filterProperties(properties, filters);

    return (
        <PropertyListing
            properties={filteredProperties}
            totalProperties={properties.length}
        />
    );
}

export default async function PropertiesPage({ searchParams }: Props) {
    const resolvedSearchParams = await searchParams;

    // Fetch real properties from XML API at page level
    const properties = await fetchProperties();
    const totalCount = properties.length;

    return (
        <main className="min-h-screen bg-alabaster">
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
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Filter Sidebar */}
                        <aside className="hidden lg:block w-80 flex-shrink-0">
                            <FilterWithModal propertyCount={totalCount} />
                        </aside>

                        {/* Property Grid */}
                        <div className="flex-1">
                            <Suspense
                                fallback={
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                                        {[...Array(4)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="bg-white animate-pulse rounded-sm h-96"
                                            />
                                        ))}
                                    </div>
                                }
                            >
                                <PropertyGrid searchParams={resolvedSearchParams} properties={properties} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
