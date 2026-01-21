import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                navy: '#091A2B',
                alabaster: '#FCFFF8',
                greige: '#F2F1EF',
                sand: '#D9B18E',
                charcoal: '#36454F',
                sage: '#557373',
                // Golf specific accents
                fairway: '#4A7C59',
                bunker: '#E8DCC4',
                flagYellow: '#F4D03F',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"DM Sans"', 'sans-serif'],
            },
            boxShadow: {
                soft: '0 4px 20px -2px rgba(9, 26, 43, 0.05)',
                hover: '0 10px 25px -5px rgba(9, 26, 43, 0.1)',
            },
        },
    },
    plugins: [],
};

export default config;
