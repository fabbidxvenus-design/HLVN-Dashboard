# HLVN Dashboard — Requirements Matrix (Frontend-Only)

> Vibecode Kit v5.0 — BƯỚC 2 (RRI) Output  
> Date: 2026-05-08  
> Project: HLVN Dashboard (Frontend-Only Admin Dashboard)

---

## SCOPE CLARIFICATION

**Dashboard project** (`D:\scripts\HLVN\HLVN-dashboard`):
- Frontend-only Next.js 15 application
- UI pages, components, forms, tables, charts
- Calls external backend API
- No `app/api/*` routes
- No Supabase client imports
- No OpenRouter integration
- No database migrations

**Backend project** (`D:\scripts\HLVN\HLVN-serverless`):
- All API endpoints
- Supabase Auth/PostgreSQL/Storage/RLS
- OpenRouter integration
- Business logic and data persistence

**See**: `D:\scripts\HLVN\HLVN-serverless\coding-packs\01-REQUIREMENTS-MATRIX.md` for backend requirements.

---

## REQUIREMENTS MATRIX (Frontend-Only)

### Domain 1: Authentication & Authorization (Frontend UX)

| REQ-ID | Requirement | Priority | TIP | Status |
|--------|------------|----------|-----|--------|
| REQ-AUTH-001 | Login page with email/password form | P0 | TIP-002 | Planned |
| REQ-AUTH-002 | Admin gate: redirect non-admin to error page | P0 | TIP-002 | Planned |
| REQ-AUTH-003 | Token storage in browser (localStorage/sessionStorage) | P0 | TIP-002 | Planned |
| REQ-AUTH-004 | Attach bearer token to authenticated requests | P0 | TIP-002 | Planned |
| REQ-AUTH-005 | Logout button clears session and redirects to /login | P0 | TIP-002 | Planned |
| REQ-AUTH-006 | Dashboard layout validates session on mount | P0 | TIP-002 | Planned |

**Backend dependency**: Backend provides `/api/auth/login`, `/api/auth/me`, `/api/auth/logout`, `/api/auth/refresh`.

---

### Domain 2: User Management (Frontend UI)

| REQ-ID | Requirement | Priority | TIP | Status |
|--------|------------|----------|-----|--------|
| REQ-USER-001 | Users table with pagination (20/page) | P0 | TIP-003 | Planned |
| REQ-USER-002 | Search users by email (client-side filter or backend query) | P0 | TIP-003 | Planned |
| REQ-USER-003 | Filter users by role dropdown (admin/manager/user/all) | P1 | TIP-003 | Planned |
| REQ-USER-004 | Create user dialog (email, password, role fields) | P0 | TIP-003 | Planned |
| REQ-USER-005 | Edit user role dialog | P0 | TIP-003 | Planned |
| REQ-USER-006 | Delete user confirmation dialog | P1 | TIP-003 | Planned |
| REQ-USER-007 | Display user last login timestamp in table | P1 | TIP-003 | Planned |
| REQ-USER-008 | Show backend error when last-admin deletion blocked | P0 | TIP-003 | Planned |

**Backend dependency**: Backend provides `/api/users` (GET/POST), `/api/users/:id/role` (PATCH), `/api/users/:id` (DELETE).

---

### Domain 3: Scan History Management (Frontend UI)

| REQ-ID | Requirement | Priority | TIP | Status |
|--------|------------|----------|-----|--------|
| REQ-HIST-001 | Scans table with pagination (20/page) | P0 | TIP-004 | Planned |
| REQ-HIST-002 | Search scans by OCR content (backend query) | P0 | TIP-004 | Planned |
| REQ-HIST-003 | Filter scans by user dropdown | P0 | TIP-004 | Planned |
| REQ-HIST-004 | Filter scans by date range picker (last 7d/30d/custom) | P0 | TIP-004 | Planned |
| REQ-HIST-005 | Scan detail dialog (image, OCR structured, token usage) | P0 | TIP-004 | Planned |
| REQ-HIST-006 | Export button triggers backend `/api/export/excel` | P0 | TIP-004 | Planned |
| REQ-HIST-007 | Delete scan confirmation dialog | P1 | TIP-004 | Planned |
| REQ-HIST-008 | Thumbnail preview in table (64x64px) | P1 | TIP-004 | Planned |
| REQ-HIST-009 | Sort by timestamp (newest first default) | P0 | TIP-004 | Planned |

**Backend dependency**: Backend provides `/api/scans` (GET), `/api/scans/:id` (GET/DELETE), `/api/export/excel` (POST).

---

### Domain 4: Analytics Dashboard (Frontend UI)

