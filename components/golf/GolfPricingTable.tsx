'use client';

import { GolfCourse } from '@/types/golf';

interface GolfPricingTableProps {
    course: GolfCourse;
}

// Helper to check if all prices are effectively zero/missing
function hasValidPrices(course: GolfCourse): boolean {
    const gf = course.pricing.greenFee;
    return (
        gf.highSeason.weekday.min > 0 ||
        gf.highSeason.weekday.max > 0 ||
        gf.highSeason.weekend.min > 0 ||
        gf.highSeason.weekend.max > 0 ||
        gf.lowSeason.weekday.min > 0 ||
        gf.lowSeason.weekday.max > 0 ||
        gf.lowSeason.weekend.min > 0 ||
        gf.lowSeason.weekend.max > 0
    );
}

// Format price range, handling 0 values
function formatPriceRange(min: number, max: number): string {
    if (min === 0 && max === 0) {
        return '—';
    }
    if (min === max) {
        return `€${min}`;
    }
    return `€${min} - €${max}`;
}

export default function GolfPricingTable({ course }: GolfPricingTableProps) {
    const hasPrices = hasValidPrices(course);

    // If no prices available, show helpful message
    if (!hasPrices) {
        return (
            <div className="bg-white rounded-lg shadow-soft p-6 md:p-8">
                <h3 className="font-serif text-2xl text-navy mb-6">Green Fee & Priser</h3>

                <div className="bg-greige/50 rounded-lg p-6 text-center">
                    <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-charcoal font-medium mb-2">Priser ej tillgängliga online</p>
                    <p className="text-sm text-gray-500 mb-4">
                        Kontakta golfklubben direkt för aktuella priser och bokningsinformation.
                    </p>
                    {course.contact.phone && (
                        <a
                            href={`tel:${course.contact.phone}`}
                            className="inline-flex items-center gap-2 text-navy font-medium hover:text-sand transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {course.contact.phone}
                        </a>
                    )}
                </div>

                {course.contact.website && (
                    <div className="mt-6 text-center">
                        <a
                            href={course.contact.website.startsWith('http') ? course.contact.website : `https://${course.contact.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-navy text-white py-4 rounded-md uppercase tracking-widest text-sm font-bold hover:bg-navy/90 transition-colors"
                        >
                            Besök klubbens hemsida
                        </a>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-soft p-6 md:p-8">
            <h3 className="font-serif text-2xl text-navy mb-6">Green Fee & Priser</h3>

            {/* High Season */}
            <div className="mb-8">
                <h4 className="text-sm font-bold uppercase tracking-widest text-sand mb-4">
                    Högsäsong
                    {course.pricing.seasonDates && (
                        <span className="text-gray-400 font-normal normal-case ml-2">
                            ({course.pricing.seasonDates.highSeason.from} - {course.pricing.seasonDates.highSeason.to})
                        </span>
                    )}
                </h4>
                <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-greige pb-2">
                        <span className="text-charcoal">Vardagar</span>
                        <span className="font-serif text-xl text-navy">
                            {formatPriceRange(course.pricing.greenFee.highSeason.weekday.min, course.pricing.greenFee.highSeason.weekday.max)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-greige pb-2">
                        <span className="text-charcoal">Helger</span>
                        <span className="font-serif text-xl text-navy">
                            {formatPriceRange(course.pricing.greenFee.highSeason.weekend.min, course.pricing.greenFee.highSeason.weekend.max)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Low Season */}
            <div className="mb-8">
                <h4 className="text-sm font-bold uppercase tracking-widest text-sand mb-4">
                    Lågsäsong
                    {course.pricing.seasonDates && (
                        <span className="text-gray-400 font-normal normal-case ml-2">
                            ({course.pricing.seasonDates.lowSeason.from} - {course.pricing.seasonDates.lowSeason.to})
                        </span>
                    )}
                </h4>
                <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-greige pb-2">
                        <span className="text-charcoal">Vardagar</span>
                        <span className="font-serif text-xl text-navy">
                            {formatPriceRange(course.pricing.greenFee.lowSeason.weekday.min, course.pricing.greenFee.lowSeason.weekday.max)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-greige pb-2">
                        <span className="text-charcoal">Helger</span>
                        <span className="font-serif text-xl text-navy">
                            {formatPriceRange(course.pricing.greenFee.lowSeason.weekend.min, course.pricing.greenFee.lowSeason.weekend.max)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Extras */}
            <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-navy mb-4">
                    Tillval
                </h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-greige/50 p-3 rounded-lg flex flex-col">
                        <span className="text-xs text-gray-500 uppercase">Buggy</span>
                        <span className="font-serif text-lg text-navy">
                            {(course.pricing.extras.buggy ?? 0) > 0 ? `€${course.pricing.extras.buggy}` : '—'}
                        </span>
                    </div>
                    <div className="bg-greige/50 p-3 rounded-lg flex flex-col">
                        <span className="text-xs text-gray-500 uppercase">Klubbor</span>
                        <span className="font-serif text-lg text-navy">
                            {(course.pricing.extras.clubRental ?? 0) > 0 ? `€${course.pricing.extras.clubRental}` : '—'}
                        </span>
                    </div>
                    <div className="bg-greige/50 p-3 rounded-lg flex flex-col">
                        <span className="text-xs text-gray-500 uppercase">Vagn</span>
                        <span className="font-serif text-lg text-navy">
                            {(course.pricing.extras.trolley ?? 0) > 0 ? `€${course.pricing.extras.trolley}` : '—'}
                        </span>
                    </div>
                    <div className="bg-greige/50 p-3 rounded-lg flex flex-col">
                        <span className="text-xs text-gray-500 uppercase">Rangebollar</span>
                        <span className="font-serif text-lg text-navy">
                            {(course.pricing.extras.rangeBalls ?? 0) > 0 ? `€${course.pricing.extras.rangeBalls}` : '—'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center">
                <a
                    href={course.contact.bookingUrl || (course.contact.website?.startsWith('http') ? course.contact.website : `https://${course.contact.website}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-navy text-white py-4 rounded-md uppercase tracking-widest text-sm font-bold hover:bg-navy/90 transition-colors"
                >
                    Boka Starttid
                </a>
                <p className="text-xs text-gray-400 mt-2">Priser kan variera. Kontrollera alltid med klubben.</p>
            </div>
        </div>
    );
}
