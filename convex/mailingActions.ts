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

        // === SMART SENDER LOGIC ===
        // 1. Verify Domain: We can only send from @spanienfastigheter.se
        // 2. If Agent has company email -> Send FROM Agent
        // 3. If Agent has external email (gmail etc) -> Send FROM info@... and Reply-To Agent

        const COMPANY_DOMAIN = "spanienfastigheter.se";
        const VERIFIED_DOMAIN = "resend.spanienfastigheter.se";

        const senderEmail = mailing.createdByUser.email;
        const senderName = mailing.createdByUser.name || "Mäklare";

        // Always send FROM the verified domain to ensure delivery.
        // We use the agent's name but the system's email address.
        // "Marcus <info@resend.spanienfastigheter.se>"
        let fromAddress = `${senderName} <info@${VERIFIED_DOMAIN}>`;

        // Replies should go to the agent's actual email
        let replyToAddress = senderEmail;

        /* 
        // OLD LOGIC (Saved for reference if we verify root domain later)
        // if (senderEmail && senderEmail.endsWith(COMPANY_DOMAIN)) { ... }
        */

        // Generate HTML (unchanged logic, could use a helper)
        const propertiesHtml = (mailing.properties || [])?.map((p: any) => `
            <div style="border: 1px solid #e2e8f0; padding: 20px; margin-bottom: 24px; border-radius: 12px; background-color: #ffffff;">
                ${p.images?.[0] ?
                `<img src="${p.images[0]}" style="width: 100%; height: 240px; object-fit: cover; border-radius: 8px; margin-bottom: 16px;" />` : ''
            }
                <h3 style="color: #1a365d; margin: 0 0 8px 0; font-size: 18px;">${p.town}, ${p.province}</h3>
                <p style="margin: 0 0 16px 0; font-weight: bold; font-size: 16px; color: #0f172a;">${Number(p.price).toLocaleString()} €</p>
                <p style="margin: 0 0 20px 0; color: #64748b; font-size: 14px;">${p.type} • ${p.beds} sov • ${p.baths} bad • ${p.built} m²</p>
                <a href="https://spanienfastigheter.se/objekt/${p.externalId || p._id}" style="display: inline-block; padding: 12px 24px; background-color: #1a365d; color: white; text-decoration: none; border-radius: 6px; font-weight: 500;">Se hela objektet</a>
            </div>
        `).join("");

        const html = `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 40px 20px;">
                <div style="background-color: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                    <div style="text-align: center; margin-bottom: 32px;">
                        <img src="https://spanienfastigheter.se/logo.png" alt="Spanienfastigheter" style="height: 40px;" />
                    </div>
                    
                    <h1 style="color: #1a365d; font-size: 24px; margin-bottom: 24px;">${mailing.subject}</h1>
                    <div style="color: #334155; line-height: 1.6; font-size: 16px; white-space: pre-line; margin-bottom: 32px;">
                        ${mailing.personalMessage}
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
                    
                    <div style="margin-bottom: 32px;">
                        ${propertiesHtml}
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
                    
                    <div style="text-align: center; color: #64748b; font-size: 14px;">
                        <p style="margin-bottom: 8px;">Skickades av <strong>${senderName}</strong></p>
                        <p style="margin: 0;">Spanienfastigheter API</p>
                    </div>
                </div>
            </div>
        `;

        // DEBUG LOGGING
        console.log(`[SendMailing] Attempting to send mailing ${mailingId}`);
        console.log(`[SendMailing] Sender: ${senderName} <${senderEmail}>`);
        console.log(`[SendMailing] Using From: ${fromAddress}, ReplyTo: ${replyToAddress}`);

        if (!resendApiKey) {
            console.error("[SendMailing] RESEND_API_KEY is missing!");
            return { success: false, error: "Configuration Error: No API Key" };
        }

        try {
            const data = await resend.emails.send({
                from: fromAddress,
                replyTo: replyToAddress,
                to: mailing.recipientEmail,
                subject: mailing.subject,
                html: html,
                tags: [
                    { name: 'mailing_id', value: mailingId },
                    { name: 'lead_id', value: mailing.leadId },
                    { name: 'agent_id', value: mailing.createdById },
                ],
            });

            console.log("[SendMailing] Resend Response:", JSON.stringify(data, null, 2));

            if (data.error) {
                console.error("[SendMailing] Error response from Resend:", data.error);
                await ctx.runMutation(internal.propertyMailings.updateStatus, {
                    id: mailingId,
                    status: 'failed',
                });
                return { success: false, error: data.error };
            }

            console.log(`[SendMailing] Success! ID: ${data.data?.id}`);

            await ctx.runMutation(internal.propertyMailings.updateStatus, {
                id: mailingId,
                status: 'sent',
                sentAt: new Date().toISOString(),
                resendMessageId: data.data?.id,
            });

            return { success: true, id: data.data?.id };
        } catch (error: any) {
            console.error("[SendMailing] Exception caught:", error);
            await ctx.runMutation(internal.propertyMailings.updateStatus, {
                id: mailingId,
                status: 'failed',
            });
            throw error;
        }
    },
});
