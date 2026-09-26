import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Download, Eye, EyeOff, Key, Mail, MoreHorizontal, ShieldAlert,
  Database, Network, Server, Fingerprint, Activity, Clock,
  FileCheck, Brain, GitBranch, AlertTriangle, CheckCircle2
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ConfidencePill } from '../components/ui/Badges';
import { mockActors, mockEvidence, type ActorId } from '../mocks/data';

// ── Identifier icon map ──────────────────────────────────────────────────────
const identifierIcon = (type: string) => {
  if (type === 'pgp') return { Icon: Key, color: 'text-status-blue', bg: 'bg-status-blue/10' };
  if (type === 'wallet') return { Icon: Database, color: 'text-status-orange', bg: 'bg-status-orange/10' };
  if (type === 'onion') return { Icon: ShieldAlert, color: 'text-status-purple', bg: 'bg-status-purple/10' };
  return { Icon: Mail, color: 'text-status-red', bg: 'bg-status-red/10' };
};

const timelineIcon = (type: string) => {
  const map: Record<string, { Icon: any; color: string; bg: string }> = {
    alert: { Icon: AlertTriangle, color: 'text-status-red', bg: 'bg-status-red/10' },
    pgp: { Icon: Key, color: 'text-status-blue', bg: 'bg-status-blue/10' },
    infra: { Icon: Server, color: 'text-status-purple', bg: 'bg-status-purple/10' },
    wallet: { Icon: Database, color: 'text-status-orange', bg: 'bg-status-orange/10' },
    ai: { Icon: Brain, color: 'text-accent-solid', bg: 'bg-accent-soft/20' },
    marketplace: { Icon: Activity, color: 'text-status-green', bg: 'bg-status-green/10' },
    trust: { Icon: GitBranch, color: 'text-status-teal', bg: 'bg-status-green/10' },
  };
  return map[type] ?? { Icon: Clock, color: 'text-text-muted', bg: 'bg-canvas-dark' };
};

// ── Evidence detail modal ────────────────────────────────────────────────────
const EvidenceModal = ({ item, onClose }: { item: any; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
    <div className="bg-card border border-border-subtle rounded-xl w-full max-w-2xl shadow-2xl">
      <div className="flex items-center justify-between p-5 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <FileCheck className="w-5 h-5 text-accent-solid" />
          <h2 className="font-bold text-text-primary">{item.type} — Evidence Detail</h2>
          <ConfidencePill level={item.confidence} />
        </div>
        <button onClick={onClose} className="text-text-muted hover:text-text-primary">✕</button>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><span className="text-text-muted text-xs">Source</span><p className="text-text-primary font-medium mt-1">{item.source}</p></div>
          <div><span className="text-text-muted text-xs">Date</span><p className="text-text-primary font-medium mt-1">{item.date}</p></div>
          <div><span className="text-text-muted text-xs">Actor</span><p className="text-text-primary font-medium mt-1">{item.actor}</p></div>
        </div>
        <div>
          <span className="text-text-muted text-xs uppercase tracking-wider">Description</span>
          <p className="text-text-secondary mt-1">{item.description}</p>
        </div>
        <div>
          <span className="text-text-muted text-xs uppercase tracking-wider">Raw Artifact</span>
          <pre className="mt-2 p-4 bg-canvas-dark border border-border-subtle rounded-lg text-xs text-status-green font-mono whitespace-pre-wrap overflow-x-auto">{item.raw}</pre>
        </div>
      </div>
      <div className="p-4 border-t border-border-subtle flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button onClick={() => { const b = new Blob([item.raw], {type:'text/plain'}); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href=u; a.download=`evidence_${item.id}.txt`; a.click(); }}>
          <Download className="w-4 h-4 mr-2" /> Download
        </Button>
      </div>
    </div>
  </div>
);

// ── Confidence Ring ──────────────────────────────────────────────────────────
const ConfidenceRing = ({ pct, label }: { pct: number; label: string }) => {
  const r = 56, circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(27,35,49,1)" strokeWidth="8" />
          <circle cx="64" cy="64" r={r} fill="none" stroke="url(#grad)" strokeWidth="8"
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease' }} />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6D5EF5" />
              <stop offset="100%" stopColor="#2DD4BF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="text-2xl font-bold text-text-primary z-10">{pct}%</div>
      </div>
      <p className="text-sm text-text-muted mt-2">{label}</p>
    </div>
  );
};

