import { useState, useEffect } from 'react';
import { Search, Loader2, Download, Clock, CheckCircle2, Server, Shield, Link2, ChevronRight, X } from 'lucide-react';
import { Card } from '../components/ui/Card';
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
    }, 1800);
  };

  const handleExport = () => {
    if (!result) return;
    const b = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const u = URL.createObjectURL(b);
    const a = document.createElement('a'); a.href = u; a.download = `infra_${result.query}.json`; a.click();
  };

  const subTabs: SubTab[] = ['Overview', 'Certificates', 'Server Info', 'Correlation Results'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-text-primary font-bold">Infrastructure Analysis</h1>
        <p className="text-text-secondary mt-1">Analyze Tor hidden services and correlate with clearnet infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Search + history */}
        <div className="space-y-4">
          {/* Scan History */}
          <Card>
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Scan History</h3>
            <div className="space-y-2">
              {history.map((h, i) => (
                <button key={i} onClick={() => { setQuery(h.query); handleAnalyze(h.query); }}
                  className="w-full text-left p-2.5 rounded-lg bg-canvas-dark border border-border-subtle hover:border-accent-border/40 hover:bg-card-hover transition-colors group">
                  <p className="text-xs font-mono text-text-primary truncate group-hover:text-accent-link">{h.query}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">{h.date}</p>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: main content */}
        <div className="lg:col-span-3 space-y-5">
          {/* Search bar */}
          <Card>
            <form onSubmit={e => { e.preventDefault(); handleAnalyze(); }} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text" value={query} onChange={e => setQuery(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 border border-border-subtle rounded-xl bg-input text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-border text-sm disabled:opacity-50"
                  placeholder="Enter onion domain, certificate hash, or identifier..."
                />
              </div>
              <Button type="submit" disabled={loading || !query.trim()} className="px-6">
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Scanning…</> : 'Analyze'}
              </Button>
            </form>

            {/* Demo chips */}
            <div className="mt-3 flex flex-wrap gap-2 items-center">
              <span className="text-xs text-text-muted">Try example:</span>
              {DEMO_CHIPS.map(c => (
                <button key={c} onClick={() => { setQuery(c); handleAnalyze(c); }}
                  className="px-3 py-1 text-xs rounded-full bg-card border border-border-subtle text-accent-link hover:bg-card-hover transition-colors font-mono">
                  {c}
                </button>
              ))}
            </div>
          </Card>

          {/* Loading skeleton */}
          {loading && (
            <Card className="text-center py-12">
              <Loader2 className="w-8 h-8 text-accent-solid animate-spin mx-auto mb-3" />
              <p className="text-sm text-text-secondary">Scanning infrastructure…</p>
              <p className="text-xs text-text-muted mt-1">Fingerprinting certificates, banners, and clearnet artifacts</p>
            </Card>
          )}

          {/* Result */}
          {result && !loading && (
            <Card>
              {/* Result header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-status-green" />
                  <span className="font-bold text-text-primary text-lg font-mono">{result.query}</span>
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full text-status-teal bg-status-green/10 border border-status-green/20">
                    {result.badge}
                  </span>
                </div>
                <Button variant="secondary" className="text-xs h-8" onClick={handleExport}>
                  <Download className="w-3.5 h-3.5 mr-1.5" /> Export JSON
                </Button>
              </div>

              {/* Sub-tabs */}
              <div className="border-b border-border-subtle flex space-x-5 mb-5">
                {subTabs.map(tab => (
                  <button key={tab} onClick={() => setSubTab(tab)}
                    className={`pb-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                      subTab === tab ? 'text-accent-link border-b-2 border-accent-link' : 'text-text-secondary hover:text-text-primary'
                    }`}>
                    {tab}
                    {tab === 'Certificates' && result.certificates.length > 0 && (
                      <span className="ml-1.5 text-[10px] bg-border-subtle px-1.5 py-0.5 rounded-full">{result.certificates.length}</span>
                    )}
                    {tab === 'Correlation Results' && result.correlationResults.length > 0 && (
                      <span className="ml-1.5 text-[10px] bg-border-subtle px-1.5 py-0.5 rounded-full">{result.correlationResults.length}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* ── OVERVIEW ── */}
              {subTab === 'Overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Observed Details</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Service Banner', val: result.overview.serviceBanner },
                        { label: 'SSL Certificate', val: result.overview.ssl },
                        { label: 'Server Status', val: result.overview.serverStatus },
                        { label: 'Last Observed', val: result.overview.lastObserved },
                      ].map(f => (
                        <div key={f.label} className="p-3 bg-canvas-dark border border-border-subtle rounded-lg">
                          <p className="text-xs text-text-muted mb-0.5">{f.label}</p>
                          <p className="text-sm text-text-primary font-medium">{f.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Correlation</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Related Clearnet Domain', val: result.correlation.clearnetDomain },
                        { label: 'IP Address (Historical)', val: result.correlation.ipAddress },
                        { label: 'Evidence', val: result.correlation.evidence },
                      ].map(f => (
                        <div key={f.label} className="p-3 bg-canvas-dark border border-border-subtle rounded-lg">
                          <p className="text-xs text-text-muted mb-0.5">{f.label}</p>
                          <p className="text-sm text-text-primary">{f.val}</p>
                        </div>
                      ))}
                      <div className="p-3 bg-canvas-dark border border-border-subtle rounded-lg flex items-center justify-between">
                        <p className="text-xs text-text-muted">Confidence</p>
                        <ConfidencePill level={result.correlation.confidence} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── CERTIFICATES ── */}
              {subTab === 'Certificates' && (
                result.certificates.length === 0 ? (
                  <div className="text-center py-10 text-text-muted">No certificates found for this indicator.</div>
                ) : (
                  <div className="space-y-5">
                    {result.certificates.map((cert: any, i: number) => (
                      <div key={i} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: 'Subject CN', val: cert.subject },
                            { label: 'Issuer', val: cert.issuer },
                            { label: 'SHA-256 Fingerprint', val: cert.sha256 },
                            { label: 'Valid From', val: cert.validFrom },
                            { label: 'Valid To', val: cert.validTo },
                            { label: 'SANs', val: cert.sans.join(', ') },
                          ].map(f => (
                            <div key={f.label} className="p-3 bg-canvas-dark border border-border-subtle rounded-lg">
                              <p className="text-xs text-text-muted mb-0.5">{f.label}</p>
                              <p className="text-sm text-text-primary font-mono break-all">{f.val}</p>
                            </div>
                          ))}
                        </div>
                        <div>
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Raw PEM</p>
                          <pre className="p-3 bg-canvas-dark border border-border-subtle rounded-lg text-xs text-status-green font-mono whitespace-pre-wrap overflow-x-auto">{cert.pem}</pre>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}

              {/* ── SERVER INFO ── */}
              {subTab === 'Server Info' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-canvas-dark border border-border-subtle rounded-lg">
                      <p className="text-xs text-text-muted mb-0.5">Server Software</p>
                      <p className="text-sm text-text-primary font-mono">{result.serverInfo.software}</p>
                    </div>
                    <div className="p-3 bg-canvas-dark border border-border-subtle rounded-lg">
                      <p className="text-xs text-text-muted mb-0.5">Open Ports</p>
                      <div className="flex gap-1.5 mt-1 flex-wrap">
                        {result.serverInfo.openPorts.length === 0
                          ? <span className="text-sm text-text-muted">N/A</span>
                          : result.serverInfo.openPorts.map((p: number) => (
                              <span key={p} className="px-2 py-0.5 text-xs font-mono bg-accent-soft/20 text-accent-link rounded border border-accent-border/30">{p}</span>
                            ))}
                      </div>
                    </div>
                  </div>

                  {Object.keys(result.serverInfo.responseHeaders).length > 0 && (
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Response Headers</p>
                      <div className="bg-canvas-dark border border-border-subtle rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border-subtle">
                              <th className="px-4 py-2 text-left text-xs text-text-muted font-semibold">Header</th>
                              <th className="px-4 py-2 text-left text-xs text-text-muted font-semibold">Value</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border-subtle">
                            {Object.entries(result.serverInfo.responseHeaders).map(([k, v]) => (
                              <tr key={k} className="hover:bg-card-hover">
                                <td className="px-4 py-2 font-mono text-xs text-status-blue">{k}</td>
                                <td className="px-4 py-2 font-mono text-xs text-text-secondary">{v as string}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-2">HTTP Banner</p>
                    <pre className="p-3 bg-canvas-dark border border-border-subtle rounded-lg text-xs text-status-green font-mono whitespace-pre-wrap">{result.serverInfo.banner}</pre>
                  </div>
                </div>
              )}

              {/* ── CORRELATION RESULTS ── */}
              {subTab === 'Correlation Results' && (
                result.correlationResults.length === 0 ? (
                  <div className="text-center py-10 text-text-muted">No clearnet correlations found.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-border-subtle">
                          {['Artifact Type', 'Clearnet Match', 'Date', 'Confidence'].map(h => (
                            <th key={h} className="py-2.5 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-subtle">
                        {result.correlationResults.map((cr: any, i: number) => (
                          <tr key={i} className="hover:bg-card-hover transition-colors">
                            <td className="py-3 px-4 text-text-primary font-medium">{cr.artifact}</td>
                            <td className="py-3 px-4 font-mono text-xs text-accent-link">{cr.match}</td>
                            <td className="py-3 px-4 text-text-muted">{cr.date}</td>
                            <td className="py-3 px-4"><ConfidencePill level={cr.confidence} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;
