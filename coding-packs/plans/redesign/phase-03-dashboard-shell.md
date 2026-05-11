# Phase 03: Dashboard Shell Redesign

## HEADER
- Phase-ID: phase-03-dashboard-shell
- Source TIP: TIP-015
- Tier: STANDARD
- Status: PENDING

## GOAL
Redesign dashboard shell (sidebar, header, layout) with foundation tokens.

## SCOPE
- Sidebar brand block, navigation, active states
- Header with page title hierarchy
- Content container responsive padding
- Shell responsive behavior

## OUT OF SCOPE
- Page content redesign (handled by later phases)
- New routes
- Backend logic

## RED GATE SPECS
See `specs/dashboard-shell.test.ts`.

## GREEN GATE
- `pnpm test` passes
- `pnpm tsc --noEmit` passes
- Shell visual verification at 375px, 768px, 1024px, 1440px
- Active nav state obvious
