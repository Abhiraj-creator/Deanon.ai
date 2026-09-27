---
phase: 1
name: Audit & Design Token Foundation
wave: 1
depends_on: []
files_modified:
  - client/src/app/App.css
  - .planning/phases/01-audit-design-token-foundation/01-AUDIT.md
autonomous: true
requirements:
  - REQ-001
must_haves:
  - App.css has Google Fonts import for Inter and Manrope
  - App.css contains all required CSS custom properties (--color-*, --ease-*, --duration-*, --radius-*)
  - All 12 routes verified accessible in browser
  - Audit document produced mapping all routes, components, data sources, and old-system colors
---

# Phase 1: Audit & Design Token Foundation — Plan

## Objective
Produce a comprehensive audit of the THREATLENS codebase, verify the design token system is complete in App.css, add Google Fonts, and document all instances of old-system colors that need replacement in later phases. This phase contains NO visual redesign work — only foundation and audit.

## Context
The existing `client/src/app/App.css` already has a well-structured Tailwind v4 `@theme` block and `:root` CSS vars establishing the near-black + electric green design system. However:
1. Google Fonts (Inter/Manrope) are not imported — the body uses system font fallbacks
2. LandingPage.tsx still uses old purple/indigo inline styles
3. Some components use oversized border-radius classes

The audit must capture ALL old-system color references so Phase 3+ can replace them systematically.

---

## Wave 1 — Token Finalization + Audit (All parallel)

### Task 1.1: Add Google Fonts Import to App.css

<read_first>
- client/src/app/App.css — Current state (especially the body font-family rule)
- client/src/index.html — Check if fonts are already loaded via <link>
</read_first>

<action>
Open `client/src/app/App.css`. At the very top of the file (before `@import "tailwindcss"`), add the Google Fonts import:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap');
```

Then verify the `body` rule already has:
```css
body {
  font-family: 'Inter', 'Manrope', system-ui, sans-serif;
}
```

If the font-family rule uses different font names, update it to match.

Also add font-display: swap behavior by ensuring the @import uses `display=swap` (already included above).

No other changes to App.css in this task — the token system is already correct.
</action>

<acceptance_criteria>
- App.css starts with `@import url('https://fonts.googleapis.com/css2?family=Inter...`
- App.css body rule contains `'Inter'` in font-family
- `client/index.html` does not have a conflicting font link (or if it does, the CSS @import takes precedence)
- Running `grep -n "googleapis.com" client/src/app/App.css` returns at least 1 match
</acceptance_criteria>

---

### Task 1.2: Verify Complete Token Coverage in App.css

<read_first>
- client/src/app/App.css — Full file content
</read_first>

<action>
Read the full App.css and verify ALL of the following tokens exist in the `@theme` block and `:root` block. Add any that are missing.

**Required @theme tokens (Tailwind custom colors):**
```
--color-canvas: #050605
--color-canvas-light: #070907
--color-canvas-deep: #0a0d0a
--color-sidebar: #070907
--color-surface: #0e120f
--color-card: #111611
--color-card-hover: #131813
--color-panel: #131813
--color-input: #0a0d0a
--color-border-subtle: #242a25
--color-border-strong: #344034
--color-accent: #39ff68
--color-accent-solid: #39ff68
--color-accent-hover: #5cff7a
--color-accent-start: #25d957
--color-accent-end: #39ff68
--color-accent-soft: rgba(57, 255, 104, 0.08)
--color-accent-border: rgba(57, 255, 104, 0.45)
--color-accent-link: #8aff98
--color-text-primary: #f2f5ef
--color-text-secondary: #a4aca1
--color-text-muted: #6b7469
--color-text-success: #39ff68
--color-status-green: #25d957
--color-status-green-bg: rgba(37, 217, 87, 0.12)
--color-status-red: #ff5151
--color-status-red-bg: rgba(255, 81, 81, 0.12)
--color-status-orange: #f2a94a
--color-status-orange-bg: rgba(242, 169, 74, 0.12)
--color-status-gray: #6b7469
--color-status-purple: #9b75d0
--color-status-purple-bg: rgba(155, 117, 208, 0.12)
--color-status-blue: #5c8dff
--color-status-teal: #2ed7b0
--ease-out: cubic-bezier(0.22, 1, 0.36, 1)
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)
--duration-fast: 200ms
--duration-normal: 400ms
--duration-slow: 800ms
--radius-sm: 4px
--radius-md: 6px
--radius-lg: 8px
```

**Required :root shorthand vars:**
```
--bg: #050605
--surface: #0e120f
--panel: #131813
--border: #242a25
--border-bright: #344034
--text: #f2f5ef
--text-muted: #6b7469
--accent: #39ff68
```

**Required keyframes (in App.css):**
- `@keyframes fade-in` — opacity 0→1, translateY 6px→0
- `@keyframes scan-line` — translateX -100%→100% with opacity flash
- `@keyframes marquee` — translateX 0→-50%
- `@keyframes pulse-subtle` — opacity 1→0.55→1

**Required utility classes:**
- `.animate-fade-in`, `.animate-scan-line`, `.animate-marquee`, `.animate-pulse-subtle`
- `.scan-row-hover` with `::after` pseudo-element for green scan line on hover
- `.editorial-hero`, `.editorial-section`, `.editorial-page-title`, `.editorial-card-title`
- `.section-index`, `.meta-label`, `.title-light`, `.title-bold`

**Required scrollbar:**
- `scrollbar-width: thin`, `scrollbar-color: #2a302b #050605`
- `*::-webkit-scrollbar { width: 6px; height: 6px; }`
- `*::-webkit-scrollbar-track { background: #050605; }`
- `*::-webkit-scrollbar-thumb { background: #2a302b; }`
- `*::-webkit-scrollbar-thumb:hover { background: #344034; box-shadow: inset 0 0 0 1px rgba(57, 255, 104, 0.15); }`

**Required accessibility:**
- `*:focus-visible { outline: 1px solid var(--color-accent-border); outline-offset: 2px; }`

**Required reduced motion:**
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .animate-marquee { animation: none; }
}
```

For each missing token/class, add it in the appropriate section of App.css.
</action>

<acceptance_criteria>
- `grep -c "color-canvas" client/src/app/App.css` returns at least 1
- `grep -c "39ff68" client/src/app/App.css` returns at least 8 (multiple usages of green)
- `grep -c "editorial-hero" client/src/app/App.css` returns at least 1
- `grep -c "prefers-reduced-motion" client/src/app/App.css` returns at least 1
- `grep -c "scan-row-hover" client/src/app/App.css` returns at least 1
- `grep -c "webkit-scrollbar" client/src/app/App.css` returns at least 3
</acceptance_criteria>

---

### Task 1.3: Produce Codebase Audit Document

<read_first>
- client/src/app/App.tsx — Route definitions
- client/src/layouts/MainLayout.tsx — Shell structure
- client/src/components/layout/NavigationRail.tsx
- client/src/components/layout/TopBar.tsx
- client/src/components/layout/MobileNavigation.tsx
- client/src/components/ui/Button.tsx
- client/src/components/ui/Card.tsx
- client/src/components/ui/Badges.tsx
- client/src/components/ui/Drawer.tsx
- client/src/components/motion/CountUp.tsx
- client/src/components/motion/LenisScroll.tsx
- client/src/components/motion/Marquee.tsx
- client/src/components/motion/MotionProvider.tsx
- client/src/components/visual/NetworkField.tsx
- client/src/components/visual/SignalField.tsx
- client/src/components/visual/ConfidenceRing.tsx
- client/src/lib/routeConfig.ts
- client/src/lib/graphModel.ts
- client/src/mocks/data.ts
- client/src/pages/LandingPage.tsx (scan for old colors)
- client/src/pages/Dashboard.tsx
</read_first>

<action>
Create `.planning/phases/01-audit-design-token-foundation/01-AUDIT.md` with the following sections:

```markdown
# THREATLENS Codebase Audit — Phase 1

