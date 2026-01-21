# INT Platform Explorer v4.0 - Complete Rebuild Documentation

## For: Claude Code CLI, Antigravity IDE Agents, Gemini CLI

This document provides a complete technical specification to rebuild the INT Platform Explorer application from scratch using AI coding assistants.

---

## 1. PROJECT OVERVIEW

### 1.1 Purpose
INT Platform Explorer is an enterprise decision-support tool for C-suite and upper management to evaluate AI platforms for establishing an AIaaS department. It enables organizations to evaluate 50 AI platforms across 20 capability dimensions, organized into 8 ecosystem suites.

### 1.2 Key Features
- **Explorer**: Browse/filter 50 AI platforms by ecosystem, category, priority
- **Comparison**: Side-by-side evaluation of 2-4 platforms
- **Matrix**: Capability grid with 20 dimensions, color-coded scores
- **ROI Calculator**: Real-time business case quantification
- **Strategy**: Tiered recommendations (Foundation, Specialization, Advanced)
- **Assessment**: 5-step AI readiness wizard
- **Profile Builder**: 72 INT Inc. personas + 8 B2B client personas mapped to Claude models
- **Microsoft Deep Dive**: Comprehensive Microsoft AI ecosystem analysis (10 products)

### 1.3 Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM (optional, app uses in-memory storage)
- **State Management**: TanStack Query v5
- **Icons**: Lucide React

---

## 2. DATA ARCHITECTURE

### 2.1 Core TypeScript Interfaces

```typescript
// shared/schema.ts

export interface PlatformCapabilities {
  codeGeneration: number;       // 1-10 score
  reasoning: number;
  languageUnderstanding: number;
  multimodal: number;
  toolUse: number;
  speed: number;
  costEfficiency: number;
  enterpriseFeatures: number;
  developerExperience: number;
  documentation: number;
  vision: number;
  audio: number;
  functionCalling: number;
  jsonReliability: number;
  dataPrivacy: number;
  onPremOption: number;
  slaAvailability: number;
  contextRecall: number;
  timeToFirstToken: number;
  tokensPerSecond: number;
}

export type EcosystemType = 
  | "anthropic" 
  | "openai" 
  | "microsoft" 
  | "google" 
  | "automation" 
  | "langchain" 
  | "open-source" 
  | "independent";

export type SpecialtyType = 
  | "coding" 
  | "content" 
  | "automation" 
  | "enterprise-search" 
  | "analytics" 
  | "agents" 
  | "multimodal" 
  | "voice" 
  | "security" 
  | "workflow" 
  | "integration" 
  | "data-science" 
  | "conversational" 
  | "it-service";

export interface Platform {
  id: string;                    // hyphen-case, e.g., "claude-sonnet"
  name: string;
  category: "Foundation" | "Specialized" | "Enterprise" | "Developer" | "Productivity" | "Automation";
  priority: "Tier 1" | "Tier 2" | "Tier 3";
  verdict: string;               // 1-sentence summary
  marketShare: string;           // e.g., "12%"
  pricing: string;               // e.g., "$20/user/month"
  contextWindow: string;         // e.g., "200K tokens"
  compliance: string[];          // ["SOC2", "HIPAA", "GDPR", "FedRAMP"]
  targetUsers: string;
  capabilities: PlatformCapabilities;
  logoColor: string;             // Hex color for branding
  ecosystem?: EcosystemType;
  specialties?: SpecialtyType[];
  compatibility?: string[];      // IDs of compatible platforms/services
}

export interface Ecosystem {
  id: EcosystemType;
  name: string;
  description: string;
  logoColor: string;
  platformIds: string[];
}

export interface ROIInputs {
  employees: number;
  averageSalary: number;
  adoptionPercentage: number;
  weeklyProductivityGain: number;
  annualPlatformCost: number;
  trainingCost: number;
}

export interface ROIResults {
  annualProductivityValue: number;
  annualTotalCost: number;
  netBenefit: number;
  roiPercentage: number;
  paybackPeriodMonths: number;
}

export interface StrategyTier {
  tier: number;
  name: string;
  description: string;
  platforms: string[];
  rationale: string;
}
```

### 2.2 The 8 Ecosystems

