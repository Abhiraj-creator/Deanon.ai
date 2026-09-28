# THREATLENS — Requirements

## REQ-001: Design Token System
Replace the existing purple/indigo SaaS tokens with a near-black + electric green system. Centralize colors, spacing, radius, typography, motion durations, easing, border colors, shadows, glows in CSS custom properties.

## REQ-002: Global Application Shell Redesign
Redesign NavigationRail (collapsed 76px / expanded 220px), TopBar, MobileNavigation, and MainLayout to match the new design identity. Navigation should feel like a precise editorial index with numbered items. No rounded active pills.

## REQ-003: LandingPage Complete Redesign
Full cinematic landing page with: animated SVG network visualization (hero), editorial large typography, scroll storytelling with GSAP ScrollTrigger, section system (01 THE SIGNAL → 06 THE INTELLIGENCE), infinite marquee, perspective grid footer, and circular expanding CTA section.

## REQ-004: Login Screen Redesign
Cinematic full-screen near-black login. Animated network/grid background. Editorial typography "AUTHORIZED INTELLIGENCE ACCESS". Tech-style form fields. No SaaS auth card.

## REQ-005: Dashboard Redesign
Editorial information hierarchy: large intelligence metrics, editorial activity stream (hairline rules, small icons, large event titles), compact collection status strip, pipeline health visualization. No generic rounded card grid.

## REQ-006: Actor Profile Redesign
Case-file treatment: large typographic header, horizontal editorial tabs with animated green underline, confidence ring with sequential reveal, identifiers/relationships/evidence/infrastructure/AI analysis sections. Must preserve all existing tab/data logic.

## REQ-007: Relationship Graph Redesign
Near-black canvas, thin curved connections, category-specific node colors, floating controls, animated initial load (center node first, then primaries, then secondaries, edges, labels). Node hover: dim unrelated nodes, highlight connected. No heavy card border around graph.

## REQ-008: Infrastructure Analysis Redesign
Visual pipeline visualization: onion → SSL cert → fingerprint → match → clearnet domain → confidence. Animated correlation flow on "Analyze" trigger. Preserve existing search/analysis logic.

## REQ-009: Sources / Evidence / Reports / Settings Redesign
Editorial table treatment for Sources and Evidence. Report rows with large typography and hairline separators. Settings as editorial list. Preserve all existing functionality.

## REQ-010: Mobile Experience Redesign
Full-screen overlay menu with large numbered items. Responsive compositions that reflow correctly at 320–767px. Touch-friendly graph controls. No desktop hover interactions required on mobile. prefers-reduced-motion support.

## REQ-011: Motion System
Centralized GSAP motion orchestration: hero animation (layered), scroll-driven reveals (clip-path, SVG draw, CountUp, parallax), page transitions (~400–700ms). Lenis smooth scroll. prefers-reduced-motion: disable parallax/large animations.

## REQ-012: Reusable Design Components
Create reusable components: TechnicalGrid, SignalPath, NetworkField, SectionIndex, DataRule, AnimatedMetric, RelationshipNode, ConfidenceRing, TraceLine, ScanLine, EvidenceDrawer, EditorialTable, StatusIndicator, SectionReveal. Also layout/motion/visual/data/ui component categories.

## REQ-013: Data Integrity
No fake data introduced. All existing mock data and real data sources preserved. Empty states use the new design language. Loading states are process-specific. Error states use restrained design.

## REQ-014: Accessibility
Keyboard navigation, visible focus (green outline), ARIA labels, semantic headings, button semantics, accessible dialogs/tabs/menu, proper contrast, reduced motion support. No information hidden solely behind animation.

## REQ-015: Performance
Use transform/opacity for animations. Avoid layout-triggering animations. No animating width/height/top/left. Use will-change sparingly. SVG/Canvas for relationship visualization (not hundreds of DOM nodes).
