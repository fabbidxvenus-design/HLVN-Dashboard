# TIP-006: UI Polish + A11y + Tests

## HEADER
- TIP-ID: TIP-006
- Project: HLVN Dashboard
- Module: Quality, Accessibility, Testing
- Priority: P0
- Depends on: TIP-003, TIP-004, TIP-005
- Estimated: L (10h)

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Tech stack: Next.js 15, TypeScript, Tailwind, shadcn/ui, Vitest, Testing Library
- Key files to read first: all implemented TIP files, `coding-packs/design/design-brief.md`, `coding-packs/design/design-review.md`
- Patterns to follow: accessibility requirements in design brief, frontend-only scope boundary

## APPLICABLE STANDARDS
- `standards/auth/rbac-admin-gate.md` — verify route gate UX and auth failure behavior

## TASK
Polish loading/empty/error states, accessibility, keyboard behavior, responsive behavior, and frontend test coverage for all implemented dashboard screens. Verify the dashboard remains frontend-only and does not contain dashboard-side API/Supabase/OpenRouter implementation.

## SPECIFICATIONS

### Business Rules
1. All P0 screens must provide clear loading, empty, and error states
2. All user-facing errors should be friendly Vietnamese messages
3. All dialogs and table actions must be keyboard accessible
4. All icon-only buttons must have accessible names
5. Component and utility tests must cover critical UI behavior
6. Manual QA must verify golden paths for Login, Users, Scans, Analytics

### Files to Create/Update
```
components/dashboard/
├── LoadingState.tsx
├── EmptyState.tsx
└── ErrorState.tsx
components/ui/              # add shadcn components if needed
app/(auth)/login/page.tsx   # polish states/a11y
app/(dashboard)/**/*.tsx    # polish screen states/a11y
tests/
├── components/
├── hooks/
└── lib/
vitest.config.ts
setupTests.ts
```

### Loading States
Implement consistent states:
1. Login submit button spinner
2. Dashboard KPI skeleton cards
3. Users table skeleton rows
4. Scans table skeleton rows
5. Chart skeleton containers
6. Scan detail dialog loading state
7. Export button loading state

Skeleton requirements:
- Use consistent neutral color
- Avoid layout shift by matching final dimensions
- Include `aria-busy` where appropriate

### Empty States
Create reusable `EmptyState`:
```ts
interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
}
```

Required empty states:
1. No users found
2. No scans found
3. No analytics data for selected range
4. No search results
5. No top products/users/API usage rows

### Error States
Create reusable `ErrorState`:
```ts
interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}
```

Requirements:
- Friendly Vietnamese copy
- Retry button when action is recoverable
- Do not expose raw backend stack traces or secret details
- Preserve page layout instead of crashing whole screen

### Accessibility Requirements
Verify/fix:
1. 44px minimum interactive targets
2. Visible focus rings for links, buttons, inputs, table actions
3. `aria-label` on icon-only buttons
4. Form inputs have labels and error associations
5. Tables use proper `<th>` headers and scopes
6. Dialogs trap focus and close on Escape
7. Toasts do not contain the only copy of critical errors when form inline errors are needed
8. Images have descriptive alt text or empty alt if decorative
9. Color contrast meets WCAG AA
10. Keyboard tab order is logical

### Responsive Requirements
Minimum checks:
1. Desktop 1440px: design matches intended layout
2. Laptop 1024px: tables remain usable
3. Tablet 768px: sidebar/table behavior does not overflow page
4. Mobile 375px: no horizontal document overflow beyond intended table scroll areas

Responsive design is Phase 2 for full polish, but MVP must not be broken.

### Test Setup
Use Vitest + Testing Library.

Required dependencies if not installed:
- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `jsdom`

Configure:
- `vitest.config.ts`
- `setupTests.ts`
- package scripts: `test`, `test:coverage`

### Required Tests

**API client tests**:
- attaches bearer token
- parses success envelope
- throws friendly error for failed envelope
- handles network failure
- clears auth/session behavior on 401 where implemented

**Auth tests**:
- login form validates email/password
- admin login success redirects/stores session (mock API client)
- non-admin login shows access denied
- dashboard gate redirects unauthenticated user

**Users UI tests**:
- renders loading, empty, error, data states
- search/filter controls update expected state
- create dialog validates required fields
- edit/delete dialogs call submit handlers

**Scans UI tests**:
- renders table rows
- detail dialog renders OCR fields/sizes
- export button shows loading and handles failure
- image cell has alt text and fixed dimensions

**Analytics UI tests**:
- KPI cards format values
- chart empty state renders
- top tables render rows and empty state

### Manual QA Checklist
Run with dev server and browser:
1. Login page loads and validates empty fields
2. Admin login golden path works with backend or mocked backend
3. Non-admin login blocked
4. Users page search/filter/create/edit/delete UX works
5. Scans page filter/detail/delete/export UX works
6. Analytics page date range and chart/table rendering works
7. Keyboard-only navigation reaches all actions
8. Dialog focus trap works
9. No browser console errors
10. No unexpected network calls to Supabase/OpenRouter from dashboard

### Scope Boundary Audit
Verify project does not contain:
- `app/api/*`
- `lib/supabase/*`
- Supabase package imports
- OpenRouter package imports or URLs
- Database migrations under dashboard
- Server-side OCR retry/fallback implementation

If any exist from previous scaffold, remove or move them out of dashboard scope only after confirming they are not user work.

## ACCEPTANCE CRITERIA
- Given any table is loading, When data is pending, Then stable skeleton rows render without layout shift
- Given any table has no data, When backend returns empty list, Then reusable empty state renders
- Given API request fails, When user sees page, Then friendly retryable error appears
- Given keyboard-only user, When navigating dashboard, Then all controls are reachable and visibly focused
- Given dialog opens, When Tab/Escape keys are used, Then focus trap and close behavior work correctly
- Given tests run, When `pnpm test` executes, Then all frontend tests pass
- Given scope audit, When searching project, Then no dashboard-side API/Supabase/OpenRouter implementation exists

## CONSTRAINTS
- DO NOT: Add backend routes to make tests pass
- DO NOT: Mock away accessibility behavior in component tests
- DO NOT: Hide real errors behind generic fallback without retry path
- DO NOT: Add E2E tests unless time allows; component tests are MVP scope
- REUSE: Shared LoadingState, EmptyState, ErrorState components
- SKIP: Full Phase 2 responsive redesign and Playwright E2E suite

## VERIFICATION CHECKLIST
- [ ] `pnpm tsc --noEmit` passes
- [ ] `pnpm test` passes
- [ ] `pnpm test:coverage` meets agreed threshold or reports gap
- [ ] Manual browser QA completed for Login, Users, Scans, Analytics
- [ ] Keyboard navigation checked
- [ ] Dialog focus behavior checked
- [ ] Scope audit confirms frontend-only boundary
- [ ] No console errors during manual QA
