# TIP-013: Redesign Foundation — Design Tokens, Typography & Global Styles

## HEADER
- TIP-ID: TIP-013
- Project: HLVN Dashboard
- Module: Design Foundation (CSS Variables, Tailwind Theme, Typography Scale, Spacing Rhythm)
- Priority: P0
- Depends on: None (Foundation task)
- Estimated: S

## CONTEXT
- Working dir: `D:\scripts\HLVN\HLVN-dashboard`
- Tech stack: Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui
- Key files to read first:
  - `app/globals.css` (current implementation)
  - `coding-packs/design/hlvn-dashboard/src/index.css` (design source of truth)
  - `coding-packs/product/tech-stack.md`
  - `tailwind.config.ts` or `tailwind.config.js`
- Patterns to follow:
  - Use Tailwind CSS v4 `@theme inline` syntax for design tokens
  - Import Inter and JetBrains Mono fonts via Google Fonts
  - Define tokens as CSS custom properties for maximum flexibility

## TASK
Refine `app/globals.css` to establish the redesign's visual foundation. Define and apply refined design tokens (colors, typography, spacing, shadows, border-radius, transitions) consumed by subsequent TIPs. Do NOT implement any screen-level UI changes in this TIP.

## SPECIFICATIONS

### Business Rules
1. All design tokens MUST be defined as CSS custom properties in `app/globals.css`.
2. Token names MUST follow the naming convention: `--category-variant-state` (e.g., `--color-primary`, `--color-destructive`, `--text-muted-foreground`).
3. Tailwind v4 `@theme inline` block MUST map tokens for Tailwind utility classes.
4. Tokens MUST cover all UI surface types: background, foreground, surface, border, input, ring, muted, accent, destructive.
5. Token values MUST be extracted from `coding-packs/design/hlvn-dashboard/src/index.css`.

### Design Token Values (Source: design/index.css)

#### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#F8FAFC` (slate-50) | App background |
| `--color-foreground` | `#0F172A` (slate-900) | Primary text |
| `--color-card` | `#FFFFFF` | Card surfaces |
| `--color-card-foreground` | `#0F172A` | Card text |
| `--color-popover` | `#FFFFFF` | Dropdown/menu surfaces |
| `--color-popover-foreground` | `#0F172A` | Popover text |
| `--color-primary` | `#1D61E7` (blue-600) | Primary actions, links, active states |
| `--color-primary-foreground` | `#FFFFFF` | Text on primary buttons |
| `--color-secondary` | `#F1F5F9` (slate-100) | Secondary surfaces |
| `--color-secondary-foreground` | `#1D61E7` | Secondary text |
| `--color-muted` | `#F8FAFC` | Muted backgrounds |
| `--color-muted-foreground` | `#64748B` (slate-500) | Secondary/muted text |
| `--color-accent` | `#EBF2FF` (blue-50) | Accent/highlight backgrounds |
| `--color-accent-foreground` | `#1D61E7` | Accent text |
| `--color-destructive` | `#EF4444` (red-500) | Destructive actions, errors |
| `--color-destructive-foreground` | `#FFFFFF` | Text on destructive |
| `--color-border` | `#E2E8F0` (slate-200) | Borders |
| `--color-input` | `#E2E8F0` | Input borders, focus rings |
| `--color-ring` | `#1D61E7` | Focus ring color |

#### Typography
| Token | Value | Usage |
|-------|-------|-------|
| `--font-sans` | `'Inter', system-ui, sans-serif` | Primary font |
| `--font-mono` | `'JetBrains Mono', ui-monospace, monospace` | Monospace font |
| `--font-heading` | `'Inter', sans-serif` | Heading font (same as sans for now) |

#### Border Radius
| Token | Value |
|-------|-------|
| `--radius-sm` | `6px` |
| `--radius-md` | `10px` |
| `--radius-lg` | `16px` |

### Implementation Requirements
1. Import fonts via `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap')` at the top of `globals.css`.
2. Use `@custom-variant dark (&:is(.dark *))` for dark mode readiness (but implement light mode only for this redesign).
3. Define all tokens in a single `@theme inline` block.
4. Also keep backward-compatible legacy tokens (e.g., `--primary`, `--background`) that already exist in the current `globals.css` if components reference them.
5. Set `html` and `body` with `@apply` utilities using the new tokens.
6. Add custom scrollbar styles using the new color tokens.
7. Add `@layer base` for `*`, `html`, `body` resets.

### CSS Layer Structure
```
@import "tailwindcss";
@import "tw-animate-css";  (keep if existing)
@import "shadcn/tailwind.css";  (keep if existing)

@import url('Google Fonts Inter + JetBrains Mono');

@custom-variant dark (...);

@theme inline {
  /* Colors */
  --color-background: ...
  --color-foreground: ...
  --color-primary: ...
  --color-primary-foreground: ...
  ... (all colors from table above)

  /* Typography */
  --font-sans: ...
  --font-mono: ...

  /* Border Radius */
  --radius-sm: ...
  --radius-md: ...
  --radius-lg: ...
}

:root {
  /* Backward-compatible legacy tokens (keep for existing components) */
  --primary: #1D61E7;
  --primary-hover: #1d4ed8;
  --primary-light: #dbeafe;
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --background: #FFFFFF;
  --background-app: #F8FAFC;
  --text-primary: #0F172A;
  --text-secondary: #64748B;
  --text-muted: #9CA3AF;
  --border: #E2E8F0;
  --shadow-sm: ...
  --shadow: ...
  --shadow-md: ...
}

@layer base {
  * { @apply border-border outline-ring/50; }
  body { @apply bg-background text-foreground font-sans antialiased; }
  html { @apply font-sans scroll-smooth; }
}

@layer components {
  /* Add any global component styles here if needed */
}
```

## ACCEPTANCE CRITERIA
- Given the `app/globals.css` is updated When `tailwind.config.ts` is checked Then all new CSS variables are mapped to Tailwind utilities.
- Given the fonts are imported When the app loads Then Inter and JetBrains Mono are available for use.
- Given all color tokens are defined When `bg-primary` utility is used Then it renders `#1D61E7`.
- Given all color tokens are defined When `text-muted-foreground` utility is used Then it renders `#64748B`.
- Given border radius tokens are defined When `rounded-md` is used Then it renders `10px`.
- Given legacy tokens are preserved When existing components reference `--primary` Then it still works.

## CONSTRAINTS
- DO NOT: Implement any component-level UI changes in this file. Focus ONLY on global tokens.
- DO NOT: Use Pencil, `.pen`, or Pencil MCP tools.
- DO NOT: Add dark mode implementation. Light mode only.
- DO NOT: Remove tokens that existing components depend on without checking component imports.
- REUSE: Existing font import URLs, Tailwind v4 syntax, `@layer` structure.
- SKIP: Component-level styles, page layouts, specific element implementations.

## QUALITY GATE: TIP Self-Review
- [x] Scope is limited to `app/globals.css` and design tokens only.
- [x] Token values are extracted from `coding-packs/design/hlvn-dashboard/src/index.css`.
- [x] Backward compatibility with existing tokens is considered.
- [x] Acceptance criteria are specific and testable.
- [x] Constraints forbid screen-level changes in this TIP.
