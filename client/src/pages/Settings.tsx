import { useState } from 'react';
import { Card } from '../components/ui/Card';

const Toggle = ({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) => {
  return (
    <div 
      className={`w-10 h-5 rounded-full flex items-center cursor-pointer px-0.5 transition-colors duration-200 ${isOn ? 'bg-accent-solid' : 'bg-[#232A3A]'}`}
      onClick={onToggle}
    >
      <div className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${isOn ? 'translate-x-5' : 'translate-x-0'}`} />
    </div>
  );
};

const Settings = () => {
  const [autoCollect, setAutoCollect] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-text-primary font-bold">Settings</h1>
        <p className="text-text-secondary mt-1">Configure system preferences.</p>
      </div>

      <div className="border-b border-border-subtle flex space-x-6">
        {['General', 'Collection', 'Analysis', 'Security'].map((tab, i) => (
          <button
            key={tab}
            className={`pb-3 font-medium text-sm transition-colors ${
              i === 0 ? 'text-accent-link border-b-2 border-accent-link' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <Card className="p-0">
        <div className="divide-y divide-border-subtle">
          
          {/* Setting Row */}
          <div className="flex items-center justify-between p-6 hover:bg-card-hover transition-colors">
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Autonomous Collection Mode</h3>
              <p className="text-xs text-text-muted mt-1">Automatically collect and process new data</p>
            </div>
            <Toggle isOn={autoCollect} onToggle={() => setAutoCollect(!autoCollect)} />
          </div>

          {/* Setting Row */}
          <div className="flex items-center justify-between p-6 hover:bg-card-hover transition-colors">
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
              <p className="text-xs text-text-muted mt-1">Alert on new high-confidence correlations</p>
            </div>
            <Toggle isOn={notifications} onToggle={() => setNotifications(!notifications)} />
          </div>

          {/* Setting Row */}
          <div className="flex items-center justify-between p-6 hover:bg-card-hover transition-colors">
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Data Retention (days)</h3>
              <p className="text-xs text-text-muted mt-1">Maximum time to keep low-confidence data</p>
            </div>
            <select className="bg-input border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-border">
              <option>90</option>
              <option>180</option>
              <option selected>365</option>
            </select>
          </div>

          {/* Setting Row */}
          <div className="flex items-center justify-between p-6 hover:bg-card-hover transition-colors">
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Export Format (default)</h3>
              <p className="text-xs text-text-muted mt-1">Format for generating reports</p>
            </div>
            <select className="bg-input border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-border">
              <option selected>PDF</option>
              <option>CSV</option>
              <option>JSON</option>
            </select>
          </div>

        </div>
      </Card>
    </div>
  );
};

export default Settings;
