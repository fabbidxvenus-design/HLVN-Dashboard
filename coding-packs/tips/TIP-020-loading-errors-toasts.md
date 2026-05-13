# TIP-020: Loading States + Error Boundaries + Toasts

## HEADER
- TIP-ID: TIP-020
- Project: HLVN Dashboard
- Module: polish
- Priority: P2
- Depends on: All page TIPs (007-019)
- Estimated: M (3h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + TypeScript strict + sonner
- Key files to read first: src/components/ui/skeleton.tsx, all page files
- Patterns to follow: Skeleton from TIP-006, sonner toast library

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Add loading skeleton screens to all pages, implement React error boundaries for graceful error handling, and ensure toast notifications are properly configured for all CRUD actions.

## SPECIFICATIONS

### Files to Create

1. `src/components/ui/error-boundary.tsx` — React Error Boundary:
   - Catches render errors in child components
   - Shows friendly error message with retry button
   - Logs error details to console
   - Card-style error display

2. `src/components/dashboard/DashboardSkeleton.tsx` — Dashboard loading:
   - 4 skeleton KPI cards in grid
   - Skeleton chart area
   - Skeleton table rows

3. `src/components/scans/ScansSkeleton.tsx` — Scans loading:
   - Skeleton filter bar
   - Skeleton table with 5 rows

4. `src/components/users/UsersSkeleton.tsx` — Users loading:
   - Skeleton filter bar
   - Skeleton table with 5 rows

5. `src/components/analytics/AnalyticsSkeleton.tsx` — Analytics loading:
   - Skeleton date picker
   - Skeleton chart area
   - Skeleton table

### Files to Modify

6. `src/App.tsx` — Wrap routes with ErrorBoundary

7. `src/pages/DashboardPage.tsx` — Add skeleton while loading

8. `src/pages/ScansPage.tsx` — Add skeleton while loading

9. `src/pages/UsersPage.tsx` — Add skeleton while loading

10. `src/pages/AnalyticsPage.tsx` — Add skeleton while loading

11. `src/main.tsx` — Configure sonner Toaster:
    - Position: top-right
    - Theme: light
    - Duration: 3 seconds default

### Business Rules
1. Every page MUST show skeleton while initial data loads
2. Error boundary MUST catch and display errors gracefully
3. All CRUD actions MUST show toast on success/error
4. Skeletons MUST match the layout of actual content
5. Toast messages in Vietnamese

### Toast Messages
- Create success: "Đã tạo thành công"
- Update success: "Đã cập nhật thành công"
- Delete success: "Đã xóa thành công"
- Error: "Có lỗi xảy ra: {error message}"

## ACCEPTANCE CRITERIA
- Given any page When data is loading Then skeleton screen shows
- Given component error When render fails Then error boundary shows friendly message
- Given CRUD action When successful Then toast shows success message
- Given CRUD action When failed Then toast shows error message
- Given error boundary When clicking retry Then page reloads/refetches

## CONSTRAINTS
- DO NOT: Add complex retry logic (simple refetch on retry)
- DO NOT: Change existing component logic — only add loading/error wrappers
- REUSE: Skeleton from TIP-006, sonner for toasts
- SKIP: Offline detection, complex error recovery
