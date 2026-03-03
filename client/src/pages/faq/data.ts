export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQ_CATEGORIES = [
  'Getting Started',
  'Platform Features',
  'Pricing & Plans',
  'Security',
  'Technical',
  'Account',
] as const;

export const FAQ_ITEMS: FAQItem[] = [
  // --- Getting Started ---
  {
    id: 'gs-1',
    question: 'How do I get started with the platform?',
    answer:
      'Sign up for an account at our website and follow the onboarding wizard to configure your workspace. The wizard walks you through connecting your first data source, selecting an AI model, and running a sample workflow in under 10 minutes.',
    category: 'Getting Started',
  },
  {
    id: 'gs-2',
    question: 'What are the system requirements?',
    answer:
      'The platform runs entirely in the cloud and is accessible through any modern web browser (Chrome, Firefox, Safari, Edge). No local software installation is required. For API access, any HTTP client or SDK in Python, Node.js, Java, or Go will work.',
    category: 'Getting Started',
  },
  {
    id: 'gs-3',
    question: 'How long does initial setup take?',
    answer:
      'Basic setup takes approximately 10-15 minutes using the onboarding wizard. Enterprise configurations with SSO integration, custom roles, and data source connections typically take 1-2 hours with guidance from our solutions team.',
    category: 'Getting Started',
  },
  {
    id: 'gs-4',
    question: 'Is there a guided tutorial available?',
    answer:
      'Yes, we offer an interactive tutorial that walks you through all core features step by step. You can access it from the dashboard by clicking "Start Tutorial." We also maintain a library of video walkthroughs organized by feature area.',
    category: 'Getting Started',
  },
  {
    id: 'gs-5',
    question: 'Can I import data from my existing tools?',
    answer:
      'The platform supports importing data from CSV, JSON, and Excel files as well as direct integrations with popular services such as Salesforce, HubSpot, Jira, and Google Workspace. Use the "Import" button in Settings to get started.',
    category: 'Getting Started',
  },
  // --- Platform Features ---
  {
    id: 'pf-1',
    question: 'What AI models are supported?',
    answer:
      'The platform supports Claude (Opus, Sonnet, Haiku), GPT-4o and GPT-5 variants, Gemini Pro and Ultra, and Llama 3 open-source models. You can switch between models per workflow or set a default at the organization level.',
    category: 'Platform Features',
  },
  {
    id: 'pf-2',
    question: 'Can I build custom AI workflows?',
    answer:
      'Yes, our workflow builder lets you chain multiple AI steps together with conditional logic, human-in-the-loop review points, and API integrations. Workflows can be triggered manually, on a schedule, or via webhook events from external systems.',
    category: 'Platform Features',
  },
  {
    id: 'pf-3',
    question: 'Does the platform support multi-modal inputs?',
    answer:
      'The platform supports text, images, PDFs, audio, and structured data as inputs to AI models. Multi-modal capabilities vary by model; Claude and GPT-4o support vision, while audio transcription uses dedicated speech-to-text models.',
    category: 'Platform Features',
  },
  {
    id: 'pf-4',
    question: 'Is there a prompt management system?',
    answer:
      'Our built-in prompt management system lets you version, test, and deploy prompts across environments. It includes A/B testing, regression test suites, and audit logging so you can iterate with confidence and track every change.',
    category: 'Platform Features',
  },
  {
    id: 'pf-5',
    question: 'Can I use the platform for agent-based workflows?',
    answer:
      'Yes, the platform includes an agent framework that supports autonomous multi-step task execution with tool use, memory, and safety guardrails. Agents can browse the web, execute code, query databases, and interact with external APIs.',
    category: 'Platform Features',
  },
  // --- Pricing & Plans ---
  {
    id: 'pp-1',
    question: 'Is there a free tier available?',
    answer:
      'Yes, we offer a free Starter tier that includes 100,000 tokens per month, access to Haiku and Sonnet-class models, and up to 3 workflows. This tier is ideal for individuals and small teams evaluating the platform.',
    category: 'Pricing & Plans',
  },
  {
    id: 'pp-2',
    question: 'How does token-based pricing work?',
    answer:
      'You are charged based on the number of input and output tokens processed by AI models. Input tokens (your prompts) are typically cheaper than output tokens (model responses). Unused tokens in monthly plans roll over for up to 90 days.',
    category: 'Pricing & Plans',
  },
  {
    id: 'pp-3',
    question: 'Are there volume discounts for enterprise plans?',
    answer:
      'Enterprise plans include volume discounts starting at 20% off list pricing for annual commitments. Larger commitments qualify for deeper discounts. Contact our sales team for a custom quote tailored to your usage patterns.',
    category: 'Pricing & Plans',
  },
  {
    id: 'pp-4',
    question: 'Can I switch plans at any time?',
    answer:
      'You can upgrade your plan at any time with immediate effect. Downgrades take effect at the start of the next billing cycle. Prorated credits are applied automatically when upgrading mid-cycle.',
    category: 'Pricing & Plans',
  },
  // --- Security ---
  {
    id: 'sec-1',
    question: 'How is my data protected?',
    answer:
      'All data is encrypted at rest using AES-256 and in transit using TLS 1.3. We operate in SOC 2 Type II certified data centers with strict access controls, and our infrastructure undergoes annual penetration testing by independent security firms.',
    category: 'Security',
  },
  {
    id: 'sec-2',
    question: 'Does the platform support SSO and SAML?',
    answer:
      'Yes, we support SAML 2.0 and OIDC-based SSO with all major identity providers including Okta, Azure AD, Google Workspace, and OneLogin. SSO is available on Professional and Enterprise plans.',
    category: 'Security',
  },
  {
    id: 'sec-3',
    question: 'Is my data used to train AI models?',
    answer:
      'No. Enterprise and Professional plans include Zero Data Retention (ZDR) by default, meaning your prompts and completions are never stored by model providers for training or any other purpose. Starter plans can opt into ZDR as well.',
    category: 'Security',
  },
  {
    id: 'sec-4',
    question: 'What compliance certifications do you hold?',
    answer:
      'We hold SOC 2 Type II, ISO 27001, GDPR compliance, and HIPAA BAA certifications. We are also aligned with the NIST AI Risk Management Framework and are preparing for EU AI Act compliance requirements.',
    category: 'Security',
  },
  {
    id: 'sec-5',
    question: 'Can I restrict data to specific geographic regions?',
    answer:
      'Yes, Enterprise plans support data residency controls that allow you to restrict all processing and storage to specific AWS or Azure regions. Currently available regions include US, EU, UK, Canada, Australia, and Japan.',
    category: 'Security',
  },
  // --- Technical ---
  {
    id: 'tech-1',
    question: "What's the maximum context window available?",
    answer:
      'The maximum context window depends on the selected model. Claude Opus 4.5 supports 200,000 tokens, GPT-5.1 supports 128,000 tokens, and Gemini Pro supports 1,000,000 tokens. The platform automatically manages context within model limits.',
    category: 'Technical',
  },
  {
    id: 'tech-2',
    question: 'What API rate limits apply?',
    answer:
      'Rate limits vary by plan: Starter (60 requests/min), Professional (600 requests/min), Enterprise (custom). Rate limit headers are included in every API response so you can implement client-side throttling. Burst allowances are available on Enterprise plans.',
    category: 'Technical',
  },
  {
    id: 'tech-3',
    question: 'Can I fine-tune models on the platform?',
    answer:
      'Fine-tuning is available for select models on Professional and Enterprise plans. You can upload training datasets, configure hyperparameters, and manage fine-tuned model versions directly through the dashboard or API.',
    category: 'Technical',
  },
  {
    id: 'tech-4',
    question: 'How does the platform handle model failover?',
    answer:
      'The platform includes automatic failover routing. If a primary model provider experiences downtime or degraded performance, requests are automatically routed to a pre-configured fallback model with compatible capabilities to ensure service continuity.',
    category: 'Technical',
  },
  {
    id: 'tech-5',
    question: 'Is there webhook support for event-driven integrations?',
    answer:
      'Yes, the platform supports outbound webhooks for key events including workflow completion, error alerts, usage threshold notifications, and model output quality flags. Webhooks use HMAC-SHA256 signatures for authentication.',
    category: 'Technical',
  },
  // --- Account ---
  {
    id: 'acct-1',
    question: 'How do I add team members to my organization?',
    answer:
      'Navigate to Settings > Team Management and click "Invite Member." You can assign roles (Admin, Editor, Viewer) and set project-level permissions. Invitations are sent via email and expire after 7 days if not accepted.',
    category: 'Account',
  },
  {
    id: 'acct-2',
    question: 'Can I manage multiple projects under one account?',
    answer:
      'Yes, all plans support multiple projects within a single organization. Each project has its own API keys, usage quotas, and team permissions. Enterprise plans additionally support sub-organizations for departmental isolation.',
    category: 'Account',
  },
  {
    id: 'acct-3',
    question: 'How do I reset my password?',
    answer:
      'Click "Forgot Password" on the login page and enter your registered email address. You will receive a password reset link valid for 1 hour. If your organization uses SSO, password management is handled through your identity provider.',
    category: 'Account',
  },
  {
    id: 'acct-4',
    question: 'How do I view my usage and billing history?',
    answer:
      'Go to Settings > Billing to view your current usage, invoices, and payment history. Usage dashboards show token consumption broken down by model, project, and team member. You can also export usage data as CSV for internal reporting.',
    category: 'Account',
  },
];
