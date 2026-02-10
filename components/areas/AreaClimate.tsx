'use client';

import { Sun, Droplets, Waves, Thermometer } from 'lucide-react';

interface ClimateData {
    month: string;
    areaTemp: number;
    stockholmTemp: number;
    difference: number;
    seaTemp?: number;
}

interface AreaClimateProps {
    data: ClimateData[];
    areaName: string;
    sunshineHours?: number;
    rainyDays?: number;
}

/**
 * Climate Comparison Table - Area vs Stockholm
 */
export default function AreaClimate({
    data,
    areaName,
    sunshineHours = 2800,
    rainyDays = 50
}: AreaClimateProps) {
    return (
        <section className="py-12">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-navy/10 w-12" />
                <h2 className="text-2xl md:text-3xl font-serif text-navy">
                    Klimat i <span className="text-sand italic">{areaName}</span> vs Stockholm
                </h2>
            </div>

            {/* Climate Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white border border-greige/50 rounded-lg p-5 text-center group hover:border-sand/50 transition-all shadow-sm">
                    <Sun size={28} className="text-sand mx-auto mb-2 group-hover:rotate-12 transition-transform" />
                    <p className="text-3xl font-serif text-navy">{sunshineHours}</p>
                    <p className="text-xs text-charcoal/60 uppercase tracking-wide">Soltimmar/år</p>
                </div>
                <div className="bg-white border border-greige/50 rounded-lg p-5 text-center group hover:border-sand/50 transition-all shadow-sm">
                    <Droplets size={28} className="text-navy mx-auto mb-2 group-hover:translate-y-1 transition-transform" />
                    <p className="text-3xl font-serif text-navy">{rainyDays}</p>
                    <p className="text-xs text-charcoal/60 uppercase tracking-wide">Regndagar/år</p>
                </div>
                <div className="bg-white border border-greige/50 rounded-lg p-5 text-center group hover:border-sand/50 transition-all shadow-sm">
                    <Thermometer size={28} className="text-sage mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-3xl font-serif text-navy">{data.find(d => d.month === 'Juli')?.areaTemp || 28}°C</p>
                    <p className="text-xs text-charcoal/60 uppercase tracking-wide">Juli snitt</p>
                </div>
                <div className="bg-white border border-greige/50 rounded-lg p-5 text-center group hover:border-sand/50 transition-all shadow-sm">
                    <Waves size={28} className="text-navy/70 mx-auto mb-2 group-hover:translate-x-1 transition-transform" />
                    <p className="text-3xl font-serif text-navy">{data.find(d => d.month === 'Juli')?.seaTemp || 25}°C</p>
                    <p className="text-xs text-charcoal/60 uppercase tracking-wide">Havstemp juli</p>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-navy text-white">
                            <th className="px-6 py-4 text-left text-xs uppercase tracking-wide font-semibold">
                                Månad
                            </th>
                            <th className="px-6 py-4 text-center text-xs uppercase tracking-wide font-semibold">
                                {areaName}
                            </th>
                            <th className="px-6 py-4 text-center text-xs uppercase tracking-wide font-semibold">
                                Stockholm
                            </th>
                            <th className="px-6 py-4 text-center text-xs uppercase tracking-wide font-semibold">
                                Skillnad
                            </th>
                            {data[0]?.seaTemp !== undefined && (
                                <th className="px-6 py-4 text-center text-xs uppercase tracking-wide font-semibold">
                                    Havstemp
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className={`
                                    border-b border-greige/50 
                                    hover:bg-alabaster transition-colors
                                    ${index % 2 === 0 ? 'bg-white' : 'bg-greige/20'}
                                `}
                            >
                                <td className="px-6 py-4 font-semibold text-navy">{row.month}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="font-serif text-lg text-navy">{row.areaTemp}°C</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="font-serif text-lg text-charcoal/60">{row.stockholmTemp}°C</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`
                                        inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold
                                        ${row.difference > 0
                                            ? 'bg-sand/20 text-navy'
                                            : 'bg-navy/5 text-navy'}
                                    `}>
                                        {row.difference > 0 ? '+' : ''}{row.difference}°C
                                    </span>
                                </td>
                                {row.seaTemp !== undefined && (
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-serif text-lg text-cyan-600">{row.seaTemp}°C</span>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
