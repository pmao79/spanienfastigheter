'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface GolfDescriptionProps {
    description: string;
    longDescription?: string;
    maxLength?: number;
}

// Clean text from citations like [1][3], etc.
function cleanText(text: string): string {
    if (!text) return '';

    // Remove citation numbers like [1], [2][4], etc.
    let cleaned = text.replace(/\[\d+\]/g, '');

    // Remove double spaces that might result
    cleaned = cleaned.replace(/\s+/g, ' ');

    // Clean up any multiple periods
    cleaned = cleaned.replace(/\.{2,}/g, '.');

    // Trim whitespace
    cleaned = cleaned.trim();

    return cleaned;
}

// Split text into paragraphs
function formatParagraphs(text: string): string[] {
    if (!text) return [];

    // First try to split by explicit newlines
    let paragraphs = text.split(/\\n\\n|\\n|\n\n|\n/).filter(p => p.trim());

    // If only one paragraph and it's long, try to split by sentences into logical paragraphs
    if (paragraphs.length === 1 && paragraphs[0].length > 300) {
        const sentences = paragraphs[0].match(/[^.!?]+[.!?]+/g) || [paragraphs[0]];

        if (sentences.length >= 4) {
            // Group sentences into paragraphs (3-4 sentences each)
            const grouped: string[] = [];
            let current = '';

            sentences.forEach((sentence, i) => {
                current += sentence.trim() + ' ';

                // Create new paragraph every 2-3 sentences
                if ((i + 1) % 3 === 0 || i === sentences.length - 1) {
                    grouped.push(current.trim());
                    current = '';
                }
            });

            paragraphs = grouped;
        }
    }

    return paragraphs.map(p => cleanText(p.trim())).filter(p => p);
}

export default function GolfDescription({ description, longDescription, maxLength = 400 }: GolfDescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const fullText = longDescription || description || '';
    const cleanedText = cleanText(fullText);
    const paragraphs = formatParagraphs(fullText);

    // Determine if we need a "read more" button
    const needsReadMore = cleanedText.length > maxLength;

    // Get truncated version (first paragraph or partial)
    const getTruncatedContent = () => {
        if (paragraphs.length === 0) return null;

        const firstParagraph = paragraphs[0];

        if (firstParagraph.length <= maxLength) {
            // First paragraph fits, show it
            return (
                <p className="text-lg leading-relaxed font-medium text-charcoal">
                    {firstParagraph}
                </p>
            );
        }

        // Truncate first paragraph
        const truncated = firstParagraph.slice(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');
        const finalText = truncated.slice(0, lastSpace) + '...';

        return (
            <p className="text-lg leading-relaxed font-medium text-charcoal">
                {finalText}
            </p>
        );
    };

    const getFullContent = () => {
        return paragraphs.map((paragraph, index) => (
            <p
                key={index}
                className={`leading-relaxed text-charcoal ${index === 0 ? 'text-lg font-medium' : 'text-base'}`}
            >
                {paragraph}
            </p>
        ));
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-soft">
            <h2 className="font-serif text-3xl text-navy mb-6">Om banan</h2>

            <div className="prose max-w-none space-y-4">
                {isExpanded || !needsReadMore ? getFullContent() : getTruncatedContent()}
            </div>

            {needsReadMore && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-6 inline-flex items-center gap-2 text-navy font-medium hover:text-sand transition-colors"
                >
                    {isExpanded ? (
                        <>
                            <span>Visa mindre</span>
                            <ChevronUp className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            <span>Läs mer</span>
                            <ChevronDown className="w-4 h-4" />
                        </>
                    )}
                </button>
            )}
        </div>
    );
}
