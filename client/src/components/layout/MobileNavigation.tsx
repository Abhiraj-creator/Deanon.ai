import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { NAV_ITEMS } from '../../lib/routeConfig';

type Props = { open: boolean; onClose: () => void };

export function MobileNavigation({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] md:hidden bg-canvas animate-fade-in">
      <div className="flex justify-end p-4">
        <button type="button" onClick={onClose} className="meta-label flex items-center gap-2 text-text-secondary" aria-label="Close menu">
          <X className="w-5 h-5" /> Close
        </button>
      </div>
      <nav className="px-8 pt-8 space-y-6">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `block border-l-2 pl-4 py-2 transition-colors ${
                isActive ? 'border-accent-solid text-text-primary' : 'border-border-subtle text-text-muted hover:text-accent-solid'
              }`
            }
          >
            <span className="block text-xs text-text-muted mb-1">{item.num}</span>
            <span className="text-2xl font-light tracking-tight uppercase">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
