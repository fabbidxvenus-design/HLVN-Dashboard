# Phase-01: UI/UX Polish to Match Design Brief

> zflow plan-supervised mode — INTAKE phase
> Plan: update-design | Phase: phase-01-design-polish.md

---

## OVERVIEW

Polish HLVN-dashboard UI/UX to match design-brief.md exactly. Apply design tokens (colors, typography, spacing, shadows), enhance hover/focus states, polish tables, KPI cards, charts, and add micro-interactions.

**Source documents:**
- Design Brief: `D:\scripts\HLVN\HLVN-dashboard\coding-packs\design\design-brief.md`
- Design Review: `D:\scripts\HLVN\HLVN-dashboard\coding-packs\design\design-review.md`
- TIPs: `D:\scripts\HLVN\HLVN-dashboard\coding-packs\tips\TIP-007*.md` to `TIP-012*.md`

---

## COMPLEXITY SCORING (INTAKE)

| Axis | Score | Signals |
|------|-------|---------|
| Lexical | 15 | "polish", "enhance", "match design" — not simple add/fix |
| Structural | 20 | 6 TIPs, cross-file (globals.css, components, pages) |
| Impact | 15 | system-wide (multiple components, design tokens) |
| **Total** | **50** | → **STANDARD tier** |

**Override**: Plan mode minimum STANDARD. Confirmed.

---

## REQUIREMENTS TO IMPLEMENT

### TIP-007: Global Design System
- Add shadow tokens to globals.css
- Add transition tokens (150ms, 300ms)
- Add border-radius tokens (4px, 6px, 8px)
- Button hover: subtle darken + scale(0.98) on active
- Table row hover: bg-[var(--surface)] with transition
- Focus ring: 2px ring var(--primary-light)

### TIP-008: KPI Cards + Visualization
- KpiCard: 120px height, shadow-sm, 8px border-radius
- KPI numbers: 30px bold
- KPI labels: 14px text-muted
- Chart container: 300px height, rounded corners, proper grid lines
- Tooltip: card-like styling

### TIP-009: Tables Enhancement
- Table container: rounded-lg border + shadow-sm
- Table header: bg-[var(--surface)], semibold text
- Table rows: 48px height, 12px 16px padding, hover transition
- Action buttons: 44px touch target minimum

### TIP-010: Page Headers + Navigation
- Sidebar: shadow on edge, active item bg tint + left border
- Navigation: smooth hover transitions
- DashboardHeader: bottom border, 24px bold title
- Content area: consistent padding (24px or 32px)

### TIP-011: Empty States + Micro-interactions
- Reusable EmptyState component with icon + message + action
- Apply to: TopProductsTable, TopUsersTable, ApiUsageTable, ScansTable, UsersTable
- Button press: scale(0.98) on active
- Dialog: fade in + scale from 95%

### TIP-012: Responsive + Mobile
- Sidebar toggle for tablet/mobile
- KPI cards: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Table: horizontal scroll on mobile
- Hamburger menu on mobile

---

## TODO LIST

- [ ] Run `pnpm test:spec` for RED GATE (spec tests must FAIL first)
- [ ] Implement TIP-007: Global Design System
- [ ] Implement TIP-008: KPI Cards + Visualization
- [ ] Implement TIP-009: Tables Enhancement
- [ ] Implement TIP-010: Page Headers + Navigation
- [ ] Implement TIP-011: Empty States + Micro-interactions
- [ ] Implement TIP-012: Responsive + Mobile
- [ ] Run `pnpm test:spec` for GREEN GATE (all tests pass)
- [ ] Run `pnpm tsc --noEmit` — verify clean compile
- [ ] Screenshot all pages to verify visual output
- [ ] Update pipeline.json to COMPLETE

---

## ACCEPTANCE CRITERIA

1. All 6 TIPs implemented
2. 52+ spec tests pass (original + new UI polish tests)
3. tsc clean (no TypeScript errors)
4. Design tokens match design-brief.md exactly
5. Hover/focus states work on all interactive elements
6. Tables have proper shadows, hover effects, row heights
7. KPI cards match 120px height spec
8. Charts have proper styling (tooltip, grid, 300px height)
9. Sidebar has active state with bg tint + left border
10. Responsive breakpoints work (1440px, 1024px, 768px, <768px)
11. Empty states display with icon + message for all tables
12. Button micro-interactions (press effect) work
13. No console errors in browser

---

## EXECUTION ORDER

```
1. SPEC phase: Create/update spec tests for RED GATE
2. DECOMPOSE: Already done (TIP-007 to TIP-012 exist)
3. EXECUTE: Implement each TIP sequentially
4. VERIFY: Green Gate (tests pass + tsc + screenshot)
5. DESLOP: Clean up any temp files
6. REGRESS: Final verification
7. EVOLVE: Background agent dispatch
8. COMPLETE: Update pipeline.json
```

---

## NOTES

- Previous pipeline completed TIP-001 to TIP-006 (features done)
- This is new work: TIP-007 to TIP-012 (UI polish)
- Mock data remains active (NEXT_PUBLIC_USE_MOCK_API=true)
- Frontend-only scope unchanged (no backend routes)