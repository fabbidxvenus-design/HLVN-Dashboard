# TIP-017: Data Export (CSV Client + Excel API)

## HEADER
- TIP-ID: TIP-017
- Project: HLVN Dashboard
- Module: export
- Priority: P1
- Depends on: TIP-011
- Estimated: S (2h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + TypeScript strict
- Key files to read first: src/pages/ScansPage.tsx, src/lib/api.ts
- Patterns to follow: API client from TIP-004, Button from TIP-006

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Implement hybrid data export: client-side CSV export for scan/user lists, and server-side Excel export via `POST /api/export/excel` for complex reports.

## SPECIFICATIONS

### Files to Create

1. `src/lib/export.ts` — Export utilities:
   - `exportToCsv(data: any[], filename: string)` — client-side CSV generation + download
   - `exportToExcel(filters: ExportFilters)` — calls `POST /api/export/excel` and triggers file download
   - ExportFilters type: { search?, userId?, from?, to? }

2. `src/components/scans/ScansPage.tsx` — Add export buttons:
   - "Export CSV" button (outlined) — exports current filtered data as CSV
   - "Export Excel" button (outlined) — calls server API for XLSX

3. `src/components/users/UsersPage.tsx` — Add CSV export:
   - "Export CSV" button — exports current user list as CSV

### Business Rules
1. CSV export: client-side, uses currently loaded/filtered data
2. Excel export: server-side via `POST /api/export/excel` with filters
3. Excel export max 1000 rows (backend limit)
4. Admin-only for Excel export
5. CSV filename format: `hlvn-scans-YYYY-MM-DD.csv` or `hlvn-users-YYYY-MM-DD.csv`

## ACCEPTANCE CRITERIA
- Given scans page When clicking "Export CSV" Then downloads CSV file with current data
- Given scans page When clicking "Export Excel" Then downloads XLSX from server
- Given users page When clicking "Export CSV" Then downloads CSV with user list
- Given CSV export When downloaded Then file has correct headers and data

## CONSTRAINTS
- DO NOT: Install heavy CSV/Excel libraries on client (use simple string generation for CSV)
- DO NOT: Export more than current page for CSV (use server for full export)
- REUSE: API client from TIP-004, Button from TIP-006
- SKIP: Scheduled exports, email delivery
