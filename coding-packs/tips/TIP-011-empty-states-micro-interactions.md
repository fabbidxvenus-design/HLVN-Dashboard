# TIP-011: Empty States & Micro-interactions Polish

## HEADER
- TIP-ID: TIP-011
- Project: HLVN Dashboard
- Module: States / UX
- Priority: P1
- Depends on: TIP-007, TIP-009
- Estimated: S (2h)

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Tech stack: Next.js 15, TypeScript, Tailwind CSS
- Key files to read first: `components/analytics/TopProductsTable.tsx`, `components/analytics/TopUsersTable.tsx`, `components/analytics/ApiUsageTable.tsx`, `components/scans/ScansTable.tsx`, `components/users/UsersTable.tsx`
- Patterns to follow: shadcn/ui sonner for toasts, design brief empty state guidance

## TASK
Polish all empty states with proper icon + message + action layout. Add micro-interactions for buttons (press effect), hover states on interactive elements, smooth transitions.

## SPECIFICATIONS

### 1. Empty States Component
Create reusable EmptyState component:
```tsx
interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: ReactNode
}
```

Style:
- Center aligned
- Icon: 48px, muted color
- Title: 16px semibold
- Description: 14px muted
- Action button below

### 2. Apply EmptyState to:
- TopProductsTable: "Chưa có sản phẩm nào"
- TopUsersTable: "Chưa có người dùng nào"
- ApiUsageTable: "Chưa có dữ liệu API"
- ScansTable: "Chưa có scan nào"
- UsersTable: "Chưa có người dùng nào"

### 3. Micro-interactions
- Button press: scale(0.98) on active
- Table row hover: subtle bg change
- Dialog open: fade in + scale from 95%
- Toast: slide in from top-right

### 4. Transitions
- Default: 150ms ease-out
- Dialog: 300ms ease-out
- Toast: 300ms ease-out

## ACCEPTANCE CRITERIA
- Given TopProductsTable empty, icon + message should display centered
- Given TopUsersTable empty, should match TopProductsTable style
- Given ApiUsageTable empty, should match style
- Given button click, press effect should be visible
- Given dialog open, smooth animation should play

## CONSTRAINTS
- DO NOT: Change data fetching logic
- REUSE: existing empty state messages (translate if needed)
- SKIP: Full animation library (use CSS transitions only)
- SKIP: Skeleton refinements (covered in TIP-007)