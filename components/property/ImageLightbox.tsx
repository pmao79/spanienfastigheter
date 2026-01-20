'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageLightboxProps {
    images: string[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

export default function ImageLightbox({
    images,
    initialIndex,
    isOpen,
    onClose,
}: ImageLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isLoading, setIsLoading] = useState(true);

    // Update index when initialIndex changes or modal opens
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            setIsLoading(true);
        }
    }, [isOpen, initialIndex]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleNext = useCallback(
        (e?: React.MouseEvent) => {
            e?.stopPropagation();
            setCurrentIndex((prev) => (prev + 1) % images.length);
            setIsLoading(true);
        },
        [images.length]
    );

    const handlePrev = useCallback(
        (e?: React.MouseEvent) => {
            e?.stopPropagation();
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
            setIsLoading(true);
        },
        [images.length]
    );

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleNext, handlePrev, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fade-in"
            onClick={onClose}
        >
            {/* Loading Spinner */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
            )}

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white p-2 z-50 transition-colors"
            >
                <X size={32} />
            </button>

            {/* Navigation Buttons (Desktop) */}
            <button
                onClick={handlePrev}
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:bg-white/10 p-4 rounded-full transition-all z-50"
            >
                <ChevronLeft size={48} strokeWidth={1} />
            </button>
            <button
                onClick={handleNext}
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:bg-white/10 p-4 rounded-full transition-all z-50"
            >
                <ChevronRight size={48} strokeWidth={1} />
            </button>

            {/* Main Image */}
            <div className="relative w-full h-full max-h-[85vh] max-w-7xl mx-4 md:mx-20 flex items-center justify-center z-10 transition-opacity duration-300">
                <Image
                    src={images[currentIndex]}
                    alt={`Gallery image ${currentIndex + 1}`}
                    fill
                    className={`object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                    priority
                    onLoadingComplete={() => setIsLoading(false)}
                />

                {/* Helper text / Counter mobile */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden text-white/80 text-sm font-medium px-4 py-2 bg-black/50 rounded-full backdrop-blur-md">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnail Strip (Desktop) */}
            <div
                className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 gap-2 overflow-x-auto max-w-[90vw] p-2 no-scrollbar z-50"
                onClick={(e) => e.stopPropagation()}
            >
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setCurrentIndex(idx);
                            setIsLoading(true);
                        }}
                        className={`relative w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden transition-all duration-300 ${currentIndex === idx
                                ? 'ring-2 ring-white opacity-100 scale-110'
                                : 'opacity-40 hover:opacity-80'
                            }`}
                    >
                        <Image
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Mobile Swipe Hints (Invisible touch areas) */}
            <div className="md:hidden absolute left-0 top-0 bottom-0 w-1/4 z-20" onClick={handlePrev}></div>
            <div className="md:hidden absolute right-0 top-0 bottom-0 w-1/4 z-20" onClick={handleNext}></div>
        </div>
    );
}
