# ShadowLens — UI Context & Design System

Reference document for building the frontend. Source: approved UI mockup (10 screens) for **ShadowLens**, the investigator-facing dashboard for the ThreatLens / dark-web threat-actor de-anonymization platform (Problem Statement 26151, NTRO — Blockchain & Cybersecurity).

Product name shown in the UI: **ShadowLens**. Tagline: *"Different aliases. Same actor. A clearer picture."*

---

## 1. Design Language — Overview

- **Theme:** Dark mode only. Deep navy/near-black canvas with a single indigo/violet accent family plus semantic status colors (green/red/orange/teal/purple/blue).
- **Mood:** Serious, analytical, "security ops" — low visual noise, high information density, generous use of small badges/tags/confidence indicators, subtle glows instead of loud colors.
- **Grid:** Persistent left sidebar (≈220–240px) + top bar + main content area, on every authenticated screen. Only the landing page and login screen break this pattern.
- **Corner radius:** consistently rounded — cards `12–16px`, buttons/inputs `8–10px`, pills/badges `999px` (fully rounded), avatar/icon chips `8–12px` (squircle) or full circle for status dots and node avatars.
- **Density:** Compact padding (`12–16px` inside cards), tight line-height, small type scale (12–14px body) typical of admin/analyst tools.
- **Depth:** Almost flat. Separation comes from a 1px hairline border + a very slightly lighter fill, not drop shadows. Reserve soft shadows/glows for primary buttons and focused inputs only.

---

## 2. Color Palette

### 2.1 Base surfaces (dark navy scale)
| Token | Hex | Usage |
|---|---|---|
| `bg-canvas` | `#0A0E16` – `#10131C` | App/page background (landing hero, outermost canvas) |
| `bg-sidebar` | `#080F17` | Left navigation rail background |
| `bg-surface` | `#0B111D` | Main content area background (slightly lighter than canvas) |
| `bg-card` | `#0D1420` – `#0E151F` | Card / panel / table background |
| `bg-card-hover` | `#121A28` | Card / row hover state |
| `bg-input` | `#080D14` – `#0B1017` | Text input / search bar fill |
| `border-subtle` | `#1B2331` | Default 1px card/table/divider border |
| `border-strong` | `#2A3340` | Emphasized border (focused card, active tab underline area) |

> Rule of thumb: each layer is ~4–6% lighter than the one behind it (canvas < surface < card < hover), never a hard jump.

### 2.2 Accent — Indigo/Violet (primary brand color)
| Token | Hex | Usage |
|---|---|---|
| `accent-solid` | `#3D37CE` (base) → `#4B3FE0` (hover) | Primary filled buttons (Sign In, Analyze, +Add Source, +New Report) |
| `accent-gradient-start` | `#6D5EF5` | Gradient text / gradient button start ("Clearer Truths", "Get Started" button) |
| `accent-gradient-end` | `#7A7EFC` | Gradient text / gradient button end |
| `accent-soft-bg` | `#141B47` | Active sidebar item background, selected tab background |
| `accent-border` | `#3A3FA8` | Active/focused input border, active nav left indicator |
| `accent-text-link` | `#8C93F0` | Nav links (Home / Features / About), inline links |

Primary buttons use a **left-to-right violet→indigo-blue gradient** (`linear-gradient(90deg, #6D5EF5 0%, #4338CA 100%)` approximation) with a subtle outer glow (`box-shadow: 0 0 24px rgba(109,94,245,0.35)`). Secondary/outlined buttons use a 1px `accent-border` outline on transparent/`bg-card` fill.

### 2.3 Semantic / status colors
| Meaning | Color | Hex (text/icon) | Hex (badge bg, ~15% opacity fill) |
|---|---|---|---|
| Online / Active / Success / Up-trend | Green | `#22C55E` / `#34D399` | `#0E2E29` / `#0F1A1E` |
| High confidence / Alert / Actor node / Danger | Red | `#F4373D` / `#EF4444` | `#3A1116` |
| Medium confidence / Warning | Orange/Amber | `#ED7C14` / `#F59E0B` | `#522B0A` |
| Low/Weak confidence | Gray-blue | `#6B7280` | `#1B2331` |
| Infrastructure node / Onion service | Purple | `#8C61BD` / `#9764C9` | `#1F1435` |
| Identifier node (PGP/wallet/domain) | Blue | `#3B82F6` / `#5B8DEF` | `#10192E` |
| Source node | Teal-green | `#10B981` | `#0A1C1E` |
| "Potential Clearnet Correlation" badge | Teal | `#2FD9B0` text on `#0E2E29` bg | — |

