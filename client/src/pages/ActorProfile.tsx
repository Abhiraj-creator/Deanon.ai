import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Download, Eye, EyeOff, Key, Mail, ShieldAlert,
  Database, Network, Server, Fingerprint, Activity, Clock,
  FileCheck, Brain, GitBranch, AlertTriangle, CheckCircle2
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ConfidencePill } from '../components/ui/Badges';
import { ConfidenceRing } from '../components/visual/ConfidenceRing';
import { mockActors, mockEvidence, type ActorId } from '../mocks/data';

// ── Identifier icon map ──────────────────────────────────────────────────────
const identifierIcon = (type: string) => {
  if (type === 'pgp') return { Icon: Key, color: 'text-status-blue' };
  if (type === 'wallet') return { Icon: Database, color: 'text-status-orange' };
  if (type === 'onion') return { Icon: ShieldAlert, color: 'text-status-purple' };
  return { Icon: Mail, color: 'text-status-red' };
};

const timelineIcon = (type: string) => {
  const map: Record<string, { Icon: any; color: string }> = {
    alert: { Icon: AlertTriangle, color: 'text-status-red' },
    pgp: { Icon: Key, color: 'text-status-blue' },
    infra: { Icon: Server, color: 'text-status-purple' },
    wallet: { Icon: Database, color: 'text-status-orange' },
    ai: { Icon: Brain, color: 'text-accent-solid' },
    marketplace: { Icon: Activity, color: 'text-status-green' },
    trust: { Icon: GitBranch, color: 'text-status-teal' },
  };
  return map[type] ?? { Icon: Clock, color: 'text-text-muted' };
};

