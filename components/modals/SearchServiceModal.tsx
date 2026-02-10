'use client';

import { useState } from 'react';
import { X, Check, ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import { sendVIPWelcome } from '@/actions/email/send-vip';

interface SearchServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchServiceModal({
    isOpen,
    onClose,
}: SearchServiceModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Form State
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
    const [propertyType, setPropertyType] = useState('Villa');
    const [budget, setBudget] = useState('€ 150 000 - 250 000');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const toggleArea = (area: string) => {
        if (selectedAreas.includes(area)) {
            setSelectedAreas(selectedAreas.filter(a => a !== area));
        } else {
            setSelectedAreas([...selectedAreas, area]);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const result = await sendVIPWelcome({
                name,
                email,
                phone,
                areas: selectedAreas.join(', ') || 'Ej angivet',
                type: propertyType,
                budget
            });

            if (result.success) {
                setIsSubmitted(true);
            } else {
                alert('Något gick fel. Försök igen.');
            }
        } catch (error) {
            console.error(error);
            alert('Något gick fel. Försök igen.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    if (isSubmitted) {
        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
                <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-2xl relative z-10 flex flex-col items-center text-center animate-fade-in-up">
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full">
                        <X size={20} />
                    </button>
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-600">
                        <Check size={40} />
                    </div>
                    <h3 className="text-2xl font-serif text-navy mb-2">Välkommen som VIP!</h3>
                    <p className="text-gray-500 mb-8 max-w-xs">
                        Vi har mottagit dina önskemål och börjar leta direkt. En bekräftelse har skickats till {email}.
                    </p>
                    <button onClick={onClose} className="bg-navy text-white px-8 py-3 uppercase tracking-widest text-xs font-bold rounded-md">
                        Stäng fönstret
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="bg-white w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[90vh] overflow-y-auto md:overflow-hidden rounded-lg shadow-2xl relative z-10 flex flex-col md:flex-row animate-fade-in">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-black/10 text-charcoal rounded-full transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Left Side: Brand & Value Prop */}
                <div className="w-full md:w-2/5 md:flex hidden bg-navy text-white relative flex-col justify-between p-8 md:p-12 overflow-hidden">
                    {/* Background Image overlay */}
                    <div className="absolute inset-0 opacity-40">
                        <Image
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
                            alt="Luxury home"
                            fill
                            sizes="40vw"
                            className="object-cover"
                            unoptimized
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
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/10">
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

                    <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
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
                                    ].map((region) => (
                                        <label key={region} className="cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                className="hidden peer"
                                                checked={selectedAreas.includes(region)}
                                                onChange={() => toggleArea(region)}
                                            />
                                            <span className="px-4 py-2 border border-gray-200 text-sm text-charcoal rounded-md hover:border-navy peer-checked:bg-navy peer-checked:text-white peer-checked:border-navy transition-all block">
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
                                    <select
                                        value={propertyType}
                                        onChange={(e) => setPropertyType(e.target.value)}
                                        className="w-full bg-greige/30 border-b border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy transition-colors text-charcoal"
                                    >
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
                                    <select
                                        value={budget}
                                        onChange={(e) => setBudget(e.target.value)}
                                        className="w-full bg-greige/30 border-b border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-navy transition-colors text-charcoal"
                                    >
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
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-greige/30 border border-transparent focus:bg-white focus:border-navy px-4 py-3 text-sm rounded-md outline-none transition-all"
                                        placeholder="För- och efternamn"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                                        Telefon
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-greige/30 border border-transparent focus:bg-white focus:border-navy px-4 py-3 text-sm rounded-md outline-none transition-all"
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
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-greige/30 border border-transparent focus:bg-white focus:border-navy px-4 py-3 text-sm rounded-md outline-none transition-all"
                                    placeholder="din@email.se"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-navy text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-charcoal transition-all shadow-lg shadow-navy/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed rounded-md"
                        >
                            {isLoading ? 'Skickar...' : 'Starta bevakning'}
                            {!isLoading && <ArrowRight
                                size={16}
                                className="text-sand group-hover:translate-x-1 transition-transform"
                            />}
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
