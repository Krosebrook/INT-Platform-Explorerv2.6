import type { EcosystemType, SpecialtyType } from "@shared/schema";

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

export const microsoftProducts: MicrosoftProduct[] = [
  {
    id: "copilot-studio",
    name: "Microsoft Copilot Studio (Frontier)",
    category: "Agent Platform",
    description: "Enterprise-grade autonomous agent platform with Frontier Program early access to GPT-5.2, Claude Opus 4.1, human-in-the-loop approvals, and 1,400+ integrations via MCP. Build conversational and autonomous agents that can trigger actions, approve workflows, and collaborate across the Microsoft 365 ecosystem.",
    keyFeatures: [
      "Natural language agent authoring (conversational design)",
      "Expanded model choice: GPT-5.1, GPT-5.2, Claude Sonnet 4, Claude Opus 4.1",
      "Human-in-the-loop (HITL) approvals via Outlook forms",
      "Model Context Protocol (MCP) with 1,400+ connectors",
      "One-click 'Copy to Copilot Studio' from Agent Builder",
      "Python code interpreter (GA)",
      "VS Code extension for pro-code editing",
      "Agent2Agent (A2A) collaboration",
      "Computer Use automation capabilities",
      "Agent evaluations and testing tools",
      "Multi-channel: Teams, Web, Mobile, Voice, WhatsApp"
    ],
    aiCapabilities: [
      "GPT-5.2 priority access (Frontier Dec 2025)",
      "Claude Opus 4.1 & Sonnet 4 (Frontier)",
      "Work IQ grounding with enterprise permissions",
      "Generative answers from knowledge base",
      "Generative actions for dynamic plugin selection",
      "Deep reasoning with premium AI tools",
      "Code generation and file creation"
    ],
    pricing: {
      model: "Copilot Credits (Changed from messages Sept 2025)",
      tiers: [
        { name: "Prepaid Capacity Pack", price: "$200/month for 25,000 credits", includes: ["Steady predictable usage", "Premium connectors"] },
        { name: "Pay-As-You-Go", price: "$0.01 per credit", includes: ["Pilots", "Variable demand", "Seasonal spikes"] },
        { name: "Pre-purchase Annual", price: "Up to 20% discount", includes: ["High-volume", "Multi-year planning"] },
        { name: "M365 Copilot License", price: "$30/user/month", includes: ["Zero-rated internal agents", "Teams/SharePoint/Copilot Chat"] }
      ]
    },
    integrations: ["Power Platform", "Microsoft 365", "Azure AI Foundry", "Microsoft Graph", "Dynamics 365", "ServiceNow", "Salesforce", "Jira", "SAP", "Workday"],
    targetUsers: ["Business Analysts", "Citizen Developers", "IT Admins", "Customer Service", "HR", "Finance", "Procurement"],
    mcpSupport: true,
    agentTypes: ["Conversational", "Autonomous (25 credits/trigger)", "Voice/IVR", "M365 Copilot Extensions", "Human-in-the-loop"],
    connectorCount: 1400,
    compliance: ["SOC2", "GDPR", "FedRAMP", "HIPAA", "ISO 27001"],
    releaseWave: "Frontier Program 2025"
  },
  {
    id: "power-automate",
    name: "Power Automate",
    category: "Low-Code",
    description: "Cloud and desktop automation platform with AI-powered flow creation, RPA capabilities, and process mining.",
    keyFeatures: [
      "Cloud flows (API automation)",
      "Desktop flows (RPA)",
      "Copilot-assisted flow builder",
      "Process mining and task mining",
      "Intelligent document processing",
      "Self-healing automations",
      "Multi-modal flows (text, images, audio, video)"
    ],
    aiCapabilities: [
      "Generative actions",
      "AI Builder integration",
      "Copilot in Flow Designer",
      "Expression builder with Copilot"
    ],
    pricing: {
      model: "Per User or Per Flow",
      tiers: [
        { name: "Per User with Attended RPA", price: "$15/user/month", includes: ["Unlimited cloud flows", "Attended RPA", "Premium connectors"] },
        { name: "Per Flow", price: "$100/flow/month", includes: ["Shared flows", "Attended + Unattended RPA"] },
        { name: "Unattended RPA Add-on", price: "$150/bot/month", includes: ["Unattended desktop flows", "Scheduled automation"] }
      ]
    },
    integrations: ["Power Apps", "Power Pages", "Copilot Studio", "Dynamics 365", "Microsoft 365", "Azure Logic Apps", "1,400+ connectors"],
    targetUsers: ["Business Analysts", "Process Owners", "IT Automation Teams", "Operations"],
    mcpSupport: false,
    compliance: ["SOC2", "GDPR", "FedRAMP", "HIPAA"],
    releaseWave: "Wave 2 2025"
  },
  {
    id: "power-apps",
    name: "Power Apps",
    category: "Low-Code",
    description: "Low-code application development platform for building custom business applications with AI assistance.",
    keyFeatures: [
      "Canvas apps (pixel-perfect control)",
      "Model-driven apps (data-first)",
      "Copilot-assisted app creation",
      "Component library",
      "Power Fx formula language",
      "Responsive design",
      "Offline capabilities"
    ],
    aiCapabilities: [
      "Copilot for app building",
      "AI Builder components",
      "Natural language to app",
      "Smart data suggestions"
    ],
    pricing: {
      model: "Per User or Per App",
      tiers: [
        { name: "Per User", price: "$20/user/month", includes: ["Unlimited apps", "Unlimited portals", "Premium connectors"] },
        { name: "Per App", price: "$5/user/app/month", includes: ["Single app access", "Unlimited portals"] }
      ]
    },
    integrations: ["Dataverse", "Power Automate", "Power BI", "Microsoft 365", "Dynamics 365", "Azure"],
    targetUsers: ["Citizen Developers", "Business Analysts", "IT Developers", "Line of Business"],
    mcpSupport: false,
    compliance: ["SOC2", "GDPR", "FedRAMP", "HIPAA"],
    releaseWave: "Wave 2 2025"
  },
  {
    id: "power-pages",
    name: "Power Pages",
    category: "Low-Code",
    description: "External-facing website builder with AI-powered web agents for 24/7 customer engagement.",
    keyFeatures: [
      "Low-code site building",
      "Web agents (24/7 AI support)",
      "Multi-channel engagement (chat, email, Teams, WhatsApp)",
      "AI-assisted form filling",
      "Security agent with natural language",
      "Dynamic list visualizations",
      "Power BI embedding"
    ],
    aiCapabilities: [
      "Copilot Studio web agents",
      "AI-assisted form filling",
      "Security agent (natural language)",
      "Security & compliance monitoring"
    ],
    pricing: {
      model: "Capacity-based",
      tiers: [
        { name: "Authenticated Users", price: "Based on volume", includes: ["Internal/external users", "SSO support"] },
        { name: "Anonymous Users", price: "Based on volume", includes: ["Public website visitors"] }
      ]
    },
    integrations: ["Dataverse", "Power Apps", "Power Automate", "Power BI", "Dynamics 365", "Azure AD B2C"],
    targetUsers: ["Web Developers", "Marketing", "Customer Service", "IT Admins"],
    mcpSupport: false,
    compliance: ["SOC2", "GDPR", "FedRAMP"],
    releaseWave: "Wave 2 2025"
  },
  {
    id: "power-bi",
    name: "Power BI",
    category: "Low-Code",
    description: "Business intelligence platform with AI-powered insights, natural language queries, and Copilot integration.",
    keyFeatures: [
      "Interactive dashboards",
      "Natural language Q&A",
      "Copilot for report creation",
      "Paginated reports",
      "Dataflows and datasets",
      "Mobile apps",
      "Embedded analytics"
    ],
    aiCapabilities: [
      "Copilot for Power BI",
      "Smart narratives",
      "Anomaly detection",
      "Natural language queries",
      "AI visuals"
    ],
    pricing: {
      model: "Per User",
      tiers: [
        { name: "Power BI Pro", price: "$10/user/month", includes: ["Report sharing", "Collaboration"] },
        { name: "Power BI Premium Per User", price: "$20/user/month", includes: ["Advanced AI", "Larger models", "Paginated reports"] },
        { name: "Power BI Premium", price: "Capacity-based", includes: ["Dedicated capacity", "Unlimited viewers"] }
      ]
    },
    integrations: ["Dataverse", "Power Apps", "Power Automate", "Azure Synapse", "Microsoft 365", "Dynamics 365"],
    targetUsers: ["Business Analysts", "Data Analysts", "Executives", "Report Creators"],
    mcpSupport: false,
    compliance: ["SOC2", "GDPR", "FedRAMP", "HIPAA"],
    releaseWave: "Wave 2 2025"
  },
  {
    id: "dataverse",
    name: "Dataverse",
    category: "Data Platform",
    description: "Cloud data platform and central repository for Power Platform with built-in business logic and security.",
    keyFeatures: [
      "Relational data model",
      "Row-level and field-level security",
      "Business rules and workflows",
      "Calculated and rollup fields",
      "Managed vector index for AI",
      "Unified agent database",
      "Audit logging"
    ],
    aiCapabilities: [
      "Managed vector index for semantic search",
      "AI agent data storage",
      "Knowledge base for Copilot Studio",
      "MCP server support"
    ],
    pricing: {
      model: "Capacity-based",
      tiers: [
        { name: "Default", price: "Included", includes: ["1 GB Database", "1 GB File per tenant"] },
        { name: "Additional Capacity", price: "Per GB", includes: ["Database", "File", "Log storage"] }
      ]
    },
    integrations: ["Power Apps", "Power Automate", "Power Pages", "Copilot Studio", "Dynamics 365", "Microsoft 365"],
    targetUsers: ["IT Admins", "Data Architects", "Developers", "Business Analysts"],
    mcpSupport: true,
    compliance: ["SOC2", "GDPR", "FedRAMP", "HIPAA"],
    releaseWave: "Wave 2 2025"
  },
  {
    id: "ai-builder",
    name: "AI Builder",
    category: "Low-Code",
    description: "No-code AI capabilities for Power Platform including document processing, prediction, and custom models.",
    keyFeatures: [
      "Prebuilt AI models",
      "Custom model training",
      "Document processing",
      "Object detection",
      "Text classification",
      "Sentiment analysis",
      "Entity extraction"
    ],
    aiCapabilities: [
      "Invoice processing",
      "Receipt processing",
      "Business card reader",
      "Identity document reader",
      "Custom document models",
      "Prediction models"
    ],
    pricing: {
      model: "Credit-based",
      tiers: [
        { name: "Included Credits", price: "With Power Platform", includes: ["Monthly AI credits", "Prebuilt models"] },
        { name: "Additional Credits", price: "Pay-as-you-go", includes: ["Custom models", "High-volume processing"] }
      ]
    },
    integrations: ["Power Apps", "Power Automate", "Copilot Studio", "Dataverse"],
    targetUsers: ["Business Analysts", "Citizen Developers", "Process Owners"],
    mcpSupport: false,
    compliance: ["SOC2", "GDPR", "FedRAMP"],
    releaseWave: "Wave 2 2025"
  },
  {
    id: "azure-ai-foundry",
    name: "Azure AI Foundry",
    category: "Developer",
    description: "Unified AI platform with 11,000+ models, agent orchestration, and enterprise-grade deployment.",
    keyFeatures: [
      "11,000+ AI models",
      "Agent Factory for building agents",
      "Foundry Agent Service",
      "Model catalog (OpenAI, Anthropic, Meta, Mistral)",
      "Prompt flow for orchestration",
      "Evaluation and testing tools",
      "Content safety filters"
    ],
    aiCapabilities: [
      "GPT-4o, GPT-5",
      "Claude (Anthropic)",
      "Llama (Meta)",
      "Mistral models",
      "Custom fine-tuning",
      "RAG pipelines"
    ],
    pricing: {
      model: "Pay-as-you-go",
      tiers: [
        { name: "Serverless API (MaaS)", price: "Per token/call", includes: ["API access", "No infrastructure"] },
        { name: "Managed Compute", price: "Per hour", includes: ["Dedicated capacity", "Custom models"] }
      ]
    },
    integrations: ["Copilot Studio", "Azure OpenAI", "Azure ML", "Power Platform", "Microsoft 365"],
    targetUsers: ["AI Engineers", "ML Engineers", "Data Scientists", "Developers"],
    mcpSupport: true,
    compliance: ["SOC2", "GDPR", "FedRAMP", "HIPAA", "ISO 27001"],
    releaseWave: "Wave 2 2025"
  },
  {
    id: "agent-365",
    name: "Agent 365",
    category: "Agent Platform",
    description: "Control plane for managing agent fleets with enterprise governance, monitoring, and lifecycle management.",
    keyFeatures: [
      "Centralized agent registry",
      "Lifecycle management",
      "Usage analytics and billing",
      "Security and compliance monitoring",
      "Role-based access control",
      "Agent versioning",
      "Fleet orchestration"
    ],
    aiCapabilities: [
      "Agent performance monitoring",
      "Automated scaling",
      "Cross-agent analytics",
      "Compliance reporting"
    ],
    pricing: {
      model: "Included with M365 Copilot",
      tiers: [
        { name: "Enterprise", price: "Included", includes: ["Full governance", "Analytics", "Compliance"] }
      ]
    },
    integrations: ["Copilot Studio", "Microsoft 365", "Azure AI Foundry", "Power Platform"],
    targetUsers: ["IT Admins", "Security Teams", "Governance Officers", "Enterprise Architects"],
    mcpSupport: true,
    compliance: ["SOC2", "GDPR", "FedRAMP", "HIPAA"],
    releaseWave: "Wave 2 2025"
  },
  {
    id: "frontier-program",
    name: "Microsoft Frontier Program",
    category: "Enterprise AI",
    description: "Early-access initiative for cutting-edge AI features in Microsoft 365 and Copilot before general availability.",
    keyFeatures: [
      "Agent Mode in Office apps",
      "Researcher agent (web + work data)",
      "Interpreter for Python in Excel",
      "Multi-model selection",
      "Notebook tool for thought organization",
      "Early access to GPT-5 features"
    ],
    aiCapabilities: [
      "Agent Mode (Word, PowerPoint, Excel)",
      "Deep research with citations",
      "Python execution in Excel",
      "Voice interaction modes"
    ],
    pricing: {
      model: "Included with Copilot plan",
      tiers: [
        { name: "M365 Copilot", price: "No additional cost", includes: ["Early access", "Preview features"] },
        { name: "Personal/Family", price: "With paid Copilot", includes: ["Web app access first"] }
      ]
    },
    integrations: ["Microsoft 365", "Copilot Studio", "OneDrive", "SharePoint"],
    targetUsers: ["Early Adopters", "Power Users", "Enterprise Pilots"],
    mcpSupport: false,
    compliance: ["Preview features may vary"],
    releaseWave: "Ongoing"
  }
];

