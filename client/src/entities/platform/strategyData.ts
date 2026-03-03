// INT Inc. AI Strategy Data - Hybrid Intelligence Model
// Based on Enterprise AI Diversification Strategic Presentation Toolkit

export interface HybridIntelligenceModel {
  id: string;
  name: string;
  platform: string;
  role: "foundation" | "specialist" | "research" | "creative";
  description: string;
  primaryUse: string[];
  strengths: string[];
  pricing: string;
  complianceCerts: string[];
}

export interface DataTriageEntry {
  id: string;
  dataType: string;
  platforms: string[];
  securityLevel: "restricted" | "confidential" | "standard" | "public";
  examples: string[];
  color: string;
}

export interface DepartmentROI {
  id: string;
  department: string;
  platforms: string[];
  timeSavings: string;
  costImpact: string;
  roiRange: string;
  keyUseCases: string[];
  painPoints: string[];
}

export interface PilotParticipant {
  id: string;
  role: string;
  department: string;
  count: number;
  focusAreas: string[];
}

export interface PilotProgram {
  duration: string;
  budget: {
    item: string;
    cost: string;
  }[];
  totalInvestment: string;
  participants: PilotParticipant[];
  weeklyStructure: {
    week: number;
    activities: string[];
  }[];
  successMetrics: {
    metric: string;
    target: string;
  }[];
}

export interface StrategyMetrics {
  year1Investment: string;
  projectedTimeSavings: string;
  threeYearROI: string;
  breakevenTimeline: string;
}

// Hybrid Intelligence Model - The Four Pillars
export const hybridIntelligenceModel: HybridIntelligenceModel[] = [
  {
    id: "copilot",
    name: "Microsoft Copilot",
    platform: "Microsoft 365",
    role: "foundation",
    description: "Internal data security and searchability - the secure foundation",
    primaryUse: [
      "SharePoint document search",
      "Teams collaboration",
      "Outlook email management",
      "Power Platform automation"
    ],
    strengths: [
      "Deep M365 integration",
      "Enterprise security",
      "Native Teams/Outlook",
      "FedRAMP High certified"
    ],
    pricing: "$30/user/month",
    complianceCerts: ["FedRAMP High", "SOC 2 Type II", "ISO 27001", "HIPAA BAA"]
  },
  {
    id: "claude",
    name: "Claude Enterprise",
    platform: "Anthropic",
    role: "specialist",
    description: "Complex reasoning, technical documentation, code review",
    primaryUse: [
      "SOC 2 audit preparation",
      "Policy generation",
      "Code review and analysis",
      "Compliance documentation"
    ],
    strengths: [
      "Constitutional AI",
      "200K context window",
      "Security reasoning",
      "Long-form analysis"
    ],
    pricing: "$20-30/user/month (Team)",
    complianceCerts: ["SOC 2 Type II", "ISO 27001", "HIPAA BAA available"]
  },
  {
    id: "perplexity",
    name: "Perplexity Pro",
    platform: "Perplexity AI",
    role: "research",
    description: "Real-time research, vendor intelligence, market analysis",
    primaryUse: [
      "Competitive research",
      "Vendor analysis",
      "Market intelligence",
      "Industry trends"
    ],
    strengths: [
      "Real-time web search",
      "Citation-backed answers",
      "Research synthesis",
      "Up-to-date information"
    ],
    pricing: "$20/user/month",
    complianceCerts: ["SOC 2 Type II"]
  },
  {
    id: "chatgpt-gemini",
    name: "ChatGPT / Gemini",
    platform: "OpenAI / Google",
    role: "creative",
    description: "Creative content, client communications, specialized workflows",
    primaryUse: [
      "Blog content generation",
      "Social media copy",
      "Email campaigns",
      "Presentation drafts"
    ],
    strengths: [
      "Creative content",
      "Plugin ecosystem",
      "Multi-modal capabilities",
      "Brand voice adaptation"
    ],
    pricing: "$20-25/user/month",
    complianceCerts: ["SOC 2 Type II (Enterprise)", "ISO 27001"]
  }
];

// Data Triage Matrix - Governance Framework
export const dataTriageMatrix: DataTriageEntry[] = [
  {
    id: "client-pii",
    dataType: "Client PII",
    platforms: ["Microsoft ONLY"],
    securityLevel: "restricted",
    examples: ["SSN", "Financial records", "Health data", "Personal identifiers"],
    color: "bg-red-500"
  },
  {
    id: "internal-docs",
    dataType: "Internal Documents",
    platforms: ["Microsoft", "Claude"],
    securityLevel: "confidential",
    examples: ["SOPs", "Runbooks", "Policies", "Internal procedures"],
    color: "bg-orange-500"
  },
  {
    id: "code-technical",
    dataType: "Code / Technical",
    platforms: ["Claude", "ChatGPT", "GitHub Copilot"],
    securityLevel: "standard",
    examples: ["PowerShell scripts", "Python code", "Configurations", "Technical specs"],
    color: "bg-yellow-500"
  },
  {
    id: "market-research",
    dataType: "Market Research",
    platforms: ["Perplexity", "Gemini"],
    securityLevel: "public",
    examples: ["Vendor intel", "Industry trends", "Competitor analysis", "Market data"],
    color: "bg-green-500"
  },
  {
    id: "creative-content",
    dataType: "Creative Content",
    platforms: ["ChatGPT", "Gemini"],
    securityLevel: "public",
    examples: ["Blog drafts", "Social media posts", "Email templates", "Marketing copy"],
    color: "bg-blue-500"
  }
];

