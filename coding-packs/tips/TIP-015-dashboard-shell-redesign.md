# TIP-015: Dashboard Shell Redesign

## HEADER
- TIP-ID: TIP-015
- Project: HLVN Dashboard
- Module: Dashboard Shell, Sidebar, Header
- Priority: P0
- Depends on: TIP-013
- Estimated: M

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Tech stack: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Lucide React.
- Key files to read first:
  - `components/dashboard/DashboardShell.tsx`
  - `components/dashboard/AppSidebar.tsx`
  - `components/dashboard/DashboardHeader.tsx`
  - `app/(dashboard)/layout.tsx`
  - `app/globals.css`
- Patterns to follow: fixed admin shell with sidebar + header + content, frontend-only routes.

## APPLICABLE STANDARDS
- [auth/rbac-admin-gate](../standards/auth/rbac-admin-gate.md) — shell must not weaken admin-only UX.

## TASK
Redesign the dashboard shell so navigation, header, and content framing feel intentional and product-grade. Preserve existing routes, labels, logout behavior, and dashboard layout responsibilities.

## SPECIFICATIONS
### Business Rules
1. Keep existing dashboard routes: `/`, `/users`, `/scans`, `/analytics`.
2. Preserve logout button placement and session clearing behavior if currently wired.
3. Active nav must be clear for every route.
4. Shell must support all existing pages without changing page data contracts.

### Visual Requirements
1. Sidebar must include stronger brand block, grouped nav, refined active state, and polished bottom account/logout area.
2. Active nav must use both structural indicator and color/background.
3. Header must include page title hierarchy and optional contextual metadata/subtitle support.
4. Main content must use responsive padding and a consistent max-width/content rhythm.
5. App background and shell surfaces must use shared CSS variables, not scattered hardcoded colors.
6. Shell must avoid horizontal overflow at 375px, 768px, 1024px, and 1440px.

### Validation
1. Existing pages render inside the redesigned shell.
2. Active nav state remains correct for nested/route-equivalent paths.
3. TypeScript and existing tests pass.

### Error Handling
1. Shell must not swallow auth/session errors from child pages.
2. Logout errors, if existing, must still surface through current feedback path.

## ACCEPTANCE CRITERIA
- Given user is on `/users` When sidebar renders Then Người dùng nav item has a visible active indicator beyond color alone.
- Given user is on `/analytics` When shell renders Then header title and content spacing are aligned and polished.
- Given viewport is 1024px When dashboard shell renders Then content remains usable without horizontal overflow.
- Given viewport is 375px When shell renders Then navigation/content fallback is usable or safely scrollable without clipping primary content.
- Given keyboard navigation When tabbing sidebar links and logout Then focus states are visible.

## CONSTRAINTS
- DO NOT: change route paths or add new product features.
- DO NOT: use Pencil, `.pen`, or Pencil MCP tools.
- DO NOT: add backend logic or auth enforcement beyond existing frontend UX.
- REUSE: Lucide icons, existing dashboard components, CSS variables.
- SKIP: full mobile app navigation redesign unless required to prevent overflow.

## QUALITY GATE: TIP Self-Review
- [x] Scope limited to shared shell.
- [x] Responsive and accessibility checks included.
- [x] Existing routes preserved.

**Verdict**: PASSED.