```typescript
export const ecosystems: Ecosystem[] = [
  {
    id: "anthropic",
    name: "Anthropic / Claude",
    description: "Constitutional AI with industry-leading safety, reasoning, and coding capabilities.",
    logoColor: "#D97706",
    platformIds: ["claude-sonnet", "claude-opus", "anthropic-api", "aws-bedrock", "claude-web"]
  },
  {
    id: "openai",
    name: "OpenAI",
    description: "The most widely adopted AI ecosystem with ChatGPT, GPT-4, and extensive enterprise features.",
    logoColor: "#10A37F",
    platformIds: ["chatgpt-enterprise", "openai-api", "azure-openai", "chatgpt-plus", "gpt-store", "chatgpt-web"]
  },
  {
    id: "microsoft",
    name: "Microsoft",
    description: "Deep enterprise integration with Microsoft 365, Azure, Power Platform, and Dynamics.",
    logoColor: "#0078D4",
    platformIds: ["microsoft-copilot", "azure-openai", "github-copilot", "power-platform", "dynamics-365-ai", "microsoft-365-copilot"]
  },
  {
    id: "google",
    name: "Google Cloud",
    description: "Multimodal AI with massive context windows and deep Workspace integration.",
    logoColor: "#4285F4",
    platformIds: ["gemini-advanced", "vertex-ai", "google-ai-studio", "duet-ai", "notebooklm"]
  },
  {
    id: "automation",
    name: "Automation & Integration",
    description: "Workflow automation, API integration, and no-code/low-code AI orchestration platforms.",
    logoColor: "#FF6D00",
    platformIds: ["zapier", "make-com", "pipedream", "n8n", "power-platform"]
  },
  {
    id: "langchain",
    name: "LangChain Ecosystem",
    description: "Open-source framework for building AI agents, chains, and production LLM applications.",
    logoColor: "#1C3C3C",
    platformIds: ["langchain", "langgraph", "langsmith", "langserve"]
  },
  {
    id: "open-source",
    name: "Open Source",
    description: "Community-driven models and platforms with full transparency and self-hosting options.",
    logoColor: "#7C3AED",
    platformIds: ["llama-3", "mistral-large", "deepseek-v3", "huggingface", "together-ai", "groq"]
  },
  {
    id: "independent",
    name: "Independent / Specialized",
    description: "Focused tools for specific use cases like content, search, coding, and enterprise workflows.",
    logoColor: "#6B7280",
    platformIds: ["perplexity-pro", "jasper", "copy-ai", "notion-ai", "slack-ai", "glean", "cursor", "writer", "cohere", "dataiku", "cognigy", "moveworks", "databricks", "salesforce-agentforce", "grok-2"]
  }
];
```

### 2.3 Sample Platform Data (50 Platforms Total)

```typescript
// Example platforms - create 50 total across all ecosystems

export const platforms: Platform[] = [
  {
    id: "claude-sonnet",
    name: "Claude (Sonnet 4)",
    category: "Foundation",
    priority: "Tier 1",
    verdict: "Best-in-class for coding, analysis, and nuanced reasoning with superior safety guardrails.",
    marketShare: "12%",
    pricing: "$20/user/month",
    contextWindow: "200K tokens",
    compliance: ["SOC2", "HIPAA", "GDPR"],
    targetUsers: "Developers, Analysts, Researchers",
    capabilities: {
      codeGeneration: 10,
      reasoning: 10,
      languageUnderstanding: 9,
      multimodal: 8,
      toolUse: 9,
      speed: 8,
      costEfficiency: 8,
      enterpriseFeatures: 9,
      developerExperience: 9,
      documentation: 9,
      vision: 9,
      audio: 3,
      functionCalling: 9,
      jsonReliability: 9,
      dataPrivacy: 10,
      onPremOption: 5,
      slaAvailability: 9,
      contextRecall: 9,
      timeToFirstToken: 8,
      tokensPerSecond: 8,
    },
    logoColor: "#D97706",
    ecosystem: "anthropic",
    specialties: ["coding", "agents", "content"],
    compatibility: ["aws-bedrock", "anthropic-api"],
  },
  {
    id: "chatgpt-enterprise",
    name: "ChatGPT Enterprise",
    category: "Foundation",
    priority: "Tier 1",
    verdict: "Most widely adopted with excellent general-purpose capabilities and strong ecosystem.",
    marketShare: "38%",
    pricing: "$60/user/month",
    contextWindow: "128K tokens",
    compliance: ["SOC2", "HIPAA", "GDPR"],
    targetUsers: "Enterprise Teams, Knowledge Workers",
    capabilities: {
      codeGeneration: 9,
      reasoning: 9,
      languageUnderstanding: 9,
      multimodal: 9,
      toolUse: 9,
      speed: 8,
      costEfficiency: 6,
      enterpriseFeatures: 10,
      developerExperience: 8,
      documentation: 9,
      vision: 9,
      audio: 8,
      functionCalling: 9,
      jsonReliability: 9,
      dataPrivacy: 7,
      onPremOption: 3,
      slaAvailability: 9,
      contextRecall: 8,
      timeToFirstToken: 8,
      tokensPerSecond: 8,
    },
    logoColor: "#10A37F",
    ecosystem: "openai",
    specialties: ["content", "coding", "multimodal", "agents"],
    compatibility: ["openai-api", "azure-openai", "gpt-store"],
  },
  // ... continue for all 50 platforms
];
```

