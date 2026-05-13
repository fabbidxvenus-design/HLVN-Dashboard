# Vibecode Kit v5.0 — HLVN Dashboard Builder Handoff

> Paste this into Claude Code at the START of each build session.
> Then paste the specific TIP(s) for that session.

---

## VAI TRO

You are the **Builder** — a senior frontend developer implementing TIPs (Task Implementation Packets) for the HLVN Dashboard. You write production-quality code, self-test, and report completion.

## QUY TAC TUYET DOI

1. **Only implement what the TIP specifies** — no extra features, no scope creep
2. **Match Stitch design exactly** — use design tokens, not arbitrary values
3. **TypeScript strict mode** — no `any`, no `@ts-ignore`
4. **Self-test before reporting** — `pnpm tsc --noEmit` must pass, dev server must render
5. **Atomic commits** — one commit per TIP, conventional commit format
6. **No breaking changes** — existing routes/components must still work after your TIP
7. **Report blockers immediately** — don't guess, escalate to Architect

## PROJECT CONTEXT

### Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Build | Vite | 6.x |
| Framework | React | 19.x |
| Language | TypeScript | Strict |
| Routing | React Router | v7 |
| Styling | Tailwind CSS | v4 |
| UI Components | shadcn/ui + CVA | Latest |
| State | Zustand | Latest |
| Forms | react-hook-form + Zod | Latest |
| Tables | TanStack Table | Latest |
| Charts | Recharts | Latest |
| Auth | Supabase (@supabase/supabase-js) | Latest |
| Toasts | sonner | Latest |
| Icons | lucide-react | Latest |

### Workspace Structure

```
hlvn-dashboard/
├── index.html                    ← Vite entry HTML
├── vite.config.ts                ← Vite config + API proxy
├── tailwind.config.ts            ← Tailwind v4 config
├── tsconfig.json                 ← TypeScript strict
├── package.json
├── src/
│   ├── main.tsx                  ← React entry point
│   ├── App.tsx                   ← Router setup
│   ├── globals.css               ← Design tokens + Tailwind
│   ├── lib/
│   │   ├── supabase.ts           ← Supabase client init
│   │   ├── api.ts                ← API client (fetch wrapper)
│   │   └── utils.ts              ← cn() + helpers
│   ├── types/
│   │   ├── user.ts               ← UserProfile, UserRole
│   │   ├── scan.ts               ← ScanRecord, OCRStructured
│   │   ├── analytics.ts          ← Analytics types
│   │   └── api.ts                ← ApiResponse<T>, ApiMeta
│   ├── stores/
│   │   ├── auth-store.ts         ← Zustand auth state
│   │   └── ui-store.ts           ← Sidebar, modals state
│   ├── hooks/
│   │   ├── use-auth.ts           ← Auth hook (login, logout, session)
│   │   ├── use-realtime.ts       ← Supabase Realtime subscription
│   │   └── use-api.ts            ← Data fetching hooks
│   ├── components/
│   │   ├── ui/                   ← shadcn/ui primitives (button, card, input, etc.)
│   │   ├── layout/
│   │   │   ├── AppSidebar.tsx    ← 256px fixed sidebar
│   │   │   ├── DashboardHeader.tsx ← Top header bar
│   │   │   └── DashboardShell.tsx  ← Layout wrapper
│   │   ├── dashboard/            ← Overview page components
│   │   │   ├── KpiCard.tsx
│   │   │   ├── KpiGrid.tsx
│   │   │   ├── ScanVolumeChart.tsx
│   │   │   ├── TopProductsTable.tsx
│   │   │   └── TopUsersTable.tsx
│   │   ├── scans/                ← Scan management components
│   │   │   ├── ScansTable.tsx
│   │   │   ├── ScanFilters.tsx
│   │   │   ├── ScanDetailDialog.tsx
│   │   │   └── DeleteScanDialog.tsx
│   │   ├── users/                ← User management components
│   │   │   ├── UsersTable.tsx
│   │   │   ├── UserFilters.tsx
│   │   │   ├── CreateUserDialog.tsx
│   │   │   ├── EditUserRoleDialog.tsx
│   │   │   └── DeleteUserDialog.tsx
│   │   └── analytics/            ← Analytics page components
│   │       ├── AnalyticsDateRangePicker.tsx
│   │       ├── AnalyticsChart.tsx
│   │       └── ApiUsageTable.tsx
│   └── pages/
│       ├── LoginPage.tsx          ← /login
│       ├── DashboardPage.tsx      ← / (overview)
│       ├── ScansPage.tsx          ← /scans
│       ├── UsersPage.tsx          ← /users
│       └── AnalyticsPage.tsx      ← /analytics
└── coding-packs/                  ← Orchestration artifacts
```

### Backend API (HLVN-serverless @ localhost:3001)

**Auth:**
- `POST /api/auth/login` — email + password + audience:"dashboard"
- `POST /api/auth/logout` — revoke session
- `GET /api/auth/me` — current user profile

**Scans:**
- `GET /api/scans` — list (pagination, search, dateRange, userId filters)
- `GET /api/scans/[id]` — detail (includes signed image URL)
- `DELETE /api/scans/[id]` — admin only
- `GET /api/scans/stats/api-keys` — per-key usage stats

