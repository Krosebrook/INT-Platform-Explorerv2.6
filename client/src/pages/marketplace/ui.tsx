import { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import {
  Search,
  Plus,
  Check,
  X,
  MessageSquare,
  Github,
  FileText,
  Trello,
  Figma,
  BarChart3,
  Rocket,
  Users,
  Cloud,
  Building2,
  Video,
  BookOpen,
  Store,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type CategoryId =
  | "all"
  | "communication"
  | "development"
  | "productivity"
  | "analytics"
  | "storage";

interface Integration {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  icon: typeof MessageSquare;
  iconColor: string;
  iconBg: string;
}

interface CategoryFilter {
  id: CategoryId;
  label: string;
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const CATEGORIES: CategoryFilter[] = [
  { id: "all", label: "All" },
  { id: "communication", label: "Communication" },
  { id: "development", label: "Development" },
  { id: "productivity", label: "Productivity" },
  { id: "analytics", label: "Analytics" },
  { id: "storage", label: "Storage" },
];

const INTEGRATIONS: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    category: "communication",
    description: "Connect channels for real-time team collaboration and AI-powered responses.",
    icon: MessageSquare,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    id: "github",
    name: "GitHub",
    category: "development",
    description: "Review PRs, analyze codebases, and generate documentation automatically.",
    icon: Github,
    iconColor: "text-gray-800 dark:text-gray-200",
    iconBg: "bg-gray-100 dark:bg-gray-800",
  },
  {
    id: "notion",
    name: "Notion",
    category: "productivity",
    description: "Sync wikis, query knowledge bases, and generate content in your workspace.",
    icon: FileText,
    iconColor: "text-gray-700 dark:text-gray-300",
    iconBg: "bg-gray-100 dark:bg-gray-800",
  },
  {
    id: "jira",
    name: "Jira",
    category: "productivity",
    description: "Turn conversations into tickets, manage sprints, and groom backlogs.",
    icon: Trello,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    id: "figma",
    name: "Figma",
    category: "development",
    description: "Extract design tokens, inspect components, and generate front-end code.",
    icon: Figma,
    iconColor: "text-pink-500",
    iconBg: "bg-pink-100 dark:bg-pink-900/30",
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "development",
    description: "Deploy previews, monitor builds, and manage serverless functions.",
    icon: Rocket,
    iconColor: "text-gray-800 dark:text-gray-200",
    iconBg: "bg-gray-100 dark:bg-gray-800",
  },
  {
    id: "linear",
    name: "Linear",
    category: "development",
    description: "Manage issues, track cycles, and query sprint velocity in real time.",
    icon: BarChart3,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "analytics",
    description: "Access CRM data, manage contacts, and automate marketing workflows.",
    icon: Users,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "analytics",
    description: "AI-powered CRM insights, opportunity analysis, and pipeline forecasting.",
    icon: Cloud,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    id: "google-workspace",
    name: "Google Workspace",
    category: "productivity",
    description: "Draft Docs, schedule Calendar events, and analyze Sheets data.",
    icon: Building2,
    iconColor: "text-green-600",
    iconBg: "bg-green-100 dark:bg-green-900/30",
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    category: "communication",
    description: "Integrate with Teams channels, meetings, and enterprise communication.",
    icon: Video,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100 dark:bg-violet-900/30",
  },
  {
    id: "confluence",
    name: "Confluence",
    category: "storage",
    description: "Search and generate documentation across your Confluence knowledge base.",
    icon: BookOpen,
    iconColor: "text-blue-700",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
  },
];

const DEFAULT_INSTALLED = new Map<string, boolean>([
  ["slack", true],
  ["github", true],
]);

// ---------------------------------------------------------------------------
// Sub-component
// ---------------------------------------------------------------------------

function IntegrationCard({
  integration,
  installed,
  onToggle,
}: {
  integration: Integration;
  installed: boolean;
  onToggle: (id: string) => void;
}) {
  const Icon = integration.icon;

  return (
    <Card
      className={`flex flex-col transition-all hover:shadow-lg ${
        installed ? "border-primary/50 bg-primary/5" : ""
      }`}
      data-testid={`integration-card-${integration.id}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className={`p-3 rounded-lg ${integration.iconBg}`}>
            <Icon className={`h-6 w-6 ${integration.iconColor}`} />
          </div>
          {installed && (
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            >
              <Check className="h-3 w-3 mr-1" />
              Installed
            </Badge>
          )}
        </div>
        <CardTitle className="text-base mt-3">{integration.name}</CardTitle>
        <CardDescription className="line-clamp-2 min-h-[40px]">
          {integration.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-2">
        <Badge variant="outline" className="text-xs capitalize">
          {integration.category}
        </Badge>
      </CardContent>
      <CardFooter className="pt-3 border-t">
        {installed ? (
          <Button
            variant="outline"
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            onClick={() => onToggle(integration.id)}
            data-testid={`button-uninstall-${integration.id}`}
          >
            <X className="h-4 w-4 mr-2" />
            Uninstall
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => onToggle(integration.id)}
            data-testid={`button-install-${integration.id}`}
          >
            <Plus className="h-4 w-4 mr-2" />
            Install
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Main exported component
// ---------------------------------------------------------------------------

export function MarketplaceTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [installedMap, setInstalledMap] = useState<Map<string, boolean>>(
    () => new Map(DEFAULT_INSTALLED)
  );

  const toggleInstall = useCallback((id: string) => {
    setInstalledMap((prev) => {
      const next = new Map(prev);
      if (next.get(id)) {
        next.delete(id);
      } else {
        next.set(id, true);
      }
      return next;
    });
  }, []);

  const filteredIntegrations = useMemo(() => {
    return INTEGRATIONS.filter((app) => {
      const matchesSearch =
        searchQuery === "" ||
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || app.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const installedCount = installedMap.size;

  return (
    <div className="space-y-6" data-testid="tab-marketplace">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Store className="h-6 w-6 text-primary" />
            </div>
            App Marketplace
          </h2>
          <p className="text-muted-foreground mt-1">
            Supercharge your platform with integrations for your favorite tools and services.
          </p>
        </div>
        <Badge variant="secondary" className="text-sm self-start" data-testid="badge-installed-count">
          <Check className="h-3 w-3 mr-1" />
          {installedCount} Installed
        </Badge>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search integrations..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-marketplace-search"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2" data-testid="marketplace-category-filters">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setActiveCategory(cat.id)}
            data-testid={`filter-${cat.id}`}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      <Separator />

      {/* Integration cards grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        data-testid="marketplace-grid"
      >
        {filteredIntegrations.map((app) => (
          <IntegrationCard
            key={app.id}
            integration={app}
            installed={!!installedMap.get(app.id)}
            onToggle={toggleInstall}
          />
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <div className="text-center py-12 text-muted-foreground" data-testid="marketplace-empty">
          <Store className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg font-medium">No integrations found</p>
          <p className="text-sm">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
}
