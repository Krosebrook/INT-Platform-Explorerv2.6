# INT Platform Explorer Consolidation Design

**Date:** 2026-03-03
**Status:** Approved

## Goal

Consolidate 5 repositories into a single full-stack application, merging all features from:

- **INT-Platform-Explorer** (P1) — main full-stack app, 8 tabs, Express + PostgreSQL backend
- **Aiplatformexplorer-main** (P2) — Figma export, 7 routes, DDD architecture, 203 source files
- **Enterpriseprofilebuilder-main** (P3) — Figma export, 21+ sections, 225 source files
- **INT-Platform-Explorer-1** — disposable backup (identical to P1)
- **INT-Platform-Explorer-2** — disposable backup (identical to P1 + tar.gz)

## Decisions

- **Architecture:** Keep P1's full-stack Express + PostgreSQL backend
- **Feature scope:** All features from all 3 projects
- **Design system:** Keep P1's sunset/sunrise theme
- **Location:** Consolidate in-place in INT-Platform-Explorer
- **Approach:** "Main as Foundation" — use P1 as base, incrementally port features from P2 and P3

## Frontend Architecture: Feature-Sliced Design (FSD)

Adopt Feature-Sliced Design, the current standard for scalable enterprise React apps. FSD organizes code into layers with strict unidirectional dependency rules.

### Layer Structure

```
client/src/
│
├── app/                          # Layer 1: App (top-level wiring)
│   ├── providers/                # All context providers composed here
│   ├── routes/                   # Route definitions
│   ├── styles/                   # Global styles, theme, CSS variables
│   └── index.tsx                 # App entry point
│
├── pages/                        # Layer 2: Pages (route entry points)
│   ├── explorer/
│   ├── comparison/
│   ├── matrix/
│   ├── intelligence/
│   ├── stacks/
│   ├── roi/
│   ├── assessment/
│   ├── strategy/
│   ├── rfp/
│   ├── profile-builder/
│   ├── agent-builder/
│   ├── baseline/
│   ├── dashboard/
│   ├── deployment/
│   ├── analytics/
│   ├── collaboration/
│   ├── governance/
│   ├── ecosystem/
│   ├── knowledge/               # KB + Best Practices + Guides + Ops + Ref + FAQ
│   └── settings/
│
├── widgets/                      # Layer 3: Self-contained UI blocks
│   ├── sidebar-nav/              # Collapsible sidebar navigation
│   ├── command-palette/          # Cmd+K quick navigation
│   ├── feedback-widget/          # Floating feedback form
│   ├── role-filter/              # Global role filter bar
│   └── platform-card/            # Reusable platform display card
│
├── features/                     # Layer 4: Reusable business actions
│   ├── platform-search/          # Search + filter logic
│   ├── platform-compare/         # Comparison selection (up to 4)
│   ├── roi-calculation/          # ROI compute engine
│   ├── assessment-wizard/        # Multi-step assessment flow
│   ├── stack-management/         # Save/load platform stacks
│   ├── rfp-generation/           # RFP doc builder + PDF export
│   ├── agent-configuration/      # Agent create/edit logic
│   ├── export-data/              # CSV/PDF export actions
│   └── theme-toggle/             # Dark/light mode
│
├── entities/                     # Layer 5: Business domain objects
│   ├── platform/                 # Platform data model, API, types
│   ├── user/                     # User/auth model
│   ├── persona/                  # Persona definitions
│   ├── role/                     # Enterprise roles
│   ├── agent/                    # Agent definitions
│   ├── stack/                    # Saved stack model
│   └── assessment/               # Assessment results model
│
└── shared/                       # Layer 6: Detached reusable code
    ├── ui/                       # shadcn components (Button, Card, etc.)
    ├── api/                      # API client, queryClient config
    ├── lib/                      # Utility functions (formatting, etc.)
    └── config/                   # Constants, feature flags, env config
```

### Dependency Rules

```
app -> pages -> widgets -> features -> entities -> shared
```

Each layer can only import from layers strictly below it. Never above or sideways on the same layer.

## Navigation: Collapsible Sidebar

Replace the horizontal tab bar with a collapsible sidebar grouped into 6 categories:

| Group | Sections |
|-------|----------|
| **Discover** | Explorer, Comparison, Matrix, Intelligence, Stacks |
| **Evaluate** | ROI, Assessment, Strategy, RFP Generator |
| **Build** | Profile Builder, Agent Builder, Personas & Roles, System Baseline |
| **Operate** | Dashboard, Deployment, Analytics, Collaboration, Governance |
| **Ecosystem** | Microsoft Ecosystem, MCP Tools, App Marketplace |
| **Resources** | Knowledge Base, Best Practices, Feature Guides, Ops Manual, Reference Library, FAQ |

Sidebar features: icon + text labels, accordion expand/collapse, sticky position, persisted collapse state, active state highlighting, breadcrumbs in content area.

### Routing

Keep wouter with flat routes:

