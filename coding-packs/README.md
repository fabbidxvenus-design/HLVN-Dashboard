# Coding Packs — HLVN Dashboard

> Vibecode Kit v5.0 — Structured development workspace  
> Project: Internal admin dashboard for HLVN OCR mobile app  
> Current stage: Frontend-only blueprint + TIPs complete, ready for implementation

---

## Scope

**Dashboard project** (`D:\scripts\HLVN\HLVN-dashboard`) is frontend-only:

- Next.js 15 App Router UI pages
- Components, forms, tables, charts, loading/empty/error states
- Calls external backend API
- No `app/api/*` routes
- No Supabase client/server/admin imports
- No OpenRouter integration
- No database migrations

**Backend project** (`D:\scripts\HLVN\HLVN-serverless`) owns:

- All API endpoints
- Supabase Auth/PostgreSQL/Storage/RLS
- OpenRouter integration and retry/fallback
- Business logic and data persistence

---

## Structure

```text
coding-packs/
├── 00-PROJECT-CONTEXT.md      # Scan context + Vision
├── 01-REQUIREMENTS-MATRIX.md  # RRI requirements matrix
├── 02-TASK-GRAPH.md           # Frontend-only TIP dependency graph + milestones
├── BUILDER-HANDOFF.md         # Frontend-only implementation blueprint
├── product/                   # Mission, roadmap, tech stack
├── design/                    # UI brief, Pencil design, design review
├── tips/                      # Step-by-step frontend implementation guides
├── plans/                     # Architecture + design decisions
├── reports/                   # Quality reports + audits
├── research/                  # Research notes + stack decisions
└── standards/                 # Project-specific coding standards
```

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| App Framework | Next.js 15 App Router | Dashboard pages and routing |
| Language | TypeScript 6+ | Type-safe frontend code |
| Styling | Tailwind CSS 3.4+ | Utility-first design system implementation |
| UI Components | shadcn/ui + Radix UI | Accessible admin UI primitives |
| Tables | TanStack Table | Sortable/filterable/paginated data tables |
| Charts | Recharts | KPI and analytics visualizations |
| Forms | React Hook Form | Login and CRUD form handling |
| Client State | Zustand | Lightweight auth/UI state only |
| Icons | Lucide React | Dashboard icon set |
| Toasts | Sonner | Success/error feedback |
| Date Filters | React Day Picker | Date range filters |
| Backend API | External serverless API | `D:\scripts\HLVN\HLVN-serverless` |
| Deployment | Vercel | Dashboard hosting |
| Tests | Vitest + Testing Library | Frontend unit/component tests |

Backend-only technologies not implemented in this dashboard project: Supabase, OpenRouter, database migrations, API route handlers.

---

## Source Documents

| Document | Purpose | Status |
|----------|---------|--------|
| [`00-PROJECT-CONTEXT.md`](00-PROJECT-CONTEXT.md) | Source app scan context and frontend-only Vision | Complete |
| [`01-REQUIREMENTS-MATRIX.md`](01-REQUIREMENTS-MATRIX.md) | Frontend-only RRI requirements matrix with backend dependencies | Complete |
| [`02-TASK-GRAPH.md`](02-TASK-GRAPH.md) | 6 frontend-only TIPs, dependencies, critical path, milestones | Complete |
| [`BUILDER-HANDOFF.md`](BUILDER-HANDOFF.md) | Technical blueprint for frontend-only implementation sessions | Complete |
| [`reports/scope-revision-summary.md`](reports/scope-revision-summary.md) | Scope correction from backend-in-dashboard to frontend-only | Complete |
| [`reports/parallel-development-sync.md`](reports/parallel-development-sync.md) | Dashboard/serverless contract sync and parallel workflow | Complete |
| [`product/tech-stack.md`](product/tech-stack.md) | Frontend-only stack reference; backend stack lives in serverless project | Complete |
| [`design/design-brief.md`](design/design-brief.md) | UI direction, tokens, screen specs | Complete |
| [`design/design-review.md`](design/design-review.md) | Pencil design review and implementation notes | Complete |
| [`reports/rri-summary.md`](reports/rri-summary.md) | RRI completion summary | Outdated by scope revision |
| [`standards/README.md`](standards/README.md) | Applicable project standards index | Partial; backend standards apply to serverless project |

---

## Workflow

1. **SCAN** → `00-PROJECT-CONTEXT.md`  
   Capture source app architecture, data model, API patterns, and constraints.

2. **RRI** → `01-REQUIREMENTS-MATRIX.md`  
   Capture requirements, standards, decisions, open questions, and MVP boundaries.

