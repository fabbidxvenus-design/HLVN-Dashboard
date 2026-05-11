# Vibecode Kit v5.0 — HLVN Dashboard Builder Handoff

> Paste this into Claude Code at the START of each build session.
> Then paste the specific TIP(s) for that session.

---

## VAI TRO

Bạn là Builder cho HLVN Dashboard. Nhiệm vụ là implement dashboard admin desktop-first cho OCR mobile app theo đúng Blueprint, Requirements Matrix, Vision, Design Brief, và Standards trong `coding-packs/`.

Bạn phải ưu tiên:
1. Correctness và security trước tốc độ.
2. Backend API là nguồn sự thật cho auth/authorization và data.
3. Dashboard là frontend-only; không implement API routes, Supabase, hoặc OpenRouter trong project này.
4. UI phải match design đã review trong `coding-packs/design/design-review.md`.
5. Code phải testable, typed, và không silent failure.

---

## QUY TAC TUYET DOI

1. **Không hardcode secrets** — dùng environment variables cho backend API URL.
2. **Không tạo `app/api/*` routes** — dashboard chỉ gọi external backend API.
3. **Không import Supabase packages** — backend owns Supabase integration.
4. **Không implement OpenRouter logic** — backend owns OCR processing.
5. **Không mutate state/data structures in-place** — dùng immutable updates.
6. **Không swallow errors** — return response envelope rõ ràng và show user-friendly messages.
7. **Không mark complete nếu chưa chạy checks/tests liên quan** — tối thiểu typecheck + unit tests cho module vừa sửa.

---

## PROJECT CONTEXT

### Product Mission

**Problem**: Quản lý hệ thống OCR cho warehouse/logistics: quản lý users, xem lịch sử scan của tất cả nhân viên, phân quyền admin/manager/user, theo dõi sử dụng API và chi phí.

**Target Users**:
- Quản lý kho: theo dõi hoạt động scan, xem báo cáo, quản lý quyền truy cập.
- IT Admin: quản lý hệ thống, API keys, chi phí, users.

**Unique Value**:
- Tích hợp chặt với OCR mobile app.
- RBAC: admin/manager/user, chỉ admin vào dashboard.
- Quản lý tập trung users, scan history, analytics, API usage.

### Architecture

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

### Roadmap Priorities

**MVP**:
1. Authentication & Authorization (frontend UX + backend API calls)
2. User Management UI
3. Scan History View UI
4. Analytics Dashboard UI

**Phase 2**:
- API key management UI
- Advanced analytics filters
- Bulk operations UI
- Audit logs UI
- Notifications UI
- Responsive design (tablet/mobile)
- E2E tests (Playwright)
- Realtime updates UI
- i18n toggle (EN/VI)

**Phase 3**:
- Multi-tenancy
- Advanced RBAC UI
- Data retention policies UI
- Backup/restore UI
- Dark mode
- Mobile dashboard

### Tech Stack

| Layer | Technology | Version/Notes | Purpose |
|-------|------------|---------------|---------|
| Framework | Next.js | 15.x App Router | Dashboard pages and routing |
| Language | TypeScript | 6.0+ | Type safety |
| Styling | Tailwind CSS | 3.4+ | Utility-first styling |
| UI Library | shadcn/ui | latest | Accessible components |
| UI Primitives | Radix UI | latest | A11y primitives |
| State | Zustand | 5.0+ | Client UI/auth state only |
| Forms | React Hook Form | 7.75+ | Login/create/edit forms |
| Tables | TanStack Table | 8.x | Sorting/filtering/pagination |
| Charts | Recharts | 2.x | Analytics charts |
| Icons | Lucide React | 1.14+ | Navigation/actions/status icons |
| Toast | Sonner | 2.0+ | Success/error feedback |
| Date Picker | React Day Picker | latest | Date range filters |
| Tests | Vitest + Testing Library | current | Unit/component tests |
| Backend API | External | — | `D:\scripts\HLVN\HLVN-serverless` |
| Hosting | Vercel | managed | Next.js deploy + env vars |

### Workspace Structure

Target implementation structure:

