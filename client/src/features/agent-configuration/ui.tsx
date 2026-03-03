// FILE: client/src/features/agent-configuration/ui.tsx

import { useState, useCallback, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { Separator } from "@/shared/ui/separator";
import { Slider } from "@/shared/ui/slider";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { cn } from "@/shared/lib/utils";
import type { AgentTemplate } from "@/entities/agent/model";
import { AVAILABLE_TOOLS, AVAILABLE_MODELS } from "@/entities/agent/data";
import {
  Bot,
  Plus,
  Pencil,
  Trash2,
  Copy,
  Search,
  Wrench,
  Send,
  RotateCcw,
  Terminal,
  Cpu,
  Thermometer,
  MessageSquare,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Agent Library                                                             */
/* -------------------------------------------------------------------------- */

interface AgentLibraryProps {
  agents: AgentTemplate[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onCreateNew: () => void;
}

export function AgentLibrary({
  agents,
  onSelect,
  onDelete,
  onDuplicate,
  onCreateNew,
}: AgentLibraryProps) {
  const [search, setSearch] = useState("");

  const filtered = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6" data-testid="agent-library">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Agent Library</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {agents.length} {agents.length === 1 ? "agent" : "agents"} configured
          </p>
        </div>
        <Button onClick={onCreateNew} className="gap-2" data-testid="btn-create-agent">
          <Plus className="w-4 h-4" />
          New Agent
        </Button>
      </div>

      {agents.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
            data-testid="input-search-agents"
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Bot className="w-12 h-12 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-medium">
              {agents.length === 0 ? "No agents yet" : "No matching agents"}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              {agents.length === 0
                ? "Create your first agent to get started with AI automation."
                : "Try a different search term."}
            </p>
            {agents.length === 0 && (
              <Button onClick={onCreateNew} className="mt-4 gap-2">
                <Plus className="w-4 h-4" />
                Create Your First Agent
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((agent) => (
            <Card
              key={agent.id}
              className="group hover:shadow-md transition-all cursor-pointer border-border hover:border-primary/40"
              onClick={() => onSelect(agent.id)}
              data-testid={`agent-card-${agent.id}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {AVAILABLE_MODELS.find((m) => m.id === agent.model)?.name ?? agent.model}
                  </Badge>
                </div>
                <CardTitle className="text-base mt-3">{agent.name}</CardTitle>
                <CardDescription className="line-clamp-2 text-xs">
                  {agent.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Wrench className="w-3 h-3" />
                    {agent.tools.length} tools
                  </span>
                  <span className="flex items-center gap-1">
                    <Thermometer className="w-3 h-3" />
                    {agent.temperature}
                  </span>
                  <Badge variant="outline" className="text-[10px]">
                    {agent.category}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate(agent.id);
                  }}
                  title="Duplicate"
                  data-testid={`btn-duplicate-${agent.id}`}
                >
                  <Copy className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(agent.id);
                  }}
                  title="Edit"
                  data-testid={`btn-edit-${agent.id}`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(agent.id);
                  }}
                  title="Delete"
                  data-testid={`btn-delete-${agent.id}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Agent Builder Form                                                        */
/* -------------------------------------------------------------------------- */

interface AgentBuilderFormProps {
  agent: AgentTemplate;
  onChange: (agent: AgentTemplate) => void;
  onSave: () => void;
  isNew: boolean;
}

export function AgentBuilderForm({ agent, onChange, onSave, isNew }: AgentBuilderFormProps) {
  const toolCategories = Array.from(new Set(AVAILABLE_TOOLS.map((t) => t.category)));

  const handleToolToggle = useCallback(
    (toolId: string) => {
      const next = agent.tools.includes(toolId)
        ? agent.tools.filter((t) => t !== toolId)
        : [...agent.tools, toolId];
      onChange({ ...agent, tools: next });
    },
    [agent, onChange]
  );

  return (
    <div className="space-y-6" data-testid="agent-builder-form">
      {/* Identity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Agent Identity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="agent-name">Name</Label>
            <Input
              id="agent-name"
              placeholder="e.g., Customer Support Agent"
              value={agent.name}
              onChange={(e) => onChange({ ...agent, name: e.target.value })}
              data-testid="input-agent-name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="agent-description">Description</Label>
            <Textarea
              id="agent-description"
              placeholder="What does this agent do?"
              value={agent.description}
              onChange={(e) => onChange({ ...agent, description: e.target.value })}
              rows={3}
              data-testid="input-agent-description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="agent-category">Category</Label>
              <Input
                id="agent-category"
                placeholder="e.g., Support"
                value={agent.category}
                onChange={(e) => onChange({ ...agent, category: e.target.value })}
                data-testid="input-agent-category"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="agent-model">Model</Label>
              <Select
                value={agent.model}
                onValueChange={(val) => onChange({ ...agent, model: val })}
              >
                <SelectTrigger id="agent-model" data-testid="select-agent-model">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_MODELS.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      <span className="flex items-center gap-2">
                        <Cpu className="w-3 h-3 text-muted-foreground" />
                        {m.name}
                        <span className="text-muted-foreground text-xs">({m.provider})</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Thermometer className="w-4 h-4" />
            Temperature
          </CardTitle>
          <CardDescription>
            Controls randomness. Lower values are more deterministic, higher values are more creative.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Precise (0)</span>
            <span className="font-medium">{agent.temperature}</span>
            <span className="text-muted-foreground">Creative (1)</span>
          </div>
          <Slider
            value={[agent.temperature]}
            onValueChange={([val]) => onChange({ ...agent, temperature: val })}
            min={0}
            max={1}
            step={0.1}
            data-testid="slider-temperature"
          />
        </CardContent>
      </Card>

      {/* System Prompt */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            System Prompt
          </CardTitle>
          <CardDescription>
            The instructions that define how this agent behaves.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="You are a helpful assistant that..."
            value={agent.systemPrompt}
            onChange={(e) => onChange({ ...agent, systemPrompt: e.target.value })}
            rows={6}
            className="font-mono text-sm"
            data-testid="input-system-prompt"
          />
          <p className="text-xs text-muted-foreground mt-2">
            {agent.systemPrompt.length} characters
          </p>
        </CardContent>
      </Card>

      {/* Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Tools
          </CardTitle>
          <CardDescription>
            Select the tools this agent can use. {agent.tools.length} of {AVAILABLE_TOOLS.length} selected.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {toolCategories.map((category) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {category}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AVAILABLE_TOOLS.filter((t) => t.category === category).map((tool) => {
                  const isChecked = agent.tools.includes(tool.id);
                  return (
                    <label
                      key={tool.id}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                        isChecked
                          ? "border-primary/50 bg-primary/5"
                          : "border-border hover:border-muted-foreground/30"
                      )}
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => handleToolToggle(tool.id)}
                        data-testid={`checkbox-tool-${tool.id}`}
                      />
                      <div className="grid gap-0.5">
                        <span className="text-sm font-medium leading-none">{tool.name}</span>
                        <span className="text-xs text-muted-foreground">{tool.description}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex justify-end">
        <Button
          onClick={onSave}
          disabled={!agent.name.trim()}
          className="gap-2"
          data-testid="btn-save-agent"
        >
          {isNew ? (
            <>
              <Plus className="w-4 h-4" />
              Create Agent
            </>
          ) : (
            <>
              <Pencil className="w-4 h-4" />
              Update Agent
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Agent Test Playground                                                     */
/* -------------------------------------------------------------------------- */

interface AgentTestPlaygroundProps {
  agent: AgentTemplate | null;
  testOutput: string[];
  onRunTest: (message: string) => void;
  onClear: () => void;
}

export function AgentTestPlayground({
  agent,
  testOutput,
  onRunTest,
  onClear,
}: AgentTestPlaygroundProps) {
  const [input, setInput] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [testOutput]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || !agent) return;
    setInput("");
    onRunTest(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!agent) {
    return (
      <Card className="h-full" data-testid="agent-test-playground">
        <CardContent className="flex flex-col items-center justify-center h-full py-16 text-center">
          <Terminal className="w-12 h-12 text-muted-foreground/40 mb-4" />
          <h3 className="text-lg font-medium">No Agent Selected</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            Select or create an agent from the Library, then switch to the Test tab to try it out.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4" data-testid="agent-test-playground">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Test Playground
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {agent.name}
              </Badge>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClear} title="Clear output" data-testid="btn-clear-test">
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
          <CardDescription>
            Send messages to test your agent configuration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Output */}
          <div
            ref={outputRef}
            className="h-72 overflow-y-auto rounded-lg border bg-muted/30 p-4 font-mono text-xs space-y-1"
            data-testid="test-output"
          >
            {testOutput.length === 0 ? (
              <p className="text-muted-foreground text-center pt-8">
                Send a message to start testing "{agent.name}".
              </p>
            ) : (
              testOutput.map((line, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "whitespace-pre-wrap",
                    line.startsWith("> ")
                      ? "text-primary font-semibold"
                      : line.startsWith("Assistant:")
                        ? "text-foreground font-medium"
                        : line.startsWith("[")
                          ? "text-muted-foreground"
                          : "text-foreground"
                  )}
                >
                  {line}
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <Input
              placeholder={`Message ${agent.name}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              data-testid="input-test-message"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              size="icon"
              data-testid="btn-send-test"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Agent Info Summary */}
      <Card>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-y-2 text-xs">
            <span className="text-muted-foreground">Model</span>
            <span className="font-medium">
              {AVAILABLE_MODELS.find((m) => m.id === agent.model)?.name ?? agent.model}
            </span>
            <span className="text-muted-foreground">Temperature</span>
            <span className="font-medium">{agent.temperature}</span>
            <span className="text-muted-foreground">Tools</span>
            <span className="font-medium">{agent.tools.length} active</span>
            <span className="text-muted-foreground">Prompt Length</span>
            <span className="font-medium">{agent.systemPrompt.length} chars</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
