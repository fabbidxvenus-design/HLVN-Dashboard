# TIP-012: Responsive Design Implementation

## HEADER
- TIP-ID: TIP-012
- Project: HLVN Dashboard
- Module: Responsive / Mobile
- Priority: P2
- Depends on: TIP-007, TIP-009, TIP-010
- Estimated: M (4h)

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Tech stack: Next.js 15, TypeScript, Tailwind CSS
- Key files to read first: `components/dashboard/DashboardShell.tsx`, `components/dashboard/AppSidebar.tsx`, `app/globals.css`
- Patterns to follow: design brief responsive breakpoints (1440px, 1024px, 768px, <768px)

## TASK
Implement responsive breakpoints per design brief. Ensure tablet/mobile users can still access all features. Add sidebar toggle for smaller screens.

## SPECIFICATIONS

### Breakpoints (from design brief)
1. **Desktop (1440px+)**: Default layout (240px sidebar)
2. **Laptop (1024-1439px)**: 200px sidebar (optional collapse)
3. **Tablet (768-1023px)**: Collapsible sidebar (overlay)
4. **Mobile (<768px)**: Hamburger menu, stacked cards

### Implementation

#### Sidebar Toggle
- Add hamburger icon button in header (tablet/mobile only)
- Toggle sidebar open/closed
- Overlay backdrop when open
- Close on escape or backdrop click

#### Table Responsive
- Horizontal scroll for tables on tablet/mobile
- Keep min-width so content doesn't squish
- Sticky first column (thumbnail/email)

#### KPI Cards Responsive
- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 1 column

#### Charts
- Full width on all breakpoints
- Adjust height slightly on mobile (250px)

### Code Structure
```tsx
// useMediaQuery hook for breakpoint detection
const isMobile = useMediaQuery('(max-width: 767px)')
const isTablet = useMediaQuery('(max-width: 1023px)')

// Sidebar component with open/close state
// Header with hamburger button (tablet/mobile only)
```

## ACCEPTANCE CRITERIA
- Given desktop (1440px+), layout should match design spec exactly
- Given tablet (768-1023px), sidebar should collapse with toggle
- Given mobile (<768px), KPI cards should be 1 column
- Given mobile, tables should scroll horizontally
- Given sidebar toggle, smooth animation should play

## CONSTRAINTS
- DO NOT: Remove any functionality on mobile
- DO NOT: Break desktop layout
- REUSE: existing component structure
- SKIP: Dark mode responsive (separate phase)