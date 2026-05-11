# TIP-018: Scans Management Redesign

## HEADER
- TIP-ID: TIP-018
- Project: HLVN Dashboard
- Module: Scans History UI
- Priority: P0
- Depends on: TIP-015
- Estimated: L

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Tech stack: Authoritative stack from `coding-packs/product/tech-stack.md`: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui/Radix, TanStack Table, Lucide React, Sonner, Vitest + Testing Library.
- Design source of truth:
  - `coding-packs/design/hlvn-dashboard/src/pages/History.tsx`
  - `coding-packs/design/hlvn-dashboard/src/index.css`
  - `coding-packs/design/hlvn-dashboard/components/ui/*`
- Key app files to read first:
  - `app/(dashboard)/scans/page.tsx`
  - `components/scans/ScansTable.tsx`
  - `components/scans/ScanDetailDialog.tsx`
  - `components/scans/ScanThumbnailCell.tsx`
  - `components/scans/OCRSummaryCell.tsx`
  - `components/scans/TokenUsageCell.tsx`
  - `hooks/useScansQuery.ts`
  - `types/scan.ts`
  - `app/globals.css`
- Patterns to follow:
  - Port the visual composition from the design reference (History.tsx), not the mock data or route architecture.
  - Keep existing Next.js dashboard data flow, API client, mock mode, hooks, and dialogs.
  - Preserve Vietnamese product language where current app already uses Vietnamese labels.

## APPLICABLE STANDARDS
- none directly applicable.

## TASK
Redesign the Scans History page to make scan records, OCR summaries, thumbnails, filters, token metadata, and detail dialog significantly easier to read and operate. Preserve existing list, filter, detail, delete, export, mock data, and API behavior.

## SPECIFICATIONS
### Business Rules
1. Preserve scan list, pagination, search, user/date filters, sort, detail dialog, delete dialog, and export trigger.
2. Preserve scan data model, OCR structured fields, token usage, edited badge, and image URL behavior.
3. Export remains frontend trigger to backend/mock endpoint; no Excel generation in dashboard.
4. Do not add backend calculations.

### Visual Requirements
1. Page header mirrors the design reference:
   - Left: title/subtitle such as “Scan Repository” and operational context.
   - Right: export action with `Download` icon, outline styling, rounded-xl, subtle shadow.
2. Filter row mirrors the design reference:
   - White rounded `rounded-2xl` command bar with soft border/shadow.
   - Search field with left `Search` icon and placeholder for searching OCR/scan results.
   - User and date range filters aligned right on desktop and stacked cleanly on narrow widths.
3. Table surface mirrors the design reference:
   - White `rounded-2xl` container, `overflow-hidden`, `shadow-sm`, horizontal overflow wrapper.
   - Header labels are uppercase, 12px, tracking-wider, muted slate text.
   - Rows use soft separators, hover background, and group interactions.
4. Thumbnail cell must look intentional with 40px image box, rounded-lg, border, object-cover image, and `ImageIcon` fallback.
5. OCR/product summary must show title/fields/notes hierarchy clearly using the existing scan data shape.
6. Timestamp, user, token usage, edited state, and status badge must be scannable and aligned.
7. Status badges must use semantic color treatments: success green, failed/error rose/red, edited/processing if present.
8. Row actions must use a subtle “Details”/eye affordance or existing action menu without overpowering row content.
9. Scan detail dialog must feel like a product detail panel: image preview, OCR fields, notes, metadata, and token usage sections.
10. Loading/empty/error states must match new visual language and avoid layout shift.

### Validation
1. Existing scan filters and pagination still work.
2. Detail dialog opens with correct scan data.
3. Delete and export actions still call existing handlers.
4. TypeScript and tests pass.

### Error Handling
1. Export errors still surface via toast.
2. Image fallback remains usable and visually consistent.
3. Empty filtered state explains no scan results.

## ACCEPTANCE CRITERIA
- Given scan data exists When viewing `/scans` Then filters, table rows, thumbnails, OCR summaries, and metadata are visually polished.
- Given a scan has structured OCR fields When opening detail Then fields are grouped and readable.
- Given a thumbnail fails or is missing When table renders Then fallback treatment is consistent with redesign.
- Given export is clicked When current behavior runs Then existing success/error feedback remains intact.
- Given no scans match filters When table renders Then redesigned empty state appears.
- Given viewport 768px When viewing `/scans` Then table/filter layout remains usable without horizontal overflow.

## CONSTRAINTS
- DO NOT: change scan API contracts, OCR shape, export contract, or mock data shape.
- DO NOT: use Pencil, `.pen`, or Pencil MCP tools.
- DO NOT: implement Excel generation or backend logic.
- REUSE: existing ScansTable, cells, dialogs, hooks, API client.
- SKIP: bulk scan operations and advanced analytics.

## QUALITY GATE: TIP Self-Review
- [x] Scope limited to scans page.
- [x] Rich table/detail states covered.
- [x] Backend/export boundaries preserved.

**Verdict**: PASSED.
