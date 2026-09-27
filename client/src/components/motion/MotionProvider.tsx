import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from './useReducedMotion';

export function MotionProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced) return;
    setVisible(false);
    const t = requestAnimationFrame(() => {
      setVisible(true);
    });
    return () => cancelAnimationFrame(t);
  }, [location.pathname, reduced]);

  return (
    <div
      className={`transition-opacity duration-500 ease-out ${visible || reduced ? 'opacity-100' : 'opacity-0'}`}
      key={location.pathname}
    >
      {children}
    </div>
  );
}
