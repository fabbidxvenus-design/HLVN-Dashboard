# Phase 08: Responsive + Visual QA Pass

## HEADER
- Phase-ID: phase-08-responsive-qa
- Source TIP: TIP-020
- Tier: STANDARD
- Status: PENDING

## GOAL
Final responsive, accessibility, and visual QA pass for redesign.

## SCOPE
- Responsive verification at 375px, 768px, 1024px, 1440px
- Keyboard focus states
- Accessibility contrast/labels
- Visual regression checks
- Screenshot capture

## OUT OF SCOPE
- New features
- Backend changes
- Production deployment

## RED GATE SPECS
See `specs/responsive-qa.test.ts`.

## GREEN GATE
- `pnpm test` passes
- `pnpm tsc --noEmit` passes
- No horizontal overflow at all breakpoints
- Focus states visible
- Screenshots captured
