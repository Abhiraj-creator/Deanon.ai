**Dark Web Threat Actor De-anonymization**

**AI-Assisted Cyber Threat Intelligence & Threat-Actor Relationship Analysis Platform**

Problem Statement ID: 26151

Organizing Theme: Blockchain & Cybersecurity (Software Category)

Prepared for: National Technical Research Organisation (NTRO) — Smart India Hackathon project proposal / technical blueprint

> ***Accuracy note:*** *Throughout this document, anything not explicitly stated in the problem statement is labeled as a proposed design choice or proposed implementation option. No datasets, statistics, accuracy figures, infrastructure, or capabilities have been invented.*

# 1. Problem Statement Overview

## 1.1 The Dark Web in the Context of This Problem

The "dark web" refers to networks and services, most notably those reachable through the Tor network (.onion hidden services), that are intentionally designed to conceal the identity and location of both the server operator and the visitor. Criminal threat actors — ransomware groups, marketplace operators, exploit sellers, and leak-site administrators — use dark-web services precisely because they resist attribution.

## 1.2 Why Threat Actors Are Difficult to Attribute

Attribution is hard because:

- Tor hidden services hide the real IP address and physical location of servers.
- Actors use handles (aliases) rather than real names, and they frequently change or "rebrand" them.
- Multiple marketplaces and forums can host the same actor under different names.
- Actors deliberately compartmentalize their infrastructure.

## 1.3 What "De-anonymization" Means Here

In this problem statement, de-anonymization does not mean the system automatically declares someone's real-world identity. It means:

Generating investigative intelligence and evidence-based relationships between the digital footprints a threat actor leaves behind — handles, PGP keys, cryptocurrency wallets, infrastructure indicators, and behavioral patterns — so that an investigator can form defensible attribution leads.

## 1.4 Why These Identifiers Matter

| Identifier | Why it matters |
| --- | --- |
| Handles (aliases) | An actor's public identity on a forum or marketplace; the anchor point for most analysis. |
| PGP keys | Used to sign messages, verify sellers, and encrypt communications. Reuse of the same PGP key (or an identical public key block) across platforms is a strong linking indicator. |
| Wallets | Cryptocurrency addresses used for payments. Wallet reuse or flow patterns link actors to markets and to each other. |
| Infrastructure indicators | Server configuration artifacts (certificates, banners, status pages) that can leak information about the underlying clearnet host. |
| Behavioral patterns | Writing style, posting times, and activity rhythms that can suggest two personas are the same actor. |

## 1.5 What NTRO Is Asking For

The problem statement asks for a system that:

1.  Continuously collects threat-actor footprints from intelligence sources.

2.  Analyzes Tor hidden-service misconfigurations (server-status exposure, SSL certificates tied to clearnet domains, default banners, descriptor inconsistencies) and matches indicators against clearnet infrastructure.

3.  Maps actor relationships across marketplaces using handles, PGP keys, wallets, trust links, and forum references.

4.  Applies AI-based persona analysis (stylometry and behavioral profiling) to link rebranded/migrated personas to previously observed actors.

5.  Presents everything through an analytical frontend (search, timelines, actor profiles, relationship graphs, evidence display, attribution confidence).

6.  Supports an autonomous mode and CSV/JSON/report export.

# 2. Requirements Extracted from the Problem Statement

| Req. | What the problem statement asks | How our solution addresses it |
| --- | --- | --- |
| A. Continuous collection of footprints | Continuous collection of dark-web threat-actor footprints (handles, PGP keys, wallets, references). | Proposed: Scheduled collection workers ingest authorized intelligence, validate it, normalize it, and store it as structured entities in PostgreSQL. Collection runs on a job scheduler so new observations continuously update actor profiles. |
| B. Tor hidden-service misconfiguration analysis | Detect exposed server-status pages, SSL certificates tied to clearnet domains, default service banners, descriptor inconsistencies; match indicators against clearnet infrastructure. | Proposed: An Infrastructure Analysis module parses and fingerprints collected service indicators, extracts certificate/banner/descriptor artifacts, and correlates them with known clearnet infrastructure records. Correlations are stored as indicators, with evidence and confidence — never as automatic proof of attribution. |
| C. Cross-marketplace actor mapping | Connect actors across marketplaces using handles, PGP keys, wallets, trust links, and marketplace/forum references. | Proposed: A Relationship Engine builds a graph of nodes (actors, handles, PGP IDs, wallets, personas, infrastructure) and typed edges (uses, signed-by, paid, referenced, correlated-with), enabling investigators to trace cross-platform links. |
| D. AI-based persona analysis | Stylometric identification, behavioral profiling, and linking rebranded/migrated personas to previously observed actors. | Proposed: An AI/ML pipeline extracts stylometric features (vocabulary, structure, punctuation) and behavioral features (activity timing, platform migration patterns), computes persona similarity, and outputs evidence with analytical confidence. AI output is treated as analytical evidence, not proof of identity. |
| E. Analytical frontend | Search, filtering, timeline analysis, actor profiles, relationship graph, evidence/source display, attribution confidence. | Proposed: A Next.js/React investigator dashboard provides all seven views, each backed by FastAPI and Express.js endpoints, with evidence and confidence shown alongside every claim. |
| F. Autonomous mode | Autonomous collection and analysis of actor data. | Proposed: A job-orchestration layer runs collection, normalization, relationship detection, and AI analysis automatically on a schedule. Autonomous operation is a design goal — it is not claimed to have been implemented yet. |
| G. Export | Export of intelligence in CSV, JSON, and report formats. | Proposed: Export endpoints serialize actors, relationships, indicators, and analysis results to CSV/JSON, and render an investigator report (HTML/PDF) containing evidence and confidence annotations. |

