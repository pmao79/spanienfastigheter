'use client';

import { useState, useMemo, useEffect } from 'react';
import { useFormatter } from 'next-intl';
import { Info, ChevronDown, ChevronUp, Calculator, Home, PiggyBank } from 'lucide-react';

type Region = 'andalusia' | 'valencia';
type PropertyType = 'resale' | 'new';

interface CostCalculatorProps {
    initialPrice?: number;
    fixedRegion?: Region;
}

const Tooltip = ({ text }: { text: string }) => (
    <div className="group relative inline-block ml-1">
        <Info size={14} className="text-sand cursor-help" />
        <div className="invisible group-hover:visible absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-charcoal text-white text-xs rounded w-48 text-center shadow-lg">
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-charcoal" />
        </div>
    </div>
);

// Dynamic import to avoid SSR issues with React-PDF
import dynamic from 'next/dynamic';
import CostCalculatorPDF from './CostCalculatorPDF';

const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => <button className="w-full py-3 bg-sand/50 text-navy font-bold rounded-lg cursor-wait text-sm">Laddar PDF-motor...</button>,
    }
);

export default function CostCalculator({ initialPrice = 300000, fixedRegion }: CostCalculatorProps) {
    const format = useFormatter();

    // Core State
    const [price, setPrice] = useState(initialPrice);
    const [region, setRegion] = useState<Region>(fixedRegion || 'andalusia');
    const [type, setType] = useState<PropertyType>('resale');

    // Mortgage State
    const [useMortgage, setUseMortgage] = useState(false);
    const [ltv, setLtv] = useState(60); // 60% standard for non-residents
    const [interestRate, setInterestRate] = useState(3.5);
    const [years, setYears] = useState(20);

    // Monthly Costs State (Annual defaults / 12)
    const [communityFee, setCommunityFee] = useState(150); // Monthly
    const [ibi, setIbi] = useState(600); // Annual
    const [garbage, setGarbage] = useState(150); // Annual
    const [utilities, setUtilities] = useState(150); // Monthly (Water/Elec/Internet)
    const [insurance, setInsurance] = useState(350); // Annual

    // UI State
    const [activeTab, setActiveTab] = useState<'purchase' | 'monthly'>('purchase');

    // Update internal price if prop changes
    useEffect(() => {
        if (initialPrice) setPrice(initialPrice);
    }, [initialPrice]);

    // --- Calculations ---
    const purchaseCosts = useMemo(() => {
        let taxRate = 0;
        let taxLabel = '';
        let ajdRate = 0;

        // Tax Logic
        if (type === 'resale') {
            taxLabel = 'ITP (Överföringsskatt)';
            // Andalusia: 7% | Valencia: 10%
            taxRate = region === 'andalusia' ? 0.07 : 0.10;
        } else {
            taxLabel = 'Moms (IVA) + AJD';
            // IVA is 10% everywhere
            // AJD: Andalusia 1.2% | Valencia 1.5%
            ajdRate = region === 'andalusia' ? 0.012 : 0.015;
            taxRate = 0.10 + ajdRate;
        }

        const taxAmount = price * taxRate;
        const legalFees = price * 0.015; // Notary, Registry, Lawyer ~1.5%
        const total = price + taxAmount + legalFees;
        const cashNeeded = useMortgage ? total - (price * (ltv / 100)) : total;

        return { taxLabel, taxAmount, legalFees, total, cashNeeded };
    }, [price, region, type, useMortgage, ltv]);

    const mortgageCosts = useMemo(() => {
        if (!useMortgage) return { monthlyPayment: 0, loanAmount: 0 };

        const loanAmount = price * (ltv / 100);
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = years * 12;

        // Mortgage Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
        const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        return { monthlyPayment, loanAmount };
    }, [price, useMortgage, ltv, interestRate, years]);

    const totalMonthlyCost = useMemo(() => {
        const monthlyIbi = ibi / 12;
        const monthlyGarbage = garbage / 12;
        const monthlyInsurance = insurance / 12;

        return communityFee + utilities + monthlyIbi + monthlyGarbage + monthlyInsurance + mortgageCosts.monthlyPayment;
    }, [communityFee, ibi, garbage, utilities, insurance, mortgageCosts.monthlyPayment]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="bg-white rounded-xl shadow-soft border border-greige overflow-hidden flex flex-col h-full">
            {/* Header */}
            <div className="bg-navy p-6 text-white text-center shrink-0">
                <h3 className="font-serif text-2xl flex items-center justify-center gap-2">
                    <Calculator size={24} className="text-sand" /> Kalkylator
                </h3>
                <p className="text-white/60 text-xs mt-1">Total investering & månadskostnad</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-greige bg-alabaster">
                <button
                    onClick={() => setActiveTab('purchase')}
                    className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'purchase' ? 'bg-white text-navy border-b-2 border-sand' : 'text-charcoal/60 hover:text-charcoal'}`}
                >
                    <PiggyBank size={16} /> Köp & Lån
                </button>
                <button
                    onClick={() => setActiveTab('monthly')}
                    className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'monthly' ? 'bg-white text-navy border-b-2 border-sand' : 'text-charcoal/60 hover:text-charcoal'}`}
                >
                    <Home size={16} /> Månadskostnad
                </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto grow">
                {/* --- PURCHASE TAB --- */}
                {activeTab === 'purchase' && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Price Input */}
                        <div>
                            <label className="block text-xs font-bold text-charcoal uppercase mb-2 flex justify-between">
                                <span>Pris på bostad</span>
                                <span className="text-navy font-bold">{formatCurrency(price)}</span>
                            </label>
                            <input
                                type="range"
                                min="100000"
                                max="2000000"
                                step="5000"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="w-full h-2 bg-greige rounded-lg appearance-none cursor-pointer accent-navy"
                            />
                        </div>

                        {/* Toggles */}
                        <div className="grid grid-cols-2 gap-4">
                            {!fixedRegion && (
                                <div>
                                    <label className="block text-xs font-bold text-charcoal uppercase mb-2">Region</label>
                                    <div className="flex bg-greige/30 p-1 rounded-lg">
                                        <button onClick={() => setRegion('andalusia')} className={`flex-1 py-2 text-[10px] font-bold rounded-md transition-all ${region === 'andalusia' ? 'bg-white shadow-sm text-navy' : 'text-charcoal/60'}`}>Andalusien</button>
                                        <button onClick={() => setRegion('valencia')} className={`flex-1 py-2 text-[10px] font-bold rounded-md transition-all ${region === 'valencia' ? 'bg-white shadow-sm text-navy' : 'text-charcoal/60'}`}>Valencia</button>
                                    </div>
                                </div>
                            )}
                            <div className={fixedRegion ? 'col-span-2' : ''}>
                                <label className="block text-xs font-bold text-charcoal uppercase mb-2">Typ</label>
                                <div className="flex bg-greige/30 p-1 rounded-lg">
                                    <button onClick={() => setType('resale')} className={`flex-1 py-2 text-[10px] font-bold rounded-md transition-all ${type === 'resale' ? 'bg-white shadow-sm text-navy' : 'text-charcoal/60'}`}>Begagnat</button>
                                    <button onClick={() => setType('new')} className={`flex-1 py-2 text-[10px] font-bold rounded-md transition-all ${type === 'new' ? 'bg-white shadow-sm text-navy' : 'text-charcoal/60'}`}>Nyprod</button>
                                </div>
                            </div>
                        </div>

                        {/* Mortgage Section */}
                        <div className="bg-alabaster p-4 rounded-lg border border-greige/50">
                            <div className="flex items-center justify-between mb-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={useMortgage} onChange={(e) => setUseMortgage(e.target.checked)} className="accent-navy w-4 h-4" />
                                    <span className="text-sm font-bold text-navy">Ta lån?</span>
                                </label>
                            </div>

                            {useMortgage && (
                                <div className="space-y-4 pt-2 border-t border-greige/20">
                                    <div>
                                        <label className="flex justify-between text-xs text-charcoal mb-1">
                                            <span>Belåning (LTV)</span>
                                            <span className="font-bold">{ltv}%</span>
                                        </label>
                                        <input type="range" min="30" max="70" value={ltv} onChange={(e) => setLtv(Number(e.target.value))} className="w-full h-1.5 bg-greige rounded-lg appearance-none cursor-pointer accent-sand" />
                                        <p className="text-[10px] text-charcoal/50 mt-1">Non-residents får oftast max 60-70%.</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-charcoal mb-1">Ränta (%)</label>
                                            <div className="flex items-center bg-white border border-greige rounded-md h-8 px-2">
                                                <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full text-xs outline-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-charcoal mb-1">Amortering (år)</label>
                                            <div className="flex items-center bg-white border border-greige rounded-md h-8 px-2">
                                                <input type="number" min="5" max="30" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full text-xs outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Summary Purchase */}
                        <div className="space-y-2 pt-4 border-t border-greige">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-charcoal flex items-center">{purchaseCosts.taxLabel} <Tooltip text="Skatt till spanska staten." /></span>
                                <span className="font-medium">{formatCurrency(purchaseCosts.taxAmount)}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-charcoal flex items-center">Notarie & Jurist (ca 1.5%) <Tooltip text="Inkluderar notarie, fastighetsregister och oberoende advokat." /></span>
                                <span className="font-medium">{formatCurrency(purchaseCosts.legalFees)}</span>
                            </div>

                            <div className="bg-navy/5 p-3 rounded-lg mt-2">
                                <div className="flex justify-between items-center text-sm font-bold text-navy mb-1">
                                    <span>Totalt pris (inkl. avgifter):</span>
                                    <span>{formatCurrency(purchaseCosts.total)}</span>
                                </div>
                                {useMortgage && (
                                    <div className="flex justify-between items-center text-xs text-sand font-bold mt-2 pt-2 border-t border-navy/10">
                                        <span>Kontantinsats som krävs:</span>
                                        <span>{formatCurrency(purchaseCosts.cashNeeded)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- MONTHLY TAB --- */}
                {activeTab === 'monthly' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-sand/10 p-4 rounded-lg border border-sand/20 mb-4">
                            <p className="text-xs text-navy/80">
                                <Info size={12} className="inline mr-1 text-navy" />
                                Dessa siffror är uppskattningar. Exakta driftskostnader varierar beroende på fastighetens faciliteter.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="flex justify-between text-xs font-bold text-charcoal mb-1">
                                    <span>Samfällighet (per mån)</span>
                                    <span>{communityFee} €</span>
                                </label>
                                <input type="range" min="0" max="500" step="10" value={communityFee} onChange={(e) => setCommunityFee(Number(e.target.value))} className="w-full h-1.5 bg-greige rounded-lg appearance-none cursor-pointer accent-navy" />
                            </div>

                            <div>
                                <label className="flex justify-between text-xs font-bold text-charcoal mb-1">
                                    <span>Drift (El/Vatten/Internet)</span>
                                    <span>{utilities} €</span>
                                </label>
                                <input type="range" min="50" max="500" step="10" value={utilities} onChange={(e) => setUtilities(Number(e.target.value))} className="w-full h-1.5 bg-greige rounded-lg appearance-none cursor-pointer accent-navy" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-charcoal mb-1 flex items-center">IBI (Årlig) <Tooltip text="Spansk kommunal fastighetsskatt" /></label>
                                    <div className="flex items-center bg-white border border-greige rounded-md h-8 px-2">
                                        <input type="number" value={ibi} onChange={(e) => setIbi(Number(e.target.value))} className="w-full text-xs outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-charcoal mb-1">Försäkring (Årlig)</label>
                                    <div className="flex items-center bg-white border border-greige rounded-md h-8 px-2">
                                        <input type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} className="w-full text-xs outline-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary Monthly */}
                        <div className="bg-navy/5 p-4 rounded-lg mt-6">
                            <div className="space-y-2 mb-4 border-b border-navy/10 pb-4">
                                {useMortgage && (
                                    <div className="flex justify-between items-center text-xs text-charcoal">
                                        <span>Lånekostnad (Ränta+Amort.)</span>
                                        <span className="font-bold">{formatCurrency(mortgageCosts.monthlyPayment)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center text-xs text-charcoal">
                                    <span>Driftskostnader</span>
                                    <span className="font-bold">{formatCurrency(totalMonthlyCost - mortgageCosts.monthlyPayment)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-bold text-navy">Total månadskostnad:</span>
                                <div className="text-right">
                                    <span className="block text-xl font-bold text-navy leading-none">{formatCurrency(totalMonthlyCost)}</span>
                                    <span className="text-[10px] text-charcoal/60">/ månad</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer CTA */}
            <div className="p-4 border-t border-greige bg-white shrink-0 mt-auto">
                <PDFDownloadLink
                    document={
                        <CostCalculatorPDF
                            price={price}
                            region={region}
                            type={type}
                            purchaseCosts={purchaseCosts}
                            monthlyCosts={{
                                communityFee,
                                utilities,
                                ibi,
                                garbage,
                                insurance,
                                mortgagePayment: mortgageCosts.monthlyPayment,
                                totalMonthly: totalMonthlyCost
                            }}
                            mortgageDetails={useMortgage ? {
                                useMortgage,
                                ltv,
                                interestRate,
                                years,
                                loanAmount: mortgageCosts.loanAmount
                            } : undefined}
                        />
                    }
                    fileName="Spanienfastigheter_Kalkyl.pdf"
                >
                    {({ blob, url, loading, error }: any) => (
                        <button
                            disabled={loading}
                            className={`w-full py-3 bg-sand text-navy font-bold rounded-lg hover:bg-navy hover:text-white transition-colors shadow-lg cursor-pointer text-sm ${loading ? 'opacity-50 cursor-wait' : ''}`}
                        >
                            {loading ? 'Skapar PDF...' : 'Få detaljerad kalkyl som PDF'}
                        </button>
                    )}
                </PDFDownloadLink>
            </div>
        </div>
    );
}
