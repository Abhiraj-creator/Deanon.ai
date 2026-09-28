import type { Variants } from 'motion';
import { gsap } from './gsap';

// Centralized Framer Motion animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const clipMaskReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const tacticalBracket: Variants = {
  rest: { scale: 1, opacity: 0.5 },
  hover: { scale: 1.05, opacity: 1, transition: { duration: 0.2 } },
};

export const pulseGlow: Variants = {
  initial: { opacity: 0.6 },
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

// GSAP Helper utilities
export function animateCounter(
  element: HTMLElement | null,
  targetValue: number,
  duration: number = 1.5,
  formatter?: (val: number) => string
) {
  if (!element) return;
  const obj = { val: 0 };
  gsap.to(obj, {
    val: targetValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      const current = Math.floor(obj.val);
      element.textContent = formatter ? formatter(current) : current.toLocaleString();
    },
  });
}

export function animatePulseGlow(target: string | HTMLElement) {
  return gsap.to(target, {
    opacity: 0.3,
    duration: 1.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}
