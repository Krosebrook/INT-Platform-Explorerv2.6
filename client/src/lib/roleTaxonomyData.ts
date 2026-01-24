export type FeatureAccess = "full" | "limited" | "none" | "model-only" | "test-stage";

export interface ClaudeFeatures {
  webSearch: FeatureAccess;
  memory: FeatureAccess;
  codeExecution: FeatureAccess;
  artifacts: FeatureAccess;
  files: FeatureAccess;
  research: FeatureAccess;
}

export interface TaxonomyRole {
  id: string;
  title: string;
  alternateTitle?: string;
  department: string;
  reportsTo: string;
  teamSize: string;
  level: "C-Suite" | "Executive" | "Director/VP" | "Manager" | "Senior IC" | "Individual Contributor" | "Entry-level";
  features: ClaudeFeatures;
  memoryFocus: string;
  useCases: string[];
  guardrails: string[];
  securityClearance: 1 | 2 | 3 | 4 | 5;
}

export interface TaxonomyTeam {
  id: string;
  name: string;
  roleCount: string;
  description: string;
  roles: TaxonomyRole[];
}

export const taxonomyTeams: TaxonomyTeam[] = [
  {
    id: "executive",
    name: "Executive Leadership",
    roleCount: "3 roles",
    description: "C-Suite and executive leadership with strategic decision-making authority",
    roles: [
      {
        id: "ceo-president",
        title: "CEO / President",
        department: "Executive",
        reportsTo: "Board",
        teamSize: "1",
        level: "C-Suite",
        features: {
          webSearch: "full",
          memory: "full",
          codeExecution: "model-only",
          artifacts: "full",
          files: "full",
          research: "full"
        },
        memoryFocus: "Strategic decisions, market analysis, board materials, investor conversations",
        useCases: [
          "Market intelligence (competitors, trends, pricing, M&A targets)",
          "Strategic planning & scenarios (5-year roadmap, pivot analysis)",
          "Board presentation generation",
          "Investor pitch decks & financial summaries",
          "Industry benchmarking & growth strategy",
          "Leadership team alignment docs"
        ],
        guardrails: [
          "Web search: Unrestricted (market, competitors, finance, industry)",
          "Memory: Strategic context only (no client credentials, PII)",
          "Code execution: Simulation/modeling only (financial models, scenarios)",
          "Audit: All searches/generations logged to Sentry"
        ],
        securityClearance: 5
      },
      {
        id: "evp-operations",
        title: "EVP Operations & Business Development",
        department: "Executive (Operations & Sales)",
        reportsTo: "CEO",
        teamSize: "1",
        level: "Executive",
        features: {
          webSearch: "full",
          memory: "full",
          codeExecution: "none",
          artifacts: "full",
          files: "full",
          research: "full"
        },
        memoryFocus: "Client relationships, operational excellence, partnership strategy",
        useCases: [
          "Client retention strategy (churn analysis, upsell opportunities)",
          "Operational efficiency analysis (process mapping, bottlenecks)",
          "Partnership & channel strategy (partner selection, co-marketing)",
          "Team performance analysis (utilization, capacity planning)",
          "Business case development (ROI, investment prioritization)",
          "Quarterly business reviews (QBR) generation"
        ],
        guardrails: [
          "Web search: Partners, vendors, industry benchmarks (restricted: no employee data, no financials)",
          "Memory: Client relationships, strategic partnerships, operational insights",
          "No code execution (not needed)",
          "Audit: All conversations flagged for export (may be shared with board)"
        ],
        securityClearance: 4
      },
      {
        id: "cto-vp-engineering",
        title: "CTO / VP Engineering",
        department: "Engineering",
        reportsTo: "CEO",
        teamSize: "1",
        level: "Executive",
        features: {
          webSearch: "full",
          memory: "full",
          codeExecution: "full",
          artifacts: "full",
          files: "full",
          research: "full"
        },
        memoryFocus: "Architecture decisions, technology strategy, vendor evaluation, team growth",
        useCases: [
          "Technology stack decisions (framework selection, migration planning)",
          "Architecture & design reviews (scalability, security, maintainability)",
          "Vendor evaluation (SaaS tools, infrastructure, dev platforms)",
          "Team capability assessment (skills gaps, hiring, training)",
          "Innovation roadmap (emerging tech, competitive features)",
          "Tech debt management (refactoring strategy, modernization)",
          "AWS cost optimization & infrastructure strategy"
        ],
        guardrails: [
          "Web search: Tech news, frameworks, AWS, SaaS comparisons (unrestricted)",
          "Memory: Architecture patterns, team dynamics, tech decisions, vendor comparisons",
          "Code execution: Full access (architecture validation, performance testing, proof-of-concept)",
          "Audit: All code & architecture decisions logged (may be shared with engineers)"
        ],
        securityClearance: 5
      }
    ]
  },
  {
    id: "sales-bd",
    name: "Sales & Business Development",
    roleCount: "5-6 roles",
    description: "Revenue generation, customer acquisition, and partnership development",
    roles: [
      {
        id: "vp-sales",
        title: "VP Sales & Revenue",
        department: "Sales",
        reportsTo: "CEO/EVP",
        teamSize: "1",
        level: "Director/VP",
        features: {
          webSearch: "full",
          memory: "full",
          codeExecution: "none",
          artifacts: "full",
          files: "full",
          research: "limited"
        },
        memoryFocus: "Pipeline, deal strategy, customer intelligence, sales playbooks",
        useCases: [
          "Sales strategy & pipeline management (forecasting, acceleration)",
          "RFP response generation (proposal templates, pricing, T&C)",
          "Competitor intelligence (product features, pricing, market positioning)",
          "Customer research (industry, company size, decision-makers)",
          "Pricing & discount strategy analysis",
          "Sales collateral (one-pagers, comparison matrices, deck templates)",
          "Team enablement (sales playbooks, objection handling, scripts)"
        ],
        guardrails: [
          "Web search: Industry, competitors, customer research, pricing sites (no financial details)",
          "Memory: Sales strategy, pipeline, deal history, customer preferences",
          "No code execution (doesn't need it)",
          "Research: Allowed with caution (may take 5+ min; use sparingly)",
          "Audit: All proposal generations logged (may be reviewed for brand consistency)"
        ],
        securityClearance: 4
      },
      {
        id: "sales-manager",
        title: "Sales Manager",
        department: "Sales",
        reportsTo: "VP Sales",
        teamSize: "1",
        level: "Manager",
        features: {
          webSearch: "full",
          memory: "full",
          codeExecution: "none",
          artifacts: "full",
          files: "full",
          research: "none"
        },
        memoryFocus: "Team coaching, rep performance, deal strategy, customer wins/losses",
        useCases: [
          "Deal strategy & coaching (objection handling, negotiation tactics)",
          "Sales metrics analysis (pipeline, win rate, cycle time)",
          "Sales training & enablement (playbooks, role-playing scenarios)",
          "Customer intelligence (research, competitor moves, pricing)",
          "Activity planning (cold call scripts, email templates)",
          "Performance coaching (feedback, development plans)"
        ],
        guardrails: [
          "Web search: Competitors, customers, industry trends (limited to public data)",
          "Memory: Team performance, deals in progress, customer intelligence",
          "No code execution",
          "Audit: All coaching/strategy docs logged"
        ],
        securityClearance: 3
      },
      {
        id: "sales-rep",
        title: "Account Executive / Sales Rep",
        alternateTitle: "Sales Representative (×2-3)",
        department: "Sales",
        reportsTo: "Sales Manager",
        teamSize: "2-3",
        level: "Individual Contributor",
        features: {
          webSearch: "full",
          memory: "full",
          codeExecution: "none",
          artifacts: "limited",
          files: "none",
          research: "none"
        },
        memoryFocus: "Personal deal pipeline, customer research, objection handling playbook",
        useCases: [
          "Prospect research (company, industry, decision-makers)",
          "Email outreach (cold email templates, sequences)",
          "Sales collateral (one-pagers, pitch talking points)",
          "Objection handling (response generation, tactics)",
          "Deal qualification (BANT analysis, fit assessment)",
          "Meeting prep (agenda, talking points, questions)"
        ],
        guardrails: [
          "Web search: Customer research only (company info, job postings, news)",
          "Memory: Personal pipeline, objection responses, customer preferences (no sensitive details)",
          "No code execution",
          "Limited artifacts (text-based only, no complex layouts)",
          "No file upload (not needed)",
          "Audit: All customer research/outreach logged (no spam monitoring)"
        ],
        securityClearance: 3
      },
      {
        id: "bd-specialist",
        title: "Business Development Specialist",
        alternateTitle: "Partnership Manager",
        department: "Sales & BD",
        reportsTo: "EVP Operations",
        teamSize: "1",
        level: "Individual Contributor",
        features: {
          webSearch: "full",
          memory: "full",
          codeExecution: "none",
          artifacts: "full",
          files: "full",
          research: "none"
        },
        memoryFocus: "Partnership pipeline, vendor analysis, channel strategy",
        useCases: [
          "Partner identification & research (capability, market fit, terms)",
          "Partnership proposal generation (co-marketing, co-selling, integration)",
          "Channel strategy analysis (direct vs. partner, geo expansion)",
          "Vendor/supplier evaluation (pricing, SLA, relationship)",
          "Strategic alliance planning (joint ventures, M&A candidates)",
          "Competitive partnership analysis"
        ],
        guardrails: [
          "Web search: Partners, vendors, channels, market research (unrestricted)",
          "Memory: Partnership pipeline, vendor analysis, channel strategy",
          "No code execution",
          "Audit: Partnership agreements flagged for legal review"
        ],
        securityClearance: 4
      }
    ]
  },
  {
    id: "client-success",
    name: "Client Success & Delivery",
    roleCount: "3-4 roles",
    description: "Customer success, onboarding, and technical service delivery",
    roles: [
      {
        id: "solutions-consultant",
        title: "Solutions Consultant",
        alternateTitle: "Customer Success Manager",
        department: "Client Success",
        reportsTo: "VP Operations / VP Sales",
        teamSize: "1",
        level: "Manager",
        features: {
          webSearch: "limited",
          memory: "full",
          codeExecution: "test-stage",
          artifacts: "full",
          files: "full",
          research: "none"
        },
        memoryFocus: "Customer use cases, success metrics, implementation status, feedback",
        useCases: [
          "Customer success planning (kickoff, milestones, onboarding)",
          "Use case development (ROI analysis, value realization)",
          "Solution design (fit assessment, requirements gathering, proposal)",
          "Configuration review (system design, best practices, troubleshooting)",
          "Performance analysis (adoption, usage, health checks)",
          "Executive summaries (QBR, success metrics, case studies)"
        ],
        guardrails: [
          "Web search: Limited to INT knowledge base + industry best practices (no external customer data)",
          "Memory: Customer success metrics, implementation details, customer feedback (confidential)",
          "Code execution: Configuration only, no production changes (test/staging environments)",
          "Audit: Customer-related conversations flagged (may be shared with delivery team)"
        ],
        securityClearance: 4
      },
      {
        id: "account-manager",
        title: "Account Manager",
        alternateTitle: "Account Executive",
        department: "Client Success",
        reportsTo: "EVP Operations",
        teamSize: "1-2",
        level: "Senior IC",
        features: {
          webSearch: "limited",
          memory: "full",
          codeExecution: "none",
          artifacts: "full",
          files: "full",
          research: "none"
        },
        memoryFocus: "Customer health, relationship, contracts, upsell opportunities",
        useCases: [
          "Account health monitoring (adoption, satisfaction, churn risk)",
          "Relationship management (check-ins, executive meetings, feedback)",
          "Upsell & expansion analysis (additional products, services, seats)",
          "Contract renewals (terms, pricing, amendments)",
          "Customer communication (newsletters, updates, announcements)",
          "Success story development (case study, testimonial, reference)"
        ],
        guardrails: [
          "Web search: Limited to internal INT resources (no external data)",
          "Memory: Customer relationship, contract terms, health metrics (confidential)",
          "No code execution",
          "Audit: Customer interactions logged (may be shared with leadership)"
        ],
        securityClearance: 4
      },
      {
        id: "onboarding-specialist",
        title: "Onboarding Specialist",
        alternateTitle: "Customer Success Associate",
        department: "Client Success",
        reportsTo: "Account Manager / VP Operations",
        teamSize: "1",
        level: "Individual Contributor",
        features: {
          webSearch: "none",
          memory: "full",
          codeExecution: "none",
          artifacts: "full",
          files: "full",
          research: "none"
        },
        memoryFocus: "Onboarding checklist, customer training, success metrics, milestones",
        useCases: [
          "Onboarding plan development (timeline, milestones, activities)",
          "Training material generation (user guides, video scripts, FAQs)",
          "Progress tracking (milestone achievement, feedback collection)",
          "Handoff documentation (internal knowledge, transfer to support)",
          "Communication templates (welcome emails, progress updates, surveys)",
          "First-value metrics (early wins, quick ROI proof points)"
        ],
        guardrails: [
          "No web search (internal focus)",
          "Memory: Onboarding progress, customer feedback, training materials",
          "No code execution",
          "Audit: Onboarding documentation archived"
        ],
        securityClearance: 3
      },
      {
        id: "delivery-manager",
        title: "Technical Services Delivery Manager",
        alternateTitle: "Technical Operations Manager",
        department: "Operations/Delivery",
        reportsTo: "VP Technical Services",
        teamSize: "1",
        level: "Manager",
        features: {
          webSearch: "none",
          memory: "full",
          codeExecution: "test-stage",
          artifacts: "full",
          files: "full",
          research: "none"
        },
        memoryFocus: "Managed services SLA, incident response, operational metrics, runbooks",
        useCases: [
          "Runbook generation (incident response, escalation procedures)",
          "SLA management (uptime tracking, alerting, reporting)",
          "Operational metrics (MTTR, availability, ticket trends)",
          "Process documentation (workflows, handoff procedures, checklists)",
          "Training for support team (knowledge transfer, certification)",
          "Capacity planning (resource allocation, scaling)"
        ],
        guardrails: [
          "No web search (internal operations)",
          "Memory: Operational metrics, incident history, customer SLAs (confidential)",
          "Code execution: Test/staging only (monitoring scripts, automation, testing)",
          "Audit: Incident response documented and logged"
        ],
        securityClearance: 4
      }
    ]
  },
  {
    id: "engineering",
    name: "Engineering & Technical",
    roleCount: "7-8 roles",
    description: "Software development, quality assurance, and infrastructure engineering",
    roles: [
      {
        id: "dev-manager",
        title: "Software Development Manager",
        alternateTitle: "Engineering Manager",
        department: "Engineering",
        reportsTo: "CTO / VP Engineering",
        teamSize: "1",
        level: "Manager",
        features: {
          webSearch: "full",
          memory: "full",
          codeExecution: "full",
          artifacts: "full",
          files: "full",
          research: "full"
        },
        memoryFocus: "Team capability, tech debt, sprint planning, architecture decisions",
        useCases: [
          "Sprint planning & capacity estimation",
          "Architecture review & design decisions",
          "Code quality & testing strategy",
          "Team performance & development",
          "Tech debt assessment & prioritization",
          "Vendor/tool evaluation (databases, APIs, SaaS tools)",
          "CI/CD & deployment strategy",
          "Security & compliance requirements"
        ],
        guardrails: [
          "Web search: Tech news, frameworks, SaaS tools, AWS (unrestricted)",
          "Memory: Architecture, team dynamics, sprint planning, tech debt",
          "Code execution: Full (architecture validation, perf testing, proof-of-concept)",
          "Audit: Architectural decisions logged (shared with team & CTO)"
        ],
        securityClearance: 5
      },
      {
        id: "senior-dev",
        title: "Senior Engineer",
        alternateTitle: "Lead Developer",
        department: "Engineering",
        reportsTo: "Development Manager",
        teamSize: "1",
        level: "Senior IC",
        features: {
          webSearch: "full",
          memory: "full",
          codeExecution: "full",
          artifacts: "full",
          files: "full",
          research: "none"
        },
        memoryFocus: "Architecture patterns, code quality standards, mentoring notes",
        useCases: [
          "Architecture & design (systems design, patterns, scalability)",
          "Code generation & refactoring (complex features, legacy migration)",
          "Technical documentation (API specs, architecture diagrams, guides)",
          "Code review guidance (best practices, security, performance)",
          "Junior developer mentoring (code reviews, learning plans)",
          "Complex problem-solving (performance, debugging, optimization)"
        ],
        guardrails: [
          "Web search: Tech docs, frameworks, best practices (unrestricted)",
          "Memory: Architecture patterns, team standards, code examples (pseudonymized)",
          "Code execution: Full (testing, optimization, proof-of-concept)",
          "Audit: Code generation reviewed by team before deployment"
        ],
        securityClearance: 5
      },
      {
        id: "fullstack-dev",
        title: "Software Engineer",
        alternateTitle: "Full-Stack Developer (×2-3)",
        department: "Engineering",
        reportsTo: "Development Manager",
        teamSize: "2-3",
        level: "Senior IC",
        features: {
          webSearch: "full",
          memory: "full",
          codeExecution: "full",
          artifacts: "full",
          files: "full",
          research: "none"
        },
        memoryFocus: "Current sprint, code patterns, debugging notes, personal learning",
        useCases: [
          "Code generation & completion (functions, modules, UI components)",
          "Bug fixes & debugging (stack traces, error analysis)",
          "Feature implementation (requirements to code)",
          "Code refactoring (simplification, performance)",
          "Test generation (unit tests, integration tests)",
          "Documentation (code comments, API docs, PR descriptions)"
        ],
        guardrails: [
          "Web search: Tech docs, frameworks, StackOverflow, error messages (unrestricted)",
          "Memory: Current sprint work, code patterns, debugging notes (no sensitive data)",
          "Code execution: Full (local testing, unit tests, validation)",
          "Audit: Code generation reviewed before commit"
        ],
        securityClearance: 4
      },
      {
        id: "qa-specialist",
        title: "QA Engineer",
        alternateTitle: "Test Automation Engineer",
        department: "Engineering",
        reportsTo: "Development Manager",
        teamSize: "1",
        level: "Individual Contributor",
        features: {
          webSearch: "limited",
          memory: "full",
          codeExecution: "full",
          artifacts: "full",
          files: "full",
          research: "none"
        },
        memoryFocus: "Test cases, bug reports, quality standards, regression tracking",
        useCases: [
          "Test case generation (user stories → test scenarios)",
          "Test automation (framework setup, script generation, maintenance)",
          "Bug report analysis (repro steps, root cause, severity)",
          "Quality metrics (coverage, pass rate, trends)",
          "Performance testing (load test scripts, profiling)",
          "Release validation (checklist, sign-off criteria)"
        ],
        guardrails: [
          "Web search: Limited (test frameworks, tools documentation only)",
          "Memory: Test cases, bugs, quality standards, regression history",
          "Code execution: Full (test script validation, automation, execution)",
          "Audit: Test results logged, automation code reviewed"
        ],
        securityClearance: 4
      },
      {
        id: "devops-engineer",
        title: "DevOps Engineer",
        alternateTitle: "Infrastructure Engineer",
        department: "Engineering",
        reportsTo: "Development Manager / CTO",
        teamSize: "1",
        level: "Senior IC",
        features: {
          webSearch: "full",
          memory: "full",
          codeExecution: "full",
          artifacts: "full",
          files: "full",
          research: "none"
        },
        memoryFocus: "Infrastructure design, AWS architecture, CI/CD pipelines, deployment strategies",
        useCases: [
          "Infrastructure as Code (Terraform, CloudFormation generation)",
          "CI/CD pipeline design (GitHub Actions, deployment automation)",
          "AWS architecture (EC2, RDS, S3, Lambda, networking)",
          "Monitoring & alerting (Prometheus, CloudWatch, Sentry setup)",
          "Security & compliance (IAM, secrets management, audit logging)",
          "Disaster recovery & backup strategy",
          "Cost optimization (reserved instances, spot instances, resource tagging)"
        ],
        guardrails: [
          "Web search: AWS documentation, DevOps tools, best practices (unrestricted)",
          "Memory: AWS architecture, infrastructure decisions, incident history",
          "Code execution: Full (infrastructure validation, terraform plan, testing)",
          "Audit: Infrastructure changes logged to AWS CloudTrail + version control"
        ],
        securityClearance: 5
      },
      {
        id: "project-manager",
        title: "Project Manager",
        alternateTitle: "Engineering Project Coordinator",
        department: "Engineering",
        reportsTo: "Development Manager / EVP",
        teamSize: "1",
        level: "Individual Contributor",
        features: {
          webSearch: "none",
          memory: "full",
          codeExecution: "none",
          artifacts: "full",
          files: "full",
          research: "none"
        },
        memoryFocus: "Sprint planning, roadmap, team capacity, timeline tracking",
        useCases: [
          "Sprint planning & grooming (story estimation, prioritization)",
          "Risk management (blockers, dependencies, mitigation)",
          "Status reporting (burndown, velocity, metrics)",
          "Stakeholder communication (updates, demos, feedback)",
          "Timeline & resource planning (capacity, allocation)",
          "Retrospective facilitation (meeting notes, action items)"
        ],
        guardrails: [
          "No web search (internal project management)",
          "Memory: Sprint data, roadmap, team capacity, historical metrics",
          "No code execution (not needed)",
          "Audit: Project documentation archived"
        ],
        securityClearance: 3
      }
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    roleCount: "2-3 roles",
    description: "Brand strategy, content creation, and demand generation",
    roles: [
      {
        id: "vp-marketing",
        title: "VP Marketing",
        alternateTitle: "Marketing Manager",
        department: "Marketing",
        reportsTo: "CEO / EVP",
        teamSize: "1",
        level: "Director/VP",
        features: {
          webSearch: "full",
          memory: "full",
          codeExecution: "none",
          artifacts: "full",
          files: "full",
          research: "full"
        },
        memoryFocus: "Brand strategy, campaign performance, competitor positioning, content calendar",
        useCases: [
          "Content strategy (blog roadmap, messaging, SEO)",
          "Campaign planning (launch strategy, channels, budget)",
          "Competitor analysis (positioning, messaging, pricing)",
          "Brand development (voice, tone, visual strategy)",
          "Lead generation strategy (channels, messaging, targeting)",
          "Performance analysis (traffic, conversion, engagement metrics)",
          "Event planning (webinars, conferences, sponsorships)"
        ],
        guardrails: [
          "Web search: Competitors, industry trends, customer research, pricing sites (unrestricted)",
          "Memory: Campaign performance, brand strategy, content calendar, audience insights",
          "No code execution (not needed)",
          "Audit: Campaign briefs reviewed before launch"
        ],
        securityClearance: 4
      },
      {
        id: "content-strategist",
        title: "Content Strategist",
        alternateTitle: "Content Manager",
        department: "Marketing",
        reportsTo: "VP Marketing",
        teamSize: "1",
        level: "Senior IC",
        features: {
          webSearch: "full",
          memory: "full",
          codeExecution: "none",
          artifacts: "full",
          files: "full",
          research: "none"
        },
        memoryFocus: "Content calendar, blog topics, case studies, brand voice examples",
        useCases: [
          "Blog post generation (topic research, outline, draft, SEO optimization)",
          "Case study development (customer story, metrics, quotes)",
          "Thought leadership (whitepapers, webinar scripts, industry insights)",
          "Social media content (posts, captions, campaign assets)",
          "Email campaigns (nurture sequences, promotional content)",
          "Web copy (landing pages, product pages, CTAs)",
          "Video scripts (product demos, customer testimonials, educational content)"
        ],
        guardrails: [
          "Web search: Industry trends, customer research, SEO (unrestricted)",
          "Memory: Content calendar, past blog posts, brand voice, audience insights",
          "No code execution",
          "Audit: Content reviewed for brand consistency before publication"
        ],
        securityClearance: 3
      }
    ]
  },
  {
    id: "operations",
    name: "Operations, Finance & Administration",
    roleCount: "3-5 roles",
    description: "Business operations, financial management, HR, and administrative support",
    roles: [
      {
        id: "ops-manager",
        title: "Operations Manager",
        alternateTitle: "Operations Director",
        department: "Operations",
        reportsTo: "EVP Operations",
        teamSize: "1",
        level: "Manager",
        features: {
          webSearch: "limited",
          memory: "full",
          codeExecution: "none",
          artifacts: "full",
          files: "full",
          research: "none"
        },
        memoryFocus: "Process maps, compliance documentation, operational metrics, vendor contracts",
        useCases: [
          "Process documentation (workflows, procedures, SOPs)",
          "Compliance management (policies, audit preparation, training)",
          "Vendor management (contract analysis, SLA review, performance)",
          "Operational metrics (scheduling, capacity, efficiency)",
          "Meeting coordination (agendas, notes, action items)",
          "HR support (job descriptions, org planning, benefits)"
        ],
        guardrails: [
          "Web search: Limited (vendor research, compliance resources only)",
          "Memory: Process documentation, contracts, operational metrics, policies",
          "No code execution",
          "Audit: Compliance documents versioned and logged"
        ],
        securityClearance: 4
      },
      {
        id: "financial-analyst",
        title: "Financial Analyst",
        alternateTitle: "Controller",
        department: "Finance",
        reportsTo: "CEO / EVP",
        teamSize: "1",
        level: "Manager",
        features: {
          webSearch: "none",
          memory: "full",
          codeExecution: "model-only",
          artifacts: "full",
          files: "full",
          research: "none"
        },
        memoryFocus: "Budget, financials, forecasting models, variance analysis, tax compliance",
        useCases: [
          "Financial forecasting (revenue, expenses, cashflow, scenarios)",
          "Budget analysis (actual vs. plan, variance explanation, recommendations)",
          "Reporting & metrics (P&L, dashboards, stakeholder updates)",
          "Cost analysis (project profitability, resource allocation, savings)",
          "Policy documentation (expense policy, procurement, pricing)",
          "Auditing support (documentation, reconciliation, audit preparation)"
        ],
        guardrails: [
          "No web search (internal focus, confidential data)",
          "Memory: Financial data, budgets, forecasts, cost analysis (confidential/restricted)",
          "Code execution: Financial modeling only (spreadsheets, scenarios, sensitivity analysis)",
          "Audit: All financial summaries flagged as confidential"
        ],
        securityClearance: 5
      },
      {
        id: "hr-manager",
        title: "HR Manager",
        alternateTitle: "People Operations Manager",
        department: "Human Resources",
        reportsTo: "EVP Operations / CEO",
        teamSize: "1",
        level: "Manager",
        features: {
          webSearch: "limited",
          memory: "full",
          codeExecution: "none",
          artifacts: "full",
          files: "full",
          research: "none"
        },
        memoryFocus: "Hiring, onboarding, employee development, culture, compensation",
        useCases: [
          "Job description generation (role clarity, responsibilities, requirements)",
          "Recruitment support (interview questions, scoring rubrics, offer letters)",
          "Onboarding documentation (welcome kit, first-week schedule, training plan)",
          "Employee development (feedback templates, career planning, training)",
          "Policy documentation (handbook, code of conduct, procedures)",
          "Culture initiatives (internal communications, values, team building)"
        ],
        guardrails: [
          "Web search: Limited (employment law resources, benchmarking only)",
          "Memory: Hiring process, employee feedback, culture initiatives (no PII)",
          "No code execution",
          "Audit: HR documents versioned and logged (confidential)"
        ],
        securityClearance: 4
      },
      {
        id: "admin-assistant",
        title: "Administrative Assistant",
        alternateTitle: "Office Manager",
        department: "Administration",
        reportsTo: "Operations Manager / EVP",
        teamSize: "1",
        level: "Individual Contributor",
        features: {
          webSearch: "none",
          memory: "full",
          codeExecution: "none",
          artifacts: "limited",
          files: "limited",
          research: "none"
        },
        memoryFocus: "Meeting coordination, scheduling, document templates, vendor contacts",
        useCases: [
          "Meeting coordination (agendas, minutes, scheduling)",
          "Document templates (memos, letters, forms)",
          "Scheduling & calendar management",
          "Vendor communication (emails, requests, follow-ups)",
          "Travel & expense support (itineraries, reimbursement forms)",
          "Basic data analysis (metrics, dashboard creation)"
        ],
        guardrails: [
          "No web search (not needed)",
          "Memory: Meeting notes, templates, scheduling information",
          "No code execution",
          "Limited file upload (documents only, no databases)",
          "Audit: Administrative documents kept on file"
        ],
        securityClearance: 2
      }
    ]
  },
  {
    id: "tech-services",
    name: "Managed Technical Services",
    roleCount: "3-4 roles",
    description: "IT support, cloud infrastructure, and help desk operations",
    roles: [
      {
        id: "it-services-engineer",
        title: "Managed IT Services Engineer",
        alternateTitle: "IT Support Engineer (×2-3)",
        department: "Technical Services",
        reportsTo: "VP Technical Services / Delivery Manager",
        teamSize: "2-3",
        level: "Individual Contributor",
        features: {
          webSearch: "limited",
          memory: "full",
          codeExecution: "test-stage",
          artifacts: "full",
          files: "full",
          research: "none"
        },
        memoryFocus: "Runbooks, SOP, customer configuration, ticket trends, escalation procedures",
        useCases: [
          "Troubleshooting & debugging (error analysis, ticket response, resolution steps)",
          "Runbook generation (incident response, escalation, recovery procedures)",
          "Configuration guidance (system setup, optimization, best practices)",
          "Knowledge base creation (FAQ, documentation, training materials)",
          "Ticket analysis (trends, patterns, root cause identification)",
          "Customer communication (status updates, explanations, guides)"
        ],
        guardrails: [
          "Web search: Limited (vendor documentation, support forums, error codes only)",
          "Memory: Runbooks, customer configurations, ticket history, SOP (confidential)",
          "Code execution: Test/staging only (not production; no customer systems)",
          "Audit: Customer interactions logged (may be shared with support team)"
        ],
        securityClearance: 4
      },
      {
        id: "cloud-specialist",
        title: "Cloud Infrastructure Specialist",
        alternateTitle: "AWS Engineer",
        department: "Technical Services",
        reportsTo: "VP Technical Services / DevOps Lead",
        teamSize: "1",
        level: "Senior IC",
        features: {
          webSearch: "full",
          memory: "full",
          codeExecution: "full",
          artifacts: "full",
          files: "full",
          research: "none"
        },
        memoryFocus: "AWS infrastructure design, customer architecture, cost optimization, migration plans",
        useCases: [
          "AWS architecture design (EC2, RDS, S3, Lambda, networking)",
          "Infrastructure as Code (CloudFormation, Terraform generation)",
          "Migration planning (on-prem → AWS, cost analysis)",
          "Performance tuning (scaling, optimization, monitoring)",
          "Security & compliance (IAM, encryption, audit logging)",
          "Cost optimization (reserved instances, spot, resource analysis)",
          "Disaster recovery planning (backup, failover, business continuity)"
        ],
        guardrails: [
          "Web search: AWS documentation, best practices, pricing (unrestricted)",
          "Memory: Customer AWS architecture, migration history, cost analysis (confidential)",
          "Code execution: Full (infrastructure validation, cost modeling, testing)",
          "Audit: AWS infrastructure changes logged to CloudTrail"
        ],
        securityClearance: 5
      },
      {
        id: "help-desk",
        title: "Help Desk Technician",
        alternateTitle: "IT Support Technician (×2)",
        department: "Technical Services",
        reportsTo: "VP Technical Services / Delivery Manager",
        teamSize: "2",
        level: "Entry-level",
        features: {
          webSearch: "none",
          memory: "full",
          codeExecution: "none",
          artifacts: "limited",
          files: "limited",
          research: "none"
        },
        memoryFocus: "Ticket templates, common issues, escalation criteria, customer notes",
        useCases: [
          "Ticket response (initial triage, basic troubleshooting)",
          "Issue documentation (problem, steps taken, resolution)",
          "Knowledge base search (past tickets, solutions, workarounds)",
          "Customer communication (email responses, status updates)",
          "Escalation preparation (issue summary, priority, urgency)"
        ],
        guardrails: [
          "No web search (use internal knowledge base only)",
          "Memory: Ticket history, solutions, customer notes (no passwords/credentials)",
          "No code execution (not needed)",
          "Limited artifact generation (text templates only)",
          "No file upload (not needed)",
          "Audit: All customer interactions logged"
        ],
        securityClearance: 3
      }
    ]
  }
];

export const featureAccessMatrix = {
  teams: [
    { name: "Executive", webSearch: "full", memory: "full", codeExec: "model-only", artifacts: "full", files: "full", research: "full" },
    { name: "Sales & BD", webSearch: "limited", memory: "full", codeExec: "none", artifacts: "full", files: "full", research: "limited" },
    { name: "Client Success", webSearch: "limited", memory: "full", codeExec: "test-stage", artifacts: "full", files: "full", research: "none" },
    { name: "Engineering", webSearch: "full", memory: "full", codeExec: "full", artifacts: "full", files: "full", research: "full" },
    { name: "Marketing", webSearch: "full", memory: "full", codeExec: "none", artifacts: "full", files: "full", research: "full" },
    { name: "Operations", webSearch: "limited", memory: "full", codeExec: "none", artifacts: "full", files: "full", research: "none" },
    { name: "Tech Support", webSearch: "limited", memory: "full", codeExec: "test-stage", artifacts: "limited", files: "limited", research: "none" }
  ]
};

export const dataClassification = [
  {
    level: "Public",
    description: "Company mission, product features, service offerings, team bios",
    availableTo: "All roles, all memory uses"
  },
  {
    level: "Internal",
    description: "Sales strategy, market research, operational metrics, process documentation",
    availableTo: "Sales, Operations, Executive (memory only; web search restricted)"
  },
  {
    level: "Confidential",
    description: "Customer data, contracts, financial data, security architecture, incident details",
    availableTo: "Specific roles only (Account Manager, Finance, Delivery Manager, CTO, EVP)"
  },
  {
    level: "Restricted",
    description: "Credentials, API keys, PII, healthcare data, payment card data",
    availableTo: "None (never store in Claude memory; use Secrets Manager)"
  }
];

export const deploymentPhases = {
  preDeployment: {
    week: "Week 1",
    title: "Pre-Deployment",
    items: [
      "Verify Claude Enterprise contract & seat count (50 seats for 41 FTE + growth buffer)",
      "Confirm AWS IAM integration (service account for API calls)",
      "Set up Okta/Azure AD for SAML SSO",
      "Create workspace admins (VP Engineering, VP Operations, VP Sales)",
      "Test SAML login with test users",
      "Enable audit logging to Sentry/CloudTrail"
    ]
  },
  pilot: {
    week: "Week 2-3",
    title: "Pilot Deployment",
    items: [
      "Pilot group: 10 users (2-3 per team)",
      "Test features per role (web search, memory, code execution)",
      "Verify guardrails (no cross-team memory leakage, restricted web search)",
      "Collect feedback (1:1 interviews, focus groups)"
    ]
  },
  ga: {
    week: "Week 4",
    title: "GA Deployment",
    items: [
      "Roll out to all 41 users",
      "Enable SAML-based provisioning",
      "Set up automated deprovisioning on exit",
      "Distribute role configuration guides to team leads",
      "Conduct all-hands training (30 min overview + role-specific breakouts)"
    ]
  },
  postDeployment: {
    week: "Week 5+",
    title: "Post-Deployment",
    items: [
      "Monitor adoption (weekly logins, feature usage)",
      "Track support tickets (misconfigurations, access issues)",
      "Quarterly security audit (memory content, audit logs)",
      "Monthly performance review (adoption, ROI, feedback)"
    ]
  }
};

export const successMetrics = {
  week1: {
    period: "Week 1 (Pilot)",
    metrics: [
      "10/10 pilot users can log in (100% SAML success)",
      "0 security incidents (no unauthorized access, no data leaks)",
      "<5 support tickets (onboarding, feature questions)"
    ]
  },
  month1: {
    period: "Month 1 (GA)",
    metrics: [
      "80%+ adoption (33+ of 41 users active)",
      "Top 3 features identified (web search, memory, code execution)",
      "50+ hours saved/month (time value from Claude assistance)",
      "0 critical security issues"
    ]
  },
  quarter1: {
    period: "Quarter 1 (Maturity)",
    metrics: [
      "90%+ adoption (37+ of 41 users regular users)",
      "Department-specific workflows established",
      "Measurable ROI (cost savings, time savings, quality improvements)",
      "Continuous improvement feedback loop"
    ]
  }
};

export const taxonomyMetadata = {
  version: "4.0",
  generated: "December 11, 2025",
  status: "Ready for SAML SSO implementation & pilot deployment",
  scope: "41 FTE across 7 departments, Claude Enterprise workspace",
  fteCount: 41,
  revenue: "$7.1M",
  companyType: "B2B business solutions company",
  ownership: "Women-owned, Midwest + remote"
};
