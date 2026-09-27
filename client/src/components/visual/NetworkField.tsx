import React, { useMemo } from 'react';
import { GRAPH_NODES, GRAPH_EDGES } from '../../lib/graphModel';
import { TechnicalGrid } from './TechnicalGrid';

function parsePct(v: string) {
  return parseFloat(v) / 100;
}

type NetworkFieldProps = {
  className?: string;
  compact?: boolean;
};

export function NetworkField({ className = '', compact = false }: NetworkFieldProps) {
  const nodes = useMemo(() => Object.values(GRAPH_NODES), []);
  const edges = GRAPH_EDGES;

  return (
    <div className={`relative w-full h-full min-h-[360px] border border-border-subtle bg-canvas-deep/80 overflow-hidden ${className}`}>
      <TechnicalGrid size={36} className="opacity-40" />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Edges */}
        {edges.map((e, i) => {
          const from = GRAPH_NODES[e.from];
          const to = GRAPH_NODES[e.to];
          if (!from || !to) return null;
          const x1 = parsePct(from.x) * 100;
          const y1 = parsePct(from.y) * 100;
          const x2 = parsePct(to.x) * 100;
          const y2 = parsePct(to.y) * 100;
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2 - (i % 2 === 0 ? 6 : -6);
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
              fill="none"
              stroke={e.confidence === 'High' ? 'rgba(57, 255, 104, 0.4)' : 'rgba(57, 255, 104, 0.15)'}
              strokeWidth="0.35"
              strokeDasharray={e.confidence === 'Medium' ? '1,1' : undefined}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((n) => {
          const cx = parsePct(n.x) * 100;
          const cy = parsePct(n.y) * 100;
          const isCore = n.id === 'darkvendorx' || n.id === 'fin7';
          const nodeRadius = isCore ? 2.2 : 1.4;

          return (
            <g key={n.id}>
              {/* Outer glow ring */}
              <circle
                cx={cx}
                cy={cy}
                r={nodeRadius + 2}
                fill="none"
                stroke="rgba(57, 255, 104, 0.2)"
                strokeWidth="0.25"
                className="animate-pulse-subtle"
              />
              {/* Core node circle */}
              <circle
                cx={cx}
                cy={cy}
                r={nodeRadius}
                fill={isCore ? '#39FF68' : '#25D957'}
                opacity={0.9}
              />

              {/* Node label badge */}
              <g transform={`translate(${cx + nodeRadius + 1}, ${cy - 2.5})`}>
                <rect
                  width={n.label.length * 1.8 + 3}
                  height={5}
                  rx={0.8}
                  fill="rgba(14, 18, 15, 0.9)"
                  stroke="rgba(57, 255, 104, 0.3)"
                  strokeWidth="0.2"
                />
                <text
                  x={1.5}
                  y={3.6}
                  fontSize="2.4"
                  fill="#f2f5ef"
                  fontFamily="monospace"
                  letterSpacing="0.05em"
                >
                  {n.label.toUpperCase()}
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      {/* Footer bar */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[9px] font-mono text-text-muted">
        <span className="flex items-center gap-2 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-solid animate-pulse" />
          ACTIVE NEURAL CORRELATION FIELD
        </span>
        <span className="hidden sm:inline tracking-wider uppercase text-text-muted/60">
          NODES: {nodes.length} | EDGES: {edges.length}
        </span>
      </div>
    </div>
  );
}
