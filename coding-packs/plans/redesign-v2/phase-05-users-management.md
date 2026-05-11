# Phase 05: Users Management Redesign

## HEADER
- Phase-ID: phase-05-users-management
- Source TIP: TIP-017-users-management-redesign
- Tier: STANDARD
- Status: PLANNED

## GOAL
Redesign the users management page to match the design reference from `coding-packs/design/hlvn-dashboard/src/pages/Users.tsx` while preserving existing user data flow, mock mode, dialogs, and API contracts.

## SCOPE
- `app/(dashboard)/users/page.tsx`
- `components/users/UsersTable.tsx`
- `components/users/CreateUserDialog.tsx`
- `components/users/EditRoleDialog.tsx`
- `components/users/DeleteUserDialog.tsx`
- Users page header with title, subtitle, and primary add action
- Search/filter command bar
- User table visual hierarchy, avatars, badges, row actions
- Loading/empty/error states

## OUT OF SCOPE
- User API endpoint contract changes
- Role enum changes
- New user fields
- Backend validation or authorization logic
- Bulk user operations

## RED GATE SPECS
Create `specs/users-management.test.ts` to verify users page behavior and visual contract before implementation.

## GREEN GATE
- `pnpm test -- specs/users-management.test.ts` passes
- `pnpm tsc --noEmit` passes
- Users page renders with mock data
- Search/filter/table actions preserve existing behavior
- Create/edit/delete dialogs still work
- No layout shift on loading
