import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Network, Database, Search, ShieldAlert,
  Fingerprint, Server, ArrowRight, TrendingUp, Clock,
  Key, AlertCircle, CheckCircle, GitBranch
} from 'lucide-react';
import { ConfidencePill } from '../components/ui/Badges';
import { Button } from '../components/ui/Button';

// ── Circular health ring (using CSS design tokens) ───────────────────────────
const HealthRing = ({ pct, color, label }: { pct: number; color: string; label: string }) => {
  const r = 26, circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width="68" height="68" viewBox="0 0 68 68">
        <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(36, 42, 37, 0.8)" strokeWidth="4" />
        <circle
          cx="34" cy="34" r={r} fill="none"
          stroke={color} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 34 34)"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <text x="34" y="38" textAnchor="middle" fontSize="12" fontWeight="600" fill="#f2f5ef" fontFamily="monospace">
          {pct}%
        </text>
      </svg>
      <span className="text-[10px] font-mono text-text-muted text-center uppercase tracking-wider">{label}</span>
    </div>
  );
};

// ── Mock data arrays ─────────────────────────────────────────────────────────
const timelineEvents = [
  { type: 'pgp', icon: Key, color: 'text-status-red', title: 'PGP Key Reuse', desc: '0xA3F9D2C seen on SilentCrow account', time: '15m ago', link: '/actors' },
  { type: 'infra', icon: Server, color: 'text-status-purple', title: 'Infrastructure Scan', desc: 'darkvendx7q2k3.onion → 198.51.100.23 correlated', time: '2h ago', link: '/infrastructure' },
  { type: 'ai', icon: Fingerprint, color: 'text-accent-solid', title: 'Stylometric Match', desc: 'AlphaBay_Seller ↔ DarkVendorX (94% overlap)', time: '4h ago', link: '/actors' },
  { type: 'relationship', icon: GitBranch, color: 'text-status-blue', title: 'New Relationship Edge', desc: 'DarkVendorX → EvilCore trust link confirmed', time: '6h ago', link: '/relationships' },
  { type: 'alert', icon: AlertCircle, color: 'text-status-orange', title: 'New Actor Detected', desc: 'SilentCrow created on BlackForum', time: '5d ago', link: '/actors' },
  { type: 'source', icon: CheckCircle, color: 'text-status-green', title: 'Collection Complete', desc: 'DarkForum ingested: 1,420 new posts', time: '6d ago', link: '/sources' },
];

const alerts = [
  { id: 1, title: 'Stylometric Match Detected', desc: 'Persona "AlphaBay_Seller" shows 94% stylistic overlap with "DarkVendorX".', details: 'Analyzed 452 posts. Key overlap in: punctuation habits (comma splices), specific lexical choices ("guaranteed fresh", "no time wasters"), and timezone activity (UTC+3).', action: 'View Persona Analysis', icon: Fingerprint, color: 'text-status-red', time: '15m ago', confidence: 'High' as const, route: '/actors' },
  { id: 2, title: 'Infrastructure Correlation', desc: 'Onion service certificate matched to Clearnet IP 198.51.100.23.', details: 'SHA-256 fingerprint 8f4e2... observed on darkvx...onion on 2026-09-24 and subsequently detected on 198.51.100.23 port 443 during clearnet scan.', action: 'View Infra', icon: Server, color: 'text-status-orange', time: '2h ago', confidence: 'High' as const, route: '/infrastructure' },
  { id: 3, title: 'PGP Key Reuse', desc: 'Key fingerprint 0xA3F9D2C observed on new forum account "SilentCrow".', details: 'Key previously associated solely with DarkVendorX. SilentCrow registered 3 days ago. Highly probable rebranding or sock-puppet account.', action: 'View Actor Profile', icon: ShieldAlert, color: 'text-status-red', time: '4h ago', confidence: 'High' as const, route: '/actors' },
  { id: 4, title: 'Cross-Marketplace Trust Link', desc: 'Wallet bc1qxy2k... flow detected between DarkVendorX and EvilCore.', details: 'Transaction of 0.45 BTC traced. First direct financial link between these two entities. Requires further blockchain tracing.', action: 'View Wallet Flows', icon: Network, color: 'text-accent-solid', time: '5h ago', confidence: 'Moderate' as const, route: '/relationships' },
];

