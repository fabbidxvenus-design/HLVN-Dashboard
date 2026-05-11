# TIP-005: Analytics Dashboard UI

## HEADER
- TIP-ID: TIP-005
- Project: HLVN Dashboard
- Module: Analytics
- Priority: P0
- Depends on: TIP-002
- Estimated: L (10h)

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Backend project: `D:\scripts\HLVN\HLVN-serverless`
- Tech stack: Next.js 15, TypeScript, Recharts, shadcn/ui, React Day Picker
- Key files to read first: `coding-packs/design/design-brief.md`, `coding-packs/02-TASK-GRAPH.md`
- Patterns to follow: frontend-only API calls through TIP-002 client; dashboard shell from TIP-001

## APPLICABLE STANDARDS
- `standards/auth/rbac-admin-gate.md` — admin-only UX; backend enforces authorization

## TASK
Build dashboard overview and analytics page UI connected to external backend analytics endpoints. Implement KPI cards, scan trend chart, top-products table, top-users table, and API usage table using Recharts and shadcn/ui.

## SPECIFICATIONS

### Business Rules
1. Admin can view high-level KPI overview on dashboard home
2. Admin can view analytics over selected date ranges
3. Backend owns aggregation and analytics calculations
4. Frontend only formats and visualizes returned data
5. Charts must handle empty datasets gracefully
6. Analytics page should default to last 30 days where practical

### API Contracts

```text
GET /api/analytics/summary?from=&to=
Response: { success: true, data: { totalScans: number, activeUsers: number, totalCost: number, successRate: number, totalTokens?: number } }
```

```text
GET /api/analytics/trends?range=7d|30d&from=&to=
Response: { success: true, data: Array<{ date: string, scans: number, cost?: number }> }
```

```text
GET /api/analytics/top-products?from=&to=&limit=10
Response: { success: true, data: Array<{ name: string, count: number }> }
```

```text
GET /api/analytics/top-users?from=&to=&limit=10
Response: { success: true, data: Array<{ user: UserProfile, scanCount: number }> }
```

```text
GET /api/analytics/api-usage?from=&to=
Response: { success: true, data: Array<{ apiKeyIndex: number, inputTokens: number, outputTokens: number, cost: number }> }
```

### Types
Create `types/analytics.ts`:
```ts
export interface AnalyticsKpis {
  totalScans: number;
  activeUsers: number;
  totalCost: number;
  successRate: number;
  totalTokens?: number;
}

export interface ScanTrendPoint {
  date: string;
  scans: number;
  cost?: number;
}

export interface TopProduct {
  name: string;
  count: number;
}

export interface TopUser {
  user: UserProfile;
  scanCount: number;
}

export interface ApiUsageRow {
  apiKeyIndex: number;
  inputTokens: number;
  outputTokens: number;
  cost: number;
}
```

### Files to Create
```
app/(dashboard)/page.tsx
app/(dashboard)/analytics/page.tsx
components/analytics/
├── AnalyticsHeader.tsx
├── KpiGrid.tsx
├── KpiCard.tsx
├── ScanVolumeChart.tsx
├── TopProductsTable.tsx
├── TopUsersTable.tsx
├── ApiUsageTable.tsx
└── AnalyticsDateRangePicker.tsx
hooks/
└── useAnalyticsQuery.ts
lib/api/analytics.ts
types/analytics.ts
```

### Dashboard Overview Page
Layout:
1. KPI grid (4 cards): Total Scans, Active Users, API Cost Today/Range, Success Rate
2. Scan Volume chart for last 7 days
3. Two-column section:
   - Recent Activity placeholder or top products
   - Top Products table

Data:
- Fetch KPIs, trend, top products in parallel
- Use last 7 days by default

### Analytics Page
Layout:
1. Header with title `Analytics` and date range picker
2. KPI grid:
   - Total Scans
   - Active Users
   - Total Cost
   - Total Tokens or Success Rate
