import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    properties: defineTable({
        // Grund
        externalId: v.string(), // ID from XML
        ref: v.string(),
        type: v.string(),
        price: v.number(),
        currency: v.string(),
        beds: v.number(),
        baths: v.number(),
        built: v.number(),
        plot: v.optional(v.number()), // Plot might be missing for apartments

        // Geo
        province: v.string(),
        town: v.string(),
        locationDetail: v.optional(v.string()),
        region: v.optional(v.string()), // Derived from province/town
        latitude: v.optional(v.number()),
        longitude: v.optional(v.number()),

        // Features
        pool: v.boolean(),
        poolType: v.optional(v.string()), // "Private" | "Communal" | string
        beachDistance: v.optional(v.number()), // meters
        hasElevator: v.boolean(),
        hasParking: v.boolean(),
        parkingSpaces: v.optional(v.number()),
        hasAC: v.boolean(),
        hasGarden: v.boolean(),
        isGated: v.boolean(),
        hasStorage: v.boolean(),
        hasHeating: v.boolean(),
        nearGolf: v.boolean(),
        terraceSize: v.optional(v.number()),

        // Meta
        newBuild: v.boolean(),
        energyConsumption: v.optional(v.string()), // e.g., "A", "B"
        energyEmissions: v.optional(v.string()),
        images: v.array(v.string()),
        description: v.optional(v.string()), // Swedish description

        // Admin
        isFeatured: v.boolean(),
        featuredOrder: v.optional(v.number()),
        isHidden: v.boolean(),
        internalNotes: v.optional(v.string()),
        status: v.optional(v.union(
            v.literal("active"),
            v.literal("reserved"),
            v.literal("sold"),
            v.literal("paused"),
            v.literal("hidden")
        )),

        // Timestamps (in addition to _creationTime)
        createdAt: v.number(),
        updatedAt: v.optional(v.any()), // Relaxed for debugging
    })
        .index("by_externalId", ["externalId"])
        .index("by_ref", ["ref"])
        .index("by_region", ["region"])
        .index("by_province", ["province"])
        .index("by_town", ["town"])
        .index("by_type", ["type"])
        .index("by_price", ["price"])
        .index("by_status", ["status"])
        .index("by_featured", ["isFeatured", "featuredOrder"]), // Compound index for efficient featured fetching

    users: defineTable({
        email: v.string(),
        name: v.string(),
        phone: v.optional(v.string()),
        avatar: v.optional(v.string()),
        role: v.union(
            v.literal("owner"),
            v.literal("equity_partner"),
            v.literal("admin"),
            v.literal("sales_partner"),
            v.literal("agent"),
            v.literal("referral"),
            v.literal("customer")
        ),
        isActive: v.boolean(),
        clerkId: v.optional(v.string()),
        createdAt: v.string(),
        updatedAt: v.optional(v.any()),
    })
        .index("by_email", ["email"])
        .index("by_role", ["role"])
        .index("by_clerkId", ["clerkId"])
        .index("by_status", ["isActive"]), // Assuming isActive can be used as a status

    leads: defineTable({
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        phone: v.optional(v.string()),
        country: v.optional(v.string()), // Added to match existing data
        source: v.string(),
        status: v.string(), // "new", "contacted", "qualified", "lost", "won"
        notes: v.optional(v.string()),
        temperature: v.union(
            v.literal("cold"),
            v.literal("warm"),
            v.literal("hot")
        ),
        assignedToId: v.optional(v.id("users")),

        preferences: v.optional(v.object({
            minBudget: v.optional(v.number()),
            maxBudget: v.optional(v.number()),
            regions: v.optional(v.array(v.string())),
            propertyTypes: v.optional(v.array(v.string())),
            minBeds: v.optional(v.number()),
            notes: v.optional(v.string()),
        })),


        createdAt: v.string(),
        updatedAt: v.optional(v.any()),
        lastContactedAt: v.optional(v.string()),
        lastActivityAt: v.optional(v.string()), // Added to fix type error
    })
        .index("by_email", ["email"])
        .index("by_status", ["status"])
        .index("by_assignedTo", ["assignedToId"])
        .index("by_temperature", ["temperature"]),

    activityLog: defineTable({
        type: v.optional(v.string()), // "property_view", "lead_create", "status_change", etc.
        description: v.string(),
        userId: v.optional(v.id("users")), // Who did it
        meta: v.optional(v.any()), // Extra data like propertyId, leadId
        createdAt: v.string(),

        // Legacy fields - keeping for schema compatibility
        action: v.optional(v.string()),
        entityType: v.optional(v.string()),
        entityId: v.optional(v.string()),
    }).index("by_date", ["createdAt"]),

    communications: defineTable({
        leadId: v.id("leads"),
        userId: v.optional(v.id("users")), // Who sent/logged it
        type: v.union(
            v.literal("email_sent"),
            v.literal("email_received"),
            v.literal("call_outgoing"),
            v.literal("call_incoming"),
            v.literal("sms_sent"),
            v.literal("sms_received"),
            v.literal("whatsapp"),
            v.literal("meeting"),
            v.literal("note")
        ),
        subject: v.optional(v.string()),
        content: v.string(),
        templateId: v.optional(v.id("emailTemplates")),
        emailStatus: v.optional(v.union(
            v.literal("sent"),
            v.literal("delivered"),
            v.literal("opened"),
            v.literal("clicked"),
            v.literal("bounced")
        )),
        createdAt: v.string(),
    })
        .index("by_leadId", ["leadId"])
        .index("by_type", ["type"])
        .index("by_createdAt", ["createdAt"]),

    emailTemplates: defineTable({
        name: v.string(),
        subject: v.string(),
        body: v.string(),
        category: v.union(
            v.literal("welcome"),
            v.literal("follow_up"),
            v.literal("viewing_confirmation"),
            v.literal("property_matching"),
            v.literal("general")
        ),
        isActive: v.boolean(),
        createdAt: v.string(),
        updatedAt: v.optional(v.any()),
    })
        .index("by_category", ["category"])
        .index("by_isActive", ["isActive"]),

    tasks: defineTable({
        title: v.string(),
        description: v.optional(v.string()),
        leadId: v.optional(v.id("leads")),
        propertyId: v.optional(v.id("properties")),
        assignedToId: v.optional(v.id("users")),
        createdById: v.id("users"),
        priority: v.union(
            v.literal("low"),
            v.literal("medium"),
            v.literal("high"),
            v.literal("urgent")
        ),
        status: v.union(
            v.literal("todo"),
            v.literal("in_progress"),
            v.literal("done"),
            v.literal("cancelled")
        ),
        dueAt: v.optional(v.string()),
        completedAt: v.optional(v.string()),
        createdAt: v.string(),
        updatedAt: v.optional(v.any()), // Added to fix potential schema validation issues
    })
        .index("by_assignedTo", ["assignedToId"])
        .index("by_leadId", ["leadId"])
        .index("by_status", ["status"])
        .index("by_dueAt", ["dueAt"]),

    viewings: defineTable({
        // Kopplingar
        leadId: v.id("leads"),
        propertyIds: v.array(v.id("properties")), // Kan visa flera objekt
        assignedToId: v.id("users"), // Partner som genomför visningen
        createdById: v.id("users"),

        // Tidpunkt
        scheduledAt: v.string(), // ISO datetime
        estimatedDuration: v.number(), // Minuter

        // Status
        status: v.union(
            v.literal("scheduled"),
            v.literal("confirmed"),
            v.literal("in_progress"),
            v.literal("completed"),
            v.literal("cancelled"),
            v.literal("no_show")
        ),

        // Detaljer
        meetingPoint: v.optional(v.string()),
        notes: v.optional(v.string()),

        // Påminnelser
        reminderSentAt: v.optional(v.string()),
        confirmationSentAt: v.optional(v.string()),

        // Google Calendar
        googleEventId: v.optional(v.string()),

        createdAt: v.string(),
        updatedAt: v.optional(v.any()),
    })
        .index("by_leadId", ["leadId"])
        .index("by_assignedTo", ["assignedToId"])
        .index("by_scheduledAt", ["scheduledAt"])
        .index("by_status", ["status"]),

    viewingReports: defineTable({
        viewingId: v.id("viewings"),
        submittedById: v.id("users"),
        submittedAt: v.string(),

        // Per objekt - array med feedback
        propertyFeedback: v.array(v.object({
            propertyId: v.id("properties"),
            reaction: v.union(
                v.literal("loved"),
                v.literal("liked"),
                v.literal("neutral"),
                v.literal("disliked")
            ),
            interestLevel: v.number(), // 1-5
            pros: v.optional(v.string()),
            cons: v.optional(v.string()),
            priceOpinion: v.optional(v.union(
                v.literal("too_expensive"),
                v.literal("fair"),
                v.literal("good_value")
            )),
            wantSecondViewing: v.optional(v.boolean()),
            photos: v.optional(v.array(v.string())), // Storage IDs
        })),

        // Övergripande kundfeedback
        customerFeedback: v.object({
            favoritePropertyId: v.optional(v.id("properties")),
            budgetUpdate: v.optional(v.string()),
            newRequirements: v.optional(v.string()),
            timeline: v.optional(v.union(
                v.literal("asap"),
                v.literal("1_3_months"),
                v.literal("3_6_months"),
                v.literal("6_12_months"),
                v.literal("just_looking")
            )),
            financingStatus: v.optional(v.union(
                v.literal("cash"),
                v.literal("mortgage_approved"),
                v.literal("mortgage_pending"),
                v.literal("not_started")
            )),
            decisionMakers: v.optional(v.string()),
        }),

        // Mäklarens bedömning
        agentAssessment: v.object({
            purchaseProbability: v.union(
                v.literal("low"),
                v.literal("medium"),
                v.literal("high"),
                v.literal("very_high")
            ),
            readiness: v.union(
                v.literal("early_stage"),
                v.literal("active_search"),
                v.literal("ready_to_buy")
            ),
            obstacles: v.optional(v.array(v.string())),
            recommendation: v.optional(v.string()),
            nextSteps: v.optional(v.string()),
        }),

        // Uppföljning
        followUpDate: v.optional(v.string()),
        followUpNotes: v.optional(v.string()),

        createdAt: v.string(),
    })
        .index("by_viewingId", ["viewingId"])
        .index("by_submittedAt", ["submittedAt"]),

    deals: defineTable({
        // Kopplingar
        leadId: v.id("leads"),
        propertyId: v.id("properties"),
        assignedToId: v.optional(v.id("users")), // Huvudansvarig - Relaxed
        partnerId: v.optional(v.id("users")), // Spansk partner

        // Status
        stage: v.union(
            v.literal("reservation"),
            v.literal("contract"),
            v.literal("due_diligence"),
            v.literal("escritura"),
            v.literal("completion"),
            v.literal("after_sales"),
            v.literal("closed_won"),
            v.literal("closed_lost")
        ),

        // Ekonomi
        listPrice: v.optional(v.number()), // Ursprungligt pris - Relaxed
        agreedPrice: v.optional(v.number()), // Överenskommet pris - Relaxed
        currency: v.optional(v.string()), // EUR - Relaxed

        reservationFee: v.optional(v.number()), // 3000-6000 EUR
        depositAmount: v.optional(v.number()), // 10% handpenning

        // Provision
        commissionPercent: v.optional(v.number()),
        commissionAmount: v.optional(v.number()),
        commissionSplits: v.optional(v.array(v.object({
            userId: v.id("users"),
            role: v.string(),
            percent: v.number(),
            amount: v.number(),
        }))),

        // Datum
        reservationDate: v.optional(v.string()),
        contractDate: v.optional(v.string()),
        dueDiligenceDeadline: v.optional(v.string()),
        escrituraDate: v.optional(v.string()),
        completionDate: v.optional(v.string()),

        // Kontakter
        buyerLawyerId: v.optional(v.string()), // Extern kontakt
        buyerLawyerName: v.optional(v.string()),
        buyerLawyerEmail: v.optional(v.string()),
        buyerLawyerPhone: v.optional(v.string()),

        notaryName: v.optional(v.string()),
        notaryAddress: v.optional(v.string()),

        // NIE
        nieStatus: v.optional(v.union(
            v.literal("not_started"),
            v.literal("applied"),
            v.literal("received")
        )),
        nieNumber: v.optional(v.string()),

        // Metadata
        lostReason: v.optional(v.string()),
        notes: v.optional(v.string()),

        // Legacy fields for validation compatibility
        value: v.optional(v.any()), // Legacy price
        status: v.optional(v.any()), // Legacy status
        commissionSplit: v.optional(v.any()), // Legacy split structure
        afterSalesTasks: v.optional(v.any()), // Legacy tasks

        createdAt: v.optional(v.union(v.string(), v.number())), // Relaxed to allow legacy number timestamps
        updatedAt: v.optional(v.any()), // Relaxed
    })
        .index("by_leadId", ["leadId"])
        .index("by_propertyId", ["propertyId"])
        .index("by_stage", ["stage"])
        .index("by_assignedTo", ["assignedToId"]),

    dealChecklists: defineTable({
        dealId: v.id("deals"),
        stage: v.string(),

        items: v.array(v.object({
            id: v.string(), // Unikt ID för varje item
            title: v.string(),
            description: v.optional(v.string()),
            isRequired: v.boolean(),
            isCompleted: v.boolean(),
            completedAt: v.optional(v.string()),
            completedById: v.optional(v.id("users")),
            documentId: v.optional(v.id("documents")), // Kopplat dokument
            dueDate: v.optional(v.string()),
            notes: v.optional(v.string()),
        })),

        createdAt: v.string(),
        updatedAt: v.optional(v.any()), // Relaxed
    })
        .index("by_dealId", ["dealId"])
        .index("by_stage", ["stage"]),

    documents: defineTable({
        // Kopplingar
        dealId: v.optional(v.id("deals")),
        leadId: v.optional(v.id("leads")),
        propertyId: v.optional(v.id("properties")),

        // Fil
        name: v.string(),
        type: v.union(
            v.literal("passport"),
            v.literal("nie"),
            v.literal("proof_of_funds"),
            v.literal("reservation_agreement"),
            v.literal("purchase_contract"),
            v.literal("nota_simple"),
            v.literal("energy_certificate"),
            v.literal("floor_plan"),
            v.literal("lawyer_report"),
            v.literal("bank_transfer"),
            v.literal("escritura"),
            v.literal("keys_protocol"),
            v.literal("other")
        ),

        storageId: v.string(), // Convex file storage
        mimeType: v.string(),
        size: v.number(),

        // Metadata
        uploadedById: v.id("users"),
        isPublicToCustomer: v.boolean(), // Synlig i kundportalen
        requiresSignature: v.boolean(),
        signedAt: v.optional(v.string()),

        notes: v.optional(v.string()),
        createdAt: v.string(),
    })
        .index("by_dealId", ["dealId"])
        .index("by_leadId", ["leadId"])
        .index("by_type", ["type"]),
});
