import type { Ecosystem, EcosystemType, SpecialtyType } from "@shared/schema";

export const ecosystems: Ecosystem[] = [
  {
    id: "anthropic",
    name: "Anthropic / Claude",
    description: "Constitutional AI with industry-leading safety, reasoning, and coding capabilities.",
    logoColor: "#D97706",
    platformIds: ["claude-sonnet", "claude-opus", "anthropic-api", "aws-bedrock"]
  },
  {
    id: "openai",
    name: "OpenAI",
    description: "The most widely adopted AI ecosystem with ChatGPT, GPT-4, and extensive enterprise features.",
    logoColor: "#10A37F",
    platformIds: ["chatgpt-enterprise", "openai-api", "azure-openai", "chatgpt-plus", "gpt-store"]
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

export const specialtyLabels: Record<SpecialtyType, string> = {
  "coding": "Coding & Development",
  "content": "Content Creation",
  "automation": "Workflow Automation",
  "enterprise-search": "Enterprise Search",
  "analytics": "Analytics & BI",
  "agents": "AI Agents",
  "multimodal": "Multimodal",
  "voice": "Voice & Audio",
  "security": "Security & Compliance",
  "workflow": "Workflow Orchestration",
  "integration": "API Integration",
  "data-science": "Data Science",
  "conversational": "Conversational AI",
  "it-service": "IT Service Management"
};

export const ecosystemLabels: Record<EcosystemType, string> = {
  "anthropic": "Anthropic",
  "openai": "OpenAI",
  "microsoft": "Microsoft",
  "google": "Google",
  "automation": "Automation",
  "langchain": "LangChain",
  "open-source": "Open Source",
  "independent": "Independent"
};

export function getEcosystemById(id: EcosystemType): Ecosystem | undefined {
  return ecosystems.find(e => e.id === id);
}

export function getEcosystemsForPlatform(platformId: string): Ecosystem[] {
  return ecosystems.filter(e => e.platformIds.includes(platformId));
}

export function getPlatformIdsByEcosystem(ecosystemId: EcosystemType): string[] {
  const ecosystem = getEcosystemById(ecosystemId);
  return ecosystem?.platformIds || [];
}
