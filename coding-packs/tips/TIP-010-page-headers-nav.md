# TIP-010: Page Headers & Navigation Polish

## HEADER
- TIP-ID: TIP-010
- Project: HLVN Dashboard
- Module: Layout / Navigation
- Priority: P1
- Depends on: TIP-007
- Estimated: S (2h)

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Tech stack: Next.js 15, TypeScript, Tailwind CSS
- Key files to read first: `components/dashboard/DashboardShell.tsx`, `components/dashboard/AppSidebar.tsx`, `components/dashboard/DashboardHeader.tsx`
- Patterns to follow: design brief layout (240px sidebar, 64px header)

## TASK
Polish dashboard layout - enhance sidebar with better active states, add subtle depth, polish header with user info area. Ensure navigation feels premium.

## SPECIFICATIONS

### 1. Sidebar Enhancement
- Add subtle shadow on sidebar edge (right shadow)
- Active nav item: bg-[var(--primary-light)] + left border 3px primary
- Hover: smooth bg transition
- Logo: bold 24px, primary color
- Add subtle hover lift effect

### 2. Navigation Items
- Height: 40px minimum
- Icon size: 20px
- Text: 14px medium
- Active indicator: left border + bg tint
- Gap between icon and text: 12px

### 3. DashboardHeader Enhancement
- Add subtle bottom border
- Height: 64px
- Add page title style (24px bold)
- Add user avatar placeholder area on right

### 4. Content Area Polish
- Add subtle top border on main content
- Ensure consistent padding (24px or 32px)
- Max-width: 1200px

## ACCEPTANCE CRITERIA
- Given AppSidebar, active item should have bg tint + left border
- Given AppSidebar, hover should have smooth transition
- Given DashboardHeader, should have bottom border
- Given DashboardHeader, page title should be 24px bold
- Given navigation, icon+text should be aligned consistently

## CONSTRAINTS
- DO NOT: Change sidebar width (240px)
- DO NOT: Change navigation structure
- REUSE: existing usePathname for active detection
- SKIP: User dropdown menu (can be v2)