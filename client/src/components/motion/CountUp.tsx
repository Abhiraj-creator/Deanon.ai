import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVal(target);
      return;
    }
    let start = 0;
    const steps = 40;
    const step = target / steps;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setVal(target);
        clearInterval(timer);
      } else setVal(Math.floor(start));
    }, 24);
    return () => clearInterval(timer);
  }, [target, reduced]);

  return (
    <span>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}
