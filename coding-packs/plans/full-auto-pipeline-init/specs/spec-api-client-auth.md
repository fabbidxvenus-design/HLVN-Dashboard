# SPEC: HLVN Dashboard API Client + Auth (TIP-002)

## AC-F2-01: API client supports mock mode
- Given: `NEXT_PUBLIC_USE_MOCK_API=true` in environment
- When: any API endpoint function is called
- Then: mock response is returned matching serverless API contract exactly
- And: response envelope is `{ success: true, data: T, meta?: ApiMeta }` or `{ success: false, error: string, code: ApiErrorCode }`

## AC-F2-02: API client supports real backend mode
- Given: `NEXT_PUBLIC_USE_MOCK_API=false` and `NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001`
- When: any API endpoint function is called
- Then: HTTP request is made to the real backend URL with bearer token attached

## AC-F2-03: Bearer token attached to authenticated requests
- Given: API client with stored access token
- When: API client makes any request to backend
- Then: request includes `Authorization: Bearer <token>` header

## AC-F2-04: Login page renders and validates email/password
- Given: user visits `/login`
- When: form is displayed
- Then: email input and password input are present
- And: submit button exists
- And: empty submission shows validation errors (email required, password required)
- And: invalid email format shows appropriate error

## AC-F2-05: Login succeeds with valid admin credentials in mock mode
- Given: `NEXT_PUBLIC_USE_MOCK_API=true` and user visits `/login`
- When: user enters email `admin@hlvn.vn` and password `admin123` and submits
- Then: login succeeds, access token and user profile are stored
- And: user is redirected to dashboard `/`
- And: Sonner toast shows success message

## AC-F2-06: Non-admin login blocked with Vietnamese message
- Given: `NEXT_PUBLIC_USE_MOCK_API=true` and user visits `/login`
- When: user enters email `user@hlvn.vn` and password `user123` (role: user, not admin) and submits
- Then: user is NOT redirected to dashboard
- And: error message shown: `Tài khoản không có quyền truy cập dashboard.`

## AC-F2-07: Dashboard gate redirects unauthenticated users
- Given: no stored session (fresh browser or cleared storage)
- When: user visits any dashboard route (`/`, `/users`, `/scans`, `/analytics`)
- Then: user is redirected to `/login`

## AC-F2-08: Dashboard gate validates session on mount
- Given: stored session exists in browser
- When: dashboard layout mounts
- Then: `/api/auth/me` is called to validate token
- And: if token is valid and user is admin, dashboard shell renders
- And: if token is invalid or missing, redirect to `/login`

## AC-F2-09: Logout clears session and redirects
- Given: user is authenticated and viewing dashboard
- When: user clicks logout button in sidebar
- Then: stored session is cleared
- And: user is redirected to `/login`
- And: accessing dashboard routes without session redirects to `/login`

## AC-F2-10: API client throws typed errors on failure
- Given: API client receives HTTP 401 response
- When: handling the response
- Then: `ApiError` is thrown with `code: 'AUTH_FAILED'` and Vietnamese message: `Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.`
- And: HTTP 403 → `code: 'FORBIDDEN'` with: `Tài khoản không có quyền truy cập dashboard.`
- And: HTTP 400 → `code: 'VALIDATION_ERROR'` with: `Thông tin đăng nhập không hợp lệ.`
- And: network error → generic Vietnamese message

## AC-F2-11: Mock data uses camelCase and correct envelope
- Given: mock mode is active
- When: `getUsers()` mock response is returned
- Then: all UserProfile fields are camelCase: `createdAt`, `updatedAt`, `lastLogin` (NOT `created_at`, `updated_at`, `last_login`)
- And: pagination meta includes `hasMore: boolean`
- And: error responses use `code: ApiErrorCode` (required, NOT optional `code?: string`)

## AC-F2-12: Auth store updates immutably
- Given: initial auth store state
- When: `setSession(session)` is called
- Then: new state is returned with updated `user`, `accessToken`, `isLoading: false`, `error: null`
- And: previous state is not mutated
- When: `clearSession()` is called
- Then: new state is returned with `user: null`, `accessToken: null`, `isLoading: false`, `error: null`
- And: previous state is not mutated