export const productRelationships: ProductRelationship[] = [
  { source: "copilot-studio", target: "power-automate", relationshipType: "integrates", description: "Agent Flows trigger Power Automate workflows" },
  { source: "copilot-studio", target: "dataverse", relationshipType: "integrates", description: "Knowledge storage and vector index" },
  { source: "copilot-studio", target: "azure-ai-foundry", relationshipType: "integrates", description: "Third-party model access" },
  { source: "copilot-studio", target: "agent-365", relationshipType: "manages", description: "Agent governance and lifecycle" },
  { source: "power-apps", target: "dataverse", relationshipType: "powers", description: "Primary data source" },
  { source: "power-apps", target: "power-automate", relationshipType: "integrates", description: "Workflow triggers from apps" },
  { source: "power-apps", target: "ai-builder", relationshipType: "integrates", description: "Embedded AI components" },
  { source: "power-automate", target: "dataverse", relationshipType: "integrates", description: "Data operations and triggers" },
  { source: "power-automate", target: "ai-builder", relationshipType: "integrates", description: "AI processing in flows" },
  { source: "power-pages", target: "dataverse", relationshipType: "powers", description: "Data-driven websites" },
  { source: "power-pages", target: "copilot-studio", relationshipType: "integrates", description: "Web agents for support" },
  { source: "power-bi", target: "dataverse", relationshipType: "integrates", description: "Data visualization" },
  { source: "power-bi", target: "power-apps", relationshipType: "integrates", description: "Embedded reports" },
  { source: "azure-ai-foundry", target: "copilot-studio", relationshipType: "extends", description: "Model catalog access" },
  { source: "agent-365", target: "copilot-studio", relationshipType: "manages", description: "Enterprise agent governance" },
  { source: "frontier-program", target: "copilot-studio", relationshipType: "extends", description: "Preview agent features" }
];

