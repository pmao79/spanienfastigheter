"use client";

import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import svLocale from "@fullcalendar/core/locales/sv";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Plus, Filter } from "lucide-react";
import BookingModal from "../_components/BookingModal";
import { useRouter, useParams } from "next/navigation";

export default function CalendarPage() {
    const params = useParams();
    const router = useRouter();

    const calendarRef = useRef<FullCalendar>(null);
    const [dateRange, setDateRange] = useState({
        start: new Date().toISOString().split('T')[0],
        end: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]
    });

    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | undefined>();

    // Fetch viewings
    const viewings = useQuery(api.viewings.getByDateRange, {
        start: dateRange.start,
        end: dateRange.end
    });

    const handleDatesSet = (arg: any) => {
        setDateRange({
            start: arg.startStr,
            end: arg.endStr
        });
    };

    const handleEventClick = (info: any) => {
        router.push(`/admin/viewings/${info.event.id}`);
    };

    const handleDateClick = (arg: any) => {
        setSelectedDate(arg.dateStr);
        setIsBookingModalOpen(true);
    };

    // Transform viewings to FullCalendar events
    const events = viewings?.map(v => ({
        id: v._id,
        title: `${v.lead?.firstName} ${v.lead?.lastName} (${v.lead?.temperature})`,
        start: v.scheduledAt,
        end: new Date(new Date(v.scheduledAt).getTime() + (v.estimatedDuration || 60) * 60000).toISOString(),
        backgroundColor: getStatusColor(v.status),
        borderColor: getStatusBorderColor(v.status),
        textColor: '#1e293b', // slate-800 for contrast
        extendedProps: {
            lead: v.lead,
            assignedTo: v.assignedTo,
            status: v.status
        }
    })) || [];

    return (
        <div className="h-[calc(100vh-6rem)] space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Kalender</h1>
                    <p className="text-slate-500">Översikt över bokade visningar</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => { setSelectedDate(undefined); setIsBookingModalOpen(true); }}
                        className="flex items-center gap-2 rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-medium text-white hover:bg-[#153e75]"
                    >
                        <Plus className="h-4 w-4" />
                        Boka Visning
                    </button>
                </div>
            </div>

            <div className="h-full rounded-xl bg-white p-4 shadow-sm">
                <style jsx global>{`
                    .fc {
                        font-family: inherit;
                    }
                    .fc-toolbar-title {
                        font-size: 1.25rem !important;
                        font-weight: 600;
                    }
                    .fc-button-primary {
                        background-color: #1a365d !important;
                        border-color: #1a365d !important;
                    }
                    .fc-button-active {
                        background-color: #153e75 !important;
                    }
                    .fc-event {
                        cursor: pointer;
                        border-left-width: 4px;
                        border-style: solid;
                        border-top: none;
                        border-right: none;
                        border-bottom: none;
                        padding: 2px 4px;
                        font-size: 0.75rem;
                        font-weight: 500;
                    }
                `}</style>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    locale={svLocale}
                    firstDay={1} // Monday start
                    slotMinTime="08:00:00"
                    slotMaxTime="20:00:00"
                    allDaySlot={false}
                    events={events}
                    datesSet={handleDatesSet}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                    height="100%"
                />
            </div>

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                initialDate={selectedDate}
            />
        </div>
    );
}

function getStatusColor(status: string) {
    // Scheduled: Blå
    // Confirmed: Grön
    // In Progress: Gul
    // Completed: Grå
    // Cancelled: Röd
    switch (status) {
        case 'scheduled': return '#bfdbfe'; // blue-200
        case 'confirmed': return '#bbf7d0'; // green-200
        case 'in_progress': return '#fde68a'; // yellow-200
        case 'completed': return '#e5e7eb'; // gray-200
        case 'cancelled': return '#fecaca'; // red-200
        default: return '#bfdbfe';
    }
}

function getStatusBorderColor(status: string) {
    switch (status) {
        case 'scheduled': return '#3b82f6'; // blue-500
        case 'confirmed': return '#22c55e'; // green-500
        case 'in_progress': return '#eab308'; // yellow-500
        case 'completed': return '#6b7280'; // gray-500
        case 'cancelled': return '#ef4444'; // red-500
        default: return '#3b82f6';
    }
}