```text
HLVN-dashboard/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Dashboard overview
│   │   ├── users/
│   │   │   └── page.tsx
│   │   ├── scans/
│   │   │   └── page.tsx
│   │   └── analytics/
│   │       └── page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── dashboard/
│   │   ├── AppSidebar.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── DashboardShell.tsx
│   │   ├── LoadingState.tsx
│   │   ├── EmptyState.tsx
│   │   └── ErrorState.tsx
│   ├── users/
│   │   ├── UsersTable.tsx
│   │   ├── UserFilters.tsx
│   │   ├── CreateUserDialog.tsx
│   │   ├── EditUserRoleDialog.tsx
│   │   └── DeleteUserDialog.tsx
│   ├── scans/
│   │   ├── ScansTable.tsx
│   │   ├── ScanFilters.tsx
│   │   ├── ScanDetailDialog.tsx
│   │   ├── DeleteScanDialog.tsx
│   │   └── ExportScansButton.tsx
│   ├── analytics/
│   │   ├── KpiCard.tsx
│   │   ├── ScanVolumeChart.tsx
│   │   ├── TopProductsTable.tsx
│   │   ├── TopUsersTable.tsx
│   │   └── ApiUsageTable.tsx
│   └── ui/                              # shadcn/ui copied components
├── lib/
│   ├── api/
│   │   ├── client.ts                    # fetch wrapper with auth
│   │   ├── endpoints.ts                 # typed endpoint functions
│   │   ├── users.ts
│   │   ├── scans.ts
│   │   ├── analytics.ts
│   │   └── errors.ts
│   ├── auth/
│   │   ├── token-store.ts               # browser token persistence
│   │   └── auth-guard.ts                # admin check helpers
│   └── utils.ts
├── hooks/
│   ├── useAuthSession.ts
│   ├── useUsersQuery.ts
│   ├── useScansQuery.ts
│   └── useAnalyticsQuery.ts
├── stores/
│   └── auth-store.ts
├── types/
│   ├── api.ts
│   ├── auth.ts
│   ├── user.ts
│   ├── scan.ts
│   └── analytics.ts
└── tests/
    ├── components/
    ├── hooks/
    └── lib/
```

### Entry Points and Routing

| Route | File | Auth | Purpose |
|-------|------|------|---------|
| `/login` | `app/(auth)/login/page.tsx` | Public | Admin login |
| `/` | `app/(dashboard)/page.tsx` | Admin | Dashboard overview |
| `/users` | `app/(dashboard)/users/page.tsx` | Admin | User management |
| `/scans` | `app/(dashboard)/scans/page.tsx` | Admin | Scan history |
| `/analytics` | `app/(dashboard)/analytics/page.tsx` | Admin | Analytics dashboard |

Dashboard layout gate: `app/(dashboard)/layout.tsx` must check session + user role before rendering children.

### Backend API Patterns

Dashboard calls backend at base URL configured via `NEXT_PUBLIC_BACKEND_API_URL`.

All API responses use:

```ts
type ApiResponse<T> =
  | { success: true; data: T; meta?: ApiMeta }
  | { success: false; error: string; code: ApiErrorCode; meta?: ApiMeta };

interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  hasMore?: boolean;
}

type ApiErrorCode =
  | 'AUTH_FAILED'
  | 'FORBIDDEN'
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'QUOTA_EXCEEDED'
  | 'PROVIDER_ERROR'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR';
```

Rules:
- Attach `Authorization: Bearer <token>` to authenticated requests.
- Handle `401` by clearing session and redirecting to `/login`.
- Handle `403` by showing access-denied message.
- Handle `400` by showing validation errors.
- Handle `404` by showing not-found message.
- Handle `500` by showing generic error with retry option.
- Never expose raw backend error objects to user.

### Backend API Contract

Dashboard calls these endpoints:

