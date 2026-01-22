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
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                bounceSubtle: {
                    '0%, 100%': { transform: 'translateY(-2px)' },
                    '50%': { transform: 'translateY(2px)' },
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.4s ease-out forwards',
                'slide-in-right': 'slideInRight 0.3s ease-out forwards',
                'bounce-subtle': 'bounceSubtle 2s infinite ease-in-out',
            },
        },
    },
    plugins: [],
};

export default config;
