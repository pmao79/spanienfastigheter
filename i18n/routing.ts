import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['sv', 'en', 'es'],
    defaultLocale: 'sv',
    localePrefix: 'as-needed',
});
