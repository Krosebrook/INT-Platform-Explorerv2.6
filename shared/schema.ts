// Re-export auth models (users and sessions tables for Replit Auth)
export * from "./models/auth";

export interface PlatformCapabilities {
  codeGeneration: number;
  reasoning: number;
  languageUnderstanding: number;
  multimodal: number;
  toolUse: number;
  speed: number;
  costEfficiency: number;
  enterpriseFeatures: number;
  developerExperience: number;
  documentation: number;
  vision: number;
  audio: number;
  functionCalling: number;
  jsonReliability: number;
  dataPrivacy: number;
  onPremOption: number;
  slaAvailability: number;
  contextRecall: number;
  timeToFirstToken: number;
  tokensPerSecond: number;
}

export type EcosystemType = "anthropic" | "openai" | "microsoft" | "google" | "automation" | "langchain" | "open-source" | "independent";
export type SpecialtyType = "coding" | "content" | "automation" | "enterprise-search" | "analytics" | "agents" | "multimodal" | "voice" | "security" | "workflow" | "integration" | "data-science" | "conversational" | "it-service";

export interface Platform {
  id: string;
  name: string;
  category: "Foundation" | "Specialized" | "Enterprise" | "Developer" | "Productivity" | "Automation";
  priority: "Tier 1" | "Tier 2" | "Tier 3";
  verdict: string;
  marketShare: string;
  pricing: string;
  contextWindow: string;
  compliance: string[];
  targetUsers: string;
  capabilities: PlatformCapabilities;
  logoColor: string;
  ecosystem?: EcosystemType;
  specialties?: SpecialtyType[];
  compatibility?: string[];
}

export interface Ecosystem {
  id: EcosystemType;
  name: string;
  description: string;
  logoColor: string;
  platformIds: string[];
}

export interface ROIInputs {
  employees: number;
  averageSalary: number;
  adoptionPercentage: number;
  weeklyProductivityGain: number;
  annualPlatformCost: number;
  trainingCost: number;
}

export interface ROIResults {
  annualProductivityValue: number;
  annualTotalCost: number;
  netBenefit: number;
  roiPercentage: number;
  paybackPeriodMonths: number;
}

export interface StrategyTier {
  tier: number;
  name: string;
  description: string;
  platforms: string[];
  rationale: string;
}
