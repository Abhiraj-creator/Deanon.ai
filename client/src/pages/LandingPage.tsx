import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield, Search, GitBranch, Server, Database, Radar,
  Eye, FileText, ChevronRight, ArrowRight, Zap, Lock,
  Globe, Network, Brain, AlertTriangle, TrendingUp,
  Users, Key, Cpu, BarChart2, Activity, CheckCircle,
  ExternalLink, Play, Star, Award, Target
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Animated Globe SVG (network motif)
───────────────────────────────────────────── */
const GlobeIllustration = () => {
  const nodes = [
    { cx: 320, cy: 160, r: 7, color: '#F4373D', label: 'Markets' },
    { cx: 480, cy: 210, r: 5, color: '#2DD4BF', label: 'Identities' },
    { cx: 260, cy: 290, r: 6, color: '#8C61BD', label: 'Infrastructure' },
    { cx: 420, cy: 320, r: 8, color: '#F4373D', label: 'Actors' },
    { cx: 360, cy: 400, r: 5, color: '#2DD4BF', label: 'Connections' },
    { cx: 510, cy: 370, r: 6, color: '#3B82F6', label: 'PGP Keys' },
    { cx: 200, cy: 380, r: 5, color: '#10B981', label: 'Sources' },
    { cx: 280, cy: 200, r: 6, color: '#2DD4BF', label: 'Forums' },
  ];

  const edges = [
    [0, 1], [0, 3], [1, 2], [1, 5], [2, 6], [3, 4],
    [3, 5], [4, 6], [4, 7], [0, 7], [2, 3], [6, 7],
  ];

  return (
    <svg viewBox="140 120 430 320" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 40px rgba(109,94,245,0.15))' }}>
      {/* Faint globe circles */}
      <ellipse cx="355" cy="285" rx="190" ry="140" fill="none" stroke="rgba(109,94,245,0.08)" strokeWidth="1" />
      <ellipse cx="355" cy="285" rx="130" ry="140" fill="none" stroke="rgba(109,94,245,0.06)" strokeWidth="1" />
      <ellipse cx="355" cy="285" rx="60" ry="140" fill="none" stroke="rgba(109,94,245,0.05)" strokeWidth="1" />
      <ellipse cx="355" cy="285" rx="190" ry="80" fill="none" stroke="rgba(109,94,245,0.06)" strokeWidth="1" />
      <ellipse cx="355" cy="285" rx="190" ry="140" fill="none" stroke="rgba(109,94,245,0.06)" strokeWidth="1" transform="rotate(30 355 285)" />

      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke={nodes[a].color === '#F4373D' ? 'rgba(244,55,61,0.25)' : 'rgba(45,212,191,0.2)'}
          strokeWidth="1"
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r={n.r + 6} fill={n.color} opacity="0.08" />
          <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.color} />
          <rect
            x={n.cx + n.r + 4} y={n.cy - 9}
            width={n.label.length * 6.2 + 10} height="18"
            rx="4"
            fill="rgba(13,20,32,0.85)"
            stroke="rgba(27,35,49,1)"
            strokeWidth="1"
          />
          <text
            x={n.cx + n.r + 9} y={n.cy + 4}
            fontSize="9" fill="#A6ADC3" fontFamily="Inter, sans-serif"
          >{n.label}</text>
        </g>
      ))}

      {/* Caption */}
      <text x="470" y="148" fontSize="10" fill="#6D5EF5" fontFamily="Inter, sans-serif" textAnchor="end">Different aliases.</text>
      <text x="470" y="162" fontSize="10" fill="#7A7EFC" fontFamily="Inter, sans-serif" textAnchor="end">Same actor.</text>
      <text x="470" y="176" fontSize="10" fill="#8C93F0" fontFamily="Inter, sans-serif" textAnchor="end">A clearer picture.</text>
    </svg>
  );
};

/* ─────────────────────────────────────────────
   Animated counter
───────────────────────────────────────────── */
const CountUp = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 24);
    return () => clearInterval(timer);
  }, [target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
};

