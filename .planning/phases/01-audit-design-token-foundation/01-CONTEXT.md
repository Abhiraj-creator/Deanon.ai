# Phase 1: Audit & Design Token Foundation - Context

**Gathered:** 2026-09-27
**Status:** Ready for planning
**Source:** PRD Express Path (User request — THREATLENS UI/UX Redesign brief)

<domain>
## Phase Boundary

Phase 1 establishes the foundation for the entire redesign effort:
1. **Audit** all existing components, pages, routes, state, data flows — produce a complete map
2. **Validate** the existing design token system in `App.css` (already partially updated) and finalize the green-primary token system
3. **Confirm** all routes remain functional after token changes
4. **Document** the component inventory to guide subsequent phases

This phase does NOT redesign any UI components — it only audits and establishes the token foundation.

</domain>

<decisions>
## Implementation Decisions

### What to Audit
- All files in `client/src/pages/` (12 page files)
- All files in `client/src/components/` (layout, ui, motion, visual, data subdirs)
- `client/src/layouts/MainLayout.tsx`
- `client/src/lib/routeConfig.ts`, `graphModel.ts`, `intelligenceMetrics.ts`, `gsap.ts`
- `client/src/app/App.tsx`, `App.css`
- `client/src/mocks/` directory
- Produce ROUTE → COMPONENT → DATA SOURCE → USER ACTION → CURRENT UI COMPONENTS map

### Design Token System (Already in App.css — Verify & Finalize)
The existing App.css already has the correct token system:

**Backgrounds:**
- `--color-canvas: #050605` — main background
- `--color-canvas-light: #070907`
- `--color-canvas-deep: #0a0d0a`
- `--color-sidebar: #070907`
- `--color-surface: #0e120f`
- `--color-card: #111611`
- `--color-card-hover: #131813`
- `--color-panel: #131813`
- `--color-input: #0a0d0a`

**Borders:**
- `--color-border-subtle: #242a25`
- `--color-border-strong: #344034`

**Brand Accent — Electric Green:**
- `--color-accent: #39ff68`
- `--color-accent-solid: #39ff68`
- `--color-accent-hover: #5cff7a`
- `--color-accent-start: #25d957`
- `--color-accent-end: #39ff68`
- `--color-accent-soft: rgba(57, 255, 104, 0.08)`
- `--color-accent-border: rgba(57, 255, 104, 0.45)`
- `--color-accent-link: #8aff98`

**Text:**
- `--color-text-primary: #f2f5ef`
- `--color-text-secondary: #a4aca1`
- `--color-text-muted: #6b7469`
- `--color-text-success: #39ff68`

**Semantic:**
- `--color-status-green: #25d957` / bg `rgba(37,217,87,0.12)`
- `--color-status-red: #ff5151` / bg `rgba(255,81,81,0.12)`
- `--color-status-orange: #f2a94a` / bg `rgba(242,169,74,0.12)`
- `--color-status-gray: #6b7469`
- `--color-status-purple: #9b75d0` / bg `rgba(155,117,208,0.12)` (infrastructure semantic)
- `--color-status-blue: #5c8dff` (info)
- `--color-status-teal: #2ed7b0` (correlation semantic)

**Motion:**
- `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`
- `--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)`
- `--duration-fast: 200ms`
- `--duration-normal: 400ms`
- `--duration-slow: 800ms`

**Radius:**
- `--radius-sm: 4px`
- `--radius-md: 6px`
- `--radius-lg: 8px`

**CSS root vars (shorthand):**
- `--bg: #050605`, `--surface: #0e120f`, `--panel: #131813`, `--border: #242a25`, `--border-bright: #344034`, `--text: #f2f5ef`, `--text-muted: #6b7469`, `--accent: #39ff68`

### Typography Classes (Already in App.css — Verify These Exist)
- `.editorial-hero` — `clamp(3rem, 14vw, 8rem)`, line-height 0.95, letter-spacing -0.03em
- `.editorial-section` — `clamp(2.5rem, 8vw, 6rem)`, line-height 1, letter-spacing -0.02em
- `.editorial-page-title` — `clamp(2rem, 5vw, 3.5rem)`, line-height 1.05
- `.editorial-card-title` — `clamp(0.85rem, 1vw, 1rem)`
- `.section-index` — 0.65rem, 0.12em tracking, uppercase, muted
- `.meta-label` — 0.65rem, 0.1em tracking, uppercase, muted

