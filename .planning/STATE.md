# THREATLENS — Project State

## Current Milestone
Milestone 1: Full UI/UX Redesign

## Milestone Status
Planning

## Key Decisions Made
- Preserve existing React + TypeScript + Vite + Tailwind CSS v4 + React Router stack
- New design identity: near-black (#050605) + electric green (#39FF68) primary accent
- Replace purple/indigo SaaS brand language entirely
- GSAP (already installed) + Lenis (already installed) for motion
- Visual inspiration: Davide Cattaneo reference site editorial language
- No fake data introduction — preserve all existing mock data
- NavigationRail: 76px collapsed, 220px expanded, numbered editorial index
- Typography: Inter/Manrope/Plus Jakarta Sans, large editorial with thin/bold contrast
- Layout: editorial grid with negative space, hairline dividers, not "everything is a card"
- Radius: 4–8px max (no 16–24px SaaS cards)
- Green glow: limited to active nodes, primary CTA, focus, live state, selected relationships
- Scrollbar: minimal dark with green hover tint

## Design Token Status
- Base tokens defined in `client/src/app/App.css` (already updated to green accent system)
- Tailwind v4 `@theme` block and `:root` CSS vars established

## Phases Completed
None yet

## Architecture Notes
- Entry: `client/src/app/main.tsx` → `App.tsx` → `BrowserRouter` + routes
- Layout shell: `layouts/MainLayout.tsx` wraps all authenticated routes
- Navigation: `components/layout/NavigationRail.tsx`, `components/layout/TopBar.tsx`, `components/layout/MobileNavigation.tsx`
- Pages: `pages/` directory (12 page files)
- Mocks: `mocks/` directory (mock data)
- Graph: `lib/graphModel.ts` (nodes, edges, evidence data)
- Visual components: `components/visual/` (NetworkField, SignalField, ConfidenceRing, etc.)
- Motion: `components/motion/` (CountUp, LenisScroll, Marquee, MotionProvider)
- Assets: `assests/refereence_code/css_referenece.css` (reference CSS from Davide Cattaneo site)
