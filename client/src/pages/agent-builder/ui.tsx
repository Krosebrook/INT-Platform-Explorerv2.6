// FILE: client/src/pages/agent-builder/ui.tsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Button } from "@/shared/ui/button";
import {
  useAgentBuilder,
  AgentLibrary,
  AgentBuilderForm,
  AgentTestPlayground,
} from "@/features/agent-configuration";
import type { ActiveTab } from "@/features/agent-configuration";
import type { AgentTemplate } from "@/entities/agent/model";
import { ArrowLeft, Library, Wrench, FlaskConical } from "lucide-react";

export function AgentBuilderTab() {
  const {
    agents,
    activeAgent,
    setActiveAgent,
    activeTab,
    setActiveTab,
    testOutput,
    createAgent,
    updateAgent,
    deleteAgent,
    duplicateAgent,
    selectAgent,
    startNewAgent,
    runTest,
    clearTestOutput,
  } = useAgentBuilder();

  const handleSave = () => {
    if (!activeAgent) return;

    if (!activeAgent.id) {
      // New agent -- create
      createAgent({
        name: activeAgent.name,
        description: activeAgent.description,
        model: activeAgent.model,
        temperature: activeAgent.temperature,
        systemPrompt: activeAgent.systemPrompt,
        tools: activeAgent.tools,
        category: activeAgent.category,
      });
    } else {
      updateAgent(activeAgent);
    }
    setActiveTab("library");
  };

  const handleAgentChange = (updated: AgentTemplate) => {
    setActiveAgent(updated);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto" data-testid="page-agent-builder">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Agent Builder</h1>
        <p className="text-muted-foreground mt-1">
          Design, configure, and test autonomous AI agents for enterprise workflows.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as ActiveTab)}
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="library" className="gap-2" data-testid="tab-library">
              <Library className="w-4 h-4" />
              Library
            </TabsTrigger>
            <TabsTrigger value="builder" className="gap-2" data-testid="tab-builder">
              <Wrench className="w-4 h-4" />
              Builder
            </TabsTrigger>
            <TabsTrigger value="test" className="gap-2" data-testid="tab-test">
              <FlaskConical className="w-4 h-4" />
              Test
            </TabsTrigger>
          </TabsList>

          {activeTab !== "library" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("library")}
              className="gap-2"
              data-testid="btn-back-to-library"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Library
            </Button>
          )}
        </div>

        <TabsContent value="library" className="mt-6">
          <AgentLibrary
            agents={agents}
            onSelect={selectAgent}
            onDelete={deleteAgent}
            onDuplicate={duplicateAgent}
            onCreateNew={startNewAgent}
          />
        </TabsContent>

        <TabsContent value="builder" className="mt-6">
          {activeAgent ? (
            <AgentBuilderForm
              agent={activeAgent}
              onChange={handleAgentChange}
              onSave={handleSave}
              isNew={!activeAgent.id}
            />
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p>Select an agent from the Library or create a new one to start building.</p>
              <Button onClick={startNewAgent} className="mt-4 gap-2">
                Create New Agent
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="test" className="mt-6">
          <AgentTestPlayground
            agent={activeAgent}
            testOutput={testOutput}
            onRunTest={runTest}
            onClear={clearTestOutput}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
