# SPEC: HLVN Dashboard Foundation (TIP-001)

## AC-F1-01: Project initializes without errors
- Given: fresh clone of dashboard repo
- When: developer runs `pnpm install && pnpm dev`
- Then: dev server starts on port 3000 without errors or warnings

## AC-F1-02: Dashboard shell renders with sidebar and header
- Given: dev server running on port 3000
- When: developer visits `http://localhost:3000`
- Then: page displays sidebar (240px fixed) with navigation items: Dashboard, Users, Scans, Analytics
- And: header (64px height) with page title area
- And: content area (max-width 1200px, centered, 24px padding)

## AC-F1-03: Design tokens match design-brief.md
- Given: any page in the dashboard
- When: developer inspects CSS variables
- Then: `--primary: #2563EB`, `--success: #10B981`, `--warning: #F59E0B`, `--error: #EF4444`, `--font-sans: Inter`, `--sidebar-width: 240px`, `--header-height: 64px` are defined

## AC-F1-04: All 4 placeholder pages accessible via navigation
- Given: dashboard shell with sidebar
- When: developer clicks each navigation item
- Then: routes change to `/` (Dashboard), `/users` (Users), `/scans` (Scans), `/analytics` (Analytics) and corresponding placeholder pages render

## AC-F1-05: Sidebar highlights active route
- Given: dashboard shell with sidebar
- When: developer navigates to a route
- Then: the corresponding sidebar nav item shows active state (e.g., blue background or underline)

## AC-F1-06: TypeScript strict mode passes
- Given: TypeScript config with strict mode enabled
- When: developer runs `pnpm tsc --noEmit`
- Then: no type errors are reported

## AC-F1-07: Required dependencies installed
- Given: package.json
- When: developer checks installed packages
- Then: `lucide-react`, `zustand`, `sonner`, `react-hook-form`, `@tanstack/react-table`, `recharts`, `react-day-picker` are present
