import { useState } from 'react';
import { MoreHorizontal, Search, Plus, X, RefreshCw, Pause, Activity, Database, Wifi } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusDot } from '../components/ui/Badges';
import { mockSources } from '../mocks/data';

type Source = {
  id: string; name: string; type: string; status: string;
  lastCollected: string; records: number; feedUrl: string;
  collecting?: boolean;
};

const SOURCE_TYPES = ['Forum', 'Marketplace', 'Leak Site', 'Manual Entry', 'RSS/Feed', 'Blockchain Monitor'];

const AddSourceModal = ({ onClose, onAdd }: { onClose: () => void; onAdd: (s: Source) => void }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState(SOURCE_TYPES[0]);
  const [url, setUrl] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({
      id: `s_${Date.now()}`, name: name.trim(), type, status: 'Online',
      lastCollected: 'Just now', records: 0, feedUrl: url || 'manual',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border-subtle rounded-xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border-subtle">
          <h2 className="font-bold text-text-primary">Add Intelligence Source</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs text-text-muted uppercase tracking-wider block mb-1.5">Source Name *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required
              placeholder="e.g., BreachForums"
              className="w-full px-3 py-2.5 bg-input border border-border-subtle rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-border text-sm" />
          </div>
          <div>
            <label className="text-xs text-text-muted uppercase tracking-wider block mb-1.5">Source Type</label>
            <select value={type} onChange={e => setType(e.target.value)}
              className="w-full px-3 py-2.5 bg-input border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-accent-border text-sm">
              {SOURCE_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-text-muted uppercase tracking-wider block mb-1.5">Feed URL / Endpoint</label>
            <input type="text" value={url} onChange={e => setUrl(e.target.value)}
              placeholder="tor://... or https://..."
              className="w-full px-3 py-2.5 bg-input border border-border-subtle rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-border text-sm font-mono" />
          </div>
          <div>
            <label className="text-xs text-text-muted uppercase tracking-wider block mb-1.5">Auth Token <span className="normal-case">(optional)</span></label>
            <input type="password" value={token} onChange={e => setToken(e.target.value)}
              placeholder="Bearer token or API key"
              className="w-full px-3 py-2.5 bg-input border border-border-subtle rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-border text-sm" />
          </div>
          <div className="pt-2 flex gap-3 justify-end">
            <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={!name.trim()}>Add Source</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DetailModal = ({ source, onClose, onCollect, onPause }: {
  source: Source; onClose: () => void;
  onCollect: () => void; onPause: () => void;
}) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
    <div className="bg-card border border-border-subtle rounded-xl w-full max-w-md shadow-2xl">
      <div className="flex items-center justify-between p-5 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-accent-solid" />
          <h2 className="font-bold text-text-primary">{source.name}</h2>
          <StatusDot status={source.status as any} />
        </div>
        <button onClick={onClose} className="text-text-muted hover:text-text-primary"><X className="w-4 h-4" /></button>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            { label: 'Type', val: source.type },
            { label: 'Status', val: source.status },
            { label: 'Last Collected', val: source.lastCollected },
            { label: 'Total Records', val: source.records.toLocaleString() },
          ].map(f => (
            <div key={f.label}>
              <span className="text-xs text-text-muted block mb-0.5">{f.label}</span>
              <span className="text-text-primary font-medium">{f.val}</span>
            </div>
          ))}
        </div>
        <div>
          <span className="text-xs text-text-muted block mb-1">Feed URL</span>
          <code className="text-xs text-accent-link bg-canvas-dark px-2 py-1 rounded border border-border-subtle block break-all">{source.feedUrl}</code>
        </div>
        <p className="text-sm text-text-secondary">
          This source streams intelligence on a scheduled cycle. Use the controls below to manually trigger a collection or pause the feed.
        </p>
      </div>
      <div className="p-4 border-t border-border-subtle flex justify-end gap-3">
        <Button variant="secondary" onClick={() => { onPause(); onClose(); }}>
          <Pause className="w-4 h-4 mr-2" /> Pause
        </Button>
        <Button onClick={() => { onCollect(); onClose(); }} disabled={source.collecting}>
          <RefreshCw className={`w-4 h-4 mr-2 ${source.collecting ? 'animate-spin' : ''}`} />
          {source.collecting ? 'Collecting…' : 'Collect Now'}
        </Button>
      </div>
    </div>
  </div>
);

const Sources = () => {
  const [sources, setSources] = useState<Source[]>(mockSources as Source[]);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState<Source | null>(null);

  const filtered = sources.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.type.toLowerCase().includes(search.toLowerCase())
  );

  const onlineCount = sources.filter(s => s.status === 'Online').length;
  const totalRecords = sources.reduce((sum, s) => sum + s.records, 0);

  const triggerCollect = (id: string) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, collecting: true } : s));
    setTimeout(() => {
      setSources(prev => prev.map(s =>
        s.id === id ? { ...s, collecting: false, lastCollected: 'Just now', records: s.records + Math.floor(Math.random() * 500 + 50) } : s
      ));
    }, 2500);
  };

  const triggerPause = (id: string) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Online' ? 'Paused' : 'Online' } : s));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-text-primary font-bold">Sources</h1>
          <p className="text-text-secondary mt-1">Manage intelligence sources and collection pipelines.</p>
        </div>
        <Button onClick={() => setShowAdd(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Source
        </Button>
      </div>

      {/* Health Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Sources', val: sources.length, icon: Database, color: 'text-accent-solid', bg: 'bg-accent-soft/20' },
          { label: 'Online', val: onlineCount, icon: Wifi, color: 'text-status-green', bg: 'bg-status-green/10' },
          { label: 'Total Records Collected', val: totalRecords.toLocaleString(), icon: Activity, color: 'text-status-blue', bg: 'bg-status-blue/10' },
        ].map(s => (
          <Card key={s.label} className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${s.bg}`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <div className="text-2xl font-bold text-text-primary">{s.val}</div>
              <div className="text-xs text-text-muted">{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Filter sources..."
          className="pl-9 pr-3 py-2 text-sm bg-input border border-border-subtle rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-border w-full" />
      </div>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-subtle bg-canvas-dark">
              {['Source Name', 'Type', 'Status', 'Records', 'Last Collected', 'Actions'].map(h => (
                <th key={h} className={`py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider ${h === 'Actions' ? 'text-right' : ''}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-card-hover transition-colors cursor-pointer" onClick={() => setSelected(s)}>
                <td className="py-3 px-4 text-sm font-semibold text-text-primary">{s.name}</td>
                <td className="py-3 px-4 text-sm text-text-secondary">{s.type}</td>
                <td className="py-3 px-4">
                  {s.collecting ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 text-accent-link animate-spin" />
                      <span className="text-xs text-accent-link font-medium">Collecting…</span>
                    </div>
                  ) : (
                    <StatusDot status={s.status as any} />
                  )}
                </td>
                <td className="py-3 px-4 text-sm text-text-secondary font-mono">{s.records.toLocaleString()}</td>
                <td className="py-3 px-4 text-sm text-text-muted">{s.lastCollected}</td>
                <td className="py-3 px-4 text-right" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" title="Collect Now" onClick={() => triggerCollect(s.id)} disabled={!!s.collecting}>
                      <RefreshCw className={`w-4 h-4 ${s.collecting ? 'animate-spin text-accent-link' : ''}`} />
                    </Button>
                    <Button variant="ghost" title="More" onClick={() => setSelected(s)}>
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-text-muted">No sources match your filter.</div>
        )}
      </Card>

      {showAdd && (
        <AddSourceModal
          onClose={() => setShowAdd(false)}
          onAdd={s => setSources(prev => [...prev, s])}
        />
      )}
      {selected && (
        <DetailModal
          source={selected}
          onClose={() => setSelected(null)}
          onCollect={() => triggerCollect(selected.id)}
          onPause={() => triggerPause(selected.id)}
        />
      )}
    </div>
  );
};

export default Sources;