**Note on B:** Misconfiguration artifacts are indicators for correlation. A certificate seen on both an onion service and a clearnet domain is strong evidence of shared infrastructure — but the final attribution decision always rests with the analyst.

# 3. Proposed Solution

## 3.1 Project Name (Proposed)

**THREATLENS** *— AI-Assisted Cyber Threat Intelligence and Threat-Actor Relationship Analysis Platform*

*(The name is a proposed label, not an official NTRO designation.)*

## 3.2 The Solution in Simple Language

ThreatLens is a defensive cybersecurity and authorized threat-intelligence platform that:

1.  Collects authorized threat-intelligence data on a continuous schedule.

2.  Normalizes raw observations into structured, queryable entities.

3.  Profiles each observed actor and every identifier (handle, PGP key, wallet, domain) linked to them.

4.  Detects and correlates infrastructure misconfiguration indicators (certificates, banners, status pages, descriptors) against clearnet infrastructure.

5.  Builds relationships between identifiers, actors, personas, and infrastructure as an evidence-backed graph.

6.  Analyzes personas with AI (stylometry + behavior) to estimate similarity between observed personas — e.g., a "new" marketplace vendor and a previously observed actor.

7.  Assigns evidence-based confidence to every relationship and attribution suggestion.

8.  Stores everything in a central intelligence database.

9.  Serves investigators through a dashboard with search, graph, timeline, and profile views.

10.  Exports investigation results as CSV, JSON, and reports.

The system generates investigative leads and evidence-based relationships — it does not, and cannot, automatically declare a real-world identity.

# 4. Complete System Architecture

```
Authorized Intelligence Sources
        |
        v
Data Collection Layer
        |
        v
Data Normalization Layer
        |
        v
Intelligence Engine
     /       \
Infrastructure  Actor/Persona
  Analysis       Analysis
     \       /
        v
Relationship Engine
        |
        v
Intelligence Database
        |
        v
Investigator APIs
        |
        v
Investigation Dashboard
        |
        v
Reports / Exports
```

## Layer-by-Layer Explanation

### 4.1 Authorized Intelligence Sources

Only legally obtained and authorized intelligence feeds are accepted. The source layer is abstracted behind a common ingestion interface so new sources can be added without changing downstream code. (Which specific sources are used is an operational decision of the deploying organization, not something this document invents.)

### 4.2 Data Collection Layer

- Scheduled jobs (a proposed orchestrator: Celery/APScheduler-style task queue) pull new intelligence on a configurable cadence.
- Raw observations are persisted first ("raw first, enrich later") so analysis can be re-run without re-collection.
- Every record is tagged with its source, timestamp, and source type — provenance is preserved end-to-end.

### 4.3 Data Normalization Layer

- Validates incoming data (schema checks, deduplication, timestamp normalization).
- Extracts entities: handles, PGP key IDs and key material, wallet addresses, onion domains, clearnet domains, forum/marketplace references.
- Produces canonical, typed records that the Intelligence Engine can consume.

### 4.4 Intelligence Engine

Two analytical branches:

- Infrastructure Analysis: fingerprints hidden-service indicators; detects misconfigurations; correlates with clearnet infrastructure.
- Actor/Persona Analysis: profiles actors; runs stylometric and behavioral analysis; estimates persona similarity.

### 4.5 Relationship Engine

- Combines deterministic links (identical PGP key seen under two handles; same wallet address in two marketplaces) with probabilistic links (persona similarity scores).
- Every edge it creates carries evidence references and a confidence level.

### 4.6 Intelligence Database

PostgreSQL stores all entities, relationships, indicators, analysis results, evidence, and investigation records. (Proposed choice — justified in Section 5.)

### 4.7 Investigator APIs

FastAPI (core Python services) and Express.js (Node.js API/gateway layer, proposed addition) REST endpoints expose search, profile retrieval, graph queries, timeline data, analysis results, and exports — all behind authentication and role-based authorization.

### 4.8 Investigation Dashboard

The Next.js/React frontend: dashboard, search, actor profiles, graph, timeline, infrastructure view, AI analysis view, reports. Next.js also exposes lightweight API routes that can front the Express.js layer for the UI (proposed).

### 4.9 Reports / Exports

CSV/JSON serialization plus report generation with evidence and confidence annotations.

# 5. Proposed Technology Stack

**This is a PROPOSED technology stack — a recommendation for a student development team. None of these technologies are mandated by NTRO.**

