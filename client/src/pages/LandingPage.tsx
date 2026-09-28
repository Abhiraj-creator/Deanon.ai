import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Shield, Eye, Lock,
  Users, Key, Zap, Server, Activity,
  Database, GitBranch, BarChart2, Radar, FileText, Cpu
} from 'lucide-react';
import { NetworkField } from '../components/visual/NetworkField';
import { Marquee } from '../components/motion/Marquee';
import { APP_NAME } from '../constants';

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: 'AI-Powered Persona Analysis',
      desc: 'Stylometric fingerprinting and behavioral profiling link rebranded or migrated threat-actor personas to previously observed actors — even when they deliberately change their handle or platform.',
      bullets: ['Stylometric writing-style comparison', 'Activity-timing & timezone inference', 'Cross-platform alias correlation', 'Evidence-graded confidence score'],
    },
    {
      title: 'Interactive Relationship Graph',
      desc: 'A force-directed, zoomable graph maps every actor, identifier, infrastructure node, and source as a clickable entity. Every edge carries typed evidence — no mystery connections.',
      bullets: ['PGP key, wallet & handle cross-links', 'Typed edge labels (uses / paid / signed)', 'Click-to-evidence sidebar drawer', 'Filter by entity type or confidence level'],
    },
    {
      title: 'Infrastructure Correlation',
      desc: `${APP_NAME} fingerprints onion hidden services by extracting SSL certificate artifacts, server banners, and status-page data — then matches them against clearnet infrastructure records.`,
      bullets: ['SSL certificate fingerprinting', 'Default-banner & status-page detection', 'Clearnet domain correlation', 'Confidence-graded indicators'],
    },
    {
      title: 'Continuous Intelligence Collection',
      desc: 'A scheduled collection layer ingests authorized dark-web intelligence, normalizes raw observations into structured entities, and continuously updates actor profiles.',
      bullets: ['Scheduled workers (Tor forums, markets)', 'Automatic entity normalization', 'Conflict & deduplication handling', 'Autonomous & manual modes'],
    },
    {
      title: 'Evidence-Backed Attribution',
      desc: 'Every relationship, claim, and confidence score is backed by stored, auditable evidence. The system assigns four tiers of confidence — Confirmed, Strong, Moderate, Weak.',
      bullets: ['4-tier confidence model', 'Evidence log with type tagging', 'Source-reliability weighting', 'Analyst-override support'],
    },
    {
      title: 'Analytical Export & Reporting',
      desc: 'Generate investigator reports and export all intelligence as CSV or JSON. Every report annotates evidence and confidence so findings are defensible in a formal review.',
      bullets: ['CSV / JSON bulk export', 'PDF investigator reports', 'Timeline & graph snapshots', 'Audit-trail annotations'],
    },
  ];

  const pipeline = [
    { step: '01', title: 'Data Collection', desc: 'Scheduled workers ingest authorized intelligence from Tor forums, marketplaces, and leak sites, then normalize raw observations into structured entities.' },
    { step: '02', title: 'Relationship Mapping', desc: 'The Relationship Engine builds a typed graph — actors, handles, PGP keys, wallets, infrastructure — with each edge sourced to an evidence record.' },
    { step: '03', title: 'AI Persona Analysis', desc: 'Stylometric and behavioral features are extracted per persona. A similarity model computes cross-platform match scores with analytical confidence.' },
    { step: '04', title: 'Infrastructure Correlation', desc: 'SSL certificates, server banners, and status artifacts are fingerprinted and matched against clearnet infrastructure, flagging probable real-host associations.' },
    { step: '05', title: 'Attribution & Confidence', desc: 'All signals are fused into evidence-graded attribution leads — four confidence tiers ensure investigators always know the certainty behind every claim.' },
    { step: '06', title: 'Export & Reporting', desc: 'Analysts export CSV/JSON intelligence dumps or generate annotated PDF reports ready for formal review or escalation.' },
  ];

  return (
    <div className="bg-canvas text-text-secondary font-sans min-h-screen overflow-x-hidden selection:bg-accent-soft selection:text-accent-solid">
      {/* ── TOP NAV ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 flex items-center justify-between h-16 ${
          scrolled ? 'bg-canvas-deep/90 backdrop-blur-md border-b border-border-subtle shadow-2xl' : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="leading-none">
            <span className="block text-[11px] font-semibold tracking-[0.25em] text-text-primary uppercase">{APP_NAME}</span>
          </div>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs text-text-muted">
          <a href="#the-signal" className="hover:text-text-primary transition-colors tracking-wide">// 01 Signal</a>
          <a href="#features" className="hover:text-text-primary transition-colors tracking-wide">// 02 Capabilities</a>
          <a href="#pipeline" className="hover:text-text-primary transition-colors tracking-wide">// 03 Pipeline</a>
          <a href="#views" className="hover:text-text-primary transition-colors tracking-wide">// 04 Views</a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors px-3 py-1.5"
          >
            Login
          </Link>
          <button
            onClick={() => navigate('/analysis')}
            className="h-9 px-4 border border-accent-border text-text-primary text-xs font-mono tracking-wider uppercase hover:bg-accent-soft/20 hover:border-accent-solid transition-all rounded-[4px]"
          >
            Open Dashboard →
          </button>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="min-h-screen flex items-center pt-24 pb-16 px-6 md:px-12 border-b border-border-subtle relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left 7 Columns */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <p className="text-[10px] font-mono tracking-[0.25em] text-accent-solid uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-solid animate-pulse-subtle" />
              CYBER THREAT INTELLIGENCE PLATFORM
            </p>

            <h1 className="editorial-hero">
              <span className="block font-light text-text-primary">
                Different aliases.
              </span>
              <span className="block font-semibold text-text-primary mt-1">
                <span className="text-accent-solid">Same</span> actor.
              </span>
              <span className="block font-light text-text-secondary text-2xl md:text-4xl mt-3 tracking-normal">
                A clearer picture.
              </span>
            </h1>

            <p className="text-sm md:text-base text-text-muted leading-relaxed max-w-xl font-sans pt-2">
              AI-assisted cyber threat intelligence platform for dark web threat-actor de-anonymization. Collect, correlate, and visualize digital footprints across platforms.
            </p>

            {/* Process Pipeline Ticker */}
            <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-text-muted uppercase pt-2">
              <span className="text-text-primary font-semibold">COLLECT</span>
              <span className="text-accent-solid">→</span>
              <span>CORRELATE</span>
              <span className="text-accent-solid">→</span>
              <span>ANALYZE</span>
              <span className="text-accent-solid">→</span>
              <span className="text-accent-solid font-semibold">TRACE</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => navigate('/analysis')}
                className="flex items-center gap-3 h-11 px-6 bg-accent-solid text-canvas font-mono font-semibold text-xs tracking-wider uppercase hover:bg-accent-hover transition-all rounded-[4px] shadow-[0_0_20px_rgba(57,255,104,0.3)]"
              >
                START INVESTIGATION <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 h-11 px-6 border border-border-subtle text-text-secondary font-mono text-xs tracking-wider uppercase hover:border-border-strong hover:text-text-primary transition-all rounded-[4px]"
              >
                VIEW DASHBOARD
              </Link>
            </div>
          </div>

          {/* Right 5 Columns — Network Visual */}
          <div className="lg:col-span-5 h-[420px] lg:h-[480px] relative">
            <NetworkField className="rounded-[6px] shadow-2xl" />
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="border-b border-border-subtle bg-canvas-light py-10 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '12,400+', label: 'INDICATORS CORRELATED' },
            { num: '248', label: 'ACTOR PROFILES' },
            { num: '37', label: 'SOURCES MONITORED' },
            { num: '94%', label: 'CONFIDENCE ACCURACY' },
          ].map((s, i) => (
            <div key={i} className="text-center md:text-left border-l border-border-subtle/40 pl-6">
              <p className="text-3xl md:text-4xl font-mono font-bold text-text-primary tabular-nums tracking-tight">
                {s.num}
              </p>
              <p className="text-[10px] font-mono tracking-[0.2em] text-text-muted uppercase mt-2">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 01: THE SIGNAL ── */}
      <section id="the-signal" className="py-24 px-6 md:px-12 border-b border-border-subtle">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[10px] font-mono tracking-[0.25em] text-text-muted uppercase mb-4">// 01 THE SIGNAL</p>
          <h2 className="editorial-section mb-12">
            What {APP_NAME} <br />
            <span className="font-semibold text-accent-solid">observes.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Defensive Intelligence', desc: 'Purpose-built for authorized law-enforcement and intelligence analysis. Every claim is annotated with evidence and confidence scores.' },
              { icon: Eye, title: 'Investigator-First Design', desc: 'A dense, dark-mode analytical dashboard with timelines, relationship graphs, evidence logs, and actor profiles for investigators.' },
              { icon: Lock, title: 'Evidence-Graded Output', desc: 'Four-tier confidence model (Confirmed / Strong / Moderate / Weak) ensures findings are defensible. Every score traces back to evidence.' },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="bg-surface border border-border-subtle p-8 rounded-[6px] space-y-4 hover:border-border-strong transition-colors">
                  <Icon className="w-6 h-6 text-accent-solid" strokeWidth={1.5} />
                  <h3 className="text-base font-semibold text-text-primary tracking-wide">{card.title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed font-sans">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 02: CAPABILITIES ── */}
      <section id="features" className="py-24 px-6 md:px-12 border-b border-border-subtle bg-canvas-light">
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div>
            <p className="text-[10px] font-mono tracking-[0.25em] text-text-muted uppercase mb-4">// 02 CAPABILITIES</p>
            <h2 className="editorial-section">
              Everything an analyst <span className="font-semibold text-text-primary">requires.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Feature Tabs List */}
            <div className="lg:col-span-4 space-y-2">
              {features.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  className={`w-full text-left px-5 py-4 rounded-[4px] border-l-2 transition-all font-mono text-xs uppercase tracking-wider ${
                    activeFeature === i
                      ? 'border-accent-solid bg-accent-soft/20 text-text-primary font-semibold'
                      : 'border-transparent text-text-muted hover:text-text-primary hover:bg-card/50'
                  }`}
                >
                  <span className="text-[10px] opacity-50 mr-3">0{i + 1}</span>
                  {f.title}
                </button>
              ))}
            </div>

            {/* Feature Detail Box */}
            <div className="lg:col-span-8 bg-surface border border-border-subtle p-8 rounded-[6px] space-y-6">
              <h3 className="text-xl font-semibold text-text-primary tracking-wide">
                {features[activeFeature].title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed font-sans">
                {features[activeFeature].desc}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
                {features[activeFeature].bullets.map((b, j) => (
                  <div key={j} className="flex items-center gap-3 text-xs text-text-secondary font-mono">
                    <CheckCircle className="w-4 h-4 text-accent-solid shrink-0" strokeWidth={1.5} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 03: PIPELINE ── */}
      <section id="pipeline" className="py-24 px-6 md:px-12 border-b border-border-subtle">
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div>
            <p className="text-[10px] font-mono tracking-[0.25em] text-text-muted uppercase mb-4">// 03 PIPELINE</p>
            <h2 className="editorial-section">
              End-to-End <span className="font-semibold text-accent-solid">intelligence pipeline.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pipeline.map((p, i) => (
              <div key={i} className="bg-surface border border-border-subtle p-8 rounded-[6px] space-y-3 relative overflow-hidden group hover:border-accent-border/50 transition-colors">
                <span className="text-4xl font-mono font-bold text-text-muted/15 absolute top-4 right-6 group-hover:text-accent-solid/20 transition-colors">
                  {p.step}
                </span>
                <p className="text-[10px] font-mono text-accent-solid tracking-widest uppercase">STEP {p.step}</p>
                <h3 className="text-base font-semibold text-text-primary tracking-wide">{p.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed font-sans pt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 04: IDENTIFIERS TABLE ── */}
      <section className="py-24 px-6 md:px-12 border-b border-border-subtle bg-canvas-light">
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div>
            <p className="text-[10px] font-mono tracking-[0.25em] text-text-muted uppercase mb-4">// 04 IDENTIFIERS</p>
            <h2 className="editorial-section">
              The indicators that <span className="font-semibold text-text-primary">matter.</span>
            </h2>
          </div>

          <div className="bg-surface border border-border-subtle rounded-[6px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-xs">
                <thead>
                  <tr className="border-b border-border-subtle text-[10px] text-text-muted uppercase tracking-widest bg-canvas-deep/50">
                    <th className="py-4 px-6">Identifier Type</th>
                    <th className="py-4 px-6">Investigative Significance</th>
                    <th className="py-4 px-6">Confidence Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle/50">
                  {[
                    { id: 'Handles / Aliases', icon: Users, why: 'Public identity anchor across forums and darknet marketplaces.', weight: 'HIGH' },
                    { id: 'PGP Fingerprints', icon: Key, why: 'Cryptographic key reuse across isolated platforms provides near-definitive link.', weight: 'CRITICAL' },
                    { id: 'Crypto Wallet Addresses', icon: Zap, why: 'Blockchain transaction graph analysis links financial flows across aliases.', weight: 'HIGH' },
                    { id: 'Infrastructure Banners', icon: Server, why: 'SSL certificate fingerprints and server headers correlate onion hosts to clearnet IPs.', weight: 'STRONG' },
                    { id: 'Stylometric Features', icon: Activity, why: 'Writing style, vocabulary rhythm, and activity timing infer actor identity.', weight: 'MODERATE' },
                  ].map((row, i) => {
                    const Icon = row.icon;
                    return (
                      <tr key={i} className="hover:bg-card-hover/40 transition-colors">
                        <td className="py-4 px-6 font-semibold text-text-primary flex items-center gap-3">
                          <Icon className="w-4 h-4 text-accent-solid shrink-0" strokeWidth={1.5} />
                          <span>{row.id}</span>
                        </td>
                        <td className="py-4 px-6 text-text-muted font-sans text-xs">{row.why}</td>
                        <td className="py-4 px-6">
                          <span className="inline-block px-2.5 py-1 text-[9px] font-mono font-semibold tracking-wider uppercase rounded-[3px] bg-accent-soft text-accent-solid border border-accent-border/40">
                            {row.weight}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 05: VIEWS ── */}
      <section id="views" className="py-24 px-6 md:px-12 border-b border-border-subtle">
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div>
            <p className="text-[10px] font-mono tracking-[0.25em] text-text-muted uppercase mb-4">// 05 WORKFLOW VIEWS</p>
            <h2 className="editorial-section">
              10 Purpose-built <span className="font-semibold text-accent-solid">investigation views.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: BarChart2, label: 'Dashboard', route: '/dashboard' },
              { icon: Users, label: 'Actors', route: '/actors' },
              { icon: GitBranch, label: 'Relationships', route: '/relationships' },
              { icon: Server, label: 'Infrastructure', route: '/infrastructure' },
              { icon: Database, label: 'Sources', route: '/sources' },
              { icon: Radar, label: 'Analysis', route: '/analysis' },
              { icon: Eye, label: 'Evidence', route: '/evidence' },
              { icon: FileText, label: 'Reports', route: '/reports' },
              { icon: Cpu, label: 'Settings', route: '/settings' },
              { icon: Lock, label: 'Login', route: '/login' },
            ].map((v, i) => {
              const Icon = v.icon;
              return (
                <Link
                  key={i}
                  to={v.route}
                  className="bg-surface border border-border-subtle p-6 rounded-[6px] flex flex-col items-center text-center space-y-3 hover:border-accent-border hover:bg-card-hover transition-all group"
                >
                  <Icon className="w-6 h-6 text-text-muted group-hover:text-accent-solid transition-colors" strokeWidth={1.5} />
                  <span className="text-xs font-mono font-semibold text-text-primary tracking-wider uppercase">{v.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="border-b border-border-subtle py-5 bg-canvas-deep overflow-hidden">
        <Marquee speed={35}>
          <span className="text-2xl md:text-3xl font-mono font-light tracking-[0.15em] text-text-muted/40 uppercase px-8">
            TRACE THE SIGNAL
          </span>
          <span className="text-2xl md:text-3xl font-mono font-bold tracking-[0.15em] text-accent-solid/30 uppercase px-8">
            {APP_NAME} INTELLIGENCE
          </span>
          <span className="text-2xl md:text-3xl font-mono font-light tracking-[0.15em] text-text-muted/40 uppercase px-8">
            CYBER ATTRIBUTION ENGINE
          </span>
        </Marquee>
      </div>

      {/* ── CTA SECTION ── */}
      <section className="py-28 px-6 md:px-12 border-b border-border-subtle text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <p className="text-[10px] font-mono tracking-[0.3em] text-accent-solid uppercase">// 06 INITIALIZE</p>
          <h2 className="editorial-page-title text-text-primary">
            See the connections <br />
            <span className="font-semibold text-accent-solid">behind the signals.</span>
          </h2>
          <p className="text-xs md:text-sm text-text-muted leading-relaxed font-sans max-w-md mx-auto">
            Launch the investigation workspace to query threat actors, visualize relationship graphs, and inspect correlated evidence.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate('/analysis')}
              className="h-11 px-8 bg-accent-solid text-canvas font-mono font-bold text-xs tracking-widest uppercase hover:bg-accent-hover transition-all rounded-[4px] shadow-[0_0_24px_rgba(57,255,104,0.35)]"
            >
              LAUNCH INTELLIGENCE WORKSPACE →
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-canvas-deep py-16 px-6 md:px-12 text-xs font-mono border-t border-border-subtle">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-3">
            <div className="leading-none">
              <span className="block text-[11px] font-semibold tracking-[0.25em] text-text-primary uppercase">{APP_NAME}</span>
            </div>
            <p className="text-[10px] text-text-muted leading-relaxed pt-2">
              AI-ASSISTED CYBER THREAT INTELLIGENCE & PERSONA DE-ANONYMIZATION PLATFORM.
            </p>
          </div>

          <div>
            <p className="text-[10px] text-text-muted tracking-widest uppercase mb-4">// NAVIGATION</p>
            <ul className="space-y-2 text-text-secondary">
              <li><Link to="/dashboard" className="hover:text-accent-solid transition-colors">Dashboard</Link></li>
              <li><Link to="/actors" className="hover:text-accent-solid transition-colors">Actor Profiles</Link></li>
              <li><Link to="/relationships" className="hover:text-accent-solid transition-colors">Relationship Graph</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] text-text-muted tracking-widest uppercase mb-4">// ANALYSIS</p>
            <ul className="space-y-2 text-text-secondary">
              <li><Link to="/infrastructure" className="hover:text-accent-solid transition-colors">Infrastructure</Link></li>
              <li><Link to="/sources" className="hover:text-accent-solid transition-colors">Intelligence Sources</Link></li>
              <li><Link to="/evidence" className="hover:text-accent-solid transition-colors">Evidence Vault</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] text-text-muted tracking-widest uppercase mb-4">// SYSTEM</p>
            <ul className="space-y-2 text-text-secondary">
              <li><Link to="/analysis" className="hover:text-accent-solid transition-colors">Investigation Workspace</Link></li>
              <li><Link to="/reports" className="hover:text-accent-solid transition-colors">Reports & Exports</Link></li>
              <li><Link to="/settings" className="hover:text-accent-solid transition-colors">Settings</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto pt-12 mt-12 border-t border-border-subtle/50 flex flex-col sm:flex-row justify-between items-center text-[10px] text-text-muted gap-4">
          <span>AUTHORIZED CYBER THREAT INTELLIGENCE SYSTEM</span>
          <span className="uppercase">© 2026 {APP_NAME}. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>
    </div>
  );
}
