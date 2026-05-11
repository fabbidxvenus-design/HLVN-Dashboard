# TIP-010: Tests + Verification

## HEADER
- **TIP-ID**: TIP-010
- **Project**: HLVN Dashboard
- **Module**: Testing & Quality Assurance
- **Priority**: P0
- **Depends on**: TIP-009
- **Estimated**: M (10 hours)

## CONTEXT
- **Working dir**: `D:\scripts\HLVN\HLVN-dashboard`
- **Tech stack**: Vitest, Testing Library, MSW (Mock Service Worker), Supabase test helpers
- **Key files to read first**:
  - `coding-packs/01-REQUIREMENTS-MATRIX.md` REQ-TEST-*
  - `coding-packs/BUILDER-HANDOFF.md` — quality requirements
- **Patterns to follow**: Unit tests for utilities/helpers, API route tests with mocked Supabase, component tests with Testing Library, 80%+ coverage target.

## APPLICABLE STANDARDS
None directly; this TIP enforces testing requirements from RRI.

## TASK
Write unit tests for API helpers, API route tests for critical endpoints, component tests for key UI components, and verify 80%+ test coverage. Create manual QA checklist for final verification.

## SPECIFICATIONS

### Business Rules
1. Test coverage must be >= 80% overall.
2. All API routes must have at least happy path and error path tests.
3. All critical UI components (login, users table, scans table) must have component tests.
4. All utility functions (response helpers, validation, retry, fallback) must have unit tests.
5. Tests must not require real Supabase project; use mocks or test helpers.
6. Tests must run in CI/CD pipeline (GitHub Actions or equivalent).

### Files to Create/Modify
- `vitest.config.ts`
- `tests/setup.ts`
- `tests/lib/api/response.test.ts`
- `tests/lib/api/validation.test.ts`
- `tests/lib/api/pagination.test.ts`
- `tests/lib/ocr/retry.test.ts`
- `tests/lib/ocr/key-fallback.test.ts`
- `tests/lib/ocr/json-extract.test.ts`
- `tests/api/v1/auth/me.test.ts`
- `tests/api/v1/users/route.test.ts`
- `tests/api/v1/scans/route.test.ts`
- `tests/api/v1/analytics/kpis.test.ts`
- `tests/components/users/UsersTable.test.tsx`
- `tests/components/scans/ScansTable.test.tsx`
- `tests/components/dashboard/KpiCard.test.tsx`
- `tests/components/auth/LoginPage.test.tsx`
- `docs/QA-CHECKLIST.md`
- `.github/workflows/test.yml` (optional CI config)

### Test Categories

**Unit Tests (lib/)**
- `response.test.ts`: test `ok()`, `fail()`, envelope structure.
- `validation.test.ts`: test email validation, enum parsing, date parsing.
- `pagination.test.ts`: test page/limit/offset calculation.
- `retry.test.ts`: test retry logic, backoff delays, retryable error detection.
- `key-fallback.test.ts`: test fallback sequence, key exhaustion.
- `json-extract.test.ts`: test JSON parsing from markdown, direct JSON, malformed input.

**API Route Tests (app/api/)**
- Mock Supabase client responses.
- Test happy path: valid input → 200 response with correct envelope.
- Test auth errors: missing token → 401, non-admin → 403.
- Test validation errors: invalid input → 400.
- Test not found: missing resource → 404.
- Test conflict: last admin deletion → 409.
- Use MSW or manual mocks for Supabase calls.

**Component Tests (components/)**
- `UsersTable.test.tsx`: render with data, render empty state, render loading state, click actions.
- `ScansTable.test.tsx`: render with data, render empty state, filter interaction.
- `KpiCard.test.tsx`: render with value, render loading skeleton.
- `LoginPage.test.tsx`: form validation, submit success, submit error.
- Use Testing Library `render`, `screen`, `userEvent`.
- Mock API calls with MSW or `vi.mock()`.

### Coverage Target
- Overall: >= 80%.
- Critical paths (auth, user CRUD, scan query, OCR proxy): >= 90%.
- UI components: >= 70% (focus on logic, not trivial render).

### Manual QA Checklist
Create `docs/QA-CHECKLIST.md`:
- [ ] Admin login succeeds with valid credentials.
- [ ] Non-admin login shows error and signs out.
- [ ] Dashboard overview loads KPIs and chart.
- [ ] Users page: create/edit/delete user works.
- [ ] Users page: cannot delete last admin.
- [ ] Scans page: search/filter/pagination works.
- [ ] Scans page: scan detail dialog shows full data.
- [ ] Scans page: Excel export downloads file.
- [ ] Analytics page: date filter updates all components.
- [ ] OCR proxy: upload image returns structured data.
- [ ] Logout clears session and redirects to login.
- [ ] All pages show loading states during fetch.
- [ ] All pages show empty states when no data.
- [ ] All pages show error states on API failure.
- [ ] Keyboard navigation works on all pages.
- [ ] Focus rings visible on all interactive elements.
- [ ] All buttons meet 44px minimum height.
- [ ] Color contrast meets WCAG AA.

### Validation
- Run `npm run test` — all tests pass.
- Run `npm run test:coverage` — coverage >= 80%.
- Run manual QA checklist — all items pass.

### Error Handling
- Tests must not fail due to missing env vars; use test defaults or skip if env-dependent.
- Flaky tests must be fixed or removed.

## ACCEPTANCE CRITERIA
- Given test suite When `npm run test` runs Then all tests pass with 0 failures.
- Given coverage report When generated Then overall coverage is >= 80%.
- Given API route test When mocking Supabase admin client Then test does not require real Supabase project.
- Given component test When rendering UsersTable Then table renders with mocked data.
- Given manual QA checklist When executed Then all critical flows pass.
- Given CI pipeline When configured Then tests run on every commit.

## CONSTRAINTS
### DO NOT
- Do NOT write E2E tests with Playwright (Phase 2).
- DO NOT test third-party library internals (Supabase, Recharts).
- DO NOT aim for 100% coverage; focus on critical paths.
- DO NOT skip tests for complex logic (retry, fallback, validation).

### REUSE
- Reuse Vitest from existing Next.js setup.
- Reuse Testing Library patterns.
- Reuse mock data shapes from types.

### SKIP
- Skip visual regression tests.
- Skip performance benchmarks.
- Skip load testing.

## QUALITY GATE: TIP Self-Review
- [x] TIP covers unit, API, and component tests.
- [x] Coverage target and manual QA checklist are specified.
- [x] Covers REQ-TEST-001, REQ-TEST-002, REQ-TEST-003, REQ-TEST-005.
- [x] Acceptance criteria are concrete.

**Verdict**: PASSED — ready after TIP-009; completes MVP implementation.

---

**Created**: 2026-05-08  
**Estimated effort**: 10 hours  
**Next step**: Manual QA, staging deploy, production readiness review.
