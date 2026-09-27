import { useEffect, useRef } from 'react';
import { gsap, ensureGsapPlugins } from '../../lib/gsap';
import { useReducedMotion } from '../motion/useReducedMotion';
import { TechnicalGrid } from './TechnicalGrid';

const LABELS = ['ACTOR', 'IDENTIFIER', 'PGP', 'WALLET', 'INFRASTRUCTURE', 'EVIDENCE', 'CORRELATION'];

export function SignalField({ compact = false }: { compact?: boolean }) {
  const rootRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !rootRef.current) return;
    ensureGsapPlugins();
    const paths = rootRef.current.querySelectorAll('.signal-path');
    paths.forEach((path, i) => {
      const len = (path as SVGPathElement).getTotalLength?.() ?? 400;
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 3 + i * 0.4,
        delay: i * 0.2,
        ease: 'power2.inOut',
      });
    });
    gsap.to('.signal-orbit', {
      rotate: 360,
      duration: 120,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%',
    });
  }, [reduced]);

  return (
    <div className={`relative w-full ${compact ? 'h-[280px]' : 'h-[min(70vh,520px)]'}`}>
      <TechnicalGrid className="opacity-60" size={56} />
      <svg ref={rootRef} viewBox="0 0 600 420" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <g className="signal-orbit" opacity={0.85}>
          <path
            className="signal-path"
            d="M 80 320 Q 200 80 320 200 T 520 120"
            fill="none"
            stroke="rgba(57,255,104,0.35)"
            strokeWidth="1"
          />
          <path
            className="signal-path"
            d="M 40 180 Q 280 40 400 280 T 560 340"
            fill="none"
            stroke="rgba(57,255,104,0.2)"
            strokeWidth="0.75"
          />
          <path
            className="signal-path"
            d="M 120 400 Q 300 200 480 380"
            fill="none"
            stroke="rgba(57,255,104,0.15)"
            strokeWidth="0.5"
          />
        </g>
        {[
          [320, 200],
          [200, 120],
          [420, 280],
          [480, 140],
          [160, 300],
          [380, 360],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={4} fill="#39FF68" opacity={0.9} />
            <circle cx={cx} cy={cy} r={10} fill="none" stroke="rgba(57,255,104,0.25)" strokeWidth="0.5" />
          </g>
        ))}
        {LABELS.slice(0, compact ? 4 : 7).map((label, i) => (
          <text
            key={label}
            x={80 + i * (compact ? 120 : 70)}
            y={40 + (i % 2) * 20}
            fill="rgba(164,172,161,0.7)"
            fontSize="9"
            fontFamily="Inter, sans-serif"
            letterSpacing="0.15em"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}