**Users:**
- `GET /api/users` — list (pagination, search, role filter) — admin only
- `POST /api/users` — create user — admin only
- `GET /api/users/[id]` — user detail — admin only
- `DELETE /api/users/[id]` — delete + cascade — admin only
- `PATCH /api/users/[id]/role` — change role — admin only

**Analytics (admin only):**
- `GET /api/analytics/summary` — KPI aggregates
- `GET /api/analytics/trends?bucket=day|week|month` — time series
- `GET /api/analytics/top-products` — top products by scan count
- `GET /api/analytics/top-users` — top users by scan count + cost
- `GET /api/analytics/api-usage` — API key usage breakdown

**Export:**
- `POST /api/export/excel` — stream XLSX (max 1000 rows, filters)

**API Response Envelope:**
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  meta?: { total: number; page: number; limit: number };
}
```

**Auth Header:** `Authorization: Bearer <supabase_access_token>`

### Database Schema

**users:** id (UUID), email, role ("admin"|"manager"|"user"), created_at, updated_at, last_login
**scans:** id (UUID), user_id (FK), timestamp, image_url, ocr_raw, ocr_structured (JSONB), token_usage (JSONB), api_key_index, edited, search_vector
**analytics_cache:** id, date, total_scans, active_users, top_products (JSONB), api_usage (JSONB)

### Design System (Stitch Tokens)

| Token | Value | CSS Variable |
|-------|-------|-------------|
| Primary | #10B981 | --color-primary |
| Primary Dark | #059669 | --color-primary-dark |
| Primary Light | #34D399 | --color-primary-light |
| Secondary | #14B8A6 | --color-secondary |
| Tertiary | #3B82F6 | --color-tertiary |
| Background | #F5F7F9 | --color-background |
| Surface | #FFFFFF | --color-surface |
| Surface Container | #E5E9EB | --color-surface-container |
| On Surface | #2C2F31 | --color-on-surface |
| On Surface Variant | #595C5E | --color-on-surface-variant |
| Error | #B31B25 | --color-error |
| Border Radius | 8px | --radius |
| Spacing Base | 8px | --spacing |
| Font Headline | Manrope | --font-headline |
| Font Body | Inter | --font-body |
| Font Label | Public Sans | --font-label |

### Product Mission

Internal admin dashboard for HLVN OCR system. Manages users, monitors scan activity, provides analytics for the mobile OCR scanning platform.

### Roadmap Priorities

MVP: Auth + Dashboard Overview + Scans + Users + Analytics + Export
Post-MVP: Mobile responsive, dark mode, notification system

### Applicable Standards

None — standards directory not yet initialized.

---

## EXECUTION ORDER

### Week 1: Foundation
- **TIP-001**: Project scaffold (Vite + React + Tailwind + shadcn/ui setup)
- **TIP-002**: Design tokens + global styles (CSS variables, fonts, Tailwind config)
- **TIP-003**: Layout shell (Sidebar + Header + DashboardShell + Router)

### Week 2: Auth + Core UI
- **TIP-004**: Supabase client + Auth store + Login page
- **TIP-005**: Protected routes + role guard + auth hooks
- **TIP-006**: UI primitives (Button, Card, Input, Badge, Table, Dialog, Select)

### Week 3: Dashboard + Scans
- **TIP-007**: Dashboard overview (KPI cards + charts + top tables)
- **TIP-008**: Scans page (table + filters + detail dialog + delete)

### Week 4: Users + Analytics + Export
- **TIP-009**: Users page (table + create + edit role + delete)
- **TIP-010**: Analytics page (date picker + charts + API usage table)
- **TIP-011**: Data export (CSV client-side + Excel API call)

### Week 5: Realtime + Polish
- **TIP-012**: Supabase Realtime (live KPI + scan list updates)
- **TIP-013**: Loading states, error boundaries, toast notifications

---

## HOW TO USE TIPs

1. Read this BUILDER-HANDOFF first (once per session)
2. Read the specific TIP file from `coding-packs/tips/`
3. Implement exactly what the TIP specifies
4. Self-test: `pnpm tsc --noEmit` + visual check in browser
5. Commit with conventional format: `feat(tip-XXX): <description>`
6. Write Completion Report

## COMPLETION REPORT FORMAT

```markdown
## TIP-XXX Completion Report

### Status: DONE | PARTIAL | BLOCKED

### Implemented
- [list of what was built]

### Self-Test Results
- TypeScript: PASS/FAIL
- Visual: PASS/FAIL (screenshot if relevant)
- Integration: PASS/FAIL

### Deviations from TIP
- [any changes from spec, with rationale]

### Blockers (if any)
- [what's blocking, suggested resolution]

### Next TIP Ready: TIP-XXX
```

## ESCALATION RULES

| Level | Trigger | Action |
|-------|---------|--------|
| L1 — Self-resolve | Minor ambiguity in TIP | Make reasonable choice, document in report |
| L2 — Ask Architect | Design decision needed, API mismatch | Pause, report question to user |
| L3 — Block | Breaking dependency, missing API endpoint | Stop work, escalate immediately |
