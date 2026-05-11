# TIP-013: Redesign Foundation

## HEADER
- TIP-ID: TIP-013
- Project: HLVN Dashboard
- Module: Redesign Foundation (Design Tokens, Typography, Palette, Spacing)
- Priority: P0
- Depends on: TIP-001, TIP-002, TIP-003, TIP-004, TIP-005, TIP-006, TIP-007, TIP-008, TIP-009, TIP-010, TIP-011, TIP-012
- Estimated: M

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Tech stack: Authoritative stack from `coding-packs/product/tech-stack.md`: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui/Radix, Zustand, React Hook Form, TanStack Table, Recharts, Lucide React, Sonner, Vitest + Testing Library.
- Key files to read first:
  - `coding-packs/00-PROJECT-CONTEXT.md`
  - `coding-packs/01-REQUIREMENTS-MATRIX.md`
  - `coding-packs/02-TASK-GRAPH.md`
  - `coding-packs/design/design-brief.md`
  - `coding-packs/design/design-review.md`
  - `app/globals.css`
  - `app/(auth)/login/page.tsx`
  - `components/dashboard/AppSidebar.tsx`
  - `components/dashboard/DashboardHeader.tsx`
  - `components/dashboard/DashboardShell.tsx`
  - `app/(dashboard)/page.tsx`
  - `app/(dashboard)/users/page.tsx`
  - `app/(dashboard)/scans/page.tsx`
  - `app/(dashboard)/analytics/page.tsx`
  - `components/analytics/KpiCard.tsx`
  - `components/analytics/KpiGrid.tsx`
  - `components/analytics/ScanVolumeChart.tsx`
  - `components/users/UsersTable.tsx`
  - `components/scans/ScansTable.tsx`
- Patterns to follow:
  - Frontend-only dashboard; all data continues through existing API client/mock mode.
  - Keep shadcn/ui primitives, TanStack Table, Recharts, Lucide icons.
  - Redesign with code-owned design direction; do not use Pencil, `.pen` files, screenshots exported from Pencil, or Pencil MCP tools.

## APPLICABLE STANDARDS
- [auth/rbac-admin-gate](../standards/auth/rbac-admin-gate.md) — admin-only dashboard UX must remain intact; backend remains source of truth for authorization.

Backend-owned standards not directly applicable to this frontend redesign:
- `api/multi-key-fallback.md`
- `api/retry-backoff.md`
- `auth/supabase-auth-rls.md`
- `auth/password-hashing.md`

## TASK
Establish the redesign foundation by defining refined design tokens, typography scale, color palette, spacing rhythm, and shadow/surface system in `app/globals.css`. This foundation will be consumed by TIP-014 through TIP-020 for screen-level redesign.

Do not implement screen-level changes in this TIP; focus only on the shared visual system that subsequent TIPs will apply.

## SPECIFICATIONS

### Business Rules
1. Define design tokens in `app/globals.css` as CSS custom properties.
2. Tokens must be maintainable and reusable across all screens.
3. Do not change existing component files in this TIP; only update `app/globals.css`.
4. Preserve existing token names where they already exist; extend or refine values.
5. New tokens must follow naming convention: `--category-variant` (e.g., `--surface-elevated`, `--text-heading`).

### Visual Direction
1. Create a refined light theme with:
   - Warm off-white app background instead of plain white/gray.
   - Layered surfaces for sidebar, header, cards, tables, and dialogs.
   - Subtle but visible shadows/borders for depth.
   - Primary blue used for actions and active state only, not overused decoration.
   - Semantic success/warning/error colors for real statuses.
2. Improve typography:
   - Stronger page titles and section headings.
   - Smaller, muted helper text for context.
   - Tabular/monospace styling for IDs, token counts, cost, and technical metadata where helpful.
   - Clear number hierarchy for KPIs.
3. Improve spacing:
   - Replace uniform padding with intentional rhythm: compact navigation, spacious page headers, consistent section gaps, dense tables.
   - Use responsive padding for content area.
4. Improve surfaces:
   - Cards should have meaningful hierarchy, not identical boxes.
   - Tables should have clear headers, row hover, selected/action states, and empty/loading states that fit the redesigned theme.
   - Dialogs should feel connected to the same visual language.
5. Improve icon usage:
   - Use icons as functional signposts, not decoration.
   - Pair icons with labels for key navigation/actions.
   - Use consistent icon sizes and stroke visual weight.

### Required Screen-Level Redesign

#### Login Page
1. Replace the plain centered card with a branded split or layered composition.
2. Include HLVN identity, short product positioning, and clear admin-only context.
3. Keep email/password form validation and submit behavior unchanged.
4. Add polished loading and error presentation.
5. Ensure mock login remains possible with `admin@hlvn.vn` and any password while mock mode is enabled.

#### Dashboard Shell
1. Redesign sidebar with stronger brand block, grouped navigation, active state with both background and structural indicator, and refined logout section.
2. Redesign header with page title, contextual subtitle/metadata, and better separation from content.
3. Use a content container that scales across desktop sizes and avoids cramped or floating layouts.
4. Ensure shell does not create horizontal overflow at 1024px and below.

#### Dashboard Overview
1. Redesign overview page as the primary operational command center.
2. Add stronger top summary section: title, date context, and key action/refresh affordance if already supported.
3. KPI grid must have visual hierarchy and semantic trend indicators.
4. Chart/table sections must be arranged with deliberate layout balance, not simple stacked blocks.

