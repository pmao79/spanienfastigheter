import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locale = routing.locales.includes(requested as 'sv' | 'en' | 'es')
        ? (requested as 'sv' | 'en' | 'es')
        : routing.defaultLocale;

    return {
        locale,
        messages: (await import(`@/locales/${locale}/common.json`)).default,
    };
});
