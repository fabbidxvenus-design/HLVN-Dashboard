# TIP-012: Users Table + Filters (Users Page pt.1)

## HEADER
- TIP-ID: TIP-012
- Project: HLVN Dashboard
- Module: users
- Priority: P0
- Depends on: TIP-005, TIP-006
- Estimated: M (3h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + TypeScript strict + TanStack Table
- Key files to read first: coding-packs/designs/stitch_hlvn_dashboard_redesign_v5/stitch_hlvn_dashboard_redesign_v5/hlvn_qu_n_l_ng_i_d_ng_1440px_1/code.html
- Patterns to follow: TanStack Table + Table UI from TIP-006, same pattern as TIP-009

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Build the users management table with pagination, search, and role filter. Admin-only page. Data from `GET /api/users`.

## SPECIFICATIONS

### Files to Create

1. `src/components/users/UserFilters.tsx` — Filter bar:
   - Search input (searches by email/name)
   - Role filter (select: all, admin, manager, user)
   - Clear filters button

2. `src/components/users/UserRoleBadge.tsx` — Role badge:
   - admin: primary tonal (emerald)
   - manager: secondary tonal (teal)
   - user: outline/neutral

3. `src/components/users/UsersTable.tsx` — Data table:
   - TanStack Table with columns: email, role (badge), created_at, last_login, actions
   - Server-side pagination
   - Sortable columns
   - Action buttons: edit role, delete

4. `src/pages/UsersPage.tsx` — Users page:
   - Page title "Quản lý người dùng" (Manrope headline)
   - "Thêm người dùng" button (top right, primary filled)
   - UserFilters below title
   - UsersTable below filters
   - Data from `GET /api/users?page=1&limit=20&search=...&role=...`

### Design Reference
- Primary screen: `hlvn_qu_n_l_ng_i_d_ng_1440px_1/screen.png`
- Table: same style as scans table
- Role badges: tonal colored pills
- Add button: primary filled, top right

### Business Rules
1. Page is admin-only (RoleGuard from TIP-005)
2. Data from `GET /api/users` with pagination (admin only)
3. Search filters by email
4. Role filter: all, admin, manager, user
5. Default sort: newest first (created_at desc)
6. Page size: 20 items per page

## ACCEPTANCE CRITERIA
- Given admin user When navigating to /users Then shows users table
- Given search input When typing Then table filters by email
- Given role filter When selecting "admin" Then shows only admin users
- Given table When loaded Then shows role badges with correct colors
- Given pagination When clicking next Then loads next page

## CONSTRAINTS
- DO NOT: Implement create user dialog (that's TIP-013)
- DO NOT: Implement edit/delete (that's TIP-014)
- REUSE: Table, Input, Select, Badge, Button from TIP-006; useApiGet from TIP-007
- SKIP: Create, edit, delete actions (separate TIPs)
