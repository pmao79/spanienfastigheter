'use server';

import { Resend } from 'resend';
import BookingConfirmation from '../../emails/templates/customer/BookingConfirmation';
import CompanyNotification from '../../emails/templates/company/Notification';

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    date?: string; // Optional if collected
}

export async function sendBookingConfirmation(data: BookingFormData) {
    const fullName = `${data.firstName} ${data.lastName}`;

    try {
        // 1. Send Customer Email
        await resend.emails.send({
            from: 'Spanienfastigheter <noreply@resend.spanienfastigheter.se>',
            to: [data.email],
            subject: 'Tack för din förfrågan - Vi kontaktar dig inom 24h',
            react: BookingConfirmation({
                name: data.firstName,
                type: 'Telefon / Google Meet', // Assuming logic for type
                date: data.date
            }),
        });

        // 2. Send Company Notification
        await resend.emails.send({
            from: 'Spanienfastigheter System <noreply@resend.spanienfastigheter.se>',
            to: ['marcus@spanienfastigheter.se'],
            subject: `📞 Rådgivning - ${fullName}`,
            react: CompanyNotification({
                type: 'BOOKING',
                customerName: fullName,
                customerEmail: data.email,
                customerPhone: data.phone,
                details: {
                    'Önskat datum': data.date || 'Ej specifierat',
                }
            }),
        });

        return { success: true };
    } catch (error) {
        console.error('Error sending Booking emails:', error);
        return { success: false, error };
    }
}
