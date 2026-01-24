'use server';

import { Resend } from 'resend';
import VIPWelcome from '../../emails/templates/customer/VIPWelcome';
import CompanyNotification from '../../emails/templates/company/Notification';
import { getMatchingProperties } from '../../emails/utils/propertyMatcher';

const resend = new Resend(process.env.RESEND_API_KEY);

interface VIPFormData {
    name: string;
    email: string;
    phone: string;
    areas: string;
    type: string;
    budget: string;
}

export async function sendVIPWelcome(data: VIPFormData) {
    try {
        // 1. Find matching properties (stubbed logic for now)
        // In reality, logic to parse data.areas/budget and match against DB
        const matchingProperties = await getMatchingProperties({
            areas: [data.areas],
            propertyType: data.type
            // parse budget int...
        }, 3);

        // 2. Send Customer Email
        await resend.emails.send({
            from: 'Spanienfastigheter <noreply@resend.spanienfastigheter.se>',
            to: [data.email],
            subject: 'Välkommen till VIP Söktjänsten - Spanienfastigheter',
            react: VIPWelcome({
                name: data.name,
                preferences: {
                    areas: data.areas,
                    propertyType: data.type,
                    budget: data.budget
                },
                matchingProperties: matchingProperties as any // Type alignment needed if matching logic returns full properties
            }),
        });

        // 3. Send Company Notification
        await resend.emails.send({
            from: 'Spanienfastigheter System <noreply@resend.spanienfastigheter.se>',
            to: ['marcus@spanienfastigheter.se'],
            subject: `🏠 Ny VIP-bevakning - ${data.name}`,
            react: CompanyNotification({
                type: 'VIP',
                customerName: data.name,
                customerEmail: data.email,
                customerPhone: data.phone,
                details: {
                    'Område': data.areas,
                    'Typ': data.type,
                    'Budget': data.budget,
                }
            }),
        });

        return { success: true };
    } catch (error) {
        console.error('Error sending VIP emails:', error);
        return { success: false, error };
    }
}
