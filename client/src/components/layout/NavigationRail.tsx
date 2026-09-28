import React from 'react';
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

import { Logo } from '../Logo';

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
      className="group/rail hidden md:flex flex-col h-full w-[76px] hover:w-[220px] transition-[width] duration-300 ease-out bg-sidebar border-r border-border-subtle overflow-hidden shrink-0 z-30"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-border-subtle shrink-0 overflow-hidden">
        <div className="flex items-center gap-3 leading-none whitespace-nowrap">
          <Logo variant="icon" size={32} />
          <span className="opacity-0 group-hover/rail:opacity-100 transition-opacity duration-200 text-xs font-bold tracking-wider text-text-primary font-sans">
            DeAnon<span className="text-accent-solid">.Ai</span>
          </span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map((item, i) => {
          const Icon = icons[i];
          const isSettings = item.path === '/settings';
          return (
            <React.Fragment key={item.path}>
              {/* Visual separator before Settings */}
              {isSettings && <div className="mx-4 h-px bg-border-subtle opacity-50 my-2" />}
              <NavLink
                to={item.path}
                title={item.name}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 pl-[22px] pr-4 py-2.5 text-xs transition-all duration-200 border-l-2 group/navitem ${
                    isActive
                      ? 'border-accent-solid text-text-primary bg-accent-soft/20 font-semibold'
                      : 'border-transparent text-text-muted hover:text-accent-solid hover:border-accent-border/60 hover:bg-accent-soft/10'
                  }`
                }
              >
                {/* Number */}
                <span className="text-[9px] tabular-nums font-medium text-text-muted/60 w-4 shrink-0 group-hover/navitem:text-text-muted transition-colors">
                  {item.num}
                </span>
                {/* Icon */}
                <Icon className="w-[17px] h-[17px] shrink-0 transition-colors" strokeWidth={1.5} />
                {/* Label — hidden when collapsed */}
                <span className="whitespace-nowrap opacity-0 group-hover/rail:opacity-100 transition-opacity duration-200 font-medium tracking-[0.06em] text-[11px] uppercase">
                  {item.name}
                </span>
              </NavLink>
            </React.Fragment>
          );
        })}
      </nav>
    </aside>
  );
}
