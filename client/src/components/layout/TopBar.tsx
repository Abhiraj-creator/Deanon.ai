import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search as SearchIcon, ChevronDown, LogOut, Settings, User, Menu } from 'lucide-react';
import { getSectionMeta } from '../../lib/routeConfig';

type TopBarProps = {
  onOpenMobileMenu?: () => void;
};

export function TopBar({ onOpenMobileMenu }: TopBarProps) {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const section = getSectionMeta(location.pathname);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate('/analysis');
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="h-14 md:h-16 bg-surface/80 backdrop-blur-sm border-b border-border-subtle flex items-center justify-between gap-4 px-4 md:px-6 relative z-50 shrink-0">
      <div className="flex items-center gap-4 min-w-0">
        <button
          type="button"
          className="md:hidden p-2 text-text-muted hover:text-text-primary transition-colors"
          onClick={onOpenMobileMenu}
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono tracking-[0.15em] uppercase text-text-muted shrink-0">
          <span className="text-accent-solid font-semibold">{section.index}</span>
          <span>/</span>
          <span className="text-text-primary font-medium">{section.label}</span>
        </div>
      </div>

      <form onSubmit={handleSearch} className="relative flex-1 max-w-lg">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" strokeWidth={1.5} />
        <input
          ref={searchRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-14 py-1.5 bg-canvas-deep border border-border-subtle rounded-[4px] text-xs font-mono text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent-border transition-all"
          placeholder="Search actors, PGP keys, wallets, domains..."
          aria-label="Global search"
        />
        <kbd className="hidden md:inline-flex absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono text-text-muted/70 bg-card border border-border-subtle px-1.5 py-0.5 rounded-[3px] pointer-events-none">
          ⌘K
        </kbd>
      </form>

      <div className="flex items-center gap-4 shrink-0" ref={menuRef}>
        <div className="hidden lg:flex items-center gap-2 text-[9px] font-mono tracking-[0.2em] uppercase text-text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-solid animate-pulse-subtle shadow-[0_0_8px_rgba(57,255,104,0.6)]" />
          <span>Intelligence Online</span>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 p-1 rounded-[4px] hover:bg-card-hover transition-colors"
            aria-expanded={menuOpen}
          >
            <div className="w-7 h-7 rounded-[4px] border border-border-strong bg-card flex items-center justify-center text-xs font-mono font-semibold text-accent-solid">
              A
            </div>
            <ChevronDown className={`hidden sm:block w-3.5 h-3.5 text-text-muted transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
          </button>

          {menuOpen && (
            <div className="absolute top-11 right-0 w-48 bg-panel border border-border-subtle rounded-[4px] py-1 shadow-2xl z-50">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/profile');
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-mono text-text-secondary hover:bg-card-hover hover:text-text-primary transition-colors text-left"
              >
                <User className="w-3.5 h-3.5 text-accent-solid" strokeWidth={1.5} /> My Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/settings');
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-mono text-text-secondary hover:bg-card-hover hover:text-text-primary transition-colors text-left"
              >
                <Settings className="w-3.5 h-3.5 text-accent-solid" strokeWidth={1.5} /> Settings
              </button>
              <hr className="border-border-subtle my-1 opacity-50" />
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/');
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-mono text-status-red hover:bg-status-red-bg transition-colors text-left"
              >
                <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