| Layer | Proposed technology | Why it suits this project |
| --- | --- | --- |
| Frontend | React.js + Next.js + TypeScript | Component-based UI; Next.js gives server-side rendering and clean API integration; TypeScript adds type safety for complex intelligence objects. |
| Styling | Tailwind CSS | Rapid, consistent styling with utility classes — practical for a student team. |
| Graph visualization | A React graph library (e.g., Cytoscape.js-for-React or React Flow — team to finalize) | Interactive node-link diagrams with filtering, zoom, and evidence popovers. |
| Backend | Python + FastAPI (core service) + Node.js/Express.js (proposed addition, API/gateway layer) + Next.js API routes (proposed, thin BFF layer for the dashboard) | FastAPI remains the core service for data processing, ingestion, and AI/ML because of Python's ecosystem. Express.js is added as a lightweight, proposed Node.js layer for API-gateway duties, webhook/integration endpoints, and any request handling the team prefers to keep close to the Next.js frontend. Next.js API routes can proxy or aggregate calls for the dashboard. This keeps AI/ML logic in Python while giving the team a JavaScript/TypeScript option end-to-end where useful. |
| AI/ML | pandas, NumPy, scikit-learn, NLP libraries (e.g., scikit-learn's text feature extraction, and if needed spaCy/NLTK) | Feature extraction, similarity scoring, clustering, and classical ML without heavyweight infrastructure. |
| Database | PostgreSQL | Strong relational model for entities/relationships/timestamps/evidence; JSONB for flexible analysis payloads; mature transactions and indexing. (See 5.4 for the graph-database discussion.) |
| Authentication | Proposed: token-based auth (JWT) + role-based access control | Standard, well-understood pattern for an investigator platform. |
| Deployment | Proposed: Docker containers + a cloud/host of the team's choice | Reproducible environments; no specific cloud provider is assumed. |

## Why Python/FastAPI Remains the Core Backend, With Express.js as a Proposed Addition

The backend's core value is data processing and AI analysis — Python's ecosystem advantage is decisive here, so FastAPI remains the system of record for ingestion, normalization, the Relationship Engine, and the AI/ML pipeline.

Node.js is a viable alternative or complement for API plumbing. Adding Express.js does split some backend logic across two languages, so this is proposed specifically as a bounded addition, not a replacement: Express.js (and/or Next.js API routes) can own lightweight, I/O-bound concerns — such as an API gateway, authentication/session handling shared with the frontend, webhook receivers, or a BFF (backend-for-frontend) layer that talks to FastAPI — while all AI/ML and core relationship logic stays in Python. A team that prefers a single-language backend can still ship the MVP with FastAPI alone; Express.js/Next.js API routes are an optional, proposed enhancement, not a hard requirement.

## 5.4 Why PostgreSQL Instead of a Separate Graph Database (Initial Implementation)

A graph database (e.g., Neo4j) is a legitimate future option. For the MVP, PostgreSQL is sufficient because:

- The relationship volume of a student-scope project is well within PostgreSQL's reach.
- Edge queries are one-to-few-hops ("give me all identifiers of this actor"), which recursive CTEs or join tables handle efficiently.
- One database means simpler deployment, backups, and transactions across entities + edges + evidence.

Decision (proposed): Store relationships in PostgreSQL via join tables. Re-evaluate a graph database only if deep, multi-hop graph analytics become a real requirement.

# 6. Domain Breakdown

| Domain | Responsibilities | Main technologies | Output |
| --- | --- | --- | --- |
| Frontend | Dashboard, search UI, actor profiles, interactive relationship graph, timeline, infrastructure view, AI analysis view, report/export UI | Next.js, React, TypeScript, Tailwind CSS, React graph library | Investigator-facing web application |
| Backend | REST APIs, ingestion pipeline, normalization, relationship engine, infrastructure correlation, authentication, export endpoints | Python, FastAPI, Node.js/Express.js (proposed API/gateway layer), Next.js API routes (proposed BFF), task scheduler (proposed) | Documented API layer + processing pipelines |
| Database | Schema design, entity/relationship/evidence storage, indexing, data integrity, migrations | PostgreSQL, SQLAlchemy/Alembic (proposed) | Central intelligence database |
| AI/ML | Stylometric feature extraction, behavioral profiling, persona similarity, confidence estimation | pandas, NumPy, scikit-learn, NLP libraries | Similarity reports + analytical confidence |
| Cybersecurity | Threat-intelligence validation, infrastructure indicator semantics, misconfiguration interpretation, evidence quality review | Research workflows, OSINT discipline, indicator taxonomies | Curated indicators, evidence annotations, analyst review |

# 7. Database Design (Proposed Schema)

The entire schema below is a proposed design, not an official requirement. Fields marked as proposed may be adjusted during implementation.

## 7.1 actors

| Column | Type | Notes (proposed) |
| --- | --- | --- |
| actor_id | UUID PK | Internal canonical identity |
| label | text | Display label (e.g., primary handle) |
| category | text | Actor category/tag, if known |
| attribution_confidence | text/enum | Confidence tier assigned by evidence (see Section 13) |
| created_at | timestamp |  |
| updated_at | timestamp |  |
| last_scan_date | timestamp | Last time new intelligence was processed for this actor |

## 7.2 identifiers

| Column | Type | Notes |
| --- | --- | --- |
| identifier_id | UUID PK |  |
| actor_id | FK -> actors | Nullable until linked |
| type | enum | handle / pgp_key / wallet / domain / persona (proposed set) |
| value | text | Normalized value; unique per type |
| source_id | FK -> sources |  |
| first_seen / last_seen | timestamp |  |

*Proposed additional identifiers (Onion service addresses, email addresses) can be added as new enum values without schema redesign.*

## 7.3 sources

| Column | Type | Notes |
| --- | --- | --- |
| source_id | UUID PK |  |
| source | text | Source designation |
| source_type | text | e.g., forum / marketplace / feed / manual entry (proposed) |
| collected_at | timestamp |  |
| reliability/context | text | Free-form analyst context (proposed) |

## 7.4 relationships

| Column | Type | Notes |
| --- | --- | --- |
| relationship_id | UUID PK |  |
| from_ref | UUID | Actor, identifier, persona, or infrastructure node |
| to_ref | UUID |  |
| relationship_type | enum | uses / signed_by / paid / referenced / correlated_with / similar_to (proposed set) |
| confidence | text/enum | Evidence-based tier |
| evidence_id | FK -> evidence |  |
| first_observed | timestamp |  |

*Proposed polymorphic-node approach: a nodes view unifying actors/identifiers/infrastructure keeps edge queries uniform.*

## 7.5 infrastructure_indicators

| Column | Type | Notes |
| --- | --- | --- |
| indicator_id | UUID PK |  |
| indicator_type | enum | server_status_exposed / ssl_cert / service_banner / descriptor_inconsistency / clearnet_correlation (proposed set, mirroring the problem statement) |
| related_service_or_domain | text |  |
| observed_at | timestamp |  |
| evidence_id | FK -> evidence |  |
| correlation_result | text/JSONB | Result and matched clearnet infrastructure |

## 7.6 persona_analysis

| Column | Type | Notes |
| --- | --- | --- |
| analysis_id | UUID PK |  |
| subject_ref | UUID | Persona/handle analyzed |
| compared_to_ref | UUID | Other persona (for similarity runs) |
| features | JSONB | Stylometric/behavioral feature vectors and metadata (proposed) |
| similarity_result | JSONB | Scores, contributing features (proposed) |
| confidence | text/enum |  |
| analyzed_at | timestamp |  |

## 7.7 evidence

The evidence table is the backbone of the trust model:

| Column | Type | Notes |
| --- | --- | --- |
| evidence_id | UUID PK |  |
| claim_ref | UUID | The relationship/indicator/analysis claim it supports |
| source_id | FK -> sources | Where this evidence came from |
| artifact | text/JSONB | The raw or summarized artifact (e.g., the key block hash, certificate fingerprint, quote with timestamp) |
| observed_at | timestamp |  |

**Principle:** *No claim without evidence. Every relationship, indicator correlation, and similarity conclusion references at least one evidence row, and the investigator can always drill from a claim -> its evidence -> its source.*

# 8. Data Flow

```
Source -> Collection -> Validation -> Normalization -> Entity Extraction
  -> Relationship Detection -> Database -> AI Analysis
  -> Confidence/Evidence -> Investigator Dashboard
```

| Stage | What happens (proposed) |
| --- | --- |
| Source | An authorized intelligence source produces raw observations. |
| Collection | Scheduler pulls data; raw payload stored with source + timestamp. |
| Validation | Schema checks, deduplication, timestamp normalization; malformed records quarantined for review. |
| Normalization | Observations converted to canonical entity records (handle -> identifiers row, etc.). |
| Entity Extraction | PGP key IDs/fingerprints, wallet addresses, onion/clearnet domains extracted and typed. |
| Relationship Detection | Deterministic matching (same key/wallet/domain across contexts) creates candidate edges; probabilistic matching deferred to AI stage. |
| Database | Entities, candidate relationships, and evidence persisted transactionally. |
| AI Analysis | Stylometric + behavioral features computed; persona similarity estimated; results written to persona_analysis. |
| Confidence/Evidence | Every relationship/claim receives evidence references and a confidence tier. |
| Investigator Dashboard | Analysts search, explore the graph, review timelines, inspect evidence, and adjust confidence. |

# 9. AI/ML Component

## 9.A Stylometric Analysis

Goal: Estimate whether two text-producing personas plausibly share the same author.

Proposed feature families:

- Vocabulary patterns: characteristic word choice, rare-word usage, lexical diversity.
- Writing structure: sentence length distribution, paragraph structure, formatting habits.
- Punctuation patterns: distinctive punctuation habits and emoji/leet usage.
- Repeated linguistic characteristics: recurring phrases, misspellings, slang, signature expressions.

Method (proposed): Text feature extraction (e.g., TF-IDF over character/word n-grams plus hand-crafted stylometric features) feeding similarity computation (cosine similarity) and, where labels exist, a supervised classifier (scikit-learn). The team will select and validate the specific approach empirically.

**Critical caveat:** *Stylometric features do not uniquely identify a person. Shared style can reflect shared language community, templates, or deliberate imitation. Stylometry produces similarity evidence, not identity proof.*

## 9.B Behavioural Analysis

Proposed signals:

- Activity patterns: typical activity windows across days.
- Temporal behaviour: posting hours, timezone-inferred rhythms, burst patterns.
- Posting behaviour: frequency, thread participation style, response latency.
- Platform migration patterns: appearance on a new marketplace shortly after another platform's disruption (a signal, not proof).
- Observed category/activity patterns: what goods/services/claims the persona is associated with.

## 9.C Persona Similarity Pipeline

```
Persona A --> Feature Extraction --+
                                    +--> Similarity Analysis --> Evidence + Confidence
Persona B --> Feature Extraction --+
```

1.  Collect persona-linked text and behavioral observations (with evidence).

2.  Extract stylometric and behavioral feature vectors.

3.  Compute a similarity score with per-feature contributions.

4.  Attach the contributing evidence and an analytical confidence tier.

5.  Surface the result as a candidate link for analyst review.

## 9.D Human Review (Non-Negotiable)

AI results support analyst investigation. They never automatically establish real-world identity, never merge actors without review, and always ship with visible evidence and confidence. The dashboard will show why the AI thinks two personas are similar, not just that it does.

# 10. Infrastructure Analysis

## 10.1 Indicators Explicitly Mentioned in the Problem Statement

| Indicator | What the platform records and correlates |
| --- | --- |
| Exposed server-status pages | A hidden service leaking a server-status page (e.g., Apache/Nginx status) can expose server metadata; the platform records the observation and any server identifiers it reveals. |
| SSL certificates tied to clearnet domains | If a TLS certificate presented by a hidden service also appears on a clearnet domain, that is a correlation indicator linking the onion service to clearnet infrastructure. |
| Default service banners | Default banners reveal software/version; the platform fingerprints and records them for correlation against known infrastructure. |
| Descriptor inconsistencies | Artifacts within the onion service descriptor or its presentation that conflict with its claimed identity are recorded as indicators. |
| Clearnet infrastructure correlation | All of the above are matched against the platform's infrastructure knowledge to surface shared-hosting relationships. |

## 10.2 Correlation Workflow

```
Observed Indicator -> Infrastructure Correlation -> Related Infrastructure
  -> Evidence -> Confidence
```

Each correlation is stored as an infrastructure_indicators row with linked evidence and a confidence tier — an indicator, not a verdict.

**Legal/ethical boundary:** The platform analyzes authorized, legally obtained intelligence and indicators only. It does not probe, exploit, or attempt unauthorized access to any system. The collection layer operates only against sources the deploying organization is authorized to use.

# 11. Relationship Graph

## 11.1 Graph Model

```
PGP KEY
                   |
  HANDLE --- ACTOR --- WALLET
     |                    |
   FORUM             MARKETPLACE
     |
  PERSONA
     |
INFRASTRUCTURE
```

## 11.2 Nodes and Edges

- Nodes: Actor, Handle, PGP Key, Wallet, Persona, Forum/Marketplace (platform), Infrastructure (domain/service).
- Edges (proposed types): uses (actor-handle), signed_by (handle-PGP key), paid / received (actor-wallet), active_on (handle-platform), similar_to (persona-persona), correlated_with (infrastructure-infrastructure), referenced (any-any, from observed mentions).

Every edge carries: evidence reference(s), first-observed timestamp, and confidence tier.

## 11.3 How Investigators Use the Graph

- Start from any node (a wallet, a PGP key, a handle) and expand outward.
- Filter edges by type, confidence, and time range.
- Click any edge to see its supporting evidence before trusting it.
- Discover that "VendorX" on Marketplace-A shares a PGP key with "SellerY" on Marketplace-B — a concrete investigative lead.
- Follow infrastructure correlations to see which onion services may share a clearnet host.

# 12. Investigator Dashboard (Proposed Frontend Design)

## 12.1 Dashboard (Home)

- Total observed actors, recent intelligence, recent relationships, recent scans — all live counts from the database (no fabricated numbers).
- Quick-search bar and alert list for new high-confidence relationships.

## 12.2 Actor Search

Search by: handle, any identifier, wallet address, PGP key ID/fingerprint, domain/infrastructure indicator. Filters: platform, category, confidence tier, date range.

## 12.3 Actor Profile

- Identifiers (handles, PGP keys, wallets, personas)
- Relationship summary with per-edge confidence
- Timeline of observed events
- Sources and evidence list
- Infrastructure indicators and correlations
- AI persona analysis results with contributing evidence
- Overall attribution confidence with its justification

## 12.4 Relationship Graph

Interactive graph: zoom, pan, filter by edge type/confidence, click-through to evidence.

## 12.5 Timeline

Chronological view of all events for an actor or identifier: first seen, key appearances, migrations, indicator observations, analysis runs.

## 12.6 Infrastructure View

Tabular + graph view of infrastructure indicators, their correlation results, and linked onion/clearnet services.

## 12.7 AI Analysis

Similarity analysis table (Persona A vs Persona B, contributing features, confidence), behavioral profile summaries, and links to underlying evidence.

## 12.8 Reports

One-click export: CSV (entities/relationships), JSON (full structured export), and a formatted report (HTML -> PDF) embedding evidence and confidence annotations.

# 13. Confidence and Evidence System

## 13.1 The Model

The system never displays bare assertions like "Actor A = Actor B". It displays:

```
Observed Relationship -> Supporting Evidence -> Analysis
  -> Confidence -> Analyst Review
```

## 13.2 Proposed Confidence Tiers (Implementation Choice)

| Tier | Meaning (proposed definitions — final thresholds to be set during implementation) |
| --- | --- |
| Confirmed (analyst) | An analyst has manually reviewed the evidence and confirmed the relationship. |
| Strong | Multiple independent evidence items converge (e.g., same PGP key + same wallet + high similarity). |
| Moderate | Single strong indicator or several weak indicators. |
| Weak / Lead | A single observed indicator or low-similarity AI result — an investigative lead only. |

*These tiers are a proposed design. Numerical thresholds are deliberately not fixed in this document; they must be defined and validated during implementation.*

## 13.3 Why Confidence Is Necessary

Attribution errors are high-harm. Confidence tiers make the system honest: they distinguish "same PGP key, confirmed" from "writing style is similar, lead only," and they force every claim to carry inspectable evidence.

# 14. Security and Access Control (Proposed Design)

| Measure | Proposed implementation |
| --- | --- |
| Authentication | Token-based auth (e.g., JWT) with secure password hashing (e.g., Argon2/bcrypt). |
| Authorization | Role-based access control (proposed roles: Analyst, Senior Analyst/Reviewer, Admin). |
| Secure API design | Input validation on every endpoint, parameterized queries/ORM, rate limiting. |
| Encryption in transit | TLS for all client-server and service-database traffic. |
| Secrets management | Environment-based secret injection (e.g., Docker secrets / env files outside version control). |
| Audit logging | Log every login, export, and confidence-altering action with user + timestamp. |
| Evidence integrity | Evidence artifacts stored immutably; claims reference them by ID. |
| Access logging | Per-record access logs for sensitive intelligence. |
| Data minimization | Collect and retain only what the intelligence purpose requires; retention policy configurable. |
| Secure report generation | Exports are access-checked; reports avoid leaking unrelated sensitive records. |

*No security certifications or compliance claims are made in this document. Any such claim would require verified audit evidence.*

# 15. Complete End-to-End Workflow

| Step | Action | Details |
| --- | --- | --- |
| 1 | Collect authorized intelligence | Scheduler pulls from configured, authorized sources; raw payloads stored with provenance. |
| 2 | Validate & normalize | Schema validation, deduplication, canonical entity formation. |
| 3 | Extract entities | Handles, PGP keys, wallets, domains, platform references pulled into typed records. |
| 4 | Create/update actor profiles | Existing actors updated; new identifiers attached; first_seen/last_seen maintained. |
| 5 | Create relationships | Deterministic matches (shared keys/wallets/domains) create evidence-backed candidate edges. |
| 6 | Analyze infrastructure indicators | Certificates, banners, status pages, descriptors fingerprinted and correlated with clearnet infrastructure. |
| 7 | Run AI persona/behavior analysis | Feature extraction + similarity estimation for personas with enough text/behavioral data. |
| 8 | Generate evidence & confidence | Every claim linked to evidence rows and assigned a confidence tier. |
| 9 | Store results | Transactional persistence; raw data, entities, edges, and analyses all versioned by timestamp. |
| 10 | Display in dashboard | Search, profiles, graph, timeline, infrastructure and AI views updated. |
| 11 | Investigator review | Analysts inspect evidence, confirm/reject candidate links, adjust confidence tiers (all audit-logged). |
| 12 | Generate/export reports | CSV/JSON exports and evidence-annotated reports for downstream use. |

# 16. Development Plan

## Phase 1 — Foundation

Project scaffolding (Next.js frontend with API routes, FastAPI backend, Express.js API/gateway layer [proposed], PostgreSQL via Docker), CI basics, authentication + RBAC, database migration tooling.

## Phase 2 — Intelligence Database

actors, identifiers, sources, relationships, evidence schemas; CRUD APIs; manual + ingestion entry points.

## Phase 3 — Investigation Dashboard

Search, actor profile, relationship graph, timeline views wired to APIs.

## Phase 4 — Infrastructure Analysis

Indicator ingestion, fingerprinting/correlation logic, evidence linkage, infrastructure view.

## Phase 5 — AI/ML

Stylometric feature extraction, behavioral profiling, persona similarity pipeline, confidence assignment, analyst-facing AI view.

## Phase 6 — Reporting

CSV/JSON export endpoints; report template with evidence/confidence embedding.

## Phase 7 — Testing & Security

API tests, DB integrity tests, frontend tests, ML evaluation on a valid, properly sourced dataset, security review (authZ, input validation, logging), end-to-end workflow validation.

## Proposed Autonomous Mode

Scheduling + pipeline automation is built incrementally across Phases 2-5 and unified in a later milestone — presented as a design goal, not an existing capability.

# 17. MVP vs Advanced Version

## 17.1 MVP (Realistic for a Student Project)

- Structured intelligence database (actors, identifiers, sources, relationships, evidence)
- Actor profiles with identifiers and sources
- Relationship graph with confidence + evidence display
- Timeline view
- Basic infrastructure indicator ingestion and correlation
- Basic AI persona similarity analysis (clearly labeled as analytical evidence)
- Dashboard, search, and CSV/JSON/report exports
- Authentication + role-based access

## 17.2 Advanced Version (Clearly Marked Future Work)

- More automated ingestion pipelines (additional authorized feeds)
- Improved NLP (deeper stylometric models, transformer-based text representations)
- Advanced graph analytics (multi-hop community detection, graph algorithms)
- More sophisticated behavioral models (sequential/temporal modeling)
- Scalable distributed processing for larger intelligence volumes
- Optional migration path to a dedicated graph database if warranted
- Optional integration with external intelligence platforms

# 18. Team Role Distribution

| Role | Owns |
| --- | --- |
| Frontend Developer | Dashboard, graph, timeline, search, actor profiles, export/report UI |
| Backend Developer | FastAPI + Express.js endpoints, ingestion pipeline, relationship engine, auth, exports |
| Database Developer | Schema, migrations, indexing, query optimization, data integrity |
| AI/ML Developer | Stylometry, behavioral features, similarity pipeline, confidence assignment |
| Cybersecurity/Research Developer | Indicator semantics, evidence quality, threat-intel validation, analyst-review workflow |

*Small-team merging (proposed): A 3-person team can merge roles as: (1) Frontend, (2) Backend + Database, (3) AI/ML + Cybersecurity research. A 2-person team should cut scope aggressively — prioritize the MVP database + profiles + graph + basic similarity, and defer infrastructure correlation depth.*

# 19. Testing Strategy

| Area | Approach |
| --- | --- |
| Frontend | Component/UI tests (e.g., Testing Library), end-to-end flows for search -> profile -> graph -> export |
| Backend | API contract tests (FastAPI and Express.js), validation edge cases, auth/authz tests (every endpoint tested for role enforcement) |
| Database | Integrity constraints, migration tests, query performance on realistic data volumes, evidence-linkage invariants (no orphan claims) |
| AI/ML | Evaluate similarity approaches on a valid, ethically sourced dataset (e.g., same-author vs different-author text pairs). Report precision/recall and error analysis. No accuracy numbers are claimed in this document — all metrics must come from actual, documented evaluation runs. |
| Security | Auth bypass attempts, input validation fuzzing, export access checks, audit-log verification |
| End-to-end | Full pipeline: ingest -> normalize -> relate -> analyze -> review -> export, on a controlled test dataset |

# 20. Limitations

- Dark-web data availability and quality vary between sources; some observations will be incomplete, duplicated, or stale.
- AI similarity does not prove identity. Stylometric matches can reflect shared communities, templates, or deliberate mimicry.
- Infrastructure correlation can produce false positives (shared hosting, CDNs, reused certificates by hosting providers).
- Attribution requires human investigation. The system produces leads and evidence, never verdicts.
- Intelligence may be outdated by the time it is analyzed; timestamps and last_seen tracking mitigate but do not eliminate this.
- Autonomous analysis must not be treated as unquestionable truth; every automated output is provisional until analyst-reviewed.
- Behavioral inference is probabilistic; timezone and activity-pattern signals are noisy.

# 21. Risks and Mitigation

| Risk | Impact | Mitigation |
| --- | --- | --- |
| False attribution | High — reputational and operational harm | Mandatory evidence linkage; confidence tiers; analyst confirmation before any merge; audit trail of decisions |
| Poor data quality | Medium — noisy relationships | Validation + quarantine at ingestion; source reliability context; deduplication |
| Stale intelligence | Medium — decisions on outdated facts | last_seen tracking, observation timestamps on every record, aging indicators in UI |
| False positives (infra correlation, similarity) | Medium | Multi-indicator convergence required for "Strong" tier; per-feature transparency; analyst review gate |
| False negatives (missed links) | Medium | Multiple linking modalities (key, wallet, style, behavior); periodic re-analysis |
| Unauthorized access to the platform | High | RBAC, TLS, rate limiting, audit logging, secrets management, security testing phase |
| Sensitive intelligence exposure | High | Access-checked exports, data minimization, access logging, secure report generation |
| Model bias | Medium | Evaluate on balanced same/different-author data; document dataset provenance; human review |
| Incorrect automated conclusions | High | Confidence model, immutable evidence, no auto-merging, full audit logging, clear "lead vs confirmed" labeling |

# 22. Final Proposed Architecture

```
INTELLIGENCE SOURCES
        |
        v
COLLECTION LAYER
        |
        v
NORMALIZATION / NLP
        |
   +----+----+
   |         |
   v         v
INFRASTRUCTURE   ACTOR/PERSONA
  ANALYSIS         ANALYSIS
   |         |
   +----+----+
        |
        v
RELATIONSHIP ENGINE
        |
        v
POSTGRESQL DATABASE
        |
        v
FASTAPI + EXPRESS.JS BACKEND
        |
        v
NEXT.JS / REACT UI (with Next.js API routes as BFF)
        |
   +----+----+----+
   |    |         |
   v    v         v
GRAPH  TIMELINE  REPORTS
```

## How the Components Communicate

1.  Sources -> Collection: scheduled pulls through a source adapter interface; raw payloads + provenance stored.

2.  Collection -> Normalization: validated, deduplicated, canonicalized into typed entities.

3.  Normalization -> Analysis branches: entities feed both the Infrastructure Analysis (indicator fingerprinting/correlation) and Actor/Persona Analysis (feature extraction, similarity).

4.  Analysis -> Relationship Engine: deterministic and probabilistic candidate links created, each with evidence + confidence.

5.  Relationship Engine -> PostgreSQL: all writes transactional; evidence rows immutable.

6.  PostgreSQL -> FastAPI (core services): REST endpoints serve search, profiles, graph, timeline, and analysis queries.

7.  FastAPI <-> Express.js (proposed): Express.js optionally fronts or supplements FastAPI as an API-gateway/BFF layer for lightweight or Node-friendly endpoints, keeping AI/ML logic in Python.

8.  Backend -> Next.js/React UI: typed JSON over HTTPS; the UI renders dashboard, graph (client-side graph library), timeline, and AI views. Next.js API routes may proxy calls to Express.js/FastAPI.

9.  UI -> Reports: export endpoints produce CSV/JSON and evidence-annotated reports, access-checked and audit-logged.

# 23. Final Technology Table

**PROPOSED STACK — not an official NTRO-mandated stack.**

| Layer | Proposed Technology | Purpose |
| --- | --- | --- |
| Frontend | Next.js + React + TypeScript | Investigator UI |
| Styling | Tailwind CSS | UI styling |
| Backend | Python + FastAPI (core) + Node.js/Express.js (proposed addition) + Next.js API routes (proposed BFF) | APIs and business logic — FastAPI for AI/ML-adjacent and core processing; Express.js/Next.js API routes for gateway, lightweight, or frontend-adjacent endpoints |
| AI/ML | Python + scikit-learn + NLP libraries | Stylometric/behavioral analysis |
| Database | PostgreSQL | Intelligence storage |
| Graph | Suitable React graph library (team to finalize) | Relationship visualization |
| Authentication | Proposed token-based auth + RBAC | Access control |
| Deployment | Proposed container/cloud-based deployment | Hosting |

# 24. Facts vs Proposed Design

| Item | Status |
| --- | --- |
| Problem requirements | Explicitly stated in problem statement |
| NTRO as organizing organization | Explicitly stated |
| Continuous collection of threat-actor footprints | Explicitly stated |
| Infrastructure misconfiguration analysis (server-status, SSL certs, banners, descriptors, clearnet matching) | Explicitly stated |
| Cross-marketplace actor relationship mapping (handles, PGP, wallets, trust links) | Explicitly stated |
| Stylometric persona identification | Explicitly stated |
| Behavioral profiling | Explicitly stated |
| Analytical frontend (search, timeline, profiles, graph, evidence, confidence) | Explicitly stated |
| Autonomous mode | Explicitly stated (as a requirement; implementation is future work) |
| CSV/JSON/report export | Explicitly stated |
| React/Next.js, TypeScript, Tailwind | Proposed technology |
| FastAPI backend | Proposed technology |
| Express.js (Node.js) as an additional backend/API-gateway layer | Proposed technology (added by request; optional, not a replacement for FastAPI) |
| Next.js API routes as a BFF layer | Proposed technology (added by request) |
| PostgreSQL database | Proposed technology |
| Specific ML algorithms (TF-IDF n-grams, cosine similarity, classifiers) | Proposed implementation choices |
| Specific intelligence sources/datasets | Not specified — to be determined by authorized access |
| Specific cloud provider | Not specified |
| Accuracy/performance numbers | Not available — must be measured, never assumed |
| Confidence tier definitions | Proposed design, to be validated during implementation |
| Project name "ThreatLens" | Proposed label, unofficial |

# Closing Statement

This document is a technical blueprint for planning, development, testing, and presentation of the project. It deliberately separates what the problem statement requires from what the team proposes to build, and it frames the system as what it genuinely is: a defensive, authorized threat-intelligence platform that identifies relationships, correlates indicators, generates investigative leads, provides evidence, estimates similarity, and assigns analytical confidence — with human investigators making every final attribution decision.

**Express.js and Next.js have been added to the proposed backend stack in this revision, as a bounded, optional addition to the core Python/FastAPI backend — not a replacement, and not an NTRO-mandated requirement.**