| REQ-ID | Requirement | Priority | TIP | Status |
|--------|------------|----------|-----|--------|
| REQ-ANLY-001 | KPI cards: Total Scans, Active Users, API Cost, Success Rate | P0 | TIP-005 | Planned |
| REQ-ANLY-002 | Scan volume trend chart (last 7/30 days, bar chart via Recharts) | P0 | TIP-005 | Planned |
| REQ-ANLY-003 | Top products table (product name, scan count) | P0 | TIP-005 | Planned |
| REQ-ANLY-004 | Top users table (user email, scan count) | P1 | TIP-005 | Planned |
| REQ-ANLY-005 | API usage by key table (key index, token count, cost) | P1 | TIP-005 | Planned |
| REQ-ANLY-006 | Date range filter (last 7d/30d/custom) | P0 | TIP-005 | Planned |

**Backend dependency**: Backend provides `/api/analytics/summary`, `/api/analytics/trends`, `/api/analytics/top-products`, `/api/analytics/top-users`, `/api/analytics/api-usage`.

---

### Domain 5: UI/UX Design

| REQ-ID | Requirement | Priority | TIP | Status |
|--------|------------|----------|-----|--------|
| REQ-UI-001 | Desktop-first layout (1440px+) | P0 | TIP-001 | Planned |
| REQ-UI-002 | Sidebar navigation (240px fixed) | P0 | TIP-001 | Planned |
| REQ-UI-003 | 4 main screens: Dashboard, Users, History, Analytics | P0 | TIP-001 | Planned |
| REQ-UI-004 | shadcn/ui components (Button, Input, Table, Card) | P0 | TIP-001 | Planned |
| REQ-UI-005 | Lucide React icons | P0 | TIP-001 | Planned |
| REQ-UI-006 | Color palette: Blue primary, Gray neutral | P0 | TIP-001 | Planned |
| REQ-UI-007 | Inter font family | P0 | TIP-001 | Planned |
| REQ-UI-008 | Vietnamese labels (Tạo người dùng, Lịch sử scan, etc.) | P0 | TIP-001 | Planned |
| REQ-UI-009 | Responsive breakpoints (tablet/mobile) | P1 | Phase 2 | Deferred |
| REQ-UI-010 | Dark mode | P2 | Phase 3 | Deferred |
| REQ-UI-011 | Loading states (skeleton loaders) | P1 | TIP-006 | Planned |
| REQ-UI-012 | Empty states (no data placeholders) | P1 | TIP-006 | Planned |
| REQ-UI-013 | Error states (toast notifications via Sonner) | P0 | TIP-006 | Planned |
| REQ-UI-014 | Hover/focus states | P0 | TIP-006 | Planned |

---

### Domain 6: Testing & Quality

| REQ-ID | Requirement | Priority | TIP | Status |
|--------|------------|----------|-----|--------|
| REQ-TEST-001 | Component tests for UI (Vitest + Testing Library) | P1 | TIP-006 | Planned |
| REQ-TEST-002 | Unit tests for API client and utilities | P1 | TIP-006 | Planned |
| REQ-TEST-003 | 80%+ test coverage | P1 | TIP-006 | Planned |
| REQ-TEST-004 | E2E tests for critical flows (Playwright) | P2 | Phase 2 | Deferred |

---

### Domain 7: Parallel Development Mock Data

| REQ-ID | Requirement | Priority | TIP | Status |
|--------|------------|----------|-----|--------|
| REQ-MOCK-001 | Dashboard must support contract-accurate mock data when backend endpoints are not ready | P0 | TIP-002 | Planned |
| REQ-MOCK-002 | Mock responses must use the same API envelope, camelCase fields, error codes, and pagination meta as serverless contracts | P0 | TIP-002 | Planned |
| REQ-MOCK-003 | Feature pages must render against mock users, scans, analytics, and auth data without changing component contracts | P0 | TIP-003/TIP-004/TIP-005 | Planned |
| REQ-MOCK-004 | Mock mode must be environment-controlled and easy to disable when connecting to `HLVN-serverless` | P0 | TIP-002 | Planned |
| REQ-MOCK-005 | Mock data must not introduce dashboard API routes, Supabase imports, OpenRouter logic, or backend-owned calculations | P0 | TIP-002/TIP-005 | Planned |

**Backend dependency**: Mock data is temporary for parallel development only. Serverless API contracts remain source of truth and must be preserved so final integration swaps mock transport for real backend calls.

---

## BACKEND REQUIREMENTS (Out of Dashboard Scope)

**These requirements belong to `D:\scripts\HLVN\HLVN-serverless`**:

