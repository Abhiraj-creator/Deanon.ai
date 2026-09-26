import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Network, Database, Search, Activity, ShieldAlert,
  Fingerprint, Server, ArrowRight, TrendingUp, Clock,
  Key, AlertCircle, CheckCircle, GitBranch
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { StatusDot, ConfidencePill } from '../components/ui/Badges';
import { Button } from '../components/ui/Button';

// ── Circular health ring ─────────────────────────────────────────────────────
const HealthRing = ({ pct, color, label }: { pct: number; color: string; label: string }) => {
  const r = 28, circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(27,35,49,1)" strokeWidth="6" />
        <circle
          cx="36" cy="36" r={r} fill="none"
          stroke={color} strokeWidth="6"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <text x="36" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="white" fontFamily="Inter, sans-serif">
          {pct}%
        </text>
      </svg>
      <span className="text-xs text-text-muted text-center leading-tight">{label}</span>
    </div>
  );
};

// ── Timeline event icon ──────────────────────────────────────────────────────
const timelineEvents = [
  { type: 'pgp', icon: Key, color: 'text-status-red', bg: 'bg-status-red/10', title: 'PGP Key Reuse', desc: '0xA3F9D2C seen on SilentCrow account', time: '15m ago', link: '/actors' },
  { type: 'infra', icon: Server, color: 'text-status-purple', bg: 'bg-status-purple/10', title: 'Infrastructure Scan', desc: 'darkvendx7q2k3.onion → 198.51.100.23 correlated', time: '2h ago', link: '/infrastructure' },
  { type: 'ai', icon: Fingerprint, color: 'text-accent-solid', bg: 'bg-accent-soft/20', title: 'Stylometric Match', desc: 'AlphaBay_Seller ↔ DarkVendorX (94% overlap)', time: '4h ago', link: '/actors' },
  { type: 'relationship', icon: GitBranch, color: 'text-status-blue', bg: 'bg-status-blue/10', title: 'New Relationship Edge', desc: 'DarkVendorX → EvilCore trust link confirmed', time: '6h ago', link: '/relationships' },
  { type: 'alert', icon: AlertCircle, color: 'text-status-orange', bg: 'bg-status-orange/10', title: 'New Actor Detected', desc: 'SilentCrow created on BlackForum', time: '5d ago', link: '/actors' },
  { type: 'source', icon: CheckCircle, color: 'text-status-green', bg: 'bg-status-green/10', title: 'Collection Complete', desc: 'DarkForum ingested: 1,420 new posts', time: '6d ago', link: '/sources' },
];

const alerts = [
  { id: 1, title: 'Stylometric Match Detected', desc: 'Persona "AlphaBay_Seller" shows 94% stylistic overlap with "DarkVendorX".', details: 'Analyzed 452 posts. Key overlap in: punctuation habits (comma splices), specific lexical choices ("guaranteed fresh", "no time wasters"), and timezone activity (UTC+3).', action: 'View Persona Analysis', icon: Fingerprint, color: 'text-status-red', bg: 'bg-status-red/10', time: '15m ago', confidence: 'High' as const, route: '/actors' },
  { id: 2, title: 'Infrastructure Correlation', desc: 'Onion service certificate matched to Clearnet IP 198.51.100.23.', details: 'SHA-256 fingerprint 8f4e2... observed on darkvx...onion on 2026-09-24 and subsequently detected on 198.51.100.23 port 443 during clearnet scan.', action: 'View Infra', icon: Server, color: 'text-status-orange', bg: 'bg-status-orange/10', time: '2h ago', confidence: 'High' as const, route: '/infrastructure' },
  { id: 3, title: 'PGP Key Reuse', desc: 'Key fingerprint 0xA3F9D2C observed on new forum account "SilentCrow".', details: 'Key previously associated solely with DarkVendorX. SilentCrow registered 3 days ago. Highly probable rebranding or sock-puppet account.', action: 'View Actor Profile', icon: ShieldAlert, color: 'text-status-red', bg: 'bg-status-red/10', time: '4h ago', confidence: 'High' as const, route: '/actors' },
  { id: 4, title: 'Cross-Marketplace Trust Link', desc: 'Wallet bc1qxy2k... flow detected between DarkVendorX and EvilCore.', details: 'Transaction of 0.45 BTC traced. First direct financial link between these two entities. Requires further blockchain tracing.', action: 'View Wallet Flows', icon: Network, color: 'text-accent-solid', bg: 'bg-accent-soft/20', time: '5h ago', confidence: 'Moderate' as const, route: '/relationships' },
];

