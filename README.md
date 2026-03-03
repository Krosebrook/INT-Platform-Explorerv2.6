# INT Platform Explorer v4.0

Enterprise decision-support tool for comparing AI platforms. Evaluate 50 AI platforms across 20 capability dimensions, calculate ROI, and generate tiered recommendations for stakeholder presentations. Consolidated from three source projects (P1 main app, P2 AI Platform Explorer, P3 Enterprise Profile Builder) into a single full-stack application.

## Features

### Discover
- **Explorer**: Browse and filter 50 AI platforms with grid/table views and CSV/JSON export
- **Comparison**: Side-by-side analysis of up to 4 platforms with export menu
- **Matrix**: Capability grid visualization across all dimensions
- **Intelligence Engine**: Multi-step wizard recommending platforms by department, capabilities, and budget
- **Saved Stacks**: Save, load, and manage curated platform collections

### Evaluate
- **ROI Calculator**: Business case tool with scenario presets (Microsoft, Google, Hybrid) and 3-year projection charts
- **Assessment**: 5-step AI readiness wizard with tier assignment (AI Native / Adopter / Explorer)
- **Strategy**: 3-tier platform recommendations with stats summary and PDF export
- **RFP Generator**: Section-based RFP document builder

### Build
- **Profile Builder**: Claude enterprise configuration guide with persona and role taxonomy
- **Agent Builder**: AI agent configuration, template library, and test playground
- **System Baseline**: Security directives, behavioral rules, and role-based templates

### Operate
- **Dashboard**: Stats overview, quick navigation, and getting-started steps
- **Analytics**: KPI cards, usage charts, and model breakdown (Recharts)
- **Deployment**: Phase-based deployment planning with progress tracking
- **Governance**: IR playbooks, SLA metrics, risk register, staging checklists
- **Collaboration**: Workspace management and activity feed

### Ecosystem
- **Microsoft**: Microsoft ecosystem integration map
- **App Marketplace**: Integration catalog (Slack, GitHub, Notion, etc.)
- **MCP Tools**: MCP server catalog and built-in skills directory

### Resources
- **Knowledge Base**: 15 articles across 5 categories with search
- **Best Practices**: 24 practices with category and difficulty filters
- **Feature Guides**: 10 feature walkthroughs with highlights and use cases
- **Operations Manual**: Service tiers, ROI framework, success metrics, troubleshooting
- **Reference Library**: 12 documents across 4 audience categories
- **FAQ**: 28 items with search and category filtering

### Global
- **Command Palette**: Cmd+K / Ctrl+K quick navigation across all routes
- **Feedback Widget**: Floating feedback form with type, rating, and description
- **Settings**: Profile, preferences, and notification management
- **Collapsible Sidebar**: 7-group navigation with persistent collapse state

