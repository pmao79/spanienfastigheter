# Phase 4: Deals & Transaction Management

## Goal Description
Implement a comprehensive deal management system to track the 6-stage buying process for Spanish properties (Reservation → Escritura → After-Sales). This includes a Kanban pipeline, detailed deal views with checklists, document management, and a basic customer portal for buyers to track their progress.

## User Review Required
> [!IMPORTANT]
> **Middleware & Portal Access**: The plan involves updating middleware to handle a new "customer" role for the portal access. We need to ensure Clerk roles are correctly mapped or handled in the Convex auth logic.

> [!WARNING]
> **Schema Changes**: Adding significant new tables (`deals`, `dealChecklists`, `documents`). Access patterns should be verified.

## Proposed Changes

### Backend (Convex)

#### [MODIFY] [schema.ts](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/convex/schema.ts)
- Add `deals` table: Tracks deal status, economics (price, commission), dates, and contacts.
- Add `dealChecklists` table: Stores stage-specific checklist items.
- Add `documents` table: Manages files linked to deals/leads, including type and storage ID.

#### [NEW] [convex/lib/dealChecklists.ts](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/convex/lib/dealChecklists.ts)
- Define `STAGE_CHECKLISTS` constant with standard items for each of the 6 stages.

#### [NEW] [convex/deals.ts](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/convex/deals.ts)
- `getAll`, `getById`, `getByLead`, `getStats`
- `create`: Initializes deal and auto-generates checklists.
- `update`, `updateStage`, `updateCommission`

#### [NEW] [convex/dealChecklists.ts](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/convex/dealChecklists.ts)
- `getByDeal`, `toggleItem`, `updateItem`

#### [NEW] [convex/documents.ts](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/convex/documents.ts)
- `generateUploadUrl`, `create`, `delete`, `otpList`

### Frontend (Admin)

#### [NEW] [app/(admin)/admin/deals/page.tsx](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/app/(admin)/admin/deals/page.tsx)
- Kanban board showing deals by stage.
- Summary metrics (Total pipeline deal value).

#### [NEW] [app/(admin)/admin/deals/[id]/page.tsx](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/app/(admin)/admin/deals/[id]/page.tsx)
- Detailed view with 2-column layout.
- Left: Interactive Checklist & Progress.
- Right: Deal Info, Contacts, Economics.
- Tabs: Documents, Timeline.

#### [NEW] [app/(admin)/admin/deals/_components/CreateDealModal.tsx](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/app/(admin)/admin/deals/_components/CreateDealModal.tsx)
- Modal to start a deal from a lead/property.

### Frontend (Customer Portal)

#### [NEW] [app/(portal)/layout.tsx](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/app/(portal)/layout.tsx)
- Simplified layout for customers.

#### [NEW] [app/(portal)/portal/page.tsx](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/app/(portal)/portal/page.tsx)
- "My Journey" view: Progress stepper, active tasks, messages.

#### [NEW] [app/(portal)/portal/documents/page.tsx](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/app/(portal)/portal/documents/page.tsx)
- Document list (view/download) and upload functionality.

### Integration
- **Sidebar**: Add "Deals" link.
- **Lead Profile**: Show active deal summary.
- **Dashboard**: Add "Active Deals" and "Action Required" widgets.

## Verification Plan

### Automated Tests
- N/A (Manual verification prioritized).

### Manual Verification
1.  **Back-office**:
    - Create a new deal from a lead.
    - Verify checklists are generated.
    - Move deal through stages (Reservation -> Contract -> ...).
    - Upload a document.
2.  **Customer Portal**:
    - Access portal as a "customer" (simulate/impersonate).
    - Verify they see their specific deal progress.
    - Verify they can see "public" documents but not internal ones.

## Phase 6b: Enhanced Object Distribution

### Goal Description
Upgrade the mailing system to a premium 3-step experience with rich lead context, professional email design, and PDF brochure generation.

### Backend Changes

#### [MODIFY] [convex/schema.ts](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/convex/schema.ts)
- `propertyMailings`: Add `includePdf`, `pdfGeneratedAt`, `clickedPropertyIds`.

#### [MODIFY] [convex/propertyMailings.ts](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/convex/propertyMailings.ts)
- `getLeadContext`: Fetch lead details, last communication, and mailing history.

#### [MODIFY] [convex/mailingActions.ts](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/convex/mailingActions.ts)
- Update `sendMailing` to:
    - Use new professional HTML template.
    - Fetch and attach PDF if requested.

### Frontend Changes

#### [MODIFY] [app/(admin)/admin/mailings/new/page.tsx](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/app/(admin)/admin/mailings/new/page.tsx)
- Refactor to 3 steps: Receiver -> Customize -> Review.
- **Step 1**: Add "Context Panel" and "Sent" indicators.
- **Step 2**: smart default message.
- **Step 3**: Add "Attach PDF" toggle.

#### [NEW] [app/(pdf)/pdf/mailing/[id]/page.tsx](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/app/(pdf)/pdf/mailing/[id]/page.tsx)
- Public A4 layout for PDF generation.

#### [NEW] [app/api/pdf/mailing/[id]/route.ts](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/app/api/pdf/mailing/[id]/route.ts)
- API route to call Browserless and return PDF buffer.

#### [NEW] [app/api/track/click/route.ts](file:///c%3A/Users/marcu/spanienfastigheter/spanienfastigheter/app/api/track/click/route.ts)
- Click tracking endpoint.
