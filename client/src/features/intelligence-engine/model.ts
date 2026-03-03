import { useState, useMemo, useCallback } from "react";
import type { Platform, PlatformCapabilities, SpecialtyType } from "@shared/schema";
import { platforms } from "@/entities/platform/data";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Department =
  | "sales"
  | "marketing"
  | "customer_service"
  | "it"
  | "legal"
  | "hr"
  | "finance"
  | "strategy"
  | "r_and_d"
  | "operations";

export interface DepartmentOption {
  value: Department;
  label: string;
  description: string;
  icon: string;
}

export const DEPARTMENTS: DepartmentOption[] = [
  { value: "sales", label: "Sales & Business Development", description: "CRM, outreach, deal management", icon: "TrendingUp" },
  { value: "marketing", label: "Marketing & Creative", description: "Content creation, campaigns, analytics", icon: "Megaphone" },
  { value: "customer_service", label: "Customer Service & Support", description: "Ticketing, chat, multilingual support", icon: "Headphones" },
  { value: "it", label: "IT & DevOps", description: "Code generation, infrastructure, security", icon: "Code" },
  { value: "legal", label: "Legal & Compliance", description: "Contract review, audit, risk analysis", icon: "Shield" },
  { value: "hr", label: "Human Resources", description: "Recruiting, onboarding, policy drafting", icon: "Users" },
  { value: "finance", label: "Finance & Accounting", description: "Forecasting, reporting, reconciliation", icon: "Calculator" },
  { value: "strategy", label: "Strategy & Leadership", description: "Market research, executive briefings", icon: "Target" },
  { value: "r_and_d", label: "R&D / Product", description: "Prototyping, research synthesis, specs", icon: "FlaskConical" },
  { value: "operations", label: "Operations", description: "Workflow automation, process optimization", icon: "Settings" },
];

export type Capability =
  | "code_generation"
  | "content_creation"
  | "data_analysis"
  | "customer_support"
  | "research"
  | "automation"
  | "multimodal"
  | "compliance"
  | "integration";

export interface CapabilityOption {
  value: Capability;
  label: string;
  description: string;
}

export const CAPABILITIES: CapabilityOption[] = [
  { value: "code_generation", label: "Code Generation", description: "Writing, reviewing, and debugging code" },
  { value: "content_creation", label: "Content Creation", description: "Marketing copy, reports, documentation" },
  { value: "data_analysis", label: "Data Analysis", description: "Insights from structured and unstructured data" },
  { value: "customer_support", label: "Customer Support", description: "Chatbots, ticket routing, self-service" },
  { value: "research", label: "Deep Research", description: "Synthesize information from multiple sources" },
  { value: "automation", label: "Workflow Automation", description: "Automate repetitive business processes" },
  { value: "multimodal", label: "Multimodal (Vision/Audio)", description: "Image, video, and audio processing" },
  { value: "compliance", label: "Compliance & Audit", description: "Risk assessment, contract review, regulatory" },
  { value: "integration", label: "System Integration", description: "Connect to existing enterprise tooling" },
];

export type BudgetRange = "under_10" | "10_to_30" | "30_to_60" | "60_plus";

export interface BudgetOption {
  value: BudgetRange;
  label: string;
  description: string;
  maxPerUser: number;
}

export const BUDGET_RANGES: BudgetOption[] = [
  { value: "under_10", label: "Under $10/user/mo", description: "Free tiers and budget options", maxPerUser: 10 },
  { value: "10_to_30", label: "$10 - $30/user/mo", description: "Standard enterprise pricing", maxPerUser: 30 },
  { value: "30_to_60", label: "$30 - $60/user/mo", description: "Premium tier with advanced features", maxPerUser: 60 },
  { value: "60_plus", label: "$60+/user/mo", description: "Enterprise-grade, full capabilities", maxPerUser: Infinity },
];

export type TeamSize = "small" | "medium" | "large" | "enterprise";

export interface TeamSizeOption {
  value: TeamSize;
  label: string;
  range: string;
  numericMid: number;
}

