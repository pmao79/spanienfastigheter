'use client';

import {
    Users, Building2, Plane, Sun, Euro, Thermometer,
    MapPin, Calendar
} from 'lucide-react';

interface QuickFact {
    label: string;
    value: string | number;
    subtext?: string;
    source?: string;
    icon?: React.ElementType;
}

interface QuickFactsProps {
    facts: QuickFact[];
    areaName: string;
}

/**
 * Quick Facts Table - Premium stats display with sources
 */
export default function QuickFacts({ facts, areaName }: QuickFactsProps) {
    // Icons for common fact types
    const getIcon = (label: string) => {
        const iconMap: Record<string, React.ElementType> = {
            'Befolkning': Users,
            'Population': Users,
            'Utländsk andel': Building2,
            'Svenska invånare': Users,
            'Flygplatsavstånd': Plane,
            'Direktflyg': Plane,
            'Pris/m²': Euro,
            'Soltimmar/år': Sun,
            'Medeltemperatur': Thermometer,
            'Kommun': MapPin,
            'Uppdaterad': Calendar
        };
        return iconMap[label] || MapPin;
    };

    return (
        <div className="bg-white rounded-sm shadow-soft overflow-hidden">
            {/* Header */}
            <div className="bg-navy px-6 py-4">
                <h3 className="text-white font-serif text-xl">
                    Snabbfakta <span className="text-sand italic">{areaName}</span>
                </h3>
            </div>

            {/* Facts Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-greige/50">
                {facts.map((fact, index) => {
                    const Icon = fact.icon || getIcon(fact.label);
                    return (
                        <div
                            key={index}
                            className="group p-5 hover:bg-alabaster transition-colors duration-200"
                        >
                            <div className="flex items-start gap-3">
                                <div className="
                                    w-10 h-10 rounded-full bg-sand/20 flex items-center justify-center
                                    group-hover:bg-sand group-hover:scale-110 transition-all duration-300
                                ">
                                    <Icon size={18} className="text-navy" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-charcoal/60 uppercase tracking-wide mb-1">
                                        {fact.label}
                                    </p>
                                    <p className="text-lg font-serif text-navy font-semibold truncate">
                                        {fact.value}
                                    </p>
                                    {fact.subtext && (
                                        <p className="text-xs text-sage mt-0.5">{fact.subtext}</p>
                                    )}
                                </div>
                            </div>
                            {fact.source && (
                                <p className="text-[10px] text-charcoal/40 mt-2 italic">
                                    Källa: {fact.source}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/**
 * Compact Quick Facts - Inline version for headers
 */
export function CompactQuickFacts({ facts }: { facts: { label: string; value: string }[] }) {
    return (
        <div className="flex flex-wrap gap-4 md:gap-8">
            {facts.map((fact, index) => (
                <div key={index} className="text-center">
                    <p className="text-2xl md:text-3xl font-serif text-navy">{fact.value}</p>
                    <p className="text-xs text-charcoal/60 uppercase tracking-wide">{fact.label}</p>
                </div>
            ))}
        </div>
    );
}
