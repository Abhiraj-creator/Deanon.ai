// ─── Central Mock Data Layer ───────────────────────────────────────────────
// All pages import from here instead of re-declaring inline.

export type ConfidenceLevel = 'High' | 'Moderate' | 'Low' | 'Strong';

// ─── ACTORS ────────────────────────────────────────────────────────────────
export const mockActors = {
  DarkVendorX: {
    id: 'DarkVendorX',
    name: 'DarkVendorX',
    category: 'Initial Access Broker',
    since: '2022-03-14',
    lastSeen: '2026-09-25',
    status: 'Active',
    confidence: 88,
    tags: ['ransomware', 'iab', 'russian-speaking', 'alphabay-migrant'],
    isWatching: false,
    identifiers: [
      { type: 'pgp', label: 'PGP Key', value: '0xA3F9D2C', full: 'Fingerprint: 0xA3F9...D2C' },
      { type: 'wallet', label: 'BTC Wallet', value: 'bc1qn...k9', full: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },
      { type: 'onion', label: 'Tor Domain', value: 'darkvx...onion', full: 'darkvendx7q2k3.onion' },
      { type: 'email', label: 'Sec Email', value: 'dvx@secmail', full: 'dvx@secmail.pro' },
    ],
    confidenceFactors: [
      { label: 'Infrastructure Match', pct: 30, color: '#8C61BD' },
      { label: 'Identifier Reuse', pct: 25, color: '#3B82F6' },
      { label: 'Behavioral Analysis', pct: 25, color: '#6D5EF5' },
      { label: 'Source Reliability', pct: 20, color: '#10B981' },
    ],
    relationships: [
      { entity: 'SilentCrow', type: 'actor', edge: 'PGP key reuse', confidence: 'High' as ConfidenceLevel },
      { entity: 'AlphaBay_Seller', type: 'actor', edge: 'Stylometric match', confidence: 'Moderate' as ConfidenceLevel },
      { entity: 'darkvendx7q2k3.onion', type: 'infra', edge: 'operates', confidence: 'High' as ConfidenceLevel },
      { entity: 'bc1qxy2k...n64k9', type: 'identifier', edge: 'wallet used', confidence: 'High' as ConfidenceLevel },
      { entity: 'XMarket', type: 'source', edge: 'observed on', confidence: 'High' as ConfidenceLevel },
      { entity: 'DarkForum', type: 'source', edge: 'observed on', confidence: 'Moderate' as ConfidenceLevel },
      { entity: '0xA3F9D2C', type: 'identifier', edge: 'signed with', confidence: 'High' as ConfidenceLevel },
    ],
    timeline: [
      { date: '2026-09-25', event: 'New forum post detected on DarkForum', type: 'alert', source: 'DarkForum' },
      { date: '2026-09-23', event: 'PGP key 0xA3F9D2C observed on SilentCrow account', type: 'pgp', source: 'BlackForum' },
      { date: '2026-09-20', event: 'Infrastructure scan: darkvendx7q2k3.onion still active', type: 'infra', source: 'Network Scan' },
      { date: '2026-09-18', event: 'BTC transaction of 0.45 BTC to known escrow wallet', type: 'wallet', source: 'Blockchain' },
      { date: '2026-09-15', event: 'Stylometric analysis: 94% overlap with AlphaBay_Seller', type: 'ai', source: 'AI Pipeline' },
      { date: '2026-09-10', event: 'New listing posted on XMarket', type: 'marketplace', source: 'XMarket' },
      { date: '2026-09-01', event: 'Certificate fingerprint matched to clearnet IP 198.51.100.23', type: 'infra', source: 'Infra Engine' },
      { date: '2026-08-20', event: 'Trust vouching from EvilCore on DarkForum', type: 'trust', source: 'DarkForum' },
    ],
    infrastructure: [
      { domain: 'darkvendx7q2k3.onion', status: 'Offline', correlation: 'High', clearnet: '198.51.100.23', cert: '8f4e2...' },
      { domain: 'dvx-store7.onion', status: 'Active', correlation: 'Moderate', clearnet: 'Unknown', cert: 'N/A' },
      { domain: 'pvt-dvx88.onion', status: 'Active', correlation: 'Low', clearnet: 'Unknown', cert: 'N/A' },
    ],
    aiAnalysis: {
      stylometryScore: 94,
      matchedPersona: 'AlphaBay_Seller',
      keyFeatures: ['Comma splice usage (87th percentile)', 'Phrase: "guaranteed fresh" (12 uses)', 'Activity timezone: UTC+3', 'Average sentence length: 18.4 words'],
      activityHeatmap: [1,0,0,2,3,2,1,0,3,4,5,4,3,2,1,0,0,1,2,3,4,5,3,2],
    },
  },
  AlphaBay_Seller: {
    id: 'AlphaBay_Seller',
    name: 'AlphaBay_Seller',
    category: 'Marketplace Vendor',
    since: '2019-11-04',
    lastSeen: '2022-07-12',
    status: 'Inactive',
    confidence: 94,
    tags: ['vendor', 'fraud', 'alphabay', 'retired'],
    isWatching: true,
    identifiers: [
      { type: 'pgp', label: 'PGP Key', value: '0xA3F9D2C', full: 'Same key as DarkVendorX — strong link' },
      { type: 'wallet', label: 'BTC Wallet', value: 'bc1q...h9j', full: 'bc1qabc9xyz...h9jq' },
    ],
    confidenceFactors: [
      { label: 'PGP Key Reuse', pct: 40, color: '#3B82F6' },
      { label: 'Stylometric Match', pct: 35, color: '#6D5EF5' },
      { label: 'Platform Migration', pct: 15, color: '#F59E0B' },
      { label: 'Source Reliability', pct: 10, color: '#10B981' },
    ],
    relationships: [
      { entity: 'DarkVendorX', type: 'actor', edge: 'PGP key reuse + stylometric match', confidence: 'High' as ConfidenceLevel },
      { entity: 'bc1q...h9j', type: 'identifier', edge: 'wallet used', confidence: 'High' as ConfidenceLevel },
      { entity: '0xA3F9D2C', type: 'identifier', edge: 'signed with', confidence: 'High' as ConfidenceLevel },
    ],
    timeline: [
      { date: '2022-07-12', event: 'Last observed activity on AlphaBay mirror', type: 'marketplace', source: 'AlphaBay' },
      { date: '2022-03-14', event: 'DarkVendorX account created — same PGP key', type: 'pgp', source: 'XMarket' },
      { date: '2021-11-02', event: 'Forum post on RaidForums matching writing style', type: 'ai', source: 'RaidForums' },
    ],
    infrastructure: [],
    aiAnalysis: {
      stylometryScore: 94,
      matchedPersona: 'DarkVendorX',
      keyFeatures: ['Identical PGP fingerprint', 'Writing style match: 94%', 'Timezone: UTC+3 consistent', 'Similar product descriptions'],
      activityHeatmap: [0,0,1,2,3,1,0,0,2,3,4,3,2,1,0,0,1,2,3,4,3,2,1,0],
    },
  },
  SilentCrow: {
    id: 'SilentCrow',
    name: 'SilentCrow',
    category: 'Forum Member',
    since: '2026-09-21',
    lastSeen: '2026-09-25',
    status: 'Active',
    confidence: 65,
    tags: ['new-actor', 'forum-active', 'suspected-rebranding'],
    isWatching: false,
    identifiers: [
      { type: 'pgp', label: 'PGP Key', value: '0xA3F9D2C', full: 'Same fingerprint as DarkVendorX — HIGH ALERT' },
    ],
    confidenceFactors: [
      { label: 'PGP Key Reuse', pct: 55, color: '#F4373D' },
      { label: 'Account Age', pct: 20, color: '#F59E0B' },
      { label: 'Writing Style', pct: 15, color: '#6D5EF5' },
      { label: 'Source Reliability', pct: 10, color: '#10B981' },
    ],
    relationships: [
      { entity: 'DarkVendorX', type: 'actor', edge: 'PGP key reuse — probable same actor', confidence: 'High' as ConfidenceLevel },
    ],
    timeline: [
      { date: '2026-09-25', event: 'Posted 3 new messages on BlackForum', type: 'alert', source: 'BlackForum' },
      { date: '2026-09-23', event: 'PGP key 0xA3F9D2C registered to this account', type: 'pgp', source: 'BlackForum' },
      { date: '2026-09-21', event: 'Account created on BlackForum', type: 'marketplace', source: 'BlackForum' },
    ],
    infrastructure: [],
    aiAnalysis: {
      stylometryScore: 72,
      matchedPersona: 'DarkVendorX',
      keyFeatures: ['Insufficient post history (3 posts)', 'Comma splice pattern matches DarkVendorX', 'PGP key is definitive link'],
      activityHeatmap: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,4,5,3,2,1],
    },
  },
  EvilCore: {
    id: 'EvilCore',
    name: 'EvilCore',
    category: 'Ransomware Operator',
    since: '2021-06-15',
    lastSeen: '2026-09-10',
    status: 'Active',
    confidence: 78,
    tags: ['ransomware', 'operator', 'russian-nexus'],
    isWatching: false,
    identifiers: [
      { type: 'onion', label: 'Leak Site', value: 'evilcore...onion', full: 'evilcore8x7k2.onion' },
      { type: 'wallet', label: 'XMR Wallet', value: '48BEr...vJ9', full: '48BEr7shdmf...vJ9k' },
    ],
    confidenceFactors: [
      { label: 'Infrastructure Match', pct: 35, color: '#8C61BD' },
      { label: 'Forum Cross-Reference', pct: 30, color: '#3B82F6' },
      { label: 'Behavioral Analysis', pct: 20, color: '#6D5EF5' },
      { label: 'Source Reliability', pct: 15, color: '#10B981' },
    ],
    relationships: [
      { entity: 'DarkVendorX', type: 'actor', edge: 'trust vouching', confidence: 'Moderate' as ConfidenceLevel },
      { entity: 'evilcore8x7k2.onion', type: 'infra', edge: 'operates', confidence: 'High' as ConfidenceLevel },
    ],
    timeline: [
      { date: '2026-09-10', event: 'New victim listed on leak site', type: 'alert', source: 'Leak Site Monitor' },
      { date: '2026-08-20', event: 'Vouched for DarkVendorX on DarkForum', type: 'trust', source: 'DarkForum' },
    ],
    infrastructure: [
      { domain: 'evilcore8x7k2.onion', status: 'Active', correlation: 'High', clearnet: '203.0.113.5', cert: 'a9f1b...' },
    ],
    aiAnalysis: {
      stylometryScore: 61,
      matchedPersona: 'Unknown',
      keyFeatures: ['Distinct writing style', 'Primarily Russian-language posts', 'Technical vocabulary consistent with RaaS operator'],
      activityHeatmap: [0,1,2,3,2,1,0,0,1,2,3,4,3,2,1,0,1,2,3,2,1,0,0,1],
    },
  },
};

