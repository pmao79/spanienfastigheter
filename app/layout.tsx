import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

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
        default: 'Spanienfastigheter.se - Ditt hem i solen',
        template: '%s | Spanienfastigheter.se',
    },
    description:
        'Hitta ditt drömboende i Spanien. Svensktalande mäklare på Costa Blanca & Costa del Sol.',
    metadataBase: new URL('https://spanienfastigheter.se'),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning>
            <body
                className={`${playfair.variable} ${dmSans.variable} font-sans antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
