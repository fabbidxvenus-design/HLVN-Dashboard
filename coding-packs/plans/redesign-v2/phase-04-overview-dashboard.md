# Phase 04: Overview Dashboard Redesign

## HEADER
- Phase-ID: phase-04-overview-dashboard
- Source TIP: TIP-016-overview-dashboard-redesign
- Tier: STANDARD
- Status: PLANNED

## GOAL
Redesign the dashboard overview page to match the design reference from `coding-packs/design/hlvn-dashboard/src/pages/Dashboard.tsx`.

## SCOPE
- `app/(dashboard)/page.tsx`
- `components/analytics/KpiCard.tsx`
- `components/analytics/KpiGrid.tsx`
- `components/analytics/ScanVolumeChart.tsx`
- Page header with title and context
- KPI cards with visual hierarchy
- Chart section with refined Recharts styling
- Top products/users sections
- Loading/empty/error states

## OUT OF SCOPE
- Analytics endpoint contract changes
- Mock data shape changes
- New backend metrics
- Real-time updates

## RED GATE SPECS
Create `specs/overview-dashboard.test.ts` to verify overview contract before implementation.

## GREEN GATE
- `pnpm test -- specs/overview-dashboard.test.ts` passes
- `pnpm tsc --noEmit` passes
- Overview renders with mock data
- Chart styling integrated with design system
- No layout shift on loading