export const TEAM_SIZES: TeamSizeOption[] = [
  { value: "small", label: "Small Team", range: "1 - 10 users", numericMid: 5 },
  { value: "medium", label: "Medium Team", range: "11 - 50 users", numericMid: 30 },
  { value: "large", label: "Large Team", range: "51 - 200 users", numericMid: 125 },
  { value: "enterprise", label: "Enterprise", range: "200+ users", numericMid: 500 },
];

export type WizardStep = 1 | 2 | 3 | 4 | 5;

export interface WizardState {
  currentStep: WizardStep;
  department: Department | null;
  capabilities: Capability[];
  budget: BudgetRange | null;
  teamSize: TeamSize | null;
  results: RecommendationResult[] | null;
}

export interface RecommendationResult {
  platform: Platform;
  overallScore: number;
  departmentFit: number;
  capabilityFit: number;
  budgetFit: number;
  teamFit: number;
  strengths: string[];
  considerations: string[];
}

// ─── Scoring Engine ───────────────────────────────────────────────────────────

const CAPABILITY_KEY_MAP: Record<Capability, (keyof PlatformCapabilities)[]> = {
  code_generation: ["codeGeneration", "developerExperience"],
  content_creation: ["languageUnderstanding", "documentation"],
  data_analysis: ["reasoning", "contextRecall"],
  customer_support: ["languageUnderstanding", "speed", "functionCalling"],
  research: ["reasoning", "contextRecall", "languageUnderstanding"],
  automation: ["toolUse", "functionCalling"],
  multimodal: ["multimodal", "vision", "audio"],
  compliance: ["dataPrivacy", "enterpriseFeatures", "slaAvailability"],
  integration: ["toolUse", "functionCalling", "jsonReliability"],
};

const DEPARTMENT_SPECIALTY_MAP: Record<Department, SpecialtyType[]> = {
  sales: ["content", "analytics", "integration"],
  marketing: ["content", "multimodal", "analytics"],
  customer_service: ["conversational", "voice", "automation"],
  it: ["coding", "agents", "security"],
  legal: ["content", "security", "analytics"],
  hr: ["content", "conversational"],
  finance: ["analytics", "automation", "integration"],
  strategy: ["analytics", "content"],
  r_and_d: ["coding", "data-science", "agents"],
  operations: ["automation", "workflow", "integration"],
};

const DEPARTMENT_CAPABILITY_BOOST: Record<Department, (keyof PlatformCapabilities)[]> = {
  sales: ["languageUnderstanding", "functionCalling"],
  marketing: ["languageUnderstanding", "multimodal"],
  customer_service: ["speed", "languageUnderstanding"],
  it: ["codeGeneration", "developerExperience", "toolUse"],
  legal: ["reasoning", "contextRecall", "dataPrivacy"],
  hr: ["languageUnderstanding", "documentation"],
  finance: ["reasoning", "dataPrivacy", "enterpriseFeatures"],
  strategy: ["reasoning", "contextRecall"],
  r_and_d: ["codeGeneration", "reasoning", "toolUse"],
  operations: ["toolUse", "functionCalling", "speed"],
};

function parsePricingNumber(pricing: string): number {
  const match = pricing.match(/\$(\d+(?:\.\d+)?)/);
  if (match) return parseFloat(match[1]);
  if (pricing.toLowerCase().includes("free")) return 0;
  if (pricing.toLowerCase().includes("variable") || pricing.toLowerCase().includes("enterprise")) return 50;
  return 25;
}

function scoreDepartmentFit(platform: Platform, department: Department): number {
  let score = 50;
  const targetSpecialties = DEPARTMENT_SPECIALTY_MAP[department];
  const platformSpecialties = platform.specialties ?? [];
  const overlap = platformSpecialties.filter((s) => targetSpecialties.includes(s)).length;
  score += overlap * 12;

  const boostKeys = DEPARTMENT_CAPABILITY_BOOST[department];
  const boostAvg = boostKeys.reduce((sum, key) => sum + platform.capabilities[key], 0) / boostKeys.length;
  score += boostAvg * 2;

  return Math.min(100, Math.round(score));
}

