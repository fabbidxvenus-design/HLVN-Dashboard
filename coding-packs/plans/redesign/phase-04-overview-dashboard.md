# Phase 04: Overview Dashboard Redesign

## HEADER
- Phase-ID: phase-04-overview-dashboard
- Source TIP: TIP-016
- Tier: STANDARD
- Status: PENDING

## GOAL
Redesign dashboard overview as operational command center.

## SCOPE
- Overview page header
- KPI cards hierarchy
- Chart/table layout balance
- Loading/empty states

## OUT OF SCOPE
- New analytics metrics
- Real-time updates
- Backend calculations

## RED GATE SPECS
See `specs/overview-dashboard.test.ts`.

## GREEN GATE
- `pnpm test` passes
- `pnpm tsc --noEmit` passes
- Overview visual verification at 768px, 1440px
- KPI hierarchy clear
