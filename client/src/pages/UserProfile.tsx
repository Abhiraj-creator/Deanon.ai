import { Shield, Mail, Phone, Clock, Activity, FileText, Search, LogOut } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';

const statItems = [
  { label: 'Reports Generated', value: '42', icon: FileText, color: 'text-accent-link' },
  { label: 'Actors Tracked', value: '187', icon: Search, color: 'text-status-green' },
  { label: 'Active Sessions', value: '3', icon: Activity, color: 'text-status-orange' },
];

const recentActivity = [
  { action: 'Generated threat intelligence report', time: '2 hours ago', type: 'report' },
  { action: 'Added new actor profile: APT-29', time: '5 hours ago', type: 'actor' },
  { action: 'Analysed 14 new data sources', time: '1 day ago', type: 'analysis' },
  { action: 'Updated infrastructure mapping', time: '2 days ago', type: 'infra' },
  { action: 'Exported evidence bundle for Case #4422', time: '3 days ago', type: 'evidence' },
];

const typeColors: Record<string, string> = {
  report: 'bg-accent-soft text-accent-link',
  actor: 'bg-status-green/10 text-status-green',
  analysis: 'bg-status-orange/10 text-status-orange',
  infra: 'bg-status-purple-bg text-status-purple',
  evidence: 'bg-status-red-bg text-status-red',
};

const UserProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl text-text-primary font-bold">My Profile</h1>
        <p className="text-text-secondary mt-1">Your account information and activity.</p>
      </div>

      {/* Profile Hero Card */}
      <Card className="p-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-solid to-accent-end flex items-center justify-center text-white font-bold text-3xl shadow-lg">
              A
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-status-green border-2 border-card" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-bold text-text-primary">Analyst</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent-soft text-accent-link border border-accent-border">
                Admin
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-status-green/10 border border-status-green/20 text-status-green">
                <span className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse" />
                Online
              </span>
            </div>
            <p className="text-text-muted text-sm mt-1">Senior Threat Intelligence Analyst</p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Mail className="w-4 h-4 text-text-muted flex-shrink-0" />
                <span>analyst@threatlens.gov.in</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Phone className="w-4 h-4 text-text-muted flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Shield className="w-4 h-4 text-text-muted flex-shrink-0" />
                <span>Clearance Level: TS/SCI</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Clock className="w-4 h-4 text-text-muted flex-shrink-0" />
                <span>Last login: Today, 09:42 AM</span>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-status-red border border-status-red/20 hover:bg-status-red/10 transition-colors flex-shrink-0"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statItems.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-5 flex items-center gap-4">
              <div className={`p-2.5 rounded-lg bg-card-hover ${s.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{s.value}</p>
                <p className="text-xs text-text-muted mt-0.5">{s.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-border-subtle">
          <h3 className="text-sm font-semibold text-text-primary">Recent Activity</h3>
        </div>
        <ul className="divide-y divide-border-subtle">
          {recentActivity.map((item, i) => (
            <li key={i} className="flex items-center justify-between px-6 py-4 hover:bg-card-hover transition-colors">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${typeColors[item.type]}`}>
                  {item.type}
                </span>
                <span className="text-sm text-text-secondary">{item.action}</span>
              </div>
              <span className="text-xs text-text-muted flex-shrink-0 ml-4">{item.time}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Account Details */}
      <Card className="p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-border-subtle">
          <h3 className="text-sm font-semibold text-text-primary">Account Details</h3>
        </div>
        <div className="divide-y divide-border-subtle">
          {[
            { label: 'Username', value: 'analyst_01' },
            { label: 'Organisation', value: 'National Intelligence Unit' },
            { label: 'Role', value: 'Administrator' },
            { label: 'Account Created', value: 'January 14, 2024' },
            { label: 'MFA Status', value: 'Enabled', highlight: true },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between px-6 py-4 hover:bg-card-hover transition-colors">
              <span className="text-sm text-text-muted">{row.label}</span>
              <span className={`text-sm font-medium ${row.highlight ? 'text-status-green' : 'text-text-primary'}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
