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

export const clientPersonas: ClientPersona[] = [
  {
    id: "cmo",
    role: "CMO",
    title: "Chief Marketing Officer",
    industry: ["SaaS", "Healthcare", "Fintech"],
    companySize: "50-500 employees",
    goals: [
      "Improve brand differentiation to attract enterprise clients",
      "Increase marketing ROI through data-driven campaigns",
      "Build thought leadership and market positioning",
      "Accelerate content production without sacrificing quality"
    ],
    painPoints: [
      "Unclear value proposition in crowded market",
      "Content production bottlenecks",
      "Difficulty measuring campaign attribution",
      "Inconsistent brand voice across channels"
    ],
    successMetrics: [
      "Brand awareness lift",
      "Marketing qualified leads (MQLs)",
      "Content engagement rates",
      "Cost per acquisition (CPA)"
    ],
    techProficiency: "Strategic",
    budgetTier: "High",
    decisionAuthority: "Budget Owner",
    aiUseCases: [
      "Content generation and optimization",
      "Competitive intelligence",
      "Campaign analytics and attribution",
      "Brand voice consistency"
    ],
    relatedServices: ["brand-strategy"],
    confidence: "high"
  },
  {
    id: "ops-lead",
    role: "Ops Lead",
    title: "Operations Lead",
    industry: ["Retail", "SaaS", "E-commerce"],
    companySize: "100-1000 employees",
    goals: [
      "Streamline onboarding flows to improve activation",
      "Reduce operational overhead through automation",
      "Improve cross-team coordination",
      "Build scalable processes for growth"
    ],
    painPoints: [
      "Complex onboarding flows reduce activation rates",
      "Manual processes creating bottlenecks",
      "Siloed data across systems",
      "Difficulty scaling operations with growth"
    ],
    successMetrics: [
      "Activation rate",
      "Time to value",
      "Process efficiency gains",
      "Customer satisfaction (CSAT)"
    ],
    techProficiency: "Medium",
    budgetTier: "Medium",
    decisionAuthority: "Recommender",
    aiUseCases: [
      "Process automation",
      "Workflow optimization",
      "Data integration",
      "Customer journey mapping"
    ],
    relatedServices: ["ux-ui-design"],
    confidence: "medium"
  },
  {
    id: "founder",
    role: "Founder",
    title: "Founder / CEO",
    industry: ["SaaS", "Fintech", "Healthcare"],
    companySize: "10-100 employees",
    goals: [
      "Achieve product-market fit quickly",
      "Build defensible market position",
      "Scale efficiently with limited resources",
      "Attract enterprise customers"
    ],
    painPoints: [
      "Limited bandwidth for strategic initiatives",
      "Wearing too many hats",
      "Unclear positioning vs competitors",
      "Resource constraints for growth"
    ],
    successMetrics: [
      "Revenue growth rate",
      "Customer acquisition cost",
      "Net revenue retention",
      "Time to close enterprise deals"
    ],
    techProficiency: "Expert",
    budgetTier: "Medium",
    decisionAuthority: "Budget Owner",
    aiUseCases: [
      "Strategic planning and analysis",
      "Investor communications",
      "Product development acceleration",
      "Market research"
    ],
    relatedServices: ["brand-strategy"],
    confidence: "high"
  },
  {
    id: "product-manager",
    role: "Product Manager",
    title: "Product Manager",
    industry: ["SaaS", "Retail", "Fintech"],
    companySize: "50-500 employees",
    goals: [
      "Improve user activation and retention",
      "Build features that drive conversion",
      "Reduce time to market for new features",
      "Make data-driven product decisions"
    ],
    painPoints: [
      "Low conversion on mobile experiences",
      "Difficulty prioritizing feature requests",
      "Slow feedback loops from users",
      "Technical debt slowing velocity"
    ],
    successMetrics: [
      "Feature adoption rate",
      "User activation rate",
      "Net promoter score (NPS)",
      "Time to market"
    ],
    techProficiency: "Expert",
    budgetTier: "Medium",
    decisionAuthority: "Recommender",
    aiUseCases: [
      "User research synthesis",
      "Competitive analysis",
      "Feature prioritization",
      "Product analytics"
    ],
    relatedServices: ["ux-ui-design"],
    confidence: "medium"
  },
  {
    id: "ecommerce-manager",
    role: "Ecommerce Manager",
    title: "Ecommerce Manager",
    industry: ["Retail", "E-commerce", "Consumer Goods"],
    companySize: "100-1000 employees",
    goals: [
      "Increase mobile conversion rates",
      "Improve customer lifetime value",
      "Optimize merchandising and inventory",
      "Personalize shopping experiences"
    ],
    painPoints: [
      "Low mobile conversion rates",
      "Cart abandonment",
      "Inventory management challenges",
      "Limited personalization capabilities"
    ],
    successMetrics: [
      "Conversion rate (CVR)",
      "Average order value (AOV)",
      "Customer lifetime value (CLV)",
      "Mobile revenue share"
    ],
    techProficiency: "Medium",
    budgetTier: "High",
    decisionAuthority: "Decision Maker",
    aiUseCases: [
      "Product recommendations",
      "Pricing optimization",
      "Customer segmentation",
      "Inventory forecasting"
    ],
    relatedServices: ["ux-ui-design"],
    confidence: "medium"
  },
  {
    id: "vp-sales",
    role: "VP Sales",
    title: "VP of Sales",
    industry: ["SaaS", "Fintech", "Enterprise Software"],
    companySize: "100-500 employees",
    goals: [
      "Accelerate sales cycle velocity",
      "Improve win rates on enterprise deals",
      "Build repeatable sales processes",
      "Enable sales team with better tools"
    ],
    painPoints: [
      "Long enterprise sales cycles",
      "Difficulty articulating differentiation",
      "Inconsistent sales messaging",
      "Limited visibility into pipeline health"
    ],
    successMetrics: [
      "Win rate",
      "Sales cycle length",
      "Average deal size",
      "Pipeline velocity"
    ],
    techProficiency: "Medium",
    budgetTier: "High",
    decisionAuthority: "Budget Owner",
    aiUseCases: [
      "Sales enablement content",
      "Proposal generation",
      "Lead scoring",
      "Competitive battle cards"
    ],
    relatedServices: ["brand-strategy"],
    confidence: "high"
  },
  {
    id: "cto",
    role: "CTO",
    title: "Chief Technology Officer",
    industry: ["SaaS", "Fintech", "Healthcare"],
    companySize: "50-500 employees",
    goals: [
      "Accelerate product development velocity",
      "Build secure, scalable architecture",
      "Reduce technical debt",
      "Enable AI integration across products"
    ],
    painPoints: [
      "Technical debt slowing innovation",
      "Security and compliance requirements",
      "Talent acquisition and retention",
      "Integration complexity"
    ],
    successMetrics: [
      "Development velocity",
      "System uptime",
      "Security incidents",
      "Time to production"
    ],
    techProficiency: "Expert",
    budgetTier: "Ultimate",
    decisionAuthority: "Budget Owner",
    aiUseCases: [
      "Code generation and review",
      "Architecture design",
      "Security analysis",
      "Documentation generation"
    ],
    relatedServices: ["ux-ui-design"],
    confidence: "high"
  },
  {
    id: "customer-success-lead",
    role: "Customer Success Lead",
    title: "Head of Customer Success",
    industry: ["SaaS", "Enterprise Software"],
    companySize: "100-500 employees",
    goals: [
      "Reduce churn and improve retention",
      "Increase expansion revenue",
      "Build scalable CS processes",
      "Improve customer health visibility"
    ],
    painPoints: [
      "Churn above industry benchmarks",
      "Manual health score tracking",
      "Difficulty identifying at-risk accounts",
      "Onboarding bottlenecks"
    ],
    successMetrics: [
      "Net revenue retention (NRR)",
      "Churn rate",
      "Customer health score",
      "Time to value"
    ],
    techProficiency: "Medium",
    budgetTier: "Medium",
    decisionAuthority: "Recommender",
    aiUseCases: [
      "Customer health prediction",
      "Automated playbooks",
      "Support ticket analysis",
      "Expansion opportunity identification"
    ],
    relatedServices: ["ux-ui-design"],
    confidence: "high"
  }
];