### 2.4 Text colors
| Token | Hex | Usage |
|---|---|---|
| `text-primary` | `#F5F6FA` / `#FFFFFF` | Headings, primary values (e.g. "248", "DarkVendorX") |
| `text-secondary` | `#A6ADC3` / `#94A0B8` | Descriptions, labels, sub-copy |
| `text-muted` | `#6B7385` | Placeholder text, timestamps, tertiary labels |
| `text-link` | `#8C93F0` | Nav items, "Learn More", clickable text |
| `text-success` | `#34D399` | Trend indicators ("+12 this week"), Online labels |

### 2.5 Tags / pill chips (actor tags like "ransomware", "malware", "vendor")
Neutral dark chips, each a different faint hue at low opacity:
- Background: `rgba(255,255,255,0.05)` over `bg-card`, or tinted (`#1F1D35` purple-tint, `#1A253B` blue-tint, `#1F2935` gray-tint)
- Text: light gray `#C7CCDA`, `11–12px`, medium weight
- Fully rounded (`border-radius: 999px`), padding `2px 10px`

---

## 3. Typography

- **Font family:** Geometric/humanist sans, similar to **Inter / Manrope / Plus Jakarta Sans** (clean, tight tracking, tabular figures for stats).
- **Scale:**
  | Role | Size | Weight | Color |
  |---|---|---|---|
  | Hero headline (landing) | 40–48px | 700–800 | white, with gradient span on emphasis word |
  | Page title (e.g. "Dashboard", "Actor Profile") | 22–24px | 700 | `text-primary` |
  | Section/card title (e.g. "Recent Activity") | 14–15px | 600 | `text-primary` |
  | Body / table text | 13–14px | 400–500 | `text-secondary` |
  | Small label / meta (timestamps, "this week") | 11–12px | 400–500 | `text-muted` / `text-success` |
  | Stat number (e.g. "248", "1,420") | 28–32px | 700 | `text-primary`, tabular-nums |
  | Nav item | 13–14px | 500 | `text-secondary`, `text-primary`/white when active |
  | Button label | 13–14px | 600 | white |
- **Letter-spacing:** slightly tight on headings (-0.01em), normal elsewhere.
- **Line-height:** 1.3–1.4 for body, 1.15–1.2 for headings.

---

## 4. Global Layout (authenticated app shell)

Applies to screens 3–10 (Dashboard, Actor Profile, Relationship Graph, Infrastructure Analysis, Source Management, Evidence Viewer, Reports, Settings).

```
┌───────────┬──────────────────────────────────────────────┐
│           │  Top bar: [search input .......] [avatar ▾]  │
│  Sidebar  ├──────────────────────────────────────────────┤
│  (fixed)  │                                                │
│  ~230px   │   Main content (page title + description      │
│           │   + cards/grids/tables specific to the page)  │
│           │                                                │
└───────────┴──────────────────────────────────────────────┘
```

### 4.1 Sidebar
- Width: ~220–230px, full viewport height, `bg-sidebar` (`#080F17`), right hairline border `border-subtle`.
- Top: logo mark (shield/target icon in indigo) + wordmark **"ShadowLens"**, 16px bold white.
- Nav items (icon + label), in order: **Dashboard, Actors, Relationships, Infrastructure, Sources, Analysis, Evidence, Reports, Settings**.
- Item height ~40px, full-width row, `border-radius: 8px`, horizontal margin ~8px.
  - **Default:** transparent background, icon+label in `text-secondary` (`#94A0B8`).
  - **Active (current page):** background `accent-soft-bg` (`#141B47`), icon+label white/`accent-text-link`, no visible border needed (background fill is the indicator). Optionally a 2–3px indigo left-edge accent bar.
  - **Hover:** background `bg-card-hover`.
- Icons: 16–18px line icons (outline style, ~1.5px stroke) — e.g. grid/dashboard, users, share-nodes, server, database, radar/scan, folder-check, file-text, gear.

