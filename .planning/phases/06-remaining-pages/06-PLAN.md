---
phase: 6
name: Infrastructure, Sources, Evidence, Reports, and Settings Redesign
wave: 1
depends_on: [1, 2, 4]
files_modified:
  - client/src/pages/Infrastructure.tsx
  - client/src/pages/Sources.tsx
  - client/src/pages/Evidence.tsx
  - client/src/pages/Reports.tsx
  - client/src/pages/Settings.tsx
autonomous: true
requirements:
  - REQ-008
  - REQ-009
  - REQ-013
must_haves:
  - Infrastructure page redesigned with visual pipeline topology, server nodes, IP nodes, domain nodes, and relationship links.
  - Sources page redesigned with source cards, status indicators, ingestion metrics, and source health graphs.
  - Evidence page redesigned with dark cyber editorial table, search/filter controls, item preview drawers, and tag badges.
  - Reports page redesigned with editorial report cards, export options, threat level badges, and detailed report modal/view.
  - Settings page redesigned with clean, restrained cyber controls, API key management, theme toggles, and notification preferences.
  - All existing data flows, state handlers, filters, and export handlers preserved completely.
---

# Phase 6: Infrastructure, Sources, Evidence, Reports, and Settings Redesign

## Goal
Redesign all remaining secondary views (`Infrastructure.tsx`, `Sources.tsx`, `Evidence.tsx`, `Reports.tsx`, `Settings.tsx`) to match the elite near-black and electric green tactical intelligence aesthetic. Every page maintains 100% of existing functionality, routes, mock data bindings, state handlers, and user interactions.

---

## Action Items

### 1. Redesign `Infrastructure.tsx` (`client/src/pages/Infrastructure.tsx`)
- Implement tactical infrastructure node layout showing servers, IP blocks, C2 infrastructure, and domain bindings.
- Add visual pipeline flow diagram with electric green node connections and pulse animations.
- Implement node status indicators (Active, Inactive, Compromised, Monitored).
- Preserve existing node inspection modals, filter state, and search functionality.

### 2. Redesign `Sources.tsx` (`client/src/pages/Sources.tsx`)
- Redesign threat intelligence source cards with dark surface cards (`#0e1112`), subtle green borders, and live telemetry feeds.
- Display ingestion status, last synced timestamps, confidence scores, and raw byte rates.
- Add source toggle switches with electric green glowing accents.
- Preserve source configuration handlers and data fetching logic.

### 3. Redesign `Evidence.tsx` (`client/src/pages/Evidence.tsx`)
- Implement dark cyber editorial table layout with mono-font column headers, index markers (`01`, `02`), and high-density data rows.
- Add filter bar with pill selectors for evidence types (Hash, PCAP, Log, IOC, Artifact).
- Implement slide-over evidence inspector drawer with raw hex/text view, SHA-256 signatures, and relationship links.
- Preserve search filtering, pagination, selection state, and export triggers.

### 4. Redesign `Reports.tsx` (`client/src/pages/Reports.tsx`)
- Create editorial intelligence brief layout with card grid featuring report metadata (TLP classification, threat level, target industry, publication date).
- Add "Export Brief" action buttons with tactical bracket borders.
- Include full-screen report viewer modal with clean monospace typography, executive summaries, and IOC appendix.
- Preserve report search, filter by TLP color (RED, AMBER, GREEN, WHITE), and download handlers.

### 5. Redesign `Settings.tsx` (`client/src/pages/Settings.tsx`)
- Redesign workspace settings, API key management, alert thresholds, and integration endpoints with restrained, precision controls.
- Style form controls with dark input fields, glowing green focus rings, and crisp monospace labels.
- Add active session management list with IP geolocation markers.
- Preserve form submit state, toast notifications, and setting persistence logic.

---

## Verification Criteria
- [ ] Infrastructure visual topology renders all nodes and connections cleanly.
- [ ] Sources page displays real-time telemetry metrics and controls without breaking.
- [ ] Evidence table filter, search, detail drawer, and selection state work as expected.
- [ ] Reports page renders report cards, classification tags, and detail view smoothly.
- [ ] Settings form fields save state and handle interactions cleanly.
- [ ] All 5 pages fit seamlessly into the Global Shell layout.
- [ ] `npm run build` passes with zero TypeScript or Tailwind compilation errors.
