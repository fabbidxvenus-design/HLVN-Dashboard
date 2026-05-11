# TIP-017: Users Management Redesign

## HEADER
- TIP-ID: TIP-017
- Project: HLVN Dashboard
- Module: Users Management UI
- Priority: P0
- Depends on: TIP-013, TIP-015
- Estimated: L

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Tech stack: Authoritative stack from `coding-packs/product/tech-stack.md`: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui/Radix, TanStack Table, React Hook Form, Lucide React, Sonner, Vitest + Testing Library.
- Design source of truth:
  - `coding-packs/design/hlvn-dashboard/src/pages/Users.tsx`
  - `coding-packs/design/hlvn-dashboard/src/index.css`
  - `coding-packs/design/hlvn-dashboard/components/ui/*`
- Key app files to read first:
  - `app/(dashboard)/users/page.tsx`
  - `components/users/UsersTable.tsx`
  - `components/users/CreateUserDialog.tsx`
  - `components/users/EditRoleDialog.tsx`
  - `components/users/DeleteUserDialog.tsx`
  - `hooks/useUsersQuery.ts`
  - `types/user.ts`
  - `app/globals.css`
- Patterns to follow:
  - Port the visual composition from the design reference, not the mock data or route architecture.
  - Keep existing Next.js dashboard data flow, API client, mock mode, hooks, forms, and dialogs.
  - Preserve Vietnamese product language where current app already uses Vietnamese labels.

## APPLICABLE STANDARDS
- [auth/rbac-admin-gate](../standards/auth/rbac-admin-gate.md) — users management remains admin-only through existing app flow; backend remains authorization source of truth.

## TASK
Redesign the Users Management page to match the extracted design reference: polished page header, command-bar filters, rounded white table surface, dense readable rows, semantic badges, and subtle row actions. Preserve all existing CRUD behavior, API contracts, mock data compatibility, validation, and error handling.

## SPECIFICATIONS

### Business Rules
1. Preserve users list, pagination, search, role filter, create user, edit role, and delete flows.
2. Preserve user role values and current `User` model shape.
3. Preserve backend error handling, especially last-admin deletion protection.
4. Preserve mock mode behavior and contract-accurate mock responses.
5. Do not add bulk actions, password reset, user status management, audit logs, or advanced RBAC.

### Visual Requirements
1. Page header mirrors the design reference:
   - Left: title and subtitle.
   - Right: primary “Add new member” / create-user action with `Plus` icon.
   - Use `text-2xl`, `font-bold`, `tracking-tight`, and muted subtitle treatment.
2. Filter row mirrors the design reference:
   - White rounded `rounded-2xl` command surface.
   - Search input with left `Search` icon and subtle slate background.
   - Role filter and any existing sort/filter controls grouped to the right.
   - Use `h-10`, `rounded-xl`, border `slate-100`, and focus `bg-white` treatment.
3. Table surface mirrors the design reference:
   - White `rounded-2xl` container, subtle border, shadow-sm, overflow-hidden.
   - Horizontal overflow wrapper for narrow widths.
   - Header row uses uppercase 12px labels, `tracking-wider`, slate muted text, and soft slate background.
   - Rows use hover `bg-slate-50/30`, soft separators, and group-hover behavior.
4. Member cell:
   - Avatar/initials circle from email prefix.
   - Email shown as primary, semibold text.
   - Any secondary info remains muted and aligned.
5. Role badges:
   - `admin` has blue/primary treatment.
   - `manager` has amber or violet treatment.
   - `user` has slate/neutral treatment.
   - Badges use rounded pill/rounded-lg, uppercase micro-labels only if readable.
6. Row actions:
   - Keep edit/delete behavior.
   - Use subtle icon buttons that become more visible on row hover.
   - Destructive menu item uses red/rose text and red/rose hover background.
7. Dialogs:
   - Create/edit/delete dialogs must inherit redesigned token system.
   - Dialog headers include title + short description.
   - Form controls use consistent spacing and focus states.
   - Delete dialog keeps destructive warning visually prominent.
8. Loading/empty/error states:
   - Skeletons match table row dimensions.
   - Empty state explains whether there are no users or no filtered results.
   - Error state keeps retry/action affordance if currently available.

### Validation
1. Search and role filtering behavior remains unchanged.
2. Create user dialog validates email/password/role exactly as before.
3. Edit role dialog keeps allowed role values unchanged.
4. Delete confirmation still calls the existing handler and surfaces last-admin deletion errors.
5. TypeScript and existing users tests pass.

### Error Handling
1. API errors continue to show via existing toast/form error paths.
2. Last-admin deletion error must remain prominent and not be hidden in subtle helper text.
3. Dialog submission loading states must prevent duplicate submission if the current app already does so.

## ACCEPTANCE CRITERIA
- Given users data exists When viewing `/users` Then the page header, create button, filter command bar, table, badges, and row actions match the visual structure of `coding-packs/design/hlvn-dashboard/src/pages/Users.tsx` while using real app data.
- Given the role filter changes When selecting `admin`, `manager`, `user`, or `all` Then filtering behavior remains correct and no API/mock contract changes occur.
- Given a user row is hovered When viewing the actions column Then edit/delete controls become discoverable without overpowering row content.
- Given create user dialog opens When fields are displayed Then spacing, labels, validation messages, submit state, and focus styling match the redesigned visual system.
- Given delete dialog opens When viewing the confirmation Then destructive styling and warning copy are clear and accessible.
- Given no users match the search When the table renders Then a redesigned empty state explains no matching users.
- Given keyboard navigation When tabbing through toolbar controls, row actions, and dialogs Then visible focus states are present.
- Given viewport width is 768px When viewing `/users` Then the table remains usable through contained horizontal scrolling without page-level horizontal overflow.

## CONSTRAINTS
- DO NOT: copy reference mock data from `coding-packs/design/hlvn-dashboard/src/pages/Users.tsx` into production app state.
- DO NOT: change user API contracts, role enum values, hook return shapes, or mock response shape.
- DO NOT: add backend routes, Supabase imports, OpenRouter logic, or admin enforcement beyond existing frontend UX.
- DO NOT: use Pencil, `.pen`, Pencil MCP tools, or Pencil screenshots.
- DO NOT: add bulk operations, password reset, user status management, audit logs, or advanced RBAC.
- REUSE: existing users page, `UsersTable`, dialogs, hooks, API client, mock data, shadcn/ui, Lucide icons, Sonner.
- SKIP: backend behavior changes, production deployment, E2E test expansion unless TIP-020 adds QA coverage.

## QUALITY GATE: TIP Self-Review
- [x] TIP is one cohesive implementation unit: Users Management UI redesign.
- [x] Design source files are explicit.
- [x] Files to modify/read are explicit.
- [x] Acceptance criteria use Given/When/Then style.
- [x] Existing CRUD/data contracts are preserved.
- [x] Frontend-only boundary is preserved.
- [x] Pencil is explicitly forbidden.

**Verdict**: PASSED — ready for implementation after TIP-013 and TIP-015.
