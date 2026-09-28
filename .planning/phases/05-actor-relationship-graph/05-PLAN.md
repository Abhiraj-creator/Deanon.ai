---
phase: 5
name: Actor Profile + Relationship Graph Redesign
wave: 1
depends_on: [1, 2, 4]
files_modified:
  - client/src/pages/ActorProfile.tsx
  - client/src/pages/RelationshipGraph.tsx
  - client/src/components/visual/ConfidenceRing.tsx
autonomous: true
requirements:
  - REQ-006
  - REQ-007
  - REQ-013
must_haves:
  - Actor Profile has editorial large typographic header (not giant avatar card)
  - Horizontal editorial tabs with animated green underline (not pill tabs)
  - Confidence ring animates on mount with sequential reveal
  - Relationship graph is near-black with thin curved connections
  - Graph controls float elegantly (no heavy toolbar)
  - Node hover dims unrelated nodes, highlights connected ones
  - All existing graph data (GRAPH_NODES, GRAPH_EDGES, NODE_EVIDENCE) preserved
  - All existing actor data from mocks/data.ts preserved
  - Selected node detail panel still shows evidence
---

# Phase 5: Actor Profile + Relationship Graph Redesign — Plan

## Objective
Transform ActorProfile into a case-file styled investigation view. Transform RelationshipGraph into the visual centerpiece of THREATLENS with precise green linework, animated load, and sophisticated node interaction. Both must preserve all existing data and functionality.

---

## Wave 1 — Actor Profile (partial: header + tabs + confidence)

### Task 5.1: Redesign ActorProfile.tsx Header + Tab System

<read_first>
- client/src/pages/ActorProfile.tsx — Current implementation (26KB — READ ALL sections)
- client/src/mocks/data.ts — ACTORS data structure (ActorId, actor properties)
- client/src/components/ui/Badges.tsx — StatusDot, ConfidencePill
- client/src/components/visual/ConfidenceRing.tsx — Existing confidence ring component
- client/src/app/App.css — Token system
</read_first>

<action>
Read ActorProfile.tsx fully. Understand:
- What tabs exist (Identifiers, Relationships, Activity, Evidence, Infrastructure, AI Analysis)
- What state variables manage tab selection and actor selection
- What data comes from mocks/data.ts
- What the current header looks like

Then redesign the HEADER section and TAB system while preserving all tab content logic:

### New Header Design (replace old actor card header):
```tsx
<div className="mb-8">
  {/* Section index + breadcrumb */}
  <div className="flex items-center gap-2 mb-6">
    <p className="section-index">02 / ACTORS</p>
    <span className="text-border-strong">—</span>
    <p className="section-index text-text-muted">{actor.handle}</p>
  </div>

  {/* Case file header */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8 border-b border-border-subtle">
    {/* Left: Main identification */}
    <div className="lg:col-span-2">
      <h1 className="text-text-primary mb-2" style={{fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1}}>
        {actor.handle}
      </h1>
      <p className="text-text-muted text-sm mb-4">{actor.category}</p>

      {/* Key data in a technical metadata row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {[
          { label: 'PRIMARY HANDLE', value: actor.handle },
          { label: 'CATEGORY', value: actor.category },
          { label: 'FIRST SEEN', value: actor.firstSeen },
          { label: 'ACTIVITY STATUS', value: actor.activityStatus || 'ACTIVE' },
        ].map((meta) => (
          <div key={meta.label}>
            <p className="section-index mb-1">{meta.label}</p>
            <p className="text-text-primary text-sm font-medium">{meta.value}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Right: Confidence Ring */}
    <div className="flex flex-col items-start lg:items-end">
      <p className="section-index mb-3">CONFIDENCE SCORE</p>
      <ConfidenceRing confidence={actor.confidence || 72} />
    </div>
  </div>
</div>
```

### New Tab System:
Replace pill/button tabs with horizontal editorial underline tabs:

```tsx
{/* Tab navigation */}
<div className="border-b border-border-subtle mb-8">
  <div className="flex items-center gap-0 overflow-x-auto">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`relative px-4 py-3 text-xs tracking-wide uppercase whitespace-nowrap transition-colors ${
          activeTab === tab.id
            ? 'text-text-primary'
            : 'text-text-muted hover:text-text-secondary'
        }`}
      >
        {tab.label}
        {/* Animated green underline */}
        <span className={`absolute bottom-0 left-0 right-0 h-px transition-all duration-300 ${
          activeTab === tab.id ? 'bg-accent-solid' : 'bg-transparent'
        }`} />
      </button>
    ))}
  </div>
</div>
```

Keep all existing tab content exactly as-is — only change the tab button visual styling.

### Actor Selector (top of page — preserve existing):
The actor selector (dropdown or list to switch between DarkVendorX, SilentCrow, AlphaBay_Seller) should be preserved. Restyle it as a compact editorial selector if it currently exists as a dropdown or button group.
</action>