#### Users Page
1. Redesign toolbar with search, role filter, and create action grouped logically.
2. Improve users table density, row readability, role badge styling, and action buttons.
3. Empty/loading/error states must match the new visual system.
4. Dialogs for create/edit/delete must use polished title, description, field spacing, and destructive action styling.

#### Scans Page
1. Redesign scan filters into a clear command bar: search, user/date filters, export action.
2. Improve scan table with stronger thumbnail treatment, OCR summary hierarchy, timestamp formatting, token/cost metadata, and row actions.
3. Scan detail dialog must feel like a product detail panel with image, OCR fields, notes, and token usage organized clearly.
4. Export action must communicate progress/error via existing toast patterns.

#### Analytics Page
1. Redesign analytics page around insight hierarchy: KPI summary, trend chart, top products/users/API usage.
2. Chart container must have refined grid/axis/tooltip styling and no obvious default Recharts look.
3. Tables must use consistent ranking/index treatment and percentage/count alignment.
4. Date range controls must be visually integrated with the page header or section toolbar.

### Validation
1. Run TypeScript check after implementation.
2. Run existing Vitest suites and add/adjust spec tests for redesign tokens and screen structure.
3. Manually inspect the UI in browser at minimum:
   - `/login`
   - `/`
   - `/users`
   - `/scans`
   - `/analytics`
4. Capture screenshots for at least 1440px desktop and one narrow width (375px or 768px) before reporting complete.
5. Verify keyboard focus on login form, sidebar navigation, primary buttons, table action buttons, and dialogs.
6. Verify no horizontal overflow at 375px, 768px, 1024px, and 1440px.
7. Verify mock data still renders all pages without backend availability.

### Error Handling
1. Existing API and auth errors must still surface via form errors or Sonner toasts.
2. Redesign must not hide or visually weaken destructive warnings.
3. Empty states must distinguish between no data, filtered no results, and loading where the existing data flow exposes those states.
4. If an image thumbnail fails to load, preserve existing fallback behavior and make the fallback visually consistent.

## ACCEPTANCE CRITERIA
- Given mock mode is enabled When the user logs in with `admin@hlvn.vn` and any password Then the redesigned login page authenticates and redirects to the dashboard without changing auth contracts.
- Given the user is on `/login` When viewing the page at 1440px Then it presents branded HLVN context, polished form styling, visible validation states, and no generic default-card appearance.
- Given the user is on any dashboard route When viewing the shell Then sidebar active navigation is obvious through structure plus color, header hierarchy is clear, and content spacing feels intentional.
- Given the dashboard overview has mock KPI data When rendered Then KPI cards show strong numeric hierarchy, semantic accents, and consistent responsive layout.
- Given analytics chart data exists When viewing `/analytics` Then the chart appears integrated with the design system and does not look like unstyled Recharts defaults.
- Given users data exists When viewing `/users` Then toolbar, table rows, role badges, and actions are visually scannable and polished.
- Given scan data exists When viewing `/scans` Then thumbnails, OCR summaries, timestamps, token metadata, and row actions are organized clearly.
- Given a table has no results When filters remove all rows Then the empty state uses the redesigned visual language and explains what happened.
- Given a loading state is active When data is loading Then skeletons match the redesigned table/card layout and do not cause layout shift.
- Given keyboard-only navigation When tabbing through login, sidebar links, buttons, and dialogs Then visible focus states are present and usable.
- Given viewport widths of 375px, 768px, 1024px, and 1440px When pages are inspected Then there is no horizontal overflow and primary actions remain reachable.
- Given implementation is complete When running checks Then TypeScript and Vitest pass.

## CONSTRAINTS
- DO NOT: Use Pencil, `.pen` files, Pencil MCP tools, or Pencil-exported screenshots as part of this redesign.
- DO NOT: Add backend routes, Supabase imports, OpenRouter logic, database code, server-side OCR logic, or Excel generation to the dashboard.
- DO NOT: Replace existing API contracts, auth store contract, mock mode behavior, or page routes unless required by an existing bug.
- DO NOT: Ship a generic shadcn/Tailwind dashboard look with only minor color/shadow tweaks.
- DO NOT: Introduce dark mode, i18n toggle, real-time updates, or unrelated feature scope.
- DO NOT: Hide accessibility focus rings or reduce contrast below WCAG AA.
- DO NOT: use `dangerouslySetInnerHTML` or unsafe HTML injection for visual effects.
- REUSE: Existing shadcn/ui components, Radix primitives, Lucide icons, TanStack Table, Recharts, Sonner, Zustand auth store, API client, mock data, and route structure.
- REUSE: Existing Vietnamese labels and domain language where appropriate.
- REUSE: Existing tests as regression coverage; add redesign-oriented tests only where they verify stable design contracts.
- SKIP: Backend integration changes, schema changes, API implementation, production deployment, and Pencil-based design workflows.

## QUALITY GATE: TIP Self-Review
- [x] TIP is self-contained and names exact files/modules to inspect.
- [x] Scope is one cohesive implementation unit: full product-grade frontend redesign.
- [x] Acceptance criteria use Given/When/Then style and cover core screens.
- [x] Constraints explicitly forbid Pencil and backend changes.
- [x] Frontend-only boundary is preserved.
- [x] Applicable standards checked; only `auth/rbac-admin-gate` applies directly.
- [x] Tech stack references `coding-packs/product/tech-stack.md` as authoritative.
- [x] Visual verification requirements are explicit, including browser inspection and screenshots.
- [x] Accessibility and responsive checks are included.

**Verdict**: PASSED — TIP-013 is ready for implementation planning/execution.
