# TIP-002: Design Tokens + Global Styles

## HEADER
- TIP-ID: TIP-002
- Project: HLVN Dashboard
- Module: design-tokens
- Priority: P0
- Depends on: TIP-001
- Estimated: S (2h)

## CONTEXT
- Working dir: D:\scripts\HLVN\HLVN-dashboard
- Tech stack: Vite 6 + React 19 + TypeScript strict + Tailwind CSS v4
- Key files to read first: coding-packs/designs/stitch_hlvn_dashboard_redesign_v5/stitch_hlvn_dashboard_redesign_v5/hlvn_dashboard_v5/DESIGN.md
- Patterns to follow: CSS custom properties + Tailwind v4 @theme inline

## APPLICABLE STANDARDS
None — standards directory not yet initialized.

## TASK
Implement the full MD3-inspired design token system from the Stitch DESIGN.md into `src/globals.css`. Configure Tailwind v4 to use these tokens. Set up typography scale, color palette, spacing, and border radius.

## SPECIFICATIONS

### Files to Create/Modify

1. `src/globals.css` — Full design token system:
   ```css
   @import "tailwindcss";

   :root {
     /* Colors — from Stitch DESIGN.md */
     --color-primary: #006947;
     --color-primary-container: #69f6b8;
     --color-on-primary: #c8ffe0;
     --color-on-primary-container: #005a3c;
     --color-secondary: #00675d;
     --color-secondary-container: #6df5e1;
     --color-tertiary: #0057bd;
     --color-tertiary-container: #8ab0ff;
     --color-error: #b31b25;
     --color-error-container: #fb5151;
     --color-surface: #f5f7f9;
     --color-surface-container-lowest: #ffffff;
     --color-surface-container-low: #eef1f3;
     --color-surface-container: #e5e9eb;
     --color-surface-container-high: #dfe3e6;
     --color-surface-container-highest: #d9dde0;
     --color-on-surface: #2c2f31;
     --color-on-surface-variant: #595c5e;
     --color-outline: #747779;
     --color-outline-variant: #abadaf;
     --color-background: #f5f7f9;

     /* Typography */
     --font-headline: 'Manrope', sans-serif;
     --font-body: 'Inter', sans-serif;
     --font-label: 'Public Sans', sans-serif;

     /* Spacing */
     --spacing-xs: 4px;
     --spacing-sm: 8px;
     --spacing-md: 16px;
     --spacing-lg: 24px;
     --spacing-xl: 32px;

     /* Border Radius */
     --radius-sm: 0.25rem;
     --radius: 0.5rem;
     --radius-md: 0.75rem;
     --radius-lg: 1rem;
     --radius-xl: 1.5rem;
     --radius-full: 9999px;
   }
   ```

2. `tailwind.config.ts` — Extend Tailwind with design tokens:
   - Map CSS variables to Tailwind theme
   - Configure font families
   - Set up color palette referencing CSS vars

### Business Rules
1. All colors MUST come from Stitch DESIGN.md (MD3 palette)
2. Typography MUST use Manrope (headlines), Inter (body), Public Sans (labels)
3. Border radius default MUST be 8px (0.5rem)
4. Spacing base MUST be 8px
5. All values MUST be CSS custom properties for easy theming

### Validation
- `pnpm dev` starts without errors
- `pnpm tsc --noEmit` passes
- CSS variables are accessible in browser DevTools
- Fonts load correctly from Google Fonts

## ACCEPTANCE CRITERIA
- Given app running When inspecting `:root` Then all design tokens are defined as CSS variables
- Given a component using `font-headline` class When rendered Then text uses Manrope font
- Given a component using `bg-surface` class When rendered Then background is #f5f7f9
- Given a component using `rounded` class When rendered Then border-radius is 0.5rem (8px)

## CONSTRAINTS
- DO NOT: Use hardcoded color values in components — always reference tokens
- DO NOT: Add component styles yet (that's TIP-006)
- DO NOT: Deviate from Stitch DESIGN.md color palette
- REUSE: CSS custom properties pattern from DESIGN.md
- SKIP: Dark mode tokens (out of scope for MVP)
