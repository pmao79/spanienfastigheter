"use node";

import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { Resend } from "resend";

export const sendMailing = action({
    args: { mailingId: v.id("propertyMailings") },
    handler: async (ctx, { mailingId }) => {
        const mailing = await ctx.runQuery(internal.propertyMailings.getById, { id: mailingId });
        if (!mailing || !mailing.createdByUser) throw new Error("Mailing or Sender not found");

        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            console.error("RESEND_API_KEY is not set");
            return { success: false, error: "Configuration Error" };
        }

        const resend = new Resend(resendApiKey);

        // Domain Logic
        const VERIFIED_DOMAIN = "resend.spanienfastigheter.se";
        const senderEmail = mailing.createdByUser.email;
        const senderName = mailing.createdByUser.name || "Mäklare";

        let fromAddress = `${senderName} <info@${VERIFIED_DOMAIN}>`;
        let replyToAddress = senderEmail;

        // App URL for links (track clicks)
        // Check SITE_URL env var first (set in dashboard), otherwise guess based on environment.
        // Defaulting to localhost if not explicitly production to help with local testing.
        const APP_URL = process.env.SITE_URL || (process.env.NODE_ENV === "production"
            ? "https://spanienfastigheter.se"
            : "http://localhost:3000");

        // === PDF GENERATION ===
        let attachments: any[] = [];
        if (mailing.includePdf) {
            try {
                // Call our own Next.js API to generate PDF
                // Note: In production, this needs to be the public URL
                const pdfUrl = `${APP_URL}/api/pdf/mailing/${mailingId}`;
                console.log(`[SendMailing] Fetching PDF from: ${pdfUrl}`);

                // CRITICAL NOTE FOR PDF:
                // If APP_URL is localhost, this WILL FAIL in the cloud environment
                // because the cloud cannot see your local machine.
                // In that case, we log a warning but send the email without PDF.

                if (APP_URL.includes("localhost")) {
                    console.warn("[SendMailing] ⚠️ PDF Generation skipped: Cannot fetch from localhost within cloud environment. Use a public URL or Tunnel for PDF testing.");
                } else {
                    const pdfRes = await fetch(pdfUrl);
                    if (pdfRes.ok) {
                        const pdfBuffer = await pdfRes.arrayBuffer();
                        attachments.push({
                            filename: `fastighetsforslag.pdf`,
                            content: Buffer.from(pdfBuffer),
                        });
                        console.log(`[SendMailing] PDF attached successfully (${pdfBuffer.byteLength} bytes)`);
                    } else {
                        console.error(`[SendMailing] Failed to fetch PDF: ${pdfRes.status} ${pdfRes.statusText}`);
                    }
                }
            } catch (pdfError) {
                console.error(`[SendMailing] PDF Generation Validation Error:`, pdfError);
                // Don't block sending the email if PDF fails
            }
        }

        // === NEW PROFESSIONAL HTML ===
        const propertiesHtml = (mailing.properties || [])?.map((p: any) => {
            const propertyUrl = `https://spanienfastigheter.se/objekt/${p.externalId || p._id}`;
            const trackingUrl = `${APP_URL}/api/track/click?mailingId=${mailingId}&propertyId=${p._id}&redirect=${encodeURIComponent(propertyUrl)}`;

            return `
            <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; margin-bottom: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #f1f5f9;">
                ${p.images?.[0] ?
                    `<a href="${trackingUrl}" style="display: block; text-decoration: none;">
                    <img src="${p.images[0]}" alt="${p.title}" style="width: 100%; height: 260px; object-fit: cover; display: block;" />
                </a>` : ''
                }
                <div style="padding: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                        <div>
                            <h3 style="margin: 0; color: #1a365d; font-family: 'Times New Roman', serif; font-size: 20px; font-weight: bold;">
                                ${p.type} i ${p.town}
                            </h3>
                            <p style="margin: 4px 0 0; color: #64748b; font-size: 14px;">${p.province}</p>
                        </div>
                        <div style="text-align: right;">
                            <p style="margin: 0; color: #0f172a; font-weight: bold; font-size: 18px;">${Number(p.price).toLocaleString()} €</p>
                            <p style="margin: 4px 0 0; color: #94a3b8; font-size: 12px;">Ref: ${p.ref || p.externalId}</p>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 16px; margin-bottom: 20px; color: #475569; font-size: 14px;">
                        <span style="display: flex; align-items: center; gap: 4px;">🛏️ ${p.beds} sov</span>
                        <span style="display: flex; align-items: center; gap: 4px;">🚿 ${p.baths} bad</span>
                        <span style="display: flex; align-items: center; gap: 4px;">📐 ${p.built} m²</span>
                    </div>

                    <a href="${trackingUrl}" style="display: block; width: 100%; text-align: center; padding: 14px 0; background-color: #1a365d; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">
                        Se alla bilder & detaljer
                    </a>
                </div>
            </div>
        `}).join("");

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
                <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                    
                    <!-- Header -->
                    <div style="text-align: center; margin-bottom: 40px;">
                         <div style="font-family: 'Times New Roman', serif; color: #1a365d; font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
                            Spanienfastigheter
                        </div>
                        <p style="margin: 8px 0 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                            Exklusivt urval för dig
                        </p>
                    </div>

                    <!-- Personal Message -->
                    <div style="background-color: #ffffff; padding: 32px; border-radius: 12px; margin-bottom: 32px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                        <h1 style="color: #0f172a; font-size: 22px; margin-top: 0; margin-bottom: 20px; font-weight: bold;">
                            ${mailing.subject}
                        </h1>
                        <div style="color: #334155; line-height: 1.7; font-size: 16px; white-space: pre-line;">
                            ${mailing.personalMessage}
                        </div>
                    </div>

                    <!-- Properties -->
                    <div>
                        ${propertiesHtml}
                    </div>

                    <!-- Footer -->
                    <div style="text-align: center; margin-top: 48px; border-top: 1px solid #e2e8f0; padding-top: 32px;">
                        <img src="${mailing.createdByUser?.avatar || 'https://spanienfastigheter.se/placeholder-avatar.jpg'}" 
                             style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover; margin-bottom: 16px;" 
                             alt="${senderName}"
                        />
                        <p style="margin: 0 0 4px; color: #0f172a; font-weight: bold; font-size: 16px;">${senderName}</p>
                        <p style="margin: 0 0 24px; color: #64748b; font-size: 14px;">Fastighetsmäklare</p>
                        
                        <div style="margin-bottom: 24px;">
                            <a href="mailto:${senderEmail}" style="color: #1a365d; text-decoration: none; font-weight: 500; margin: 0 10px;">Reply</a>
                            <a href="https://spanienfastigheter.se" style="color: #1a365d; text-decoration: none; font-weight: 500; margin: 0 10px;">Website</a>
                        </div>
                        
                        <p style="color: #94a3b8; font-size: 12px; line-height: 1.5; margin: 0;">
                            © ${new Date().getFullYear()} Spanienfastigheter SE.<br/>
                            Detta meddelande är personligt riktat till dig.
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `;

        // DEBUG LOGGING
        console.log(`[SendMailing] Sender: ${senderName} <${senderEmail}> via ${VERIFIED_DOMAIN}`);

        try {
            const data = await resend.emails.send({
                from: fromAddress,
                replyTo: replyToAddress,
                to: mailing.recipientEmail,
                subject: mailing.subject,
                html: html,
                attachments: attachments, // Using the array we built
                tags: [
                    { name: 'mailing_id', value: mailingId },
                    { name: 'lead_id', value: mailing.leadId },
                    { name: 'agent_id', value: mailing.createdById },
                ],
            });

            console.log("[SendMailing] Success! ID:", data.data?.id);

            await ctx.runMutation(internal.propertyMailings.updateStatus, {
                id: mailingId,
                status: 'sent',
                sentAt: new Date().toISOString(),
                resendMessageId: data.data?.id,
                // Log PDF generation if it happened
                ...(mailing.includePdf && { pdfGeneratedAt: new Date().toISOString() })
            });

            return { success: true, id: data.data?.id };
        } catch (error: any) {
            console.error("[SendMailing] Resend API Error:", error);
            await ctx.runMutation(internal.propertyMailings.updateStatus, {
                id: mailingId,
                status: 'failed',
                error: error.message || "Unknown error"
            });
            throw error;
        }
    },
});
