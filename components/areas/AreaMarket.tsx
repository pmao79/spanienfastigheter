'use client';

import { TrendingUp, TrendingDown, Info, Home, Building } from 'lucide-react';

interface TypicalPrices {
    studio: { min: number; max: number };
    twoRoom: { min: number; max: number };
    threeRoom: { min: number; max: number };
    townhouse: { min: number; max: number };
    villa: { min: number; max: number };
}

interface AreaMarketProps {
    priceChange5Year: number;
    rentalYield: number;
    touristLicenseAvailable: boolean;
    typicalPrices: TypicalPrices;
    areaName: string;
}

/**
 * Real Estate Market Analysis Component
 */
export default function AreaMarket({
    priceChange5Year,
    rentalYield,
    touristLicenseAvailable,
    typicalPrices,
    areaName
}: AreaMarketProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('sv-SE', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <section className="py-12">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-navy/10 w-12" />
                <h2 className="text-2xl md:text-3xl font-serif text-navy">
                    Bostadsmarknaden i <span className="text-sand italic">{areaName}</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Key KPIs */}
                <div className="space-y-4">
                    {/* Price Trend */}
                    <div className="bg-white p-6 rounded-sm shadow-soft border border-greige/50 group hover:shadow-hover transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-xs text-charcoal/60 uppercase tracking-wide">Prisutveckling (5 år)</p>
                                <p className={`text-2xl font-serif mt-1 ${priceChange5Year >= 0 ? 'text-navy' : 'text-charcoal'}`}>
                                    {priceChange5Year > 0 ? '+' : ''}{priceChange5Year}%
                                </p>
                            </div>
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center
                                ${priceChange5Year >= 0 ? 'bg-sage/10 text-sage' : 'bg-sand/20 text-navy'}
                            `}>
                                {priceChange5Year >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                            </div>
                        </div>
                        <div className="relative group/tooltip">
                            <p className="text-sm text-charcoal/80 border-b border-dashed border-charcoal/30 inline-block cursor-help">
                                Stabilt ökande trend sedan 2020
                            </p>
                            <div className="absolute bottom-full left-0 mb-2 w-64 bg-navy text-white text-xs p-3 rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 pointer-events-none">
                                Baserat på genomsnittlig prisdata från Idealista och Ministerio de Fomento (2020-2024).
                                <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-navy"></div>
                            </div>
                        </div>
                    </div>

                    {/* Rental Yield */}
                    <div className="bg-white p-6 rounded-sm shadow-soft border border-greige/50 group hover:shadow-hover transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-xs text-charcoal/60 uppercase tracking-wide">Estimerad Hyresavkastning</p>
                                <p className="text-2xl font-serif text-navy mt-1">{rentalYield}%</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-sand/20 text-navy flex items-center justify-center">
                                <Building size={20} />
                            </div>
                        </div>
                        <div className="relative group/tooltip">
                            <p className="text-sm text-charcoal/80 border-b border-dashed border-charcoal/30 inline-block cursor-help">
                                Bruttoavkastning vid långtidsuthyrning
                            </p>
                            <div className="absolute bottom-full left-0 mb-2 w-64 bg-navy text-white text-xs p-3 rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 pointer-events-none">
                                Estimerad bruttoavkastning baserad på genomsnittliga årshyror i relation till köpeskilling, före skatt och avgifter.
                                <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-navy"></div>
                            </div>
                        </div>
                    </div>

                    {/* Tourist License */}
                    <div className="bg-white p-6 rounded-sm shadow-soft border border-greige/50 group hover:shadow-hover transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-xs text-charcoal/60 uppercase tracking-wide">Turistlicens</p>
                                <p className="text-2xl font-serif text-navy mt-1">
                                    {touristLicenseAvailable ? 'Möjligt' : 'Begränsat'}
                                </p>
                            </div>
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center
                                ${touristLicenseAvailable ? 'bg-sage/10 text-sage' : 'bg-greige text-charcoal'}
                            `}>
                                <Info size={20} />
                            </div>
                        </div>
                        <p className="text-sm text-charcoal/80">
                            {touristLicenseAvailable
                                ? 'Generellt möjligt att få licens för korttidsuthyrning.'
                                : 'Nya restriktioner kan gälla i vissa områden.'}
                        </p>
                    </div>
                </div>

                {/* Price Table */}
                <div className="lg:col-span-2 bg-white rounded-sm shadow-soft overflow-hidden border border-greige/50">
                    <div className="bg-navy px-6 py-4">
                        <h3 className="text-white font-serif text-lg">Vad kostar en bostad?</h3>
                        <p className="text-white/60 text-xs mt-1">Genomsnittliga prisspann för standardbostäder i gott skick.</p>
                    </div>

                    <div className="divide-y divide-greige/50">
                        {[
                            { label: 'Studio / 1 rum', min: typicalPrices.studio.min, max: typicalPrices.studio.max, icon: Home },
                            { label: 'Lägenhet 2 rum', min: typicalPrices.twoRoom.min, max: typicalPrices.twoRoom.max, icon: Home },
                            { label: 'Lägenhet 3 rum', min: typicalPrices.threeRoom.min, max: typicalPrices.threeRoom.max, icon: Home },
                            { label: 'Radhus', min: typicalPrices.townhouse.min, max: typicalPrices.townhouse.max, icon: Building },
                            { label: 'Fristående Villa', min: typicalPrices.villa.min, max: typicalPrices.villa.max, icon: Building }
                        ].map((item, index) => (
                            <div key={index} className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-alabaster transition-colors group">
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <div className="w-8 h-8 rounded-full bg-greige/50 flex items-center justify-center text-charcoal/60 group-hover:bg-sand/20 group-hover:text-navy transition-colors">
                                        <item.icon size={16} />
                                    </div>
                                    <span className="font-semibold text-navy">{item.label}</span>
                                </div>

                                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                    <span className="font-serif text-lg text-charcoal/80">
                                        {formatPrice(item.min)}
                                    </span>
                                    <span className="text-gray-400">-</span>
                                    <span className="font-serif text-lg text-navy font-semibold">
                                        {formatPrice(item.max)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-alabaster px-6 py-3 border-t border-greige/50">
                        <p className="text-xs text-charcoal/60 italic text-center">
                            * Priserna är uppskattade genomsnitt och kan variera beroende på läge, skick och utsikt.
                        </p>
                    </div>
                </div>
            </div>
        </section >
    );
}
