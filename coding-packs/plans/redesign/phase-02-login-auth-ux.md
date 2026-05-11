# Phase 02: Login + Auth UX Redesign

## HEADER
- Phase-ID: phase-02-login-auth-ux
- Source TIP: TIP-014
- Tier: STANDARD
- Status: PENDING

## GOAL
Redesign login page with branded, trustworthy presentation using foundation tokens from Phase 01.

## SCOPE
- Login page layout (split/layered composition)
- HLVN brand block
- Form styling with foundation tokens
- Loading/error states
- Mock login compatibility

## OUT OF SCOPE
- Password reset
- Social login
- Backend auth logic
- i18n toggle

## RED GATE SPECS
See `specs/login-auth-ux.test.ts`.

## GREEN GATE
- `pnpm test` passes
- `pnpm tsc --noEmit` passes
- Login visual verification at 375px, 1440px
- Mock login with `admin@hlvn.vn` works
