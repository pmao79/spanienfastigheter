import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

const benefits = [
    'Personligt urval efter dina önskemål',
    'Transport och guidning på plats',
    'Möte med svensktalande advokat och bank',
    'Kostnadsfri rådgivning',
];

export default function VisningsresaTeaser() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Image Side - 45% */}
                    <div className="lg:col-span-5 relative">
                        <div className="aspect-[4/3] relative rounded-sm overflow-hidden shadow-xl">
                            <Image
                                src="/images/visningsresa-hero.png"
                                alt="Visningsresa till Spanien - besök bostäder på Costa Blanca och Costa del Sol"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Decorative accent */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-sand/20 rounded-sm -z-10 hidden lg:block" />
                    </div>

                    {/* Text Side - 55% */}
                    <div className="lg:col-span-7">
                        <span className="text-sand text-[10px] uppercase tracking-[0.25em] font-bold mb-4 block">
                            Visningsresa
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6 leading-tight">
                            Upplev bostäderna på plats
                        </h2>
                        <p className="text-gray-600 font-light text-lg mb-8 leading-relaxed max-w-xl">
                            Det bästa sättet att hitta rätt bostad är att se den med egna ögon. Följ med på en skräddarsydd visningsresa där vi visar dig 8-12 utvalda fastigheter på 3-5 dagar – helt förutsättningslöst.
                        </p>

                        {/* Benefits */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-10">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check size={12} className="text-sage" strokeWidth={3} />
                                    </div>
                                    <span className="text-gray-700 text-sm">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <Link
                            href="/visningsresa"
                            className="inline-flex items-center gap-3 bg-navy text-white px-8 py-4 uppercase tracking-[0.15em] text-xs font-bold hover:bg-charcoal transition-colors group"
                        >
                            Läs mer om visningsresor
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
