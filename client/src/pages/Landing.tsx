import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  ArrowRight, 
  Zap, 
  Code, 
  Globe, 
  Database, 
  Network, 
  Fingerprint, 
  Activity,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const Landing = () => {
  return (
    <div className="min-h-screen bg-canvas-dark text-text-primary flex flex-col font-inter overflow-x-hidden">
      {/* Header */}
      <header className="h-20 flex items-center justify-between px-6 md:px-12 lg:px-24 w-full border-b border-border-subtle/50 bg-canvas-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent-soft/20 rounded-lg">
            <ShieldAlert className="w-8 h-8 text-accent-solid" />
          </div>
          <span className="text-2xl font-bold tracking-wide text-text-primary">ThreatLens</span>
        </div>
        <nav className="hidden md:flex items-center space-x-10 text-sm font-medium text-text-secondary">
          <a href="#features" className="hover:text-accent-link transition-colors">Platform Capabilities</a>
          <a href="#technology" className="hover:text-accent-link transition-colors">Technology</a>
          <a href="#about" className="hover:text-accent-link transition-colors">Mission</a>
        </nav>
        <div>
          <Link to="/login">
            <Button variant="primary" className="rounded-lg shadow-[0_0_15px_rgba(109,94,245,0.4)]">
              Access Demo <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center px-6 md:px-12 lg:px-24 py-20 overflow-hidden">
        {/* Background Grid & Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMzQzQ1NUIiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')] opacity-30"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-start/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-end/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full z-10">
          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-soft/10 border border-accent-soft/30 text-accent-link text-xs font-medium uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-status-green animate-pulse"></span>
              <span>Live Demonstration Available</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-text-primary tracking-tight">
              Different Aliases.<br />
              Same Actor.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-start to-accent-end">
                A Clearer Picture.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              ThreatLens is a defensive, authorized cyber threat-intelligence platform that identifies relationships, correlates dark-web indicators, and generates evidence-backed investigative leads through AI stylometric and behavioral analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
              <Link to="/login">
                <Button className="h-14 px-8 text-lg shadow-[0_0_30px_rgba(109,94,245,0.4)] hover:shadow-[0_0_40px_rgba(109,94,245,0.6)] transition-shadow">
                  Launch Interactive Demo
                </Button>
              </Link>
              <a href="#features">
                <Button variant="secondary" className="h-14 px-8 text-lg border-border-subtle bg-canvas-dark/50 hover:bg-card-hover backdrop-blur-sm">
                  Explore Capabilities
                </Button>
              </a>
            </div>

            <div className="pt-8 flex items-center space-x-6 text-sm text-text-muted">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-status-green" />
                <span>Evidence-Backed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Network className="w-4 h-4 text-status-blue" />
                <span>Multi-Hop Correlation</span>
              </div>
              <div className="flex items-center space-x-2">
                <Fingerprint className="w-4 h-4 text-accent-solid" />
                <span>Stylometric AI</span>
              </div>
            </div>
          </div>

          {/* Hero Visual - Large Abstract Graph Representation */}
          <div className="relative w-full aspect-square max-w-[600px] mx-auto lg:ml-auto">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-soft/20 via-transparent to-transparent rounded-full border border-border-subtle/40 shadow-[inset_0_0_120px_rgba(20,27,71,0.6)] animate-[spin_60s_linear_infinite]"></div>
            
            {/* Interactive/Pulsing Nodes Overlay */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 group cursor-pointer">
                <div className="w-4 h-4 bg-status-teal rounded-full shadow-[0_0_20px_#10B981] animate-pulse"></div>
                <div className="absolute top-6 -left-10 bg-card border border-border-subtle px-3 py-1.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-text-primary z-20">
                  <span className="text-status-teal font-medium">Clearnet IP:</span> 192.168.1.100
                </div>
              </div>
              
              <div className="absolute bottom-1/3 left-1/2 group cursor-pointer">
                <div className="w-6 h-6 bg-status-red rounded-full shadow-[0_0_25px_#F4373D] animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-8 -left-12 bg-card border border-border-subtle px-3 py-1.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-text-primary z-20">
                  <span className="text-status-red font-medium">High Confidence Actor:</span> DarkVendorX
                </div>
              </div>

              <div className="absolute top-1/2 right-1/4 group cursor-pointer">
                <div className="w-3 h-3 bg-status-purple rounded-full shadow-[0_0_15px_#8C61BD] animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-5 -left-8 bg-card border border-border-subtle px-3 py-1.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-text-primary z-20">
                  <span className="text-status-purple font-medium">Onion Service</span>
                </div>
              </div>
              
              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" viewBox="0 0 100 100">
                <line x1="25" y1="25" x2="50" y2="66" stroke="url(#grad1)" strokeWidth="0.8" strokeDasharray="2 2" className="animate-[dash_20s_linear_infinite]" />
                <line x1="50" y1="66" x2="75" y2="50" stroke="url(#grad2)" strokeWidth="0.8" />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#F4373D" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F4373D" />
                    <stop offset="100%" stopColor="#8C61BD" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Floating UI Elements */}
            <div className="absolute -right-4 top-1/4 bg-card/80 backdrop-blur border border-border-subtle p-4 rounded-xl shadow-xl w-64 transform translate-x-12 hidden md:block">
              <div className="flex items-center space-x-3 mb-2">
                <Fingerprint className="w-5 h-5 text-accent-solid" />
                <span className="text-sm font-semibold text-text-primary">Stylometric Match</span>
              </div>
              <div className="w-full bg-canvas-dark h-2 rounded-full mb-1">
                <div className="w-[85%] bg-accent-solid h-2 rounded-full"></div>
              </div>
              <span className="text-xs text-text-secondary">85% Similarity Score</span>
            </div>

            <div className="absolute -left-4 bottom-1/4 bg-card/80 backdrop-blur border border-border-subtle p-4 rounded-xl shadow-xl w-56 transform -translate-x-12 hidden md:block">
              <div className="flex items-center space-x-3 mb-2">
                <Database className="w-5 h-5 text-status-orange" />
                <span className="text-sm font-semibold text-text-primary">Infrastructure</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-text-secondary">
                <div className="w-2 h-2 rounded-full bg-status-orange"></div>
                <span>Shared SSL Certificate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / Trusted By Section (Mock) */}
      <section className="w-full border-y border-border-subtle/30 bg-card/30 py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          <p className="text-xs uppercase tracking-widest text-text-muted mb-6 font-semibold">Engineered for Advanced Threat Intelligence</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-6 h-6" />
              <span className="text-lg font-bold font-mono">NTRO Challenge</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-6 h-6" />
              <span className="text-lg font-bold font-mono">DarkWeb Intel</span>
            </div>
            <div className="flex items-center space-x-2">
              <Network className="w-6 h-6" />
              <span className="text-lg font-bold font-mono">Blockchain Sec</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section id="features" className="w-full py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-accent-solid tracking-widest uppercase mb-3">Platform Capabilities</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-text-primary mb-6">End-to-End De-anonymization</h3>
            <p className="text-lg text-text-secondary">
              ThreatLens transforms raw, unstructured dark-web data into correlated, evidence-backed intelligence profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-[0_0_30px_rgba(109,94,245,0.15)] transition-all duration-300 border-border-subtle/50 bg-gradient-to-br from-card to-canvas-dark">
              <div className="w-14 h-14 rounded-2xl bg-accent-soft/10 flex items-center justify-center mb-6 border border-accent-soft/20">
                <Database className="w-7 h-7 text-accent-solid" />
              </div>
              <h4 className="text-xl font-bold text-text-primary mb-3">Intelligence Database</h4>
              <p className="text-text-secondary leading-relaxed">
                Structured repository for actors, identifiers, sources, relationships, and evidence schemas. Normalizes diverse threat feeds into canonical entities.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-[0_0_30px_rgba(244,55,61,0.15)] transition-all duration-300 border-border-subtle/50 bg-gradient-to-br from-card to-canvas-dark">
              <div className="w-14 h-14 rounded-2xl bg-status-red/10 flex items-center justify-center mb-6 border border-status-red/20">
                <Fingerprint className="w-7 h-7 text-status-red" />
              </div>
              <h4 className="text-xl font-bold text-text-primary mb-3">AI Persona Similarity</h4>
              <p className="text-text-secondary leading-relaxed">
                Applies stylometric feature extraction and behavioral profiling (e.g., timezone patterns) to generate similarity scores between disjointed dark-web personas.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300 border-border-subtle/50 bg-gradient-to-br from-card to-canvas-dark">
              <div className="w-14 h-14 rounded-2xl bg-status-green/10 flex items-center justify-center mb-6 border border-status-green/20">
                <Network className="w-7 h-7 text-status-green" />
              </div>
              <h4 className="text-xl font-bold text-text-primary mb-3">Relationship Engine</h4>
              <p className="text-text-secondary leading-relaxed">
                Deterministic and probabilistic candidate linking. Explores multi-hop community detection via an interactive, zoomable network graph view.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-[0_0_30px_rgba(245,166,35,0.15)] transition-all duration-300 border-border-subtle/50 bg-gradient-to-br from-card to-canvas-dark">
              <div className="w-14 h-14 rounded-2xl bg-status-orange/10 flex items-center justify-center mb-6 border border-status-orange/20">
                <Globe className="w-7 h-7 text-status-orange" />
              </div>
              <h4 className="text-xl font-bold text-text-primary mb-3">Infrastructure Correlation</h4>
              <p className="text-text-secondary leading-relaxed">
                Indicator ingestion and fingerprinting. Correlates shared hosting, reused certificates, and CDNs linking onion services to clearnet IPs.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-[0_0_30px_rgba(140,97,189,0.15)] transition-all duration-300 border-border-subtle/50 bg-gradient-to-br from-card to-canvas-dark">
              <div className="w-14 h-14 rounded-2xl bg-status-purple/10 flex items-center justify-center mb-6 border border-status-purple/20">
                <FileCheck className="w-7 h-7 text-status-purple" />
              </div>
              <h4 className="text-xl font-bold text-text-primary mb-3">Evidence & Confidence</h4>
              <p className="text-text-secondary leading-relaxed">
                No bare assertions. Every claim carries inspectable, immutable evidence. Granular confidence tiers force analytical honesty and aid analyst review.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-[0_0_30px_rgba(168,179,207,0.15)] transition-all duration-300 border-border-subtle/50 bg-gradient-to-br from-card to-canvas-dark">
              <div className="w-14 h-14 rounded-2xl bg-border-subtle flex items-center justify-center mb-6 border border-border-subtle/50">
                <Activity className="w-7 h-7 text-text-primary" />
              </div>
              <h4 className="text-xl font-bold text-text-primary mb-3">Timeline & Reporting</h4>
              <p className="text-text-secondary leading-relaxed">
                Chronological views of events, key appearances, and indicator observations. One-click CSV, JSON, and PDF report exports embedding evidence annotations.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Deep Dive Section */}
      <section id="technology" className="w-full bg-card/40 border-y border-border-subtle/30 py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 order-2 lg:order-1 relative">
            {/* Mock Dashboard UI Graphic */}
            <div className="relative w-full aspect-[4/3] bg-canvas-dark rounded-xl border border-border-subtle shadow-2xl overflow-hidden">
              {/* Fake Topbar */}
              <div className="h-10 border-b border-border-subtle flex items-center px-4 space-x-2">
                <div className="w-3 h-3 rounded-full bg-status-red"></div>
                <div className="w-3 h-3 rounded-full bg-status-orange"></div>
                <div className="w-3 h-3 rounded-full bg-status-green"></div>
              </div>
              {/* Fake Content */}
              <div className="p-6 flex flex-col h-full space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h5 className="text-lg font-bold text-text-primary">Actor Profile: DarkVendorX</h5>
                    <p className="text-xs text-text-muted">High Confidence • Active</p>
                  </div>
                  <div className="px-3 py-1 bg-accent-soft/20 text-accent-solid text-xs rounded-full border border-accent-soft">
                    92% Identity Match
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="bg-card border border-border-subtle rounded-lg p-4 flex flex-col">
                    <span className="text-xs text-text-secondary mb-2">Identifiers</span>
                    <div className="space-y-2 mt-auto">
                      <div className="h-2 w-3/4 bg-border-subtle rounded"></div>
                      <div className="h-2 w-1/2 bg-border-subtle rounded"></div>
                      <div className="h-2 w-5/6 bg-border-subtle rounded"></div>
                    </div>
                  </div>
                  <div className="bg-card border border-border-subtle rounded-lg p-4 flex flex-col">
                    <span className="text-xs text-text-secondary mb-2">Activity Heatmap</span>
                    <div className="grid grid-cols-6 gap-1 mt-auto">
                      {[...Array(18)].map((_, i) => (
                        <div key={i} className={`h-2 rounded-sm ${i%3===0 ? 'bg-status-red' : i%2===0 ? 'bg-status-orange' : 'bg-border-subtle'}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative blurs */}
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-accent-start/30 rounded-full blur-[80px] -z-10"></div>
          </div>
          
          <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary">
              Not Just Graphs. <br/>
              <span className="text-accent-solid">Actionable Intelligence.</span>
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Attribution errors are high-harm. ThreatLens ensures that the system never displays bare assertions like "Actor A = Actor B". Every connection is a pipeline of:
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-card border border-border-subtle flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold mt-1">1</div>
                <div>
                  <h5 className="font-bold text-text-primary">Observed Relationship</h5>
                  <p className="text-sm text-text-muted">Raw indicators ingested and normalized.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-card border border-border-subtle flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold mt-1">2</div>
                <div>
                  <h5 className="font-bold text-text-primary">Supporting Evidence</h5>
                  <p className="text-sm text-text-muted">Immutable evidence rows stored securely in PostgreSQL.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-card border border-border-subtle flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold mt-1">3</div>
                <div>
                  <h5 className="font-bold text-text-primary">AI & Analyst Confidence</h5>
                  <p className="text-sm text-text-muted">Algorithms assign probability, but humans make the final attribution verdict.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Mission */}
      <section id="about" className="w-full py-24 px-6 md:px-12 lg:px-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-canvas-light/20 to-canvas-dark">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-sm font-bold text-status-orange tracking-widest uppercase">The Mission</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-text-primary">Prepared for NTRO Problem Statement 26151</h3>
          <p className="text-lg text-text-secondary leading-relaxed">
            Designed as a solution for Blockchain & Cybersecurity challenges, this project represents the pinnacle of modern threat intelligence UI. It strictly separates what the problem statement requires from the proposed robust defensive architecture.
          </p>
          <div className="flex justify-center pt-8">
            <Link to="/login">
              <Button className="h-14 px-10 text-lg">
                Enter ThreatLens Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-canvas-dark border-t border-border-subtle/50 py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-6 h-6 text-accent-solid" />
            <span className="text-xl font-bold text-text-primary">ThreatLens</span>
          </div>
          
          <p className="text-sm text-text-muted text-center md:text-left">
            &copy; 2026 ThreatLens – Frontend Demo Environment. No actual data is transmitted.
          </p>
          
          <div className="flex space-x-6">
            <Link to="#" className="text-sm text-text-secondary hover:text-accent-link transition-colors">Documentation</Link>
            <Link to="#" className="text-sm text-text-secondary hover:text-accent-link transition-colors">Architecture</Link>
            <Link to="#" className="text-sm text-text-secondary hover:text-accent-link transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
