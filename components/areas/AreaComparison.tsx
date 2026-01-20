'use client';

import Link from 'next/link';
import { Euro, Users, ArrowRight } from 'lucide-react';

interface ComparisonArea {
    area: string;
    slug: string;
    pricePerM2: number;
    character: string;
    suitableFor: string;
}

interface AreaComparisonProps {
    areas: ComparisonArea[];
    currentArea: string;
    region: string;
}

/**
 * Comparison Table with nearby areas
 */
export default function AreaComparison({ areas, currentArea, region }: AreaComparisonProps) {
    return (
        <section className="py-12">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-navy/10 w-12" />
                <h2 className="text-2xl md:text-3xl font-serif text-navy">
                    Jämför med <span className="text-sand italic">närområden</span>
                </h2>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-sm shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="bg-navy text-white">
                                <th className="px-6 py-4 text-left text-xs uppercase tracking-wide font-semibold">
                                    Område
                                </th>
                                <th className="px-6 py-4 text-center text-xs uppercase tracking-wide font-semibold">
                                    <span className="flex items-center justify-center gap-2">
                                        <Euro size={14} />
                                        Pris/m²
                                    </span>
                                </th>
                                <th className="px-6 py-4 text-left text-xs uppercase tracking-wide font-semibold">
                                    Karaktär
                                </th>
                                <th className="px-6 py-4 text-left text-xs uppercase tracking-wide font-semibold">
                                    <span className="flex items-center gap-2">
                                        <Users size={14} />
                                        Passar för
                                    </span>
                                </th>
                                <th className="px-6 py-4 text-center text-xs uppercase tracking-wide font-semibold w-24">
                                    Läs mer
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {areas.map((area, index) => (
                                <tr
                                    key={index}
                                    className={`
                                        border-b border-greige/50
                                        hover:bg-alabaster transition-colors
                                        ${area.area === currentArea ? 'bg-sand/10' : ''}
                                        group
                                    `}
                                >
                                    <td className="px-6 py-5">
                                        <span className={`
                                            font-serif text-lg 
                                            ${area.area === currentArea ? 'text-sand font-semibold' : 'text-navy'}
                                        `}>
                                            {area.area}
                                            {area.area === currentArea && (
                                                <span className="ml-2 text-xs bg-sand text-navy px-2 py-0.5 rounded-full">
                                                    nuvarande
                                                </span>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="font-semibold text-navy">
                                            {area.pricePerM2.toLocaleString('sv-SE')} €
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-charcoal">{area.character}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-charcoal/80">{area.suitableFor}</span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        {area.area !== currentArea && (
                                            <Link
                                                href={`/omraden/${region}/${area.slug}`}
                                                className="
                                                    inline-flex items-center justify-center
                                                    w-10 h-10 rounded-full bg-greige text-charcoal
                                                    hover:bg-navy hover:text-white
                                                    transition-all duration-300
                                                    group-hover:scale-110
                                                "
                                            >
                                                <ArrowRight size={16} />
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
