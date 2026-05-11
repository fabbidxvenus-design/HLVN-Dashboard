# TIP-007: Global Design System Polish

## HEADER
- TIP-ID: TIP-007
- Project: HLVN Dashboard
- Module: Design System
- Priority: P0
- Depends on: none
- Estimated: M (4h)

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Tech stack: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- Key files to read first: `app/globals.css`, `components/dashboard/*`, `coding-packs/design/design-brief.md`
- Patterns to follow: shadcn/ui default tokens, design brief color palette

## TASK
Polish global CSS design system - ensure all design tokens match design brief exactly (colors, typography, shadows, spacing). Add hover/focus CSS states globally.

## SPECIFICATIONS

### 1. CSS Variables Enhancement
Add design system tokens from design brief:

```css
/* Shadows (from design spec) */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);

/* Transitions */
--transition-fast: 150ms ease-out;
--transition-normal: 300ms ease-out;

/* Border radius */
--radius-sm: 4px;
--radius: 6px;
--radius-lg: 8px;
```

### 2. Global Hover/Focus States
Add CSS for:
- Button hover: subtle darken + scale(0.98) on active
- Table row hover: bg-[var(--surface)] transition
- Focus ring: 2px ring var(--primary-light) for buttons, inputs

### 3. Typography Enhancement
- Ensure Inter font loaded from Google Fonts
- Add `--font-mono` for code/data display

## ACCEPTANCE CRITERIA
- Given globals.css, all design tokens from brief should exist
- Given any button, hover state should show subtle transition
- Given any table row, hover should show bg-[var(--surface)]
- Given any input, focus should show ring effect
- Given font-family, Inter should be applied

## CONSTRAINTS
- DO NOT: Change structural layout (sidebar/header/content)
- REUSE: Keep existing CSS variable names (--primary, --border, etc.)
- SKIP: Responsive breakpoints (separate TIP)