<acceptance_criteria>
- `client/src/pages/ActorProfile.tsx` compiles without TypeScript errors
- File contains `section-index` class in the header
- File contains `border-b border-border-subtle mb-8` for the tab container
- File contains `bg-accent-solid` for the active tab underline indicator
- File does NOT contain `rounded-full` or `rounded-lg` for tab buttons
- All existing tab content (identifiers, relationships, evidence, etc.) still renders
- Actor data from mocks/data.ts still used
- ConfidenceRing still renders in the header
- `grep -c "6D5EF5" client/src/pages/ActorProfile.tsx` returns 0
</acceptance_criteria>

---

## Wave 1 — Confidence Ring Enhancement (parallel with Task 5.1)

### Task 5.2: Enhance ConfidenceRing Component

<read_first>
- client/src/components/visual/ConfidenceRing.tsx — Current full implementation
</read_first>

<action>
Read the current ConfidenceRing.tsx. Enhance it to:

1. **Animate the ring drawing on mount**: The SVG arc should start at 0 (stroke-dashoffset = circumference) and animate to the target value over 1.2 seconds when the component first renders.

```tsx
// Add useEffect to animate:
useEffect(() => {
  const timer = setTimeout(() => setAnimated(true), 100);
  return () => clearTimeout(timer);
}, []);

// In SVG:
<circle
  // ...existing props
  style={{
    strokeDashoffset: animated ? offset : circumference,
    transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
  }}
/>
```

2. **Use token colors**: 
   - Track ring: `stroke="rgba(36, 42, 37, 1)"` (--color-border-subtle)
   - Main arc: `stroke="#39ff68"` (or `stroke="var(--color-accent-solid)"`) — but SVG doesn't support CSS vars for stroke in all browsers, so use the hex directly: `#39ff68`

3. **Show confidence percentage in center**: Large number + "%" sign
   ```tsx
   <text x="36" y="38" textAnchor="middle" fontSize="16" fontWeight="700" fill="#f2f5ef" fontFamily="Inter, sans-serif">
     {confidence}
   </text>
   <text x="36" y="52" textAnchor="middle" fontSize="9" fill="#6b7469" fontFamily="Inter, sans-serif">
     CONFIDENCE
   </text>
   ```

4. **Sequential contributing factors reveal** below the ring:
```tsx
{factors.map((factor, i) => (
  <div
    key={factor}
    className="flex items-center gap-2 mt-2 transition-all duration-300"
    style={{ opacity: animated ? 1 : 0, transform: animated ? 'translateY(0)' : 'translateY(4px)', transitionDelay: `${0.8 + i * 0.1}s` }}
  >
    <span className="w-1 h-1 rounded-full bg-accent-solid" />
    <span className="text-[9px] text-text-muted uppercase tracking-wide">{factor}</span>
  </div>
))}
```

Pass factors as a prop or define default factors: `['INFRASTRUCTURE', 'IDENTIFIER REUSE', 'BEHAVIORAL ANALYSIS', 'SOURCE RELIABILITY']`
</action>

<acceptance_criteria>
- `client/src/components/visual/ConfidenceRing.tsx` compiles without TypeScript errors
- File contains `useState` and `useEffect` for animation
- File contains `transition: 'stroke-dashoffset` for the ring draw animation
- File renders confidence percentage as a number in the SVG center
- File contains contributing factors that animate in sequentially
- Ring uses `#39ff68` for accent color
</acceptance_criteria>

---

## Wave 2 — Relationship Graph Redesign

### Task 5.3: Redesign RelationshipGraph.tsx

<read_first>
- client/src/pages/RelationshipGraph.tsx — Current full implementation (19KB — READ ALL)
- client/src/lib/graphModel.ts — GRAPH_NODES, GRAPH_EDGES, NODE_EVIDENCE, GraphNode, GraphEdge types
- client/src/mocks/data.ts — Actor data for node popups
- client/src/app/App.css — Token system
</read_first>

<action>
Read RelationshipGraph.tsx completely. Understand:
- How nodes are positioned (currently percentage-based absolute positioning)
- How edges are drawn (currently SVG lines between positioned nodes)
- What the selected node detail panel shows
- What controls exist (zoom, filter, fullscreen)
- What state manages selection

Redesign the graph visual while preserving ALL the interaction logic:

### Key Visual Changes:

