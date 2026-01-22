'use client';

import { useState } from 'react';
import { X, User, Mail, Phone, Send, MessageSquare } from 'lucide-react';
import { Property } from '@/types/property';
import Image from 'next/image';

interface ContactAgentModalProps {
    isOpen: boolean;
    onClose: () => void;
    property: Property;
}

export default function ContactAgentModal({ isOpen, onClose, property }: ContactAgentModalProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const contact = formData.get('contact') as string;
        const message = formData.get('message') as string;

        // Determine if contact is email or phone
        const isEmail = contact.includes('@');
        const payload = {
            name,
            email: isEmail ? contact : '',
            phone: !isEmail ? contact : '',
            message,
            propertyId: property.id,
            propertyRef: property.ref,
            propertyTitle: property.type + ' i ' + property.town
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                alert('Något gick fel. Försök igen.');
            }
        } catch (error) {
            console.error(error);
            alert('Något gick fel. Försök igen.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-navy/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="bg-white w-full max-w-lg overflow-hidden rounded-sm shadow-2xl relative z-10 animate-fade-in-up">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-gray-100 hover:bg-gray-200 text-charcoal rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                {!isSubmitted ? (
                    <div className="flex flex-col">
                        {/* Agent Header */}
                        <div className="bg-navy p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sand/10 rounded-full blur-2xl translate-x-10 -translate-y-10" />

                            <div className="flex items-center gap-6 relative z-10">
                                <div className="w-20 h-20 rounded-full border-2 border-white shadow-lg overflow-hidden shrink-0">
                                    <Image
                                        src="/images/marcus-ohlander.png"
                                        alt="Marcus Ohlander"
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-sand text-[10px] uppercase tracking-[0.2em] font-bold mb-1">Fastighetsmäklare</p>
                                    <h3 className="text-2xl font-serif leading-none mb-2">Marcus Ohlander</h3>
                                    <div className="flex items-center gap-4 text-xs font-medium text-white/70">
                                        <span className="flex items-center gap-1"><MessageSquare size={12} /> Svenska/Engelska</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Body */}
                        <div className="p-8">
                            <h4 className="text-xl font-serif text-navy mb-6">Kontakta mig om detta objekt</h4>
                            <p className="text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded-sm border border-gray-100 flex flex-col gap-1">
                                <span><span className="font-bold text-navy">Objekt:</span> {property.type} i {property.town} ({property.price.toLocaleString()} €)</span>
                                <span className="text-xs text-navy/60 font-medium">Ref: {property.ref}</span>
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-1 group">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold group-focus-within:text-navy transition-colors flex items-center gap-2">
                                        <User size={12} /> Namn
                                    </label>
                                    <input
                                        required
                                        name="name"
                                        type="text"
                                        className="w-full bg-white border-b border-gray-200 px-0 py-3 text-sm outline-none focus:border-navy transition-all placeholder:text-gray-300 text-charcoal"
                                        placeholder="Ditt namn"
                                    />
                                </div>
                                <div className="space-y-1 group">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold group-focus-within:text-navy transition-colors flex items-center gap-2">
                                        <Mail size={12} /> E-post / Telefon
                                    </label>
                                    <input
                                        required
                                        name="contact"
                                        type="text"
                                        className="w-full bg-white border-b border-gray-200 px-0 py-3 text-sm outline-none focus:border-navy transition-all placeholder:text-gray-300 text-charcoal"
                                        placeholder="Hur vill du bli kontaktad?"
                                    />
                                </div>
                                <div className="space-y-1 group">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold group-focus-within:text-navy transition-colors">
                                        Meddelande
                                    </label>
                                    <textarea
                                        required
                                        name="message"
                                        className="w-full bg-white border border-gray-200 rounded-sm p-3 text-sm outline-none focus:border-navy transition-all placeholder:text-gray-300 min-h-[100px] text-charcoal resize-none"
                                        defaultValue={`Hej! Jag är intresserad av ${property.type} i ${property.town} för ${property.price.toLocaleString()} €. Kontakta mig!`}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-navy text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-charcoal transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Skickar...' : (
                                        <>Skicka meddelande <Send size={14} className="group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="p-12 flex flex-col items-center justify-center text-center h-[500px]">
                        <div className="w-16 h-16 bg-navy text-sand rounded-full flex items-center justify-center mb-6 shadow-lg animate-fade-in-up">
                            <Send size={24} />
                        </div>
                        <h3 className="text-2xl font-serif text-navy mb-3 animate-fade-in-up delay-100">Tack för ditt meddelande!</h3>
                        <p className="text-gray-500 max-w-xs mx-auto mb-8 leading-relaxed animate-fade-in-up delay-200">
                            Jag har tagit emot din förfrågan och återkommer till dig så snart jag kan, oftast inom några timmar.
                        </p>
                        <button
                            onClick={onClose}
                            className="text-[10px] uppercase tracking-widest text-gray-400 font-bold hover:text-navy transition-colors animate-fade-in-up delay-300"
                        >
                            Stäng fönstret
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
