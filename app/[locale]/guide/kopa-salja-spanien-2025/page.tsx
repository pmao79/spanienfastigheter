import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import CostCalculator from './CostCalculator';
import ChecklistButton from './ChecklistButton';

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
    <div className="relative min-h-[80vh] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <Image
                src="/images/guide-hero-2025.png"
                alt="Luxury Villa in Spain"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-navy/60 mix-blend-multiply" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
            <span className="inline-block py-1 px-3 rounded-full bg-sand/20 border border-sand/30 text-sand text-sm font-semibold mb-6 backdrop-blur-sm">
                Uppdaterad för 2025/2026
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Guide: Köpa & sälja fastighet i Spanien 2025/2026
            </h1>
            <p className="text-xl md:text-2xl text-greige mb-10 max-w-2xl mx-auto font-light">
                Skatter, process, uthyrningsregler, dokument och fällor – för Costa del Sol & Costa Blanca.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href="#contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-sand text-navy font-bold rounded-full hover:bg-white transition-colors duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                >
                    Boka kostnadsfri rådgivning
                </Link>
                <ChecklistButton />
            </div>

            <div className="mt-12 text-sm text-greige/80 flex flex-wrap justify-center gap-6">
                <span className="flex items-center gap-2">✓ Svensktalande rådgivning</span>
                <span className="flex items-center gap-2">✓ Juridisk due diligence</span>
                <span className="flex items-center gap-2">✓ Trygg process</span>
            </div>
        </div>
    </div>
);

const StickyNav = () => (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-greige/50 shadow-sm hidden md:block">
        <div className="container mx-auto px-4">
            <ul className="flex items-center gap-6 overflow-x-auto py-4 text-sm font-medium text-charcoal scrollbar-hide">
                <li><Link href="#market" className="hover:text-sand transition-colors whitespace-nowrap">Marknadsöverblick</Link></li>
                <li><Link href="#comparison" className="hover:text-sand transition-colors whitespace-nowrap">Solkusten vs Costa Blanca</Link></li>
                <li><Link href="#taxes" className="hover:text-sand transition-colors whitespace-nowrap">Skatter</Link></li>
                <li><Link href="#rental" className="hover:text-sand transition-colors whitespace-nowrap">Uthyrningsregler</Link></li>
                <li><Link href="#process" className="hover:text-sand transition-colors whitespace-nowrap">Köpprocess</Link></li>
                <li><Link href="#misstag" className="hover:text-sand transition-colors whitespace-nowrap">Misstag</Link></li>
                <li><Link href="#checklista" className="hover:text-sand transition-colors whitespace-nowrap">Checklista</Link></li>
                <li><Link href="#resurser" className="hover:text-sand transition-colors whitespace-nowrap">Resurser</Link></li>
                <li><Link href="#faq" className="hover:text-sand transition-colors whitespace-nowrap">FAQ</Link></li>
                <li className="ml-auto">
                    <Link href="#contact" className="px-4 py-2 bg-navy text-white rounded-full hover:bg-charcoal transition-colors text-xs">
                        Boka rådgivning
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
);

const TlDr = () => (
    <Section className="bg-alabaster border-b border-greige">
        <div className="bg-white border border-greige rounded-xl p-8 shadow-soft max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl text-navy mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-sand text-navy flex items-center justify-center text-sm font-bold">i</span>
                Snabba insikter för 2025
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-4">
                    <li className="flex gap-3">
                        <span className="text-sand mt-1">●</span>
                        <p className="text-charcoal"><strong className="text-navy">Marknaden:</strong> Costa del Sol drivs av &quot;lyx-inflation&quot; och brist på bostäder, medan Costa Blanca erbjuder högre direktavkastning (yield).</p>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-sand mt-1">●</span>
                        <p className="text-charcoal"><strong className="text-navy">Uthyrning:</strong> Från <span className="bg-yellow-100 px-1 rounded">1 juli 2025</span> krävs VUD-ID för all korttidsuthyrning.</p>
                    </li>
                </ul>
                <ul className="space-y-4">
                    <li className="flex gap-3">
                        <span className="text-sand mt-1">●</span>
                        <p className="text-charcoal"><strong className="text-navy">Skatter:</strong> Andalusien har en platt överföringsskatt (ITP) på 7 %. Valencia har 10 % (sänks till 9 % den 1 juni 2026).</p>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-red-500 mt-1">●</span>
                        <p className="text-charcoal"><strong className="text-red-600">Varning:</strong> Köp aldrig utan <em>Licencia de Primera Ocupación</em> (LPO) och <em>Certificado de No Infracción</em>.</p>
                    </li>
                </ul>
            </div>
        </div>
    </Section>
);

