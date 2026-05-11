# TIP-002: Backend API Client + Auth Flow

## HEADER
- TIP-ID: TIP-002
- Project: HLVN Dashboard
- Module: API Client + Authentication
- Priority: P0
- Depends on: TIP-001
- Estimated: M (8h)

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Backend project: `D:\scripts\HLVN\HLVN-serverless`
- Tech stack: Next.js 15 App Router, TypeScript 6+, Zustand, React Hook Form, Sonner
- Key files to read first: `coding-packs/02-TASK-GRAPH.md`, `coding-packs/design/design-brief.md`
- Patterns to follow: frontend-only API client; backend owns auth enforcement, Supabase, and OpenRouter

## APPLICABLE STANDARDS
- `standards/auth/rbac-admin-gate.md` — apply only to frontend route gate UX; backend remains source of truth

## TASK
Implement the dashboard API client, login page, token persistence, session loading, and admin-only route gate UX. The dashboard must call the external backend API and must not implement API routes, Supabase clients, database queries, or OpenRouter logic.

## SPECIFICATIONS

### Business Rules
1. Dashboard login is public at `/login`
2. Dashboard routes require an authenticated admin user
3. Backend API is the source of truth for authentication and role validation
4. Non-admin authenticated users must be redirected away from dashboard with Vietnamese error message
5. Access token must be attached to all authenticated backend requests
6. Logout clears local auth state and redirects to `/login`

### Environment Variables
Create `.env.example`:

```env
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001
NEXT_PUBLIC_USE_MOCK_API=false
```

Rules:
- `NEXT_PUBLIC_BACKEND_API_URL` is required when `NEXT_PUBLIC_USE_MOCK_API` is not `true`
- `NEXT_PUBLIC_USE_MOCK_API=true` enables contract-accurate mock responses for parallel development while backend endpoints are incomplete
- No secrets in dashboard env vars
- No Supabase/OpenRouter env vars in dashboard

### API Contracts
Dashboard calls backend endpoints:

```text
POST /api/auth/login
Request: { email: string, password: string }
Response: { success: true, data: { accessToken: string, refreshToken?: string, user: UserProfile } }
Errors: 400, 401, 403, 500
```

```text
GET /api/auth/me
Headers: Authorization: Bearer <accessToken>
Response: { success: true, data: { user: UserProfile } }
Errors: 401, 403, 500
```

```text
POST /api/auth/refresh
Request: { refreshToken: string }
Response: { success: true, data: { accessToken: string, refreshToken?: string } }
Errors: 401, 500
```

```text
POST /api/auth/logout
Headers: Authorization: Bearer <accessToken>
Response: { success: true }
Errors: 401, 500
```

If backend does not provide refresh endpoint yet, implement token storage in a way that can support refresh later without calling a missing endpoint.

### Types
Create:

`types/api.ts`:
```ts
export type ApiResponse<T> =
  | { success: true; data: T; meta?: ApiMeta }
  | { success: false; error: string; code: ApiErrorCode; meta?: ApiMeta };

export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  hasMore?: boolean;
}

export type ApiErrorCode =
  | 'AUTH_FAILED'
  | 'FORBIDDEN'
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'QUOTA_EXCEEDED'
  | 'PROVIDER_ERROR'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR';
```

`types/user.ts`:
```ts
export type UserRole = 'admin' | 'manager' | 'user';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt?: string;
  lastLogin: string | null;
}
```

`types/auth.ts`:
```ts
export interface AuthSession {
  accessToken: string;
  refreshToken?: string;
  user: UserProfile;
}
```

### Files to Create
```
lib/
├── api/
│   ├── client.ts             # fetch wrapper
│   ├── endpoints.ts          # endpoint functions
│   ├── errors.ts             # user-friendly error mapping
│   └── mock-data.ts          # mock responses for parallel development
├── auth/
│   ├── token-store.ts        # browser token persistence
│   └── auth-guard.ts         # admin check helpers
hooks/
└── useAuthSession.ts
stores/
└── auth-store.ts
app/(auth)/login/page.tsx
app/(dashboard)/layout.tsx    # update with auth gate
.env.example                  # add NEXT_PUBLIC_USE_MOCK_API
```

### API Client
`lib/api/client.ts` must:
1. Read base URL from `NEXT_PUBLIC_BACKEND_API_URL`
2. Join paths safely without double slashes
3. Add `Authorization: Bearer <token>` when token exists
4. Parse JSON API envelopes
5. Throw typed client errors with status/code/message
6. Handle network failures with Vietnamese user-friendly message
7. Not silently swallow failed responses
8. Support mock mode via `NEXT_PUBLIC_USE_MOCK_API=true` environment variable

### Mock Data Strategy (Parallel Development)
`lib/api/mock-data.ts` should:
1. Provide mock responses matching serverless API contracts exactly:
   - Response envelope: `{ success: true, data: T, meta?: ApiMeta }` or `{ success: false, error: string, code: ApiErrorCode, meta?: ApiMeta }`
   - camelCase fields: `userId`, `imageUrl`, `ocrStructured`, `createdAt`, `updatedAt`, `lastLogin`
   - Pagination meta: `{ page, limit, total, hasMore }`
   - Analytics params: `from`, `to` (not `dateFrom`, `dateTo`)