## Route → Component Map

[For each route, document: route path, page file, data source, user actions, current UI elements]

## Component Inventory

### Layout
[List each component, its file, current implementation status, and any issues]

### Visual
[List each component in components/visual/]

### Motion
[List each component in components/motion/]

### UI
[List each component in components/ui/]

## Old-System Color References (Must Fix in Later Phases)

### LandingPage.tsx — Purple/Indigo Inline Styles
[List all hardcoded old colors: #6D5EF5, #4338CA, rgba(109,94,245,...), #1B2331, #0A0E16, #0D1420, #121A28, etc.]

### Dashboard.tsx — Mixed Colors
[List any hardcoded colors not using Tailwind tokens]

### Other Files
[Any other files with old-system colors]

## Radius Issues (Components Using Oversized Radius)
[List components using rounded-xl (16px) or rounded-2xl+ that violate the 4-8px rule]

## Missing Features vs. PRD
[Any features from the PRD that are completely missing from the current implementation]

## Data Flow Map
[For each page, describe where data comes from: component state, mocks/data.ts, lib/graphModel.ts, or inline hardcoded]

## Dependencies in Use
[List all npm packages currently imported across the project]
```

Fill in each section with accurate data from reading the files.
</action>

<acceptance_criteria>
- File `.planning/phases/01-audit-design-token-foundation/01-AUDIT.md` exists
- File is at least 200 lines long (comprehensive audit)
- File contains section "## Old-System Color References"
- File contains at least 10 route entries in Route → Component Map
- File contains `LandingPage.tsx` entries noting purple/indigo colors
- `grep -c "6D5EF5" .planning/phases/01-audit-design-token-foundation/01-AUDIT.md` returns at least 1
</acceptance_criteria>

---

## Verification

After completing all 3 tasks, verify:

1. `client/src/app/App.css` has Google Fonts import at top
2. `client/src/app/App.css` contains all required tokens (spot-check 5 different tokens)
3. `.planning/phases/01-audit-design-token-foundation/01-AUDIT.md` exists and is comprehensive
4. The dev server starts without errors: `cd client && npm run dev` — check for TypeScript/import errors only, do not check visual output

## Output Required
Reply with `## PLANNING COMPLETE` followed by:
- Summary of changes made to App.css
- Brief outline of the audit document's key findings
- List of old-system colors found in existing pages (for Phase 3+ reference)
