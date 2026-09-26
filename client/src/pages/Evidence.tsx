import { useState } from 'react';
import { Eye, Download, Search, Filter, X } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ConfidencePill } from '../components/ui/Badges';
import { mockEvidence } from '../mocks/data';

const TYPE_COLORS: Record<string, { color: string; bg: string }> = {
  'PGP Key':    { color: 'text-status-blue',   bg: 'bg-status-blue/10' },
  'Certificate':{ color: 'text-status-purple', bg: 'bg-status-purple/10' },
  'Transaction':{ color: 'text-status-orange', bg: 'bg-status-orange/10' },
  'Text Sample':{ color: 'text-accent-link',   bg: 'bg-accent-soft/20' },
  'Screenshot': { color: 'text-status-green',  bg: 'bg-status-green/10' },
};

const ALL_TYPES = ['PGP Key', 'Certificate', 'Transaction', 'Text Sample', 'Screenshot'];
const ALL_ACTORS = ['DarkVendorX', 'SilentCrow', 'AlphaBay_Seller', 'EvilCore'];

const EvidenceModal = ({ item, onClose }: { item: typeof mockEvidence[0]; onClose: () => void }) => {
  const ts = TYPE_COLORS[item.type] ?? { color: 'text-text-muted', bg: 'bg-border-subtle' };
  const handleDownload = () => {
    const blob = new Blob([item.raw], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `evidence_${item.id}.txt`; a.click();
  };
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border-subtle rounded-xl w-full max-w-2xl shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${ts.color} ${ts.bg}`}>{item.type}</span>
            <span className="font-bold text-text-primary">Evidence Detail</span>
            <ConfidencePill level={item.confidence} />
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary p-1 rounded hover:bg-card-hover"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div><span className="text-text-muted text-xs block mb-1">Source</span><span className="text-text-primary font-medium">{item.source}</span></div>
            <div><span className="text-text-muted text-xs block mb-1">Date</span><span className="text-text-primary font-medium">{item.date}</span></div>
            <div><span className="text-text-muted text-xs block mb-1">Actor</span><span className="text-text-primary font-medium">{item.actor}</span></div>
          </div>
          <div>
            <span className="text-text-muted text-xs uppercase tracking-wider block mb-1">Description</span>
            <p className="text-text-secondary text-sm">{item.description}</p>
          </div>
          <div>
            <span className="text-text-muted text-xs uppercase tracking-wider block mb-2">Raw Artifact</span>
            <pre className="p-4 bg-canvas-dark border border-border-subtle rounded-lg text-xs text-status-green font-mono whitespace-pre-wrap overflow-x-auto max-h-48">{item.raw}</pre>
          </div>
        </div>
        <div className="p-4 border-t border-border-subtle flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button onClick={handleDownload}><Download className="w-4 h-4 mr-2" />Download Artifact</Button>
        </div>
      </div>
    </div>
  );
};

const Evidence = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [actorFilter, setActorFilter] = useState('All');
  const [selected, setSelected] = useState<typeof mockEvidence[0] | null>(null);

  const filtered = mockEvidence.filter(e => {
    const matchSearch = e.description.toLowerCase().includes(search.toLowerCase()) || e.source.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All' || e.type === typeFilter;
    const matchActor = actorFilter === 'All' || e.actor === actorFilter;
    return matchSearch && matchType && matchActor;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-text-primary font-bold">Evidence</h1>
          <p className="text-text-secondary mt-1">View and download supporting evidence for all correlations and claims.</p>
        </div>
        <Button onClick={() => {
          const csv = ['ID,Type,Description,Source,Date,Actor,Confidence', ...filtered.map(e => `${e.id},${e.type},"${e.description}",${e.source},${e.date},${e.actor},${e.confidence}`)].join('\n');
          const b = new Blob([csv], { type: 'text/csv' }); const u = URL.createObjectURL(b);
          const a = document.createElement('a'); a.href = u; a.download = 'evidence.csv'; a.click();
        }}>
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search evidence..."
            className="pl-9 pr-3 py-2 text-sm bg-input border border-border-subtle rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-border w-60"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-text-muted" />
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
            className="bg-card border border-border-subtle text-text-primary text-sm rounded-lg p-2 focus:border-accent-border">
            <option>All</option>
            {ALL_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
          <select value={actorFilter} onChange={e => setActorFilter(e.target.value)}
            className="bg-card border border-border-subtle text-text-primary text-sm rounded-lg p-2 focus:border-accent-border">
            <option>All</option>
            {ALL_ACTORS.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
        <span className="text-xs text-text-muted">{filtered.length} records</span>
      </div>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-subtle bg-canvas-dark">
              {['Type', 'Description', 'Actor', 'Source', 'Date', 'Confidence', 'Action'].map(h => (
                <th key={h} className={`py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider ${h === 'Action' ? 'text-right' : ''}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filtered.map((item) => {
              const ts = TYPE_COLORS[item.type] ?? { color: 'text-text-muted', bg: 'bg-border-subtle' };
              return (
                <tr key={item.id} className="hover:bg-card-hover transition-colors">
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${ts.color} ${ts.bg}`}>{item.type}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-text-primary max-w-xs truncate">{item.description}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{item.actor}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{item.source}</td>
                  <td className="py-3 px-4 text-sm text-text-muted">{item.date}</td>
                  <td className="py-3 px-4"><ConfidencePill level={item.confidence} /></td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" onClick={() => setSelected(item)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-text-muted">No evidence matches your filters.</div>
        )}
      </Card>

      {selected && <EvidenceModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default Evidence;
