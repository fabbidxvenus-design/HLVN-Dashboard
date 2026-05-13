# HLVN Dashboard — Task Graph

> Vibecode Kit v5.0 — BƯỚC 5 (TASK GRAPH)
> 20 TIPs across 5 weeks.
> Design source: `coding-packs/designs/stitch_hlvn_dashboard_redesign_v5/`
> Unique screens: ~10 (from 34 design variants)

---

## DEPENDENCY GRAPH

```
TIP-001 (Scaffold)
  │
  ├── TIP-002 (Design Tokens)
  │     │
  │     └── TIP-003 (Layout Shell)
  │           │
  │           ├── TIP-004 (Auth + Login)
  │           │     │
  │           │     └── TIP-005 (Protected Routes)
  │           │           │
  │           │           ├── TIP-007 (KPI Cards + Grid)
  │           │           │     │
  │           │           │     └── TIP-008 (Dashboard Charts + Tables)
  │           │           │           │
  │           │           │           └── TIP-018 (Realtime KPI)
  │           │           │
  │           │           ├── TIP-009 (Scans Table + Filters)
  │           │           │     │
  │           │           │     ├── TIP-010 (Scan Detail Dialog)
  │           │           │     │     │
  │           │           │     │     └── TIP-022 (Scan Detail OCR Field Classification)
  │           │           │     │
  │           │           │     └── TIP-011 (Scan Delete + Actions)
  │           │           │           │
  │           │           │           └── TIP-017 (Export CSV + Excel)
  │           │           │
  │           │           ├── TIP-012 (Users Table + Filters)
  │           │           │     │
  │           │           │     ├── TIP-013 (Create User Dialog)
  │           │           │     │
  │           │           │     └── TIP-014 (Edit Role + Delete User)
  │           │           │
  │           │           ├── TIP-015 (Analytics Date Picker + Charts)
  │           │           │     │
  │           │           │     └── TIP-016 (Analytics API Usage Table)
  │           │           │
  │           │           ├── TIP-019 (Realtime Scan List)
  │           │           │
  │           │           └── TIP-021 (Realtime Admin Notifications)
  │           │
  │           └── TIP-006 (UI Primitives)
  │                 │
  │                 ├── TIP-007, TIP-008
  │                 ├── TIP-009, TIP-010, TIP-011
  │                 ├── TIP-012, TIP-013, TIP-014
  │                 └── TIP-015, TIP-016
  │
  └── TIP-020 (Loading States + Error Boundaries + Toasts)
```

---

## TIP SUMMARY TABLE

| TIP | Name | Depends On | Priority | Est. Hours | Week |
|-----|------|-----------|----------|-----------|------|
| TIP-001 | Project Scaffold (Vite + React + Tailwind + shadcn/ui) | — | P0 | 2h | 1 |
| TIP-002 | Design Tokens + Global Styles (CSS vars, fonts, Tailwind config) | TIP-001 | P0 | 2h | 1 |
| TIP-003 | Layout Shell (Sidebar + Header + Router) | TIP-002 | P0 | 3h | 1 |
| TIP-004 | Supabase Auth + Login Page | TIP-003 | P0 | 3h | 2 |
| TIP-005 | Protected Routes + Role Guard + Auth Hooks | TIP-004 | P0 | 2h | 2 |
| TIP-006 | UI Primitives (Button, Card, Input, Badge, Table, Dialog, Select) | TIP-003 | P0 | 3h | 2 |
| TIP-007 | KPI Cards + KPI Grid (Dashboard Overview pt.1) | TIP-005, TIP-006 | P0 | 2h | 3 |
| TIP-008 | Dashboard Charts + Top Tables (Dashboard Overview pt.2) | TIP-007 | P0 | 3h | 3 |
| TIP-009 | Scans Table + Filters (Scans Page pt.1) | TIP-005, TIP-006 | P0 | 3h | 3 |
| TIP-010 | Scan Detail Dialog (Scans Page pt.2) | TIP-009 | P0 | 2h | 3 |
| TIP-011 | Scan Delete + Actions (Scans Page pt.3) | TIP-009 | P1 | 2h | 4 |
| TIP-012 | Users Table + Filters (Users Page pt.1) | TIP-005, TIP-006 | P0 | 3h | 4 |
| TIP-013 | Create User Dialog (Users Page pt.2) | TIP-012 | P0 | 2h | 4 |
| TIP-014 | Edit Role + Delete User Dialogs (Users Page pt.3) | TIP-012 | P1 | 2h | 4 |
| TIP-015 | Analytics Date Picker + Charts (Analytics pt.1) | TIP-005, TIP-006 | P0 | 3h | 4 |
| TIP-016 | Analytics API Usage Table (Analytics pt.2) | TIP-015 | P1 | 2h | 5 |
| TIP-017 | Data Export (CSV client + Excel API) | TIP-011 | P1 | 2h | 5 |
| TIP-018 | Supabase Realtime KPI Updates | TIP-008 | P1 | 2h | 5 |
| TIP-019 | Supabase Realtime Scan List | TIP-009 | P1 | 2h | 5 |
| TIP-020 | Loading States + Error Boundaries + Toasts | All pages | P2 | 3h | 5 |
| TIP-021 | Realtime Admin Notifications | TIP-003, TIP-004, TIP-005, TIP-020 | P1 | 4h | 5 |
| TIP-022 | Scan Detail OCR Field Classification | TIP-010 | P1 | 2h | 5 |

