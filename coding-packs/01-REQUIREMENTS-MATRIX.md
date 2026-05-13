# HLVN Dashboard — Requirements Matrix (RRI Report)

> Vibecode Kit v5.0 — BƯỚC 2 (RRI) Output
> Date: 2026-05-12

---

## REQUIREMENTS MATRIX

### Domain 1: Authentication & Authorization

| REQ-ID | Requirement | Priority | Persona | TIP |
|--------|------------|----------|---------|-----|
| REQ-001 | Login via Supabase Auth (email + password) | P0 | End User | TBD |
| REQ-002 | 2 roles: Admin (full CRUD), User (read-only + limited actions) | P0 | Business Analyst | TBD |
| REQ-003 | Protected routes — redirect to /login if unauthenticated | P0 | Developer | TBD |
| REQ-004 | Session persistence via Supabase client (localStorage) | P1 | Developer | TBD |
| REQ-005 | Logout clears session and redirects to login | P1 | End User | TBD |

### Domain 2: Dashboard Overview

| REQ-ID | Requirement | Priority | Persona | TIP |
|--------|------------|----------|---------|-----|
| REQ-010 | KPI cards: total scans, total users, success rate, active today | P0 | End User | TBD |
| REQ-011 | Scan volume line chart (7d/30d/90d) | P0 | Business Analyst | TBD |
| REQ-012 | Top products table (by scan count) | P1 | Business Analyst | TBD |
| REQ-013 | Top users table (by scan count) | P1 | Business Analyst | TBD |
| REQ-014 | Realtime KPI updates via Supabase Realtime | P1 | Developer | TBD |

### Domain 3: Scan Management

| REQ-ID | Requirement | Priority | Persona | TIP |
|--------|------------|----------|---------|-----|
| REQ-020 | Scan list table with pagination, sort, filter | P0 | End User | TBD |
| REQ-021 | Scan detail view: image, OCR text, metadata (time, user, product) | P0 | End User | TBD |
| REQ-022 | Filter by date range, user, product | P0 | End User | TBD |
| REQ-023 | Search scans by OCR text content | P1 | End User | TBD |
| REQ-024 | Delete scan (Admin only) | P1 | End User | TBD |
| REQ-025 | Realtime scan list updates (new rows appear live) | P1 | Developer | TBD |

### Domain 4: User Management

| REQ-ID | Requirement | Priority | Persona | TIP |
|--------|------------|----------|---------|-----|
| REQ-030 | User list table with pagination, sort | P0 | End User | TBD |
| REQ-031 | Create user (Admin only) — email, name, role | P0 | End User | TBD |
| REQ-032 | Edit user role (Admin only) | P1 | End User | TBD |
| REQ-033 | Delete user (Admin only) | P1 | End User | TBD |
| REQ-034 | User profile display (avatar, name, role badge) | P2 | End User | TBD |

### Domain 5: Analytics

| REQ-ID | Requirement | Priority | Persona | TIP |
|--------|------------|----------|---------|-----|
| REQ-040 | Date range picker for analytics period | P0 | End User | TBD |
| REQ-041 | Scan volume chart with multiple series | P0 | Business Analyst | TBD |
| REQ-042 | API usage table (endpoint, count, avg response time) | P1 | Developer | TBD |
| REQ-043 | Comparison with previous period (trend arrows) | P2 | Business Analyst | TBD |

### Domain 6: Data Export

| REQ-ID | Requirement | Priority | Persona | TIP |
|--------|------------|----------|---------|-----|
| REQ-050 | Client-side CSV export for small datasets (scan list, user list) | P1 | End User | TBD |
| REQ-051 | Server-side Excel export via API (complex reports with formatting) | P1 | End User | TBD |

### Domain 7: UI/UX & Design System

