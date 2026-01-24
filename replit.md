# INT Platform Explorer v4.0

## Overview

INT Platform Explorer is an enterprise decision-support tool for C-suite and upper management to evaluate AI platforms for a new AIaaS department. It enables organizations to evaluate 50 AI platforms across 20 capability dimensions, organized into 8 ecosystem suites (Anthropic, OpenAI, Microsoft, Google, Automation, LangChain, Open Source, Independent). Features include ROI calculation, tiered strategic recommendations, and a comprehensive Persona Profile Builder with 72 INT Inc. personas mapped to optimal Claude configurations (5 model variants).

The application is built as a React single-page application with an Express backend, using a tabbed interface with eight main sections: Explorer (browse/filter platforms by ecosystem), Comparison (side-by-side evaluation), Matrix (capability grid with ecosystem grouping), ROI Calculator, Strategy (tiered recommendations with ecosystem coverage), Assessment (AI readiness wizard), Profile Builder (Claude configuration guide with Personas sub-tab), and Microsoft Deep Dive (comprehensive Microsoft ecosystem analysis).

## Recent Changes (January 24, 2026)

**INT Inc Claude Role Taxonomy v4.0:**
- Created comprehensive role taxonomy with 41 FTE across 7 teams: Executive Leadership, Sales & BD, Client Success, Engineering, Marketing, Operations, Tech Services
- Each role includes Claude Enterprise configuration: feature access (Web Search, Memory, Code Execution, Artifacts, Files, Research), memory focus, use cases, guardrails, and security clearance (1-5 stars)
- Added "Taxonomy" sub-tab in Profile Builder with 3 inner tabs: Roles, Feature Matrix, Data Security
- Roles tab: Team filtering, search functionality, expandable team sections, role cards with security badges
- Feature Matrix tab: Team-level access visualization for all Claude features
- Data Security tab: 4-level data classification (Public, Internal, Confidential, Restricted) with color-coded cards
- Role detail modal shows department, level, reporting chain, memory focus, use cases, guardrails, and feature access status
- $7.1M total revenue tracked across B2B industry focus

## Previous Changes (January 18, 2026)

**Client Personas Module:**
- Added B2B SaaS client personas (CMO, Ops Lead, Founder, Product Manager, Ecommerce Manager, VP Sales, CTO, Customer Success Lead)
- Each persona includes goals, pain points, success metrics, AI use cases, tech proficiency, budget tier, and decision authority
- AI tool recommendation engine maps personas to relevant platforms from all 50 based on role, goals, and industry context
- Linked to INT Inc. services (Brand Strategy, UX/UI Design, Growth Engineering, AI Integration)
- Case studies with outcomes: Northwind SaaS Growth (-2.9% churn), Contoso Retail Conversion (+18% CVR), Fabrikam Fintech Rebrand (2x pipeline)
- Added as "Clients" sub-tab in Profile Builder

**Microsoft Ecosystem Deep Dive Module:**
- Created dedicated tab for comprehensive 2025 Microsoft AI ecosystem analysis based on research document
- Added 10 Microsoft products with detailed data: Copilot Studio, Power Automate, Power Apps, Power Pages, Power BI, Dataverse, AI Builder, Azure AI Foundry, Agent 365, Frontier Program
- Implemented product relationship visualization showing how Microsoft products integrate
- Added licensing comparison table with pricing tiers for all Microsoft AI and Power Platform products
- Created Frontier Firm readiness section with statistics and capability pillars
- Added MCP (Model Context Protocol) section showing supported products and servers
- Product cards include key features, AI capabilities, pricing models, target users, and compliance certifications
- Sub-tabs: Products, Ecosystem Map, Licensing, Frontier Firm, MCP

**Ecosystem Framework & Platform Expansion to 50 Platforms:**
- Created 8 ecosystem suites: Anthropic/Claude, OpenAI, Microsoft, Google, Automation, LangChain, Open Source, Independent
- Added 18 new platforms including automation tools (Zapier, Make.com, Pipedream, n8n) and ecosystem products (LangChain, LangGraph, LangSmith, ChatGPT Plus, GPT Store, Power Platform, Dynamics 365 Copilot, Microsoft 365 Copilot, Google AI Studio, Duet AI, NotebookLM)
- Added ecosystem filtering to Explorer, Matrix, and Strategy tabs with colored badges
- Platform cards now display ecosystem badges and specialty tags (14 specialty categories: coding, content, automation, enterprise-search, analytics, agents, multimodal, voice, security, workflow, integration, data-science, conversational, it-service)
- Updated strategy tiers with ecosystem coverage analysis showing which ecosystems are represented in each tier
- Extended Platform schema with ecosystem, specialties, and compatibility fields

