'use server';

import { Resend } from 'resend';
import ViewingRequest from '../../emails/templates/customer/ViewingRequest';
import CompanyNotification from '../../emails/templates/company/Notification';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ViewingFormData {
    name: string;
    email: string;
    phone: string;
    propertyId: string;
    propertyRef: string;
    propertyTitle: string;
    propertyLocation: string;
    propertyPrice: number;
    propertyImage: string;
    propertySlug: string;
    propertyType: string;
    propertyBeds: number;
    propertyBaths: number;
    propertyArea: number;
    viewingDate?: string;
    viewingTime?: string;
    viewingType?: string;
}

export async function sendViewingRequest(data: ViewingFormData) {
    try {
        // 1. Send Customer Email
        await resend.emails.send({
            from: 'Spanienfastigheter <noreply@resend.spanienfastigheter.se>',
            to: [data.email],
            subject: `Visningsförfrågan mottagen - ${data.propertyTitle}`,
            react: ViewingRequest({
                name: data.name,
                property: {
                    id: data.propertyId,
                    title: data.propertyTitle,
                    type: data.propertyType,
                    location: data.propertyLocation,
                    price: data.propertyPrice,
                    image: data.propertyImage,
                    beds: data.propertyBeds,
                    baths: data.propertyBaths,
                    area: data.propertyArea,
                    url: `https://spanienfastigheter.se/fastigheter/${data.propertySlug}` // Assuming base URL
                },
                viewingDate: data.viewingDate,
                viewingTime: data.viewingTime,
                viewingType: data.viewingType
            }),
        });

        // 2. Send Company Notification
        await resend.emails.send({
            from: 'Spanienfastigheter System <noreply@resend.spanienfastigheter.se>',
            to: ['marcus@spanienfastigheter.se'],
            subject: `👁️ Visning - ${data.name} - ${data.propertyTitle}`,
            react: CompanyNotification({
                type: 'VIEWING',
                customerName: data.name,
                customerEmail: data.email,
                customerPhone: data.phone,
                details: {
                    'Fastighet': data.propertyTitle,
                    'Plats': data.propertyLocation,
                    'Pris': `${data.propertyPrice} €`,
                    'Länk': `https://spanienfastigheter.se/fastigheter/${data.propertySlug}`,
                    ...(data.viewingDate ? {
                        'Önskat datum': data.viewingDate,
                        'Önskad tid': data.viewingTime,
                        'Typ': data.viewingType === 'video' ? 'Videovisning' : 'På plats'
                    } : {})
                }
            }),
        });

        return { success: true };
    } catch (error) {
        console.error('Error sending Viewing emails:', error);
        return { success: false, error };
    }
}
