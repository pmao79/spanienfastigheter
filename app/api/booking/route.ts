import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            viewingType,
            date,
            time,
            name,
            email,
            phone,
            message,
            propertyId,
            propertyTitle
        } = body;

        // Validate required fields
        if (!viewingType || !name || !email || !phone) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Here you would typically integrate with an email service or CRM.
        console.log('--- Booking Request ---');
        console.log('Property:', propertyTitle, `(${propertyId})`);
        console.log('Type:', viewingType);
        console.log('Date/Time:', date, time);
        console.log('Client:', name, email, phone);
        console.log('Message:', message);
        console.log('-----------------------');

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        return NextResponse.json({ success: true, message: 'Booking request sent' });
    } catch (error) {
        console.error('Booking API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
