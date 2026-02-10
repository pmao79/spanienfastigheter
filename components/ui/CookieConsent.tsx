'use client';

import { useState, useEffect } from 'react';
import { X, Cookie, Shield } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasConsented, setHasConsented] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consentStatus = localStorage.getItem('cookie-consent');
        if (consentStatus === null) {
            // Show banner after a small delay
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        } else {
            setHasConsented(consentStatus === 'accepted');
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setHasConsented(true);
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setHasConsented(false);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
            <div className="max-w-4xl mx-auto bg-navy text-white rounded-lg shadow-2xl overflow-hidden">
                <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="hidden md:flex w-12 h-12 bg-sand/20 rounded-full items-center justify-center flex-shrink-0">
                            <Cookie size={24} className="text-sand" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <h3 className="font-serif text-xl mb-2 flex items-center gap-2">
                                <Cookie size={20} className="text-sand md:hidden" />
                                Vi använder cookies
                            </h3>
                            <p className="text-white/70 text-sm leading-relaxed mb-4">
                                Vi använder cookies för att förbättra din upplevelse på vår webbplats,
                                analysera trafik och visa relevant innehåll. Genom att klicka &quot;Acceptera&quot;
                                godkänner du vår användning av cookies.
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleAccept}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-sand text-navy uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors"
                                >
                                    <Shield size={14} />
                                    Acceptera alla
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-white/30 text-white uppercase tracking-widest text-xs font-bold hover:bg-white/10 transition-colors"
                                >
                                    Endast nödvändiga
                                </button>
                                <Link
                                    href="/integritetspolicy"
                                    className="flex items-center justify-center text-sm text-white/50 hover:text-white underline underline-offset-4"
                                >
                                    Läs mer om integritetspolicyn
                                </Link>
                            </div>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={handleDecline}
                            className="text-white/50 hover:text-white transition-colors"
                            aria-label="Stäng"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
