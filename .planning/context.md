# ShadowLens Context

## Project Overview
- **Product Name:** ShadowLens
- **Tagline:** "Different aliases. Same actor. A clearer picture."
- **Problem Statement:** 26151, NTRO — Blockchain & Cybersecurity
- **Goal:** Create a frontend-only demo website to showcase the investigator-facing dashboard for the ThreatLens / dark-web threat-actor de-anonymization platform.

## Tech Stack
- **Framework:** React JS
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite (Recommended for fast scaffolding)
- **Routing:** React Router (for navigating between demo screens)
- **Graph Visualization:** React Flow or Cytoscape.js (for Relationship Graph)
- **Icons:** Lucide React or Feather Icons

## Design System Summary
- **Theme:** Dark mode only.
- **Palette:** 
  - Canvas: `#0A0E16` – `#10131C`
  - Accent: Indigo/Violet (`#3D37CE` to `#4B3FE0`)
  - Status Colors: Green (Success), Red (Danger/High Confidence), Orange (Warning), Teal (Clearnet).
- **Layout:** Persistent left sidebar (~220px) + top bar + main content area.
- **Typography:** Inter, Manrope, or Plus Jakarta Sans.

## Implementation Plan (Demo Showcase)

### Phase 1: Project Setup & Foundation
1. Initialize a React + TypeScript project using Vite.
2. Install Tailwind CSS and configure the `tailwind.config.js` with the exact color tokens, typography, and spacing scale specified in the UI Context.
3. Setup routing for the 10 defined screens.
4. Create foundational UI components (`Button`, `Card`, `ConfidencePill`, `StatusDot`, `Badge`).

### Phase 2: Core Layout & Navigation
1. Build the unauthenticated `Landing Page` (Hero section with abstract network visualization).
2. Build the `Login` screen (mock authentication).
3. Build the authenticated app shell (`Sidebar` and `Topbar`) that will wrap all internal pages.

### Phase 3: Mock Data Generation
1. Create robust mock JSON data structures to simulate backend API responses for:
   - Threat Actors and their activity timelines.
   - Infrastructure correlation results.
   - Relationship nodes and edges (for the graph view).
   - Source management and system health stats.

### Phase 4: Page Implementation
1. **Dashboard:** Implement stat cards, recent activity timeline, and system health rings.
2. **Actor Profile:** Implement tabs, basic info, linked identifiers, and confidence breakdown.
3. **Relationship Graph:** Integrate React Flow to render the node-based connection map.
4. **Infrastructure Analysis:** Implement search interface and correlation results view.
5. **Tables & Settings:** Implement Sources, Evidence Viewer, Reports, and Settings screens.

### Phase 5: Polish & Deployment
1. Add micro-interactions (hover states, active states, soft glows).
2. Ensure responsive behavior (even if primarily desktop-focused for analysts, it should scale gracefully).
3. Deploy the frontend demo to Vercel or Netlify for easy showcasing.

---
*Note: This file should be kept updated as architectural decisions, new features, or design changes are made.*

## Current Status
- **Initialized:** React, TypeScript, Vite, Tailwind v4 in `client/` folder.
- **Dependencies Installed:** `react-router-dom` (routing), `lucide-react` (icons).
- **Styles:** Tailwind configured with custom tokens in `src/app/App.css`.
- **Core Components:**
  - `MainLayout` (App Shell containing Topbar and Sidebar)
  - `Sidebar` (Navigation)
  - `Topbar` (Search and User Avatar)
  - **Shared UI:** `Card`, `Button`, `ConfidencePill`, `StatusDot`
- **Routing Set Up:** Basic placeholder pages created for all 10 views in `App.tsx`.
- **Implemented Pages:**
  - `Landing` (Unauthenticated marketing page with hero and globe UI placeholder)
  - `Login` (Mock auth screen with custom styling)
  - `Dashboard` (Full implementation with stat cards, recent activity, system health)
  - `ActorProfile` (Tabs, complex grids, confidence rings, and linked identifiers)
  - `RelationshipGraph` (Force-directed mock visualizer using absolute positioning SVG lines, nodes, and legends)
  - `Infrastructure` (Search form and visual correlation grid)
  - `Sources` (Data table with custom Status Dots)
  - `Evidence` (Evidence log table with view actions)
  - `Reports` (Export generation table with disabled states)
  - `Settings` (Form fields with custom SVG toggle switches)

## Next Steps (Docx Full-Feature Alignment)
While the core architecture and primary views are built, the following items from the *Final Proposed Solution* docx need to be implemented to complete the frontend demo:

1. **Interactive Sub-Views (Tabs):** 
   - Flesh out the `Activity Timeline`, `Identifiers`, and `Evidence` tab content on the **Actor Profile** page.
   - Flesh out the `Certificates`, `Server Info`, and `Correlation Results` tab content on the **Infrastructure Analysis** page.
2. **Stylometric & Behavioral Analysis UI:**
   - Create a dedicated UI component within the Actor Profile to visually showcase the "Stylometric persona identification" and "Behavioral profiling" (e.g., text comparison, timezone activity heatmaps).
3. **Global Search Results:**
   - Implement a functional Global Search mock that shows a results dropdown or a dedicated results page when typing in the Topbar.
4. **Interactive Graph Features:**
   - Enhance the Relationship Graph to show a detail popover when clicking on nodes (e.g., clicking `DarkVendorX` opens a mini-profile).
5. **Mock Data Layer:**
   - Extract the hardcoded arrays into a centralized `src/mocks/` directory so the app state can be interactive across pages without needing an actual backend.
