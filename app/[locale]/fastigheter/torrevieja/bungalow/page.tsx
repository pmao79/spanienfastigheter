import { Metadata } from 'next';
import Link from 'next/link';
import SeoLandingPage from '../../SeoLandingPage';

export const metadata: Metadata = {
    title: 'Bungalow Torrevieja | Enplansboende | Från 120 000 EUR | Svensk Mäklare',
    description: 'Köp bungalow i Torrevieja ✓ Enplansboende ✓ Takterrass ✓ Från 120 000 EUR ✓ Strandnära områden ✓ Svensk mäklare ✓ Se alla bungalows här!',
    alternates: {
        canonical: '/fastigheter/torrevieja/bungalow'
    }
};

const faqItems = [
    {
        question: 'Vad är en bungalow?',
        answer: 'En bungalow är ett envåningshus (alla rum på samma plan).\n\nFördelar:\n- Inga trappor (perfekt för äldre)\n- Lättare att underhålla\n- Ofta med takterrass (solarium)\n- Billigare än tvåvåningshus\n\nTyper:\n- Bungalow i rad (sammanbyggda)\n- Fristående bungalow (egen tomt)\n\nPris: 120 000-250 000 EUR (beroende på läge)'
    },
    {
        question: 'Vad kostar det att köpa hus i Spanien?',
        answer: 'För hus/villor gäller samma kostnader som lägenheter, men ofta högre belopp:\n\n- Stämpelskatt: 8-10% (vid befintlig bostad) eller 10% moms (vid nyproduktion)\n- Notarie: 1 000-2 000 EUR (högre för dyrare fastigheter)\n- Registrering: 600-1 200 EUR\n- Juridisk rådgivning: 1 500-3 000 EUR\n- Besiktning: 300-600 EUR (rekommenderas starkt)\n\nTotalt: 10-15% av köpesumman.'
    },
    {
        question: 'Vad kostar det att äga hus i Spanien?',
        answer: 'Årliga kostnader för villa/hus:\n\nSkatter:\n- Fastighetsskatt: 400-1 200 EUR/år\n- Avfallsskatt: 100-200 EUR/år\n- Förmögenhetsskatt: 500-1 500 EUR/år\n\nUnderhåll:\n- Pool: 500-1 000 EUR/år\n- Trädgård: 300-800 EUR/år\n- Försäkring: 300-600 EUR/år\n- El & vatten: 800-1 500 EUR/år\n\nTotalt: 3 000-6 000 EUR/år för en villa med pool.'
    },
    {
        question: 'Hur köper man bostad i Spanien?',
        answer: 'Steg-för-steg guide:\n\n1. Förberedelser (1-2 veckor)\n- Ansök om NIE-nummer (skattenummer)\n- Öppna spanskt bankkonto\n- Anlita svensk-talande mäklare\n\n2. Hitta bostad (2-8 veckor)\n- Besök fastigheter\n- Jämför priser och områden\n- Gör besiktning (rekommenderas)\n\n3. Förhandsavtal (1 vecka)\n- Skriva under förhandsavtal (contrato de arras)\n- Betala handpenning (10% av köpesumman)\n\n4. Slutavtal (4-8 veckor)\n- Notariebesök\n- Betala resterande summa + kostnader\n- Få nycklar!\n\nTotal tid: 2-4 månader från start till färdigt.'
    },
    {
        question: 'Behöver man NIE-nummer för att köpa bostad i Spanien?',
        answer: 'Ja, NIE-nummer är OBLIGATORISKT för att köpa fastighet i Spanien.\n\nVad är NIE?\n- Número de Identificación de Extranjero\n- Spanskt skattenummer för utlänningar\n- Behövs för alla ekonomiska transaktioner\n\nHur får man NIE?\n1. Boka tid på spanska konsulatet i Sverige\n2. Fyll i ansökan (EX-15)\n3. Betala avgift (~10 EUR)\n4. Vänta 2-4 veckor\n\nEller: Ansök direkt i Spanien (snabbare, 1-2 dagar)'
    }
];

export default function BungalowTorreviejaPage() {
    return (
        <SeoLandingPage
            title="Bungalow i Torrevieja"
            subtitle="Enplansboende med solarium och enkel tillgång – perfekt för ett bekvämt liv i solen."
            intro="Bungalows i Torrevieja är populära för sin tillgänglighet, låga underhåll och ofta generösa uteplatser. Ett smart val för både pensionärer och fritidsboende."
            cityLabel="Torrevieja"
            breadcrumbItems={[
                { name: 'Hem', href: '/' },
                { name: 'Fastigheter', href: '/fastigheter' },
                { name: 'Torrevieja', href: '/omraden/costa-blanca/torrevieja' },
                { name: 'Bungalow', href: '/fastigheter/torrevieja/bungalow' }
            ]}
            faqTitle="bungalow i Torrevieja"
            faqItems={faqItems}
            defaultFilters={{
                towns: 'Torrevieja',
                types: 'Bungalow'
            }}
        >
            <div className="grid gap-12">
                <section>
                    <h2 className="text-2xl md:text-3xl font-serif text-navy mb-4">
                        Varför välja bungalow i Torrevieja?
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                        <li>✓ Allt på ett plan – inga trappor</li>
                        <li>✓ Lättskött boende med låg drift</li>
                        <li>✓ Ofta solarium eller stor uteplats</li>
                        <li>✓ Prisvärt jämfört med villa</li>
                        <li>✓ Passar perfekt för långtidboende</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-serif text-navy mb-6">
                        Prisbild för bungalows i Torrevieja
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-navy text-white">
                                    <th className="p-4 text-sm font-semibold">Typ</th>
                                    <th className="p-4 text-sm font-semibold">Pris</th>
                                    <th className="p-4 text-sm font-semibold">Läge</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-gray-600">
                                <tr className="border-b border-greige">
                                    <td className="p-4">Bungalow i rad</td>
                                    <td className="p-4">120 000 - 200 000 EUR</td>
                                    <td className="p-4">Inland / urbanisation</td>
                                </tr>
                                <tr className="border-b border-greige bg-greige/30">
                                    <td className="p-4">Fristående bungalow</td>
                                    <td className="p-4">180 000 - 280 000 EUR</td>
                                    <td className="p-4">Lugnare områden</td>
                                </tr>
                                <tr>
                                    <td className="p-4">Premium med solarium</td>
                                    <td className="p-4">220 000 - 320 000 EUR</td>
                                    <td className="p-4">Nära strand och service</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-serif text-navy mb-4">
                        Vad ingår i en bungalow?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-sage font-bold mb-3">Standard</h3>
                            <ul className="space-y-2">
                                <li>✓ 2-3 sovrum</li>
                                <li>✓ 1-2 badrum</li>
                                <li>✓ Uteplats eller terrass</li>
                                <li>✓ Gemensam pool</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-sage font-bold mb-3">Vanliga tillval</h3>
                            <ul className="space-y-2">
                                <li>★ Solarium (takterrass)</li>
                                <li>★ Privat parkering</li>
                                <li>★ Förråd</li>
                                <li>★ Uppgraderat kök</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 text-sm text-gray-500">
                        Relaterat: <Link href="/fastigheter/torrevieja/strandnara" className="text-sand hover:text-navy">Strandnära lägenheter</Link> · <Link href="/fastigheter/torrevieja/radhus" className="text-sand hover:text-navy">Radhus i Torrevieja</Link>
                    </div>
                </section>
            </div>
        </SeoLandingPage>
    );
}
