import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Progress } from "@/shared/ui/progress";
import {
  ArrowLeft, ArrowRight, Brain, Building2, CheckCircle, ChevronRight,
  CircleDollarSign, Code, FlaskConical, Headphones, Megaphone, RotateCcw,
  Settings, Shield, Sparkles, Target, TrendingUp, Trophy, Users,
  Calculator, AlertTriangle, Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type {
  Department, Capability, BudgetRange, TeamSize,
  RecommendationResult, UseIntelligenceWizardResult,
} from "./model";
import { DEPARTMENTS, CAPABILITIES, BUDGET_RANGES, TEAM_SIZES } from "./model";

const DEPARTMENT_ICONS: Record<string, LucideIcon> = {
  TrendingUp, Megaphone, Headphones, Code, Shield, Users, Calculator, Target, FlaskConical, Settings,
};

const STEP_LABELS = ["Department", "Capabilities", "Budget", "Team Size", "Results"];

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center justify-center gap-1 mb-8" data-testid="step-indicator">
      {STEP_LABELS.map((label, idx) => {
        const stepNum = idx + 1;
        const isActive = stepNum === currentStep;
        const isComplete = stepNum < currentStep;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${isComplete ? "bg-emerald-500 text-white" : ""} ${isActive ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25" : ""} ${!isActive && !isComplete ? "bg-muted text-muted-foreground" : ""}`}>
                {isComplete ? <CheckCircle className="w-5 h-5" /> : stepNum}
              </div>
              <span className={`text-xs mt-1.5 font-medium hidden sm:block ${isActive ? "text-amber-600" : isComplete ? "text-emerald-600" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>
            {idx < totalSteps - 1 && (
              <div className={`w-8 md:w-14 h-0.5 mx-1 transition-all ${isComplete ? "bg-emerald-500" : "bg-muted"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface DepartmentSelectProps { selected: Department | null; onSelect: (dept: Department) => void; }

export function DepartmentSelect({ selected, onSelect }: DepartmentSelectProps) {
  return (
    <div data-testid="step-department">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white mb-4">
          <Building2 className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Select Your Department</h2>
        <p className="text-muted-foreground mt-1">Choose the primary department this AI deployment will serve</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {DEPARTMENTS.map((dept) => {
          const isActive = selected === dept.value;
          const IconComponent = DEPARTMENT_ICONS[dept.icon] ?? Building2;
          return (
            <button key={dept.value} onClick={() => onSelect(dept.value)} data-testid={`dept-${dept.value}`}
              className={`group relative flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${isActive ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-md shadow-amber-500/10" : "border-border hover:border-amber-300 hover:bg-accent/50"}`}>
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${isActive ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground group-hover:bg-amber-100 group-hover:text-amber-600"}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{dept.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{dept.description}</div>
              </div>
              {isActive && <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface CapabilitySelectProps { selected: Capability[]; onToggle: (cap: Capability) => void; }

export function CapabilitySelect({ selected, onToggle }: CapabilitySelectProps) {
  return (
    <div data-testid="step-capabilities">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white mb-4">
          <Brain className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Required Capabilities</h2>
        <p className="text-muted-foreground mt-1">
          Select all AI capabilities your team needs
          <Badge variant="secondary" className="ml-2">{selected.length} selected</Badge>
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CAPABILITIES.map((cap) => {
          const isActive = selected.includes(cap.value);
          return (
            <button key={cap.value} onClick={() => onToggle(cap.value)} data-testid={`cap-${cap.value}`}
              className={`group relative flex flex-col p-4 rounded-xl border-2 text-left transition-all ${isActive ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-md shadow-amber-500/10" : "border-border hover:border-amber-300 hover:bg-accent/50"}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">{cap.label}</span>
                {isActive && <CheckCircle className="w-4 h-4 text-amber-500" />}
              </div>
              <span className="text-xs text-muted-foreground">{cap.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface BudgetInputProps { selected: BudgetRange | null; onSelect: (budget: BudgetRange) => void; }

export function BudgetInput({ selected, onSelect }: BudgetInputProps) {
  return (
    <div data-testid="step-budget">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white mb-4">
          <CircleDollarSign className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Budget Per User</h2>
        <p className="text-muted-foreground mt-1">What is your target monthly spend per user?</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {BUDGET_RANGES.map((range) => {
          const isActive = selected === range.value;
          return (
            <button key={range.value} onClick={() => onSelect(range.value)} data-testid={`budget-${range.value}`}
              className={`group relative flex flex-col items-center p-6 rounded-xl border-2 text-center transition-all ${isActive ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-md shadow-amber-500/10" : "border-border hover:border-amber-300 hover:bg-accent/50"}`}>
              {isActive && <CheckCircle className="absolute top-3 right-3 w-5 h-5 text-amber-500" />}
              <div className="text-2xl font-bold mb-1">{range.label}</div>
              <div className="text-xs text-muted-foreground">{range.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface TeamSizeInputProps { selected: TeamSize | null; onSelect: (size: TeamSize) => void; }

export function TeamSizeInput({ selected, onSelect }: TeamSizeInputProps) {
  return (
    <div data-testid="step-team-size">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white mb-4">
          <Users className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Team Size</h2>
        <p className="text-muted-foreground mt-1">How many users will be on this platform?</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {TEAM_SIZES.map((size) => {
          const isActive = selected === size.value;
          return (
            <button key={size.value} onClick={() => onSelect(size.value)} data-testid={`team-${size.value}`}
              className={`group relative flex flex-col items-center p-5 rounded-xl border-2 text-center transition-all ${isActive ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-md shadow-amber-500/10" : "border-border hover:border-amber-300 hover:bg-accent/50"}`}>
              {isActive && <CheckCircle className="absolute top-2 right-2 w-4 h-4 text-amber-500" />}
              <Users className={`w-8 h-8 mb-2 ${isActive ? "text-amber-500" : "text-muted-foreground group-hover:text-amber-400"}`} />
              <div className="font-semibold text-sm">{size.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{size.range}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-24 shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-semibold w-8 text-right">{value}</span>
    </div>
  );
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-500";
}

function getScoreBadgeVariant(score: number): "default" | "secondary" | "destructive" | "outline" {
  if (score >= 80) return "default";
  if (score >= 60) return "secondary";
  return "destructive";
}

interface ResultsViewProps { results: RecommendationResult[]; onRestart: () => void; }

export function ResultsView({ results, onRestart }: ResultsViewProps) {
  const topResults = results.slice(0, 5);
  const remaining = results.slice(5, 15);

  return (
    <div data-testid="step-results" className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white mb-4 shadow-lg shadow-amber-500/25">
          <Trophy className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Your Top Recommendations</h2>
        <p className="text-muted-foreground mt-1">Ranked from {results.length} platforms based on your requirements</p>
      </div>

      <div className="space-y-4">
        {topResults.map((rec, index) => (
          <Card key={rec.platform.id} data-testid={`result-${rec.platform.id}`}
            className={`overflow-hidden transition-all ${index === 0 ? "ring-2 ring-amber-500 shadow-lg shadow-amber-500/10" : ""}`}>
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 ${index === 0 ? "bg-gradient-to-br from-amber-500 to-orange-600 shadow-md shadow-amber-500/25" : index === 1 ? "bg-gradient-to-br from-slate-400 to-slate-500" : index === 2 ? "bg-gradient-to-br from-amber-700 to-amber-800" : "bg-muted text-muted-foreground"}`}>
                    #{index + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-lg truncate">{rec.platform.name}</h3>
                      <Badge variant="outline" className="shrink-0">{rec.platform.category}</Badge>
                      <Badge variant="secondary" className="shrink-0">{rec.platform.priority}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-0.5">{rec.platform.verdict}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Match</div>
                    <div className={`text-3xl font-bold ${getScoreColor(rec.overallScore)}`}>{rec.overallScore}%</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <ScoreBar label="Department" value={rec.departmentFit} color="bg-blue-500" />
                <ScoreBar label="Capabilities" value={rec.capabilityFit} color="bg-emerald-500" />
                <ScoreBar label="Budget" value={rec.budgetFit} color="bg-amber-500" />
                <ScoreBar label="Team Fit" value={rec.teamFit} color="bg-violet-500" />
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {rec.strengths.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Star className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Strengths</span>
                    </div>
                    <ul className="space-y-1">
                      {rec.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" /><span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {rec.considerations.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">Considerations</span>
                    </div>
                    <ul className="space-y-1">
                      {rec.considerations.map((c, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" /><span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="mt-4 pt-3 border-t flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span>Pricing: <span className="font-semibold text-foreground">{rec.platform.pricing}</span></span>
                <span>Context: <span className="font-semibold text-foreground">{rec.platform.contextWindow}</span></span>
                <span>Compliance: <span className="font-semibold text-foreground">{rec.platform.compliance.join(", ")}</span></span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {remaining.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Other Platforms Evaluated</CardTitle>
            <CardDescription>Showing next {remaining.length} platforms by score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {remaining.map((rec, i) => (
                <div key={rec.platform.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground font-mono w-6">#{i + 6}</span>
                    <span className="text-sm font-medium">{rec.platform.name}</span>
                    <Badge variant="outline" className="text-xs">{rec.platform.category}</Badge>
                  </div>
                  <Badge variant={getScoreBadgeVariant(rec.overallScore)}>{rec.overallScore}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center">
        <Button variant="outline" onClick={onRestart} data-testid="btn-restart" className="gap-2">
          <RotateCcw className="w-4 h-4" />Start New Recommendation
        </Button>
      </div>
    </div>
  );
}

interface IntelligenceWizardProps { wizard: UseIntelligenceWizardResult; }

export function IntelligenceWizard({ wizard }: IntelligenceWizardProps) {
  const { state, currentStep, canProceed, stepProgress, totalSteps, nextStep, prevStep, restart } = wizard;

  return (
    <div className="w-full max-w-4xl mx-auto" data-testid="intelligence-wizard">
      <div className="mb-2">
        <Progress value={stepProgress} className="h-1.5" data-testid="wizard-progress" />
      </div>
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      <div className="min-h-[400px]">
        {currentStep === 1 && <DepartmentSelect selected={state.department} onSelect={wizard.setDepartment} />}
        {currentStep === 2 && <CapabilitySelect selected={state.capabilities} onToggle={wizard.toggleCapability} />}
        {currentStep === 3 && <BudgetInput selected={state.budget} onSelect={wizard.setBudget} />}
        {currentStep === 4 && <TeamSizeInput selected={state.teamSize} onSelect={wizard.setTeamSize} />}
        {currentStep === 5 && state.results && <ResultsView results={state.results} onRestart={restart} />}
      </div>
      {currentStep < 5 && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t" data-testid="wizard-nav">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} data-testid="btn-prev" className="gap-2">
            <ArrowLeft className="w-4 h-4" />Back
          </Button>
          <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
          <Button onClick={nextStep} disabled={!canProceed} data-testid="btn-next"
            className="gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md shadow-amber-500/20">
            {currentStep === 4 ? (<><Sparkles className="w-4 h-4" />Get Recommendations</>) : (<>Next<ArrowRight className="w-4 h-4" /></>)}
          </Button>
        </div>
      )}
    </div>
  );
}
