# TIP-001: Project Setup + Design System

## HEADER
- **TIP-ID**: TIP-001
- **Project**: HLVN Dashboard
- **Module**: Foundation
- **Priority**: P0
- **Depends on**: none
- **Estimated**: M (6 hours)

---

## CONTEXT

- **Working dir**: `D:\scripts\HLVN\HLVN-dashboard`
- **Tech stack**: Next.js 15 App Router, TypeScript 6+, Tailwind CSS 3.4+, shadcn/ui, Radix UI
- **Key files to read first**: 
  - `coding-packs/design/design-brief.md` — design tokens, typography, spacing
  - `coding-packs/product/tech-stack.md` — full stack reference
- **Patterns to follow**: Next.js 15 App Router conventions, shadcn/ui copy-paste component pattern

---

## APPLICABLE STANDARDS

None directly applicable to project setup. Standards will apply to subsequent TIPs (auth, API, etc.).

---

## TASK

Initialize Next.js 15 dashboard project with TypeScript, Tailwind CSS, and shadcn/ui component library. Configure design tokens (colors, typography, spacing) from design brief. Create base dashboard shell layout (sidebar + header + content area) without auth or data fetching.

---

## SPECIFICATIONS

### Business Rules

1. Desktop-first layout: 1440px+ target, no mobile breakpoints in MVP.
2. Design tokens must match `coding-packs/design/design-brief.md` exactly.
3. Sidebar fixed 240px width, header fixed 64px height, content max-width 1200px.
4. Vietnamese labels for navigation items.
5. All interactive elements must meet 44px minimum touch target.

### Tech Requirements

1. **Next.js 15 App Router**:
   - Initialize with `npx create-next-app@latest` using App Router.
   - TypeScript strict mode enabled.
   - ESLint + Prettier configured.

