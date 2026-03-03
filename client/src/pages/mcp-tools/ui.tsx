import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import {
  Search,
  Server,
  Zap,
  CreditCard,
  Rocket,
  BarChart3,
  Github,
  MessageSquare,
  Figma,
  FileText,
  Users,
  Image,
  CheckCircle2,
  Wrench,
  FileSpreadsheet,
  Presentation,
  FileType,
  Palette,
  Workflow,
  Bot,
  Cpu,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type MCPCategoryId =
  | "all"
  | "finance"
  | "devops"
  | "design"
  | "communication"
  | "productivity";

interface MCPServer {
  id: string;
  name: string;
  provider: string;
  description: string;
  category: MCPCategoryId;
  capabilities: string[];
  status: "Available" | "Coming Soon";
  icon: typeof Server;
  iconColor: string;
  iconBg: string;
}

interface BuiltInSkill {
  id: string;
  name: string;
  description: string;
  compatibleModels: string[];
  icon: typeof Wrench;
  iconColor: string;
  iconBg: string;
}

interface CategoryFilter {
  id: MCPCategoryId;
  label: string;
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const CATEGORIES: CategoryFilter[] = [
  { id: "all", label: "All" },
  { id: "finance", label: "Finance" },
  { id: "devops", label: "DevOps" },
  { id: "design", label: "Design" },
  { id: "communication", label: "Communication" },
  { id: "productivity", label: "Productivity" },
];

const MCP_SERVERS: MCPServer[] = [
  {
    id: "stripe",
    name: "Stripe",
    provider: "Stripe Inc.",
    description: "Access financial data, subscriptions, invoices, and customer payment history.",
    category: "finance",
    capabilities: [
      "Query subscription MRR",
      "Verify recent payouts",
      "Analyze refund rates",
      "Invoice generation",
    ],
    status: "Available",
    icon: CreditCard,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    id: "vercel",
    name: "Vercel",
    provider: "Vercel Inc.",
    description: "Manage deployments, preview environments, and serverless function logs.",
    category: "devops",
    capabilities: [
      "Trigger deployments",
      "Read build logs",
      "Manage environment variables",
      "Domain configuration",
    ],
    status: "Available",
    icon: Rocket,
    iconColor: "text-gray-800 dark:text-gray-200",
    iconBg: "bg-gray-100 dark:bg-gray-800",
  },
  {
    id: "linear",
    name: "Linear",
    provider: "Linear Inc.",
    description: "Manage software projects, issues, cycles, and sprint velocity tracking.",
    category: "devops",
    capabilities: [
      "Create tickets from specs",
      "Query sprint velocity",
      "Find blocking issues",
      "Cycle analytics",
    ],
    status: "Available",
    icon: BarChart3,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  {
    id: "github",
    name: "GitHub",
    provider: "Microsoft",
    description: "Connect repositories for code search, issue tracking, and PR management.",
    category: "devops",
    capabilities: [
      "Search code across repos",
      "Create issues from reports",
      "Summarize PR activity",
      "Branch management",
    ],
    status: "Available",
    icon: Github,
    iconColor: "text-gray-800 dark:text-gray-200",
    iconBg: "bg-gray-100 dark:bg-gray-800",
  },
  {
    id: "slack",
    name: "Slack",
    provider: "Salesforce",
    description: "Connect to team channels for real-time messaging and thread summarization.",
    category: "communication",
    capabilities: [
      "Channel @mentions",
      "Thread summarization",
      "Slash commands",
      "Daily digests",
    ],
    status: "Available",
    icon: MessageSquare,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    id: "figma",
    name: "Figma",
    provider: "Figma Inc.",
    description: "Extract design tokens, inspect components, and generate front-end code.",
    category: "design",
    capabilities: [
      "Design token extraction",
      "Component inspection",
      "Style guide generation",
      "Asset export",
    ],
    status: "Available",
    icon: Figma,
    iconColor: "text-pink-500",
    iconBg: "bg-pink-100 dark:bg-pink-900/30",
  },
  {
    id: "notion",
    name: "Notion",
    provider: "Notion Labs",
    description: "Access and manage knowledge base, project trackers, and documentation.",
    category: "productivity",
    capabilities: [
      "Retrieve company policies",
      "Update project status",
      "Read meeting notes",
      "Database queries",
    ],
    status: "Available",
    icon: FileText,
    iconColor: "text-gray-700 dark:text-gray-300",
    iconBg: "bg-gray-100 dark:bg-gray-800",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    provider: "HubSpot Inc.",
    description: "CRM data access for contacts, companies, deals, and marketing automation.",
    category: "finance",
    capabilities: [
      "Find contact details",
      "Update deal stages",
      "Log meeting notes",
      "Pipeline reporting",
    ],
    status: "Coming Soon",
    icon: Users,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
  },
  {
    id: "cloudinary",
    name: "Cloudinary",
    provider: "Cloudinary Ltd.",
    description: "Manage media assets, image transformations, and video processing pipelines.",
    category: "design",
    capabilities: [
      "Image optimization",
      "Video transcoding",
      "Asset management",
    ],
    status: "Coming Soon",
    icon: Image,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
  },
];

const BUILT_IN_SKILLS: BuiltInSkill[] = [
  {
    id: "docx",
    name: "docx",
    description: "Create and edit Word documents with rich formatting, tables, and images.",
    compatibleModels: ["Claude 3.5 Sonnet", "Claude 3 Opus", "GPT-4o"],
    icon: FileType,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    id: "pdf",
    name: "pdf",
    description: "Generate PDFs, extract text content, and perform document analysis.",
    compatibleModels: ["Claude 3.5 Sonnet", "Claude 3 Opus", "GPT-4o"],
    icon: FileText,
    iconColor: "text-red-600",
    iconBg: "bg-red-100 dark:bg-red-900/30",
  },
  {
    id: "pptx",
    name: "pptx",
    description: "Create professional presentations with slides, charts, and speaker notes.",
    compatibleModels: ["Claude 3.5 Sonnet", "GPT-4o", "Gemini Pro"],
    icon: Presentation,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
  },
  {
    id: "xlsx",
    name: "xlsx",
    description: "Create and analyze spreadsheets with formulas, pivot tables, and charts.",
    compatibleModels: ["Claude 3.5 Sonnet", "Claude 3 Opus", "GPT-4o"],
    icon: FileSpreadsheet,
    iconColor: "text-green-600",
    iconBg: "bg-green-100 dark:bg-green-900/30",
  },
  {
    id: "frontend-design",
    name: "frontend-design",
    description: "Design responsive web UIs with HTML, CSS, and component frameworks.",
    compatibleModels: ["Claude 3.5 Sonnet", "GPT-4o", "Gemini Pro"],
    icon: Palette,
    iconColor: "text-pink-600",
    iconBg: "bg-pink-100 dark:bg-pink-900/30",
  },
  {
    id: "workflow-automation",
    name: "workflow-automation",
    description: "Design n8n, Zapier, and Make workflows with conditional logic and triggers.",
    compatibleModels: ["Claude 3.5 Sonnet", "Claude 3 Opus", "GPT-4o"],
    icon: Workflow,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
  },
  {
    id: "ai-agents",
    name: "ai-agents",
    description: "Build multi-step AI agent orchestrations with tool chaining and memory.",
    compatibleModels: ["Claude 3.5 Sonnet", "Claude 3 Opus", "GPT-4o", "Gemini Pro"],
    icon: Bot,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100 dark:bg-violet-900/30",
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function MCPServerCard({ server }: { server: MCPServer }) {
  const Icon = server.icon;
  const isAvailable = server.status === "Available";

  return (
    <Card
      className="flex flex-col hover:shadow-md transition-shadow"
      data-testid={`mcp-server-card-${server.id}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className={`p-3 rounded-lg ${server.iconBg}`}>
            <Icon className={`h-6 w-6 ${server.iconColor}`} />
          </div>
          <Badge
            variant={isAvailable ? "default" : "secondary"}
            className={
              isAvailable
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "opacity-70"
            }
          >
            {server.status}
          </Badge>
        </div>
        <CardTitle className="text-base mt-2">{server.name}</CardTitle>
        <Badge variant="outline" className="text-xs w-fit">
          {server.provider}
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {server.description}
        </p>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Capabilities
          </p>
          <ul className="space-y-1">
            {server.capabilities.map((cap, i) => (
              <li
                key={i}
                className="text-xs text-muted-foreground flex items-start gap-1.5"
              >
                <CheckCircle2 className="h-3 w-3 mt-0.5 text-green-500 flex-shrink-0" />
                {cap}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function SkillCard({ skill }: { skill: BuiltInSkill }) {
  const Icon = skill.icon;

  return (
    <Card
      className="flex flex-col hover:shadow-md transition-shadow"
      data-testid={`skill-card-${skill.id}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-lg ${skill.iconBg}`}>
            <Icon className={`h-5 w-5 ${skill.iconColor}`} />
          </div>
          <div>
            <CardTitle className="text-base font-mono">{skill.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <p className="text-sm text-muted-foreground">{skill.description}</p>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Compatible Models
          </p>
          <div className="flex flex-wrap gap-1">
            {skill.compatibleModels.map((model) => (
              <Badge key={model} variant="outline" className="text-xs">
                <Cpu className="h-3 w-3 mr-1" />
                {model}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Main exported component
// ---------------------------------------------------------------------------

export function MCPToolsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<MCPCategoryId>("all");

  const filteredServers = useMemo(() => {
    return MCP_SERVERS.filter((server) => {
      const matchesSearch =
        searchQuery === "" ||
        server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.capabilities.some((c) =>
          c.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        activeCategory === "all" || server.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const filteredSkills = useMemo(() => {
    if (searchQuery === "") return BUILT_IN_SKILLS;
    return BUILT_IN_SKILLS.filter(
      (skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.compatibleModels.some((m) =>
          m.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [searchQuery]);

  const totalMCPAvailable = MCP_SERVERS.filter(
    (s) => s.status === "Available"
  ).length;

  return (
    <div className="space-y-6" data-testid="tab-mcp-tools">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Server className="h-6 w-6 text-primary" />
            </div>
            MCP Tools Catalog
          </h2>
          <p className="text-muted-foreground mt-1">
            Browse MCP servers for real-time data access and built-in skills for complex workflows.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="text-sm" data-testid="badge-mcp-server-count">
            <Server className="h-3 w-3 mr-1" />
            {totalMCPAvailable} Servers Available
          </Badge>
          <Badge variant="secondary" className="text-sm" data-testid="badge-skill-count">
            <Zap className="h-3 w-3 mr-1" />
            {BUILT_IN_SKILLS.length} Skills
          </Badge>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search servers, skills, or capabilities..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-mcp-search"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2" data-testid="mcp-category-filters">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setActiveCategory(cat.id)}
            data-testid={`mcp-filter-${cat.id}`}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      <Separator />

      {/* MCP Servers section */}
      <section data-testid="section-mcp-servers">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
            <Server className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">MCP Servers</h3>
            <p className="text-sm text-muted-foreground">
              Connect to external services via the Model Context Protocol
            </p>
          </div>
          <Badge variant="outline" className="ml-auto">
            {filteredServers.length} servers
          </Badge>
        </div>
        {filteredServers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServers.map((server) => (
              <MCPServerCard key={server.id} server={server} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground border rounded-lg bg-muted/20">
            <Server className="h-10 w-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No MCP servers match your filters.</p>
          </div>
        )}
      </section>

      <Separator />

      {/* Built-in Skills section */}
      <section data-testid="section-built-in-skills">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
            <Zap className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Built-in Skills</h3>
            <p className="text-sm text-muted-foreground">
              Specialized capabilities for document generation and workflow automation
            </p>
          </div>
          <Badge variant="outline" className="ml-auto">
            {filteredSkills.length} skills
          </Badge>
        </div>
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground border rounded-lg bg-muted/20">
            <Zap className="h-10 w-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No skills match your search.</p>
          </div>
        )}
      </section>
    </div>
  );
}