export const microsoftLicenses: MicrosoftLicenseOption[] = [
  {
    id: "m365-copilot",
    name: "Microsoft 365 Copilot",
    price: "$30",
    billingCycle: "monthly",
    perUser: true,
    includes: [
      "Copilot in Word, Excel, PowerPoint, Outlook, Teams",
      "Copilot Studio for internal agents",
      "Agent 365 governance",
      "Microsoft Graph integration",
      "Enterprise data protection"
    ],
    addOns: [
      { name: "Copilot Studio messages", price: "Pay-as-you-go" }
    ]
  },
  {
    id: "power-platform-premium",
    name: "Power Platform Premium",
    price: "$40",
    billingCycle: "monthly",
    perUser: true,
    includes: [
      "Power Apps Premium",
      "Power Automate Premium",
      "Power Pages (authenticated users)",
      "AI Builder credits",
      "Dataverse capacity",
      "Premium connectors"
    ]
  },
  {
    id: "power-automate-premium",
    name: "Power Automate Premium",
    price: "$15",
    billingCycle: "monthly",
    perUser: true,
    includes: [
      "Unlimited cloud flows",
      "Attended RPA",
      "Process Mining",
      "Premium connectors",
      "AI Builder credits"
    ],
    addOns: [
      { name: "Unattended RPA", price: "$150/bot/month" },
      { name: "Hosted RPA bots", price: "Capacity-based" }
    ]
  },
  {
    id: "power-apps-premium",
    name: "Power Apps Premium",
    price: "$20",
    billingCycle: "monthly",
    perUser: true,
    includes: [
      "Unlimited apps",
      "Unlimited portals",
      "Premium connectors",
      "Dataverse capacity",
      "AI Builder credits"
    ]
  },
  {
    id: "power-bi-pro",
    name: "Power BI Pro",
    price: "$10",
    billingCycle: "monthly",
    perUser: true,
    includes: [
      "Report creation and sharing",
      "Collaboration features",
      "Mobile apps",
      "Natural language Q&A"
    ]
  }
];

