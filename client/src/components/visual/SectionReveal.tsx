import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../lib/motion';
import { useReducedMotion } from '../motion/useReducedMotion';

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
};

export function SectionReveal({
  children,
  className = '',
  stagger = false,
  delay = 0,
}: SectionRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={stagger ? staggerContainer : fadeInUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
