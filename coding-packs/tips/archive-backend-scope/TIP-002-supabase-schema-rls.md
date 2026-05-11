# TIP-002: Supabase Schema + RLS

## HEADER
- **TIP-ID**: TIP-002
- **Project**: HLVN Dashboard
- **Module**: Database Foundation
- **Priority**: P0
- **Depends on**: TIP-001
- **Estimated**: M (8 hours)

## CONTEXT
- **Working dir**: `D:\scripts\HLVN\HLVN-dashboard`
- **Tech stack**: Supabase PostgreSQL, Supabase Auth, Supabase Storage, Next.js 15
- **Key files to read first**:
  - `coding-packs/product/tech-stack.md`
  - `coding-packs/BUILDER-HANDOFF.md`
  - `coding-packs/01-REQUIREMENTS-MATRIX.md`
- **Patterns to follow**: Use SQL migrations under `supabase/migrations/`; keep auth users in Supabase Auth and public profile data in `public.users`.

## APPLICABLE STANDARDS
- [`auth/supabase-auth-rls`](../standards/auth/supabase-auth-rls.md) — Supabase Auth + Row Level Security.
- [`auth/rbac-admin-gate`](../standards/auth/rbac-admin-gate.md) — roles `admin`, `manager`, `user`; dashboard is admin-only.

## TASK
Create Supabase database migration and seed guidance for the dashboard data model. Define `users`, `scans`, and `analytics_cache`, required indexes, RLS policies, and storage bucket policy guidance for scan images.

## SPECIFICATIONS

### Business Rules
1. `users.id` must map to `auth.users.id`.
2. Roles are exactly `admin`, `manager`, `user`.
3. Admins can read/manage all users and scans.
4. Non-admin users can only read/insert/update their own scans through RLS.
5. Admin scan deletion is allowed; non-admin scan deletion is not part of MVP.
6. Scan OCR data and token usage must be stored as JSONB.
7. Deleting a user cascades their scans.

### Files to Create/Modify
- `supabase/migrations/0001_initial_schema.sql`
- `supabase/seed.sql`
- `types/database.ts` (manual initial types until Supabase generated types are available)
- `.env.example` (Supabase env var names only, no secrets)

### Database Schema
Create:
- `public.users`
  - `id uuid primary key references auth.users(id) on delete cascade`
  - `email text unique not null`
  - `role text not null check (role in ('admin','manager','user')) default 'user'`
  - `created_at timestamptz default now()`
  - `updated_at timestamptz default now()`
  - `last_login timestamptz null`
- `public.scans`
  - `id uuid primary key default gen_random_uuid()`
  - `user_id uuid not null references public.users(id) on delete cascade`
  - `timestamp timestamptz not null default now()`
  - `image_url text null`
  - `ocr_structured jsonb not null`
  - `token_usage jsonb not null`
  - `api_key_index integer not null check (api_key_index > 0)`
  - `model_tier text null check (model_tier in ('free','default','high'))`
  - `edited boolean not null default false`
  - `created_at timestamptz default now()`
  - `updated_at timestamptz default now()`
- `public.analytics_cache`
  - `id uuid primary key default gen_random_uuid()`
  - `date date unique not null`
  - `total_scans integer not null default 0`
  - `active_users integer not null default 0`
  - `top_products jsonb not null default '[]'::jsonb`
  - `api_usage jsonb not null default '[]'::jsonb`
  - `updated_at timestamptz default now()`

### Indexes
- `idx_users_role` on `users(role)`
- `idx_users_email` on `users(email)`
- `idx_scans_user_id` on `scans(user_id)`
- `idx_scans_timestamp` on `scans(timestamp desc)`
- `idx_scans_ocr_structured_gin` GIN on `scans(ocr_structured)`
- `idx_analytics_date` on `analytics_cache(date desc)`

### RLS Policies
Enable RLS on all three tables.

Policies:
1. `users`: admins can select all users.
2. `users`: users can select their own profile.
3. `users`: admins can insert/update/delete profile rows.
4. `scans`: users can select own scans, admins can select all scans.
5. `scans`: users can insert own scans.
6. `scans`: users can update own scans.
7. `scans`: admins can delete scans.
8. `analytics_cache`: admins can select all analytics cache rows.
9. `analytics_cache`: service role/admin operations can insert/update; client write is not required.

### Validation
- SQL migration must be idempotent where practical (`create table if not exists`, `create index if not exists`).
- Use helper SQL function if needed: `public.is_admin()` returning boolean based on `auth.uid()`.
- Do not reference `public.users` in a way that causes recursive RLS policy failures.

### Error Handling
- Migration should fail fast on invalid SQL.
- Add comments in SQL only for non-obvious RLS constraints.
- Do not include real user IDs, emails, or secrets in `seed.sql`.

## ACCEPTANCE CRITERIA
- Given a new Supabase project When migration `0001_initial_schema.sql` runs Then tables `users`, `scans`, and `analytics_cache` exist.
- Given RLS is enabled When a normal user selects scans Then only their own scans are visible.
- Given RLS is enabled When an admin selects scans Then all scans are visible.
- Given a normal user attempts to select all users When query runs Then only their own profile is visible or access is denied per policy.
- Given an admin attempts to manage users When API uses service role after admin verification Then user profile rows can be created/updated/deleted.
- Given indexes are inspected When migration completes Then required scan/user/analytics indexes exist.

## CONSTRAINTS
### DO NOT
- Do NOT implement Next.js API routes in this TIP.
- Do NOT put `SUPABASE_SERVICE_ROLE_KEY` in client code.
- Do NOT create passwords or auth users directly in SQL seed.
- Do NOT disable RLS after enabling it.

### REUSE
- Reuse schema fields from `coding-packs/product/tech-stack.md` and `BUILDER-HANDOFF.md`.

### SKIP
- Skip auth UI and login behavior (TIP-003).
- Skip user CRUD API (TIP-005).
- Skip scan export and analytics queries (TIP-006/TIP-007).

## QUALITY GATE: TIP Self-Review
- [x] TIP is self-contained and specifies migration files.
- [x] RLS policies align with Supabase Auth/RLS standard.
- [x] Covers REQ-AUTH-006 and REQ-DB-001 through REQ-DB-006.
- [x] Acceptance criteria use Given/When/Then.

**Verdict**: PASSED — ready for implementation after TIP-001.
