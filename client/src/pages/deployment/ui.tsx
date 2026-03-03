// client/src/pages/deployment/ui.tsx
import { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Progress } from "@/shared/ui/progress";
import { Checkbox } from "@/shared/ui/checkbox";
import { Separator } from "@/shared/ui/separator";
import { cn } from "@/shared/lib/utils";
import {
  Rocket,
  CheckCircle2,
  Clock,
  CalendarClock,
  ListChecks,
  Activity,
  Target,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PhaseStatus = "completed" | "in-progress" | "upcoming" | "planned";
type FilterKey = "all" | "critical" | "in-progress" | "completed";

interface PhaseTask {
  id: string;
  label: string;
  critical: boolean;
}

interface Phase {
  id: string;
  title: string;
  description: string;
  status: PhaseStatus;
  progress: number;
  tasks: PhaseTask[];
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const PHASES: Phase[] = [
  {
    id: "phase-1",
    title: "Discovery & Assessment",
    description:
      "Evaluate enterprise requirements, conduct stakeholder interviews, and define success criteria for AI platform adoption.",
    status: "completed",
    progress: 100,
    tasks: [
      { id: "t1-1", label: "Conduct stakeholder interviews", critical: true },
      { id: "t1-2", label: "Document technical requirements", critical: true },
      { id: "t1-3", label: "Security & compliance gap analysis", critical: true },
      { id: "t1-4", label: "Define KPIs and success metrics", critical: false },
      { id: "t1-5", label: "Vendor evaluation matrix complete", critical: false },
    ],
  },
  {
    id: "phase-2",
    title: "Pilot Program",
    description:
      "Controlled rollout to 50 power users across Engineering and Marketing to validate integrations and gather feedback.",
    status: "in-progress",
    progress: 65,
    tasks: [
      { id: "t2-1", label: "Select pilot cohort (50 users)", critical: true },
      { id: "t2-2", label: "Configure SSO via Okta", critical: true },
      { id: "t2-3", label: "Deploy DLP middleware", critical: true },
      { id: "t2-4", label: "Conduct kickoff workshops", critical: false },
      { id: "t2-5", label: "Establish Slack feedback channel", critical: false },
      { id: "t2-6", label: "Weekly usage report automation", critical: false },
    ],
  },
  {
    id: "phase-3",
    title: "Scaled Rollout",
    description:
      "Expand to all departments with role-based access control, advanced integrations (MCP), and training programs.",
    status: "upcoming",
    progress: 15,
    tasks: [
      { id: "t3-1", label: "Provision licenses for 200+ employees", critical: true },
      { id: "t3-2", label: "Deploy GitHub & Notion MCP servers", critical: true },
      { id: "t3-3", label: "Department-specific playbooks", critical: false },
      { id: "t3-4", label: "Role-based prompt templates", critical: false },
      { id: "t3-5", label: "CEO town-hall announcement", critical: false },
    ],
  },
  {
    id: "phase-4",
    title: "Full Production",
    description:
      "Autonomous agent workflows, global expansion (EMEA/APAC), cost optimisation via smart model routing and caching.",
    status: "planned",
    progress: 0,
    tasks: [
      { id: "t4-1", label: "Deploy autonomous Code Reviewer agent", critical: true },
      { id: "t4-2", label: "Implement prompt caching layer", critical: true },
      { id: "t4-3", label: "Smart model routing (Haiku/Opus)", critical: false },
      { id: "t4-4", label: "EU data residency configuration", critical: true },
      { id: "t4-5", label: "Continuous governance audit agent", critical: false },
      { id: "t4-6", label: "Quarterly business-review cadence", critical: false },
    ],
  },
];

const STATUS_CONFIG: Record<
  PhaseStatus,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive"; icon: React.ComponentType<{ className?: string }> }
> = {
  completed: { label: "Completed", variant: "default", icon: CheckCircle2 },
  "in-progress": { label: "In Progress", variant: "secondary", icon: Activity },
  upcoming: { label: "Upcoming", variant: "outline", icon: CalendarClock },
  planned: { label: "Planned", variant: "outline", icon: Clock },
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function VelocityMetrics({ checkedMap }: { checkedMap: Record<string, boolean> }) {
  const totalTasks = PHASES.flatMap((p) => p.tasks).length;
  const completedCount = Object.values(checkedMap).filter(Boolean).length;

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      data-testid="velocity-metrics"
    >
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Days in Current Phase</p>
              <p className="text-2xl font-bold font-mono">23</p>
            </div>
            <div className="p-2 rounded-lg bg-muted/50">
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tasks Completed</p>
              <p className="text-2xl font-bold font-mono">
                {completedCount}/{totalTasks}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-muted/50">
              <ListChecks className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant="default" className="mt-1 text-sm">
                On Track
              </Badge>
            </div>
            <div className="p-2 rounded-lg bg-muted/50">
              <Target className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PhaseCard({
  phase,
  checkedMap,
  onToggle,
}: {
  phase: Phase;
  checkedMap: Record<string, boolean>;
  onToggle: (taskId: string) => void;
}) {
  const config = STATUS_CONFIG[phase.status];
  const StatusIcon = config.icon;

  return (
    <Card data-testid={`phase-card-${phase.id}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-base flex items-center gap-2">
              <StatusIcon className="w-4 h-4" />
              {phase.title}
            </CardTitle>
            <CardDescription>{phase.description}</CardDescription>
          </div>
          <Badge variant={config.variant}>{config.label}</Badge>
        </div>
        <div className="pt-2 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span className="font-mono">{phase.progress}%</span>
          </div>
          <Progress value={phase.progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        <p className="text-xs font-medium text-muted-foreground mb-3">
          Task Checklist
        </p>
        <div className="space-y-2.5">
          {phase.tasks.map((task) => {
            const isChecked = !!checkedMap[task.id];
            return (
              <label
                key={task.id}
                className="flex items-start gap-2.5 cursor-pointer group"
                data-testid={`task-${task.id}`}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => onToggle(task.id)}
                  className="mt-0.5"
                />
                <span
                  className={cn(
                    "text-sm leading-tight",
                    isChecked && "line-through text-muted-foreground"
                  )}
                >
                  {task.label}
                  {task.critical && (
                    <Badge
                      variant="destructive"
                      className="ml-2 text-[10px] px-1.5 py-0"
                    >
                      Critical
                    </Badge>
                  )}
                </span>
              </label>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function DeploymentTab() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>(() => {
    // Pre-check completed phase tasks
    const initial: Record<string, boolean> = {};
    PHASES.forEach((phase) => {
      if (phase.status === "completed") {
        phase.tasks.forEach((t) => {
          initial[t.id] = true;
        });
      }
    });
    return initial;
  });

  const handleToggle = useCallback((taskId: string) => {
    setCheckedMap((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  }, []);

  const filteredPhases = useMemo(() => {
    switch (filter) {
      case "critical":
        return PHASES.filter((p) => p.tasks.some((t) => t.critical));
      case "in-progress":
        return PHASES.filter((p) => p.status === "in-progress");
      case "completed":
        return PHASES.filter((p) => p.status === "completed");
      default:
        return PHASES;
    }
  }, [filter]);

  const FILTER_OPTIONS: { key: FilterKey; label: string }[] = [
    { key: "all", label: "All" },
    { key: "critical", label: "Critical" },
    { key: "in-progress", label: "In Progress" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="space-y-6" data-testid="deployment-planning">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            Deployment Planning
          </h2>
          <p className="text-sm text-muted-foreground">
            Track rollout phases, task completion, and deployment velocity
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1.5">
          <CalendarClock className="w-3.5 h-3.5" />
          4-Phase Rollout
        </Badge>
      </div>

      {/* Velocity Metrics */}
      <VelocityMetrics checkedMap={checkedMap} />

      <Separator />

      {/* Status Filter Bar */}
      <div
        className="flex flex-wrap items-center gap-2"
        data-testid="status-filter"
      >
        {FILTER_OPTIONS.map((opt) => (
          <Button
            key={opt.key}
            variant={filter === opt.key ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(opt.key)}
            data-testid={`filter-${opt.key}`}
          >
            {opt.label}
          </Button>
        ))}
      </div>

      {/* Phase Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPhases.map((phase) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            checkedMap={checkedMap}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}