export const frontierFirmCapabilities = {
  title: "Frontier Firm Readiness",
  description: "Organizations architecting operations around human-agent collaboration",
  statistics: {
    adoptionRate: "22%",
    outcomeMultiplier: "4X",
    leadershipUrgency: "82%",
    agentIntegrationTimeline: "12-18 months"
  },
  pillars: [
    {
      name: "Agent-First Operations",
      description: "Agents handle routine tasks while humans focus on judgment and creativity",
      capabilities: ["Autonomous agents", "Human-in-the-loop", "Agent orchestration"]
    },
    {
      name: "Unified Data Platform",
      description: "Single source of truth powering all AI and agent experiences",
      capabilities: ["Dataverse", "Semantic Index", "Knowledge management"]
    },
    {
      name: "Enterprise Governance",
      description: "Centralized control and compliance for agent fleets",
      capabilities: ["Agent 365", "Role-based access", "Audit trails"]
    },
    {
      name: "Multi-Model Flexibility",
      description: "Access to best-in-class models from multiple providers",
      capabilities: ["Azure AI Foundry", "11,000+ models", "MCP support"]
    }
  ]
};

export const mcpIntegrations = {
  title: "Model Context Protocol (MCP) Support",
  description: "Open standard for connecting AI agents to data sources and tools",
  supportedProducts: ["Copilot Studio", "Azure AI Foundry", "Agent 365", "Dataverse"],
  servers: [
    { name: "Dataverse MCP Server", status: "Preview", description: "Connect agents to Dataverse data" },
    { name: "Dynamics 365 MCP Server", status: "Preview", description: "CRM/ERP data access" },
    { name: "MCP Server Registry", status: "GA", description: "Discover and connect MCP servers" }
  ],
  benefits: [
    "Standardized agent-to-data connections",
    "Growing third-party ecosystem",
    "Faster agent development",
    "Cross-platform compatibility"
  ]
};

