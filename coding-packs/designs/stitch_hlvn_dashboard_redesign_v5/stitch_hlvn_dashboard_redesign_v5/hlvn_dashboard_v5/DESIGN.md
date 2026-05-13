---
name: HLVN Dashboard v5
colors:
  surface: '#f5f7f9'
  surface-dim: '#d0d5d8'
  surface-bright: '#f5f7f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef1f3'
  surface-container: '#e5e9eb'
  surface-container-high: '#dfe3e6'
  surface-container-highest: '#d9dde0'
  on-surface: '#2c2f31'
  on-surface-variant: '#595c5e'
  inverse-surface: '#0b0f10'
  inverse-on-surface: '#9a9d9f'
  outline: '#747779'
  outline-variant: '#abadaf'
  surface-tint: '#006947'
  primary: '#006947'
  on-primary: '#c8ffe0'
  primary-container: '#69f6b8'
  on-primary-container: '#005a3c'
  inverse-primary: '#69f6b8'
  secondary: '#00675d'
  on-secondary: '#c0fff3'
  secondary-container: '#6df5e1'
  on-secondary-container: '#005b51'
  tertiary: '#0057bd'
  on-tertiary: '#f0f2ff'
  tertiary-container: '#8ab0ff'
  on-tertiary-container: '#002e6a'
  error: '#b31b25'
  on-error: '#ffefee'
  error-container: '#fb5151'
  on-error-container: '#570008'
  primary-fixed: '#69f6b8'
  primary-fixed-dim: '#58e7ab'
  on-primary-fixed: '#00452d'
  on-primary-fixed-variant: '#006544'
  secondary-fixed: '#6df5e1'
  secondary-fixed-dim: '#5de7d3'
  on-secondary-fixed: '#00463e'
  on-secondary-fixed-variant: '#00655b'
  tertiary-fixed: '#8ab0ff'
  tertiary-fixed-dim: '#73a2ff'
  on-tertiary-fixed: '#00163b'
  on-tertiary-fixed-variant: '#00377b'
  primary-dim: '#005c3d'
  secondary-dim: '#005a50'
  tertiary-dim: '#004ca6'
  error-dim: '#9f0519'
  background: '#f5f7f9'
  on-background: '#2c2f31'
  surface-variant: '#d9dde0'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-lg:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin: 24px
---

# HLVN Dashboard v5 Design System

## Vision
Modern analytics dashboard with clean data visualization, intuitive navigation, and professional aesthetic. Focus on clarity, hierarchy, and actionable insights.

## Visual Direction
- **Clean & Professional**: Generous white space, structured layouts
- **Data-First**: Charts and metrics are hero elements
- **Trustworthy**: Consistent patterns, predictable interactions
- **Efficient**: Quick scanning, clear CTAs, minimal cognitive load

## Color Strategy
- **Primary Emerald (#10B981)**: Main actions, active states, primary data series
- **Secondary Teal (#14B8A6)**: Secondary data series, supporting actions
- **Tertiary Blue (#3B82F6)**: Comparative data series, informative highlights
- **Neutral Slate (#F8FAFC)**: Clean backgrounds with excellent contrast
- **Semantic colors**: Amber for warnings, Red for errors/critical

## Typography
- **Manrope**: Headlines and section titles - modern, geometric, professional
- **Inter**: Body text and UI elements - excellent legibility
- **Public Sans**: Labels and technical metadata - clean and accessible
- **JetBrains Mono**: Code and technical IDs

## Layout Principles
- Desktop-first with responsive breakpoints
- 12-column grid, max-width 1440px
- Consistent 8px spacing scale (Scale 2)
- Card-based information architecture
- Sticky navigation for context retention

## Component Standards
- **Cards**: 8px (0.5rem) radius, subtle shadow, 1px border
- **Buttons**: Rounded-lg (approx 16px) or specific 6px radius depending on context, clear hover/active states
- **Charts**: Consistent palette using Emerald, Teal, and Blue; clear legends, responsive
- **Tables**: Zebra striping, sortable headers, row actions
- **Badges**: Pill-shaped status indicators with semantic colors

## Data Visualization
- Use primary emerald for main metrics and growth indicators
- Secondary teal and tertiary blue for comparisons and multi-series charts
- Consistent axis styling using Public Sans
- Clear labels and tooltips
- Responsive chart sizing

## Interaction States
- Hover: Subtle elevation or color shift toward deeper emerald/teal
- Active: Deeper color, slight scale
- Focus: 2px emerald outline
- Disabled: 40% opacity, no pointer
- Loading: Skeleton screens, not spinners

## Accessibility
- WCAG AA contrast minimum
- Keyboard navigation support
- Screen reader friendly labels
- No color-only indicators (using icons and labels)
- 48px minimum touch targets on mobile