const ComparisonTable = () => (
    <Section id="comparison" className="bg-white">
        <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4 text-center">Costa del Sol vs Costa Blanca</h2>
            <p className="text-charcoal text-center mb-12 max-w-2xl mx-auto">En strategisk jämförelse för investerare år 2025.</p>

            <div className="overflow-x-auto rounded-xl shadow-soft border border-greige">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-navy text-white">
                            <th className="p-4 md:p-6 font-serif font-medium border-b border-white/10">Parameter</th>
                            <th className="p-4 md:p-6 font-serif font-medium border-b border-white/10 bg-navy/90">Costa del Sol (Andalusien)</th>
                            <th className="p-4 md:p-6 font-serif font-medium border-b border-white/10 bg-navy/80">Costa Blanca (Valencia)</th>
                            <th className="p-4 md:p-6 font-serif font-medium border-b border-white/10 bg-sand text-navy">Strategisk Analys</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm md:text-base">
                        <tr className="border-b border-greige hover:bg-alabaster transition-colors">
                            <td className="p-4 md:p-6 font-bold text-navy">Prisnivå</td>
                            <td className="p-4 md:p-6 text-charcoal">Premium (Marbella: ca 5 569 €/m²)</td>
                            <td className="p-4 md:p-6 text-charcoal">Prisvärt (Torrevieja: 2 600 – 3 400 €/m²)</td>
                            <td className="p-4 md:p-6 text-charcoal bg-alabaster">Dubbelt så hög kapitalinsats krävs på Solkusten.</td>
                        </tr>
                        <tr className="border-b border-greige bg-greige/30 hover:bg-alabaster transition-colors">
                            <td className="p-4 md:p-6 font-bold text-navy">Värdeökning</td>
                            <td className="p-4 md:p-6 text-charcoal">Hög potential (men volatil)</td>
                            <td className="p-4 md:p-6 text-charcoal">Stabil (3–5 % årligen)</td>
                            <td className="p-4 md:p-6 text-charcoal bg-alabaster">Solkusten = Värdetillväxt.<br />Costa Blanca = Säkerhet.</td>
                        </tr>
                        <tr className="border-b border-greige hover:bg-alabaster transition-colors">
                            <td className="p-4 md:p-6 font-bold text-navy">Hyresavkastning (Yield)</td>
                            <td className="p-4 md:p-6 text-charcoal">3,5 – 5,0 %</td>
                            <td className="p-4 md:p-6 text-charcoal">4,5 – 6,5 %</td>
                            <td className="p-4 md:p-6 text-charcoal bg-alabaster">Costa Blanca är överlägset för kassaflöde (&quot;Buy-to-Let&quot;).</td>
                        </tr>
                        <tr className="hover:bg-alabaster transition-colors">
                            <td className="p-4 md:p-6 font-bold text-navy">Köparprofil</td>
                            <td className="p-4 md:p-6 text-charcoal">Global elit, investeringsfonder</td>
                            <td className="p-4 md:p-6 text-charcoal">Europeisk medelklass, barnfamiljer</td>
                            <td className="p-4 md:p-6 text-charcoal bg-alabaster">Diversifierad risk på Costa Blanca.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-8 bg-sand/10 border border-sand/20 p-6 rounded-lg text-center">
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
            <h2 className="font-serif text-3xl md:text-4xl text-navy mb-8 text-center">Skatter vid köp (Så mycket kostar det)</h2>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Resale */}
                <div className="bg-white p-8 rounded-xl shadow-soft border border-greige relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-navy text-white text-xs font-bold px-3 py-1 rounded-bl-lg">BEGAGNAT</div>
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
                <div className="bg-white p-8 rounded-xl shadow-soft border border-greige relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-sand text-navy text-xs font-bold px-3 py-1 rounded-bl-lg">NYPRODUKTION</div>
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

            <div className="mt-10 max-w-2xl mx-auto">
                <CostCalculator />
            </div>
        </div>
    </Section>
);

