# THREATLENS Codebase Audit — Phase 1

**Audit Date:** 2026-09-27  
**Scope:** Frontend UI/UX, Design Tokens, Routing, Data Flows, Hardcoded Colors, Radius Overrides, and Component Hierarchy.

---

## 1. Route → Component Map

| Path | Page Component | Layout Wrapper | Primary Data Source | Key User Actions / Features |
|---|---|---|---|---|
| `/` | `LandingPage.tsx` | Standalone (None) | Hardcoded / Mock stats | Hero split view, interactive network field, marquee, features grid, pricing/CTA |
| `/login` | `Login.tsx` | Standalone (None) | Local form state | Monospace terminal credentials input, authentication trigger, redirect to `/dashboard` |
| `/dashboard` | `Dashboard.tsx` | `MainLayout.tsx` | `mocks/data.ts` | Activity stream, quick stats, active investigations, threat ticker, search bar |
| `/analysis` | `Analysis.tsx` | `MainLayout.tsx` | `mocks/data.ts` | AI correlation analysis workspace, prompt input, threat actor breakdown, timeline |
| `/actors` | `ActorProfile.tsx` | `MainLayout.tsx` | `lib/graphModel.ts` | Threat actor case file, alias list, TTP tags, campaign timeline, confidence score ring |
| `/relationships` | `RelationshipGraph.tsx` | `MainLayout.tsx` | `lib/graphModel.ts` | Visual centerpiece interactive canvas node graph, node hover/click, physics controls, node evidence drawer |
| `/infrastructure` | `Infrastructure.tsx` | `MainLayout.tsx` | `mocks/data.ts` | Server/C2 node pipeline topology, IP/domain listing, status indicators, node detail modal |
| `/sources` | `Sources.tsx` | `MainLayout.tsx` | `mocks/data.ts` | Threat intelligence feed cards, sync status toggles, telemetry telemetry metrics, byte rates |
| `/evidence` | `Evidence.tsx` | `MainLayout.tsx` | `mocks/data.ts` | Dark cyber editorial table, hash/PCAP/IOC filter pills, slide-over evidence preview drawer |
| `/reports` | `Reports.tsx` | `MainLayout.tsx` | `mocks/data.ts` | Intelligence brief card grid, TLP classification filter, full report modal viewer, export PDF |
| `/settings` | `Settings.tsx` | `MainLayout.tsx` | Component State | Workspace settings, API keys management, alert threshold toggles, session list |
| `/profile` | `UserProfile.tsx` | `MainLayout.tsx` | Component State | Investigator profile, activity log, assigned cases, access clearance level |

---

## 2. Component Inventory

### Layout Components (`client/src/components/layout/`)
- **`NavigationRail.tsx`**: Left navigation sidebar. Currently collapsible between compact and expanded states. Needs visual overhaul to 76px/220px with numbered index (`01`, `02`, `03`) and green hairline active borders.
- **`TopBar.tsx`**: Top header bar. Contains global threat search, status badge, notification bell, user avatar, and clear case selector. Needs editorial monospace styling.
- **`MobileNavigation.tsx`**: Mobile header with hamburger menu toggle. Opens drawer on mobile breakpoints.

### Visual Components (`client/src/components/visual/`)
- **`NetworkField.tsx`**: Canvas visual background for network node animation.
- **`SignalField.tsx`**: Canvas animated grid signal background.
- **`ConfidenceRing.tsx`**: SVG circular progress ring for threat actor confidence score.

### Motion Components (`client/src/components/motion/`)
- **`CountUp.tsx`**: Animated counter for statistics.
- **`LenisScroll.tsx`**: Smooth scrolling wrapper.
- **`Marquee.tsx`**: Infinite horizontal ticker component.
- **`MotionProvider.tsx`**: Framer Motion container context.

### UI Components (`client/src/components/ui/`)
- **`Button.tsx`**: Standard button component. Currently uses default blue/purple focus rings and standard rounded corners. Must be updated to support custom corner bracket borders (`[ ]`).
- **`Card.tsx`**: Surface container card with dark background. Needs hairline border enforcement (`border-border-subtle`).
- **`Badges.tsx`**: Status indicator badges (Active, Critical, TLP:RED).
- **`Drawer.tsx`**: Right slide-over panel for detail inspection.

---

## 3. Old-System Color References (Must Replace in Later Phases)

### `LandingPage.tsx` — Hardcoded Purple/Indigo References
The following old SaaS brand colors are present in `LandingPage.tsx` inline styles or Tailwind classes:
- `#6D5EF5` (Old Primary Purple) — used in hero gradients, button shadows, and active node glows.
- `#4338CA` (Old Indigo Accent) — used in gradient borders and card highlights.
- `rgba(109, 94, 245, ...)` — translucent purple overlays.
- `#1B2331` & `#0A0E16` — old slate-blue canvas background colors (replaced by `#050605`).
- `#0D1420` & `#121A28` — old blue-tinted dark surface cards (replaced by `#0e120f` & `#111611`).

### `Dashboard.tsx` & Secondary Pages
- Hardcoded slate/zinc color utilities (`bg-slate-900`, `text-indigo-400`, `border-indigo-500/30`, `bg-blue-600/20`).
- Purple status indicators in `Sources.tsx` and `Analysis.tsx`.
- Blue button highlights in `Login.tsx` form controls.

---

## 4. Radius Overrides & Style Violations

- **Oversized Radius Classes**: Several components use `rounded-xl` (16px), `rounded-2xl` (24px), or `rounded-full` on standard cards. Under the new design specification, non-circular cards must strictly use 4px–8px radius (`--radius-sm`, `--radius-md`, `--radius-lg`).
- **Excessive Card Wrappers**: Components wrap every piece of text in bordered card boxes. The new design guidelines require an open editorial layout grid separated by subtle 1px hairline dividers (`border-border-subtle`) and generous negative space.
- **Missing Corner Tech Brackets**: Interactive buttons and key data boxes lack the required 1px custom corner tech brackets (`[ ]`).

---

## 5. Data Flow Map

- **Actor & Relationship Data**: Driven by `client/src/lib/graphModel.ts`. Contains pre-populated threat actors (APT28, FIN7, Lazarus Group, Volt Typhoon), alias mappings, C2 infrastructure domains, malware signatures, and evidence hashes.
- **Dashboard & Telemetry Data**: Driven by `client/src/mocks/data.ts`. Provides live threat feed events, recent investigations, system health metrics, and alert logs.
- **Navigation State**: Managed via `client/src/lib/routeConfig.ts` and React Router location hooks.

---

## 6. Dependencies in Use

- `react` (v19) & `react-dom`
- `react-router-dom` (v7)
- `tailwindcss` (v4)
- `framer-motion`
- `gsap`
- `lenis`
- `lucide-react` (iconography)
- `vite`

---

## 7. Phase 1 Audit Summary & Readiness
- Google Fonts (`Inter` & `Manrope`) successfully integrated in `App.css`.
- Design tokens verified complete in `@theme` and `:root`.
- Codebase structure mapped and ready for **Phase 2 (Global Shell Redesign)** execution.
