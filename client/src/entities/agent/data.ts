// FILE: client/src/entities/agent/data.ts

import type { AgentTemplate } from "./model";

export const AGENT_TEMPLATES: AgentTemplate[] = [
  {
    id: "agent-customer-support",
    name: "Customer Support Agent",
    description:
      "Handles customer inquiries, resolves tickets, and escalates complex issues to human agents. Trained on internal knowledge base for accurate, empathetic responses.",
    model: "gpt-4o",
    temperature: 0.3,
    systemPrompt:
      "You are a professional customer support agent for INT Inc. Respond to customer inquiries with empathy and accuracy. Use the knowledge base to find answers. If unsure, escalate to a human agent. Never fabricate information. Always confirm resolution with the customer before closing a ticket.",
    tools: ["knowledge-base", "ticket-create"],
    category: "Support",
  },
  {
    id: "agent-code-review",
    name: "Code Review Agent",
    description:
      "Performs automated code reviews on pull requests. Analyzes code quality, identifies security vulnerabilities, checks for best-practice violations, and suggests improvements.",
    model: "claude-3-opus",
    temperature: 0.2,
    systemPrompt:
      "You are a senior software engineer performing code review. Analyze the code for security vulnerabilities (OWASP Top 10), performance issues, maintainability concerns, and adherence to coding standards. Provide severity-rated findings (critical, high, medium, low) with specific line references and suggested fixes. Be constructive, not critical.",
    tools: ["github-pr", "code-analysis"],
    category: "Engineering",
  },
  {
    id: "agent-data-analysis",
    name: "Data Analysis Agent",
    description:
      "Queries databases, generates statistical summaries, and creates data visualizations. Supports exploratory data analysis and automated report generation.",
    model: "gpt-4o",
    temperature: 0.4,
    systemPrompt:
      "You are a data analyst. When given a question, write SQL queries to extract relevant data, perform statistical analysis, and generate clear visualizations. Summarize key insights in plain language. Always validate data quality before drawing conclusions. Flag any anomalies or data gaps.",
    tools: ["sql-query", "chart-gen"],
    category: "Analytics",
  },
  {
    id: "agent-content-writer",
    name: "Content Writer Agent",
    description:
      "Produces high-quality written content including blog posts, case studies, email campaigns, and documentation. Adheres to brand voice guidelines and performs web research.",
    model: "claude-3-sonnet",
    temperature: 0.7,
    systemPrompt:
      "You are a professional content writer for INT Inc. Produce engaging, well-structured content that follows our brand voice: professional yet approachable. Research topics thoroughly using web search. Cite sources. Avoid jargon unless writing for a technical audience. Include clear calls-to-action where appropriate.",
    tools: ["web-search", "document-edit"],
    category: "Marketing",
  },
  {
    id: "agent-sales-assistant",
    name: "Sales Assistant Agent",
    description:
      "Assists the sales team with CRM lookups, lead qualification, proposal drafting, and competitive intelligence. Streamlines pipeline management workflows.",
    model: "gpt-4o",
    temperature: 0.5,
    systemPrompt:
      "You are a sales operations assistant. Help the sales team by looking up CRM records, qualifying leads using the MEDDIC framework, drafting personalized outreach emails, and summarizing deal status. Never disclose internal pricing to external parties. Always anonymize customer data in analysis outputs.",
    tools: ["crm-lookup", "email-draft"],
    category: "Sales",
  },
  {
    id: "agent-it-helpdesk",
    name: "IT Helpdesk Agent",
    description:
      "First-line IT support that diagnoses common issues, creates tickets, searches the knowledge base for solutions, and can initiate remote access sessions for deeper troubleshooting.",
    model: "claude-3-haiku",
    temperature: 0.2,
    systemPrompt:
      "You are an IT helpdesk support agent. Diagnose technical issues step-by-step. Search the knowledge base for known solutions before escalating. Create tickets with detailed reproduction steps. For remote access, always obtain explicit user consent first. Prioritize security -- never ask for or store passwords.",
    tools: ["ticket-create", "knowledge-base", "remote-access"],
    category: "IT",
  },
  {
    id: "agent-security-analyst",
    name: "Security Analyst Agent",
    description:
      "Monitors security events, analyzes threat intelligence, reviews access logs, and generates incident reports. Enforces compliance with security policies.",
    model: "claude-3-opus",
    temperature: 0.1,
    systemPrompt:
      "You are a cybersecurity analyst. Monitor and analyze security events for indicators of compromise. Cross-reference findings with threat intelligence feeds. Generate detailed incident reports with timeline, impact assessment, and remediation steps. Follow the NIST incident response framework. Escalate critical findings immediately.",
    tools: ["siem-query", "threat-intel", "access-logs"],
    category: "Security",
  },
  {
    id: "agent-project-manager",
    name: "Project Manager Agent",
    description:
      "Tracks project milestones, generates status reports, identifies blockers, and facilitates team coordination through automated summaries and action items.",
    model: "gpt-4o",
    temperature: 0.4,
    systemPrompt:
      "You are a project management assistant. Track milestones, deadlines, and dependencies. Generate weekly status reports highlighting progress, blockers, and risks. Create action items with clear owners and due dates. Facilitate cross-team coordination by summarizing relevant updates. Use the RACI framework for responsibility assignments.",
    tools: ["task-tracker", "calendar-api", "email-draft"],
    category: "Operations",
  },
];

