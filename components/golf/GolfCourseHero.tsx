'use client';

import Image from 'next/image';
import { GolfCourse } from '@/types/golf';
import { MapPin, Star, Trophy, Calendar, Ruler, Flag } from 'lucide-react';

interface GolfCourseHeroProps {
    course: GolfCourse;
}

export default function GolfCourseHero({ course }: GolfCourseHeroProps) {
    return (
        <section className="relative h-[60vh] min-h-[500px] w-full bg-navy">
            {/* Background Image */}
            {course.media?.heroImage ? (
                <>
                    <Image
                        src={course.media.heroImage}
                        alt={course.name}
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                </>
            ) : (
                <div className="absolute inset-0 bg-navy opacity-100" />
            )}

            {/* Content */}
            <div className="absolute inset-0 flex items-end pb-12 md:pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl">
                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="bg-sand text-navy text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                                {course.region === 'costa-blanca' ? 'Costa Blanca' : 'Costa del Sol'}
                            </span>
                            {course.rating.overall >= 4.5 && (
                                <span className="bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm flex items-center gap-2">
                                    <Trophy size={14} className="text-sand" />
                                    Top Rated
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-4">
                            {course.name}
                        </h1>

                        {/* Location & Rating */}
                        <div className="flex flex-wrap items-center gap-6 text-white/90 mb-8">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} className="text-sand" />
                                <span className="text-lg">{course.subRegion}, {course.province}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={18}
                                            className={`${i < Math.floor(course.rating.overall)
                                                    ? 'fill-sand text-sand'
                                                    : 'text-gray-500'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="font-bold">{course.rating.overall}</span>
                                <span className="text-white/60">({course.rating.totalReviews} recensioner)</span>
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-white/20 pt-8 mt-8">
                            <div className="flex flex-col">
                                <span className="text-white/60 text-xs uppercase tracking-widest mb-1 flex items-center gap-2">
                                    <Flag size={14} /> Hål
                                </span>
                                <span className="text-2xl font-serif text-white">
                                    {course.courseInfo.holes} <span className="text-sm font-sans text-white/60">Par {course.courseInfo.par}</span>
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-white/60 text-xs uppercase tracking-widest mb-1 flex items-center gap-2">
                                    <Ruler size={14} /> Längd
                                </span>
                                <span className="text-2xl font-serif text-white">
                                    {course.courseInfo.length.meters}m <span className="text-sm font-sans text-white/60">Gul</span>
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-white/60 text-xs uppercase tracking-widest mb-1 flex items-center gap-2">
                                    <Calendar size={14} /> Öppnad
                                </span>
                                <span className="text-2xl font-serif text-white">
                                    {course.courseInfo.openedYear}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-white/60 text-xs uppercase tracking-widest mb-1">
                                    Arkitekt
                                </span>
                                <span className="text-lg text-white font-medium line-clamp-1">
                                    {course.courseInfo.architect}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
