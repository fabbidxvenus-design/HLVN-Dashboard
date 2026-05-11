# Phase 05 — UI Polish + A11y + Tests

> zflow plan-supervised mode: skips RRI/SDD/PROPOSAL
> Source: `TIP-006`
> Blocked by: Phase 04 (TIP-005)

## Overview

Polish all UI states (loading skeletons, empty states, error states with retry), enforce accessibility compliance (WCAG AA, keyboard nav, ARIA labels), and implement component/utility tests with 80%+ coverage. Configure vitest.

## Dependencies
- Phase 01: Project setup, types
- Phase 02: Users UI components
- Phase 03: Scans UI components
- Phase 04: Analytics UI components

## Requirements

### Loading States (Polishing)
1. KPI skeleton cards (matching KpiCard dimensions: 120px height)
2. Chart skeleton containers
3. Table skeleton rows (users/scans)
4. Login submit button spinner
5. Export button loading state

### Empty States
1. No users found — `Không tìm thấy người dùng nào.`
2. No scans found — `Không tìm thấy bản ghi scan nào.`
3. No analytics data for selected range — `Không có dữ liệu cho khoảng thời gian này.`
4. No search results — `Không có kết quả phù hợp.`

### Error States
1. Inline error card with retry button for tables and charts
2. Sonner toast for API failures
3. Network error: `Không thể kết nối đến máy chủ. Vui lòng thử lại.`
4. Auth error: `Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.`

### Accessibility
1. 44px minimum interactive target
2. Visible focus rings (2px blue)
3. ARIA labels on icon-only actions
4. Proper table headers with `scope` attributes
5. Dialog focus trap via Radix UI (already used in shadcn/ui)
6. Color contrast WCAG AA (4.5:1 for text)
7. Keyboard navigation through tables, filters, dialogs
8. Screen reader labels on KPI values

### Testing
1. Configure `vitest.config.ts`
2. Configure `@testing-library/react`
3. Unit tests for utilities: `formatNumber`, `formatCurrency`, `formatPercent`, `formatCompactDate`
4. Unit tests for `lib/api/client.ts` (mock mode, bearer token, error parsing)
5. Unit tests for `lib/auth/token-store.ts`
6. Component tests for:
   - KpiCard (default, tone variants, skeleton state)
   - Chart empty state
   - Table loading/empty/error states
   - Dialog open/close behavior
7. 80%+ line coverage

## File Ownership (non-overlapping)

| Files | Owner |
|-------|-------|
| `components/dashboard/LoadingState.tsx`, `components/dashboard/EmptyState.tsx`, `components/dashboard/ErrorState.tsx`, `tests/**/*`, `vitest.config.ts` | TIP-006 |

## Acceptance Criteria (from source TIP)

- [ ] All KPI cards render skeleton while loading
- [ ] Charts show empty state when no data
- [ ] Tables show skeleton rows while loading
- [ ] Empty states display Vietnamese messages
- [ ] Error states show retry button that works
- [ ] All interactive targets ≥44px
- [ ] Focus rings visible on all interactive elements
- [ ] All icon-only actions have ARIA labels
- [ ] Tables have proper headers with `scope`
- [ ] Keyboard navigation works through all flows
- [ ] `pnpm test` runs with 80%+ coverage
- [ ] `pnpm tsc --noEmit` passes