// Department ROI Quick Reference
export const departmentROI: DepartmentROI[] = [
  {
    id: "it-services",
    department: "IT Services",
    platforms: ["Copilot", "Claude"],
    timeSavings: "30-40%",
    costImpact: "50-60%",
    roiRange: "800-1000%",
    keyUseCases: [
      "Ticket triage and documentation",
      "Network security management",
      "SaaS migration support",
      "Device management automation"
    ],
    painPoints: [
      "Manual evidence gathering (60-80 hrs/month)",
      "Tool complexity",
      "Resource shortages",
      "AI threat management"
    ]
  },
  {
    id: "infosec",
    department: "Information Security",
    platforms: ["Claude"],
    timeSavings: "69%",
    costImpact: "50-60%",
    roiRange: "800-1000%",
    keyUseCases: [
      "SOC 2 audit preparation (2 weeks vs 6 weeks)",
      "Policy generation from templates",
      "Risk assessment automation",
      "GRC platform content generation"
    ],
    painPoints: [
      "Manual evidence gathering",
      "Regulatory tracking (96% struggle)",
      "Policy generation labor",
      "Compliance documentation"
    ]
  },
  {
    id: "marketing",
    department: "Marketing",
    platforms: ["Gemini", "ChatGPT"],
    timeSavings: "63%",
    costImpact: "40-50%",
    roiRange: "800-1200%",
    keyUseCases: [
      "Blog content generation",
      "Social media post variants",
      "Email campaign copy",
      "SEO optimization"
    ],
    painPoints: [
      "Content creation at scale (20 hrs/week)",
      "Multi-platform strategy fragmentation",
      "Marketing attribution complexity",
      "ROI tracking"
    ]
  },
  {
    id: "creative",
    department: "Creative / Design",
    platforms: ["ChatGPT", "Copilot"],
    timeSavings: "38%",
    costImpact: "25-30%",
    roiRange: "500-700%",
    keyUseCases: [
      "Design concept generation",
      "Client-facing content",
      "Mockup descriptions",
      "Technical documentation"
    ],
    painPoints: [
      "Design-to-dev handoff delays",
      "Performance optimization",
      "Mobile responsiveness",
      "Scope creep"
    ]
  },
  {
    id: "operations",
    department: "Operations",
    platforms: ["Claude", "Copilot"],
    timeSavings: "70%",
    costImpact: "50-60%",
    roiRange: "600-900%",
    keyUseCases: [
      "SOP documentation (100 hrs to 30 hrs)",
      "Process mapping",
      "Workflow optimization",
      "Vendor management tracking"
    ],
    painPoints: [
      "Inefficient workflows",
      "Poor data visibility",
      "Hidden costs",
      "Scalability challenges"
    ]
  },
  {
    id: "sales",
    department: "Sales / Business Development",
    platforms: ["Copilot"],
    timeSavings: "29 hrs/month",
    costImpact: "23% of time reclaimed",
    roiRange: "500-1000%",
    keyUseCases: [
      "Proposal generation from CRM data",
      "Meeting summaries to CRM updates",
      "Email drafting and follow-ups",
      "Pipeline analysis"
    ],
    painPoints: [
      "Proposal generation (23% of time)",
      "Data paralysis",
      "RFP responses (30% baseline win rate)",
      "Long sales cycles"
    ]
  },
  {
    id: "customer-success",
    department: "Customer Success",
    platforms: ["Gemini", "Claude"],
    timeSavings: "45%",
    costImpact: "30-40%",
    roiRange: "180-220%",
    keyUseCases: [
      "Ticket auto-categorization",
      "Sentiment analysis",
      "Knowledge base updates",
      "Customer health scoring"
    ],
    painPoints: [
      "Wait times",
      "Manual ticket triage",
      "Knowledge base maintenance",
      "Churn prediction"
    ]
  }
];

