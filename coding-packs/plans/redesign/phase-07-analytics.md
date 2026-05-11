# Phase 07: Analytics Redesign

## HEADER
- Phase-ID: phase-07-analytics
- Source TIP: TIP-019
- Tier: STANDARD
- Status: PENDING

## GOAL
Redesign analytics page with insight hierarchy and integrated chart styling.

## SCOPE
- Analytics page header with date controls
- KPI cards matching redesign
- Chart styling (refined grid/axis/tooltip)
- Top products/users/API usage tables

## OUT OF SCOPE
- New analytics metrics
- Advanced filters
- Backend calculations

## RED GATE SPECS
See `specs/analytics.test.ts`.

## GREEN GATE
- `pnpm test` passes
- `pnpm tsc --noEmit` passes
- Analytics visual verification
- Chart integrated with design system
