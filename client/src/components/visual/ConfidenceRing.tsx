import { useEffect, useState } from 'react';
import { useReducedMotion } from '../motion/useReducedMotion';

type Factor = { label: string; pct: number; color?: string };

export function ConfidenceRing({
  pct,
  factors,
}: {
  pct: number;
  factors: Factor[];
}) {
  const reduced = useReducedMotion();
  const [drawn, setDrawn] = useState(reduced);
  const r = 56;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  useEffect(() => {
    if (reduced) {
      setDrawn(true);
      return;
    }
    const t = setTimeout(() => setDrawn(true), 100);
    return () => clearTimeout(t);
  }, [reduced, pct]);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <div className="relative w-36 h-36 shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r={r} fill="none" stroke="#242a25" strokeWidth="1" />
          <circle
            cx="64"
            cy="64"
            r={r}
            fill="none"
            stroke="#39FF68"
            strokeWidth="1.5"
            strokeDasharray={circ}
            strokeDashoffset={drawn ? offset : circ}
            strokeLinecap="round"
            style={{ transition: reduced ? 'none' : 'stroke-dashoffset 1.2s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-light text-text-primary tabular-nums">{pct}%</span>
          <span className="meta-label mt-1">Confidence</span>
        </div>
      </div>
      <ul className="flex-1 space-y-3 w-full">
        {factors.map((f, i) => (
          <li
            key={f.label}
            className="border-t border-border-subtle pt-3"
            style={{
              opacity: drawn || reduced ? 1 : 0,
              transform: drawn || reduced ? 'none' : 'translateX(-8px)',
              transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
            }}
          >
            <div className="flex justify-between text-xs mb-1">
              <span className="text-text-secondary uppercase tracking-wide">{f.label}</span>
              <span className="text-text-muted tabular-nums">{f.pct}%</span>
            </div>
            <div className="h-px bg-border-subtle relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-accent-solid/60"
                style={{ width: drawn ? `${f.pct}%` : '0%', transition: 'width 1s ease-out' }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