**Previous Platform Expansion (32 Platforms):**
- Added 10 enterprise AI platforms: Glean (Enterprise Search), Vertex AI (Google Cloud), Salesforce Agentforce (CRM AI), Databricks (Data+AI Platform), Writer (Enterprise Content AI), Together AI (Inference Platform), Cursor (AI Code Editor), Dataiku (Data Science Platform), Cognigy (Conversational AI), Moveworks (IT Service Automation)
- Updated strategy tiers to include new platforms in Foundation (Tier 1) and Specialization (Tier 2) categories

**Persona Profile Builder:**
- Created comprehensive 72-persona framework organized by Front of House (23 personas) and Back of House (49 personas)
- Persona attributes include: title, age range, experience, education, location, company size, industry, primary goals, key pain points, tech proficiency (Novice/Medium/Expert/Strategic), decision authority, budget tier (Low/Medium/High/Ultimate), success metrics, communication preferences, AI tool recommendations, and relationship maps
- Implemented intelligent Claude model recommendation engine matching personas to optimal models (Opus 4.5, Opus 4.0, Sonnet 4.5, Sonnet 4.0, Haiku 3.5) based on tech proficiency and budget tier
- Added category grouping with expand/collapse, search filtering, grid view, and detailed persona modal views
- Integrated as "Personas" sub-tab within the Profile Builder section

**Previous Changes (January 15, 2026):**
- Expanded from 16 to 22 AI platforms (Claude Opus 4, Mistral Large 2, Meta Llama 3.1, xAI Grok 2, DeepSeek V3, Groq LPU)
- Extended capability matrix from 10 to 20 dimensions
- Added Claude model variants to Profile Builder: 5 models with new Models sub-tab
- Normalized platform IDs to hyphen-case format across all data files for consistency

**Security Enhancements:**
- Added Helmet middleware with CSP configuration (environment-aware for dev HMR)
- Implemented rate limiting (100 req/15min general, 20 req/min for ROI)
- Added comprehensive Zod validation for all POST endpoints

**Error Handling:**
- Added ErrorBoundary and TabErrorBoundary components for graceful failure handling
- Each tab content wrapped with error boundaries for isolation

**Accessibility:**
- Added SkipLink component for keyboard navigation
- Main content has proper id and tabIndex for focus management

**PWA Support:**
- Added manifest.json with app metadata and icons
- Implemented service worker with offline caching strategy
- Added meta tags for mobile web app support

**Documentation:**
- Created comprehensive README.md with setup instructions
- Added CONTRIBUTING.md with development guidelines
- Updated AUDIT_REPORT.md with resolved issues
- INT_PLATFORM_EXPLORER_REBUILD_DOCUMENTATION.md - Complete rebuild specifications with 14 AI-ready implementation prompts
- INT_PLATFORM_EXPLORER_DEPLOYMENT_GUIDE.md - Production deployment guide for Railway/Render/Fly.io with CI/CD, testing, monitoring

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

**Frontend Architecture:**
- React 18 with TypeScript
- Vite for development and bundling
- Tailwind CSS with CSS custom properties for theming (light/dark mode)
- shadcn/ui component library (Radix UI primitives)
- TanStack Query for server state management
- Client-side routing via tab-based navigation (no react-router)

**Backend Architecture:**
- Express.js server with TypeScript
- In-memory data storage (platform data defined in `server/storage.ts`)
- RESTful API endpoints under `/api/` prefix
- Static file serving for production builds

**Data Layer:**
- Drizzle ORM configured for PostgreSQL (schema in `shared/schema.ts`)
- Currently uses in-memory storage for platform data
- Database connection expects `DATABASE_URL` environment variable
- Shared TypeScript types between client and server via `@shared/` alias

**Key Design Decisions:**
1. **Static platform data** - Platform information is hardcoded rather than database-driven, optimizing for read performance and simplifying deployment
2. **Shared schema** - TypeScript interfaces defined in `shared/schema.ts` ensure type safety across the full stack
3. **Component-driven UI** - Extensive use of shadcn/ui components with custom theming via CSS variables
4. **Monorepo structure** - Client (`client/`), server (`server/`), and shared code (`shared/`) in single repository with path aliases

**Build System:**
- Development: Vite dev server with HMR proxied through Express
- Production: Vite builds to `dist/public`, esbuild bundles server to `dist/index.cjs`
- Database migrations via `drizzle-kit push`

## External Dependencies

**Database:**
- PostgreSQL (via `DATABASE_URL` environment variable)
- Drizzle ORM with `drizzle-kit` for schema management
- `connect-pg-simple` for session storage

**UI Libraries:**
- Radix UI primitives (dialogs, tooltips, tabs, sliders, etc.)
- Lucide React for icons
- Embla Carousel for carousel components
- Recharts for data visualization

**Fonts:**
- Inter (primary UI font)
- JetBrains Mono (monospace for metrics/code)
- DM Sans, Fira Code, Geist Mono (additional typography options)

**Development Tools:**
- TypeScript with strict mode
- Replit-specific Vite plugins for error overlay and dev banner