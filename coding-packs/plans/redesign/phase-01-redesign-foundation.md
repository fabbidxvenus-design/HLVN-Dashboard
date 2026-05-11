# Phase 01: Redesign Foundation

## HEADER
- Phase-ID: phase-01-redesign-foundation
- Source TIP: TIP-013
- Tier: STANDARD
- Status: ACTIVE

## GOAL
Establish product-grade redesign foundation tokens in `app/globals.css` for subsequent screen-level redesign phases.

## SCOPE
- Refined app background, surfaces, elevated surfaces, muted surfaces
- Text hierarchy tokens
- Shadow/elevation tokens
- Radius tokens
- Transition/easing tokens
- Layout spacing tokens
- Focus ring token

## OUT OF SCOPE
- Login page redesign
- Dashboard shell redesign
- Page-level redesign
- Backend/API behavior
- Pencil/.pen workflow

## RED GATE SPECS
See `specs/redesign-foundation.test.ts`.

## GREEN GATE
- `pnpm test` passes
- `pnpm tsc --noEmit` passes
- New foundation tokens exist and are used by subsequent phases
