import { useMemo } from 'react';
import { GRAPH_NODES, GRAPH_EDGES } from '../../lib/graphModel';
import { TechnicalGrid } from './TechnicalGrid';

function parsePct(v: string) {
  return parseFloat(v) / 100;
}

export function NetworkField({ className = '' }: { className?: string }) {
  const nodes = useMemo(() => Object.values(GRAPH_NODES), []);
  const edges = GRAPH_EDGES;

  return (
    <div className={`relative w-full h-[320px] md:h-[400px] border border-border-subtle bg-canvas-deep overflow-hidden ${className}`}>
      <TechnicalGrid size={40} className="opacity-50" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {edges.map((e, i) => {
          const from = GRAPH_NODES[e.from];
          const to = GRAPH_NODES[e.to];
          if (!from || !to) return null;
          const x1 = parsePct(from.x) * 100;
          const y1 = parsePct(from.y) * 100;
          const x2 = parsePct(to.x) * 100;
          const y2 = parsePct(to.y) * 100;
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2 - 8;
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
              fill="none"
              stroke={e.confidence === 'High' ? 'rgba(57,255,104,0.35)' : 'rgba(107,116,105,0.25)'}
              strokeWidth="0.3"
            />
          );
        })}
        {nodes.map((n) => {
          const cx = parsePct(n.x) * 100;
          const cy = parsePct(n.y) * 100;
          return (
            <g key={n.id}>
              <circle cx={cx} cy={cy} r={n.id === 'darkvendorx' ? 1.8 : 1.2} fill="#39FF68" opacity={0.85} />
            </g>
          );
        })}
      </svg>
      <p className="absolute bottom-4 left-4 meta-label text-text-muted">Live relationship field</p>
    </div>
  );
}
