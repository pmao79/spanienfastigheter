'use client';

import { useState } from 'react';
import { X, Calendar, Clock, Check, ChevronLeft, ChevronRight, User, Mail, Phone, MapPin } from 'lucide-react';
import { Property } from '@/types/property';
import { sendViewingRequest } from '@/actions/email/send-viewing';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    property: Property;
}

export default function BookingModal({ isOpen, onClose, property }: BookingModalProps) {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [viewingType, setViewingType] = useState<'physical' | 'video'>('physical');

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Simple calendar logic
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    if (!isOpen) return null;

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        let day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return day === 0 ? 6 : day - 1; // Adjust for Monday start
    };

    const days = Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => i + 1);
    const skipDays = Array.from({ length: getFirstDayOfMonth(currentMonth) }, (_, i) => i);

    const handleDateClick = (day: number) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(date);
    };

    const timeSlots = [
        '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
    ];

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-navy/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="bg-white w-full max-w-2xl overflow-hidden rounded-lg shadow-2xl relative z-10 flex flex-col animate-fade-in-up max-h-[90vh]">
                {/* Header */}
                <div className="p-6 md:p-8 bg-navy text-white flex justify-between items-start relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-sand text-[10px] uppercase tracking-[0.25em] font-bold animate-fade-in">
                                Boka Visning
                            </span>
                            <span className="text-white/50 text-[10px] uppercase tracking-widest font-medium border-l border-white/20 pl-3">
                                Ref: {property.ref}
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif leading-tight mb-2">
                            {property.type} i {property.town}
                        </h2>
                        <div className="flex items-center gap-2 text-white/70 text-sm font-light">
                            <MapPin size={14} className="text-sand" />
                            {property.town}, {property.region === 'costa-del-sol' ? 'Costa del Sol' : 'Costa Blanca'}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-20"
                    >
                        <X size={20} />
                    </button>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full">
                        <div
                            className="h-full bg-sand transition-all duration-500 ease-out"
                            style={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 overflow-y-auto bg-alabaster/30">
                    {step === 1 && (
                        <div className="space-y-8 animate-slide-in-right">
                            {/* Viewing Type */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setViewingType('physical')}
                                    className={`p-4 rounded-lg border transition-all text-center flex flex-col items-center gap-3 group ${viewingType === 'physical' ? 'bg-white border-navy shadow-md' : 'bg-transparent border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${viewingType === 'physical' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                                        <MapPin size={18} />
                                    </div>
                                    <span className={`text-sm font-bold uppercase tracking-wider ${viewingType === 'physical' ? 'text-navy' : 'text-gray-400'}`}>På Plats</span>
                                </button>
                                <button
                                    onClick={() => setViewingType('video')}
                                    className={`p-4 rounded-lg border transition-all text-center flex flex-col items-center gap-3 group ${viewingType === 'video' ? 'bg-white border-navy shadow-md' : 'bg-transparent border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${viewingType === 'video' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                                        <Phone size={18} />
                                    </div>
                                    <span className={`text-sm font-bold uppercase tracking-wider ${viewingType === 'video' ? 'text-navy' : 'text-gray-400'}`}>Videovisning</span>
                                </button>
                            </div>

                            {/* Calendar */}
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-serif text-navy">Välj datum</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                                            className="p-1 hover:bg-gray-200 rounded-full text-navy transition-colors"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <span className="text-sm font-medium w-32 text-center text-charcoal">
                                            {currentMonth.toLocaleDateString('sv-SE', { month: 'long', year: 'numeric' })}
                                        </span>
                                        <button
                                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                                            className="p-1 hover:bg-gray-200 rounded-full text-navy transition-colors"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-2 mb-2">
                                    {['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].map(d => (
                                        <div key={d} className="text-center text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                                            {d}
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    {skipDays.map(d => <div key={`skip-${d}`} />)}
                                    {days.map(d => {
                                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
                                        const isSelected = selectedDate?.toDateString() === date.toDateString();
                                        const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

                                        return (
                                            <button
                                                key={d}
                                                disabled={isPast}
                                                onClick={() => handleDateClick(d)}
                                                className={`
                                                    aspect-square flex items-center justify-center rounded-md text-sm font-medium transition-all
                                                    ${isSelected ? 'bg-navy text-white shadow-md' : 'bg-white hover:bg-sand/20 text-charcoal'}
                                                    ${isPast ? 'opacity-30 cursor-not-allowed hover:bg-white' : ''}
                                                `}
                                            >
                                                {d}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Time Slots */}
                            {selectedDate && (
                                <div className="animate-fade-in">
                                    <h3 className="text-lg font-serif text-navy mb-4">Välj tid</h3>
                                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                                        {timeSlots.map(time => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`
                                                    py-2 px-3 rounded-md text-sm font-medium border transition-all
                                                    ${selectedTime === time
                                                        ? 'bg-navy border-navy text-white shadow-md'
                                                        : 'bg-white border-gray-200 text-charcoal hover:border-sand'}
                                                `}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-slide-in-right">
                            <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-sand/10 rounded-full flex items-center justify-center text-navy shrink-0">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Vald tid</p>
                                    <p className="font-serif text-lg text-navy">
                                        {selectedDate?.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' })} kl {selectedTime}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setStep(1)}
                                    className="ml-auto text-xs text-sand font-bold uppercase tracking-wider hover:text-navy transition-colors"
                                >
                                    Ändra
                                </button>
                            </div>

                            <h3 className="text-xl font-serif text-navy">Dina kontaktuppgifter</h3>

                            <div className="space-y-4">
                                <div className="space-y-1 group">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold group-focus-within:text-navy transition-colors flex items-center gap-2">
                                        <User size={12} /> Namn
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-white border-b border-gray-200 px-0 py-3 text-base outline-none focus:border-navy transition-all placeholder:text-gray-300 text-charcoal"
                                        placeholder="För- och efternamn"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-1 group">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold group-focus-within:text-navy transition-colors flex items-center gap-2">
                                            <Mail size={12} /> E-post
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-white border-b border-gray-200 px-0 py-3 text-base outline-none focus:border-navy transition-all placeholder:text-gray-300 text-charcoal"
                                            placeholder="din@email.se"
                                        />
                                    </div>
                                    <div className="space-y-1 group">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold group-focus-within:text-navy transition-colors flex items-center gap-2">
                                            <Phone size={12} /> Telefon
                                        </label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full bg-white border-b border-gray-200 px-0 py-3 text-base outline-none focus:border-navy transition-all placeholder:text-gray-300 text-charcoal"
                                            placeholder="+46..."
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1 group pt-4">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold group-focus-within:text-navy transition-colors">
                                        Ev. meddelande (frivilligt)
                                    </label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-md p-4 text-sm outline-none focus:border-navy transition-all placeholder:text-gray-300 min-h-[100px] text-charcoal resize-none"
                                        placeholder="Är det något särskilt du undrar över inför visningen?"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in-up">
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-green-200 animate-bounce-subtle">
                                <Check size={32} strokeWidth={3} />
                            </div>
                            <h3 className="text-3xl font-serif text-navy mb-4">Tack för din bokning!</h3>
                            <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
                                Vi har mottagit din förfrågan om visning. En mäklare kommer att bekräfta tiden inom kort via e-post eller telefon.
                            </p>
                            <div className="bg-alabaster p-6 rounded-lg w-full max-w-sm border border-gray-100 mb-8">
                                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Bokningsdetaljer</p>
                                <p className="font-serif text-xl text-navy mb-1">{property.type} i {property.town}</p>
                                <p className="text-xs text-navy/60 font-medium mb-3">Ref: {property.ref}</p>
                                <p className="text-sm text-gray-600">
                                    {selectedDate?.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' })} kl {selectedTime}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="bg-navy text-white px-8 py-3 uppercase tracking-widest text-xs font-bold rounded-md hover:bg-charcoal transition-colors"
                            >
                                Stäng fönstret
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {step < 3 && (
                    <div className="p-6 bg-white border-t border-gray-100 flex justify-between items-center z-20">
                        {step === 2 ? (
                            <button
                                onClick={() => setStep(1)}
                                className="text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-navy transition-colors flex items-center gap-2"
                            >
                                <ChevronLeft size={16} /> Tillbaka
                            </button>
                        ) : (
                            <div></div> // Spacer
                        )}

                        <button
                            onClick={async () => {
                                if (step === 1 && selectedDate && selectedTime) {
                                    setStep(2);
                                } else if (step === 2) {
                                    // Submit
                                    setIsLoading(true);
                                    try {
                                        const result = await sendViewingRequest({
                                            name,
                                            email,
                                            phone,
                                            propertyId: property.id,
                                            propertyRef: property.ref,
                                            propertyTitle: property.type + ' i ' + property.town,
                                            propertyLocation: property.town,
                                            propertyPrice: property.price,
                                            propertyImage: property.images?.[0] || '', // Fallback image handling
                                            propertySlug: property.slug,
                                            propertyType: property.type,
                                            propertyBeds: property.beds,
                                            propertyBaths: property.baths,
                                            propertyArea: property.builtArea,
                                            viewingType,
                                            viewingDate: selectedDate?.toLocaleDateString('sv-SE'),
                                            viewingTime: selectedTime || '',
                                        });

                                        if (result.success) {
                                            setStep(3);
                                        } else {
                                            alert('Något gick fel. Försök igen.');
                                        }
                                    } catch (error) {
                                        console.error(error);
                                        alert('Något gick fel. Försök igen.');
                                    } finally {
                                        setIsLoading(false);
                                    }
                                }
                            }}
                            disabled={(step === 1 && (!selectedDate || !selectedTime)) || (step === 2 && (!name || !email || !phone)) || isLoading}
                            className={`
                                px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold transition-all shadow-lg flex items-center gap-3
                                ${((step === 1 && (!selectedDate || !selectedTime)) || (step === 2 && (!name || !email || !phone)) || isLoading)
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                    : 'bg-navy text-white hover:bg-charcoal hover:-translate-y-0.5 hover:shadow-xl'}
                            `}
                        >
                            {isLoading ? 'Skickar...' : step === 1 ? 'Nästa steg' : 'Bekräfta Bokning'}
                            {step === 1 && !isLoading && <ArrowRightIcon className="w-4 h-4" />}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function ArrowRightIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}
