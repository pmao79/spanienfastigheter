import { Suspense } from 'react';
import ConvexPropertySearch from '@/components/search/ConvexPropertySearch';

export const metadata = {
    title: 'Fastigheter till salu i Spanien | Spanienfastigheter.se',
    description:
        'Upptäck vårt utbud av fastigheter till salu på Costa del Sol och Costa Blanca. Villor, lägenheter och radhus i Spaniens mest eftertraktade områden.',
};

export default function PropertiesPage() {
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
                    <Suspense fallback={<div>Laddar sökning...</div>}>
                        <ConvexPropertySearch />
                    </Suspense>
                </div>
            </section>
        </main>
    );
}
