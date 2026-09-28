---
phase: 7
name: Motion System and Reusable Components
wave: 1
depends_on: [1, 2, 3, 4, 5, 6]
files_modified:
  - client/src/components/visual/TechnicalGrid.tsx
  - client/src/components/visual/SignalPath.tsx
  - client/src/components/visual/NetworkField.tsx
  - client/src/components/visual/SectionReveal.tsx
  - client/src/components/visual/ParallaxLayer.tsx
  - client/src/lib/motion.ts
autonomous: true
requirements:
  - REQ-011
  - REQ-012
  - REQ-015
must_haves:
  - Motion utility library (`motion.ts`) centralizing Framer Motion variants and GSAP helpers.
  - Smooth scroll orchestration with Lenis across all scrollable layouts.
  - Reusable visual background components (`TechnicalGrid`, `SignalPath`, `NetworkField`).
  - Section reveal wrappers with staggered animation support (`SectionReveal`).
  - Interactive mouse parallax component (`ParallaxLayer`).
---

# Phase 7: Motion System and Reusable Components

## Goal
Centralize motion orchestration, reusable background visual generators, smooth scrolling, and scroll-triggered animations across the application. Ensure motion enhances the tactile cyber-intelligence identity without causing performance bottlenecks or layout jank.

---

## Action Items

### 1. Motion Utility Library (`client/src/lib/motion.ts`)
- Build centralized Framer Motion animation variants:
  - `fadeInUp`: standard smooth reveal for content blocks.
  - `staggerContainer`: container controls for child element staggering.
  - `tacticalBracket`: corner bracket expansion animation for interactive buttons.
  - `pulseGlow`: subtle repeating radial electric green glow.
  - `clipMaskReveal`: clip-path un-shutter transition for headings and hero panels.
- Add GSAP helper utilities for complex timeline triggers and particle canvas updates.

### 2. Lenis Smooth Scroll Integration (`client/src/components/layout/SmoothScroll.tsx`)
- Implement a global Lenis smooth scroll provider wrapping scrollable routes (specifically LandingPage and long investigative dashboards).
- Expose scroll position callbacks for parallax layers and header background transformations.
- Ensure standard browser scroll behaviors and anchor jumps continue to function cleanly.

### 3. Reusable Visual Components (`client/src/components/visual/`)
- **`TechnicalGrid.tsx`**: Procedural canvas/SVG background grid with 1px hairline rules, crosshairs at intersections, and optional pulsing energy nodes.
- **`SignalPath.tsx`**: Animated SVG polyline path that draws electric green signal lines connecting UI components or section headings.
- **`NetworkField.tsx`**: Interactive particle node background canvas with mouse repulsion and distance-based line connections.
- **`SectionReveal.tsx`**: Wrapper component using GSAP ScrollTrigger or Framer Motion `inView` to trigger entrance animations as sections enter viewport.
- **`ParallaxLayer.tsx`**: Mouse cursor tracking component providing multi-depth 3D parallax offset to floating UI elements.

---

## Verification Criteria
- [ ] Centralized animation variants work seamlessly across Framer Motion elements.
- [ ] Lenis smooth scroll operates smoothly on LandingPage without breaking standard mouse wheel or touch scrolling.
- [ ] `TechnicalGrid`, `SignalPath`, and `NetworkField` render efficiently at 60 FPS.
- [ ] `SectionReveal` triggers triggers reliably on scroll up and scroll down.
- [ ] `npm run build` passes with zero errors.