### 4.2 Top bar
- Height ~56–64px, `bg-surface`, bottom hairline border.
- Left/center: global search input, full remaining width up to a max, placeholder: *"Search actors, PGP keys, wallets, domains..."*, search icon inside on the left, `bg-input`, `border-subtle`, `border-radius: 8–10px`, height ~36–40px.
- Right: user avatar (circular, initial letter e.g. "A", indigo fill) + name/role text ("Analyst") + small chevron-down for a menu.

### 4.3 Page header (inside main content, top of every page)
- `H1` page title (22–24px bold white) — e.g. "Dashboard", "Actor Profile", "Relationship Graph".
- One-line gray subtitle directly beneath — e.g. *"Live intelligence, Connected insights."*, *"Analyze Tor hidden services and correlate with clearnet infrastructure."*
- Spacing below header before content: ~20–24px.

### 4.4 Cards (generic)
- `bg-card`, 1px `border-subtle`, `border-radius: 12–14px`, padding `16–20px`.
- Card title: 14px semibold white, optional trailing meta (e.g. a green "● Live" pill) top-right of the card.
- Grid gap between cards: 16–20px.

### 4.5 Buttons
| Variant | Fill | Text | Border | Use |
|---|---|---|---|---|
| Primary | Indigo gradient (`accent-gradient-start→end` or solid `accent-solid`) + soft glow | White, 600 | none | Sign In, Get Started, Analyze, +Add Source, +New Report |
| Secondary/Outline | Transparent / `bg-card` | White/light gray | 1px `border-subtle` or `accent-border` | Learn More, Watch, Export |
| Icon-only / ghost | Transparent | `text-secondary` | none | "⋯" row menus, ✎ / 👁 table actions, +/− graph zoom |
| Toggle (switch) | Track: `#232A3A` off / indigo `#4B3FE0` on; knob white | — | — | Settings toggles (Autonomous Collection Mode, Notifications) |

- Height: ~36–40px for standard buttons, ~44–48px for the login "Sign In" button.
- Border-radius: `8–10px` for rectangular buttons, `999px` for pill-style CTAs if used.
- Icon+label buttons put the icon at 14–16px, 6–8px gap before text.

### 4.6 Badges / status pills
Rounded-full (`999px`), small (`11–12px` text, `2–4px` vertical / `8–10px` horizontal padding), colored per §2.3:
- `High Confidence` — red text on dark red bg
- `Medium` — orange text on dark orange bg
- `Potential Clearnet Correlation` — teal text on dark teal bg
- `Online` — green dot + green text, no bg fill (used in tables/status lists)
- `Ready` / `Generating` (reports status) — green / orange pill

### 4.7 Tables (Sources, Evidence, Reports)
- Header row: `text-muted`, 11–12px, uppercase or sentence case, no background, bottom `border-subtle`.
- Body rows: 13–14px `text-secondary`/white, row height ~44–48px, bottom hairline between rows, hover = `bg-card-hover`.
- Status column renders a colored dot + label (e.g. green "Online").
- Actions column: "⋯" ghost icon button (opens row menu) and/or a 👁 (view) icon for evidence rows.
- Primary action button top-right of the table card (e.g. "+ Add Source", "+ New Report") — indigo gradient, small.

---

## 5. Screen-by-Screen Specification

### 5.1 Landing Page (Home) — unauthenticated, marketing
- Full-bleed dark canvas (`#10131C`), no sidebar.
- Top nav bar: logo + wordmark left; `Home / Features / About` links center-left (13–14px, `text-secondary`, active/hover → white); outlined **Login** button top-right (1px indigo border, transparent fill, `border-radius: 8px`).
- Hero (left column, ~45% width):
  - Eyebrow line "From" (regular weight, gray).
  - H1 across 2 lines: "Hidden Signals" (white, bold) / "to **Clearer Truths**" (last two words in indigo→violet gradient text).
  - Sub-copy (gray, 15–16px): "AI-assisted cyber threat intelligence platform for dark web threat actor de-anonymization."
  - Small process row: "Collect • Correlate • Analyze • Visualize" in `accent-text-link` indigo, separated by `•`.
  - Button row: **Get Started →** (primary gradient button with trailing arrow icon, glow) + **Learn More** (outline button).
  - Footer meta (bottom-left): "Prepared for" / bold "National Technical Research Organisation (NTRO)".
  - Footer meta (bottom-right): "Problem Statement ID: 26151" / "Blockchain & Cybersecurity (Software Category)".
