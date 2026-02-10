'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    MessageSquare,
    Search,
    Calendar,
    Car,
    Key,
    Check,
    ChevronDown,
    ChevronUp,
    Send,
    CheckCircle,
    ArrowRight,
    MapPin,
    Plane
} from 'lucide-react';

// FAQ Accordion Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-5 flex items-center justify-between text-left cursor-pointer group"
            >
                <span className="font-serif text-lg text-navy group-hover:text-sand transition-colors">
                    {question}
                </span>
                {isOpen ? (
                    <ChevronUp size={20} className="text-sand flex-shrink-0" />
                ) : (
                    <ChevronDown size={20} className="text-gray-400 group-hover:text-sand flex-shrink-0 transition-colors" />
                )}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'
                    }`}
            >
                <p className="text-gray-600 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
}

// Preparation Accordion Component
function PrepItem({ title, content }: { title: string; content: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-sm shadow-soft overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 flex items-center justify-between text-left cursor-pointer group"
            >
                <span className="font-serif text-lg text-navy group-hover:text-sand transition-colors">
                    {title}
                </span>
                {isOpen ? (
                    <ChevronUp size={20} className="text-sand flex-shrink-0" />
                ) : (
                    <ChevronDown size={20} className="text-gray-400 group-hover:text-sand flex-shrink-0 transition-colors" />
                )}
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
            >
                <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-600 leading-relaxed">{content}</p>
                </div>
            </div>
        </div>
    );
}

export default function VisningsresaPage() {
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
                name: 'Visningsresa',
                item: 'https://spanienfastigheter.se/visningsresa'
            }
        ]
    };
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        setIsSubmitted(true);
    };

    const scrollToForm = () => {
        document.getElementById('anmalan')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Timeline steps
    const steps = [
        {
            number: 1,
            title: 'Berätta om dina önskemål',
            icon: MessageSquare,
            description: 'Vi börjar med ett samtal där du berättar vad du söker – budget, område, typ av bostad och dina prioriteringar.'
        },
        {
            number: 2,
            title: 'Vi matchar fastigheter',
            icon: Search,
            description: 'Baserat på dina önskemål väljer vi ut 8-12 fastigheter som passar din profil och bokar visningar.'
        },
        {
            number: 3,
            title: 'Boka din resa',
            icon: Calendar,
            description: 'Välj datum som passar dig. En typisk visningsresa är 3-5 dagar, ofta torsdag-söndag eller över en långhelg.'
        },
        {
            number: 4,
            title: 'Guidade visningar på plats',
            icon: Car,
            description: 'Vi hämtar dig och kör till alla visningar. Du får också en grundlig genomgång av olika områden och deras för- och nackdelar.'
        },
        {
            number: 5,
            title: 'Hjälp hela vägen till köp',
            icon: Key,
            description: 'Hittar du drömmen hjälper vi dig med advokat, bank, NIE-nummer och hela köpprocessen på svenska.'
        }
    ];

    // What's included items
    const includedItems = [
        'Personlig rådgivning innan resan',
        'Skräddarsytt urval av 8-12 fastigheter',
        'Transport mellan alla visningar',
        'Guidad områdestur med lokal expert',
        'Möte med svensktalande advokat',
        'Introduktion till spansk bank för finansiering',
        'Genomgång av köpprocessen steg för steg',
        'Hjälp med NIE-nummer och dokumentation',
        'Fortsatt support efter hemkomst'
    ];

    // FAQ items
    const faqItems = [
        {
            question: 'Hur lång tid tar en visningsresa?',
            answer: 'En typisk visningsresa är 3-5 dagar. De flesta åker över en långhelg (torsdag-söndag) för att hinna med 8-12 visningar utan att stressa.'
        },
        {
            question: 'Kostar visningsresan något?',
            answer: 'Vi tar inte betalt för vår tid eller visningarna. Du bokar och betalar själv flyg och hotell. Vi kan rekommendera boende i olika prisklasser.'
        },
        {
            question: 'Måste jag köpa något?',
            answer: 'Absolut inte. En visningsresa är helt förutsättningslös. Många åker på 2-3 resor innan de hittar rätt.'
        },
        {
            question: 'Kan jag ta med familjen?',
            answer: 'Självklart! Det är ofta bra att hela familjen får uppleva området och tycka till om bostäderna.'
        },
        {
            question: 'Vad händer om jag hittar en bostad jag vill köpa?',
            answer: 'Då hjälper vi dig direkt på plats med reservationsavtal, advokatkontakt och bankintroduktion. Hela processen från intresse till nycklar tar normalt 4-8 veckor.'
        },
        {
            question: 'Vilken tid på året är bäst att åka?',
            answer: 'Alla årstider fungerar, men vår och höst är populärast. Då är vädret behagligt och du får en realistisk bild av området utan sommarens turisttryck.'
        }
    ];

    // Preparation items
    const prepItems = [
        {
            title: 'Finansiering',
            content: 'Ha koll på din budget innan du åker. Svenska banker ger sällan lån för spanska fastigheter, men spanska banker erbjuder upp till 70% belåning för utländska köpare. Vi hjälper dig med bankkontakter på plats.'
        },
        {
            title: 'NIE-nummer',
            content: 'Du behöver ett spanskt NIE-nummer (identitetsnummer för utlänningar) för att köpa fastighet. Vi kan hjälpa dig ansöka innan eller under resan.'
        },
        {
            title: 'Önskelista',
            content: 'Skriv ner dina måsten och önskemål: Nära strand? Pool? Antal sovrum? Garage? Havsutsikt? Nära golfbana? Ju tydligare bild, desto bättre matchning.'
        },
        {
            title: 'Budget',
            content: 'Räkna med cirka 10-13% extra utöver köpesumman för skatter, avgifter och juridiska kostnader. Vi går igenom alla kostnader i detalj.'
        }
    ];

    return (
        <div className="min-h-screen bg-alabaster">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {/* Hero Section */}
            <section className="relative bg-navy text-white py-24 md:py-40 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/visningsresa-hero.png"
                        alt="Costa Blanca kustvy"
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
                            <Plane size={14} className="text-sand" />
                            <span className="text-xs uppercase tracking-widest">Upplev Spanien</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                            Kom på visningsresa till <span className="text-sand italic">Spanien</span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto mb-10">
                            Upplev Costa Blanca eller Costa del Sol – vi guidar dig till din drömbostad på 3-5 dagar
                        </p>

                        <button
                            onClick={scrollToForm}
                            className="inline-flex items-center gap-2 bg-sand text-navy px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors cursor-pointer"
                        >
                            Anmäl intresse
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Decorative Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8F7F4" />
                    </svg>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                            En visningsresa är det bästa sättet att hitta rätt bostad i Spanien. Under några intensiva dagar visar vi dig skräddarsydda fastigheter, introducerar dig till området och hjälper dig genom hela köpprocessen – från första visning till nycklarna i handen.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works - Timeline */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-4 mb-4">
                            <div className="h-px bg-navy/20 w-12"></div>
                            <span className="text-xs uppercase tracking-widest text-sand font-bold">Steg för steg</span>
                            <div className="h-px bg-navy/20 w-12"></div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif text-navy">
                            Hur det <span className="text-sand italic">fungerar</span>
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid gap-8">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <div
                                        key={step.number}
                                        className="flex gap-6 items-start group"
                                    >
                                        {/* Number & Line */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center font-serif text-lg group-hover:bg-sand transition-colors">
                                                {step.number}
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div className="w-px h-16 bg-gray-200 mt-2" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pb-8">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Icon size={20} className="text-sand" />
                                                <h3 className="font-serif text-xl text-navy">
                                                    {step.title}
                                                </h3>
                                            </div>
                                            <p className="text-gray-600 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-16 md:py-24 bg-greige/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-navy">
                            Vad ingår i en <span className="text-sand italic">visningsresa</span>
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="grid sm:grid-cols-2 gap-4">
                            {includedItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 bg-white p-4 rounded-sm shadow-soft"
                                >
                                    <Check size={20} className="text-sage flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Areas We Cover */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-navy">
                            Områden vi <span className="text-sand italic">täcker</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Costa Blanca */}
                        <div className="relative group overflow-hidden rounded-sm shadow-soft">
                            <div className="aspect-[4/3] relative">
                                <Image
                                    src="/images/areas/benidorm.png"
                                    alt="Costa Blanca"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="font-serif text-2xl mb-2">Costa Blanca</h3>
                                <p className="text-white/70 text-sm mb-3">
                                    Torrevieja, Orihuela Costa, Alicante, Benidorm, Jávea, Calpe, Denia, Moraira
                                </p>
                                <p className="text-sand text-sm italic mb-4">
                                    Skandinavernas favorit med 300 soldagar om året
                                </p>
                                <Link
                                    href="/omraden?region=costa-blanca"
                                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white hover:text-sand transition-colors cursor-pointer"
                                >
                                    Utforska Costa Blanca
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>

                        {/* Costa del Sol */}
                        <div className="relative group overflow-hidden rounded-sm shadow-soft">
                            <div className="aspect-[4/3] relative">
                                <Image
                                    src="/images/areas/marbella.png"
                                    alt="Costa del Sol"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="font-serif text-2xl mb-2">Costa del Sol</h3>
                                <p className="text-white/70 text-sm mb-3">
                                    Marbella, Fuengirola, Estepona, Nerja, Málaga, Benalmádena, Mijas
                                </p>
                                <p className="text-sand text-sm italic mb-4">
                                    Glamour och genuint spanskt längs solkusten
                                </p>
                                <Link
                                    href="/omraden?region=costa-del-sol"
                                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white hover:text-sand transition-colors cursor-pointer"
                                >
                                    Utforska Costa del Sol
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Preparation Section */}
            <section className="py-16 md:py-24 bg-alabaster">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-navy">
                            Förbered dig inför <span className="text-sand italic">visningsresan</span>
                        </h2>
                    </div>

                    <div className="max-w-2xl mx-auto space-y-4">
                        {prepItems.map((item, index) => (
                            <PrepItem key={index} title={item.title} content={item.content} />
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-navy">
                            Vanliga <span className="text-sand italic">frågor</span>
                        </h2>
                    </div>

                    <div className="max-w-2xl mx-auto bg-alabaster p-8 rounded-sm">
                        {faqItems.map((item, index) => (
                            <FAQItem key={index} question={item.question} answer={item.answer} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Lead Generation Form */}
            <section id="anmalan" className="py-16 md:py-24 bg-navy text-white scroll-mt-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-serif mb-4">
                                Anmäl intresse för <span className="text-sand italic">visningsresa</span>
                            </h2>
                            <p className="text-white/70">
                                Fyll i formuläret så kontaktar vi dig inom 24 timmar
                            </p>
                        </div>

                        <div className="bg-white text-navy p-8 md:p-10 rounded-sm shadow-soft">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={32} className="text-sage" />
                                    </div>
                                    <h3 className="text-xl font-serif text-navy mb-2">Tack för din anmälan!</h3>
                                    <p className="text-gray-500">
                                        Vi kontaktar dig inom 24 timmar för att boka in ett samtal.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name Fields */}
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                                Förnamn *
                                            </label>
                                            <input
                                                type="text"
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
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors"
                                                placeholder="Ditt efternamn"
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Fields */}
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                                E-post *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors"
                                                placeholder="din@email.com"
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
                                                placeholder="+46 70 123 45 67"
                                            />
                                        </div>
                                    </div>

                                    {/* Area Selection */}
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                            Föredraget område
                                        </label>
                                        <select className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors bg-white cursor-pointer">
                                            <option value="">Välj område...</option>
                                            <option value="costa-blanca">Costa Blanca</option>
                                            <option value="costa-del-sol">Costa del Sol</option>
                                            <option value="both">Båda / Vet ej ännu</option>
                                        </select>
                                    </div>

                                    {/* Property Type */}
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3">
                                            Typ av bostad
                                        </label>
                                        <div className="flex flex-wrap gap-4">
                                            {['Lägenhet', 'Radhus', 'Villa', 'Öppen för förslag'].map((type) => (
                                                <label key={type} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        name="propertyType"
                                                        value={type}
                                                        className="w-4 h-4 text-sand border-gray-300 rounded focus:ring-sand cursor-pointer"
                                                    />
                                                    <span className="text-gray-700">{type}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Budget */}
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                            Budget
                                        </label>
                                        <select className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors bg-white cursor-pointer">
                                            <option value="">Välj budget...</option>
                                            <option value="under-100k">Under 100 000 €</option>
                                            <option value="100k-200k">100 000 - 200 000 €</option>
                                            <option value="200k-300k">200 000 - 300 000 €</option>
                                            <option value="300k-500k">300 000 - 500 000 €</option>
                                            <option value="over-500k">Över 500 000 €</option>
                                        </select>
                                    </div>

                                    {/* Desired Period */}
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                            Önskad period (valfritt)
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors"
                                            placeholder="T.ex. mars 2025, våren, flexibel..."
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                            Meddelande (valfritt)
                                        </label>
                                        <textarea
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors resize-none"
                                            placeholder="Beskriv vad du söker eller har frågor om..."
                                        />
                                    </div>

                                    {/* GDPR Checkbox */}
                                    <div>
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                required
                                                className="w-4 h-4 mt-1 text-sand border-gray-300 rounded focus:ring-sand cursor-pointer"
                                            />
                                            <span className="text-sm text-gray-600">
                                                Jag godkänner att mina uppgifter sparas och behandlas enligt GDPR för att Spanienfastigheter ska kunna kontakta mig angående visningsresor.
                                            </span>
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-navy text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-charcoal transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                                    >
                                        {isLoading ? (
                                            'Skickar...'
                                        ) : (
                                            <>
                                                Skicka intresseanmälan
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
        </div>
    );
}
