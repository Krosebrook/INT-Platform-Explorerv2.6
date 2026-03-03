// FILE: client/src/entities/agent/model.ts

export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  model: string;
  temperature: number;
  systemPrompt: string;
  tools: string[];
  category: string;
}
