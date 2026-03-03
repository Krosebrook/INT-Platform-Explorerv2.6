import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { 
  Users, Shield, Zap, Code, Globe, Search, Brain, FileText,
  CheckCircle2, AlertTriangle, Star, ChevronDown, ChevronUp,
  Building2, TrendingUp, Briefcase, Headphones, Settings, Megaphone, X
} from "lucide-react";
import {
  taxonomyTeams,
  featureAccessMatrix,
  dataClassification,
  dataTriageMatrix,
  teamPlatformRecommendations,
  taxonomyMetadata,
  type TaxonomyRole,
  type TaxonomyTeam,
  type FeatureAccess
} from "@/lib/roleTaxonomyData";

// Simple debounce utility for optimization
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useState(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  });
  return debouncedValue;
}

const teamIcons: Record<string, typeof Users> = {
  executive: Building2,
  "sales-bd": TrendingUp,
  "client-success": Briefcase,
  engineering: Code,
  marketing: Megaphone,
  operations: Settings,
  "tech-services": Headphones
};

const teamColors: Record<string, string> = {
  executive: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "sales-bd": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "client-success": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  engineering: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  marketing: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  operations: "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300",
  "tech-services": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
};

function getFeatureIcon(access: FeatureAccess) {
  switch (access) {
    case "full":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "limited":
    case "test-stage":
    case "model-only":
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    case "none":
      return <X className="h-4 w-4 text-muted-foreground" />;
  }
}

function getFeatureLabel(access: FeatureAccess) {
  switch (access) {
    case "full": return "Full";
    case "limited": return "Limited";
    case "test-stage": return "Test/Stage";
    case "model-only": return "Model Only";
    case "none": return "None";
  }
}

function SecurityStars({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i <= level ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  );
}

