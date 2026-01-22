'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ChecklistPDF from './ChecklistPDF';

const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => <button className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full cursor-wait opacity-80">Laddar PDF...</button>,
    }
);

export default function ChecklistButton() {
    return (
        <PDFDownloadLink
            document={<ChecklistPDF />}
            fileName="Spanienfastigheter_Checklista_2025.pdf"
        >
            {({ blob, url, loading, error }: any) => (
                <button
                    disabled={loading}
                    className={`inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full hover:bg-white/20 transition-colors duration-300 cursor-pointer ${loading ? 'opacity-50 cursor-wait' : ''}`}
                >
                    {loading ? 'Skapar PDF...' : 'Ladda ner checklistan (PDF)'}
                </button>
            )}
        </PDFDownloadLink>
    );
}
