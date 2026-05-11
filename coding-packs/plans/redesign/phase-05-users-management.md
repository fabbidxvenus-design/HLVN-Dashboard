# Phase 05: Users Management Redesign

## HEADER
- Phase-ID: phase-05-users-management
- Source TIP: TIP-017
- Tier: STANDARD
- Status: PENDING

## GOAL
Redesign users management page with polished toolbar, table, dialogs.

## SCOPE
- Toolbar with search/filter/create
- Users table density and badges
- Create/edit/delete dialogs
- Empty/loading states

## OUT OF SCOPE
- Bulk operations
- Password reset UI
- Backend CRUD logic

## RED GATE SPECS
See `specs/users-management.test.ts`.

## GREEN GATE
- `pnpm test` passes
- `pnpm tsc --noEmit` passes
- Users page visual verification
- CRUD dialogs polished
