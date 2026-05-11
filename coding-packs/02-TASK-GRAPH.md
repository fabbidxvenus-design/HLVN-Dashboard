# HLVN Dashboard — Task Graph (Frontend-Only + UI Polish)

> Vibecode Kit v5.0 — BƯỚC 4 (BLUEPRINT)  
> Date: 2026-05-08 (Revised for frontend-only scope + UI polish)  
> 20 TIPs across 5 phases

---

## SCOPE CLARIFICATION

**Dashboard project** (`D:\scripts\HLVN\HLVN-dashboard`):
- Frontend-only Next.js 15 application
- UI pages, components, forms, tables, charts
- Calls external backend API
- No `app/api/*` routes
- No Supabase client imports
- No OpenRouter integration
- No database migrations

**Backend project** (`D:\scripts\HLVN\HLVN-serverless`):
- All API endpoints
- Supabase Auth/PostgreSQL/Storage/RLS
- OpenRouter integration
- Business logic and data persistence

---

## DEPENDENCY GRAPH

### Phase 1-3: Foundation & Features (TIP-001 to TIP-006)
```
Week 1: Foundation
┌─────────────────────────────────────────────────────────────┐
│ TIP-001: Project Setup + Design System                     │
│ (Next.js 15, Tailwind, shadcn/ui, tokens, shell)           │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ TIP-002: Backend API Client + Auth Flow                    │
│ (fetch wrapper, token storage, login page, admin gate)     │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
Week 2: Feature UI
┌─────────────────────────────────────────────────────────────┐
│ TIP-003: Users Management UI                                │
│ (table, search, filter, create/edit/delete dialogs)        │
└─────────────────────────────────────────────────────────────┘
                          │
                ┌─────────┴─────────┐
                ▼                   ▼
┌───────────────────────┐  ┌───────────────────────┐
│ TIP-004: Scans UI     │  │ TIP-005: Analytics UI │
│ (table, filters,      │  │ (KPIs, charts,        │
│  detail, export)      │  │  top tables)          │
└───────────────────────┘  └───────────────────────┘
                │                   │
                └─────────┬─────────┘
                          ▼
Week 3: Polish + Testing
┌─────────────────────────────────────────────────────────────┐
│ TIP-006: Loading/Empty/Error States + A11y + Tests         │
│ (skeletons, empty states, toasts, focus, ARIA, tests)      │
└─────────────────────────────────────────────────────────────┘
```

### Phase 4: UI Polish (TIP-007 to TIP-012)
```
┌─────────────────────────────────────────────────────────────┐
│ TIP-007: Global Design System (CSS tokens, shadows, transitions) │
└─────────────────────────────────────────────────────────────┘
                │                    │
    ┌───────────┴────────┐          │
    ▼                    ▼          ▼
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│ TIP-008:       │ │ TIP-009:       │ │ TIP-010:       │
│ KPI Cards +    │ │ Tables         │ │ Headers +      │
│ Charts         │ │ Enhancement    │ │ Navigation     │
└────────────────┘ └────────────────┘ └────────────────┘
                          │                    │
                          ▼                    │
                   ┌────────────────┐          │
                   │ TIP-011:       │          │
                   │ Empty States + │          │
                   │ Micro-interactions          │
                   └────────────────┘          │
                          │                    │
                          ▼                    ▼
                   ┌──────────────────────────────────────┐
                   │ TIP-012: Responsive + Mobile          │
                   └──────────────────────────────────────┘
```

### Phase 5: Complete UI Redesign (TIP-013 to TIP-020)
```
Based on design reference: coding-packs/design/hlvn-dashboard/

┌─────────────────────────────────────────────────────────────┐
│ TIP-013: Redesign Foundation (globals.css tokens)          │
│ Extract design tokens from reference index.css             │
└─────────────────────────────────────────────────────────────┘
                          │
                ┌─────────┴─────────┐
                ▼                   ▼
┌───────────────────────┐  ┌───────────────────────┐
│ TIP-014: Login Page   │  │ TIP-015: Dashboard    │
│ Redesign              │  │ Shell (Sidebar+Header)│
└───────────────────────┘  └───────────────────────┘
                                      │
                ┌─────────────────────┼─────────────────────┐
                ▼                     ▼                     ▼
┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐
│ TIP-016: Overview │  │ TIP-017: Users    │  │ TIP-018: Scans    │
│ Dashboard Page    │  │ Management Page   │  │ History Page      │
│ (Dashboard.tsx)   │  │ (Users.tsx)       │  │ (History.tsx)     │
└───────────────────┘  └───────────────────┘  └───────────────────┘
                │                     │                     │
                └─────────────────────┼─────────────────────┘
                                      ▼
                          ┌───────────────────────┐
                          │ TIP-019: Analytics    │
                          │ Page Redesign         │
                          │ (Analytics.tsx)       │
                          └───────────────────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │ TIP-020: Responsive + │
                          │ Visual QA Pass        │
                          └───────────────────────┘
```
---