// ── Evidence detail modal ────────────────────────────────────────────────────
const EvidenceModal = ({ item, onClose }: { item: any; onClose: () => void }) => (
  <div className="fixed inset-0 bg-canvas/80 backdrop-blur-md flex items-center justify-center z-50 p-4 font-mono">
    <div className="bg-surface border border-border-subtle rounded-[6px] w-full max-w-2xl shadow-2xl">
      <div className="flex items-center justify-between p-5 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <FileCheck className="w-5 h-5 text-accent-solid" strokeWidth={1.5} />
          <h2 className="font-semibold text-text-primary text-sm uppercase tracking-wider">{item.type} — Evidence Detail</h2>
          <ConfidencePill level={item.confidence} />
        </div>
        <button onClick={onClose} className="text-text-muted hover:text-text-primary text-sm">✕</button>
      </div>
      <div className="p-5 space-y-4 text-xs">
        <div className="grid grid-cols-3 gap-4">
          <div><span className="text-text-muted text-[10px] uppercase">Source</span><p className="text-text-primary font-semibold mt-1">{item.source}</p></div>
          <div><span className="text-text-muted text-[10px] uppercase">Date</span><p className="text-text-primary font-semibold mt-1">{item.date}</p></div>
          <div><span className="text-text-muted text-[10px] uppercase">Actor</span><p className="text-text-primary font-semibold mt-1">{item.actor}</p></div>
        </div>
        <div>
          <span className="text-text-muted text-[10px] uppercase">Description</span>
          <p className="text-text-secondary mt-1 font-sans leading-relaxed">{item.description}</p>
        </div>
        <div>
          <span className="text-text-muted text-[10px] uppercase">Raw Artifact</span>
          <pre className="mt-2 p-4 bg-canvas-deep border border-border-subtle rounded-[4px] text-xs text-accent-solid whitespace-pre-wrap overflow-x-auto">{item.raw}</pre>
        </div>
      </div>
      <div className="p-4 border-t border-border-subtle flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose} className="text-xs uppercase font-mono">Close</Button>
        <Button onClick={() => { const b = new Blob([item.raw], {type:'text/plain'}); const u = URL.createObjectURL(b); const a = document.createElement('a'); a.href=u; a.download=`evidence_${item.id}.txt`; a.click(); }} className="text-xs uppercase font-mono">
          <Download className="w-3.5 h-3.5 mr-2" strokeWidth={1.5} /> Download
        </Button>
      </div>
    </div>
  </div>
);

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
    <div className="space-y-8 animate-fade-in font-sans">
      {/* Subject Selector & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-text-muted uppercase tracking-wider">Subject:</span>
          <select
            value={currentActorKey}
            onChange={handleActorChange}
            className="bg-canvas-deep border border-border-subtle text-text-primary text-xs rounded-[4px] px-3 py-1.5 focus:outline-none focus:border-accent-border font-mono"
          >
            {Object.keys(mockActors).map(k => (
              <option key={k} value={k}>{mockActors[k as ActorId].name}</option>
            ))}
          </select>
          <span className={`text-[10px] px-2 py-0.5 rounded-[3px] font-mono uppercase tracking-wider ${
            actor.status === 'Active' ? 'bg-accent-soft text-accent-solid border border-accent-border/40' : 'bg-surface text-text-muted border border-border-subtle'
          }`}>
            {actor.status}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isWatching ? 'primary' : 'secondary'}
            className="h-8 text-xs font-mono uppercase tracking-wider"
            onClick={() => setIsWatching(!isWatching)}
          >
            {isWatching ? <EyeOff className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} /> : <Eye className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />}
            {isWatching ? 'Unwatch' : 'Watch'}
          </Button>
          <Button variant="secondary" className="h-8 text-xs font-mono uppercase tracking-wider" onClick={handleExport}>
            <Download className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} /> Export JSON
          </Button>
        </div>
      </div>

      {/* Editorial Case File Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-border-subtle pb-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          <p className="text-[10px] font-mono tracking-[0.25em] text-text-muted uppercase">
            // 02 ACTORS — CASE FILE #{actor.id.toUpperCase()}
          </p>
          <div className="flex items-baseline gap-4">
            <h1 className="editorial-hero text-text-primary">
              {actor.name}
            </h1>
            <ConfidencePill level={actor.confidence > 80 ? 'High' : 'Moderate'} />
          </div>
          <p className="text-xs font-mono text-text-muted tracking-wider uppercase">{actor.category}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 font-mono">
            {[
              { label: 'PRIMARY HANDLE', val: actor.name },
              { label: 'CATEGORY', val: actor.category },
              { label: 'FIRST OBSERVED', val: actor.since },
              { label: 'LAST OBSERVED', val: actor.lastSeen },
            ].map((m, i) => (
              <div key={i} className="border-l border-border-subtle pl-3">
                <p className="text-[9px] text-text-muted uppercase tracking-widest mb-1">{m.label}</p>
                <p className="text-xs text-text-primary font-semibold">{m.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Confidence Ring Right */}
        <div className="lg:col-span-4 flex justify-start lg:justify-end">
          <ConfidenceRing confidence={actor.confidence} />
        </div>
      </div>

      {/* Horizontal Editorial Tabs */}
      <div className="border-b border-border-subtle">
        <div className="flex items-center gap-1 overflow-x-auto font-mono text-xs uppercase tracking-wider">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`relative px-4 py-3 transition-colors ${
                activeTab === tab.name
                  ? 'text-text-primary font-semibold'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              <span>{tab.name}</span>
              {tab.count !== null && (
                <span className="ml-2 text-[10px] opacity-60">({tab.count})</span>
              )}
              {/* Green active underline */}
              <span
                className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ${
                  activeTab === tab.name ? 'bg-accent-solid' : 'bg-transparent'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB CONTENT ── */}

      {/* OVERVIEW */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-4 bg-surface border border-border-subtle p-6 rounded-[6px]">
            <p className="text-[10px] font-mono tracking-[0.2em] text-text-muted uppercase">// CORE IDENTITY</p>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-border-subtle/50">
                <span className="text-text-muted">Primary Handle</span>
                <span className="text-text-primary font-semibold">{actor.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border-subtle/50">
                <span className="text-text-muted">Category</span>
                <span className="text-text-primary">{actor.category}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border-subtle/50">
                <span className="text-text-muted">First Observed</span>
                <span className="text-text-primary">{actor.since}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border-subtle/50">
                <span className="text-text-muted">Last Active</span>
                <span className="text-text-primary">{actor.lastSeen}</span>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-2">TAGS</p>
              <div className="flex flex-wrap gap-2">
                {actor.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 text-[9px] font-mono bg-canvas-deep border border-border-subtle text-accent-solid uppercase">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 bg-surface border border-border-subtle p-6 rounded-[6px]">
            <p className="text-[10px] font-mono tracking-[0.2em] text-text-muted uppercase">// KNOWN IDENTIFIERS</p>
            <div className="space-y-2 font-mono text-xs">
              {actor.identifiers.map((id, i) => {
                const { Icon, color } = identifierIcon(id.type);
                return (
                  <div key={i} className="flex items-center gap-3 p-3 bg-canvas-deep border border-border-subtle rounded-[4px]">
                    <Icon className={`w-4 h-4 ${color} shrink-0`} strokeWidth={1.5} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] text-text-muted uppercase tracking-wider">{id.label}</p>
                      <p className="text-xs text-text-primary truncate font-semibold mt-0.5">{id.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 bg-surface border border-border-subtle p-6 rounded-[6px]">
            <p className="text-[10px] font-mono tracking-[0.2em] text-text-muted uppercase">// ATTRIBUTION FACTORS</p>
            <div className="space-y-3 font-mono text-xs">
              {actor.confidenceFactors.map((f, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-text-muted uppercase tracking-wider">{f.label}</span>
                    <span className="text-text-primary font-semibold">{f.pct}%</span>
                  </div>
                  <div className="h-px bg-border-subtle">
                    <div className="h-px bg-accent-solid" style={{ width: `${f.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RELATIONSHIPS */}
      {activeTab === 'Relationships' && (
        <div className="space-y-6 bg-surface border border-border-subtle p-6 rounded-[6px]">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <div>
              <p className="text-[10px] font-mono tracking-[0.25em] text-text-muted uppercase">// 1-HOP RELATIONSHIP LINKS</p>
              <p className="text-xs text-text-muted mt-1 font-mono">Direct connections from {actor.name}</p>
            </div>
            <Button variant="secondary" className="h-7 text-[10px] font-mono uppercase" onClick={() => navigate('/relationships')}>
              Open Graph →
            </Button>
          </div>
          <div className="divide-y divide-border-subtle">
            {actor.relationships.map((rel, i) => (
              <div key={i} className="scan-row-hover py-3.5 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-3">
                  <Network className="w-4 h-4 text-accent-solid shrink-0" strokeWidth={1.5} />
                  <span className="text-[9px] px-2 py-0.5 bg-canvas-deep border border-border-subtle text-text-muted uppercase">{rel.type}</span>
                  <span className="text-text-primary font-semibold">{rel.entity}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-text-muted text-[10px]">{rel.edge}</span>
                  <ConfidencePill level={rel.confidence} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TIMELINE */}
      {activeTab === 'Timeline' && (
        <div className="space-y-6 bg-surface border border-border-subtle p-6 rounded-[6px]">
          <p className="text-[10px] font-mono tracking-[0.25em] text-text-muted uppercase">// ACTIVITY TIMELINE</p>
          <div className="space-y-4 font-mono text-xs">
            {actor.timeline.map((ev, i) => {
              const { Icon, color } = timelineIcon(ev.type);
              return (
                <div key={i} className="scan-row-hover flex items-start gap-4 p-4 border border-border-subtle bg-canvas-deep rounded-[4px]">
                  <Icon className={`w-4 h-4 ${color} shrink-0 mt-0.5`} strokeWidth={1.5} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-[10px] text-text-muted">{ev.date} — {ev.source}</span>
                    </div>
                    <p className="text-xs font-semibold text-text-primary">{ev.event}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* EVIDENCE */}
      {activeTab === 'Evidence' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {actorEvidence.map((ev) => (
            <div key={ev.id} className="bg-surface border border-border-subtle p-5 rounded-[6px] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 bg-accent-soft text-accent-solid border border-accent-border/40 uppercase">{ev.type}</span>
                <ConfidencePill level={ev.confidence} />
              </div>
              <p className="text-text-primary font-sans text-xs leading-relaxed">{ev.description}</p>
              <p className="text-[10px] text-text-muted">Source: {ev.source} | Date: {ev.date}</p>
              <Button variant="ghost" className="w-full h-8 text-[10px] font-mono uppercase tracking-wider" onClick={() => setSelectedEvidence(ev)}>
                View Raw Artifact →
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* INFRASTRUCTURE */}
      {activeTab === 'Infrastructure' && (
        <div className="bg-surface border border-border-subtle p-6 rounded-[6px] space-y-4">
          <p className="text-[10px] font-mono tracking-[0.25em] text-text-muted uppercase">// INFRASTRUCTURE INDICATORS</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-border-subtle text-[10px] text-text-muted uppercase tracking-widest">
                  <th className="py-3 px-4">Domain</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Clearnet Correlation</th>
                  <th className="py-3 px-4">Cert Hash</th>
                  <th className="py-3 px-4">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/50">
                {actor.infrastructure.map((infra, i) => (
                  <tr key={i} className="hover:bg-card-hover/40">
                    <td className="py-3 px-4 text-accent-solid font-semibold">{infra.domain}</td>
                    <td className="py-3 px-4">
                      <span className={`text-[9px] uppercase px-2 py-0.5 rounded-[3px] ${infra.status === 'Active' ? 'bg-status-green-bg text-status-green' : 'bg-surface text-text-muted'}`}>
                        {infra.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-text-secondary">{infra.clearnet}</td>
                    <td className="py-3 px-4 text-text-muted">{infra.cert}</td>
                    <td className="py-3 px-4"><ConfidencePill level={infra.correlation as any} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI ANALYSIS */}
      {activeTab === 'AI Analysis' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
            <div className="bg-surface border border-border-subtle p-6 rounded-[6px] text-center">
              <p className="text-4xl font-bold text-accent-solid mb-1">{actor.aiAnalysis.stylometryScore}%</p>
              <p className="text-xs text-text-muted uppercase tracking-wider">Stylometric Similarity</p>
            </div>
            <div className="bg-surface border border-border-subtle p-6 rounded-[6px]">
              <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2">Matched Persona</p>
              <p className="text-base font-bold text-text-primary">{actor.aiAnalysis.matchedPersona}</p>
            </div>
            <div className="bg-surface border border-border-subtle p-6 rounded-[6px]">
              <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2">Model Confidence</p>
              <ConfidencePill level={actor.aiAnalysis.stylometryScore > 80 ? 'High' : 'Moderate'} />
            </div>
          </div>
          <div className="bg-surface border border-border-subtle p-6 rounded-[6px] space-y-4">
            <p className="text-[10px] font-mono tracking-[0.25em] text-text-muted uppercase">// STYLOMETRIC FEATURES IDENTIFIED</p>
            <div className="space-y-2 font-mono text-xs">
              {actor.aiAnalysis.keyFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-canvas-deep border border-border-subtle rounded-[4px]">
                  <Fingerprint className="w-4 h-4 text-accent-solid shrink-0" strokeWidth={1.5} />
                  <span className="text-text-secondary">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Evidence Modal */}
      {selectedEvidence && <EvidenceModal item={selectedEvidence} onClose={() => setSelectedEvidence(null)} />}
    </div>
  );
};

export default ActorProfile;
