# HLVN Dashboard — Scope Revision Summary

> **Date**: 2026-05-08  
> **Reason**: User clarified dashboard is frontend-only; backend API lives in separate serverless project

---

## Original Scope (Incorrect)

Blueprint/TIPs assumed:
- Dashboard implements Next.js API Routes (`app/api/v1/*`)
- Dashboard integrates Supabase directly (client/server/admin)
- Dashboard manages OpenRouter keys and implements retry/fallback
- Dashboard implements database migrations and RLS policies

**Total**: 10 TIPs, 92 hours, includes backend implementation.

---

## Revised Scope (Correct)

Dashboard is **frontend-only**:
- Next.js 15 App Router for UI pages
- Calls external backend API at `D:\scripts\HLVN\HLVN-serverless`
- No `app/api/*` routes
- No Supabase imports
- No OpenRouter integration
- No database work

Backend API (`D:\scripts\HLVN\HLVN-serverless`) handles:
- All API endpoints
- Supabase Auth/PostgreSQL/Storage/RLS
- OpenRouter integration with retry/fallback
- All business logic

---

## Impact on Coding Packs

### Files to Revise

1. **`00-PROJECT-CONTEXT.md`**
   - Remove Supabase/OpenRouter from dashboard tech stack
   - Add backend API base URL and contract
   - Clarify frontend-only scope

2. **`01-REQUIREMENTS-MATRIX.md`**
   - Keep UI requirements (REQ-UI-*)
   - Keep frontend auth flow (login form, token storage)
   - Remove backend implementation requirements (REQ-DB-*, backend parts of REQ-API-*, REQ-AUTH-006 RLS)

3. **`BUILDER-HANDOFF.md`**
   - Remove API Routes module architecture
   - Remove Supabase client setup
   - Add backend API client module
   - Update workspace structure (no `app/api/`, no `lib/supabase/`)

4. **`02-TASK-GRAPH.md`**
   - Remove TIP-002 (Supabase Schema)
   - Remove TIP-003 (Supabase Clients)
   - Remove TIP-004 (API Foundation)
   - Revise TIP-005/006/007/008 to UI-only
   - Reduce total effort estimate

5. **`README.md`**
   - Update tech stack table (remove Supabase/service role)
   - Update TIP execution order

6. **Standards**
   - Keep UI/UX standards
   - Remove backend-specific standards from dashboard scope (they apply to serverless project)

### TIPs to Revise/Remove

**Remove entirely**:
- TIP-002: Supabase Schema + RLS → belongs to serverless project
- TIP-003: Supabase Clients + Auth Gate → backend auth only
- TIP-004: API Foundation → backend only

**Revise to UI-only**:
- TIP-005: Users UI (remove API routes, add backend API calls)
- TIP-006: Scans UI (remove API routes, add backend API calls)
- TIP-007: Analytics UI (remove API routes, add backend API calls)
- TIP-008: Remove entirely or revise to "Backend API Integration" (setup fetch client, error handling, token refresh)

**Keep as-is**:
- TIP-001: Project Setup + Design System
- TIP-009: Loading/Empty/Error States + A11y
- TIP-010: Tests + Verification (revise to frontend tests only)

### New TIPs Needed

- **TIP-002 (new)**: Backend API Client Setup
  - Fetch wrapper with auth token injection
  - Error handling and response parsing
  - Token refresh logic
  - Base URL configuration

---

## Recommended Next Steps

### Option A: Full Revision (Recommended)

1. Archive current TIPs to `tips/archive-backend-scope/`
2. Revise all coding-packs documents for frontend-only scope
3. Generate new TIP set (6-7 TIPs instead of 10)
4. Estimated new effort: ~40-50 hours (frontend UI only)

### Option B: Incremental Revision

1. Keep TIP-001, TIP-009, TIP-010
2. Delete TIP-002, TIP-003, TIP-004
3. Revise TIP-005, TIP-006, TIP-007, TIP-008 in place
4. Update Blueprint/README/BUILDER-HANDOFF

### Option C: Start Fresh

1. Keep design/research/standards as reference
2. Run `/vibecode:vision` again with frontend-only scope
3. Run `/vibecode:blueprint` again
4. Generate new TIP set from scratch

---

## User Decision Required

Which approach should I take?

**A**: Full revision (archive old TIPs, regenerate all docs)  
**B**: Incremental revision (edit existing TIPs in place)  
**C**: Start fresh (keep research, regenerate Vision/Blueprint/TIPs)

---

**Created**: 2026-05-08  
**Status**: Awaiting user decision