function scoreCapabilityFit(platform: Platform, selectedCapabilities: Capability[]): number {
  if (selectedCapabilities.length === 0) return 50;
  let totalScore = 0;
  for (const cap of selectedCapabilities) {
    const keys = CAPABILITY_KEY_MAP[cap];
    const avg = keys.reduce((sum, key) => sum + platform.capabilities[key], 0) / keys.length;
    totalScore += (avg / 10) * 100;
  }
  return Math.min(100, Math.round(totalScore / selectedCapabilities.length));
}

function scoreBudgetFit(platform: Platform, budget: BudgetRange): number {
  const price = parsePricingNumber(platform.pricing);
  const budgetOption = BUDGET_RANGES.find((b) => b.value === budget);
  if (!budgetOption) return 50;
  if (price <= budgetOption.maxPerUser) return 100;
  const overshoot = price - budgetOption.maxPerUser;
  const penalty = Math.min(60, overshoot * 2);
  return Math.max(20, Math.round(100 - penalty));
}

function scoreTeamFit(platform: Platform, teamSize: TeamSize): number {
  const caps = platform.capabilities;
  switch (teamSize) {
    case "small":
      return Math.min(100, Math.round(50 + caps.costEfficiency * 3 + caps.developerExperience * 2));
    case "medium":
      return Math.min(100, Math.round(50 + caps.enterpriseFeatures * 2 + caps.documentation * 2 + caps.costEfficiency));
    case "large":
      return Math.min(100, Math.round(40 + caps.enterpriseFeatures * 3 + caps.slaAvailability * 2 + caps.dataPrivacy));
    case "enterprise":
      return Math.min(100, Math.round(30 + caps.enterpriseFeatures * 3 + caps.slaAvailability * 2 + caps.dataPrivacy * 1.5 + caps.onPremOption));
    default:
      return 50;
  }
}

function generateStrengths(platform: Platform, department: Department, capabilities: Capability[]): string[] {
  const strengths: string[] = [];
  const caps = platform.capabilities;
  if (caps.codeGeneration >= 9) strengths.push("Top-tier code generation capabilities");
  if (caps.reasoning >= 9) strengths.push("Exceptional reasoning and analysis");
  if (caps.dataPrivacy >= 9) strengths.push("Industry-leading data privacy controls");
  if (caps.enterpriseFeatures >= 9) strengths.push("Full enterprise feature suite");
  if (caps.speed >= 9) strengths.push("Extremely fast response times");
  if (caps.multimodal >= 8 && capabilities.includes("multimodal")) strengths.push("Strong multimodal processing");

  const specialties = platform.specialties ?? [];
  const targetSpecialties = DEPARTMENT_SPECIALTY_MAP[department];
  const matched = specialties.filter((s) => targetSpecialties.includes(s));
  if (matched.length >= 2) {
    strengths.push(`Strong specialty alignment with ${DEPARTMENTS.find((d) => d.value === department)?.label}`);
  }
  if (platform.compliance.length >= 3) strengths.push(`${platform.compliance.length} compliance certifications`);
  if (platform.priority === "Tier 1") strengths.push("Tier 1 strategic priority platform");
  return strengths.slice(0, 4);
}

function generateConsiderations(platform: Platform, budget: BudgetRange, teamSize: TeamSize): string[] {
  const considerations: string[] = [];
  const price = parsePricingNumber(platform.pricing);
  const budgetOption = BUDGET_RANGES.find((b) => b.value === budget);
  if (budgetOption && price > budgetOption.maxPerUser) {
    considerations.push(`Pricing (${platform.pricing}) may exceed target budget`);
  }
  if (teamSize === "enterprise" && platform.capabilities.onPremOption < 5) {
    considerations.push("Limited on-premise deployment options");
  }
  if (teamSize === "enterprise" && platform.capabilities.slaAvailability < 7) {
    considerations.push("SLA availability may not meet enterprise requirements");
  }
  if (platform.capabilities.dataPrivacy < 6) {
    considerations.push("Data privacy controls below enterprise standard");
  }
  if (platform.priority === "Tier 3") {
    considerations.push("Lower strategic priority -- evaluate carefully");
  }
  return considerations.slice(0, 3);
}

