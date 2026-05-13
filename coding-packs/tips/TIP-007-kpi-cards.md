# TIP-007: KPI Cards + KPI Grid (Dashboard Overview pt.1)

## HEADER
- TIP-ID: TIP-007
- Project: HLVN Dashboard
- Module: dashboard
- Priority: P0
- Depends on: TIP-005, TIP-006
- Estimated: S (2h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + TypeScript strict + Tailwind CSS v4
- Key files to read first: coding-packs/designs/stitch_hlvn_dashboard_redesign_v5/stitch_hlvn_dashboard_redesign_v5/hlvn_dashboard_overview/code.html
- Patterns to follow: Card component from TIP-006, API client from TIP-004

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Build KPI card component and 4-column KPI grid for the dashboard overview page. Cards display: Total Scans, Total Users, Success Rate, Active Today. Data fetched from `GET /api/analytics/summary`.

## SPECIFICATIONS

### Files to Create

1. `src/types/analytics.ts` — Analytics types:
   ```typescript
   interface AnalyticsSummary {
     totalScans: number;
     totalUsers: number;
     successRate: number;
     activeToday: number;
     trends?: { scans: number; users: number; rate: number; active: number };
   }
   ```

2. `src/hooks/use-api.ts` — Data fetching hook:
   - `useApiGet<T>(path)` — fetches data, returns { data, isLoading, error, refetch }
   - Uses API client from TIP-004
   - Auto-fetches on mount

3. `src/components/dashboard/KpiCard.tsx` — Single KPI card:
   - Props: title, value, icon, trend (up/down/neutral), trendValue
   - Card with surface-container-lowest bg
   - Icon in tonal circle (primary-container bg)
   - Large value (headline font, Manrope)
   - Trend indicator with arrow + percentage
   - Title in label font (Public Sans)

4. `src/components/dashboard/KpiGrid.tsx` — 4-column grid:
   - Fetches data from `/api/analytics/summary`
   - Renders 4 KpiCards in responsive grid (4 cols on desktop)
   - Loading state with skeletons
   - Error state with retry

5. `src/pages/DashboardPage.tsx` — Update to include KpiGrid:
   - Page title "Dashboard Overview" (Manrope headline)
   - KpiGrid at top
   - Placeholder for charts below (TIP-008)

### Design Reference
- Primary screen: `hlvn_dashboard_overview/screen.png`
- KPI cards: white bg, rounded-lg, icon in tonal circle, large number, trend arrow
- Grid: 4 columns, gap-md (16px)
- Icons: lucide-react (ScanLine, Users, CheckCircle, Activity)

### Business Rules
1. KPI data fetched from `GET /api/analytics/summary` (admin only)
2. Trend arrows: green up = positive, red down = negative
3. Success rate displayed as percentage
4. Numbers formatted with locale (e.g., 1,234)

## ACCEPTANCE CRITERIA
- Given dashboard page When loaded Then shows 4 KPI cards in grid
- Given KPI card When data loaded Then displays formatted value + trend
- Given API loading When waiting Then shows skeleton placeholders
- Given API error When failed Then shows error with retry button

## CONSTRAINTS
- DO NOT: Add charts or tables (that's TIP-008)
- DO NOT: Add realtime updates (that's TIP-018)
- REUSE: Card from TIP-006, API client from TIP-004, design tokens from TIP-002
- SKIP: Realtime, date range filtering
