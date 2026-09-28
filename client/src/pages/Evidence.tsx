import { useState } from 'react';
import { Eye, Download, Search, Filter, ShieldCheck, Database, UserCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ConfidencePill } from '../components/ui/Badges';
import { mockEvidence } from '../mocks/data';

const ALL_TYPES = ['PGP Key', 'Certificate', 'Transaction', 'Text Sample', 'Screenshot'];
const ALL_ACTORS = ['DarkVendorX', 'SilentCrow', 'AlphaBay_Seller', 'EvilCore'];

const EvidenceModal = ({ item, onClose }: { item: typeof mockEvidence[0]; onClose: () => void }) => {
  const handleDownload = () => {
    const blob = new Blob([item.raw], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `evidence_${item.id}.txt`; a.click();
  };

  return (
    <div className="fixed inset-0 bg-canvas/80 backdrop-blur-md flex items-center justify-center z-50 p-4 font-mono">
      <div className="bg-surface border border-border-subtle rounded-[6px] w-full max-w-2xl shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <span className="text-[10px] px-2 py-0.5 rounded-[3px] font-mono bg-accent-soft text-accent-solid border border-accent-border/40 uppercase">{item.type}</span>
            <span className="font-semibold text-text-primary text-xs uppercase">EVIDENCE DETAIL #{item.id}</span>
            <ConfidencePill level={item.confidence} />
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary text-xs">✕</button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-canvas-deep border border-border-subtle p-3 rounded-[4px]">
              <span className="text-text-muted text-[10px] uppercase block mb-1">Source</span>
              <span className="text-text-primary font-semibold">{item.source}</span>
            </div>
            <div className="bg-canvas-deep border border-border-subtle p-3 rounded-[4px]">
              <span className="text-text-muted text-[10px] uppercase block mb-1">Date</span>
              <span className="text-text-primary font-semibold">{item.date}</span>
            </div>
            <div className="bg-canvas-deep border border-border-subtle p-3 rounded-[4px]">
              <span className="text-text-muted text-[10px] uppercase block mb-1">Actor</span>
              <span className="text-text-primary font-semibold">{item.actor}</span>
            </div>
          </div>

          <div className="bg-canvas-deep border border-border-subtle p-4 rounded-[4px]">
            <span className="text-text-muted text-[10px] uppercase block mb-1">Description</span>
            <p className="text-text-secondary text-xs font-sans leading-relaxed">{item.description}</p>
          </div>

          <div className="bg-canvas-deep border border-border-subtle p-4 rounded-[4px]">
            <span className="text-text-muted text-[10px] uppercase block mb-2">Raw Artifact</span>
            <pre className="p-3 bg-surface border border-border-subtle rounded-[3px] text-xs text-accent-solid font-mono whitespace-pre-wrap overflow-x-auto max-h-52">{item.raw}</pre>
          </div>
        </div>

        <div className="p-4 border-t border-border-subtle flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} className="text-xs uppercase font-mono">Close</Button>
          <Button onClick={handleDownload} className="text-xs uppercase font-mono">
            <Download className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} /> Download Artifact
          </Button>
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

  const summary = [
    { label: 'TOTAL EVIDENCE', value: String(mockEvidence.length), icon: Database, color: 'text-accent-solid' },
    { label: 'HIGH CONFIDENCE', value: String(mockEvidence.filter(x => x.confidence === 'High').length), icon: ShieldCheck, color: 'text-status-green' },
    { label: 'UNIQUE ACTORS', value: String(new Set(mockEvidence.map(x => x.actor)).size), icon: UserCheck, color: 'text-status-orange' },
  ];

  return (
    <div className="space-y-8 animate-fade-in font-sans selection:bg-accent-soft selection:text-accent-solid">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <p className="text-[10px] font-mono tracking-[0.25em] text-accent-solid uppercase mb-1">// 07 EVIDENCE</p>
          <h1 className="text-xl font-mono font-bold text-text-primary uppercase tracking-wide">
            EVIDENCE VAULT & PROVENANCE
          </h1>
        </div>

        <Button
          className="h-9 font-mono text-xs uppercase tracking-wider"
          onClick={() => {
            const csv = ['ID,Type,Description,Source,Date,Actor,Confidence', ...filtered.map(e => `${e.id},${e.type},"${e.description}",${e.source},${e.date},${e.actor},${e.confidence}`)].join('\n');
            const b = new Blob([csv], { type: 'text/csv' });
            const u = URL.createObjectURL(b);
            const a = document.createElement('a'); a.href = u; a.download = 'evidence.csv'; a.click();
          }}
        >
          <Download className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} /> Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
        {summary.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-surface border border-border-subtle p-5 rounded-[6px] flex items-center justify-between">
              <div>
                <div className="text-[9px] text-text-muted uppercase tracking-widest">{s.label}</div>
                <div className={`mt-2 text-2xl font-bold ${s.color} tabular-nums`}>{s.value}</div>
              </div>
              <Icon className={`w-5 h-5 ${s.color}`} strokeWidth={1.5} />
            </div>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-surface border border-border-subtle p-4 rounded-[6px] flex flex-col lg:flex-row lg:items-center justify-between gap-4 font-mono text-xs">
        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" strokeWidth={1.5} />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search evidence..."
            className="w-full pl-9 pr-3 py-2 bg-canvas-deep border border-border-subtle rounded-[4px] text-xs font-mono text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent-border"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-text-muted">
            <Filter className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-wider">Type:</span>
          </div>
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="bg-canvas-deep border border-border-subtle text-text-primary text-xs rounded-[4px] px-3 py-1.5 font-mono focus:border-accent-border"
          >
            <option>All</option>
            {ALL_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>

          <span className="text-text-muted text-[10px] uppercase tracking-wider ml-2">Actor:</span>
          <select
            value={actorFilter}
            onChange={e => setActorFilter(e.target.value)}
            className="bg-canvas-deep border border-border-subtle text-text-primary text-xs rounded-[4px] px-3 py-1.5 font-mono focus:border-accent-border"
          >
            <option>All</option>
            {ALL_ACTORS.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>

        <span className="text-[10px] text-text-muted uppercase tracking-wider">{filtered.length} RECORDS MATCHED</span>
      </div>

      {/* Table */}
      <div className="bg-surface border border-border-subtle rounded-[6px] overflow-hidden font-mono text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-subtle text-[10px] text-text-muted uppercase tracking-widest bg-canvas-deep">
                <th className="py-3 px-5">Type</th>
                <th className="py-3 px-5">Description</th>
                <th className="py-3 px-5">Actor</th>
                <th className="py-3 px-5">Source</th>
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Confidence</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/50">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-card-hover/40 transition-colors">
                  <td className="py-3.5 px-5">
                    <span className="text-[9px] px-2 py-0.5 rounded-[3px] font-mono bg-canvas-deep border border-border-subtle text-accent-solid uppercase">{item.type}</span>
                  </td>
                  <td className="py-3.5 px-5 text-text-primary font-sans max-w-sm">{item.description}</td>
                  <td className="py-3.5 px-5 text-text-secondary">{item.actor}</td>
                  <td className="py-3.5 px-5 text-text-muted">{item.source}</td>
                  <td className="py-3.5 px-5 text-text-muted">{item.date}</td>
                  <td className="py-3.5 px-5">
                    <ConfidencePill level={item.confidence} />
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <Button variant="ghost" onClick={() => setSelected(item)} className="p-1.5 text-text-muted hover:text-text-primary">
                      <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <EvidenceModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default Evidence;
