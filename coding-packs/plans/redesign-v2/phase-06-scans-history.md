# Phase 06: Scans History Redesign

## HEADER
- Phase-ID: phase-06-scans-history
- Source TIP: TIP-018-scans-management-redesign
- Tier: STANDARD
- Status: PLANNED

## GOAL
Redesign the scans history page to match the design reference from `coding-packs/design/hlvn-dashboard/src/pages/History.tsx` while preserving existing scan data flow, mock mode, detail dialog, export, and API contracts.

## SCOPE
- `app/(dashboard)/scans/page.tsx`
- `components/scans/ScansTable.tsx`
- `components/scans/ScanDetailDialog.tsx`
- Scans page header with title and export action
- Search/filter command bar with user and date filters
- Scan table with thumbnail column, classification, requester, timestamp, status badges
- Detail dialog and export functionality
- Loading/empty/error states

## OUT OF SCOPE
- Scan API endpoint contract changes
- New scan fields or metadata
- Backend OCR logic
- Real-time scan updates
- Bulk scan operations

## RED GATE SPECS
Create `specs/scans-history.test.ts` to verify scans page behavior and visual contract before implementation.

## GREEN GATE
- `pnpm test -- specs/scans-history.test.ts` passes
- `pnpm tsc --noEmit` passes
- Scans page renders with mock data
- Search/filter/table actions preserve existing behavior
- Thumbnail display works with fallback icon
- Detail dialog and export still work
- No layout shift on loading
