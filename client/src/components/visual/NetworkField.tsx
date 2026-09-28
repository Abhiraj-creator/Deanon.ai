import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Key,
  Server,
  Database,
  Users,
  Sparkles,
  Activity,
  Filter,
  Eye
} from 'lucide-react';
import { GRAPH_NODES, GRAPH_EDGES, NODE_EVIDENCE, type GraphNodeType } from '../../lib/graphModel';
import { TechnicalGrid } from './TechnicalGrid';

type NetworkFieldProps = {
  className?: string;
};

// Node Type Styling Definitions
const NODE_TYPE_THEMES: Record<
  GraphNodeType,
  {
    icon: typeof ShieldAlert;
    badgeBg: string;
    border: string;
    glow: string;
    label: string;
    color: string;
  }
> = {
  actor: {
    icon: Users,
    badgeBg: 'bg-emerald-500/10',
    border: 'border-emerald-500/60',
    glow: 'rgba(57, 255, 104, 0.4)',
    label: 'ACTOR',
    color: '#39FF68',
  },
  infra: {
    icon: Server,
    badgeBg: 'bg-purple-500/10',
    border: 'border-purple-500/60',
    glow: 'rgba(168, 85, 247, 0.4)',
    label: 'INFRASTRUCTURE',
    color: '#A855F7',
  },
  identifier: {
    icon: Key,
    badgeBg: 'bg-blue-500/10',
    border: 'border-blue-500/60',
    glow: 'rgba(59, 130, 246, 0.4)',
    label: 'IDENTIFIER',
    color: '#3B82F6',
  },
  source: {
    icon: Database,
    badgeBg: 'bg-amber-500/10',
    border: 'border-amber-500/60',
    glow: 'rgba(245, 158, 11, 0.4)',
    label: 'SOURCE',
    color: '#F59E0B',
  },
};

// Optimized Spacious Node Layout (in percentages for responsive bounds)
const NODE_POSITIONS: Record<string, { xPct: number; yPct: number }> = {
  darkvendorx: { xPct: 50, yPct: 46 }, // Center Hub
  onion_node: { xPct: 28, yPct: 18 },  // Top Left
  wallet_node: { xPct: 72, yPct: 18 }, // Top Right
  actor_3: { xPct: 16, yPct: 46 },     // Mid Far Left
  actor_2: { xPct: 84, yPct: 46 },     // Mid Far Right
  source_2: { xPct: 26, yPct: 78 },    // Bottom Left
  source_1: { xPct: 50, yPct: 84 },    // Bottom Center
  pgp_node: { xPct: 74, yPct: 78 },    // Bottom Right
};

