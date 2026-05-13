# TIP-016: Analytics API Usage Table (Analytics pt.2)

## HEADER
- TIP-ID: TIP-016
- Project: HLVN Dashboard
- Module: analytics
- Priority: P1
- Depends on: TIP-015
- Estimated: S (2h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + TypeScript strict + TanStack Table
- Key files to read first: src/pages/AnalyticsPage.tsx, src/components/ui/table.tsx
- Patterns to follow: Table from TIP-006, same pattern as TIP-009

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Build the API usage table showing endpoint usage stats (key index, scan count, cost). Data from `GET /api/analytics/api-usage`.

## SPECIFICATIONS

### Files to Create

1. `src/components/analytics/ApiUsageTable.tsx` — API usage table:
   - Columns: API Key Index, Scan Count, Total Cost, Avg Cost/Scan
   - Data from `GET /api/analytics/api-usage`
   - Card wrapper with title "API Usage"
   - Simple table (no pagination needed, few rows)
   - Cost formatted as currency

2. `src/pages/AnalyticsPage.tsx` — Update to include table:
   - Add ApiUsageTable below chart
   - Full width card

### Business Rules
1. Admin-only data (backend enforces)
2. Data from `GET /api/analytics/api-usage`
3. Cost displayed in VND or USD format
4. Table sorted by scan count descending

## ACCEPTANCE CRITERIA
- Given analytics page When loaded Then shows API usage table below chart
- Given table When data loaded Then shows key index, count, and cost columns
- Given table When rendered Then costs are formatted as currency

## CONSTRAINTS
- DO NOT: Add editing/management of API keys
- REUSE: Table, Card from TIP-006; useApiGet from TIP-007
- SKIP: Key management, detailed per-request logs
