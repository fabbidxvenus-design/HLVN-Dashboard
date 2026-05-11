# TIP-009: Loading/Empty/Error States + A11y

## HEADER
- **TIP-ID**: TIP-009
- **Project**: HLVN Dashboard
- **Module**: UI/UX Polish + Accessibility
- **Priority**: P0
- **Depends on**: TIP-008
- **Estimated**: M (8 hours)

## CONTEXT
- **Working dir**: `D:\scripts\HLVN\HLVN-dashboard`
- **Tech stack**: Next.js 15, shadcn/ui, Sonner, Tailwind CSS, Lucide React
- **Key files to read first**:
  - `coding-packs/design/design-brief.md` — accessibility requirements
  - `coding-packs/BUILDER-HANDOFF.md` — non-functional requirements
  - `coding-packs/01-REQUIREMENTS-MATRIX.md` REQ-UI-*
- **Patterns to follow**: Skeleton loaders for async content, empty states with actionable guidance, error states with retry, WCAG AA compliance.

## APPLICABLE STANDARDS
None directly; this TIP enforces design brief accessibility and UX requirements.

## TASK
Add loading skeletons, empty states, error states, and accessibility improvements across all dashboard pages. Ensure 44px touch targets, focus rings, ARIA labels, keyboard navigation, and WCAG AA color contrast.

## SPECIFICATIONS

### Business Rules
1. All async data fetches must show loading state.
2. All empty data scenarios must show friendly Vietnamese empty state.
3. All API errors must show error state with retry button.
4. All interactive elements must meet 44px minimum touch target.
5. All icon-only buttons must have ARIA labels.
6. All form inputs must have visible labels or ARIA labels.
7. Focus rings must be visible (2px blue).
8. Color contrast must meet WCAG AA (4.5:1 for text).

### Files to Create/Modify
- `components/dashboard/LoadingState.tsx`
- `components/dashboard/EmptyState.tsx`
- `components/dashboard/ErrorState.tsx`
- `components/dashboard/SkeletonKpiCard.tsx`
- `components/dashboard/SkeletonTable.tsx`
- `components/dashboard/SkeletonChart.tsx`
- Update all page components to use loading/empty/error states:
  - `app/(dashboard)/page.tsx`
  - `app/(dashboard)/users/page.tsx`
  - `app/(dashboard)/scans/page.tsx`
  - `app/(dashboard)/analytics/page.tsx`
- Update all interactive components for accessibility:
  - `components/dashboard/AppSidebar.tsx`
  - `components/dashboard/DashboardHeader.tsx`
  - `components/users/*`
  - `components/scans/*`
  - `components/analytics/*`
- `app/globals.css` — ensure focus ring styles

### Loading States

**SkeletonKpiCard**
- Animated pulse.
- Same dimensions as real KPI card.
- Gray background matching design tokens.

**SkeletonTable**
- Header row skeleton.
- 5-10 body row skeletons.
- Column widths approximate real table.

**SkeletonChart**
- Rectangular placeholder with pulse.
- Same height as real chart.

**Button Loading**
- Spinner icon inside button.
- Button disabled during loading.
- Text changes to "Đang xử lý..." or similar.

### Empty States

**No Users**
- Icon: UserX from Lucide.
- Message: "Chưa có người dùng nào".
- Action: "Tạo người dùng đầu tiên" button.

**No Scans**
- Icon: FileSearch from Lucide.
- Message: "Chưa có scan nào".
- Subtext: "Scan sẽ xuất hiện khi người dùng sử dụng mobile app."

**No Search Results**
- Icon: Search from Lucide.
- Message: "Không tìm thấy kết quả".
- Subtext: "Thử tìm kiếm với từ khóa khác."

**No Analytics Data**
- Icon: BarChart from Lucide.
- Message: "Chưa có dữ liệu phân tích".
- Subtext: "Dữ liệu sẽ xuất hiện sau khi có scan."

### Error States

**API Error**
- Icon: AlertCircle from Lucide.
- Message: "Không thể tải dữ liệu".
- Subtext: error message from API or generic fallback.
- Action: "Thử lại" button.

**Network Error**
- Icon: WifiOff from Lucide.
- Message: "Mất kết nối mạng".
- Action: "Thử lại" button.

**Permission Error (403)**
- Icon: ShieldAlert from Lucide.
- Message: "Bạn không có quyền truy cập".
- No retry button.

### Accessibility Improvements

**Focus Rings**
- All interactive elements must have visible focus ring.
- Use Tailwind `focus:ring-2 focus:ring-primary focus:ring-offset-2`.

**ARIA Labels**
- Icon-only buttons: `aria-label="Xóa người dùng"`.
- Search inputs: `aria-label="Tìm kiếm"`.
- Dialogs: `role="dialog"` and `aria-labelledby`.
- Tables: proper `<thead>`, `<tbody>`, `<th scope="col">`.

**Keyboard Navigation**
- Sidebar links: keyboard navigable.
- Dialogs: focus trap (Radix UI handles this).
- Tables: row actions keyboard accessible.
- Forms: tab order logical.

**Touch Targets**
- All buttons: min 44px height.
- All clickable icons: min 44px × 44px.
- Table row actions: adequate spacing.

**Color Contrast**
- Text on background: verify WCAG AA.
- Button text on primary: verify contrast.
- Disabled state: lower contrast acceptable but still readable.

### Validation
- Run axe DevTools or similar accessibility audit.
- Manually test keyboard navigation on all pages.
- Verify focus rings visible on all interactive elements.
- Verify empty/error states render correctly when data is missing/fails.

### Error Handling
- Loading states must not block UI indefinitely; timeout after reasonable duration and show error.
- Retry button must clear error state and re-fetch.

## ACCEPTANCE CRITERIA
- Given users API loading When page renders Then skeleton table shows.
- Given users API returns empty array When page renders Then "Chưa có người dùng nào" empty state shows.
- Given users API fails When page renders Then error state with "Thử lại" button shows.
- Given "Thử lại" clicked When API succeeds Then error state clears and data renders.
- Given keyboard navigation When tabbing through sidebar Then focus ring is visible on each link.
- Given icon-only delete button When inspected Then `aria-label` is present.
- Given form input When inspected Then visible label or `aria-label` is present.
- Given button When measured Then height is >= 44px.
- Given text on primary button When contrast checked Then ratio is >= 4.5:1.

## CONSTRAINTS
### DO NOT
- Do NOT add dark mode (Phase 3).
- DO NOT add responsive breakpoints (desktop-first).
- DO NOT add animations beyond simple pulse/fade.
- DO NOT implement screen reader testing beyond ARIA labels.

### REUSE
- Reuse Lucide React icons.
- Reuse shadcn/ui components (already accessible).
- Reuse Tailwind focus utilities.

### SKIP
- Skip E2E accessibility tests (TIP-010 covers unit/component tests).
- Skip advanced ARIA patterns (live regions, complex widgets).
- Skip internationalization beyond Vietnamese.

## QUALITY GATE: TIP Self-Review
- [x] TIP covers loading, empty, error states for all pages.
- [x] Accessibility requirements from design brief are addressed.
- [x] Covers REQ-UI-011 through REQ-UI-014.
- [x] Acceptance criteria are testable.

**Verdict**: PASSED — ready after TIP-008.
