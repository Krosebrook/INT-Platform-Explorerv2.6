import { ErrorBoundary } from "@/shared/ui/error-boundary";
import { AppProviders } from "./app/providers";
import { AppLayout } from "./app/layout";
import { AppRoutes } from "./app/routes";
import { usePlatformCompare } from "@/features/platform-compare";
import { useLocation } from "wouter";

function PlatformExplorer() {
  const { selectedPlatforms, togglePlatformSelection, loadStack } = usePlatformCompare();
  const [, setLocation] = useLocation();

  return (
    <AppLayout selectedPlatforms={selectedPlatforms}>
      <AppRoutes
        selectedPlatforms={selectedPlatforms}
        onToggleSelect={togglePlatformSelection}
        onGoToExplorer={() => setLocation("/explorer")}
        onLoadStack={loadStack}
      />
    </AppLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <PlatformExplorer />
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;
