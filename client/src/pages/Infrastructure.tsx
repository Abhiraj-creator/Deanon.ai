import React, { useState } from 'react';
import { Search, Loader2, Download, CheckCircle2, Server, Globe, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ConfidencePill } from '../components/ui/Badges';
import { mockInfraResults } from '../mocks/data';

const DEMO_CHIPS = ['darkvendx7q2k3.onion', '0xA3F9D2C', 'evilcore8x7k2.onion', 'bc1qxy2k...'];

const SCAN_HISTORY = [
  { query: 'darkvendx7q2k3.onion', date: '2026-09-24 14:32', result: 'Potential Clearnet Correlation' },
  { query: 'evilcore8x7k2.onion', date: '2026-09-23 09:15', result: 'Potential Clearnet Correlation' },
  { query: '0xA3F9D2C', date: '2026-09-22 16:45', result: 'Identifier Cross-Link' },
];

type SubTab = 'Overview' | 'Certificates' | 'Server Info' | 'Correlation Results';

const Infrastructure = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<(typeof mockInfraResults)[string] | null>(null);
  const [subTab, setSubTab] = useState<SubTab>('Overview');
  const [history, setHistory] = useState(SCAN_HISTORY);

  const handleAnalyze = (q: string = query) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setLoading(true);
    setResult(null);
    setSubTab('Overview');
    setTimeout(() => {
      const r = mockInfraResults[trimmed] ?? {
        query: trimmed,
        status: 'Unknown',
        badge: 'No Correlation Found',
        overview: { serviceBanner: 'N/A', ssl: 'N/A', serverStatus: 'Not found', lastObserved: 'N/A' },
        correlation: { clearnetDomain: 'N/A', ipAddress: 'N/A', confidence: 'Low' as const, evidence: 'No matching artifacts found in database.' },
        certificates: [],
        serverInfo: { software: 'N/A', openPorts: [], responseHeaders: {}, banner: 'No response captured.' },
        correlationResults: [],
      };
      setResult(r);
      setHistory(prev => [{
        query: trimmed,
        date: new Date().toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' }).replace(',', ''),
        result: r.badge,
      }, ...prev.slice(0, 4)]);
      setLoading(false);
    }, 1200);
  };

  const handleExport = () => {
    if (!result) return;
    const b = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const u = URL.createObjectURL(b);
    const a = document.createElement('a'); a.href = u; a.download = `infra_${result.query}.json`; a.click();
  };

  const subTabs: SubTab[] = ['Overview', 'Certificates', 'Server Info', 'Correlation Results'];

  const summaryStats = result
    ? [
        { label: 'EXPOSURE', value: result.status, tone: 'text-status-red' },
        { label: 'CONFIDENCE', value: result.correlation.confidence, tone: 'text-accent-solid' },
        { label: 'OPEN PORTS', value: String(result.serverInfo.openPorts.length || 0), tone: 'text-status-teal' },
        { label: 'CLEARNET LINKS', value: String(result.correlationResults.length || 0), tone: 'text-status-orange' },
      ]
    : [];

  return (
    <div className="space-y-8 animate-fade-in font-sans selection:bg-accent-soft selection:text-accent-solid">
      {/* Header */}
      <div className="border-b border-border-subtle pb-4">
        <p className="text-[10px] font-mono tracking-[0.25em] text-accent-solid uppercase mb-1">// 04 INFRASTRUCTURE</p>
        <h1 className="text-xl font-mono font-bold text-text-primary uppercase tracking-wide">
          INFRASTRUCTURE CORRELATION ENGINE
        </h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)] gap-8">
        {/* Left Scan History Sidebar */}
        <aside className="space-y-4 font-mono">
          <div className="bg-surface border border-border-subtle p-5 rounded-[6px] space-y-3">
            <p className="text-[10px] tracking-[0.2em] text-text-muted uppercase">// RECENT SCANS</p>
            <div className="space-y-2">
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(h.query);
                    handleAnalyze(h.query);
                  }}
                  className="w-full text-left p-3 rounded-[4px] bg-canvas-deep border border-border-subtle hover:border-accent-border/50 transition-colors group"
                >
                  <p className="text-xs font-semibold text-text-primary truncate group-hover:text-accent-solid transition-colors">{h.query}</p>
                  <div className="flex justify-between items-center mt-1 text-[9px] text-text-muted">
                    <span>{h.date}</span>
                    <span className="text-accent-solid">{h.result.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Search + Result Workspace */}
        <div className="space-y-6">
          <div className="bg-surface border border-border-subtle p-6 rounded-[6px] space-y-4 font-mono">
            <form onSubmit={e => { e.preventDefault(); handleAnalyze(); }} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" strokeWidth={1.5} />
                <input
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  disabled={loading}
                  className="w-full pl-9 pr-4 py-2.5 bg-canvas-deep border border-border-subtle rounded-[4px] text-xs font-mono text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent-border disabled:opacity-50"
                  placeholder="Enter onion domain, cert hash, or IP..."
                />
              </div>
              <Button type="submit" disabled={loading || !query.trim()} className="px-6 font-mono text-xs uppercase tracking-wider h-10">
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Scanning…</> : 'ANALYZE INDICATOR'}
              </Button>
            </form>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-text-muted uppercase text-[10px] tracking-wider">Example Target:</span>
              {DEMO_CHIPS.map(c => (
                <button
                  key={c}
                  onClick={() => {
                    setQuery(c);
                    handleAnalyze(c);
                  }}
                  className="px-2.5 py-1 text-[10px] rounded-[3px] bg-canvas-deep border border-border-subtle text-accent-solid hover:bg-card-hover transition-colors font-mono"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="bg-surface border border-border-subtle p-12 text-center rounded-[6px] font-mono space-y-3">
              <Loader2 className="w-8 h-8 text-accent-solid animate-spin mx-auto" />
              <p className="text-xs text-text-primary uppercase tracking-wider">SCANNING TOR & CLEARNET TOPOLOGY…</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6 font-mono">
              {/* Summary Stats Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {summaryStats.map(stat => (
                  <div key={stat.label} className="bg-surface border border-border-subtle p-4 rounded-[6px]">
                    <div className="text-[9px] text-text-muted uppercase tracking-widest">{stat.label}</div>
                    <div className={`mt-2 text-xl font-bold ${stat.tone}`}>{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Main Panel */}
              <div className="bg-surface border border-border-subtle rounded-[6px] overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-border-subtle gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-solid" strokeWidth={1.5} />
                    <div>
                      <h2 className="text-sm font-semibold text-text-primary">{result.query}</h2>
                      <span className="text-[10px] text-text-muted uppercase tracking-wider">{result.badge}</span>
                    </div>
                  </div>
                  <Button variant="secondary" className="h-8 text-xs font-mono uppercase" onClick={handleExport}>
                    <Download className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} /> Export JSON
                  </Button>
                </div>

                {/* Subtabs */}
                <div className="border-b border-border-subtle">
                  <div className="flex items-center gap-2 px-5">
                    {subTabs.map(tab => (
                      <button
                        key={tab}
                        onClick={() => setSubTab(tab)}
                        className={`py-3 text-xs uppercase tracking-wider transition-colors relative ${
                          subTab === tab ? 'text-text-primary font-semibold' : 'text-text-muted hover:text-text-secondary'
                        }`}
                      >
                        {tab}
                        <span className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all ${subTab === tab ? 'bg-accent-solid' : 'bg-transparent'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 text-xs font-mono">
                  {subTab === 'Overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3 bg-canvas-deep border border-border-subtle p-4 rounded-[4px]">
                        <p className="text-[10px] text-text-muted uppercase tracking-widest">// OBSERVED TELEMETRY</p>
                        <div className="space-y-2">
                          <div className="flex justify-between py-1 border-b border-border-subtle/50">
                            <span className="text-text-muted">Service Banner</span>
                            <span className="text-text-primary">{result.overview.serviceBanner}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-border-subtle/50">
                            <span className="text-text-muted">SSL Certificate</span>
                            <span className="text-accent-solid truncate max-w-[200px]">{result.overview.ssl}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-border-subtle/50">
                            <span className="text-text-muted">Server Status</span>
                            <span className="text-text-primary">{result.overview.serverStatus}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 bg-canvas-deep border border-border-subtle p-4 rounded-[4px]">
                        <p className="text-[10px] text-text-muted uppercase tracking-widest">// CLEARNET CORRELATION</p>
                        <div className="space-y-2">
                          <div className="flex justify-between py-1 border-b border-border-subtle/50">
                            <span className="text-text-muted">Related Domain</span>
                            <span className="text-accent-solid">{result.correlation.clearnetDomain}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-border-subtle/50">
                            <span className="text-text-muted">Historical IP</span>
                            <span className="text-text-primary">{result.correlation.ipAddress}</span>
                          </div>
                          <div className="pt-2">
                            <ConfidencePill level={result.correlation.confidence} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {subTab === 'Certificates' && (
                    <div className="space-y-4">
                      {result.certificates.map((cert: any, i: number) => (
                        <div key={i} className="bg-canvas-deep border border-border-subtle p-4 rounded-[4px] space-y-2">
                          <p className="text-text-primary font-semibold">{cert.subject}</p>
                          <p className="text-text-muted text-[10px]">SHA-256: {cert.sha256}</p>
                          <pre className="p-3 bg-surface border border-border-subtle rounded-[3px] text-accent-solid text-[10px] whitespace-pre-wrap">{cert.pem}</pre>
                        </div>
                      ))}
                    </div>
                  )}

                  {subTab === 'Server Info' && (
                    <div className="space-y-4">
                      <div className="bg-canvas-deep border border-border-subtle p-4 rounded-[4px]">
                        <p className="text-[10px] text-text-muted uppercase mb-2">HTTP Banner</p>
                        <pre className="p-3 bg-surface border border-border-subtle rounded-[3px] text-accent-solid text-[10px] whitespace-pre-wrap">{result.serverInfo.banner}</pre>
                      </div>
                    </div>
                  )}

                  {subTab === 'Correlation Results' && (
                    <div className="divide-y divide-border-subtle border border-border-subtle rounded-[4px]">
                      {result.correlationResults.map((cr: any, i: number) => (
                        <div key={i} className="p-3 flex items-center justify-between">
                          <span className="text-text-primary font-semibold">{cr.artifact}</span>
                          <span className="text-accent-solid">{cr.match}</span>
                          <ConfidencePill level={cr.confidence} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;