export type ActorId = keyof typeof mockActors;

// ─── EVIDENCE ───────────────────────────────────────────────────────────────
export const mockEvidence = [
  { id: 'e1', type: 'PGP Key', description: 'Public key block 0xA3F9D2C — identical on DarkVendorX and SilentCrow', source: 'DarkForum', date: '2026-09-23', actor: 'DarkVendorX', raw: '-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: GnuPG v2\n\nmQINBGK2...AAAA\n-----END PGP PUBLIC KEY BLOCK-----', confidence: 'High' as ConfidenceLevel },
  { id: 'e2', type: 'Screenshot', description: 'Vendor listing snapshot showing trademark phrases', source: 'XMarket', date: '2026-09-10', actor: 'DarkVendorX', raw: '[Screenshot: XMarket listing #4721 - "guaranteed fresh, no time wasters"]', confidence: 'Moderate' as ConfidenceLevel },
  { id: 'e3', type: 'Certificate', description: 'SSL certificate CN=darkve... SHA-256: 8f4e2...', source: 'Network Scan', date: '2026-09-01', actor: 'DarkVendorX', raw: 'Subject: CN=darkvendx7q2k3.onion\nIssuer: Self-signed\nSHA-256: 8f4e2a9d1b3c...\nValid: 2026-01-01 to 2027-01-01\nSANs: darkvendx7q2k3.onion', confidence: 'High' as ConfidenceLevel },
  { id: 'e4', type: 'Transaction', description: '0.45 BTC transfer from bc1qxy2k... to known escrow', source: 'Blockchain', date: '2026-09-18', actor: 'DarkVendorX', raw: 'TXID: 3a1f9b2c8d7e...\nFrom: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh\nTo: bc1qescrow...44f\nAmount: 0.45 BTC\nConfirmations: 142', confidence: 'High' as ConfidenceLevel },
  { id: 'e5', type: 'Text Sample', description: 'Forum post stylometric sample — comma splice pattern', source: 'DarkForum', date: '2026-09-15', actor: 'DarkVendorX', raw: '"items are guaranteed fresh, delivery is within 48h, no time wasters please the product speaks for itself"\n\n[Stylometric match: 94% with AlphaBay_Seller profile]', confidence: 'High' as ConfidenceLevel },
  { id: 'e6', type: 'PGP Key', description: 'PGP key 0xA3F9D2C registered on SilentCrow account — same fingerprint', source: 'BlackForum', date: '2026-09-23', actor: 'SilentCrow', raw: '-----BEGIN PGP PUBLIC KEY BLOCK-----\nVersion: GnuPG v2\n\nmQINBGK2...AAAA (IDENTICAL)\n-----END PGP PUBLIC KEY BLOCK-----', confidence: 'High' as ConfidenceLevel },
  { id: 'e7', type: 'Screenshot', description: 'AlphaBay listing with matching product description', source: 'AlphaBay Archive', date: '2021-04-10', actor: 'AlphaBay_Seller', raw: '[Screenshot: AlphaBay listing - "guaranteed fresh, no time wasters"]', confidence: 'Moderate' as ConfidenceLevel },
  { id: 'e8', type: 'Certificate', description: 'SSL cert from evilcore8x7k2.onion — clearnet IP 203.0.113.5', source: 'Network Scan', date: '2026-09-10', actor: 'EvilCore', raw: 'Subject: CN=evilcore8x7k2.onion\nSHA-256: a9f1b...\nClearnet correlation: 203.0.113.5:443', confidence: 'High' as ConfidenceLevel },
  { id: 'e9', type: 'Text Sample', description: 'Trust vouching post: EvilCore references DarkVendorX', source: 'DarkForum', date: '2026-08-20', actor: 'EvilCore', raw: '"can vouch for dvx, solid iab, been working together for 2 years no issues"', confidence: 'Moderate' as ConfidenceLevel },
  { id: 'e10', type: 'Transaction', description: 'XMR payment 48BEr... to known XMarket escrow', source: 'Blockchain', date: '2026-09-08', actor: 'EvilCore', raw: 'TXID: xmr_9f8a2b...\nFrom: 48BEr7shdmf...vJ9k\nTo: XMarket escrow wallet\nAmount: ~$4,200 USD equivalent', confidence: 'Moderate' as ConfidenceLevel },
  { id: 'e11', type: 'Screenshot', description: 'SilentCrow profile page showing account creation date', source: 'BlackForum', date: '2026-09-21', actor: 'SilentCrow', raw: '[Screenshot: BlackForum /user/SilentCrow — Joined: 2026-09-21, Posts: 3]', confidence: 'Low' as ConfidenceLevel },
  { id: 'e12', type: 'Text Sample', description: 'SilentCrow post showing comma splice pattern consistent with DarkVendorX', source: 'BlackForum', date: '2026-09-25', actor: 'SilentCrow', raw: '"products are guaranteed fresh, hit me up, no time wasters the delivery is clean"', confidence: 'Moderate' as ConfidenceLevel },
];

