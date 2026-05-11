# Phase 02: Login Page Redesign

## HEADER
- Phase-ID: phase-02-login-page
- Source TIP: TIP-014-login-auth-ux-redesign
- Tier: STANDARD
- Status: PLANNED

## GOAL
Redesign the login page to match the visual direction from the design reference while preserving all existing auth behavior, mock login, API contracts, and validation.

## SCOPE
- `app/(auth)/login/page.tsx`
- Login form styling
- Branded composition (split or layered layout)
- HLVN identity and admin-only context
- Loading and error presentation
- Mock login compatibility (`admin@hlvn.vn` + any password in mock mode)

## OUT OF SCOPE
- Auth API contract changes
- Backend auth logic
- Password reset UI
- Remember-me checkbox
- Social login
- i18n toggle

## RED GATE SPECS
Create `specs/login-page.test.ts` to verify login form behavior contract before implementation.

## GREEN GATE
- `pnpm test -- specs/login-page.test.ts` passes
- `pnpm tsc --noEmit` passes
- Mock login with `admin@hlvn.vn` still works
- Validation errors still display correctly
- Auth store contract unchanged
