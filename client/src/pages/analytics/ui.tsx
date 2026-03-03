// client/src/pages/analytics/ui.tsx
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import { cn } from "@/shared/lib/utils";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Activity,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

interface KPI {
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
}

const KPI_CARDS: KPI[] = [
  {
    label: "Total Prompts",
    value: "1.2M",
    trend: "+12%",
    trendDirection: "up",
    icon: Activity,
  },
  {
    label: "Active Users",
    value: "847",
    trend: "+5%",
    trendDirection: "up",
    icon: Users,
  },
  {
    label: "Token Cost",
    value: "$12,450/mo",
    trend: "-3%",
    trendDirection: "down",
    icon: DollarSign,
  },
  {
    label: "Avg Response Time",
    value: "1.8s",
    trend: "-8%",
    trendDirection: "down",
    icon: Clock,
  },
];

const USAGE_OVER_TIME = [
  { month: "Oct", prompts: 142000 },
  { month: "Nov", prompts: 168000 },
  { month: "Dec", prompts: 185000 },
  { month: "Jan", prompts: 210000 },
  { month: "Feb", prompts: 198000 },
  { month: "Mar", prompts: 237000 },
];

const MODEL_USAGE = [
  { name: "GPT-4o", value: 35, color: "#6366f1" },
  { name: "Claude 3.5", value: 28, color: "#f59e0b" },
  { name: "Gemini Pro", value: 20, color: "#10b981" },
  { name: "Llama 3", value: 12, color: "#ef4444" },
  { name: "Other", value: 5, color: "#94a3b8" },
];

type DateRange = "7D" | "30D" | "90D" | "1Y";

const DATE_RANGE_LABELS: Record<DateRange, string> = {
  "7D": "Last 7 Days",
  "30D": "Last 30 Days",
  "90D": "Last 90 Days",
  "1Y": "Last Year",
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function KPICard({ kpi }: { kpi: KPI }) {
  const Icon = kpi.icon;
  const isPositive =
    (kpi.trendDirection === "up" && kpi.label !== "Token Cost") ||
    (kpi.trendDirection === "down" &&
      (kpi.label === "Token Cost" || kpi.label === "Avg Response Time"));

  return (
    <Card data-testid={`kpi-${kpi.label.toLowerCase().replace(/\s+/g, "-")}`}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
            <p className="text-2xl font-bold font-mono">{kpi.value}</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50">
            <Icon className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          {kpi.trendDirection === "up" ? (
            <TrendingUp
              className={cn(
                "w-4 h-4",
                isPositive ? "text-emerald-500" : "text-red-500"
              )}
            />
          ) : (
            <TrendingDown
              className={cn(
                "w-4 h-4",
                isPositive ? "text-emerald-500" : "text-red-500"
              )}
            />
          )}
          <span
            className={cn(
              "text-sm font-medium",
              isPositive ? "text-emerald-500" : "text-red-500"
            )}
          >
            {kpi.trend}
          </span>
          <span className="text-xs text-muted-foreground">vs last period</span>
        </div>
      </CardContent>
    </Card>
  );
}

function DateRangeFilter({
  active,
  onChange,
}: {
  active: DateRange;
  onChange: (range: DateRange) => void;
}) {
  const ranges: DateRange[] = ["7D", "30D", "90D", "1Y"];

  return (
    <div className="flex items-center gap-1" data-testid="date-range-filter">
      {ranges.map((range) => (
        <Button
          key={range}
          variant={active === range ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(range)}
          data-testid={`range-${range}`}
        >
          {range}
        </Button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function AnalyticsTab() {
  const [dateRange, setDateRange] = useState<DateRange>("30D");

  const handleDateRangeChange = useCallback((range: DateRange) => {
    setDateRange(range);
  }, []);

  return (
    <div className="space-y-6" data-testid="analytics-dashboard">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Analytics Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            Platform usage metrics and model performance &mdash;{" "}
            {DATE_RANGE_LABELS[dateRange]}
          </p>
        </div>
        <DateRangeFilter active={dateRange} onChange={handleDateRangeChange} />
      </div>

      {/* KPI Cards Row */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        data-testid="kpi-row"
      >
        {KPI_CARDS.map((kpi) => (
          <KPICard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <Separator />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage Over Time - BarChart */}
        <Card className="lg:col-span-2" data-testid="usage-chart">
          <CardHeader>
            <CardTitle className="text-base">Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={USAGE_OVER_TIME}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) =>
                    v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
                  }
                />
                <Tooltip
                  formatter={(value: number) => [
                    value.toLocaleString(),
                    "Prompts",
                  ]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--border))",
                    backgroundColor: "hsl(var(--card))",
                    color: "hsl(var(--card-foreground))",
                  }}
                />
                <Bar
                  dataKey="prompts"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  name="Prompt Volume"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Model Usage Breakdown - PieChart */}
        <Card data-testid="model-usage-chart">
          <CardHeader>
            <CardTitle className="text-base">Model Usage Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={MODEL_USAGE}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  label={({ name, value }: { name: string; value: number }) =>
                    `${name} ${value}%`
                  }
                >
                  {MODEL_USAGE.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Share"]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--border))",
                    backgroundColor: "hsl(var(--card))",
                    color: "hsl(var(--card-foreground))",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {MODEL_USAGE.map((entry) => (
                <div
                  key={entry.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span>{entry.name}</span>
                  </div>
                  <span className="font-mono text-muted-foreground">
                    {entry.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer badge */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
            <span className="font-medium">Data source:</span>
            <Badge variant="outline">Internal Telemetry</Badge>
            <Badge variant="outline">Aggregated &amp; Anonymized</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