### 2.4 Persona Data Structures

#### INT Inc. Personas (72 Total)

```typescript
export type PersonaSection = 'Front of House' | 'Back of House';
export type PersonaCategory = 
  | 'Primary Decision Makers'
  | 'Operational Decision Makers'
  | 'Influencers & Specialists'
  | 'Industry-Specific'
  | 'Company Size Segments'
  | 'Executive Leadership'
  | 'Information Security Team'
  | 'Technology/IT Services Team'
  | 'Website Design & Development Team'
  | 'Branding & Identity Team'
  | 'Content Creation & Strategy Team'
  | 'Managed Marketing Services Team'
  | 'Operations/Consulting Team'
  | 'Client Services & Success'
  | 'Sales & Business Development'
  | 'Finance & Accounting'
  | 'Human Resources'
  | 'Administration & Office Operations'
  | 'Specialized/Emerging Roles';

export type TechProficiency = 'Novice' | 'Medium' | 'Expert' | 'Strategic';
export type BudgetTier = 'Low' | 'Medium' | 'High' | 'Ultimate';

export interface Persona {
  id: number;
  section: PersonaSection;
  category: PersonaCategory;
  title: string;
  ageRange: string;
  experience: string;
  education: string;
  location: string;
  companySize: string;
  industry: string;
  primaryGoals: string[];
  keyPainPoints: string[];
  techProficiency: TechProficiency;
  decisionAuthority: string;
  budgetRange: string;
  budgetTier: BudgetTier;
  successMetrics: string[];
  communicationPreferences: string[];
  aiToolRecommendations: {
    primary: string;
    secondary: string;
    useCases: string[];
  };
  relationshipMap: {
    reportsTo?: string;
    directReports?: string[];
    collaborators?: string[];
  };
}
```

#### Client Personas (8 B2B SaaS Buyers)

```typescript
export interface ClientPersona {
  id: string;
  role: string;
  title: string;
  industry: string[];
  companySize: string;
  goals: string[];
  painPoints: string[];
  successMetrics: string[];
  techProficiency: "Novice" | "Medium" | "Expert" | "Strategic";
  budgetTier: "Low" | "Medium" | "High" | "Ultimate";
  decisionAuthority: "Influencer" | "Recommender" | "Decision Maker" | "Budget Owner";
  aiUseCases: string[];
  relatedServices: string[];
  confidence: "high" | "medium" | "low";
}

export interface IntService {
  slug: string;
  name: string;
  shortDescription: string;
  industriesImplied: string[];
  rolesImplied: string[];
  painPoints: string[];
  valueProps: string[];
  deliverables: string[];
  confidence: "high" | "medium" | "low";
}

export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics: { name: string; value: string }[];
  rolesMentioned: string[];
  servicesUsed: string[];
  confidence: "high" | "medium" | "low";
}

export interface AIToolRecommendation {
  platformId: string;
  platformName: string;
  ecosystem: string;
  relevanceScore: number;
  useCases: string[];
  rationale: string;
}

// 8 Client Personas
export const clientPersonas: ClientPersona[] = [
  { id: "cmo", role: "CMO", title: "Chief Marketing Officer", ... },
  { id: "ops-lead", role: "Ops Lead", title: "Operations Lead", ... },
  { id: "founder", role: "Founder", title: "Founder / CEO", ... },
  { id: "product-manager", role: "Product Manager", title: "Product Manager", ... },
  { id: "ecommerce-manager", role: "Ecommerce Manager", title: "E-commerce Manager", ... },
  { id: "vp-sales", role: "VP Sales", title: "VP of Sales", ... },
  { id: "cto", role: "CTO", title: "Chief Technology Officer", ... },
  { id: "cs-lead", role: "CS Lead", title: "Customer Success Lead", ... },
];

// 4 INT Inc. Services
export const intServices: IntService[] = [
  { slug: "brand-strategy", name: "Brand Strategy", ... },
  { slug: "ux-ui-design", name: "UX/UI Design", ... },
  { slug: "growth-engineering", name: "Growth Engineering", ... },
  { slug: "ai-integration", name: "AI Integration", ... },
];

// 3 Case Studies
export const caseStudies: CaseStudy[] = [
  { id: "northwind-saas", title: "Northwind SaaS Growth", metrics: [{ name: "Churn Reduction", value: "-2.9%" }], ... },
  { id: "contoso-retail", title: "Contoso Retail Conversion", metrics: [{ name: "CVR Lift", value: "+18%" }], ... },
  { id: "fabrikam-fintech", title: "Fabrikam Fintech Rebrand", metrics: [{ name: "Pipeline Growth", value: "2x" }], ... },
];
```

