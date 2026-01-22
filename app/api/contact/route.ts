import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message, propertyId, propertyTitle } = body;

        // Validate required fields
        if (!name || (!email && !phone) || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Here you would typically integrate with an email service like Resend, SendGrid, etc.
        // For now, we'll log the data to the console to simulate processing.
        console.log('--- Contact Form Submission ---');
        console.log('Property:', propertyTitle, `(${propertyId})`);
        console.log('From:', name);
        console.log('Contact:', email || 'N/A', phone || 'N/A');
        console.log('Message:', message);
        console.log('-------------------------------');

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return NextResponse.json({ success: true, message: 'Message sent' });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