## TIP SUMMARY TABLE

### Phase 1-3: Original Features

| TIP | Name | Depends On | Priority | Est. Hours | Week | Status |
|-----|------|-----------|----------|-----------|------|--------|
| TIP-001 | Project Setup + Design System | — | P0 | 6h | 1 | ✅ Done |
| TIP-002 | Backend API Client + Auth Flow | TIP-001 | P0 | 8h | 1 | ✅ Done |
| TIP-003 | Users Management UI | TIP-002 | P0 | 10h | 2 | ✅ Done |
| TIP-004 | Scans History UI | TIP-002 | P0 | 12h | 2 | ✅ Done |
| TIP-005 | Analytics Dashboard UI | TIP-002 | P0 | 10h | 2 | ✅ Done |
| TIP-006 | UI Polish + A11y + Tests | TIP-003, TIP-004, TIP-005 | P0 | 10h | 3 | ✅ Done |

### Phase 4: UI Polish (New)

| TIP | Name | Depends On | Priority | Est. Hours | Week | Status |
|-----|------|-----------|----------|-----------|------|--------|
| TIP-007 | Global Design System | — | P0 | 4h | 4 | 📋 New |
| TIP-008 | KPI Cards + Visualization | TIP-007 | P0 | 4h | 4 | 📋 New |
| TIP-009 | Tables Enhancement | TIP-007 | P0 | 4h | 4 | 📋 New |
| TIP-010 | Page Headers + Navigation | TIP-007 | P1 | 2h | 4 | 📋 New |
| TIP-011 | Empty States + Micro-interactions | TIP-007, TIP-009 | P1 | 2h | 4 | 📋 New |
| TIP-012 | Responsive + Mobile | TIP-007, TIP-009, TIP-010 | P2 | 4h | 4 | ✅ Done |

### Phase 5: Product-Grade Redesign

| TIP | Name | Depends On | Priority | Est. Hours | Week | Status |
|-----|------|-----------|----------|-----------|------|--------|
| TIP-013 | Redesign Foundation | TIP-001..TIP-012 | P0 | 6h | 5 | 📋 New |
| TIP-014 | Login + Auth UX Redesign | TIP-013 | P0 | 4h | 5 | 📋 New |
| TIP-015 | Dashboard Shell Redesign | TIP-013 | P0 | 5h | 5 | 📋 New |
| TIP-016 | Overview Dashboard Redesign | TIP-015 | P0 | 6h | 5 | 📋 New |
| TIP-017 | Users Management Redesign | TIP-015 | P0 | 6h | 5 | 📋 New |
| TIP-018 | Scans Management Redesign | TIP-015 | P0 | 8h | 5 | 📋 New |
| TIP-019 | Analytics Redesign | TIP-015, TIP-016 | P0 | 6h | 5 | 📋 New |
| TIP-020 | Responsive + Visual QA Redesign Pass | TIP-014, TIP-015, TIP-016, TIP-017, TIP-018, TIP-019 | P0 | 5h | 5 | 📋 New |

**Total estimated effort**: 110 hours (~13.75 days for 1 developer)

---

## PARALLELIZATION OPPORTUNITIES

### Week 1
- TIP-001 and TIP-002 must run sequentially (foundation dependencies).

### Week 2
- **TIP-003, TIP-004, TIP-005 can run in parallel** after TIP-002 completes.
- All three depend on TIP-002 (API client) but are independent of each other.
- If 3 developers available: assign one TIP per developer.
- If 2 developers: assign TIP-003 to Dev A, TIP-004+005 to Dev B.

### Week 3
- TIP-006 depends on all feature UI TIPs complete.
- Must run after Week 2.

**Optimal parallelization**: 3 developers can complete Week 2 in ~12 hours instead of 32 hours.

---

## CRITICAL PATH

```
TIP-001 → TIP-002 → TIP-004 → TIP-006
```

**Critical path duration**: 46 hours (~6 days)

