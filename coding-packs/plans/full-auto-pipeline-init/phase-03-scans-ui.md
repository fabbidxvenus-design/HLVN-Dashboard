# Phase 03 — Scans History UI

> zflow plan-supervised mode: skips RRI/SDD/PROPOSAL
> Source: `TIP-004`
> Blocked by: Phase 02 (TIP-003)

## Overview

Build Scan History page with searchable/filterable/paginated scans table, scan detail dialog, delete action, and export trigger. All data fetched via API client with mock mode support.

## Dependencies
- Phase 01: API client (`lib/api/client.ts`), auth session
- Phase 02: `hooks/useUsersQuery.ts` patterns, `lib/api/users.ts` patterns

## Requirements

### TIP-004: Scans History UI
1. Create `app/(dashboard)/scans/page.tsx` page component
2. Create `components/scans/ScansPageHeader.tsx` with `Export Excel` button
3. Create `components/scans/ScanFilters.tsx` with search, user select, date range picker
4. Create `components/scans/ScansTable.tsx` with TanStack Table
5. Create `components/scans/ScanThumbnailCell.tsx` (64x64px image or placeholder)
6. Create `components/scans/OCRSummaryCell.tsx` (title + field count)
7. Create `components/scans/TokenUsageCell.tsx` (input/output tokens, cost)
8. Create `components/scans/ScanDetailDialog.tsx` (image, metadata, OCR fields, sizes, token usage)
9. Create `components/scans/DeleteScanDialog.tsx` with confirmation
10. Create `components/scans/ExportScansButton.tsx` with loading state and toast feedback
11. Create `hooks/useScansQuery.ts` with URL search params, loading/error/data/meta/refetch
12. Create `lib/api/scans.ts` with typed endpoint functions
13. Create `types/scan.ts` with `ScanRecord`, `OCRResponse`, `TokenUsage`, etc. (all camelCase)

### Mock Data Requirements
- Mock `ScanRecord` with camelCase: `userId`, `userEmail`, `imageUrl`, `ocrStructured`, `tokenUsage`, `apiKeyIndex`, `modelTier`, `createdAt`, `updatedAt`
- Mock `OCRResponse` with `rawText` (not `raw_text`)
- Mock scans list with `meta.hasMore`
- Mock export: simulate download or return `downloadUrl`
- Mock scan detail: `{ scan: ScanRecord, user: UserProfile }`
- Components work unchanged in mock mode and real backend mode

## File Ownership (non-overlapping)

| Files | Owner |
|-------|-------|
| `app/(dashboard)/scans/page.tsx`, `components/scans/*`, `hooks/useScansQuery.ts`, `lib/api/scans.ts`, `types/scan.ts` | TIP-004 |

## Acceptance Criteria (from source TIP)

- [ ] `/scans` route renders under dashboard shell
- [ ] Table displays thumbnail (64x64px), OCR summary, user, time, token usage
- [ ] Filters use URL state (search, user, date range)
- [ ] Detail dialog is keyboard accessible (Radix Dialog focus trap)
- [ ] Delete confirmation works and refreshes data
- [ ] Export button handles loading, success, and failure with toast
- [ ] Images have explicit dimensions (64x64px) and alt text
- [ ] `pnpm tsc --noEmit` passes
- [ ] Component tests cover table states, detail dialog, and export behavior
- [ ] Mock mode renders correctly with `NEXT_PUBLIC_USE_MOCK_API=true`
