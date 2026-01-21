'use client';

import { MapPin, Home, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface NearbyPropertiesProps {
    courseCoordinates: {
        lat: number;
        lng: number;
    };
    courseName: string;
    courseSlug: string;
    region: string;
}

// This component is prepared for real property data.
// Currently shows an empty state since we don't have properties yet.
// When properties are available, they will be fetched based on coordinates.

export default function NearbyProperties({
    courseCoordinates,
    courseName,
    courseSlug,
    region
}: NearbyPropertiesProps) {
    // In the future, this would fetch real properties near the golf course
    // using the coordinates and a radius (e.g., 5-10km)
    const properties: never[] = []; // Empty - no mock data

    // Empty state when no properties are available
    if (properties.length === 0) {
        return (
            <section className="bg-greige/30 py-12 md:py-16">
                <div className="container-wide">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-soft">
                            <Home className="w-8 h-8 text-navy" />
                        </div>

                        <h3 className="font-serif text-2xl md:text-3xl text-navy mb-4">
                            Drömboende nära {courseName}?
                        </h3>

                        <p className="text-gray-600 mb-8">
                            Just nu har vi inga fastigheter till salu i närheten av denna bana,
                            men vi får in nya objekt kontinuerligt. Utforska vårt hela utbud eller
                            kontakta oss så hjälper vi dig hitta ditt drömboende nära golfen.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={`/fastigheter?region=${region}`}
                                className="inline-flex items-center justify-center gap-2 bg-navy text-white px-6 py-3 rounded-sm font-medium hover:bg-navy/90 transition-colors"
                            >
                                Visa alla fastigheter i {region === 'costa-blanca' ? 'Costa Blanca' : 'Costa del Sol'}
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <Link
                                href="/kontakt"
                                className="inline-flex items-center justify-center gap-2 border border-navy text-navy px-6 py-3 rounded-sm font-medium hover:bg-navy hover:text-white transition-colors"
                            >
                                Kontakta oss
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Future: Property carousel when properties are available
    // This code path won't be reached until we have real property data
    return (
        <section className="bg-greige/30 py-12 md:py-16">
            <div className="container-wide">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="font-serif text-2xl md:text-3xl text-navy">
                            Boenden nära {courseName}
                        </h3>
                        <p className="text-gray-500 mt-1 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            Inom 10 km från banan
                        </p>
                    </div>
                    <Link
                        href={`/fastigheter?golf=${courseSlug}`}
                        className="hidden md:inline-flex items-center gap-2 text-navy font-medium hover:text-sand transition-colors"
                    >
                        Visa alla
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Property carousel would go here */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Property cards would be mapped here */}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        href={`/fastigheter?golf=${courseSlug}`}
                        className="inline-flex items-center gap-2 text-navy font-medium"
                    >
                        Visa alla fastigheter
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
