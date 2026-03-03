import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import {
  LayoutDashboard,
  Layers,
  FolderKanban,
  Globe2,
  Users,
  Search,
  GitCompareArrows,
  Calculator,
  Target,
  ClipboardCheck,
  Brain,
  ArrowRight,
  Rocket,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

interface StatItem {
  label: string;
  value: string;
  icon: React.ElementType;
  accent: string;
}

const stats: StatItem[] = [
  {
    label: "Active Platforms",
    value: "50",
    icon: Layers,
    accent: "text-primary",
  },
  {
    label: "Categories",
    value: "7",
    icon: FolderKanban,
    accent: "text-chart-2",
  },
  {
    label: "Ecosystems",
    value: "8",
    icon: Globe2,
    accent: "text-chart-3",
  },
  {
    label: "Total Personas",
    value: "72",
    icon: Users,
    accent: "text-chart-4",
  },
];

interface NavCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  accentClass: string;
}

const navCards: NavCard[] = [
  {
    id: "explorer",
    title: "Platform Explorer",
    description: "Browse and filter all 50 AI platforms with advanced search",
    icon: Search,
    href: "/explorer",
    accentClass: "from-blue-500 to-cyan-500",
  },
  {
    id: "comparison",
    title: "Comparison Engine",
    description: "Side-by-side capability scoring across platforms",
    icon: GitCompareArrows,
    href: "/comparison",
    accentClass: "from-violet-500 to-purple-500",
  },
  {
    id: "roi",
    title: "ROI Calculator",
    description: "Model costs, savings and payback period for any stack",
    icon: Calculator,
    href: "/roi",
    accentClass: "from-emerald-500 to-green-500",
  },
  {
    id: "strategy",
    title: "Strategy Advisor",
    description: "Tier-based deployment roadmap and ecosystem strategy",
    icon: Target,
    href: "/strategy",
    accentClass: "from-amber-500 to-orange-500",
  },
  {
    id: "assessment",
    title: "Assessment Engine",
    description: "Multi-step readiness evaluation for your organization",
    icon: ClipboardCheck,
    href: "/assessment",
    accentClass: "from-rose-500 to-pink-500",
  },
  {
    id: "intelligence",
    title: "Intelligence Engine",
    description: "Personalized AI platform recommendations by fit score",
    icon: Brain,
    href: "/intelligence",
    accentClass: "from-indigo-500 to-blue-500",
  },
];

interface ActionItem {
  step: number;
  label: string;
  description: string;
}

const gettingStarted: ActionItem[] = [
  {
    step: 1,
    label: "Explore platforms",
    description: "Browse the full catalogue of 50 AI platforms with filters for category, tier and ecosystem.",
  },
  {
    step: 2,
    label: "Compare options",
    description: "Select up to four platforms and compare capabilities side-by-side.",
  },
  {
    step: 3,
    label: "Calculate ROI",
    description: "Input your organization's parameters to model expected return on investment.",
  },
  {
    step: 4,
    label: "Build strategy",
    description: "Review the tier-based strategy and build a phased deployment roadmap.",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DashboardTab() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const handleNavigate = useCallback((href: string) => {
    // Use wouter-compatible programmatic navigation via pushState
    window.history.pushState(null, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  return (
    <div className="space-y-8" data-testid="dashboard-tab">
      {/* Page header */}
      <div className="flex flex-col items-center text-center gap-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25">
          <LayoutDashboard className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl mx-auto">
            Your command centre for the INT Platform Explorer. View key metrics, jump to
            any tool, or follow the guided workflow below.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Stats cards row                                                     */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        data-testid="dashboard-stats"
      >
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="shrink-0 rounded-lg bg-muted p-2.5">
                  <Icon className={`w-5 h-5 ${s.accent}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Quick navigation section                                            */}
      {/* ------------------------------------------------------------------ */}
      <section data-testid="dashboard-quick-nav">
        <div className="flex items-center gap-2 mb-4">
          <Rocket className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Quick Navigation</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {navCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.id}
                className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/40"
                data-testid={`dashboard-nav-${card.id}`}
                onMouseEnter={() => setHoveredNav(card.id)}
                onMouseLeave={() => setHoveredNav(null)}
                onClick={() => handleNavigate(card.href)}
                tabIndex={0}
                role="link"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleNavigate(card.href);
                  }
                }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${card.accentClass} text-white shadow-sm`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 text-muted-foreground transition-transform ${
                        hoveredNav === card.id ? "translate-x-0.5 text-primary" : ""
                      }`}
                    />
                  </div>
                  <CardTitle className="text-base mt-3">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{card.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Getting Started section                                             */}
      {/* ------------------------------------------------------------------ */}
      <section data-testid="dashboard-getting-started">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <CardTitle className="text-xl">Getting Started</CardTitle>
            </div>
            <CardDescription>
              Follow these four steps to get the most out of the INT Platform Explorer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gettingStarted.map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-4 rounded-lg border p-4 bg-muted/30"
                  data-testid={`dashboard-step-${item.step}`}
                >
                  <Badge
                    variant="outline"
                    className="mt-0.5 shrink-0 h-7 w-7 items-center justify-center rounded-full border-primary text-primary font-bold"
                  >
                    {item.step}
                  </Badge>
                  <div>
                    <p className="font-medium leading-tight">{item.label}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Ready to dive in? Start by exploring the full platform catalogue.
              </p>
              <Button
                size="sm"
                className="gap-1.5"
                onClick={() => handleNavigate("/explorer")}
                data-testid="dashboard-cta-explore"
              >
                <Search className="w-4 h-4" />
                Open Explorer
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