**1. Near-black canvas with subtle grid:**
The graph container should be `bg-canvas` (near-black #050605) with a very subtle dot grid or line grid overlay (opacity 0.04).

**2. Node visual redesign:**
Each node type gets a distinct treatment:
- Actor nodes: White core (#f2f5ef), 18-22px radius, green outer glow ring (rgba(57,255,104,0.15))
- Identifier nodes (PGP, wallet): Info blue (#5c8dff) core, 12-16px radius
- Infrastructure nodes: Purple (#9b75d0) core, 14-18px radius
- Source nodes: Teal (#2ed7b0) core, 10-14px radius

Node structure (SVG group per node):
```tsx
<g key={node.id} transform={`translate(${xPx}, ${yPx})`}
  className="cursor-pointer"
  onClick={() => handleNodeClick(node.id)}
>
  {/* Outer glow ring — only for selected or actor type */}
  {(selectedNode === node.id || node.type === 'actor') && (
    <circle r={nodeRadius + 8} fill="none" stroke={node.glowColor} strokeWidth="1" opacity="0.3" />
  )}
  {/* Node core */}
  <circle r={nodeRadius} fill={node.fillColor} opacity={0.9} />
  {/* Label */}
  <text y={nodeRadius + 14} textAnchor="middle" fontSize="9" fill="#a4aca1" fontFamily="Inter, sans-serif">
    {node.label}
  </text>
</g>
```

**3. Edge visual redesign:**
Edges should be thin, slightly curved paths (not straight lines). Use SVG `<path>` with a slight quadratic bezier:
```tsx
// For each edge from nodeA to nodeB:
const mx = (ax + bx) / 2 + (Math.random() - 0.5) * 40; // slight random curve midpoint
const my = (ay + by) / 2 + (Math.random() - 0.5) * 40;
<path
  d={`M ${ax} ${ay} Q ${mx} ${my} ${bx} ${by}`}
  fill="none"
  stroke={edge.confidence === 'High' ? 'rgba(57,255,104,0.3)' : 'rgba(57,255,104,0.12)'}
  strokeWidth={edge.confidence === 'High' ? '1' : '0.5'}
  className="pointer-events-none"
/>
```

**4. Hover interaction — dim unrelated nodes:**
On node hover (mouseEnter/Leave), update a `hoveredNode` state. In rendering, nodes NOT connected to hoveredNode get opacity 0.2, connected nodes get opacity 1.

```tsx
const [hoveredNode, setHoveredNode] = useState<string | null>(null);

// Helper: is node connected to hovered?
const isConnected = (nodeId: string) => {
  if (!hoveredNode) return true;
  if (nodeId === hoveredNode) return true;
  return GRAPH_EDGES.some(e =>
    (e.from === hoveredNode && e.to === nodeId) ||
    (e.to === hoveredNode && e.from === nodeId)
  );
};

// In node render:
<g style={{ opacity: isConnected(node.id) ? 1 : 0.15, transition: 'opacity 0.2s' }}>
```

**5. Floating controls:**
The zoom/filter/reset controls should float in the top-right of the graph canvas:
```tsx
<div className="absolute top-4 right-4 z-10 flex flex-col gap-1">
  {[
    { label: '+', title: 'Zoom in', action: handleZoomIn },
    { label: '−', title: 'Zoom out', action: handleZoomOut },
    { label: '⊡', title: 'Reset', action: handleReset },
  ].map((ctrl) => (
    <button key={ctrl.label}
      title={ctrl.title}
      onClick={ctrl.action}
      className="w-8 h-8 border border-border-subtle bg-panel/80 backdrop-blur-sm text-text-muted hover:text-text-primary hover:border-border-strong text-sm transition-colors flex items-center justify-center"
    >
      {ctrl.label}
    </button>
  ))}
</div>
```

**6. Selected node detail panel:**
The detail panel should slide in from the right as a side panel (not a popup overlay). Use a CSS transition:
```tsx
<div className={`absolute right-0 top-0 bottom-0 w-72 bg-panel/95 backdrop-blur-sm border-l border-border-subtle transform transition-transform duration-300 ${selectedNode ? 'translate-x-0' : 'translate-x-full'}`}>
```

**7. Legend:**
Move the legend to the bottom-left. Use minimal editorial styling:
```tsx
<div className="absolute bottom-4 left-4 flex flex-col gap-1.5">
  <p className="section-index mb-1">ENTITY TYPES</p>
  {legendItems.map(item => (
    <div key={item.label} className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full" style={{background: item.color}} />
      <span className="text-[9px] text-text-muted uppercase tracking-wide">{item.label}</span>
    </div>
  ))}
</div>
```

Preserve ALL existing functionality:
- Node click → selectedNode state change → detail panel open/close
- NODE_EVIDENCE data shown in panel
- Any filter controls that exist
- Zoom state if it exists
</action>

<acceptance_criteria>
- `client/src/pages/RelationshipGraph.tsx` compiles without TypeScript errors
- File imports from `../../lib/graphModel` (GRAPH_NODES, GRAPH_EDGES, NODE_EVIDENCE) — preserved
- File contains `hoveredNode` state for hover dimming effect
- File contains `isConnected` helper function
- File contains SVG `<path>` for edges (NOT straight `<line>` elements)
- File contains floating controls div positioned `absolute top-4 right-4`
- Selected node detail panel uses `translate-x-full` / `translate-x-0` transition
- File does NOT contain `#6D5EF5` or `#4338CA` as edge/node colors
- `grep -c "39ff68" client/src/pages/RelationshipGraph.tsx` returns at least 2
</acceptance_criteria>

---

## Verification
1. Visit /actors — verify case-file header renders, confidence ring animates
2. Click tabs — verify all tabs switch and content shows
3. Visit /relationships — verify graph canvas is near-black
4. Hover a node — verify other nodes dim
5. Click a node — verify detail panel slides in from right
6. Verify edges are curved paths with green color

## Output Required
Reply with `## PLANNING COMPLETE`
