# TIP-001: Project Setup + Design System

## HEADER
- TIP-ID: TIP-001
- Project: HLVN Dashboard
- Module: Foundation
- Priority: P0
- Depends on: —
- Estimated: M (6h)

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Tech stack: Next.js 15 App Router, TypeScript 6+, Tailwind CSS 3.4+, shadcn/ui, Lucide React
- Key files to read first: `coding-packs/design/design-brief.md`, `coding-packs/product/tech-stack.md`
- Patterns to follow: Next.js 15 App Router conventions, Tailwind utility-first styling

## APPLICABLE STANDARDS
none — foundation setup

## TASK
Initialize Next.js 15 dashboard project with TypeScript, Tailwind CSS, shadcn/ui component library, and design tokens from design brief. Create empty dashboard shell with sidebar and header layout ready for feature pages.

## SPECIFICATIONS

### Business Rules
1. Dashboard is desktop-first (1440px+ primary target)
2. Design tokens must match `design-brief.md` exactly
3. All UI components use shadcn/ui + Radix UI primitives for accessibility
4. Sidebar navigation shows 4 main sections: Dashboard, Users, Scans, Analytics
5. Header shows page title and user menu placeholder

### Tech Setup
1. Initialize Next.js 15 with App Router and TypeScript
2. Install and configure Tailwind CSS 3.4+
3. Install shadcn/ui CLI and initialize with default config
4. Install required dependencies:
   - `lucide-react` for icons
   - `zustand` for client state
   - `sonner` for toasts
   - `react-hook-form` for forms
   - `@tanstack/react-table` for tables
   - `recharts` for charts
   - `react-day-picker` for date pickers
5. Configure TypeScript with strict mode
6. Set up ESLint and Prettier

### Design Tokens
Define in `app/globals.css`:

```css
:root {
  /* Colors */
  --primary: #2563EB;
  --primary-hover: #1D4ED8;
  --primary-light: #DBEAFE;
  
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
  
  --background: #FFFFFF;
  --surface: #F9FAFB;
  --border: #E5E7EB;
  --text-primary: #111827;
  --text-secondary: #6B7280;
  --text-muted: #9CA3AF;
  
  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Consolas', monospace;
  
  /* Spacing */
  --sidebar-width: 240px;
  --header-height: 64px;
  --content-max-width: 1200px;
}
```

### Folder Structure
Create:
```
app/
├── (auth)/
│   └── login/
│       └── page.tsx          # Empty placeholder
├── (dashboard)/
│   ├── layout.tsx            # Dashboard shell with sidebar + header
│   ├── page.tsx              # Dashboard overview placeholder
│   ├── users/
│   │   └── page.tsx          # Users page placeholder
│   ├── scans/
│   │   └── page.tsx          # Scans page placeholder
│   └── analytics/
│       └── page.tsx          # Analytics page placeholder
├── globals.css
└── layout.tsx                # Root layout

components/
├── dashboard/
│   ├── AppSidebar.tsx        # Sidebar with navigation
│   ├── DashboardHeader.tsx   # Header with title + user menu
│   └── DashboardShell.tsx    # Layout wrapper
└── ui/                       # shadcn/ui components (install as needed)

lib/
└── utils.ts                  # cn() helper from shadcn/ui

types/
└── index.ts                  # Shared type exports
```

### Dashboard Shell Components

**AppSidebar.tsx**:
- Fixed 240px width
- Logo/brand at top
- Navigation items: Dashboard, Users, Scans, Analytics
- Active state highlighting
- Logout button at bottom (placeholder)
- Use Lucide icons: `LayoutDashboard`, `Users`, `History`, `BarChart3`, `LogOut`

**DashboardHeader.tsx**:
- Fixed 64px height
- Page title (dynamic via prop)
- User menu placeholder (icon only)
- Background: `--surface`
- Border bottom: `--border`

**DashboardShell.tsx**:
- Flex layout: sidebar (240px) + main content (flex-1)
- Main content: header + scrollable content area
- Max content width: 1200px centered
- Padding: 24px

### Validation
1. TypeScript strict mode enabled
2. All imports resolve without errors
3. Tailwind classes compile correctly
4. Design tokens accessible via CSS variables

### Error Handling
1. Show clear error if dependencies fail to install
2. Validate Node.js version >= 18
3. Validate package manager (prefer pnpm, fallback npm)

## ACCEPTANCE CRITERIA
- Given fresh clone, When run `pnpm install && pnpm dev`, Then dev server starts without errors
- Given dev server running, When visit `http://localhost:3000`, Then see dashboard shell with sidebar and header
- Given dashboard shell, When click navigation items, Then routes change to placeholder pages
- Given any page, When inspect CSS variables, Then design tokens match design-brief.md exactly
- Given TypeScript check, When run `pnpm tsc --noEmit`, Then no type errors

## CONSTRAINTS
- DO NOT: Install Supabase client libraries (backend API will be external)
- DO NOT: Create `app/api/*` routes (backend is separate project)
- DO NOT: Install OpenRouter or OCR-related packages
- REUSE: shadcn/ui components for all UI primitives
- SKIP: Authentication logic (TIP-002), data fetching (later TIPs)

## VERIFICATION CHECKLIST
- [ ] `pnpm dev` starts without errors
- [ ] Dashboard shell renders with sidebar + header
- [ ] All 4 placeholder pages accessible via navigation
- [ ] Design tokens in `globals.css` match design brief
- [ ] TypeScript strict mode enabled and passing
- [ ] No console errors in browser
- [ ] Sidebar navigation highlights active route
- [ ] Page title updates per route
