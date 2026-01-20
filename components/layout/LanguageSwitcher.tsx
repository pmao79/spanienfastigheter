'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

const localeNames: Record<string, string> = {
    sv: 'SV',
    en: 'EN',
    es: 'ES',
};

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (newLocale: string) => {
        // Remove current locale prefix and add new one
        const segments = pathname.split('/').filter(Boolean);
        if (['sv', 'en', 'es'].includes(segments[0])) {
            segments.shift();
        }
        const newPath = newLocale === 'sv' ? `/${segments.join('/')}` : `/${newLocale}/${segments.join('/')}`;
        router.push(newPath || '/');
    };

    return (
        <div className="relative group">
            <button className="flex items-center gap-2 text-xs font-medium hover:opacity-70 transition-opacity">
                <Globe size={16} />
                <span className="tracking-widest">{localeNames[locale]}</span>
            </button>
            <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-sm py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {Object.entries(localeNames).map(([code, name]) => (
                    <button
                        key={code}
                        onClick={() => handleChange(code)}
                        className={`block w-full px-4 py-2 text-left text-xs tracking-widest hover:bg-greige transition-colors ${code === locale ? 'text-navy font-semibold' : 'text-charcoal'
                            }`}
                    >
                        {name}
                    </button>
                ))}
            </div>
        </div>
    );
}
