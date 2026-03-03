// client/src/pages/governance/ui.tsx
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Checkbox } from "@/shared/ui/checkbox";
import { Separator } from "@/shared/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { cn } from "@/shared/lib/utils";
import {
  Shield,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  Clock,
  FileCheck2,
  BookOpen,
  ShieldAlert,
  ClipboardList,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Severity = "critical" | "high" | "medium" | "low";
type SLAStatus = "met" | "at-risk" | "breached";
type Likelihood = "low" | "medium" | "high";
type Impact = "low" | "medium" | "high";
type RiskCategory = "Security" | "Compliance" | "Operational" | "Technical";

interface PlaybookStep {
  order: number;
  role: string;
  action: string;
}

interface Playbook {
  id: string;
  severity: Severity;
  title: string;
  responseTimeTarget: string;
  escalationChain: string[];
  keyActions: string[];
}

interface SLAItem {
  id: string;
  metric: string;
  target: string;
  current: string;
  status: SLAStatus;
}

interface RiskItem {
  id: string;
  risk: string;
  category: RiskCategory;
  likelihood: Likelihood;
  impact: Impact;
  mitigation: string;
  owner: string;
}

interface ChecklistSection {
  title: string;
  items: { id: string; label: string }[];
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const PLAYBOOKS: Playbook[] = [
  {
    id: "pb-critical",
    severity: "critical",
    title: "Sensitive Data Exfiltration (PII/IP)",
    responseTimeTarget: "< 15 minutes",
    escalationChain: ["DLP System Auto-Block", "SecOps On-Call", "CISO", "Legal / Regulators"],
    keyActions: [
      "Verify DLP blocked the request automatically",
      "Pull full user session history for audit",
      "Notify user's manager and Legal Compliance",
      "Mandatory data-handling refresher for user",
    ],
  },
  {
    id: "pb-high",
    severity: "high",
    title: "Prompt Injection / Jailbreak Attempt",
    responseTimeTarget: "< 1 hour",
    escalationChain: ["Security Gateway Alert", "SecOps Analyst", "AI Ethics Lead", "CISO"],
    keyActions: [
      "Verify prompt log in Splunk; confirm policy violation",
      "Revoke user API access via Okta immediately",
      "Analyze prompt pattern and update global blocklist",
      "Deploy patched system prompt to production",
    ],
  },
  {
    id: "pb-medium",
    severity: "medium",
    title: "Unexpected Cost Spike",
    responseTimeTarget: "< 4 hours",
    escalationChain: ["FinOps Alert", "Engineering Lead", "Department Head"],
    keyActions: [
      "Identify top-consuming users in Usage Dashboard",
      "Apply temporary rate limits to high-volume accounts",
      "Check if legitimate business case (batch processing)",
      "Adjust quotas or optimise token usage",
    ],
  },
  {
    id: "pb-low",
    severity: "low",
    title: "Model Quality Degradation",
    responseTimeTarget: "< 24 hours",
    escalationChain: ["Quality Monitor", "AI Engineer", "Product Manager"],
    keyActions: [
      "Compare output quality scores against baseline",
      "Check vendor status page for known issues",
      "Switch traffic to backup model if sustained",
      "File vendor support ticket with evidence",
    ],
  },
];

const SLA_ITEMS: SLAItem[] = [
  { id: "sla-1", metric: "Uptime", target: "99.9%", current: "99.95%", status: "met" },
  { id: "sla-2", metric: "Response Time (P95)", target: "< 2s", current: "1.6s", status: "met" },
  { id: "sla-3", metric: "Throughput", target: "> 1,000 req/s", current: "1,120 req/s", status: "met" },
  { id: "sla-4", metric: "Error Rate", target: "< 0.1%", current: "0.08%", status: "met" },
  { id: "sla-5", metric: "Data Freshness", target: "< 5 min", current: "4.2 min", status: "at-risk" },
  { id: "sla-6", metric: "Recovery Time (RTO)", target: "< 1 hr", current: "45 min", status: "met" },
  { id: "sla-7", metric: "Incident Response (P1)", target: "< 1 hr", current: "52 min", status: "met" },
  { id: "sla-8", metric: "Support Ticket Resolution", target: "< 24 hr", current: "28 hr", status: "breached" },
];

const RISK_ITEMS: RiskItem[] = [
  { id: "r-1", risk: "Model hallucination leading to incorrect business decisions", category: "Security", likelihood: "medium", impact: "high", mitigation: "Mandatory human-in-the-loop verification. Disclaimer banners on all outputs.", owner: "AI Ethics Lead" },
  { id: "r-2", risk: "Prompt injection attacks bypassing safety filters", category: "Security", likelihood: "medium", impact: "high", mitigation: "System prompt hardening, input sanitisation layer, user training.", owner: "Security Architect" },
  { id: "r-3", risk: "GDPR non-compliance for EU employee data", category: "Compliance", likelihood: "low", impact: "high", mitigation: "Data residency pinning (Frankfurt), DPA with vendor, regular audits.", owner: "DPO" },
  { id: "r-4", risk: "Copyright infringement in generated code", category: "Compliance", likelihood: "low", impact: "medium", mitigation: "Enterprise indemnity coverage. Automated code-scanning tools.", owner: "Legal Counsel" },
  { id: "r-5", risk: "Vendor lock-in to single AI provider", category: "Operational", likelihood: "high", impact: "medium", mitigation: "Maintain abstraction gateway layer to enable model swapping.", owner: "Engineering Lead" },
  { id: "r-6", risk: "API rate-limit exhaustion during peak hours", category: "Operational", likelihood: "medium", impact: "medium", mitigation: "Request queuing, prompt caching, smart model routing.", owner: "SRE Team" },
  { id: "r-7", risk: "Supply-chain vulnerability in open-source dependencies", category: "Technical", likelihood: "medium", impact: "high", mitigation: "Dependabot alerts, SBOM generation, quarterly dependency audit.", owner: "DevSecOps" },
  { id: "r-8", risk: "Latency regression after model version upgrade", category: "Technical", likelihood: "low", impact: "medium", mitigation: "Canary deployments, automated performance benchmarks in CI.", owner: "Platform Team" },
];

const STAGING_CHECKLIST: ChecklistSection[] = [
  {
    title: "Security Review",
    items: [
      { id: "sec-1", label: "System prompt includes latest data-privacy directive" },
      { id: "sec-2", label: "PII redaction regex updated and tested" },
      { id: "sec-3", label: "RBAC permissions verified for all roles" },
      { id: "sec-4", label: "Audit log export to Splunk confirmed" },
      { id: "sec-5", label: "Rate-limiting thresholds reviewed" },
    ],
  },
  {
    title: "Performance Testing",
    items: [
      { id: "perf-1", label: "Load tested with 50 concurrent users" },
      { id: "perf-2", label: "P95 latency under 2-second SLA target" },
      { id: "perf-3", label: "Memory and CPU profiling completed" },
      { id: "perf-4", label: "CDN cache-hit ratio above 90%" },
    ],
  },
  {
    title: "Data Validation",
    items: [
      { id: "data-1", label: "MCP servers (GitHub, Notion) connected and authenticated" },
      { id: "data-2", label: "Database migration scripts tested on staging clone" },
      { id: "data-3", label: "Data freshness pipeline verified (< 5 min lag)" },
      { id: "data-4", label: "Backup and restore procedure validated" },
    ],
  },
  {
    title: "Rollback Plan",
    items: [
      { id: "rb-1", label: "Blue-green deployment toggle confirmed" },
      { id: "rb-2", label: "Database rollback script tested" },
      { id: "rb-3", label: "DNS failover to previous version ready" },
      { id: "rb-4", label: "Incident communication template prepared" },
      { id: "rb-5", label: "On-call schedule confirmed for launch window" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Severity / status helpers
// ---------------------------------------------------------------------------

const SEVERITY_CONFIG: Record<
  Severity,
  { color: string; bg: string; border: string; icon: React.ComponentType<{ className?: string }> }
> = {
  critical: { color: "text-red-600", bg: "bg-red-500/10", border: "border-red-500/30", icon: AlertCircle },
  high: { color: "text-orange-600", bg: "bg-orange-500/10", border: "border-orange-500/30", icon: AlertTriangle },
  medium: { color: "text-yellow-600", bg: "bg-yellow-500/10", border: "border-yellow-500/30", icon: Info },
  low: { color: "text-blue-600", bg: "bg-blue-500/10", border: "border-blue-500/30", icon: CheckCircle2 },
};

function SeverityBadge({ severity }: { severity: Severity }) {
  const config = SEVERITY_CONFIG[severity];
  return (
    <Badge
      className={cn(
        config.bg,
        config.color,
        config.border,
        "border font-semibold capitalize"
      )}
    >
      {severity}
    </Badge>
  );
}

function SLAStatusBadge({ status }: { status: SLAStatus }) {
  const styles: Record<SLAStatus, string> = {
    met: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    "at-risk": "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
    breached: "bg-red-500/10 text-red-600 border-red-500/30",
  };
  const labels: Record<SLAStatus, string> = {
    met: "Met",
    "at-risk": "At Risk",
    breached: "Breached",
  };
  return (
    <Badge className={cn(styles[status], "border font-semibold capitalize")}>
      {labels[status]}
    </Badge>
  );
}

function LikelihoodBadge({ level }: { level: Likelihood | Impact }) {
  const styles: Record<string, string> = {
    low: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
    high: "bg-red-500/10 text-red-600 border-red-500/30",
  };
  return (
    <Badge className={cn(styles[level], "border font-semibold capitalize")}>
      {level}
    </Badge>
  );
}

// ---------------------------------------------------------------------------
// Sub-tab components
// ---------------------------------------------------------------------------

function IRPlaybooksTab() {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      data-testid="ir-playbooks"
    >
      {PLAYBOOKS.map((pb) => {
        const config = SEVERITY_CONFIG[pb.severity];
        const SevIcon = config.icon;
        return (
          <Card
            key={pb.id}
            className={cn(config.border, "border")}
            data-testid={`playbook-${pb.severity}`}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <CardTitle className="text-base flex items-center gap-2">
                    <SevIcon className={cn("w-4 h-4", config.color)} />
                    {pb.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Response target: {pb.responseTimeTarget}
                  </CardDescription>
                </div>
                <SeverityBadge severity={pb.severity} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Escalation Chain
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {pb.escalationChain.map((step, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {idx + 1}. {step}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Key Actions
                </p>
                <ul className="space-y-1.5">
                  {pb.keyActions.map((action, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm"
                    >
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function SLAMetricsTab() {
  return (
    <Card data-testid="sla-metrics">
      <CardHeader>
        <CardTitle className="text-base">Service Level Agreements</CardTitle>
        <CardDescription>
          Current performance against defined SLA targets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Current</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SLA_ITEMS.map((item) => (
              <TableRow key={item.id} data-testid={`sla-row-${item.id}`}>
                <TableCell className="font-medium">{item.metric}</TableCell>
                <TableCell className="font-mono text-muted-foreground">
                  {item.target}
                </TableCell>
                <TableCell className="font-mono">{item.current}</TableCell>
                <TableCell className="text-right">
                  <SLAStatusBadge status={item.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function RiskRegisterTab() {
  return (
    <Card data-testid="risk-register">
      <CardHeader>
        <CardTitle className="text-base">Risk Register</CardTitle>
        <CardDescription>
          Identified risks with likelihood, impact, and mitigation plans
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Risk</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Likelihood</TableHead>
              <TableHead>Impact</TableHead>
              <TableHead className="min-w-[200px]">Mitigation</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RISK_ITEMS.map((item) => (
              <TableRow key={item.id} data-testid={`risk-row-${item.id}`}>
                <TableCell className="font-medium">{item.risk}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.category}</Badge>
                </TableCell>
                <TableCell>
                  <LikelihoodBadge level={item.likelihood} />
                </TableCell>
                <TableCell>
                  <LikelihoodBadge level={item.impact} />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {item.mitigation}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap">
                  {item.owner}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function StagingChecklistTab() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleToggle = useCallback((id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const totalItems = STAGING_CHECKLIST.flatMap((s) => s.items).length;
  const completedItems = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="space-y-6" data-testid="staging-checklist">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Checklist progress
            </span>
            <span className="font-mono font-medium">
              {completedItems} / {totalItems} complete
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {STAGING_CHECKLIST.map((section) => (
          <Card key={section.title} data-testid={`checklist-section-${section.title.toLowerCase().replace(/\s+/g, "-")}`}>
            <CardHeader>
              <CardTitle className="text-base">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.items.map((item) => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <label
                      key={item.id}
                      className="flex items-start gap-2.5 cursor-pointer"
                      data-testid={`checklist-item-${item.id}`}
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => handleToggle(item.id)}
                        className="mt-0.5"
                      />
                      <span
                        className={cn(
                          "text-sm leading-tight",
                          isChecked && "line-through text-muted-foreground"
                        )}
                      >
                        {item.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function GovernanceTab() {
  return (
    <div className="space-y-6" data-testid="governance-compliance">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Governance & Compliance
          </h2>
          <p className="text-sm text-muted-foreground">
            Incident response playbooks, SLA tracking, risk management, and
            pre-deployment checklists
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1.5">
          <FileCheck2 className="w-3.5 h-3.5" />
          Enterprise-Grade Controls
        </Badge>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="playbooks" data-testid="governance-tabs">
        <TabsList className="w-full justify-start flex-wrap h-auto gap-1 bg-transparent p-0">
          <TabsTrigger
            value="playbooks"
            className="data-[state=active]:bg-muted"
            data-testid="tab-playbooks"
          >
            <ShieldAlert className="w-4 h-4 mr-1.5" />
            IR Playbooks
          </TabsTrigger>
          <TabsTrigger
            value="sla"
            className="data-[state=active]:bg-muted"
            data-testid="tab-sla"
          >
            <Clock className="w-4 h-4 mr-1.5" />
            SLA & Metrics
          </TabsTrigger>
          <TabsTrigger
            value="risks"
            className="data-[state=active]:bg-muted"
            data-testid="tab-risks"
          >
            <AlertTriangle className="w-4 h-4 mr-1.5" />
            Risk Register
          </TabsTrigger>
          <TabsTrigger
            value="checklist"
            className="data-[state=active]:bg-muted"
            data-testid="tab-checklist"
          >
            <ClipboardList className="w-4 h-4 mr-1.5" />
            Staging Checklist
          </TabsTrigger>
        </TabsList>

        <TabsContent value="playbooks">
          <IRPlaybooksTab />
        </TabsContent>
        <TabsContent value="sla">
          <SLAMetricsTab />
        </TabsContent>
        <TabsContent value="risks">
          <RiskRegisterTab />
        </TabsContent>
        <TabsContent value="checklist">
          <StagingChecklistTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