// ── Main Component ───────────────────────────────────────────────────────────
const ActorProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [currentActorKey, setCurrentActorKey] = useState<ActorId>('DarkVendorX');
  const [isWatching, setIsWatching] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<any>(null);

  const actor = mockActors[currentActorKey];
  const actorEvidence = mockEvidence.filter(e => e.actor === currentActorKey);

  const handleActorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const k = e.target.value as ActorId;
    setCurrentActorKey(k);
    setIsWatching(mockActors[k].isWatching);
    setActiveTab('Overview');
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(actor, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${actor.id}_profile.json`; a.click();
  };

  const tabs = [
    { name: 'Overview', count: null },
    { name: 'Relationships', count: actor.relationships.length },
    { name: 'Timeline', count: actor.timeline.length },
    { name: 'Evidence', count: actorEvidence.length },
    { name: 'Infrastructure', count: actor.infrastructure.length },
    { name: 'AI Analysis', count: null },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Actor switcher */}
      <div className="flex items-center space-x-3">
        <span className="text-sm text-text-secondary font-medium">Investigation Subject:</span>
        <select
          value={currentActorKey}
          onChange={handleActorChange}
          className="bg-card border border-border-subtle text-text-primary text-sm rounded-lg focus:ring-accent-border focus:border-accent-border p-2"
        >
          {Object.keys(mockActors).map(k => (
            <option key={k} value={k}>{mockActors[k as ActorId].name}</option>
          ))}
        </select>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${actor.status === 'Active' ? 'bg-status-green/10 text-status-green' : 'bg-border-subtle text-text-muted'}`}>
          {actor.status}
        </span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-status-red/10 border-2 border-status-red/30 flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-status-red" />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-text-primary">{actor.name}</h1>
              <ConfidencePill level={actor.confidence > 80 ? 'High' : 'Moderate'} />
            </div>
            <p className="text-text-secondary mt-1">{actor.category} · Active since {actor.since}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={isWatching ? 'primary' : 'secondary'}
            className="px-3 text-xs"
            onClick={() => setIsWatching(!isWatching)}
          >
            {isWatching ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {isWatching ? 'Unwatch' : 'Watch'}
          </Button>
          <Button variant="secondary" className="px-3 text-xs" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" /> Export JSON
          </Button>
          <Button variant="ghost"><MoreHorizontal className="w-5 h-5" /></Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border-subtle flex space-x-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`pb-3 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === tab.name
                ? 'text-accent-link border-b-2 border-accent-link'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.name}
            {tab.count !== null && (
              <span className="ml-2 text-[10px] bg-border-subtle px-2 py-0.5 rounded-full">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Info */}
          <Card>
            <h2 className="text-sm font-semibold text-text-primary mb-4">Core Identity</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Primary Handle', val: actor.name },
                  { label: 'Category', val: actor.category },
                  { label: 'First Observed', val: actor.since },
                  { label: 'Last Observed', val: actor.lastSeen },
                ].map(f => (
                  <div key={f.label}>
                    <p className="text-xs text-text-muted">{f.label}</p>
                    <p className="text-sm text-text-primary mt-1 font-medium">{f.val}</p>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-border-subtle">
                <p className="text-xs text-text-muted mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${actor.status === 'Active' ? 'bg-status-green animate-pulse' : 'bg-text-muted'}`} />
                  <span className="text-sm text-text-primary font-medium">{actor.status}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {actor.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-canvas-dark border border-border-subtle text-text-secondary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Identifiers */}
          <Card>
            <h2 className="text-sm font-semibold text-text-primary mb-4">Known Identifiers</h2>
            <div className="space-y-2.5">
              {actor.identifiers.map((id, i) => {
                const { Icon, color, bg } = identifierIcon(id.type);
                return (
                  <div key={i} className="flex items-center gap-3 p-2.5 bg-canvas-dark border border-border-subtle rounded-lg">
                    <div className={`p-1.5 rounded-lg ${bg}`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-text-muted">{id.label}</p>
                      <p className="text-sm font-mono text-text-primary truncate">{id.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Confidence */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-text-primary">Attribution Confidence</h2>
              <ConfidencePill level={actor.confidence > 80 ? 'High' : 'Moderate'} />
            </div>
            <div className="flex justify-center mb-6">
              <ConfidenceRing pct={actor.confidence} label="Overall Confidence" />
            </div>
            <div className="space-y-3">
              {actor.confidenceFactors.map((f, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-text-secondary flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: f.color }} />
                      {f.label}
                    </span>
                    <span className="text-text-primary font-mono">{f.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-border-subtle rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${f.pct}%`, background: f.color, transition: 'width 1s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ── RELATIONSHIPS ── */}
      {activeTab === 'Relationships' && (
        <Card>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-text-primary">Relationship Graph — 1-Hop View</h2>
              <p className="text-xs text-text-muted mt-1">All direct connections from {actor.name}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => navigate('/relationships')}>
              Open Interactive Graph
            </Button>
          </div>
          <div className="space-y-2.5">
            {actor.relationships.map((rel, i) => {
              const typeColors: Record<string, string> = {
                actor: 'text-status-red bg-status-red/10',
                infra: 'text-status-purple bg-status-purple/10',
                identifier: 'text-status-blue bg-status-blue/10',
                source: 'text-status-green bg-status-green/10',
              };
              return (
                <div key={i} className="flex items-center justify-between p-3.5 bg-canvas-dark border border-border-subtle rounded-xl hover:border-accent-border/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <Network className="w-4 h-4 text-accent-solid flex-shrink-0" />
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${typeColors[rel.type] ?? 'text-text-muted bg-border-subtle'}`}>
                      {rel.type}
                    </span>
                    <span className="text-sm font-semibold text-text-primary">{rel.entity}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-text-muted italic">{rel.edge}</span>
                    <ConfidencePill level={rel.confidence} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* ── TIMELINE ── */}
      {activeTab === 'Timeline' && (
        <Card>
          <h2 className="text-base font-bold text-text-primary mb-6">Activity Timeline</h2>
          <div className="relative border-l border-border-subtle ml-4 space-y-6 pb-4">
            {actor.timeline.map((ev, i) => {
              const { Icon, color, bg } = timelineIcon(ev.type);
              return (
                <div key={i} className="relative pl-8">
                  <div className={`absolute -left-[18px] top-1 w-8 h-8 rounded-full ${bg} border border-white/5 flex items-center justify-center`}>
                    <Icon className={`w-3.5 h-3.5 ${color}`} />
                  </div>
                  <div className="bg-canvas-dark border border-border-subtle p-4 rounded-xl hover:border-accent-border/30 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-text-muted font-mono">{ev.date}</span>
                      <span className="text-xs text-text-muted bg-card px-2 py-0.5 rounded border border-border-subtle">{ev.source}</span>
                    </div>
                    <p className="text-sm font-semibold text-text-primary">{ev.event}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* ── EVIDENCE ── */}
      {activeTab === 'Evidence' && (
        <div className="space-y-4">
          {actorEvidence.length === 0 ? (
            <Card className="text-center py-12 text-text-muted">No evidence records for {actor.name}</Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {actorEvidence.map((ev) => {
                const typeStyle: Record<string, { color: string; bg: string }> = {
                  'PGP Key': { color: 'text-status-blue', bg: 'bg-status-blue/10' },
                  'Certificate': { color: 'text-status-purple', bg: 'bg-status-purple/10' },
                  'Transaction': { color: 'text-status-orange', bg: 'bg-status-orange/10' },
                  'Text Sample': { color: 'text-accent-link', bg: 'bg-accent-soft/20' },
                  'Screenshot': { color: 'text-status-green', bg: 'bg-status-green/10' },
                };
                const ts = typeStyle[ev.type] ?? { color: 'text-text-muted', bg: 'bg-border-subtle' };
                return (
                  <div key={ev.id} className="p-4 bg-canvas-dark border border-border-subtle rounded-xl hover:border-accent-border/40 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ts.color} ${ts.bg}`}>{ev.type}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-muted">{ev.date}</span>
                        <ConfidencePill level={ev.confidence} />
                      </div>
                    </div>
                    <p className="text-sm text-text-primary font-medium mb-1">{ev.description}</p>
                    <p className="text-xs text-text-muted mb-3">Source: {ev.source}</p>
                    <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => setSelectedEvidence(ev)}>
                      <Eye className="w-3.5 h-3.5 mr-2" /> View Raw Artifact
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── INFRASTRUCTURE ── */}
      {activeTab === 'Infrastructure' && (
        <Card>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-text-primary">Infrastructure Indicators</h2>
            <Button variant="secondary" size="sm" onClick={() => navigate('/infrastructure')}>
              Deep Analysis
            </Button>
          </div>
          {actor.infrastructure.length === 0 ? (
            <div className="text-center py-12 text-text-muted">No infrastructure indicators for {actor.name}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border-subtle text-xs text-text-muted uppercase">
                    <th className="px-4 py-3">Domain</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Clearnet Correlation</th>
                    <th className="px-4 py-3">Cert Hash</th>
                    <th className="px-4 py-3">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {actor.infrastructure.map((infra, i) => (
                    <tr key={i} className="hover:bg-card-hover transition-colors">
                      <td className="px-4 py-3 font-mono text-accent-link">{infra.domain}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${infra.status === 'Active' ? 'text-status-green bg-status-green/10' : 'text-text-muted bg-border-subtle'}`}>
                          {infra.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-text-secondary">{infra.clearnet}</td>
                      <td className="px-4 py-3 font-mono text-xs text-text-muted">{infra.cert}</td>
                      <td className="px-4 py-3"><ConfidencePill level={infra.correlation as any} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {/* ── AI ANALYSIS ── */}
      {activeTab === 'AI Analysis' && (
        <div className="space-y-6">
          {/* Score overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="border-accent-border/30">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1" style={{ background: 'linear-gradient(90deg, #6D5EF5, #2DD4BF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {actor.aiAnalysis.stylometryScore}%
                </div>
                <p className="text-sm text-text-secondary">Stylometric Similarity</p>
                <p className="text-xs text-text-muted mt-1">vs. {actor.aiAnalysis.matchedPersona}</p>
              </div>
            </Card>
            <Card>
              <h3 className="text-xs font-semibold text-text-muted uppercase mb-3">Matched Persona</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-status-red/10 border border-status-red/30 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-status-red" />
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">{actor.aiAnalysis.matchedPersona}</p>
                  <p className="text-xs text-text-muted">Probable same actor</p>
                </div>
              </div>
            </Card>
            <Card>
              <h3 className="text-xs font-semibold text-text-muted uppercase mb-3">Model Confidence</h3>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-status-green" />
                <div>
                  <ConfidencePill level={actor.aiAnalysis.stylometryScore > 80 ? 'High' : 'Moderate'} />
                  <p className="text-xs text-text-muted mt-1">AI evidence grade</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Key features */}
          <Card>
            <h2 className="text-sm font-bold text-text-primary mb-4">Stylometric Features Identified</h2>
            <div className="space-y-2.5">
              {actor.aiAnalysis.keyFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-canvas-dark border border-border-subtle rounded-lg">
                  <Fingerprint className="w-4 h-4 text-accent-solid flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-text-secondary">{f}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity heatmap */}
          <Card>
            <h2 className="text-sm font-bold text-text-primary mb-4">24h Activity Heatmap (UTC)</h2>
            <div className="flex items-end gap-1 h-16">
              {actor.aiAnalysis.activityHeatmap.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-sm transition-all"
                    style={{
                      height: `${Math.max(8, v * 20)}px`,
                      background: v > 3 ? '#6D5EF5' : v > 1 ? '#3A3FA8' : '#1B2331',
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-text-muted mt-2">
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span>
            </div>
            <p className="text-xs text-text-muted mt-2">Peak activity: 18:00–22:00 UTC (UTC+3 inference: evening local time)</p>
          </Card>
        </div>
      )}

      {/* Evidence modal */}
      {selectedEvidence && <EvidenceModal item={selectedEvidence} onClose={() => setSelectedEvidence(null)} />}
    </div>
  );
};

export default ActorProfile;
