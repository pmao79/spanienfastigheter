"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import svLocale from "@fullcalendar/core/locales/sv";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    Plus,
    Filter,
    Search,
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    ClipboardList,
    MapPin,
    User,
    Phone,
    ExternalLink,
    Clock
} from "lucide-react";
import BookingModal from "../_components/BookingModal";
import { useRouter, useParams } from "next/navigation";
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, getDay, isAfter, isToday } from "date-fns";
import { sv } from "date-fns/locale";

const EVENT_COLORS: Record<string, any> = {
    viewing: { bg: 'bg-blue-50', border: 'border-l-4 border-blue-500', dot: 'bg-blue-500', text: 'text-blue-700', fcBg: '#eff6ff', fcBorder: '#3b82f6', fcText: '#1d4ed8' },
    meeting: { bg: 'bg-green-50', border: 'border-l-4 border-green-500', dot: 'bg-green-500', text: 'text-green-700', fcBg: '#f0fdf4', fcBorder: '#22c55e', fcText: '#15803d' },
    notary: { bg: 'bg-purple-50', border: 'border-l-4 border-purple-500', dot: 'bg-purple-500', text: 'text-purple-700', fcBg: '#faf5ff', fcBorder: '#a855f7', fcText: '#7e22ce' },
    deadline: { bg: 'bg-red-50', border: 'border-l-4 border-red-500', dot: 'bg-red-500', text: 'text-red-700', fcBg: '#fef2f2', fcBorder: '#ef4444', fcText: '#b91c1c' },
    other: { bg: 'bg-gray-50', border: 'border-l-4 border-gray-400', dot: 'bg-gray-400', text: 'text-gray-700', fcBg: '#f9fafb', fcBorder: '#9ca3af', fcText: '#374151' },
};