// 30-Day Pilot Program Structure
export const pilotProgram: PilotProgram = {
  duration: "30 days",
  budget: [
    { item: "Claude Pro (5 licenses x $20 x 5 months)", cost: "$500" },
    { item: "Perplexity Pro (2 licenses x $20 x 3 months)", cost: "$120" }
  ],
  totalInvestment: "$500-$620",
  participants: [
    {
      id: "it-tech",
      role: "IT Services Technician",
      department: "IT Services",
      count: 2,
      focusAreas: ["Ticket triage", "Documentation", "Troubleshooting"]
    },
    {
      id: "infosec-analyst",
      role: "InfoSec Analyst",
      department: "Information Security",
      count: 1,
      focusAreas: ["Compliance docs", "Policy review", "Risk assessment"]
    },
    {
      id: "marketing-specialist",
      role: "Marketing Specialist",
      department: "Marketing",
      count: 1,
      focusAreas: ["Content creation", "Campaign analysis", "SEO"]
    },
    {
      id: "ops-member",
      role: "Operations Team Member",
      department: "Operations",
      count: 1,
      focusAreas: ["SOP creation", "Process documentation", "Workflow mapping"]
    }
  ],
  weeklyStructure: [
    {
      week: 1,
      activities: [
        "Tool provisioning and account setup",
        "User training sessions",
        "Baseline metrics capture",
        "Data Triage Matrix review"
      ]
    },
    {
      week: 2,
      activities: [
        "Active usage begins",
        "Daily feedback collection",
        "Workflow integration",
        "Initial troubleshooting"
      ]
    },
    {
      week: 3,
      activities: [
        "Continued active usage",
        "Use case refinement",
        "Cross-department collaboration",
        "Identify scaling opportunities"
      ]
    },
    {
      week: 4,
      activities: [
        "ROI analysis",
        "Report generation",
        "Expansion recommendation",
        "Leadership presentation prep"
      ]
    }
  ],
  successMetrics: [
    { metric: "Time saved", target: "3-5 hours/user/week minimum" },
    { metric: "User satisfaction", target: "4.0/5.0 or higher" },
    { metric: "Documentation quality", target: "25% reduction in revision cycles" },
    { metric: "Security compliance", target: "Zero incidents, 100% Data Triage Matrix compliance" }
  ]
};

// Key Strategy Metrics
export const strategyMetrics: StrategyMetrics = {
  year1Investment: "$50K-$75K",
  projectedTimeSavings: "15-22% productivity gains",
  threeYearROI: "626% (Hybrid Model)",
  breakevenTimeline: "Month 6"
};

// Objection Handling - Battle Card
export const objectionBattleCard = [
  {
    id: "cost",
    objection: "We already pay for Copilot. Why should we pay for more tools?",
    response: "Think of Copilot like a General Practitioner doctor—essential for general health. But sometimes you need a Specialist. For complex coding or deep market research, Copilot often hallucinates or gets stuck. For just $20/month, a 'Specialist' tool like Claude can save an engineer 5 hours. The ROI on that $20 is instant.",
    keyData: "Claude Pro at $20/month = 5 hours saved per engineer = $250+ value at $50/hr loaded cost"
  },
  {
    id: "security",
    objection: "I'm worried about security. I don't want company data on Google or Anthropic servers.",
    response: "That is why the Data Triage Matrix is the core of this proposal. We are strictly prohibiting Client PII in these new tools. We will only use them for non-sensitive tasks like code syntax, public market research, and generic drafting. Secure data stays in Microsoft. Speed goes to the others.",
    keyData: "All recommended platforms (Claude, Perplexity) have SOC 2 Type II certification and zero data retention policies"
  },
  {
    id: "shadow-it",
    objection: "This sounds complicated to manage. We don't want Shadow IT.",
    response: "Actually, 'Shadow IT' is happening right now. People are likely using personal ChatGPT accounts because they need the help. By sanctioning a Pilot Program, we bring that activity into the light, govern it, and actually see what works. It gives us control back, rather than losing it.",
    keyData: "Industry surveys show 60-70% of employees use unauthorized AI tools. Sanctioned pilots reduce risk."
  }
];

// Platform Recommendations by Department (for Role Taxonomy integration)
export const departmentPlatformRecommendations: Record<string, {
  primary: string;
  secondary?: string;
  rationale: string;
}> = {
  "Executive": {
    primary: "Microsoft Copilot",
    secondary: "Claude",
    rationale: "M365 integration for executive communications, Claude for strategic analysis"
  },
  "Sales & BD": {
    primary: "Microsoft Copilot",
    secondary: "ChatGPT",
    rationale: "Native CRM integration, proposal generation, meeting summaries"
  },
  "Client Success": {
    primary: "Gemini",
    secondary: "Claude",
    rationale: "Ticket triage, sentiment analysis, knowledge base management"
  },
  "Engineering": {
    primary: "Claude",
    secondary: "GitHub Copilot",
    rationale: "Code review, technical documentation, complex reasoning"
  },
  "Marketing": {
    primary: "ChatGPT",
    secondary: "Gemini",
    rationale: "Creative content generation, multi-platform strategies"
  },
  "Operations": {
    primary: "Claude",
    secondary: "Copilot",
    rationale: "SOP documentation, process mapping, workflow optimization"
  },
  "Tech Services": {
    primary: "Claude",
    secondary: "Copilot",
    rationale: "Technical implementation, client solutions, compliance docs"
  }
};

// AI Strategy Metadata
export const aiStrategyMetadata = {
  version: "1.0",
  date: "December 2025",
  preparedBy: "Kyle Rosebrook",
  organization: "INT Inc.",
  teamSize: 55,
  status: "Ready for Leadership Review",
  corePrinciple: "SECURE DATA stays in Microsoft. SPEED goes to the specialists."
};
