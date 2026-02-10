import type { ReactNode } from 'react';
import Link from 'next/link';
import { Suspense } from 'react';
import AreaFAQ from '@/components/areas/AreaFAQ';
import FilteredSearch from './FilteredSearch';

type BreadcrumbItem = {
    name: string;
    href: string;
};

type SeoLandingPageProps = {
    title: string;
    subtitle: string;
    intro: string;
    cityLabel: string;
    breadcrumbItems: BreadcrumbItem[];
    faqTitle: string;
    faqItems: { question: string; answer: string }[];
    defaultFilters: Record<string, string>;
    children: ReactNode;
};

export default function SeoLandingPage({
    title,
    subtitle,
    intro,
    cityLabel,
    breadcrumbItems,
    faqTitle,
    faqItems,
    defaultFilters,
    children
}: SeoLandingPageProps) {
    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `https://spanienfastigheter.se${item.href}`
        }))
    };

    return (
        <main className="min-h-screen bg-alabaster">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />

            <section className="bg-navy py-20">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <nav className="text-white/70 text-sm mb-6">
                        <ol className="flex flex-wrap items-center gap-2">
                            {breadcrumbItems.map((item, index) => (
                                <li key={item.href} className="flex items-center gap-2">
                                    <Link href={item.href} className="hover:text-white transition-colors">
                                        {item.name}
                                    </Link>
                                    {index < breadcrumbItems.length - 1 && <span>/</span>}
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <span className="text-sand text-[10px] uppercase tracking-[0.25em] font-bold mb-4 block">
                        {cityLabel}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
                        {title}
                    </h1>
                    <p className="text-white/70 font-light max-w-2xl mb-6">
                        {subtitle}
                    </p>
                    <p className="text-white/70 font-light max-w-3xl">
                        {intro}
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    {children}
                </div>
            </section>

            <section className="py-16 bg-greige/30">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-px bg-navy/10 w-12"></div>
                        <h2 className="text-2xl md:text-3xl font-serif text-navy">
                            Aktuella bostäder i <span className="text-sand italic">{cityLabel}</span>
                        </h2>
                    </div>
                    <Suspense fallback={<div className="py-12 text-center text-gray-400">Laddar bostader...</div>}>
                        <FilteredSearch defaultParams={defaultFilters} />
                    </Suspense>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <AreaFAQ items={faqItems} areaName={faqTitle} />
                </div>
            </section>
        </main>
    );
}
