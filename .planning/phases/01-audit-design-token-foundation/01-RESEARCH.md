# Phase 1: Audit & Design Token Foundation — Research

## RESEARCH COMPLETE

## Codebase Map

### Entry Point
`client/src/app/main.tsx` → renders `<App />` with React 19

### App.tsx Routes
```
/ → LandingPage (unauthenticated, standalone)
/login → Login (unauthenticated, standalone)

Wrapped in MainLayout:
/dashboard → Dashboard
/actors → ActorProfile
/relationships → RelationshipGraph (full-bleed, no padding)
/infrastructure → Infrastructure
/sources → Sources
/analysis → Analysis
/evidence → Evidence
/reports → Reports
/settings → Settings
/profile → UserProfile
```

### Layout Shell
`layouts/MainLayout.tsx`:
- Renders NavigationRail (desktop) + MobileNavigation (mobile overlay)
- Renders TopBar
- Main area: scrollable, padded (or full-bleed for /relationships)
- Uses MotionProvider wrapper for animated page content

### Component Inventory

#### Layout Components (`components/layout/`)
| File | Purpose | Key Features |
|------|---------|-------------|
| NavigationRail.tsx | Desktop sidebar | 76px collapsed, 220px on hover; numbered nav items; green active indicator |
| TopBar.tsx | Header bar | Section label, global search (Ctrl+K), status indicator, user dropdown |
| MobileNavigation.tsx | Mobile overlay menu | Opens over main content, basic nav links |
| PageHeader.tsx | Reusable page header | (small utility) |

#### UI Components (`components/ui/`)
| File | Purpose |
|------|---------|
| Button.tsx | 3 variants (primary/secondary/ghost), 2 sizes, showArrow prop |
| Card.tsx | Simple wrapper div with border/bg/padding |
| Badges.tsx | StatusDot, ConfidencePill |
| Drawer.tsx | Slide-in panel for detail views |
| StylometricAnalysis.tsx | Specialized visual component |

#### Motion Components (`components/motion/`)
| File | Purpose |
|------|---------|
| CountUp.tsx | Animated number counter |
| LenisScroll.tsx | Lenis smooth scroll setup |
| Marquee.tsx | Infinite horizontal marquee |
| MotionProvider.tsx | GSAP context + fade-in wrapper |
| useReducedMotion.ts | Hook for prefers-reduced-motion |

#### Visual Components (`components/visual/`)
| File | Purpose |
|------|---------|
| ConfidenceRing.tsx | SVG circular confidence meter |
| NetworkField.tsx | Animated SVG network visualization |
| PerspectiveGrid.tsx | CSS perspective grid background |
| SectionIndex.tsx | Small numbered section label |
| SignalField.tsx | Animated signal/node canvas |
| TechnicalDivider.tsx | Thin HR divider |
| TechnicalGrid.tsx | Subtle background grid |

#### Data Components (`components/data/`)
(Currently empty or part of other components — no separate data/ dir found)

### Page Inventory

| Route | File | Data Source | Key UI Elements |
|-------|------|-------------|-----------------|
| / | LandingPage.tsx (794L, 48KB) | Hardcoded in component | Hero SVG globe, stats CountUp, features tabs, pipeline grid, arch diagram, nav grid, CTA, footer |
| /login | Login.tsx (76L) | None (mock submit → /dashboard) | Full-screen with SignalField bg, form, footer labels |
| /dashboard | Dashboard.tsx (283L) | Hardcoded arrays in component | Stat cards, alert accordion, timeline, health rings, source collection list, pipeline bars |
| /actors | ActorProfile.tsx (26KB) | mocks/data.ts (ACTORS dict) | Case file header, tabbed view, identifiers, relationships, AI analysis, evidence |
| /relationships | RelationshipGraph.tsx | lib/graphModel.ts (GRAPH_NODES, GRAPH_EDGES, NODE_EVIDENCE) | SVG-based force layout, node cards, edge lines, selected node detail panel |
| /infrastructure | Infrastructure.tsx | Hardcoded mock in component | Search form, correlation pipeline visual, results |
| /sources | Sources.tsx | Hardcoded mock | Table with status dots, filter controls |
| /analysis | Analysis.tsx | Hardcoded + some from mocks | Multi-step analysis wizard UI |
| /evidence | Evidence.tsx | Hardcoded mock | Evidence table, drawer for detail |
| /reports | Reports.tsx | Hardcoded mock | Report list, download controls |
| /settings | Settings.tsx | React state | Toggle switches, form fields |
| /profile | UserProfile.tsx | Hardcoded mock | User info, account settings |

### Mock Data
`mocks/data.ts` (20KB) — Contains:
- `ACTORS` dictionary keyed by actor handle
- Actor properties: handle, aliases, category, confidence, firstSeen, lastSeen, identifiers, relationships, evidence

### Design Token Audit

#### What's CORRECT in App.css (already updated):
- ✅ Tailwind @theme block with all color tokens
- ✅ :root CSS vars shorthand
- ✅ Near-black background system
- ✅ Electric green accent (#39ff68)
- ✅ Semantic status colors (red, orange, purple, blue, teal)
- ✅ Motion tokens
- ✅ Radius tokens (4px, 6px, 8px)
- ✅ Typography utility classes (.editorial-hero, .section-index, .meta-label, etc.)
- ✅ Animation keyframes (fade-in, scan-line, marquee, pulse-subtle)
- ✅ .scan-row-hover interaction
- ✅ Scrollbar styling (thin, near-black track, dark gray thumb, green hover)
- ✅ prefers-reduced-motion media query
- ✅ focus-visible green outline

#### What's MISSING from App.css:
- ❌ Google Fonts import (Inter/Manrope) — currently relying on system fonts
- ❌ Some additional animation variants may be needed for Phase 7

#### What's WRONG in existing pages (needs fixing in later phases):
- ❌ LandingPage.tsx uses OLD purple/indigo inline styles (#6D5EF5, #4338CA, rgba(109,94,245,...))
- ❌ Dashboard.tsx HealthRing uses hardcoded `#2DD4BF`, `#6D5EF5`, `#22C55E` — should use token vars
- ❌ Various components use `rounded-xl` (16px) and `rounded-lg` (12px+) — too large per spec
- ❌ MobileNavigation is minimal stub — needs full redesign

### Validation Architecture
This phase is primarily audit + token validation. The success criteria are:
1. Complete component map documented
2. App.css has all required tokens + Google Fonts
3. All routes verified working
4. Audit doc identifies all old-system colors that need replacement in later phases

## Technical Findings

### Stack Compatibility
- Tailwind CSS v4 uses `@theme` block (not tailwind.config.js) — already correctly set up
- GSAP 3.15 + @gsap/react 2.1.2 already installed — no additional install needed for Phase 7
- Lenis 1.3.26 already installed — LenisScroll.tsx exists as wrapper
- React Router v7 with BrowserRouter — no hash routing issues

### Missing Dependencies for Later Phases
None required for Phase 1. For Phase 7 (motion), GSAP and Lenis are already installed.

### Reference CSS Insight
`css_reference.css` (149KB from Davide Cattaneo site) contains:
- Complex CSS custom property system with `--clr-*` naming convention
- Large viewport typography with `clamp()` — pattern already replicated in App.css
- SVG path animation patterns for green linework
- `prefers-reduced-motion` applied to specific animation groups