- Hero (right column, ~55% width): abstract **network globe illustration** — a translucent wireframe globe/sphere with glowing nodes (teal `#2DD4BF` and red `#F4373D` dots) connected by thin red/teal lines, plus floating dark label chips ("Markets", "Identities", "Infrastructure", "Connections") pinned near nodes. Small caption top-right in indigo: "Different aliases. / Same actor. / A clearer picture." (3 short lines, right-aligned, gradient/indigo tone on emphasized words).
- This globe/network motif is the platform's signature visual — reuse a simplified version of it wherever the product needs an empty-state illustration or auth-page background texture.

### 5.2 Login / Authentication
- No sidebar; centered single card on a full-bleed dark background with a faint desaturated mountain/landscape photo (very low opacity, heavily darkened) behind it for texture — card itself sits on solid `bg-card`/near-black (`#060D15`).
- Card: ~340–380px wide, centered both axes, `border-radius: 16px`, 1px `border-subtle`, padding ~32px.
- Card content, vertically stacked & centered:
  1. Shield-with-checkmark or "eye" icon in a circular indigo-outlined badge.
  2. Wordmark "ShadowLens" (16–18px bold white).
  3. "Sign in to your account" (18–20px semibold white).
  4. "Authorized personnel only" (12px gray, centered).
  5. Field "Username" (label 12–13px gray, above input) → input `bg-input`, `border-subtle`, `border-radius: 8px`, height ~40px, placeholder "Enter username".
  6. Field "Password" → same input style, plus a right-aligned eye icon toggle for show/hide.
  7. **Sign In** button — full width, primary indigo gradient, `border-radius: 8–10px`, height ~44px, centered bold white label.
  8. Footer caption row (11px, muted, centered, `•`-separated): "Secure Access • NTRO Project • Audit Logged".

### 5.3 Dashboard (Overview)
- Standard app shell (sidebar + top bar).
- Header: "Dashboard" + subtitle "Live intelligence, Connected insights."
- Row of **4 stat cards** (equal width, horizontal row): Total Actors, Identifiers, Infrastructure Indicators, Sources Monitored.
  - Each card: small label top (gray) + small icon top-right (people/id/server/list, in a soft rounded icon chip), big bold number below, small green trend line beneath (e.g. "↗ +12 this week") — except "Sources Monitored" which shows a green "● Online" status instead of a trend.
- Below, a **2-column row**:
  - Left (wider, ~65%): "Recent Activity" card — a vertical list of 5 timeline rows, each with a small colored square icon (red/blue/purple per event type), an event description, and a muted timestamp ("2 hours ago") right-aligned or beneath.
  - Right (~35%), stacked as two cards:
    - "Collection Status" card, header with green "● Live" pill top-right; list of source types (Tor Forums, Marketplaces, Leak Sites, Manual Sources) each with a green "Online" label right-aligned.
    - "System Health" card: 3 circular progress rings side by side (Collection 92%, Analysis 87%, Database 96%), each ring in a different accent hue (teal/blue/green), percentage centered inside the ring, label beneath.

### 5.4 Actor Profile Page
- Sidebar shows **Actors** highlighted (note: mock shows Dashboard highlighted in this frame — keep highlight in sync with actual route, i.e. Actors section active when viewing a profile).
- Header row (card-like, not a full card — sits directly under page title "Actor Profile"): circular actor avatar (dark red hooded-figure icon), actor handle "DarkVendorX" (bold white, 18–20px) + inline **High Confidence** red badge next to it, sub-line "Marketplace Vendor · Active since 2022" (gray). Right-aligned: **Watch** (outline button w/ eye icon) and **Export** (outline button w/ download icon) and a "⋯" overflow icon.
- Tab bar beneath: **Overview | Identifiers (4) | Relationships (7) | Activity Timeline | Evidence (12)** — underline/indigo-text on active tab ("Overview"), gray inactive tabs, count badges in parentheses.
- Below tabs, **3-column card row**:
  - "Basic Information" card: label/value pairs stacked (Primary Handle, Category, First Seen/Last Seen as a 2-col mini-grid, Activity Status with a green dot + "Active", Tags as pill chips at the bottom: `ransomware`, `malware`, `vendor`, `russia (suspected)`).
  - "Linked Identifiers" card: rows each with a small square icon (PGP=blue key icon, Bitcoin=orange ₿ icon, Tor address=purple onion/mask icon, Email=pink envelope icon), a label, and a monospaced-looking truncated value (e.g. "0xA3F...9D2C", "bc1q...n64k9"); footer link "+2 more identifiers" in indigo.
  - "Confidence" card: large circular gradient progress ring (72%, ring blends blue→teal→purple), percentage bold centered; beneath, a stacked legend of contributing factors with colored dot + label + percentage (Infrastructure 30%, Identifier Reuse 25%, Behavioral Analysis 25%, Source Reliability 20%).

