'use client';

import { GolfCourse } from '@/types/golf';
import {
    Utensils,
    ShoppingBag,
    ShowerHead,
    Target,
    Goal,
    Dumbbell,
    Waves,
    Car,
    Award
} from 'lucide-react';

interface GolfFacilitiesProps {
    course: GolfCourse;
}

export default function GolfFacilities({ course }: GolfFacilitiesProps) {
    const facilities = course.facilities;

    const items = [
        {
            label: 'Driving Range',
            active: facilities.course.drivingRange,
            icon: Target,
            details: facilities.course.drivingRangeSpots ? `${facilities.course.drivingRangeSpots} platser` : undefined
        },
        {
            label: 'Putting Green',
            active: facilities.course.puttingGreen,
            icon: Goal
        },
        {
            label: 'Restaurang',
            active: facilities.clubhouse.restaurant,
            icon: Utensils
        },
        {
            label: 'Pro Shop',
            active: facilities.clubhouse.proshop,
            icon: ShoppingBag
        },
        {
            label: 'Omklädningsrum',
            active: facilities.clubhouse.locker,
            icon: ShowerHead
        },
        {
            label: 'Golfskola',
            active: facilities.services.golfSchool,
            icon: Award
        },
        {
            label: 'Gym',
            active: facilities.other.gym,
            icon: Dumbbell
        },
        {
            label: 'Pool/Spa',
            active: facilities.other.pool || facilities.other.spa,
            icon: Waves
        },
        {
            label: 'Buggy',
            active: true, // Almost all courses have buggies
            icon: Car
        }
    ];

    return (
        <div className="bg-white rounded-lg shadow-soft p-6 md:p-8">
            <h3 className="font-serif text-2xl text-navy mb-6">Faciliteter</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center gap-3 p-3 rounded-md border ${item.active
                                ? 'border-greige bg-alabaster text-navy'
                                : 'border-transparent bg-gray-50 text-gray-300'
                            }`}
                    >
                        <item.icon size={20} className={item.active ? 'text-sand' : 'text-gray-300'} />
                        <div className="flex flex-col">
                            <span className={`text-sm font-medium ${!item.active && 'line-through'}`}>
                                {item.label}
                            </span>
                            {item.details && item.active && (
                                <span className="text-[10px] text-gray-500">{item.details}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
