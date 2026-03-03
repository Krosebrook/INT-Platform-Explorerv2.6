import { useCallback } from "react";
import { Switch, Route, Redirect } from "wouter";
import { ExplorerTab } from "@/pages/explorer/ui";
import { ComparisonTab } from "@/pages/comparison/ui";
import { MatrixTab } from "@/pages/matrix/ui";
import { ROICalculator } from "@/pages/roi/ui";
import { StrategyTab } from "@/pages/strategy/ui";
import { AssessmentTab } from "@/pages/assessment/ui";
import { ProfileBuilderTab } from "@/pages/profile-builder/ui";
import { MicrosoftEcosystemTab } from "@/pages/ecosystem/ui";
import { IntelligenceTab } from "@/pages/intelligence/ui";
import { StacksTab } from "@/pages/stacks/ui";
import { RFPTab } from "@/pages/rfp/ui";
import NotFound from "@/pages/not-found";
import type { Stack } from "@/entities/stack";

interface AppRoutesProps {
  selectedPlatforms: string[];
  onToggleSelect: (id: string) => void;
  onGoToExplorer: () => void;
  onLoadStack: (platformIds: string[]) => void;
}

export function AppRoutes({
  selectedPlatforms,
  onToggleSelect,
  onGoToExplorer,
  onLoadStack,
}: AppRoutesProps) {
  const handleLoadStack = useCallback(
    (stack: Stack) => onLoadStack(stack.platformIds),
    [onLoadStack],
  );

  return (
    <Switch>
      <Route path="/">
        <Redirect to="/explorer" />
      </Route>
      <Route path="/explorer">
        <ExplorerTab
          selectedPlatforms={selectedPlatforms}
          onToggleSelect={onToggleSelect}
        />
      </Route>
      <Route path="/comparison">
        <ComparisonTab
          selectedPlatforms={selectedPlatforms}
          onBack={onGoToExplorer}
        />
      </Route>
      <Route path="/matrix" component={MatrixTab} />
      <Route path="/roi" component={ROICalculator} />
      <Route path="/strategy" component={StrategyTab} />
      <Route path="/assessment" component={AssessmentTab} />
      <Route path="/profile-builder" component={ProfileBuilderTab} />
      <Route path="/ecosystem" component={MicrosoftEcosystemTab} />
      <Route path="/intelligence" component={IntelligenceTab} />
      <Route path="/stacks">
        <StacksTab
          selectedPlatforms={selectedPlatforms}
          onLoadStack={handleLoadStack}
        />
      </Route>
      <Route path="/rfp">
        <RFPTab selectedPlatforms={selectedPlatforms} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}
