# TIP-006: Scans API + UI

## HEADER
- **TIP-ID**: TIP-006
- **Project**: HLVN Dashboard
- **Module**: Scan History Management
- **Priority**: P0
- **Depends on**: TIP-004
- **Estimated**: L (14 hours)

## CONTEXT
- **Working dir**: `D:\scripts\HLVN\HLVN-dashboard`
- **Tech stack**: Next.js 15 API Routes, TanStack Table, ExcelJS, Supabase Storage, shadcn/ui Dialog
- **Key files to read first**:
  - `coding-packs/BUILDER-HANDOFF.md` Scans API contracts and component tree
  - `coding-packs/01-REQUIREMENTS-MATRIX.md` REQ-HIST-*, REQ-SYNC-*
- **Patterns to follow**: Read-heavy table with filters; detail modal; Excel export with multi-sheet structure.

## APPLICABLE STANDARDS
- [`auth/rbac-admin-gate`](../standards/auth/rbac-admin-gate.md) — admin-only endpoints.
- [`auth/supabase-auth-rls`](../standards/auth/supabase-auth-rls.md) — RLS allows admins to see all scans.

## TASK
Implement scans query/detail/delete API routes, scans history UI page with search/filter/pagination, scan detail dialog, and Excel export functionality for filtered scans.

## SPECIFICATIONS

### Business Rules
1. Only admins can access scans API and UI.
2. Admins see all scans across all users.
3. Search filters OCR structured data (product name, field values) using PostgreSQL JSONB operators or full-text search.
4. Filter by user (dropdown of all users).
5. Filter by date range (last 7d, 30d, custom).
6. Pagination: 20 scans per page default.
7. Scan detail shows full OCR structured data, token usage, image thumbnail/link, user email.
8. Excel export includes all filtered scans (not just current page), multi-sheet if >1000 rows.
9. Deleting a scan removes the database row; image in Supabase Storage can remain or be deleted per implementation decision (document choice).

### Files to Create/Modify
- `app/api/v1/scans/route.ts` (GET)
- `app/api/v1/scans/[id]/route.ts` (GET, DELETE)
- `app/api/v1/scans/export/route.ts` (POST)
- `app/(dashboard)/scans/page.tsx`
- `components/scans/ScansTable.tsx`
- `components/scans/ScanFilters.tsx`
- `components/scans/ScanDetailDialog.tsx`
- `components/scans/ExportScansButton.tsx`
- `hooks/useScansQuery.ts`
- `lib/export/scans-excel.ts`
- `types/scan.ts`

### API Routes

**GET /api/v1/scans**
- Query params: `page`, `limit`, `search`, `userId`, `dateFrom`, `dateTo`
- Response: `{ success: true, data: ScanRecord[], meta: { page, limit, total } }`
- Auth: admin
- Errors: 401, 403, 500
- Search implementation: use PostgreSQL `ocr_structured @> '{"title": "..."}'` or GIN index full-text search if implemented in TIP-002.

**GET /api/v1/scans/:id**
- Response: `{ success: true, data: { scan: ScanRecord, user: UserProfile } }`
- Auth: admin
- Errors: 401, 403, 404, 500

**DELETE /api/v1/scans/:id**
- Response: `{ success: true, data: { id } }`
- Auth: admin
- Errors: 401, 403, 404, 500
- Optional: delete image from Supabase Storage if `image_url` exists.

**POST /api/v1/scans/export**
- Body: `{ search?, userId?, dateFrom?, dateTo? }`
- Response: Excel file stream (`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`)
- Auth: admin
- Errors: 400, 401, 403, 500
- Implementation: query all matching scans (no pagination), generate Excel with ExcelJS, stream response.
- Multi-sheet: if >1000 scans, split into sheets of 1000 rows each.

### UI Components

**ScansTable**
- Columns: Thumbnail (64x64), Product/Title, User Email, Timestamp, Token Usage, Actions (View, Delete).
- TanStack Table with sorting by timestamp (default desc).
- Pagination controls.
- Loading skeleton rows.
- Empty state: "Không tìm thấy scan nào".

**ScanFilters**
- Search input (OCR content).
- User select dropdown (all users + "Tất cả").
- Date range picker or presets (7d, 30d, custom).
- Debounce search 300ms.

**ScanDetailDialog**
- Display: image (clickable to open full size), OCR structured fields table, token usage, user email, timestamp.
- Close button.

**ExportScansButton**
- Button: "Xuất Excel".
- On click: call `/api/v1/scans/export` with current filters.
- Show loading spinner during export.
- On success: browser downloads file `scans-export-{date}.xlsx`.
- On error: show error toast.

### Excel Export Structure
- Sheet 1 (or multiple sheets if >1000 rows):
  - Columns: ID, User Email, Timestamp, Product/Title, OCR Fields (JSON string or flattened), Token Input, Token Output, Cost, API Key Index, Edited.
- Header row bold.
- Auto-width columns.

### Validation
- Date range: `dateFrom` must be <= `dateTo`.
- Search: trim whitespace.
- User filter: must be valid user ID or "all".

### Error Handling
- API returns Vietnamese-friendly error messages.
- UI shows Sonner toast for errors.
- Export errors: "Xuất Excel thất bại. Vui lòng thử lại."

## ACCEPTANCE CRITERIA
- Given admin session When navigating to `/scans` Then scans table loads with pagination.
- Given search "product name" When typing Then table filters to scans with matching OCR content.
- Given user filter "user@example.com" When selected Then table shows only that user's scans.
- Given date range "last 7d" When selected Then table shows scans from last 7 days.
- Given scan row When clicking "View" Then detail dialog opens with full OCR data and image.
- Given scan row When clicking "Delete" Then confirmation dialog appears and scan is deleted on confirm.
- Given "Xuất Excel" clicked When export completes Then browser downloads Excel file with all filtered scans.
- Given >1000 scans When exporting Then Excel has multiple sheets.

## CONSTRAINTS
### DO NOT
- Do NOT implement scan editing UI (mobile app handles editing).
- Do NOT implement scan creation from dashboard (mobile app only).
- Do NOT add advanced OCR re-processing.

### REUSE
- Reuse API foundation helpers from TIP-004.
- Reuse shadcn/ui Dialog, Button, Input, Select.
- Reuse TanStack Table patterns from TIP-005.

### SKIP
- Skip thumbnail generation (use Supabase Storage URL directly or placeholder if missing).
- Skip real-time updates (manual refresh).
- Skip scan bulk operations.

## QUALITY GATE: TIP Self-Review
- [x] TIP covers scans query/detail/delete API and full UI page.
- [x] Excel export is specified with multi-sheet handling.
- [x] Standards for RBAC and Supabase Auth are applied.
- [x] Covers REQ-HIST-001 through REQ-HIST-009.
- [x] Acceptance criteria are concrete.

**Verdict**: PASSED — ready after TIP-004 (can run in parallel with TIP-005).
