import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '../motion/useReducedMotion';

export type Factor = { label: string; pct: number; color?: string };

const DEFAULT_FACTORS: Factor[] = [
  { label: 'INFRASTRUCTURE FINGERPRINT', pct: 94 },
  { label: 'IDENTIFIER & PGP REUSE', pct: 88 },
  { label: 'BEHAVIORAL STYLOMETRY', pct: 82 },
  { label: 'SOURCE RELIABILITY', pct: 90 },
];

type ConfidenceRingProps = {
  pct?: number;
  confidence?: number;
  factors?: Factor[];
};

export function ConfidenceRing({
  pct,
  confidence,
  factors = DEFAULT_FACTORS,
}: ConfidenceRingProps) {
  const value = pct ?? confidence ?? 72;
  const reduced = useReducedMotion();
  const [drawn, setDrawn] = useState(reduced);
  const r = 56;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;

  useEffect(() => {
    if (reduced) {
      setDrawn(true);
      return;
    }
    const t = setTimeout(() => setDrawn(true), 100);
    return () => clearTimeout(t);
  }, [reduced, value]);

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div className="relative w-32 h-32 shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          {/* Background Track */}
          <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(36, 42, 37, 0.8)" strokeWidth="3" />
          {/* Animated Green Arc */}
          <circle
            cx="64"
            cy="64"
            r={r}
            fill="none"
            stroke="#39FF68"
            strokeWidth="3.5"
            strokeDasharray={circ}
            strokeDashoffset={drawn ? offset : circ}
            strokeLinecap="round"
            style={{ transition: reduced ? 'none' : 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-mono font-bold text-text-primary tabular-nums">{value}%</span>
          <span className="text-[9px] font-mono tracking-[0.15em] text-text-muted uppercase mt-0.5">CONFIDENCE</span>
        </div>
      </div>

      <ul className="flex-1 space-y-2.5 w-full font-mono">
        {factors.map((f, i) => (
          <li
            key={f.label}
            className="border-t border-border-subtle/60 pt-2"
            style={{
              opacity: drawn || reduced ? 1 : 0,
              transform: drawn || reduced ? 'none' : 'translateX(-8px)',
              transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`,
            }}
          >
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-text-muted uppercase tracking-wider">{f.label}</span>
              <span className="text-text-primary font-semibold tabular-nums">{f.pct}%</span>
            </div>
            <div className="h-px bg-border-subtle relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-accent-solid"
                style={{ width: drawn ? `${f.pct}%` : '0%', transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)' }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
