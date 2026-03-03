import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import { Textarea } from "@/shared/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import {
  Users,
  Plus,
  Clock,
  Bot,
  FolderPlus,
  Activity,
  Rocket,
  Share2,
  MessageSquare,
  Layers,
  ArrowRight,
  Zap,
  UserPlus,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WorkspaceMember {
  initials: string;
  color: string;
}

interface Workspace {
  id: string;
  name: string;
  description: string;
  members: WorkspaceMember[];
  agentCount: number;
  lastActive: string;
}

interface ActivityItem {
  id: string;
  icon: typeof Users;
  iconColor: string;
  userName: string;
  action: string;
  timestamp: string;
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const INITIAL_WORKSPACES: Workspace[] = [
  {
    id: "ws-1",
    name: "Q1 Planning",
    description: "Cross-functional workspace for quarterly OKR planning and resource allocation.",
    members: [
      { initials: "AC", color: "bg-blue-500" },
      { initials: "BM", color: "bg-green-500" },
      { initials: "CJ", color: "bg-purple-500" },
      { initials: "DL", color: "bg-amber-500" },
    ],
    agentCount: 3,
    lastActive: "10 minutes ago",
  },
  {
    id: "ws-2",
    name: "Customer Support Ops",
    description: "Manage and optimize AI-powered support agents and escalation workflows.",
    members: [
      { initials: "EW", color: "bg-rose-500" },
      { initials: "FK", color: "bg-cyan-500" },
      { initials: "GR", color: "bg-orange-500" },
    ],
    agentCount: 5,
    lastActive: "2 hours ago",
  },
  {
    id: "ws-3",
    name: "Engineering Platform",
    description: "DevOps tooling, CI/CD pipelines, and infrastructure agent configurations.",
    members: [
      { initials: "HS", color: "bg-indigo-500" },
      { initials: "IT", color: "bg-teal-500" },
    ],
    agentCount: 7,
    lastActive: "1 day ago",
  },
  {
    id: "ws-4",
    name: "Legal & Compliance",
    description: "Contract review agents and regulatory compliance monitoring dashboards.",
    members: [
      { initials: "JP", color: "bg-fuchsia-500" },
      { initials: "KN", color: "bg-lime-500" },
      { initials: "LQ", color: "bg-sky-500" },
      { initials: "MO", color: "bg-red-500" },
      { initials: "NR", color: "bg-violet-500" },
    ],
    agentCount: 2,
    lastActive: "3 days ago",
  },
];

const ACTIVITY_FEED: ActivityItem[] = [
  {
    id: "act-1",
    icon: FolderPlus,
    iconColor: "text-blue-500",
    userName: "Alice Chen",
    action: "created workspace 'Q1 Planning'",
    timestamp: "10 minutes ago",
  },
  {
    id: "act-2",
    icon: Rocket,
    iconColor: "text-green-500",
    userName: "Bob Martinez",
    action: "deployed Agent 'Support Bot v2.1'",
    timestamp: "32 minutes ago",
  },
  {
    id: "act-3",
    icon: Share2,
    iconColor: "text-purple-500",
    userName: "Carol Johnson",
    action: "shared stack 'Enterprise Suite' with 4 members",
    timestamp: "1 hour ago",
  },
  {
    id: "act-4",
    icon: MessageSquare,
    iconColor: "text-amber-500",
    userName: "David Lee",
    action: "commented on 'Budget Analyst Agent' config",
    timestamp: "2 hours ago",
  },
  {
    id: "act-5",
    icon: Bot,
    iconColor: "text-cyan-500",
    userName: "Elena Wu",
    action: "updated Agent 'Contract Reviewer' to v1.4",
    timestamp: "3 hours ago",
  },
  {
    id: "act-6",
    icon: UserPlus,
    iconColor: "text-rose-500",
    userName: "Frank Kim",
    action: "invited 3 members to 'Engineering Platform'",
    timestamp: "5 hours ago",
  },
  {
    id: "act-7",
    icon: Layers,
    iconColor: "text-indigo-500",
    userName: "Grace Reed",
    action: "created stack 'Analytics Pipeline v3'",
    timestamp: "8 hours ago",
  },
  {
    id: "act-8",
    icon: Zap,
    iconColor: "text-orange-500",
    userName: "Henry Scott",
    action: "enabled MCP connection for 'Stripe' server",
    timestamp: "1 day ago",
  },
  {
    id: "act-9",
    icon: Activity,
    iconColor: "text-teal-500",
    userName: "Iris Tan",
    action: "ran performance benchmark on 'Legal Review Agent'",
    timestamp: "1 day ago",
  },
  {
    id: "act-10",
    icon: Share2,
    iconColor: "text-fuchsia-500",
    userName: "Jack Palmer",
    action: "shared 'Onboarding Flow' template with organization",
    timestamp: "2 days ago",
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function MemberAvatars({ members }: { members: WorkspaceMember[] }) {
  const displayed = members.slice(0, 3);
  const overflow = members.length - 3;

  return (
    <div className="flex -space-x-2">
      {displayed.map((member, i) => (
        <div
          key={i}
          className={`w-7 h-7 rounded-full ${member.color} flex items-center justify-center text-[10px] font-semibold text-white ring-2 ring-background`}
        >
          {member.initials}
        </div>
      ))}
      {overflow > 0 && (
        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium text-muted-foreground ring-2 ring-background">
          +{overflow}
        </div>
      )}
    </div>
  );
}

function WorkspaceCard({ workspace }: { workspace: Workspace }) {
  return (
    <Card
      className="hover:shadow-md transition-shadow"
      data-testid={`workspace-card-${workspace.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{workspace.name}</CardTitle>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {workspace.members.length} members
                </span>
                <Badge variant="secondary" className="text-xs">
                  <Bot className="h-3 w-3 mr-1" />
                  {workspace.agentCount} agents
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {workspace.description}
        </p>
        <Separator />
        <div className="flex items-center justify-between">
          <MemberAvatars members={workspace.members} />
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {workspace.lastActive}
            </span>
            <Button size="sm" variant="outline" data-testid={`workspace-open-${workspace.id}`}>
              Open
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityFeedItem({ item }: { item: ActivityItem }) {
  const Icon = item.icon;

  return (
    <div className="flex gap-3" data-testid={`activity-item-${item.id}`}>
      <div className="mt-0.5 flex-shrink-0">
        <div className="p-1.5 rounded-full bg-muted">
          <Icon className={`h-3.5 w-3.5 ${item.iconColor}`} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-semibold">{item.userName}</span>{" "}
          <span className="text-muted-foreground">{item.action}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{item.timestamp}</p>
      </div>
    </div>
  );
}

function CreateWorkspaceDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (name: string, description: string) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = useCallback(() => {
    if (name.trim()) {
      onCreate(name.trim(), description.trim());
      setName("");
      setDescription("");
      onOpenChange(false);
    }
  }, [name, description, onCreate, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="dialog-create-workspace">
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Set up a new shared workspace for your team to collaborate on agents and stacks.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="ws-name" className="text-sm font-medium">
              Workspace Name
            </label>
            <Input
              id="ws-name"
              placeholder="e.g. Marketing Automation"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="input-workspace-name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="ws-desc" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="ws-desc"
              placeholder="What will this workspace be used for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              data-testid="input-workspace-description"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!name.trim()}
            data-testid="button-create-workspace"
          >
            <Plus className="h-4 w-4 mr-1" />
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Main exported component
// ---------------------------------------------------------------------------

export function CollaborationTab() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(INITIAL_WORKSPACES);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateWorkspace = useCallback(
    (name: string, description: string) => {
      const newWorkspace: Workspace = {
        id: `ws-${Date.now()}`,
        name,
        description: description || "No description provided.",
        members: [{ initials: "ME", color: "bg-blue-500" }],
        agentCount: 0,
        lastActive: "Just now",
      };
      setWorkspaces((prev) => [newWorkspace, ...prev]);
    },
    []
  );

  return (
    <div className="space-y-6" data-testid="tab-collaboration">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            Collaboration Hub
          </h2>
          <p className="text-muted-foreground mt-1">
            Shared workspaces for co-creating and managing AI agents across your organization.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm" data-testid="badge-workspace-count">
            <Layers className="h-3 w-3 mr-1" />
            {workspaces.length} Workspaces
          </Badge>
          <Button onClick={() => setDialogOpen(true)} data-testid="button-new-workspace">
            <FolderPlus className="h-4 w-4 mr-2" />
            New Workspace
          </Button>
        </div>
      </div>

      {/* Main layout: workspace cards + activity sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workspace cards */}
        <div className="lg:col-span-2 space-y-4" data-testid="workspace-grid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workspaces.map((ws) => (
              <WorkspaceCard key={ws.id} workspace={ws} />
            ))}
          </div>
        </div>

        {/* Activity feed sidebar */}
        <div className="space-y-4" data-testid="activity-feed">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Recent Activity
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  Live
                </Badge>
              </div>
              <CardDescription>Latest actions across all workspaces</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {ACTIVITY_FEED.map((item) => (
                <ActivityFeedItem key={item.id} item={item} />
              ))}
            </CardContent>
          </Card>

          {/* Invite CTA */}
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-none">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-2">Invite your team</h3>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Collaborate on agents and stacks in real-time with your colleagues.
              </p>
              <Button
                variant="secondary"
                className="w-full"
                data-testid="button-invite-members"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Members
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Workspace Dialog */}
      <CreateWorkspaceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreate={handleCreateWorkspace}
      />
    </div>
  );
}