export const intServices: IntService[] = [
  {
    slug: "brand-strategy",
    name: "Brand Strategy",
    shortDescription: "Clarify positioning, audience, and messaging.",
    industriesImplied: ["SaaS", "Retail", "Healthcare", "Fintech"],
    rolesImplied: ["CMO", "Founder", "VP Sales"],
    painPoints: [
      "Unclear value proposition",
      "Inconsistent brand voice",
      "Difficulty differentiating in market"
    ],
    valueProps: [
      "Evidence-first positioning",
      "Data-driven audience insights",
      "Competitive differentiation framework"
    ],
    deliverables: [
      "Messaging framework",
      "Brand guidelines",
      "Competitive positioning map",
      "Audience persona documentation"
    ],
    confidence: "high"
  },
  {
    slug: "ux-ui-design",
    name: "UX/UI Design",
    shortDescription: "Design experiences to improve activation and retention.",
    industriesImplied: ["SaaS", "Retail", "E-commerce", "Fintech"],
    rolesImplied: ["Product Manager", "Ops Lead", "CTO", "Ecommerce Manager"],
    painPoints: [
      "Low conversion on mobile",
      "Complex onboarding flows",
      "Poor user activation rates"
    ],
    valueProps: [
      "Conversion-focused design",
      "User research-driven decisions",
      "Rapid prototyping and validation"
    ],
    deliverables: [
      "Clickable prototypes",
      "User journey maps",
      "Design system",
      "Usability testing results"
    ],
    confidence: "medium"
  },
  {
    slug: "growth-engineering",
    name: "Growth Engineering",
    shortDescription: "Build and optimize growth loops and conversion funnels.",
    industriesImplied: ["SaaS", "E-commerce", "Fintech"],
    rolesImplied: ["Product Manager", "CTO", "Founder"],
    painPoints: [
      "Low activation rates",
      "Leaky conversion funnels",
      "Difficulty scaling growth"
    ],
    valueProps: [
      "Data-driven experimentation",
      "Full-stack growth implementation",
      "Rapid iteration cycles"
    ],
    deliverables: [
      "Growth audit",
      "A/B testing framework",
      "Conversion optimization",
      "Analytics implementation"
    ],
    confidence: "high"
  },
  {
    slug: "ai-integration",
    name: "AI Integration",
    shortDescription: "Integrate AI capabilities into products and workflows.",
    industriesImplied: ["SaaS", "Healthcare", "Fintech", "Enterprise Software"],
    rolesImplied: ["CTO", "Product Manager", "Founder"],
    painPoints: [
      "Uncertainty about AI ROI",
      "Integration complexity",
      "Data privacy concerns"
    ],
    valueProps: [
      "Proven implementation patterns",
      "Security-first approach",
      "Measurable business outcomes"
    ],
    deliverables: [
      "AI readiness assessment",
      "Integration roadmap",
      "POC implementation",
      "Training and enablement"
    ],
    confidence: "high"
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: "northwind-saas",
    title: "Northwind SaaS Growth",
    clientName: "Northwind",
    industry: "SaaS",
    problem: "Churn above 7%",
    solution: "Onboarding redesign with improved activation flows",
    outcome: "Churn reduced to 4.1%",
    metrics: [
      { name: "Churn Reduction", value: "-2.9%" },
      { name: "Activation Rate", value: "+35%" },
      { name: "Time to Value", value: "-40%" }
    ],
    rolesMentioned: ["CMO", "Customer Success Lead"],
    servicesUsed: ["ux-ui-design", "growth-engineering"],
    confidence: "high"
  },
  {
    id: "contoso-retail",
    title: "Contoso Retail Conversion",
    clientName: "Contoso",
    industry: "Retail",
    problem: "Low mobile conversion rates",
    solution: "React storefront with optimized checkout flow",
    outcome: "+18% conversion rate improvement",
    metrics: [
      { name: "CVR", value: "+18%" },
      { name: "Mobile Revenue", value: "+32%" },
      { name: "Cart Abandonment", value: "-15%" }
    ],
    rolesMentioned: ["Ecommerce Manager", "Ops Lead"],
    servicesUsed: ["ux-ui-design"],
    confidence: "medium"
  },
  {
    id: "fabrikam-fintech",
    title: "Fabrikam Fintech Rebrand",
    clientName: "Fabrikam",
    industry: "Fintech",
    problem: "Unclear positioning in crowded market",
    solution: "Complete brand strategy and messaging overhaul",
    outcome: "2x enterprise pipeline in 6 months",
    metrics: [
      { name: "Enterprise Pipeline", value: "+100%" },
      { name: "Win Rate", value: "+22%" },
      { name: "Sales Cycle", value: "-18 days" }
    ],
    rolesMentioned: ["CMO", "VP Sales", "Founder"],
    servicesUsed: ["brand-strategy"],
    confidence: "high"
  }
];

