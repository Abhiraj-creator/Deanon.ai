import React, { useState } from 'react';
import { MoreHorizontal, Search, Plus, RefreshCw, Pause, Activity, Database, Wifi } from 'lucide-react';
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
    <div className="fixed inset-0 bg-canvas/80 backdrop-blur-md flex items-center justify-center z-50 p-4 font-mono">
      <div className="bg-surface border border-border-subtle rounded-[6px] w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border-subtle">
          <h2 className="font-semibold text-text-primary text-sm uppercase tracking-wider">// ADD INTELLIGENCE SOURCE</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary text-xs">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="text-[10px] text-text-muted uppercase tracking-wider block mb-1.5">Source Name *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required
              placeholder="e.g., BreachForums"
              className="w-full px-3 py-2 bg-canvas-deep border border-border-subtle rounded-[4px] text-text-primary font-mono focus:outline-none focus:border-accent-border text-xs" />
          </div>
          <div>
            <label className="text-[10px] text-text-muted uppercase tracking-wider block mb-1.5">Source Type</label>
            <select value={type} onChange={e => setType(e.target.value)}
              className="w-full px-3 py-2 bg-canvas-deep border border-border-subtle rounded-[4px] text-text-primary font-mono focus:outline-none focus:border-accent-border text-xs">
              {SOURCE_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-text-muted uppercase tracking-wider block mb-1.5">Feed Endpoint</label>
            <input type="text" value={url} onChange={e => setUrl(e.target.value)}
              placeholder="tor://... or https://..."
              className="w-full px-3 py-2 bg-canvas-deep border border-border-subtle rounded-[4px] text-text-primary font-mono focus:outline-none focus:border-accent-border text-xs" />
          </div>
          <div>
            <label className="text-[10px] text-text-muted uppercase tracking-wider block mb-1.5">Auth Token (optional)</label>
            <input type="password" value={token} onChange={e => setToken(e.target.value)}
              placeholder="API Key or Token"
              className="w-full px-3 py-2 bg-canvas-deep border border-border-subtle rounded-[4px] text-text-primary font-mono focus:outline-none focus:border-accent-border text-xs" />
          </div>
          <div className="pt-2 flex gap-3 justify-end">
            <Button variant="secondary" type="button" onClick={onClose} className="text-xs uppercase font-mono">Cancel</Button>
            <Button type="submit" disabled={!name.trim()} className="text-xs uppercase font-mono">Add Source</Button>
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
  <div className="fixed inset-0 bg-canvas/80 backdrop-blur-md flex items-center justify-center z-50 p-4 font-mono">
    <div className="bg-surface border border-border-subtle rounded-[6px] w-full max-w-md shadow-2xl">
      <div className="flex items-center justify-between p-5 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <Database className="w-4 h-4 text-accent-solid" strokeWidth={1.5} />
          <h2 className="font-semibold text-text-primary text-sm uppercase">{source.name}</h2>
          <StatusDot status={source.status as any} />
        </div>
        <button onClick={onClose} className="text-text-muted hover:text-text-primary text-xs">✕</button>
      </div>
      <div className="p-5 space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'TYPE', val: source.type },
            { label: 'STATUS', val: source.status },
            { label: 'LAST COLLECTED', val: source.lastCollected },
            { label: 'RECORDS INGESTED', val: source.records.toLocaleString() },
          ].map(f => (
            <div key={f.label}>
              <span className="text-[10px] text-text-muted uppercase block mb-0.5">{f.label}</span>
              <span className="text-text-primary font-semibold">{f.val}</span>
            </div>
          ))}
        </div>
        <div>
          <span className="text-[10px] text-text-muted uppercase block mb-1">ENDPOINT</span>
          <code className="text-xs text-accent-solid bg-canvas-deep px-2.5 py-1 rounded-[3px] border border-border-subtle block break-all font-mono">{source.feedUrl}</code>
        </div>
      </div>
      <div className="p-4 border-t border-border-subtle flex justify-end gap-3">
        <Button variant="secondary" onClick={() => { onPause(); onClose(); }} className="text-xs uppercase font-mono">
          <Pause className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} /> Pause Feed
        </Button>
        <Button onClick={() => { onCollect(); onClose(); }} disabled={source.collecting} className="text-xs uppercase font-mono">
          <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${source.collecting ? 'animate-spin' : ''}`} strokeWidth={1.5} />
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
    }, 2000);
  };

  const triggerPause = (id: string) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Online' ? 'Paused' : 'Online' } : s));
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans selection:bg-accent-soft selection:text-accent-solid">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <p className="text-[10px] font-mono tracking-[0.25em] text-accent-solid uppercase mb-1">// 05 SOURCES</p>
          <h1 className="text-xl font-mono font-bold text-text-primary uppercase tracking-wide">
            INTELLIGENCE SOURCE MANAGEMENT
          </h1>
        </div>
        <Button onClick={() => setShowAdd(true)} className="h-9 font-mono text-xs uppercase tracking-wider">
          <Plus className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} /> Add Source
        </Button>
      </div>

      {/* Health Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
        {[
          { label: 'TOTAL SOURCES', val: sources.length, icon: Database, color: 'text-accent-solid' },
          { label: 'ONLINE FEEDS', val: onlineCount, icon: Wifi, color: 'text-status-green' },
          { label: 'TOTAL RECORDS', val: totalRecords.toLocaleString(), icon: Activity, color: 'text-status-blue' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-surface border border-border-subtle p-5 rounded-[6px] flex items-center gap-4">
              <Icon className={`w-5 h-5 ${s.color} shrink-0`} strokeWidth={1.5} />
              <div>
                <div className="text-2xl font-bold text-text-primary tabular-nums">{s.val}</div>
                <div className="text-[9px] text-text-muted uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-sm font-mono">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" strokeWidth={1.5} />
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Filter sources..."
          className="w-full pl-9 pr-3 py-2 bg-canvas-deep border border-border-subtle rounded-[4px] text-xs font-mono text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent-border"
        />
      </div>

      {/* Table */}
      <div className="bg-surface border border-border-subtle rounded-[6px] overflow-hidden font-mono text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-subtle text-[10px] text-text-muted uppercase tracking-widest bg-canvas-deep">
                <th className="py-3 px-5">Source Name</th>
                <th className="py-3 px-5">Type</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Records</th>
                <th className="py-3 px-5">Last Ingested</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/50">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-card-hover/40 transition-colors cursor-pointer" onClick={() => setSelected(s)}>
                  <td className="py-3.5 px-5 font-semibold text-text-primary">{s.name}</td>
                  <td className="py-3.5 px-5 text-text-secondary">{s.type}</td>
                  <td className="py-3.5 px-5">
                    {s.collecting ? (
                      <div className="flex items-center gap-2 text-accent-solid text-[10px]">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" strokeWidth={1.5} />
                        <span>COLLECTING…</span>
                      </div>
                    ) : (
                      <StatusDot status={s.status as any} />
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-text-secondary tabular-nums">{s.records.toLocaleString()}</td>
                  <td className="py-3.5 px-5 text-text-muted">{s.lastCollected}</td>
                  <td className="py-3.5 px-5 text-right" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" title="Collect Now" onClick={() => triggerCollect(s.id)} disabled={!!s.collecting} className="p-1.5">
                        <RefreshCw className={`w-3.5 h-3.5 ${s.collecting ? 'animate-spin text-accent-solid' : 'text-text-muted hover:text-text-primary'}`} strokeWidth={1.5} />
                      </Button>
                      <Button variant="ghost" title="More" onClick={() => setSelected(s)} className="p-1.5">
                        <MoreHorizontal className="w-3.5 h-3.5 text-text-muted hover:text-text-primary" strokeWidth={1.5} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
