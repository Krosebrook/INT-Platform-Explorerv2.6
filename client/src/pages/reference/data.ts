export interface ReferenceDocument {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
  type: 'Whitepaper' | 'Guide' | 'Report' | 'Playbook';
}

export const REFERENCE_CATEGORIES = [
  'Executive',
  'Technical',
  'Strategy',
  'Operations',
] as const;

export const REFERENCE_DOCUMENTS: ReferenceDocument[] = [
  // --- Executive ---
  {
    id: 'enterprise-ai-adoption-framework',
    title: 'Enterprise AI Adoption Framework',
    category: 'Executive',
    author: 'Dr. Sarah Chen',
    date: '2026-01-15',
    summary:
      'A comprehensive framework for enterprise-wide AI adoption, covering organizational readiness, change management, and phased rollout strategies for Fortune 500 companies.',
    content: `The Enterprise AI Adoption Framework provides a structured approach to integrating artificial intelligence capabilities across large organizations. It addresses the critical gap between pilot projects and enterprise-scale deployment that many organizations struggle with today.

The framework is organized into four phases: Assessment, Foundation, Scale, and Optimize. During the Assessment phase, organizations evaluate their data maturity, talent readiness, and infrastructure capabilities. The Foundation phase focuses on establishing governance structures, selecting initial use cases with high ROI potential, and building the technical infrastructure needed for production AI workloads.

The Scale phase is where most organizations encounter the greatest challenges. This phase covers strategies for moving from isolated AI projects to cross-functional deployments, including techniques for managing organizational change, retraining workflows, and establishing feedback loops between business units and AI teams. Key metrics for success at this stage include adoption rates across departments, time-to-value for new use cases, and employee satisfaction scores.

The Optimize phase focuses on continuous improvement, cost optimization, and advanced capabilities such as multi-model orchestration and autonomous agent deployments. Organizations that reach this phase typically see 3-5x returns on their initial AI investments and have established AI as a core competitive advantage.`,
    tags: ['AI Strategy', 'Digital Transformation', 'Change Management', 'ROI'],
    type: 'Whitepaper',
  },
  {
    id: 'cxo-ai-investment-brief',
    title: 'CXO AI Investment Decision Brief',
    category: 'Executive',
    author: 'Michael Torres',
    date: '2026-02-01',
    summary:
      'Executive decision brief summarizing AI platform investment options, total cost of ownership analysis, and strategic alignment considerations for C-suite leadership.',
    content: `This decision brief is designed to help C-suite executives evaluate AI platform investments with a focus on long-term strategic value rather than short-term cost comparisons. The document synthesizes market intelligence, vendor assessments, and financial modeling into an actionable format suitable for board-level discussions.

The brief covers three primary investment scenarios: build-your-own infrastructure, platform-as-a-service adoption, and hybrid approaches. Each scenario is evaluated across dimensions including total cost of ownership over a 3-year horizon, time to first value delivery, talent requirements, and strategic flexibility. Financial models account for both direct costs (compute, licensing, personnel) and indirect costs (opportunity cost, technical debt, vendor lock-in risk).

A critical insight from our analysis is that organizations spending less than 2% of revenue on AI capabilities are falling behind competitors in their industry. The median AI investment among market leaders has risen to 4.7% of revenue, with top performers allocating up to 8%. However, the correlation between spending and outcomes is non-linear; organizations with strong governance and clear use-case prioritization outperform those that simply spend more without strategic direction.

The brief concludes with a recommended decision matrix that weighs strategic alignment (40%), financial impact (30%), risk profile (20%), and implementation complexity (10%). This weighting reflects the growing consensus that AI investments should be evaluated primarily as strategic bets rather than cost-optimization exercises.`,
    tags: ['Investment', 'C-Suite', 'TCO', 'Board Strategy'],
    type: 'Whitepaper',
  },
  {
    id: 'ai-governance-board-charter',
    title: 'AI Governance Board Charter Template',
    category: 'Executive',
    author: 'Lisa Patel',
    date: '2025-12-10',
    summary:
      'Template and guidelines for establishing an AI governance board, including roles, responsibilities, escalation procedures, and compliance oversight structures.',
    content: `The AI Governance Board Charter Template provides a ready-to-customize framework for organizations establishing formal AI oversight. As regulatory requirements intensify globally, particularly with the EU AI Act and emerging US state-level AI legislation, a well-structured governance board has become essential for enterprise AI programs.

The charter defines four core governance functions: policy development, risk assessment, compliance monitoring, and ethical review. Each function includes recommended committee structures, meeting cadences, and decision-making authority levels. The template is designed to integrate with existing corporate governance frameworks rather than creating parallel structures that often lead to organizational friction and slow decision-making.

A key innovation in this charter template is the tiered review process. Low-risk AI applications (internal tools, data analysis) follow an expedited self-certification process, while high-risk applications (customer-facing decisions, financial modeling, healthcare recommendations) require full board review. This approach prevents governance from becoming a bottleneck while ensuring appropriate oversight for sensitive use cases. Organizations using this tiered approach report 60% faster time-to-deployment for low-risk applications without increasing risk exposure.

The template also includes a stakeholder RACI matrix, sample escalation flowcharts, and quarterly reporting templates that can be adapted to any organization's existing compliance infrastructure. Appendices cover integration with SOC 2, ISO 27001, and NIST AI RMF frameworks.`,
    tags: ['Governance', 'Compliance', 'Risk Management', 'EU AI Act'],
    type: 'Guide',
  },
  // --- Technical ---
  {
    id: 'model-selection-decision-matrix',
    title: 'Model Selection Decision Matrix',
    category: 'Technical',
    author: 'James Kim',
    date: '2026-01-28',
    summary:
      'Technical guide for selecting the right AI model for specific enterprise use cases, covering performance benchmarks, cost trade-offs, latency requirements, and context window considerations.',
    content: `Selecting the right AI model for a given use case is one of the most impactful technical decisions in any AI deployment. This guide provides a systematic approach to model selection that balances performance, cost, latency, and operational complexity across the major foundation model providers.

The decision matrix evaluates models across eight dimensions: task accuracy, latency (time-to-first-token and total generation time), cost per million tokens, context window size, multi-modal capabilities, fine-tuning availability, safety and alignment characteristics, and API reliability. Each dimension is scored on a 1-5 scale with clear benchmarks. For example, latency is scored based on p50 and p95 response times under production load, not synthetic benchmarks that rarely reflect real-world performance.

For coding tasks, the current landscape shows Claude Opus 4.5 leading on SWE-bench Verified (80.9%) with strong token efficiency, while GPT-5.1 Codex variants excel in repository-level code generation. For analytical reasoning tasks requiring nuanced judgment, Claude models consistently outperform alternatives, particularly in scenarios requiring careful consideration of edge cases and ambiguity. For high-throughput, cost-sensitive workloads such as classification and extraction, smaller models like Claude Haiku or GPT-4o-mini offer dramatically better cost-performance ratios.

The guide includes decision trees for common enterprise scenarios: customer support automation, code review and generation, document analysis, data extraction, content creation, and multi-step agent workflows. Each decision tree accounts for organizational constraints such as data residency requirements, compliance certifications, and existing vendor relationships.`,
    tags: ['Model Selection', 'Benchmarks', 'LLM Comparison', 'Architecture'],
    type: 'Guide',
  },
  {
    id: 'prompt-engineering-enterprise-playbook',
    title: 'Enterprise Prompt Engineering Standards',
    category: 'Technical',
    author: 'Anika Ramirez',
    date: '2026-02-10',
    summary:
      'Standardized prompt engineering practices for enterprise teams, including template libraries, testing methodologies, and version control strategies for production prompts.',
    content: `Enterprise prompt engineering requires discipline and rigor that goes far beyond ad-hoc prompt crafting. This standards document establishes best practices for teams building and maintaining production AI systems where prompt quality directly impacts business outcomes and user experience.

The standards cover four pillars: prompt design patterns, testing and evaluation, version control and deployment, and monitoring and iteration. Prompt design patterns include structured templates for common tasks (classification, extraction, generation, analysis), system prompt architecture for multi-turn conversations, and techniques for managing context window utilization across long-running interactions. Each pattern includes anti-patterns to avoid and metrics for measuring effectiveness.

Testing and evaluation standards address the critical gap in most organizations' AI development processes. The document establishes minimum requirements for prompt evaluation including automated regression testing against curated test sets, A/B testing frameworks for production prompt changes, and human evaluation protocols for subjective quality assessment. A key recommendation is maintaining at least 100 evaluation examples per prompt template, with 20% reserved as a held-out test set that is never used during prompt development.

Version control standards extend Git-based workflows to prompt management, including branching strategies for prompt experimentation, rollback procedures for production prompts, and audit trail requirements for compliance. The document introduces the concept of "prompt contracts" -- formal specifications of a prompt's expected inputs, outputs, and performance characteristics that serve as both documentation and automated test specifications.`,
    tags: ['Prompt Engineering', 'Best Practices', 'Testing', 'DevOps'],
    type: 'Guide',
  },
  {
    id: 'api-integration-architecture-guide',
    title: 'AI API Integration Architecture Patterns',
    category: 'Technical',
    author: 'David Okafor',
    date: '2026-01-05',
    summary:
      'Architecture patterns for integrating AI APIs into enterprise systems, covering retry strategies, fallback routing, rate limiting, and multi-provider orchestration.',
    content: `Building reliable enterprise systems on top of AI APIs requires careful architectural planning that accounts for the unique characteristics of large language model services: variable latency, rate limiting, occasional quality regressions, and evolving model capabilities. This guide presents battle-tested architecture patterns drawn from production deployments across multiple industries.

The core architecture pattern recommended is the AI Gateway, a centralized service that sits between your application code and AI providers. The gateway handles authentication, request routing, retry logic, rate limiting, cost tracking, and observability. By centralizing these cross-cutting concerns, individual development teams can focus on business logic while the platform team manages operational complexity. The gateway pattern also enables seamless provider switching and A/B testing of different models without application code changes.

Multi-provider routing strategies are covered in depth, including primary-fallback configurations, load balancing across providers for cost optimization, and quality-aware routing that directs requests to different models based on task complexity. The guide recommends maintaining at least two provider relationships for any production workload to ensure business continuity. Automated fallback should be triggered by both availability issues (HTTP errors, timeouts) and quality degradation (detected through real-time evaluation of response quality against baseline metrics).

Observability and cost management sections cover structured logging standards for AI requests, dashboard templates for monitoring token usage and costs, alerting thresholds for anomalous spending patterns, and techniques for implementing per-team and per-project cost attribution. Organizations following these patterns typically reduce AI API costs by 20-35% through better routing decisions and elimination of unnecessary retries.`,
    tags: ['API Architecture', 'Integration', 'Resilience', 'Cost Optimization'],
    type: 'Guide',
  },
  // --- Strategy ---
  {
    id: 'q1-2026-ai-market-analysis',
    title: 'Q1 2026 AI Market Analysis',
    category: 'Strategy',
    author: 'Rachel Morrison',
    date: '2026-02-20',
    summary:
      'Quarterly market analysis covering the latest developments in the enterprise AI landscape, competitive dynamics, emerging trends, and strategic implications for platform selection.',
    content: `The Q1 2026 AI market continues to evolve at an unprecedented pace, with several developments reshaping the competitive landscape. This analysis covers the most significant shifts and their implications for enterprise AI strategy and platform selection decisions.

The most notable trend this quarter is the convergence of foundation model capabilities. Performance gaps between top-tier models have narrowed significantly, with Claude Opus 4.5, GPT-5.1, and Gemini 3 Pro all achieving within 5% of each other on standard benchmarks. This convergence is shifting competitive differentiation from raw model performance to ecosystem factors: developer experience, safety and reliability, enterprise features, pricing flexibility, and integration capabilities. Organizations should adjust their evaluation criteria accordingly, placing greater weight on operational characteristics and less on benchmark scores alone.

Agent frameworks have emerged as the primary battleground for platform differentiation. Anthropic's Claude Code, Microsoft's Copilot Studio, and Google's Vertex AI Agent Builder are all competing to become the standard for enterprise agent deployment. The key differentiator is not agent capability per se, but rather the surrounding infrastructure: monitoring, debugging, safety guardrails, and integration with existing enterprise systems. Early adopters of agent frameworks report 40-60% productivity gains in software development and 25-35% efficiency improvements in customer service operations.

Pricing dynamics continue to favor enterprises. The median cost per million tokens for frontier models has decreased 45% year-over-year, while performance has increased approximately 30%. This trend is expected to continue through 2026, making previously cost-prohibitive use cases economically viable. However, total AI spending is increasing as organizations expand the scope and volume of their AI deployments. Strategic buyers should negotiate volume commitments that lock in current pricing while maintaining flexibility to adopt new models as they become available.`,
    tags: ['Market Analysis', 'Competitive Intelligence', 'Trends', 'Pricing'],
    type: 'Report',
  },
  {
    id: 'ai-workforce-transformation-strategy',
    title: 'AI Workforce Transformation Strategy',
    category: 'Strategy',
    author: 'Dr. Emily Watson',
    date: '2026-01-20',
    summary:
      'Strategic roadmap for workforce transformation in the age of AI, covering skills gap analysis, reskilling programs, role evolution, and organizational design considerations.',
    content: `Workforce transformation is the single most important factor determining whether an organization realizes the full potential of its AI investments. This strategy document provides a comprehensive roadmap for aligning human talent with AI capabilities to create a workforce that is augmented rather than displaced by artificial intelligence.

The strategy begins with a skills gap analysis framework that categorizes existing roles into four quadrants based on their AI augmentation potential and transformation timeline. Roles in the "Augment Now" quadrant (knowledge workers, analysts, developers) benefit immediately from AI tools and should be prioritized for training and tool deployment. Roles in the "Transform Gradually" quadrant require deeper process redesign and should be addressed in subsequent phases. The framework helps organizations avoid the common mistake of trying to transform everything simultaneously, which typically leads to change fatigue and poor adoption.

Reskilling programs are designed around the concept of "AI fluency levels," ranging from Level 1 (basic AI tool usage) to Level 5 (AI system architecture and strategy). The strategy recommends that 100% of knowledge workers achieve Level 2 fluency within 12 months, with specialized roles progressing to Level 3-4. The training program combines self-paced learning modules, hands-on workshops with real business scenarios, and mentorship from early adopters. Organizations that invest in structured reskilling programs see 2.5x higher AI adoption rates and 40% higher satisfaction scores compared to those relying on informal learning.

Organizational design recommendations address the emerging role categories created by AI adoption: AI Product Managers, Prompt Engineers, AI Ethics Officers, and Human-AI Collaboration Designers. The strategy provides job descriptions, career progression frameworks, and compensation benchmarks for these roles, as well as guidance on how to integrate them into existing organizational hierarchies without creating silos or unclear reporting lines.`,
    tags: ['Workforce', 'Skills Development', 'Organizational Change', 'Training'],
    type: 'Report',
  },
  {
    id: 'competitive-ai-platform-assessment',
    title: 'Competitive AI Platform Assessment 2026',
    category: 'Strategy',
    author: 'Thomas Grant',
    date: '2026-02-15',
    summary:
      'Detailed competitive assessment of major enterprise AI platforms including Anthropic, OpenAI, Google, Microsoft, and AWS, evaluating features, pricing, reliability, and ecosystem maturity.',
    content: `This competitive assessment evaluates the five leading enterprise AI platforms across dimensions that matter most to large-scale deployments: model performance, enterprise features, safety and compliance, pricing economics, ecosystem maturity, and strategic trajectory. The assessment is based on hands-on evaluation, customer interviews, and market analysis conducted in January-February 2026.

Anthropic's Claude platform has established itself as the leader in safety and reliability for enterprise deployments. Claude Opus 4.5 delivers top-tier performance on coding and analytical tasks while consuming significantly fewer tokens than competitors. The platform's key strengths include industry-leading prompt injection resistance, comprehensive enterprise safety features, and a developer experience that consistently receives the highest satisfaction scores. Areas for improvement include geographic coverage of data centers and the breadth of pre-built integrations compared to hyperscaler offerings.

OpenAI's platform offers the broadest model lineup and the most mature ecosystem of third-party tools and integrations. GPT-5.1 variants provide excellent performance across a wide range of tasks, and the platform's enterprise features have matured significantly. However, organizations report ongoing concerns about data handling practices and the pace of breaking API changes. Microsoft's deep integration of OpenAI models into the M365 ecosystem creates compelling value for organizations already invested in the Microsoft stack, though this same tight coupling can create switching cost concerns.

Google's Vertex AI platform has made significant strides in enterprise readiness, with Gemini 3 Pro delivering competitive performance and strong multi-modal capabilities. The platform's key differentiator is its integration with Google Cloud's data and analytics services, making it particularly attractive for organizations with large-scale data processing needs. AWS Bedrock continues to evolve as the leading multi-model platform, offering the greatest flexibility for organizations wanting to avoid single-vendor dependency, though this flexibility comes at the cost of a more complex operational model.`,
    tags: ['Competitive Analysis', 'Platform Comparison', 'Vendor Assessment', 'Enterprise'],
    type: 'Report',
  },
  // --- Operations ---
  {
    id: 'incident-response-playbook',
    title: 'AI Incident Response Playbook',
    category: 'Operations',
    author: 'Karen Zheng',
    date: '2026-02-05',
    summary:
      'Operational playbook for responding to AI-related incidents including model failures, safety violations, data exposure risks, and service degradation events.',
    content: `The AI Incident Response Playbook establishes standardized procedures for detecting, responding to, and recovering from AI-related incidents in production environments. As AI systems become more deeply integrated into business-critical workflows, the potential impact of AI-specific incidents has grown significantly, requiring dedicated response procedures that complement existing IT incident management frameworks.

The playbook defines four severity levels for AI incidents. P1 (Critical) covers complete AI service outages affecting revenue-generating systems, confirmed data exposure through AI interfaces, and AI systems generating harmful or illegal content. P2 (High) covers significant quality degradation, safety filter failures with limited scope, and AI cost anomalies exceeding 200% of baseline. P3 (Medium) covers intermittent quality issues, minor safety filter gaps, and performance degradation. P4 (Low) covers cosmetic issues, non-critical feature failures, and documentation gaps. Each severity level has defined response times, escalation paths, and communication requirements.

For each incident type, the playbook provides step-by-step response procedures organized into five phases: Detection, Triage, Containment, Resolution, and Post-Incident Review. Detection procedures cover automated monitoring alerts, user-reported issues, and proactive quality sampling. Containment procedures are specific to AI systems and include techniques such as prompt rollback, model version pinning, traffic rerouting to fallback models, and emergency rate limiting. These containment strategies are designed to minimize business impact while the root cause is investigated.

The post-incident review section includes templates for AI-specific retrospectives that go beyond traditional postmortem formats. AI incident reviews must evaluate whether the incident was caused by model behavior, prompt design, system architecture, or operational procedures, and must assess whether similar incidents could occur with different models or in different deployment contexts. The playbook requires that all P1 and P2 incidents produce documented action items with assigned owners and target completion dates.`,
    tags: ['Incident Response', 'Operations', 'Risk Mitigation', 'SRE'],
    type: 'Playbook',
  },
  {
    id: 'ai-ops-monitoring-runbook',
    title: 'AI Operations Monitoring Runbook',
    category: 'Operations',
    author: 'Alex Nakamura',
    date: '2026-01-12',
    summary:
      'Comprehensive runbook for monitoring AI systems in production, covering key metrics, alerting thresholds, dashboard configurations, and automated remediation procedures.',
    content: `Effective monitoring of AI systems in production requires tracking metrics that go far beyond traditional application monitoring. This runbook establishes the complete monitoring stack needed to maintain healthy AI deployments, from infrastructure-level metrics to AI-specific quality and safety indicators.

The monitoring framework is organized into four layers: Infrastructure (compute utilization, network latency, API availability), Application (request volume, error rates, response times), AI Quality (output relevance, hallucination rates, safety compliance, task completion accuracy), and Business Impact (user satisfaction, automation rate, cost per interaction, revenue attribution). Each layer has defined metrics, collection methods, alerting thresholds, and escalation procedures. The AI Quality layer is unique to AI systems and requires custom evaluation pipelines that continuously assess model output quality against ground truth datasets and human feedback signals.

Dashboard templates are provided for three audiences: Operations Engineers (real-time health and performance), AI Engineers (model quality and behavior analysis), and Business Stakeholders (impact and ROI metrics). Each dashboard includes recommended refresh intervals, default time windows, and drill-down paths for investigating anomalies. The operations dashboard prioritizes time-to-detection and includes automated incident creation when critical thresholds are breached.

Automated remediation procedures cover the most common operational scenarios: traffic spikes that exceed rate limits (automatic request queuing and overflow routing), cost anomalies (automatic budget enforcement and stakeholder notification), quality degradation (automatic fallback to previous prompt versions or alternative models), and safety violations (automatic content blocking and human review queue activation). Each remediation procedure includes rollback conditions and manual override capabilities to prevent automation from causing cascading failures.`,
    tags: ['Monitoring', 'Observability', 'Runbook', 'Automation'],
    type: 'Playbook',
  },
  {
    id: 'ai-deployment-checklist-guide',
    title: 'Production AI Deployment Checklist',
    category: 'Operations',
    author: 'Priya Sharma',
    date: '2025-12-20',
    summary:
      'Step-by-step deployment checklist for launching AI features into production, covering testing requirements, approval workflows, rollback procedures, and post-deployment validation.',
    content: `Deploying AI capabilities into production environments carries unique risks that traditional deployment checklists do not adequately address. This guide provides a comprehensive, step-by-step checklist that ensures AI deployments meet quality, safety, compliance, and operational readiness standards before serving production traffic.

The pre-deployment checklist covers five domains. Technical Readiness includes items such as load testing at 2x expected peak traffic, failover testing with provider outages simulated, prompt regression testing against the full evaluation suite, and security review of all data flows including input sanitization and output filtering. Model Readiness covers evaluation results against acceptance criteria, bias testing across relevant demographic dimensions, safety testing against the organization's red-team scenarios, and documentation of model limitations and known failure modes.

Compliance and Legal readiness items include data processing impact assessments for new data types, privacy review for any personally identifiable information in prompts or completions, terms of service compliance verification with AI providers, and internal legal sign-off for customer-facing AI features. Operational Readiness covers monitoring and alerting configuration, runbook creation or updates, on-call rotation updates, and customer communication plans. Business Readiness includes stakeholder sign-off, success metrics definition, rollback decision criteria, and customer support team briefing and training.

The post-deployment validation section defines a structured observation period with specific checkpoints at 1 hour, 4 hours, 24 hours, and 7 days after deployment. Each checkpoint has defined metrics to evaluate and pass/fail criteria. The guide recommends using feature flags for all AI deployments, starting with 5% traffic exposure and gradually increasing based on monitoring data. Full rollout should not occur until the 7-day checkpoint is passed. This graduated approach has been shown to catch 95% of production issues before they impact more than 10% of users.`,
    tags: ['Deployment', 'Checklist', 'Quality Assurance', 'Release Management'],
    type: 'Guide',
  },
];
