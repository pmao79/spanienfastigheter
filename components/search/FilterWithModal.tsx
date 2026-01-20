'use client';

import { useState } from 'react';
import FilterSidebar from '@/components/search/FilterSidebar';
import SearchServiceModal from '@/components/modals/SearchServiceModal';

export default function FilterWithModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <FilterSidebar onOpenSearchService={() => setIsModalOpen(true)} />
            <SearchServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
