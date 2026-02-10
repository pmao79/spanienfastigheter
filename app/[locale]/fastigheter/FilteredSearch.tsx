'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ConvexPropertySearch from '@/components/search/ConvexPropertySearch';

type FilteredSearchProps = {
    defaultParams: Record<string, string>;
};

export default function FilteredSearch({ defaultParams }: FilteredSearchProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        let updated = false;

        Object.entries(defaultParams).forEach(([key, value]) => {
            if (!params.has(key)) {
                params.set(key, value);
                updated = true;
            }
        });

        if (updated) {
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }
    }, [searchParams, pathname, router, defaultParams]);

    return <ConvexPropertySearch />;
}
