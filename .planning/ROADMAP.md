# THREATLENS — Milestone 1: Full UI/UX Redesign

## Milestone Goal
Completely redesign the THREATLENS frontend UI/UX layer to achieve a premium "elite cyber-intelligence investigation interface" visual identity using near-black + electric green design language, inspired by the Davide Cattaneo reference, while preserving all existing functionality, routes, data, and business logic.

## Phases

### Phase 1: Audit & Design Token Foundation
**Goal:** Thoroughly audit all existing components, pages, routes, and data flows. Establish the new design token system in App.css. Confirm the green-primary design system is in place and working.
**Requirements:** REQ-001
**Deliverables:**
- Updated `App.css` with finalized token system
- Audit documentation of all existing components
- Verified all routes still work after token update

### Phase 2: Global Shell Redesign
**Goal:** Redesign NavigationRail, TopBar, MobileNavigation, MainLayout. Implement the editorial numbered nav, green active state, hover animations, collapse/expand rail, and mobile full-screen menu.
**Requirements:** REQ-002, REQ-010 (partial)
**Deliverables:**
- `NavigationRail.tsx` redesigned
- `TopBar.tsx` redesigned
- `MobileNavigation.tsx` redesigned
- `MainLayout.tsx` updated
- All routes still accessible

### Phase 3: Landing Page Redesign
**Goal:** Full cinematic landing page redesign with animated SVG network visualization, editorial large typography, GSAP scroll storytelling, section system, infinite marquee, perspective grid footer, circular CTA.
**Requirements:** REQ-003, REQ-011 (partial)
**Deliverables:**
- `LandingPage.tsx` fully redesigned
- Hero animated SVG network (green linework + nodes + labels)
- Section system 01–06 with scroll reveals
- Infinite marquee
- Footer with perspective grid

### Phase 4: Login + Dashboard Redesign
**Goal:** Redesign the Login screen as a cinematic full-screen experience. Redesign Dashboard with editorial information hierarchy, editorial activity stream, compact status strip.
**Requirements:** REQ-004, REQ-005, REQ-013
**Deliverables:**
- `Login.tsx` redesigned
- `Dashboard.tsx` redesigned
- All existing dashboard data preserved

### Phase 5: Actor Profile + Relationship Graph Redesign
**Goal:** Redesign Actor Profile as a case-file with editorial tabs and animated confidence ring. Redesign Relationship Graph as the visual centerpiece with animated load, node hover behavior, floating controls.
**Requirements:** REQ-006, REQ-007, REQ-013
**Deliverables:**
- `ActorProfile.tsx` redesigned
- `RelationshipGraph.tsx` redesigned
- All existing graph data, node interactions, and evidence preserved

### Phase 6: Infrastructure + Sources + Evidence + Reports + Settings Redesign
**Goal:** Redesign all remaining inner pages with editorial table treatment, visual pipeline for infrastructure, and restrained design for settings.
**Requirements:** REQ-008, REQ-009, REQ-013
**Deliverables:**
- `Infrastructure.tsx` redesigned
- `Sources.tsx` redesigned
- `Evidence.tsx` redesigned
- `Reports.tsx` redesigned
- `Settings.tsx` redesigned

### Phase 7: Motion System + Reusable Components
**Goal:** Implement centralized motion primitives, add GSAP ScrollTrigger choreography, Lenis smooth scroll, page transition system. Create/finalize reusable visual components.
**Requirements:** REQ-011, REQ-012, REQ-015
**Deliverables:**
- Centralized motion orchestration
- GSAP ScrollTrigger on landing/dashboard
- Lenis smooth scroll integrated
- Reusable components (TechnicalGrid, SignalPath, NetworkField, SectionReveal, etc.)

### Phase 8: Mobile + Accessibility + Polish Pass
**Goal:** Verify and fix mobile layouts at all breakpoints (320–767px). Implement mobile full-screen menu. Add reduced motion support. Accessibility audit. Performance audit. Final inconsistency pass.
**Requirements:** REQ-010, REQ-011 (mobile), REQ-014, REQ-015
**Deliverables:**
- Mobile menu fully implemented
- All breakpoints verified
- prefers-reduced-motion working
- ARIA labels, keyboard nav, focus states
- No animation jank
