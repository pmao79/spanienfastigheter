import { Metadata } from 'next';
import Link from 'next/link';
import SeoLandingPage from '../../SeoLandingPage';

export const metadata: Metadata = {
    title: 'Radhus Torrevieja | Från 150 000 EUR | Pool & Terrass | Svensk Mäklare',
    description: 'Köp radhus i Torrevieja ✓ Från 150 000 EUR ✓ Pool & trädgård ✓ 2-3 sovrum ✓ Strandnära ✓ Svensk mäklare ✓ Se alla radhus här!',
    alternates: {
        canonical: '/fastigheter/torrevieja/radhus'
    }
};

const faqItems = [
    {
        question: 'Vad är skillnaden mellan radhus och villa?',
        answer: 'Radhus (Townhouse):\n- Sammanbyggt med andra hus (2-10 st)\n- Billigare (100 000-200 000 EUR)\n- Ofta gemensam pool\n- Mindre tomt (50-150 kvm)\n- Lägre underhållskostnader\n\nVilla (Detached House):\n- Fristående hus\n- Dyrare (200 000-500 000+ EUR)\n- Privat pool (vanligt)\n- Större tomt (200-1000+ kvm)\n- Högre underhållskostnader\n\nVälj radhus om: Budget är viktig, vill ha lägre underhåll\nVälj villa om: Vill ha max privatliv, egen pool, stor trädgård'
    },
    {
        question: 'Vad kostar ett radhus i Torrevieja?',
        answer: 'Radhus kostar 150 000 - 280 000 EUR beroende på läge och storlek. Strandnära radhus kostar 200 000 - 280 000 EUR.'
    },
    {
        question: 'Har radhus pool?',
        answer: 'De flesta radhus har gemensam pool i samfälligheten. Premium-radhus kan ha privat pool.'
    },
    {
        question: 'Vad kostar det att äga hus i Spanien?',
        answer: 'Årliga kostnader för villa/hus:\n\nSkatter:\n- Fastighetsskatt: 400-1 200 EUR/år\n- Avfallsskatt: 100-200 EUR/år\n- Förmögenhetsskatt: 500-1 500 EUR/år\n\nUnderhåll:\n- Pool: 500-1 000 EUR/år\n- Trädgård: 300-800 EUR/år\n- Försäkring: 300-600 EUR/år\n- El & vatten: 800-1 500 EUR/år\n\nTotalt: 3 000-6 000 EUR/år för en villa med pool.'
    },
    {
        question: 'Hur köper man bostad i Spanien?',
        answer: 'Steg-för-steg guide:\n\n1. Förberedelser (1-2 veckor)\n- Ansök om NIE-nummer (skattenummer)\n- Öppna spanskt bankkonto\n- Anlita svensk-talande mäklare\n\n2. Hitta bostad (2-8 veckor)\n- Besök fastigheter\n- Jämför priser och områden\n- Gör besiktning (rekommenderas)\n\n3. Förhandsavtal (1 vecka)\n- Skriva under förhandsavtal (contrato de arras)\n- Betala handpenning (10% av köpesumman)\n\n4. Slutavtal (4-8 veckor)\n- Notariebesök\n- Betala resterande summa + kostnader\n- Få nycklar!\n\nTotal tid: 2-4 månader från start till färdigt.'
    }
];

export default function RadhusTorreviejaPage() {
    return (
        <SeoLandingPage
            title="Radhus i Torrevieja"
            subtitle="Mer boyta, trädgård och ofta gemensam pool – ett prisvärt alternativ till villa."
            intro="Ett radhus i Torrevieja ger mer plats för pengarna jämfört med en lägenhet, samtidigt som underhållet är lägre än för en fristående villa. Perfekt för familjer och långtidboende."
            cityLabel="Torrevieja"
            breadcrumbItems={[
                { name: 'Hem', href: '/' },
                { name: 'Fastigheter', href: '/fastigheter' },
                { name: 'Torrevieja', href: '/omraden/costa-blanca/torrevieja' },
                { name: 'Radhus', href: '/fastigheter/torrevieja/radhus' }
            ]}
            faqTitle="radhus i Torrevieja"
            faqItems={faqItems}
            defaultFilters={{
                towns: 'Torrevieja',
                types: 'Townhouse'
            }}
        >
            <div className="grid gap-12">
                <section>
                    <h2 className="text-2xl md:text-3xl font-serif text-navy mb-4">
                        Varför välja radhus i Torrevieja?
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                        <li>✓ Mer plats: 80-120 kvm</li>
                        <li>✓ Billigare än villa</li>
                        <li>✓ Gemensam pool och låg skötsel</li>
                        <li>✓ Egen trädgård eller uteplats</li>
                        <li>✓ Ofta 300-1000m till stranden</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-serif text-navy mb-6">
                        Vad kostar ett radhus i Torrevieja?
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-navy text-white">
                                    <th className="p-4 text-sm font-semibold">Område</th>
                                    <th className="p-4 text-sm font-semibold">Pris</th>
                                    <th className="p-4 text-sm font-semibold">Sovrum</th>
                                    <th className="p-4 text-sm font-semibold">Pool</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-gray-600">
                                <tr className="border-b border-greige">
                                    <td className="p-4">Strandnära</td>
                                    <td className="p-4">200 000 - 280 000 EUR</td>
                                    <td className="p-4">2-3</td>
                                    <td className="p-4">Gemensam</td>
                                </tr>
                                <tr className="border-b border-greige bg-greige/30">
                                    <td className="p-4">Inland</td>
                                    <td className="p-4">150 000 - 220 000 EUR</td>
                                    <td className="p-4">2-3</td>
                                    <td className="p-4">Gemensam</td>
                                </tr>
                                <tr>
                                    <td className="p-4">Premium</td>
                                    <td className="p-4">250 000 - 350 000 EUR</td>
                                    <td className="p-4">3-4</td>
                                    <td className="p-4">Privat</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-serif text-navy mb-4">
                        Vad ingår i ett radhus?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-sage font-bold mb-3">Standard</h3>
                            <ul className="space-y-2">
                                <li>✓ 2-3 sovrum</li>
                                <li>✓ 1-2 badrum</li>
                                <li>✓ Terrass och trädgård</li>
                                <li>✓ Gemensam pool</li>
                                <li>✓ Parkering</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-sage font-bold mb-3">Premium</h3>
                            <ul className="space-y-2">
                                <li>★ Takterrass (solarium)</li>
                                <li>★ Privat pool</li>
                                <li>★ Garage och förråd</li>
                                <li>★ 3-4 sovrum</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 text-sm text-gray-500">
                        Relaterat: <Link href="/fastigheter/torrevieja/strandnara" className="text-sand hover:text-navy">Strandnära lägenheter</Link> · <Link href="/fastigheter/torrevieja/bungalow" className="text-sand hover:text-navy">Bungalows i Torrevieja</Link>
                    </div>
                </section>
            </div>
        </SeoLandingPage>
    );
}
