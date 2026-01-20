'use client';

import { Search } from 'lucide-react';

interface FilterSidebarProps {
    onOpenSearchService?: () => void;
}

export default function FilterSidebar({ onOpenSearchService }: FilterSidebarProps) {
    return (
        <div className="bg-white p-8 border border-gray-100 sticky top-32 shadow-soft">
            <div className="flex justify-between items-center mb-8 border-b border-greige pb-4">
                <h3 className="text-xl font-serif text-navy">Filtrera</h3>
                <button className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-navy transition-colors">
                    Rensa allt
                </button>
            </div>

            <div className="space-y-10">
                {/* Search Input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Sök referensnr..."
                        className="w-full bg-greige/50 border-b border-transparent focus:border-navy px-4 py-3 text-sm outline-none transition-colors placeholder-gray-400"
                    />
                    <Search size={16} className="absolute right-3 top-3 text-gray-400" />
                </div>

                {/* Region */}
                <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-4 block">
                        Region
                    </label>
                    <div className="space-y-3">
                        {['Costa del Sol', 'Costa Blanca'].map((region) => (
                            <label
                                key={region}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        className="peer appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-navy checked:border-navy transition-colors"
                                    />
                                    <svg
                                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    >
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="text-sm font-light text-charcoal group-hover:text-navy transition-colors">
                                    {region}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-4 block">
                        Pris (€)
                    </label>
                    <div className="flex gap-4 items-center">
                        <div className="relative w-full">
                            <span className="absolute left-3 top-2.5 text-xs text-gray-400">
                                €
                            </span>
                            <input
                                type="number"
                                placeholder="0"
                                className="w-full pl-6 pr-2 py-2 bg-greige/50 text-sm focus:outline-none focus:ring-1 focus:ring-navy transition-shadow"
                            />
                        </div>
                        <span className="text-gray-300 font-light">–</span>
                        <div className="relative w-full">
                            <span className="absolute left-3 top-2.5 text-xs text-gray-400">
                                €
                            </span>
                            <input
                                type="number"
                                placeholder="Max"
                                className="w-full pl-6 pr-2 py-2 bg-greige/50 text-sm focus:outline-none focus:ring-1 focus:ring-navy transition-shadow"
                            />
                        </div>
                    </div>
                </div>

                {/* Bedrooms */}
                <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-4 block">
                        Sovrum
                    </label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, '5+'].map((num) => (
                            <button
                                key={num}
                                className="w-10 h-10 border border-gray-200 text-sm font-medium text-gray-500 hover:border-navy hover:text-navy focus:bg-navy focus:text-white focus:border-navy transition-all"
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-sage font-bold mb-4 block">
                        Egenskaper
                    </label>
                    <div className="space-y-3">
                        {[
                            'Havsutsikt',
                            'Pool',
                            'Nyproduktion',
                            'Terrass',
                            'Turistlicens',
                        ].map((feature) => (
                            <label
                                key={feature}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        className="peer appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-navy checked:border-navy transition-colors"
                                    />
                                    <svg
                                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    >
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="text-sm font-light text-charcoal group-hover:text-navy transition-colors">
                                    {feature}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <button className="w-full bg-navy text-white py-4 uppercase tracking-[0.15em] text-xs font-semibold hover:bg-charcoal transition-colors shadow-lg shadow-navy/20">
                    Visa 142 bostäder
                </button>

                {/* Concierge Helper Card */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                    <div
                        className="bg-navy p-6 text-center rounded-sm relative overflow-hidden group cursor-pointer"
                        onClick={onOpenSearchService}
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2"></div>
                        <h4 className="font-serif text-white text-lg mb-2">
                            Hittar du inte rätt?
                        </h4>
                        <p className="text-white/60 text-xs font-light mb-4">
                            Låt oss söka åt dig kostnadsfritt.
                        </p>
                        <span className="text-xs text-sand uppercase tracking-widest font-bold border-b border-sand pb-1 group-hover:text-white group-hover:border-white transition-colors">
                            Starta bevakning
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
