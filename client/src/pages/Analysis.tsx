import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Loader2, Database, Network, Fingerprint, ShieldAlert,
  CheckCircle2, Server, Brain, BarChart2, Clock, ChevronRight,
  ArrowRight, Zap
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ConfidencePill } from '../components/ui/Badges';
import { mockActors, mockAnalysisHistory, type ActorId } from '../mocks/data';

const PIPELINE_STEPS = [
  { label: 'Data Ingestion & Normalization', sub: 'Fetching authorized intelligence feeds and normalizing entities', icon: Database, duration: 1600 },
  { label: 'Entity Extraction & Deduplication', sub: 'Parsing handles, PGP keys, wallets, and domains', icon: ShieldAlert, duration: 1400 },
  { label: 'Infrastructure Fingerprinting', sub: 'SSL certificate analysis and onion service correlation', icon: Server, duration: 2000 },
  { label: 'Relationship Graph Construction', sub: 'Building typed edges between actors and identifiers', icon: Network, duration: 1500 },
  { label: 'Stylometric & Behavioral Profiling', sub: 'AI persona similarity analysis across all platforms', icon: Brain, duration: 2200 },
  { label: 'Attribution & Confidence Scoring', sub: 'Generating evidence-graded attribution leads', icon: BarChart2, duration: 1200 },
];

