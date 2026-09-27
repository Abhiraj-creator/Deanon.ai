import { useState, useEffect, type ReactNode } from 'react';
import { useReducedMotion } from '../motion/useReducedMotion';

type ParallaxLayerProps = {
  children: ReactNode;
  depth?: number; // Depth intensity factor (default: 15)
  className?: string;
};

export function ParallaxLayer({
  children,
  depth = 15,
  className = '',
}: ParallaxLayerProps) {
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      setOffset({ x: dx * depth, y: dy * depth });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reduced, depth]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={className}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0px)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      {children}
    </div>
  );
}
