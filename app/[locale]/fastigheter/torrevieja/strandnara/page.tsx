import { Metadata } from 'next';
import Link from 'next/link';
import SeoLandingPage from '../../SeoLandingPage';

export const metadata: Metadata = {
    title: 'Strandnära lägenheter Torrevieja | 200m till stranden | Från 120 000 EUR',
    description: 'Köp strandnära lägenhet i Torrevieja ✓ 200-500m till stranden ✓ Pool & terrass ✓ Från 120 000 EUR ✓ Svensk mäklare ✓ Se alla objekt här!',
    alternates: {
        canonical: '/fastigheter/torrevieja/strandnara'
    }
};

const faqItems = [
    {
        question: 'Vad betyder strandnära?',
        answer: 'Strandnära betyder olika saker beroende på källa:\n\nOfficiell definition (Spanien):\n- Inom 500 meter från stranden\n\nMäklardefinition:\n- Ofta upp till 1 km från stranden\n\nVåra kategorier:\n- Första linje: 0-100m (direkt vid strand)\n- Andra linje: 100-300m (5 min promenad)\n- Strandnära: 300-1000m (10-15 min promenad)\n\nTips: Fråga alltid om exakt avstånd i meter – inte bara "strandnära"!'
    },
    {
        question: 'Hur nära stranden är strandnära?',
        answer: 'Officiellt definieras strandnära som inom 500 meter. Vi kategoriserar:\n- Första linje: 0-100m\n- Andra linje: 100-300m\n- Strandnära: 300-1000m\n\nFråga alltid om exakt avstånd i meter!'
    },
    {
        question: 'Är strandnära lägenheter dyrare?',
        answer: 'Ja, strandnära lägenheter kostar 20-50% mer än lägenheter längre från stranden. Men de har också högre värdeökning och bättre uthyrningspotential.'
    },
    {
        question: 'Kan man hyra ut strandnära lägenhet?',
        answer: 'Ja, strandnära lägenheter är mycket populära bland turister och ger 30-50% högre hyresintäkter än lägenheter längre från stranden.'
    },
    {
        question: 'Vad kostar det att köpa en lägenhet i Spanien?',
        answer: 'Utöver köpesumman tillkommer följande kostnader:\n\nObligatoriska kostnader:\n- Stämpelskatt (ITP): 8-10% av köpesumman\n- Notariekostnader: 600-1 200 EUR\n- Registrering: 400-800 EUR\n- Juridisk rådgivning: 1 000-2 000 EUR\n\nTotalt: Räkna med 10-13% av köpesumman i tillkommande kostnader.\n\nExempel: Lägenhet för 150 000 EUR = 15 000-19 500 EUR i tillkommande kostnader.'
    }
];