3. **VISION** → `00-PROJECT-CONTEXT.md`  
   Define product type, architecture vision, UI vision, API design, and MVP scope.

4. **BLUEPRINT** → `BUILDER-HANDOFF.md` + `02-TASK-GRAPH.md`  
   Define frontend implementation architecture, backend API contract, component tree, and execution order.

5. **TIP** → `tips/TIP-XXX-*.md`  
   Generate implementation guides for each frontend task in dependency order.

6. **VERIFY** → reports + tests  
   Validate implementation against P0 requirements, frontend scope boundary, accessibility, and coverage.

---

## TIP Execution Order

| Order | TIP | Name | Depends On | Est. Hours | Week | File |
|-------|-----|------|------------|------------|------|------|
| 1 | TIP-001 | Project Setup + Design System | — | 6h | 1 | [`TIP-001-project-setup-design-system.md`](tips/TIP-001-project-setup-design-system.md) |
| 2 | TIP-002 | Backend API Client + Auth Flow | TIP-001 | 8h | 1 | [`TIP-002-backend-api-client-auth.md`](tips/TIP-002-backend-api-client-auth.md) |
| 3 | TIP-003 | Users Management UI | TIP-002 | 10h | 2 | [`TIP-003-users-ui.md`](tips/TIP-003-users-ui.md) |
| 4 | TIP-004 | Scans History UI | TIP-002 | 12h | 2 | [`TIP-004-scans-ui.md`](tips/TIP-004-scans-ui.md) |
| 5 | TIP-005 | Analytics Dashboard UI | TIP-002 | 10h | 2 | [`TIP-005-analytics-ui.md`](tips/TIP-005-analytics-ui.md) |
| 6 | TIP-006 | UI Polish + A11y + Tests | TIP-003, TIP-004, TIP-005 | 10h | 3 | [`TIP-006-polish-a11y-tests.md`](tips/TIP-006-polish-a11y-tests.md) |

**Parallelization**: TIP-003, TIP-004, and TIP-005 can run in parallel after TIP-002.  
**Critical path**: TIP-001 → TIP-002 → TIP-004 → TIP-006.  
**Total estimate**: 56 hours.

Archived backend-scoped TIPs are in [`tips/archive-backend-scope/`](tips/archive-backend-scope/).

---

## Applicable Standards

| Standard | Dashboard Applicability |
|----------|--------------------------|
| [`standards/auth/rbac-admin-gate.md`](standards/auth/rbac-admin-gate.md) | Applies to frontend route gate UX; backend enforces authorization |
| [`standards/auth/supabase-auth-rls.md`](standards/auth/supabase-auth-rls.md) | Backend/serverless scope only |
| [`standards/api/multi-key-fallback.md`](standards/api/multi-key-fallback.md) | Backend/serverless scope only |
| [`standards/api/retry-backoff.md`](standards/api/retry-backoff.md) | Backend/serverless scope only |

---

## Builder Usage

At the start of each implementation session:

1. Read [`BUILDER-HANDOFF.md`](BUILDER-HANDOFF.md).
2. Read the specific TIP file for the task being implemented.
3. Verify dependencies from [`02-TASK-GRAPH.md`](02-TASK-GRAPH.md).
4. Keep dashboard scope frontend-only.
5. Implement with tests first where practical.
6. Run relevant checks before marking the TIP complete.

---

## Scope Boundary Checklist

Before marking any TIP complete, verify dashboard project does not contain:

- [ ] `app/api/*` routes
- [ ] Supabase client/server/admin imports
- [ ] OpenRouter API calls or key handling
- [ ] Database migrations
- [ ] Backend OCR retry/fallback implementation
- [ ] Service-role secrets or backend-only env vars

---

## Blueprint Quality Gate

- [x] Builder handoff revised for frontend-only dashboard scope.
- [x] Task graph revised to 6 frontend-only TIPs.
- [x] Old backend-scoped TIPs archived.
- [x] New frontend-only TIP files generated.
- [x] README updated with external backend API boundary.
- [x] TIP-002, TIP-003, TIP-004, TIP-005 updated with correct serverless endpoints.
- [x] BUILDER-HANDOFF.md updated with correct backend API contract.
- [x] 00-PROJECT-CONTEXT.md rewritten for frontend-only Vision.
- [x] 01-REQUIREMENTS-MATRIX.md rewritten for frontend-only scope with backend dependencies.
- [x] product/tech-stack.md rewritten for frontend-only stack.

**Verdict**: PASSED — Frontend-only coding-packs are fully aligned with serverless backend contract and ready for parallel development.

---

*README revised: 2026-05-08 | Framework: Vibecode Kit v5.0 | Project: HLVN Dashboard (Frontend-Only)*
