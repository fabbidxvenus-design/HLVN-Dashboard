# TIP-020: Responsive + Visual QA Redesign Pass

## HEADER
- TIP-ID: TIP-020
- Project: HLVN Dashboard
- Module: Responsive, Accessibility, Visual QA
- Priority: P0
- Depends on: TIP-014, TIP-015, TIP-016, TIP-017, TIP-018, TIP-019
- Estimated: M

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Tech stack: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui/Radix, Vitest, Testing Library, browser QA.
- Key files to read first:
  - `app/(auth)/login/page.tsx`
  - `components/dashboard/DashboardShell.tsx`
  - `components/dashboard/AppSidebar.tsx`
  - `components/dashboard/DashboardHeader.tsx`
  - `app/(dashboard)/page.tsx`
  - `app/(dashboard)/users/page.tsx`
  - `app/(dashboard)/scans/page.tsx`
  - `app/(dashboard)/analytics/page.tsx`
  - `coding-packs/plans/update-design/specs/design-polish.test.ts`
  - `vitest.config.ts`
- Patterns to follow: final regression gate after redesign implementation.

## APPLICABLE STANDARDS
- [auth/rbac-admin-gate](../standards/auth/rbac-admin-gate.md) — auth UX must remain verified after redesign.

## TASK
Run the final responsive, accessibility, visual, and regression QA pass for the redesign. Fix remaining layout, overflow, focus, contrast, loading/empty state, and design consistency issues across login, shell, overview, users, scans, and analytics.

## SPECIFICATIONS
### Business Rules
1. No feature expansion in this TIP; only QA fixes and polish required to satisfy redesign acceptance criteria.
2. Preserve all existing behavior and contracts from prior TIPs.
3. Browser visual verification is mandatory before reporting completion.
4. Do not use Pencil or `.pen` workflows.

### Visual QA Requirements
1. Test routes:
   - `/login`
   - `/`
   - `/users`
   - `/scans`
   - `/analytics`
2. Test viewport widths:
   - 375px
   - 768px
   - 1024px
   - 1440px
3. Verify no horizontal overflow.
4. Verify content hierarchy, spacing rhythm, table density, chart styling, and empty/loading states.
5. Capture screenshots for at least 1440px and one narrow viewport.

### Accessibility Requirements
1. Keyboard tab through login form, sidebar nav, toolbar controls, table actions, and dialogs.
2. Focus states must be visible.
3. Text contrast must be readable on all redesigned surfaces.
4. Icon-only buttons must have accessible labels.
5. Touch/click targets should remain usable at narrow widths.

### Test Requirements
1. Run TypeScript check.
2. Run Vitest suites.
3. Update or add stable redesign contract tests where needed.
4. Do not overfit tests to brittle class ordering unless testing explicit design tokens/contracts.

### Error Handling
1. Verify error states remain visible and not hidden by new layout.
2. Verify toasts are visible above redesigned shell/dialog layers.
3. Verify destructive dialogs remain clearly destructive.

## ACCEPTANCE CRITERIA
- Given all redesign TIPs are complete When running TypeScript Then it passes.
- Given all redesign TIPs are complete When running Vitest Then all tests pass.
- Given each target route When viewed at 375px, 768px, 1024px, and 1440px Then no horizontal overflow occurs.
- Given keyboard-only navigation When using login, sidebar, toolbars, table actions, and dialogs Then focus is visible and order is usable.
- Given empty/loading/error states When inspected Then they match the redesigned visual language.
- Given screenshots are captured When reviewing final output Then UI no longer resembles a generic default Tailwind/shadcn dashboard.

## CONSTRAINTS
- DO NOT: add product features during QA.
- DO NOT: use Pencil, `.pen`, Pencil MCP tools, or Pencil screenshots.
- DO NOT: weaken auth, validation, or destructive warnings for visual polish.
- REUSE: existing tests, browser/dev server workflow, design tokens, components.
- SKIP: production deployment and backend integration changes.

## QUALITY GATE: TIP Self-Review
- [x] Final QA scope is explicit.
- [x] Routes, breakpoints, tests, and accessibility checks listed.
- [x] Pencil forbidden.
- [x] No feature creep allowed.

**Verdict**: PASSED.
