# Phase 01: Redesign Foundation

## HEADER
- Phase-ID: phase-01-redesign-foundation
- Source TIP: TIP-013-redesign-foundation
- Tier: STANDARD
- Status: PLANNED

## GOAL
Port the design foundation from `coding-packs/design/hlvn-dashboard/src/index.css` into the Next.js dashboard global styling without changing screen-level UI behavior.

## SCOPE
- `app/globals.css`
- Tailwind v4 `@theme inline` tokens
- Inter and JetBrains Mono font tokens
- Background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring tokens
- Radius tokens: `--radius-sm`, `--radius-md`, `--radius-lg`
- Legacy compatibility tokens currently consumed by existing components

## OUT OF SCOPE
- Login page redesign
- Dashboard shell redesign
- Page-level redesign
- Backend/API behavior
- Supabase/OpenRouter/database code

## RED GATE SPECS
Create or update `specs/redesign-foundation.test.ts` to verify the required token contract exists before implementation.

## GREEN GATE
- `pnpm test -- specs/redesign-foundation.test.ts` passes
- `pnpm tsc --noEmit` passes
- Existing routes still compile
- No functional UI behavior changed
