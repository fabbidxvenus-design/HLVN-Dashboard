# Phase 01 — Foundation: Project Setup + API Client + Auth

> zflow plan-supervised mode: skips RRI/SDD/PROPOSAL
> Source: `TIP-001` + `TIP-002`

## Overview

Initialize HLVN Dashboard project (TIP-001), then implement API client with mock data support and auth flow (TIP-002). Dashboard runs in mock mode during parallel development with `HLVN-serverless`.

## Dependencies
- None (TIP-001 is the entry point for the entire dashboard)

## Requirements

### TIP-001: Project Setup + Design System
1. Initialize Next.js 15 with App Router and TypeScript (strict mode)
2. Install: Tailwind CSS 3.4+, shadcn/ui CLI, lucide-react, zustand, sonner, react-hook-form, @tanstack/react-table, recharts, react-day-picker
3. Configure ESLint and Prettier
4. Create design tokens in `app/globals.css` matching `design-brief.md`
5. Create dashboard shell: `AppSidebar`, `DashboardHeader`, `DashboardShell`
6. Create 4 placeholder pages: `/`, `/users`, `/scans`, `/analytics`

### TIP-002: Backend API Client + Auth Flow
1. Create `.env.example` with `NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001` and `NEXT_PUBLIC_USE_MOCK_API=false`
2. Create `types/api.ts` with `ApiResponse<T>`, `ApiMeta` (with `hasMore`), `ApiErrorCode`
3. Create `types/user.ts` with `UserRole`, `UserProfile` (camelCase: `createdAt`, `updatedAt`, `lastLogin`)
4. Create `types/auth.ts` with `AuthSession`
5. Create `lib/api/mock-data.ts` with contract-accurate mock responses for all endpoints
6. Create `lib/api/client.ts` with bearer token injection and mock mode support
7. Create `lib/api/errors.ts` with Vietnamese error mapping
8. Create `lib/auth/token-store.ts` with browser token persistence
9. Create `lib/auth/auth-guard.ts` with admin check helpers
10. Create `stores/auth-store.ts` (Zustand)
11. Create `hooks/useAuthSession.ts`
12. Create `app/(auth)/login/page.tsx` with React Hook Form validation
13. Update `app/(dashboard)/layout.tsx` with admin gate and session validation

### Mock Data Requirements
- All mock responses must match `HLVN-serverless` API contracts exactly
- Use camelCase field names: `userId`, `imageUrl`, `ocrStructured`, `createdAt`, `updatedAt`, `lastLogin`
- Use `from`/`to` for analytics params (not `dateFrom`/`dateTo`)
- Include `meta.hasMore` in all paginated responses
- Analytics mock responses are pre-aggregated (do not calculate from raw scans)
- Do not create `app/api/*` mock routes

## File Ownership (non-overlapping)

| Files | Owner |
|-------|-------|
| `app/`, `components/dashboard/`, `lib/utils.ts`, `types/index.ts` | TIP-001 |
| `lib/api/`, `lib/auth/`, `hooks/useAuthSession.ts`, `stores/auth-store.ts`, `app/(auth)/login/`, `app/(dashboard)/layout.tsx`, `.env.example`, `types/api.ts`, `types/user.ts`, `types/auth.ts` | TIP-002 |

## Acceptance Criteria (from source TIPs)

- [ ] `pnpm install && pnpm dev` starts without errors
- [ ] Dashboard shell renders with sidebar (240px) + header (64px)
- [ ] 4 navigation items: Dashboard, Users, Scans, Analytics
- [ ] All 4 placeholder pages accessible via navigation
- [ ] Design tokens match `design-brief.md`
- [ ] `pnpm tsc --noEmit` passes
- [ ] Login page renders with email/password form and React Hook Form validation
- [ ] Auth store updates immutably (Zustand)
- [ ] API client attaches bearer token to authenticated requests
- [ ] Mock mode (`NEXT_PUBLIC_USE_MOCK_API=true`) returns contract-accurate responses
- [ ] Dashboard gate redirects unauthenticated users to `/login`
- [ ] Non-admin users blocked with Vietnamese error message
- [ ] Auth tests cover success and failure states

## Notes
- Backend endpoint contracts are defined in `TIP-002` SPECIFICATIONS section
- Mock data strategy documented in `TIP-002` Mock Data Strategy section
- All API responses use `{ success, data, error, code, meta }` envelope
- Serverless is source of truth — if mock conflicts with serverless contract, update mock
