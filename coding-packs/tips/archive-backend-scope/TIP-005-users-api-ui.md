# TIP-005: Users API + UI

## HEADER
- **TIP-ID**: TIP-005
- **Project**: HLVN Dashboard
- **Module**: User Management
- **Priority**: P0
- **Depends on**: TIP-004
- **Estimated**: L (12 hours)

## CONTEXT
- **Working dir**: `D:\scripts\HLVN\HLVN-dashboard`
- **Tech stack**: Next.js 15 API Routes, TanStack Table, React Hook Form, shadcn/ui Dialog, Sonner
- **Key files to read first**:
  - `coding-packs/BUILDER-HANDOFF.md` Users API contracts and component tree
  - `coding-packs/01-REQUIREMENTS-MATRIX.md` REQ-USER-*
- **Patterns to follow**: CRUD API with pagination/search/filter; table with inline actions; dialogs for create/edit/delete.

## APPLICABLE STANDARDS
- [`auth/rbac-admin-gate`](../standards/auth/rbac-admin-gate.md) — admin-only endpoints.
- [`auth/supabase-auth-rls`](../standards/auth/supabase-auth-rls.md) — use service role for admin user management.

## TASK
Implement users CRUD API routes and users management UI page with search, role filter, pagination, create/edit/delete dialogs, and lockout protection (cannot delete or demote last admin).

## SPECIFICATIONS

### Business Rules
1. Only admins can access users API and UI.
2. Cannot delete the last admin user (lockout protection).
3. Cannot demote the last admin to manager/user.
4. Email must be unique; Supabase Auth enforces this.
5. Password minimum 8 characters on create.
6. Search filters by email (case-insensitive partial match).
7. Role filter: `all`, `admin`, `manager`, `user`.
8. Pagination: 50 users per page default.
9. Creating a user creates both `auth.users` and `public.users` profile.
10. Deleting a user cascades scans per schema.

### Files to Create/Modify
- `app/api/v1/users/route.ts` (GET, POST)
- `app/api/v1/users/[id]/route.ts` (PATCH, DELETE)
- `app/(dashboard)/users/page.tsx`
- `components/users/UsersTable.tsx`
- `components/users/UserFilters.tsx`
- `components/users/CreateUserDialog.tsx`
- `components/users/EditUserRoleDialog.tsx`
- `components/users/DeleteUserDialog.tsx`
- `hooks/useUsersQuery.ts`
- `types/user.ts`

### API Routes

**GET /api/v1/users**
- Query params: `page`, `limit`, `search`, `role`
- Response: `{ success: true, data: UserProfile[], meta: { page, limit, total } }`
- Auth: admin
- Errors: 401, 403, 500

**POST /api/v1/users**
- Body: `{ email, password, role }`
- Response: `{ success: true, data: { user: UserProfile } }`
- Auth: admin
- Errors: 400 (validation), 401, 403, 409 (email exists), 500
- Implementation: `supabaseAdmin.auth.admin.createUser()` then insert profile row.

**PATCH /api/v1/users/:id**
- Body: `{ role }`
- Response: `{ success: true, data: { user: UserProfile } }`
- Auth: admin
- Errors: 400, 401, 403, 404, 409 (last admin demotion), 500
- Lockout check: if demoting admin, count remaining admins; if 1, return 409.

**DELETE /api/v1/users/:id**
- Response: `{ success: true, data: { id } }`
- Auth: admin
- Errors: 401, 403, 404, 409 (last admin deletion), 500
- Lockout check: if deleting admin, count remaining admins; if 1, return 409.
- Implementation: delete `auth.users` via service role; cascade deletes profile.

### UI Components

**UsersTable**
- Columns: Email, Role (badge), Last Login, Actions (Edit Role, Delete).
- TanStack Table with sorting by email/role/last_login.
- Pagination controls at bottom.
- Loading skeleton rows.
- Empty state: "Không tìm thấy người dùng".

**UserFilters**
- Search input (email).
- Role select dropdown: Tất cả, Admin, Manager, User.
- Debounce search 300ms.

**CreateUserDialog**
- Fields: Email, Password, Role.
- Validation: email format, password min 8 chars, role required.
- On success: close dialog, refetch users, show success toast.
- On error: show error toast with Vietnamese message.

**EditUserRoleDialog**
- Field: Role select.
- Pre-fill current role.
- On success: close dialog, refetch users, show success toast.
- On 409 (last admin): show Vietnamese error toast.

**DeleteUserDialog**
- Confirmation: "Bạn có chắc muốn xóa người dùng {email}? Tất cả scan của họ sẽ bị xóa."
- On success: close dialog, refetch users, show success toast.
- On 409 (last admin): show Vietnamese error toast.

### Validation
- Email regex: standard email pattern.
- Password: min 8 characters, no max for MVP.
- Role: must be `admin`, `manager`, or `user`.
- Search: trim whitespace.

### Error Handling
- API returns Vietnamese-friendly error messages where possible.
- UI shows Sonner toast for all API errors.
- Lockout errors: "Không thể xóa/hạ quyền admin cuối cùng."

## ACCEPTANCE CRITERIA
- Given admin session When navigating to `/users` Then users table loads with pagination.
- Given search "test" When typing in search input Then table filters to emails containing "test".
- Given role filter "admin" When selected Then table shows only admin users.
- Given "Tạo người dùng" clicked When dialog opens and form submitted with valid data Then new user appears in table.
- Given last admin user When attempting delete Then API returns 409 and toast shows lockout error.
- Given last admin user When attempting role change to manager Then API returns 409 and toast shows lockout error.
- Given non-last admin When deleting Then user and their scans are deleted and table refreshes.
- Given edit role dialog When changing user from manager to admin Then role updates and badge reflects change.

## CONSTRAINTS
### DO NOT
- Do NOT implement password reset yet (Phase 2).
- Do NOT implement bulk operations (Phase 2).
- Do NOT add user profile editing beyond role.
- Do NOT implement audit logs yet.

### REUSE
- Reuse API foundation helpers from TIP-004.
- Reuse shadcn/ui Dialog, Button, Input, Select.
- Reuse TanStack Table patterns.

### SKIP
- Skip responsive table (desktop-first).
- Skip advanced filters (created date, last login range).
- Skip user export (not in requirements).

## QUALITY GATE: TIP Self-Review
- [x] TIP covers users CRUD API and full UI page.
- [x] Lockout protection is specified and testable.
- [x] Standards for RBAC and Supabase Auth are applied.
- [x] Covers REQ-USER-001 through REQ-USER-008.
- [x] Acceptance criteria are concrete.

**Verdict**: PASSED — ready after TIP-004.
