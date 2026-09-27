import { useState, useRef, useEffect } from 'react';
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
    <header className="h-14 md:h-16 bg-surface/80 backdrop-blur-sm border-b border-border-subtle flex items-center gap-4 px-4 md:px-6 relative z-50 shrink-0">
      <button
        type="button"
        className="md:hidden p-2 text-text-muted hover:text-text-primary"
        onClick={onOpenMobileMenu}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <p className="hidden sm:block section-index shrink-0 mb-0">
        {section.index} / {section.label}
      </p>

      <form onSubmit={handleSearch} className="relative flex-1 max-w-xl">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" strokeWidth={1.5} />
        <input
          ref={searchRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-16 py-2 bg-transparent border border-border-subtle rounded-md text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-border transition-colors"
          placeholder="Search actors, PGP keys, wallets, domains..."
          aria-label="Global search"
        />
        <kbd className="hidden md:inline absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-text-muted border border-border-subtle px-1.5 py-0.5 rounded">
          ⌘K
        </kbd>
      </form>

      <div className="flex items-center gap-3 shrink-0" ref={menuRef}>
        <div className="hidden lg:flex items-center gap-2 text-[10px] tracking-widest uppercase text-text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-solid animate-pulse-subtle" />
          Intelligence online
        </div>
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-card-hover transition-colors"
          aria-expanded={menuOpen}
        >
          <div className="w-8 h-8 rounded-md border border-border-strong bg-card flex items-center justify-center text-sm font-medium text-text-primary">
            A
          </div>
          <ChevronDown className={`hidden sm:block w-4 h-4 text-text-muted transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
        </button>
        {menuOpen && (
          <div className="absolute top-14 right-4 w-48 bg-panel border border-border-subtle rounded-md py-1 shadow-lg">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                navigate('/profile');
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-card-hover hover:text-text-primary"
            >
              <User className="w-4 h-4" /> My Profile
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                navigate('/settings');
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-card-hover hover:text-text-primary"
            >
              <Settings className="w-4 h-4" /> Settings
            </button>
            <hr className="border-border-subtle my-1" />
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                navigate('/');
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-status-red hover:bg-status-red-bg"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
