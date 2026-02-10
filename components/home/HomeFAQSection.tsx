'use client';

import AreaFAQ from '@/components/areas/AreaFAQ';

const FAQ_ITEMS = [
    {
        question: 'Hur köper man bostad i Spanien?',
        answer: 'Steg-för-steg guide:\n\n1. Förberedelser (1-2 veckor)\n- Ansök om NIE-nummer (skattenummer)\n- Öppna spanskt bankkonto\n- Anlita svensk-talande mäklare\n\n2. Hitta bostad (2-8 veckor)\n- Besök fastigheter\n- Jämför priser och områden\n- Gör besiktning (rekommenderas)\n\n3. Förhandsavtal (1 vecka)\n- Skriva under förhandsavtal (contrato de arras)\n- Betala handpenning (10% av köpesumman)\n\n4. Slutavtal (4-8 veckor)\n- Notariebesök\n- Betala resterande summa + kostnader\n- Få nycklar!\n\nTotal tid: 2-4 månader från start till färdigt.'
    },
    {
        question: 'Vad kostar det att köpa en lägenhet i Spanien?',
        answer: 'Utöver köpesumman tillkommer följande kostnader:\n\nObligatoriska kostnader:\n- Stämpelskatt (ITP): 8-10% av köpesumman\n- Notariekostnader: 600-1 200 EUR\n- Registrering: 400-800 EUR\n- Juridisk rådgivning: 1 000-2 000 EUR\n\nTotalt: Räkna med 10-13% av köpesumman i tillkommande kostnader.\n\nExempel: Lägenhet för 150 000 EUR = 15 000-19 500 EUR i tillkommande kostnader.'
    },
    {
        question: 'Vad kostar det att köpa hus i Spanien?',
        answer: 'För hus/villor gäller samma kostnader som lägenheter, men ofta högre belopp:\n\n- Stämpelskatt: 8-10% (vid befintlig bostad) eller 10% moms (vid nyproduktion)\n- Notarie: 1 000-2 000 EUR (högre för dyrare fastigheter)\n- Registrering: 600-1 200 EUR\n- Juridisk rådgivning: 1 500-3 000 EUR\n- Besiktning: 300-600 EUR (rekommenderas starkt)\n\nTotalt: 10-15% av köpesumman.'
    },
    {
        question: 'Är det en bra investering att köpa lägenhet i Spanien?',
        answer: 'Ja, Torrevieja och Costa Blanca är utmärkta investeringar tack vare:\n\nFördelar:\n- ✅ Stark hyresmarknad: Turister + vinterboende ger 8-12 månaders uthyrning/år\n- ✅ Prisökning: Historiskt 3-5% per år\n- ✅ Låga driftskostnader: Avgifter från 300-800 EUR/år\n- ✅ Hög efterfrågan: Många svenska köpare = lätt att sälja vidare\n- ✅ Klimat: 300 soldagar/år = attraktivt året runt\n\nHyresavkastning: 4-7% per år (beroende på läge och uthyrningsgrad)\n\nPrisexempel Torrevieja:\n- 2015: 100 000 EUR\n- 2020: 120 000 EUR (+20%)\n- 2025: 145 000 EUR (+21%)'
    },
    {
        question: 'Vilka skatter betalar man i Spanien?',
        answer: 'Vid köp:\n- Stämpelskatt (ITP): 8-10% (befintlig bostad)\n- Moms (IVA): 10% (nyproduktion)\n\nÅrliga skatter:\n- Fastighetsskatt (IBI): 200-600 EUR/år (beroende på taxeringsvärde)\n- Avfallsskatt: 50-150 EUR/år\n- Inkomstskatt (om uthyrning): 19-24% på hyresintäkter\n- Förmögenhetsskatt (IRNR): 19-24% på uppskattat hyresvärde (även om du inte hyr ut)\n\nSamfällighetsavgift (lägenheter):\n- 300-1 200 EUR/år (beroende på faciliteter)\n\nTotalt per år: 800-2 500 EUR för en genomsnittlig lägenhet.'
    },
    {
        question: 'Vad kostar det att äga hus i Spanien?',
        answer: 'Årliga kostnader för villa/hus:\n\nSkatter:\n- Fastighetsskatt: 400-1 200 EUR/år\n- Avfallsskatt: 100-200 EUR/år\n- Förmögenhetsskatt: 500-1 500 EUR/år\n\nUnderhåll:\n- Pool: 500-1 000 EUR/år\n- Trädgård: 300-800 EUR/år\n- Försäkring: 300-600 EUR/år\n- El & vatten: 800-1 500 EUR/år\n\nTotalt: 3 000-6 000 EUR/år för en villa med pool.'
    },
    {
        question: 'Var ska man köpa hus i Spanien?',
        answer: 'Bästa områdena för svenska köpare:\n\nCosta Blanca (populärast):\n- ✅ Torrevieja – Störst svensk community, billigare\n- ✅ Orihuela Costa – Strandnära, golfbanor\n- ✅ Guardamar – Lugnare, familjevänligt\n- ✅ Alicante – Storstad, flygplats nära\n\nCosta del Sol:\n- ✅ Marbella – Exklusivt, dyrare\n- ✅ Fuengirola – Svensk community\n- ✅ Estepona – Charmigt, växande\n\nVälj baserat på:\n- Budget (Torrevieja billigast, Marbella dyrast)\n- Livsstil (lugnt vs. puls)\n- Avstånd till flygplats\n- Svensk community (viktigt för många)'
    },
    {
        question: 'Vad är skillnaden mellan radhus och villa?',
        answer: 'Radhus (Townhouse):\n- 🏘️ Sammanbyggt med andra hus (2-10 st)\n- 💰 Billigare (100 000-200 000 EUR)\n- 🏊 Ofta gemensam pool\n- 📏 Mindre tomt (50-150 kvm)\n- 💸 Lägre underhållskostnader\n\nVilla (Detached House):\n- 🏡 Fristående hus\n- 💰 Dyrare (200 000-500 000+ EUR)\n- 🏊 Privat pool (vanligt)\n- 📏 Större tomt (200-1000+ kvm)\n- 💸 Högre underhållskostnader\n\nVälj radhus om: Budget är viktig, vill ha lägre underhåll\nVälj villa om: Vill ha max privatliv, egen pool, stor trädgård'
    },
    {
        question: 'Vad betyder strandnära?',
        answer: 'Strandnära betyder olika saker beroende på källa:\n\nOfficiell definition (Spanien):\n- Inom 500 meter från stranden\n\nMäklardefinition:\n- Ofta upp till 1 km från stranden\n\nVåra kategorier:\n- Första linje: 0-100m (direkt vid strand)\n- Andra linje: 100-300m (5 min promenad)\n- Strandnära: 300-1000m (10-15 min promenad)\n\nTips: Fråga alltid om exakt avstånd i meter – inte bara "strandnära"!'
    },
    {
        question: 'Behöver man NIE-nummer för att köpa bostad i Spanien?',
        answer: 'Ja, NIE-nummer är OBLIGATORISKT för att köpa fastighet i Spanien.\n\nVad är NIE?\n- Número de Identificación de Extranjero\n- Spanskt skattenummer för utlänningar\n- Behövs för alla ekonomiska transaktioner\n\nHur får man NIE?\n1. Boka tid på spanska konsulatet i Sverige\n2. Fyll i ansökan (EX-15)\n3. Betala avgift (~10 EUR)\n4. Vänta 2-4 veckor\n\nEller: Ansök direkt i Spanien (snabbare, 1-2 dagar)'
    },
    {
        question: 'Kan man få lån i Spanien som svensk?',
        answer: 'Ja, men det är svårare än i Sverige.\n\nKrav:\n- Fast anställning (minst 1 år)\n- Inkomst minst 25 000 EUR/år\n- Kontantinsats 30-40% (banker lånar max 60-70%)\n- NIE-nummer\n- Spanskt bankkonto\n\nRäntor: 3-5% (högre än Sverige)\n\nAlternativ:\n- Lån i svensk bank (ofta bättre villkor)\n- Belåna befintlig bostad i Sverige'
    },
    {
        question: 'Hur lång tid tar det att köpa hus i Spanien?',
        answer: 'Total tid: 2-4 månader\n\nTidsplan:\n- Vecka 1-2: NIE-nummer + bankkonto\n- Vecka 3-8: Hitta bostad\n- Vecka 9: Förhandsavtal + handpenning\n- Vecka 10-16: Juridisk granskning\n- Vecka 16: Slutavtal hos notarie\n\nSnabbaste: 6 veckor (om allt går smidigt)\nLångsammaste: 6 månader (vid komplikationer)'
    }
];

export default function HomeFAQSection() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <AreaFAQ items={FAQ_ITEMS} areaName="att köpa bostad i Spanien" />
            </div>
        </section>
    );
}