**Why TIP-004 (Scans) is on critical path**:
- TIP-004 (Scans) is 12h vs TIP-003 (Users) 10h and TIP-005 (Analytics) 10h.
- TIP-006 depends on all three, so the longest one determines the critical path.

---

## TEAM ALLOCATION (if applicable)

### Single Developer (7 days)
- Follow TIP order sequentially.
- Week 2: complete TIP-003, then TIP-004, then TIP-005.

### Two Developers (5 days)
- **Dev A (Users + Analytics)**:
  - Week 1: TIP-001 (setup)
  - Week 2: TIP-003 (Users UI), TIP-005 (Analytics UI)
  - Week 3: TIP-006 (polish, help with tests)
  
- **Dev B (Auth + Scans)**:
  - Week 1: TIP-002 (API client + auth)
  - Week 2: TIP-004 (Scans UI)
  - Week 3: TIP-006 (polish, tests)

**Coordination points**:
- End of Week 1: Dev A needs TIP-002 complete before starting UI.
- End of Week 2: Both devs sync before TIP-006.

---

## RISK MITIGATION

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Backend API not ready** | HIGH | Define API contract early; use mock API server for frontend dev |
| **Backend API contract changes** | MEDIUM | Version API endpoints; use TypeScript types generated from OpenAPI spec |
| **Excel export memory issues** | MEDIUM | Stream large exports in TIP-004; test with 1000+ scans |
| **CORS issues with backend** | MEDIUM | Configure CORS in backend; test cross-origin requests early |
| **Token refresh race conditions** | MEDIUM | Implement token refresh queue in TIP-002; test concurrent requests |
| **Performance budget exceeded** | LOW | Monitor bundle size in TIP-001; lazy load charts in TIP-005 |

---

## MILESTONE CHECKPOINTS

### Milestone 1: Foundation Complete (End of Week 1)
- [ ] Next.js app runs locally
- [ ] Design system tokens configured
- [ ] Backend API client wrapper implemented
- [ ] Admin login works and stores token
- [ ] Dashboard shell renders after login

### Milestone 2: Feature UI Complete (End of Week 2)
- [ ] Users page: table, search, filter, CRUD dialogs work
- [ ] Scans page: table, search, filter, detail dialog, export work
- [ ] Analytics page: KPIs, charts, top tables render
- [ ] All pages call backend API correctly
- [ ] Error handling shows user-friendly messages

### Milestone 3: MVP Ready (End of Week 3)
- [ ] All loading/empty/error states implemented
- [ ] Accessibility checklist passed
- [ ] Component tests cover critical UI
- [ ] Manual QA checklist passed
- [ ] Ready for staging deploy

---

## DEFERRED TO PHASE 2

| Feature | Reason | Estimated Effort |
|---------|--------|------------------|
| Password reset UI | Backend handles reset flow | 3h |
| Advanced analytics filters | Basic filters sufficient for MVP | 4h |
| Bulk user operations UI | Manual CRUD sufficient for MVP | 4h |
| Notifications UI | Not P0 for MVP | 6h |
| Responsive design (tablet/mobile) | Desktop-first per Vision | 10h |
| E2E tests (Playwright) | Component tests sufficient for MVP | 8h |
| Real-time updates UI | Manual refresh sufficient for MVP | 4h |
| i18n toggle (EN/VI) | Vietnamese-only per Vision | 6h |
| Dark mode | Not P0 for MVP | 8h |

**Total Phase 2 effort**: 53 hours (~6.5 days)

---

## QUALITY GATE: Task Graph Self-Review

- [x] Dependency graph shows clear sequential and parallel paths
- [x] TIP summary table includes all 6 TIPs with dependencies, priorities, estimates, and weeks
- [x] Parallelization opportunities identified (TIP-003, TIP-004, TIP-005 in Week 2)
- [x] Critical path identified (46 hours, 6 days)
- [x] Team allocation provided for 1 and 2 developers
- [x] Risk mitigation table covers frontend-specific risks
- [x] Milestone checkpoints defined for each week
- [x] Deferred features listed with effort estimates
- [x] Total effort estimate realistic (56 hours = 7 days for 1 dev)
- [x] Scope clarification explicit (frontend-only, no backend implementation)

**Verdict**: PASSED — Task Graph complete for frontend-only scope, ready for TIP generation.

---

*Task Graph revised: 2026-05-08 | Framework: Vibecode Kit v5.0 | Project: HLVN Dashboard (Frontend-Only)*
