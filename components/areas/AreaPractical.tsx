'use client';

import { Plane, FileText, Activity, ShieldCheck, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface FlightInfo {
    from: string;
    airline: string;
    frequency: string;
}

interface AreaPracticalProps {
    flights: FlightInfo[];
    airportTransfer: string;
    nieInfo: string;
    healthcare: string;
    swedishServices: string[];
}

/**
 * Practical info for Swedish buyers
 */
export default function AreaPractical({
    flights,
    airportTransfer,
    nieInfo,
    healthcare,
    swedishServices
}: AreaPracticalProps) {
    return (
        <section className="py-12 bg-alabaster/50 rounded-lg">
            <div className="max-w-6xl mx-auto px-4 md:px-0">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px bg-navy/10 w-12" />
                    <h2 className="text-2xl md:text-3xl font-serif text-navy">
                        Praktiskt för <span className="text-sand italic">svenskar</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Flights & Transport */}
                    <div className="bg-white p-6 rounded-lg shadow-soft">
                        <div className="flex items-center gap-3 mb-6 border-b border-greige pb-4">
                            <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center text-navy">
                                <Plane size={20} />
                            </div>
                            <h3 className="text-xl font-serif text-navy">Resa från Sverige</h3>
                        </div>

                        <div className="space-y-6">
                            {flights.map((flight, index) => (
                                <div key={index} className="flex justify-between items-center text-sm">
                                    <span className="font-semibold text-charcoal">{flight.from}</span>
                                    <div className="text-right">
                                        <p className="text-navy font-medium">{flight.airline}</p>
                                        <p className="text-charcoal/60 text-xs">{flight.frequency}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="bg-greige/20 p-4 rounded-lg mt-4">
                                <p className="text-sm font-semibold text-navy mb-1">Transfer till området:</p>
                                <p className="text-sm text-charcoal/80 italic">{airportTransfer}</p>
                            </div>
                        </div>
                    </div>

                    {/* Admin & Healthcare */}
                    <div className="space-y-6">
                        {/* Healthcare */}
                        <div className="bg-white p-6 rounded-lg shadow-soft">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center text-sage">
                                    <Activity size={16} />
                                </div>
                                <h3 className="text-lg font-serif text-navy">Sjukvård & Hälsa</h3>
                            </div>
                            <p className="text-sm text-charcoal/80 leading-relaxed mb-4">
                                {healthcare}
                            </p>
                            <div className="flex items-center gap-2 text-xs font-medium text-sage bg-sage/10 px-3 py-2 rounded-full w-fit">
                                <ShieldCheck size={14} />
                                Accepterar EU-kortet
                            </div>
                        </div>

                        {/* NIE & Legal */}
                        <div className="bg-white p-6 rounded-lg shadow-soft">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-sand/20 flex items-center justify-center text-navy">
                                    <FileText size={16} />
                                </div>
                                <h3 className="text-lg font-serif text-navy">NIE-nummer & Juridik</h3>
                            </div>
                            <p className="text-sm text-charcoal/80 leading-relaxed">
                                {nieInfo}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Swedish Services */}
                <div className="mt-8 bg-white p-6 rounded-lg shadow-soft">
                    <h3 className="text-lg font-serif text-navy mb-4 flex items-center gap-2">
                        <Image
                            src="https://flagcdn.com/w20/se.png"
                            alt="Sverige"
                            width={20}
                            height={14}
                            className="w-5 h-auto shadow-sm"
                            unoptimized
                        />
                        Svensk service på plats
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {swedishServices.map((service, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center gap-2 bg-alabaster border border-greige px-4 py-2 rounded-full text-sm text-charcoal hover:border-sand hover:text-navy transition-colors cursor-default"
                            >
                                <CheckCircle size={14} className="text-sand" />
                                {service}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