// ─── INFRASTRUCTURE ─────────────────────────────────────────────────────────
export const mockInfraResults: Record<string, any> = {
  'darkvendx7q2k3.onion': {
    query: 'darkvendx7q2k3.onion',
    status: 'Offline',
    badge: 'Potential Clearnet Correlation',
    overview: { serviceBanner: 'nginx/1.18.0', ssl: 'Self-signed (CN=darkvendx7q2k3.onion)', serverStatus: 'Exposed (yes)', lastObserved: '2026-09-24T14:32:00Z' },
    correlation: { clearnetDomain: 'dvx-shop.ru', ipAddress: '198.51.100.23', confidence: 'High' as ConfidenceLevel, evidence: 'Certificate SHA-256 match + identical SSL key material' },
    certificates: [{ subject: 'darkvendx7q2k3.onion', issuer: 'Self-signed', sha256: '8f4e2a9d1b3c7f0e...', validFrom: '2026-01-01', validTo: '2027-01-01', sans: ['darkvendx7q2k3.onion'], pem: '-----BEGIN CERTIFICATE-----\nMIIBxTCCAW+gAwIBAgIJAM...\n-----END CERTIFICATE-----' }],
    serverInfo: { software: 'nginx/1.18.0', openPorts: [80, 443, 8080], responseHeaders: { 'Server': 'nginx/1.18.0', 'X-Powered-By': 'PHP/7.4', 'Content-Type': 'text/html' }, banner: 'HTTP/1.1 200 OK\nServer: nginx/1.18.0' },
    correlationResults: [{ artifact: 'SSL Certificate', match: 'dvx-shop.ru (198.51.100.23)', confidence: 'High' as ConfidenceLevel, date: '2026-09-24' }, { artifact: 'Server Banner', match: 'nginx/1.18.0 config fingerprint', confidence: 'Moderate' as ConfidenceLevel, date: '2026-09-20' }],
  },
  'evilcore8x7k2.onion': {
    query: 'evilcore8x7k2.onion',
    status: 'Active',
    badge: 'Potential Clearnet Correlation',
    overview: { serviceBanner: 'Apache/2.4.51', ssl: 'Self-signed (CN=evilcore8x7k2.onion)', serverStatus: 'Active', lastObserved: '2026-09-25T09:00:00Z' },
    correlation: { clearnetDomain: 'evilcore-news.ru', ipAddress: '203.0.113.5', confidence: 'High' as ConfidenceLevel, evidence: 'SHA-256 cert fingerprint match on clearnet port 443' },
    certificates: [{ subject: 'evilcore8x7k2.onion', issuer: 'Self-signed', sha256: 'a9f1b3c2d8e7...', validFrom: '2025-06-01', validTo: '2026-06-01', sans: ['evilcore8x7k2.onion'], pem: '-----BEGIN CERTIFICATE-----\nMIIBvTCCAWWgAwIBAgIJ...\n-----END CERTIFICATE-----' }],
    serverInfo: { software: 'Apache/2.4.51', openPorts: [80, 443], responseHeaders: { 'Server': 'Apache/2.4.51', 'Content-Type': 'text/html' }, banner: 'HTTP/1.1 200 OK\nServer: Apache/2.4.51' },
    correlationResults: [{ artifact: 'SSL Certificate', match: 'evilcore-news.ru (203.0.113.5)', confidence: 'High' as ConfidenceLevel, date: '2026-09-10' }],
  },
  '0xA3F9D2C': {
    query: '0xA3F9D2C',
    status: 'Active',
    badge: 'Identifier Cross-Link',
    overview: { serviceBanner: 'N/A (PGP Identifier)', ssl: 'N/A', serverStatus: 'In use', lastObserved: '2026-09-23T16:00:00Z' },
    correlation: { clearnetDomain: 'N/A', ipAddress: 'N/A', confidence: 'High' as ConfidenceLevel, evidence: 'Key fingerprint observed on DarkVendorX and SilentCrow — probable same actor' },
    certificates: [],
    serverInfo: { software: 'N/A', openPorts: [], responseHeaders: {}, banner: 'PGP Key — no server' },
    correlationResults: [{ artifact: 'PGP Fingerprint', match: 'DarkVendorX + SilentCrow', confidence: 'High' as ConfidenceLevel, date: '2026-09-23' }],
  },
};

