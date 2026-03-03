# INT Platform Explorer v4.0

Enterprise decision-support tool for comparing AI platforms. Evaluate 16 AI platforms across 25 capability dimensions, calculate ROI, and generate tiered recommendations for stakeholder presentations.

## Features

- **Explorer Tab**: Browse and filter 16 AI platforms with detailed capability scores
- **Comparison Tab**: Side-by-side analysis of up to 4 platforms
- **Matrix Tab**: Capability grid visualization across all dimensions
- **ROI Calculator**: Business case tool with productivity and cost analysis
- **Strategy Tab**: 3-tier platform recommendations
- **Assessment Tab**: 5-step AI readiness wizard
- **Profile Builder**: Claude enterprise configuration guide
- **Ecosystem View**: Microsoft ecosystem integration map

> **Note:** The frontend is being refactored from a monolithic `components/` + `lib/` structure to [Feature-Sliced Design (FSD)](https://feature-sliced.design/). The `shared/` layer (UI, API, lib) is complete. Entity, feature, widget, and page scaffolding is in place. Migration of remaining components is ongoing.

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
├── pages/                  # Page layer: one directory per route
│   ├── explorer/           # Platform explorer
│   ├── comparison/         # Side-by-side comparison
│   ├── matrix/             # Feature matrix
│   ├── roi/                # ROI calculator
│   ├── strategy/           # AI strategy advisor
│   ├── assessment/         # Readiness assessment
│   ├── profile-builder/    # Profile builder
│   └── ecosystem/          # Microsoft ecosystem
├── widgets/                # Compositional components used across pages
│   ├── sidebar-nav/        # Main navigation sidebar
│   └── platform-card/      # Reusable platform card
├── features/               # Business logic slices
│   ├── platform-search/    # Search and filter platforms
│   ├── platform-compare/   # Platform comparison selection
│   ├── theme-toggle/       # Dark/light theme switching
│   ├── roi-calculation/    # ROI formula engine
│   └── assessment-wizard/  # Assessment wizard state
├── entities/               # Domain models and data
│   ├── platform/           # Platform data, types, API
│   ├── user/               # User model and auth
│   ├── persona/            # Persona definitions
│   ├── role/               # Role taxonomy
│   └── assessment/         # Assessment questions
└── shared/                 # Shared utilities (no business logic)
    ├── ui/                 # shadcn/ui components (47 components)
    ├── api/                # API client (queryClient, fetch helpers)
    ├── lib/                # Utility functions (cn, auth-utils)
    └── config/             # App configuration constants
```

> **Legacy directories** (`client/src/components/`, `client/src/lib/`, `client/src/hooks/`) still exist during the migration and will be removed once all code is ported to the FSD layers above.

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

- Lazy loading for tab content
- In-memory caching for platform data
- TanStack Query for efficient data fetching
- Vite for fast development and optimized builds

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

© 2026 INT Inc. All rights reserved.
