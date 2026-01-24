'use server';

import { Resend } from 'resend';
import NewsletterWelcome from '../../emails/templates/customer/NewsletterWelcome';
import CompanyNotification from '../../emails/templates/company/Notification';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeToNewsletter(email: string) {
    try {
        // 1. Send Customer Welcome Email
        await resend.emails.send({
            from: 'Spanienfastigheter <noreply@resend.spanienfastigheter.se>',
            to: [email],
            subject: 'Välkommen till Spanienfastigheters nyhetsbrev',
            react: NewsletterWelcome(),
        });

        // 2. Send Company Notification
        await resend.emails.send({
            from: 'Spanienfastigheter System <noreply@resend.spanienfastigheter.se>',
            to: ['marcus@spanienfastigheter.se'],
            subject: `📧 Nyhetsbrev - Ny prenumerant`,
            react: CompanyNotification({
                type: 'NEWSLETTER',
                customerName: 'Ny Prenumerant',
                customerEmail: email,
                customerPhone: '',
                details: {
                    'Källa': 'Footer Newsletter Form',
                    'Datum': new Date().toLocaleDateString('sv-SE')
                }
            }),
        });

        return { success: true };
    } catch (error) {
        console.error('Error sending Newsletter emails:', error);
        return { success: false, error };
    }
}
