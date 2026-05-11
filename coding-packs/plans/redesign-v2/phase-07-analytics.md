# Phase 07: Analytics Redesign

## HEADER
- Phase-ID: phase-07-analytics
- Source TIP: TIP-019-analytics-redesign
- Tier: STANDARD
- Status: PLANNED

## GOAL
Redesign the analytics page to match the design reference from `coding-packs/design/hlvn-dashboard/src/pages/Analytics.tsx` while preserving existing analytics data flow, mock mode, charts, and API contracts.

## SCOPE
- `app/(dashboard)/analytics/page.tsx`
- `components/analytics/KpiCard.tsx`
- `components/analytics/KpiGrid.tsx`
- `components/analytics/ScanVolumeChart.tsx`
- `components/analytics/TopProductsTable.tsx`
- `components/analytics/TopUsersTable.tsx`
- Analytics page header with date range control
- KPI card grid
- Recharts chart styling
- Top users/products/API usage sections
- Loading/empty/error states

## OUT OF SCOPE
- Analytics API endpoint contract changes
- New backend metrics
- Backend aggregation logic
- Real-time analytics updates
- Export/reporting features

## RED GATE SPECS
Create `specs/analytics-redesign.test.ts` to verify analytics page behavior and visual contract before implementation.

## GREEN GATE
- `pnpm test -- specs/analytics-redesign.test.ts` passes
- `pnpm tsc --noEmit` passes
- Analytics page renders with mock data
- Date range control preserves existing behavior
- Chart styling integrated with design system
- Top users/products sections preserve existing data contract
- No layout shift on loading
