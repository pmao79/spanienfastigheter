import { Heart } from 'lucide-react';
import FavoritesList from '@/components/property/FavoritesList';
import { fetchProperties } from '@/lib/xml-parser';

export const metadata = {
    title: 'Mina favoriter | Spanienfastigheter.se',
    description: 'Dina sparade fastigheter på Spanienfastigheter.se',
};

export default async function FavoritesPage() {
    // Fetch all properties server-side
    // This allows us to have the full dataset available for filtering by ID on the client
    const properties = await fetchProperties();

    return (
        <div className="min-h-screen bg-alabaster">
            {/* Hero Section */}
            <section className="relative bg-navy text-white py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
                            <Heart size={14} className="text-sand" />
                            <span className="text-xs uppercase tracking-widest">Dina sparade</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-serif mb-4">
                            Mina <span className="text-sand italic">favoriter</span>
                        </h1>

                        <p className="text-lg text-white/70 font-light leading-relaxed">
                            Håll koll på de fastigheter som intresserar dig mest.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <FavoritesList initialProperties={properties} />
                </div>
            </section>

            {/* Tips Section */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h3 className="font-serif text-xl text-navy mb-4">💡 Tips</h3>
                        <p className="text-gray-500 text-sm">
                            Klicka på <Heart size={14} className="inline text-sand" /> på valfri fastighet för att spara den som favorit.
                            Dina favoriter sparas lokalt i webbläsaren.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
