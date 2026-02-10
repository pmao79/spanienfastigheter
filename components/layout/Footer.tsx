'use client';

import Link from 'next/link';
import { Instagram, Facebook, Linkedin, ArrowRight, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { subscribeToNewsletter } from '@/actions/email/subscribe-newsletter';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        try {
            const result = await subscribeToNewsletter(email);
            if (result.success) {
                setIsSubmitted(true);
                setEmail('');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <footer className="bg-navy text-white pt-24 pb-12 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                {/* Brand - Col 4 */}
                <div className="md:col-span-4 pr-12">
                    <Link
                        href="/"
                        className="text-2xl font-serif font-medium tracking-tight mb-8 block"
                    >
                        Spanienfastigheter<span className="text-sand">.se</span>
                    </Link>
                    <p className="text-white/60 font-light text-sm mb-8 leading-relaxed max-w-sm">
                        Din trygga partner för bostadsaffärer på Costa Blanca och Costa del
                        Sol. Vi kombinerar skandinavisk standard med spansk livskvalitet.
                    </p>
                    <div className="flex gap-6">
                        <a
                            href="#"
                            className="text-white/40 hover:text-sand transition-colors"
                            aria-label="Följ oss på Instagram"
                        >
                            <Instagram size={20} strokeWidth={1.5} />
                        </a>
                        <a
                            href="#"
                            className="text-white/40 hover:text-sand transition-colors"
                            aria-label="Följ oss på Facebook"
                        >
                            <Facebook size={20} strokeWidth={1.5} />
                        </a>
                        <a
                            href="#"
                            className="text-white/40 hover:text-sand transition-colors"
                            aria-label="Följ oss på LinkedIn"
                        >
                            <Linkedin size={20} strokeWidth={1.5} />
                        </a>
                    </div>
                </div>

                {/* Links - Col 2 */}
                <div className="md:col-span-2">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-sand">
                        Destinationer
                    </h4>
                    <ul className="space-y-4 text-sm text-white/60 font-light">
                        <li>
                            <Link
                                href="/omraden/costa-del-sol"
                                className="hover:text-white transition-colors block"
                            >
                                Costa del Sol
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/omraden/costa-blanca"
                                className="hover:text-white transition-colors block"
                            >
                                Costa Blanca
                            </Link>
                        </li>
                    </ul>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mt-10 mb-6 text-sand">
                        Populära sökningar
                    </h4>
                    <ul className="space-y-4 text-sm text-white/60 font-light">
                        <li>
                            <Link
                                href="/fastigheter/torrevieja/strandnara"
                                className="hover:text-white transition-colors block"
                            >
                                Strandnära Torrevieja
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/fastigheter/torrevieja/radhus"
                                className="hover:text-white transition-colors block"
                            >
                                Radhus i Torrevieja
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/fastigheter/torrevieja/bungalow"
                                className="hover:text-white transition-colors block"
                            >
                                Bungalow i Torrevieja
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Links - Col 2 */}
                <div className="md:col-span-2">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-sand">
                        Företaget
                    </h4>
                    <ul className="space-y-4 text-sm text-white/60 font-light">
                        <li>
                            <Link
                                href="/om-oss"
                                className="hover:text-white transition-colors block"
                            >
                                Om oss
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/salja"
                                className="hover:text-white transition-colors block"
                            >
                                Sälja bostad
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/visningsresa"
                                className="hover:text-white transition-colors block"
                            >
                                Visningsresa
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/golf"
                                className="hover:text-white transition-colors block"
                            >
                                Golfguiden
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/guide/kopa-bostad-spanien"
                                className="hover:text-white transition-colors block"
                            >
                                Guide: Köpa bostad i Spanien
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/kontakt"
                                className="hover:text-white transition-colors block"
                            >
                                Kontakt
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Newsletter - Col 4 */}
                <div className="md:col-span-4">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-sand">
                        Nyhetsbrev
                    </h4>
                    <p className="text-white/60 font-light text-sm mb-6">
                        Få tillgång till &quot;Off-market&quot; objekt och marknadsanalyser
                        innan de når publika marknaden.
                    </p>
                    {isSubmitted ? (
                        <div className="flex items-center gap-3 text-sand bg-white/5 p-3 rounded-lg border border-sand/30">
                            <div className="w-8 h-8 rounded-full bg-sand/20 flex items-center justify-center flex-shrink-0">
                                <Check size={16} />
                            </div>
                            <span className="text-sm font-light">Tack! Du prenumererar nu.</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubscribe} className="flex border-b border-white/20 pb-2 relative group focus-within:border-sand transition-colors">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Din e-postadress"
                                required
                                className="bg-transparent outline-none text-white placeholder-white/20 w-full text-sm py-2 font-light"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="text-white/40 group-hover:text-sand transition-colors absolute right-0 top-1/2 -translate-y-1/2 p-2 disabled:opacity-50"
                                aria-label="Prenumerera på nyhetsbrev"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <ArrowRight size={18} />}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/50 uppercase tracking-widest">
                <p>&copy; {new Date().getFullYear()} Spanienfastigheter AB.</p>
                <div className="flex gap-8">
                    <Link href="/integritet" className="hover:text-white transition-colors">
                        Integritet
                    </Link>
                    <Link href="/cookies" className="hover:text-white transition-colors">
                        Cookies
                    </Link>
                    <Link href="/villkor" className="hover:text-white transition-colors">
                        Villkor
                    </Link>
                </div>
            </div>
        </footer>
    );
}
