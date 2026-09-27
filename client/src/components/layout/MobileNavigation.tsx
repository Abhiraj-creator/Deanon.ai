import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { NAV_ITEMS } from '../../lib/routeConfig';

type MobileNavigationProps = { open: boolean; onClose: () => void };

export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[200] bg-canvas flex flex-col transition-all duration-300 ease-out md:hidden ${
        open ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'
      }`}
      aria-modal="true"
      role="dialog"
      aria-label="Navigation menu"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border-subtle shrink-0">
        <div className="leading-none">
          <span className="text-[10px] tracking-[0.25em] font-semibold text-text-primary uppercase">THREAT</span>
          <span className="text-[10px] tracking-[0.4em] font-light text-accent-solid uppercase ml-1">LENS</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 text-text-muted hover:text-accent-solid transition-colors"
          aria-label="Close menu"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-[10px] font-mono tracking-[0.15em] uppercase font-medium">Close</span>
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col justify-center px-8 py-8 overflow-y-auto space-y-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `group flex items-baseline gap-4 py-2.5 border-b border-border-subtle/30 hover:pl-2 transition-all duration-200 ${
                isActive ? 'text-accent-solid font-semibold' : 'text-text-muted hover:text-text-primary'
              }`
            }
          >
            <span className="text-[10px] font-mono tabular-nums text-text-muted/50 w-6 shrink-0 group-hover:text-accent-solid transition-colors">
              {item.num}
            </span>
            <span className="text-xl font-mono tracking-wide uppercase">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-8 py-5 border-t border-border-subtle shrink-0">
        <p className="text-[9px] font-mono tracking-[0.2em] text-text-muted uppercase">
          THREATLENS — CYBER INTELLIGENCE SYSTEM
        </p>
      </div>
    </div>
  );
}