2. Mock auth responses:
   - `POST /api/auth/login` → `{ success: true, data: { accessToken, user: { id, email, role: 'admin', createdAt, lastLogin } } }`
   - `GET /api/auth/me` → `{ success: true, data: { user: UserProfile } }`
   - `POST /api/auth/logout` → `{ success: true }`
3. Mock users responses:
   - `GET /api/users` → `{ success: true, data: UserProfile[], meta: { page, limit, total, hasMore } }`
   - `POST /api/users` → `{ success: true, data: { user: UserProfile } }`
   - `PATCH /api/users/:id/role` → `{ success: true, data: { user: UserProfile } }`
   - `DELETE /api/users/:id` → `{ success: true, data: { id: string } }`
4. Mock scans responses:
   - `GET /api/scans` → `{ success: true, data: ScanRecord[], meta: { page, limit, total, hasMore } }`
   - `GET /api/scans/:id` → `{ success: true, data: { scan: ScanRecord, user: UserProfile } }`
   - `DELETE /api/scans/:id` → `{ success: true, data: { id: string } }`
5. Mock analytics responses:
   - `GET /api/analytics/summary?from=&to=` → `{ success: true, data: { totalScans, activeUsers, totalCost, successRate } }`
   - `GET /api/analytics/trends?range=7d&from=&to=` → `{ success: true, data: [{ date, scans, cost }] }`
   - `GET /api/analytics/top-products?from=&to=&limit=10` → `{ success: true, data: [{ name, count }] }`
   - `GET /api/analytics/top-users?from=&to=&limit=10` → `{ success: true, data: [{ user, scanCount }] }`
   - `GET /api/analytics/api-usage?from=&to=` → `{ success: true, data: [{ apiKeyIndex, inputTokens, outputTokens, cost }] }`
6. Mock export response:
   - `POST /api/export/excel` → simulate download trigger or return `{ success: true, data: { downloadUrl: string } }`
7. Do not create `app/api/*` routes; mock logic lives in frontend client only
8. Do not calculate analytics from raw scans; use pre-aggregated mock responses
9. When `NEXT_PUBLIC_USE_MOCK_API=false` or unset, client calls real backend URL

### Token Store
`lib/auth/token-store.ts` must:
1. Store tokens in browser storage only after successful login
2. Clear tokens on logout or 401
3. Never store passwords
4. Be isolated behind functions:
   - `getStoredSession()`
   - `setStoredSession(session)`
   - `clearStoredSession()`

### Auth Store
Zustand state:
```ts
interface AuthStoreState {
  user: UserProfile | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}
```

### Login Page
Requirements:
1. Email/password form with React Hook Form
2. Client validation:
   - Email required and valid email format
   - Password required
3. Submit calls `POST /api/auth/login`
4. If login success and `user.role === 'admin'`, persist session and redirect `/`
5. If role is not admin, clear session and show: `Tài khoản không có quyền truy cập dashboard.`
6. Show loading spinner on submit button
7. Show Sonner toast for API/network errors
8. Use design brief tokens and shadcn/ui form components

### Dashboard Gate
`app/(dashboard)/layout.tsx` must:
1. Load stored session on client
2. Call `GET /api/auth/me` to validate current token
3. Redirect to `/login` if no token or backend returns 401/403
4. Render dashboard shell only after validation succeeds
5. Show skeleton/loading state while validating

### Validation
1. Do not trust stored role without confirming `/api/auth/me`
2. Validate backend response shape at client boundary before using it
3. Handle malformed API response as an error

### Error Handling
Map common failures:
- 400: `Thông tin đăng nhập không hợp lệ.`
- 401: `Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.`
- 403: `Tài khoản không có quyền truy cập dashboard.`
- Network: `Không thể kết nối đến máy chủ. Vui lòng thử lại.`
- Unknown: `Đã xảy ra lỗi. Vui lòng thử lại.`

## ACCEPTANCE CRITERIA
- Given valid admin credentials, When login succeeds, Then user is redirected to dashboard and token is stored
- Given valid non-admin credentials, When login succeeds, Then user is not allowed into dashboard and sees Vietnamese access-denied message
- Given no token, When visiting `/`, Then user is redirected to `/login`
- Given expired token, When backend returns 401 from `/api/auth/me`, Then token is cleared and user is redirected to `/login`
- Given backend unavailable, When login is submitted, Then user sees friendly Vietnamese network error
- Given dashboard route loads, When `/api/auth/me` confirms admin, Then dashboard shell renders

## CONSTRAINTS
- DO NOT: Create `app/api/*` routes
- DO NOT: Import Supabase packages
- DO NOT: Store passwords or secrets
- DO NOT: Trust frontend role checks as security boundary; backend remains authoritative
- DO NOT: Calculate backend-owned analytics from raw scans in mock data; use pre-aggregated mock responses
- REUSE: Dashboard shell from TIP-001
- SKIP: Users/scans/analytics data fetching beyond auth endpoints
- MOCK: Use contract-accurate mock data when `NEXT_PUBLIC_USE_MOCK_API=true` for parallel development; serverless API contracts remain source of truth

## VERIFICATION CHECKLIST
- [ ] Login page renders and validates inputs
- [ ] Auth store updates immutably
- [ ] API client attaches bearer token
- [ ] Missing backend URL fails clearly
- [ ] Dashboard gate redirects unauthenticated users
- [ ] Non-admin user is blocked in frontend UX
- [ ] `pnpm tsc --noEmit` passes
- [ ] Auth unit/component tests cover success and failure states
