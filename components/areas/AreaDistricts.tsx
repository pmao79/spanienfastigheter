'use client';

import { MapPin, Euro, Users, AlertCircle, CheckCircle } from 'lucide-react';

interface District {
    name: string;
    character: string;
    pricePerM2: number;
    suitableFor: string[];
    pros: string[];
    cons: string[];
}

interface AreaDistrictsProps {
    districts: District[];
    areaName: string;
}

/**
 * Districts/Neighborhoods section with cards
 */
export default function AreaDistricts({ districts, areaName }: AreaDistrictsProps) {
    return (
        <section className="py-12">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-navy/10 w-12" />
                <h2 className="text-2xl md:text-3xl font-serif text-navy">
                    Stadsdelar i <span className="text-sand italic">{areaName}</span>
                </h2>
            </div>

            {/* Districts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {districts.map((district, index) => (
                    <div
                        key={index}
                        className="
                            group bg-white rounded-sm shadow-soft
                            hover:shadow-hover transition-all duration-300
                            overflow-hidden border border-transparent hover:border-sand/30
                        "
                    >
                        {/* Header */}
                        <div className="bg-navy px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <MapPin size={20} className="text-sand" />
                                <h3 className="text-white font-serif text-lg">{district.name}</h3>
                            </div>
                            <div className="flex items-center gap-2 bg-sand/20 px-3 py-1 rounded-full">
                                <Euro size={14} className="text-sand" />
                                <span className="text-sand text-sm font-semibold">
                                    {district.pricePerM2.toLocaleString('sv-SE')} €/m²
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            {/* Character */}
                            <p className="text-charcoal leading-relaxed">{district.character}</p>

                            {/* Suitable For */}
                            <div className="flex flex-wrap gap-2">
                                <Users size={16} className="text-sage" />
                                {district.suitableFor.map((item, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-sage/10 text-sage text-xs rounded-full"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>

                            {/* Pros & Cons */}
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-greige">
                                {/* Pros */}
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide flex items-center gap-1">
                                        <CheckCircle size={12} className="text-sage" />
                                        Fördelar
                                    </p>
                                    <ul className="space-y-1">
                                        {district.pros.map((pro, i) => (
                                            <li key={i} className="text-sm text-charcoal/80 flex items-start gap-2">
                                                <span className="text-sage mt-1">+</span>
                                                {pro}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Cons */}
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-charcoal/60 uppercase tracking-wide flex items-center gap-1">
                                        <AlertCircle size={12} className="text-sand" />
                                        Nackdelar
                                    </p>
                                    <ul className="space-y-1">
                                        {district.cons.map((con, i) => (
                                            <li key={i} className="text-sm text-charcoal/80 flex items-start gap-2">
                                                <span className="text-sand mt-1">−</span>
                                                {con}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
