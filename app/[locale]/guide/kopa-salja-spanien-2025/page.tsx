import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowDown,
    ArrowRight,
    BadgeCheck,
    Building2,
    CheckCircle,
    FileText,
    Landmark,
    Plane,
    Percent,
    ShieldCheck,
    AlertTriangle,
    XCircle,
    Sparkles,
    Sun
} from 'lucide-react';
import CostCalculator from './CostCalculator';

// --- Types ---
type Props = {
    params: Promise<{ locale: string }>;
};

// --- Metadata ---
export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    // In a real app, we would fetch these from i18n
    const title = locale === 'sv'
        ? 'Köpa bostad i Spanien 2026 | Komplett guide | Spanienfastigheter.se'
        : 'Buying Property in Spain 2026 | Complete Guide | Spanienfastigheter.se';

    const description = locale === 'sv'
        ? 'Komplett guide till att köpa bostad i Spanien: skatter, NIE, köpprocess, kostnader och uthyrningsregler. Uppdaterad för 2026.'
        : 'Complete guide to buying property in Spain: taxes, NIE, buying process, costs, and rental rules. Updated for 2026.';

    return {
        title,
        description,
        alternates: {
            canonical: '/guide/kopa-bostad-spanien'
        }
    };
}

// --- Components ---

const Section = ({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) => (
    <section id={id} className={`py-12 md:py-16 ${className || ''}`}>
        <div className="container mx-auto px-4">{children}</div>
    </section>
);

const Hero = () => (
    <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0">
            <Image
                src="/images/guide/2026-02-10-14-35-00-hero-villa.png"
                alt="Lyxig villa vid spansk kust"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/60 to-navy/90" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-32">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
                <div>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded text-xs uppercase tracking-[0.3em] text-sand border border-white/10 mb-6">
                        <Sparkles size={14} className="text-sand" /> Uppdaterad för 2026
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                        Köpa bostad i <span className="text-sand italic">Spanien</span> – komplett guide
                    </h1>
                    <p className="text-white/75 text-lg md:text-xl font-light max-w-xl mb-8">
                        Skatter, köpprocess, uthyrningsregler, finansiering och vanliga fällor. Allt du behöver veta för att köpa tryggt på Costa del Sol och Costa Blanca.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="#kalkylator"
                            className="inline-flex items-center gap-2 bg-sand text-navy px-6 py-3 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors rounded-md"
                        >
                            Beräkna din kostnad
                            <ArrowRight size={14} />
                        </Link>
                        <Link
                            href="#process"
                            className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white/10 transition-colors rounded-md"
                        >
                            Läs guiden
                            <ArrowDown size={14} />
                        </Link>
                    </div>
                    <div className="mt-10 flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-white/60">
                        <span className="flex items-center gap-2"><BadgeCheck size={14} className="text-sand" /> Svensktalande rådgivning</span>
                        <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-sand" /> Juridisk due diligence</span>
                        <span className="flex items-center gap-2"><CheckCircle size={14} className="text-sand" /> Trygg process</span>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.3em] text-sand mb-6">Snabba insikter 2026</p>
                    <div className="space-y-5">
                        <div className="border-b border-white/10 pb-4">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Överföringsskatt (ITP)</p>
                            <p className="font-serif text-lg text-sand">7% Andalusien · 10% Valencia</p>
                            <p className="text-xs text-white/50">Valencia sänks till 9% den 1 juni 2026</p>
                        </div>
                        <div className="border-b border-white/10 pb-4">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Korttidsuthyrning</p>
                            <p className="font-serif text-lg text-sand">VUD-ID krävs från 1 juli 2025</p>
                            <p className="text-xs text-white/50">Utan ID blockeras annonsen automatiskt</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">Prisökning Costa Blanca</p>
                            <p className="font-serif text-lg text-sand">+3–5% årligen</p>
                            <p className="text-xs text-white/50">Stabil värdeutveckling sedan 2019</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const StickyNav = () => (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-greige/50 shadow-sm hidden md:block">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <ul className="flex items-center gap-4 overflow-x-auto py-4 text-xs font-semibold text-charcoal scrollbar-hide">
                <li><Link href="#varfor" className="hover:text-sand transition-colors whitespace-nowrap">Varför Spanien</Link></li>
                <li><Link href="#comparison" className="hover:text-sand transition-colors whitespace-nowrap">Solkusten vs Blanca</Link></li>
                <li><Link href="#taxes" className="hover:text-sand transition-colors whitespace-nowrap">Skatter</Link></li>
                <li><Link href="#kalkylator" className="hover:text-sand transition-colors whitespace-nowrap">Kalkylator</Link></li>
                <li><Link href="#rental" className="hover:text-sand transition-colors whitespace-nowrap">Uthyrning</Link></li>
                <li><Link href="#process" className="hover:text-sand transition-colors whitespace-nowrap">Köpprocess</Link></li>
                <li><Link href="#misstag" className="hover:text-sand transition-colors whitespace-nowrap">Misstag</Link></li>
                <li><Link href="#faq" className="hover:text-sand transition-colors whitespace-nowrap">FAQ</Link></li>
                <li className="ml-auto">
                    <Link href="#contact" className="px-4 py-2 bg-navy text-white rounded-md hover:bg-charcoal transition-colors text-xs">
                        Boka rådgivning
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
);

const WhySpain = () => (
    <Section id="varfor" className="bg-greige/30">
        <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Varför Spanien?</p>
                <h2 className="font-serif text-3xl md:text-4xl text-navy">Europas mest populära land för fastighetsköp</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { value: '320+', label: 'Soldagar', desc: 'Medelhavsklimat året runt', icon: Sun },
                    { value: '3.5h', label: 'Flygtid', desc: 'Direktflyg från Sverige', icon: Plane },
                    { value: '50%', label: 'Lägre priser', desc: 'Jämfört med södra Sverige', icon: Percent },
                    { value: '4–6%', label: 'Hyresavkastning', desc: 'Costa Blanca direktavkastning', icon: Building2 }
                ].map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.label} className="bg-white rounded-lg p-6 text-center border border-greige shadow-soft">
                            <Icon size={18} className="text-sand mx-auto mb-3" />
                            <p className="font-serif text-3xl text-sand mb-2">{item.value}</p>
                            <p className="text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-2">{item.label}</p>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    </Section>
);