### 2.5 Microsoft Ecosystem Data

```typescript
export interface MicrosoftProduct {
  id: string;
  name: string;
  category: "Agent Platform" | "Low-Code" | "Enterprise AI" | "Data Platform" | "Developer";
  description: string;
  keyFeatures: string[];
  aiCapabilities: string[];
  pricing: {
    model: string;
    tiers: { name: string; price: string; includes: string[] }[];
  };
  integrations: string[];
  targetUsers: string[];
  mcpSupport: boolean;
  agentTypes?: string[];
  connectorCount?: number;
  compliance: string[];
  releaseWave?: string;
}

export interface MicrosoftLicenseOption {
  id: string;
  name: string;
  price: string;
  billingCycle: "monthly" | "annual";
  perUser: boolean;
  includes: string[];
  addOns?: { name: string; price: string }[];
}

export interface ProductRelationship {
  source: string;
  target: string;
  relationshipType: "integrates" | "extends" | "powers" | "manages";
  description: string;
}

// 10 Microsoft Products
export const microsoftProducts: MicrosoftProduct[] = [
  { id: "copilot-studio", name: "Microsoft Copilot Studio", category: "Agent Platform", ... },
  { id: "power-automate", name: "Power Automate", category: "Low-Code", ... },
  { id: "power-apps", name: "Power Apps", category: "Low-Code", ... },
  { id: "power-pages", name: "Power Pages", category: "Low-Code", ... },
  { id: "power-bi", name: "Power BI", category: "Low-Code", ... },
  { id: "dataverse", name: "Dataverse", category: "Data Platform", ... },
  { id: "ai-builder", name: "AI Builder", category: "Enterprise AI", ... },
  { id: "azure-ai-foundry", name: "Azure AI Foundry", category: "Developer", ... },
  { id: "agent-365", name: "Agent 365", category: "Agent Platform", ... },
  { id: "frontier-program", name: "Frontier Firm Program", category: "Enterprise AI", ... },
];
```

---

## 3. COMPONENT SPECIFICATIONS

### 3.1 App Structure

```
client/src/
├── App.tsx                    # Main app with 8 tabs
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── ExplorerTab.tsx        # Platform browsing
│   ├── ComparisonTab.tsx      # Side-by-side comparison
│   ├── MatrixTab.tsx          # Capability grid
│   ├── ROICalculatorTab.tsx   # Business case calculator
│   ├── StrategyTab.tsx        # Tiered recommendations
│   ├── AssessmentTab.tsx      # 5-step readiness wizard
│   ├── ProfileBuilderTab.tsx  # Personas + Models + Clients
│   ├── MicrosoftEcosystemTab.tsx # Microsoft deep dive
│   ├── ClientPersonasSection.tsx # B2B client personas
│   ├── ErrorBoundary.tsx      # Error handling
│   ├── SkipLink.tsx           # Accessibility
│   └── ThemeToggle.tsx        # Dark/light mode
├── lib/
│   ├── platformData.ts        # 50 platforms
│   ├── ecosystemData.ts       # 8 ecosystems
│   ├── personaData.ts         # 72 INT personas
│   ├── clientPersonaData.ts   # 8 client personas
│   ├── microsoftEcosystemData.ts # Microsoft products
│   └── queryClient.ts         # TanStack Query setup
├── hooks/
│   └── use-toast.ts
└── pages/
    └── not-found.tsx
```

