import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import ConvexClientProvider from './ConvexClientProvider';
import { getLocale } from 'next-intl/server';

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-serif',
    display: 'swap',
    weight: ['400', '500', '600'],
    style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
    weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
    title: {
        default: 'Köp bostad i Spanien | Fastigheter Costa Blanca & Costa del Sol | Spanienfastigheter.se',
        template: '%s | Spanienfastigheter.se',
    },
    description:
        'Utforska 2,450+ bostäder till salu på Costa Blanca, Costa del Sol, Costa Cálida och Costa de Almería. Villor, lägenheter och radhus med svensktalande support. Boka visningsresa idag.',
    metadataBase: new URL('https://spanienfastigheter.se'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Köp bostad i Spanien | Spanienfastigheter.se',
        description: 'Utforska 2,450+ fastigheter till salu i Spanien med svensk support genom hela köpet.',
        url: 'https://www.spanienfastigheter.se/',
        siteName: 'Spanienfastigheter.se',
        type: 'website',
        locale: 'sv_SE',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Köp bostad i Spanien | Spanienfastigheter.se',
        description: 'Utforska 2,450+ fastigheter till salu i Spanien med svensk support.',
    },
    other: {
        'script:ld+json': JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RealEstateAgent',
            name: 'Spanienfastigheter.se',
            description: 'Svensk fastighetsmäklare specialiserad på bostäder i Spanien – Costa Blanca, Costa del Sol, Costa Cálida och Costa de Almería',
            url: 'https://www.spanienfastigheter.se',
            email: 'info@spanienfastigheter.se',
            areaServed: [
                { '@type': 'Place', name: 'Costa Blanca, Spanien' },
                { '@type': 'Place', name: 'Costa del Sol, Spanien' },
                { '@type': 'Place', name: 'Costa Cálida, Spanien' },
                { '@type': 'Place', name: 'Costa de Almería, Spanien' },
            ],
            knowsLanguage: ['sv', 'es', 'en'],
            priceRange: '€50,000 - €5,000,000',
        }),
    },
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${playfair.variable} ${dmSans.variable} font-sans antialiased`}
                suppressHydrationWarning
            >
                <ConvexClientProvider>
                    {children}
                </ConvexClientProvider>
            </body>
        </html>
    );
}
