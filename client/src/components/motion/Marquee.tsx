import type { ReactNode } from 'react';

export function Marquee({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="inline-flex animate-marquee min-w-[200%]">
        <span className="inline-flex shrink-0 w-1/2 justify-around">{children}</span>
        <span className="inline-flex shrink-0 w-1/2 justify-around" aria-hidden>
          {children}
        </span>
      </div>
    </div>
  );
}
