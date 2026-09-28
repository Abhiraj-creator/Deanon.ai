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
  Settings 
} from 'lucide-react';
import { Logo } from './Logo';

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
        <Logo size={32} />
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
      

    </aside>
  );
};

export default Sidebar;
