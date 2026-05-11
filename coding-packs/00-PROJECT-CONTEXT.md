# HLVN Dashboard — Project Context

> Vibecode Kit v5.0 — BƯỚC 1 (SCAN) + BƯỚC 3 (VISION)  
> Date: 2026-05-08  
> Project: HLVN Dashboard (Frontend-Only Admin Dashboard)

---

## SCAN REPORT

### Source Analysis

**Scanned repositories**:
1. `D:\scripts\HLVN\ocr-mobile-web` — React 19 mobile web app with OCR functionality
2. `D:\scripts\HLVN\HLVN-serverless` — Backend API project (separate scope)

**Purpose**: Build admin dashboard to manage users, view scan history, and monitor analytics for the OCR mobile app.

### Tech Stack Detected

**Mobile App** (`ocr-mobile-web`):
- React 19.0.0
- Vite 6.0.11
- TypeScript 5.7.3
- IndexedDB for local storage
- Camera API for image capture
- OpenRouter API for OCR processing

**Dashboard Requirements** (this project):
- Frontend-only Next.js 15 application
- Calls external backend API at `D:\scripts\HLVN\HLVN-serverless`
- No API routes in dashboard
- No Supabase client imports in dashboard
- No OpenRouter integration in dashboard

### Key Patterns Extracted

**From Mobile App**:
1. **Data Models**:
   - User: `{ id, email, role: 'admin' | 'manager' | 'user' }`
   - Scan: `{ id, userId, timestamp, imageUrl, ocrStructured, tokenUsage, apiKeyIndex, edited }`
   - OCR Response: `{ title?, fields[], sizes[], raw_text?, notes[] }`

2. **Auth Pattern**:
   - Multi-user with roles
   - Admin-only dashboard access
   - Backend enforces authorization

3. **Storage Pattern**:
   - Images stored in backend storage
   - Scan metadata in backend database
   - Dashboard reads via backend API

### Gaps Identified

**Dashboard needs**:
1. ✅ Backend API client with bearer token auth
2. ✅ Login page for admin users
3. ✅ Users management UI (CRUD)
4. ✅ Scan history UI with filters
5. ✅ Analytics dashboard with KPIs/charts
6. ✅ Export functionality (trigger backend endpoint)

**Out of scope for dashboard**:
- ❌ API Routes (`app/api/*`)
- ❌ Supabase client/server/admin imports
- ❌ OpenRouter integration
- ❌ Database migrations
- ❌ OCR processing logic

---

## VISION

> Vibecode Kit v5.0 — BƯỚC 3 (VISION)  
> Date: 2026-05-08  
> Vision Architect: Claude Opus 4.7

---

### PROJECT TYPE: Pattern F — Enterprise Module / Internal Tool

**HLVN Dashboard** là admin dashboard nội bộ để quản lý hệ thống OCR mobile app. Warehouse managers và IT admins sử dụng dashboard để quản lý users, xem lịch sử scan, theo dõi analytics, và kiểm soát API usage/costs. Desktop-first, data-dense, professional admin interface với RBAC (admin-only access).

---

### ARCHITECTURE VISION