export default function StrandnaraTorreviejaPage() {
    return (
        <SeoLandingPage
            title="Strandnära lägenheter i Torrevieja"
            subtitle="200-500 meter till stranden, havsutsikt och stark uthyrningspotential året runt."
            intro="Att bo strandnära i Torrevieja innebär att du har havet som granne. Med bara 5-10 minuters promenad till stranden kan du njuta av morgondopp, strandpromenader och en bostad som är enklare att hyra ut."
            cityLabel="Torrevieja"
            breadcrumbItems={[
                { name: 'Hem', href: '/' },
                { name: 'Fastigheter', href: '/fastigheter' },
                { name: 'Torrevieja', href: '/omraden/costa-blanca/torrevieja' },
                { name: 'Strandnära', href: '/fastigheter/torrevieja/strandnara' }
            ]}
            faqTitle="strandnära lägenheter i Torrevieja"
            faqItems={faqItems}
            defaultFilters={{
                towns: 'Torrevieja',
                types: 'Apartment',
                nearBeach: 'true'
            }}
        >
            <div className="grid gap-12">
                <section>
                    <h2 className="text-2xl md:text-3xl font-serif text-navy mb-4">
                        Varför välja strandnära boende i Torrevieja?
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                        <li>✓ Morgondopp innan frukost</li>
                        <li>✓ Strandpromenader varje kväll</li>
                        <li>✓ Havsutsikt från terrassen</li>
                        <li>✓ Högre värdeökning (strandnära ger premium)</li>
                        <li>✓ Enklare uthyrning och högre intäkter</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-serif text-navy mb-6">
                        Bästa strandnära områdena i Torrevieja
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                name: 'Playa del Cura (50-200m)',
                                price: '150 000 - 300 000 EUR',
                                perks: 'Centrum, restauranger, shopping',
                                bestFor: 'Allt inom gångavstånd'
                            },
                            {
                                name: 'Los Locos (100-300m)',
                                price: '130 000 - 250 000 EUR',
                                perks: 'Populärt bland svenskar, strandpromenad',
                                bestFor: 'Familjer och pensionärer'
                            },
                            {
                                name: 'La Mata (200-500m)',
                                price: '120 000 - 220 000 EUR',
                                perks: 'Lugnare, lång sandstrand',
                                bestFor: 'Barnfamiljer'
                            },
                            {
                                name: 'Punta Prima (200-400m)',
                                price: '180 000 - 350 000 EUR',
                                perks: 'Exklusivt, Zenia Boulevard nära',
                                bestFor: 'Premium-läge'
                            }
                        ].map((area) => (
                            <div key={area.name} className="bg-alabaster p-6 rounded-lg border border-greige">
                                <h3 className="text-lg font-serif text-navy mb-2">{area.name}</h3>
                                <p className="text-sm text-gray-500 mb-3">Pris: {area.price}</p>
                                <p className="text-sm text-gray-600">{area.perks}</p>
                                <p className="text-sm text-gray-500 mt-2">Perfekt för: {area.bestFor}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-serif text-navy mb-6">
                        Vad kostar en strandnära lägenhet?
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-navy text-white">
                                    <th className="p-4 text-sm font-semibold">Avstånd till strand</th>
                                    <th className="p-4 text-sm font-semibold">Pris (2 sovrum)</th>
                                    <th className="p-4 text-sm font-semibold">Prisskillnad</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-gray-600">
                                <tr className="border-b border-greige">
                                    <td className="p-4">0-100m (första linje)</td>
                                    <td className="p-4">200 000 - 350 000 EUR</td>
                                    <td className="p-4">+50-80%</td>
                                </tr>
                                <tr className="border-b border-greige bg-greige/30">
                                    <td className="p-4">100-300m (andra linje)</td>
                                    <td className="p-4">150 000 - 250 000 EUR</td>
                                    <td className="p-4">+20-40%</td>
                                </tr>
                                <tr className="border-b border-greige">
                                    <td className="p-4">300-500m (strandnära)</td>
                                    <td className="p-4">120 000 - 180 000 EUR</td>
                                    <td className="p-4">Baslinje</td>
                                </tr>
                                <tr>
                                    <td className="p-4">500-1000m</td>
                                    <td className="p-4">100 000 - 150 000 EUR</td>
                                    <td className="p-4">-20-30%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        Tips: 300-500 meter från stranden ger ofta bäst värde.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-serif text-navy mb-4">
                        Vad ingår i en strandnära lägenhet?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-sage font-bold mb-3">Standard</h3>
                            <ul className="space-y-2">
                                <li>✓ Gemensam pool</li>
                                <li>✓ Terrass eller balkong</li>
                                <li>✓ Luftkonditionering</li>
                                <li>✓ Hiss och säkerhetsdörr</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-sage font-bold mb-3">Premium</h3>
                            <ul className="space-y-2">
                                <li>★ Havsutsikt</li>
                                <li>★ Takterrass (solarium)</li>
                                <li>★ Egen parkering</li>
                                <li>★ Förråd eller gym</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 text-sm text-gray-500">
                        Relaterat: <Link href="/fastigheter/torrevieja/radhus" className="text-sand hover:text-navy">Radhus i Torrevieja</Link> · <Link href="/fastigheter/torrevieja/bungalow" className="text-sand hover:text-navy">Bungalows i Torrevieja</Link> · <Link href="/guide/kopa-bostad-spanien" className="text-sand hover:text-navy">Köpa bostad i Spanien</Link>
                    </div>
                </section>
            </div>
        </SeoLandingPage>
    );
}