**Auth**:
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/refresh` (optional)
- `POST /api/auth/logout`

**Users**:
- `GET /api/users`
- `POST /api/users`
- `PATCH /api/users/:id/role`
- `DELETE /api/users/:id`

**Scans**:
- `GET /api/scans`
- `GET /api/scans/:id`
- `DELETE /api/scans/:id`

**Export**:
- `POST /api/export/excel`

**Analytics**:
- `GET /api/analytics/summary`
- `GET /api/analytics/trends`
- `GET /api/analytics/top-products`
- `GET /api/analytics/top-users`
- `GET /api/analytics/api-usage`

**OCR** (mobile app calls this, not dashboard):
- `POST /api/ocr/process`

Backend implements all auth, validation, RLS, retry, fallback, storage logic.

### Applicable Standards

- [`standards/auth/rbac-admin-gate.md`](standards/auth/rbac-admin-gate.md) — role-based admin gate (frontend UX only; backend enforces).

Deprecated and not used in dashboard:
- `standards/api/multi-key-fallback.md` — backend responsibility.
- `standards/api/retry-backoff.md` — backend responsibility.
- `standards/auth/supabase-auth-rls.md` — backend responsibility.
- `standards/auth/jwt-refresh-tokens.md` — backend responsibility.
- `standards/auth/password-hashing.md` — backend responsibility.

---

## MODULE ARCHITECTURE

### Module 1 — Project Setup + Design System

Responsibilities:
- Initialize Next.js 15 with TypeScript and Tailwind.
- Configure shadcn/ui and design tokens.
- Create dashboard shell with sidebar and header.

Files:
- `app/globals.css`
- `app/layout.tsx`
- `app/(dashboard)/layout.tsx`
- `components/dashboard/AppSidebar.tsx`
- `components/dashboard/DashboardHeader.tsx`
- `components/dashboard/DashboardShell.tsx`

### Module 2 — Backend API Client + Auth Flow

Responsibilities:
- API client with bearer token injection.
- Login page and session management.
- Dashboard route gate.
- Token storage and refresh logic.

Files:
- `lib/api/client.ts`
- `lib/api/endpoints.ts`
- `lib/api/errors.ts`
- `lib/auth/token-store.ts`
- `lib/auth/auth-guard.ts`
- `hooks/useAuthSession.ts`
- `stores/auth-store.ts`
- `app/(auth)/login/page.tsx`
- `app/(dashboard)/layout.tsx` (update with gate)

### Module 3 — Users Management UI

Responsibilities:
- Users table with search/filter/pagination.
- Create/edit/delete dialogs.
- Backend API calls for CRUD.

Files:
- `app/(dashboard)/users/page.tsx`
- `components/users/*`
- `hooks/useUsersQuery.ts`
- `lib/api/users.ts`
- `types/user.ts`

### Module 4 — Scans History UI

Responsibilities:
- Scans table with filters and pagination.
- Scan detail dialog.
- Delete action and export trigger.

Files:
- `app/(dashboard)/scans/page.tsx`
- `components/scans/*`
- `hooks/useScansQuery.ts`
- `lib/api/scans.ts`
- `types/scan.ts`

### Module 5 — Analytics Dashboard UI

Responsibilities:
- KPI cards.
- Scan trend chart.
- Top products/users/API usage tables.

Files:
- `app/(dashboard)/page.tsx`
- `app/(dashboard)/analytics/page.tsx`
- `components/analytics/*`
- `hooks/useAnalyticsQuery.ts`
- `lib/api/analytics.ts`
- `types/analytics.ts`

### Module 6 — UI Polish + A11y + Tests

Responsibilities:
- Loading/empty/error states.
- Accessibility compliance.
- Keyboard navigation.
- Component and utility tests.

Files:
- `components/dashboard/LoadingState.tsx`
- `components/dashboard/EmptyState.tsx`
- `components/dashboard/ErrorState.tsx`
- `tests/**/*`
- `vitest.config.ts`

---

## DATA MODELS

### Backend Entities (for reference only)

```ts
type UserRole = 'admin' | 'manager' | 'user';

interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at?: string;
  last_login: string | null;
}

interface ScanRecord {
  id: string;
  user_id: string;
  user_email?: string;
  timestamp: string;
  image_url: string | null;
  ocr_structured: OCRResponse;
  token_usage: TokenUsage;
  api_key_index: number;
  model_tier?: 'free' | 'default' | 'high' | null;
  edited: boolean;
  created_at?: string;
  updated_at?: string;
}

interface OCRResponse {
  title?: string;
  fields?: OCRField[];
  sizes?: OCRSize[];
  raw_text?: string;
  notes?: string[];
}