export interface PlatformRecommendationRule {
  personaRoles: string[];
  useCases: string[];
  industries: string[];
  recommendedPlatforms: {
    platformId: string;
    relevanceScore: number;
    rationale: string;
  }[];
}

export const platformRecommendationRules: PlatformRecommendationRule[] = [
  {
    personaRoles: ["CMO", "VP Sales"],
    useCases: ["content", "analytics", "marketing"],
    industries: ["SaaS", "Fintech", "Healthcare"],
    recommendedPlatforms: [
      { platformId: "chatgpt-enterprise", relevanceScore: 95, rationale: "Excellent for content generation, campaign ideation, and marketing copy at scale" },
      { platformId: "claude-sonnet", relevanceScore: 92, rationale: "Superior writing quality and nuanced messaging for brand voice consistency" },
      { platformId: "jasper-ai", relevanceScore: 90, rationale: "Purpose-built for marketing content with brand voice training" },
      { platformId: "writer", relevanceScore: 88, rationale: "Enterprise content platform with governance and brand guidelines" },
      { platformId: "gemini-advanced", relevanceScore: 85, rationale: "Deep integration with Google Workspace and analytics" },
      { platformId: "microsoft-365-copilot", relevanceScore: 82, rationale: "Seamless productivity suite integration for presentations and documents" }
    ]
  },
  {
    personaRoles: ["Ops Lead", "Customer Success Lead"],
    useCases: ["automation", "workflow", "integration"],
    industries: ["SaaS", "Retail", "E-commerce"],
    recommendedPlatforms: [
      { platformId: "zapier", relevanceScore: 95, rationale: "No-code automation with 6,000+ app integrations for workflow optimization" },
      { platformId: "make-com", relevanceScore: 92, rationale: "Visual workflow builder with complex scenario support" },
      { platformId: "power-platform", relevanceScore: 90, rationale: "Deep Microsoft ecosystem integration with AI Builder capabilities" },
      { platformId: "n8n", relevanceScore: 85, rationale: "Self-hosted option with advanced workflow customization" },
      { platformId: "pipedream", relevanceScore: 82, rationale: "Developer-friendly automation with code-level control" },
      { platformId: "cognigy", relevanceScore: 80, rationale: "Conversational AI for customer-facing automation" }
    ]
  },
  {
    personaRoles: ["CTO", "Founder"],
    useCases: ["coding", "agents", "development"],
    industries: ["SaaS", "Fintech", "Healthcare"],
    recommendedPlatforms: [
      { platformId: "claude-opus", relevanceScore: 98, rationale: "Most capable model for complex reasoning and enterprise-critical code" },
      { platformId: "cursor", relevanceScore: 95, rationale: "AI-native code editor with deep codebase understanding" },
      { platformId: "github-copilot", relevanceScore: 92, rationale: "Industry-standard AI pair programmer with GitHub integration" },
      { platformId: "claude-sonnet", relevanceScore: 90, rationale: "Best-in-class coding with excellent cost efficiency" },
      { platformId: "azure-ai-foundry", relevanceScore: 88, rationale: "Enterprise AI platform with security and compliance features" },
      { platformId: "langchain", relevanceScore: 85, rationale: "Open framework for building custom AI applications and agents" }
    ]
  },
  {
    personaRoles: ["Product Manager"],
    useCases: ["analytics", "agents", "multimodal"],
    industries: ["SaaS", "Retail", "Fintech"],
    recommendedPlatforms: [
      { platformId: "claude-sonnet", relevanceScore: 94, rationale: "Excellent for PRDs, user research synthesis, and competitive analysis" },
      { platformId: "chatgpt-enterprise", relevanceScore: 92, rationale: "Versatile for documentation, specs, and stakeholder communication" },
      { platformId: "glean", relevanceScore: 90, rationale: "Enterprise search for product insights across company knowledge" },
      { platformId: "notebooklm", relevanceScore: 88, rationale: "Research synthesis with source citations for product decisions" },
      { platformId: "databricks", relevanceScore: 85, rationale: "Data platform for product analytics and experimentation" },
      { platformId: "dataiku", relevanceScore: 82, rationale: "Low-code data science for product teams" }
    ]
  },
  {
    personaRoles: ["Ecommerce Manager"],
    useCases: ["analytics", "automation", "multimodal"],
    industries: ["Retail", "E-commerce", "Consumer Goods"],
    recommendedPlatforms: [
      { platformId: "salesforce-agentforce", relevanceScore: 95, rationale: "CRM-native AI for commerce and customer intelligence" },
      { platformId: "chatgpt-enterprise", relevanceScore: 90, rationale: "Product descriptions, customer communications, and catalog management" },
      { platformId: "power-platform", relevanceScore: 88, rationale: "Business apps and automation for retail operations" },
      { platformId: "vertex-ai", relevanceScore: 85, rationale: "ML platform for recommendation engines and demand forecasting" },
      { platformId: "databricks", relevanceScore: 82, rationale: "Unified analytics for customer insights and inventory optimization" },
      { platformId: "make-com", relevanceScore: 80, rationale: "E-commerce workflow automation across platforms" }
    ]
  }
];

