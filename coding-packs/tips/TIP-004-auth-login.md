# TIP-004: Supabase Auth + Login Page

## HEADER
- TIP-ID: TIP-004
- Project: HLVN Dashboard
- Module: auth
- Priority: P0
- Depends on: TIP-003
- Estimated: M (3h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + TypeScript strict + @supabase/supabase-js + Zustand
- Key files to read first: coding-packs/designs/stitch_hlvn_dashboard_redesign_v5/stitch_hlvn_dashboard_redesign_v5/hlvn_admin_login_1/code.html
- Patterns to follow: Supabase client-side auth with Zustand store

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Implement Supabase client initialization, auth store (Zustand), login page UI matching Stitch design, and login/logout functionality calling HLVN-serverless API.

## SPECIFICATIONS

### Files to Create

1. `src/lib/supabase.ts` — Supabase client initialization:
   - Read VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from env
   - Export configured supabase client

2. `src/lib/api.ts` — API client wrapper:
   - Base fetch wrapper with auth header injection
   - `apiGet(path)`, `apiPost(path, body)`, `apiPatch(path, body)`, `apiDelete(path)`
   - Auto-inject `Authorization: Bearer <token>` from auth store
   - Handle response envelope: `{ success, data, error, code, meta }`

3. `src/types/api.ts` — API response types:
   ```typescript
   interface ApiResponse<T> {
     success: boolean;
     data?: T;
     error?: string;
     code?: string;
     meta?: { total: number; page: number; limit: number };
   }
   ```

4. `src/types/user.ts` — User types:
   ```typescript
   type UserRole = 'admin' | 'manager' | 'user';
   interface UserProfile {
     id: string;
     email: string;
     role: UserRole;
     created_at: string;
     updated_at: string;
     last_login: string | null;
   }
   ```

5. `src/stores/auth-store.ts` — Zustand auth store:
   - State: user, session, isLoading, isAuthenticated
   - Actions: login(email, password), logout(), refreshSession(), loadSession()
   - Login calls `POST /api/auth/login` with `{ email, password, audience: 'dashboard' }`
   - Logout calls `POST /api/auth/logout`
   - Session persistence via Supabase client (localStorage)

6. `src/hooks/use-auth.ts` — Auth hook:
   - Wraps auth store for component usage
   - Provides: user, isAuthenticated, isLoading, login, logout

7. `src/pages/LoginPage.tsx` — Login page UI:
   - Centered card on surface background
   - HLVN logo/brand at top
   - Email input field
   - Password input field
   - "Đăng nhập" primary button
   - Error message display
   - Loading state on submit

### Design Reference
- Primary screen: `hlvn_admin_login_1/screen.png`
- Card: surface-container-lowest (white), rounded-lg, subtle shadow
- Inputs: filled style, surface-container background
- Button: primary filled, full width
- Background: surface (#f5f7f9)

### Business Rules
1. Login MUST use `POST /api/auth/login` with audience: 'dashboard'
2. Only admin/manager roles can access dashboard (backend enforces)
3. Session tokens stored via Supabase client (localStorage)
4. On successful login, redirect to `/` (dashboard)
5. On failed login, show error message from API response

### Validation
- Email field required, must be valid email format
- Password field required, minimum 1 character
- Form submission disabled while loading

## ACCEPTANCE CRITERIA
- Given login page When entering valid credentials and submitting Then redirects to dashboard
- Given login page When entering invalid credentials Then shows error message
- Given login page When form is submitting Then button shows loading state
- Given authenticated user When refreshing page Then session persists (stays logged in)
- Given auth store When calling logout() Then clears session and redirects to /login

## CONSTRAINTS
- DO NOT: Implement registration (admin creates users via API)
- DO NOT: Implement password reset (out of scope)
- DO NOT: Use Supabase Auth directly for login — use HLVN-serverless API endpoint
- REUSE: Design tokens from TIP-002, layout from TIP-003
- SKIP: Social login, MFA, remember me checkbox
