import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, ChevronDown, Plus, Minus, Maximize, ShieldAlert,
  Key, Server, Database, Users, Network, X, FileCheck, ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ConfidencePill } from '../components/ui/Badges';

// ── Mock Graph Data ──────────────────────────────────────────────────────────
const ALL_NODES = {
  darkvendorx:  { id: 'darkvendorx',  label: 'DarkVendorX',     type: 'actor',      x: '50%', y: '50%', icon: ShieldAlert, color: 'text-status-red',    fillColor: '#39FF68', glowColor: 'rgba(57, 255, 104, 0.4)', data: { Role: 'Initial Access Broker', 'First Seen': '2022-03-14' }, actorKey: 'DarkVendorX' },
  onion_node:   { id: 'onion_node',   label: 'darkvx...onion',  type: 'infra',      x: '35%', y: '25%', icon: Server,       color: 'text-status-purple', fillColor: '#9B75D0', glowColor: 'rgba(155, 117, 208, 0.4)', data: { Type: 'Tor Hidden Service', Status: 'Offline' } },
  wallet_node:  { id: 'wallet_node',  label: 'bc1qn...k9',      type: 'identifier', x: '65%', y: '20%', icon: Key,          color: 'text-status-blue',   fillColor: '#5C8DFF', glowColor: 'rgba(92, 141, 255, 0.4)', data: { Type: 'Bitcoin Address', Balance: '12.4 BTC' } },
  actor_2:      { id: 'actor_2',      label: 'SilentCrow',      type: 'actor',      x: '80%', y: '50%', icon: Users,        color: 'text-status-red',    fillColor: '#39FF68', glowColor: 'rgba(57, 255, 104, 0.4)', data: { Role: 'Forum Member', 'First Seen': '2026-09-21' }, actorKey: 'SilentCrow' },
  pgp_node:     { id: 'pgp_node',     label: '0xA3F9D2C',       type: 'identifier', x: '70%', y: '75%', icon: Key,          color: 'text-status-blue',   fillColor: '#5C8DFF', glowColor: 'rgba(92, 141, 255, 0.4)', data: { Type: 'PGP Public Key', Email: 'dvx@secmail.pro' } },
  source_1:     { id: 'source_1',     label: 'XMarket',         type: 'source',     x: '50%', y: '85%', icon: Database,     color: 'text-status-green',  fillColor: '#2ED7B0', glowColor: 'rgba(46, 215, 176, 0.4)', data: { Type: 'Marketplace', Status: 'Active' } },
  source_2:     { id: 'source_2',     label: 'DarkForum',       type: 'source',     x: '30%', y: '75%', icon: Database,     color: 'text-status-green',  fillColor: '#2ED7B0', glowColor: 'rgba(46, 215, 176, 0.4)', data: { Type: 'Forum', Status: 'Active' } },
  actor_3:      { id: 'actor_3',      label: 'AlphaBay_Seller', type: 'actor',      x: '20%', y: '50%', icon: Users,        color: 'text-status-red',    fillColor: '#39FF68', glowColor: 'rgba(57, 255, 104, 0.4)', data: { Role: 'Marketplace Vendor', Status: 'Retired' }, actorKey: 'AlphaBay_Seller' },
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
  const [hoveredNode, setHoveredNode] = useState<NodeId | null>(null);
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

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map(n => n.id)), [visibleNodes]);

  const visibleEdges = useMemo(() => {
    return EDGES.filter(e =>
      visibleNodeIds.has(e.from) && visibleNodeIds.has(e.to) &&
      (confFilter === 'All' || e.confidence === confFilter)
    );
  }, [visibleNodeIds, confFilter]);

  // Helper: check if a node is connected to the hovered node
  const isConnected = (nodeId: string) => {
    if (!hoveredNode) return true;
    if (nodeId === hoveredNode) return true;
    return EDGES.some(e =>
      (e.from === hoveredNode && e.to === nodeId) ||
      (e.to === hoveredNode && e.from === nodeId)
    );
  };

  const node = selectedNode ? ALL_NODES[selectedNode] : null;
  const nodeEdges = EDGES.filter(e => e.from === selectedNode || e.to === selectedNode);
  const nodeEvidence = selectedNode ? (NODE_EVIDENCE[selectedNode] ?? []) : [];

  return (
    <div className="space-y-4 h-[calc(100vh-100px)] flex flex-col animate-fade-in font-sans selection:bg-accent-soft selection:text-accent-solid">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <p className="text-[10px] font-mono tracking-[0.25em] text-accent-solid uppercase mb-1">// 03 GRAPH MATRIX</p>
          <h1 className="text-xl font-mono font-bold text-text-primary tracking-wide">
            RELATIONSHIP GRAPH
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-text-muted bg-canvas-deep border border-border-subtle px-3 py-1.5 rounded-[4px]">
            NODES: {visibleNodes.length} · EDGES: {visibleEdges.length}
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex gap-3 flex-wrap font-mono text-xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" strokeWidth={1.5} />
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-canvas-deep border border-border-subtle rounded-[4px] text-xs font-mono text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent-border transition-colors"
            placeholder="Search graph nodes..."
          />
        </div>

        {/* Type filter */}
        <div className="relative">
          <button
            onClick={() => { setShowTypeMenu(v => !v); setShowConfMenu(false); }}
            className="flex items-center gap-2 bg-canvas-deep border border-border-subtle px-3 py-1.5 rounded-[4px] text-xs text-text-primary hover:border-border-strong transition-colors"
          >
            <span>{TYPE_LABELS[typeFilter]}</span>
            <ChevronDown className="w-3.5 h-3.5 text-text-muted" strokeWidth={1.5} />
          </button>
          {showTypeMenu && (
            <div className="absolute top-9 left-0 z-30 bg-panel border border-border-subtle rounded-[4px] shadow-2xl py-1 w-40">
              {(Object.keys(TYPE_LABELS) as TypeFilter[]).map(k => (
                <button key={k} onClick={() => { setTypeFilter(k); setShowTypeMenu(false); }}
                  className={`w-full text-left px-3.5 py-1.5 text-xs transition-colors hover:bg-card-hover ${typeFilter === k ? 'text-accent-solid font-semibold' : 'text-text-secondary'}`}>
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
            className="flex items-center gap-2 bg-canvas-deep border border-border-subtle px-3 py-1.5 rounded-[4px] text-xs text-text-primary hover:border-border-strong transition-colors"
          >
            <span>CONFIDENCE: {confFilter}</span>
            <ChevronDown className="w-3.5 h-3.5 text-text-muted" strokeWidth={1.5} />
          </button>
          {showConfMenu && (
            <div className="absolute top-9 left-0 z-30 bg-panel border border-border-subtle rounded-[4px] shadow-2xl py-1 w-40">
              {(['All', 'High', 'Moderate'] as const).map(k => (
                <button key={k} onClick={() => { setConfFilter(k); setShowConfMenu(false); }}
                  className={`w-full text-left px-3.5 py-1.5 text-xs transition-colors hover:bg-card-hover ${confFilter === k ? 'text-accent-solid font-semibold' : 'text-text-secondary'}`}>
                  {k}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas + Floating Panel */}
      <div className="relative flex-1 border border-border-subtle bg-canvas-deep rounded-[6px] overflow-hidden min-h-0">
        <div style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s', width: '100%', height: '100%', position: 'relative' }}>
          {/* Curved Bezier Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {visibleEdges.map((edge, i) => {
              const from = ALL_NODES[edge.from as NodeId];
              const to = ALL_NODES[edge.to as NodeId];
              if (!from || !to) return null;
              const x1 = parseFloat(from.x);
              const y1 = parseFloat(from.y);
              const x2 = parseFloat(to.x);
              const y2 = parseFloat(to.y);
              const mx = (x1 + x2) / 2 + (i % 2 === 0 ? 3 : -3);
              const my = (y1 + y2) / 2 + (i % 2 === 0 ? -4 : 4);

              const active = !hoveredNode || (hoveredNode === edge.from || hoveredNode === edge.to);

              return (
                <path
                  key={i}
                  d={`M ${x1}% ${y1}% Q ${mx}% ${my}% ${x2}% ${y2}%`}
                  fill="none"
                  stroke={edge.confidence === 'High' ? '#39FF68' : '#25D957'}
                  strokeWidth={edge.confidence === 'High' ? '1.2' : '0.6'}
                  strokeOpacity={active ? (edge.confidence === 'High' ? 0.45 : 0.25) : 0.05}
                  strokeDasharray={edge.confidence === 'Moderate' ? '3,3' : undefined}
                  style={{ transition: 'stroke-opacity 0.2s' }}
                />
              );
            })}
          </svg>

          {/* Interactive Nodes */}
          {visibleNodes.map((n) => {
            const isCenter = n.id === 'darkvendorx';
            const isSelected = selectedNode === n.id;
            const isHighlighted = searchQuery && n.label.toLowerCase().includes(searchQuery.toLowerCase());
            const connected = isConnected(n.id);
            const Icon = n.icon;

            return (
              <div
                key={n.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group transition-all duration-200 ${
                  connected ? 'opacity-100 scale-100' : 'opacity-15 scale-95'
                }`}
                style={{ top: n.y, left: n.x, zIndex: isSelected ? 30 : 10 }}
                onClick={() => setSelectedNode(n.id === selectedNode ? null : (n.id as NodeId))}
                onMouseEnter={() => setHoveredNode(n.id as NodeId)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Outer Glow Ring */}
                {(isSelected || isCenter) && (
                  <div
                    className="absolute rounded-full animate-pulse-subtle pointer-events-none"
                    style={{
                      width: isCenter ? '64px' : '52px',
                      height: isCenter ? '64px' : '52px',
                      border: `1px solid ${n.glowColor}`,
                      background: n.glowColor.replace('0.4', '0.08'),
                    }}
                  />
                )}

                {/* Node Core Circle */}
                <div
                  className={`flex items-center justify-center rounded-full border transition-all ${
                    isCenter ? 'w-12 h-12' : 'w-9 h-9'
                  }`}
                  style={{
                    backgroundColor: 'rgba(14, 18, 15, 0.95)',
                    borderColor: n.fillColor,
                    boxShadow: isSelected ? `0 0 16px ${n.glowColor}` : 'none',
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: n.fillColor }} strokeWidth={1.5} />
                </div>

                {/* Node Text Badge */}
                <span
                  className={`mt-1.5 px-2 py-0.5 bg-panel border border-border-subtle rounded-[3px] text-[9px] font-mono text-text-primary uppercase tracking-wider transition-opacity ${
                    isSelected || isCenter || isHighlighted ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                  }`}
                >
                  {n.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Floating Controls (Top Right) */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-1 font-mono">
          <button
            title="Zoom In"
            onClick={() => setZoom((z) => Math.min(z + 0.15, 2))}
            className="w-7 h-7 bg-panel border border-border-subtle hover:border-border-strong text-text-primary text-xs flex items-center justify-center rounded-[3px] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
          <button
            title="Zoom Out"
            onClick={() => setZoom((z) => Math.max(z - 0.15, 0.5))}
            className="w-7 h-7 bg-panel border border-border-subtle hover:border-border-strong text-text-primary text-xs flex items-center justify-center rounded-[3px] transition-colors"
          >
            <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
          <button
            title="Reset Zoom"
            onClick={() => setZoom(1)}
            className="w-7 h-7 bg-panel border border-border-subtle hover:border-border-strong text-text-primary text-xs flex items-center justify-center rounded-[3px] transition-colors"
          >
            <Maximize className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Floating Legend (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-20 bg-panel/90 backdrop-blur border border-border-subtle p-3 rounded-[4px] space-y-1.5 font-mono text-[9px]">
          <p className="text-text-muted uppercase tracking-widest font-semibold mb-1">// ENTITY TYPES</p>
          {[
            { color: '#39FF68', label: 'ACTOR' },
            { color: '#5C8DFF', label: 'IDENTIFIER' },
            { color: '#9B75D0', label: 'INFRASTRUCTURE' },
            { color: '#2ED7B0', label: 'SOURCE' },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
              <span className="text-text-secondary uppercase tracking-wider">{l.label}</span>
            </div>
          ))}
        </div>

        {/* Sliding Detail Drawer Panel (Right Side) */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-80 bg-panel/95 backdrop-blur border-l border-border-subtle z-30 p-5 overflow-y-auto font-mono transform transition-transform duration-300 ease-out ${
            node ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {node && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-border-subtle pb-4">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-accent-solid">// SELECTED NODE</span>
                  <h2 className="text-sm font-bold text-text-primary tracking-wide">{node.label}</h2>
                  <span className="text-[10px] text-text-muted uppercase">{node.type} ENTITY</span>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1 text-text-muted hover:text-text-primary transition-colors"
                  aria-label="Close detail panel"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* Node Properties */}
              <div className="space-y-2">
                <p className="text-[10px] text-text-muted uppercase tracking-widest">// NODE PROPERTIES</p>
                <div className="bg-canvas-deep border border-border-subtle p-3 rounded-[4px] space-y-2 text-xs">
                  {Object.entries(node.data).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-text-muted text-[10px]">{k}</span>
                      <span className="text-text-primary font-semibold text-xs">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connected Edges */}
              <div className="space-y-2">
                <p className="text-[10px] text-text-muted uppercase tracking-widest">
                  // CONNECTIONS ({nodeEdges.length})
                </p>
                <div className="space-y-2">
                  {nodeEdges.map((e, i) => {
                    const otherId = e.from === selectedNode ? e.to : e.from;
                    const otherNode = ALL_NODES[otherId as NodeId];
                    return (
                      <div key={i} className="p-2.5 bg-canvas-deep border border-border-subtle rounded-[4px] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <Network className="w-3.5 h-3.5 text-accent-solid shrink-0" strokeWidth={1.5} />
                          <div className="min-w-0">
                            <span className="text-[9px] text-text-muted block uppercase">{e.label}</span>
                            <span className="text-xs text-text-primary truncate block font-semibold">{otherNode?.label}</span>
                          </div>
                        </div>
                        <ConfidencePill level={e.confidence} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Supporting Evidence */}
              {nodeEvidence.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] text-text-muted uppercase tracking-widest">// EVIDENCE RECORDS</p>
                  <div className="space-y-2">
                    {nodeEvidence.map(ev => (
                      <div
                        key={ev.id}
                        onClick={() => navigate('/evidence')}
                        className="p-3 bg-canvas-deep border border-border-subtle rounded-[4px] hover:border-accent-border/50 cursor-pointer transition-colors space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-accent-solid">{ev.id}</span>
                          <span className="text-[9px] text-text-muted">{ev.date}</span>
                        </div>
                        <p className="text-xs text-text-secondary font-sans">{ev.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {(node as any).actorKey && (
                  <Button className="w-full text-xs font-mono uppercase tracking-wider" onClick={() => navigate('/actors')}>
                    Open Actor Profile <ArrowRight className="w-3.5 h-3.5 ml-2" strokeWidth={1.5} />
                  </Button>
                )}
                <Button variant="secondary" className="w-full text-xs font-mono uppercase tracking-wider" onClick={() => navigate('/evidence')}>
                  View All Evidence
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelationshipGraph;
