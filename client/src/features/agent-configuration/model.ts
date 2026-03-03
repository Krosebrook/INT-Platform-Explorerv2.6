// FILE: client/src/features/agent-configuration/model.ts

import { useState, useCallback } from "react";
import type { AgentTemplate } from "@/entities/agent/model";
import { AGENT_TEMPLATES } from "@/entities/agent/data";

const STORAGE_KEY = "int-explorer-agents";

function loadAgentsFromStorage(): AgentTemplate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as AgentTemplate[];
    }
  } catch {
    // Ignore parse errors
  }
  return [...AGENT_TEMPLATES];
}

function saveAgentsToStorage(agents: AgentTemplate[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
  } catch {
    // Ignore storage errors
  }
}

export type ActiveTab = "library" | "builder" | "test";

export function useAgentBuilder() {
  const [agents, setAgents] = useState<AgentTemplate[]>(loadAgentsFromStorage);
  const [activeAgent, setActiveAgent] = useState<AgentTemplate | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("library");
  const [testOutput, setTestOutput] = useState<string[]>([]);

  const persistAgents = useCallback((updated: AgentTemplate[]) => {
    setAgents(updated);
    saveAgentsToStorage(updated);
  }, []);

  const createAgent = useCallback(
    (agent: Omit<AgentTemplate, "id">) => {
      const newAgent: AgentTemplate = {
        ...agent,
        id: `agent-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      };
      const updated = [...agents, newAgent];
      persistAgents(updated);
      setActiveAgent(newAgent);
      setActiveTab("builder");
    },
    [agents, persistAgents]
  );

  const updateAgent = useCallback(
    (updated: AgentTemplate) => {
      const next = agents.map((a) => (a.id === updated.id ? updated : a));
      persistAgents(next);
      setActiveAgent(updated);
    },
    [agents, persistAgents]
  );

  const deleteAgent = useCallback(
    (id: string) => {
      const next = agents.filter((a) => a.id !== id);
      persistAgents(next);
      if (activeAgent?.id === id) {
        setActiveAgent(null);
        setActiveTab("library");
      }
    },
    [agents, activeAgent, persistAgents]
  );

  const duplicateAgent = useCallback(
    (id: string) => {
      const source = agents.find((a) => a.id === id);
      if (!source) return;
      const duplicate: AgentTemplate = {
        ...source,
        id: `agent-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
        name: `${source.name} (Copy)`,
      };
      const updated = [...agents, duplicate];
      persistAgents(updated);
      setActiveAgent(duplicate);
      setActiveTab("builder");
    },
    [agents, persistAgents]
  );

  const selectAgent = useCallback(
    (id: string) => {
      const found = agents.find((a) => a.id === id);
      if (found) {
        setActiveAgent(found);
        setActiveTab("builder");
        setTestOutput([]);
      }
    },
    [agents]
  );

  const startNewAgent = useCallback(() => {
    setActiveAgent({
      id: "",
      name: "",
      description: "",
      model: "gpt-4o",
      temperature: 0.5,
      systemPrompt: "",
      tools: [],
      category: "General",
    });
    setActiveTab("builder");
    setTestOutput([]);
  }, []);

  const runTest = useCallback(
    (message: string) => {
      if (!activeAgent) return;

      setTestOutput((prev) => [...prev, `> ${message}`]);
      setTestOutput((prev) => [...prev, "[Running agent...]"]);

      const steps = [
        `[${new Date().toLocaleTimeString()}] Received input: "${message}"`,
        `[${new Date().toLocaleTimeString()}] Model: ${activeAgent.model} | Temperature: ${activeAgent.temperature}`,
        `[${new Date().toLocaleTimeString()}] System prompt loaded (${activeAgent.systemPrompt.length} chars)`,
        ...(activeAgent.tools.length > 0
          ? [
              `[${new Date().toLocaleTimeString()}] Tools available: ${activeAgent.tools.join(", ")}`,
            ]
          : []),
        `[${new Date().toLocaleTimeString()}] Processing...`,
      ];

      const responses = [
        `Based on my analysis as "${activeAgent.name}", here is my response to your query.`,
        `I have reviewed the request using my configured capabilities. Let me provide a detailed answer.`,
        `After processing your input with the ${activeAgent.model} model, I can provide the following insights.`,
        `Using the tools at my disposal (${activeAgent.tools.join(", ") || "none"}), I have generated a response for you.`,
      ];

      const finalResponse =
        responses[Math.floor(Math.random() * responses.length)];

      let stepIndex = 0;
      const interval = setInterval(() => {
        if (stepIndex < steps.length) {
          setTestOutput((prev) => [...prev, steps[stepIndex]]);
          stepIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setTestOutput((prev) => [
              ...prev,
              `[${new Date().toLocaleTimeString()}] Response generated successfully.`,
              "",
              `Assistant: ${finalResponse}`,
              "",
              "---",
            ]);
          }, 400);
        }
      }, 350);
    },
    [activeAgent]
  );

  const clearTestOutput = useCallback(() => {
    setTestOutput([]);
  }, []);

  return {
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
  };
}