```
┌─────────────────────────────────────────────────────────────────┐
│                    HLVN Dashboard (Frontend)                    │
│                  (Next.js 15 on Vercel)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                     Frontend UI                          │  │
│  │                                                          │  │
│  │  • Next.js 15 App Router                                │  │
│  │  • shadcn/ui + Radix UI                                 │  │
│  │  • TanStack Table                                       │  │
│  │  • Recharts                                             │  │
│  │  • Zustand (client state only)                          │  │
│  │  • React Hook Form                                      │  │
│  │                                                          │  │
│  │  Pages:                                                  │  │
│  │  • /login                                               │  │
│  │  • / (dashboard overview)                               │  │
│  │  • /users                                               │  │
│  │  • /scans                                               │  │
│  │  • /analytics                                           │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                    │
│                            │ HTTP/REST                          │
│                            ▼                                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              HLVN Serverless Backend (External)                 │
│           (D:\scripts\HLVN\HLVN-serverless)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  Next.js 15 API Routes                   │  │
│  │                                                          │  │
│  │  • /api/auth/login                                      │  │
│  │  • /api/auth/me                                         │  │
│  │  • /api/auth/refresh                                    │  │
│  │  • /api/auth/logout                                     │  │
│  │  • /api/users                                           │  │
│  │  • /api/users/:id/role                                  │  │
│  │  • /api/scans                                           │  │
│  │  • /api/export/excel                                    │  │
│  │  • /api/analytics/summary                               │  │
│  │  • /api/analytics/trends                                │  │
│  │  • /api/ocr/process                                     │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                    │
│                            ▼                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   Supabase                               │  │
│  │                                                          │  │
│  │  • PostgreSQL (users, scans, analytics_cache)          │  │
│  │  • Auth (JWT sessions + RLS)                           │  │
│  │  • Storage (scan images)                               │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                    │
│                            ▼                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   OpenRouter                             │  │
│  │                                                          │  │
│  │  • OCR API proxy                                        │  │
│  │  • Multi-key fallback                                   │  │
│  │  • Retry + backoff                                      │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      Mobile App (Existing)                      │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ React 19 + Vite + IndexedDB (local-first)               │ │
│  │                                                          │ │
│  │ • Camera capture → OCR → Save to Backend               │ │
│  │ • All roles (admin/manager/user) can use mobile app    │ │
│  └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

Data Flow:
1. Mobile app → Backend API → OCR (OpenRouter) → Supabase
2. Dashboard → Backend API → Supabase (read users/scans/analytics)
3. Backend enforces auth, RLS, multi-key fallback, retry logic
4. Dashboard is frontend-only: no API routes, no Supabase imports, no OpenRouter
```

---

### UI VISION

#### Theme: Professional Admin Dashboard

**Visual Direction**: Clean, data-dense, trust-building admin interface. Inspired by Linear, Vercel Dashboard, Supabase Dashboard. Prioritize information density and quick actions over visual flair.

