# Phase 06: Scans Management Redesign

## HEADER
- Phase-ID: phase-06-scans-management
- Source TIP: TIP-018
- Tier: STANDARD
- Status: PENDING

## GOAL
Redesign scans history page with polished filters, table, detail dialog.

## SCOPE
- Filters command bar
- Scan table with thumbnails/OCR summary
- Scan detail dialog
- Export action UX

## OUT OF SCOPE
- Bulk scan operations
- Backend export generation
- Advanced analytics

## RED GATE SPECS
See `specs/scans-management.test.ts`.

## GREEN GATE
- `pnpm test` passes
- `pnpm tsc --noEmit` passes
- Scans page visual verification
- Detail dialog polished
