'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

interface AreaFAQProps {
    items: FAQItem[];
    areaName: string;
}

/**
 * FAQ Accordion with Schema.org FAQPage markup
 */
export default function AreaFAQ({ items, areaName }: AreaFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // Generate FAQPage schema
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer
            }
        }))
    };

    return (
        <section className="py-12">
            {/* Schema markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-navy/10 w-12" />
                <h2 className="text-2xl md:text-3xl font-serif text-navy">
                    Vanliga frågor om <span className="text-sand italic">{areaName}</span>
                </h2>
            </div>

            {/* FAQ Items */}
            <div className="space-y-3">
                {items.map((item, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div
                            key={index}
                            className={`
                                border rounded-lg overflow-hidden transition-all duration-300
                                ${isOpen ? 'border-navy shadow-soft' : 'border-greige hover:border-sage'}
                            `}
                        >
                            {/* Question */}
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                className={`
                                    w-full flex items-center justify-between gap-4
                                    px-6 py-5 text-left
                                    transition-colors duration-200
                                    ${isOpen ? 'bg-navy text-white' : 'bg-white hover:bg-alabaster text-navy'}
                                `}
                            >
                                <span className="font-sans font-semibold text-sm md:text-base">
                                    {item.question}
                                </span>
                                <span className={`
                                    flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                                    transition-all duration-300
                                    ${isOpen ? 'bg-sand text-navy rotate-180' : 'bg-greige text-charcoal'}
                                `}>
                                    <ChevronDown size={18} />
                                </span>
                            </button>

                            {/* Answer */}
                            <div className={`
                                overflow-hidden transition-all duration-300 ease-in-out
                                ${isOpen ? 'max-h-96' : 'max-h-0'}
                            `}>
                                <div className="px-6 py-5 bg-alabaster border-t border-greige">
                                    <p className="text-charcoal leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