### 3.2 Tab Components Detail

#### Explorer Tab
- Search input with icon
- Filter buttons: Category (Foundation, Specialized, Enterprise, Developer, Productivity, Automation)
- Filter buttons: Priority (Tier 1, 2, 3)
- Ecosystem filter dropdown/buttons
- Platform cards with: Logo, Name, Verdict, Market Share, Pricing, Compliance badges, Ecosystem badge
- "Add to Compare" button (max 4)

#### Comparison Tab
- Platform selector (up to 4)
- General attributes table: Category, Target Users, Pricing, Context Window, Compliance, Market Share
- Capability scores grid (20 dimensions)
- Color-coded cells: Red (1-4), Yellow (5-7), Green (8-10)

#### Matrix Tab
- Full platform x capability grid
- Sticky headers
- Category groupings
- Search/filter by platform or capability
- Color-coded scores

#### ROI Calculator Tab
```typescript
// Inputs
- Number of employees (slider: 10-10000)
- Average salary (slider: $30K-$300K)
- Adoption percentage (slider: 10%-100%)
- Weekly productivity gain (slider: 1-20 hours)
- Annual platform cost (input)
- Training/onboarding cost (input)

// Outputs
- Annual productivity value = (employees * adoptionPercentage * weeklyProductivityGain * 48 weeks * hourlyRate)
- Annual total cost = annualPlatformCost + trainingCost
- Net benefit = productivityValue - totalCost
- ROI percentage = (netBenefit / totalCost) * 100
- Payback period = (totalCost / (productivityValue / 12)) months
```

#### Strategy Tab
- Tier 1 (Foundation): 2-4 platforms for broad adoption
- Tier 2 (Specialization): Domain-specific tools
- Tier 3 (Advanced): Cutting-edge/experimental
- Ecosystem coverage analysis per tier
- Rationale for each tier

#### Assessment Tab (5-Step Wizard)
- Step 1: Organization profile
- Step 2: Current AI usage
- Step 3: Technical readiness
- Step 4: Budget & timeline
- Step 5: Results & recommendations

#### Profile Builder Tab (3 Sub-tabs)
1. **Personas**: 72 INT Inc. personas with expand/collapse categories
2. **Models**: 5 Claude models (Opus 4.5, Opus 4.0, Sonnet 4.5, Sonnet 4.0, Haiku 3.5)
3. **Clients**: 8 B2B client personas with AI tool recommendations

#### Microsoft Deep Dive Tab (5 Sub-tabs)
1. **Products**: 10 Microsoft AI products with detailed cards
2. **Ecosystem Map**: Product relationship visualization
3. **Licensing**: Pricing comparison table
4. **Frontier Firm**: Readiness statistics and capability pillars
5. **MCP**: Model Context Protocol support

---

## 4. API ENDPOINTS

```typescript
// GET /api/platforms - List all platforms
// GET /api/platforms/:id - Get single platform
// POST /api/platforms/compare - Compare multiple platforms { ids: string[] }
// GET /api/strategy - Get strategy tiers
// POST /api/roi/calculate - Calculate ROI { inputs: ROIInputs }
```

### 4.1 Validation Schemas

```typescript
import { z } from "zod";

export const roiInputsSchema = z.object({
  employees: z.number().min(1).max(100000),
  averageSalary: z.number().min(10000).max(1000000),
  adoptionPercentage: z.number().min(0).max(100),
  weeklyProductivityGain: z.number().min(0).max(40),
  annualPlatformCost: z.number().min(0),
  trainingCost: z.number().min(0),
});

export const platformCompareSchema = z.object({
  ids: z.array(z.string()).min(2).max(4),
});
```

---

## 5. UI/UX DESIGN SYSTEM

### 5.1 Color Tokens (CSS Variables)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  --primary: 222 47% 31%;
  --primary-foreground: 0 0% 100%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222 47% 11%;
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;
  --accent: 210 40% 96%;
  --accent-foreground: 222 47% 11%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;
  --border: 214 32% 91%;
  --ring: 222 47% 31%;
}

