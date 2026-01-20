'use client';

import { X, Check, ArrowRight, Star } from 'lucide-react';

interface SearchServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchServiceModal({
    isOpen,
    onClose,
}: SearchServiceModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="bg-white w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[90vh] overflow-y-auto md:overflow-hidden rounded-sm shadow-2xl relative z-10 flex flex-col md:flex-row animate-fade-in">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-black/10 text-charcoal rounded-full transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Left Side: Brand & Value Prop */}
                <div className="w-full md:w-2/5 bg-navy text-white relative flex flex-col justify-between p-8 md:p-12 overflow-hidden">
                    {/* Background Image overlay */}
                    <div className="absolute inset-0 opacity-40">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
                            className="w-full h-full object-cover"
                            alt="Luxury home"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40"></div>

                    <div className="relative z-10">
                        <span className="text-sand text-[10px] uppercase tracking-[0.25em] font-bold mb-4 block">
                            VIP Söktjänst
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif mb-6 leading-tight">
                            De bästa bostäderna når aldrig{' '}
                            <span className="italic text-sand">Hemnet.</span>
                        </h2>
                        <p className="text-white/70 font-light leading-relaxed mb-8">
                            Som medlem i vårt spekulantregister får du tillgång till
                            &quot;Silent Sales&quot; och kommande objekt innan de publiceras
                            officiellt. Låt oss göra grovjobbet åt dig.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sand">
                                    <Star size={14} fill="currentColor" />
                                </div>
                                <span className="text-sm font-medium">
                                    Förtur till nyproduktion
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sand">
                                    <Check size={14} />
                                </div>
                                <span className="text-sm font-medium">Off-market objekt</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sand">
                                    <Check size={14} />
                                </div>
                                <span className="text-sm font-medium">Personlig mäklare</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-12 md:mt-0">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-sm border border-white/10">
                            <p className="text-xs italic text-white/80">
                                &quot;Vi letade i 6 månader utan resultat. Efter att vi anmälde
                                oss här hittade Spanienfastigheter vårt drömhus på 2
                                veckor.&quot;
                            </p>
                            <p className="text-[10px] text-sand uppercase tracking-widest mt-2 font-bold">
                                – Familjen Nilsson, köpte i Nerja 2023
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: The Form */}
                <div className="w-full md:w-3/5 bg-white p-8 md:p-12 overflow-y-auto">
                    <h3 className="text-2xl font-serif text-navy mb-2">
                        Berätta vad du söker
                    </h3>
                    <p className="text-gray-400 text-sm mb-8">
                        Vi matchar dina önskemål manuellt mot hela marknaden.
                    </p>

                    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                        {/* Section 1: Preferences */}
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] uppercase tracking-widest text-sage font-bold block mb-3">
                                    Önskat område
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        'Marbella',
                                        'Nerja',
                                        'Palma',
                                        'Alicante',
                                        'Torrevieja',
                                        'Vet ej än',
                                    ].map((region) => (
                                        <label key={region} className="cursor-pointer">
                                            <input type="checkbox" className="hidden peer" />
                                            <span className="px-4 py-2 border border-gray-200 text-sm text-charcoal rounded-sm hover:border-navy peer-checked:bg-navy peer-checked:text-white peer-checked:border-navy transition-all block">
                                                {region}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-sage font-bold block mb-3">
                                        Typ av bostad
                                    </label>
                                    <select className="w-full bg-greige/30 border-b border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy transition-colors text-charcoal">
                                        <option>Villa</option>
                                        <option>Lägenhet</option>
                                        <option>Radhus</option>
                                        <option>Takvåning</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-sage font-bold block mb-3">
                                        Budget (ca)
                                    </label>
                                    <select className="w-full bg-greige/30 border-b border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy transition-colors text-charcoal">
                                        <option>€ 150 000 - 250 000</option>
                                        <option>€ 250 000 - 500 000</option>
                                        <option>€ 500 000 - 1M</option>
                                        <option>€ 1M +</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Personal Details */}
                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <h4 className="text-sm font-medium text-navy">
                                Dina kontaktuppgifter
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                                        Namn
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-greige/30 border border-transparent focus:bg-white focus:border-navy px-4 py-3 text-sm rounded-sm outline-none transition-all"
                                        placeholder="För- och efternamn"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                                        Telefon
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full bg-greige/30 border border-transparent focus:bg-white focus:border-navy px-4 py-3 text-sm rounded-sm outline-none transition-all"
                                        placeholder="+46..."
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                                    E-post
                                </label>
                                <input
                                    type="email"
                                    className="w-full bg-greige/30 border border-transparent focus:bg-white focus:border-navy px-4 py-3 text-sm rounded-sm outline-none transition-all"
                                    placeholder="din@email.se"
                                />
                            </div>
                        </div>

                        <button className="w-full bg-navy text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-charcoal transition-all shadow-lg shadow-navy/20 flex items-center justify-center gap-2 group">
                            Starta bevakning
                            <ArrowRight
                                size={16}
                                className="text-sand group-hover:translate-x-1 transition-transform"
                            />
                        </button>
                        <p className="text-center text-[10px] text-gray-400">
                            Gratis tjänst. Du kan avsluta när du vill.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
