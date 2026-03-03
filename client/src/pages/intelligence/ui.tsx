import { Brain, Sparkles } from "lucide-react";
import { useIntelligenceWizard, IntelligenceWizard } from "@/features/intelligence-engine";

export function IntelligenceTab() {
  const wizard = useIntelligenceWizard();

  return (
    <div className="space-y-6" data-testid="intelligence-tab">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25">
          <Brain className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Intelligence Engine</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl mx-auto">
            Answer four quick questions about your department, capabilities, budget, and team size
            to receive personalized AI platform recommendations ranked by fit.
          </p>
        </div>
        {wizard.currentStep < 5 && (
          <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>Powered by multi-dimensional platform scoring across {wizard.totalSteps - 1} factors</span>
          </div>
        )}
      </div>
      <IntelligenceWizard wizard={wizard} />
    </div>
  );
}
