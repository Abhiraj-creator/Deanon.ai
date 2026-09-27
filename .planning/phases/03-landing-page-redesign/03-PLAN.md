---
phase: 3
name: Landing Page Redesign
wave: 1
depends_on: [1, 2]
files_modified:
  - client/src/pages/LandingPage.tsx
  - client/src/components/visual/NetworkField.tsx
autonomous: true
requirements:
  - REQ-003
  - REQ-011
must_haves:
  - Landing page uses near-black background (not #0A0E16 or any old color)
  - Electric green is the primary accent (no purple/indigo as primary brand color)
  - Hero has animated SVG network visualization with green linework
  - Large editorial typography for headings using clamp() sizing
  - Section system with numbered labels (01 THE SIGNAL → 06 THE INTELLIGENCE)
  - Infinite horizontal marquee (TRACE THE SIGNAL or THREATLENS)
  - Footer has perspective grid visual
  - All existing navigation links/routes preserved
  - No purple/indigo as primary brand — semantic only where appropriate
---

# Phase 3: Landing Page Redesign — Plan

## Objective
Completely replace LandingPage.tsx with a cinematic editorial landing page. The old page used purple/indigo inline styles. The new page uses near-black + electric green, large editorial typography, animated SVG network, scroll storytelling with GSAP ScrollTrigger, section system, marquee, perspective grid footer.

## CRITICAL CONSTRAINT
All existing route links must be preserved (→ /login, → /dashboard, → /analysis, all internal route links). The anchor tags for section navigation (#features, #pipeline, #architecture, #about) can be redesigned or removed — they were part of the old structure.

## Architecture Decision
- New LandingPage.tsx will be a standalone React component (no MainLayout wrap — it already isn't)
- GSAP ScrollTrigger will be used for section reveals
- The animated SVG network will be built inline (using SVG elements with CSS animations) — no additional library needed
- The Marquee component at `components/motion/Marquee.tsx` will be reused

---

## Wave 1 — Hero Section + Navigation (LandingPage top)

### Task 3.1: Landing Page Structure + Nav + Hero

<read_first>
- client/src/pages/LandingPage.tsx — Current full implementation (read all 794 lines to understand ALL sections)
- client/src/app/App.css — Token system (all color tokens)
- client/src/components/motion/Marquee.tsx — Existing marquee component API
- client/src/components/visual/NetworkField.tsx — Existing network visualization
- client/src/lib/routeConfig.ts — All route paths for navigation links
</read_first>

<action>
Rewrite `client/src/pages/LandingPage.tsx` completely. The new page must have these sections in order:

### 1. Navigation Bar (fixed top)
```tsx
// Fixed, starts transparent, becomes semi-opaque after scroll (same scroll behavior as before)
// Left: THREATLENS logo — two lines: "THREAT" (semibold, tracked) / "LENS" (light, green, tracked)
// Center: nav links styled as "// Features" "// How It Works" "// Architecture" "// About"
// Right: Login link (text, no fill) + "Open Dashboard →" button (green border, no fill)
```

Logo (replace old gradient logo box with text-only):
```tsx
<div className="leading-none">
  <span className="block text-[10px] font-semibold tracking-[0.25em] text-text-primary uppercase">THREAT</span>
  <span className="block text-[10px] font-light tracking-[0.4em] text-accent-solid uppercase">LENS</span>
</div>
```

Nav links — use `// ` prefix:
```tsx
<a href="#features" className="text-xs text-text-muted hover:text-text-primary transition-colors tracking-wide">// Features</a>
// etc
```

CTA button — green border style:
```tsx
<button className="h-8 px-4 border border-accent-border text-text-primary text-xs tracking-wide hover:bg-accent-soft/20 hover:border-accent-solid transition-all duration-200">
  Open Dashboard →
</button>
```

### 2. Hero Section (100vh)
Layout: left 50% typography, right 50% SVG visualization
- Left: section label + large headline + description + process line + two buttons
- Right: Animated SVG network

**Left typography:**
```
// HIDDEN SIGNALS TO CLEAR INTELLIGENCE  ← meta-label style

Different aliases.          ← font-light, huge
SAME ACTOR.                 ← font-bold, huge, green accent on "SAME"
A clearer picture.          ← font-light, large
```

Section label:
```tsx
<p className="section-index mb-6">// CYBER THREAT INTELLIGENCE PLATFORM</p>
```

Headline (use .editorial-hero sizing):
```tsx
<h1>
  <span className="block font-light text-text-primary" style={{fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 0.95, letterSpacing: '-0.03em'}}>
    Different aliases.
  </span>
  <span className="block font-semibold text-text-primary" style={{fontSize: 'clamp(3rem, 7vw, 7rem)', lineHeight: 0.95, letterSpacing: '-0.03em'}}>
    <span className="text-accent-solid">Same</span> actor.
  </span>
  <span className="block font-light text-text-secondary" style={{fontSize: 'clamp(1.5rem, 3.5vw, 3.5rem)', lineHeight: 1.1, marginTop: '0.5rem'}}>
    A clearer picture.
  </span>
</h1>
```

Description (below headline):
```tsx
<p className="text-text-muted text-sm leading-relaxed max-w-md mt-6">
  AI-assisted cyber threat intelligence for relationship analysis, infrastructure correlation and evidence-backed investigation.
</p>
```

Process line:
```tsx
<div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-text-muted mt-6">
  <span>COLLECT</span><span className="text-accent-border">→</span>
  <span>CORRELATE</span><span className="text-accent-border">→</span>
  <span>ANALYZE</span><span className="text-accent-border">→</span>
  <span>TRACE</span>
</div>
```

Two buttons:
```tsx
<div className="flex items-center gap-4 mt-8">
  <button onClick={() => navigate('/analysis')} className="flex items-center gap-2 h-10 px-5 border border-accent-border text-text-primary text-xs tracking-wide hover:bg-accent-soft/20 hover:border-accent-solid transition-all">
    EXPLORE INTELLIGENCE <ArrowRight className="w-3.5 h-3.5" />
  </button>
  <Link to="/dashboard" className="flex items-center gap-2 h-10 px-5 border border-border-subtle text-text-muted text-xs tracking-wide hover:border-border-strong hover:text-text-primary transition-all">
    OPEN DASHBOARD
  </Link>
</div>
```

**Right: Animated SVG Network**
Use/update `NetworkField.tsx` component or create inline SVG. The SVG network should:
- Dark/transparent background
- Green nodes (small circles, ~4-8px radius)
- Thin green lines connecting nodes (stroke: rgba(57,255,104,0.3))
- Some nodes with floating text labels (ACTOR, IDENTIFIER, PGP, WALLET, INFRASTRUCTURE, EVIDENCE)
- Labels styled as tiny badges (text-[9px], bg-panel/80, border-border-subtle)
- Subtle animation: nodes slowly pulse (scale), some edges animate dash-offset slowly

Create an updated `NetworkField.tsx` or render the SVG directly in the hero section.

### 3. Stats Strip
Keep the 4 stats (actors: 1,248+, identifiers: 12,400+, sources: 37, confidence: 94%).
Remove the CountUp animation from the old implementation in favor of simple static values (keep them accurate).
Use hairline border separators, NOT rounded cards.

```tsx
// Grid of 4 stats separated by 1px vertical lines
// Large number (text-4xl/5xl, text-text-primary, tabular-nums)
// Small label below (text-[10px] tracking-widest uppercase text-text-muted)
// Layout: borderTop + borderBottom hairlines, very minimal
```

### 4. Section System (01-06)
Replace the old "About", "Features", "Pipeline", "Architecture" sections with numbered editorial sections:

**01 / THE SIGNAL** — What THREATLENS observes (brief, with technical vocabulary)
**02 / THE CONNECTION** — How identifiers become relationships (with mini diagram)
**03 / THE ANALYSIS** — How AI assists investigators
**04 / THE EVIDENCE** — Why claims must have supporting evidence
**05 / THE INVESTIGATION** — The dashboard/relationship graph (show link to /relationships)
**06 / THE INTELLIGENCE** — The final investigator workflow (CTA)

Each section:
```tsx
<section id="the-signal" className="py-24 px-8 md:px-16 border-t border-border-subtle">
  <div className="max-w-[1400px] mx-auto">
    <p className="section-index mb-4">01 / THE SIGNAL</p>
    <h2 style={{fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1}}>
      What THREATLENS<br/><strong style={{fontWeight: 600}}>observes.</strong>
    </h2>
    {/* Content varies per section */}
  </div>
</section>
```

The identifiers table from the old implementation is VALUABLE — preserve it in section 02 or 04.
The pipeline steps (01-06 collect/correlate/analyze etc.) can be repurposed into the section content.

### 5. CTA Section
Circular expanding rings + centered large text:
```tsx
<section className="relative py-32 flex items-center justify-center overflow-hidden border-t border-border-subtle">
  {/* Background expanding rings */}
  {[1,2,3].map(i => (
    <div key={i} className="absolute rounded-full border border-border-subtle/30 animate-pulse-subtle"
      style={{width: `${i*200}px`, height: `${i*200}px`, animationDelay: `${i*0.5}s`, opacity: 0.4/i}} />
  ))}
  <div className="relative text-center">
    <p className="section-index mb-6">START YOUR INVESTIGATION</p>
    <h2 style={{fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.1}} className="text-text-primary mb-8">
      See the connections<br/><strong style={{fontWeight: 600}}>behind the signals.</strong>
    </h2>
    <button onClick={() => navigate('/analysis')} className="h-10 px-8 border border-accent-border text-xs tracking-widest uppercase text-text-primary hover:bg-accent-soft/20 transition-all">
      LAUNCH INTELLIGENCE →
    </button>
  </div>
</section>
```

### 6. Marquee + Footer

**Marquee** (before footer):
```tsx
<div className="border-t border-b border-border-subtle py-4 overflow-hidden">
  <Marquee speed={40}>
    <span className="text-4xl font-light tracking-[0.1em] text-text-muted/30 uppercase px-12">
      TRACE THE SIGNAL
    </span>
    <span className="text-4xl font-light tracking-[0.1em] text-accent-solid/20 uppercase px-12">
      THREATLENS
    </span>
    {/* Repeat pattern */}
  </Marquee>
</div>
```

**Footer** with perspective grid:
```tsx
<footer className="relative border-t border-border-subtle bg-canvas overflow-hidden py-16 px-8 md:px-16">
  {/* PerspectiveGrid component behind */}
  <PerspectiveGrid />
  {/* Content */}
  <div className="relative max-w-[1400px] mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {/* Brand column */}
      <div>
        <p className="text-[10px] tracking-[0.3em] text-text-primary uppercase font-semibold mb-4">THREATLENS</p>
        <p className="text-xs text-text-muted leading-relaxed">AI-ASSISTED CYBER THREAT INTELLIGENCE</p>
      </div>
      {/* Nav columns */}
      {[
        { title: 'INTELLIGENCE', links: [{ label: 'Dashboard', to: '/dashboard' }, { label: 'Actors', to: '/actors' }, { label: 'Relationships', to: '/relationships' }] },
        { title: 'ANALYSIS', links: [{ label: 'Infrastructure', to: '/infrastructure' }, { label: 'Sources', to: '/sources' }, { label: 'Evidence', to: '/evidence' }] },
        { title: 'SYSTEM', links: [{ label: 'Analysis', to: '/analysis' }, { label: 'Reports', to: '/reports' }, { label: 'Settings', to: '/settings' }] },
      ].map(col => (
        <div key={col.title}>
          <p className="section-index mb-4">{col.title}</p>
          {col.links.map(link => (
            <Link key={link.to} to={link.to} className="block text-xs text-text-muted hover:text-text-primary transition-colors mb-2">{link.label}</Link>
          ))}
        </div>
      ))}
    </div>
    <div className="mt-12 pt-6 border-t border-border-subtle flex justify-between items-center">
      <p className="text-[10px] text-text-muted tracking-widest uppercase">AUTHORIZED INTELLIGENCE SYSTEM</p>
      <p className="text-[10px] text-text-muted">© 2026 THREATLENS</p>
    </div>
  </div>
</footer>
```
</action>

<acceptance_criteria>
- `client/src/pages/LandingPage.tsx` compiles without TypeScript errors
- File does NOT contain `#6D5EF5`, `#4338CA`, `rgba(109,94,245`, `#0A0E16`, `#1B2331` as primary styles
- File contains `text-accent-solid` or `#39ff68` for green accents
- File contains `// THE SIGNAL` or equivalent numbered section format
- File contains `TRACE THE SIGNAL` or `THREATLENS` marquee text
- File contains `PerspectiveGrid` component reference in footer
- File preserves Link to="/dashboard", Link to="/login", navigate('/analysis') calls
- File contains SVG network visualization elements
- `grep -c "6D5EF5" client/src/pages/LandingPage.tsx` returns 0 (no old purple)
</acceptance_criteria>

---

### Task 3.2: Update NetworkField for Hero

<read_first>
- client/src/components/visual/NetworkField.tsx — Current implementation
</read_first>

<action>
Update `NetworkField.tsx` to work well in the hero right panel. Add a `compact` prop option or ensure the component is sized by its container.

The network should show:
- 8-12 nodes with varying sizes (4-8px radius)
- Green/teal/white color variations for nodes
- Thin connection lines (stroke: rgba(57,255,104,0.25))
- Floating label badges at 5-6 specific nodes: "ACTOR", "PGP KEY", "WALLET", "INFRASTRUCTURE", "EVIDENCE", "CORRELATION"
- Label style: tiny absolute-positioned badge, bg-panel/80, border-border-subtle, text-[9px] text-text-muted
- Subtle CSS animation: slow node pulse (scale 1→1.2→1 on 3s cycle), edge opacity flicker
- Background: transparent (so parent bg shows through)

Labels should appear attached to nodes using transform to position them:
```tsx
<g>
  <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.color} opacity={0.9} />
  {/* Subtle outer glow circle */}
  <circle cx={n.cx} cy={n.cy} r={n.r + 4} fill={n.color} opacity={0.06} />
  {/* Label badge */}
  {n.label && (
    <g transform={`translate(${n.cx + n.r + 6}, ${n.cy - 9})`}>
      <rect width={n.label.length * 5.5 + 8} height={16} rx={2} fill="rgba(19,24,19,0.85)" stroke="#242a25" strokeWidth={0.5} />
      <text x={4} y={11} fontSize="8" fill="#6b7469" fontFamily="Inter, sans-serif">{n.label}</text>
    </g>
  )}
</g>
```
</action>

<acceptance_criteria>
- `client/src/components/visual/NetworkField.tsx` compiles without TypeScript errors
- File contains SVG element with node circles
- File contains label text elements for node types (ACTOR, PGP KEY, etc.)
- File uses green (#39ff68 or rgba(57,255,104,...)) for node/edge colors
- File does NOT use purple (#6D5EF5 or similar) as primary color
- NetworkField renders without runtime errors
</acceptance_criteria>

---

## Verification
1. Browse to / in dev browser — verify new landing page renders
2. Check hero section has animated SVG network on the right
3. Verify numbered sections 01-06 appear on scroll
4. Verify footer has THREATLENS text and navigation links
5. Verify marquee animation is present
6. Verify no old purple/indigo colors visible in browser

## Output Required
Reply with `## PLANNING COMPLETE`
