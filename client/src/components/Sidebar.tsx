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
  ShieldAlert
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Actors', path: '/actors', icon: Users },
  { name: 'Relationships', path: '/relationships', icon: Share2 },
  { name: 'Infrastructure', path: '/infrastructure', icon: Server },
  { name: 'Sources', path: '/sources', icon: Database },
  { name: 'Analysis', path: '/analysis', icon: Radar },
  { name: 'Evidence', path: '/evidence', icon: FolderCheck },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="w-[230px] h-full bg-sidebar border-r border-border-subtle flex flex-col">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 mb-4">
        <ShieldAlert className="w-6 h-6 text-accent-solid mr-2" />
        <span className="text-white font-bold text-base tracking-wide">ThreatLens</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 rounded-lg text-sm transition-colors duration-200 ${
                  isActive
                    ? 'bg-accent-soft text-white border-l-2 border-accent-solid'
                    : 'text-text-secondary hover:bg-card-hover'
                }`
              }
            >
              <Icon className="w-[18px] h-[18px] mr-3" strokeWidth={1.5} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
      
      {/* Footer Info */}
      <div className="p-4 border-t border-border-subtle">
        <div className="text-[11px] text-text-muted text-center uppercase tracking-wider">
          NTRO Project 26151
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