### 5.5 Relationship Graph
- Header: "Relationship Graph" + subtitle "Visualize connections between actors, identifiers and infrastructure."
- Toolbar row: **Search node...** input (left, ~40% width) + **All Types** dropdown + **All Relationships** dropdown (both `bg-card`, `border-subtle`, chevron icon, ~160–180px wide).
- Main canvas: large card, near-black, containing a **force-directed / radial node graph**:
  - Center node: "DarkVendorX" — red circular avatar node (actor), largest node, red glow.
  - Surrounding nodes at radial positions, each a circle with an icon + label beneath: identifier nodes in blue (PGP key, wallet), infrastructure node in purple (Onion Service), other actor nodes in red (SilentCrow, EvilCore), source/platform nodes in green (XMarket, BlackForum).
  - Thin connecting lines (edges) from center to each node, color matching the "to" node's category or a neutral gray.
  - Bottom-left legend: colored dot + label row — "● Actor (red) ● Identifier (blue) ● Infrastructure (purple) ● Source (green)".
  - Bottom-right floating controls: `+` / `−` zoom buttons and an expand/fullscreen icon, stacked vertically, small square ghost buttons on `bg-card` with border.

### 5.6 Infrastructure Analysis
- Header: "Infrastructure Analysis" + subtitle "Analyze Tor hidden services and correlate with clearnet infrastructure."
- Input row: large search/input field "Enter onion domain, certificate, or indicator..." (left, wide) + primary **Analyze** button (indigo gradient, right).
- "Analysis Result" card:
  - Header row: card title "Analysis Result" + teal **Potential Clearnet Correlation** badge.
  - Queried value shown large/bold: "darkvendx7q2k3.onion".
  - Sub-tab row: **Overview | Certificates (1) | Server Info | Correlation Results** (same tab style as Actor Profile).
  - Two-column detail grid:
    - "Observed Details": Service Banner, SSL Certificate (if any), Server Status ("Exposed (yes)" — flagged/warning tone), Last Observed — each as label (gray, small) above value (white).
    - "Correlation": Related Clearnet Domain, IP Address (historical), Confidence (**Medium** orange badge), Evidence (short text, e.g. "Certificate match, identical key").

### 5.7 Source Management
- Header: "Sources" + subtitle "Manage intelligence sources and collection status." + primary **+ Add Source** button top-right (indigo gradient).
- Single table card, columns: **Source Name | Type | Status | Last Collected | Actions**.
  - Rows: DarkForum (Forum), XMarket (Marketplace), LeakBase (Leak Site), Manual Intel (Manual Entry), Research Feed (RSS/Feed) — all Status = green "● Online" pill.
  - Actions column: "⋯" ghost icon per row.

### 5.8 Evidence Viewer
- Header: "Evidence" + subtitle "View supporting evidence for correlations and claims."
- Table card, columns: **Type | Description | Source | Date | (view icon)**.
  - Type values show as small tagged text (PGP Key, Screenshot, Certificate, Transaction, Text Sample).
  - Description is a short phrase (e.g. "Public key block", "SSL certificate (CN=darkve...)").
  - Rightmost column: 👁 ghost icon button to open full evidence detail.

### 5.9 Reports
- Header: "Reports" + subtitle "Generate and export analytical reports." + primary **+ New Report** button top-right.
- Table card, columns: **Report Name | Type | Created On | Status | (download icon)**.
  - Status pill: green **Ready**, or orange **Generating** (in-progress state, distinct color from Ready).
  - Rightmost column: download icon ghost button (disabled/greyed while status = Generating, active once Ready).

### 5.10 Settings
- Header: "Settings" + subtitle "Configure system preferences."
- Sub-tab row: **General | Collection | Analysis | Security** (same underline/active-indigo tab style).
- "General" panel content (list of setting rows inside a card), each row = label + description (stacked, left) and a control (right-aligned):
  - "Autonomous Collection Mode" (desc: "Automatically collect and process new data") → toggle switch, ON (indigo).
  - "Notifications" (desc: "Alert on new high-confidence correlations") → toggle switch, ON (indigo).
  - "Data Retention (days)" → numeric/select input showing "365", `bg-input` dropdown style.
  - "Export Format (default)" → select input showing "PDF", dropdown chevron.