```
/dashboard, /explorer, /comparison, /matrix, /intelligence, /stacks,
/roi, /assessment, /strategy, /rfp, /profile-builder, /agent-builder,
/baseline, /deployment, /analytics, /collaboration, /governance,
/ecosystem, /mcp-tools, /marketplace, /knowledge, /best-practices,
/feature-guides, /operations, /reference, /faq, /settings
```

## Feature Inventory

### Overlapping Features (merge best-of-breed)

| Feature | P1 (keep as base) | P2 (merge in) | P3 (merge in) |
|---------|-------------------|---------------|---------------|
| Platform Explorer | Card grid + filters | Table/card toggle, export, deep linking, stack saving | -- |
| ROI Calculator | Base UI | Scenario presets (MS/Google/Hybrid) | 3-year projection chart |
| Strategy | 3-tier display | -- | Stats, research sources, PDF export |
| Assessment | 5-step wizard (keep) | -- | Scoring/tier assignment UI |
| Comparison | Score bars, winner highlighting | -- | CSV download |
| Personas/Roles | 72-persona library | Persona creation wizard | Operational role profiles |

### Unique Features from P2

| Feature | Description |
|---------|-------------|
| Intelligence Engine | Department/capability/budget wizard, ranked platform recs |
| Saved Stacks | Manage saved platform combinations |
| RFP Generator | Auto-generate RFP docs, PDF export |
| Command Palette | Cmd+K quick navigation |

### Unique Features from P3

| Feature | Description |
|---------|-------------|
| Dashboard | Executive overview with stats and quick actions |
| Agent Builder | Create/configure/test autonomous agents |
| Deployment Planning | Multi-phase planner with task tracking |
| Governance & Compliance | IR playbooks, SLA metrics, risk register |
| Analytics Dashboard | KPI cards, usage charts, model breakdown |
| Knowledge Base | Searchable articles by category |
| Collaboration Hub | Workspaces, shared views, activity feed |
| Operations Manual | Service tiers, ROI framework, troubleshooting |
| System Baseline | Security directives, behavioral config templates |
| Feature Guides | Claude capability documentation |
| MCP Tools Catalog | MCP server + skills catalog |
| Best Practices | Prompting, security, workflow tutorials |
| Reference Library | Role-filtered internal docs |
| FAQ | Frequently asked questions |
| App Marketplace | Third-party integration install/uninstall |
| Settings | Profile, security, notifications |
| Global Role Filtering | App-wide content filtering by role |
| Feedback Widget | Floating feedback form |

## Migration Phases

### Phase 1: Scaffold & Restructure

Restructure P1's client/src/ from flat layout into FSD structure. Move existing 8 tabs into pages/ and extract logic into features/ and entities/. Build sidebar navigation to replace horizontal tab bar.

Result: Same 8 features, new architecture, sidebar nav working.

### Phase 2: Port P2 Unique Features

1. Intelligence Engine (recommendation wizard)
2. Saved Stacks (platform combination persistence)
3. RFP Generator (procurement workflow)
4. Command Palette (Cmd+K navigation)

Also merge P2 enhancements: Explorer table/card toggle + export, ROI scenario presets.

### Phase 3: Port P3 Operate & Build Features

1. Dashboard (executive landing page)
2. Agent Builder (agent creation)
3. Analytics Dashboard (KPI tracking)
4. Deployment Planning (task tracking)
5. Governance & Compliance (enterprise requirement)
6. Collaboration Hub (team workflows)
7. System Baseline (Claude config templates)
8. App Marketplace (integration catalog)
9. Settings (user preferences)

Also merge P3 enhancements: ROI 3-year chart, Strategy PDF export + stats, Comparison CSV download, Assessment scoring UI, global role filtering.

### Phase 4: Port P3 Resource Features

1. Knowledge Base
2. Best Practices
3. Feature Guides
4. Operations Manual
5. Reference Library
6. FAQ
7. Feedback Widget

### Phase 5: Cleanup

- Delete -1 and -2 backup directories
- Archive or delete Aiplatformexplorer-main and Enterpriseprofilebuilder-main
- Update README, deployment guide, design guidelines
- Add new API routes for features needing persistence

## Data & State Strategy

| P2/P3 Pattern | Consolidated Pattern |
|---------------|---------------------|
| Zustand stores | TanStack Query (server state) or React useState/useReducer (UI state) |
| Supabase client calls | Express API routes via existing queryClient |
| react-router-dom | wouter |
| Sonner toasts | Existing shadcn toast system |
| Hono references | Remove (Express backend) |

## Backend Impact

Express backend stays as-is. New API routes added incrementally:

- `GET/POST /api/stacks` — saved stacks persistence
- `GET /api/agents` — agent definitions
- `POST /api/rfp/generate` — RFP document generation

Remaining new features use static data or client-side state initially.

## Adaptation Rules

- UI components: Adapt to sunset theme tokens, reuse shared/ui/ shadcn primitives
- Business logic: Port into features/ layer, rewire data fetching to TanStack Query
- Types/models: Consolidate into entities/ layer, deduplicate shared types
- Static data/content: Copy directly (knowledge base articles, FAQ entries, etc.)