const RentalRules = () => (
    <Section id="rental" className="bg-white">
        <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4 text-center">Uthyrningsregler 2025</h2>
            <p className="text-charcoal text-center mb-12 max-w-2xl mx-auto">Reglerna har skärpts drastiskt. Det går inte längre att hyra ut &quot;lite vid sidan av&quot;.</p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Card 1: VUD ID */}
                <div className="bg-red-50 border border-red-100 p-6 rounded-xl">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600 font-bold">!</div>
                    <h3 className="font-serif text-lg text-navy font-bold mb-2">Det nya ID-kravet</h3>
                    <p className="text-sm text-charcoal mb-4">Från <strong>1 juli 2025</strong> måste alla annonser på Airbnb/Booking ha ett unikt VUD-ID.</p>
                    <p className="text-xs text-red-800 font-medium">Saknas ID blockeras annonsen automatiskt.</p>
                </div>

                {/* Card 2: Andalusien */}
                <div className="bg-alabaster border border-greige p-6 rounded-xl">
                    <h3 className="font-serif text-lg text-navy font-bold mb-2">Costa del Sol</h3>
                    <ul className="text-sm text-charcoal space-y-3">
                        <li className="flex gap-2"><span className="text-red-500 font-bold">×</span> <strong>Moratorium i Málaga:</strong> Stopp för nya turistlicenser i staden till 2027.</li>
                        <li className="flex gap-2"><span className="text-red-500 font-bold">×</span> <strong>Separat ingång:</strong> Många kommuner kräver egen entré från gatan.</li>
                        <li className="flex gap-2"><span className="text-red-500 font-bold">×</span> <strong>Grannarnas veto:</strong> Samfälligheten måste godkänna.</li>
                    </ul>
                </div>

                {/* Card 3: Valencia */}
                <div className="bg-sage/10 border border-sage/20 p-6 rounded-xl">
                    <h3 className="font-serif text-lg text-navy font-bold mb-2">Costa Blanca</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-bold text-sage uppercase tracking-wider mb-1">TURIST (&lt;10 DAGAR)</p>
                            <p className="text-sm text-charcoal">Kräver licens, VUD-ID & samfällighetens tillstånd. Licens gäller 5 år.</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-navy uppercase tracking-wider mb-1">SÄSONG (&gt;11 DAGAR)</p>
                            <p className="text-sm text-charcoal">Ingen turistlicens krävs! Går under vanlig hyreslag (LAU).</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <Link href="#contact" className="inline-flex items-center gap-2 text-navy font-bold hover:text-sand transition-colors cursor-pointer border-b-2 border-sand pb-1">
                    Få hjälp att bedöma licensmöjlighet för en specifik bostad →
                </Link>
            </div>
        </div>
    </Section>
);