export default function CalendarPage() {
    const router = useRouter();
    const calendarRef = useRef<FullCalendar>(null);
    const [dateRange, setDateRange] = useState({
        start: new Date().toISOString().split('T')[0],
        end: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]
    });

    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | undefined>();

    // Filters
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("Alla typer");
    const [agentFilter, setAgentFilter] = useState("Alla agenter");

    // Fetch viewings
    // Fetch Events (Viewings, Deadlines, Notary, etc.)
    const rawEvents = useQuery(api.calendar.getEvents, {
        start: dateRange.start,
        end: dateRange.end,
        assignedToId: agentFilter !== "Alla agenter" ? (agentFilter as any) : undefined
    }) || [];

    // Filter Logic
    const filteredEvents = rawEvents.filter(evt => {
        const matchesSearch = searchTerm === "" ||
            evt.lead?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            evt.lead?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            evt.property?.ref?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            evt.property?.fullTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            evt.title?.toLowerCase().includes(searchTerm.toLowerCase());

        // Type Filter
        const matchesType = typeFilter === "Alla typer" ||
            (typeFilter === "Visning" && evt.type === 'viewing') ||
            (typeFilter === "Möte" && evt.type === 'meeting') ||
            (typeFilter === "Notarie" && evt.type === 'notary') ||
            (typeFilter === "Deadline" && evt.type === 'deadline') ||
            (typeFilter === "Annat" && evt.type === 'other');

        // Agent Filter (also handled in query, but good for local reactivity if switching fast)
        const matchesAgent = agentFilter === "Alla agenter" || evt.assignedTo?._id === agentFilter;

        return matchesSearch && matchesType && matchesAgent;
    });

    // Transform to Events
    const events = filteredEvents.map(evt => {
        const type = evt.type || 'other';
        const colors = EVENT_COLORS[type] || EVENT_COLORS.other;
        return {
            id: evt._id,
            title: evt.title,
            start: evt.start,
            end: evt.end,
            backgroundColor: colors.fcBg,
            borderColor: colors.fcBorder,
            textColor: colors.fcText,
            extendedProps: {
                type: type,
                lead: evt.lead,
                property: evt.property,
                assignedTo: evt.assignedTo,
                status: evt.status,
                meetingPoint: 'meetingPoint' in evt ? evt.meetingPoint : undefined,
                description: 'description' in evt ? evt.description : undefined
            }
        };
    });

    const handleDatesSet = (arg: any) => {
        setDateRange({ start: arg.startStr, end: arg.endStr });
    };

    const handleEventClick = (info: any) => {
        const type = info.event.extendedProps.type;
        if (type === 'viewing') {
            router.push(`/admin/viewings/${info.event.id}`);
        } else if (type === 'notary') {
            router.push(`/admin/deals/${info.event.id}`);
        } else if (type === 'deadline') {
            // Placeholder for task/deadline modal or page
            console.log("Deadline clicked", info.event.id);
        }
    };

    const handleSidebarDateSelect = (dateStr: string) => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.gotoDate(dateStr);
            calendarApi.changeView('timeGridDay');
        }
    };

    // Calculate Today's and Upcoming Events for Sidebar
    // Calculate Today's and Upcoming Events for Sidebar
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');
    const todayEvents = filteredEvents.filter(evt => evt.start.startsWith(todayStr));

    // Simplistic "Upcoming" - next 5 events after today
    const upcomingEvents = filteredEvents
        .filter(evt => evt.start > todayStr + 'T23:59:59')
        .sort((a, b) => a.start.localeCompare(b.start))
        .slice(0, 5);


    return (
        <div className="h-auto lg:h-[calc(100vh-6rem)] flex flex-col gap-4">
            {/* 1. FILTER BAR */}
            <div className="p-4 bg-white rounded-lg border border-slate-100 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-4 mb-3">
                    <div className="flex-1 relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Sök kund eller objekt..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20"
                        />
                    </div>

                    <select
                        className="w-full md:w-auto px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                        value={agentFilter}
                        onChange={(e) => setAgentFilter(e.target.value)}
                    >
                        <option value="Alla agenter">Alla agenter</option>
                        {/* Populate agents dynamically */}
                        {Array.from(new Set(rawEvents.map(e => e.assignedTo?._id).filter(Boolean))).map((id) => {
                            const agent = rawEvents.find(e => e.assignedTo?._id === id)?.assignedTo;
                            return <option key={id} value={id}>{agent?.name}</option>;
                        })}
                    </select>

                    <select
                        className="w-full md:w-auto px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option>Alla typer</option>
                        <option>Visning</option>
                        <option>Möte</option>
                        <option>Notarie</option>
                        <option>Deadline</option>
                        <option>Annat</option>
                    </select>

                    <button
                        onClick={() => { setSelectedDate(undefined); setIsBookingModalOpen(true); }}
                        className="w-full md:w-auto flex items-center justify-center gap-2 rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-medium text-white hover:bg-[#153e75] whitespace-nowrap"
                    >
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">Boka</span>
                        <span className="sm:hidden">+</span>
                    </button>
                </div>

                {/* Legend */}
                <div className="hidden sm:flex flex-wrap items-center gap-6 text-xs font-medium text-slate-600">
                    {Object.entries(EVENT_COLORS).map(([key, colors]) => (
                        <div key={key} className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                            <span className="capitalize">{key === 'viewing' ? 'Visning' : key === 'meeting' ? 'Möte' : key === 'notary' ? 'Notarie' : key === 'deadline' ? 'Deadline' : 'Annat'}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. MAIN CONTENT GRID */}
            <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 flex-1 min-h-0">
                {/* CALENDAR (3/4) */}
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-100 p-2 sm:p-4 overflow-hidden flex flex-col min-h-[500px] lg:min-h-0">
                    <style jsx global>{`
                        .fc { font-family: inherit; --fc-border-color: #e2e8f0; --fc-button-text-color: #fff; --fc-button-bg-color: #1a365d; --fc-button-border-color: #1a365d; --fc-button-hover-bg-color: #153e75; --fc-button-hover-border-color: #153e75; --fc-button-active-bg-color: #1a365d; --fc-button-active-border-color: #1a365d; --fc-today-bg-color: #f8fafc; }
                        .fc-toolbar-title { font-size: 1.1rem !important; font-weight: 700; color: #1e293b; }
                        .fc-col-header-cell-cushion { padding-top: 8px; padding-bottom: 8px; font-weight: 600; font-size: 0.875rem; color: #475569; }
                        .fc-timegrid-slot-label-cushion { font-size: 0.75rem; font-weight: 500; color: #64748b; }
                        .fc-event { border-radius: 4px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); border: none !important; }
                        .fc-v-event { border-left-width: 4px !important; border-left-style: solid !important; }
                    `}</style>
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView={typeof window !== 'undefined' && window.innerWidth < 1024 ? 'timeGridDay' : 'timeGridWeek'}
                        headerToolbar={{
                            left: 'prev,next',
                            center: 'title',
                            right: 'today,timeGridDay,timeGridWeek'
                        }}
                        locale={svLocale}
                        firstDay={1}
                        slotMinTime="08:00:00"
                        slotMaxTime="20:00:00"
                        allDaySlot={false}
                        events={events}
                        datesSet={handleDatesSet}
                        eventClick={handleEventClick}
                        dateClick={(arg) => { setSelectedDate(arg.dateStr); setIsBookingModalOpen(true); }}
                        height="100%"
                        eventContent={renderEventContent}
                        contentHeight="auto"
                        aspectRatio={1.5}
                    />
                </div>

                {/* SIDEBAR (1/4) */}
                <div className="w-full lg:w-80 flex-shrink-0 space-y-4 overflow-y-auto pr-1 max-h-[600px] lg:max-h-none">
                    {/* Mini Calendar */}
                    <MiniMonthCalendar onDateSelect={handleSidebarDateSelect} />

                    {/* Today */}
                    <div className="bg-white rounded-lg border border-slate-100 p-4 shadow-sm">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3 text-sm">
                            <ClipboardList className="w-4 h-4 text-[#1a365d]" />
                            Idag ({format(today, 'd MMM', { locale: sv })})
                        </h3>
                        {todayEvents.length === 0 ? (
                            <div className="text-center py-4">
                                <p className="text-sm text-slate-500">Inga events idag</p>
                                <p className="text-xs text-slate-400 mt-1">Njut av dagen! ☀️</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {todayEvents.map((evt: any) => (
                                    <SidebarEventCard key={evt._id} event={evt} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Upcoming */}
                    <div className="bg-white rounded-lg border border-slate-100 p-4 shadow-sm">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3 text-sm">
                            <MapPin className="w-4 h-4 text-[#1a365d]" />
                            Kommande
                        </h3>
                        <div className="space-y-4">
                            {/* Group simplisticly or just list */}
                            {upcomingEvents.length > 0 ? upcomingEvents.map((evt: any) => (
                                <SidebarEventCard key={evt._id} event={evt} showDate />
                            )) : (
                                <p className="text-sm text-slate-500 text-center py-2">Inga kommande händelser</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                initialDate={selectedDate}
            />
        </div>
    );
}

// --- Helper Components ---

function renderEventContent(eventInfo: any) {
    return <CalendarEventWithHover eventInfo={eventInfo} />;
}

function CalendarEventWithHover({ eventInfo }: { eventInfo: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const { extendedProps } = eventInfo.event;
    const colors = EVENT_COLORS[extendedProps.type || 'viewing'];

    // Close popover when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(e.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    // Close with Escape key
    useEffect(() => {
        function handleEscape(e: KeyboardEvent) {
            if (e.key === 'Escape') setIsOpen(false);
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen]);

    const handleNavigate = (mode: 'view' | 'edit') => {
        const type = extendedProps.type;
        const id = eventInfo.event.id;

        setIsOpen(false); // Close popover before navigating

        if (type === 'viewing') {
            router.push(`/admin/viewings/${id}${mode === 'edit' ? '/edit' : ''}`);
        } else if (type === 'notary') {
            router.push(`/admin/deals/${id}`);
        } else if (type === 'deadline') {
            console.log(`${mode} task ${id}`);
        }
    };

    const getTypeLabel = () => {
        switch (extendedProps.type) {
            case 'viewing': return 'Visning';
            case 'meeting': return 'Möte';
            case 'notary': return 'Notarie';
            case 'deadline': return 'Deadline';
            default: return 'Händelse';
        }
    };

    return (
        <>
            {/* Event Card - CLICKABLE */}
            <div
                ref={triggerRef}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className={`
                    h-full p-1.5 overflow-hidden flex flex-col border-l-4 
                    ${colors?.border || 'border-l-blue-500'} 
                    ${colors?.bg || 'bg-blue-50'}
                    hover:shadow-md transition-all cursor-pointer
                    ${isOpen ? 'ring-2 ring-[#1a365d] shadow-lg' : ''}
                `}
            >
                <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-700">{eventInfo.timeText}</span>
                </div>

                {extendedProps.property ? (
                    <div className="text-xs font-semibold text-slate-800 truncate mt-0.5">
                        {extendedProps.property.ref} • {extendedProps.property.fullTitle || extendedProps.property.title}
                    </div>
                ) : extendedProps.description ? (
                    <div className="text-xs font-semibold text-slate-800 truncate mt-0.5">
                        {extendedProps.description}
                    </div>
                ) : (
                    <div className="text-xs font-semibold text-slate-800 truncate mt-0.5">
                        {eventInfo.event.title}
                    </div>
                )}

                {/* Client */}
                <div className="text-[10px] text-slate-600 truncate flex items-center gap-1 mt-auto">
                    <User className="w-3 h-3" />
                    {extendedProps.lead ? `${extendedProps.lead.firstName} ${extendedProps.lead.lastName}` : (extendedProps.type === 'deadline' ? 'Ingen kontakt' : 'Kund')}
                </div>
            </div>


            {/* POPOVER MODAL - Rendered via Portal to document.body */}
            {isOpen && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
                    {/* Backdrop - darker to make active event more visible */}
                    <div className="absolute inset-0 bg-black/30" />

                    {/* Popover content */}
                    <div
                        ref={popoverRef}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-md bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden"
                        style={{ animation: 'scale-in 0.15s ease-out' }}
                    >
                        {/* Header with close button */}
                        <div className={`${colors.bg} px-4 py-3 border-b flex items-center justify-between`}>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className={`w-3 h-3 rounded-full ${colors.dot}`} />
                                    <span className="font-semibold text-slate-800 uppercase text-xs tracking-wide">
                                        {getTypeLabel()}
                                    </span>
                                </div>
                                <div className="text-sm text-slate-600 mt-1 flex items-center gap-1.5">
                                    <CalendarIcon className="w-3.5 h-3.5" />
                                    {eventInfo.timeText}
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 hover:bg-black/10 rounded-full transition-colors flex-shrink-0"
                                aria-label="Stäng"
                            >
                                <ExternalLink className="w-5 h-5 text-slate-600 rotate-45" />
                            </button>
                        </div>

                        {/* Property Info */}
                        {extendedProps.property ? (
                            <div className="px-4 py-3 border-b border-slate-50">
                                <div className="font-bold text-slate-800 text-sm">
                                    {extendedProps.property.ref} • {extendedProps.property.fullTitle || extendedProps.property.title}
                                </div>
                                <div className="text-xs text-slate-500 mt-1">
                                    {extendedProps.property.price && new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(extendedProps.property.price)}
                                    {extendedProps.property.beds && ` • ${extendedProps.property.beds} sov`}
                                    {extendedProps.property.features && ` • ${(extendedProps.property.features || "").split('•')[2] || 'Pool'}`}
                                </div>
                                {extendedProps.property.location && (
                                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {extendedProps.property.location}
                                    </div>
                                )}
                            </div>
                        ) : extendedProps.description ? (
                            <div className="px-4 py-3 border-b border-slate-50">
                                <div className="text-sm text-slate-700 whitespace-pre-wrap">
                                    {extendedProps.description}
                                </div>
                            </div>
                        ) : null}

                        {/* Client Info */}
                        {extendedProps.lead && (
                            <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/30">
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                                    <User className="w-3.5 h-3.5 text-slate-400" />
                                    <span>{extendedProps.lead.firstName} {extendedProps.lead.lastName}</span>
                                </div>
                                {extendedProps.lead.phone && (
                                    <div className="flex items-center gap-2 text-xs mt-1.5 pl-0.5">
                                        <Phone className="w-3 h-3 text-slate-400" />
                                        <a href={`tel:${extendedProps.lead.phone}`} className="text-slate-600 hover:text-[#1a365d] hover:underline">
                                            {extendedProps.lead.phone}
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Location / Meeting Point */}
                        {extendedProps.meetingPoint && !extendedProps.property?.location && (
                            <div className="px-4 py-3 border-b border-slate-50">
                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                    <MapPin className="w-3 h-3 text-slate-400" />
                                    <span>{extendedProps.meetingPoint}</span>
                                </div>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(extendedProps.meetingPoint)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-[10px] text-[#1a365d] hover:underline mt-1.5 ml-5"
                                >
                                    <ExternalLink className="w-3 h-3" />
                                    Öppna karta
                                </a>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="px-4 py-4 bg-slate-50 flex gap-3">
                            <button
                                onClick={(e) => { e.stopPropagation(); handleNavigate('view'); }}
                                className="flex-1 px-4 py-2.5 text-sm font-medium bg-white border border-slate-200 hover:bg-slate-100 rounded-lg flex items-center justify-center gap-2 transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Visa detaljer
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleNavigate('edit'); }}
                                className="flex-1 px-4 py-2.5 text-sm font-medium bg-[#1a365d] text-white hover:bg-[#2d4a7c] rounded-lg flex items-center justify-center gap-2 transition-colors"
                            >
                                <Clock className="w-4 h-4" />
                                Redigera
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}

function SidebarEventCard({ event, showDate = false }: { event: any, showDate?: boolean }) {
    const colors = EVENT_COLORS[event.extendedProps?.type || event.type || 'other'] || EVENT_COLORS.other;
    const property = event.property || event.extendedProps?.property;
    const lead = event.lead || event.extendedProps?.lead;
    const description = event.description || event.extendedProps?.description;

    return (
        <div className={`p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-300 cursor-pointer transition-all group ${colors.bg ? '' : ''}`}>
            {showDate && (
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                    {format(new Date(event.start || event.scheduledAt), 'EEE d MMM', { locale: sv })}
                </div>
            )}
            <div className="flex items-center gap-2 mb-1.5">
                <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                <span className="text-xs font-bold text-slate-700">
                    {format(new Date(event.start || event.scheduledAt), 'HH:mm')} - {format(new Date(event.end || new Date(new Date(event.scheduledAt).getTime() + 60 * 60000)), 'HH:mm')}
                </span>
            </div>
            {property ? (
                <div className="text-xs font-medium text-slate-800 mb-0.5 group-hover:text-[#1a365d] transition-colors truncate">
                    {property.ref} • {property.fullTitle || property.title}
                </div>
            ) : (
                <div className="text-xs font-medium text-slate-800 mb-0.5 group-hover:text-[#1a365d] transition-colors truncate">
                    {event.title || 'Händelse'}
                </div>
            )}

            {property?.location ? (
                <div className="text-[10px] text-slate-500 flex items-center gap-1 mb-1 truncate">
                    <MapPin className="w-2.5 h-2.5" />
                    {property.location}
                </div>
            ) : description ? (
                <div className="text-[10px] text-slate-500 mb-1 line-clamp-1">
                    {description}
                </div>
            ) : null}

            <div className="text-xs text-slate-500 flex items-center gap-1">
                <User className="w-3 h-3" />
                {lead ? `${lead.firstName} ${lead.lastName}` : (event.extendedProps?.type === 'deadline' ? 'Ingen kontakt' : 'Okänd')}
            </div>
        </div>
    );
}




function MiniMonthCalendar({ onDateSelect }: { onDateSelect: (date: string) => void }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Fill padding days
    const startPadding = Array(getDay(monthStart) === 0 ? 6 : getDay(monthStart) - 1).fill(null);

    return (
        <div className="bg-white rounded-lg border border-slate-100 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#1a365d]" />
                    {format(currentMonth, 'MMMM yyyy', { locale: sv }).replace(/^\w/, c => c.toUpperCase())}
                </h3>
                <div className="flex gap-1">
                    <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 hover:bg-slate-100 rounded text-slate-500">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 hover:bg-slate-100 rounded text-slate-500">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                {['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].map(day => (
                    <div key={day} className="py-1 text-slate-400 font-medium">{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {startPadding.map((_, i) => <div key={`pad-${i}`} />)}
                {days.map(day => {
                    const isTodayDate = isToday(day);
                    return (
                        <button
                            key={day.toISOString()}
                            onClick={() => onDateSelect(format(day, 'yyyy-MM-dd'))}
                            className={`
                                py-1.5 rounded-full text-xs font-medium relative transition-colors
                                ${isTodayDate ? 'bg-[#1a365d] text-white' : 'text-slate-700 hover:bg-slate-100'}
                            `}
                        >
                            {format(day, 'd')}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
