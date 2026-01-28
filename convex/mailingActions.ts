"use node";

import { action } from "./_generated/server";
import { internal, api } from "./_generated/api";
import { v } from "convex/values";
import { Resend } from "resend";
import { PropertyMailingEmail } from "./emails/PropertyMailingEmail";

export const sendMailing = action({
    args: { mailingId: v.id("propertyMailings") },
    handler: async (ctx, { mailingId }) => {
        const mailing = await ctx.runQuery(api.propertyMailings.getById, { id: mailingId });
        if (!mailing || !mailing.createdByUser) throw new Error("Mailing or Sender not found");

        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            console.error("RESEND_API_KEY is not set");
            return { success: false, error: "Configuration Error" };
        }

        const resend = new Resend(resendApiKey);

        // Domain Logic
        const VERIFIED_DOMAIN = "resend.spanienfastigheter.se";
        // === GET USER PROFILE FOR SIGNATURE ===
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated call to action");
        }

        // Use internal query
        const user = await ctx.runQuery(internal.users.getByClerkIdInternal, { clerkId: identity.subject });

        const signature = {
            name: user?.displayName || user?.name || "Spanienfastigheter",
            title: user?.title || "Fastighetsmäklare",
            phone: user?.phone || "+46 708 62 52 53",
            email: user?.emailPublic || user?.email || "info@spanienfastigheter.se",
            initials: user?.initials || (user?.displayName || "SF").split(' ').map(n => n[0]).join('').substring(0, 2) || "SF",
            avatarUrl: user?.avatarUrl || user?.avatar,
        };

        const senderName = signature.name;
        const fromAddressWithProfile = `${signature.name} <marcus@resend.spanienfastigheter.se>`;

        const APP_URL = process.env.SITE_URL || (process.env.NODE_ENV === "production"
            ? "https://spanienfastigheter.se"
            : "http://localhost:3000");

        // === PDF GENERATION ===
        let attachments: any[] = [];
        if (mailing.includePdf) {
            try {
                const pdfUrl = `${APP_URL}/api/pdf/mailing/${mailingId}`;
                console.log(`[SendMailing] Fetching PDF from: ${pdfUrl}`);

                if (APP_URL.includes("localhost")) {
                    console.warn("[SendMailing] ⚠️ PDF Generation skipped: Cannot fetch from localhost within cloud environment.");
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
            }
        }

        console.log(`[SendMailing] Sender: ${senderName} <${mailing.createdByUser.email}> via ${VERIFIED_DOMAIN}`);

        try {
            // Using React Email Component
            const data = await resend.emails.send({
                from: fromAddressWithProfile,
                replyTo: signature.email,
                to: mailing.recipientEmail,
                subject: mailing.subject,
                react: PropertyMailingEmail({
                    subject: mailing.subject,
                    personalMessage: mailing.personalMessage,
                    properties: mailing.properties?.map((p: any) => ({
                        // Allow optional properties with safe defaults or types
                        _id: p._id,
                        externalId: p.externalId,
                        ref: p.ref,
                        type: p.type,
                        price: p.price,
                        beds: p.beds,
                        baths: p.baths,
                        built: p.built,
                        terraceSize: p.terraceSize,
                        town: p.town,
                        province: p.province,
                        locationDetail: p.locationDetail,
                        newBuild: p.newBuild,
                        images: p.images,
                        beachDistance: p.beachDistance,
                    })) || [],
                    signature: {
                        name: signature.name,
                        title: signature.title,
                        phone: signature.phone,
                        email: signature.email,
                        avatarUrl: signature.avatarUrl,
                        initials: signature.initials,
                    },
                    config: {
                        appUrl: APP_URL,
                        mailingId: mailingId,
                    }
                }),
                attachments: attachments,
                tags: [
                    { name: 'mailing_id', value: mailingId },
                    { name: 'lead_id', value: mailing.leadId },
                    { name: 'agent_id', value: mailing.createdById },
                ],
            });

            console.log("[SendMailing] Success! ID:", data.data?.id);

            await ctx.runMutation(api.propertyMailings.updateStatus, {
                id: mailingId,
                status: 'sent',
                sentAt: new Date().toISOString(),
                resendMessageId: data.data?.id,
                ...(mailing.includePdf && { pdfGeneratedAt: new Date().toISOString() })
            });

            return { success: true, id: data.data?.id };
        } catch (error: any) {
            console.error("[SendMailing] Resend API Error:", error);
            await ctx.runMutation(api.propertyMailings.updateStatus, {
                id: mailingId,
                status: 'failed',
                error: error.message || "Unknown error"
            });
            throw error;
        }
    },
});
