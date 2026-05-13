# TIP-019: Supabase Realtime Scan List

## HEADER
- TIP-ID: TIP-019
- Project: HLVN Dashboard
- Module: realtime
- Priority: P1
- Depends on: TIP-009
- Estimated: S (2h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + @supabase/supabase-js (Realtime)
- Key files to read first: src/hooks/use-realtime.ts (from TIP-018), src/components/scans/ScansTable.tsx
- Patterns to follow: Same realtime pattern as TIP-018

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Implement Supabase Realtime subscription on the scans page to auto-update the scan list when new scans are created or deleted.

## SPECIFICATIONS

### Files to Modify

1. `src/components/scans/ScansTable.tsx` — Add realtime:
   - Subscribe to `scans` table INSERT and DELETE events
   - On INSERT → prepend new scan to table (if on first page)
   - On DELETE → remove scan from table
   - Visual indicator for new rows (subtle highlight animation)
   - Debounce: max refetch once per 3 seconds

2. `src/pages/ScansPage.tsx` — Realtime indicator:
   - Small "Live" badge near page title when realtime connected
   - Green dot animation

### Business Rules
1. Subscribe to `scans` table INSERT + DELETE events
2. On INSERT → refetch current page data (to maintain sort/filter)
3. On DELETE → remove from local state immediately
4. Debounce refetch (max once per 3 seconds)
5. Show "Live" indicator when connected

## ACCEPTANCE CRITERIA
- Given scans page open When new scan created Then table updates with new row
- Given scans page open When scan deleted elsewhere Then row disappears
- Given scans page When realtime connected Then shows "Live" indicator
- Given component unmount When navigating away Then subscription cleaned up

## CONSTRAINTS
- DO NOT: Implement optimistic updates for complex scenarios
- DO NOT: Subscribe to UPDATE events (not needed for scan list)
- REUSE: use-realtime hook from TIP-018, ScansTable from TIP-009
- SKIP: Conflict resolution, offline support
