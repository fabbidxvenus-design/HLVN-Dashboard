# TIP-008: Dashboard Charts + Top Tables (Dashboard Overview pt.2)

## HEADER
- TIP-ID: TIP-008
- Project: HLVN Dashboard
- Module: dashboard
- Priority: P0
- Depends on: TIP-007
- Estimated: M (3h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + TypeScript strict + Recharts
- Key files to read first: coding-packs/designs/stitch_hlvn_dashboard_redesign_v5/stitch_hlvn_dashboard_redesign_v5/hlvn_dashboard_overview/code.html
- Patterns to follow: Recharts with design tokens, Table from TIP-006

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Build the scan volume line chart (7d/30d/90d toggle) and top products/users tables for the dashboard overview page. Data from `/api/analytics/trends`, `/api/analytics/top-products`, `/api/analytics/top-users`.

## SPECIFICATIONS

### Files to Create

1. `src/components/dashboard/ScanVolumeChart.tsx` — Line chart:
   - Recharts LineChart with responsive container
   - Time period toggle: 7d / 30d / 90d (segmented button style)
   - Primary line: emerald (#006947) for scan volume
   - Secondary line: teal for active users (optional)
   - X-axis: dates, Y-axis: count
   - Tooltip on hover
   - Legend below chart
   - Data from `GET /api/analytics/trends?bucket=day`

2. `src/components/dashboard/TopProductsTable.tsx` — Top products:
   - Simple table: rank, product name, scan count, percentage
   - Max 5 rows
   - Data from `GET /api/analytics/top-products`
   - Card wrapper with title

3. `src/components/dashboard/TopUsersTable.tsx` — Top users:
   - Simple table: rank, user email, scan count, API cost
   - Max 5 rows
   - Data from `GET /api/analytics/top-users`
   - Card wrapper with title

4. `src/pages/DashboardPage.tsx` — Update layout:
   - KpiGrid (from TIP-007)
   - ScanVolumeChart (full width, below KPI)
   - Two-column grid: TopProductsTable + TopUsersTable

### Design Reference
- Primary screen: `hlvn_dashboard_overview/screen.png`
- Chart: white card, no border, clean axes, emerald primary line
- Tables: compact, within cards, surface-container-lowest bg
- Layout: chart full width, then 2-col grid for tables

### Business Rules
1. Chart data from `GET /api/analytics/trends?bucket=day` (admin only)
2. Default time period: 30 days
3. Chart colors: primary emerald for main series, teal for secondary
4. Top tables show max 5 entries
5. Numbers formatted with locale separators

## ACCEPTANCE CRITERIA
- Given dashboard When loaded Then shows scan volume chart below KPI cards
- Given chart When toggling to "7d" Then chart updates with 7-day data
- Given dashboard When loaded Then shows top products and top users tables
- Given tables When data loaded Then shows max 5 rows each
- Given chart When hovering data point Then tooltip shows date + value

## CONSTRAINTS
- DO NOT: Add realtime updates (that's TIP-018)
- DO NOT: Add date range picker (that's analytics page TIP-015)
- REUSE: Card, Table from TIP-006; useApiGet from TIP-007; design tokens from TIP-002
- SKIP: Export, advanced filtering, realtime
