# zflow auto-pipeline: HLVN Dashboard (Frontend-Only)

> Plan directory: `D:\scripts\HLVN\HLVN-dashboard\coding-packs\plans\full-auto-pipeline-init`
> Mode: `--plan` (plan-supervised, skips RRI/SDD/PROPOSAL)
> Tier: STANDARD | Speed: HIGH | Mock mode: ENABLED

## INTAKE

**Task**: Implement all 6 TIPs for HLVN Dashboard frontend-only in sequential phases, with mock data for parallel backend development.

**Complexity score**: 65 (lexical: +15, structural: +25, impact: +25)
**Tier assignment**: STANDARD (score 61-100 → THOROUGH, but capped to STANDARD for first run; upgrade if needed)

**Signals detected**:
- +20: architecture/setup across 5 phases, 6 TIPs
- +5: word count >100 (detailed plan)
- +10: 6+ file paths across app/, components/, lib/, hooks/, stores/, types/
- +5: test requirements (TIP-006 mandates 80% coverage)
- +10: system-wide impact (new project, multiple directories)
- +15: cross-file dependencies (phase dependency chain)

## PIPELINE OVERVIEW

```
5 phases → 6 TIPs → full MVP implementation

[phase-01-foundation]     → TIP-001 + TIP-002 (entry point)
       ↓
[phase-02-users-ui]      → TIP-003
       ↓
[phase-03-scans-ui]      → TIP-004
       ↓
[phase-04-analytics-ui] → TIP-005
       ↓
[phase-05-polish-a11y]   → TIP-006 (final polish + tests)
```

## PHASE DETAILS

| # | Phase | TIPs | Blocked by | Est. |
|---|-------|------|------------|------|
| 1 | Foundation: Project Setup + API Client + Auth | TIP-001, TIP-002 | — | 14h |
| 2 | Users Management UI | TIP-003 | phase-01 | 10h |
| 3 | Scans History UI | TIP-004 | phase-02 | 12h |
| 4 | Analytics Dashboard UI | TIP-005 | phase-01 | 10h |
| 5 | UI Polish + A11y + Tests | TIP-006 | phase-04 | — |

**Total estimated**: 46h (~6 days)

## MOCK DATA STRATEGY

- `NEXT_PUBLIC_USE_MOCK_API=true` enables contract-accurate mock responses
- Mock responses must match `HLVN-serverless` API contracts exactly
- All field names: camelCase (`createdAt`, `userId`, `imageUrl`, `ocrStructured`, `tokenUsage`, `apiKeyIndex`, `rawText`)
- All params: `from`/`to` for analytics (not `dateFrom`/`dateTo`)
- All paginated: `meta` includes `hasMore`
- Analytics mock: pre-aggregated (no calculation from raw scans in UI)
- No `app/api/*` mock routes in dashboard

## KEY RULES

1. Execute phases sequentially — blocked phases must wait
2. SEPARATE verifier agent at every VERIFY phase — never self-verify
3. Dispatch EVOLVE as background agent after each COMPLETE
4. Save `handoff.json` on pause/session-end
5. `pnpm tsc --noEmit` passes at every phase before declaring complete
6. Focus lock ON at pipeline start, OFF at COMPLETE

## VERIFICATION CHECKLIST (per phase)

Per-phase spec tests must FAIL before code (Red Gate) and PASS after code (Green Gate).

## HOW TO RUN

```
# Phase 1: Foundation
zflow --plan D:\scripts\HLVN\HLVN-dashboard\coding-packs\plans\full-auto-pipeline-init --phase phase-01-foundation.md

# Phase 2: Users UI
zflow --plan D:\scripts\HLVN\HLVN-dashboard\coding-packs\plans\full-auto-pipeline-init --phase phase-02-users-ui.md

# Phase 3: Scans UI
zflow --plan D:\scripts\HLVN\HLVN-dashboard\coding-packs\plans\full-auto-pipeline-init --phase phase-03-scans-ui.md

# Phase 4: Analytics UI
zflow --plan D:\scripts\HLVN\HLVN-dashboard\coding-packs\plans\full-auto-pipeline-init --phase phase-04-analytics-ui.md

# Phase 5: Polish + A11y + Tests
zflow --plan D:\scripts\HLVN\HLVN-dashboard\coding-packs\plans\full-auto-pipeline-init --phase phase-05-polish-a11y-tests.md
```

## DISCONNECTION HANDLING

If backend (`HLVN-serverless`) becomes available mid-pipeline:
1. Set `NEXT_PUBLIC_USE_MOCK_API=false`
2. Point `NEXT_PUBLIC_BACKEND_API_URL` to backend URL
3. Continue pipeline — no component changes needed
4. Mock transport swaps for real backend transparently

---

*zflow auto-pipeline initialized: 2026-05-08 | Framework: Vibecode Kit v5.0 | Project: HLVN Dashboard*
