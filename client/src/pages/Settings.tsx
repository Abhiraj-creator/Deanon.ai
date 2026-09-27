import { useState } from 'react';
import { CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

type TabKey = 'General' | 'Collection' | 'Analysis' | 'Security';

type SettingValue = string | number | boolean;

type SettingRow = {
  key: string;
  label: string;
  description: string;
  type: 'toggle' | 'select';
  options?: string[];
  value: SettingValue;
};

const defaultSettings = {
  autoCollect: true,
  notifications: true,
  autoEnrich: true,
  retention: '365',
  exportFormat: 'PDF',
  confidenceThreshold: '82%',
  anomalySensitivity: 'Medium',
  explainabilityMode: 'On',
  sessionTimeout: '30 minutes',
  require2FA: true,
  auditLogging: true,
};

const Toggle = ({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) => {
  return (
    <button
      type="button"
      aria-label="Toggle setting"
      className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors duration-200 ${isOn ? 'bg-accent-solid' : 'bg-[#232A3A]'}`}
      onClick={onToggle}
    >
      <div className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${isOn ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
};

const tabLabels: TabKey[] = ['General', 'Collection', 'Analysis', 'Security'];

const Settings = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('General');
  const [settings, setSettings] = useState(defaultSettings);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const updateSetting = <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSavedAt(null);
  };

  const sectionConfig: Record<TabKey, SettingRow[]> = {
    General: [
      { key: 'autoCollect', label: 'Autonomous Collection Mode', description: 'Automatically collect and process new data feeds', type: 'toggle', value: settings.autoCollect },
      { key: 'notifications', label: 'Notifications', description: 'Alert on new high-confidence correlations', type: 'toggle', value: settings.notifications },
      { key: 'autoEnrich', label: 'Auto Enrichment', description: 'Attach known aliases and IOC metadata in real time', type: 'toggle', value: settings.autoEnrich },
    ],
    Collection: [
      { key: 'retention', label: 'Data Retention (days)', description: 'Maximum time to keep low-confidence data', type: 'select', options: ['30', '90', '180', '365'], value: settings.retention },
      { key: 'exportFormat', label: 'Export Format (default)', description: 'Format for generating reports', type: 'select', options: ['PDF', 'CSV', 'JSON'], value: settings.exportFormat },
      { key: 'auditLogging', label: 'Audit Logging', description: 'Persist every analyst action and system change', type: 'toggle', value: settings.auditLogging },
    ],
    Analysis: [
      { key: 'confidenceThreshold', label: 'Confidence Threshold', description: 'Minimum score required for auto-prioritization', type: 'select', options: ['70%', '75%', '82%', '90%'], value: settings.confidenceThreshold },
      { key: 'anomalySensitivity', label: 'Anomaly Sensitivity', description: 'Balance false positives versus deeper detection', type: 'select', options: ['Low', 'Medium', 'High'], value: settings.anomalySensitivity },
      { key: 'explainabilityMode', label: 'Explainability Mode', description: 'Show evidence overlays while reviewing matches', type: 'select', options: ['Off', 'On', 'Strict'], value: settings.explainabilityMode },
    ],
    Security: [
      { key: 'require2FA', label: 'Require 2FA', description: 'Protect privileged investigation actions', type: 'toggle', value: settings.require2FA },
      { key: 'sessionTimeout', label: 'Session Timeout', description: 'Auto-lock idle investigation sessions', type: 'select', options: ['15 minutes', '30 minutes', '60 minutes', '2 hours'], value: settings.sessionTimeout },
      { key: 'auditLogging', label: 'Security Audit Trail', description: 'Keep a tamper-resistant record of all access', type: 'toggle', value: settings.auditLogging },
    ],
  };

  const handleSave = () => {
    setSavedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setSavedAt(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl text-text-primary font-bold">Settings</h1>
          <p className="text-text-secondary mt-1">Configure system preferences for the analyst workspace.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border-subtle bg-card px-3 py-1.5 text-xs text-text-muted">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Live config
        </div>
      </div>

      <div className="border-b border-border-subtle flex flex-wrap gap-2 sm:gap-6">
        {tabLabels.map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-medium text-sm transition-colors ${
              activeTab === tab
                ? 'text-accent-link border-b-2 border-accent-link'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <Card className="p-0">
        <div className="divide-y divide-border-subtle">
          {sectionConfig[activeTab].map(item => (
            <div key={item.key} className="flex items-center justify-between gap-4 p-5 sm:p-6 hover:bg-card-hover transition-colors">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">{item.label}</h3>
                <p className="text-xs text-text-muted mt-1">{item.description}</p>
              </div>

              {item.type === 'toggle' ? (
                <Toggle
                  isOn={Boolean(item.value)}
                  onToggle={() => updateSetting(item.key as keyof typeof settings, !Boolean(item.value) as never)}
                />
              ) : (
                <select
                  value={String(item.value)}
                  onChange={(e) => updateSetting(item.key as keyof typeof settings, e.target.value as never)}
                  className="bg-input border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-border min-w-[140px]"
                >
                  {(item.options ?? []).map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={handleReset}>
          Reset Defaults
        </Button>
        <div className="flex items-center gap-3">
          {savedAt && (
            <div className="flex items-center gap-2 text-xs text-status-green">
              <CheckCircle2 className="w-4 h-4" />
              Saved at {savedAt}
            </div>
          )}
          <Button type="button" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
