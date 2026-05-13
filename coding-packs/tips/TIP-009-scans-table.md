# TIP-009: Scans Table + Filters (Scans Page pt.1)

## HEADER
- TIP-ID: TIP-009
- Project: HLVN Dashboard
- Module: scans
- Priority: P0
- Depends on: TIP-005, TIP-006
- Estimated: M (3h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + TypeScript strict + TanStack Table
- Key files to read first: coding-packs/designs/stitch_hlvn_dashboard_redesign_v5/stitch_hlvn_dashboard_redesign_v5/hlvn_l_ch_s_qu_t_scans_management_1/code.html
- Patterns to follow: TanStack Table + Table UI from TIP-006, API client from TIP-004

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Build the scans management table with server-side pagination, sorting, and filters (date range, user, product, search). Data from `GET /api/scans`.

## SPECIFICATIONS

### Files to Create

1. `src/types/scan.ts` — Scan types:
   ```typescript
   interface ScanRecord {
     id: string;
     user_id: string;
     timestamp: string;
     image_url: string | null;
     ocr_raw: string;
     ocr_structured: OCRStructured;
     token_usage: TokenUsage;
     api_key_index: number;
     edited: boolean;
   }
   interface OCRStructured {
     title?: string;
     fields: OCRField[];
     sizes: OCRSize[];
     rawText?: string;
     notes?: string;
   }
   interface TokenUsage { input: number; output: number; cost: number; }
   interface OCRField { name: string; value: string; }
   interface OCRSize { name: string; value: string; }
   ```

2. `src/components/scans/ScanFilters.tsx` — Filter bar:
   - Search input (searches OCR text content)
   - Date range picker (from/to date inputs)
   - User filter (select dropdown, admin only)
   - Clear filters button
   - All filters trigger refetch

3. `src/components/scans/ScansTable.tsx` — Data table:
   - TanStack Table with columns: timestamp, user, product (from ocr_structured.title), status, actions
   - Server-side pagination (page, limit params)
   - Sortable columns (timestamp, user)
   - Row click → open detail (TIP-010)
   - Pagination controls at bottom

4. `src/pages/ScansPage.tsx` — Scans page:
   - Page title "Lịch sử quét" (Manrope headline)
   - ScanFilters at top
   - ScansTable below
   - Data from `GET /api/scans?page=1&limit=20&search=...&from=...&to=...&userId=...`

### Design Reference
- Primary screen: `hlvn_l_ch_s_qu_t_scans_management_1/screen.png`
- Table: surface-container-lowest bg, header with surface-container-low
- Filters: filled inputs, inline layout
- Pagination: simple prev/next with page numbers

### Business Rules
1. Data from `GET /api/scans` with pagination params
2. Admin sees all scans; regular user sees only own scans (backend enforces)
3. Search filters by OCR text content (server-side)
4. Date range filter uses `from` and `to` query params
5. Default sort: newest first (timestamp desc)
6. Page size: 20 items per page

## ACCEPTANCE CRITERIA
- Given scans page When loaded Then shows table with paginated scan records
- Given search input When typing and submitting Then table filters by OCR content
- Given date range When selecting dates Then table shows scans in range
- Given table header When clicking sortable column Then sorts data
- Given pagination When clicking next Then loads next page of results

## CONSTRAINTS
- DO NOT: Implement scan detail dialog (that's TIP-010)
- DO NOT: Implement delete functionality (that's TIP-011)
- DO NOT: Add realtime updates (that's TIP-019)
- REUSE: Table, Input, Select, Button from TIP-006; useApiGet from TIP-007
- SKIP: Export, bulk actions, realtime