interface OCRField {
  field: string;
  value: string;
  confidence?: 'high' | 'medium' | 'low';
  category?: 'main' | 'other';
}

interface OCRSize {
  size: string;
  quantity: number;
}

interface TokenUsage {
  input: number;
  output: number;
  cost: number;
}
```

### Client State Shape

Use Zustand only for session/UI state, not server state duplication.

```ts
interface AuthStoreState {
  user: UserProfile | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}
```

Server data should be fetched per page through backend API; do not mirror full users/scans lists into Zustand.

---

## COMPONENT TREE

### Dashboard Shell

```text
DashboardLayout
├── AppSidebar
│   ├── SidebarBrand
│   ├── SidebarNavItem[]
│   └── LogoutButton
├── DashboardHeader
│   ├── PageTitle
│   └── UserMenu
└── PageContent
```

Props:

```ts
interface AppSidebarProps {
  activePath: string;
  user: UserProfile;
}

interface DashboardHeaderProps {
  title: string;
  user: UserProfile;
}

interface KpiCardProps {
  label: string;
  value: string | number;
  tone?: 'default' | 'success' | 'warning' | 'error';
  icon?: React.ComponentType<{ className?: string }>;
}
```

### Dashboard Overview Page

```text
DashboardOverviewPage
├── KpiGrid
│   └── KpiCard[4]
├── ScanVolumeChart
└── TopProductsTable
```

### Users Page

```text
UsersPage
├── UsersPageHeader
│   └── CreateUserDialog
├── UserFilters
│   ├── SearchInput
│   └── RoleSelect
├── UsersTable
│   ├── TableHeader
│   ├── UserTableRow[]
│   └── TablePagination
├── EditUserRoleDialog
└── DeleteUserDialog
```

### Scan History Page

```text
ScansPage
├── ScansPageHeader
│   └── ExportScansButton
├── ScanFilters
│   ├── SearchInput
│   ├── UserSelect
│   └── DateRangePicker
├── ScansTable
│   ├── ScanThumbnailCell
│   ├── OCRSummaryCell
│   ├── UserCell
│   ├── TokenUsageCell
│   └── RowActions
└── ScanDetailDialog
```

### Analytics Page

```text
AnalyticsPage
├── AnalyticsHeader
│   └── DateRangePicker
├── KpiGrid
│   └── KpiCard[4]
├── ScanVolumeChart
├── AnalyticsColumns
│   ├── TopUsersTable
│   └── ApiUsageTable
└── TopProductsTable
```

---

## INTEGRATION POINTS

### Backend API

Flow:
1. User enters email/password on `/login`.
2. Client calls `POST /api/auth/login` via API client.
3. Backend validates credentials and returns session if admin.
4. Client stores token and redirects to `/`.
5. Dashboard layout calls `GET /api/auth/me` to validate session.
6. All authenticated requests attach bearer token.

### Mock Data for Parallel Development

Rules:
- Dashboard may use mock data while `HLVN-serverless` endpoints are not complete.
- Mock data must live behind the same typed API functions/components use for real backend calls.
- Mock responses must match serverless contracts exactly: response envelope, `ApiErrorCode`, camelCase fields, `hasMore` pagination meta, and analytics `from`/`to` params.
- Mock mode must be environment-controlled, for example `NEXT_PUBLIC_USE_MOCK_API=true`, and easy to turn off without changing page/component code.
- Do not create `app/api/*` mock routes in the dashboard. Mocking should happen in frontend API client/modules only.
- Do not calculate backend-owned analytics from raw scans; use pre-aggregated mock analytics responses shaped like backend responses.
- Treat serverless coding-packs as source of truth. If mock shape conflicts with serverless contract, update the mock.

### Token Management

Rules:
- Store tokens in browser storage only after successful login.
- Clear tokens on logout or 401.
- Never store passwords.
- Refresh token logic optional for MVP; implement if backend provides endpoint.

---

## NON-FUNCTIONAL REQUIREMENTS

### Performance Budgets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.0s |
| Interaction to Next Paint | < 200ms |
| Cumulative Layout Shift | < 0.1 |
| Initial JS bundle (dashboard route) | < 300KB gzip |
| CSS bundle | < 50KB |
| Dashboard data API response | < 500ms p95 for 50 rows |

### Loading States

Required:
- Login submit button spinner.
- Dashboard KPI skeleton cards.
- Table skeleton rows (users/scans).
- Chart skeleton containers.
- Export button loading state.

### Empty States

Required:
- No users found.
- No scans found.
- No analytics data for selected date range.
- No search results.

### Error Handling

Frontend:
- Show Sonner toast for API failures.
- Inline form validation errors under fields.
- Friendly Vietnamese messages.
- Retry button for table/chart load failures.

Backend:
- Backend validates request inputs.
- Backend returns response envelope.
- Dashboard maps errors to user-friendly messages.

### Accessibility

Required:
- 44px minimum interactive target.
- Visible focus rings.
- ARIA labels on icon-only actions.
- Proper table headers.
- Dialog focus trap via Radix UI.
- Color contrast WCAG AA.

---

## EXECUTION ORDER

### Week 1 — Foundation

1. **TIP-001: Project Setup + Design System**
   - Initialize Next.js 15 app structure.
   - Configure Tailwind, shadcn/ui, global tokens.
   - Add base dashboard shell.

2. **TIP-002: Backend API Client + Auth Flow**
   - Create API client with bearer token.
   - Implement login and admin-only dashboard gate.

### Week 2 — Feature UI

3. **TIP-003: Users Management UI**
   - Users table, filters, dialogs.
   - Backend API calls for CRUD.

4. **TIP-004: Scans History UI**
   - Scans table, filters, detail dialog, export button.
   - Backend API calls for scans.

5. **TIP-005: Analytics Dashboard UI**
   - KPI/trend/top-products/top-users/api-usage UI.
   - Dashboard overview + Analytics page.

### Week 3 — Polish + Testing

6. **TIP-006: UI Polish + A11y + Tests**
   - Skeletons, empty states, toasts, focus states, ARIA labels.
   - Component and utility tests.

---

## HOW TO USE TIPs

For each build session:
1. Paste this Builder Handoff first.
2. Paste only the TIP(s) for the session.
3. Implement only files listed in the TIP unless a dependency requires a small support file.
4. Run the TIP's required checks before marking complete.
5. Report using Completion Report Format below.

Do not combine unrelated TIPs unless dependencies are already complete and tests are passing.

---

## COMPLETION REPORT FORMAT

```markdown
## Completion Report — TIP-XXX

### Implemented
- [file] — change summary

### Checks Run
- [command] — pass/fail

### Requirements Covered
- REQ-...

### Notes / Deviations
- None, or explain why deviation was needed

### Remaining Work
- Next TIP or blockers
```

---

## ESCALATION RULES

### Level 1 — Local Fix
Use when implementation detail is unclear but scope is unchanged.
- Read relevant coding-packs docs.
- Choose simplest implementation aligned with standards.
- Document in Completion Report.

### Level 2 — Architecture Decision Needed
Use when a choice changes data model, API contract, auth behavior, or MVP scope.
- Stop implementation.
- Propose 2-3 options with tradeoffs.
- Ask user for decision before proceeding.

### Level 3 — Security / Data Risk
Use when there is possible secret exposure, auth bypass, data loss, or destructive operation.
- Stop immediately.
- Use security-reviewer if code exists.
- Do not proceed until risk is resolved and user is informed.

---

## QUALITY GATE: Blueprint Self-Review

- [x] Module architecture defines folder structure, entry points, and responsibilities.
- [x] Data models include backend entities and client state.
- [x] Backend API contract defines endpoints, request, response, auth, and errors.
- [x] Component tree defines page → section → component hierarchy and props.
- [x] Integration points cover backend API and token management.
- [x] Non-functional requirements include performance, loading, empty, error, and accessibility requirements.
- [x] Execution order maps to TIPs with dependencies.
- [x] Product mission and roadmap priorities injected.
- [x] Applicable standards injected and referenced.
- [x] Scope clarification explicit: dashboard is frontend-only; backend API is external.

**Verdict**: PASSED — Builder can proceed to TIP execution.

---

*Builder Handoff revised: 2026-05-08 | Framework: Vibecode Kit v5.0 | Project: HLVN Dashboard (Frontend-Only)*
