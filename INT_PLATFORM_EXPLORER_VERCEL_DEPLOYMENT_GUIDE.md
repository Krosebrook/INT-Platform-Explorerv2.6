# INT Platform Explorer - Full-Stack Production Deployment Guide

## For: Enterprise Production Deployment with CI/CD, Testing & Monitoring

This comprehensive guide covers deploying INT Platform Explorer to production using **Railway, Render, or Fly.io** (recommended), GitHub CI/CD, and complete DevOps infrastructure.

> **IMPORTANT ARCHITECTURE NOTE**: This application uses a **Node.js Express server** that serves both the API (`/api/*`) and the Vite-built React frontend. It is NOT a serverless/Edge function architecture. 
>
> **RECOMMENDED PLATFORMS**: Railway, Render, Fly.io, or Replit Deployments (all support Node.js servers natively).
>
> Supabase database is OPTIONAL - the app currently uses in-memory storage and works without a database.

---

## TABLE OF CONTENTS

1. [Audience Segmentation](#1-audience-segmentation)
2. [High-Level Overview](#2-high-level-overview)
3. [Prerequisites & Environment Setup](#3-prerequisites--environment-setup)
4. [GitHub Repository Setup](#4-github-repository-setup)
5. [Supabase Database Setup](#5-supabase-database-setup)
6. [Vercel Deployment Configuration](#6-vercel-deployment-configuration)
7. [CI/CD Pipeline (GitHub Actions)](#7-cicd-pipeline-github-actions)
8. [Testing Suites](#8-testing-suites)
9. [Monitoring & Observability](#9-monitoring--observability)
10. [Edge Cases & Error Handling](#10-edge-cases--error-handling)
11. [Graceful Degradation](#11-graceful-degradation)
12. [Rollback Procedures](#12-rollback-procedures)
13. [Automation & Integrations](#13-automation--integrations)
14. [Security & Compliance](#14-security--compliance)
15. [Infrastructure Extras](#15-infrastructure-extras)
16. [Troubleshooting Guide](#16-troubleshooting-guide)
17. [Version History & Changelog](#17-version-history--changelog)
18. [Appendices](#18-appendices)

---

## 1. AUDIENCE SEGMENTATION

### For End Users
- How to access the deployed application
- Feature overview and usage guides
- Account management and preferences

### For Developers
- Architecture overview and code walkthrough
- API specifications and data models
- Local development setup
- Testing and contribution guidelines

### For Operators/DevOps
- Deployment procedures
- CI/CD pipeline management
- Monitoring, logging, and alerting
- Rollback and disaster recovery
- Security and compliance operations

---

## 2. HIGH-LEVEL OVERVIEW

### 2.1 Application Summary
INT Platform Explorer is an enterprise decision-support tool for C-suite executives evaluating 50 AI platforms across 8 ecosystem suites. The application provides:
- Platform comparison and capability matrix
- ROI calculation and strategy recommendations
- Persona-based AI tool mapping (72 INT Inc. + 8 B2B client personas)
- Microsoft Ecosystem deep dive analysis

### 2.2 Production Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              PRODUCTION STACK                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   [GitHub]  ──push──►  [GitHub Actions CI/CD]  ──deploy──►  [Host]      │
│      │                        │                                 │        │
│      │                   ┌────┴────┐                           │        │
│      │                   │  Tests  │                 Recommended:        │
│      │                   │ ─ Unit  │              ─ Railway (Node.js)   │
│      │                   │ ─ E2E   │              ─ Render (Node.js)    │
│      │                   │ ─ Smoke │              ─ Fly.io (Node.js)    │
│      │                   └─────────┘              ─ Replit Deployments  │
│      │                                                          │        │
│      ▼                                                          ▼        │
│  [Branches]                                              ┌──────────┐   │
│   ─ main ────────────────production────────────────────►│ Prod URL │   │
│   ─ develop ─────────────staging───────────────────────►│ Stage    │   │
│   ─ feature/* ───────────preview───────────────────────►│ Preview  │   │
│                                                          └──────────┘   │
│                                                                          │
│   [Supabase] (optional)         [Redis Upstash]       [Cloudflare]      │
│      │                               │                      │            │
│      ├── PostgreSQL DB              ├── Session Cache      ├── CDN      │
│      ├── Row Level Security         ├── Rate Limiting      ├── WAF      │
│      └── Auth (optional)            └── Pub/Sub            └── DDoS     │
│                                                                          │
│   NOTE: Current app uses in-memory storage.                             │
│   Supabase is optional for persistent storage.                          │
│                                                                          │
│   [Monitoring Stack]                                                     │
│      ├── Posthog (Analytics + Feature Flags)                            │
│      ├── Sentry (Error Tracking) - optional                             │
│      └── Uptime Robot / Checkly (Uptime)                                │
│                                                                          │
│   [Automation Layer]                                                     │
│      ├── Zapier (No-code workflows)                                     │
│      ├── n8n.io (Self-hosted automation)                                │
│      ├── Webhooks (Platform events)                                     │
│      └── AI Tools (Claude CLI, Gemini CLI, Antigravity)                 │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Versioning Strategy
- **Semantic Versioning**: MAJOR.MINOR.PATCH (e.g., 4.1.0)
- **Branches**: 
  - `main` → Production
  - `develop` → Staging
  - `feature/*` → Preview deployments
  - `hotfix/*` → Emergency patches
- **Release Tags**: `v4.0.0`, `v4.1.0-beta.1`

---

## 3. PREREQUISITES & ENVIRONMENT SETUP

### 3.1 Required Accounts
| Service | Purpose | Required? | Signup URL |
|---------|---------|-----------|------------|
| GitHub | Source control, CI/CD | Yes | github.com |
| Railway OR Render OR Fly.io | Node.js hosting | Yes (pick one) | railway.app / render.com / fly.io |
| Supabase | Database (optional) | No* | supabase.com |
| Redis Upstash | Caching (optional) | No | upstash.com |
| Cloudflare | CDN (optional) | No | cloudflare.com |
| Posthog | Analytics (optional) | No | posthog.com |

*The app works with in-memory storage. Supabase only needed for persistent data.

### 3.2 Local Development Tools
```bash
# Required
node >= 20.x
npm >= 10.x
git >= 2.40

# CLI Tools
npm install -g vercel
npm install -g supabase
npm install -g @anthropic-ai/claude-code  # Optional: Claude CLI
```

### 3.3 Environment Variables Reference

#### Production Environment Variables
```env
# Database (Supabase) - if migrating from in-memory storage
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# NOTE: Current app uses in-memory storage. DATABASE_URL only needed if you
# migrate to Supabase. The app will work without it using in-memory data.

# Redis (Upstash) - optional, for caching
UPSTASH_REDIS_REST_URL=https://[region]-[name].upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Analytics (optional)
VITE_POSTHOG_API_KEY=phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_POSTHOG_HOST=https://app.posthog.com

# Server Configuration
NODE_ENV=production
PORT=5000

# Session (if using sessions)
SESSION_SECRET=generate-256-bit-random-string

# Optional: Error Tracking
VITE_SENTRY_DSN=https://xxxxxx@sentry.io/xxxxxxx
```

> **NOTE**: Variables prefixed with `VITE_` are exposed to the frontend.
> The current app is served by a single Express server on port 5000.
> There's no separate API URL needed - frontend and API share the same origin.

### 3.4 First-Run Checklist
- [ ] Fork/clone repository to your GitHub account
- [ ] Create account on Railway, Render, OR Fly.io (pick one)
- [ ] (Optional) Create Supabase project if you need persistent storage
- [ ] Connect your repo to your chosen hosting platform
- [ ] Configure environment variables (NODE_ENV=production, PORT=5000)
- [ ] (Optional) Run database migration if using Supabase
- [ ] Verify deployment works by accessing the URL
- [ ] (Optional) Configure custom domain
- [ ] (Optional) Set up monitoring dashboards

---

## 4. GITHUB REPOSITORY SETUP

### 4.1 Repository Structure
```
int-platform-explorer/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # Main CI pipeline
│   │   ├── preview.yml         # Preview deployments
│   │   ├── production.yml      # Production deployment
│   │   └── scheduled-tests.yml # Nightly test runs
│   ├── CODEOWNERS
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── dependabot.yml
├── client/                      # React frontend
├── server/                      # Express backend
├── shared/                      # Shared TypeScript types
├── tests/                       # CREATE: Test directories
│   ├── unit/                   # Vitest unit tests (optional)
│   ├── e2e/                    # Playwright E2E tests (optional)
│   └── smoke/                  # Smoke tests (optional)
├── scripts/                     # CREATE: Utility scripts
│   └── rollback.sh             # Rollback helper (optional)
├── playwright.config.ts         # CREATE: If adding E2E tests
├── vitest.config.ts             # CREATE: If adding unit tests
└── package.json                 # EXISTS: Add test scripts as needed
```

### 4.2 Branch Protection Rules (GitHub Settings)

Configure these in GitHub → Settings → Branches → Add branch protection rule:

```yaml
# Main branch protection (configure via GitHub UI)
Branch: main
  Required pull request reviews: 1
  Dismiss stale reviews: Yes
  Required status checks:
    - "TypeScript Check"  # Matches job name in ci.yml
    - "Build"             # Matches job name in ci.yml
  Require branches to be up to date: Yes

# Develop branch (optional)
Branch: develop
  Required status checks:
    - "TypeScript Check"
```

### 4.3 CODEOWNERS File
```
# .github/CODEOWNERS
* @your-org/platform-team
/supabase/ @your-org/dba-team
/.github/workflows/ @your-org/devops-team
/client/src/components/ui/ @your-org/frontend-team
```

---

## 5. SUPABASE DATABASE SETUP

### 5.1 Project Creation
1. Go to [supabase.com](https://supabase.com) → New Project
2. Select organization and region (choose closest to users)
3. Set strong database password (save securely)
4. Wait for project provisioning (~2 minutes)

### 5.2 Database Schema (Drizzle ORM)

> **NOTE**: The current application uses **in-memory storage** (see `server/storage.ts`). 
> This schema is for when you want to migrate to persistent database storage.
> Following project guidelines: avoid adding `createdAt`/`updatedAt` unless strictly necessary.
> For array columns, use `text("column").array()` syntax (method chaining, not wrapper function).

```typescript
// shared/schema.ts - Production schema with Supabase (if migrating from in-memory)

import { pgTable, text, json, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// Platforms table (if using DB instead of in-memory)
// NOTE: Current app uses in-memory storage in server/storage.ts
export const platforms = pgTable("platforms", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  priority: text("priority").notNull(),
  verdict: text("verdict").notNull(),
  marketShare: text("market_share"),
  pricing: text("pricing"),
  contextWindow: text("context_window"),
  compliance: text("compliance").array(),  // Correct Drizzle array syntax
  targetUsers: text("target_users"),
  capabilities: json("capabilities").$type<PlatformCapabilities>().notNull(),
  logoColor: text("logo_color"),
  ecosystem: text("ecosystem"),
  specialties: text("specialties").array(),  // Correct Drizzle array syntax
  compatibility: text("compatibility").array(),  // Correct Drizzle array syntax
});

// User sessions for analytics (optional - add only if needed)
export const userSessions = pgTable("user_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id"),
  sessionData: json("session_data"),
});

// ROI calculations log (optional - add only if tracking is needed)
export const roiCalculations = pgTable("roi_calculations", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id").references(() => userSessions.id),
  inputs: json("inputs").$type<ROIInputs>().notNull(),
  results: json("results").$type<ROIResults>().notNull(),
});

export const insertPlatformSchema = createInsertSchema(platforms);
export const insertRoiCalculationSchema = createInsertSchema(roiCalculations).omit({ id: true });
```

### 5.3 Database Migrations

> **CURRENT STATE**: This app uses **Drizzle ORM** with `npm run db:push`.
> Supabase CLI migrations shown below are an alternative approach.
> Choose ONE migration strategy, not both.

#### Option A: Using Drizzle (Current Setup)
```bash
# Push schema changes directly to database
npm run db:push
```

#### Option B: Using Raw SQL Migrations (Supabase CLI)

If you prefer SQL migrations, create this file:

```sql
-- migrations/001_platforms.sql
-- Minimal schema following project guidelines (no timestamps unless needed)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Platforms table (if migrating from in-memory storage)
CREATE TABLE platforms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL,
  verdict TEXT NOT NULL,
  market_share TEXT,
  pricing TEXT,
  context_window TEXT,
  compliance TEXT[],
  target_users TEXT,
  capabilities JSONB NOT NULL,
  logo_color TEXT,
  ecosystem TEXT,
  specialties TEXT[],
  compatibility TEXT[]
);

-- Optional: User sessions (add only if you need to track sessions)
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT,
  session_data JSONB
);

-- Optional: ROI calculations log (add only if you need to persist calculations)
CREATE TABLE roi_calculations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES user_sessions(id) ON DELETE SET NULL,
  inputs JSONB NOT NULL,
  results JSONB NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_platforms_ecosystem ON platforms(ecosystem);
CREATE INDEX idx_platforms_category ON platforms(category);
CREATE INDEX idx_platforms_priority ON platforms(priority);
```

### 5.4 Row Level Security (RLS) Policies

> **IMPORTANT**: RLS policies using `auth.uid()` require Supabase Auth to be enabled.
> If using the Express server without Supabase Auth (current architecture), 
> use `service_role` key from the backend only, or implement custom auth.

```sql
-- supabase/migrations/20260122000001_rls_policies.sql

-- Enable RLS on all tables
ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_calculations ENABLE ROW LEVEL SECURITY;

-- Platforms: Public read via anon key, admin write via service_role
CREATE POLICY "Platforms are viewable by everyone" 
  ON platforms FOR SELECT 
  USING (true);

CREATE POLICY "Platforms are editable by service role only" 
  ON platforms FOR ALL 
  USING (auth.role() = 'service_role');

-- If NOT using Supabase Auth (connecting from Express with service_role):
-- All writes should go through your Express API using SUPABASE_SERVICE_ROLE_KEY
-- The service_role key bypasses RLS entirely

-- User sessions: Simple policy for service_role access
CREATE POLICY "Sessions managed by service role" 
  ON user_sessions FOR ALL 
  USING (auth.role() = 'service_role');

-- ROI calculations: Service role access
CREATE POLICY "ROI calculations managed by service role" 
  ON roi_calculations FOR ALL 
  USING (auth.role() = 'service_role');

-- NOTE: For user-specific access control without Supabase Auth,
-- implement authorization logic in your Express routes instead
```

### 5.5 Database Backup Procedures

```bash
# scripts/backup-database.sh

#!/bin/bash
set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
BACKUP_FILE="$BACKUP_DIR/db_backup_$TIMESTAMP.sql"

# Ensure backup directory exists
mkdir -p $BACKUP_DIR

# Create backup using Supabase CLI
supabase db dump -f $BACKUP_FILE --project-ref $SUPABASE_PROJECT_REF

# Compress backup
gzip $BACKUP_FILE

# Upload to S3/R2 (optional)
if [ -n "$BACKUP_S3_BUCKET" ]; then
  aws s3 cp ${BACKUP_FILE}.gz s3://$BACKUP_S3_BUCKET/database-backups/
fi

# Clean up old local backups (keep last 7)
ls -t $BACKUP_DIR/*.gz | tail -n +8 | xargs -r rm

echo "Backup completed: ${BACKUP_FILE}.gz"
```

### 5.6 Database Restore Procedure

```bash
# scripts/restore-database.sh

#!/bin/bash
set -e

BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: ./restore-database.sh <backup-file.sql.gz>"
  exit 1
fi

# Decompress if needed
if [[ $BACKUP_FILE == *.gz ]]; then
  gunzip -k $BACKUP_FILE
  BACKUP_FILE="${BACKUP_FILE%.gz}"
fi

# Confirm before restore
read -p "WARNING: This will overwrite the database. Continue? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
  echo "Restore cancelled."
  exit 0
fi

# Restore using Supabase CLI
supabase db reset --project-ref $SUPABASE_PROJECT_REF
psql $DATABASE_URL < $BACKUP_FILE

echo "Database restored from: $BACKUP_FILE"
```

---

## 6. DEPLOYMENT PLATFORM SETUP

### 6.1 Recommended: Railway, Render, or Fly.io

This application is a **Node.js Express server** (not serverless). These platforms natively support long-running Node.js servers:

#### Railway (Easiest)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and init
railway login
railway init

# Deploy
railway up

# Environment variables (set in Railway dashboard or CLI)
railway variables set NODE_ENV=production
railway variables set PORT=5000
```

#### Render
```yaml
# Create render.yaml in your repo root (optional - or use dashboard)
services:
  - type: web
    name: int-platform-explorer
    env: node
    plan: free
    buildCommand: npm ci && npm run build
    startCommand: npm run start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
```

Then connect your GitHub repo in the Render dashboard.

#### Fly.io
```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login and launch
fly auth login
fly launch

# Deploy
fly deploy
```

### 6.2 Alternative: Replit Deployments

If you're already on Replit, use the built-in deployment feature:
1. Click the "Deploy" button in the Replit editor
2. Follow the prompts to publish your app
3. Your app gets a `.replit.app` domain automatically

### 6.3 NOT Recommended: Vercel

> **WARNING**: Vercel is designed for serverless/edge functions, not long-running Node.js servers.
> The current Express+Vite architecture is NOT compatible with Vercel's default deployment model.
> To use Vercel, you would need to refactor the app to separate the API into serverless functions.
> 
> **Use Railway, Render, or Fly.io instead** - they work out of the box with this architecture.

---

## 7. CI/CD PIPELINE (GITHUB ACTIONS)

> **PREREQUISITES**: Before using these workflows, you must:
> 1. Add test scripts to `package.json` (see Section 8.5)
> 2. Install testing dependencies: `npm install -D vitest @playwright/test`
> 3. Create the workflow files in `.github/workflows/`

### 7.1 Main CI Workflow

```yaml
# .github/workflows/ci.yml
# CREATE THIS FILE in your repository

name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

env:
  NODE_VERSION: '20'

jobs:
  # ─────────────────────────────────────────────────────────────────
  # TYPE CHECK (uses existing "check" script)
  # ─────────────────────────────────────────────────────────────────
  typecheck:
    name: TypeScript Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: TypeScript check
        run: npm run check

  # ─────────────────────────────────────────────────────────────────
  # UNIT TESTS (Optional - add after installing vitest)
  # Uncomment after adding: npm install -D vitest @vitest/coverage-v8
  # and adding "test:unit": "vitest run" to package.json
  # ─────────────────────────────────────────────────────────────────
  # unit-tests:
  #   name: Unit Tests
  #   runs-on: ubuntu-latest
  #   needs: [typecheck]
  #   steps:
  #     - uses: actions/checkout@v4
  #     - uses: actions/setup-node@v4
  #       with:
  #         node-version: ${{ env.NODE_VERSION }}
  #         cache: 'npm'
  #     - run: npm ci
  #     - run: npm run test:unit -- --coverage

  # ─────────────────────────────────────────────────────────────────
  # E2E TESTS (Optional - add after installing playwright)
  # Uncomment after adding: npm install -D @playwright/test
  # and adding "test:e2e": "playwright test" to package.json
  # ─────────────────────────────────────────────────────────────────
  # e2e-tests:
  #   name: E2E Tests
  #   runs-on: ubuntu-latest
  #   needs: [typecheck]
  #   steps:
  #     - uses: actions/checkout@v4
  #     - uses: actions/setup-node@v4
  #       with:
  #         node-version: ${{ env.NODE_VERSION }}
  #         cache: 'npm'
  #     - run: npm ci
  #     - run: npx playwright install --with-deps chromium
  #     - run: npm run build
  #     - run: npm run test:e2e
  #       env:
  #         CI: true

  # ─────────────────────────────────────────────────────────────────
  # BUILD (uses existing "build" script)
  # ─────────────────────────────────────────────────────────────────
  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [typecheck]
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
        env:
          NODE_ENV: production
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist/
          retention-days: 1

  # ─────────────────────────────────────────────────────────────────
  # DEPLOY OPTIONS (Choose one platform)
  # ─────────────────────────────────────────────────────────────────
  
  # OPTION A: Railway Deployment
  deploy-railway:
    name: Deploy to Railway
    runs-on: ubuntu-latest
    needs: [build]  # Add unit-tests, e2e-tests to needs after uncommenting them
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Railway CLI
        run: npm install -g @railway/cli
      
      - name: Deploy to Railway
        run: railway up --service ${{ secrets.RAILWAY_SERVICE_ID }}
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
      
      - name: Notify Slack on Success
        if: success()
        uses: slackapi/slack-github-action@v1.25.0
        with:
          payload: |
            {
              "text": "✅ Production deployment successful!",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*INT Platform Explorer* deployed to Railway\nCommit: `${{ github.sha }}`"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
  
  # OPTION B: Render Deployment (uses render.yaml in repo root)
  # Render auto-deploys from GitHub - no action needed
  # Just connect your repo in the Render dashboard
  
  # OPTION C: Fly.io Deployment
  deploy-flyio:
    name: Deploy to Fly.io
    runs-on: ubuntu-latest
    needs: [build]  # Add unit-tests, e2e-tests to needs after uncommenting them
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Fly.io
        uses: superfly/flyctl-actions/setup-flyctl@master
      
      - name: Deploy to Fly.io
        run: flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

### 7.2 Scheduled Test Workflow

```yaml
# .github/workflows/scheduled-tests.yml

name: Scheduled Tests

on:
  schedule:
    - cron: '0 6 * * *'  # Run daily at 6 AM UTC
  workflow_dispatch:

jobs:
  smoke-tests:
    name: Production Smoke Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run smoke tests against production
        run: npm run test:smoke
        env:
          BASE_URL: https://int-platform-explorer.vercel.app
      
      - name: Notify on failure
        if: failure()
        uses: slackapi/slack-github-action@v1.25.0
        with:
          payload: |
            {
              "text": "⚠️ Scheduled smoke tests failed on production!"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### 7.3 Database Migration Workflow

```yaml
# .github/workflows/database-migration.yml

name: Database Migration

on:
  push:
    paths:
      - 'supabase/migrations/**'
    branches: [main]
  workflow_dispatch:

jobs:
  migrate:
    name: Run Migrations
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Supabase CLI
        uses: supabase/setup-cli@v1
        with:
          version: latest
      
      - name: Link Supabase project
        run: supabase link --project-ref ${{ secrets.SUPABASE_PROJECT_REF }}
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
      
      - name: Run migrations
        run: supabase db push
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
      
      - name: Notify on success
        if: success()
        uses: slackapi/slack-github-action@v1.25.0
        with:
          payload: |
            {
              "text": "✅ Database migrations applied successfully"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

---

## 8. TESTING SUITES

### 8.1 Testing Configuration Files

#### Vitest Configuration
```typescript
// vitest.config.ts

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/unit/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        'client/src/components/ui/**',
      ],
      thresholds: {
        lines: 70,
        branches: 60,
        functions: 70,
        statements: 70,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
});
```

#### Playwright Configuration
```typescript
// playwright.config.ts

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    process.env.CI ? ['github'] : ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

### 8.2 Unit Test Examples

```typescript
// tests/unit/roiCalculator.test.ts

import { describe, it, expect } from 'vitest';
import { calculateROI } from '@/lib/roiCalculator';

describe('ROI Calculator', () => {
  it('calculates annual productivity value correctly', () => {
    const inputs = {
      employees: 100,
      averageSalary: 100000,
      adoptionPercentage: 80,
      weeklyProductivityGain: 5,
      annualPlatformCost: 50000,
      trainingCost: 10000,
    };

    const results = calculateROI(inputs);
    
    // hourlyRate = 100000 / 2080 = ~48.08
    // productivityValue = 100 * 0.8 * 5 * 48 weeks * 48.08 = 923,136
    expect(results.annualProductivityValue).toBeCloseTo(923136, -2);
    expect(results.annualTotalCost).toBe(60000);
    expect(results.netBenefit).toBeCloseTo(863136, -2);
    expect(results.roiPercentage).toBeGreaterThan(1400);
  });

  it('handles zero adoption gracefully', () => {
    const inputs = {
      employees: 100,
      averageSalary: 100000,
      adoptionPercentage: 0,
      weeklyProductivityGain: 5,
      annualPlatformCost: 50000,
      trainingCost: 10000,
    };

    const results = calculateROI(inputs);
    
    expect(results.annualProductivityValue).toBe(0);
    expect(results.netBenefit).toBe(-60000);
    expect(results.roiPercentage).toBe(-100);
  });

  it('calculates payback period correctly', () => {
    const inputs = {
      employees: 50,
      averageSalary: 80000,
      adoptionPercentage: 50,
      weeklyProductivityGain: 3,
      annualPlatformCost: 25000,
      trainingCost: 5000,
    };

    const results = calculateROI(inputs);
    
    expect(results.paybackPeriodMonths).toBeGreaterThan(0);
    expect(results.paybackPeriodMonths).toBeLessThan(12);
  });
});
```

```typescript
// tests/unit/platformFilter.test.ts

import { describe, it, expect } from 'vitest';
import { filterPlatforms, sortPlatforms } from '@/lib/platformUtils';
import { platforms } from '@/lib/platformData';

describe('Platform Filtering', () => {
  it('filters by ecosystem correctly', () => {
    const filtered = filterPlatforms(platforms, { ecosystem: 'anthropic' });
    
    expect(filtered.every(p => p.ecosystem === 'anthropic')).toBe(true);
    expect(filtered.length).toBeGreaterThan(0);
  });

  it('filters by multiple criteria', () => {
    const filtered = filterPlatforms(platforms, {
      ecosystem: 'openai',
      priority: 'Tier 1',
      category: 'Foundation',
    });
    
    filtered.forEach(p => {
      expect(p.ecosystem).toBe('openai');
      expect(p.priority).toBe('Tier 1');
      expect(p.category).toBe('Foundation');
    });
  });

  it('handles search query', () => {
    const filtered = filterPlatforms(platforms, { search: 'claude' });
    
    expect(filtered.some(p => p.name.toLowerCase().includes('claude'))).toBe(true);
  });

  it('returns all platforms with no filters', () => {
    const filtered = filterPlatforms(platforms, {});
    
    expect(filtered.length).toBe(platforms.length);
  });
});

describe('Platform Sorting', () => {
  it('sorts by market share descending', () => {
    const sorted = sortPlatforms(platforms, 'marketShare', 'desc');
    
    const shares = sorted.map(p => parseFloat(p.marketShare || '0'));
    for (let i = 0; i < shares.length - 1; i++) {
      expect(shares[i]).toBeGreaterThanOrEqual(shares[i + 1]);
    }
  });

  it('sorts by name alphabetically', () => {
    const sorted = sortPlatforms(platforms, 'name', 'asc');
    
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].name.localeCompare(sorted[i + 1].name)).toBeLessThanOrEqual(0);
    }
  });
});
```

### 8.3 E2E Test Examples

```typescript
// tests/e2e/explorer.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Explorer Tab', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'Explorer' }).click();
  });

  test('displays all 50 platforms by default', async ({ page }) => {
    const platformCards = page.locator('[data-testid^="card-platform-"]');
    await expect(platformCards).toHaveCount(50);
  });

  test('filters platforms by ecosystem', async ({ page }) => {
    await page.getByRole('button', { name: 'Anthropic' }).click();
    
    const platformCards = page.locator('[data-testid^="card-platform-"]');
    await expect(platformCards).toHaveCount(5);
    
    // Verify all shown platforms are from Anthropic ecosystem
    const badges = page.locator('[data-testid="badge-ecosystem-anthropic"]');
    await expect(badges).toHaveCount(5);
  });

  test('search filters platforms by name', async ({ page }) => {
    await page.getByPlaceholder('Search platforms').fill('Claude');
    
    const platformCards = page.locator('[data-testid^="card-platform-"]');
    
    // Should show Claude-related platforms
    for (const card of await platformCards.all()) {
      const name = await card.locator('[data-testid="text-platform-name"]').textContent();
      expect(name?.toLowerCase()).toContain('claude');
    }
  });

  test('can add platform to comparison', async ({ page }) => {
    const firstPlatform = page.locator('[data-testid^="card-platform-"]').first();
    await firstPlatform.getByRole('button', { name: 'Compare' }).click();
    
    // Navigate to comparison tab
    await page.getByRole('tab', { name: 'Comparison' }).click();
    
    // Verify platform was added
    const selectedPlatforms = page.locator('[data-testid="comparison-platform"]');
    await expect(selectedPlatforms).toHaveCount(1);
  });
});
```

```typescript
// tests/e2e/roi-calculator.spec.ts

import { test, expect } from '@playwright/test';

test.describe('ROI Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'ROI Calculator' }).click();
  });

  test('calculates ROI with default values', async ({ page }) => {
    // Verify results section is visible
    const resultsSection = page.locator('[data-testid="roi-results"]');
    await expect(resultsSection).toBeVisible();
    
    // Verify key metrics are displayed
    await expect(page.getByTestId('text-net-benefit')).toBeVisible();
    await expect(page.getByTestId('text-roi-percentage')).toBeVisible();
    await expect(page.getByTestId('text-payback-period')).toBeVisible();
  });

  test('updates results when inputs change', async ({ page }) => {
    // Get initial ROI value
    const initialROI = await page.getByTestId('text-roi-percentage').textContent();
    
    // Increase employee count
    const employeeSlider = page.getByTestId('slider-employees');
    await employeeSlider.fill('500');
    
    // Wait for calculation
    await page.waitForTimeout(300);
    
    // Verify ROI changed
    const newROI = await page.getByTestId('text-roi-percentage').textContent();
    expect(newROI).not.toBe(initialROI);
  });

  test('shows negative ROI when costs exceed benefits', async ({ page }) => {
    // Set very high costs
    await page.getByTestId('input-platform-cost').fill('1000000');
    await page.getByTestId('slider-adoption').fill('10');
    await page.getByTestId('slider-productivity-gain').fill('1');
    
    await page.waitForTimeout(300);
    
    const roiValue = await page.getByTestId('text-roi-percentage').textContent();
    expect(roiValue).toContain('-');
  });
});
```

### 8.4 Smoke Test Suite

```typescript
// tests/smoke/production.spec.ts

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'https://int-platform-explorer.vercel.app';

test.describe('Production Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    const response = await page.goto(BASE_URL);
    expect(response?.status()).toBe(200);
    
    // Verify main heading
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('all tabs are accessible', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const tabs = [
      'Explorer',
      'Comparison',
      'Matrix',
      'ROI Calculator',
      'Strategy',
      'Assessment',
      'Profile Builder',
      'Microsoft Deep Dive',
    ];
    
    for (const tabName of tabs) {
      const tab = page.getByRole('tab', { name: tabName });
      await expect(tab).toBeVisible();
      await tab.click();
      await page.waitForLoadState('networkidle');
    }
  });

  test('API health check', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/platforms`);
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(50);
  });

  test('dark mode toggle works', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const themeToggle = page.getByTestId('button-theme-toggle');
    await themeToggle.click();
    
    // Verify dark class is applied
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });

  test('no console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Filter out known acceptable errors
    const criticalErrors = consoleErrors.filter(
      err => !err.includes('favicon') && !err.includes('analytics')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });

  test('page performance is acceptable', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const timing = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: nav.domContentLoadedEventEnd - nav.fetchStart,
        load: nav.loadEventEnd - nav.fetchStart,
      };
    });
    
    // Page should load in under 5 seconds
    expect(timing.load).toBeLessThan(5000);
  });
});
```

### 8.5 Package.json Test Scripts (Add These)

The current `package.json` has these scripts:
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "tsx script/build.ts",
    "start": "NODE_ENV=production node dist/index.cjs",
    "check": "tsc",
    "db:push": "drizzle-kit push"
  }
}
```

**Add these scripts for testing** (requires installing vitest and playwright):

```bash
# Install testing dependencies
npm install -D vitest @vitest/coverage-v8 @playwright/test
npx playwright install
```

```json
{
  "scripts": {
    "test": "npm run test:unit && npm run test:e2e",
    "test:unit": "vitest run",
    "test:unit:watch": "vitest",
    "test:unit:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:smoke": "playwright test --config=playwright.smoke.config.ts",
    "lint": "eslint ."
  }
}
```

---

## 9. MONITORING & OBSERVABILITY

### 9.1 Posthog Analytics Setup

```typescript
// client/src/lib/analytics.ts

import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_API_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com';

export function initAnalytics() {
  if (!POSTHOG_KEY || import.meta.env.DEV) {
    console.log('Analytics disabled in development');
    return;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    autocapture: true,
    capture_pageview: true,
    capture_pageleave: true,
    persistence: 'localStorage',
    disable_session_recording: false,
    loaded: (posthog) => {
      if (import.meta.env.DEV) posthog.opt_out_capturing();
    },
  });
}

export const analytics = {
  track: (event: string, properties?: Record<string, unknown>) => {
    posthog.capture(event, properties);
  },
  
  identify: (userId: string, traits?: Record<string, unknown>) => {
    posthog.identify(userId, traits);
  },
  
  page: (pageName: string, properties?: Record<string, unknown>) => {
    posthog.capture('$pageview', { page: pageName, ...properties });
  },
  
  // Feature flags
  isFeatureEnabled: (flag: string): boolean => {
    return posthog.isFeatureEnabled(flag) ?? false;
  },
};

// Custom events for INT Platform Explorer
export const trackEvents = {
  platformViewed: (platformId: string) => {
    analytics.track('platform_viewed', { platform_id: platformId });
  },
  
  platformCompared: (platformIds: string[]) => {
    analytics.track('platforms_compared', { 
      platform_ids: platformIds,
      count: platformIds.length,
    });
  },
  
  roiCalculated: (inputs: Record<string, number>, results: Record<string, number>) => {
    analytics.track('roi_calculated', { inputs, results });
  },
  
  ecosystemFiltered: (ecosystem: string) => {
    analytics.track('ecosystem_filtered', { ecosystem });
  },
  
  tabChanged: (tabName: string) => {
    analytics.track('tab_changed', { tab: tabName });
  },
  
  personaViewed: (personaId: string, personaType: 'int' | 'client') => {
    analytics.track('persona_viewed', { 
      persona_id: personaId,
      persona_type: personaType,
    });
  },
};
```

### 9.2 Vercel Analytics Integration

```typescript
// client/src/main.tsx

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <>
      {/* Your app components */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
```

### 9.3 Logging Configuration

```typescript
// server/lib/logger.ts

import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

export const logger = pino({
  level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
  transport: isProduction
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
        },
      },
  base: {
    env: process.env.NODE_ENV,
    version: process.env.npm_package_version,
  },
  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', '*.password'],
    remove: true,
  },
});

// Request logging middleware
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    logger.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    }, 'Request completed');
  });
  
  next();
}
```

### 9.4 Error Tracking (Sentry - Optional)

```typescript
// client/src/lib/sentry.ts

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export function initSentry() {
  if (!import.meta.env.VITE_SENTRY_DSN) return;

  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 0.1,
    environment: import.meta.env.MODE,
    release: import.meta.env.VITE_APP_VERSION,
    beforeSend(event) {
      // Scrub sensitive data
      if (event.user) {
        delete event.user.ip_address;
      }
      return event;
    },
  });
}

export const captureException = Sentry.captureException;
export const captureMessage = Sentry.captureMessage;
```

### 9.5 Monitoring Dashboard Metrics

```typescript
// Recommended metrics to track in Posthog/Vercel Analytics

const METRICS = {
  // User Engagement
  'daily_active_users': 'count distinct users per day',
  'session_duration': 'average session length',
  'pages_per_session': 'average tabs visited',
  
  // Feature Usage
  'roi_calculations_per_day': 'count of ROI calculations',
  'comparisons_per_day': 'count of platform comparisons',
  'most_viewed_platforms': 'top 10 platforms by views',
  'ecosystem_filter_usage': 'breakdown by ecosystem',
  
  // Performance
  'page_load_time': 'p50, p90, p99 load times',
  'api_response_time': 'p50, p90, p99 API latency',
  'error_rate': 'percentage of failed requests',
  
  // Business Metrics
  'conversion_funnel': 'explorer → comparison → roi → assessment',
  'persona_engagement': 'most viewed personas',
  'feature_adoption': 'usage of new features',
};
```

### 9.6 Alerting Rules

```yaml
# Recommended alerting configuration (configure in Posthog/Vercel)

alerts:
  - name: High Error Rate
    condition: error_rate > 5%
    window: 5 minutes
    severity: critical
    channels: [slack, email]
    
  - name: Slow Response Time
    condition: p95_latency > 3000ms
    window: 10 minutes
    severity: warning
    channels: [slack]
    
  - name: API Down
    condition: success_rate < 50%
    window: 2 minutes
    severity: critical
    channels: [slack, pagerduty]
    
  - name: Unusual Traffic Spike
    condition: requests > 10x baseline
    window: 15 minutes
    severity: info
    channels: [slack]
```

---

## 10. EDGE CASES & ERROR HANDLING

### 10.1 Frontend Error Handling

```typescript
// client/src/components/ErrorBoundary.tsx

import { Component, ErrorInfo, ReactNode } from 'react';
import { captureException } from '@/lib/sentry';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    captureException(error, { extra: errorInfo });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">
            We're sorry, but something unexpected happened. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 10.2 API Error Handling

```typescript
// server/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '@/lib/logger';

interface ApiError extends Error {
  statusCode?: number;
  code?: string;
}

export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log the error
  logger.error({
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
  });

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation Error',
      code: 'VALIDATION_ERROR',
      details: err.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  // Handle known error types
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      error: 'Database connection failed',
      code: 'DB_CONNECTION_ERROR',
    });
  }

  // Handle rate limiting
  if (err.statusCode === 429) {
    return res.status(429).json({
      error: 'Too many requests',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter: 60,
    });
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 
    ? 'Internal server error' 
    : err.message;

  res.status(statusCode).json({
    error: message,
    code: err.code || 'INTERNAL_ERROR',
  });
}
```

### 10.3 Edge Cases Table

| Scenario | Handling Strategy | User Experience |
|----------|-------------------|-----------------|
| No platforms match filter | Show "No results" message with reset button | "No platforms found. Try adjusting your filters." |
| API timeout (>10s) | Retry once, then show error | Loading spinner → "Taking longer than expected..." |
| Invalid ROI inputs | Client-side validation + server validation | Inline error messages on form fields |
| Missing capability data | Default to 0 with "(N/A)" display | Gray cell with "N/A" tooltip |
| Browser storage full | Fallback to session storage | Silent fallback, no user notification |
| Large comparison (4 platforms) | Horizontal scroll on mobile | Responsive table with scroll indicators |
| Stale data (>1 hour cache) | Background refresh with stale-while-revalidate | Show data immediately, refresh silently |
| JavaScript disabled | Server-side rendered fallback page | Static HTML with "Please enable JavaScript" |
| Network offline | Service worker cached response | "You're offline. Showing cached data." |
| Invalid URL/route | 404 page with navigation | Friendly 404 with links to main sections |

---

## 11. GRACEFUL DEGRADATION

### 11.1 Feature Flags with Fallbacks

```typescript
// client/src/lib/featureFlags.ts

import { analytics } from './analytics';

interface FeatureFlags {
  microsoftDeepDive: boolean;
  clientPersonas: boolean;
  advancedFilters: boolean;
  aiRecommendations: boolean;
}

const DEFAULT_FLAGS: FeatureFlags = {
  microsoftDeepDive: true,
  clientPersonas: true,
  advancedFilters: true,
  aiRecommendations: false,
};

export function getFeatureFlags(): FeatureFlags {
  // Try to get from Posthog
  try {
    return {
      microsoftDeepDive: analytics.isFeatureEnabled('microsoft-deep-dive') ?? DEFAULT_FLAGS.microsoftDeepDive,
      clientPersonas: analytics.isFeatureEnabled('client-personas') ?? DEFAULT_FLAGS.clientPersonas,
      advancedFilters: analytics.isFeatureEnabled('advanced-filters') ?? DEFAULT_FLAGS.advancedFilters,
      aiRecommendations: analytics.isFeatureEnabled('ai-recommendations') ?? DEFAULT_FLAGS.aiRecommendations,
    };
  } catch {
    // Fallback to defaults if Posthog unavailable
    return DEFAULT_FLAGS;
  }
}

// Usage in components
export function FeatureGate({ 
  flag, 
  children, 
  fallback = null 
}: { 
  flag: keyof FeatureFlags; 
  children: ReactNode; 
  fallback?: ReactNode;
}) {
  const flags = getFeatureFlags();
  return flags[flag] ? <>{children}</> : <>{fallback}</>;
}
```

### 11.2 Offline Support (Service Worker)

```typescript
// public/sw.js

const CACHE_NAME = 'int-explorer-v4';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // API requests - network only with timeout
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      Promise.race([
        fetch(event.request),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('timeout')), 5000)
        )
      ]).catch(() => {
        return new Response(
          JSON.stringify({ error: 'Offline', cached: true }),
          { status: 503, headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }
  
  // Static assets - cache first
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Refresh cache in background
        fetch(event.request).then((response) => {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response);
          });
        });
        return cachedResponse;
      }
      return fetch(event.request).then((response) => {
        // Cache new response
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    })
  );
});
```

### 11.3 Progressive Loading

```typescript
// client/src/components/LazyTab.tsx

import { Suspense, lazy, ComponentType } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyTabProps {
  importFn: () => Promise<{ default: ComponentType }>;
}

export function LazyTab({ importFn }: LazyTabProps) {
  const Component = lazy(importFn);
  
  return (
    <Suspense fallback={<TabSkeleton />}>
      <Component />
    </Suspense>
  );
}

function TabSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
      <Skeleton className="h-64" />
    </div>
  );
}

// Usage
const MicrosoftDeepDiveTab = () => (
  <LazyTab importFn={() => import('./MicrosoftEcosystemTab')} />
);
```

---

## 12. ROLLBACK PROCEDURES

### 12.1 Platform-Specific Rollback

#### Railway Rollback
```bash
# Via Railway Dashboard
1. Go to Railway Dashboard → Project → Deployments
2. Find the last working deployment
3. Click "Redeploy" on that deployment

# Via Railway CLI
railway rollback
```

#### Render Rollback
```bash
# Via Render Dashboard
1. Go to Render Dashboard → Service → Deploys
2. Find the last working deployment
3. Click "Rollback to this deploy"

# Render automatically keeps deploy history
```

#### Fly.io Rollback
```bash
# Via Fly CLI
flyctl releases                    # List releases
flyctl releases rollback <version> # Rollback to version
```

### 12.2 Git-Based Rollback (Works with Any Platform)

```bash
#!/bin/bash
# scripts/rollback.sh - Universal rollback via git

set -e

SLACK_WEBHOOK=${SLACK_WEBHOOK_URL:-""}

# Show recent commits
echo "Recent commits:"
git log --oneline -10

# Get commit to rollback to
read -p "Enter commit SHA to rollback to: " TARGET_COMMIT

# Confirm
read -p "Rollback to $TARGET_COMMIT? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
  echo "Rollback cancelled."
  exit 0
fi

# Create revert commit
git revert --no-commit HEAD..$TARGET_COMMIT
git commit -m "Rollback to $TARGET_COMMIT"
git push origin main

# Notify Slack
if [ -n "$SLACK_WEBHOOK" ]; then
  curl -X POST -H 'Content-type: application/json' \
    --data "{\"text\":\"⚠️ Production rollback initiated!\nRolling back to: $TARGET_COMMIT\"}" \
    $SLACK_WEBHOOK
fi

echo "Rollback commit pushed. Platform will auto-deploy."
```

### 12.3 Database Rollback (Point-in-Time Recovery)

```bash
# Supabase supports point-in-time recovery (PITR) on Pro plans

# Via Supabase Dashboard:
1. Go to Supabase Dashboard → Project → Database → Backups
2. Select "Point in Time Recovery"
3. Choose target timestamp
4. Confirm recovery

# Via Supabase CLI (requires Pro plan):
supabase db restore --project-ref $SUPABASE_PROJECT_REF --target-time "2026-01-22T10:00:00Z"
```

### 12.4 Git Rollback (Revert Merge)

```bash
# Revert a bad merge commit
git log --oneline -10                    # Find the merge commit
git revert -m 1 <merge-commit-sha>       # Revert the merge
git push origin main                     # Push revert (triggers new deploy)

# Or reset to previous state (more destructive)
git reset --hard <good-commit-sha>
git push --force-with-lease origin main  # Force push
```

### 12.5 Rollback Checklist

| Step | Action | Verify |
|------|--------|--------|
| 1 | Identify the broken deployment | Check error logs, user reports |
| 2 | Communicate outage | Post status page update |
| 3 | Initiate rollback | Use Vercel dashboard or CLI |
| 4 | Verify rollback | Run smoke tests |
| 5 | Check database state | Ensure data integrity |
| 6 | Notify stakeholders | Update status page, Slack |
| 7 | Post-mortem | Document what went wrong |

---

## 13. AUTOMATION & INTEGRATIONS

### 13.1 Zapier Integration

```typescript
// Webhook endpoints for Zapier triggers

// server/routes/webhooks.ts
import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// Webhook for external triggers
router.post('/webhooks/zapier', async (req, res) => {
  const schema = z.object({
    event: z.string(),
    data: z.record(z.unknown()),
    secret: z.string(),
  });

  const { event, data, secret } = schema.parse(req.body);
  
  // Verify webhook secret
  if (secret !== process.env.ZAPIER_WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  switch (event) {
    case 'new_platform_request':
      // Handle platform suggestion
      await handlePlatformRequest(data);
      break;
    case 'roi_export':
      // Export ROI calculation
      await handleROIExport(data);
      break;
    default:
      return res.status(400).json({ error: 'Unknown event' });
  }

  res.json({ success: true });
});

export default router;
```

**Zapier Zaps:**
1. **New Platform Alert** → When new AI platform announced → Add to research queue
2. **Weekly Report** → Every Monday → Export usage analytics to Google Sheets
3. **Slack Notification** → When ROI > 500% calculated → Post to #ai-wins channel

### 13.2 n8n.io Workflow

```json
{
  "name": "INT Explorer - Daily Platform Updates",
  "nodes": [
    {
      "name": "Cron Trigger",
      "type": "n8n-nodes-base.cron",
      "parameters": {
        "rule": "0 6 * * *"
      }
    },
    {
      "name": "Fetch Platform Data",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "https://int-platform-explorer.vercel.app/api/platforms",
        "method": "GET"
      }
    },
    {
      "name": "Check for Updates",
      "type": "n8n-nodes-base.function",
      "parameters": {
        "code": "// Compare with yesterday's data\nconst today = $input.first().json;\nconst yesterday = await getFromStorage('platform_snapshot');\n// ... comparison logic"
      }
    },
    {
      "name": "Send Slack Alert",
      "type": "n8n-nodes-base.slack",
      "parameters": {
        "channel": "#platform-updates",
        "message": "📊 Platform data updated: {{ $json.changes }}"
      }
    }
  ]
}
```

### 13.3 Claude CLI / Gemini CLI Integration

```bash
# Example: Use Claude CLI for automated documentation updates

# .github/workflows/docs-update.yml
name: Update Documentation with AI

on:
  push:
    paths:
      - 'client/src/lib/**Data.ts'
  workflow_dispatch:

jobs:
  update-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Generate changelog with Claude
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # Get diff
          DIFF=$(git diff HEAD~1 --name-only | grep 'Data.ts' || echo "")
          
          if [ -n "$DIFF" ]; then
            # Use Claude to summarize changes
            claude-code "Summarize the following data file changes for a changelog: $DIFF" > changelog_update.txt
            
            # Append to CHANGELOG.md
            echo "## $(date +%Y-%m-%d)" >> CHANGELOG.md
            cat changelog_update.txt >> CHANGELOG.md
          fi
      
      - name: Commit updated docs
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add CHANGELOG.md
          git commit -m "docs: Auto-update changelog" || exit 0
          git push
```

### 13.4 Notion Integration

```typescript
// scripts/sync-to-notion.ts

import { Client } from '@notionhq/client';
import { platforms } from '@/lib/platformData';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function syncPlatformsToNotion() {
  for (const platform of platforms) {
    await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: platform.name } }] },
        Category: { select: { name: platform.category } },
        Priority: { select: { name: platform.priority } },
        Ecosystem: { select: { name: platform.ecosystem || 'Independent' } },
        Pricing: { rich_text: [{ text: { content: platform.pricing } }] },
        'Market Share': { rich_text: [{ text: { content: platform.marketShare } }] },
        Verdict: { rich_text: [{ text: { content: platform.verdict } }] },
      },
    });
  }
  console.log(`Synced ${platforms.length} platforms to Notion`);
}

syncPlatformsToNotion();
```

---

## 14. SECURITY & COMPLIANCE

### 14.1 Security Headers (Already in vercel.json)

```typescript
// Additional security middleware
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Helmet configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://app.posthog.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://app.posthog.com", "https://*.supabase.co"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests', code: 'RATE_LIMIT_EXCEEDED' },
});

app.use('/api/', limiter);

// Stricter limit for ROI calculations (prevent abuse)
const roiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  message: { error: 'Too many calculations', code: 'ROI_RATE_LIMIT' },
});

app.use('/api/roi', roiLimiter);
```

### 14.2 Secrets Management

```bash
# NEVER commit secrets to git!

# Use Vercel environment variables for production
vercel env add DATABASE_URL production
vercel env add SUPABASE_SERVICE_ROLE_KEY production --sensitive

# Use .env.local for local development (in .gitignore)
cp .env.example .env.local

# Rotate secrets regularly
# 1. Generate new secret
# 2. Add to Vercel (new name)
# 3. Update code to use new secret
# 4. Deploy
# 5. Remove old secret
```

### 14.3 OWASP Top 10 Checklist

| Vulnerability | Mitigation | Status |
|--------------|------------|--------|
| A01 Broken Access Control | RLS policies, API auth | ✅ |
| A02 Cryptographic Failures | HTTPS only, no sensitive data in URLs | ✅ |
| A03 Injection | Parameterized queries (Drizzle ORM), Zod validation | ✅ |
| A04 Insecure Design | Input validation, rate limiting | ✅ |
| A05 Security Misconfiguration | Helmet, secure headers, minimal permissions | ✅ |
| A06 Vulnerable Components | Dependabot, npm audit | ✅ |
| A07 Auth Failures | Supabase Auth, session management | ✅ |
| A08 Data Integrity | CSP, SRI for external scripts | ✅ |
| A09 Logging Failures | Structured logging, audit trail | ✅ |
| A10 SSRF | URL validation, allowlist external APIs | ✅ |

### 14.4 Dependabot Configuration

```yaml
# .github/dependabot.yml

version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 5
    groups:
      development:
        dependency-type: "development"
        update-types:
          - "minor"
          - "patch"
      production:
        dependency-type: "production"
        update-types:
          - "patch"
    ignore:
      - dependency-name: "*"
        update-types: ["version-update:semver-major"]
    commit-message:
      prefix: "chore(deps)"
    labels:
      - "dependencies"
      - "automated"
```

---

## 15. INFRASTRUCTURE EXTRAS

### 15.1 Redis Upstash Configuration

```typescript
// server/lib/redis.ts

import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Caching helper
export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds = 3600
): Promise<T> {
  const cached = await redis.get<T>(key);
  if (cached) return cached;
  
  const fresh = await fetcher();
  await redis.set(key, fresh, { ex: ttlSeconds });
  return fresh;
}

// Rate limiting with sliding window
export async function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number }> {
  const key = `ratelimit:${identifier}`;
  const now = Date.now();
  const windowStart = now - (windowSeconds * 1000);
  
  // Remove old entries
  await redis.zremrangebyscore(key, 0, windowStart);
  
  // Count current requests
  const count = await redis.zcard(key);
  
  if (count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }
  
  // Add new request
  await redis.zadd(key, { score: now, member: `${now}` });
  await redis.expire(key, windowSeconds);
  
  return { allowed: true, remaining: maxRequests - count - 1 };
}
```

### 15.2 Cloudflare Configuration

```javascript
// Cloudflare Worker for edge caching (optional)
// workers/cache-api.js

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Only cache GET requests to /api/platforms
  if (request.method !== 'GET' || !url.pathname.startsWith('/api/platforms')) {
    return fetch(request);
  }
  
  const cacheKey = new Request(url.toString(), request);
  const cache = caches.default;
  
  // Check cache
  let response = await cache.match(cacheKey);
  if (response) {
    return response;
  }
  
  // Fetch from origin
  response = await fetch(request);
  
  // Cache successful responses for 1 hour
  if (response.status === 200) {
    response = new Response(response.body, response);
    response.headers.set('Cache-Control', 'public, max-age=3600');
    event.waitUntil(cache.put(cacheKey, response.clone()));
  }
  
  return response;
}
```

### 15.3 CDN Configuration

```
# Cloudflare Page Rules

1. Cache everything for static assets
   URL: *int-platform-explorer.com/assets/*
   Setting: Cache Level = Cache Everything, Edge TTL = 1 month

2. Bypass cache for API
   URL: *int-platform-explorer.com/api/*
   Setting: Cache Level = Bypass

3. Enable compression
   URL: *int-platform-explorer.com/*
   Setting: Auto Minify = JavaScript, CSS, HTML
```

---

## 16. TROUBLESHOOTING GUIDE

### 16.1 Common Issues Table

| Issue | Symptoms | Diagnosis | Solution |
|-------|----------|-----------|----------|
| Build fails on Vercel | "Module not found" error | Check import paths | Ensure path aliases in tsconfig match vite.config |
| Database connection error | 500 errors on API calls | Check DATABASE_URL | Verify connection string, check Supabase status |
| Slow initial load | >3s Time to Interactive | Check bundle size | Enable code splitting, lazy load tabs |
| CORS errors | Browser console errors | API not returning headers | Add CORS middleware to Express |
| Auth not working | Session not persisting | Cookie issues | Check SameSite, Secure flags |
| Analytics not tracking | No events in Posthog | API key missing | Verify VITE_POSTHOG_API_KEY |
| Dark mode flash | White flash on load | Theme not hydrating | Add blocking script to <head> |
| Mobile layout broken | Elements overflow | Missing responsive classes | Add responsive breakpoints |

### 16.2 Debug Commands

```bash
# Check Vercel deployment logs
vercel logs [deployment-url]

# Check Supabase logs
supabase logs --project-ref $PROJECT_REF

# Check database status
psql $DATABASE_URL -c "SELECT 1"

# Run local build to match Vercel
npm run build && npm run start

# Check for type errors
npm run typecheck

# Check for outdated dependencies
npm outdated

# Audit for vulnerabilities
npm audit
```

### 16.3 Health Check Endpoint

```typescript
// server/routes/health.ts

import { Router } from 'express';
import { db } from '@/db';
import { redis } from '@/lib/redis';

const router = Router();

router.get('/health', async (req, res) => {
  const checks = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    checks: {
      database: 'unknown',
      redis: 'unknown',
    },
  };

  try {
    // Check database
    await db.execute('SELECT 1');
    checks.checks.database = 'healthy';
  } catch (e) {
    checks.checks.database = 'unhealthy';
    checks.status = 'degraded';
  }

  try {
    // Check Redis
    await redis.ping();
    checks.checks.redis = 'healthy';
  } catch (e) {
    checks.checks.redis = 'unhealthy';
    checks.status = 'degraded';
  }

  const statusCode = checks.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(checks);
});

export default router;
```

---

## 17. VERSION HISTORY & CHANGELOG

### 17.1 Changelog Template

```markdown
# Changelog

All notable changes to INT Platform Explorer will be documented in this file.

## [Unreleased]

### Added
- Feature description

### Changed
- Modification description

### Fixed
- Bug fix description

### Security
- Security update description

---

## [4.1.0] - 2026-01-22

### Added
- Full-stack Vercel deployment documentation
- CI/CD pipeline with GitHub Actions
- Posthog analytics integration
- Redis caching with Upstash

### Changed
- Migrated from in-memory storage to Supabase
- Updated all dependencies to latest versions

### Security
- Added rate limiting to all API endpoints
- Implemented RLS policies for database tables
```

### 17.2 Semantic Versioning Rules

- **MAJOR (X.0.0)**: Breaking API changes, major UI overhaul
- **MINOR (0.X.0)**: New features, new platforms, new tabs
- **PATCH (0.0.X)**: Bug fixes, security patches, minor UI tweaks

### 17.3 Release Checklist

- [ ] Update version in package.json
- [ ] Update CHANGELOG.md
- [ ] Run full test suite
- [ ] Create git tag: `git tag v4.1.0`
- [ ] Push tag: `git push origin v4.1.0`
- [ ] Create GitHub release with release notes
- [ ] Verify production deployment
- [ ] Update documentation if needed
- [ ] Notify stakeholders

---

## 18. APPENDICES

### APPENDIX A: Environment Variables Quick Reference

| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| NODE_ENV | Yes | production | Environment mode |
| PORT | Yes | 5000 | Server port (default 5000) |
| DATABASE_URL | No* | postgresql://... | Supabase connection (if not using in-memory) |
| UPSTASH_REDIS_REST_URL | No | https://xxx.upstash.io | Redis URL for caching |
| UPSTASH_REDIS_REST_TOKEN | No | AXXXxxx... | Redis auth token |
| VITE_POSTHOG_API_KEY | No | phc_xxx | Analytics key (frontend) |
| SESSION_SECRET | No | random-256-bit | Session encryption |

*The app currently uses in-memory storage. DATABASE_URL only needed if migrating to Supabase.

### APPENDIX B: Useful Commands

```bash
# Development (from current package.json)
npm run dev              # Start dev server (Express + Vite)
npm run build            # Production build
npm run start            # Start production server
npm run check            # TypeScript check
npm run db:push          # Push Drizzle schema to database

# Testing (after adding test scripts per Section 8.5)
npm run test             # All tests
npm run test:unit        # Unit tests only (vitest)
npm run test:e2e         # E2E tests only (playwright)
npm run test:smoke       # Smoke tests

# Deployment (if using Railway/Render/Fly.io)
railway up               # Deploy to Railway
fly deploy               # Deploy to Fly.io
render deploy            # Deploy to Render

# Vercel (if you refactor to serverless)
vercel                   # Deploy preview
vercel --prod            # Deploy production
vercel logs              # View logs
vercel rollback          # Rollback deployment
```

### APPENDIX C: External Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Upstash Redis Documentation](https://upstash.com/docs/redis)
- [Posthog Documentation](https://posthog.com/docs)
- [Playwright Documentation](https://playwright.dev/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

*Document Version: 1.0*
*Generated for: Enterprise Production Deployment*
*Last Updated: January 2026*