const SUGGESTIONS = ['DarkVendorX', 'SilentCrow', 'EvilCore', '0xA3F9D2C', 'darkvendx7q2k3.onion', 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'];

const knownActorQueries: Record<string, ActorId> = {
  'darkvendorx': 'DarkVendorX',
  'silentcrow': 'SilentCrow',
  'alphabay_seller': 'AlphaBay_Seller',
  'evilcore': 'EvilCore',
  '0xa3f9d2c': 'DarkVendorX',
  'darkvendx7q2k3.onion': 'DarkVendorX',
  'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh': 'DarkVendorX',
};

const Analysis = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'complete' | 'notfound'>('idle');
  const [activeStep, setActiveStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [resultActor, setResultActor] = useState<ActorId | null>(null);
  const [history, setHistory] = useState(mockAnalysisHistory);
  const navigate = useNavigate();

  useEffect(() => {
    if (status !== 'processing') return;
    let step = 0;
    setActiveStep(0);
    setCompletedSteps([]);

    const runStep = (idx: number) => {
      if (idx >= PIPELINE_STEPS.length) {
        const normalized = query.trim().toLowerCase();
        const matched = knownActorQueries[normalized] ?? null;
        setResultActor(matched);
        setStatus(matched ? 'complete' : 'notfound');
        if (matched) {
          setHistory(prev => [{
            query: query.trim(),
            time: new Date().toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' }).replace(',', ''),
            confidence: 'High',
            result: matched,
          }, ...prev.slice(0, 4)]);
        }
        return;
      }
      setActiveStep(idx);
      setTimeout(() => {
        setCompletedSteps(prev => [...prev, idx]);
        step = idx + 1;
        runStep(step);
      }, PIPELINE_STEPS[idx].duration);
    };

    const t = setTimeout(() => runStep(0), 300);
    return () => clearTimeout(t);
  }, [status]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || status !== 'idle') return;
    setStatus('processing');
    setActiveStep(-1);
    setCompletedSteps([]);
    setResultActor(null);
  };

  const handleReset = () => {
    setStatus('idle');
    setQuery('');
    setActiveStep(-1);
    setCompletedSteps([]);
    setResultActor(null);
  };

  const actor = resultActor ? mockActors[resultActor] : null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl text-text-primary font-bold">Threat Analysis Pipeline</h1>
          <p className="text-text-secondary mt-1">
            Enter an alias, PGP key fingerprint, Bitcoin address, or Tor domain to initiate the automated de-anonymization workflow.
          </p>
        </div>
      </div>

      {/* Search Card */}
      <Card className="p-8">
        <form onSubmit={handleStart} className="flex space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-muted" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={status !== 'idle'}
              className="block w-full pl-12 pr-4 py-4 border border-border-subtle rounded-xl bg-input text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-accent-border focus:border-accent-border text-base transition-colors disabled:opacity-50"
              placeholder="e.g., DarkVendorX, bc1qxy2k..., 0xA3F9D2C, darkvendx.onion"
            />
          </div>
          <Button
            type="submit"
            disabled={status !== 'idle' || !query.trim()}
            className="h-[58px] px-8 text-base"
          >
            {status === 'idle' ? <><Zap className="w-4 h-4 mr-2" />Analyze</> : 'Processing...'}
          </Button>
        </form>

        {/* Suggestion chips */}
        {status === 'idle' && (
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-xs text-text-muted">Try:</span>
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="px-3 py-1 text-xs rounded-full bg-card border border-border-subtle text-text-secondary hover:bg-card-hover hover:text-text-primary transition-colors font-mono"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Pipeline progress */}
        {status !== 'idle' && (
          <div className="mt-10 space-y-5">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider border-b border-border-subtle pb-3">
              Analysis Progress — <span className="text-accent-link font-mono normal-case">{query}</span>
            </h3>

            <div className="space-y-4">
              {PIPELINE_STEPS.map((step, idx) => {
                const isDone = completedSteps.includes(idx);
                const isActive = activeStep === idx && !isDone;
                const isPending = !isDone && !isActive;
                return (
                  <div key={idx} className={`flex items-start space-x-4 transition-all duration-500 ${isPending ? 'opacity-35' : 'opacity-100'}`}>
                    <div className={`mt-0.5 w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all ${
                      isDone ? 'border-status-green bg-status-green/10'
                      : isActive ? 'border-accent-solid bg-accent-soft/20 shadow-[0_0_15px_rgba(109,94,245,0.4)]'
                      : 'border-border-subtle bg-card'
                    }`}>
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-status-green" />
                      ) : isActive ? (
                        <Loader2 className="w-4 h-4 text-accent-solid animate-spin" />
                      ) : (
                        <step.icon className="w-4 h-4 text-text-muted" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-semibold ${isDone || isActive ? 'text-text-primary' : 'text-text-secondary'}`}>
                          {step.label}
                        </h4>
                        {isDone && <span className="text-xs text-status-green font-medium">✓ Done</span>}
                        {isActive && <span className="text-xs text-accent-link font-medium animate-pulse">Running…</span>}
                      </div>
                      <p className="text-xs text-text-muted mt-0.5">{step.sub}</p>
                      {isActive && (
                        <div className="mt-2 h-1 w-full bg-border-subtle rounded-full overflow-hidden">
                          <div className="h-full bg-accent-solid rounded-full animate-pulse" style={{ width: '60%' }} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Results */}
            {status === 'complete' && actor && (
              <div className="mt-6 pt-6 border-t border-border-subtle animate-fade-in">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-5 h-5 text-status-green" />
                      <h4 className="text-status-green font-bold text-lg">Analysis Complete — Match Found</h4>
                    </div>
                    <p className="text-sm text-text-secondary mb-4">High-confidence correlation identified. Review the full profile below.</p>
                  </div>
                  <button onClick={handleReset} className="text-xs text-text-muted hover:text-text-primary border border-border-subtle rounded-lg px-3 py-1.5 transition-colors">
                    New Analysis
                  </button>
                </div>

                {/* Result summary card */}
                <div className="bg-canvas-dark border border-border-subtle rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-status-red/10 border border-status-red/30 flex items-center justify-center">
                        <ShieldAlert className="w-5 h-5 text-status-red" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-text-primary">{actor.name}</span>
                          <ConfidencePill level="High" />
                        </div>
                        <span className="text-xs text-text-muted">{actor.category} · Active since {actor.since}</span>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-accent-link">{actor.confidence}%</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'PGP Key Match', val: actor.identifiers.some(i => i.type === 'pgp') ? 'Detected' : 'None', ok: true },
                      { label: 'Stylometric Score', val: `${actor.aiAnalysis.stylometryScore}%`, ok: true },
                      { label: 'Linked Identifiers', val: `${actor.identifiers.length} found`, ok: true },
                      { label: 'Known Relationships', val: `${actor.relationships.length} edges`, ok: true },
                    ].map((r, i) => (
                      <div key={i} className="bg-card border border-border-subtle rounded-lg p-3">
                        <div className="text-xs text-text-muted mb-1">{r.label}</div>
                        <div className={`text-sm font-semibold ${r.ok ? 'text-status-green' : 'text-text-primary'}`}>{r.val}</div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="text-xs text-text-muted uppercase tracking-wider mb-2">Key Evidence</div>
                    <div className="space-y-1.5">
                      {actor.confidenceFactors.map((f, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: f.color }} />
                          <span className="text-sm text-text-secondary flex-1">{f.label}</span>
                          <span className="text-sm font-mono text-text-primary">{f.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button onClick={() => navigate('/actors')} className="flex-1">
                      Open Actor Profile <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/relationships')}>
                      View Graph
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/evidence')}>
                      Evidence
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Not found */}
            {status === 'notfound' && (
              <div className="mt-6 pt-6 border-t border-border-subtle animate-fade-in">
                <div className="text-center py-6">
                  <Search className="w-10 h-10 text-text-muted mx-auto mb-3" />
                  <h4 className="text-text-primary font-semibold mb-1">No Matches Found</h4>
                  <p className="text-sm text-text-secondary mb-4">
                    "<span className="font-mono text-accent-link">{query}</span>" did not match any known actor, identifier, or infrastructure indicator.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button onClick={handleReset} variant="secondary">Try Another Query</Button>
                    <Button onClick={() => navigate('/actors')}>Add as New Actor</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Analysis History */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-text-primary">Recent Analyses</h2>
          <Clock className="w-4 h-4 text-text-muted" />
        </div>
        <div className="space-y-2">
          {history.map((h, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-canvas-dark border border-border-subtle hover:bg-card-hover transition-colors">
              <div className="flex items-center gap-3">
                <Search className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
                <span className="text-sm font-mono text-text-primary">{h.query}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-muted">{h.time}</span>
                <ConfidencePill level={h.confidence} />
                <button
                  onClick={() => { setQuery(h.query); setStatus('idle'); }}
                  className="text-xs text-accent-link hover:underline flex items-center gap-1"
                >
                  Re-run <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Analysis;
