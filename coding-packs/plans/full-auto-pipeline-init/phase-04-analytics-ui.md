# Phase 04 — Analytics Dashboard UI

> zflow plan-supervised mode: skips RRI/SDD/PROPOSAL
> Source: `TIP-005`
> Blocked by: Phase 01 (TIP-002)

## Overview

Build dashboard overview page and analytics page with KPI cards, scan trend chart, top products/users/API usage tables. Fetch analytics data via API client with mock mode support. Default to last 7 days on overview, last 30 days on analytics page.

## Dependencies
- Phase 01: API client (`lib/api/client.ts`), auth session, `types/analytics.ts`

## Requirements

### Dashboard Overview Page (`app/(dashboard)/page.tsx`)
1. KPI grid: Total Scans, Active Users, API Cost Today/Range, Success Rate
2. Scan Volume chart for last 7 days (Recharts)
3. Top Products table
4. Fetch KPIs, trend, top products in parallel

### Analytics Page (`app/(dashboard)/analytics/page.tsx`)
1. AnalyticsHeader with date range picker
2. KPI grid: Total Scans, Active Users, Total Cost, Total Tokens or Success Rate
3. Scan Volume Trend chart
4. Two-column: Top Users table + API Usage by Key table
5. Top Products table (full-width or card)
6. Default to last 30 days

### TIP-005 Components
1. `components/analytics/AnalyticsHeader.tsx` with date range picker
2. `components/analytics/KpiGrid.tsx` with responsive grid
3. `components/analytics/KpiCard.tsx` (height 120px, number 30px bold, label 14px muted, tone support)
4. `components/analytics/ScanVolumeChart.tsx` (Recharts responsive container, line/bar)
5. `components/analytics/TopProductsTable.tsx`
6. `components/analytics/TopUsersTable.tsx`
7. `components/analytics/ApiUsageTable.tsx`
8. `components/analytics/AnalyticsDateRangePicker.tsx`
9. `hooks/useAnalyticsQuery.ts` (parallel fetch, loading/error/data/refetch)
10. `lib/api/analytics.ts` with typed endpoint functions
11. `types/analytics.ts` with all analytics types

### API Endpoints
```
GET /api/analytics/summary?from=&to=       → { totalScans, activeUsers, totalCost, successRate, totalTokens? }
GET /api/analytics/trends?range=7d|30d&from=&to=  → [{ date, scans, cost }]
GET /api/analytics/top-products?from=&to=&limit=10 → [{ name, count }]
GET /api/analytics/top-users?from=&to=&limit=10    → [{ user: UserProfile, scanCount }]
GET /api/analytics/api-usage?from=&to=            → [{ apiKeyIndex, inputTokens, outputTokens, cost }]
```
**NOTE**: Use `from`/`to` params, NOT `dateFrom`/`dateTo`.

### Mock Data Requirements
- Mock analytics responses must be pre-aggregated (do not calculate from raw scans in UI)
- Mock trends include empty and non-empty datasets for chart state testing
- Mock top users embed `UserProfile` with camelCase fields
- Mock API usage rows: `apiKeyIndex`, `inputTokens`, `outputTokens`, `cost`
- Components work unchanged in mock mode and real backend mode

### Formatting Helpers
- `formatNumber(value)` — 1,234
- `formatCurrency(value)` — $1.23
- `formatPercent(value)` — 98.5%
- `formatCompactDate(date)` — May 8

## File Ownership (non-overlapping)

| Files | Owner |
|-------|-------|
| `app/(dashboard)/page.tsx`, `app/(dashboard)/analytics/page.tsx`, `components/analytics/*`, `hooks/useAnalyticsQuery.ts`, `lib/api/analytics.ts`, `types/analytics.ts` | TIP-005 |

## Acceptance Criteria (from source TIP)

- [ ] Dashboard overview renders with KPI cards and chart
- [ ] Analytics page renders all sections
- [ ] Date range updates component state predictably
- [ ] Recharts components are responsive and do not overflow
- [ ] Empty/error states are visible and friendly
- [ ] Numbers/currency/percentages are formatted consistently
- [ ] `pnpm tsc --noEmit` passes
- [ ] Component tests cover KPI, chart empty state, and table rendering
- [ ] Mock mode renders correctly with `NEXT_PUBLIC_USE_MOCK_API=true`