> Built with [Feature-Sliced Design (FSD)](https://feature-sliced.design/) — a layered architecture with strict import rules. Navigation uses a collapsible sidebar with wouter routing.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: TanStack Query
- **Authentication**: Replit Auth (OAuth with Google, GitHub, email)

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (automatically provided on Replit)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - `DATABASE_URL`: PostgreSQL connection string
   - `SESSION_SECRET`: Session encryption key

4. Push database schema:
   ```bash
   npm run db:push
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## Project Structure

The frontend follows **Feature-Sliced Design (FSD)** — a layered architecture where each layer has a clear responsibility and strict import rules (layers can only import from layers below them).

```
client/src/
├── app/                    # App layer: providers, routes, layout, styles
│   ├── providers/          # React context providers
│   ├── routes/             # Wouter route definitions
│   └── styles/             # Global CSS
├── pages/                  # Page layer: one directory per route (27 pages)
│   ├── explorer/           # Platform explorer (grid/table views)
│   ├── comparison/         # Side-by-side comparison
│   ├── matrix/             # Feature matrix
│   ├── intelligence/       # Intelligence Engine wizard
│   ├── stacks/             # Saved platform stacks
│   ├── roi/                # ROI calculator with scenario presets
│   ├── assessment/         # Readiness assessment with tier assignment
│   ├── strategy/           # AI strategy advisor with PDF export
│   ├── rfp/                # RFP document generator
│   ├── profile-builder/    # Profile builder
│   ├── agent-builder/      # Agent configuration builder
│   ├── baseline/           # System baseline templates
│   ├── dashboard/          # Overview dashboard
│   ├── analytics/          # Usage analytics charts
│   ├── deployment/         # Deployment planning
│   ├── governance/         # Governance & compliance
│   ├── collaboration/      # Workspace collaboration
│   ├── ecosystem/          # Microsoft ecosystem
│   ├── marketplace/        # App marketplace
│   ├── mcp-tools/          # MCP tools catalog
│   ├── knowledge/          # Knowledge base articles
│   ├── best-practices/     # Best practices guide
│   ├── feature-guides/     # Feature walkthroughs
│   ├── operations/         # Operations manual
│   ├── reference/          # Reference library
│   ├── faq/                # FAQ
│   └── settings/           # User settings
├── widgets/                # Compositional components used across pages
│   ├── sidebar-nav/        # Main navigation sidebar (7 groups, 27 items)
│   ├── command-palette/    # Cmd+K quick navigation
│   ├── feedback-widget/    # Floating feedback form
│   └── platform-card/      # Reusable platform card
├── features/               # Business logic slices
│   ├── platform-search/    # Search and filter platforms
│   ├── platform-compare/   # Platform comparison selection (max 4)
│   ├── theme-toggle/       # Dark/light theme switching
│   ├── roi-calculation/    # ROI formula engine
│   ├── assessment-wizard/  # Assessment wizard state
│   ├── intelligence-engine/# Intelligence Engine wizard logic
│   ├── stack-management/   # Stack CRUD operations
│   ├── rfp-generation/     # RFP document model
│   ├── export-data/        # CSV/JSON export actions
│   └── agent-configuration/# Agent builder logic
├── entities/               # Domain models and data
│   ├── platform/           # Platform data, types, API
│   ├── user/               # User model and auth
│   ├── persona/            # Persona definitions
│   ├── role/               # Role taxonomy
│   ├── assessment/         # Assessment questions
│   ├── stack/              # Saved stack model
│   └── agent/              # Agent templates and types
└── shared/                 # Shared utilities (no business logic)
    ├── ui/                 # shadcn/ui components (47 components)
    ├── api/                # API client (queryClient, fetch helpers)
    ├── lib/                # Utility functions (cn, auth-utils)
    └── config/             # App configuration constants
```

> All legacy directories (`components/`, `lib/`, `hooks/`) have been removed. The FSD structure above is the sole source of truth.

### Backend & Shared

```
server/                     # Express backend
├── routes.ts               # API endpoints
├── storage.ts              # Data storage layer
└── db.ts                   # Database connection
shared/                     # Shared types and schemas (used by both client & server)
├── schema.ts               # TypeScript interfaces
└── validation.ts           # Zod validation schemas
```

## API Endpoints

### Platforms
- `GET /api/platforms` - List all platforms
- `GET /api/platforms/:id` - Get platform by ID
- `POST /api/platforms/compare` - Compare multiple platforms

### Strategy
- `GET /api/strategy` - Get strategy tier recommendations

### ROI Calculator
- `POST /api/roi/calculate` - Calculate ROI metrics

### Authentication
- `GET /api/login` - Initiate OAuth login
- `GET /api/logout` - Log out user
- `GET /api/auth/user` - Get current user

## Security Features

- **Input Validation**: Zod schemas for all POST endpoints
- **Rate Limiting**: API request throttling (100 req/15min, 20 req/min for ROI)
- **Security Headers**: Helmet middleware for CSP, XSS protection
- **Session Security**: HTTP-only cookies, secure transport

## Accessibility

- WCAG 2.2 compliant design patterns
- Keyboard navigation support
- Skip-to-content link
- ARIA labels and semantic HTML
- Error boundaries for graceful failure handling

## Performance

- Client-side routing with wouter (no full-page reloads)
- In-memory caching for platform data
- TanStack Query for efficient data fetching
- Vite for fast development and optimized builds
- localStorage persistence for user preferences and state

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

© 2026 INT Inc. All rights reserved.
