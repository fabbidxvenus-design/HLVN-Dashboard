# TIP-001: Project Scaffold

## HEADER
- TIP-ID: TIP-001
- Project: HLVN Dashboard
- Module: scaffold
- Priority: P0
- Depends on: none
- Estimated: S (2h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + TypeScript strict + Tailwind CSS v4 + shadcn/ui
- Key files to read first: coding-packs/00-PROJECT-CONTEXT.md, coding-packs/BUILDER-HANDOFF.md
- Patterns to follow: Standard Vite + React SPA scaffold

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Initialize the HLVN Dashboard project from scratch using Vite 6 + React 19 + TypeScript strict mode. Set up Tailwind CSS v4, configure the Vite dev proxy to localhost:3001, and install all required dependencies.

## SPECIFICATIONS

### Files to Create

1. `package.json` — project dependencies:
   - vite, react, react-dom, react-router, @types/react, @types/react-dom
   - tailwindcss, postcss, autoprefixer
   - @supabase/supabase-js
   - zustand
   - react-hook-form, zod, @hookform/resolvers
   - @tanstack/react-table
   - recharts
   - lucide-react
   - sonner
   - class-variance-authority, clsx, tailwind-merge

2. `vite.config.ts` — Vite config with:
   - React plugin
   - Proxy: `/api` → `http://localhost:3001`
   - Path alias: `@/` → `./src/`

3. `tsconfig.json` — TypeScript strict mode, path aliases

4. `index.html` — Vite entry HTML with Google Fonts (Manrope, Inter, Public Sans)

5. `src/main.tsx` — React entry point

6. `src/App.tsx` — Placeholder with React Router setup

7. `src/globals.css` — Tailwind v4 directives (placeholder for tokens)

8. `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

9. `src/vite-env.d.ts` — Vite env types

10. `.env.example` — Environment variables template:
    - `VITE_SUPABASE_URL`
    - `VITE_SUPABASE_ANON_KEY`
    - `VITE_API_URL` (optional, for prod)

### Business Rules
1. Project MUST use Vite 6 with React 19
2. TypeScript MUST be in strict mode
3. Vite dev proxy MUST forward `/api/*` to `http://localhost:3001`
4. All fonts (Manrope, Inter, Public Sans) MUST be loaded via Google Fonts in index.html

### Validation
- `pnpm install` completes without errors
- `pnpm dev` starts dev server successfully
- `pnpm tsc --noEmit` passes with zero errors

## ACCEPTANCE CRITERIA
- Given fresh project When `pnpm install && pnpm dev` Then dev server starts on localhost:5173
- Given dev server running When navigating to `/` Then placeholder App renders
- Given dev server running When fetching `/api/health` Then request proxies to localhost:3001
- Given project When `pnpm tsc --noEmit` Then zero TypeScript errors

## CONSTRAINTS
- DO NOT: Add any UI components yet (that's TIP-006)
- DO NOT: Add any page content (that's later TIPs)
- DO NOT: Configure Tailwind theme tokens yet (that's TIP-002)
- REUSE: Nothing — this is greenfield
- SKIP: Authentication, pages, components — only scaffold
