// client/src/pages/best-practices/data.ts

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BestPractice {
  id: string;
  title: string;
  category: string;
  description: string;
  tips: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  icon: string;
}

export interface PracticeCategory {
  id: string;
  label: string;
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export const PRACTICE_CATEGORIES: PracticeCategory[] = [
  { id: "all", label: "All" },
  { id: "Prompting", label: "Prompting" },
  { id: "Advanced Techniques", label: "Advanced Techniques" },
  { id: "Security", label: "Security" },
  { id: "Workflow", label: "Workflow" },
  { id: "Troubleshooting", label: "Troubleshooting" },
  { id: "Collaboration", label: "Collaboration" },
];

// ---------------------------------------------------------------------------
// Best Practices Data (18-24 items across all categories)
// ---------------------------------------------------------------------------

export const BEST_PRACTICES: BestPractice[] = [
  // ── Prompting ──────────────────────────────────────────────────────────
  {
    id: "chain-of-thought",
    title: "Chain of Thought Prompting",
    category: "Prompting",
    description:
      "Ask the model to think step-by-step before producing a final answer. This significantly improves accuracy on complex reasoning tasks such as math, logic, and multi-step planning.",
    tips: [
      "Prefix your request with 'Think step-by-step before answering.'",
      "Ask the model to show its reasoning, then provide the conclusion separately.",
      "Use chain-of-thought for debugging, data analysis, and decision trees.",
      "Combine with XML tags to separate reasoning from the final answer.",
    ],
    difficulty: "Beginner",
    icon: "Brain",
  },
  {
    id: "be-specific",
    title: "Be Specific and Contextual",
    category: "Prompting",
    description:
      "Provide clear background context, format requirements, and audience details. The model cannot read your mind -- explicit instructions yield dramatically better outputs.",
    tips: [
      "State the audience (e.g., 'for a non-technical executive') up front.",
      "Specify output format: bullet points, JSON, markdown table, etc.",
      "Include relevant constraints like word count or tone requirements.",
      "Give examples of what a good response looks like when possible.",
    ],
    difficulty: "Beginner",
    icon: "Target",
  },
  {
    id: "multi-turn-design",
    title: "Multi-Turn Conversation Design",
    category: "Prompting",
    description:
      "Structure multi-turn interactions so each follow-up builds on previous context without redundancy. Keep the conversation thread coherent and progressively refined.",
    tips: [
      "Summarise prior context when re-engaging after a long break in the conversation.",
      "Use explicit references like 'Refine the code from your last response' instead of vague 'fix it'.",
      "Break large tasks into sequential turns: outline first, then draft, then polish.",
      "Avoid repeating the full system prompt in every turn; rely on conversation memory.",
      "End turns with a clear next step so the model knows what to produce next.",
    ],
    difficulty: "Intermediate",
    icon: "MessagesSquare",
  },
  {
    id: "role-prompting",
    title: "Role-Based Prompting",
    category: "Prompting",
    description:
      "Assign the model a specific role or persona to anchor its responses in domain expertise. This improves relevance, tone, and depth for specialised tasks.",
    tips: [
      "Start with 'You are a senior [role] with 10 years of experience in [domain].'",
      "Define the role's constraints, e.g., 'You only recommend solutions that are SOC-2 compliant.'",
      "Combine roles: 'Act as both a code reviewer and a security auditor.'",
      "Use role prompting for consistent voice in content generation tasks.",
    ],
    difficulty: "Intermediate",
    icon: "UserCog",
  },

  // ── Advanced Techniques ────────────────────────────────────────────────
  {
    id: "few-shot-prompting",
    title: "Few-Shot Prompting",
    category: "Advanced Techniques",
    description:
      "Provide two or three input-output examples in your prompt so the model learns the desired format and reasoning pattern before handling the real request.",
    tips: [
      "Include 2-3 diverse examples that cover edge cases.",
      "Keep examples consistent in format so the model can extrapolate the pattern.",
      "Place examples before the actual task, not after.",
      "Label examples clearly: 'Example 1: Input: ... Output: ...'",
    ],
    difficulty: "Intermediate",
    icon: "ListChecks",
  },
  {
    id: "xml-structured-prompts",
    title: "XML Tags for Structured Prompts",
    category: "Advanced Techniques",
    description:
      "Use XML-style tags like <context>, <instructions>, and <data> to separate different parts of a prompt. This helps the model parse complex inputs accurately.",
    tips: [
      "Wrap context in <context>...</context> and instructions in <instructions>...</instructions>.",
      "Use <example> tags to delineate few-shot examples from the actual request.",
      "Nest tags for hierarchy: <data><row>...</row></data>.",
      "Ask the model to output using matching tags for structured responses.",
    ],
    difficulty: "Intermediate",
    icon: "Code2",
  },
  {
    id: "parallel-tool-execution",
    title: "Parallel Tool Execution",
    category: "Advanced Techniques",
    description:
      "When using tool-use or function-calling APIs, design independent tool calls that can run in parallel rather than sequentially, dramatically reducing total latency.",
    tips: [
      "Identify which tool calls have no data dependencies on each other.",
      "Batch independent API calls into a single request when the platform supports it.",
      "Use promise-based concurrency patterns (Promise.all) in your orchestration layer.",
      "Always include fallback logic for partial failures in parallel execution.",
      "Monitor and log individual tool call durations to find bottlenecks.",
    ],
    difficulty: "Advanced",
    icon: "Zap",
  },
  {
    id: "system-prompt-engineering",
    title: "System Prompt Engineering",
    category: "Advanced Techniques",
    description:
      "Craft robust system prompts that define model behaviour, constraints, and output expectations. A well-designed system prompt is the foundation of reliable AI applications.",
    tips: [
      "Define the model's role, allowed actions, and prohibited behaviours clearly.",
      "Include output format specifications and example responses in the system prompt.",
      "Version-control your system prompts alongside application code.",
      "Test system prompts against adversarial inputs before deploying to production.",
      "Keep system prompts concise -- overly long prompts can dilute key instructions.",
    ],
    difficulty: "Advanced",
    icon: "Settings",
  },

  // ── Security ───────────────────────────────────────────────────────────
  {
    id: "prompt-injection-prevention",
    title: "Prompt Injection Prevention",
    category: "Security",
    description:
      "Protect your AI applications from prompt injection attacks where malicious user input attempts to override system instructions or extract sensitive data.",
    tips: [
      "Separate user input from system instructions using clear delimiters or XML tags.",
      "Implement input sanitisation that strips suspicious instruction-like patterns.",
      "Use a secondary classifier model to detect injection attempts before processing.",
      "Never place untrusted user input before your system prompt.",
      "Regularly red-team your prompts with known injection techniques.",
    ],
    difficulty: "Advanced",
    icon: "ShieldAlert",
  },
  {
    id: "pii-handling",
    title: "PII and Sensitive Data Handling",
    category: "Security",
    description:
      "Never include Personally Identifiable Information (PII) such as SSNs, home addresses, or financial details in prompts. Use anonymised identifiers and synthetic data instead.",
    tips: [
      "Replace real names and IDs with anonymised tokens (e.g., User_A, Account_12345).",
      "Use regex-based PII detection to scan prompts before sending them to the API.",
      "Create synthetic test datasets that mirror production data patterns without real PII.",
      "Implement DLP (Data Loss Prevention) policies at the gateway layer.",
    ],
    difficulty: "Beginner",
    icon: "Lock",
  },
  {
    id: "output-validation",
    title: "Output Validation and Filtering",
    category: "Security",
    description:
      "Validate and filter model outputs before presenting them to users or feeding them into downstream systems. Prevent hallucinated data, harmful content, or malformed responses from causing damage.",
    tips: [
      "Parse structured outputs (JSON, code) with schema validators before using them.",
      "Implement content moderation filters on generated text before display.",
      "Use assertion checks on numerical outputs to catch obviously wrong values.",
      "Log and flag outputs that fail validation for human review.",
    ],
    difficulty: "Intermediate",
    icon: "ShieldCheck",
  },
  {
    id: "access-control",
    title: "Role-Based Access Control for AI",
    category: "Security",
    description:
      "Implement granular RBAC to control which users, teams, or applications can access specific models, tools, and data sources through your AI platform.",
    tips: [
      "Map existing organisational roles to AI platform permissions.",
      "Restrict tool-use capabilities based on user role (e.g., only admins can execute code).",
      "Audit access logs monthly to identify unused or over-provisioned permissions.",
      "Implement least-privilege defaults -- users should opt in to elevated access.",
    ],
    difficulty: "Advanced",
    icon: "KeyRound",
  },

  // ── Workflow ────────────────────────────────────────────────────────────
  {
    id: "iterative-refinement",
    title: "Iterative Refinement Workflow",
    category: "Workflow",
    description:
      "Treat AI outputs as first drafts rather than final products. Use a structured feedback loop -- draft, review, refine -- to converge on high-quality results.",
    tips: [
      "Start with a broad request, then narrow with specific follow-up instructions.",
      "Provide concrete feedback: 'Make the intro shorter' rather than 'improve it'.",
      "Save effective prompt-response pairs as templates for future use.",
      "Limit refinement to 3-4 iterations; if it is not converging, restructure the prompt.",
    ],
    difficulty: "Beginner",
    icon: "RefreshCw",
  },
  {
    id: "prompt-versioning",
    title: "Prompt Version Control",
    category: "Workflow",
    description:
      "Track and version your prompts just like code. This enables rollback, A/B testing, and audit trails for production AI systems.",
    tips: [
      "Store prompts in a version-controlled repository alongside your application code.",
      "Tag prompt versions with semantic versioning (v1.0.0, v1.1.0).",
      "Include changelogs that explain why prompt wording was modified.",
      "Run regression tests when updating prompts to catch quality regressions.",
      "Use environment variables to swap prompt versions between staging and production.",
    ],
    difficulty: "Intermediate",
    icon: "GitBranch",
  },
  {
    id: "batch-processing",
    title: "Batch Processing Strategies",
    category: "Workflow",
    description:
      "Process large volumes of data efficiently by batching requests, managing rate limits, and implementing retry logic with exponential backoff.",
    tips: [
      "Group similar requests into batches to maximise throughput.",
      "Implement exponential backoff with jitter for rate-limit retries.",
      "Use async processing queues for non-time-sensitive batch jobs.",
      "Monitor cost per batch and set budget alerts to avoid surprises.",
    ],
    difficulty: "Advanced",
    icon: "Layers",
  },
  {
    id: "evaluation-framework",
    title: "Output Evaluation Framework",
    category: "Workflow",
    description:
      "Establish systematic evaluation criteria to measure AI output quality. Use both automated metrics and human review to maintain consistent standards.",
    tips: [
      "Define evaluation rubrics with clear pass/fail criteria for each use case.",
      "Automate evaluation with scoring scripts that check format, accuracy, and tone.",
      "Collect human ratings on a representative sample of outputs weekly.",
      "Track quality metrics over time to detect model degradation early.",
    ],
    difficulty: "Intermediate",
    icon: "ClipboardCheck",
  },

  // ── Troubleshooting ────────────────────────────────────────────────────
  {
    id: "hallucination-detection",
    title: "Detecting and Mitigating Hallucinations",
    category: "Troubleshooting",
    description:
      "Identify when the model generates plausible-sounding but incorrect information. Implement verification strategies to catch hallucinations before they reach end users.",
    tips: [
      "Ask the model to cite sources; if it cannot, treat the claim as unverified.",
      "Cross-reference generated facts against a known-good knowledge base.",
      "Use the 'Are you sure?' follow-up technique to prompt self-correction.",
      "Enable web search when factual accuracy is critical.",
      "Add disclaimers to outputs that involve factual claims.",
    ],
    difficulty: "Beginner",
    icon: "AlertTriangle",
  },
  {
    id: "context-window-management",
    title: "Context Window Management",
    category: "Troubleshooting",
    description:
      "Handle situations where conversations or documents exceed the model's context window. Use summarisation, chunking, and retrieval strategies to maintain quality.",
    tips: [
      "Monitor token usage and warn users when approaching context limits.",
      "Summarise earlier conversation turns to free up context space.",
      "Chunk large documents and process them with a map-reduce pattern.",
      "Use RAG (Retrieval-Augmented Generation) to bring in only relevant context.",
    ],
    difficulty: "Intermediate",
    icon: "Maximize2",
  },
  {
    id: "debugging-unexpected-outputs",
    title: "Debugging Unexpected Model Outputs",
    category: "Troubleshooting",
    description:
      "Systematically diagnose why the model produces off-target responses. Use isolation techniques to identify whether the issue is in the prompt, context, or model behaviour.",
    tips: [
      "Simplify the prompt to its minimal form and test if the issue persists.",
      "Check for conflicting instructions within the system prompt.",
      "Test with a different model to determine if the issue is model-specific.",
      "Log the full request payload (prompt + parameters) for reproducibility.",
      "Adjust temperature and top-p settings to reduce randomness during debugging.",
    ],
    difficulty: "Advanced",
    icon: "Bug",
  },

  // ── Collaboration ──────────────────────────────────────────────────────
  {
    id: "team-workspace-org",
    title: "Team Workspace Organization",
    category: "Collaboration",
    description:
      "Structure shared AI workspaces so teams can discover, reuse, and build on each other's prompts, workflows, and configurations without duplication.",
    tips: [
      "Create a shared prompt library organised by department and use case.",
      "Establish naming conventions for projects, prompts, and saved conversations.",
      "Designate workspace admins who curate and maintain shared resources.",
      "Archive outdated prompts and workflows quarterly to reduce clutter.",
    ],
    difficulty: "Beginner",
    icon: "FolderOpen",
  },
  {
    id: "prompt-review-process",
    title: "Prompt Review and Approval Process",
    category: "Collaboration",
    description:
      "Implement a peer review workflow for production prompts, similar to code review. This catches errors, improves quality, and shares knowledge across the team.",
    tips: [
      "Require at least one peer review before deploying prompt changes to production.",
      "Use pull request templates that include prompt diff, test results, and rationale.",
      "Rotate reviewers across teams to cross-pollinate best practices.",
      "Document common review feedback patterns in a team style guide.",
    ],
    difficulty: "Intermediate",
    icon: "GitPullRequest",
  },
  {
    id: "knowledge-sharing",
    title: "AI Knowledge Sharing Sessions",
    category: "Collaboration",
    description:
      "Run regular knowledge-sharing sessions where team members demo effective prompt patterns, share lessons learned, and discuss new AI capabilities relevant to their work.",
    tips: [
      "Schedule bi-weekly 'prompt show-and-tell' sessions (30 minutes max).",
      "Maintain a shared document of discovered tips and tricks.",
      "Invite guest speakers from other departments to share cross-functional use cases.",
      "Record sessions and add them to your team's knowledge base.",
      "Create a Slack channel dedicated to sharing AI wins and learnings.",
    ],
    difficulty: "Beginner",
    icon: "Users",
  },
  {
    id: "cross-functional-workflows",
    title: "Cross-Functional AI Workflows",
    category: "Collaboration",
    description:
      "Design AI workflows that span multiple teams -- for example, marketing drafts content, legal reviews compliance, and engineering automates distribution -- all through a unified platform.",
    tips: [
      "Map out the full workflow before building, identifying hand-off points between teams.",
      "Use shared templates that enforce consistent formatting across teams.",
      "Implement approval gates at each hand-off point with clear ownership.",
      "Track end-to-end cycle time to identify bottlenecks in the workflow.",
    ],
    difficulty: "Advanced",
    icon: "Workflow",
  },
];
