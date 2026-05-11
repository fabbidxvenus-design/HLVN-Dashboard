# Phase 02 — Users Management UI

> zflow plan-supervised mode: skips RRI/SDD/PROPOSAL
> Source: `TIP-003`
> Blocked by: Phase 01 (TIP-002)

## Overview

Build Users Management page with searchable/filterable/paginated users table and create/edit/delete dialogs. All data fetched via API client from TIP-002 with mock mode support.

## Dependencies
- Phase 01: API client (`lib/api/client.ts`), auth session (`hooks/useAuthSession.ts`), types (`types/user.ts`, `types/api.ts`)

## Requirements

### TIP-003: Users Management UI
1. Create `app/(dashboard)/users/page.tsx` page component
2. Create `components/users/UsersPageHeader.tsx` with `+ Create User` button
3. Create `components/users/UserFilters.tsx` with search input and role filter select
4. Create `components/users/UsersTable.tsx` with TanStack Table (sorting, pagination)
5. Create `components/users/UserRoleBadge.tsx` (Admin: blue, Manager: amber, User: gray)
6. Create `components/users/CreateUserDialog.tsx` with email/password/role fields + React Hook Form validation
7. Create `components/users/EditUserRoleDialog.tsx` with role select
8. Create `components/users/DeleteUserDialog.tsx` with confirmation
9. Create `hooks/useUsersQuery.ts` with URL search params, loading/error/data/meta/refetch
10. Create `lib/api/users.ts` with typed endpoint functions
11. Page state (search, role, page, sort) reflected in URL search params

### Mock Data Requirements
- Mock users list with `meta.hasMore`
- Mock `UserProfile` using camelCase: `createdAt`, `updatedAt`, `lastLogin`
- Mock last-admin FORBIDDEN error for UI testing
- Components work unchanged in mock mode and real backend mode

## File Ownership (non-overlapping)

| Files | Owner |
|-------|-------|
| `app/(dashboard)/users/page.tsx`, `components/users/*`, `hooks/useUsersQuery.ts`, `lib/api/users.ts` | TIP-003 |

## Acceptance Criteria (from source TIP)

- [ ] `/users` route renders under dashboard shell
- [ ] Table supports loading (skeleton rows), empty (`No users found.`), error (retry button), and data states
- [ ] Search/filter/pagination uses URL state
- [ ] Create/edit/delete dialogs validate and submit correctly
- [ ] Toasts show success/error feedback via Sonner
- [ ] Keyboard navigation works through table actions and dialogs
- [ ] `pnpm tsc --noEmit` passes
- [ ] Component tests cover filters, dialogs, and table states
- [ ] Mock mode renders correctly with `NEXT_PUBLIC_USE_MOCK_API=true`