| REQ-ID | Requirement | Priority | Persona | TIP |
|--------|------------|----------|---------|-----|
| REQ-060 | Emerald theme (#10B981 primary) matching Stitch design | P0 | Developer | TBD |
| REQ-061 | Manrope headlines + Inter body + Public Sans labels | P0 | Developer | TBD |
| REQ-062 | Fixed 256px sidebar navigation | P0 | End User | TBD |
| REQ-063 | Desktop-only layout (no mobile responsive required) | P0 | Developer | TBD |
| REQ-064 | MD3-inspired surface hierarchy (tonal elevation) | P1 | Developer | TBD |
| REQ-065 | Loading states and skeleton screens | P2 | End User | TBD |
| REQ-066 | Toast notifications for CRUD actions | P2 | End User | TBD |

### Domain 8: Technical Architecture

| REQ-ID | Requirement | Priority | Persona | TIP |
|--------|------------|----------|---------|-----|
| REQ-070 | Vite 6 + React 19 SPA | P0 | Developer | TBD |
| REQ-071 | React Router v7 for client-side routing | P0 | Developer | TBD |
| REQ-072 | Vite dev proxy /api → localhost:3001 (HLVN-serverless) | P0 | Developer | TBD |
| REQ-073 | Supabase client for Auth + Realtime | P0 | Developer | TBD |
| REQ-074 | Zustand for client state (auth, UI state) | P1 | Developer | TBD |
| REQ-075 | TanStack Table for data tables | P1 | Developer | TBD |
| REQ-076 | Recharts for data visualization | P1 | Developer | TBD |
| REQ-077 | shadcn/ui + CVA for component variants | P0 | Developer | TBD |
| REQ-078 | Tailwind CSS v4 with CSS variables | P0 | Developer | TBD |

---

## AUTO-ANSWERED (from Scan Report)

1. Color scheme: Emerald (#10B981) primary, Teal (#14B8A6) secondary, Blue (#3B82F6) tertiary
2. Typography: Manrope headlines, Inter body, Public Sans labels
3. Border radius: 8px across components
4. Layout: Fixed 256px sidebar + main content area
5. Cards: White/surface background, 1px border, 8px radius
6. Buttons: Filled primary, outlined secondary, text tertiary
7. Charts: Emerald primary data, Teal/Blue secondary series
8. Tables: Surface-alt header, hover state, sortable columns
9. Navigation: Dashboard, Scans, Users, Analytics pages
10. Spacing base: 8px

---

## APPLICABLE STANDARDS (from coding-packs/standards/)

None — standards directory not yet initialized.

---

## DECISIONS LOG

| # | Decision | Options | Chosen | Rationale |
|---|----------|---------|--------|-----------|
| 1 | Frontend framework | Next.js / Vite+React | Vite + React SPA | Backend already exists at HLVN-serverless, no need for SSR |
| 2 | API connection | Proxy / Direct / Env var | Vite proxy → localhost:3001 | Simplest dev setup, same-origin in prod |
| 3 | Auth strategy | Supabase Auth / Custom JWT / Session cookie | Supabase Auth (client-side) | Already using Supabase, simplest integration |
| 4 | Supabase features | DB / Auth / Storage / Realtime | DB + Auth + Realtime | Storage not needed (no file uploads in dashboard) |
| 5 | Role system | 3 roles / 2 roles / No roles | 2 roles: Admin, User | Simple permission model sufficient |
| 6 | Realtime scope | Metrics / Scan list / Both | Both metrics + scan list | Full live experience |
| 7 | Export strategy | Client / Server / Hybrid | Hybrid | CSV client-side for quick exports, Excel server-side for complex reports |
| 8 | Responsive | Full responsive / Desktop-first / Desktop only | Desktop only | Internal tool, used on desktop |
| 9 | Scan data model | — | Image + OCR text + Metadata (time, user, product) | Core scan record fields |

---

## OPEN QUESTIONS

| # | Question | Impact | Suggested Resolution |
|---|----------|--------|---------------------|
| 1 | API endpoint structure of HLVN-serverless | P1 | Read serverless routes before blueprint |
| 2 | Supabase table schema (scans, users, products) | P1 | Read serverless DB schema/types |
| 3 | Image storage — where are scan images hosted? | P2 | Likely Supabase Storage or external URL |

---

## SCOPE BOUNDARIES

### In Scope (MVP)

- Login page with Supabase Auth
- Dashboard overview with KPI cards + charts
- Scan management (list, detail, filter, delete)
- User management (list, create, edit role, delete)
- Analytics page with date range picker
- Data export (CSV client-side + Excel server-side)
- Supabase Realtime for live updates
- Stitch design system implementation (emerald theme)

### Out of Scope (defer)

- Mobile responsive layout
- Dark mode
- Notification system (push/email)
- Audit log / activity history
- Multi-language (i18n)
- File upload from dashboard
- User self-registration (admin creates users)
- Advanced analytics (custom reports, dashboards)
- Offline support / PWA

---

## Quality Gate

| Check | Status |
|-------|--------|
| P0 requirements identified | ✅ 15 P0 items |
| All domains covered | ✅ 8 domains |
| Decisions documented | ✅ 9 decisions |
| Scope boundaries clear | ✅ In/Out defined |
| Open questions flagged | ✅ 3 items (non-blocking) |
| Confidence ≥ 80% | ✅ ~85% |
| Cross-ref with Scan Report | ✅ Consistent |