export function computeRecommendations(
  department: Department,
  capabilities: Capability[],
  budget: BudgetRange,
  teamSize: TeamSize
): RecommendationResult[] {
  return platforms
    .map((platform) => {
      const departmentFit = scoreDepartmentFit(platform, department);
      const capabilityFit = scoreCapabilityFit(platform, capabilities);
      const budgetFit = scoreBudgetFit(platform, budget);
      const teamFit = scoreTeamFit(platform, teamSize);
      const overallScore = Math.round(
        departmentFit * 0.25 + capabilityFit * 0.35 + budgetFit * 0.20 + teamFit * 0.20
      );
      return {
        platform,
        overallScore,
        departmentFit,
        capabilityFit,
        budgetFit,
        teamFit,
        strengths: generateStrengths(platform, department, capabilities),
        considerations: generateConsiderations(platform, budget, teamSize),
      };
    })
    .sort((a, b) => b.overallScore - a.overallScore);
}

// ─── Wizard Hook ──────────────────────────────────────────────────────────────

export interface UseIntelligenceWizardResult {
  state: WizardState;
  currentStep: WizardStep;
  goToStep: (step: WizardStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  restart: () => void;
  setDepartment: (dept: Department) => void;
  toggleCapability: (cap: Capability) => void;
  setBudget: (budget: BudgetRange) => void;
  setTeamSize: (size: TeamSize) => void;
  canProceed: boolean;
  stepProgress: number;
  totalSteps: number;
}

const INITIAL_STATE: WizardState = {
  currentStep: 1,
  department: null,
  capabilities: [],
  budget: null,
  teamSize: null,
  results: null,
};

export function useIntelligenceWizard(): UseIntelligenceWizardResult {
  const [state, setState] = useState<WizardState>(INITIAL_STATE);
  const totalSteps = 5;

  const canProceed = useMemo(() => {
    switch (state.currentStep) {
      case 1: return state.department !== null;
      case 2: return state.capabilities.length > 0;
      case 3: return state.budget !== null;
      case 4: return state.teamSize !== null;
      case 5: return true;
      default: return false;
    }
  }, [state.currentStep, state.department, state.capabilities, state.budget, state.teamSize]);

  const stepProgress = useMemo(() => Math.round((state.currentStep / totalSteps) * 100), [state.currentStep]);

  const setDepartment = useCallback((dept: Department) => {
    setState((prev) => ({ ...prev, department: dept }));
  }, []);

  const toggleCapability = useCallback((cap: Capability) => {
    setState((prev) => ({
      ...prev,
      capabilities: prev.capabilities.includes(cap)
        ? prev.capabilities.filter((c) => c !== cap)
        : [...prev.capabilities, cap],
    }));
  }, []);

  const setBudget = useCallback((budget: BudgetRange) => {
    setState((prev) => ({ ...prev, budget }));
  }, []);

  const setTeamSize = useCallback((size: TeamSize) => {
    setState((prev) => ({ ...prev, teamSize: size }));
  }, []);

  const goToStep = useCallback((step: WizardStep) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep === 4) {
        if (prev.department && prev.capabilities.length > 0 && prev.budget && prev.teamSize) {
          const results = computeRecommendations(prev.department, prev.capabilities, prev.budget, prev.teamSize);
          return { ...prev, currentStep: 5 as WizardStep, results };
        }
        return prev;
      }
      if (prev.currentStep < 5) {
        return { ...prev, currentStep: (prev.currentStep + 1) as WizardStep };
      }
      return prev;
    });
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep > 1) {
        return { ...prev, currentStep: (prev.currentStep - 1) as WizardStep };
      }
      return prev;
    });
  }, []);

  const restart = useCallback(() => { setState(INITIAL_STATE); }, []);

  return {
    state, currentStep: state.currentStep,
    goToStep, nextStep, prevStep, restart,
    setDepartment, toggleCapability, setBudget, setTeamSize,
    canProceed, stepProgress, totalSteps,
  };
}
