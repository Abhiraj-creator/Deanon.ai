---
phase: 4
name: Login + Dashboard Redesign
wave: 1
depends_on: [1, 2]
files_modified:
  - client/src/pages/Login.tsx
  - client/src/pages/Dashboard.tsx
autonomous: true
requirements:
  - REQ-004
  - REQ-005
  - REQ-013
must_haves:
  - Login is already good — minimal enhancements only
  - Dashboard has editorial information hierarchy (large metric numbers, NOT tiny card numbers)
  - Dashboard activity stream uses hairline rules + large event titles (NOT rounded card timeline)
  - Dashboard collection status looks like a technical monitoring strip
  - All existing data (hardcoded arrays) preserved — no data changes
  - No purple/indigo colors (HealthRing currently uses hardcoded #6D5EF5 — replace with token)
---

# Phase 4: Login + Dashboard Redesign — Plan

## Objective
The Login page already has a good redesigned structure (near-black, editorial, SignalField background). Enhance it slightly. Completely redesign the Dashboard to use editorial information hierarchy with large metric blocks, an editorial activity stream, and a compact collection status strip.

## Login.tsx — Current State Assessment
The current Login.tsx already uses:
- `bg-canvas` (near-black background)
- `SignalField` animated background
- Editorial "THREATLENS" / "Authorized Intelligence Access" typography
- Meta-label styled form labels
- Green focus states
- Technical footer (Secure Access, Audit Logged, Authorized Personnel Only)

This is ALREADY well-designed. Only minor enhancements needed.

---

## Wave 1 — Login Enhancements (small changes)

### Task 4.1: Minor Login.tsx Enhancements

<read_first>
- client/src/pages/Login.tsx — Current full implementation (76 lines)
- client/src/components/visual/SignalField.tsx — Current SignalField implementation
</read_first>

<action>
Make only these specific changes to `client/src/pages/Login.tsx`:

1. **Remove border-radius** from the form container (currently `bg-panel/90 backdrop-blur-sm p-8 md:p-10` — change from any rounded styles to no rounding, just `border border-border-subtle`). Already has no border-radius — verify this.

2. **Add subtle technical frame**: Add a very subtle top horizontal line before the THREATLENS text:
```tsx
<div className="mb-10">
  <div className="h-px bg-accent-soft/30 mb-8" /> {/* Thin accent rule */}
  <p className="text-xs tracking-[0.35em] font-semibold text-text-primary">THREATLENS</p>
  // ... rest of header
```

3. **Enhance the submit button**: The Button component's primary variant already has green border. Add `showArrow` to existing button call and `uppercase tracking-widest text-xs` — which is already there. Verify the button renders correctly.

4. **Add a tiny decorative section index** above THREATLENS:
```tsx
<p className="section-index mb-3">// ACCESS PORTAL</p>
```

No other changes. The login is already well-designed.
</action>

<acceptance_criteria>
- `client/src/pages/Login.tsx` compiles without TypeScript errors
- Form still submits and navigates to /dashboard (handleLogin preserved)
- Show/hide password toggle still works
- File contains `// ACCESS PORTAL` or similar section index label
- No visual regressions
</acceptance_criteria>

---

## Wave 2 — Dashboard Redesign (major change)

### Task 4.2: Redesign Dashboard.tsx

<read_first>
- client/src/pages/Dashboard.tsx — Current full implementation (ALL 283 lines — read completely)
- client/src/components/ui/Card.tsx — Card component API
- client/src/components/ui/Button.tsx — Button component API
- client/src/components/ui/Badges.tsx — StatusDot, ConfidencePill API
- client/src/lib/intelligenceMetrics.ts — Metrics data (if any)
- client/src/app/App.css — Token system
</read_first>

<action>
Rewrite `client/src/pages/Dashboard.tsx` with an editorial information hierarchy. Preserve ALL data arrays (timelineEvents, alerts, the stat data, source data, pipeline data).

### New Dashboard Structure:

**Page Header Block:**
```tsx
<div className="mb-10">
  <p className="section-index mb-3">01 / OVERVIEW</p>
  <h1 className="text-text-primary" style={{fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1}}>
    INTELLIGENCE<br />
    <span style={{fontWeight: 600}}>OVERVIEW</span>
  </h1>
  <p className="text-text-muted text-xs tracking-wide mt-2">Live intelligence. Connected insights.</p>
</div>
```

**Metric Blocks (editorial style — NOT cards):**
Replace the 4 card grid with an editorial metric strip. Use a horizontal grid with hairline vertical separators:

```tsx
<div className="grid grid-cols-2 lg:grid-cols-4 mb-10">
  {metrics.map((m, i) => (
    <div key={i} className={`py-6 ${i > 0 ? 'border-l border-border-subtle' : ''} ${i > 0 ? 'pl-6' : ''} ${i < 3 ? 'pr-6' : ''}`}>
      <p className="section-index mb-2">{m.label}</p>
      <p className="text-text-primary tabular-nums" style={{fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em'}}>
        {m.value}
      </p>
      {m.trend && <p className="text-xs text-status-green mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" />{m.trend}</p>}
      {m.online && <div className="flex items-center gap-1.5 mt-2"><span className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse-subtle" /><span className="text-[10px] text-status-green uppercase tracking-wide">Online</span></div>}
    </div>
  ))}
</div>
```

Metrics data (preserve existing values):
```tsx
const metrics = [
  { label: 'OBSERVED ACTORS', value: '1,248', trend: '+12 THIS WEEK', clickTo: '/actors' },
  { label: 'RELATIONSHIPS', value: '8,420', trend: '+342 THIS WEEK', clickTo: '/relationships' },
  { label: 'INFRASTRUCTURE', value: '3,104', trend: 'INDICATORS', clickTo: '/infrastructure' },
  { label: 'SOURCES MONITORED', value: '37', online: true, clickTo: '/sources' },
];
```

Add `cursor-pointer` and `onClick={() => navigate(m.clickTo)}` to each metric block.

**Main Grid (2/3 left + 1/3 right):**

**LEFT COLUMN — Alerts (editorial style):**

Replace the rounded card list with editorial rows:
```tsx
<div>
  <div className="flex items-center justify-between mb-6">
    <div>
      <p className="section-index mb-1">HIGH-CONFIDENCE ALERTS</p>
      <p className="text-xs text-text-muted">Pending analyst review</p>
    </div>
    <Button variant="secondary" className="h-7 text-[10px]" onClick={() => navigate('/relationships')}>View Graph →</Button>
  </div>
  <div className="space-y-0"> {/* No spacing — use border-b separators */}
    {alerts.map((alert) => {
      const isExpanded = expandedAlert === alert.id;
      return (
        <div key={alert.id}
          className="scan-row-hover border-b border-border-subtle py-4 cursor-pointer group"
          onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
        >
          <div className="flex items-start gap-4">
            {/* Icon — small, semantic color */}
            <alert.icon className={`w-4 h-4 ${alert.color} shrink-0 mt-0.5`} strokeWidth={1.5} />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h4 className="text-sm font-medium text-text-primary group-hover:text-accent-link transition-colors">{alert.title}</h4>
                <span className="text-[10px] text-text-muted shrink-0">{alert.time}</span>
              </div>
              <p className="text-xs text-text-muted">{alert.desc}</p>
              {!isExpanded && (
                <div className="flex items-center gap-3 mt-2">
                  <ConfidencePill level={alert.confidence} />
                  <span className="text-[10px] text-accent-link">Review Evidence →</span>
                </div>
              )}
            </div>
          </div>
          {isExpanded && (
            <div className="mt-4 pl-8 animate-fade-in border-l-2 border-accent-border/30">
              <p className="text-xs text-text-secondary leading-relaxed mb-3">{alert.details}</p>
              <div className="flex items-center gap-4">
                <Button size="sm" onClick={(e) => { e.stopPropagation(); navigate(alert.route); }}>{alert.action}</Button>
                <ConfidencePill level={alert.confidence} />
              </div>
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>
```

**Activity Stream (editorial hairline style):**
```tsx
<div className="mt-8">
  <p className="section-index mb-4">RECENT ACTIVITY</p>
  <div>
    {timelineEvents.map((ev, i) => (
      <div key={i} className="scan-row-hover flex items-start gap-4 py-3 border-b border-border-subtle/60 cursor-pointer group" onClick={() => navigate(ev.link)}>
        <ev.icon className={`w-4 h-4 ${ev.color} shrink-0 mt-0.5`} strokeWidth={1.5} />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-text-primary group-hover:text-accent-link transition-colors">{ev.title}</span>
            <span className="text-[10px] text-text-muted shrink-0 ml-2">{ev.time}</span>
          </div>
          <p className="text-xs text-text-muted mt-0.5 truncate">{ev.desc}</p>
        </div>
      </div>
    ))}
  </div>
</div>
```

**RIGHT COLUMN — System Status + Collection (compact monitoring strip):**

Collection Status strip:
```tsx
<div className="mb-6">
  <div className="flex items-center justify-between mb-3">
    <p className="section-index">COLLECTION STATUS</p>
    <span className="flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse-subtle" />
      <span className="text-[9px] text-status-green uppercase tracking-widest">Online</span>
    </span>
  </div>
  <div className="border border-border-subtle">
    {sourcesData.map((s, i) => (
      <div key={i} className={`flex items-center justify-between px-4 py-2.5 ${i > 0 ? 'border-t border-border-subtle' : ''}`}>
        <span className="text-xs text-text-secondary font-medium">{s.name}</span>
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${s.status === 'Active' ? 'bg-status-green' : 'bg-status-orange'}`} />
          <span className={`text-[10px] uppercase tracking-wide ${s.status === 'Active' ? 'text-status-green' : 'text-status-orange'}`}>
            {s.status}
          </span>
        </div>
      </div>
    ))}
  </div>
  <Button variant="ghost" className="w-full mt-2 text-[10px] tracking-wide" onClick={() => navigate('/sources')}>
    Manage Sources →
  </Button>