function RoleCard({ role, teamId, onSelect }: { role: TaxonomyRole; teamId: string; onSelect: (r: TaxonomyRole) => void }) {
  return (
    <Card 
      className="hover-elevate cursor-pointer transition-all"
      onClick={() => onSelect(role)}
      data-testid={`card-taxonomy-role-${role.id}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">{role.title}</CardTitle>
            {role.alternateTitle && (
              <p className="text-xs text-muted-foreground">{role.alternateTitle}</p>
            )}
          </div>
          <SecurityStars level={role.securityClearance} />
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          <Badge variant="secondary" className={`text-xs ${teamColors[teamId]}`}>
            {role.department}
          </Badge>
          <Badge variant="outline" className="text-xs">{role.level}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{role.memoryFocus}</p>
        <div className="grid grid-cols-3 gap-1 pt-2 border-t">
          <div className="flex items-center gap-1 text-xs">
            <Globe className="h-3 w-3" />
            {getFeatureIcon(role.features.webSearch)}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Brain className="h-3 w-3" />
            {getFeatureIcon(role.features.memory)}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Code className="h-3 w-3" />
            {getFeatureIcon(role.features.codeExecution)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RoleDetailModal({ role, team, onClose }: { role: TaxonomyRole; team: TaxonomyTeam; onClose: () => void }) {
  const Icon = teamIcons[team.id] || Users;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <Card className="max-w-3xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <CardHeader className="border-b">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${teamColors[team.id].split(' ').slice(0, 1).join(' ')}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge className={teamColors[team.id]}>{role.department}</Badge>
                  <Badge variant="outline">{role.level}</Badge>
                  <SecurityStars level={role.securityClearance} />
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-role-modal">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Reports To:</span>
                <p className="font-medium">{role.reportsTo}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Team Size:</span>
                <p className="font-medium">{role.teamSize}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Level:</span>
                <p className="font-medium">{role.level}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Security:</span>
                <div className="font-medium"><SecurityStars level={role.securityClearance} /></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Claude Features
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { key: "webSearch", label: "Web Search", icon: Globe },
                  { key: "memory", label: "Memory", icon: Brain },
                  { key: "codeExecution", label: "Code Execution", icon: Code },
                  { key: "artifacts", label: "Artifacts", icon: FileText },
                  { key: "files", label: "Files", icon: FileText },
                  { key: "research", label: "Research", icon: Search }
                ].map(({ key, label, icon: FeatureIcon }) => {
                  const access = role.features[key as keyof typeof role.features];
                  return (
                    <div key={key} className="flex items-center justify-between p-2 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <FeatureIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{label}</span>
                      </div>
                      <Badge variant={access === "full" ? "default" : access === "none" ? "secondary" : "outline"}>
                        {getFeatureLabel(access)}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                Memory Focus
              </h4>
              <p className="text-muted-foreground">{role.memoryFocus}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Use Cases
              </h4>
              <ul className="space-y-2">
                {role.useCases.map((useCase, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-amber-500" />
                Guardrails
              </h4>
              <ul className="space-y-2">
                {role.guardrails.map((guardrail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>{guardrail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}

function FeatureMatrixTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Feature Access Matrix
        </CardTitle>
        <CardDescription>Claude feature access by team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-semibold">Team</th>
                <th className="text-center py-3 px-2 font-semibold">Web Search</th>
                <th className="text-center py-3 px-2 font-semibold">Memory</th>
                <th className="text-center py-3 px-2 font-semibold">Code Exec</th>
                <th className="text-center py-3 px-2 font-semibold">Artifacts</th>
                <th className="text-center py-3 px-2 font-semibold">Files</th>
                <th className="text-center py-3 px-2 font-semibold">Research</th>
              </tr>
            </thead>
            <tbody>
              {featureAccessMatrix.teams.map((team, i) => (
                <tr key={i} className="border-b hover:bg-muted/50" data-testid={`row-feature-${i}`}>
                  <td className="py-3 px-2 font-medium">{team.name}</td>
                  {[team.webSearch, team.memory, team.codeExec, team.artifacts, team.files, team.research].map((access, j) => (
                    <td key={j} className="text-center py-3 px-2">
                      <Badge 
                        variant={access === "full" ? "default" : access === "none" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {access === "full" ? "Full" : 
                         access === "none" ? "None" : 
                         access === "limited" ? "Limited" :
                         access === "test-stage" ? "Test" :
                         access === "model-only" ? "Model" : access}
                      </Badge>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function DataClassificationSection() {
  const getSecurityColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "restricted": return "border-red-500/50 bg-red-50/50 dark:bg-red-950/20";
      case "confidential": return "border-orange-500/50 bg-orange-50/50 dark:bg-orange-950/20";
      case "standard": return "border-yellow-500/50 bg-yellow-50/50 dark:bg-yellow-950/20";
      case "internal": return "border-blue-500/50 bg-blue-50/50 dark:bg-blue-950/20";
      case "public": return "border-green-500/50 bg-green-50/50 dark:bg-green-950/20";
      default: return "border-gray-500/50 bg-gray-50/50 dark:bg-gray-950/20";
    }
  };

  const getSecurityBadgeVariant = (level: string) => {
    switch (level.toLowerCase()) {
      case "restricted": return "destructive" as const;
      case "confidential": return "secondary" as const;
      default: return "outline" as const;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-amber-500" />
            Data Classification & Memory Guardrails
          </CardTitle>
          <CardDescription>Data sensitivity levels and access controls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dataClassification.map((level, i) => (
              <div 
                key={i} 
                className={`p-4 rounded-lg border ${getSecurityColor(level.level)}`}
                data-testid={`data-classification-${level.level.toLowerCase()}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={getSecurityBadgeVariant(level.level)}>
                    {level.level}
                  </Badge>
                </div>
                <p className="text-sm mb-1">{level.description}</p>
                <p className="text-xs text-muted-foreground">Available to: {level.availableTo}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card data-testid="card-data-triage-matrix">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            Data Triage Matrix
          </CardTitle>
          <CardDescription>
            Platform-to-data-type mapping: SECURE DATA stays in Microsoft. SPEED goes to the specialists.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dataTriageMatrix.map((entry, i) => (
              <div 
                key={i} 
                className={`p-4 rounded-lg border ${getSecurityColor(entry.securityLevel)}`}
                data-testid={`data-triage-${entry.dataType.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={getSecurityBadgeVariant(entry.securityLevel)}>
                      {entry.securityLevel}
                    </Badge>
                    <span className="font-medium">{entry.dataType}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {entry.platforms.map((platform, j) => (
                      <Badge key={j} variant="outline" className="text-xs">{platform}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {entry.examples.map((example, j) => (
                    <Badge key={j} variant="secondary" className="text-xs">{example}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card data-testid="card-team-platform-recommendations">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-500" />
            Team Platform Recommendations
          </CardTitle>
          <CardDescription>
            Recommended AI platforms by department based on role-specific needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(teamPlatformRecommendations).map(([team, rec]) => (
              <div key={team} className="p-3 rounded-lg border bg-muted/30" data-testid={`team-rec-${team.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{team}</span>
                  <div className="flex gap-1">
                    <Badge className="bg-primary/90">{rec.primary}</Badge>
                    {rec.secondary && <Badge variant="outline">{rec.secondary}</Badge>}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{rec.rationale}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TaxonomyOverviewCard() {
  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-500" />
          INT Inc Claude Role Taxonomy v{taxonomyMetadata.version}
        </CardTitle>
        <CardDescription>
          Production-Ready, B2B-Optimized, {taxonomyMetadata.fteCount} FTE Aligned
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Status:</span>
            <p className="font-medium text-green-600 dark:text-green-400">Ready for Deployment</p>
          </div>
          <div>
            <span className="text-muted-foreground">FTE Count:</span>
            <p className="font-medium">{taxonomyMetadata.fteCount}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Revenue:</span>
            <p className="font-medium">{taxonomyMetadata.revenue}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Generated:</span>
            <p className="font-medium">{taxonomyMetadata.generated}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          {taxonomyMetadata.companyType} ({taxonomyMetadata.ownership})
        </p>
      </CardContent>
    </Card>
  );
}

export function RoleTaxonomySection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string | "all">("all");
  const [selectedRole, setSelectedRole] = useState<TaxonomyRole | null>(null);
  const [expandedTeams, setExpandedTeams] = useState<Record<string, boolean>>(
    Object.fromEntries(taxonomyTeams.map(t => [t.id, true]))
  );

  // Throttled team toggle to prevent rapid layout shifts
  const toggleTeam = useCallback((teamId: string) => {
    setExpandedTeams(prev => ({ ...prev, [teamId]: !prev[teamId] }));
  }, []);

  const filteredTeams = taxonomyTeams.filter(team => 
    selectedTeam === "all" || team.id === selectedTeam
  ).map(team => ({
    ...team,
    roles: team.roles.filter(role =>
      searchQuery === "" ||
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.alternateTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.memoryFocus.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(team => team.roles.length > 0);

  const selectedTeamData = selectedRole 
    ? taxonomyTeams.find(t => t.roles.some(r => r.id === selectedRole.id)) 
    : null;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="roles" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
          <TabsTrigger value="roles" data-testid="taxonomy-subtab-roles">
            <Users className="h-4 w-4 mr-2" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="matrix" data-testid="taxonomy-subtab-matrix">
            <Zap className="h-4 w-4 mr-2" />
            Feature Matrix
          </TabsTrigger>
          <TabsTrigger value="security" data-testid="taxonomy-subtab-security">
            <Shield className="h-4 w-4 mr-2" />
            Data Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="mt-6 space-y-6">
          <TaxonomyOverviewCard />

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search roles, departments, or focus areas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-taxonomy-search"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTeam === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTeam("all")}
                data-testid="filter-team-all"
              >
                All Teams
              </Button>
              {taxonomyTeams.map(team => {
                const Icon = teamIcons[team.id] || Users;
                return (
                  <Button
                    key={team.id}
                    variant={selectedTeam === team.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTeam(team.id)}
                    data-testid={`filter-team-${team.id}`}
                  >
                    <Icon className="h-4 w-4 mr-1" />
                    {team.name.split(" ")[0]}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            {filteredTeams.map(team => {
              const Icon = teamIcons[team.id] || Users;
              const isExpanded = expandedTeams[team.id];

              return (
                <Card key={team.id} data-testid={`team-section-${team.id}`}>
                  <CardHeader 
                    className="cursor-pointer hover-elevate"
                    onClick={() => toggleTeam(team.id)}
                  >
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${teamColors[team.id].split(' ').slice(0, 1).join(' ')}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{team.name}</CardTitle>
                          <CardDescription>{team.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{team.roleCount}</Badge>
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </div>
                  </CardHeader>
                  {isExpanded && (
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {team.roles.map(role => (
                          <RoleCard 
                            key={role.id} 
                            role={role} 
                            teamId={team.id}
                            onSelect={setSelectedRole}
                          />
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="matrix" className="mt-6">
          <FeatureMatrixTable />
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <DataClassificationSection />
        </TabsContent>
      </Tabs>

      {selectedRole && selectedTeamData && (
        <RoleDetailModal 
          role={selectedRole} 
          team={selectedTeamData}
          onClose={() => setSelectedRole(null)} 
        />
      )}
    </div>
  );
}
