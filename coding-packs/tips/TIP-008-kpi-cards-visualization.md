# TIP-008: KPI Cards & Data Visualization Polish

## HEADER
- TIP-ID: TIP-008
- Project: HLVN Dashboard
- Module: Components / KPI
- Priority: P0
- Depends on: TIP-007
- Estimated: M (4h)

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Tech stack: Next.js 15, TypeScript, Tailwind CSS, Recharts
- Key files to read first: `components/analytics/KpiCard.tsx`, `components/analytics/KpiGrid.tsx`, `components/analytics/ScanVolumeChart.tsx`
- Patterns to follow: design brief component specs (120px height, 30px font, 14px labels)

## TASK
Polish KPI cards to match design brief specs (120px height, shadow, proper spacing). Enhance charts with better tooltips, grid lines, and color scheme.

## SPECIFICATIONS

### 1. KPI Card Spec (from design brief)
- Height: 120px
- Background: white
- Border: 1px solid var(--border)
- Border radius: 8px
- Padding: 16px
- Number: 30px bold
- Label: 14px muted
- Add subtle shadow: shadow-sm

Current issues to fix:
- Missing shadow
- Inconsistent padding

### 2. KpiGrid Enhancement
- Use grid-cols-2 md:grid-cols-4
- Add gap-4 between cards
- Ensure responsive at 768px (2 columns)

### 3. Chart Polish
- Add proper grid lines (dashed)
- Style tooltip with card-like appearance
- Use chart colors from design brief
- Add title and axis labels
- Ensure 300px height container

## ACCEPTANCE CRITERIA
- Given KpiCard, height should be 120px with shadow-sm
- Given KpiCard number, font should be 30px bold
- Given KpiCard label, text should be 14px text-muted
- Given ScanVolumeChart, container height should be 300px
- Given chart tooltip, should have card-like styling
- Given chart grid, should use dashed lines with border color

## CONSTRAINTS
- DO NOT: Change chart type (keep LineChart)
- DO NOT: Change data structure
- REUSE: existing Recharts components, Skeleton loading
- SKIP: Multiple chart types (single chart for MVP)