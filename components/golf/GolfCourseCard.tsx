'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GolfCourse } from '@/types/golf';
import { formatPrice } from '@/lib/golf-utils';
import { MapPin, Star, Trophy } from 'lucide-react';

interface GolfCourseCardProps {
    course: GolfCourse;
    showPrice?: boolean;
}

export default function GolfCourseCard({ course, showPrice = true }: GolfCourseCardProps) {
    const [rating, setRating] = useState(course.rating.overall);
    const [totalReviews, setTotalReviews] = useState(course.rating.totalReviews);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const params = new URLSearchParams();
                if (course.googlePlaceId) {
                    params.set('placeId', course.googlePlaceId);
                } else {
                    let query = `${course.name} ${course.subRegion} Spain`;
                    if (!course.name.toLowerCase().includes('golf')) {
                        query = `${course.name} golf ${course.subRegion} Spain`;
                    }
                    params.set('query', query);
                }

                const response = await fetch(`/api/golf/reviews?${params.toString()}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.rating) setRating(data.rating);
                    if (data.totalReviews) setTotalReviews(data.totalReviews);
                }
            } catch (error) {
                // Silently fail and use default data
            } finally {
                setIsLoading(false);
            }
        };

        // Only fetch if we're in the browser to avoid server/client mismatch during hydration if possible, 
        // though useEffect runs on client anyway.
        fetchRating();
    }, [course]);

    // Determine difficulty badge class
    const getDifficultyBadge = (level: string) => {
        switch (level) {
            case 'easy':
            case 'beginner':
                return 'golf-badge-difficulty-easy';
            case 'challenging':
            case 'expert':
                return 'golf-badge-difficulty-hard';
            default:
                return 'golf-badge-difficulty-medium';
        }
    };

    const getDifficultyLabel = (level: string) => {
        // Simple Swedish mapping, in real app use translations
        const map: Record<string, string> = {
            beginner: 'Nybörjare',
            easy: 'Lätt',
            medium: 'Medel',
            challenging: 'Utmanande',
            expert: 'Expert'
        };
        return map[level] || level;
    };

    // Get current season price (simplified logic for card)
    const currentPrice = course.pricing.greenFee.highSeason.weekday.min;

    return (
        <Link
            href={`/golf/${course.region}/${course.slug}`}
            className="group block bg-white rounded-sm overflow-hidden shadow-soft golf-card h-full flex flex-col"
        >
            {/* Image Container */}
            <div className="relative h-48 md:h-56 overflow-hidden">
                {/* Placeholder if image missing */}
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />

                {course.media?.heroImage && (
                    <Image
                        src={course.media.heroImage}
                        alt={course.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {course.meta?.isFeatured && (
                        <span className="golf-badge golf-badge-featured">
                            Utvald
                        </span>
                    )}
                    {rating >= 4.5 && (
                        <span className="bg-navy text-white text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-sm flex items-center gap-1">
                            <Trophy size={10} className="text-sand" />
                            Top Rated
                        </span>
                    )}
                </div>

                {/* Rating */}
                <div className={`absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-sm flex items-center gap-1 transition-opacity duration-500 ${isLoading ? 'opacity-70' : 'opacity-100'}`}>
                    <Star size={12} className="fill-sand text-sand" />
                    <span className="text-xs font-medium text-navy">{rating.toFixed(1)}</span>
                    <span className="text-[10px] text-gray-500">({totalReviews})</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <div className="flex items-center gap-1 text-gray-400 mb-1">
                            <MapPin size={12} />
                            <span className="text-xs uppercase tracking-wider">{course.subRegion}</span>
                        </div>
                        <h3 className="font-serif text-xl text-navy group-hover:text-sand transition-colors">
                            {course.shortName || course.name}
                        </h3>
                    </div>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
                    {course.tagline || course.description}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 py-3 border-t border-greige text-xs text-charcoal">
                    <div>
                        <span className="block text-gray-400 mb-0.5">Hål / Par</span>
                        <span>{course.courseInfo.holes} / {course.courseInfo.par}</span>
                    </div>
                    <div>
                        <span className="block text-gray-400 mb-0.5">Svårighet</span>
                        <span className={`inline-block w-2 h-2 rounded-full mr-1 ${course.difficulty.level === 'expert' ? 'bg-navy' :
                            course.difficulty.level === 'beginner' ? 'bg-sage' : 'bg-sand'
                            }`}></span>
                        {getDifficultyLabel(course.difficulty.level)}
                    </div>
                </div>

                {/* Price & Action */}
                {showPrice && (
                    <div className="mt-4 flex items-end justify-between">
                        <div>
                            <span className="text-xs text-gray-400 block">Green fee från</span>
                            {currentPrice > 0 ? (
                                <span className="golf-price-highlight">{formatPrice(currentPrice)}</span>
                            ) : (
                                <span className="text-sm text-charcoal font-medium">Se priser</span>
                            )}
                        </div>
                        <div className="text-xs font-medium text-navy uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                            Boka tid →
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
}
