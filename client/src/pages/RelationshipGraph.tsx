import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, ChevronDown, Plus, Minus, Maximize, ShieldAlert,
  Key, Server, Database, Users, Network, X, FileCheck, ArrowRight
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ConfidencePill } from '../components/ui/Badges';

// ── Mock Graph Data ──────────────────────────────────────────────────────────
const ALL_NODES = {
  darkvendorx:  { id: 'darkvendorx',  label: 'DarkVendorX',     type: 'actor',      x: '50%', y: '50%', icon: ShieldAlert, color: 'text-status-red',    bg: 'bg-status-red/10',    border: 'border-status-red',    data: { Role: 'Initial Access Broker', 'First Seen': '2022-03-14' }, actorKey: 'DarkVendorX' },
  onion_node:   { id: 'onion_node',   label: 'darkvx...onion',  type: 'infra',      x: '35%', y: '25%', icon: Server,       color: 'text-status-purple', bg: 'bg-status-purple/10', border: 'border-status-purple', data: { Type: 'Tor Hidden Service', Status: 'Offline' } },
  wallet_node:  { id: 'wallet_node',  label: 'bc1qn...k9',      type: 'identifier', x: '65%', y: '20%', icon: Key,          color: 'text-status-blue',   bg: 'bg-status-blue/10',   border: 'border-status-blue',   data: { Type: 'Bitcoin Address', Balance: '12.4 BTC' } },
  actor_2:      { id: 'actor_2',      label: 'SilentCrow',      type: 'actor',      x: '80%', y: '50%', icon: Users,        color: 'text-status-red',    bg: 'bg-status-red/10',    border: 'border-status-red',    data: { Role: 'Forum Member', 'First Seen': '2026-09-21' }, actorKey: 'SilentCrow' },
  pgp_node:     { id: 'pgp_node',     label: '0xA3F9D2C',       type: 'identifier', x: '70%', y: '75%', icon: Key,          color: 'text-status-blue',   bg: 'bg-status-blue/10',   border: 'border-status-blue',   data: { Type: 'PGP Public Key', Email: 'dvx@secmail.pro' } },
  source_1:     { id: 'source_1',     label: 'XMarket',         type: 'source',     x: '50%', y: '85%', icon: Database,     color: 'text-status-green',  bg: 'bg-status-green/10',  border: 'border-status-green',  data: { Type: 'Marketplace', Status: 'Active' } },
  source_2:     { id: 'source_2',     label: 'DarkForum',       type: 'source',     x: '30%', y: '75%', icon: Database,     color: 'text-status-green',  bg: 'bg-status-green/10',  border: 'border-status-green',  data: { Type: 'Forum', Status: 'Active' } },
  actor_3:      { id: 'actor_3',      label: 'AlphaBay_Seller', type: 'actor',      x: '20%', y: '50%', icon: Users,        color: 'text-status-red',    bg: 'bg-status-red/10',    border: 'border-status-red',    data: { Role: 'Marketplace Vendor', Status: 'Retired' }, actorKey: 'AlphaBay_Seller' },
};
type NodeId = keyof typeof ALL_NODES;

const EDGES = [
  { from: 'darkvendorx', to: 'onion_node',  label: 'operates',   confidence: 'High' as const },
  { from: 'darkvendorx', to: 'wallet_node', label: 'wallet used', confidence: 'High' as const },
  { from: 'darkvendorx', to: 'actor_2',     label: 'PGP reuse',  confidence: 'High' as const },
  { from: 'darkvendorx', to: 'pgp_node',    label: 'signed with', confidence: 'High' as const },
  { from: 'darkvendorx', to: 'source_1',    label: 'observed on', confidence: 'High' as const },
  { from: 'darkvendorx', to: 'source_2',    label: 'observed on', confidence: 'Moderate' as const },
  { from: 'darkvendorx', to: 'actor_3',     label: 'stylometric match', confidence: 'Moderate' as const },
  { from: 'actor_2',     to: 'pgp_node',    label: 'same key',   confidence: 'High' as const },
  { from: 'actor_3',     to: 'source_1',    label: 'observed on', confidence: 'High' as const },
  { from: 'onion_node',  to: 'source_2',    label: 'scraped by', confidence: 'Moderate' as const },
  { from: 'pgp_node',    to: 'source_2',    label: 'found on',   confidence: 'High' as const },
  { from: 'wallet_node', to: 'source_1',    label: 'traced on',  confidence: 'Moderate' as const },
];

