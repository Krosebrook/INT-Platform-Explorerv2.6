// client/src/pages/best-practices/ui.tsx
import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { cn } from "@/shared/lib/utils";
import {
  Brain,
  Target,
  MessagesSquare,
  UserCog,
  ListChecks,
  Code2,
  Zap,
  Settings,
  ShieldAlert,
  Lock,
  ShieldCheck,
  KeyRound,
  RefreshCw,
  GitBranch,
  Layers,
  ClipboardCheck,
  AlertTriangle,
  Maximize2,
  Bug,
  FolderOpen,
  GitPullRequest,
  Users,
  Workflow,
  Search,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  BEST_PRACTICES,
  PRACTICE_CATEGORIES,
} from "./data";
import type { BestPractice } from "./data";

// ---------------------------------------------------------------------------
// Icon map -- maps icon name strings from data.ts to lucide components
// ---------------------------------------------------------------------------

const ICON_MAP: Record<string, LucideIcon> = {
  Brain,
  Target,
  MessagesSquare,
  UserCog,
  ListChecks,
  Code2,
  Zap,
  Settings,
  ShieldAlert,
  Lock,
  ShieldCheck,
  KeyRound,
  RefreshCw,
  GitBranch,
  Layers,
  ClipboardCheck,
  AlertTriangle,
  Maximize2,
  Bug,
  FolderOpen,
  GitPullRequest,
  Users,
  Workflow,
};

// ---------------------------------------------------------------------------
// Difficulty badge styling
// ---------------------------------------------------------------------------

type Difficulty = BestPractice["difficulty"];

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Beginner: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  Intermediate: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  Advanced: "bg-red-500/10 text-red-600 border-red-500/30",
};

const DIFFICULTY_OPTIONS: Array<{ label: string; value: Difficulty | "All" }> = [
  { label: "All Levels", value: "All" },
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
];

// ---------------------------------------------------------------------------
// Category badge colors (rotate a palette)
// ---------------------------------------------------------------------------

const CATEGORY_COLORS: Record<string, string> = {
  Prompting: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  "Advanced Techniques": "bg-violet-500/10 text-violet-600 border-violet-500/30",
  Security: "bg-red-500/10 text-red-600 border-red-500/30",
  Workflow: "bg-cyan-500/10 text-cyan-600 border-cyan-500/30",
  Troubleshooting: "bg-orange-500/10 text-orange-600 border-orange-500/30",
  Collaboration: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
};

// ---------------------------------------------------------------------------
// Practice card sub-component
// ---------------------------------------------------------------------------

function PracticeCard({ practice }: { practice: BestPractice }) {
  const Icon = ICON_MAP[practice.icon] ?? Lightbulb;

  return (
    <Card
      className="flex flex-col transition-all hover:shadow-lg"
      data-testid={`practice-card-${practice.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-wrap gap-1.5 justify-end">
            <Badge
              className={cn(
                CATEGORY_COLORS[practice.category] ?? "bg-muted text-muted-foreground",
                "border text-xs font-medium"
              )}
            >
              {practice.category}
            </Badge>
            <Badge
              className={cn(
                DIFFICULTY_STYLES[practice.difficulty],
                "border text-xs font-semibold"
              )}
            >
              {practice.difficulty}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-base mt-3">{practice.title}</CardTitle>
        <CardDescription className="line-clamp-3 min-h-[48px]">
          {practice.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pt-0">
        <Accordion type="single" collapsible>
          <AccordionItem value="tips" className="border-b-0">
            <AccordionTrigger
              className="py-2 text-sm font-medium hover:no-underline"
              data-testid={`tips-trigger-${practice.id}`}
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                {practice.tips.length} Actionable Tips
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2" data-testid={`tips-list-${practice.id}`}>
                {practice.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Main exported component
// ---------------------------------------------------------------------------

export function BestPracticesTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty | "All">("All");

  const handleCategoryChange = useCallback((id: string) => {
    setActiveCategory(id);
  }, []);

  const handleDifficultyChange = useCallback((value: Difficulty | "All") => {
    setActiveDifficulty(value);
  }, []);

  const filteredPractices = useMemo(() => {
    return BEST_PRACTICES.filter((practice) => {
      const matchesSearch =
        searchQuery === "" ||
        practice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        practice.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || practice.category === activeCategory;
      const matchesDifficulty =
        activeDifficulty === "All" || practice.difficulty === activeDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, activeCategory, activeDifficulty]);

  return (
    <div className="space-y-6" data-testid="tab-best-practices">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            Best Practices
          </h2>
          <p className="text-muted-foreground mt-1">
            Proven patterns and actionable tips for getting the most out of your AI platform.
          </p>
        </div>
        <Badge
          variant="secondary"
          className="text-sm self-start"
          data-testid="badge-practice-count"
        >
          {filteredPractices.length} of {BEST_PRACTICES.length} practices
        </Badge>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search practices..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-testid="input-best-practices-search"
        />
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2" data-testid="best-practices-category-filters">
        {PRACTICE_CATEGORIES.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => handleCategoryChange(cat.id)}
            data-testid={`filter-category-${cat.id}`}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Difficulty filter pills */}
      <div className="flex flex-wrap gap-2" data-testid="best-practices-difficulty-filters">
        {DIFFICULTY_OPTIONS.map((opt) => (
          <Button
            key={opt.value}
            variant={activeDifficulty === opt.value ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => handleDifficultyChange(opt.value)}
            data-testid={`filter-difficulty-${opt.value}`}
          >
            {opt.label}
          </Button>
        ))}
      </div>

      <Separator />

      {/* Practice cards grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        data-testid="best-practices-grid"
      >
        {filteredPractices.map((practice) => (
          <PracticeCard key={practice.id} practice={practice} />
        ))}
      </div>

      {/* Empty state */}
      {filteredPractices.length === 0 && (
        <div
          className="text-center py-12 text-muted-foreground"
          data-testid="best-practices-empty"
        >
          <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg font-medium">No practices found</p>
          <p className="text-sm">
            Try adjusting your search, category, or difficulty filter.
          </p>
        </div>
      )}
    </div>
  );
}