const ProcessTimeline = () => (
    <Section id="process" className="bg-navy text-white">
        <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-12 text-center">Köpprocessen: Steg för steg</h2>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-white/20">
                {/* Step 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-navy group-[.is-active]:bg-sand group-[.is-active]:border-sand text-white group-[.is-active]:text-navy font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow shadow-white/20">
                        1
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                        <h3 className="font-serif text-xl text-sand mb-2">Förberedelse & NIE</h3>
                        <p className="text-white/80 text-sm">Du måste ha ett spanskt skatte-ID. Via ambassaden tar det 3-5 månader. Vi hjälper dig göra det på plats (3-4 veckor).</p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/30 bg-navy text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        2
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 border border-white/10 rounded-xl">
                        <h3 className="font-serif text-xl text-sand mb-2">Boka & Reservera</h3>
                        <p className="text-white/80 text-sm">Reservationsavgift (ca 6 000 €) för att ta bostaden av marknaden. Betala aldrig direkt till säljaren!</p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/30 bg-navy text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        3
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 border border-sand rounded-xl relative">
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
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 border border-white/10 rounded-xl">
                        <h3 className="font-serif text-xl text-sand mb-2">Arras (Handpenning)</h3>
                        <p className="text-white/80 text-sm">Kontrakt skrivs och 10% betalas. Om säljaren drar sig ur nu måste de betala tillbaka dubbelt.</p>
                    </div>
                </div>

                {/* Step 5 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/30 bg-navy text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        5
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 border border-white/10 rounded-xl">
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
                        className="group bg-white rounded-xl shadow-soft border border-greige p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
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
    <Section id="contact" className="bg-white">
        <div className="bg-navy rounded-2xl overflow-hidden max-w-5xl mx-auto shadow-2xl flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">Redo att ta nästa steg?</h2>
                <p className="text-greige mb-8">Vi guidar dig genom hela processen, från sökning till nyckelöverlämning och deklaration.</p>
                <ul className="space-y-4 mb-8 text-white/90">
                    <li className="flex gap-3"><span className="text-sand">✓</span> Vi talar ditt språk</li>
                    <li className="flex gap-3"><span className="text-sand">✓</span> Oberoende juridisk kontroll</li>
                    <li className="flex gap-3"><span className="text-sand">✓</span> Tillgång till hela marknaden</li>
                </ul>
            </div>
            <div className="bg-white p-8 md:p-12 md:w-1/2">
                <form className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-charcoal uppercase mb-1">Namn</label>
                        <input type="text" className="w-full p-3 border border-greige rounded-lg focus:outline-none focus:border-navy" placeholder="Ditt namn" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-charcoal uppercase mb-1">E-post</label>
                        <input type="email" className="w-full p-3 border border-greige rounded-lg focus:outline-none focus:border-navy" placeholder="din@email.se" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-charcoal uppercase mb-1">Jag är intresserad av</label>
                        <select className="w-full p-3 border border-greige rounded-lg focus:outline-none focus:border-navy bg-white text-charcoal">
                            <option>Köpa bostad</option>
                            <option>Sälja bostad</option>
                            <option>Allmän rådgivning</option>
                        </select>
                    </div>
                    <button type="button" className="w-full py-4 bg-sand text-navy font-bold rounded-lg hover:bg-navy hover:text-white transition-colors cursor-pointer">
                        Kontakta mig
                    </button>
                </form>
            </div>
        </div>
    </Section>
);

const CommonMistakes = () => (
    <Section id="misstag" className="bg-white">
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
                <div className="h-px bg-navy/10 w-12"></div>
                <h2 className="font-serif text-3xl md:text-4xl text-navy">Vanliga misstag att undvika</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                {[
                    'Köpa utan Licencia de Primera Ocupación (LPO).',
                    'Inte kontrollera skulder och pantbrev på fastigheten.',
                    'Betala direkt till säljaren utan juridisk kontroll.',
                    'Inte budgetera för alla kostnader (ITP, notarie, registrering).',
                    'Köpa utan besiktning.',
                    'Inte förstå gemenskapsregler och avgifter.'
                ].map((item) => (
                    <div key={item} className="bg-alabaster p-6 rounded-xl border border-greige">
                        <p className="text-sm text-charcoal">{item}</p>
                    </div>
                ))}
            </div>
        </div>
    </Section>
);

const ChecklistSection = () => (
    <Section id="checklista" className="bg-greige/30">
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
                <div className="h-px bg-navy/10 w-12"></div>
                <h2 className="font-serif text-3xl md:text-4xl text-navy">Checklista för köpet</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                {[
                    'Skaffa NIE-nummer',
                    'Öppna spanskt bankkonto',
                    'Anlita advokat',
                    'Gör besiktning',
                    'Kontrollera LPO',
                    'Kontrollera skulder',
                    'Skriv förhandsavtal (arras)',
                    'Betala handpenning',
                    'Notariebesök',
                    'Registrering av köpet'
                ].map((item) => (
                    <div key={item} className="bg-white rounded-xl border border-gray-100 p-4 shadow-soft">
                        <p className="text-sm text-charcoal">✓ {item}</p>
                    </div>
                ))}
            </div>
        </div>
    </Section>
);

const ResourcesSection = () => (
    <Section id="resurser" className="bg-white">
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
                <div className="h-px bg-navy/10 w-12"></div>
                <h2 className="font-serif text-3xl md:text-4xl text-navy">Resurser och länkar</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                {[
                    { label: 'NIE-ansökan', href: 'https://www.exteriores.gob.es/Consulados/estocolmo/sv/ServiciosConsulares/Paginas/index.aspx' },
                    { label: 'Spanska konsulatet', href: 'https://www.exteriores.gob.es/Consulados/estocolmo/sv/Paginas/index.aspx' },
                    { label: 'Spanska Skatteverket (AEAT)', href: 'https://www.agenciatributaria.es' },
                    { label: 'Notarieföreningen', href: 'https://www.notariado.org' }
                ].map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-alabaster p-6 rounded-xl border border-greige hover:border-sand transition-colors"
                    >
                        <p className="text-sm font-semibold text-navy">{item.label}</p>
                        <p className="text-xs text-gray-500 mt-2">Öppnas i ny flik</p>
                    </a>
                ))}
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
                "image": "https://spanienfastigheter.se/images/guide-hero-2025.png",
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
            <TlDr />
            <ComparisonTable />
            <TaxSection />
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