export function NetworkField({ className = '' }: NetworkFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 480 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<GraphNodeType | 'all'>('all');
  const [time, setTime] = useState(0);

  // Responsive dimensions tracking
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({
          width: Math.max(clientWidth, 320),
          height: Math.max(clientHeight, 360),
        });
      }
    };
    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Floating animation ticker
  useEffect(() => {
    let animId: number;
    const tick = () => {
      setTime((t) => t + 0.025);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Calculate pixel coordinates with smooth floating motion
  const nodes = useMemo(() => {
    const w = dimensions.width;
    const h = dimensions.height;

    return Object.values(GRAPH_NODES).map((node, i) => {
      const pos = NODE_POSITIONS[node.id] || { xPct: 50, yPct: 50 };
      
      // Floating offset based on sine waves for an organic floating effect
      const phase = i * 1.35;
      const floatX = Math.sin(time + phase) * 6;
      const floatY = Math.cos(time * 0.8 + phase) * 6;

      const pixelX = (pos.xPct / 100) * w + floatX;
      const pixelY = (pos.yPct / 100) * h + floatY;

      return {
        ...node,
        px: pixelX,
        py: pixelY,
        theme: NODE_TYPE_THEMES[node.type] || NODE_TYPE_THEMES.actor,
      };
    });
  }, [dimensions, time]);

  const nodesMap = useMemo(() => {
    const map = new Map<string, typeof nodes[0]>();
    nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [nodes]);

  // Determine connected node IDs and edge indices for the hovered node
  const activeConnections = useMemo(() => {
    if (!hoveredNodeId) return { nodeIds: new Set<string>(), edgeIndices: new Set<number>() };
    const nodeIds = new Set<string>([hoveredNodeId]);
    const edgeIndices = new Set<number>();

    GRAPH_EDGES.forEach((edge, i) => {
      if (edge.from === hoveredNodeId) {
        nodeIds.add(edge.to);
        edgeIndices.add(i);
      } else if (edge.to === hoveredNodeId) {
        nodeIds.add(edge.from);
        edgeIndices.add(i);
      }
    });

    return { nodeIds, edgeIndices };
  }, [hoveredNodeId]);

  const hoveredNode = hoveredNodeId ? nodesMap.get(hoveredNodeId) : null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[420px] bg-[#070C14] border border-border-subtle/70 overflow-hidden rounded-[8px] select-none font-sans ${className}`}
    >
      {/* ── BACKGROUND GRAPHICS & TECH GRID ── */}
      <TechnicalGrid size={40} className="opacity-30" />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      {/* Subtle Radial Glow in Center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full pointer-events-none opacity-20 blur-[60px]"
        style={{
          background: 'radial-gradient(circle, rgba(57, 255, 104, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)',
        }}
      />

      {/* Outer Tech Bounding Box Brackets */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-accent-solid/40 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-accent-solid/40 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-accent-solid/40 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-accent-solid/40 pointer-events-none" />

      {/* ── TOP HEADER CONTROL BAR ── */}
      <div className="absolute top-4 left-5 right-5 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-solid opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-solid"></span>
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] text-text-muted uppercase">
            NEURAL ATTRIBUTION GRAPH
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 bg-canvas-deep/80 backdrop-blur-md p-1 rounded-md border border-border-subtle/50 text-[9px] font-mono">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-2 py-0.5 rounded transition-all ${
              selectedFilter === 'all'
                ? 'bg-accent-solid text-canvas font-semibold shadow-[0_0_8px_rgba(57,255,104,0.4)]'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            ALL
          </button>
          {(['actor', 'infra', 'identifier', 'source'] as GraphNodeType[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-2 py-0.5 rounded transition-all uppercase ${
                selectedFilter === cat
                  ? 'bg-accent-solid text-canvas font-semibold shadow-[0_0_8px_rgba(57,255,104,0.4)]'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN SVG DRAWING CANVAS FOR EDGES & NODES ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-auto"
        width={dimensions.width}
        height={dimensions.height}
      >
        <defs>
          {/* Animated Stream Dash Pattern Filter */}
          <linearGradient id="edge-high-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#39FF68" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="edge-mod-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* ── GRAPH EDGES (CURVED CONNECTIONS & PULSING STREAMS) ── */}
        <g id="edges-layer">
          {GRAPH_EDGES.map((edge, i) => {
            const fromNode = nodesMap.get(edge.from);
            const toNode = nodesMap.get(edge.to);
            if (!fromNode || !toNode) return null;

            const isEdgeHighlighted = activeConnections.edgeIndices.has(i);
            const isDimmed =
              (hoveredNodeId !== null && !isEdgeHighlighted) ||
              (selectedFilter !== 'all' &&
                fromNode.type !== selectedFilter &&
                toNode.type !== selectedFilter);

            // Curve offset calculations
            const dx = toNode.px - fromNode.px;
            const dy = toNode.py - fromNode.py;
            const dist = Math.hypot(dx, dy);
            const midX = (fromNode.px + toNode.px) / 2;
            const midY = (fromNode.py + toNode.py) / 2;

            // Perpendicular offset for organic curvature
            const curvature = (i % 2 === 0 ? 1 : -1) * Math.min(dist * 0.12, 28);
            const ctrlX = midX - (dy / (dist || 1)) * curvature;
            const ctrlY = midY + (dx / (dist || 1)) * curvature;

            const isHighConf = edge.confidence === 'High';
            const strokeColor = isEdgeHighlighted
              ? '#39FF68'
              : isHighConf
              ? 'rgba(57, 255, 104, 0.35)'
              : 'rgba(168, 85, 247, 0.25)';

            return (
              <g key={`${edge.from}-${edge.to}-${i}`} className="transition-opacity duration-300" opacity={isDimmed ? 0.12 : 1}>
                {/* Background Base Curve */}
                <path
                  d={`M ${fromNode.px} ${fromNode.py} Q ${ctrlX} ${ctrlY} ${toNode.px} ${toNode.py}`}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={isEdgeHighlighted ? 2.5 : isHighConf ? 1.5 : 1}
                  strokeDasharray={!isHighConf ? '4,4' : undefined}
                />

                {/* Animated Flowing Data Stream Particle Dots */}
                {(!isDimmed || isEdgeHighlighted) && (
                  <path
                    d={`M ${fromNode.px} ${fromNode.py} Q ${ctrlX} ${ctrlY} ${toNode.px} ${toNode.py}`}
                    fill="none"
                    stroke={isHighConf ? '#39FF68' : '#A855F7'}
                    strokeWidth={isEdgeHighlighted ? 3 : 2}
                    strokeDasharray="6 24"
                    strokeLinecap="round"
                    style={{
                      animation: `dashStream ${isHighConf ? 4 : 7}s linear infinite${i % 2 === 0 ? '' : ' reverse'}`,
                    }}
                    opacity={isEdgeHighlighted ? 1 : 0.7}
                  />
                )}

                {/* Edge Label Badge on Hover */}
                {isEdgeHighlighted && (
                  <g transform={`translate(${midX}, ${midY})`}>
                    <rect
                      x="-36"
                      y="-10"
                      width="72"
                      height="20"
                      rx="4"
                      fill="#070C14"
                      stroke="#39FF68"
                      strokeWidth="1"
                      className="shadow-[0_0_12px_rgba(57,255,104,0.5)]"
                    />
                    <text
                      x="0"
                      y="3"
                      textAnchor="middle"
                      fontSize="9"
                      fill="#39FF68"
                      fontFamily="monospace"
                      fontWeight="bold"
                      className="uppercase tracking-wider"
                    >
                      {edge.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* ── GRAPH NODES & INTERACTIVE PINS ── */}
        <g id="nodes-layer">
          {nodes.map((node) => {
            const Icon = node.theme.icon;
            const isHovered = hoveredNodeId === node.id;
            const isConnectedToHovered = activeConnections.nodeIds.has(node.id);
            const isFilterSelected = selectedFilter === 'all' || node.type === selectedFilter;
            const isDimmed =
              (hoveredNodeId !== null && !isConnectedToHovered) || !isFilterSelected;
            const isCoreActor = node.id === 'darkvendorx' || node.id === 'actor_2' || node.id === 'actor_3';

            return (
              <g
                key={node.id}
                transform={`translate(${node.px}, ${node.py})`}
                className="cursor-pointer transition-opacity duration-300"
                opacity={isDimmed ? 0.2 : 1}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                {/* Ambient Node Pulse Aura */}
                <circle
                  r={isCoreActor ? (isHovered ? 26 : 20) : (isHovered ? 22 : 16)}
                  fill="none"
                  stroke={node.theme.color}
                  strokeWidth={isHovered ? 2 : 1}
                  opacity={isHovered ? 0.8 : 0.3}
                  className="transition-all duration-300"
                />

                {/* Core Node Circle Base */}
                <circle
                  r={isCoreActor ? 14 : 11}
                  fill="#0B1325"
                  stroke={isHovered ? '#FFFFFF' : node.theme.color}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                  className="transition-all duration-200 shadow-xl"
                  style={{
                    filter: isHovered
                      ? `drop-shadow(0 0 12px ${node.theme.glow})`
                      : `drop-shadow(0 0 6px ${node.theme.glow})`,
                  }}
                />

                {/* Inner Icon / Dot */}
                <foreignObject
                  x={isCoreActor ? -8 : -6}
                  y={isCoreActor ? -8 : -6}
                  width={isCoreActor ? 16 : 12}
                  height={isCoreActor ? 16 : 12}
                  className="pointer-events-none"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon
                      style={{ color: isHovered ? '#FFFFFF' : node.theme.color }}
                      className="w-full h-full transition-colors"
                      strokeWidth={2}
                    />
                  </div>
                </foreignObject>

                {/* Node Text Label Card (Positioned below/above for maximum breathing space) */}
                <g
                  transform={`translate(0, ${isCoreActor ? 24 : 20})`}
                  className="pointer-events-none"
                >
                  {/* Label Background Box */}
                  <rect
                    x={-(node.label.length * 4.2 + 10)}
                    y="-10"
                    width={node.label.length * 8.4 + 20}
                    height="20"
                    rx="4"
                    fill="#0B1325"
                    stroke={isHovered ? '#39FF68' : node.theme.color}
                    strokeWidth={isHovered ? 1.5 : 0.75}
                    opacity="0.92"
                    className="transition-all duration-200 shadow-lg"
                  />
                  {/* Label Text */}
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fontSize="10"
                    fill={isHovered ? '#39FF68' : '#F4F1EB'}
                    fontFamily="monospace"
                    fontWeight={isCoreActor ? 'bold' : 'normal'}
                    className="tracking-wider uppercase"
                  >
                    {node.label}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>

      {/* ── FLOATING HUD TELEMETRY CARD (ON NODE HOVER) ── */}
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-12 right-5 z-30 w-72 bg-[#070C14]/95 backdrop-blur-xl border border-accent-solid/50 rounded-lg p-4 shadow-[0_0_24px_rgba(57,255,104,0.2)] text-sans pointer-events-none"
          >
            {/* Tech Corner Brackets */}
            <div className="absolute top-1.5 left-1.5 text-[8px] font-mono text-accent-solid/60">[</div>
            <div className="absolute top-1.5 right-1.5 text-[8px] font-mono text-accent-solid/60">]</div>
            <div className="absolute bottom-1.5 left-1.5 text-[8px] font-mono text-accent-solid/60">[</div>
            <div className="absolute bottom-1.5 right-1.5 text-[8px] font-mono text-accent-solid/60">]</div>

            {/* Header / Type Badge */}
            <div className="flex items-center justify-between border-b border-border-subtle/60 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: hoveredNode.theme.color }}
                />
                <span className="text-xs font-mono font-bold text-text-primary tracking-wider uppercase">
                  {hoveredNode.label}
                </span>
              </div>
              <span
                className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase font-medium ${hoveredNode.theme.badgeBg} ${hoveredNode.theme.border}`}
                style={{ color: hoveredNode.theme.color }}
              >
                {hoveredNode.theme.label}
              </span>
            </div>

            {/* Entity Attributes Table */}
            <div className="space-y-1.5 font-mono text-[10px]">
              {Object.entries(hoveredNode.data).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center text-text-muted">
                  <span>{key}:</span>
                  <span className="text-text-primary font-semibold">{val}</span>
                </div>
              ))}
              
              {/* Evidence Log Count */}
              <div className="flex justify-between items-center pt-2 border-t border-border-subtle/40 text-[10px]">
                <span className="text-accent-solid font-mono uppercase flex items-center gap-1">
                  <Eye className="w-3 h-3" /> AUDIT EVIDENCE
                </span>
                <span className="text-text-primary font-bold">
                  {NODE_EVIDENCE[hoveredNode.id]?.length || 1} RECORDS
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FOOTER STATUS BAR ── */}
      <div className="absolute bottom-3 left-5 right-5 z-20 flex items-center justify-between text-[9px] font-mono text-text-muted pointer-events-none">
        <span className="flex items-center gap-2 uppercase tracking-widest text-accent-solid font-medium">
          <Activity className="w-3 h-3 animate-spin-slow" />
          ACTIVE NEURAL CORRELATION FIELD
        </span>
        <span className="hidden sm:inline tracking-wider uppercase text-text-muted/70">
          NODES: {nodes.length} | EDGES: {GRAPH_EDGES.length} | ACCURACY: 94.2%
        </span>
      </div>

      {/* Custom CSS Animation Keyframes for Flowing Data Streams */}
      <style>{`
        @keyframes dashStream {
          0% { stroke-dashoffset: 120; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 12s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default NetworkField;
