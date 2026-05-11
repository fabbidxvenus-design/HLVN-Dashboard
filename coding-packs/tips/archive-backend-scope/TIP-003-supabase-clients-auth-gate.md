# TIP-003: Supabase Clients + Auth Gate

## HEADER
- **TIP-ID**: TIP-003
- **Project**: HLVN Dashboard
- **Module**: Authentication & Authorization
- **Priority**: P0
- **Depends on**: TIP-002
- **Estimated**: M (8 hours)

## CONTEXT
- **Working dir**: `D:\scripts\HLVN\HLVN-dashboard`
- **Tech stack**: Next.js 15 App Router, Supabase Auth, Supabase JS v2, Zustand, React Hook Form, Sonner
- **Key files to read first**:
  - `coding-packs/BUILDER-HANDOFF.md`
  - `coding-packs/standards/auth/supabase-auth-rls.md`
  - `coding-packs/standards/auth/rbac-admin-gate.md`
- **Patterns to follow**: Supabase Auth handles login/session refresh; dashboard must enforce admin role on both UI layout and API helpers.

## APPLICABLE STANDARDS
- [`auth/supabase-auth-rls`](../standards/auth/supabase-auth-rls.md) — login, token refresh, RLS, service role constraints.
- [`auth/rbac-admin-gate`](../standards/auth/rbac-admin-gate.md) — admin-only dashboard; managers/users use mobile app.

## TASK
Implement Supabase client setup, login page behavior, auth state store/hook, dashboard admin gate, logout, and reusable server helper for session/profile lookup. This TIP does not implement business APIs beyond `/api/v1/auth/me`.

## SPECIFICATIONS

### Business Rules
1. Only `admin` users can access dashboard pages.
2. Non-admin authenticated users must be signed out from dashboard and shown Vietnamese error: `Chỉ admin mới có thể truy cập dashboard. Vui lòng sử dụng mobile app.`
3. Missing/expired session redirects to `/login`.
4. Logout clears Supabase session and redirects to `/login`.
5. Supabase handles JWT refresh; do not implement custom JWT.
6. Service role client is server-only and must never be imported by client components.

### Files to Create/Modify
- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `lib/supabase/admin.ts`
- `lib/auth/session.ts`
- `lib/auth/require-admin.ts`
- `stores/auth-store.ts`
- `hooks/useAuthSession.ts`
- `types/auth.ts`
- `types/user.ts`
- `app/(auth)/login/page.tsx`
- `app/(dashboard)/layout.tsx`
- `app/api/v1/auth/me/route.ts`
- `components/dashboard/LogoutButton.tsx`

### Client Setup
- `client.ts`: browser Supabase client using `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `server.ts`: server/client-cookie aware Supabase client for App Router.
- `admin.ts`: service role Supabase client using `SUPABASE_SERVICE_ROLE_KEY`; server-only import guard.

### Auth Store
State:
```ts
interface AuthStoreState {
  user: UserProfile | null;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  clear: () => void;
}
```
Use immutable Zustand updates.

### Login Page
- Email/password form using React Hook Form.
- Validate email format and password non-empty.
- On submit: `supabase.auth.signInWithPassword()`.
- Fetch profile from `public.users` by auth user id.
- If role is not admin: sign out and show Vietnamese error.
- If admin: store profile and route to `/`.
- Show loading spinner on submit button.

### Dashboard Gate
- `app/(dashboard)/layout.tsx` must check session and role before rendering children.
- Non-authenticated users redirect to `/login`.
- Authenticated non-admin users redirect/sign out and show error on login page where practical.

### `/api/v1/auth/me`
- Returns current admin profile in response envelope.
- Auth: required.
- Errors: 401 for missing/invalid session, 403 for non-admin.

### Validation
- Required env vars must be checked at module boundary with clear errors.
- Login form validates email/password before network call.
- `requireAdmin` validates bearer token/session and role.

### Error Handling
- Client shows Sonner toast for auth failures.
- Backend returns API response envelope, never raw Supabase error object.
- Server logs detailed context without secrets.

## ACCEPTANCE CRITERIA
- Given an admin account When login succeeds Then user is redirected to `/` and dashboard shell renders.
- Given a manager/user account When login succeeds at Supabase Then dashboard immediately signs out and shows admin-only error.
- Given no session When navigating to `/users` Then user is redirected to `/login`.
- Given an admin session When calling `GET /api/v1/auth/me` Then response is `{ success: true, data: { user } }`.
- Given a non-admin session When calling `GET /api/v1/auth/me` Then response status is 403.
- Given logout is clicked When Supabase signOut resolves Then session clears and route becomes `/login`.

## CONSTRAINTS
### DO NOT
- Do NOT implement custom JWT, refresh tokens, or password hashing.
- Do NOT expose service role key to client components.
- Do NOT trust frontend role checks alone; server helper must verify admin.
- Do NOT implement user CRUD yet.

### REUSE
- Reuse layout shell from TIP-001.
- Reuse `UserProfile` shape from Builder Handoff.
- Use Supabase Auth/RLS standard exactly.

### SKIP
- Skip password reset (Phase 2).
- Skip OAuth providers.
- Skip audit logs.

## QUALITY GATE: TIP Self-Review
- [x] TIP covers admin login, auth gate, logout, and `/auth/me`.
- [x] Supabase Auth/RLS and RBAC standards are referenced.
- [x] Covers REQ-AUTH-001 through REQ-AUTH-005.
- [x] Does not include unrelated CRUD or analytics work.

**Verdict**: PASSED — ready after TIP-002.