**Color Psychology**:
- **Primary Blue (#2563EB)**: Trust, professionalism, action (buttons, links)
- **Success Green (#10B981)**: Positive feedback, success states
- **Warning Amber (#F59E0B)**: Caution, alerts
- **Error Red (#EF4444)**: Destructive actions, errors
- **Neutral Grays**: Clean, minimal distraction (backgrounds, borders, text)

**Typography**:
- **Sans-serif**: Inter (modern, readable, professional)
- **Monospace**: JetBrains Mono (code, IDs, technical data)
- **Scale**: 12px (labels) → 14px (body) → 24px (page titles) → 30px (KPI numbers)

**Layout Pattern**: Sidebar + Header + Content

```
┌─────────────────────────────────────────────────────────────┐
│  Sidebar (240px)  │  Header (64px)                          │
│  ─────────────    │  ─────────────────────────────────────  │
│                   │  Page Title    [Search] [Profile]       │
│  Logo             │                                          │
│                   │  Content Area (1200px max-width)        │
│  Navigation       │  ┌──────────────────────────────────┐   │
│  ├─ Dashboard     │  │                                  │   │
│  ├─ Users         │  │  [KPI Cards / Tables / Charts]   │   │
│  ├─ History       │  │                                  │   │
│  ├─ Analytics     │  │                                  │   │
│  └─ Settings      │  └──────────────────────────────────┘   │
│                   │                                          │
│  [Logout]         │                                          │
└─────────────────────────────────────────────────────────────┘
```

**Component System** (shadcn/ui + Radix UI):
- Button (primary, secondary, destructive)
- Input (with icon, validation)
- Table (sortable, filterable, paginated via TanStack Table)
- Card (KPI cards, chart containers)
- Dialog (modals for create/edit/delete)
- Toast (Sonner for success/error feedback)
- Skeleton (loading states)

**Spacing System**: Tailwind scale (4px, 8px, 12px, 16px, 24px, 32px)

**Accessibility**:
- Touch targets ≥44px
- WCAG AA contrast (4.5:1 for text)
- Focus rings (2px blue)
- Screen reader labels
- Keyboard navigation

---

### API DESIGN

#### REST API Pattern

**Base URL**: Configured via `NEXT_PUBLIC_BACKEND_API_URL` environment variable

**Authentication**: JWT Bearer token in `Authorization: Bearer <token>` header

**Response Envelope**:
```typescript
{
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
```

#### Backend Endpoints (External API)

**Auth**:
- `POST /api/auth/login` — Admin login
- `POST /api/auth/logout` — Logout
- `GET /api/auth/me` — Get current user
- `POST /api/auth/refresh` — Refresh access token

**Users** (admin only):
- `GET /api/users` — List users (pagination, search, filter)
- `POST /api/users` — Create user
- `PATCH /api/users/:id/role` — Update user role
- `DELETE /api/users/:id` — Delete user (lockout protection)

**Scans** (admin sees all):
- `GET /api/scans` — List scans (pagination, search, filter)
- `GET /api/scans/:id` — Get scan detail
- `DELETE /api/scans/:id` — Delete scan (admin only)

**Export**:
- `POST /api/export/excel` — Export filtered scans to Excel

**Analytics** (admin only):
- `GET /api/analytics/summary` — KPI cards (total scans, active users, cost, success rate)
- `GET /api/analytics/trends` — Scan volume trend (7d/30d)
- `GET /api/analytics/top-products` — Top products table
- `GET /api/analytics/top-users` — Top users table
- `GET /api/analytics/api-usage` — API usage by key

**OCR Proxy** (mobile app calls this, not dashboard):
- `POST /api/ocr/process` — Process OCR (multi-key fallback + retry)

---

### MVP SCOPE

#### IN (P0 Requirements — MVP)

| Domain | Screens/Features | Priority |
|--------|------------------|----------|
| **Authentication** | Login page, admin gate, token storage, logout | P0 |
| **User Management** | Users table (list, search, filter), create user dialog, edit role dialog, delete confirmation | P0 |
| **Scan History** | Scans table (list, search, filter by user/date), scan detail modal, export trigger, delete scan | P0 |
| **Analytics** | Dashboard overview (4 KPI cards, scan volume chart, top products/users tables), date range filter | P0 |
| **UI/UX** | Sidebar navigation, header, 4 main screens, shadcn/ui components, loading/empty/error states | P0 |
| **Testing** | Component tests (UI), 80%+ coverage | P0 |

**Total MVP screens**: 4 main screens + 1 login page = 5 screens

**Estimated effort**: 56 hours (~7 days for 1 developer)

#### OUT (Post-MVP)

| Domain | Phase |
|--------|-------|
| **Password reset via email** | Phase 2 |
| **API key management UI** | Phase 2 |
| **Advanced analytics** (error rate, model tier breakdown) | Phase 2 |
| **Bulk user operations** (import CSV, bulk delete) | Phase 2 |
| **Audit logs** (detailed activity tracking) | Phase 2 |
| **Notifications** (email alerts for errors) | Phase 2 |
| **Responsive design** (tablet/mobile breakpoints) | Phase 2 |
| **E2E tests** (Playwright) | Phase 2 |
| **Real-time updates** (WebSocket) | Phase 2 |
| **i18n** (English/Vietnamese toggle) | Phase 2 |
| **Multi-tenancy** (separate organizations) | Phase 3 |
| **Advanced RBAC** (custom permissions) | Phase 3 |
| **Data retention policies** (auto-delete old scans) | Phase 3 |
| **Backup/restore** (manual DB export) | Phase 3 |
| **Dark mode** | Phase 3 |
| **Mobile dashboard** (responsive) | Phase 3 |

---

### KEY DECISIONS

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | **Pattern F: Enterprise Module** | Admin dashboard for internal use (warehouse managers + IT admins), not public-facing. Desktop-first, data-dense, RBAC-gated. |
| 2 | **Frontend-only dashboard** | Backend API lives in separate `HLVN-serverless` project. Dashboard calls external API. No API routes, Supabase, or OpenRouter in dashboard. |
| 3 | **Next.js 15 App Router** | Vercel-optimized, modern routing with layouts, SSR/SSG optional, TypeScript support. |
| 4 | **shadcn/ui + Radix UI** | Pre-built accessible components, copy-paste approach (no npm dependency), Tailwind styling, WAI-ARIA compliant. |
| 5 | **TanStack Table** | Headless table library (full UI control), free MIT license, powerful filtering/sorting/pagination. |
| 6 | **Recharts** | React-native declarative charts, TypeScript support, responsive by default. |
| 7 | **Zustand for client state only** | Lightweight state management for auth session and UI state. Server data fetched per page via backend API. |
| 8 | **Inter font** | Modern, readable, professional, widely used in admin dashboards (Linear, Vercel, Supabase). |
| 9 | **Blue primary color (#2563EB)** | Trust, professionalism, action. Matches Tailwind Blue 600, consistent with design system. |
| 10 | **Desktop-first (1440px+)** | Target users are warehouse managers and IT admins on desktop. Mobile responsive deferred to Phase 2. |
| 11 | **Vietnamese labels** | OCR data is Vietnamese, target users are Vietnamese-speaking. English i18n deferred to Phase 2. |
| 12 | **4 main screens** | Dashboard Overview, Users Management, Scan History, Analytics. Minimal viable admin interface. |

---

### DESIGN SYSTEM SUMMARY

**Colors**:
- Primary: `#2563EB` (Blue 600)
- Success: `#10B981` (Green 500)
- Warning: `#F59E0B` (Amber 500)
- Error: `#EF4444` (Red 500)
- Background: `#FFFFFF` (White)
- Surface: `#F9FAFB` (Gray 50)
- Border: `#E5E7EB` (Gray 200)
- Text Primary: `#111827` (Gray 900)
- Text Secondary: `#6B7280` (Gray 500)

**Typography**:
- Sans: Inter (400, 500, 600, 700)
- Mono: JetBrains Mono
- Scale: 12px, 14px, 16px, 18px, 20px, 24px, 30px

**Spacing**:
- Tailwind scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px

**Components**:
- Button (40px height, 6px radius)
- Input (40px height, 6px radius)
- Card (8px radius, 1px border)
- Table (48px row height, 16px cell padding)
- KPI Card (100px height, 8px radius)

**Icons**:
- Lucide React (16px, 20px, 24px)

---

### QUALITY GATE: Vision Self-Review

#### Completeness ✅
- [x] Project type classified (Pattern F: Enterprise Module)
- [x] Architecture diagram provided (Dashboard → Backend API → Supabase/OpenRouter)
- [x] UI vision defined (theme, colors, typography, layout, components)
- [x] API design specified (REST, endpoints, envelope, auth)
- [x] MVP scope clear (5 screens, 56 hours)
- [x] Key decisions documented (12 decisions with rationale)
- [x] Design system summarized (colors, typography, spacing, components, icons)

#### Alignment with Scope ✅
- [x] Dashboard is frontend-only (no API routes, no Supabase imports, no OpenRouter)
- [x] Backend API is external (`D:\scripts\HLVN\HLVN-serverless`)
- [x] All backend logic deferred to serverless project
- [x] Dashboard calls backend via HTTP/REST

#### Clarity ✅
- [x] Architecture diagram is clear and complete
- [x] UI vision is specific (not vague "clean minimal")
- [x] API design is concrete (endpoints, envelope, auth)
- [x] MVP scope is actionable (screens, features, effort estimate)
- [x] Key decisions have clear rationale

#### Consistency ✅
- [x] No conflicts between Vision and frontend-only scope
- [x] All decisions align with Pattern F (Enterprise Module)
- [x] Backend responsibilities clearly separated

#### Actionability ✅
- [x] Vision is implementable (no speculative features)
- [x] MVP scope is realistic (56 hours = 7 days estimate)
- [x] Design system is complete (ready for shadcn/ui setup)
- [x] API design is ready for implementation (endpoints defined)

**Overall**: ✅ **PASSED** — Vision complete, ready for Blueprint

---

### NEXT STEPS

1. **Blueprint** — Design technical architecture (component tree, state management, file structure)
2. **TIP Generation** — Create implementation tips for each module
3. **Implementation** — Build MVP (Setup → Auth → Users → Scans → Analytics → Tests)

---

*Project Context updated: 2026-05-08 | Framework: Vibecode Kit v5.0 | Project: HLVN Dashboard (Frontend-Only)*
