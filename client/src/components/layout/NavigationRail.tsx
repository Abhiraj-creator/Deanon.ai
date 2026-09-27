import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Share2,
  Server,
  Database,
  Radar,
  FolderCheck,
  FileText,
  Settings,
} from 'lucide-react';
import { NAV_ITEMS } from '../../lib/routeConfig';

const icons = [
  LayoutDashboard,
  Users,
  Share2,
  Server,
  Database,
  Radar,
  FolderCheck,
  FileText,
  Settings,
];

export function NavigationRail() {
  return (
    <aside
      className="group/rail hidden md:flex flex-col h-full w-[76px] hover:w-[220px] transition-[width] duration-300 ease-out bg-sidebar border-r border-border-subtle overflow-hidden shrink-0"
      aria-label="Main navigation"
    >
      <div className="h-16 flex items-center px-4 border-b border-border-subtle shrink-0">
        <div className="leading-tight">
          <span className="block text-[10px] font-semibold tracking-[0.2em] text-text-primary">THREAT</span>
          <span className="block text-[10px] font-light tracking-[0.35em] text-accent-solid">LENS</span>
        </div>
      </div>
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map((item, i) => {
          const Icon = icons[i];
          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={item.name}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-4 py-3 text-sm transition-colors border-l-2 ${
                  isActive
                    ? 'border-accent-solid text-text-primary bg-accent-soft/40'
                    : 'border-transparent text-text-muted hover:text-accent-solid hover:border-accent-border/50'
                }`
              }
            >
              <span className="text-[10px] tabular-nums text-text-muted w-5 shrink-0 opacity-60 group-hover/rail:opacity-100">
                {item.num}
              </span>
              <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.5} />
              <span className="whitespace-nowrap opacity-0 group-hover/rail:opacity-100 transition-opacity duration-200 font-medium tracking-wide text-xs uppercase">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