2. **Tailwind CSS**:
   - Install Tailwind CSS 3.4+.
   - Configure design tokens in `tailwind.config.ts`:
     - Colors: primary (#2563EB), success (#10B981), warning (#F59E0B), error (#EF4444), neutral grays.
     - Typography: Inter font family, scale 12px → 14px → 16px → 18px → 20px → 24px → 30px.
     - Spacing: Tailwind default scale (4px base).
   - Add custom CSS variables in `app/globals.css` for semantic tokens.

3. **shadcn/ui**:
   - Initialize shadcn/ui: `npx shadcn-ui@latest init`.
   - Install base components: Button, Input, Card, Dialog, Toast (Sonner).
   - Components go to `components/ui/`.

4. **Folder Structure**:
   ```
   app/
   ├── (auth)/
   │   └── login/
   │       └── page.tsx          # Placeholder login page
   ├── (dashboard)/
   │   ├── layout.tsx            # Dashboard shell (sidebar + header)
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
   │   ├── AppSidebar.tsx        # Sidebar with nav items
   │   ├── DashboardHeader.tsx   # Header with title + user menu placeholder
   │   └── PageContent.tsx       # Content wrapper with max-width
   └── ui/                       # shadcn/ui components
   
   lib/
   └── utils.ts                  # cn() helper from shadcn/ui
   
   types/
   └── index.ts                  # Shared types placeholder
   ```

5. **Design Tokens**:
   - Primary: `#2563EB` (Blue 600)
   - Success: `#10B981` (Green 500)
   - Warning: `#F59E0B` (Amber 500)
   - Error: `#EF4444` (Red 500)
   - Background: `#FFFFFF`
   - Surface: `#F9FAFB` (Gray 50)
   - Border: `#E5E7EB` (Gray 200)
   - Text Primary: `#111827` (Gray 900)
   - Text Secondary: `#6B7280` (Gray 500)

6. **Typography**:
   - Font family: Inter (Google Fonts or local)
   - Body: 14px (0.875rem)
   - Page title: 24px (1.5rem)
   - KPI numbers: 30px (1.875rem)
   - Labels: 12px (0.75rem)

7. **Navigation Items** (Vietnamese):
   - Tổng quan (Dashboard Overview) — `/`
   - Người dùng (Users) — `/users`
   - Lịch sử (Scan History) — `/scans`
   - Phân tích (Analytics) — `/analytics`

### Validation

- TypeScript must compile with no errors: `npm run build`.
- Tailwind classes must resolve correctly.
- shadcn/ui components must render without console errors.
- Sidebar navigation links must route to placeholder pages.

### Error Handling

- If `create-next-app` fails, check Node.js version (18+ required).
- If shadcn/ui init fails, ensure Tailwind is configured first.
- If fonts don't load, verify Google Fonts CDN or local font files.

---

## ACCEPTANCE CRITERIA

- **Given** a fresh Next.js 15 project **When** I run `npm run dev` **Then** the app starts on `http://localhost:3000` with no errors.
- **Given** the dashboard shell **When** I navigate to `/` **Then** I see sidebar (240px), header (64px), and placeholder content.
- **Given** the sidebar **When** I click "Người dùng" **Then** I navigate to `/users` placeholder page.
- **Given** Tailwind config **When** I use `bg-primary` class **Then** the background is `#2563EB`.
- **Given** shadcn/ui Button **When** I render `<Button>Test</Button>` **Then** it displays with primary blue styling and 44px height.
- **Given** TypeScript **When** I run `npm run build` **Then** build completes with 0 type errors.

---

## CONSTRAINTS

### DO NOT
- Do NOT implement authentication or data fetching in this TIP.
- Do NOT add API routes yet.
- Do NOT install Supabase client yet.
- Do NOT add responsive breakpoints (desktop-first only).
- Do NOT add dark mode toggle.

### REUSE
- Use shadcn/ui components as-is; do not create custom button/input from scratch.
- Use Tailwind utility classes; avoid writing custom CSS unless for design tokens.

### SKIP
- Skip login functionality (TIP-003).
- Skip real data (TIP-005, TIP-006, TIP-007).
- Skip loading/empty/error states (TIP-009).
- Skip tests (TIP-010).

---

## IMPLEMENTATION CHECKLIST

- [ ] Initialize Next.js 15 with App Router and TypeScript.
- [ ] Install and configure Tailwind CSS with design tokens.
- [ ] Initialize shadcn/ui and install Button, Input, Card, Dialog, Sonner.
- [ ] Create folder structure: `app/(auth)`, `app/(dashboard)`, `components/dashboard`, `components/ui`.
- [ ] Implement `AppSidebar.tsx` with 4 navigation items (Vietnamese labels).
- [ ] Implement `DashboardHeader.tsx` with page title placeholder.
- [ ] Implement `app/(dashboard)/layout.tsx` with sidebar + header shell.
- [ ] Create placeholder pages: `/`, `/users`, `/scans`, `/analytics`.
- [ ] Add Inter font via Google Fonts or local.
- [ ] Verify TypeScript build: `npm run build`.
- [ ] Verify dev server: `npm run dev` and navigate to all routes.

---

## FILES TO CREATE

1. `package.json` — Next.js 15, TypeScript, Tailwind, shadcn/ui dependencies.
2. `tailwind.config.ts` — Design tokens (colors, fonts, spacing).
3. `app/globals.css` — Tailwind directives + custom CSS variables.
4. `app/layout.tsx` — Root layout with Inter font.
5. `app/(auth)/login/page.tsx` — Placeholder login page.
6. `app/(dashboard)/layout.tsx` — Dashboard shell layout.
7. `app/(dashboard)/page.tsx` — Dashboard overview placeholder.
8. `app/(dashboard)/users/page.tsx` — Users page placeholder.
9. `app/(dashboard)/scans/page.tsx` — Scans page placeholder.
10. `app/(dashboard)/analytics/page.tsx` — Analytics page placeholder.
11. `components/dashboard/AppSidebar.tsx` — Sidebar component.
12. `components/dashboard/DashboardHeader.tsx` — Header component.
13. `components/dashboard/PageContent.tsx` — Content wrapper.
14. `components/ui/*` — shadcn/ui components (Button, Input, Card, etc.).
15. `lib/utils.ts` — `cn()` helper from shadcn/ui.
16. `types/index.ts` — Shared types placeholder.

---

## VERIFICATION STEPS

1. Run `npm run build` — must succeed with 0 errors.
2. Run `npm run dev` — app starts on port 3000.
3. Navigate to `/` — see sidebar + header + "Tổng quan" content placeholder.
4. Navigate to `/users` — see "Người dùng" content placeholder.
5. Navigate to `/scans` — see "Lịch sử" content placeholder.
6. Navigate to `/analytics` — see "Phân tích" content placeholder.
7. Inspect sidebar width — must be 240px.
8. Inspect header height — must be 64px.
9. Inspect Button component — must have 44px height and primary blue background.
10. Check browser console — no errors or warnings.

---

## NOTES

- This TIP establishes the foundation; subsequent TIPs will add Supabase, auth, API routes, and real data.
- Design tokens are critical; verify against `coding-packs/design/design-brief.md` before proceeding.
- Sidebar navigation is static in this TIP; active state styling will be added in TIP-003 after auth.

---

**Created**: 2026-05-08  
**Estimated effort**: 6 hours  
**Next TIP**: TIP-002 (Supabase Schema + RLS)
