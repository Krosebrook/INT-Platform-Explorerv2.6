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
    name: "Microsoft Copilot Studio",
    category: "Agent Platform",
    description: "SaaS conversational and autonomous agent platform with 1,400+ integrations via Power Platform connectors and Model Context Protocol (MCP).",
    keyFeatures: [
      "Visual low-code canvas for agent creation",
      "Natural language agent authoring",
      "Python code interpreter (GA)",
      "VS Code extension for pro-code editing",
      "Multi-channel publishing (Teams, Web, Mobile, Voice)",
      "Agent2Agent (A2A) collaboration",
      "Model Context Protocol (MCP) support"
    ],
    aiCapabilities: [
      "GPT-5 Chat (GA Nov 2025)",
      "GPT-5.2 (Dec 2025)",
      "Third-party models via Azure AI Foundry",
      "Generative answers from knowledge base",
      "Generative actions for dynamic plugin selection"
    ],
    pricing: {
      model: "Included with M365 Copilot or Pay-As-You-Go",
      tiers: [
        { name: "M365 Copilot License", price: "Included", includes: ["Internal employee agents", "Unlimited builds"] },
        { name: "Azure Pay-As-You-Go", price: "Usage-based", includes: ["Messages", "API calls", "External scenarios"] },
        { name: "Copilot Credit Commit", price: "Up to 20% discount", includes: ["Pre-purchased credits", "Volume discounts"] }
      ]
    },
    integrations: ["Power Platform", "Microsoft 365", "Azure AI Foundry", "Microsoft Graph", "Dynamics 365", "ServiceNow", "Salesforce"],
    targetUsers: ["Business Analysts", "Citizen Developers", "IT Admins", "Customer Service"],
    mcpSupport: true,
    agentTypes: ["Conversational", "Autonomous", "Voice/IVR", "M365 Copilot Extensions"],
    connectorCount: 1400,
    compliance: ["SOC2", "GDPR", "FedRAMP", "HIPAA"],
    releaseWave: "Wave 2 2025"
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
