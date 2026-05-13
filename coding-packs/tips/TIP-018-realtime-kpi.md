# TIP-018: Supabase Realtime KPI Updates

## HEADER
- TIP-ID: TIP-018
- Project: HLVN Dashboard
- Module: realtime
- Priority: P1
- Depends on: TIP-008
- Estimated: S (2h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + @supabase/supabase-js (Realtime)
- Key files to read first: src/lib/supabase.ts, src/components/dashboard/KpiGrid.tsx
- Patterns to follow: Supabase Realtime subscription pattern

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Implement Supabase Realtime subscriptions to auto-update KPI metrics on the dashboard when new scans are created. Subscribe to `scans` table changes.

## SPECIFICATIONS

### Files to Create

1. `src/hooks/use-realtime.ts` — Realtime subscription hook:
   - `useRealtimeSubscription(table: string, event: string, callback: Function)`
   - Subscribes to Supabase Realtime channel
   - Auto-cleanup on unmount
   - Reconnection handling

2. `src/components/dashboard/KpiGrid.tsx` — Update with realtime:
   - Subscribe to `scans` table INSERT events
   - On new scan → refetch KPI summary data
   - Visual indicator when data updates (subtle flash/pulse)

3. `src/components/dashboard/ScanVolumeChart.tsx` — Update with realtime:
   - On new scan → refetch chart data
   - Smooth transition when data updates

### Business Rules
1. Subscribe to Supabase Realtime on `scans` table
2. On INSERT event → trigger KPI refetch
3. Debounce refetch (max once per 5 seconds)
4. Auto-cleanup subscription on component unmount
5. Handle reconnection gracefully

## ACCEPTANCE CRITERIA
- Given dashboard open When new scan created Then KPI numbers update automatically
- Given dashboard open When new scan created Then chart updates with new data point
- Given component unmount When navigating away Then subscription cleaned up
- Given connection lost When reconnected Then subscription resumes

## CONSTRAINTS
- DO NOT: Subscribe to all table events (only INSERT on scans)
- DO NOT: Update UI on every single event (debounce)
- REUSE: Supabase client from TIP-004, KpiGrid from TIP-007
- SKIP: Optimistic updates, complex merge logic