- ❌ Supabase Auth integration (JWT, auto-refresh, RLS)
- ❌ Database schema (users, scans, analytics_cache tables)
- ❌ Row Level Security policies
- ❌ OpenRouter API integration (multi-key fallback, retry/backoff)
- ❌ API Routes (`/api/auth`, `/api/users`, `/api/scans`, `/api/analytics`, `/api/export`, `/api/ocr`)
- ❌ Excel export generation (multi-sheet workbook)
- ❌ Analytics aggregation (daily cache, KPI calculations)
- ❌ Image storage (Supabase Storage)
- ❌ Token usage tracking
- ❌ API key rotation

**See**: `D:\scripts\HLVN\HLVN-serverless\coding-packs\01-REQUIREMENTS-MATRIX.md` for backend requirements.

---

## AUTO-ANSWERED (from Scan Report + Design + Standards)

### From Scan Report (00-PROJECT-CONTEXT.md)

1. **Purpose**: Frontend-only admin dashboard for managing OCR mobile app users + history
2. **Source app**: React mobile web app with IndexedDB storage
3. **Auth**: Multi-user with roles (admin, manager, user); admin-only dashboard access
4. **Data**: Fetched from external backend API
5. **Export**: Trigger backend endpoint, download generated file
6. **No mobile optimization**: Desktop-first dashboard
7. **Vietnamese content**: OCR data in Vietnamese

### From Tech Stack (product/tech-stack.md)

1. **Frontend**: Next.js 15, TypeScript 6, Tailwind CSS 3.4+, shadcn/ui, Zustand, React Hook Form, TanStack Table, Recharts, Lucide React, Sonner
2. **Backend**: External API at `D:\scripts\HLVN\HLVN-serverless`
3. **Deployment**: Vercel (dashboard), Vercel (backend)
4. **Cost**: Free tier for MVP (Vercel 100GB bandwidth)

### From Design (design/design-brief.md + design-review.md)

1. **Layout**: 240px sidebar, 64px header, 1200px content max-width
2. **Screens**: Dashboard Overview, Users Management, Scan History, Analytics
3. **Components**: Primary Button, Input Field, KPI Card, Table Row
4. **Colors**: Primary #2563EB, Success #10B981, Warning #F59E0B, Error #EF4444
5. **Typography**: Inter font, 14px body, 24px page title, 30px KPI numbers
6. **Spacing**: 32px content padding, 16-24px card gaps
7. **Icons**: Lucide React (search, pencil, trash, download, etc.)
8. **Accessibility**: 44px+ touch targets, WCAG AA contrast, focus rings

### From Standards

1. **auth/rbac-admin-gate**: Frontend UX checks admin role; backend enforces authorization
2. **api/response-format**: Backend returns `{ success, data?, error?, meta? }` envelope

---

## APPLICABLE STANDARDS (from coding-packs/standards/)

1. **[auth/rbac-admin-gate](../standards/auth/rbac-admin-gate.md)** — Frontend admin gate UX; backend enforces role checks

**Backend-owned standards** (not applicable to dashboard):
- `api/multi-key-fallback.md` — Backend responsibility
- `api/retry-backoff.md` — Backend responsibility
- `auth/supabase-auth-rls.md` — Backend responsibility
- `auth/jwt-refresh-tokens.md` — Backend responsibility
- `auth/password-hashing.md` — Backend responsibility

---

## DECISIONS LOG

| # | Decision | Options | Chosen | Rationale |
|---|----------|---------|--------|-----------|
| 1 | Dashboard scope | Full-stack vs Frontend-only | **Frontend-only** | Backend API reusable by mobile app and dashboard; clear separation of concerns; backend enforces security |
| 2 | Backend location | Same repo vs Separate repo | **Separate repo** | `D:\scripts\HLVN\HLVN-serverless` for backend; parallel development; independent deployment |
| 3 | Auth method | Custom JWT vs Backend API | **Backend API** | Backend provides `/api/auth/login`, `/api/auth/me`, `/api/auth/logout`; dashboard stores token and attaches to requests |
| 4 | UI library | Headless UI vs shadcn/ui | **shadcn/ui** | Pre-built accessible components, copy-paste approach, Radix UI primitives, Tailwind styling |
| 5 | Charts library | Chart.js vs Recharts | **Recharts** | React-native declarative components, TypeScript support, responsive by default |
| 6 | Table library | AG Grid vs TanStack Table | **TanStack Table** | Headless (full UI control), free MIT license, lightweight, powerful filtering/sorting |
| 7 | State management | Redux vs Zustand | **Zustand** | Lightweight for client auth/UI state; server data fetched per page via backend API |
| 8 | Data sync | IndexedDB export vs Backend API | **Backend API** | Dashboard calls backend endpoints; no local storage duplication |
| 9 | Parallel development | Wait for backend vs Mock data | **Mock data** | Dashboard and serverless develop in parallel; mock data uses serverless API contracts as source of truth; swap mock transport for real backend when ready |

---

## OPEN QUESTIONS

