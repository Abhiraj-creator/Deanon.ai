import { type ReactNode } from 'react';
import { LenisScroll } from '../motion/LenisScroll';

export function SmoothScroll({ children }: { children: ReactNode }) {
  return <LenisScroll>{children}</LenisScroll>;
}
