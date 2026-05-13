# TIP-006: UI Primitives (shadcn/ui Components)

## HEADER
- TIP-ID: TIP-006
- Project: HLVN Dashboard
- Module: ui
- Priority: P0
- Depends on: TIP-003
- Estimated: M (3h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + Tailwind CSS v4 + shadcn/ui + CVA
- Key files to read first: coding-packs/designs/stitch_hlvn_dashboard_redesign_v5/stitch_hlvn_dashboard_redesign_v5/hlvn_dashboard_v5/DESIGN.md
- Patterns to follow: shadcn/ui CVA pattern with design tokens

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Create all reusable UI primitive components using shadcn/ui pattern (CVA variants) styled with Stitch design tokens. These components will be used across all pages.

## SPECIFICATIONS

### Files to Create

1. `src/components/ui/button.tsx` — Button with variants:
   - Variants: `filled` (primary), `tonal` (secondary-container), `outlined`, `text` (ghost), `destructive`
   - Sizes: `sm`, `default`, `lg`, `icon`
   - States: hover, focus, disabled, loading

2. `src/components/ui/card.tsx` — Card component:
   - Surface-container-lowest background (white)
   - 1px outline-variant border
   - rounded (8px)
   - CardHeader, CardTitle, CardDescription, CardContent, CardFooter

3. `src/components/ui/input.tsx` — Text input:
   - Filled style: surface-container background
   - Focus: primary border/ring
   - Error state: error border
   - With label support

4. `src/components/ui/badge.tsx` — Status badge:
   - Variants: `default`, `success`, `warning`, `error`, `outline`
   - Pill-shaped (rounded-full)
   - Small text (label font)

5. `src/components/ui/table.tsx` — Data table primitives:
   - Table, TableHeader, TableBody, TableRow, TableHead, TableCell
   - Header: surface-container-low background
   - Row hover: subtle state layer
   - Sortable header indicator

6. `src/components/ui/dialog.tsx` — Modal dialog:
   - Overlay: semi-transparent black
   - Content: surface-container-lowest, rounded-lg, shadow
   - DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter
   - Close button

7. `src/components/ui/select.tsx` — Select dropdown:
   - Filled style matching input
   - Dropdown with surface-container-lowest background
   - SelectTrigger, SelectContent, SelectItem

8. `src/components/ui/separator.tsx` — Divider line

9. `src/components/ui/skeleton.tsx` — Loading skeleton:
   - Animated pulse
   - Configurable width/height

10. `src/components/ui/avatar.tsx` — User avatar:
    - Circle with initials fallback
    - Sizes: sm, default, lg

### Design Reference
- DESIGN.md Component Standards section
- Cards: 8px radius, subtle shadow, 1px border
- Buttons: rounded-lg, clear hover/active states
- Badges: pill-shaped with semantic colors
- Tables: zebra striping optional, sortable headers

### Business Rules
1. All components MUST use design tokens (CSS variables) — no hardcoded colors
2. All components MUST use CVA (class-variance-authority) for variants
3. All interactive components MUST have hover, focus, and disabled states
4. All components MUST be accessible (proper ARIA attributes)
5. Typography: headlines use Manrope, body uses Inter, labels use Public Sans

### Validation
- `pnpm tsc --noEmit` passes
- All components render correctly in isolation
- Design tokens are properly applied

## ACCEPTANCE CRITERIA
- Given Button component When rendered with variant="filled" Then uses primary color
- Given Card component When rendered Then has white bg, 1px border, 8px radius
- Given Input component When focused Then shows primary-colored ring
- Given Badge component When variant="success" Then uses green/emerald tonal colors
- Given Table component When header rendered Then uses surface-container-low background
- Given Dialog component When open Then shows overlay + centered content card

## CONSTRAINTS
- DO NOT: Add business logic to UI components (pure presentational)
- DO NOT: Hardcode any colors — always use CSS variable tokens
- DO NOT: Skip accessibility (ARIA labels, keyboard navigation)
- REUSE: Design tokens from TIP-002, cn() utility from TIP-001
- SKIP: Complex animations, dark mode variants
