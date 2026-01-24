'use server';

import { Resend } from 'resend';
import ContactConfirmation from '../../emails/templates/customer/ContactConfirmation';
import CompanyNotification from '../../emails/templates/company/Notification';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    objectTitle?: string; // Optional context
}

export async function sendContactConfirmation(data: ContactFormData) {
    try {
        // 1. Send Customer Email
        await resend.emails.send({
            from: 'Spanienfastigheter <noreply@resend.spanienfastigheter.se>',
            to: [data.email],
            subject: 'Tack för ditt meddelande - Spanienfastigheter',
            react: ContactConfirmation({
                name: data.name,
                message: data.message,
                objectTitle: data.objectTitle
            }),
        });

        // 2. Send Company Notification
        await resend.emails.send({
            from: 'Spanienfastigheter System <noreply@resend.spanienfastigheter.se>',
            to: ['marcus@spanienfastigheter.se'],
            subject: `💬 Kontakt - ${data.name}`,
            react: CompanyNotification({
                type: 'CONTACT',
                customerName: data.name,
                customerEmail: data.email,
                customerPhone: data.phone,
                details: {
                    'Meddelande': data.message,
                    ...(data.objectTitle ? { 'Gäller objekt': data.objectTitle } : {})
                }
            }),
        });

        return { success: true };
    } catch (error) {
        console.error('Error sending Contact emails:', error);
        return { success: false, error };
    }
}
