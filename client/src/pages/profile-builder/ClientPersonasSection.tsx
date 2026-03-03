import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Input } from "@/shared/ui/input";
import {
  Users,
  Target,
  AlertTriangle,
  TrendingUp,
  Briefcase,
  Building2,
  Search,
  X,
  Sparkles,
  FileText,
  CheckCircle2,
  ArrowRight,
  Zap,
  DollarSign,
  BarChart3,
  Link2
} from "lucide-react";
import {
  clientPersonas,
  intServices,
  caseStudies,
  getAIRecommendationsForPersona,
  getServicesForPersona,
  getCaseStudiesForPersona,
  ecosystemColors,
  type ClientPersona,
  type IntService,
  type CaseStudy,
  type AIToolRecommendation
} from "@/entities/persona/clientData";
import { platforms } from "@/entities/platform/data";

const proficiencyColors = {
  Novice: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  Medium: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Expert: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  Strategic: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
};

const budgetColors = {
  Low: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  Medium: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  High: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Ultimate: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
};

function PersonaCard({ persona, onSelect }: { persona: ClientPersona; onSelect: (p: ClientPersona) => void }) {
  return (
    <Card 
      className="cursor-pointer hover-elevate transition-all"
      onClick={() => onSelect(persona)}
      data-testid={`card-client-persona-${persona.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{persona.title}</CardTitle>
              <CardDescription className="text-xs">{persona.role}</CardDescription>
            </div>
          </div>
          <Badge className={proficiencyColors[persona.techProficiency]} variant="secondary">
            {persona.techProficiency}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1">
          {persona.industry.slice(0, 3).map((ind, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              <Building2 className="h-3 w-3 mr-1" />
              {ind}
            </Badge>
          ))}
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground mb-1">Top Goals:</p>
          <ul className="space-y-1">
            {persona.goals.slice(0, 2).map((goal, i) => (
              <li key={i} className="text-xs flex items-start gap-1">
                <Target className="h-3 w-3 mt-0.5 text-primary flex-shrink-0" />
                <span className="line-clamp-1">{goal}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="pt-2 flex items-center justify-between gap-2 flex-wrap">
          <Badge className={budgetColors[persona.budgetTier]} variant="secondary">
            <DollarSign className="h-3 w-3 mr-1" />
            {persona.budgetTier} Budget
          </Badge>
          <Badge variant="outline" className="text-xs">
            {persona.decisionAuthority}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function PersonaDetailModal({ 
  persona, 
  onClose 
}: { 
  persona: ClientPersona; 
  onClose: () => void;
}) {
  const recommendations = getAIRecommendationsForPersona(persona.id);
  const services = getServicesForPersona(persona.id);
  const cases = getCaseStudiesForPersona(persona.id);
  
  const enrichedRecommendations = recommendations.map(rec => {
    const platform = platforms.find(p => p.id === rec.platformId);
    return {
      ...rec,
      platformName: platform?.name || rec.platformId,
      ecosystem: platform?.ecosystem || "unknown"
    };
  });

  return (
    <div 
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
      onClick={onClose}
      data-testid="modal-client-persona-detail"
    >
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <CardHeader className="border-b">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl">{persona.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge className={proficiencyColors[persona.techProficiency]}>
                    {persona.techProficiency}
                  </Badge>
                  <Badge className={budgetColors[persona.budgetTier]}>
                    <DollarSign className="h-3 w-3 mr-1" />
                    {persona.budgetTier}
                  </Badge>
                  <Badge variant="outline">{persona.decisionAuthority}</Badge>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-client-detail">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-wrap gap-2">
              {persona.industry.map((ind, i) => (
                <Badge key={i} variant="outline">
                  <Building2 className="h-3 w-3 mr-1" />
                  {ind}
                </Badge>
              ))}
              <Badge variant="secondary">{persona.companySize}</Badge>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Goals
                </h4>
                <ul className="space-y-2">
                  {persona.goals.map((goal, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  Pain Points
                </h4>
                <ul className="space-y-2">
                  {persona.painPoints.map((pain, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      {pain}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                Success Metrics
              </h4>
              <div className="flex flex-wrap gap-2">
                {persona.successMetrics.map((metric, i) => (
                  <Badge key={i} variant="secondary">{metric}</Badge>
                ))}
              </div>
            </div>
            
            <div className="pt-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Recommended AI Tools (from 50 Platforms)
              </h4>
              <div className="grid md:grid-cols-2 gap-3">
                {enrichedRecommendations.map((rec, i) => (
                  <div 
                    key={i} 
                    className="p-3 rounded-lg border bg-muted/30"
                    data-testid={`ai-recommendation-${rec.platformId}`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                      <span className="font-medium text-sm">{rec.platformName}</span>
                      <div className="flex items-center gap-2">
                        <Badge className={ecosystemColors[rec.ecosystem] || "bg-gray-100"} variant="secondary">
                          {rec.ecosystem}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {rec.relevanceScore}% match
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{rec.rationale}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {services.length > 0 && (
              <div className="pt-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Relevant INT Inc. Services
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {services.map((service, i) => (
                    <div 
                      key={i} 
                      className="p-4 rounded-lg border"
                      data-testid={`service-${service.slug}`}
                    >
                      <h5 className="font-medium mb-1">{service.name}</h5>
                      <p className="text-sm text-muted-foreground mb-3">{service.shortDescription}</p>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Value Props:</p>
                          <div className="flex flex-wrap gap-1">
                            {service.valueProps.slice(0, 2).map((vp, j) => (
                              <Badge key={j} variant="outline" className="text-xs">
                                <Zap className="h-3 w-3 mr-1" />
                                {vp}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Deliverables:</p>
                          <div className="flex flex-wrap gap-1">
                            {service.deliverables.slice(0, 3).map((del, j) => (
                              <Badge key={j} variant="secondary" className="text-xs">{del}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {cases.length > 0 && (
              <div className="pt-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Related Case Studies
                </h4>
                <div className="space-y-3">
                  {cases.map((cs, i) => (
                    <div 
                      key={i} 
                      className="p-4 rounded-lg border bg-muted/50"
                      data-testid={`case-study-${cs.id}`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <h5 className="font-medium">{cs.title}</h5>
                        <Badge variant="outline">{cs.industry}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm mb-3 flex-wrap">
                        <span className="text-muted-foreground">{cs.problem}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground">{cs.solution}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="font-medium text-primary">{cs.outcome}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cs.metrics.map((metric, j) => (
                          <Badge key={j} variant="secondary">
                            {metric.name}: {metric.value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="pt-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Link2 className="h-4 w-4 text-primary" />
                AI Use Cases for This Persona
              </h4>
              <div className="flex flex-wrap gap-2">
                {persona.aiUseCases.map((uc, i) => (
                  <Badge key={i} variant="outline">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {uc}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}

export function ClientPersonasSection() {
  const [selectedPersona, setSelectedPersona] = useState<ClientPersona | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState<string>("all");
  
  const industries = Array.from(new Set(clientPersonas.flatMap(p => p.industry)));
  
  const filteredPersonas = clientPersonas.filter(persona => {
    const matchesSearch = searchQuery === "" || 
      persona.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.goals.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
      persona.painPoints.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesIndustry = industryFilter === "all" || 
      persona.industry.includes(industryFilter);
    
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="space-y-6" data-testid="section-client-personas">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            B2B SaaS Client Personas
          </CardTitle>
          <CardDescription>
            Your target buyer personas mapped to AI tools from all 50 platforms and INT Inc. services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search personas by role, goals, or pain points..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search-client-personas"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={industryFilter === "all" ? "default" : "outline"}
                onClick={() => setIndustryFilter("all")}
                data-testid="filter-industry-all"
              >
                All Industries
              </Button>
              {industries.map(ind => (
                <Button
                  key={ind}
                  variant={industryFilter === ind ? "default" : "outline"}
                  onClick={() => setIndustryFilter(ind)}
                  data-testid={`filter-industry-${ind.toLowerCase().replace(/ /g, "-")}`}
                >
                  {ind}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{clientPersonas.length} Client Personas</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>{intServices.length} Services</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>{caseStudies.length} Case Studies</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>50 AI Platforms Mapped</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPersonas.map(persona => (
          <PersonaCard 
            key={persona.id} 
            persona={persona} 
            onSelect={setSelectedPersona}
          />
        ))}
      </div>
      
      {filteredPersonas.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No personas match your search criteria</p>
        </Card>
      )}
      
      {selectedPersona && (
        <PersonaDetailModal 
          persona={selectedPersona} 
          onClose={() => setSelectedPersona(null)}
        />
      )}
    </div>
  );
}
