import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, ChevronDown, LogOut, Settings, User } from 'lucide-react';

const Topbar = () => {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate('/analysis');
    }
  };

  const handleLogout = () => {
    setMenuOpen(false);
    navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="h-16 bg-surface border-b border-border-subtle flex items-center justify-between px-6 relative z-50">
      {/* Global Search */}
      <div className="flex-1 max-w-xl">
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-4 w-4 text-text-muted" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-border-subtle rounded-lg leading-5 bg-input text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-accent-border focus:border-accent-border sm:text-sm transition-colors"
            placeholder="Search actors, PGP keys, wallets, domains..."
          />
        </form>
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-3 ml-4" ref={menuRef}>
        {/* Pulse badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-green/10 border border-status-green/20">
          <span className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse" />
          <span className="text-xs text-status-green font-medium">Live</span>
        </div>

        {/* Avatar button */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2 cursor-pointer hover:bg-card-hover px-2 py-1.5 rounded-lg transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-accent-solid flex items-center justify-center text-white font-semibold text-sm">
            A
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-medium text-text-primary leading-tight">Analyst</span>
            <span className="text-[10px] text-text-muted">Admin</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute top-14 right-4 w-48 bg-card border border-border-subtle rounded-xl shadow-2xl py-1 animate-fade-in">
            <button
              onClick={() => { setMenuOpen(false); navigate('/profile'); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-card-hover hover:text-text-primary transition-colors"
            >
              <User className="w-4 h-4" />
              My Profile
            </button>
            <button
              onClick={() => { setMenuOpen(false); navigate('/settings'); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-card-hover hover:text-text-primary transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <div className="border-t border-border-subtle my-1" />
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-status-red hover:bg-status-red/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