const LifestyleSection = () => (
    <Section className="bg-white">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative h-[260px] lg:h-[420px] rounded-lg overflow-hidden">
                <Image
                    src="/images/guide/2026-02-10-14-35-05-terrace-lifestyle.png"
                    alt="Terrass med havsutsikt i Spanien"
                    fill
                    className="object-cover"
                />
            </div>
            <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Livsstil</p>
                <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4">
                    Upplev din framtida <span className="text-sand italic">vardag</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                    Att köpa bostad i Spanien handlar om mer än en adress. Det handlar om känslan: morgonkaffe på terrassen, promenader längs havet och en vardag där solen nästan alltid är med.
                </p>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { value: '320+', label: 'Soldagar' },
                        { value: '3.5h', label: 'Flygtid' },
                        { value: '50%', label: 'Lägre kostnad' }
                    ].map((item) => (
                        <div key={item.label} className="bg-alabaster p-4 rounded-lg border border-greige text-center">
                            <p className="font-serif text-2xl text-sand">{item.value}</p>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mt-1">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </Section>
);

const ComparisonTable = () => (
    <Section id="comparison" className="bg-greige/30">
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Jämförelse</p>
                <h2 className="font-serif text-3xl md:text-4xl text-navy">Costa del Sol vs Costa Blanca</h2>
                <p className="text-gray-600 mt-3 max-w-2xl mx-auto">En strategisk jämförelse för investerare och bostadsköpare 2026.</p>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-soft border border-greige bg-white">
                <table className="w-full text-left border-collapse min-w-[720px]">
                    <thead>
                        <tr className="text-xs uppercase tracking-[0.2em]">
                            <th className="p-4 md:p-6 font-semibold text-charcoal">Parameter</th>
                            <th className="p-4 md:p-6 font-semibold text-white bg-navy">Costa del Sol (Andalusien)</th>
                            <th className="p-4 md:p-6 font-semibold text-white bg-navy/90">Costa Blanca (Valencia)</th>
                            <th className="p-4 md:p-6 font-semibold text-navy bg-sand">Strategisk analys</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm md:text-base">
                        <tr className="border-b border-greige">
                            <td className="p-4 md:p-6 font-semibold text-navy">Prisnivå</td>
                            <td className="p-4 md:p-6 text-charcoal">Premium (Marbella: ca 5 569 €/m²)</td>
                            <td className="p-4 md:p-6 text-charcoal">Prisvärt (Torrevieja: 2 600 – 3 400 €/m²)</td>
                            <td className="p-4 md:p-6 text-charcoal bg-alabaster">Dubbelt så hög kapitalinsats krävs på Solkusten.</td>
                        </tr>
                        <tr className="border-b border-greige bg-greige/30">
                            <td className="p-4 md:p-6 font-semibold text-navy">Värdeökning</td>
                            <td className="p-4 md:p-6 text-charcoal">Hög potential (men volatil)</td>
                            <td className="p-4 md:p-6 text-charcoal">Stabil (3–5 % årligen)</td>
                            <td className="p-4 md:p-6 text-charcoal bg-alabaster">Solkusten = Värdetillväxt. Costa Blanca = Säkerhet.</td>
                        </tr>
                        <tr className="border-b border-greige">
                            <td className="p-4 md:p-6 font-semibold text-navy">Hyresavkastning</td>
                            <td className="p-4 md:p-6 text-charcoal">3,5 – 5,0 %</td>
                            <td className="p-4 md:p-6 text-charcoal">4,5 – 6,5 %</td>
                            <td className="p-4 md:p-6 text-charcoal bg-alabaster">Costa Blanca är starkast för kassaflöde.</td>
                        </tr>
                        <tr>
                            <td className="p-4 md:p-6 font-semibold text-navy">Köparprofil</td>
                            <td className="p-4 md:p-6 text-charcoal">Global elit, investeringsfonder</td>
                            <td className="p-4 md:p-6 text-charcoal">Europeisk medelklass, barnfamiljer</td>
                            <td className="p-4 md:p-6 text-charcoal bg-alabaster">Diversifierad risk på Costa Blanca.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-8 bg-white border border-sand/30 p-6 rounded-lg text-center">
                <p className="text-navy font-medium">
                    <strong>Vårt råd:</strong> Välj Costa del Sol för prestige och långsiktig värdeökning. Välj Costa Blanca för lägre driftskostnader och högre direktavkastning på hyra.
                </p>
            </div>
        </div>
    </Section>
);

const TaxSection = () => (
    <Section id="taxes" className="bg-alabaster">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Skatter</p>
                <h2 className="font-serif text-3xl md:text-4xl text-navy">Skatter vid köp – så mycket kostar det</h2>
                <p className="text-gray-600 mt-3">Skatterna varierar beroende på region och om bostaden är nyproduktion eller begagnad.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Resale */}
                <div className="bg-white p-8 rounded-lg shadow-soft border border-greige relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-navy text-white text-xs font-bold px-3 py-1 rounded-bl">BEGAGNAT</div>
                    <h3 className="font-serif text-xl text-navy mb-4">Överföringsskatt (ITP)</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-baseline mb-2">
                                <h4 className="font-bold text-sand">Andalusien</h4>
                                <span className="text-2xl font-bold text-navy">7 %</span>
                            </div>
                            <p className="text-sm text-charcoal">Platt skatt. Oavsett om du köper för 100 000 € eller 10 miljoner €.</p>
                        </div>
                        <div className="border-t border-greige pt-4">
                            <div className="flex justify-between items-baseline mb-2">
                                <h4 className="font-bold text-sage">Valencia</h4>
                                <span className="text-2xl font-bold text-navy">10 %</span>
                            </div>
                            <p className="text-sm text-charcoal">Generell sats. (11 % för värden över 1 miljon €). Sänks till 9 % den 1 juni 2026 (dock ej för lyxfastigheter).</p>
                        </div>
                    </div>
                </div>

                {/* New Build */}
                <div className="bg-white p-8 rounded-lg shadow-soft border border-greige relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-sand text-navy text-xs font-bold px-3 py-1 rounded-bl">NYPRODUKTION</div>
                    <h3 className="font-serif text-xl text-navy mb-4">Moms (IVA) + AJD</h3>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-charcoal font-medium">Nationell Moms (IVA)</span>
                            <span className="font-bold text-navy text-xl">10 %</span>
                        </div>
                        <p className="text-xs text-charcoal/70">Gäller i hela Spanien för nyproduktion.</p>
                    </div>

                    <div className="bg-greige/30 p-4 rounded-lg">
                        <h4 className="font-bold text-navy text-sm mb-3">Tillkommer: Stämpelskatt (AJD)</h4>
                        <div className="flex justify-between items-center mb-2 text-sm">
                            <span>Andalusien</span>
                            <span className="font-bold">1,2 %</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span>Valencia</span>
                            <span className="font-bold">1,5 %</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </Section>
);