| # | Question | Impact | Suggested Resolution |
|---|----------|--------|---------------------|
| 1 | Real-time dashboard updates? | LOW | Start with manual refresh, add WebSocket in Phase 2 if needed |
| 2 | Multi-language support (EN/VI)? | LOW | Vietnamese only for MVP, add i18n in Phase 2 |
| 3 | Dark mode? | LOW | Light mode only for MVP, add dark mode in Phase 3 |
| 4 | Mobile responsive? | MEDIUM | Desktop-first for MVP, add responsive in Phase 2 |

---

## SCOPE BOUNDARIES

### In Scope (MVP)

**Frontend UI**:
- ✅ Login page with email/password form
- ✅ Admin gate (redirect non-admin)
- ✅ Token storage and bearer token attachment
- ✅ Users table with search/filter/pagination
- ✅ Create/edit/delete user dialogs
- ✅ Scans table with search/filter/pagination
- ✅ Scan detail dialog
- ✅ Export trigger button
- ✅ Analytics KPI cards
- ✅ Scan volume trend chart
- ✅ Top products/users/API usage tables
- ✅ Date range filters
- ✅ Loading/empty/error states
- ✅ Hover/focus states
- ✅ Component tests
- ✅ 80%+ test coverage

**Total MVP screens**: 4 main screens + 1 login page = 5 screens

**Estimated effort**: 56 hours (~7 days for 1 developer)

### Out of Scope (defer to Phase 2/3 or Backend)

**Phase 2 (Post-MVP)**:
- ❌ Password reset UI
- ❌ API key management UI
- ❌ Advanced analytics filters
- ❌ Bulk user operations UI
- ❌ Audit logs UI
- ❌ Notifications UI
- ❌ Responsive design (tablet/mobile breakpoints)
- ❌ E2E tests (Playwright)
- ❌ Real-time updates UI
- ❌ i18n (English/Vietnamese toggle)

**Phase 3 (Future)**:
- ❌ Multi-tenancy UI
- ❌ Advanced RBAC UI
- ❌ Data retention policies UI
- ❌ Backup/restore UI
- ❌ Dark mode
- ❌ Mobile dashboard

**Backend Scope** (not dashboard):
- ❌ API Routes (`app/api/*`)
- ❌ Supabase integration
- ❌ OpenRouter integration
- ❌ Database migrations
- ❌ RLS policies
- ❌ Excel generation
- ❌ Analytics aggregation
- ❌ Multi-key fallback
- ❌ Retry/backoff

---

## QUALITY GATE: RRI Self-Review

### Completeness ✅
- [x] All P0 frontend requirements captured (auth UX, users UI, scans UI, analytics UI, design)
- [x] All P1 frontend requirements captured (filters, loading states, tests)
- [x] P2/P3 requirements deferred to Phase 2/3
- [x] Backend requirements clearly separated
- [x] Auto-answered requirements from scan/design/standards
- [x] Applicable standards identified (1 frontend standard)
- [x] Decisions log complete (8 decisions)
- [x] Open questions identified (4 questions)
- [x] Scope boundaries clear (MVP vs Phase 2/3 vs Backend)

### Clarity ✅
- [x] Requirements are specific and testable
- [x] Priorities are clear (P0/P1/P2)
- [x] TIP mapping is clear (TIP-001 to TIP-006)
- [x] Status is clear (Planned for MVP, Deferred for Phase 2/3)

### Consistency ✅
- [x] Requirements align with frontend-only scope
- [x] Requirements align with design (4 screens, components, colors, typography)
- [x] Requirements align with tech stack (Next.js, shadcn/ui, Recharts, TanStack Table)
- [x] No conflicts between requirements

### Traceability ✅
- [x] Requirements reference TIPs
- [x] Backend dependencies clearly stated
- [x] Decisions reference options and rationale
- [x] Open questions reference impact and resolution

### Actionability ✅
- [x] Requirements are implementable (no vague "improve UX")
- [x] Acceptance criteria implicit (e.g., "Users table with pagination" → table shows 20 users per page)
- [x] Technical details sufficient for implementation (UI specs, API contracts)

---

## NEXT STEPS

1. ✅ **Update stale context** — Completed
2. ✅ **Update TIPs with correct endpoints** — Completed
3. ⏳ **Begin implementation** (BƯỚC 4: BUILD)
   - TIP-001: Project Setup + Design System
   - TIP-002: Backend API Client + Auth Flow
   - TIP-003: Users Management UI
   - TIP-004: Scans History UI
   - TIP-005: Analytics Dashboard UI
   - TIP-006: UI Polish + A11y + Tests

---

**RRI updated**: 2026-05-08  
**Framework**: Vibecode Kit v5.0  
**Project**: HLVN Dashboard (Frontend-Only)  
**Next step**: Begin implementation with TIP-001