</div>
```

System Health (keep HealthRing but fix the hardcoded colors):
Replace `color="#2DD4BF"` with `color="var(--color-status-teal)"`, `color="#6D5EF5"` with `color="var(--color-status-purple)"`, `color="#22C55E"` with `color="var(--color-status-green)"`.

Or better, use CSS token vars directly in the SVG stroke attributes:
```tsx
const HealthRing = ({ pct, color, label }: { pct: number; color: string; label: string }) => {
  // Use color as a CSS token reference string: 'var(--color-status-teal)' etc.
  // ...
};
// Usage:
<HealthRing pct={92} color="var(--color-status-teal)" label="Collection" />
<HealthRing pct={87} color="var(--color-status-purple)" label="AI Analysis" />
<HealthRing pct={96} color="var(--color-status-green)" label="Database" />
```

Pipeline Health bars — minimal editorial style:
```tsx
<div className="mt-6">
  <p className="section-index mb-3">PIPELINE HEALTH</p>
  {pipelineData.map((sys) => (
    <div key={sys.label} className="mb-3">
      <div className="flex justify-between text-[10px] mb-1.5">
        <span className="text-text-muted">{sys.label}</span>
        <span className="text-text-primary tabular-nums">{sys.pct}%</span>
      </div>
      <div className="h-px w-full bg-border-subtle">
        <div className={`h-px ${sys.color} transition-all duration-1000`} style={{ width: `${sys.pct}%` }} />
      </div>
    </div>
  ))}
</div>
```

Note: Change pipeline bar height from `h-1.5` to `h-px` (1px) for more editorial feel.
</action>

<acceptance_criteria>
- `client/src/pages/Dashboard.tsx` compiles without TypeScript errors
- File contains `section-index` class for section labels
- File contains `01 / OVERVIEW` heading style
- File contains `COLLECTION STATUS` section
- HealthRing uses `var(--color-status-*)` instead of hardcoded hex colors
- File does NOT contain `#6D5EF5` or `#2DD4BF` or `#22C55E` as hardcoded color strings
- All `timelineEvents` and `alerts` arrays preserved with same data
- `expandedAlert` state logic preserved
- All 4 metrics clickable, navigating to correct routes
- File contains `scan-row-hover` for interactive rows
- `grep -c "6D5EF5" client/src/pages/Dashboard.tsx` returns 0
</acceptance_criteria>

---

## Verification
1. Visit /dashboard — verify editorial heading renders
2. Click a metric — verify navigation to correct route
3. Click an alert to expand — verify details show/hide
4. Verify no purple/indigo colors visible in browser
5. Check HealthRing renders with correct token colors

## Output Required
Reply with `## PLANNING COMPLETE`