/* ─────────────────────────────────────────────
   Main Landing Page
───────────────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Brain size={22} />,
      title: 'AI-Powered Persona Analysis',
      color: '#6D5EF5',
      desc: 'Stylometric fingerprinting and behavioral profiling link rebranded or migrated threat-actor personas to previously observed actors — even when they deliberately change their handle or platform.',
      bullets: ['Vocabulary & writing-style comparison', 'Activity-timing & timezone inference', 'Cross-platform alias correlation', 'Evidence-graded confidence score'],
    },
    {
      icon: <Network size={22} />,
      title: 'Interactive Relationship Graph',
      color: '#2DD4BF',
      desc: 'A force-directed, zoomable graph maps every actor, identifier, infrastructure node, and source as a clickable entity. Every edge carries typed evidence — no mystery connections.',
      bullets: ['PGP key, wallet & handle cross-links', 'Typed edge labels (uses / paid / signed)', 'Click-to-evidence sidebar', 'Filter by entity type or confidence'],
    },
    {
      icon: <Server size={22} />,
      title: 'Infrastructure Correlation',
      color: '#8C61BD',
      desc: 'ThreatLens fingerprints onion hidden services by extracting SSL certificate artifacts, server banners, and status-page data — then matches them against clearnet infrastructure records.',
      bullets: ['SSL certificate fingerprinting', 'Default-banner & status-page detection', 'Clearnet domain correlation', 'Confidence-graded indicators'],
    },
    {
      icon: <Database size={22} />,
      title: 'Continuous Intelligence Collection',
      color: '#10B981',
      desc: 'A scheduled collection layer ingests authorized dark-web intelligence, normalizes raw observations into structured entities, and continuously updates actor profiles without manual intervention.',
      bullets: ['Scheduled workers (Tor forums, markets)', 'Automatic entity normalization', 'Conflict & deduplication handling', 'Autonomous & manual modes'],
    },
    {
      icon: <BarChart2 size={22} />,
      title: 'Evidence-Backed Attribution',
      color: '#F59E0B',
      desc: 'Every relationship, claim, and confidence score is backed by stored, auditable evidence. The system assigns four tiers of confidence — Confirmed, Strong, Moderate, Weak — never making attribution claims without justification.',
      bullets: ['4-tier confidence model', 'Evidence log with type tagging', 'Source-reliability weighting', 'Analyst-override support'],
    },
    {
      icon: <FileText size={22} />,
      title: 'Analytical Export & Reporting',
      color: '#3B82F6',
      desc: 'Generate investigator reports and export all intelligence as CSV or JSON. Every report annotates evidence and confidence so findings are defensible in a formal review.',
      bullets: ['CSV / JSON bulk export', 'PDF investigator reports', 'Timeline & graph snapshots', 'Audit-trail annotations'],
    },
  ];

  const stats = [
    { label: 'Indicators Correlated', value: 12400, suffix: '+', icon: <TrendingUp size={18} /> },
    { label: 'Actor Profiles', value: 248, suffix: '', icon: <Users size={18} /> },
    { label: 'Sources Monitored', value: 37, suffix: '', icon: <Database size={18} /> },
    { label: 'Confidence Accuracy', value: 94, suffix: '%', icon: <CheckCircle size={18} /> },
  ];

  const pipeline = [
    { icon: <Globe size={20} />, step: '01', title: 'Data Collection', desc: 'Scheduled workers ingest authorized intelligence from Tor forums, marketplaces, and leak sites, then normalize each raw observation into a structured entity.' },
    { icon: <Network size={20} />, step: '02', title: 'Relationship Mapping', desc: 'The Relationship Engine builds a typed graph — actors, handles, PGP keys, wallets, infrastructure — with each edge sourced to an evidence record.' },
    { icon: <Brain size={20} />, step: '03', title: 'AI Persona Analysis', desc: 'Stylometric and behavioral features are extracted per persona. A similarity model computes cross-platform match scores with analytical confidence.' },
    { icon: <Server size={20} />, step: '04', title: 'Infrastructure Correlation', desc: 'SSL certificates, server banners, and status artifacts are fingerprinted and matched against clearnet infrastructure, flagging probable real-host associations.' },
    { icon: <BarChart2 size={20} />, step: '05', title: 'Attribution & Confidence', desc: 'All signals are fused into evidence-graded attribution leads — four confidence tiers ensure investigators always know the certainty behind every claim.' },
    { icon: <FileText size={20} />, step: '06', title: 'Export & Reporting', desc: 'Analysts export CSV/JSON intelligence dumps or generate annotated PDF reports ready for formal review or escalation.' },
  ];

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#pipeline' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'About', href: '#about' },
  ];

  return (
    <div
      style={{ background: '#0A0E16', color: '#F5F6FA', fontFamily: "'Inter', 'Manrope', sans-serif", minHeight: '100vh' }}
    >
      {/* ── TOP NAV ── */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? 'rgba(10,14,22,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #1B2331' : '1px solid transparent',
          transition: 'all 0.3s ease',
          padding: '0 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '64px',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #6D5EF5, #4338CA)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(109,94,245,0.4)',
          }}>
            <Target size={18} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '17px', letterSpacing: '-0.02em' }}>
            Threat<span style={{ background: 'linear-gradient(90deg, #6D5EF5, #7A7EFC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Lens</span>
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '32px' }}>
          {navItems.map(n => (
            <a
              key={n.label}
              href={n.href}
              style={{ fontSize: '14px', color: '#94A0B8', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F5F6FA')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94A0B8')}
            >{n.label}</a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/login" style={{
            padding: '8px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
            border: '1px solid #3A3FA8', color: '#8C93F0', textDecoration: 'none',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#141B47'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >Login</Link>
          <Link to="/analysis" style={{
            padding: '8px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
            background: 'linear-gradient(90deg, #6D5EF5, #4338CA)',
            color: 'white', textDecoration: 'none',
            boxShadow: '0 0 18px rgba(109,94,245,0.35)',
          }}>Get Started →</Link>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 40px', paddingTop: '80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '45% 55%', gap: '60px', alignItems: 'center' }}>
          {/* Left */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '5px 12px', borderRadius: '999px',
              background: 'rgba(109,94,245,0.12)', border: '1px solid rgba(109,94,245,0.25)',
              marginBottom: '28px', fontSize: '12px', color: '#8C93F0',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              Problem Statement 26151 · NTRO — Blockchain & Cybersecurity
            </div>

            <div style={{ fontSize: '13px', color: '#6B7385', marginBottom: '12px', letterSpacing: '0.04em' }}>From</div>
            <h1 style={{ fontSize: '54px', fontWeight: 800, lineHeight: 1.1, marginBottom: '8px', letterSpacing: '-0.03em' }}>
              Hidden Signals
            </h1>
            <h1 style={{ fontSize: '54px', fontWeight: 800, lineHeight: 1.1, marginBottom: '28px', letterSpacing: '-0.03em' }}>
              to{' '}
              <span style={{ background: 'linear-gradient(90deg, #6D5EF5, #7A7EFC, #2DD4BF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Clearer Truths
              </span>
            </h1>

            <p style={{ fontSize: '16px', color: '#94A0B8', lineHeight: 1.7, maxWidth: '440px', marginBottom: '20px' }}>
              AI-assisted cyber threat intelligence platform for dark web threat-actor de-anonymization. Collect, correlate, and visualize the digital footprints that link identities across the dark web.
            </p>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '36px', flexWrap: 'wrap' }}>
              {['Collect', 'Correlate', 'Analyze', 'Visualize'].map((s, i) => (
                <span key={i} style={{ fontSize: '12px', color: '#8C93F0', fontWeight: 500 }}>
                  {s}{i < 3 ? <span style={{ color: '#2D3748', margin: '0 6px' }}>•</span> : ''}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '14px', marginBottom: '48px', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/analysis')}
                style={{
                  padding: '14px 28px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
                  background: 'linear-gradient(90deg, #6D5EF5, #4338CA)',
                  color: 'white', border: 'none', cursor: 'pointer',
                  boxShadow: '0 0 24px rgba(109,94,245,0.4)',
                  display: 'flex', alignItems: 'center', gap: '8px', transition: 'transform 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                Start Investigation <ArrowRight size={16} />
              </button>
              <Link to="/dashboard" style={{
                padding: '14px 28px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
                border: '1px solid #1B2331', color: '#94A0B8', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0D1420'; e.currentTarget.style.color = '#F5F6FA'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94A0B8'; }}
              >
                <Play size={14} /> View Dashboard
              </Link>
            </div>

            <div style={{ borderTop: '1px solid #1B2331', paddingTop: '20px' }}>
              <div style={{ fontSize: '11px', color: '#6B7385', marginBottom: '4px' }}>Prepared for</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#94A0B8' }}>National Technical Research Organisation (NTRO)</div>
              <div style={{ fontSize: '11px', color: '#6B7385', marginTop: '4px' }}>Problem Statement ID: 26151 · Blockchain & Cybersecurity (Software Category)</div>
            </div>
          </div>

          {/* Right — Globe */}
          <div style={{ position: 'relative', height: '460px' }}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(109,94,245,0.06), rgba(45,212,191,0.04))',
              border: '1px solid #1B2331',
            }} />
            <GlobeIllustration />
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ borderTop: '1px solid #1B2331', borderBottom: '1px solid #1B2331', background: '#080D14' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '0 40px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: '32px 24px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid #1B2331' : 'none',
            }}>
              <div style={{ color: '#6D5EF5', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
              <div style={{ fontSize: '34px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '4px' }}>
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: '12px', color: '#6B7385' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT IS THREATLENS ── */}
      <section id="about" style={{ padding: '100px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-block', padding: '4px 14px', borderRadius: '999px',
              background: 'rgba(109,94,245,0.1)', border: '1px solid rgba(109,94,245,0.2)',
              fontSize: '12px', color: '#8C93F0', marginBottom: '20px',
            }}>About the Platform</div>
            <h2 style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '16px' }}>
              What is <span style={{ background: 'linear-gradient(90deg, #6D5EF5, #7A7EFC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ThreatLens</span>?
            </h2>
            <p style={{ fontSize: '16px', color: '#94A0B8', maxWidth: '680px', margin: '0 auto', lineHeight: 1.7 }}>
              ThreatLens is an investigator-facing cyber threat intelligence platform built for NTRO's Problem Statement 26151. It de-anonymizes dark-web threat actors by correlating the digital footprints — handles, PGP keys, wallets, infrastructure artifacts, and behavioral patterns — they leave across platforms.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { icon: <Shield size={20} />, color: '#F4373D', title: 'Defensive Intelligence', desc: 'Purpose-built for authorized law-enforcement and intelligence analysis. Every claim is annotated with evidence and confidence — no automated accusations.' },
              { icon: <Eye size={20} />, color: '#6D5EF5', title: 'Investigator-First Design', desc: 'A dense, dark-mode analytical dashboard with timelines, relationship graphs, evidence logs, and actor profiles designed for power-user investigators.' },
              { icon: <Lock size={20} />, color: '#10B981', title: 'Evidence-Graded Output', desc: 'Four-tier confidence model (Confirmed / Strong / Moderate / Weak) ensures findings are defensible. No black-box decisions — every score traces back to evidence.' },
            ].map((c, i) => (
              <div key={i} style={{
                background: '#0D1420', border: '1px solid #1B2331', borderRadius: '14px', padding: '28px',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#2A3340'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1B2331'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: `${c.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: c.color, marginBottom: '16px',
                }}>{c.icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '10px' }}>{c.title}</h3>
                <p style={{ fontSize: '13px', color: '#94A0B8', lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '100px 40px', background: '#080D14', borderTop: '1px solid #1B2331' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-block', padding: '4px 14px', borderRadius: '999px',
              background: 'rgba(45,212,191,0.08)', border: '1px solid rgba(45,212,191,0.2)',
              fontSize: '12px', color: '#2DD4BF', marginBottom: '20px',
            }}>Platform Capabilities</div>
            <h2 style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '16px' }}>
              Everything an Analyst Needs
            </h2>
            <p style={{ fontSize: '16px', color: '#94A0B8', maxWidth: '560px', margin: '0 auto' }}>
              Six core capability modules, each backed by real data pipelines and AI analysis — all in one unified investigator dashboard.
            </p>
          </div>

          {/* Feature tabs + detail */}
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px' }}>
            {/* Tab list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {features.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  style={{
                    textAlign: 'left', padding: '14px 16px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                    background: activeFeature === i ? '#141B47' : 'transparent',
                    borderLeft: activeFeature === i ? `3px solid ${f.color}` : '3px solid transparent',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { if (activeFeature !== i) e.currentTarget.style.background = '#0D1420'; }}
                  onMouseLeave={e => { if (activeFeature !== i) e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: activeFeature === i ? f.color : '#94A0B8' }}>
                    {f.icon}
                    <span style={{ fontSize: '13px', fontWeight: 600, color: activeFeature === i ? '#F5F6FA' : '#94A0B8' }}>{f.title}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            {(() => {
              const f = features[activeFeature];
              return (
                <div style={{
                  background: '#0D1420', border: '1px solid #1B2331', borderRadius: '14px', padding: '36px',
                }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: `${f.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: f.color, marginBottom: '20px',
                  }}>{f.icon}</div>
                  <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>{f.title}</h3>
                  <p style={{ fontSize: '15px', color: '#94A0B8', lineHeight: 1.7, marginBottom: '28px' }}>{f.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {f.bullets.map((b, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <CheckCircle size={14} color={f.color} style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span style={{ fontSize: '13px', color: '#94A0B8' }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS / PIPELINE ── */}
      <section id="pipeline" style={{ padding: '100px 40px', borderTop: '1px solid #1B2331' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-block', padding: '4px 14px', borderRadius: '999px',
              background: 'rgba(140,97,189,0.1)', border: '1px solid rgba(140,97,189,0.25)',
              fontSize: '12px', color: '#8C61BD', marginBottom: '20px',
            }}>End-to-End Pipeline</div>
            <h2 style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '16px' }}>How ThreatLens Works</h2>
            <p style={{ fontSize: '16px', color: '#94A0B8', maxWidth: '560px', margin: '0 auto' }}>
              Six stages from raw dark-web data to actionable, evidence-backed attribution leads — all visible in real time through the dashboard.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {pipeline.map((p, i) => (
              <div key={i} style={{
                background: '#0D1420', border: '1px solid #1B2331', borderRadius: '14px', padding: '28px',
                position: 'relative', overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#2A3340'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1B2331'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{
                  position: 'absolute', top: '20px', right: '20px',
                  fontSize: '28px', fontWeight: 800, color: 'rgba(109,94,245,0.08)', letterSpacing: '-0.02em',
                }}>{p.step}</div>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: 'rgba(109,94,245,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#6D5EF5', marginBottom: '16px',
                }}>{p.icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '10px' }}>{p.title}</h3>
                <p style={{ fontSize: '13px', color: '#94A0B8', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <section id="architecture" style={{ padding: '100px 40px', background: '#080D14', borderTop: '1px solid #1B2331' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-block', padding: '4px 14px', borderRadius: '999px',
                background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
                fontSize: '12px', color: '#10B981', marginBottom: '20px',
              }}>System Architecture</div>
              <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '16px' }}>
                Built for Scale & Auditability
              </h2>
              <p style={{ fontSize: '15px', color: '#94A0B8', lineHeight: 1.7, marginBottom: '32px' }}>
                ThreatLens follows a layered, modular architecture — from authorized intelligence ingestion through a FastAPI backend, Express.js BFF, and React investigator dashboard — with PostgreSQL storing every entity and evidence record.
              </p>
              {[
                { label: 'Data Collection Layer', desc: 'Scheduled workers + manual ingestion', color: '#10B981' },
                { label: 'Intelligence Engine', desc: 'Normalization, relationship detection, AI analysis', color: '#6D5EF5' },
                { label: 'FastAPI Backend', desc: 'REST endpoints for entities, graph, export', color: '#8C61BD' },
                { label: 'React Investigator Dashboard', desc: 'Search, graph, profiles, evidence, reports', color: '#2DD4BF' },
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '18px' }}>
                  <div style={{ width: '4px', borderRadius: '2px', background: l.color, alignSelf: 'stretch', minHeight: '36px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>{l.label}</div>
                    <div style={{ fontSize: '12px', color: '#6B7385' }}>{l.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Arch diagram */}
            <div style={{
              background: '#0D1420', border: '1px solid #1B2331', borderRadius: '16px', padding: '32px',
              fontFamily: "'Courier New', monospace", fontSize: '12px', color: '#6B7385', lineHeight: '1.9',
            }}>
              <div style={{ color: '#6D5EF5', marginBottom: '8px' }}>// ThreatLens System Architecture</div>
              {[
                { indent: 0, text: 'Authorized Intelligence Sources', color: '#10B981' },
                { indent: 1, text: '↓', color: '#2D3748' },
                { indent: 0, text: 'Data Collection Layer', color: '#94A0B8' },
                { indent: 1, text: '(Scheduled workers · Tor forums · Marketplaces)', color: '#6B7385' },
                { indent: 1, text: '↓', color: '#2D3748' },
                { indent: 0, text: 'Data Normalization Layer', color: '#94A0B8' },
                { indent: 1, text: '(Dedup · Conflict resolution · Structured entities)', color: '#6B7385' },
                { indent: 1, text: '↓', color: '#2D3748' },
                { indent: 0, text: 'Intelligence Engine', color: '#6D5EF5' },
                { indent: 1, text: 'Relationship Engine  ·  AI/ML Pipeline', color: '#8C61BD' },
                { indent: 1, text: '(Graph building)    ·  (Stylometry · Behavior)', color: '#6B7385' },
                { indent: 1, text: '↓', color: '#2D3748' },
                { indent: 0, text: 'PostgreSQL Intelligence Database', color: '#94A0B8' },
                { indent: 1, text: '↓', color: '#2D3748' },
                { indent: 0, text: 'FastAPI · Express.js BFF', color: '#3B82F6' },
                { indent: 1, text: '↓', color: '#2D3748' },
                { indent: 0, text: 'React Investigator Dashboard', color: '#2DD4BF' },
                { indent: 1, text: '(Dashboard · Actors · Graph · Reports · Export)', color: '#6B7385' },
              ].map((l, i) => (
                <div key={i} style={{ paddingLeft: l.indent * 16, color: l.color }}>{l.text}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── IDENTIFIERS TABLE ── */}
      <section style={{ padding: '100px 40px', borderTop: '1px solid #1B2331' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '12px' }}>
              The Identifiers That Matter
            </h2>
            <p style={{ fontSize: '15px', color: '#94A0B8', maxWidth: '520px', margin: '0 auto' }}>
              ThreatLens tracks and correlates the full range of digital identifiers threat actors leave behind.
            </p>
          </div>

          <div style={{ background: '#0D1420', border: '1px solid #1B2331', borderRadius: '14px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1B2331' }}>
                  {['Identifier', 'Why It Matters', 'Confidence Signal'].map(h => (
                    <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', color: '#6B7385', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'Handles / Aliases', icon: <Users size={14} color="#94A0B8" />, why: 'Public identity on forums and marketplaces; the anchor point for all analysis.', signal: 'Medium', sigColor: '#F59E0B', sigBg: '#522B0A' },
                  { id: 'PGP Keys', icon: <Key size={14} color="#3B82F6" />, why: 'Reuse of the same PGP key across platforms is a strong linking indicator.', signal: 'High', sigColor: '#F4373D', sigBg: '#3A1116' },
                  { id: 'Cryptocurrency Wallets', icon: <Zap size={14} color="#F59E0B" />, why: 'Wallet reuse and transaction flow patterns link actors across markets.', signal: 'High', sigColor: '#F4373D', sigBg: '#3A1116' },
                  { id: 'Infrastructure Indicators', icon: <Server size={14} color="#8C61BD" />, why: 'SSL certificates and banners leak real-host associations from onion services.', signal: 'Strong', sigColor: '#2DD4BF', sigBg: '#0E2E29' },
                  { id: 'Behavioral Patterns', icon: <Activity size={14} color="#6D5EF5" />, why: 'Writing style, posting times, and activity rhythms can link separate personas.', signal: 'Moderate', sigColor: '#F59E0B', sigBg: '#522B0A' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < 4 ? '1px solid #1B2331' : 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#121A28')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 600 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{row.icon}{row.id}</div>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '13px', color: '#94A0B8', lineHeight: 1.5 }}>{row.why}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 600,
                        color: row.sigColor, background: row.sigBg,
                      }}>{row.signal}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── DASHBOARD PAGES ── */}
      <section style={{ padding: '100px 40px', background: '#080D14', borderTop: '1px solid #1B2331' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '12px' }}>
              10 Purpose-Built Investigation Views
            </h2>
            <p style={{ fontSize: '15px', color: '#94A0B8', maxWidth: '520px', margin: '0 auto' }}>
              Every screen in ThreatLens is optimized for a specific investigative workflow, from high-level overview to granular evidence.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }}>
            {[
              { icon: <BarChart2 size={18} />, label: 'Dashboard', desc: 'Stat cards, activity timeline, system health', link: '/dashboard', color: '#6D5EF5' },
              { icon: <Users size={18} />, label: 'Actors', desc: 'Profiles, identifiers, confidence breakdown', link: '/actors', color: '#F4373D' },
              { icon: <GitBranch size={18} />, label: 'Relationships', desc: 'Interactive force-directed graph', link: '/relationships', color: '#2DD4BF' },
              { icon: <Server size={18} />, label: 'Infrastructure', desc: 'Onion fingerprinting & correlation', link: '/infrastructure', color: '#8C61BD' },
              { icon: <Database size={18} />, label: 'Sources', desc: 'Collection status & management', link: '/sources', color: '#10B981' },
              { icon: <Radar size={18} />, label: 'Analysis', desc: 'Full investigation pipeline demo', link: '/analysis', color: '#F59E0B' },
              { icon: <Eye size={18} />, label: 'Evidence', desc: 'PGP keys, screenshots, certificates', link: '/evidence', color: '#3B82F6' },
              { icon: <FileText size={18} />, label: 'Reports', desc: 'Generate & export CSV/JSON/PDF', link: '/reports', color: '#6D5EF5' },
              { icon: <Cpu size={18} />, label: 'Settings', desc: 'Autonomous mode & preferences', link: '/settings', color: '#94A0B8' },
              { icon: <Lock size={18} />, label: 'Login', desc: 'Secure analyst access portal', link: '/login', color: '#F4373D' },
            ].map((pg, i) => (
              <Link key={i} to={pg.link} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#0D1420', border: '1px solid #1B2331', borderRadius: '12px', padding: '20px 16px',
                  textAlign: 'center', transition: 'all 0.2s', cursor: 'pointer',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = pg.color + '50'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = '#121A28'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1B2331'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#0D1420'; }}
                >
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: `${pg.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: pg.color, margin: '0 auto 12px',
                  }}>{pg.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#F5F6FA', marginBottom: '4px' }}>{pg.label}</div>
                  <div style={{ fontSize: '11px', color: '#6B7385', lineHeight: 1.4 }}>{pg.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ padding: '100px 40px', borderTop: '1px solid #1B2331' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(109,94,245,0.12), rgba(45,212,191,0.06))',
            border: '1px solid rgba(109,94,245,0.25)', borderRadius: '20px',
            padding: '64px 48px',
          }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #6D5EF5, #4338CA)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 0 32px rgba(109,94,245,0.4)',
            }}>
              <Target size={26} color="white" />
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '14px' }}>
              Start Your Investigation
            </h2>
            <p style={{ fontSize: '15px', color: '#94A0B8', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 36px' }}>
              Enter any known handle, PGP key fingerprint, wallet address, or onion domain to start the full ThreatLens analysis pipeline — see results in real time.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/analysis')}
                style={{
                  padding: '14px 32px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
                  background: 'linear-gradient(90deg, #6D5EF5, #4338CA)',
                  color: 'white', border: 'none', cursor: 'pointer',
                  boxShadow: '0 0 24px rgba(109,94,245,0.4)',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                Launch Analysis <ArrowRight size={16} />
              </button>
              <Link to="/dashboard" style={{
                padding: '14px 32px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
                border: '1px solid #2A3340', color: '#94A0B8', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0D1420'; e.currentTarget.style.color = '#F5F6FA'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94A0B8'; }}
              >
                View Dashboard <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid #1B2331', background: '#080D14', padding: '48px 40px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '40px', marginBottom: '48px' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: 'linear-gradient(135deg, #6D5EF5, #4338CA)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Target size={16} color="white" />
                </div>
                <span style={{ fontWeight: 700, fontSize: '15px' }}>ThreatLens</span>
              </div>
              <p style={{ fontSize: '12px', color: '#6B7385', lineHeight: 1.7, maxWidth: '220px' }}>
                AI-assisted cyber threat intelligence. Different aliases. Same actor. A clearer picture.
              </p>
            </div>

            {/* Platform */}
            <div>
              <div style={{ fontSize: '12px', color: '#6B7385', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>Platform</div>
              {[['Dashboard', '/dashboard'], ['Actors', '/actors'], ['Relationships', '/relationships'], ['Infrastructure', '/infrastructure'], ['Analysis', '/analysis']].map(([l, h]) => (
                <div key={l} style={{ marginBottom: '10px' }}>
                  <Link to={h} style={{ fontSize: '13px', color: '#94A0B8', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F5F6FA')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#94A0B8')}
                  >{l}</Link>
                </div>
              ))}
            </div>

            {/* Tools */}
            <div>
              <div style={{ fontSize: '12px', color: '#6B7385', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>Tools</div>
              {[['Sources', '/sources'], ['Evidence', '/evidence'], ['Reports', '/reports'], ['Settings', '/settings']].map(([l, h]) => (
                <div key={l} style={{ marginBottom: '10px' }}>
                  <Link to={h} style={{ fontSize: '13px', color: '#94A0B8', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F5F6FA')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#94A0B8')}
                  >{l}</Link>
                </div>
              ))}
            </div>

            {/* About */}
            <div>
              <div style={{ fontSize: '12px', color: '#6B7385', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>About</div>
              <div style={{ fontSize: '13px', color: '#6B7385', lineHeight: 1.7 }}>
                <div style={{ marginBottom: '8px' }}>Problem Statement ID: <span style={{ color: '#94A0B8' }}>26151</span></div>
                <div style={{ marginBottom: '8px' }}>Category: <span style={{ color: '#94A0B8' }}>Blockchain & Cybersecurity</span></div>
                <div>Prepared for: <span style={{ color: '#94A0B8' }}>NTRO</span></div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #1B2331', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '12px', color: '#6B7385' }}>© {new Date().getFullYear()} ThreatLens · Smart India Hackathon · All rights reserved.</div>
            <div style={{ fontSize: '12px', color: '#6B7385', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                System Online
              </span>
              <span>Secure Access · Audit Logged</span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </div>
  );
}
