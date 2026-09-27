import { useState } from 'react';
import { Search, Loader2, Download, CheckCircle2 } from 'lucide-react';
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

  const summaryStats = result
    ? [
        { label: 'Exposure', value: result.status, tone: 'text-status-red', bg: 'bg-status-red/10' },
        { label: 'Confidence', value: result.correlation.confidence, tone: 'text-accent-link', bg: 'bg-accent-soft/20' },
        { label: 'Open Ports', value: String(result.serverInfo.openPorts.length || 0), tone: 'text-status-teal', bg: 'bg-status-green/10' },
        { label: 'Clearnet Links', value: String(result.correlationResults.length || 0), tone: 'text-status-orange', bg: 'bg-status-orange/10' },
      ]
    : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl text-text-primary font-bold">Infrastructure Analysis</h1>
        <p className="text-text-secondary mt-1">Analyze Tor hidden services and correlate them with clearnet infrastructure and identity artifacts.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] gap-6">
        <aside className="space-y-4">
          <Card className="p-4">
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Scan History</h3>
            <div className="space-y-2">
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(h.query);
                    handleAnalyze(h.query);
                  }}
                  className="w-full text-left p-3 rounded-xl bg-canvas-dark border border-border-subtle hover:border-accent-border/40 hover:bg-card-hover transition-colors group"
                >
                  <p className="text-xs font-mono text-text-primary truncate group-hover:text-accent-link">{h.query}</p>
                  <p className="text-[10px] text-text-muted mt-1">{h.date}</p>
                  <p className="text-[10px] text-text-secondary mt-1">{h.result}</p>
                </button>
              ))}
            </div>
          </Card>
        </aside>

        <div className="space-y-6">
          <Card className="p-4 sm:p-5">
            <form onSubmit={e => { e.preventDefault(); handleAnalyze(); }} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 border border-border-subtle rounded-xl bg-input text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-border text-sm disabled:opacity-50"
                  placeholder="Enter onion domain, certificate hash, or identifier..."
                />
              </div>
              <Button type="submit" disabled={loading || !query.trim()} className="px-6">
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Scanning…</> : 'Analyze'}
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-xs text-text-muted">Try example:</span>
              {DEMO_CHIPS.map(c => (
                <button
                  key={c}
                  onClick={() => {
                    setQuery(c);
                    handleAnalyze(c);
                  }}
                  className="px-3 py-1 text-xs rounded-full bg-card border border-border-subtle text-accent-link hover:bg-card-hover transition-colors font-mono"
                >
                  {c}
                </button>
              ))}
            </div>
          </Card>

          {loading && (
            <Card className="p-8 text-center">
              <Loader2 className="w-8 h-8 text-accent-solid animate-spin mx-auto mb-3" />
              <p className="text-sm text-text-secondary">Scanning infrastructure…</p>
              <p className="text-xs text-text-muted mt-1">Fingerprinting certificates, banners, and clearnet artifacts</p>
            </Card>
          )}

          {result && !loading && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {summaryStats.map(stat => (
                  <div key={stat.label} className={`${stat.bg} border border-border-subtle rounded-xl p-4`}>
                    <div className="text-[10px] uppercase tracking-wider text-text-muted">{stat.label}</div>
                    <div className={`mt-2 text-lg font-bold ${stat.tone}`}>{stat.value}</div>
                  </div>
                ))}
              </div>

              <Card className="p-0 overflow-hidden">
                <div className="flex flex-col gap-4 p-5 border-b border-border-subtle md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-status-green/10 border border-status-green/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-status-green" />
                    </div>
                    <div>
                      <div className="font-mono text-base font-semibold text-text-primary">{result.query}</div>
                      <div className="text-xs text-text-muted">Infrastructure signal classification</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full text-status-teal bg-status-green/10 border border-status-green/20">
                      {result.badge}
                    </span>
                    <Button variant="secondary" className="text-xs h-9" onClick={handleExport}>
                      <Download className="w-3.5 h-3.5 mr-1.5" /> Export JSON
                    </Button>
                  </div>
                </div>

                <div className="border-b border-border-subtle overflow-x-auto">
                  <div className="flex min-w-max gap-4 px-5 pt-4">
                    {subTabs.map(tab => (
                      <button
                        key={tab}
                        onClick={() => setSubTab(tab)}
                        className={`pb-3 text-sm font-medium transition-colors whitespace-nowrap ${
                          subTab === tab ? 'text-accent-link border-b-2 border-accent-link' : 'text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        {tab}
                        {(tab === 'Certificates' && result.certificates.length > 0) || (tab === 'Correlation Results' && result.correlationResults.length > 0) ? (
                          <span className="ml-1.5 text-[10px] bg-border-subtle px-1.5 py-0.5 rounded-full">
                            {(tab === 'Certificates' ? result.certificates.length : result.correlationResults.length)}
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-5">
                  {subTab === 'Overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      <div className="space-y-4">
                        <div className="rounded-xl border border-border-subtle bg-canvas-dark p-4">
                          <div className="text-xs uppercase tracking-wider text-text-muted mb-3">Observed Details</div>
                          <div className="space-y-3">
                            {[
                              { label: 'Service Banner', value: result.overview.serviceBanner },
                              { label: 'SSL Certificate', value: result.overview.ssl },
                              { label: 'Server Status', value: result.overview.serverStatus },
                              { label: 'Last Observed', value: result.overview.lastObserved },
                            ].map(item => (
                              <div key={item.label} className="rounded-lg border border-border-subtle bg-card p-3">
                                <div className="text-[10px] uppercase tracking-wider text-text-muted">{item.label}</div>
                                <div className="mt-1 text-sm text-text-primary font-medium break-all">{item.value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-xl border border-border-subtle bg-canvas-dark p-4">
                          <div className="text-xs uppercase tracking-wider text-text-muted mb-3">Relationship Signal</div>
                          <div className="space-y-3">
                            {[
                              { label: 'Related Clearnet Domain', value: result.correlation.clearnetDomain },
                              { label: 'IP Address (Historical)', value: result.correlation.ipAddress },
                              { label: 'Evidence', value: result.correlation.evidence },
                            ].map(item => (
                              <div key={item.label} className="rounded-lg border border-border-subtle bg-card p-3">
                                <div className="text-[10px] uppercase tracking-wider text-text-muted">{item.label}</div>
                                <div className="mt-1 text-sm text-text-primary break-words">{item.value}</div>
                              </div>
                            ))}
                            <div className="rounded-lg border border-border-subtle bg-card p-3 flex items-center justify-between">
                              <span className="text-[10px] uppercase tracking-wider text-text-muted">Confidence</span>
                              <ConfidencePill level={result.correlation.confidence} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {subTab === 'Certificates' && (
                    result.certificates.length === 0 ? (
                      <div className="text-center py-10 text-text-muted">No certificates found for this indicator.</div>
                    ) : (
                      <div className="space-y-5">
                        {result.certificates.map((cert: any, i: number) => (
                          <div key={i} className="rounded-xl border border-border-subtle bg-canvas-dark p-4 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {[
                                { label: 'Subject CN', value: cert.subject },
                                { label: 'Issuer', value: cert.issuer },
                                { label: 'SHA-256 Fingerprint', value: cert.sha256 },
                                { label: 'Valid From', value: cert.validFrom },
                                { label: 'Valid To', value: cert.validTo },
                                { label: 'SANs', value: cert.sans.join(', ') },
                              ].map(item => (
                                <div key={item.label} className="rounded-lg border border-border-subtle bg-card p-3">
                                  <div className="text-[10px] uppercase tracking-wider text-text-muted">{item.label}</div>
                                  <div className="mt-1 text-sm text-text-primary font-mono break-all">{item.value}</div>
                                </div>
                              ))}
                            </div>

                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-text-muted mb-2">Raw PEM</div>
                              <pre className="p-3 bg-card border border-border-subtle rounded-lg text-xs text-status-green font-mono whitespace-pre-wrap overflow-x-auto">{cert.pem}</pre>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  )}

                  {subTab === 'Server Info' && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-xl border border-border-subtle bg-canvas-dark p-4">
                          <div className="text-[10px] uppercase tracking-wider text-text-muted mb-2">Server Software</div>
                          <div className="text-sm text-text-primary font-mono">{result.serverInfo.software}</div>
                        </div>
                        <div className="rounded-xl border border-border-subtle bg-canvas-dark p-4">
                          <div className="text-[10px] uppercase tracking-wider text-text-muted mb-2">Open Ports</div>
                          <div className="flex flex-wrap gap-2">
                            {result.serverInfo.openPorts.length === 0 ? (
                              <span className="text-sm text-text-muted">N/A</span>
                            ) : (
                              result.serverInfo.openPorts.map((p: number) => (
                                <span key={p} className="px-2 py-1 text-xs font-mono bg-accent-soft/20 text-accent-link rounded border border-accent-border/30">{p}</span>
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                      {Object.keys(result.serverInfo.responseHeaders).length > 0 && (
                        <div className="rounded-xl border border-border-subtle bg-canvas-dark overflow-hidden">
                          <div className="px-4 py-3 text-[10px] uppercase tracking-wider text-text-muted border-b border-border-subtle">Response Headers</div>
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-border-subtle">
                                <th className="px-4 py-2 text-left text-[10px] uppercase tracking-wider text-text-muted">Header</th>
                                <th className="px-4 py-2 text-left text-[10px] uppercase tracking-wider text-text-muted">Value</th>
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
                      )}

                      <div className="rounded-xl border border-border-subtle bg-canvas-dark p-4">
                        <div className="text-[10px] uppercase tracking-wider text-text-muted mb-2">HTTP Banner</div>
                        <pre className="p-3 bg-card border border-border-subtle rounded-lg text-xs text-status-green font-mono whitespace-pre-wrap">{result.serverInfo.banner}</pre>
                      </div>
                    </div>
                  )}

                  {subTab === 'Correlation Results' && (
                    result.correlationResults.length === 0 ? (
                      <div className="text-center py-10 text-text-muted">No clearnet correlations found.</div>
                    ) : (
                      <div className="overflow-x-auto rounded-xl border border-border-subtle bg-canvas-dark">
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr className="border-b border-border-subtle">
                              {['Artifact Type', 'Clearnet Match', 'Date', 'Confidence'].map(h => (
                                <th key={h} className="py-3 px-4 text-[10px] uppercase tracking-wider text-text-muted font-semibold">{h}</th>
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
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;