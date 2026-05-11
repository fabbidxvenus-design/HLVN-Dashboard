# TIP-007: Analytics API + UI

## HEADER
- **TIP-ID**: TIP-007
- **Project**: HLVN Dashboard
- **Module**: Analytics Dashboard
- **Priority**: P0
- **Depends on**: TIP-005, TIP-006
- **Estimated**: L (12 hours)

## CONTEXT
- **Working dir**: `D:\scripts\HLVN\HLVN-dashboard`
- **Tech stack**: Next.js 15 API Routes, Supabase PostgreSQL, Recharts, shadcn/ui Card/Table
- **Key files to read first**:
  - `coding-packs/BUILDER-HANDOFF.md` Analytics API contracts and component tree
  - `coding-packs/01-REQUIREMENTS-MATRIX.md` REQ-ANLY-*
- **Patterns to follow**: Aggregation APIs with date filters; dashboard overview uses summarized KPIs; analytics page shows deeper tables/charts.

## APPLICABLE STANDARDS
- [`auth/rbac-admin-gate`](../standards/auth/rbac-admin-gate.md) — admin-only analytics endpoints.
- [`auth/supabase-auth-rls`](../standards/auth/supabase-auth-rls.md) — secure data access through Supabase.

## TASK
Implement analytics API endpoints and UI for dashboard overview and analytics page: KPI cards, scan volume trend chart, top products table, top users table, and API usage table.

## SPECIFICATIONS

### Business Rules
1. Only admins can access analytics API and UI.
2. Date filter supports last 7 days, last 30 days, and custom range.
3. KPI cards: Total Scans, Active Users, API Cost, Success Rate.
4. Success Rate for MVP: percentage of scans with valid OCR structured data; if no scans, show 0% or N/A consistently.
5. Top products derive from `ocr_structured.title` first, fallback to first main field value, fallback "Không xác định".
6. Top users aggregate by user email and scan count.
7. API usage aggregates token input/output and cost by `api_key_index`.
8. Use `analytics_cache` for daily cache if present; live queries are acceptable for cache misses.

### Files to Create/Modify
- `app/api/v1/analytics/kpis/route.ts`
- `app/api/v1/analytics/trend/route.ts`
- `app/api/v1/analytics/top-products/route.ts`
- `app/api/v1/analytics/top-users/route.ts`
- `app/api/v1/analytics/api-usage/route.ts`
- `app/(dashboard)/page.tsx`
- `app/(dashboard)/analytics/page.tsx`
- `components/dashboard/KpiCard.tsx`
- `components/analytics/ScanVolumeChart.tsx`
- `components/analytics/TopProductsTable.tsx`
- `components/analytics/TopUsersTable.tsx`
- `components/analytics/ApiUsageTable.tsx`
- `components/analytics/AnalyticsDateFilter.tsx`
- `hooks/useAnalyticsQuery.ts`
- `types/analytics.ts`

### API Routes

**GET /api/v1/analytics/kpis**
- Query: `dateFrom`, `dateTo`
- Response: `{ totalScans, activeUsers, apiCost, successRate }`
- Auth: admin

**GET /api/v1/analytics/trend**
- Query: `range=7d|30d`, `dateFrom`, `dateTo`
- Response: `Array<{ date: string, scans: number }>`
- Auth: admin

**GET /api/v1/analytics/top-products**
- Query: `dateFrom`, `dateTo`, `limit=10`
- Response: `Array<{ name: string, count: number }>`
- Auth: admin

**GET /api/v1/analytics/top-users**
- Query: `dateFrom`, `dateTo`, `limit=10`
- Response: `Array<{ user: UserProfile, scanCount: number }>`
- Auth: admin

**GET /api/v1/analytics/api-usage**
- Query: `dateFrom`, `dateTo`
- Response: `Array<{ apiKeyIndex: number, inputTokens: number, outputTokens: number, cost: number }>`
- Auth: admin

### UI Requirements

**Dashboard Overview (`/`)**
- 4 KPI cards.
- Scan volume chart (last 7 days default).
- Top products table.
- Recent activity panel may use recent scans from TIP-006 or be omitted if out of scope; document choice.

**Analytics Page (`/analytics`)**
- Date range filter at top.
- KPI cards for selected date range.
- Scan volume trend chart.
- Top users table.
- API usage table.
- Top products table.

### Chart Requirements
- Use Recharts BarChart for scan volume.
- X-axis: date (`dd/MM`).
- Y-axis: scan count.
- Tooltip in Vietnamese.
- Empty chart state when no data.

### Validation
- `dateFrom <= dateTo`.
- `range` only `7d` or `30d`.
- `limit` between 1 and 50.

### Error Handling
- API returns response envelope.
- UI shows retry button when analytics query fails.
- KPI cards show skeleton while loading.
- Chart/table show empty state for no data.

## ACCEPTANCE CRITERIA
- Given admin session When navigating to `/` Then 4 KPI cards and scan volume chart render.
- Given scans exist When KPI endpoint is called Then totalScans equals count of filtered scans.
- Given scans by multiple users When top-users endpoint is called Then users are sorted by scanCount descending.
- Given OCR titles exist When top-products endpoint is called Then products are sorted by count descending.
- Given token usage exists When api-usage endpoint is called Then cost and token totals are grouped by apiKeyIndex.
- Given custom date range When applied Then all analytics components update to that range.
- Given no analytics data When page loads Then empty states display instead of broken charts.

## CONSTRAINTS
### DO NOT
- Do NOT implement advanced error rate analytics (Phase 2).
- Do NOT implement model tier breakdown (Phase 2).
- Do NOT add real-time updates.
- Do NOT duplicate large analytics datasets into Zustand.

### REUSE
- Reuse API helpers from TIP-004.
- Reuse KpiCard design from TIP-001/Builder Handoff.
- Reuse scan/user types from TIP-005/TIP-006.

### SKIP
- Skip scheduled background cache refresh; live aggregation with optional cache read is acceptable for MVP.
- Skip CSV export for analytics.

## QUALITY GATE: TIP Self-Review
- [x] TIP covers dashboard overview and analytics page.
- [x] All analytics API endpoints from Blueprint are specified.
- [x] Covers REQ-ANLY-001 through REQ-ANLY-007.
- [x] Acceptance criteria are testable.

**Verdict**: PASSED — ready after TIP-005 and TIP-006.
