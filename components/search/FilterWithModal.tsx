'use client';

import { useState } from 'react';
import FilterSidebar from '@/components/search/FilterSidebar';
import SearchServiceModal from '@/components/modals/SearchServiceModal';

interface FilterWithModalProps {
    propertyCount?: number;
}

export default function FilterWithModal({ propertyCount }: FilterWithModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <FilterSidebar onOpenSearchService={() => setIsModalOpen(true)} propertyCount={propertyCount} />
            <SearchServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