export interface FrontierAgent {
  name: string;
  capability: string;
  availability: string;
  status: "Frontier" | "GA" | "Preview";
  useCase: string;
}

export const frontierAgents: FrontierAgent[] = [
  {
    name: "Researcher Agent",
    capability: "Multi-step research with OpenAI or Anthropic reasoning models",
    availability: "Frontier (April 2025)",
    status: "Frontier",
    useCase: "Deep research, competitive analysis, market intelligence"
  },
  {
    name: "Analyst Agent",
    capability: "Data analysis—turn raw data into insights like a data scientist",
    availability: "Frontier (April 2025)",
    status: "Frontier",
    useCase: "Financial modeling, trend analysis, reporting automation"
  },
  {
    name: "App Builder Agent",
    capability: "Build custom apps using natural language—track projects, assign tasks, build dashboards",
    availability: "Frontier (Oct 2025)",
    status: "Frontier",
    useCase: "Rapid prototyping, internal tools, custom workflows"
  },
  {
    name: "Workflows Agent",
    capability: "Automate tasks on a schedule or in response to events",
    availability: "Frontier (Oct 2025)",
    status: "Frontier",
    useCase: "Process automation, notifications, data synchronization"
  },
  {
    name: "People Agent",
    capability: "Centralize people-related information across the organization",
    availability: "Frontier (Nov 2025)",
    status: "Frontier",
    useCase: "HR support, org insights, employee lookup"
  },
  {
    name: "Sales Development Agent",
    capability: "Autonomously build pipeline, nurture leads, personalize outreach",
    availability: "Frontier (Dec 2025)",
    status: "Frontier",
    useCase: "Lead generation, follow-up automation, sales enablement"
  },
  {
    name: "Workforce Insights Agent",
    capability: "Real-time team/org insights by role, tenure, location",
    availability: "Frontier (Nov 2025)",
    status: "Frontier",
    useCase: "Workforce planning, capacity analysis, team optimization"
  }
];

