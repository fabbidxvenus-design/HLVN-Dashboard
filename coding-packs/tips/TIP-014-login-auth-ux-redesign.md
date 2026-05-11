# TIP-014: Login + Auth UX Redesign

## HEADER
- TIP-ID: TIP-014
- Project: HLVN Dashboard
- Module: Login + Auth UX
- Priority: P0
- Depends on: TIP-013
- Estimated: M

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Tech stack: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, React Hook Form, Zod, Zustand, Sonner.
- Key files to read first:
  - `app/(auth)/login/page.tsx`
  - `stores/auth-store.ts`
  - `lib/api/client.ts`
  - `lib/api/mock-data.ts`
  - `app/globals.css`
- Patterns to follow: keep existing auth API contract and mock login behavior.

## APPLICABLE STANDARDS
- [auth/rbac-admin-gate](../standards/auth/rbac-admin-gate.md) — admin-only dashboard UX must remain intact.

## TASK
Redesign the login screen so it feels branded, trustworthy, and product-grade instead of a default centered card. Preserve all existing validation, mock login, API calls, session storage, and redirect behavior.

## SPECIFICATIONS
### Business Rules
1. Keep login route at `/login`.
2. Preserve `auth.login(email, password)`, `setSession`, `clearSession`, role check, toast behavior, and redirect to `/`.
3. Mock mode must still allow `admin@hlvn.vn` with any password.
4. Non-admin and failed auth states must remain clear and visible.
5. UI must communicate this is an admin-only operational dashboard.

### Visual Requirements
1. Replace the basic single card with a split or layered composition.
2. Add HLVN brand block, short product positioning, and operational context.
3. Use refined background, surface layering, and subtle decorative elements implemented in CSS/Tailwind only.
4. Form fields must have polished labels, helper/error text, focus states, and loading state.
5. Submit button must feel primary and have clear disabled/loading styling.

### Validation
1. Email remains required and valid email format.
2. Password remains required.
3. Root error remains visible for forbidden/failed login.
4. TypeScript and existing auth tests must pass.

### Error Handling
1. ApiError messages show in form and toast.
2. Unknown errors show the existing Vietnamese generic error.
3. Forbidden admin-gate errors remain visually prominent.

## ACCEPTANCE CRITERIA
- Given mock mode is enabled When logging in with `admin@hlvn.vn` and any password Then login succeeds and redirects to `/`.
- Given invalid email When submitting Then inline validation explains email is invalid.
- Given missing password When submitting Then inline validation explains password is required.
- Given non-admin or forbidden response When submitting Then the redesigned error state is visible and toast appears.
- Given viewport widths 375px and 1440px When viewing `/login` Then layout has no horizontal overflow and remains polished.
- Given keyboard-only navigation When tabbing through the form Then focus states are visible.

## CONSTRAINTS
- DO NOT: change auth API contract, route, store shape, or mock login semantics.
- DO NOT: use Pencil, `.pen`, or Pencil MCP tools.
- DO NOT: add backend logic or API routes.
- REUSE: existing Button, Input, Card where useful, React Hook Form, Zod, Sonner, Zustand.
- SKIP: password reset, remember-me, social login, i18n toggle.

## QUALITY GATE: TIP Self-Review
- [x] Scope limited to login/auth UX.
- [x] Files and constraints explicit.
- [x] Acceptance criteria cover behavior, responsive, and accessibility.
- [x] Pencil forbidden.

**Verdict**: PASSED.