const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [expandedAlert, setExpandedAlert] = useState<number | null>(null);
  const navigate = useNavigate();

  const metrics = [
    { label: 'OBSERVED ACTORS', value: '1,248', trend: '+12 THIS WEEK', clickTo: '/actors' },
    { label: 'RELATIONSHIPS', value: '8,420', trend: '+342 THIS WEEK', clickTo: '/relationships' },
    { label: 'INFRASTRUCTURE', value: '3,104', trend: 'INDICATORS', clickTo: '/infrastructure' },
    { label: 'SOURCES MONITORED', value: '37', online: true, clickTo: '/sources' },
  ];

  return (
    <div className="space-y-10 animate-fade-in font-sans">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-subtle pb-8">
        <div>
          <p className="text-[10px] font-mono tracking-[0.25em] text-accent-solid uppercase mb-2">// 01 OVERVIEW</p>
          <h1 className="editorial-hero text-text-primary">
            INTELLIGENCE <br />
            <span className="font-semibold text-text-primary">OVERVIEW</span>
          </h1>
          <p className="text-xs font-mono text-text-muted tracking-wider uppercase mt-3">
            LIVE THREAT INTELLIGENCE & CORRELATION DASHBOARD
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); if (query.trim()) navigate('/analysis'); }} className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" strokeWidth={1.5} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-canvas-deep border border-border-subtle rounded-[4px] text-xs font-mono text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent-border transition-colors"
            placeholder="Quick search (actors, keys)..."
          />
        </form>
      </div>

      {/* Editorial Metric Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-border-subtle pb-8">
        {metrics.map((m, i) => (
          <div
            key={i}
            onClick={() => navigate(m.clickTo)}
            className={`py-4 px-6 cursor-pointer group hover:bg-card-hover/40 transition-colors ${
              i > 0 ? 'border-l border-border-subtle' : ''
            }`}
          >
            <p className="text-[10px] font-mono tracking-[0.2em] text-text-muted uppercase mb-3 group-hover:text-accent-solid transition-colors">
              {m.label}
            </p>
            <p className="text-3xl lg:text-4xl font-mono font-bold text-text-primary tabular-nums tracking-tight">
              {m.value}
            </p>
            {m.trend && (
              <p className="text-[10px] font-mono text-status-green flex items-center gap-1.5 mt-2 tracking-wider">
                <TrendingUp className="w-3 h-3" strokeWidth={1.5} />
                <span>{m.trend}</span>
              </p>
            )}
            {m.online && (
              <div className="flex items-center gap-2 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse-subtle" />
                <span className="text-[9px] font-mono text-status-green uppercase tracking-widest">ONLINE</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Grid: 2/3 Left + 1/3 Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2/3 */}
        <div className="lg:col-span-2 space-y-10">
          {/* High-Confidence Alerts Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <p className="text-[10px] font-mono tracking-[0.25em] text-text-muted uppercase">// HIGH-CONFIDENCE ALERTS</p>
                <p className="text-xs text-text-muted mt-1">Pending analyst review. Click any row to expand details.</p>
              </div>
              <Button variant="secondary" className="h-7 text-[10px] font-mono uppercase tracking-wider" onClick={() => navigate('/relationships')}>
                View Graph →
              </Button>
            </div>

            <div className="divide-y divide-border-subtle border-b border-border-subtle">
              {alerts.map((alert) => {
                const isExpanded = expandedAlert === alert.id;
                const Icon = alert.icon;
                return (
                  <div
                    key={alert.id}
                    className="scan-row-hover py-4 cursor-pointer group transition-colors"
                    onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                  >
                    <div className="flex items-start gap-4">
                      <Icon className={`w-4 h-4 ${alert.color} shrink-0 mt-0.5`} strokeWidth={1.5} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="text-xs font-mono font-semibold text-text-primary group-hover:text-accent-solid transition-colors">
                            {alert.title}
                          </h4>
                          <span className="text-[10px] font-mono text-text-muted shrink-0">{alert.time}</span>
                        </div>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">{alert.desc}</p>

                        {!isExpanded && (
                          <div className="flex items-center gap-4 mt-2">
                            <ConfidencePill level={alert.confidence} />
                            <span className="text-[10px] font-mono text-accent-solid hover:underline flex items-center gap-1">
                              Review Evidence <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pl-8 pt-3 border-l-2 border-accent-border/40 space-y-3 animate-fade-in">
                        <p className="text-xs text-text-secondary leading-relaxed bg-canvas-deep p-3 rounded-[4px] border border-border-subtle font-mono">
                          {alert.details}
                        </p>
                        <div className="flex items-center gap-4">
                          <Button size="sm" className="font-mono text-[10px] uppercase tracking-wider" onClick={(e) => { e.stopPropagation(); navigate(alert.route); }}>
                            {alert.action}
                          </Button>
                          <ConfidencePill level={alert.confidence} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity Timeline Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <p className="text-[10px] font-mono tracking-[0.25em] text-text-muted uppercase">// RECENT ACTIVITY</p>
                <p className="text-xs text-text-muted mt-1">Latest events from intelligence pipelines</p>
              </div>
              <Clock className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
            </div>

            <div className="divide-y divide-border-subtle border-b border-border-subtle">
              {timelineEvents.map((ev, i) => {
                const Icon = ev.icon;
                return (
                  <div
                    key={i}
                    onClick={() => navigate(ev.link)}
                    className="scan-row-hover flex items-start gap-4 py-3.5 cursor-pointer group transition-colors"
                  >
                    <Icon className={`w-4 h-4 ${ev.color} shrink-0 mt-0.5`} strokeWidth={1.5} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs font-mono font-semibold text-text-primary group-hover:text-accent-solid transition-colors">
                          {ev.title}
                        </span>
                        <span className="text-[10px] font-mono text-text-muted shrink-0 ml-2">{ev.time}</span>
                      </div>
                      <p className="text-xs text-text-muted mt-1 truncate font-mono">{ev.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1/3 Side Panel */}
        <div className="space-y-10">
          {/* Collection Status Strip */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <p className="text-[10px] font-mono tracking-[0.25em] text-text-muted uppercase">// COLLECTION STATUS</p>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse-subtle" />
                <span className="text-[9px] font-mono text-status-green uppercase tracking-widest">ONLINE</span>
              </span>
            </div>

            <div className="border border-border-subtle rounded-[4px] divide-y divide-border-subtle bg-surface">
              {[
                { name: 'Dark Web Forums', status: 'Active', count: '12 FEEDS' },
                { name: 'Marketplace Listings', status: 'Active', count: '4 MARKETS' },
                { name: 'Paste / Leak Sites', status: 'Active', count: 'HIGH VOLUME' },
                { name: 'Clearnet Proxies', status: 'Degraded', count: '2 DEGRADED' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3">
                  <span className="text-xs font-mono text-text-secondary">{s.name}</span>
                  <div className="text-right">
                    <span className={`text-[10px] font-mono uppercase font-semibold ${s.status === 'Active' ? 'text-status-green' : 'text-status-orange'}`}>
                      {s.status}
                    </span>
                    <p className="text-[9px] font-mono text-text-muted">{s.count}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="ghost" className="w-full text-[10px] font-mono uppercase tracking-widest h-8" onClick={() => navigate('/sources')}>
              Manage Sources →
            </Button>
          </div>

          {/* System Health */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <p className="text-[10px] font-mono tracking-[0.25em] text-text-muted uppercase">// SYSTEM HEALTH</p>
              <span className="text-[9px] font-mono text-status-green uppercase">OPERATIONAL</span>
            </div>
            <div className="flex justify-around py-2 border border-border-subtle rounded-[4px] bg-surface">
              <HealthRing pct={92} color="var(--color-status-teal)" label="COLLECTION" />
              <HealthRing pct={87} color="var(--color-status-purple)" label="AI ANALYSIS" />
              <HealthRing pct={96} color="var(--color-status-green)" label="DATABASE" />
            </div>
          </div>

          {/* Pipeline Health Bars */}
          <div className="space-y-4">
            <div className="border-b border-border-subtle pb-3">
              <p className="text-[10px] font-mono tracking-[0.25em] text-text-muted uppercase">// PIPELINE HEALTH</p>
            </div>
            <div className="space-y-4 font-mono">
              {[
                { label: 'Normalization & Entity Extraction', pct: 98, color: 'bg-status-blue' },
                { label: 'Infrastructure Fingerprinting', pct: 92, color: 'bg-status-orange' },
                { label: 'Stylometric AI Processing', pct: 85, color: 'bg-accent-solid' },
                { label: 'Relationship Graph Indexing', pct: 100, color: 'bg-status-green' },
              ].map((sys) => (
                <div key={sys.label} className="space-y-1.5">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-text-muted uppercase tracking-wider">{sys.label}</span>
                    <span className="text-text-primary font-semibold tabular-nums">{sys.pct}%</span>
                  </div>
                  <div className="h-px w-full bg-border-subtle">
                    <div className={`h-px ${sys.color} transition-all duration-1000`} style={{ width: `${sys.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