export function getAIRecommendationsForPersona(personaId: string): AIToolRecommendation[] {
  const persona = clientPersonas.find(p => p.id === personaId);
  if (!persona) return [];
  
  const matchingRules = platformRecommendationRules.filter(rule => 
    rule.personaRoles.some(role => role.toLowerCase() === persona.role.toLowerCase()) ||
    rule.industries.some(ind => persona.industry.includes(ind))
  );
  
  const recommendations: Map<string, AIToolRecommendation> = new Map();
  
  matchingRules.forEach(rule => {
    rule.recommendedPlatforms.forEach(rec => {
      if (!recommendations.has(rec.platformId) || 
          recommendations.get(rec.platformId)!.relevanceScore < rec.relevanceScore) {
        recommendations.set(rec.platformId, {
          platformId: rec.platformId,
          platformName: "", 
          ecosystem: "",
          relevanceScore: rec.relevanceScore,
          useCases: persona.aiUseCases,
          rationale: rec.rationale
        });
      }
    });
  });
  
  return Array.from(recommendations.values())
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 6);
}

export function getServicesForPersona(personaId: string): IntService[] {
  const persona = clientPersonas.find(p => p.id === personaId);
  if (!persona) return [];
  
  return intServices.filter(service => 
    persona.relatedServices.includes(service.slug) ||
    service.rolesImplied.some(role => role.toLowerCase() === persona.role.toLowerCase())
  );
}

export function getCaseStudiesForPersona(personaId: string): CaseStudy[] {
  const persona = clientPersonas.find(p => p.id === personaId);
  if (!persona) return [];
  
  return caseStudies.filter(cs => 
    persona.industry.includes(cs.industry) ||
    cs.rolesMentioned.some(role => role.toLowerCase() === persona.role.toLowerCase())
  );
}

export const ecosystemColors: Record<string, string> = {
  anthropic: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  openai: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  microsoft: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  google: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  automation: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  langchain: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  opensource: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
  independent: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
};