3. Scan Volume Trend chart
4. Two-column section:
   - Top Users table
   - API Usage by Key table
5. Top Products table full-width or card

### KpiCard
Props:
```ts
interface KpiCardProps {
  label: string;
  value: string | number;
  tone?: 'default' | 'success' | 'warning' | 'error';
  icon?: React.ComponentType<{ className?: string }>;
  helperText?: string;
}
```

Requirements:
- Height 120px
- Number 30px bold
- Label 14px muted
- Use semantic tone for cost/success where useful
- Include skeleton state variant

### ScanVolumeChart
Requirements:
1. Use Recharts responsive container
2. Show line or bar chart matching design brief
3. Use chart colors from design tokens
4. Format dates compactly
5. Show tooltip with date and scans
6. Render empty state when data is empty
7. Dynamic import Recharts if needed to preserve bundle budget

### Tables
**TopProductsTable** columns:
- Product name
- Scan count
- Percentage or rank if easy

**TopUsersTable** columns:
- Email
- Role badge optional
- Scan count

**ApiUsageTable** columns:
- API Key index
- Input tokens
- Output tokens
- Total tokens
- Cost

### Data Fetching
`useAnalyticsQuery.ts` should:
1. Use API client from TIP-002
2. Fetch independent endpoints in parallel
3. Expose loading/error/data/refetch
4. Avoid duplicating server data in Zustand
5. Support date range params
6. Use `from` and `to` params for custom ranges
7. Work unchanged in mock mode and real backend mode

### Mock Data Requirements
- When `NEXT_PUBLIC_USE_MOCK_API=true`, dashboard overview and analytics page must render from mock API responses without changing component props.
- Mock analytics responses must be pre-aggregated and shaped like backend responses; do not calculate analytics from mock raw scans inside UI components.
- Mock trends should include realistic empty and non-empty datasets for chart state testing.
- Mock top users must embed `UserProfile` with camelCase fields.
- Mock API usage rows must include `apiKeyIndex`, `inputTokens`, `outputTokens`, and `cost`.
- Mock requests must accept `from`/`to` params, not `dateFrom`/`dateTo`.

### Formatting Helpers
Create simple helpers if needed:
- `formatNumber(value)`
- `formatCurrency(value)`
- `formatPercent(value)`
- `formatCompactDate(date)`

Keep helpers focused and tested.

### Loading/Empty/Error States
Implement basic states now:
- KPI skeletons
- Chart skeleton
- Empty chart/table states
- Error card with retry button

TIP-006 will polish these further.

## ACCEPTANCE CRITERIA
- Given admin opens `/`, When dashboard loads, Then KPIs, trend chart, and top products fetch from backend
- Given admin opens `/analytics`, When page loads, Then analytics sections fetch from backend and render
- Given date range changes, When applied, Then analytics requests include new date params
- Given trend data exists, When chart renders, Then tooltip and axes are readable
- Given empty analytics data, When page renders, Then empty states appear instead of broken charts
- Given backend error, When analytics fetch fails, Then user sees retryable error state

## CONSTRAINTS
- DO NOT: Calculate backend-owned analytics from raw scans in frontend
- DO NOT: Create dashboard API routes
- DO NOT: Import Supabase
- DO NOT: Store analytics data in Zustand
- REUSE: API client and dashboard shell from prior TIPs
- SKIP: Advanced filters beyond date range

## VERIFICATION CHECKLIST
- [ ] Dashboard overview renders with KPI cards and chart
- [ ] Analytics page renders all sections
- [ ] Date range updates URL or component state predictably
- [ ] Recharts components are responsive and do not overflow
- [ ] Empty/error states are visible and friendly
- [ ] Numbers/currency/percentages are formatted consistently
- [ ] `pnpm tsc --noEmit` passes
- [ ] Component tests cover KPI, chart empty state, and table rendering
