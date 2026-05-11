# Phase 08: Responsive + Visual QA Redesign Pass

## HEADER
- Phase-ID: phase-08-responsive-visual-qa
- Source TIP: TIP-020-responsive-visual-qa-redesign
- Tier: STANDARD
- Status: PLANNED

## GOAL
Final responsive, accessibility, and visual QA pass across all redesigned routes to ensure the complete redesign meets quality standards at all viewports and passes accessibility checks.

## SCOPE
- All redesigned routes: `/login`, `/`, `/users`, `/scans`, `/analytics`
- Viewport testing: 375px, 768px, 1024px, 1440px
- Keyboard navigation and focus management
- Color contrast verification
- Reduced motion support
- TypeScript compilation
- Vitest test suite
- Screenshot/manual visual QA against design reference

## OUT OF SCOPE
- New features beyond redesign scope
- Backend changes
- Performance optimization beyond visual QA
- E2E test automation (manual QA sufficient for redesign)

## RED GATE SPECS
Create `specs/responsive-visual-qa.test.ts` to verify responsive behavior and accessibility contract before final QA.

## GREEN GATE
- `pnpm test -- specs/responsive-visual-qa.test.ts` passes
- `pnpm tsc --noEmit` passes
- All routes render correctly at 375px, 768px, 1024px, 1440px
- No horizontal overflow at any viewport
- No layout shift on loading
- Keyboard navigation works (Tab, Enter, Escape)
- Color contrast passes WCAG AA
- Reduced motion preference respected
- Screenshots match design reference visual direction
