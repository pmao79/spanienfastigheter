import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Visningsresa till Spanien | Hitta din drömbostad på Costa Blanca & Costa del Sol',
    description: 'Följ med på en skräddarsydd visningsresa till Spanien. Vi visar dig utvalda fastigheter på Costa Blanca och Costa del Sol – helt förutsättningslöst.',
    keywords: 'visningsresa spanien, köpa bostad spanien, costa blanca, costa del sol, fastigheter spanien, visning spanien, svensk mäklare spanien',
    openGraph: {
        title: 'Visningsresa till Spanien | Spanienfastigheter.se',
        description: 'Upplev Costa Blanca eller Costa del Sol – vi guidar dig till din drömbostad på 3-5 dagar. Anmäl intresse för en kostnadsfri visningsresa.',
        type: 'website',
        locale: 'sv_SE',
    }
};

export default function VisningsresaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
