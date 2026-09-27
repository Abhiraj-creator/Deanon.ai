import React, { useState } from 'react';
import { CheckCircle2, SlidersHorizontal, Shield, Key, Terminal } from 'lucide-react';
import { Button } from '../components/ui/Button';

type TabKey = 'General' | 'Collection' | 'Analysis' | 'Security';

type SettingRow = {
  key: string;
  label: string;
  description: string;
  type: 'toggle' | 'select';
  options?: string[];
  value: string | number | boolean;
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
      className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors duration-200 cursor-pointer ${
        isOn ? 'bg-accent-solid shadow-[0_0_8px_rgba(57,255,104,0.4)]' : 'bg-canvas-deep border border-border-subtle'
      }`}
      onClick={onToggle}
    >
      <div className={`w-4 h-4 rounded-full transition-transform duration-200 ${
        isOn ? 'bg-canvas translate-x-5' : 'bg-text-muted translate-x-0'
      }`} />
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
      { key: 'autoCollect', label: 'Autonomous Collection Mode', description: 'Automatically collect and process new darknet intelligence feeds', type: 'toggle', value: settings.autoCollect },
      { key: 'notifications', label: 'Real-Time Threat Notifications', description: 'Alert on new high-confidence correlation discoveries', type: 'toggle', value: settings.notifications },
      { key: 'autoEnrich', label: 'Automated Metadata Enrichment', description: 'Attach known aliases and IOC metadata in real time', type: 'toggle', value: settings.autoEnrich },
    ],
    Collection: [
      { key: 'retention', label: 'Data Retention Window (Days)', description: 'Maximum period to store raw unlinked intelligence records', type: 'select', options: ['30', '90', '180', '365'], value: settings.retention },
      { key: 'exportFormat', label: 'Default Export Format', description: 'Primary file format for investigator reports', type: 'select', options: ['PDF', 'CSV', 'JSON'], value: settings.exportFormat },
      { key: 'auditLogging', label: 'Persistent Audit Logging', description: 'Record every analyst query and system state change', type: 'toggle', value: settings.auditLogging },
    ],
    Analysis: [
      { key: 'confidenceThreshold', label: 'Correlation Confidence Threshold', description: 'Minimum probability score required for automated attribution leads', type: 'select', options: ['70%', '75%', '82%', '90%'], value: settings.confidenceThreshold },
      { key: 'anomalySensitivity', label: 'Stylometric Sensitivity', description: 'Balance detection sensitivity versus false positive filtering', type: 'select', options: ['Low', 'Medium', 'High'], value: settings.anomalySensitivity },
      { key: 'explainabilityMode', label: 'Model Explainability Overlay', description: 'Show evidence breakdown while inspecting similarity matches', type: 'select', options: ['Off', 'On', 'Strict'], value: settings.explainabilityMode },
    ],
    Security: [
      { key: 'require2FA', label: 'Multi-Factor Hardware Auth', description: 'Require hardware token confirmation for sensitive exports', type: 'toggle', value: settings.require2FA },
      { key: 'sessionTimeout', label: 'Analyst Session Lockout', description: 'Automatically lock idle investigator sessions', type: 'select', options: ['15 minutes', '30 minutes', '60 minutes', '2 hours'], value: settings.sessionTimeout },
      { key: 'auditLogging', label: 'Tamper-Proof Audit Logging', description: 'Store cryptographically signed log entries in audit vault', type: 'toggle', value: settings.auditLogging },
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
    <div className="space-y-8 animate-fade-in font-sans selection:bg-accent-soft selection:text-accent-solid">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <p className="text-[10px] font-mono tracking-[0.25em] text-accent-solid uppercase mb-1">// 09 CONFIGURATION</p>
          <h1 className="text-xl font-mono font-bold text-text-primary uppercase tracking-wide">
            SYSTEM & WORKSPACE SETTINGS
          </h1>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-text-muted border border-border-subtle px-3 py-1.5 rounded-[4px] bg-canvas-deep">
          <SlidersHorizontal className="w-3.5 h-3.5 text-accent-solid" strokeWidth={1.5} />
          <span>CONFIG VERSION 2.4</span>
        </div>
      </div>

      {/* Editorial Horizontal Tabs */}
      <div className="border-b border-border-subtle font-mono text-xs">
        <div className="flex items-center gap-2">
          {tabLabels.map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 uppercase tracking-wider transition-colors relative ${
                activeTab === tab ? 'text-text-primary font-semibold' : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {tab}
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all ${activeTab === tab ? 'bg-accent-solid' : 'bg-transparent'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Settings List Container */}
      <div className="bg-surface border border-border-subtle rounded-[6px] divide-y divide-border-subtle font-mono text-xs">
        {sectionConfig[activeTab].map(item => (
          <div key={item.key} className="flex items-center justify-between gap-6 p-5 hover:bg-card-hover/40 transition-colors">
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-text-primary tracking-wide">{item.label}</h3>
              <p className="text-[11px] text-text-muted font-sans leading-relaxed">{item.description}</p>
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
                className="bg-canvas-deep border border-border-subtle rounded-[4px] px-3 py-1.5 text-xs text-text-primary font-mono focus:outline-none focus:border-accent-border min-w-[130px]"
              >
                {(item.options ?? []).map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      {/* Active Session Management Box */}
      <div className="bg-surface border border-border-subtle p-5 rounded-[6px] space-y-3 font-mono text-xs">
        <p className="text-[10px] tracking-[0.2em] text-text-muted uppercase">// ACTIVE INVESTIGATOR SESSIONS</p>
        <div className="flex items-center justify-between py-2 border-b border-border-subtle/50 text-[11px]">
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-accent-solid" strokeWidth={1.5} />
            <span className="text-text-primary font-semibold">THIS WORKSTATION (CURRENT SESSION)</span>
          </div>
          <span className="text-status-green text-[10px]">198.51.100.42 · ONLINE</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 font-mono">
        <Button type="button" variant="secondary" onClick={handleReset} className="text-xs uppercase">
          Reset Defaults
        </Button>
        <div className="flex items-center gap-4">
          {savedAt && (
            <div className="flex items-center gap-2 text-xs text-accent-solid">
              <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
              <span>SAVED AT {savedAt}</span>
            </div>
          )}
          <Button type="button" onClick={handleSave} className="text-xs uppercase font-semibold">
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