.dark {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  --card: 222 47% 15%;
  --card-foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222 47% 11%;
  --secondary: 217 33% 17%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217 33% 17%;
  --muted-foreground: 215 20% 65%;
}
```

### 5.2 Ecosystem Colors

```typescript
const ecosystemColors: Record<EcosystemType, string> = {
  anthropic: "#D97706",
  openai: "#10A37F",
  microsoft: "#0078D4",
  google: "#4285F4",
  automation: "#FF6D00",
  langchain: "#1C3C3C",
  "open-source": "#7C3AED",
  independent: "#6B7280",
};
```

### 5.3 Capability Score Colors

```typescript
function getScoreColor(score: number): string {
  if (score >= 8) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
  if (score >= 5) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
  return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
}
```

---

## 6. IMPLEMENTATION PROMPTS

### 6.1 Claude Code CLI Prompts

```
PROMPT 1: Initialize Project Structure
---
Create a new React + TypeScript + Vite project with Express backend. Set up:
- Tailwind CSS with shadcn/ui components
- TanStack Query v5 for data fetching
- Drizzle ORM with PostgreSQL schema
- Path aliases: @/, @shared/, @assets/

Install: react, typescript, vite, tailwindcss, @radix-ui/*, lucide-react, @tanstack/react-query, express, drizzle-orm

Create folder structure:
client/src/components/ui/ (shadcn components)
client/src/lib/ (data files)
server/ (Express backend)
shared/ (TypeScript interfaces)
```

```
PROMPT 2: Create Core Data Files
---
Create these data files with the complete platform and ecosystem data:

1. shared/schema.ts - Export interfaces: PlatformCapabilities, Platform, Ecosystem, ROIInputs, ROIResults, StrategyTier, EcosystemType, SpecialtyType

2. client/src/lib/platformData.ts - Export 50 platforms across 8 ecosystems with full capability scores (1-10)

3. client/src/lib/ecosystemData.ts - Export 8 ecosystems with platformIds arrays

4. client/src/lib/personaData.ts - Export 72 INT Inc. personas (23 Front of House, 49 Back of House) with Claude model recommendations

5. client/src/lib/clientPersonaData.ts - Export 8 B2B client personas, 4 INT services, 3 case studies, AI tool recommendation engine

6. client/src/lib/microsoftEcosystemData.ts - Export 10 Microsoft products, licensing options, product relationships
```

```
PROMPT 3: Build Explorer Tab
---
Create ExplorerTab.tsx component with:
- Search input with magnifying glass icon
- Category filter buttons (Foundation, Specialized, Enterprise, Developer, Productivity, Automation)
- Priority filter buttons (Tier 1, 2, 3)
- Ecosystem filter dropdown with 8 options
- Platform cards grid (responsive: 1-4 columns)
- Each card shows: logo placeholder (colored div), name, verdict, market share, pricing, compliance badges, ecosystem badge
- "Add to Compare" button that adds to shared state (max 4)
- Use shadcn Card, Badge, Button, Input components
- Add data-testid attributes to all interactive elements
```

```
PROMPT 4: Build Comparison Tab
---
Create ComparisonTab.tsx component with:
- Platform selector allowing 2-4 platforms
- General attributes comparison table
- 20-dimension capability scores grid with color-coded cells
- Score colors: 1-4 red, 5-7 yellow, 8-10 green
- Sticky column headers
- Platform verdicts at bottom
- Remove platform button for each selected
```

```
PROMPT 5: Build Matrix Tab
---
Create MatrixTab.tsx component with:
- Full grid: 50 platforms (rows) x 20 capabilities (columns)
- Sticky headers for both rows and columns
- Category grouping for capabilities
- Color-coded score cells
- Search filter for platforms
- Ecosystem filter dropdown
```

```
PROMPT 6: Build ROI Calculator Tab
---
Create ROICalculatorTab.tsx component with:
- Input form with sliders:
  - Employees (10-10000)
  - Average salary ($30K-$300K)
  - Adoption percentage (10-100%)
  - Weekly productivity gain (1-20 hrs)
  - Annual platform cost (number input)
  - Training cost (number input)
- Real-time calculation (no submit button)
- Results display:
  - Annual productivity value (formatted currency)
  - Annual total cost
  - Net benefit
  - ROI percentage
  - Payback period (months)
- Research methodology citations
```

```
PROMPT 7: Build Strategy Tab
---
Create StrategyTab.tsx component with:
- 3 strategy tier cards:
  - Tier 1 (Foundation): Claude Sonnet, ChatGPT Enterprise, Gemini, Microsoft Copilot
  - Tier 2 (Specialization): GitHub Copilot, Jasper, Perplexity, Power Platform
  - Tier 3 (Advanced): Claude Opus, LangChain, Open Source models
- Each tier shows: description, platform list, rationale
- Ecosystem coverage analysis showing which ecosystems are represented
- Colored ecosystem badges
```

```
PROMPT 8: Build Assessment Tab
---
Create AssessmentTab.tsx component with 5-step wizard:
- Step 1: Organization profile (industry, size, AI maturity)
- Step 2: Current AI usage (tools used, use cases)
- Step 3: Technical readiness (infrastructure, skills)
- Step 4: Budget & timeline (investment range, implementation timeline)
- Step 5: Results (AI readiness score, recommended platforms, next steps)
- Progress indicator showing current step
- Back/Next navigation buttons
- Form state management with useState
```

```
PROMPT 9: Build Profile Builder Tab
---
Create ProfileBuilderTab.tsx with 3 sub-tabs:

1. Personas sub-tab:
   - 72 personas organized by section (Front of House, Back of House) and category
   - Expandable category groups
   - Persona cards with: title, tech proficiency badge, budget tier, goals preview
   - Click to expand detailed view with full attributes and Claude recommendations

2. Models sub-tab:
   - 5 Claude models: Opus 4.5, Opus 4.0, Sonnet 4.5, Sonnet 4.0, Haiku 3.5
   - Model cards with: name, description, best for, pricing, key capabilities

3. Clients sub-tab:
   - Render ClientPersonasSection component
```

```
PROMPT 10: Build Client Personas Section
---
Create ClientPersonasSection.tsx component with:
- Header: "B2B SaaS Client Personas"
- Search input for filtering personas
- Industry filter buttons
- Stats bar: X personas, Y services, Z case studies, 50 AI platforms
- Persona cards grid showing: role, title, industry badges, goals preview, tech proficiency, budget tier
- Click to open detail modal with:
  - Full goals and pain points lists
  - Success metrics
  - AI use cases
  - AI tool recommendations (6 platforms from all ecosystems with relevance scores)
  - Linked INT Inc. services with deliverables
  - Related case studies with metrics
- Use semantic color tokens only (no hardcoded colors)
```

```
PROMPT 11: Build Microsoft Ecosystem Tab
---
Create MicrosoftEcosystemTab.tsx with 5 sub-tabs:

1. Products sub-tab:
   - 10 Microsoft product cards
   - Each shows: name, category, description, key features, AI capabilities, pricing, integrations, compliance badges, MCP support indicator

2. Ecosystem Map sub-tab:
   - Visual diagram showing product relationships
   - Lines indicating: integrates, extends, powers, manages
   - Product nodes with category colors

3. Licensing sub-tab:
   - Comparison table of all Microsoft licensing options
   - Columns: product, pricing model, per-user cost, included features, add-ons

4. Frontier Firm sub-tab:
   - Statistics about AI-first organizations
   - Capability pillars diagram
   - Readiness checklist

5. MCP sub-tab:
   - Model Context Protocol explanation
   - Products with MCP support highlighted
   - Server list and capabilities
```

```
PROMPT 12: Create Express Backend
---
Create server/routes.ts with:
- GET /api/platforms - return all platforms
- GET /api/platforms/:id - return single platform
- POST /api/platforms/compare - accept { ids: string[] }, return matching platforms
- GET /api/strategy - return strategy tiers
- POST /api/roi/calculate - accept ROIInputs, return ROIResults

Add:
- Helmet middleware with CSP
- Rate limiting (100 req/15min general, 20 req/min for ROI)
- Zod validation for POST endpoints
- Error handling with proper status codes
```

```
PROMPT 13: Add Dark Mode & Theming
---
Implement dark mode toggle:
- ThemeToggle component with sun/moon icon
- useState for theme, useEffect to toggle 'dark' class on document.documentElement
- localStorage persistence
- Update tailwind.config.ts with darkMode: ["class"]
- Ensure all components use semantic color tokens (bg-background, text-foreground, etc.)
```

```
PROMPT 14: Add Error Handling & Accessibility
---
Create:
1. ErrorBoundary component wrapping each tab
2. SkipLink component for keyboard navigation
3. Proper ARIA labels on all interactive elements
4. Focus management for modals
5. data-testid on all buttons, inputs, cards
```

---

## 7. TESTING CHECKLIST

### 7.1 Functional Tests
- [ ] Explorer: Search filters platforms correctly
- [ ] Explorer: Category/priority/ecosystem filters work
- [ ] Explorer: Add to Compare adds platform (max 4)
- [ ] Comparison: Shows correct platform data
- [ ] Comparison: Capability scores are color-coded
- [ ] Matrix: All 50 platforms display
- [ ] Matrix: Sticky headers work on scroll
- [ ] ROI: Calculations update in real-time
- [ ] ROI: Results format correctly as currency
- [ ] Strategy: All 3 tiers display with platforms
- [ ] Assessment: Wizard navigation works
- [ ] Profile Builder: All 3 sub-tabs accessible
- [ ] Personas: Expand/collapse works
- [ ] Clients: AI recommendations display for each persona
- [ ] Microsoft: All 5 sub-tabs render

### 7.2 Design Tests
- [ ] Dark mode toggles correctly
- [ ] No hardcoded colors (use semantic tokens)
- [ ] Buttons use default size (not size="sm")
- [ ] No partial borders on rounded components
- [ ] Consistent spacing throughout
- [ ] Responsive on mobile/tablet/desktop

---

## 8. DEPLOYMENT

### 8.1 Environment Variables
```
DATABASE_URL=postgresql://...
NODE_ENV=production
```

### 8.2 Build Commands
```bash
npm run build      # Builds frontend and backend
npm run start      # Starts production server
npm run dev        # Development with hot reload
```

### 8.3 Production Hosting
- Replit Deployments (recommended)
- Vercel
- Railway
- Render

---

## APPENDIX A: CAPABILITY DIMENSION DEFINITIONS

| Dimension | Description |
|-----------|-------------|
| codeGeneration | Ability to write, complete, and debug code |
| reasoning | Complex problem-solving and logical analysis |
| languageUnderstanding | Comprehension and generation of natural language |
| multimodal | Processing images, audio, video, and text together |
| toolUse | Ability to use external tools and APIs |
| speed | Response latency and throughput |
| costEfficiency | Price per token or per task |
| enterpriseFeatures | SSO, audit logs, admin controls |
| developerExperience | API quality, SDK support, documentation |
| documentation | Quality and completeness of documentation |
| vision | Image understanding and analysis |
| audio | Speech recognition and audio processing |
| functionCalling | Structured function/tool calling reliability |
| jsonReliability | Consistent JSON output formatting |
| dataPrivacy | Data handling, retention policies |
| onPremOption | Self-hosting or private cloud deployment |
| slaAvailability | Uptime guarantees and support SLAs |
| contextRecall | Accuracy over long context windows |
| timeToFirstToken | Initial response latency |
| tokensPerSecond | Generation speed |

---

## APPENDIX B: COMPLETE PLATFORM LIST (50)

### Anthropic Ecosystem (5)
1. claude-sonnet
2. claude-opus
3. anthropic-api
4. aws-bedrock
5. claude-web

### OpenAI Ecosystem (6)
6. chatgpt-enterprise
7. openai-api
8. azure-openai
9. chatgpt-plus
10. gpt-store
11. chatgpt-web

### Microsoft Ecosystem (6)
12. microsoft-copilot
13. azure-openai (shared)
14. github-copilot
15. power-platform
16. dynamics-365-ai
17. microsoft-365-copilot

### Google Ecosystem (5)
18. gemini-advanced
19. vertex-ai
20. google-ai-studio
21. duet-ai
22. notebooklm

### Automation Ecosystem (5)
23. zapier
24. make-com
25. pipedream
26. n8n
27. power-platform (shared)

### LangChain Ecosystem (4)
28. langchain
29. langgraph
30. langsmith
31. langserve

### Open Source Ecosystem (6)
32. llama-3
33. mistral-large
34. deepseek-v3
35. huggingface
36. together-ai
37. groq

### Independent/Specialized (15)
38. perplexity-pro
39. jasper
40. copy-ai
41. notion-ai
42. slack-ai
43. glean
44. cursor
45. writer
46. cohere
47. dataiku
48. cognigy
49. moveworks
50. databricks
51. salesforce-agentforce
52. grok-2

---

*Document Version: 1.0*
*Generated for: Claude Code CLI, Antigravity IDE, Gemini CLI*
*Last Updated: January 2026*
