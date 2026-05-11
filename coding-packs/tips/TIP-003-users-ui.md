# TIP-003: Users Management UI

## HEADER
- TIP-ID: TIP-003
- Project: HLVN Dashboard
- Module: Users Management
- Priority: P0
- Depends on: TIP-002
- Estimated: L (10h)

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Backend project: `D:\scripts\HLVN\HLVN-serverless`
- Tech stack: Next.js 15, TypeScript, TanStack Table, React Hook Form, shadcn/ui, Sonner
- Key files to read first: `coding-packs/design/design-brief.md`, `coding-packs/02-TASK-GRAPH.md`
- Patterns to follow: API client from TIP-002, dashboard shell from TIP-001

## APPLICABLE STANDARDS
- `standards/auth/rbac-admin-gate.md` — admin-only UX; backend enforces authorization

## TASK
Build the Users Management page UI and connect it to the external backend users API. Implement searchable/filterable/paginated users table and create/edit/delete dialogs using frontend API client only.

## SPECIFICATIONS

### Business Rules
1. Only admin users can access this page via dashboard gate from TIP-002
2. Admin can view all users returned by backend
3. Admin can create users with role `admin`, `manager`, or `user`
4. Admin can edit user role
5. Admin can delete users
6. Backend enforces last-admin protection; frontend must show backend error clearly
7. Page state for search, role filter, page, and sort should be reflected in URL search params

### API Contracts
Use endpoints from backend:

```text
GET /api/users?page=1&limit=20&search=&role=all&sortBy=email&sortOrder=asc
Response: { success: true, data: UserProfile[], meta: { page, limit, total, hasMore } }
```

```text
POST /api/users
Request: { email: string, password: string, role: UserRole }
Response: { success: true, data: { user: UserProfile } }
```

```text
PATCH /api/users/:id/role
Request: { role: UserRole }
Response: { success: true, data: { user: UserProfile } }
```

```text
DELETE /api/users/:id
Response: { success: true, data: { id: string } }
```

### Files to Create
```
app/(dashboard)/users/page.tsx
components/users/
├── UsersPageHeader.tsx
├── UserFilters.tsx
├── UsersTable.tsx
├── UserRoleBadge.tsx
├── CreateUserDialog.tsx
├── EditUserRoleDialog.tsx
└── DeleteUserDialog.tsx
hooks/
└── useUsersQuery.ts
lib/api/users.ts
types/user.ts               # extend if needed
```

### Page Layout
Follow design brief:
1. Page title: `Users`
2. Right action: `+ Create User`
3. Filter row:
   - Search input placeholder: `Search users...`
   - Role filter select: All, Admin, Manager, User
   - Sort select or table header sorting
4. Main table with columns:
   - Email
   - Role
   - Last Login
   - Created At
   - Actions
5. Pagination footer:
   - Showing range text
   - Prev/Next buttons
   - Page number buttons when simple to implement

### Components

**UserRoleBadge**:
- Admin: primary/blue
- Manager: warning/amber
- User: neutral/gray

**UserFilters**:
```ts
interface UserFiltersProps {
  search: string;
  role: UserRole | 'all';
  onSearchChange: (search: string) => void;
  onRoleChange: (role: UserRole | 'all') => void;
}
```

**UsersTable**:
```ts
interface UsersTableProps {
  users: UserProfile[];
  isLoading: boolean;
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onEditRole: (user: UserProfile) => void;
  onDelete: (user: UserProfile) => void;
}
```

### Create User Dialog
Fields:
1. Email
2. Password
3. Role select

Validation:
- Email required and valid format
- Password required and minimum 8 characters
- Role required

Behavior:
- Submit calls `POST /api/users`
- On success: close dialog, refresh table, show success toast
- On failure: keep dialog open and show inline/toast error

### Edit Role Dialog
Fields:
1. Read-only email
2. Role select

Behavior:
- Submit calls `PATCH /api/users/:id/role`
- On success: close dialog, refresh table, show success toast
- If backend rejects last-admin demotion, show backend message

### Delete User Dialog
Requirements:
1. Confirmation dialog with user email
2. Destructive button label: `Delete user`
3. Calls `DELETE /api/users/:id`
4. On success: refresh table and show success toast
5. If backend rejects last-admin deletion, show backend message

### Data Fetching
`useUsersQuery.ts` should:
1. Use API client from TIP-002
2. Fetch when URL search params change
3. Expose loading/error/data/meta/refetch
4. Abort stale requests when params change if practical
5. Avoid duplicating server data in Zustand
6. Work unchanged in mock mode and real backend mode

### Mock Data Requirements
- When `NEXT_PUBLIC_USE_MOCK_API=true`, users page must render from mock API responses without changing component props.
- Mock user data must use `UserProfile` camelCase fields: `createdAt`, `updatedAt`, `lastLogin`.
- Mock list responses must include `meta.hasMore`.
- Create/edit/delete dialogs must call the same API functions as real backend mode.
- Mock last-admin error scenarios should be representable with `{ success: false, error, code: 'FORBIDDEN' }` for UI testing.

### Loading/Empty/Error States
Implement basic states now:
- Loading: table skeleton rows
- Empty: `No users found.` with optional create button
- Error: inline error card with retry button

TIP-006 will polish these further.

## ACCEPTANCE CRITERIA
- Given admin is on `/users`, When page loads, Then users table fetches from backend and displays rows
- Given search text is entered, When debounce completes or submit occurs, Then URL and table results update
- Given role filter changes, When role is selected, Then backend request includes role query param
- Given create user form is valid, When submitted, Then backend creates user and table refreshes
- Given role edit succeeds, When submitted, Then user row updates after refresh
- Given delete succeeds, When confirmed, Then user is removed from table after refresh
- Given backend rejects last-admin operation, When action fails, Then user sees friendly error message

## CONSTRAINTS
- DO NOT: Create dashboard API routes
- DO NOT: Import Supabase
- DO NOT: Implement backend validation rules in frontend beyond basic form validation
- DO NOT: Store users list in Zustand
- REUSE: API client and auth session from TIP-002
- SKIP: Bulk user operations and password reset UI

## VERIFICATION CHECKLIST
- [ ] `/users` route renders under dashboard shell
- [ ] Table supports loading, empty, error, and data states
- [ ] Search/filter/pagination uses URL state
- [ ] Create/edit/delete dialogs validate and submit correctly
- [ ] Toasts show success/error feedback
- [ ] Keyboard navigation works through table actions and dialogs
- [ ] `pnpm tsc --noEmit` passes
- [ ] Component tests cover filters, dialogs, and table states
