# Phase 03: Dashboard Shell Redesign

## HEADER
- Phase-ID: phase-03-dashboard-shell
- Source TIP: TIP-015-dashboard-shell-redesign
- Tier: STANDARD
- Status: PLANNED

## GOAL
Redesign the dashboard shell (sidebar, header, layout) to match the design reference from `coding-packs/design/hlvn-dashboard/src/components/layout/`.

## SCOPE
- `components/dashboard/AppSidebar.tsx` — port from `design/.../Sidebar.tsx`
- `components/dashboard/DashboardHeader.tsx` — port from `design/.../Header.tsx`
- `components/dashboard/DashboardShell.tsx`
- `app/(dashboard)/layout.tsx`
- Sidebar brand block, navigation, active state, logout
- Header title, global search, notifications, profile
- Responsive mobile menu behavior

## OUT OF SCOPE
- Route path changes
- New product features
- Backend auth enforcement
- Full mobile app navigation redesign

## RED GATE SPECS
Create `specs/dashboard-shell.test.ts` to verify shell contract before implementation.

## GREEN GATE
- `pnpm test -- specs/dashboard-shell.test.ts` passes
- `pnpm tsc --noEmit` passes
- All existing routes render inside redesigned shell
- Active nav state correct for all routes
- No horizontal overflow at 375px, 768px, 1024px, 1440px
