'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface GolfBreadcrumbsProps {
    region?: 'costa-blanca' | 'costa-del-sol';
    courseName?: string;
}

export default function GolfBreadcrumbs({ region, courseName }: GolfBreadcrumbsProps) {
    const t = useTranslations('golf');

    const regionName = region === 'costa-blanca' ? 'Costa Blanca' : 'Costa del Sol';

    return (
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
            <Link href="/" className="hover:text-navy transition-colors flex items-center gap-1">
                <Home size={14} />
                Hem
            </Link>

            <ChevronRight size={14} />

            <Link href="/golf" className="hover:text-navy transition-colors">
                {t('title')}
            </Link>

            {region && (
                <>
                    <ChevronRight size={14} />
                    <Link
                        href={`/golf/${region}`}
                        className={`hover:text-navy transition-colors ${!courseName ? 'font-medium text-navy' : ''}`}
                    >
                        {regionName}
                    </Link>
                </>
            )}

            {courseName && (
                <>
                    <ChevronRight size={14} />
                    <span className="font-medium text-navy">{courseName}</span>
                </>
            )}
        </nav>
    );
}
