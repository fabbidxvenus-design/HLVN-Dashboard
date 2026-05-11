# TIP-019: Analytics Redesign

## HEADER
- TIP-ID: TIP-019
- Project: HLVN Dashboard
- Module: Analytics UI
- Priority: P0
- Depends on: TIP-015, TIP-016
- Estimated: L

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Tech stack: Authoritative stack from `coding-packs/product/tech-stack.md`: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui/Radix, Recharts, Lucide React, Vitest + Testing Library.
- Design source of truth:
  - `coding-packs/design/hlvn-dashboard/src/pages/Analytics.tsx`
  - `coding-packs/design/hlvn-dashboard/src/index.css`
  - `coding-packs/design/hlvn-dashboard/components/ui/*`
- Key app files to read first:
  - `app/(dashboard)/analytics/page.tsx`
  - `components/analytics/KpiGrid.tsx`
  - `components/analytics/KpiCard.tsx`
  - `components/analytics/ScanVolumeChart.tsx`
  - `components/analytics/TopProductsTable.tsx`
  - `components/analytics/TopUsersTable.tsx`
  - `components/analytics/ApiUsageTable.tsx`
  - `hooks/useAnalyticsQuery.ts`
  - `types/analytics.ts`
  - `app/globals.css`
- Patterns to follow:
  - Port the visual composition from the design reference (Analytics.tsx), not the mock data or route architecture.
  - Keep existing Next.js dashboard data flow, API client, mock mode, hooks, and chart components.
  - Preserve Vietnamese product language where current app already uses Vietnamese labels.

## APPLICABLE STANDARDS
- none directly applicable.

## TASK
Redesign the Analytics page so it reads like a polished insight workspace rather than a generic chart page. Improve KPI presentation, date range controls, chart styling, and ranking/API usage tables while preserving existing analytics contracts and mock data.

## SPECIFICATIONS
### Business Rules
1. Preserve summary, trends, top products, top users, and API usage data fetching.
2. Preserve date range behavior and available ranges.
3. Preserve mock data compatibility.
4. Do not add new backend metrics or calculations.

### Visual Requirements
1. Page header mirrors the design reference:
   - Left: title “Analytics” or current Vietnamese equivalent.
   - Right: date range select with `Calendar` icon, white background, soft border, and fixed desktop width.
2. KPI cards mirror the design reference:
   - Four-card responsive grid.
   - Each card uses label, large 30px number, right-side icon circle, and subtle border/shadow.
   - Icons follow the analytics design: `BarChart3`, `Users`, `DollarSign`, `Activity` where data semantics align.
3. Chart container mirrors the design reference:
   - White card, soft border, shadow-sm.
   - Refined Recharts grid with vertical lines disabled.
   - Axis lines/tick lines removed.
   - Tooltip uses rounded border and app surface tokens.
   - Bars use rounded top corners and controlled semantic colors, or existing line/area style if current data contract requires trend lines.
4. Two-column lower section mirrors the design reference:
   - Top users/products list uses label, count, and progress bar.
   - API usage list uses monospace key names, token metadata, and right-aligned cost.
5. Ranking/progress treatments must be derived from existing analytics data, not hardcoded reference data.
6. Empty and loading states must match the redesign and preserve section height to avoid layout shift.

### Validation
1. Analytics renders with mock data.
2. Date range changes still refresh/render correct data path.
3. TypeScript and tests pass.

### Error Handling
1. Existing fetch errors remain visible.
2. Empty analytics sections do not collapse into blank space.

## ACCEPTANCE CRITERIA
- Given analytics data exists When viewing `/analytics` Then insight hierarchy is clear from KPI summary to chart to tables.
- Given trend data exists When chart renders Then tooltip/grid/axis styling appears integrated with design system.
- Given top product/user data exists When tables render Then ranking and numeric alignment improve scanability.
- Given API usage data exists When table renders Then cost/tokens/scan counts are easy to compare.
- Given empty analytics data When page renders Then each section shows a useful empty state.
- Given viewport 1024px and 1440px When viewing `/analytics` Then layout is balanced with no horizontal overflow.

## CONSTRAINTS
- DO NOT: change analytics endpoint contracts or mock response shapes.
- DO NOT: use Pencil, `.pen`, or Pencil MCP tools.
- DO NOT: add advanced analytics, real-time updates, or backend calculations.
- REUSE: existing analytics components, Recharts, hooks, API client.
- SKIP: new chart libraries unless already installed and justified by existing dependencies.

## QUALITY GATE: TIP Self-Review
- [x] Scope limited to analytics page.
- [x] Chart/table specifics included.
- [x] Backend contract preserved.

**Verdict**: PASSED.
