# TIP-003: Layout Shell (Sidebar + Header + Router)

## HEADER
- TIP-ID: TIP-003
- Project: HLVN Dashboard
- Module: layout
- Priority: P0
- Depends on: TIP-002
- Estimated: M (3h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + TypeScript strict + Tailwind CSS v4 + React Router v7
- Key files to read first: coding-packs/designs/stitch_hlvn_dashboard_redesign_v5/stitch_hlvn_dashboard_redesign_v5/hlvn_admin_dashboard_shell_1/code.html
- Patterns to follow: Fixed sidebar (256px) + main content area with header

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Build the dashboard layout shell: fixed 256px sidebar with navigation, top header bar with search, and main content area. Set up React Router v7 with all page routes.

## SPECIFICATIONS

### Files to Create

1. `src/App.tsx` — React Router setup with routes:
   - `/login` → LoginPage (public)
   - `/` → DashboardPage (protected)
   - `/scans` → ScansPage (protected)
   - `/users` → UsersPage (protected)
   - `/analytics` → AnalyticsPage (protected)

2. `src/components/layout/AppSidebar.tsx` — Fixed 256px sidebar:
   - Logo/brand area at top
   - Navigation items: Dashboard, Scans, Users, Analytics
   - Active state: emerald tonal highlight (surface-container + primary indicator)
   - Icons from lucide-react: LayoutDashboard, ScanLine, Users, BarChart3
   - User profile section at bottom

3. `src/components/layout/DashboardHeader.tsx` — Top header bar:
   - Search input (placeholder, non-functional for now)
   - User avatar + name display
   - Background: surface-container-lowest (white)

4. `src/components/layout/DashboardShell.tsx` — Layout wrapper:
   - Sidebar (fixed left, 256px width)
   - Main content area (margin-left: 256px)
   - Header at top of main area
   - Content area below header with padding

5. `src/pages/LoginPage.tsx` — Placeholder (just renders "Login")
6. `src/pages/DashboardPage.tsx` — Placeholder (just renders "Dashboard")
7. `src/pages/ScansPage.tsx` — Placeholder (just renders "Scans")
8. `src/pages/UsersPage.tsx` — Placeholder (just renders "Users")
9. `src/pages/AnalyticsPage.tsx` — Placeholder (just renders "Analytics")

### Design Reference
- Primary screen: `hlvn_admin_dashboard_shell_1/screen.png`
- Sidebar: 256px fixed, surface-container-low background
- Header: white background, subtle bottom border
- Active nav item: primary color left border + tonal background
- Navigation icons: 20px, muted color, active = primary

### Business Rules
1. Sidebar MUST be fixed at 256px width
2. Layout is desktop-only (no responsive/mobile collapse needed)
3. Active route MUST be highlighted in sidebar
4. All routes MUST be defined even if pages are placeholders
5. Login page MUST NOT show sidebar/header (different layout)

### Validation
- `pnpm dev` starts without errors
- `pnpm tsc --noEmit` passes
- All routes navigate correctly

## ACCEPTANCE CRITERIA
- Given app running When navigating to `/` Then DashboardShell renders with sidebar + header
- Given sidebar When clicking "Scans" nav item Then navigates to `/scans` and highlights active item
- Given app When navigating to `/login` Then renders without sidebar/header
- Given DashboardShell When rendered Then sidebar is exactly 256px wide
- Given header When rendered Then shows search input and user area

## CONSTRAINTS
- DO NOT: Implement actual search functionality (placeholder only)
- DO NOT: Implement authentication logic (that's TIP-004)
- DO NOT: Add page content beyond placeholder text
- REUSE: Design tokens from TIP-002 (CSS variables)
- SKIP: Mobile responsive, dark mode, actual page content
