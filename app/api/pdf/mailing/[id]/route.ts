import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: mailingId } = await params;
    const BROWSERLESS_API_KEY = process.env.BROWSERLESS_API_KEY;
    const APP_URL = process.env.NEXT_PUBLIC_CONVEX_URL?.replace('.convex.cloud', '.vercel.app') || 'http://localhost:3000';
    // Note: Localhost won't work for Browserless cloud. Needs public URL.
    // We'll rely on Vercel preview URLs or production URL in real env.
    // For testing locally without public URL, Browserless won't be able to reach localhost:3000.
    // Assuming this runs in a context where APP_URL is reachable.

    const targetUrl = `${APP_URL}/pdf/mailing/${mailingId}`;

    if (!BROWSERLESS_API_KEY) {
        return NextResponse.json({ error: "Missing Browserless API Key" }, { status: 500 });
    }

    try {
        const response = await fetch(`https://production-sfo.browserless.io/pdf?token=${BROWSERLESS_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: targetUrl,
                options: {
                    format: 'A4',
                    printBackground: true,
                    margin: {
                        top: '10mm',
                        right: '10mm',
                        bottom: '10mm',
                        left: '10mm'
                    }
                }
            })
        });

        if (!response.ok) {
            const err = await response.text();
            console.error("Browserless Error:", err);
            return NextResponse.json({ error: "Failed to generate PDF", details: err }, { status: 500 });
        }

        const pdfBuffer = await response.arrayBuffer();

        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="fastighetsforslag-${mailingId}.pdf"`,
            },
        });

    } catch (error) {
        console.error("PDF Generation Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
