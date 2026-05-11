# TIP-004: API Foundation

## HEADER
- **TIP-ID**: TIP-004
- **Project**: HLVN Dashboard
- **Module**: API Foundation
- **Priority**: P0
- **Depends on**: TIP-003
- **Estimated**: S (4 hours)

## CONTEXT
- **Working dir**: `D:\scripts\HLVN\HLVN-dashboard`
- **Tech stack**: Next.js 15 API Routes, TypeScript, Supabase server/admin clients
- **Key files to read first**:
  - `coding-packs/BUILDER-HANDOFF.md` API Patterns and API Contracts
  - `coding-packs/01-REQUIREMENTS-MATRIX.md`
- **Patterns to follow**: All API routes return a consistent response envelope and use shared validation/error helpers.

## APPLICABLE STANDARDS
- [`auth/rbac-admin-gate`](../standards/auth/rbac-admin-gate.md) — backend authorization is mandatory.
- [`auth/supabase-auth-rls`](../standards/auth/supabase-auth-rls.md) — verify Supabase session and user role.

## TASK
Create shared API utilities used by all later API routes: response envelope helpers, pagination parsing, validation helpers, error mapping, and `requireAdmin` integration. Refactor `/api/v1/auth/me` from TIP-003 to use these utilities if needed.

## SPECIFICATIONS

### Business Rules
1. All JSON APIs must use the envelope:
   ```ts
   type ApiResponse<T> =
     | { success: true; data: T; meta?: ApiMeta }
     | { success: false; error: string; code?: string };
   ```
2. Use status codes consistently: 400 validation, 401 unauthenticated, 403 unauthorized, 404 not found, 409 conflict, 500 unexpected.
3. Do not leak Supabase/OpenRouter raw error objects.
4. Pagination defaults must match requirements: users 50/page, scans 20/page.

### Files to Create/Modify
- `types/api.ts`
- `lib/api/response.ts`
- `lib/api/errors.ts`
- `lib/api/validation.ts`
- `lib/api/pagination.ts`
- `lib/auth/require-admin.ts` (ensure it returns typed result)
- `tests/lib/api/response.test.ts` (optional now, full tests in TIP-010)

### API Helpers
Implement:
- `ok<T>(data: T, init?: { status?: number; meta?: ApiMeta })`
- `fail(error: string, init: { status: number; code?: string })`
- `validationError(message: string)`
- `unauthorized(message?: string)`
- `forbidden(message?: string)`
- `notFound(message?: string)`
- `conflict(message?: string)`
- `serverError(message?: string)`
- `parsePagination(searchParams, defaults)` returning `{ page, limit, offset }`
- `parseEnum(value, allowedValues)`
- `parseDateRange(searchParams)`

### `requireAdmin`
Return a discriminated union:
```ts
type RequireAdminResult =
  | { ok: true; user: UserProfile; authUserId: string }
  | { ok: false; response: Response };
```

### Validation
- Page must be integer >= 1.
- Limit must be integer between 1 and 100.
- Date strings must parse as valid dates when provided.
- Enum values must be from allowed set.

### Error Handling
- Helper errors should return Vietnamese-friendly public messages where UI-facing.
- Server logs can include detailed context but no secrets.
- `serverError()` client message should be generic.

## ACCEPTANCE CRITERIA
- Given `ok({ id: 1 })` When response is parsed Then JSON equals `{ success: true, data: { id: 1 } }`.
- Given `fail('Forbidden', { status: 403 })` When response is sent Then HTTP status is 403 and JSON has `success: false`.
- Given `page=2&limit=50` When `parsePagination` runs Then offset is 50.
- Given invalid `limit=999` When parsing pagination Then helper returns validation failure or clamps per implementation decision documented.
- Given no auth token When `requireAdmin` runs Then it returns 401 response.
- Given non-admin user When `requireAdmin` runs Then it returns 403 response.

## CONSTRAINTS
### DO NOT
- Do NOT implement users/scans/analytics business logic yet.
- Do NOT add a generic framework abstraction beyond simple helpers.
- Do NOT expose stack traces to clients.

### REUSE
- Reuse Supabase clients from TIP-003.
- Reuse `UserProfile` and `ApiResponse` types.

### SKIP
- Skip route-specific tests until TIP-010 unless they are quick unit tests for helpers.

## QUALITY GATE: TIP Self-Review
- [x] TIP defines reusable API envelope and auth utility behavior.
- [x] Standards for RBAC and Supabase Auth are included.
- [x] Supports all downstream API TIPs.
- [x] Acceptance criteria are concrete.

**Verdict**: PASSED — ready after TIP-003.
