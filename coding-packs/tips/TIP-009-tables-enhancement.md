# TIP-009: Tables Enhancement

## HEADER
- TIP-ID: TIP-009
- Project: HLVN Dashboard
- Module: Components / Tables
- Priority: P0
- Depends on: TIP-007
- Estimated: M (4h)

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Tech stack: Next.js 15, TypeScript, Tailwind CSS, TanStack Table
- Key files to read first: `components/users/UsersTable.tsx`, `components/scans/ScansTable.tsx`
- Patterns to follow: design brief table specs (48px row height, 16px cell padding, border bottom)

## TASK
Polish all tables (UsersTable, ScansTable) to match design spec - proper row heights, cell padding, hover effects, shadow on container, smooth transitions.

## SPECIFICATIONS

### 1. Table Container
- Add rounded-lg border + shadow-sm
- Add overflow-hidden
- Background: white

### 2. Table Header
- Background: var(--surface)
- Font: 14px semibold
- Text color: var(--text-primary)
- Cell padding: 12px 16px

### 3. Table Rows
- Height: 48px
- Cell padding: 12px 16px
- Border bottom: 1px solid var(--border)
- Hover: bg-[var(--surface)] with 150ms transition

### 4. Action Buttons
- Icon size: 16px
- Button size: 32px (44px touch target with padding)
- Add aria-label for screen reader
- Hover: subtle bg change

### 5. ScansTable Specific
- Thumbnail column: 64px width fixed
- Product column: flex-1 min-width
- Time column: 150px width
- Actions column: 100px width

## ACCEPTANCE CRITERIA
- Given UsersTable, row height should be 48px
- Given ScansTable, thumbnail column should be 64px fixed
- Given table container, should have rounded border + shadow
- Given table row, hover should show bg-[var(--surface)] transition
- Given action buttons, should have 44px touch target minimum

## CONSTRAINTS
- DO NOT: Change table structure or columns
- DO NOT: Remove sorting/pagination functionality
- REUSE: existing TanStack Table implementation
- SKIP: Full pagination redesign (keep current UI)