const NODE_EVIDENCE: Record<string, { id: string; desc: string; date: string }[]> = {
  darkvendorx:  [{ id: 'EV-8921', desc: 'SSL Certificate reuse', date: '2026-09-24' }, { id: 'EV-4412', desc: 'Forum post text sample', date: '2026-09-20' }],
  actor_2:      [{ id: 'EV-6001', desc: 'PGP key 0xA3F9D2C on SilentCrow', date: '2026-09-23' }],
  pgp_node:     [{ id: 'EV-3021', desc: 'PGP Public Key Block', date: '2025-11-05' }, { id: 'EV-6001', desc: 'Key reuse across 2 actors', date: '2026-09-23' }],
  wallet_node:  [{ id: 'EV-4000', desc: 'BTC transaction trace', date: '2026-09-18' }],
  onion_node:   [{ id: 'EV-8921', desc: 'SSL cert → 198.51.100.23', date: '2026-09-24' }],
};

type TypeFilter = 'All' | 'actor' | 'identifier' | 'infra' | 'source';
const TYPE_LABELS: Record<TypeFilter, string> = { All: 'All Types', actor: 'Actors', identifier: 'Identifiers', infra: 'Infrastructure', source: 'Sources' };

const RelationshipGraph = () => {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState<NodeId | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('All');
  const [confFilter, setConfFilter] = useState<'All' | 'High' | 'Moderate'>('All');
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showConfMenu, setShowConfMenu] = useState(false);
  const [zoom, setZoom] = useState(1);

  const visibleNodes = useMemo(() => {
    return Object.values(ALL_NODES).filter(n => {
      const matchSearch = searchQuery === '' || n.label.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = typeFilter === 'All' || n.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [searchQuery, typeFilter]);

  const visibleNodeIds = new Set(visibleNodes.map(n => n.id));

  const visibleEdges = EDGES.filter(e =>
    visibleNodeIds.has(e.from) && visibleNodeIds.has(e.to) &&
    (confFilter === 'All' || e.confidence === confFilter)
  );

  const node = selectedNode ? ALL_NODES[selectedNode] : null;
  const nodeEdges = EDGES.filter(e => e.from === selectedNode || e.to === selectedNode);
  const nodeEvidence = selectedNode ? (NODE_EVIDENCE[selectedNode] ?? []) : [];

  return (
    <div className="space-y-4 h-[calc(100vh-120px)] flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-text-primary font-bold">Relationship Graph</h1>
          <p className="text-text-secondary mt-1">Visualize connections between actors, identifiers, and infrastructure.</p>
        </div>
        <span className="text-xs text-text-muted bg-card border border-border-subtle px-3 py-1.5 rounded-full">
          {visibleNodes.length} nodes · {visibleEdges.length} edges
        </span>
      </div>

      {/* Toolbar */}
      <div className="flex gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-border-subtle rounded-lg bg-input text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-border sm:text-sm"
            placeholder="Search node..."
          />
        </div>

        {/* Type filter */}
        <div className="relative">
          <button
            onClick={() => { setShowTypeMenu(v => !v); setShowConfMenu(false); }}
            className="flex items-center gap-2 bg-card border border-border-subtle px-3 py-2 rounded-lg text-sm text-text-primary hover:bg-card-hover transition-colors"
          >
            <span>{TYPE_LABELS[typeFilter]}</span>
            <ChevronDown className="w-4 h-4 text-text-muted" />
          </button>
          {showTypeMenu && (
            <div className="absolute top-10 left-0 z-20 bg-card border border-border-subtle rounded-xl shadow-xl py-1 w-40">
              {(Object.keys(TYPE_LABELS) as TypeFilter[]).map(k => (
                <button key={k} onClick={() => { setTypeFilter(k); setShowTypeMenu(false); }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-card-hover ${typeFilter === k ? 'text-accent-link font-medium' : 'text-text-secondary'}`}>
                  {TYPE_LABELS[k]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Confidence filter */}
        <div className="relative">
          <button
            onClick={() => { setShowConfMenu(v => !v); setShowTypeMenu(false); }}
            className="flex items-center gap-2 bg-card border border-border-subtle px-3 py-2 rounded-lg text-sm text-text-primary hover:bg-card-hover transition-colors"
          >
            <span>Confidence: {confFilter}</span>
            <ChevronDown className="w-4 h-4 text-text-muted" />
          </button>
          {showConfMenu && (
            <div className="absolute top-10 left-0 z-20 bg-card border border-border-subtle rounded-xl shadow-xl py-1 w-44">
              {(['All', 'High', 'Moderate'] as const).map(k => (
                <button key={k} onClick={() => { setConfFilter(k); setShowConfMenu(false); }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-card-hover ${confFilter === k ? 'text-accent-link font-medium' : 'text-text-secondary'}`}>
                  {k}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Graph + Sidebar */}
      <div className="flex-1 flex gap-5 overflow-hidden min-h-0">
        {/* Canvas */}
        <Card className={`relative overflow-hidden bg-[#060D15] p-0 flex items-center justify-center transition-all duration-300 ${selectedNode ? 'flex-1' : 'w-full'}`}>
          <div style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s', width: '100%', height: '100%', position: 'relative' }}>
            {/* Edge SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {visibleEdges.map((edge, i) => {
                const from = ALL_NODES[edge.from as NodeId];
                const to = ALL_NODES[edge.to as NodeId];
                if (!from || !to) return null;
                const stroke = edge.confidence === 'High' ? 'rgba(109,94,245,0.5)' : 'rgba(100,116,139,0.3)';
                return (
                  <g key={i}>
                    <line
                      x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                      stroke={stroke} strokeWidth={edge.confidence === 'High' ? '1.5' : '1'}
                      strokeDasharray={edge.confidence === 'High' ? 'none' : '4 4'}
                    />
                    {/* Edge label (centered) */}
                    <text
                      x="50%" y="50%"
                      textAnchor="middle" fontSize="8" fill="rgba(148,160,184,0.6)" fontFamily="Inter, sans-serif"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Nodes */}
            {visibleNodes.map((n) => {
              const isCenter = n.id === 'darkvendorx';
              const isSelected = selectedNode === n.id;
              const isHighlighted = searchQuery && n.label.toLowerCase().includes(searchQuery.toLowerCase());
              const size = isCenter ? 'w-20 h-20' : 'w-14 h-14';
              const iconSize = isCenter ? 'w-10 h-10' : 'w-6 h-6';
              return (
                <div
                  key={n.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group"
                  style={{ top: n.y, left: n.x, zIndex: 10 }}
                  onClick={() => setSelectedNode(n.id === selectedNode ? null : n.id as NodeId)}
                >
                  <div className={`
                    ${size} rounded-full ${n.bg} border-2 ${n.border}
                    flex items-center justify-center transition-all duration-200
                    group-hover:scale-110
                    ${isSelected ? 'ring-4 ring-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]' : ''}
                    ${isCenter ? 'shadow-[0_0_30px_rgba(244,55,61,0.4)]' : ''}
                    ${isHighlighted && !isSelected ? 'ring-2 ring-accent-solid shadow-[0_0_20px_rgba(109,94,245,0.4)]' : ''}
                  `}>
                    <n.icon className={`${iconSize} ${n.color}`} />
                  </div>
                  <span className={`
                    mt-2 px-2 py-0.5 bg-card rounded border border-border-subtle text-xs font-bold text-white shadow
                    transition-opacity
                    ${isSelected || isCenter || isHighlighted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                  `}>{n.label}</span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur border border-border-subtle p-3 rounded-xl flex gap-4 shadow-lg pointer-events-none">
            {[
              { color: 'bg-status-red', label: 'Actor' },
              { color: 'bg-status-blue', label: 'Identifier' },
              { color: 'bg-status-purple', label: 'Infrastructure' },
              { color: 'bg-status-green', label: 'Source' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-text-secondary">
                <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />{l.label}
              </div>
            ))}
          </div>

          {/* Zoom controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            {[
              { icon: Plus, action: () => setZoom(z => Math.min(z + 0.15, 2)) },
              { icon: Minus, action: () => setZoom(z => Math.max(z - 0.15, 0.5)) },
              { icon: Maximize, action: () => setZoom(1) },
            ].map(({ icon: Icon, action }, i) => (
              <Button key={i} variant="ghost" className="bg-card border border-border-subtle shadow hover:bg-card-hover p-2" onClick={action}>
                <Icon className="w-4 h-4" />
              </Button>
            ))}
          </div>
        </Card>

        {/* Sidebar */}
        {node && (
          <Card className="w-80 min-w-[300px] overflow-y-auto animate-fade-in relative flex flex-col">
            {/* Close */}
            <Button variant="ghost" className="absolute top-3 right-3 p-1" onClick={() => setSelectedNode(null)}>
              <X className="w-4 h-4" />
            </Button>

            {/* Node header */}
            <div className="flex items-center gap-3 mb-5 pr-8">
              <div className={`p-3 rounded-xl ${node.bg} border ${node.border}`}>
                <node.icon className={`w-6 h-6 ${node.color}`} />
              </div>
              <div>
                <h2 className="text-base font-bold text-text-primary">{node.label}</h2>
                <p className="text-xs text-text-muted capitalize">{node.type} node</p>
              </div>
            </div>

            <div className="space-y-5 flex-1">
              {/* Entity properties */}
              <div>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Properties</h3>
                <div className="bg-canvas-dark border border-border-subtle rounded-xl p-3 space-y-2.5">
                  {Object.entries(node.data).map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <span className="text-text-muted">{k}</span>
                      <span className="text-text-primary font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Edges */}
              <div>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                  Connections ({nodeEdges.length})
                </h3>
                <div className="space-y-2">
                  {nodeEdges.map((e, i) => {
                    const other = e.from === selectedNode ? e.to : e.from;
                    const otherNode = ALL_NODES[other as NodeId];
                    return (
                      <div key={i} className="flex items-center justify-between p-2.5 bg-canvas-dark border border-border-subtle rounded-lg">
                        <div className="flex items-center gap-2 min-w-0">
                          <Network className="w-3.5 h-3.5 text-accent-solid flex-shrink-0" />
                          <div className="min-w-0">
                            <span className="text-[10px] text-text-muted block">{e.label}</span>
                            <span className="text-xs font-medium text-text-primary truncate block">{otherNode?.label}</span>
                          </div>
                        </div>
                        <ConfidencePill level={e.confidence} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Evidence */}
              {nodeEvidence.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Supporting Evidence</h3>
                  <div className="space-y-2">
                    {nodeEvidence.map(ev => (
                      <div key={ev.id}
                        className="p-2.5 bg-canvas-dark border border-border-subtle rounded-lg hover:border-accent-border/50 cursor-pointer transition-colors"
                        onClick={() => navigate('/evidence')}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <FileCheck className="w-3.5 h-3.5 text-accent-solid" />
                            <span className="text-xs font-bold font-mono text-text-primary">{ev.id}</span>
                          </div>
                          <span className="text-[10px] text-text-muted">{ev.date}</span>
                        </div>
                        <p className="text-xs text-text-secondary">{ev.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA buttons */}
              <div className="space-y-2 pt-2">
                {(node as any).actorKey && (
                  <Button className="w-full text-sm" onClick={() => navigate('/actors')}>
                    Open Actor Profile <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
                <Button variant="secondary" className="w-full text-sm" onClick={() => navigate('/evidence')}>
                  View All Evidence
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RelationshipGraph;
