# HLVN Dashboard — Project Context (Scan Report)

> Vibecode Kit v5.0 — BƯỚC 1 (SCAN)
> Coding workspace: D:\scripts\HLVN\HLVN-dashboard
> Scanned: 2026-05-12

---

## SCAN REPORT

### PROJECT_TYPE
**Greenfield rebuild** — Source code was cleared, building from Stitch UI design

### DESIGN_SOURCE
**Stitch Project**: HLVN Dashboard Redesign v5
- **Project ID**: 14474775540072767519
- **URL**: https://stitch.withgoogle.com/projects/14474775540072767519
- **Screens**: 34 design instances covering all dashboard pages
- **Design System**: Material Design 3 inspired, emerald green theme

### TECH_STACK
| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js 16.2.5 | App Router, React 19 |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS v4 | CSS variables + @theme inline |
| UI Components | shadcn/ui (Base UI) | CVA pattern |
| State Management | Zustand | Auth store |
| Forms | react-hook-form + Zod | Validation |
| Icons | lucide-react | — |
| Fonts | Manrope (headings) + Inter (body) | Google Fonts |
| Charts | Recharts | Data visualization |
| Tables | TanStack Table | Sortable tables |
| Toasts | sonner | Notifications |

### DESIGN_SYSTEM (from Stitch)
| Token | Value |
|-------|-------|
| Primary | #10B981 (Emerald) |
| Primary Dark | #059669 |
| Primary Light | #34D399 |
| Secondary | #14B8A6 (Teal) |
| Tertiary | #3B82F6 (Blue) |
| Background | #F5F7F9 |
| Surface Container | #E5E9EB |
| Surface Container Lowest | #FFFFFF |
| On Surface | #2C2F31 |
| On Surface Variant | #595C5E |
| Error | #B31B25 |
| Font Manrope | Headlines |
| Font Inter | Body text |
| Font Public Sans | Labels |
| Border Radius | 8px (ROUND_EIGHT) |
| Spacing Base | 8px |

### EXISTING_MODULES
```
app/
├── (auth)/login/page.tsx       ← Login page
├── (dashboard)/
│   ├── layout.tsx               ← Dashboard shell
│   ├── page.tsx                 ← Overview (KPI cards + charts)
│   ├── analytics/page.tsx       ← Analytics with date picker
│   ├── scans/page.tsx           ← Scans management table
│   └── users/page.tsx           ← Users management CRUD
components/
├── dashboard/
│   ├── AppSidebar.tsx           ← Navigation sidebar (256px)
│   ├── DashboardHeader.tsx     ← Header with search
│   └── DashboardShell.tsx       ← Layout wrapper
├── ui/
│   ├── button.tsx               ← CVA button variants
│   ├── card.tsx                 ← Surface card
│   ├── badge.tsx                ← Status badges
│   ├── input.tsx                ← Text input
│   ├── table.tsx                ← Data table
│   └── dialog.tsx               ← Modal dialog
├── analytics/
│   ├── KpiCard.tsx              ← KPI metric card
│   ├── KpiGrid.tsx              ← 4-column KPI grid
│   ├── ScanVolumeChart.tsx      ← Line chart with legend
│   └── AnalyticsDateRangePicker.tsx
├── scans/
│   └── ScansTable.tsx           ← Scans data table
└── users/
    ├── UsersTable.tsx           ← Users data table
    └── UserRoleBadge.tsx        ← Role indicator
stores/
└── auth-store.ts                ← Zustand auth state
lib/
└── api/endpoints.ts             ← API client
types/
└── user.ts                      ← UserProfile, UserRole
```

### PATTERNS_DETECTED
| Pattern | Description |
|---------|-------------|
| App Router Layout | Route groups for auth/dashboard separation |
| CVA Components | Class Variance Authority for component variants |
| CSS Variables Theme | `--primary`, `--surface`, `--border` in globals.css |
| Manrope Inline Style | `style={{ fontFamily: "'Manrope', sans-serif" }}` on headings |
| Emerald Active Nav | `bg-[rgba(16,185,129,0.12)]` on active sidebar item |
| Zustand Store | Auth state with session persistence |
| Mock API | API endpoints return mock data, ready for real backend |

### REUSABLE_COMPONENTS
| Component | Path | Purpose |
|-----------|------|---------|
| DashboardShell | components/dashboard/ | Main layout wrapper |
| AppSidebar | components/dashboard/ | Navigation with active state |
| DashboardHeader | components/dashboard/ | Top bar with search |
| KpiCard | components/analytics/ | Metric card with icon + trend |
| ScanVolumeChart | components/analytics/ | Recharts line chart |
| ScansTable | components/scans/ | TanStack table for scans |
| UsersTable | components/users/ | TanStack table for users |
| UserRoleBadge | components/users/ | Role-colored badge |

### GAPS_DETECTED
| Gap | Description |
|-----|-------------|
| No API integration | Mock data only, Supabase/OpenRouter endpoints not connected |
| No dark mode | Design system supports light mode only |
| No mobile responsive | Desktop-first, sidebar doesn't collapse |
| No tests | No Vitest/Playwright tests yet |
| No error boundaries | Missing React error boundaries |

### CODE_HEALTH
| Metric | Status |
|--------|--------|
| TypeScript Strict | Pending (empty workspace) |
| ESLint | Configured |
| Tests | None yet |
| Console.logs | Clean |
| Build | Will be verified after initial setup |

### ESTIMATED_SIZE
| Category | Estimate |
|----------|----------|
| Pages | 5 (login, overview, scans, users, analytics) |
| Components | ~20 UI components |
| Routes | 5 API routes (auth, scans, users, analytics) |
| Stores | 1 (auth) |
| Types | 3 (User, Scan, ApiResponse) |

---

## Auto-Answered Requirements (for RRI)
These requirements are obvious from Stitch design — skip in interview:

1. **Color scheme**: Emerald (#10B981) primary with Teal (#14B8A6) secondary
2. **Typography**: Manrope for headlines, Inter for body, Public Sans for labels
3. **Border radius**: 8px across components
4. **Layout**: Fixed 256px sidebar + main content area with left margin
5. **Cards**: White/surface background, 1px border, 8px radius, subtle shadow
6. **Buttons**: Filled primary, outlined secondary, text tertiary
7. **Charts**: Emerald for primary data, Teal/Blue for secondary series
8. **Tables**: Surface-alt header background, hover state, sortable columns
9. **Auth**: Admin-only access, email + password login
10. **Navigation**: Dashboard, Scans, Users, Analytics pages

---

## Constraints
| Category | Constraint |
|----------|-------------|
| Tech | Next.js App Router, TypeScript strict |
| Styling | Tailwind CSS v4 with CSS variables |
| UI | shadcn/ui with Base UI primitives |
| State | Zustand for client state |
| Design | Must match Stitch design system tokens |
| Backend | API-ready (mock mode for now) |

## Risks / Tech Debt
| Risk | Mitigation |
|------|-----------|
| Stitch screens vary in detail | Focus on primary screens first (Login, Overview, Scans) |
| No source code reference | Use Stitch HTML exports + previous implementation memory |
| Complex charts | Use Recharts with design system colors |

---

## Next Step
Run `/vibecode:rri` to capture specific requirements, then `/vibecode:blueprint` for architecture.

### Quality Gate
✅ Completeness: 15/15 items passed
✅ Cross-reference: Consistent with Stitch design system
⚠️ Gaps: Empty workspace — all patterns derived from Stitch design
