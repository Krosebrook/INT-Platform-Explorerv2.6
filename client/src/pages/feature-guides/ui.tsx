import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import {
  Globe,
  Brain,
  PanelRight,
  Terminal,
  FileSearch,
  Eye,
  Mic,
  FolderKanban,
  Users,
  Code,
  Search,
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  Target,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { FEATURE_GUIDES, type FeatureGuide } from "./data";

// ---------------------------------------------------------------------------
// Icon lookup
// ---------------------------------------------------------------------------
const ICON_MAP: Record<string, typeof Globe> = {
  Globe,
  Brain,
  PanelRight,
  Terminal,
  FileSearch,
  Eye,
  Mic,
  FolderKanban,
  Users,
  Code,
};

function resolveIcon(name: string) {
  return ICON_MAP[name] ?? BookOpen;
}

// ---------------------------------------------------------------------------
// Status badge colours
// ---------------------------------------------------------------------------
function statusBadgeClass(status: FeatureGuide["status"]): string {
  switch (status) {
    case "GA":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "Beta":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
    case "Coming Soon":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
  }
}

// ---------------------------------------------------------------------------
// Category badge colours
// ---------------------------------------------------------------------------
function categoryBadgeClass(category: FeatureGuide["category"]): string {
  switch (category) {
    case "Core":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    case "Advanced":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
    case "Enterprise":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
  }
}

// ---------------------------------------------------------------------------
// Category type
// ---------------------------------------------------------------------------
type CategoryFilter = "All" | FeatureGuide["category"];

// ---------------------------------------------------------------------------
// Feature card (grid item)
// ---------------------------------------------------------------------------
function FeatureCard({
  guide,
  onSelect,
}: {
  guide: FeatureGuide;
  onSelect: (g: FeatureGuide) => void;
}) {
  const Icon = resolveIcon(guide.icon);

  return (
    <Card
      className="hover-elevate cursor-pointer transition-all"
      onClick={() => onSelect(guide)}
      data-testid={`card-feature-${guide.id}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{guide.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="secondary"
                  className={`text-xs ${categoryBadgeClass(guide.category)}`}
                >
                  {guide.category}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`text-xs ${statusBadgeClass(guide.status)}`}
                >
                  {guide.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {guide.description}
        </p>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Detail view
// ---------------------------------------------------------------------------
function FeatureDetail({
  guide,
  onBack,
}: {
  guide: FeatureGuide;
  onBack: () => void;
}) {
  const Icon = resolveIcon(guide.icon);

  return (
    <div className="space-y-6" data-testid={`detail-feature-${guide.id}`}>
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        data-testid="button-back-to-guides"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to guides
      </Button>

      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Icon className="h-7 w-7 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">{guide.name}</CardTitle>
              <CardDescription className="mt-1">
                {guide.description}
              </CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant="secondary"
                  className={`text-xs ${categoryBadgeClass(guide.category)}`}
                >
                  {guide.category}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`text-xs ${statusBadgeClass(guide.status)}`}
                >
                  {guide.status}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Content sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Highlights */}
        <Card data-testid="section-highlights">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              Key Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {guide.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card data-testid="section-use-cases">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              Use Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {guide.useCases.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <div className="h-4 w-4 mt-0.5 flex-shrink-0 flex items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-blue-500" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Pro Tips */}
      <Card data-testid="section-tips">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            Pro Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {guide.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Lightbulb className="h-4 w-4 mt-0.5 text-yellow-500 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main exported component
// ---------------------------------------------------------------------------
export function FeatureGuidesTab() {
  const [selectedGuide, setSelectedGuide] = useState<FeatureGuide | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelect = useCallback((guide: FeatureGuide) => {
    setSelectedGuide(guide);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedGuide(null);
  }, []);

  const filteredGuides = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return FEATURE_GUIDES.filter((g) => {
      const matchesCategory =
        categoryFilter === "All" || g.category === categoryFilter;
      const matchesSearch =
        query === "" ||
        g.name.toLowerCase().includes(query) ||
        g.description.toLowerCase().includes(query) ||
        g.category.toLowerCase().includes(query) ||
        g.status.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchQuery]);

  const categories: CategoryFilter[] = ["All", "Core", "Advanced", "Enterprise"];

  // -----------------------------------------------------------------------
  // Detail view
  // -----------------------------------------------------------------------
  if (selectedGuide) {
    return (
      <div data-testid="tab-feature-guides">
        <FeatureDetail guide={selectedGuide} onBack={handleBack} />
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // Grid / list view
  // -----------------------------------------------------------------------
  return (
    <div className="space-y-6" data-testid="tab-feature-guides">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            Feature Guides
          </h2>
          <p className="text-muted-foreground mt-1">
            Explore platform capabilities, use cases, and best-practice tips
          </p>
        </div>
        <Badge variant="secondary" className="text-sm" data-testid="badge-guide-count">
          {FEATURE_GUIDES.length} Guides
        </Badge>
      </div>

      <Separator />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-guides"
          />
        </div>

        {/* Category buttons */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? FEATURE_GUIDES.length
                : FEATURE_GUIDES.filter((g) => g.category === cat).length;
            return (
              <Button
                key={cat}
                variant={categoryFilter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(cat)}
                data-testid={`filter-category-${cat.toLowerCase()}`}
              >
                {cat} ({count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {filteredGuides.length === 0 ? (
        <Card data-testid="empty-state">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No feature guides match your filters. Try adjusting the search or category.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="grid-feature-guides">
          {filteredGuides.map((guide) => (
            <FeatureCard
              key={guide.id}
              guide={guide}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