### Animation Keyframes (Already in App.css — Verify)
- `fade-in`, `scan-line`, `marquee`, `pulse-subtle`
- `.animate-fade-in`, `.animate-scan-line`, `.animate-marquee`, `.animate-pulse-subtle`
- `.scan-row-hover` (hover scan line effect)

### What Needs to Be Added to App.css (If Missing)
- Google Fonts import: Inter and/or Manrope
- Any missing animation utilities
- Scrollbar styling (track: near-black, thumb: dark gray, hover: green tint)
- `prefers-reduced-motion` media query block

### The agent's Discretion
- Whether to use Inter or Manrope as primary font (prefer Inter, already in body font-family)
- Whether to add `@import url(...)` for Google Fonts or rely on system fonts initially
- Exact format of the audit document produced

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Token System
- `client/src/app/App.css` — Current token system (Tailwind @theme + :root CSS vars). This is the source of truth for design tokens.

### Existing Routes & Navigation
- `client/src/lib/routeConfig.ts` — NAV_ITEMS, FULL_BLEED_PATHS, getSectionMeta
- `client/src/app/App.tsx` — Route definitions

### Existing Layout Shell
- `client/src/layouts/MainLayout.tsx` — App shell structure
- `client/src/components/layout/NavigationRail.tsx` — Current nav rail
- `client/src/components/layout/TopBar.tsx` — Current top bar
- `client/src/components/layout/MobileNavigation.tsx` — Current mobile nav

### Existing UI Components
- `client/src/components/ui/Button.tsx`
- `client/src/components/ui/Card.tsx`
- `client/src/components/ui/Badges.tsx`
- `client/src/components/ui/Drawer.tsx`

### Reference Design Assets
- `client/src/assests/refereence_code/css_referenece.css` — CSS from Davide Cattaneo reference site (visual inspiration)

### Data Model
- `client/src/lib/graphModel.ts` — Graph nodes, edges, evidence data
- `client/src/mocks/` — Mock data directory

### All Pages (Read before auditing)
- `client/src/pages/LandingPage.tsx` (794 lines)
- `client/src/pages/Login.tsx`
- `client/src/pages/Dashboard.tsx` (283 lines)
- `client/src/pages/ActorProfile.tsx` (26913 bytes)
- `client/src/pages/RelationshipGraph.tsx`
- `client/src/pages/Infrastructure.tsx`
- `client/src/pages/Sources.tsx`
- `client/src/pages/Analysis.tsx`
- `client/src/pages/Evidence.tsx`
- `client/src/pages/Reports.tsx`
- `client/src/pages/Settings.tsx`
- `client/src/pages/UserProfile.tsx`

</canonical_refs>

<specifics>
## Specific Ideas

### Audit Output Format
Produce an internal map for each route:
```
ROUTE: /dashboard
COMPONENT: Dashboard.tsx
DATA SOURCE: hardcoded mock arrays in component + mocks/ data
USER ACTIONS: expand alert, navigate to subpages, quick search
CURRENT UI: Card grid (4 stat cards), Alert accordion, Timeline, Health rings, Source collection list, Pipeline health bars
EXISTING ISSUES: purple/indigo indigo not yet removed from LandingPage (still uses inline styles with #6D5EF5)
```

### LandingPage Observation
The LandingPage.tsx still uses inline styles with the OLD purple/indigo system (`#6D5EF5`, `#4338CA`, `rgba(109,94,245,...)`). These must be flagged for Phase 3 replacement.

### App.css Current State
The App.css is already well-structured with the green token system. Phase 1 must verify this is complete and add any missing items.

### Reference CSS
`client/src/assests/refereence_code/css_referenece.css` (149KB) contains the CSS from the Davide Cattaneo reference site. Key patterns to extract from it during audit: variable names for the design system, animation patterns, typography scale approach.

</specifics>

<deferred>
## Deferred Ideas

- Adding Force Graph library (D3 or similar) for relationship visualization — deferred to Phase 5
- GSAP ScrollTrigger implementation — deferred to Phase 7
- Lenis smooth scroll — deferred to Phase 7
- Any per-page visual redesign — deferred to Phases 3–6

</deferred>

---

*Phase: 01-audit-design-token-foundation*
*Context gathered: 2026-09-27 via PRD Express Path*