const CalculatorSection = () => (
    <Section id="kalkylator" className="bg-navy">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Verktyg</p>
                <h2 className="font-serif text-3xl md:text-4xl text-white">Beräkna din totala kostnad</h2>
                <p className="text-white/60 mt-3">Se vad du betalar utöver köpesumman – skatter, avgifter och drift.</p>
            </div>
            <CostCalculator />
        </div>
    </Section>
);

const RentalRules = () => (
    <Section id="rental" className="bg-white">
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Uthyrning 2025</p>
                <h2 className="font-serif text-3xl md:text-4xl text-navy">Reglerna har skärpts – det här gäller</h2>
                <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Korttidsuthyrning kräver mer planering. Här är en snabb översikt per region.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-red-50 border border-red-100 p-6 rounded-lg">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
                        <AlertTriangle size={18} />
                    </div>
                    <h3 className="font-serif text-lg text-navy font-bold mb-2">Nya ID‑kravet</h3>
                    <p className="text-sm text-charcoal mb-4">Från <strong>1 juli 2025</strong> måste alla annonser på Airbnb/Booking ha ett unikt VUD‑ID.</p>
                    <p className="text-xs text-red-800 font-medium">Saknas ID blockeras annonsen automatiskt.</p>
                </div>

                <div className="bg-white border border-greige p-6 rounded-lg">
                    <div className="w-10 h-10 bg-alabaster rounded-full flex items-center justify-center mb-4 text-sand">
                        <Building2 size={18} />
                    </div>
                    <h3 className="font-serif text-lg text-navy font-bold mb-2">Costa del Sol</h3>
                    <ul className="text-sm text-charcoal space-y-3">
                        <li><strong>Moratorium i Málaga:</strong> Stopp för nya turistlicenser i staden till 2027.</li>
                        <li><strong>Separat ingång:</strong> Många kommuner kräver egen entré.</li>
                        <li><strong>Grannarnas veto:</strong> Samfälligheten måste godkänna.</li>
                    </ul>
                </div>

                <div className="bg-sage/10 border border-sage/20 p-6 rounded-lg">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4 text-sand">
                        <ShieldCheck size={18} />
                    </div>
                    <h3 className="font-serif text-lg text-navy font-bold mb-2">Costa Blanca</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-bold text-sage uppercase tracking-wider mb-1">Turist (&lt;10 dagar)</p>
                            <p className="text-sm text-charcoal">Kräver licens, VUD‑ID & samfällighetens tillstånd. Licens gäller 5 år.</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-navy uppercase tracking-wider mb-1">Säsong (&gt;11 dagar)</p>
                            <p className="text-sm text-charcoal">Ingen turistlicens krävs. Går under vanlig hyreslag (LAU).</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <Link href="#contact" className="inline-flex items-center gap-2 text-navy font-bold hover:text-sand transition-colors border-b-2 border-sand pb-1">
                    Få hjälp att bedöma licensmöjlighet för en specifik bostad
                    <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    </Section>
);

