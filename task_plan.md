# Task Plan: CRM & Admin Portal Implementation

## Goal
Build a complete Real Estate CRM and Admin Portal as per `docs/spec.md`.
Current Focus: **Phase 3: Visningar & Kalender**.

## Phases

### Phase 1 & 2 (Completed)
- [x] MVP (Dashboard, Properties, Basic Leads, Auth)
- [x] CRM Core (Kanban, Comms, Templates, Tasks)

### Phase 3: Visningar & Kalender (Active)
- [ ] **Schema & Backend** <!-- id: p3_backend -->
    - [x] Update `convex/schema.ts` (viewings, viewingReports) <!-- id: schema -->
    - [x] Create `convex/viewings.ts` (CRUD, filters) <!-- id: viewings_api -->
    - [x] Create `convex/viewingReports.ts` (CRUD, logic) <!-- id: reports_api -->
- [ ] **Calendar Module** <!-- id: p3_calendar -->
    - [x] Install `@fullcalendar` packages <!-- id: install_cal -->
    - [x] Create `app/(admin)/admin/calendar/page.tsx` <!-- id: calendar_page -->
    - [x] Implement Calendar UI (Day/Week/Month) <!-- id: calendar_ui -->
    - [x] Implement Status colors & Event interactions <!-- id: calendar_logic -->
- [ ] **Booking System** <!-- id: p3_booking -->
    - [x] Create Booking Modal (Lead + Property + Partner + Time) <!-- id: booking_modal -->
    - [x] Add booking hooks (from Lead, Property, Calendar) <!-- id: booking_hooks -->
- [ ] **Viewings Management** <!-- id: p3_management -->
    - [x] Create `app/(admin)/admin/viewings/page.tsx` (List view) <!-- id: viewings_list -->
    - [x] Create `app/(admin)/admin/viewings/[id]/page.tsx` (Detail view) <!-- id: viewings_detail -->
    - [x] Implement Filters (Status, Partner, Date) <!-- id: viewings_filters -->
    - [x] Add Dashboard Widgets (Upcoming, Pending Reports) <!-- id: db_widgets -->
- [x] **Reporting System** <!-- id: p3_reporting -->
    - [x] Create `app/(admin)/admin/viewings/[id]/report/page.tsx` <!-- id: report_page -->
    - [x] Implement Mobile-friendly Form Steps <!-- id: report_form -->
    - [x] Implement Feedback & Assessment Logic <!-- id: report_logic -->
- [x] **Integration & Polish** <!-- id: p3_polish -->
    - [x] Update Sidebar Navigation <!-- id: nav_update -->
    - [x] Add Viewings Tab to Lead Details <!-- id: lead_tab -->

### Phase 4: Deals & Buying Process
- [x] **Backend Schema & Logic** <!-- id: p4_backend -->
    - [x] Update Schema (Deals, Checklists, Documents) <!-- id: schema_deals -->
    - [x] Implement `convex/lib/dealChecklists.ts` <!-- id: lib_checklists -->
    - [x] Implement `convex/deals.ts` with auto-checklist generation <!-- id: api_deals -->
    - [x] Implement `convex/documents.ts` <!-- id: api_docs -->
- [x] **Admin: Deal Pipeline** <!-- id: p4_pipeline -->
    - [x] Create `app/(admin)/admin/deals/page.tsx` (Kanban) <!-- id: deals_kanban -->
    - [x] Create `CreateDealModal` <!-- id: deals_create -->
- [x] **Admin: Deal Detail** <!-- id: p4_detail -->
    - [x] Create `app/(admin)/admin/deals/[id]/page.tsx` <!-- id: deals_page -->
    - [x] Implement Checklist UI <!-- id: ui_checklist -->
    - [x] Lint: `npm run lint`. Fixa alla varningar och fel.
    - [x] Build: `npm run build`. Bekräfta att projektet bygger korrekt.
    - [x] Implement Document Management UI <!-- id: ui_docs -->
- [x] **Customer Portal** <!-- id: p4_portal -->
    - [x] Create Portal Layout & Middleware <!-- id: portal_setup -->
    - [x] Create `app/(portal)/portal/page.tsx` (Process view) <!-- id: portal_home -->
    - [x] Create `app/(portal)/portal/documents/page.tsx` <!-- id: portal_docs -->
- [ ] **Integration & Polish** <!-- id: p4_polish -->
    - [ ] Update Sidebar Navigation <!-- id: nav_deals -->
    - [ ] Dashboard Widgets (Active Deals) <!-- id: dash_deals -->

### Phase 5: Reports & Commissions (Active)
- [x] **Schema & Backend** <!-- id: p5_backend -->
    - [x] Update `convex/schema.ts` (Profiles, Payouts) <!-- id: p5_schema -->
    - [x] Create `convex/reports.ts` (Analytics queries) <!-- id: p5_reports_api -->
    - [x] Create `convex/commissions.ts` (Calc logic) <!-- id: p5_comm_api -->
- [x] **Frontend: Reports** <!-- id: p5_reports_ui -->
    - [x] Install Recharts & Export libs <!-- id: p5_install -->
    - [x] Create Reports Dashboard (`/admin/reports`) <!-- id: p5_reports_page -->
    - [x] Add Charts & Graphs <!-- id: p5_charts -->
    - [x] Implement Excel/PDF Export <!-- id: p5_export -->
- [x] **Frontend: Commissions** <!-- id: p5_comm_ui -->
    - [x] Create Commission Profiles Settings <!-- id: p5_profiles -->
    - [x] Create Admin Commission Management <!-- id: p5_comm_admin -->
    - [x] Create Agent "My Commissions" View <!-- id: p5_comm_agent -->
- [x] **Integration** <!-- id: p5_integration -->
    - [x] Update Sidebar Navigation <!-- id: p5_nav -->
    - [x] Update Main Dashboard Widgets <!-- id: p5_dashboard -->

### Phase 6: Object Distribution & After-Sales (Active)
- [ ] **Schema & Backend** <!-- id: p6_backend -->
    - [ ] Update `convex/schema.ts` (Mailings, Templates, AfterSales) <!-- id: p6_schema -->
    - [ ] Create `convex/propertyMailings.ts` (CRUD, Resend logic) <!-- id: p6_mail_api -->
- [x] **Schema & Backend** <!-- id: p6_backend -->
    - [x] Update `convex/schema.ts` (Mailings, Templates, AfterSales) <!-- id: p6_schema -->
    - [x] Create `convex/propertyMailings.ts` (CRUD, Resend logic) <!-- id: p6_mail_api -->
    - [x] Create `convex/mailingTemplates.ts` (Template CRUD) <!-- id: p6_temp_api -->
    - [x] Create `convex/afterSales.ts` (Services, Follow-ups) <!-- id: p6_after_api -->
- [x] **Feature: Property Mailings** <!-- id: p6_mailings -->
    - [x] UI: Dashboard & Wizard
    - [x] Resend Integration (Backend Action Ready)
- [x] **Feature: After-Sales** <!-- id: p6_aftersales -->
    - [x] UI: Dashboard & Service Mgmt
    - [x] Follow-up System
- [x] **Integration** <!-- id: p6_integration -->
    - [x] Sidebar Navigation
    - [x] Update Customer Portal
    - [x] Add Dashboard Widgets