export const AVAILABLE_TOOLS: {
  id: string;
  name: string;
  description: string;
  category: string;
}[] = [
  {
    id: "knowledge-base",
    name: "Knowledge Base",
    description: "Search and retrieve articles from the internal knowledge base",
    category: "Data",
  },
  {
    id: "ticket-create",
    name: "Ticket Creator",
    description: "Create, update, and manage support and IT tickets",
    category: "Workflow",
  },
  {
    id: "github-pr",
    name: "GitHub PR Review",
    description: "Access pull request diffs, comments, and review status",
    category: "Engineering",
  },
  {
    id: "code-analysis",
    name: "Code Analysis",
    description: "Static analysis, linting, and security scanning of code",
    category: "Engineering",
  },
  {
    id: "sql-query",
    name: "SQL Query Runner",
    description: "Execute read-only SQL queries against approved databases",
    category: "Data",
  },
  {
    id: "chart-gen",
    name: "Chart Generator",
    description: "Generate charts and visualizations from data sets",
    category: "Analytics",
  },
  {
    id: "web-search",
    name: "Web Search",
    description: "Search the public web for current information and research",
    category: "Research",
  },
  {
    id: "document-edit",
    name: "Document Editor",
    description: "Create and edit documents, articles, and reports",
    category: "Content",
  },
  {
    id: "crm-lookup",
    name: "CRM Lookup",
    description: "Search and retrieve records from the CRM system",
    category: "Sales",
  },
  {
    id: "email-draft",
    name: "Email Drafter",
    description: "Compose and format email drafts for review before sending",
    category: "Communication",
  },
  {
    id: "remote-access",
    name: "Remote Access",
    description: "Initiate secure remote desktop sessions for troubleshooting",
    category: "IT",
  },
  {
    id: "siem-query",
    name: "SIEM Query",
    description: "Query security event logs and threat detection systems",
    category: "Security",
  },
  {
    id: "threat-intel",
    name: "Threat Intelligence",
    description: "Access threat intelligence feeds and IOC databases",
    category: "Security",
  },
  {
    id: "access-logs",
    name: "Access Log Viewer",
    description: "Review user access logs and authentication events",
    category: "Security",
  },
  {
    id: "task-tracker",
    name: "Task Tracker",
    description: "Create, assign, and track tasks across project boards",
    category: "Workflow",
  },
  {
    id: "calendar-api",
    name: "Calendar API",
    description: "Read and manage calendar events and meeting schedules",
    category: "Communication",
  },
];

export const AVAILABLE_MODELS: {
  id: string;
  name: string;
  provider: string;
}[] = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI" },
  { id: "claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic" },
  { id: "claude-3-sonnet", name: "Claude 3.5 Sonnet", provider: "Anthropic" },
  { id: "claude-3-haiku", name: "Claude 3 Haiku", provider: "Anthropic" },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", provider: "Google" },
  { id: "llama-3.1-70b", name: "Llama 3.1 70B", provider: "Meta" },
];
