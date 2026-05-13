# TIP-015: Analytics Date Picker + Charts (Analytics pt.1)

## HEADER
- TIP-ID: TIP-015
- Project: HLVN Dashboard
- Module: analytics
- Priority: P0
- Depends on: TIP-005, TIP-006
- Estimated: M (3h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + TypeScript strict + Recharts
- Key files to read first: coding-packs/designs/stitch_hlvn_dashboard_redesign_v5/stitch_hlvn_dashboard_redesign_v5/hlvn_analytics_ph_n_t_ch_1440px_1/code.html
- Patterns to follow: Recharts from TIP-008, Card from TIP-006

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Build the analytics page with date range picker and scan volume chart with multiple series. Data from `/api/analytics/trends` and `/api/analytics/summary`.

## SPECIFICATIONS

### Files to Create

1. `src/components/analytics/AnalyticsDateRangePicker.tsx` — Date range picker:
   - From date input + To date input
   - Preset buttons: 7 ngày, 30 ngày, 90 ngày
   - On change → refetch analytics data
   - Segmented button style for presets

2. `src/components/analytics/AnalyticsChart.tsx` — Multi-series chart:
   - Recharts AreaChart or LineChart
   - Series: scan volume (primary/emerald), active users (secondary/teal)
   - Bucket toggle: day / week / month
   - Responsive container
   - Tooltip + Legend
   - Data from `GET /api/analytics/trends?bucket=day&from=...&to=...`

3. `src/pages/AnalyticsPage.tsx` — Analytics page:
   - Page title "Phân tích" (Manrope headline)
   - AnalyticsDateRangePicker at top
   - KPI summary cards (reuse KpiCard pattern from TIP-007)
   - AnalyticsChart below
   - Placeholder for API usage table (TIP-016)

### Design Reference
- Primary screen: `hlvn_analytics_ph_n_t_ch_1440px_1/screen.png`
- Date picker: segmented button style for presets
- Chart: white card, clean axes, multi-series with legend
- Layout: date picker top, KPI row, chart full width

### Business Rules
1. Admin-only page (RoleGuard from TIP-005)
2. Data from `GET /api/analytics/trends?bucket=day&from=...&to=...`
3. Default range: last 30 days
4. Bucket options: day, week, month
5. Chart colors: emerald (scans), teal (users)
6. Comparison with previous period shown as trend arrows in KPI cards

## ACCEPTANCE CRITERIA
- Given analytics page When loaded Then shows date picker + chart with 30-day default
- Given date picker When selecting "7 ngày" preset Then chart updates with 7-day data
- Given date picker When changing custom dates Then chart refetches with new range
- Given chart When toggling bucket to "week" Then chart shows weekly aggregation
- Given chart When hovering Then tooltip shows date + values for all series

## CONSTRAINTS
- DO NOT: Add API usage table (that's TIP-016)
- DO NOT: Add export functionality (that's TIP-017)
- REUSE: Card from TIP-006; Recharts patterns from TIP-008; useApiGet from TIP-007
- SKIP: Export, advanced comparisons, realtime