const ProcessTimeline = () => (
    <Section id="process" className="bg-navy text-white">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Steg för steg</p>
                <h2 className="font-serif text-3xl md:text-4xl text-white">Köpprocessen i fem steg</h2>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-white/20">
                {/* Step 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-navy group-[.is-active]:bg-sand group-[.is-active]:border-sand text-white group-[.is-active]:text-navy font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow shadow-white/20">
                        1
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                        <h3 className="font-serif text-xl text-sand mb-2">Förberedelse & NIE</h3>
                        <p className="text-white/80 text-sm">Du måste ha ett spanskt skatte-ID. Via ambassaden tar det 3-5 månader. Vi hjälper dig göra det på plats (3-4 veckor).</p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/30 bg-navy text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        2
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 border border-white/10 rounded-lg">
                        <h3 className="font-serif text-xl text-sand mb-2">Boka & Reservera</h3>
                        <p className="text-white/80 text-sm">Reservationsavgift (ca 6 000 €) för att ta bostaden av marknaden. Betala aldrig direkt till säljaren!</p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/30 bg-navy text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        3
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 border border-sand rounded-lg relative">
                        <div className="absolute top-0 right-0 bg-sand text-navy text-[10px] font-bold px-2 py-1 rounded-bl">VIKTIGAST</div>
                        <h3 className="font-serif text-xl text-sand mb-2">Due Diligence (Besiktning)</h3>
                        <p className="text-white/80 text-sm">Vi kontrollerar LPO (Licencia de Primera Ocupación), skulder och olagliga byggnationer. Här räddar vi dig från problem.</p>
                    </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/30 bg-navy text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        4
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 border border-white/10 rounded-lg">
                        <h3 className="font-serif text-xl text-sand mb-2">Arras (Handpenning)</h3>
                        <p className="text-white/80 text-sm">Kontrakt skrivs och 10% betalas. Om säljaren drar sig ur nu måste de betala tillbaka dubbelt.</p>
                    </div>
                </div>

                {/* Step 5 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/30 bg-navy text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        5
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 border border-white/10 rounded-lg">
                        <h3 className="font-serif text-xl text-sand mb-2">Notarie & Tillträde</h3>
                        <p className="text-white/80 text-sm">Resterande belopp betalas. Du får nycklarna och blir formell ägare!</p>
                    </div>
                </div>
            </div>
        </div>
    </Section>
);

const FAQ_ITEMS = [
    {
        question: 'Kan jag hyra ut min lägenhet på Airbnb?',
        answer: 'Ja, men du behöver det nya VUD-ID:t. I Andalusien är det svårt i mättade områden (t.ex. Málaga centrum). I Valenciaregionen krävs licens för korttidsuthyrning, men inte för säsongsuthyrning (över 11 dagar).'
    },
    {
        question: 'Måste jag betala förmögenhetsskatt?',
        answer: 'Andalusien har 100 % bonifiering (noll skatt) upp till 3 miljoner euro. Valencia har ett fribelopp på 700 000 € för icke-residenta och skatten är därefter progressiv.'
    },
    {
        question: 'Vad är "Cuerpo Cierto"?',
        answer: 'Det betyder att du köper bostaden "som den står och går". Om det efter köpet visar sig vara 95 kvm istället för 100 kvm, kan du oftast inte kräva prisavdrag då du köpt det fysiska objektet du sett.'
    },
    {
        question: 'Hur mycket kostar det totalt att köpa bostad i Spanien?',
        answer: 'Räkna med 10-13% extra utöver köpesumman. Det inkluderar stämpelskatt (ITP) 8-10%, notarie, registrering och juridisk rådgivning.'
    },
    {
        question: 'Vad är skillnaden mellan ITP och IVA?',
        answer: 'ITP (8-10%) gäller vid köp av befintliga bostäder. IVA (moms 10%) gäller vid nyproduktion. Välj rätt skatt baserat på bostadstyp.'
    },
    {
        question: 'Behöver man advokat vid köp?',
        answer: 'Det är starkt rekommenderat. En oberoende advokat kontrollerar LPO, skulder, bygglov och kontrakt innan du skriver under.'
    },
    {
        question: 'Kan man köpa bostad utan NIE-nummer?',
        answer: 'Nej, NIE-nummer är obligatoriskt för alla köp och måste finnas på plats innan kontrakt skrivs hos notarie.'
    },
    {
        question: 'Hur lång tid tar det att få NIE-nummer?',
        answer: 'I Sverige tar det oftast 2-4 veckor via konsulat. I Spanien kan det gå på 1-2 dagar om du bokar rätt tid.'
    },
    {
        question: 'Vad händer om säljaren drar sig ur efter handpenning?',
        answer: 'Om säljaren drar sig ur måste de betala tillbaka dubbel handpenning enligt arras‑kontraktet.'
    },
    {
        question: 'Måste man vara på plats vid köpet?',
        answer: 'Nej, du kan använda fullmakt (poder) och låta en advokat eller representant skriva under åt dig.'
    }
];

const FAQ = () => (
    <Section id="faq" className="bg-alabaster">
        <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-navy mb-8 text-center">Vanliga frågor</h2>
            <div className="space-y-4">
                {FAQ_ITEMS.map((item) => (
                    <details
                        key={item.question}
                        className="group bg-white rounded-lg shadow-soft border border-greige p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
                    >
                        <summary className="flex items-center justify-between font-bold text-navy group-open:text-sand transition-colors">
                            {item.question}
                            <span className="ml-4 transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <p className="mt-4 text-charcoal text-sm leading-relaxed">
                            {item.answer}
                        </p>
                    </details>
                ))}
            </div>
        </div>
    </Section>
);

const ContactSection = () => (
    <Section id="contact" className="bg-navy">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div className="text-white">
                <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Redo att ta nästa steg?</p>
                <h2 className="font-serif text-3xl md:text-4xl mb-4">Vi guidar dig genom hela processen</h2>
                <p className="text-white/70 mb-6">
                    Från sökning till nyckelöverlämning och deklaration – vi finns med hela vägen.
                </p>
                <ul className="space-y-3 text-sm text-white/80">
                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-sand" /> Vi talar ditt språk</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-sand" /> Oberoende juridisk kontroll</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-sand" /> Tillgång till hela marknaden</li>
                </ul>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-soft">
                <form className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Namn</label>
                        <input type="text" className="w-full px-4 py-3 border border-greige rounded-md focus:outline-none focus:border-navy" placeholder="Ditt namn" />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">E-post</label>
                        <input type="email" className="w-full px-4 py-3 border border-greige rounded-md focus:outline-none focus:border-navy" placeholder="din@email.se" />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Jag är intresserad av</label>
                        <select className="w-full px-4 py-3 border border-greige rounded-md focus:outline-none focus:border-navy bg-white text-charcoal">
                            <option>Köpa bostad</option>
                            <option>Sälja bostad</option>
                            <option>Visningsresa</option>
                            <option>Rådgivning</option>
                        </select>
                    </div>
                    <button type="button" className="w-full py-4 bg-sand text-navy font-bold rounded-md hover:bg-navy hover:text-white transition-colors cursor-pointer">
                        Kontakta mig
                    </button>
                </form>
            </div>
        </div>
    </Section>
);

const CommonMistakes = () => (
    <Section id="misstag" className="bg-greige/30">
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Var försiktig</p>
                <h2 className="font-serif text-3xl md:text-4xl text-navy">Vanliga misstag att undvika</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    'Köpa utan Licencia de Primera Ocupación (LPO).',
                    'Inte kontrollera skulder och pantbrev på fastigheten.',
                    'Betala direkt till säljaren utan juridisk kontroll.',
                    'Inte budgetera för alla kostnader (ITP, notarie, registrering).',
                    'Köpa utan besiktning.',
                    'Inte förstå gemenskapsregler och avgifter.'
                ].map((item) => (
                    <div key={item} className="bg-red-50 border-l-4 border-red-200 p-6 rounded-lg">
                        <XCircle size={16} className="text-red-500 mb-3" />
                        <p className="text-sm text-charcoal">{item}</p>
                    </div>
                ))}
            </div>
        </div>
    </Section>
);

const ChecklistSection = () => (
    <Section id="checklista" className="bg-white">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Allt du behöver</p>
                <h2 className="font-serif text-3xl md:text-4xl text-navy">Checklista för köpet</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                {[
                    'Skaffa NIE-nummer',
                    'Öppna spanskt bankkonto',
                    'Anlita oberoende advokat',
                    'Gör besiktning (due diligence)',
                    'Kontrollera LPO',
                    'Kontrollera skulder & pantbrev',
                    'Skriv förhandsavtal (arras)',
                    'Betala handpenning (10%)',
                    'Notariebesök',
                    'Registrering av köpet'
                ].map((item) => (
                    <div key={item} className="flex items-center gap-3 bg-emerald-50/60 border border-emerald-100 p-4 rounded-lg">
                        <CheckCircle size={16} className="text-emerald-600" />
                        <span className="text-sm text-charcoal">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    </Section>
);

const ResourcesSection = () => (
    <Section id="resurser" className="bg-greige/30">
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-sand mb-4">Resurser</p>
                <h2 className="font-serif text-3xl md:text-4xl text-navy">Viktiga länkar</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'NIE-ansökan', href: 'https://www.exteriores.gob.es/Consulados/estocolmo/sv/ServiciosConsulares/Paginas/index.aspx', icon: FileText },
                    { label: 'Spanska konsulatet', href: 'https://www.exteriores.gob.es/Consulados/estocolmo/sv/Paginas/index.aspx', icon: Landmark },
                    { label: 'Skatteverket (AEAT)', href: 'https://www.agenciatributaria.es', icon: Building2 },
                    { label: 'Notarieföreningen', href: 'https://www.notariado.org', icon: ShieldCheck }
                ].map((item) => {
                    const Icon = item.icon;
                    return (
                        <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border border-greige rounded-lg p-5 hover:border-sand transition-colors"
                        >
                            <Icon size={18} className="text-sand mb-3" />
                            <p className="text-sm font-semibold text-navy">{item.label}</p>
                            <p className="text-xs text-gray-500 mt-2">Öppnas i ny flik</p>
                        </a>
                    );
                })}
            </div>
        </div>
    </Section>
);

const SchemaMarkup = () => {
    const schemaData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "headline": "Köpa bostad i Spanien 2026",
                "description": "Komplett guide till att köpa bostad i Spanien: skatter, NIE, köpprocess, kostnader och uthyrningsregler.",
                "image": "https://spanienfastigheter.se/images/guide/2026-02-10-14-35-00-hero-villa.png",
                "author": {
                    "@type": "Organization",
                    "name": "Spanienfastigheter.se"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Spanienfastigheter.se",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://spanienfastigheter.se/logo.png"
                    }
                },
                "datePublished": "2025-01-22",
                "dateModified": "2025-01-22"
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Hem",
                        "item": "https://spanienfastigheter.se"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Guide",
                        "item": "https://spanienfastigheter.se/guide"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Köpa bostad i Spanien",
                        "item": "https://spanienfastigheter.se/guide/kopa-bostad-spanien"
                    }
                ]
            },
            {
                "@type": "FAQPage",
                    "mainEntity": FAQ_ITEMS.map((item) => ({
                        "@type": "Question",
                        "name": item.question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": item.answer
                        }
                    }))
                }
            ]
        };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
    );
};

export default async function GuidePage({ params }: Props) {
    const { locale } = await params;

    return (
        <main className="min-h-screen">
            <SchemaMarkup />
            <Hero />
            <StickyNav />
            <WhySpain />
            <LifestyleSection />
            <ComparisonTable />
            <TaxSection />
            <CalculatorSection />
            <RentalRules />
            <ProcessTimeline />
            <CommonMistakes />
            <ChecklistSection />
            <ResourcesSection />
            <FAQ />
            <ContactSection />
        </main>
    );
}
