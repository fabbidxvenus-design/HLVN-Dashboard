# TIP-016: Overview Dashboard Redesign

## HEADER
- TIP-ID: TIP-016
- Project: HLVN Dashboard
- Module: Dashboard Overview
- Priority: P0
- Depends on: TIP-015
- Estimated: L

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Tech stack: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Recharts, Lucide React.
- Key files to read first:
  - `app/(dashboard)/page.tsx`
  - `components/analytics/KpiGrid.tsx`
  - `components/analytics/KpiCard.tsx`
  - `components/analytics/ScanVolumeChart.tsx`
  - `components/analytics/TopProductsTable.tsx`
  - `components/analytics/TopUsersTable.tsx`
  - `hooks/useAnalyticsQuery.ts`
  - `app/globals.css`
- Patterns to follow: command-center layout, mock-compatible analytics data.

## APPLICABLE STANDARDS
- none directly applicable.

## TASK
Redesign the dashboard overview into a polished operational command center. Improve the page header, KPI hierarchy, chart/table composition, loading states, and empty states without changing analytics data contracts.

## SPECIFICATIONS
### Business Rules
1. Preserve all existing analytics fetch/mock behavior.
2. Keep KPI, chart, top product/user data semantics.
3. Dashboard overview must remain useful with mock data and with empty data.
4. Do not add backend calculations or new API requirements.

### Visual Requirements
1. Add a strong overview header with title, short context, and date/range context if existing data supports it.
2. KPI cards must have visual hierarchy: label, number, supporting context, icon/accent, optional trend treatment.
3. Use differentiated card layouts where useful; avoid identical generic cards.
4. Chart section must feel integrated with surrounding surfaces.
5. Top products/users sections must be scannable and balanced in the page grid.
6. Loading skeletons must match final layout dimensions.

### Validation
1. Overview renders with mock data, loading, and empty states.
2. No TypeScript regressions.
3. Existing design-polish specs still pass or are updated to stronger redesign contracts.

### Error Handling
1. Existing analytics errors must remain visible via current UI/toast patterns.
2. Empty tables must show useful empty messages, not blank white cards.

## ACCEPTANCE CRITERIA
- Given mock analytics data exists When viewing `/` Then KPI cards have strong number hierarchy and semantic accents.
- Given trend data exists When viewing `/` Then chart section appears visually integrated and not default-styled.
- Given top products/users data is empty When viewing `/` Then redesigned empty states appear.
- Given loading state When viewing `/` Then skeleton layout matches the final redesign and avoids layout shift.
- Given viewport 1440px When viewing `/` Then layout feels balanced and command-center-like.
- Given viewport 768px When viewing `/` Then sections stack cleanly without horizontal overflow.

## CONSTRAINTS
- DO NOT: change analytics endpoint contracts or mock data shape.
- DO NOT: use Pencil, `.pen`, or Pencil MCP tools.
- DO NOT: add new backend-dependent metrics.
- REUSE: KpiGrid, KpiCard, ScanVolumeChart, existing analytics tables/hooks.
- SKIP: advanced analytics, real-time refresh, dark mode.

## QUALITY GATE: TIP Self-Review
- [x] Scope limited to overview dashboard.
- [x] Covers data, loading, empty, responsive states.
- [x] Backend scope excluded.

**Verdict**: PASSED.
