'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    CheckCircle,
    Camera,
    Globe,
    Users,
    FileText,
    Handshake,
    TrendingUp,
    Shield,
    MessageSquare,
    Send
} from 'lucide-react';

export default function SellPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setIsSubmitted(true);
    };

    const processSteps = [
        {
            icon: MessageSquare,
            title: 'Första kontakten',
            description: 'Vi börjar med ett kostnadsfritt samtal för att förstå din situation och fastighet.',
        },
        {
            icon: Camera,
            title: 'Värdering & fotografering',
            description: 'Professionell värdering baserad på marknadsdata. Vi fotograferar din fastighet för maximal effekt.',
        },
        {
            icon: Globe,
            title: 'Marknadsföring',
            description: 'Din fastighet exponeras för skandinaviska köpare via vår hemsida, sociala medier och partnerportaler.',
        },
        {
            icon: Users,
            title: 'Visningar',
            description: 'Vi hanterar alla förfrågningar och genomför visningar med kvalificerade köpare.',
        },
        {
            icon: FileText,
            title: 'Förhandling',
            description: 'Vi förhandlar fram bästa möjliga pris och villkor för din räkning.',
        },
        {
            icon: Handshake,
            title: 'Avslut',
            description: 'Vi guidar dig genom hela juridiska processen tills försäljningen är komplett.',
        },
    ];

    const benefits = [
        {
            icon: TrendingUp,
            title: 'Maximera värdet',
            description: 'Vi känner den skandinaviska marknaden och vet vad köpare söker.',
        },
        {
            icon: Globe,
            title: 'Räckvidd',
            description: 'Nå tusentals potentiella köpare i Sverige, Norge och Danmark.',
        },
        {
            icon: Shield,
            title: 'Trygghet',
            description: 'Full transparens genom hela processen. Inga dolda avgifter.',
        },
    ];

    return (
        <div className="min-h-screen bg-alabaster">
            {/* Hero Section */}
            <section className="relative bg-navy text-white py-24 md:py-32 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
                            <TrendingUp size={14} className="text-sand" />
                            <span className="text-xs uppercase tracking-widest">Sälj med oss</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif mb-6">
                            Sälj din <span className="text-sand italic">spanska</span> fastighet
                        </h1>

                        <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-8">
                            Vi hjälper dig nå rätt köpare i Skandinavien. Med lokal expertis i Spanien
                            och djup förståelse för den nordiska marknaden maximerar vi värdet på din fastighet.
                        </p>

                        <a
                            href="#kontakt-formular"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-sand text-navy uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors"
                        >
                            Gratis värdering
                            <ArrowRight size={16} />
                        </a>
                    </div>
                </div>

                {/* Decorative Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8F7F4" />
                    </svg>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
                            Varför sälja med <span className="text-sand italic">oss</span>?
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Vi kombinerar lokal expertis med nordisk marknadskunskap för att ge dig bästa möjliga resultat.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {benefits.map((benefit, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-8 rounded-sm shadow-soft text-center group hover:shadow-hover transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-sand transition-colors">
                                    <benefit.icon size={28} className="text-sand group-hover:text-navy transition-colors" />
                                </div>
                                <h3 className="font-serif text-xl text-navy mb-3">{benefit.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px bg-navy/10 w-12"></div>
                        <h2 className="text-3xl md:text-4xl font-serif text-navy">
                            Så går det <span className="text-sand italic">till</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {processSteps.map((step, idx) => (
                            <div
                                key={idx}
                                className="relative p-6 border border-gray-100 rounded-sm group hover:border-sand/50 transition-colors"
                            >
                                <div className="absolute -top-3 -left-3 w-8 h-8 bg-sand text-navy rounded-full flex items-center justify-center text-sm font-bold">
                                    {idx + 1}
                                </div>
                                <div className="flex items-center gap-4 mb-4 pt-2">
                                    <step.icon size={24} className="text-navy" />
                                    <h3 className="font-serif text-lg text-navy">{step.title}</h3>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="kontakt-formular" className="py-16 md:py-24 bg-greige/30 scroll-mt-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
                                Gratis <span className="text-sand italic">värdering</span>
                            </h2>
                            <p className="text-gray-600">
                                Fyll i formuläret så återkommer vi med en kostnadsfri värdering av din fastighet.
                            </p>
                        </div>

                        <div className="bg-white p-8 md:p-10 rounded-sm shadow-soft">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={32} className="text-sage" />
                                    </div>
                                    <h3 className="text-xl font-serif text-navy mb-2">Tack för din förfrågan!</h3>
                                    <p className="text-gray-500">Vi kontaktar dig inom 24 timmar med en värdering.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                                Förnamn *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                                Efternamn *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                            E-post *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                            Telefon *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                            Fastighetens plats
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="t.ex. Torrevieja, Costa Blanca"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                            Beskrivning
                                        </label>
                                        <textarea
                                            rows={4}
                                            placeholder="Berätta om din fastighet (typ, storlek, skick, etc.)"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-navy text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-charcoal transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isLoading ? 'Skickar...' : (
                                            <>
                                                Begär gratis värdering
                                                <Send size={14} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-navy text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif mb-6">
                        Redo att ta nästa <span className="text-sand italic">steg</span>?
                    </h2>
                    <p className="text-white/70 max-w-xl mx-auto mb-8">
                        Ring oss direkt för ett kostnadsfritt samtal om din fastighet.
                    </p>
                    <a
                        href="tel:+46708625253"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-sand text-navy uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors"
                    >
                        +46 0708 62 52 53
                    </a>
                </div>
            </section>
        </div>
    );
}
