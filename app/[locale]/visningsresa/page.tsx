'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowDown,
    ArrowRight,
    BadgeCheck,
    BedDouble,
    CalendarDays,
    Car,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    ClipboardList,
    FileText,
    Landmark,
    MessageSquare,
    Plane,
    Search,
    ShieldCheck,
    Wallet
} from 'lucide-react';

type IconType = typeof Plane;

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-greige last:border-0">
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
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
                <p className="text-gray-600 leading-relaxed">{answer}</p>
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

        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        setIsSubmitted(true);
    };

    const scrollToForm = () => {
        document.getElementById('anmalan')?.scrollIntoView({ behavior: 'smooth' });
    };

    const offerCards = [
        {
            label: 'Flyg',
            value: 'Upp till 5 000 kr',
            note: 'Per person, economy class',
            icon: Plane
        },
        {
            label: 'Boende',
            value: 'Upp till 1 500 kr/natt',
            note: 'Hotell eller lägenhet',
            icon: BedDouble
        },
        {
            label: 'Visningsperiod',
            value: 'Upp till 5 nätter',
            note: 'Skräddarsytt schema',
            icon: CalendarDays
        }
    ];

    const steps = [
        {
            number: 1,
            title: 'Berätta vad du söker',
            icon: MessageSquare,
            description: 'Vi börjar med ett samtal där du berättar om budget, område och typ av bostad. Inga förpliktelser.'
        },
        {
            number: 2,
            title: 'Vi matchar fastigheter åt dig',
            icon: Search,
            description: 'Vi väljer ut 8–12 objekt som matchar dina kriterier och skickar förslag innan resan.'
        },
        {
            number: 3,
            title: 'Boka din resa',
            icon: CalendarDays,
            description: 'Du bokar flyg och boende. Vi hjälper gärna med rekommendationer och transfer.'
        },
        {
            number: 4,
            title: 'Guidade visningar på plats',
            icon: Car,
            description: 'Vi kör dig mellan visningar och visar områden så du får rätt känsla för läget.'
        },
        {
            number: 5,
            title: 'Hjälp hela vägen till nycklar',
            icon: ShieldCheck,
            description: 'Vi hjälper till med advokat, bank, NIE och hela köpprocessen på svenska.'
        }
    ];

    const includedItems: { title: string; description: string; icon: IconType }[] = [
        {
            title: 'Transport mellan visningar',
            description: 'Vi kör dig till alla visningar och visar områdena.',
            icon: Car
        },
        {
            title: 'Svensktalande guide',
            description: 'Personlig rådgivare som följer dig under resan.',
            icon: MessageSquare
        },
        {
            title: '8–12 utvalda visningar',
            description: 'Handplockade objekt utifrån dina önskemål.',
            icon: BadgeCheck
        },
        {
            title: 'Upphämtning vid ankomst',
            description: 'Vi möter dig vid flygplatsen om du vill.',
            icon: Plane
        },
        {
            title: 'Juridisk rådgivning',
            description: 'Stöd i kontrakt, NIE och hela köpprocessen.',
            icon: FileText
        },
        {
            title: 'Bank & finansiering',
            description: 'Vi guidar dig till bankkontakter och lån.',
            icon: Landmark
        }
    ];

    const prepItems: { title: string; description: string; icon: IconType }[] = [
        {
            title: 'Finansiering',
            description: 'Spanska banker erbjuder ofta upp till 70% belåning. Vi hjälper med kontakt.',
            icon: Wallet
        },
        {
            title: 'NIE-nummer',
            description: 'Obligatoriskt för köp. Vi hjälper dig att ansöka innan resan.',
            icon: FileText
        },
        {
            title: 'Önskelista',
            description: 'Gör listan tydlig: strand, pool, sovrum, utsikt, golf, service.',
            icon: ClipboardList
        },
        {
            title: 'Budget',
            description: 'Räkna med 10–13% extra för skatter och avgifter.',
            icon: BadgeCheck
        }
    ];

    const testimonials = [
        {
            name: 'Anna & Lars',
            location: 'Stockholm → Torrevieja',
            initials: 'AL',
            text: 'Visningsresan var välplanerad och vi hittade vår drömlägenhet redan dag två. Kändes tryggt hela vägen.'
        },
        {
            name: 'Maria & Karl',
            location: 'Göteborg → Marbella',
            initials: 'MK',
            text: 'Fantastisk service från första samtal till nyckelöverlämning. Återbetalningen av resan var pricken över i.'
        },
        {
            name: 'Erik & Jenny',
            location: 'Malmö → Calpe',
            initials: 'EJ',
            text: 'Svensktalande rådgivare gjorde hela processen enkel. Rekommenderar varmt.'
        }
    ];

    const areaCards = [
        {
            name: 'Costa Blanca',
            description: 'Torrevieja, Alicante, Calpe, Benidorm och fler – 300+ bostäder att se',
            note: 'Skandinavernas favorit med 300 soldagar om året',
            image: '/images/regions/costa-blanca-hero.png',
            href: '/omraden?region=costa-blanca'
        },
        {
            name: 'Costa del Sol',
            description: 'Marbella, Málaga, Fuengirola, Estepona – Spaniens mest populära kust',
            note: 'Glamour och genuint spanskt längs solkusten',
            image: '/images/regions/costa-del-sol-hero.png',
            href: '/omraden?region=costa-del-sol'
        },
        {
            name: 'Costa Cálida',
            description: 'La Manga, Los Alcázares, Cartagena, Mar de Cristal – lugn kust och laguner',
            note: 'Familjevänligt med Mar Menor och gott om sol',
            image: '/images/regions/costa-calida-hero.png',
            href: '/omraden?region=costa-calida'
        },
        {
            name: 'Costa de Almería',
            description: 'Mojácar, Vera, Almería, San Juan de los Terreros – orörd kust',
            note: 'Prisvärt och autentiskt med lugna stränder',
            image: '/images/regions/costa-almeria-hero.png',
            href: '/omraden?region=costa-almeria'
        }
    ];

    const faqItems = [
        {
            question: 'Hur lång tid tar en visningsresa?',
            answer: 'En typisk visningsresa är 3–5 dagar. Det ger tid för 8–12 visningar och att lära känna områdena.'
        },
        {
            question: 'Kostar visningsresan något?',
            answer: 'Du bokar och betalar flyg och boende själv. Genomför du ett köp via oss återbetalar vi resekostnaderna enligt villkoren.'
        },
        {
            question: 'Måste jag köpa något?',
            answer: 'Nej. Visningsresan är helt utan förpliktelse. Många åker hem och funderar innan de tar beslut.'
        },
        {
            question: 'Kan jag ta med familjen?',
            answer: 'Absolut. Vi anpassar schemat så att hela familjen får se området och bostäderna.'
        },
        {
            question: 'Vad händer om jag inte hittar rätt?',
            answer: 'Vi fortsätter att leta och skickar nya objekt som matchar din profil efter resan.'
        },
        {
            question: 'Vilken tid på året är bäst att åka?',
            answer: 'Vår och höst är populärast, men året runt fungerar beroende på vad du vill se.'
        }
    ];

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer
            }
        }))
    };

    return (
        <div className="min-h-screen bg-alabaster">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Hero */}
            <section className="relative min-h-[85vh] flex items-center justify-center text-center text-white overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/regions/costa-del-sol-hero.png"
                        alt="Lyxiga villor vid spanska kusten"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/40 to-navy/80" />
                </div>

                <div className="relative z-10 max-w-3xl px-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded mb-8">
                        <Plane size={14} className="text-sand" />
                        <span className="text-xs uppercase tracking-widest">Upplev Spanien på plats</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                        Kom på <span className="text-sand italic">visningsresa</span> till Spanien
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 font-light mb-10">
                        Upplev Costa Blanca och Costa del Sol på 3–5 dagar. Vi guidar dig till ditt drömboende – och vid köp återbetalar vi resekostnader.
                    </p>
                    <button
                        onClick={scrollToForm}
                        className="inline-flex items-center gap-2 bg-sand text-navy px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors rounded-md"
                    >
                        Anmäl intresse
                        <ArrowRight size={16} />
                    </button>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-[10px] uppercase tracking-[0.3em] flex flex-col items-center gap-2">
                    <span>Scrolla</span>
                    <ArrowDown size={16} />
                </div>
            </section>

            {/* Offer banner */}
            <section className="py-16 md:py-20 bg-navy text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(196,162,101,0.12),transparent_55%)]" />
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Vårt erbjudande</p>
                        <h2 className="text-3xl md:text-4xl font-serif mb-4">
                            Köper du bostad genom oss? <br /> Då bjuder vi på <span className="text-sand italic">din resa</span>
                        </h2>
                        <p className="text-white/70 font-light mb-10">
                            Boka din visningsresa och res ner på egen hand. När köpet är klart återbetalar vi flyg och boende enligt villkoren.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {offerCards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <div key={card.label} className="bg-white/5 border border-white/10 p-6 rounded-lg">
                                    <Icon size={24} className="text-sand mb-4" />
                                    <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-2">{card.label}</p>
                                    <p className="text-2xl font-serif text-sand mb-2">{card.value}</p>
                                    <p className="text-sm text-white/60">{card.note}</p>
                                </div>
                            );
                        })}
                    </div>
                    <p className="text-xs text-white/50 text-center mt-8 italic">
                        Återbetalning sker när köpet är genomfört och nycklarna är överlämnade
                    </p>
                </div>
            </section>

            {/* How it works */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-12">
                        <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Steg för steg</p>
                        <h2 className="text-3xl md:text-4xl font-serif text-navy">Hur det fungerar</h2>
                    </div>
                    <div className="grid gap-8">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={step.number} className="flex gap-6 items-start">
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center font-serif text-lg leading-none">
                                                {step.number}
                                            </div>
                                        {index < steps.length - 1 && <div className="w-px h-16 bg-greige mt-2" />}
                                    </div>
                                    <div className="flex-1 pb-8">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Icon size={18} className="text-sand" />
                                            <h3 className="font-serif text-xl text-navy">{step.title}</h3>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Included */}
            <section className="py-16 md:py-24 bg-greige/30">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-12">
                        <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Allt ingår</p>
                        <h2 className="text-3xl md:text-4xl font-serif text-navy">Vad ingår i visningsresan</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {includedItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="bg-white rounded-lg p-6 shadow-soft border border-gray-100">
                                    <div className="w-12 h-12 rounded-full bg-alabaster flex items-center justify-center mb-4">
                                        <Icon size={20} className="text-sand" />
                                    </div>
                                    <h3 className="font-serif text-lg text-navy mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Dream section */}
            <section className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[250px] lg:h-auto lg:min-h-[540px]">
                    <Image
                        src="/images/regions/costa-blanca-town.png"
                        alt="Spansk vardag vid havet"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-navy/80" />
                </div>
                <div className="bg-navy text-white px-6 md:px-12 py-16 flex flex-col justify-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Mer än en resa</p>
                    <h2 className="text-3xl md:text-4xl font-serif mb-6">
                        Upplev din framtida <span className="text-sand italic">vardag</span>
                    </h2>
                    <p className="text-white/70 font-light mb-8 max-w-xl">
                        En visningsresa handlar inte bara om att titta på bostäder. Det handlar om att känna in området, livet och möjligheterna.
                    </p>
                    <div className="grid grid-cols-3 gap-6 max-w-xl">
                        <div>
                            <p className="text-3xl font-serif text-sand">320+</p>
                            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Soldagar</p>
                        </div>
                        <div>
                            <p className="text-3xl font-serif text-sand">3.5h</p>
                            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Flygtid</p>
                        </div>
                        <div>
                            <p className="text-3xl font-serif text-sand">50%</p>
                            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Lägre kostnad</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-12">
                        <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Nöjda kunder</p>
                        <h2 className="text-3xl md:text-4xl font-serif text-navy">Vad våra kunder säger</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((item) => (
                            <div key={item.name} className="bg-greige/30 rounded-lg p-6 border border-greige relative">
                                <div className="text-sand text-xs tracking-[0.2em] mb-4">★★★★★</div>
                                <p className="text-sm text-gray-600 italic mb-6">“{item.text}”</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-navy text-sand flex items-center justify-center font-serif">
                                        {item.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-navy">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Areas */}
            <section className="py-16 md:py-24 bg-greige/30">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-12">
                        <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Destinationer</p>
                        <h2 className="text-3xl md:text-4xl font-serif text-navy">Områden vi täcker</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {areaCards.map((area) => (
                            <div key={area.name} className="relative overflow-hidden rounded-lg shadow-soft group">
                                <div className="aspect-[4/3] relative">
                                    <Image src={area.image} alt={area.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="font-serif text-2xl mb-2">{area.name}</h3>
                                    <p className="text-white/70 text-sm mb-2">{area.description}</p>
                                    <p className="text-sand text-sm italic mb-4">{area.note}</p>
                                    <Link href={area.href} className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white hover:text-sand transition-colors">
                                        Utforska {area.name}
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prep section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-12">
                        <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Bra att ha klart</p>
                        <h2 className="text-3xl md:text-4xl font-serif text-navy">Förbered dig inför visningsresan</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {prepItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="bg-alabaster p-6 rounded-lg border border-greige">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Icon size={18} className="text-sand" />
                                        <h3 className="font-serif text-lg text-navy">{item.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-[900px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-12">
                        <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Vanliga frågor</p>
                        <h2 className="text-3xl md:text-4xl font-serif text-navy">Frågor om visningsresan</h2>
                    </div>
                    <div className="bg-alabaster rounded-lg p-8">
                        {faqItems.map((item) => (
                            <FAQItem key={item.question} question={item.question} answer={item.answer} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24 bg-navy text-white">
                <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Redo att ta nästa steg?</p>
                    <h2 className="text-3xl md:text-4xl font-serif mb-6">
                        Redo att se din framtida bostad <span className="text-sand italic">på plats</span>?
                    </h2>
                    <p className="text-white/70 font-light mb-8">
                        Fyll i en intresseanmälan så kontaktar vi dig inom 24 timmar och planerar din visningsresa.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-[0.2em] text-white/60 mt-10">
                        <span>Ingen förpliktelse</span>
                        <span>Svensktalande guide</span>
                        <span>Resan betald vid köp</span>
                    </div>
                </div>
            </section>

            {/* Lead form */}
            <section id="anmalan" className="py-16 md:py-24 bg-white scroll-mt-24">
                <div className="max-w-[900px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">
                            Anmäl intresse för <span className="text-sand italic">visningsresa</span>
                        </h2>
                        <p className="text-gray-600">
                            Fyll i formuläret så kontaktar vi dig inom 24 timmar
                        </p>
                    </div>

                    <div className="bg-alabaster text-navy p-8 md:p-10 rounded-lg shadow-soft border border-greige">
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
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                            Förnamn *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors bg-white"
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
                                            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors bg-white"
                                            placeholder="Ditt efternamn"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                            E-post *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors bg-white"
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
                                            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors bg-white"
                                            placeholder="+46 70 123 45 67"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                        Föredraget område
                                    </label>
                                        <select className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors bg-white">
                                        <option value="">Välj område...</option>
                                        <option value="costa-blanca">Costa Blanca</option>
                                        <option value="costa-del-sol">Costa del Sol</option>
                                        <option value="both">Båda / Vet ej ännu</option>
                                    </select>
                                </div>

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
                                                    className="w-4 h-4 text-sand border-gray-300 rounded-md focus:ring-sand"
                                                />
                                                <span className="text-gray-700">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                        Budget
                                    </label>
                                        <select className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors bg-white">
                                        <option value="">Välj budget...</option>
                                        <option value="under-100k">Under 100 000 €</option>
                                        <option value="100k-200k">100 000 - 200 000 €</option>
                                        <option value="200k-300k">200 000 - 300 000 €</option>
                                        <option value="300k-500k">300 000 - 500 000 €</option>
                                        <option value="over-500k">Över 500 000 €</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                        Önskad period (valfritt)
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors bg-white"
                                        placeholder="T.ex. mars 2025, våren, flexibel..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                                        Meddelande (valfritt)
                                    </label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:border-sand focus:ring-1 focus:ring-sand outline-none transition-colors resize-none bg-white"
                                        placeholder="Beskriv vad du söker eller har frågor om..."
                                    />
                                </div>

                                <div>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            required
                                            className="w-4 h-4 mt-1 text-sand border-gray-300 rounded-md focus:ring-sand"
                                        />
                                        <span className="text-sm text-gray-600">
                                            Jag godkänner att mina uppgifter sparas och behandlas enligt GDPR för att Spanienfastigheter ska kunna kontakta mig angående visningsresor.
                                        </span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-navy text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-charcoal transition-colors flex items-center justify-center gap-2 disabled:opacity-50 rounded-md"
                                >
                                    {isLoading ? 'Skickar...' : 'Skicka intresseanmälan'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