**Total estimated: ~53 hours**

---

## DESIGN SCREEN MAPPING

| TIP | Design Screen (primary reference) |
|-----|----------------------------------|
| TIP-004 | `hlvn_admin_login_1` |
| TIP-003 | `hlvn_admin_dashboard_shell_1` |
| TIP-007, TIP-008 | `hlvn_dashboard_overview` |
| TIP-009 | `hlvn_l_ch_s_qu_t_scans_management_1` |
| TIP-010 | `hlvn_l_ch_s_qu_t_scans_management_2` (detail view) |
| TIP-011 | `hlvn_x_c_nh_n_x_a_modal` (delete confirm) |
| TIP-012 | `hlvn_qu_n_l_ng_i_d_ng_1440px_1` |
| TIP-013 | `hlvn_th_m_ng_i_d_ng_modal` (add user) |
| TIP-014 | `hlvn_qu_n_l_ng_i_d_ng_1440px_2` (edit/delete) |
| TIP-015, TIP-016 | `hlvn_analytics_ph_n_t_ch_1440px_1` |

---

## PARALLELIZATION OPPORTUNITIES

| Parallel Group | TIPs | Condition |
|---------------|------|-----------|
| Week 2 parallel | TIP-004 + TIP-006 | Both depend on TIP-003, independent |
| Week 3 parallel | TIP-007 + TIP-009 | Both depend on TIP-005 + TIP-006, independent |
| Week 3 parallel | TIP-008 + TIP-010 | TIP-008 needs TIP-007; TIP-010 needs TIP-009 |
| Week 4 parallel | TIP-011 + TIP-012 + TIP-015 | Independent page tracks |
| Week 4 parallel | TIP-013 + TIP-014 | Both need TIP-012 |
| Week 5 parallel | TIP-016 + TIP-017 + TIP-018 + TIP-019 + TIP-020 + TIP-021 + TIP-022 | Various deps |

---

## CRITICAL PATH

```
TIP-001 → TIP-002 → TIP-003 → TIP-004 → TIP-005 → TIP-007 → TIP-008 → TIP-018/020/021
```

Longest path: 8 TIPs sequential = ~22h on critical path.

---

## REQUIREMENTS COVERAGE

| TIP | REQs Covered |
|-----|-------------|
| TIP-001 | REQ-070, REQ-078 |
| TIP-002 | REQ-060, REQ-061, REQ-064 |
| TIP-003 | REQ-062, REQ-063, REQ-071 |
| TIP-004 | REQ-001, REQ-004, REQ-073 |
| TIP-005 | REQ-002, REQ-003, REQ-005 |
| TIP-006 | REQ-077 |
| TIP-007 | REQ-010 |
| TIP-008 | REQ-011, REQ-012, REQ-013 |
| TIP-009 | REQ-020, REQ-022, REQ-023 |
| TIP-010 | REQ-021 |
| TIP-022 | REQ-021 scan detail OCR field classification correction |
| TIP-011 | REQ-024 |
| TIP-012 | REQ-030 |
| TIP-013 | REQ-031 |
| TIP-014 | REQ-032, REQ-033, REQ-034 |
| TIP-015 | REQ-040, REQ-041 |
| TIP-016 | REQ-042, REQ-043 |
| TIP-017 | REQ-050, REQ-051 |
| TIP-018 | REQ-014 |
| TIP-019 | REQ-025 |
| TIP-020 | REQ-065, REQ-066 |
| TIP-021 | REQ-066 + admin in-app activity notification extension |

**Coverage: 33/33 baseline requirements mapped (100%); TIP-021 extends deferred in-app notification scope**

---

## Quality Gate

| Check | Status |
|-------|--------|
| All P0 REQs have TIPs | ✅ 15/15 P0 covered |
| Dependencies are acyclic | ✅ DAG verified |
| Critical path identified | ✅ 8 TIPs, ~22h |
| Parallelization documented | ✅ 6 parallel groups |
| Estimates reasonable | ✅ 51h total, max 4h/TIP |
| Cross-ref with RRI | ✅ 33/33 baseline REQs mapped; TIP-021 extension tracked |
| Design screens mapped | ✅ 10 unique screens → TIPs |
| TIP granularity | ✅ All TIPs ≤ 4h |