// ─── SOURCES ─────────────────────────────────────────────────────────────────
export const mockSources = [
  { id: 's1', name: 'DarkForum', type: 'Forum', status: 'Online', lastCollected: '10 mins ago', records: 14820, feedUrl: 'tor://darkforum7x.onion/feed' },
  { id: 's2', name: 'XMarket', type: 'Marketplace', status: 'Online', lastCollected: '2 hours ago', records: 8340, feedUrl: 'tor://xmarket9z.onion/api' },
  { id: 's3', name: 'LeakBase', type: 'Leak Site', status: 'Online', lastCollected: '5 hours ago', records: 22100, feedUrl: 'tor://leakbase4r.onion/rss' },
  { id: 's4', name: 'Manual Intel', type: 'Manual Entry', status: 'Online', lastCollected: 'Yesterday', records: 312, feedUrl: 'manual' },
  { id: 's5', name: 'Research Feed', type: 'RSS/Feed', status: 'Online', lastCollected: '1 hour ago', records: 5670, feedUrl: 'https://research.feed/rss' },
  { id: 's6', name: 'BlackForum', type: 'Forum', status: 'Offline', lastCollected: '18 hours ago', records: 3890, feedUrl: 'tor://blackforum2.onion/feed' },
];

// ─── REPORTS ─────────────────────────────────────────────────────────────────
export const mockReportsInit = [
  { id: 'r1', name: 'DarkVendorX Full Profile Analysis', type: 'Actor Profile', date: '2026-09-22', status: 'Ready', format: 'PDF', actor: 'DarkVendorX' },
  { id: 'r2', name: 'Weekly Threat Landscape — Sept 2026', type: 'Summary', date: '2026-09-21', status: 'Ready', format: 'PDF', actor: 'All' },
  { id: 'r3', name: 'Infrastructure Correlation Scan', type: 'Tech Report', date: '2026-09-26', status: 'Generating', format: 'JSON', actor: 'DarkVendorX' },
  { id: 'r4', name: 'AlphaBay_Seller Retrospective', type: 'Actor Profile', date: '2026-09-20', status: 'Ready', format: 'CSV', actor: 'AlphaBay_Seller' },
  { id: 'r5', name: 'PGP Reuse Across Platforms', type: 'Custom', date: '2026-09-19', status: 'Ready', format: 'JSON', actor: 'Multiple' },
  { id: 'r6', name: 'SilentCrow — New Actor Assessment', type: 'Actor Profile', date: '2026-09-25', status: 'Ready', format: 'PDF', actor: 'SilentCrow' },
];

// ─── ANALYSIS HISTORY ────────────────────────────────────────────────────────
export const mockAnalysisHistory = [
  { query: 'DarkVendorX', time: '2026-09-26 13:42', confidence: 'High' as ConfidenceLevel, result: 'DarkVendorX' },
  { query: 'darkvendx7q2k3.onion', time: '2026-09-26 10:15', confidence: 'High' as ConfidenceLevel, result: 'DarkVendorX' },
  { query: '0xA3F9D2C', time: '2026-09-25 16:30', confidence: 'High' as ConfidenceLevel, result: 'DarkVendorX, SilentCrow' },
  { query: 'SilentCrow', time: '2026-09-25 09:00', confidence: 'Moderate' as ConfidenceLevel, result: 'SilentCrow' },
  { query: 'evilcore8x7k2.onion', time: '2026-09-24 14:00', confidence: 'High' as ConfidenceLevel, result: 'EvilCore' },
];
