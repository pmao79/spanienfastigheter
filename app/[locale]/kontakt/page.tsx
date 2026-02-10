'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { sendContactConfirmation } from '@/actions/email/send-contact';

export default function ContactPage() {
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
                name: 'Kontakt',
                item: 'https://spanienfastigheter.se/kontakt'
            }
        ]
    };
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = `${formData.get('firstName')} ${formData.get('lastName')}`;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;

        try {
            const result = await sendContactConfirmation({
                name,
                email,
                phone,
                message,
                objectTitle: subject // Use objectTitle to pass the Subject/Ärende
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
                            <MessageSquare size={14} className="text-sand" />
                            <span className="text-xs uppercase tracking-widest">Vi hjälper dig</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif mb-6">
                            Kontakta <span className="text-sand italic">Oss</span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
                            Har du frågor om en fastighet eller vill boka en visning?
                            Vi finns här för att hjälpa dig hitta ditt drömboende i Spanien.
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

            {/* Main Content */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

                        {/* Contact Form */}
                        <div className="order-2 lg:order-1">
                            <div className="bg-white p-8 md:p-10 rounded-sm shadow-soft">
                                <h2 className="text-2xl font-serif text-navy mb-2">Skicka ett meddelande</h2>
                                <p className="text-gray-500 text-sm mb-8">Vi svarar vanligtvis inom 24 timmar</p>

                                {isSubmitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle size={32} className="text-sage" />
                                        </div>
                                        <h3 className="text-xl font-serif text-navy mb-2">Tack för ditt meddelande!</h3>
                                        <p className="text-gray-500">Vi återkommer så snart som möjligt.</p>
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
                                                    name="firstName"
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors"
                                                    placeholder="Ditt förnamn"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                                    Efternamn *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors"
                                                    placeholder="Ditt efternamn"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                                E-post *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors"
                                                placeholder="din@email.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                                Telefon
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors"
                                                placeholder="+46 70 123 45 67"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                                Ärende
                                            </label>
                                            <select name="subject" className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors bg-white">
                                                <option>Fråga om fastighet</option>
                                                <option>Boka visning</option>
                                                <option>Sälja min fastighet</option>
                                                <option>Allmän fråga</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                                Meddelande *
                                            </label>
                                            <textarea
                                                required
                                                name="message"
                                                rows={5}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors resize-none"
                                                placeholder="Beskriv vad du söker eller har frågor om..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-navy text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-charcoal transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {isLoading ? (
                                                'Skickar...'
                                            ) : (
                                                <>
                                                    Skicka meddelande
                                                    <Send size={14} />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Contact Info & Agent */}
                        <div className="order-1 lg:order-2 space-y-8">
                            {/* Agent Card */}
                            <div className="bg-white p-8 rounded-sm shadow-soft">
                                <h3 className="text-xs uppercase tracking-widest text-sand font-bold mb-6">Din kontakt</h3>

                                <div className="flex items-start gap-5">
                                    <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center overflow-hidden flex-shrink-0">
                                        <span className="text-sand text-2xl font-serif">MO</span>
                                    </div>
                                    <div>
                                        <h4 className="font-serif text-xl text-navy">Marcus Ohlander</h4>
                                        <p className="text-sand text-sm italic mb-3">Mäklare</p>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                            Med över 10 års erfarenhet av den spanska fastighetsmarknaden
                                            hjälper jag dig genom hela köpprocessen.
                                        </p>
                                        <div className="space-y-2">
                                            <a
                                                href="tel:+46708625253"
                                                className="flex items-center gap-3 text-sm text-navy hover:text-sand transition-colors"
                                            >
                                                <Phone size={16} className="text-sand" />
                                                +46 0708 62 52 53
                                            </a>
                                            <a
                                                href="mailto:marcus@spanienfastigheter.se"
                                                className="flex items-center gap-3 text-sm text-navy hover:text-sand transition-colors"
                                            >
                                                <Mail size={16} className="text-sand" />
                                                marcus@spanienfastigheter.se
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Contact Cards */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <a
                                    href="tel:+46708625253"
                                    className="group bg-navy text-white p-6 rounded-sm hover:bg-charcoal transition-colors"
                                >
                                    <Phone size={24} className="text-sand mb-4" />
                                    <p className="text-xs uppercase tracking-widest text-white/60 mb-1">Ring oss</p>
                                    <p className="font-serif text-lg group-hover:text-sand transition-colors">
                                        +46 0708 62 52 53
                                    </p>
                                </a>

                                <a
                                    href="mailto:info@spanienfastigheter.se"
                                    className="group bg-navy text-white p-6 rounded-sm hover:bg-charcoal transition-colors"
                                >
                                    <Mail size={24} className="text-sand mb-4" />
                                    <p className="text-xs uppercase tracking-widest text-white/60 mb-1">E-post</p>
                                    <p className="font-serif text-lg group-hover:text-sand transition-colors">
                                        info@spanienfastigheter.se
                                    </p>
                                </a>
                            </div>

                            {/* Office Hours */}
                            <div className="bg-greige/30 p-6 rounded-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock size={18} className="text-sand" />
                                    <h3 className="font-serif text-navy">Öppettider</h3>
                                </div>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Måndag - Fredag</span>
                                        <span className="font-medium text-navy">09:00 - 18:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Lördag</span>
                                        <span className="font-medium text-navy">10:00 - 14:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Söndag</span>
                                        <span className="text-gray-400">Stängt</span>
                                    </div>
                                </div>
                            </div>

                            {/* Location Note */}
                            <div className="flex items-start gap-4 p-6 bg-white rounded-sm shadow-soft">
                                <MapPin size={20} className="text-sand flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-serif text-navy mb-1">Vi jobbar digitalt</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Vi har inget fysiskt kontor att besöka, men vi finns alltid tillgängliga
                                        via telefon, video och e-post. Visningar bokas direkt på plats i Spanien.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
