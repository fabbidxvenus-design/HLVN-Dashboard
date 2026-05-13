# TIP-010: Scan Detail Dialog (Scans Page pt.2)

## HEADER
- TIP-ID: TIP-010
- Project: HLVN Dashboard
- Module: scans
- Priority: P0
- Depends on: TIP-009
- Estimated: S (2h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + TypeScript strict
- Key files to read first: coding-packs/designs/stitch_hlvn_dashboard_redesign_v5/stitch_hlvn_dashboard_redesign_v5/hlvn_l_ch_s_qu_t_scans_management_2/code.html
- Patterns to follow: Dialog from TIP-006, API client from TIP-004

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Build the scan detail dialog that shows scan image, OCR result text, and metadata (time, user, product) when clicking a row in the scans table. Data from `GET /api/scans/[id]`.

## SPECIFICATIONS

### Files to Create

1. `src/components/scans/ScanDetailDialog.tsx` — Detail dialog:
   - Opens when clicking a scan row in table
   - Left panel: scan image (from signed URL in response)
   - Right panel: OCR result text + structured fields
   - Metadata section: timestamp, user email, product title
   - Token usage info: input/output tokens, cost
   - Close button
   - Data from `GET /api/scans/[id]`

2. `src/pages/ScansPage.tsx` — Update to integrate dialog:
   - Add state for selected scan ID
   - On row click → set selected scan ID → open dialog
   - On dialog close → clear selected scan ID

### Design Reference
- Screen: `hlvn_l_ch_s_qu_t_scans_management_2/screen.png` (detail view variant)
- Dialog: large (max-w-4xl), two-column layout
- Image: left side, contained with aspect ratio
- OCR text: right side, scrollable, monospace for raw text
- Metadata: below in grid layout

### Business Rules
1. Detail data from `GET /api/scans/[id]` (includes signed image URL)
2. Image displayed via signed Supabase Storage URL (1-hour expiry)
3. If no image_url → show placeholder
4. OCR structured fields displayed as key-value pairs
5. Timestamp formatted as locale date/time string

## ACCEPTANCE CRITERIA
- Given scans table When clicking a row Then detail dialog opens with scan data
- Given detail dialog When loaded Then shows scan image on left, OCR text on right
- Given detail dialog When scan has no image Then shows placeholder
- Given detail dialog When clicking close/overlay Then dialog closes
- Given detail dialog When loaded Then shows metadata (time, user, product)

## CONSTRAINTS
- DO NOT: Implement edit OCR functionality (out of scope)
- DO NOT: Implement delete from detail view (that's TIP-011)
- REUSE: Dialog from TIP-006, API client from TIP-004
- SKIP: Edit, delete, share actions
