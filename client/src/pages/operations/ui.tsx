import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui/tabs";
import { Separator } from "@/shared/ui/separator";
import { cn } from "@/shared/lib/utils";
import {
  Target,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  ArrowRight,
} from "lucide-react";

import type {
  ServiceTier,
  ROIPhase,
  SuccessMetric,
  TroubleshootingItem,
} from "./data";
import {
  serviceTiers,
  roiPhases,
  successMetrics,
  troubleshootingItems,
} from "./data";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function TrendIcon({ trend }: { trend: SuccessMetric["trend"] }) {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-emerald-500" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-rose-500" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
}

// ---------------------------------------------------------------------------
// Sub-tab: Service Tiers
// ---------------------------------------------------------------------------

function ServiceTiersSection() {
  return (
    <div className="space-y-6" data-testid="service-tiers-section">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {serviceTiers.map((tier) => (
          <Card
            key={tier.name}
            className={cn(
              "flex flex-col h-full relative overflow-hidden",
              tier.recommended && "ring-2 ring-primary shadow-lg",
            )}
            data-testid={`tier-card-${tier.name.toLowerCase()}`}
          >
            {tier.recommended && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                <Star className="w-3 h-3" />
                Recommended
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{tier.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{tier.description}</p>
              <div className="pt-2">
                <span className="text-2xl font-bold">{tier.price}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div>
                <Badge variant="outline" className="mb-3">
                  SLA: {tier.sla}
                </Badge>
              </div>
              <Separator />
              <ul className="space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-tab: ROI Framework
// ---------------------------------------------------------------------------

function ROIFrameworkSection() {
  return (
    <div className="space-y-6" data-testid="roi-framework-section">
      {/* Timeline connector */}
      <div className="relative">
        {roiPhases.map((phase, idx) => (
          <div key={phase.phase} className="flex gap-6 mb-8 last:mb-0">
            {/* Timeline rail */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                  idx === 0 && "bg-primary text-primary-foreground",
                  idx === 1 && "bg-chart-2 text-white",
                  idx === 2 && "bg-chart-3 text-white",
                  idx === 3 && "bg-chart-4 text-white",
                )}
              >
                {idx + 1}
              </div>
              {idx < roiPhases.length - 1 && (
                <div className="w-0.5 flex-1 bg-border my-1" />
              )}
            </div>

            {/* Phase card */}
            <Card className="flex-1" data-testid={`roi-phase-${idx + 1}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <CardTitle className="text-base">
                    {phase.phase}: {phase.title}
                  </CardTitle>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {phase.duration}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Activities
                    </p>
                    <ul className="space-y-1.5">
                      {phase.activities.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-sm">
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Deliverables
                    </p>
                    <ul className="space-y-1.5">
                      {phase.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-tab: Success Metrics
// ---------------------------------------------------------------------------

function SuccessMetricsSection() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      data-testid="success-metrics-section"
    >
      {successMetrics.map((metric) => (
        <Card
          key={metric.name}
          className="hover:shadow-md transition-shadow"
          data-testid={`metric-card-${metric.name.replace(/\s+/g, "-").toLowerCase()}`}
        >
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium leading-tight">{metric.name}</p>
              <TrendIcon trend={metric.trend} />
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono">{metric.current}</span>
                <span className="text-xs text-muted-foreground">{metric.unit}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Target: <span className="font-semibold">{metric.target}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-tab: Troubleshooting
// ---------------------------------------------------------------------------

function TroubleshootingSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return troubleshootingItems;
    const q = searchQuery.toLowerCase();
    return troubleshootingItems.filter(
      (item) =>
        item.problem.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.symptoms.some((s) => s.toLowerCase().includes(q)) ||
        item.solution.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const toggle = useCallback(
    (idx: number) => setExpandedIndex((prev) => (prev === idx ? null : idx)),
    [],
  );

  return (
    <div className="space-y-4" data-testid="troubleshooting-section">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search problems, symptoms, or solutions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          data-testid="troubleshooting-search"
        />
      </div>

      {/* Results */}
      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No matching issues found. Try a different search term.
        </p>
      )}

      <div className="space-y-3">
        {filtered.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <Card
              key={`${item.category}-${item.problem}`}
              data-testid={`troubleshooting-item-${idx}`}
            >
              <button
                type="button"
                className="w-full text-left p-4 flex items-start justify-between gap-3"
                onClick={() => toggle(idx)}
                aria-expanded={isExpanded}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm leading-tight">
                      {item.problem}
                    </p>
                    <Badge variant="outline" className="mt-1 text-[10px]">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3">
                  <Separator />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Symptoms
                    </p>
                    <ul className="space-y-1">
                      {item.symptoms.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Solution
                    </p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 rounded-md p-3">
                      {item.solution}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function OperationsTab() {
  return (
    <div className="space-y-6" data-testid="operations-tab">
      <Tabs defaultValue="tiers">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="tiers" className="flex items-center gap-1.5">
            <Target className="w-4 h-4" />
            Service Tiers
          </TabsTrigger>
          <TabsTrigger value="roi" className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4" />
            ROI Framework
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            Success Metrics
          </TabsTrigger>
          <TabsTrigger value="troubleshooting" className="flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            Troubleshooting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tiers">
          <ServiceTiersSection />
        </TabsContent>
        <TabsContent value="roi">
          <ROIFrameworkSection />
        </TabsContent>
        <TabsContent value="metrics">
          <SuccessMetricsSection />
        </TabsContent>
        <TabsContent value="troubleshooting">
          <TroubleshootingSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
