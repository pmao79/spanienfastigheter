'use client';

import { useState, useEffect } from 'react';
import { Star, ExternalLink, User } from 'lucide-react';
import Image from 'next/image';

interface Review {
    authorName: string;
    authorUrl?: string;
    profilePhoto?: string;
    rating: number;
    relativeTime: string;
    text: string;
    timestamp: number;
}

interface ReviewsData {
    placeId: string;
    name: string;
    rating: number;
    totalReviews: number;
    googleMapsUrl: string;
    reviews: Review[];
}

interface GolfGoogleReviewsProps {
    courseName: string;
    location: string;
    googlePlaceId?: string;
}

export default function GolfGoogleReviews({ courseName, location, googlePlaceId }: GolfGoogleReviewsProps) {
    const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const params = new URLSearchParams();
                if (googlePlaceId) {
                    params.set('placeId', googlePlaceId);
                } else {
                    let query = `${courseName} ${location} Spain`;
                    if (!courseName.toLowerCase().includes('golf')) {
                        query = `${courseName} golf ${location} Spain`;
                    }
                    params.set('query', query);
                }

                const response = await fetch(`/api/golf/reviews?${params.toString()}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }

                const data = await response.json();
                setReviewsData(data);
            } catch (err) {
                setError('Kunde inte hämta recensioner');
                console.error('Reviews fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [courseName, location, googlePlaceId]);

    const toggleExpand = (index: number) => {
        setExpandedReviews(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(star => (
                    <Star
                        key={star}
                        size={14}
                        className={star <= rating ? 'fill-sand text-sand' : 'text-gray-300'}
                    />
                ))}
            </div>
        );
    };

    // Loading skeleton
    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-soft p-6 md:p-8">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                        <div>
                            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-32"></div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="border-t pt-4">
                                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Error or no data
    if (error || !reviewsData) {
        return null; // Silently fail - don't show broken component
    }

    return (
        <div className="bg-white rounded-lg shadow-soft p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl text-navy">Gästrecensioner</h3>
                <a
                    href={reviewsData.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-navy transition-colors"
                >
                    <Image
                        src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                        alt="Google"
                        width={92}
                        height={30}
                        className="h-4 w-auto opacity-70"
                        unoptimized
                    />
                </a>
            </div>

            {/* Overall Rating */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-greige">
                <div className="flex flex-col items-center justify-center w-20 h-20 bg-navy rounded-lg text-white">
                    <span className="text-2xl font-bold">{reviewsData.rating.toFixed(1)}</span>
                    <div className="flex gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map(star => (
                            <Star
                                key={star}
                                size={10}
                                className={star <= Math.round(reviewsData.rating) ? 'fill-sand text-sand' : 'text-white/30'}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <div className="text-lg font-medium text-charcoal">Utmärkt</div>
                    <div className="text-sm text-gray-500">
                        Baserat på {reviewsData.totalReviews.toLocaleString('sv-SE')} recensioner på Google
                    </div>
                </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
                {reviewsData.reviews.slice(0, 5).map((review, index) => {
                    const isExpanded = expandedReviews.has(index);
                    const shouldTruncate = review.text.length > 200;
                    const displayText = shouldTruncate && !isExpanded
                        ? review.text.slice(0, 200) + '...'
                        : review.text;

                    return (
                        <div key={index} className={index > 0 ? 'border-t border-greige pt-6' : ''}>
                            <div className="flex items-start gap-3 mb-3">
                                {review.profilePhoto ? (
                                    <Image
                                        src={review.profilePhoto}
                                        alt={review.authorName}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 rounded-full object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-greige flex items-center justify-center">
                                        <User size={20} className="text-gray-400" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-charcoal">{review.authorName}</span>
                                        <span className="text-xs text-gray-400">{review.relativeTime}</span>
                                    </div>
                                    <div className="mt-0.5">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {displayText}
                            </p>
                            {shouldTruncate && (
                                <button
                                    onClick={() => toggleExpand(index)}
                                    className="text-sm text-navy font-medium mt-2 hover:text-sand transition-colors"
                                >
                                    {isExpanded ? 'Visa mindre' : 'Läs mer'}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* View More on Google */}
            <div className="mt-8 pt-6 border-t border-greige text-center">
                <a
                    href={reviewsData.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-sand transition-colors"
                >
                    Se alla {reviewsData.totalReviews} recensioner på Google
                    <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
}