- Divider (hairline) between each setting row.

---

## 6. Iconography & Illustration

- Icon set: outline/line-style icons, ~1.5–1.75px stroke, 16–20px, in `text-secondary` by default and white/accent when active — consistent with **Lucide** or **Feather** icon sets (shield, search, grid, users, share-2/git-branch, server, database, radar, folder, file-text, settings/gear, eye, download, plus, minus, maximize, chevron-down, chevron-right, more-horizontal).
- Category icons carry semantic color even outside nodes: PGP key = blue key icon, Bitcoin wallet = orange ₿ icon, Tor/onion address = purple onion or mask glyph, email = pink/magenta envelope, infrastructure/server = purple, actor/person = red.
- Decorative illustration: the landing-page globe (wireframe sphere, glowing red/teal nodes, thin connecting arcs) is the one bespoke illustration in the system — treat it as the brand's signature visual for empty states, auth backgrounds, or marketing sections; everything else in the product is icon + data, no illustration.

## 7. Spacing & Sizing Scale

Use a 4px base scale: `4, 8, 12, 16, 20, 24, 32, 40, 48px`.
- Page padding (main content area): 24–32px on all sides.
- Card padding: 16–20px.
- Gap between stat cards / grid cards: 16–20px.
- Gap between sidebar icon and label: 10–12px.
- Input/button height: 36–40px standard, 44–48px for hero/login primary actions.
- Border radius scale: `6px` (chips/tags edge case), `8px` (inputs, small buttons), `10–12px` (buttons, dropdowns), `12–16px` (cards, modals), `999px` (pills, badges, avatars).

## 8. Interaction States

- **Hover:** background lightens one step (`bg-card` → `bg-card-hover`); buttons brighten gradient slightly and intensify glow; table rows tint.
- **Active/selected (sidebar item, tab):** filled indigo-tinted background (sidebar) or bottom indigo underline + indigo text (tabs).
- **Focus (inputs):** border becomes `accent-border` indigo, optional faint outer glow ring (`0 0 0 3px rgba(76,63,224,0.25)`).
- **Disabled:** 40–50% opacity, no hover response, cursor not-allowed (e.g. download icon on a "Generating" report row).
- **Loading/live:** small pulsing green dot for "Live"/"Online" indicators.

## 9. Data-Visualization Conventions

- **Confidence rings / progress circles:** circular, stroke-based (not filled pie), gradient stroke sweeping from one accent hue to another, bold percentage centered, thin track color `border-subtle` for the unfilled portion.
- **Confidence badges (text):** 4-tier system per the platform's evidence model — map to color:
  - Confirmed → green
  - Strong → teal/blue-green
  - Moderate → orange/amber
  - Weak/Lead → gray
  (Screens shown only exercise "High Confidence" = red-tier styling for an actor-level badge and "Medium" = orange for an infrastructure correlation — keep the palette in §2.3 as the canonical mapping and extend consistently for Confirmed/Strong/Weak.)
- **Relationship graph:** node color = entity type (red actor / blue identifier / purple infrastructure / green source), node size = prominence/degree, edge = thin gray-to-accent line, always paired with a legend.
- **Trend indicators:** small up-arrow + green text for positive week-over-week change next to stat numbers.

---

## 10. Build Notes

- Recommended stack alignment (from project proposal): **Next.js + React + TypeScript + Tailwind CSS**, with a React graph library (React Flow or Cytoscape.js) for the Relationship Graph view. Tailwind config should encode the tokens in §2 as custom theme colors (`bg.canvas`, `bg.sidebar`, `bg.card`, `accent.solid`, `accent.gradientFrom/To`, `status.green/red/orange/teal/purple/blue`) so every screen pulls from the same palette rather than one-off hex values.
- Keep the sidebar + top bar as a shared authenticated layout component; only Landing and Login opt out of it.
- Every "confidence"/"status" surface (badges, rings, dots) should route through one shared `<ConfidencePill>` / `<StatusDot>` component keyed by tier, so the color mapping in §2.3/§9 stays consistent app-wide instead of being re-implemented per page.