export interface CreditConsumption {
  actionType: string;
  credits: number;
  notes: string;
}

export const copilotCreditConsumption: CreditConsumption[] = [
  { actionType: "Classic response (scripted)", credits: 1, notes: "Pre-built, non-AI responses" },
  { actionType: "Generative response (AI answer)", credits: 2, notes: "GPT-powered answers" },
  { actionType: "Agent action (invoke tools/plugins)", credits: 5, notes: "Each connector call, API action" },
  { actionType: "Tenant Graph grounding", credits: 10, notes: "RAG over Microsoft 365 data (reduced from 30 in April 2025)" },
  { actionType: "Agent flows", credits: 13, notes: "Per 100 Power Automate actions" },
  { actionType: "Autonomous trigger", credits: 25, notes: "Always billed, even for M365 Copilot users" },
  { actionType: "Deep reasoning (premium AI)", credits: 0, notes: "Variable - premium models cost more" }
];

export interface AgentModeApp {
  app: string;
  capability: string;
  status: "GA" | "Frontier" | "Preview";
  availableDate: string;
}

export const agentModeApps: AgentModeApp[] = [
  { app: "Word", capability: "Iterative document creation with reasoning models", status: "GA", availableDate: "Nov 2025" },
  { app: "Excel", capability: "Multi-step tasks (modeling, tables, charts); choose OpenAI or Anthropic models", status: "Frontier", availableDate: "Nov/Dec 2025" },
  { app: "PowerPoint", capability: "Iterative presentation creation with AI assistance", status: "Frontier", availableDate: "Nov 2025" }
];

export const frontierModels = {
  title: "Expanded Model Choice in Copilot Studio (Frontier)",
  description: "Priority access to cutting-edge AI models for building agents",
  models: [
    { name: "GPT-5.1", provider: "OpenAI", status: "Frontier", bestFor: "General purpose agents" },
    { name: "GPT-5.2", provider: "OpenAI", status: "Frontier (Dec 2025)", bestFor: "Advanced reasoning, complex tasks" },
    { name: "Claude Sonnet 4", provider: "Anthropic", status: "Frontier", bestFor: "Coding, analysis, nuanced responses" },
    { name: "Claude Opus 4.1", provider: "Anthropic", status: "Frontier", bestFor: "Complex reasoning, enterprise-critical tasks" }
  ],
  advantages: [
    "Model selection dropdown in Copilot Studio",
    "Choose the right AI model for each task",
    "Priority access for Copilot-licensed users",
    "Third-party models via Azure AI Foundry"
  ]
};

export function getMicrosoftProductById(id: string): MicrosoftProduct | undefined {
  return microsoftProducts.find(p => p.id === id);
}

export function getProductsByCategory(category: MicrosoftProduct["category"]): MicrosoftProduct[] {
  return microsoftProducts.filter(p => p.category === category);
}

export function getProductRelationships(productId: string): ProductRelationship[] {
  return productRelationships.filter(r => r.source === productId || r.target === productId);
}

export function getMCPEnabledProducts(): MicrosoftProduct[] {
  return microsoftProducts.filter(p => p.mcpSupport);
}
