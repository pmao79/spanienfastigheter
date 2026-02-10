'use client';

import Link from 'next/link';
import { ArrowRight, Heart, Shield, Globe, Users, MapPin, Phone, Mail } from 'lucide-react';

export default function AboutPage() {
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Hem',
                item: 'https://spanienfastigheter.se'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Om oss',
                item: 'https://spanienfastigheter.se/om-oss'
            }
        ]
    };
    const values = [
        {
            icon: Heart,
            title: 'Personlig service',
            description: 'Vi behandlar varje kund som unik. Din dröm om ett hem i solen är vår prioritet.',
        },
        {
            icon: Shield,
            title: 'Trygghet först',
            description: 'Full transparens och ärlighet genom hela processen. Inga överraskningar.',
        },
        {
            icon: Globe,
            title: 'Lokal expertis',
            description: 'Vi bor och verkar i Spanien, med djup kunskap om marknaden och kulturen.',
        },
    ];

    return (
        <div className="min-h-screen bg-alabaster">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {/* Hero Section */}
            <section className="relative bg-navy text-white py-24 md:py-32 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
                            <Users size={14} className="text-sand" />
                            <span className="text-xs uppercase tracking-widest">Sedan 2015</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif mb-6">
                            Om <span className="text-sand italic">Oss</span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
                            Vi hjälper skandinaver att hitta och köpa sin drömbostad i Spanien.
                            Med passion, kunskap och en personlig touch.
                        </p>
                    </div>
                </div>

                {/* Decorative Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8F7F4" />
                    </svg>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-px bg-navy/10 w-12"></div>
                                <span className="text-xs uppercase tracking-widest text-sand font-bold">Vår historia</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-serif text-navy mb-6">
                                Från dröm till <span className="text-sand italic">verklighet</span>
                            </h2>

                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Spanienfastigheter.se grundades med en enkel idé: att göra det enklare
                                    för svenskar att hitta sitt drömhem i Spanien. Vi förstod att processen
                                    kunde kännas överväldigande – nytt land, nytt språk, nya regler.
                                </p>
                                <p>
                                    Idag hjälper vi hundratals familjer varje år att ta steget. Vårt fokus
                                    har alltid varit på kvalitet framför kvantitet – vi arbetar bara med
                                    noggrant utvalda fastigheter och samarbetar med pålitliga partners.
                                </p>
                                <p>
                                    Vi vet vad det innebär att längta efter solen, och vi gör allt för att
                                    din resa dit ska vara trygg och smidig.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-[4/5] bg-navy rounded-lg overflow-hidden flex items-center justify-center">
                                <div className="text-center p-8">
                                    <span className="text-[120px] font-serif text-sand/20">SF</span>
                                    <p className="text-white/60 text-sm uppercase tracking-widest mt-4">Spanienfastigheter.se</p>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-sand text-navy p-6 rounded-lg shadow-lg">
                                <p className="text-4xl font-serif font-bold">1000+</p>
                                <p className="text-xs uppercase tracking-widest">Nöjda kunder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
                            Våra <span className="text-sand italic">värderingar</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Det som driver oss varje dag är att leverera en upplevelse utöver det vanliga.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, idx) => (
                            <div
                                key={idx}
                                className="text-center p-8 border border-gray-100 rounded-lg hover:border-sand/50 transition-colors"
                            >
                                <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-6">
                                    <value.icon size={28} className="text-sand" />
                                </div>
                                <h3 className="font-serif text-xl text-navy mb-3">{value.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
                            Möt <span className="text-sand italic">teamet</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Bakom Spanienfastigheter.se finns engagerade människor med en gemensam passion.
                        </p>
                    </div>

                    <div className="max-w-md mx-auto">
                        <div className="bg-white p-8 rounded-lg shadow-soft text-center">
                            <div className="w-24 h-24 bg-navy rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-sand text-3xl font-serif">MO</span>
                            </div>
                            <h3 className="font-serif text-2xl text-navy mb-1">Marcus Ohlander</h3>
                            <p className="text-sand text-sm italic mb-4">Grundare & Mäklare</p>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                Med över 10 års erfarenhet i den spanska fastighetsmarknaden hjälper
                                Marcus familjer att hitta rätt boende. Han bor själv i Spanien och
                                förstår vad det innebär att ta steget.
                            </p>
                            <div className="flex flex-col gap-3">
                                <a
                                    href="tel:+46708625253"
                                    className="flex items-center justify-center gap-2 text-sm text-navy hover:text-sand transition-colors"
                                >
                                    <Phone size={16} className="text-sand" />
                                    +46 0708 62 52 53
                                </a>
                                <a
                                    href="mailto:marcus@spanienfastigheter.se"
                                    className="flex items-center justify-center gap-2 text-sm text-navy hover:text-sand transition-colors"
                                >
                                    <Mail size={16} className="text-sand" />
                                    marcus@spanienfastigheter.se
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-navy text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif mb-6">
                        Redo att börja din <span className="text-sand italic">resa</span>?
                    </h2>
                    <p className="text-white/70 max-w-xl mx-auto mb-8">
                        Oavsett om du letar efter ett semesterhus eller en permanent flytt – vi finns här för dig.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/fastigheter"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sand text-navy uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors"
                        >
                            Se fastigheter
                            <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/kontakt"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/30 text-white uppercase tracking-widest text-xs font-bold hover:bg-white/10 transition-colors"
                        >
                            Kontakta oss
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
