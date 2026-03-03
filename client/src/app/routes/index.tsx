import { Switch, Route, Redirect } from "wouter";
import { ExplorerTab } from "@/pages/explorer/ui";
import { ComparisonTab } from "@/pages/comparison/ui";
import { MatrixTab } from "@/pages/matrix/ui";
import { ROICalculator } from "@/pages/roi/ui";
import { StrategyTab } from "@/pages/strategy/ui";
import { AssessmentTab } from "@/pages/assessment/ui";
import { ProfileBuilderTab } from "@/pages/profile-builder/ui";
import { MicrosoftEcosystemTab } from "@/pages/ecosystem/ui";
import NotFound from "@/pages/not-found";

interface AppRoutesProps {
  selectedPlatforms: string[];
  onToggleSelect: (id: string) => void;
  onGoToExplorer: () => void;
}

export function AppRoutes({
  selectedPlatforms,
  onToggleSelect,
  onGoToExplorer,
}: AppRoutesProps) {
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
      <Route component={NotFound} />
    </Switch>
  );
}
