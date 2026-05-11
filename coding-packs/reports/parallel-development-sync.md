# Parallel Development Sync Report

> Date: 2026-05-08  
> Purpose: Align dashboard and serverless coding-packs for parallel development

---

## Summary

**Dashboard** (`D:\scripts\HLVN\HLVN-dashboard`) và **Serverless** (`D:\scripts\HLVN\HLVN-serverless`) đã có coding-packs riêng và có thể develop song song. Tuy nhiên, một số endpoint và requirement status trong dashboard docs vẫn chưa đồng bộ với serverless contract.

---

## Scope Boundaries (Confirmed)

### Dashboard Scope (Frontend-Only)
- ✅ Next.js 15 App Router UI pages
- ✅ Components, forms, tables, charts
- ✅ Calls external backend API
- ✅ No `app/api/*` routes
- ✅ No Supabase client imports
- ✅ No OpenRouter integration
- ✅ No database migrations

### Serverless Scope (Backend API)
- ✅ All API endpoints (`app/api/*`)
- ✅ Supabase Auth/PostgreSQL/Storage/RLS
- ✅ OpenRouter integration with retry/fallback
- ✅ Business logic and data persistence
- ✅ Analytics aggregation
- ✅ Excel export generation

---

## API Contract Drift (Needs Fix)

### Analytics Endpoints

**Dashboard TIP-005 currently uses**:
```
GET /api/analytics/kpis
GET /api/analytics/trend
GET /api/analytics/top-products
GET /api/analytics/top-users
GET /api/analytics/api-usage
```

**Serverless contract defines**:
```
GET /api/analytics/summary      (not /kpis)
GET /api/analytics/trends       (not /trend)
GET /api/analytics/top-products (matches)
GET /api/analytics/top-users    (matches)
GET /api/analytics/api-usage    (matches)
```

**Action**: Update dashboard TIP-005, TIP-002, BUILDER-HANDOFF to use `/api/analytics/summary` and `/api/analytics/trends`.

### Export Endpoint

**Dashboard TIP-004 currently uses**:
```
POST /api/scans/export
```

**Serverless contract defines**:
```
POST /api/export/excel
```

**Action**: Update dashboard TIP-004, TIP-002, BUILDER-HANDOFF to use `/api/export/excel`.

### Auth Endpoints

**Dashboard TIP-002 currently uses**:
```
POST /api/auth/login
GET /api/auth/me
POST /api/auth/refresh
```

**Serverless contract defines**:
```
POST /api/auth/login    (matches)
GET /api/auth/me        (matches)
POST /api/auth/refresh  (matches)
POST /api/auth/logout   (dashboard missing)
```

**Action**: Add `/api/auth/logout` to dashboard TIP-002 and BUILDER-HANDOFF.

---

## Requirements Status Drift

### Dashboard 01-REQUIREMENTS-MATRIX.md

Many requirements marked `DONE` in TIP column, but this means "requirement captured" not "code implemented". This creates confusion for parallel development.

**Action**: Update dashboard requirements matrix to clarify:
- `TIP` column should reference which TIP covers the requirement
- Add `Status` column: `Planned` / `In Progress` / `Implemented` / `Verified`
- Mark all as `Planned` since implementation has not started

### Serverless 01-REQUIREMENTS-MATRIX.md

Uses `Decision` column instead of `TIP` column, which is clearer for backend scope.

**Action**: Keep serverless format; it's more appropriate for backend requirements.

---

## Vision/Context Drift

### Dashboard 00-PROJECT-CONTEXT.md

Still contains old architecture diagram showing:
- "API Routes" inside dashboard
- "Supabase" directly connected to dashboard frontend
- "OpenRouter" called from dashboard

**Action**: Rewrite Vision section to show:
- Dashboard → External Backend API
- Backend API → Supabase + OpenRouter
- Clear separation of concerns

### Dashboard product/tech-stack.md

Still describes:
- "Next.js API Routes" as dashboard feature
- "Supabase PostgreSQL" as dashboard backend
- "No separate backend"

**Action**: Rewrite to clarify:
- Dashboard: frontend stack only
- Backend: external API at `D:\scripts\HLVN\HLVN-serverless`
- Reference serverless tech-stack.md for backend details

---

## Recommended Actions

### High Priority (Blocks Parallel Development)

1. ✅ **Fix endpoint drift in dashboard TIPs**:
   - TIP-002: Add `/api/auth/logout`, update endpoint list
   - TIP-004: Change `/api/scans/export` → `/api/export/excel`
   - TIP-005: Change `/api/analytics/kpis` → `/api/analytics/summary`, `/api/analytics/trend` → `/api/analytics/trends`

2. ✅ **Update dashboard BUILDER-HANDOFF.md**:
   - Backend API Contract section with correct endpoints
   - Remove any remaining Supabase/OpenRouter references

