'use client';

import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';

export default function GolfCTA() {
    return (
        <div className="bg-navy text-white p-8 rounded-sm shadow-soft">
            <div className="flex items-start gap-4 mb-4">
                <div className="bg-sand p-3 rounded-full text-navy">
                    <Home size={24} />
                </div>
                <div>
                    <h3 className="font-serif text-2xl mb-2">Drömboende nära banan?</h3>
                    <p className="text-white/80 mb-6">
                        Vi har exklusiva fastigheter med gångavstånd till tee. Från moderna lägenheter till lyxvillor.
                    </p>
                    <Link
                        href="/fastigheter?golf=true"
                        className="inline-flex items-center gap-2 text-sand font-bold uppercase tracking-widest text-sm hover:text-white transition-colors"
                    >
                        Se fastigheter <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
