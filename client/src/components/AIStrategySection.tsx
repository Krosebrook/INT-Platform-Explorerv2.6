import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Shield,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Target,
  Zap,
  BarChart3,
  FileText,
  Calendar,
  Building2,
  Lock,
  Search,
  Sparkles,
  MessageSquare
} from "lucide-react";
import {
  hybridIntelligenceModel,
  dataTriageMatrix,
  departmentROI,
  pilotProgram,
  strategyMetrics,
  objectionBattleCard,
  aiStrategyMetadata,
  type HybridIntelligenceModel,
  type DataTriageEntry,
  type DepartmentROI
} from "@/lib/aiStrategyData";

function OverviewSection() {
  const [expandedObjection, setExpandedObjection] = useState<string | null>(null);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "foundation": return <Shield className="w-5 h-5" />;
      case "specialist": return <Brain className="w-5 h-5" />;
      case "research": return <Search className="w-5 h-5" />;
      case "creative": return <Sparkles className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "foundation": return "bg-blue-500";
      case "specialist": return "bg-purple-500";
      case "research": return "bg-green-500";
      case "creative": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card data-testid="card-strategy-overview">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Hybrid Intelligence Model
              </CardTitle>
              <CardDescription>{aiStrategyMetadata.corePrinciple}</CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="default">{aiStrategyMetadata.status}</Badge>
              <Badge variant="outline">{aiStrategyMetadata.teamSize} Team Members</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <DollarSign className="w-6 h-6 mx-auto mb-1 text-green-500" />
              <div className="text-sm text-muted-foreground">Year 1 Investment</div>
              <div className="font-semibold">{strategyMetrics.year1Investment}</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <Clock className="w-6 h-6 mx-auto mb-1 text-blue-500" />
              <div className="text-sm text-muted-foreground">Time Savings</div>
              <div className="font-semibold">{strategyMetrics.projectedTimeSavings}</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <TrendingUp className="w-6 h-6 mx-auto mb-1 text-purple-500" />
              <div className="text-sm text-muted-foreground">3-Year ROI</div>
              <div className="font-semibold">{strategyMetrics.threeYearROI}</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <Target className="w-6 h-6 mx-auto mb-1 text-orange-500" />
              <div className="text-sm text-muted-foreground">Breakeven</div>
              <div className="font-semibold">{strategyMetrics.breakevenTimeline}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hybridIntelligenceModel.map((model) => (
          <Card key={model.id} data-testid={`card-model-${model.id}`} className="hover-elevate">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${getRoleColor(model.role)} text-white`}>
                    {getRoleIcon(model.role)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <CardDescription>{model.platform}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="capitalize">{model.role}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{model.description}</p>
              
              <div>
                <div className="text-xs font-medium mb-1">Primary Use Cases:</div>
                <div className="flex flex-wrap gap-1">
                  {model.primaryUse.slice(0, 3).map((use, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{use}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm font-medium">{model.pricing}</span>
                <div className="flex gap-1">
                  {model.complianceCerts.slice(0, 2).map((cert, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      <Lock className="w-3 h-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Objection Battle Card
          </CardTitle>
          <CardDescription>Common objections and strategic responses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {objectionBattleCard.map((item) => (
            <div key={item.id} className="border rounded-lg p-3">
              <button
                onClick={() => setExpandedObjection(expandedObjection === item.id ? null : item.id)}
                className="w-full flex items-center justify-between text-left"
                data-testid={`btn-objection-${item.id}`}
              >
                <span className="font-medium text-sm">{item.objection}</span>
                {expandedObjection === item.id ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              {expandedObjection === item.id && (
                <div className="mt-3 pt-3 border-t space-y-2">
                  <p className="text-sm text-muted-foreground">{item.response}</p>
                  <div className="flex items-center gap-2 text-xs bg-muted/50 p-2 rounded">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <span className="font-medium">Key Data:</span>
                    <span>{item.keyData}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function DataTriageSection() {
  const getSecurityBadge = (level: string) => {
    switch (level) {
      case "restricted":
        return <Badge className="bg-red-500 hover:bg-red-600">Restricted</Badge>;
      case "confidential":
        return <Badge className="bg-orange-500 hover:bg-orange-600">Confidential</Badge>;
      case "standard":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">Standard</Badge>;
      case "public":
        return <Badge className="bg-green-500 hover:bg-green-600">Public</Badge>;
      default:
        return <Badge variant="secondary">{level}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card data-testid="card-data-triage-overview">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Data Triage Matrix
          </CardTitle>
          <CardDescription>
            Governance framework defining what data goes where. This addresses security concerns by clearly mapping data types to approved platforms.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted/50 rounded-lg mb-4">
            <p className="text-center font-semibold text-lg">
              {aiStrategyMetadata.corePrinciple}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {dataTriageMatrix.map((entry) => (
          <Card key={entry.id} data-testid={`card-triage-${entry.id}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-12 rounded-full ${entry.color}`} />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{entry.dataType}</h3>
                      {getSecurityBadge(entry.securityLevel)}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {entry.platforms.map((platform, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{platform}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground mb-1">Examples:</div>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {entry.examples.map((example, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{example}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Platform Security Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Platform</th>
                  <th className="text-center py-2 px-2">SOC 2</th>
                  <th className="text-center py-2 px-2">ISO 27001</th>
                  <th className="text-center py-2 px-2">HIPAA</th>
                  <th className="text-center py-2 px-2">FedRAMP</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 font-medium">Microsoft Copilot</td>
                  <td className="text-center py-2"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 font-medium">Claude (Anthropic)</td>
                  <td className="text-center py-2"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2"><AlertTriangle className="w-4 h-4 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2 font-medium">ChatGPT (OpenAI)</td>
                  <td className="text-center py-2"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2"><AlertTriangle className="w-4 h-4 text-yellow-500 mx-auto" /></td>
                  <td className="text-center py-2"><AlertTriangle className="w-4 h-4 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="py-2 px-2 font-medium">Gemini (Google)</td>
                  <td className="text-center py-2"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2"><CheckCircle className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2"><AlertTriangle className="w-4 h-4 text-yellow-500 mx-auto" /></td>
                  <td className="text-center py-2"><AlertTriangle className="w-4 h-4 text-yellow-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-500" /> Full Certification
            </div>
            <div className="flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-yellow-500" /> Limited / Enterprise Only
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ROISection() {
  const [expandedDept, setExpandedDept] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <Card data-testid="card-roi-overview">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Department ROI Quick Reference
          </CardTitle>
          <CardDescription>
            INT Inc-specific ROI projections by department, based on McKinsey and Gartner benchmarks applied to the {aiStrategyMetadata.teamSize}-person team structure.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {departmentROI.map((dept) => (
          <Card key={dept.id} data-testid={`card-roi-${dept.id}`} className="hover-elevate">
            <CardContent className="p-4">
              <div 
                className="cursor-pointer"
                onClick={() => setExpandedDept(expandedDept === dept.id ? null : dept.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                    <h3 className="font-semibold text-lg">{dept.department}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500 hover:bg-green-600">ROI: {dept.roiRange}</Badge>
                    {expandedDept === dept.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Platforms</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {dept.platforms.map((p, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{p}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Time Savings</div>
                    <div className="font-semibold text-blue-500">{dept.timeSavings}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Cost Impact</div>
                    <div className="font-semibold text-green-500">{dept.costImpact}</div>
                  </div>
                </div>
              </div>

              {expandedDept === dept.id && (
                <div className="pt-3 border-t space-y-3">
                  <div>
                    <div className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      Key Use Cases
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {dept.keyUseCases.map((useCase, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {useCase}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      Pain Points Addressed
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {dept.painPoints.map((pain, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          {pain}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PilotProgramSection() {
  return (
    <div className="space-y-6">
      <Card data-testid="card-pilot-overview">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                30-Day Pilot Proposal
              </CardTitle>
              <CardDescription>Structured pilot to validate AI tools before company-wide rollout</CardDescription>
            </div>
            <Badge variant="default" className="text-lg px-3 py-1">{pilotProgram.totalInvestment}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Budget Breakdown
              </h4>
              <div className="space-y-2">
                {pilotProgram.budget.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm p-2 bg-muted/50 rounded">
                    <span>{item.item}</span>
                    <span className="font-medium">{item.cost}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Participants (5 Users)
              </h4>
              <div className="space-y-2">
                {pilotProgram.participants.map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                    <div>
                      <span className="font-medium">{p.count}x</span> {p.role}
                    </div>
                    <Badge variant="outline" className="text-xs">{p.department}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Weekly Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {pilotProgram.weeklyStructure.map((week) => (
              <div key={week.week} className="border rounded-lg p-4" data-testid={`card-week-${week.week}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {week.week}
                  </div>
                  <span className="font-medium">Week {week.week}</span>
                </div>
                <ul className="space-y-2">
                  {week.activities.map((activity, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Success Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pilotProgram.successMetrics.map((metric, i) => (
              <div key={i} className="border rounded-lg p-4" data-testid={`card-metric-${i}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{metric.metric}</span>
                  <Badge variant="outline">{metric.target}</Badge>
                </div>
                <Progress value={0} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">Target: {metric.target}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5" />
            The Ask
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <div className="font-medium">Approval for pilot budget</div>
                <div className="text-sm text-muted-foreground">{pilotProgram.totalInvestment} (5 licenses for 3-5 months)</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <div className="font-medium">Provisional policy update</div>
                <div className="text-sm text-muted-foreground">Allow approved AI tools for non-PII tasks following Data Triage Matrix</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <div className="font-medium">30-day review checkpoint</div>
                <div className="text-sm text-muted-foreground">Assess ROI and decide to expand or terminate based on metrics</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AIStrategySection() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="overview" data-testid="strategy-subtab-overview">
            <Brain className="w-4 h-4 mr-1" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="triage" data-testid="strategy-subtab-triage">
            <Shield className="w-4 h-4 mr-1" />
            Data Triage
          </TabsTrigger>
          <TabsTrigger value="roi" data-testid="strategy-subtab-roi">
            <TrendingUp className="w-4 h-4 mr-1" />
            Dept ROI
          </TabsTrigger>
          <TabsTrigger value="pilot" data-testid="strategy-subtab-pilot">
            <Target className="w-4 h-4 mr-1" />
            Pilot Program
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <OverviewSection />
        </TabsContent>

        <TabsContent value="triage" className="mt-6">
          <DataTriageSection />
        </TabsContent>

        <TabsContent value="roi" className="mt-6">
          <ROISection />
        </TabsContent>

        <TabsContent value="pilot" className="mt-6">
          <PilotProgramSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