3. ⏳ **Rewrite dashboard 00-PROJECT-CONTEXT.md Vision**:
   - Architecture diagram showing external backend
   - Remove "API Routes" from dashboard scope
   - Clarify data flow: Dashboard → Backend API → Supabase

### Medium Priority (Improves Clarity)

4. ⏳ **Update dashboard 01-REQUIREMENTS-MATRIX.md**:
   - Change `DONE` to `Planned` for all requirements
   - Add `Status` column
   - Clarify that backend requirements belong to serverless scope

5. ⏳ **Rewrite dashboard product/tech-stack.md**:
   - Frontend stack only
   - Reference serverless for backend stack
   - Remove "no separate backend" language

### Low Priority (Nice to Have)

6. ⏳ **Create shared types package** (Phase 2):
   - Extract API types from serverless
   - Import into dashboard as npm package or copy
   - Ensure type safety across projects

7. ⏳ **API contract documentation** (Phase 2):
   - Generate OpenAPI spec from serverless routes
   - Dashboard references OpenAPI for endpoint discovery

---

## Parallel Development Workflow

### Week 1

**Serverless**:
- TIP-001: Project Setup + API Foundation
- TIP-002: Supabase Schema + Auth/RLS

**Dashboard**:
- TIP-001: Project Setup + Design System
- TIP-002: Backend API Client + Auth Flow (blocked until serverless TIP-003 provides login endpoint)

**Coordination**: Dashboard dev can mock backend responses or wait for serverless Week 2.

### Week 2

**Serverless**:
- TIP-003: Auth + User Management APIs
- TIP-004: Storage + Scan APIs
- TIP-005: OCR Proxy

**Dashboard**:
- TIP-003: Users Management UI (depends on serverless TIP-003)
- TIP-004: Scans History UI (depends on serverless TIP-004)
- TIP-005: Analytics Dashboard UI (depends on serverless TIP-006)

**Coordination**: Dashboard dev needs serverless TIP-003 complete before starting dashboard TIP-003.

### Week 3

**Serverless**:
- TIP-006: Analytics + Export APIs
- TIP-007: Tests + Deployment Hardening

**Dashboard**:
- TIP-006: UI Polish + A11y + Tests

**Coordination**: Both teams can work independently; dashboard tests can use mocked backend.

---

## API Contract Checklist

Before dashboard implementation starts, verify serverless provides:

- [ ] `POST /api/auth/login` → `{ success, data: { accessToken, user } }`
- [ ] `GET /api/auth/me` → `{ success, data: { user } }`
- [ ] `POST /api/auth/refresh` → `{ success, data: { accessToken } }`
- [ ] `POST /api/auth/logout` → `{ success }`
- [ ] `GET /api/users` → `{ success, data: UserProfile[], meta }`
- [ ] `POST /api/users` → `{ success, data: { user } }`
- [ ] `PATCH /api/users/:id/role` → `{ success, data: { user } }`
- [ ] `DELETE /api/users/:id` → `{ success, data: { id } }`
- [ ] `GET /api/scans` → `{ success, data: ScanRecord[], meta }`
- [ ] `GET /api/scans/:id` → `{ success, data: { scan, user } }`
- [ ] `DELETE /api/scans/:id` → `{ success, data: { id } }`
- [ ] `POST /api/export/excel` → binary XLSX or `{ success, data: { downloadUrl } }`
- [ ] `GET /api/analytics/summary` → `{ success, data: { totalScans, activeUsers, totalCost, successRate } }`
- [ ] `GET /api/analytics/trends` → `{ success, data: Array<{ date, scans }> }`
- [ ] `GET /api/analytics/top-products` → `{ success, data: Array<{ name, count }> }`
- [ ] `GET /api/analytics/top-users` → `{ success, data: Array<{ user, scanCount }> }`
- [ ] `GET /api/analytics/api-usage` → `{ success, data: Array<{ apiKeyIndex, inputTokens, outputTokens, cost }> }`

---

## Conclusion

Dashboard và serverless có thể develop song song sau khi fix endpoint drift. Dashboard dev nên bắt đầu với TIP-001 (setup) và mock backend responses cho TIP-002 (auth client), sau đó chờ serverless TIP-003 (auth APIs) complete trước khi implement dashboard TIP-003/004/005.

**Next steps**:
1. Fix dashboard TIP-002, TIP-004, TIP-005 endpoint references
2. Update dashboard BUILDER-HANDOFF.md backend contract
3. Rewrite dashboard Vision/Context/Tech-Stack docs
4. Serverless team proceeds with TIP-001/002/003
5. Dashboard team proceeds with TIP-001 and mocked TIP-002

---

*Report created: 2026-05-08*
