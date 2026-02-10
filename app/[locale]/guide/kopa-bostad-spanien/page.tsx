import { Metadata } from 'next';
import GuidePage from '../kopa-salja-spanien-2025/page';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;

    const title = locale === 'sv'
        ? 'Köpa bostad i Spanien 2026 | Komplett guide för svenskar | Spanienfastigheter.se'
        : 'Buying Property in Spain 2026 | Complete Guide for Swedes | Spanienfastigheter.se';

    const description = locale === 'sv'
        ? 'Allt om att köpa bostad i Spanien: steg-för-steg process, kostnader, skatter, NIE-nummer och juridik. Läs vår kompletta guide för svenskar.'
        : 'Everything about buying property in Spain: step-by-step process, costs, taxes, NIE number, and legal tips. Read our complete guide for Swedes.';

    return {
        title,
        description,
        alternates: {
            canonical: '/guide/kopa-bostad-spanien'
        }
    };
}

export default GuidePage;