const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [expandedAlert, setExpandedAlert] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl text-text-primary font-bold">Investigator Dashboard</h1>
          <p className="text-text-secondary mt-1">Live threat intelligence and relationship insights.</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); if (query.trim()) navigate('/analysis'); }} className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-text-muted" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-border-subtle rounded-lg bg-input text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-accent-border focus:border-accent-border transition-colors"
            placeholder="Quick search (handles, PGP keys, wallets)..."
          />
        </form>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Observed Actors', value: '1,248', trend: '+12 this week', icon: Users, color: 'accent-solid', iconBg: 'bg-accent-soft/20', iconBorder: 'border-accent-soft/30', trendColor: 'text-status-green', route: '/actors' },
          { label: 'Extracted Relationships', value: '8,420', trend: '+342 this week', icon: Network, color: 'status-green', iconBg: 'bg-status-green/10', iconBorder: 'border-status-green/20', trendColor: 'text-status-green', route: '/relationships' },
          { label: 'Infrastructure Indicators', value: '3,104', trend: 'Indicators correlated', icon: Server, color: 'status-blue', iconBg: 'bg-status-blue/10', iconBorder: 'border-status-blue/20', trendColor: 'text-text-muted', route: '/infrastructure' },
          { label: 'Sources Monitored', value: '37', trend: '', icon: Database, color: 'status-orange', iconBg: 'bg-status-orange/10', iconBorder: 'border-status-orange/20', trendColor: '', route: '/sources', online: true },
        ].map((s, i) => (
          <Card key={i} className="hover:border-accent-border/40 transition-colors cursor-pointer" onClick={() => navigate(s.route)}>
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-text-secondary">{s.label}</span>
              <div className={`p-2 ${s.iconBg} rounded-lg border ${s.iconBorder}`}>
                <s.icon className={`w-4 h-4 text-${s.color}`} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-text-primary tabular-nums tracking-tight">{s.value}</h3>
              <div className="mt-2 flex items-center text-xs font-medium gap-1">
                {s.online ? (
                  <StatusDot status="Online" />
                ) : (
                  <>
                    <TrendingUp className={`w-3 h-3 ${s.trendColor}`} />
                    <span className={s.trendColor}>{s.trend}</span>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts — left 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-bold text-text-primary">High-Confidence Alerts & Relationships</h2>
                <p className="text-xs text-text-muted mt-1">Pending analyst review. Click any alert to expand details.</p>
              </div>
              <Button variant="secondary" className="h-8 text-xs" onClick={() => navigate('/relationships')}>
                View Graph
              </Button>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => {
                const isExpanded = expandedAlert === alert.id;
                return (
                  <div key={alert.id}
                    className="group flex flex-col p-4 bg-canvas-dark border border-border-subtle rounded-xl hover:border-accent-border/40 transition-colors cursor-pointer"
                    onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                  >
                    <div className="flex items-start">
                      <div className={`p-2.5 rounded-lg mr-4 ${alert.bg} border border-white/5`}>
                        <alert.icon className={`w-5 h-5 ${alert.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-text-primary group-hover:text-accent-link transition-colors">{alert.title}</h4>
                          <span className="text-xs text-text-muted">{alert.time}</span>
                        </div>
                        <p className="text-sm text-text-secondary mt-1">{alert.desc}</p>
                        {!isExpanded && (
                          <div className="mt-2.5 flex items-center space-x-3">
                            <ConfidencePill level={alert.confidence} />
                            <button className="text-xs text-accent-link font-medium flex items-center hover:underline">
                              Review Evidence <ArrowRight className="w-3 h-3 ml-1" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-border-subtle ml-14 animate-fade-in">
                        <h5 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Detailed Analysis</h5>
                        <p className="text-sm text-text-primary mb-4 bg-card p-3 rounded-lg border border-border-subtle">{alert.details}</p>
                        <div className="flex items-center space-x-4">
                          <Button size="sm" onClick={(e) => { e.stopPropagation(); navigate(alert.route); }}>
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
          </Card>

          {/* Recent Activity Timeline */}
          <Card>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-bold text-text-primary">Recent Activity</h2>
                <p className="text-xs text-text-muted mt-1">Latest events from all intelligence pipelines</p>
              </div>
              <Clock className="w-4 h-4 text-text-muted" />
            </div>
            <div className="relative">
              <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border-subtle" />
              <div className="space-y-4">
                {timelineEvents.map((ev, i) => (
                  <div key={i} className="flex gap-4 items-start group cursor-pointer" onClick={() => navigate(ev.link)}>
                    <div className={`relative z-10 w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full ${ev.bg} border border-white/5`}>
                      <ev.icon className={`w-4 h-4 ${ev.color}`} />
                    </div>
                    <div className="flex-1 pt-1.5 pb-3 border-b border-border-subtle last:border-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-text-primary group-hover:text-accent-link transition-colors">{ev.title}</span>
                        <span className="text-xs text-text-muted">{ev.time}</span>
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5">{ev.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right panel */}
        <div className="space-y-6">
          {/* System Health */}
          <Card>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-bold text-text-primary">System Health</h2>
                <p className="text-xs text-text-muted mt-0.5">Pipeline operational status</p>
              </div>
              <StatusDot status="Online" />
            </div>
            <div className="flex justify-around py-2">
              <HealthRing pct={92} color="#2DD4BF" label="Collection" />
              <HealthRing pct={87} color="#6D5EF5" label="AI Analysis" />
              <HealthRing pct={96} color="#22C55E" label="Database" />
            </div>
          </Card>

          {/* Source Collection */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-sm font-bold text-text-primary">Source Collection</h2>
                <p className="text-xs text-text-muted mt-0.5">Automated ingestion pipelines</p>
              </div>
              <StatusDot status="Online" />
            </div>
            <div className="space-y-2.5">
              {[
                { name: 'Dark Web Forums', status: 'Active', count: '12 feeds' },
                { name: 'Marketplace Listings', status: 'Active', count: '4 markets' },
                { name: 'Paste / Leak Sites', status: 'Active', count: 'High volume' },
                { name: 'Clearnet Proxies', status: 'Degraded', count: '2 nodes down' },
              ].map((source, i) => (
                <div key={i} className="flex justify-between items-center p-2.5 bg-canvas-dark rounded-lg border border-border-subtle">
                  <span className="text-sm text-text-secondary font-medium">{source.name}</span>
                  <div className="text-right">
                    <span className={`text-xs font-semibold ${source.status === 'Active' ? 'text-status-green' : 'text-status-orange'}`}>
                      {source.status}
                    </span>
                    <p className="text-[10px] text-text-muted">{source.count}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-xs h-8" onClick={() => navigate('/sources')}>
              Manage Sources
            </Button>
          </Card>

          {/* Pipeline Health bars */}
          <Card>
            <h2 className="text-sm font-bold text-text-primary mb-4">Pipeline Health</h2>
            <div className="space-y-4">
              {[
                { label: 'Normalization & Entity Extraction', pct: 98, color: 'bg-status-blue' },
                { label: 'Infrastructure Fingerprinting', pct: 92, color: 'bg-status-orange' },
                { label: 'Stylometric AI Processing', pct: 85, color: 'bg-accent-solid' },
                { label: 'Relationship Graph Indexing', pct: 100, color: 'bg-status-green' },
              ].map((sys) => (
                <div key={sys.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-text-secondary font-medium">{sys.label}</span>
                    <span className="text-text-primary font-mono">{sys.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-border-subtle rounded-full overflow-hidden">
                    <div className={`h-full ${sys.color} rounded-full`} style={{ width: `${sys.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
