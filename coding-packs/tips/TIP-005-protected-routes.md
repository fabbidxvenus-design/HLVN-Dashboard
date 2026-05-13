# TIP-005: Protected Routes + Role Guard

## HEADER
- TIP-ID: TIP-005
- Project: HLVN Dashboard
- Module: auth
- Priority: P0
- Depends on: TIP-004
- Estimated: S (2h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + React Router v7 + Zustand
- Key files to read first: src/stores/auth-store.ts, src/App.tsx
- Patterns to follow: React Router protected route wrapper pattern

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Implement protected route wrapper that redirects unauthenticated users to /login, role-based access guard (Admin vs User), and logout functionality in the sidebar.

## SPECIFICATIONS

### Files to Create/Modify

1. `src/components/auth/ProtectedRoute.tsx` — Route guard component:
   - Check isAuthenticated from auth store
   - If not authenticated → redirect to /login
   - If loading → show loading spinner
   - If authenticated → render children

2. `src/components/auth/RoleGuard.tsx` — Role-based guard:
   - Props: `allowedRoles: UserRole[]`
   - If user role not in allowedRoles → show "Access Denied" message
   - Used for admin-only pages (Users, some Analytics)

3. `src/App.tsx` — Update routes with protection:
   - Wrap dashboard routes with ProtectedRoute
   - Wrap admin-only routes with RoleGuard

4. `src/components/layout/AppSidebar.tsx` — Add logout:
   - Add logout button at bottom of sidebar
   - On click: call logout() from auth store
   - Show user role badge next to user name

5. `src/components/layout/DashboardHeader.tsx` — Update with real user:
   - Display actual user name/email from auth store
   - Show role badge

### Business Rules
1. All dashboard routes MUST be protected (require authentication)
2. Users page MUST require admin role
3. Unauthenticated users MUST be redirected to /login
4. After logout, user MUST be redirected to /login
5. Session check MUST happen on app load (auto-login if session valid)

### Validation
- ProtectedRoute checks auth state before rendering
- RoleGuard checks user.role against allowedRoles
- Logout clears all auth state

## ACCEPTANCE CRITERIA
- Given unauthenticated user When navigating to `/` Then redirected to `/login`
- Given authenticated user (role: user) When navigating to `/users` Then shows "Access Denied"
- Given authenticated user (role: admin) When navigating to `/users` Then renders Users page
- Given authenticated user When clicking logout Then redirected to `/login` and session cleared
- Given valid session in localStorage When refreshing app Then auto-authenticates without login

## CONSTRAINTS
- DO NOT: Implement complex permission matrix (just admin vs user for now)
- DO NOT: Add loading skeletons yet (that's TIP-020)
- REUSE: auth-store from TIP-004, layout from TIP-003
- SKIP: Token refresh logic (Supabase handles automatically)
