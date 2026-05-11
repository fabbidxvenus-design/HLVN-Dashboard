# SPEC: HLVN Dashboard Analytics UI (TIP-005)

## AC-AN-01: Dashboard overview renders with KPI cards
- Given: authenticated admin visits `/`
- When: page loads
- Then: 4 KPI cards display: Total Scans, Active Users, API Cost, Success Rate
- And: scan volume chart for last 7 days renders

## AC-AN-02: Loading state shows KPI skeletons
- Given: analytics data is being fetched
- When: page renders
- Then: KPI cards show skeleton placeholders

## AC-AN-03: Empty chart state renders gracefully
- Given: no trend data for selected range
- When: chart component renders
- Then: displays empty state message or placeholder

## AC-AN-04: Analytics page renders all sections
- Given: admin visits `/analytics`
- When: page loads
- Then: header with date range picker, KPI grid, trend chart, top users, API usage, and top products tables

## AC-AN-05: Date range picker updates analytics
- Given: admin selects a date range
- When: date range is applied
- Then: analytics data refreshes with new `from`/`to` params

## AC-AN-06: KPI values are formatted correctly
- Given: analytics summary data
- When: KPI card renders
- Then: numbers formatted with commas, currency with $, percentages with %

## AC-AN-07: Error state shows retry button
- Given: API request fails
- When: error is returned
- Then: displays error message with "Retry" button

## AC-AN-08: Chart is responsive and readable
- Given: trend data exists
- When: chart renders
- Then: tooltip shows date and scan count, axes are readable, no overflow

## AC-AN-09: Mock mode renders with NEXT_PUBLIC_USE_MOCK_API=true
- Given: `NEXT_PUBLIC_USE_MOCK_API=true`
- When: `/` or `/analytics` page loads
- Then: mock analytics render with pre-aggregated data
- And: charts render from mock trends (7d or 30d)
- And: tables render from mock top-products, top-users, api-usage