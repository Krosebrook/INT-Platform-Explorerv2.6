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
import { DashboardTab } from "@/pages/dashboard/ui";
import { AgentBuilderTab } from "@/pages/agent-builder/ui";
import { BaselineTab } from "@/pages/baseline/ui";
import { AnalyticsTab } from "@/pages/analytics/ui";
import { DeploymentTab } from "@/pages/deployment/ui";
import { GovernanceTab } from "@/pages/governance/ui";
import { CollaborationTab } from "@/pages/collaboration/ui";
import { MarketplaceTab } from "@/pages/marketplace/ui";
import { MCPToolsTab } from "@/pages/mcp-tools/ui";
import { SettingsTab } from "@/pages/settings/ui";
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
      <Route path="/dashboard" component={DashboardTab} />
      <Route path="/agent-builder" component={AgentBuilderTab} />
      <Route path="/baseline" component={BaselineTab} />
      <Route path="/analytics" component={AnalyticsTab} />
      <Route path="/deployment" component={DeploymentTab} />
      <Route path="/governance" component={GovernanceTab} />
      <Route path="/collaboration" component={CollaborationTab} />
      <Route path="/marketplace" component={MarketplaceTab} />
      <Route path="/mcp-tools" component={MCPToolsTab} />
      <Route path="/settings" component={SettingsTab} />
      <Route component={NotFound} />
    </Switch>
  );
}
