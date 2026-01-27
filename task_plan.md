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
    - [x] Implement Document Management UI <!-- id: ui_docs -->
- [ ] **Customer Portal** <!-- id: p4_portal -->
    - [ ] Create Portal Layout & Middleware <!-- id: portal_setup -->
    - [ ] Create `app/(portal)/portal/page.tsx` (Process view) <!-- id: portal_home -->
    - [ ] Create `app/(portal)/portal/documents/page.tsx` <!-- id: portal_docs -->
- [ ] **Integration & Polish** <!-- id: p4_polish -->
    - [ ] Update Sidebar Navigation <!-- id: nav_deals -->
    - [ ] Dashboard Widgets (Active Deals) <!-- id: dash_deals -->

### Phase 5 & 6 (Future)
- [ ] Reports, Commission, After-Sales
