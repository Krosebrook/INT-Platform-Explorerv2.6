import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Users, Building2, Shield, Code, Megaphone, 
  DollarSign, Settings, UserCheck, Briefcase,
  Search, Filter, ChevronDown, ChevronRight,
  Target, TrendingUp, Brain, Zap, CheckCircle
} from "lucide-react";
import { 
  ALL_PERSONAS, 
  PERSONA_CATEGORIES,
  getClaudeRecommendation,
  type Persona,
  type PersonaSection,
  type PersonaCategory,
  type TechProficiency,
  type BudgetTier
} from "@/lib/personaData";
import { CLAUDE_MODELS } from "@/lib/profileData";

function getIconForCategory(category: string) {
  if (category.includes('Executive') || category.includes('Decision')) return Building2;
  if (category.includes('Security')) return Shield;
  if (category.includes('Technology') || category.includes('Development') || category.includes('IT')) return Code;
  if (category.includes('Marketing') || category.includes('Content') || category.includes('Branding')) return Megaphone;
  if (category.includes('Finance')) return DollarSign;
  if (category.includes('HR') || category.includes('Human')) return Users;
  if (category.includes('Sales')) return TrendingUp;
  if (category.includes('Client') || category.includes('Success')) return UserCheck;
  if (category.includes('Operations')) return Settings;
  return Briefcase;
}

function getTechProficiencyColor(level: TechProficiency) {
  switch (level) {
    case 'Novice': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'Medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'Expert': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    case 'Strategic': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    default: return 'bg-muted text-muted-foreground';
  }
}

function getBudgetTierColor(tier: BudgetTier) {
  switch (tier) {
    case 'Low': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    case 'Medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'High': return 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300';
    case 'Ultimate': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    default: return 'bg-muted text-muted-foreground';
  }
}

function getModelColor(modelId: string) {
  const model = CLAUDE_MODELS.find(m => m.id === modelId);
  if (!model) return 'bg-muted text-muted-foreground';
  switch (model.tier) {
    case 'Premium': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    case 'Balanced': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'Fast': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    default: return 'bg-muted text-muted-foreground';
  }
}

function PersonaCard({ persona, onSelect }: { persona: Persona; onSelect: (p: Persona) => void }) {
  const recommendation = getClaudeRecommendation(persona);
  const Icon = getIconForCategory(persona.category);

  return (
    <Card 
      className="cursor-pointer transition-all hover-elevate"
      onClick={() => onSelect(persona)}
      data-testid={`card-persona-${persona.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium leading-tight" data-testid={`text-persona-title-${persona.id}`}>
                {persona.title}
              </CardTitle>
              <p className="text-xs text-muted-foreground">{persona.category}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="flex flex-wrap gap-1">
          <Badge className={`text-xs ${getTechProficiencyColor(persona.techProficiency)}`}>
            {persona.techProficiency}
          </Badge>
          <Badge className={`text-xs ${getBudgetTierColor(persona.budgetTier)}`}>
            {persona.budgetTier} Budget
          </Badge>
        </div>
        <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
          <Brain className="w-4 h-4 text-primary flex-shrink-0" />
          <div className="text-xs">
            <span className="font-medium">{recommendation.modelName}</span>
            <span className="text-muted-foreground ml-1">recommended</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PersonaDetail({ persona, onClose }: { persona: Persona; onClose: () => void }) {
  const recommendation = getClaudeRecommendation(persona);
  const Icon = getIconForCategory(persona.category);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold" data-testid="text-persona-detail-title">{persona.title}</h3>
            <p className="text-muted-foreground">{persona.section} • {persona.category}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onClose} data-testid="button-close-detail">
          Close
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">Age Range</p>
          <p className="font-medium text-sm">{persona.ageRange}</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">Experience</p>
          <p className="font-medium text-sm">{persona.experience}</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">Education</p>
          <p className="font-medium text-sm">{persona.education}</p>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">Location</p>
          <p className="font-medium text-sm">{persona.location}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge className={getTechProficiencyColor(persona.techProficiency)}>
          Tech: {persona.techProficiency}
        </Badge>
        <Badge className={getBudgetTierColor(persona.budgetTier)}>
          Budget: {persona.budgetTier}
        </Badge>
        <Badge variant="outline">{persona.decisionAuthority}</Badge>
        <Badge variant="outline">{persona.budgetRange}</Badge>
      </div>

      <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border-violet-200 dark:border-violet-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Claude Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge className={`text-sm px-3 py-1 ${getModelColor(recommendation.modelId)}`}>
              {recommendation.modelName}
            </Badge>
            <span className="text-sm text-muted-foreground">{recommendation.estimatedROI}</span>
          </div>
          <p className="text-sm">{recommendation.rationale}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Implementation Approach</p>
              <p className="text-sm">{recommendation.implementationApproach}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Security Considerations</p>
              <ul className="space-y-1">
                {recommendation.securityConsiderations.slice(0, 3).map((item, i) => (
                  <li key={i} className="text-sm flex items-start gap-1">
                    <CheckCircle className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Primary Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {persona.primaryGoals.map((goal, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 mt-1 text-primary flex-shrink-0" />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-destructive" />
              Key Pain Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {persona.keyPainPoints.map((pain, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 mt-1 text-destructive flex-shrink-0" />
                  <span>{pain}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Success Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {persona.successMetrics.map((metric, i) => (
                <Badge key={i} variant="outline" className="text-xs">{metric}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Settings className="w-4 h-4 text-blue-600" />
              AI Tool Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/10 text-primary">Primary: {persona.aiToolRecommendations.primary}</Badge>
              <Badge variant="outline">Secondary: {persona.aiToolRecommendations.secondary}</Badge>
            </div>
            <div className="flex flex-wrap gap-1">
              {persona.aiToolRecommendations.useCases.map((uc, i) => (
                <Badge key={i} variant="secondary" className="text-xs">{uc}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {persona.relationshipMap && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Relationship Map
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {persona.relationshipMap.reportsTo && (
              <div><span className="text-muted-foreground">Reports to:</span> {persona.relationshipMap.reportsTo}</div>
            )}
            {persona.relationshipMap.directReports && (
              <div><span className="text-muted-foreground">Direct reports:</span> {persona.relationshipMap.directReports.join(', ')}</div>
            )}
            {persona.relationshipMap.collaborators && (
              <div><span className="text-muted-foreground">Collaborators:</span> {persona.relationshipMap.collaborators.join(', ')}</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function CategoryGroup({ 
  category, 
  personas, 
  isExpanded, 
  onToggle, 
  onSelectPersona 
}: { 
  category: PersonaCategory; 
  personas: Persona[]; 
  isExpanded: boolean;
  onToggle: () => void;
  onSelectPersona: (p: Persona) => void;
}) {
  const Icon = getIconForCategory(category);
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <button 
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
        onClick={onToggle}
        data-testid={`button-category-${category.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-primary" />
          <span className="font-medium">{category}</span>
          <Badge variant="secondary" className="text-xs">{personas.length}</Badge>
        </div>
        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>
      {isExpanded && (
        <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {personas.map(persona => (
            <PersonaCard key={persona.id} persona={persona} onSelect={onSelectPersona} />
          ))}
        </div>
      )}
    </div>
  );
}

export function PersonaProfileBuilder() {
  const [selectedSection, setSelectedSection] = useState<PersonaSection | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [techFilter, setTechFilter] = useState<TechProficiency | 'all'>('all');
  const [budgetFilter, setBudgetFilter] = useState<BudgetTier | 'all'>('all');
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Primary Decision Makers', 'Executive Leadership']));

  const filteredPersonas = useMemo(() => {
    return ALL_PERSONAS.filter(persona => {
      if (selectedSection !== 'all' && persona.section !== selectedSection) return false;
      if (techFilter !== 'all' && persona.techProficiency !== techFilter) return false;
      if (budgetFilter !== 'all' && persona.budgetTier !== budgetFilter) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          persona.title.toLowerCase().includes(query) ||
          persona.category.toLowerCase().includes(query) ||
          persona.primaryGoals.some(g => g.toLowerCase().includes(query)) ||
          persona.aiToolRecommendations.primary.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedSection, techFilter, budgetFilter, searchQuery]);

  const groupedPersonas = useMemo(() => {
    const groups: Record<PersonaCategory, Persona[]> = {} as Record<PersonaCategory, Persona[]>;
    filteredPersonas.forEach(persona => {
      if (!groups[persona.category]) {
        groups[persona.category] = [];
      }
      groups[persona.category].push(persona);
    });
    return groups;
  }, [filteredPersonas]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const stats = useMemo(() => {
    const techCounts: Record<TechProficiency, number> = { Novice: 0, Medium: 0, Expert: 0, Strategic: 0 };
    const budgetCounts: Record<BudgetTier, number> = { Low: 0, Medium: 0, High: 0, Ultimate: 0 };
    filteredPersonas.forEach(p => {
      techCounts[p.techProficiency]++;
      budgetCounts[p.budgetTier]++;
    });
    return { techCounts, budgetCounts };
  }, [filteredPersonas]);

  if (selectedPersona) {
    return <PersonaDetail persona={selectedPersona} onClose={() => setSelectedPersona(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6" />
            Persona Profile Builder
          </h2>
          <p className="text-muted-foreground">72 INT Inc. personas mapped to optimal Claude configurations</p>
        </div>
        <Badge variant="secondary" className="text-sm" data-testid="badge-persona-count">
          {filteredPersonas.length} of {ALL_PERSONAS.length} personas
        </Badge>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search personas..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-personas"
              />
            </div>
            <Select value={selectedSection} onValueChange={(v) => setSelectedSection(v as PersonaSection | 'all')}>
              <SelectTrigger data-testid="select-section">
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                <SelectItem value="Front of House">Front of House</SelectItem>
                <SelectItem value="Back of House">Back of House</SelectItem>
              </SelectContent>
            </Select>
            <Select value={techFilter} onValueChange={(v) => setTechFilter(v as TechProficiency | 'all')}>
              <SelectTrigger data-testid="select-tech">
                <SelectValue placeholder="Tech Proficiency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tech Levels</SelectItem>
                <SelectItem value="Novice">Novice</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
                <SelectItem value="Strategic">Strategic</SelectItem>
              </SelectContent>
            </Select>
            <Select value={budgetFilter} onValueChange={(v) => setBudgetFilter(v as BudgetTier | 'all')}>
              <SelectTrigger data-testid="select-budget">
                <SelectValue placeholder="Budget Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Budget Tiers</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Ultimate">Ultimate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(stats.techCounts).map(([level, count]) => (
          <Card key={level} className="text-center">
            <CardContent className="pt-4 pb-3">
              <Badge className={`text-xs mb-2 ${getTechProficiencyColor(level as TechProficiency)}`}>{level}</Badge>
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-xs text-muted-foreground">personas</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList>
          <TabsTrigger value="categories" data-testid="tab-categories">By Category</TabsTrigger>
          <TabsTrigger value="grid" data-testid="tab-grid">Grid View</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          {Object.entries(groupedPersonas).map(([category, personas]) => (
            <CategoryGroup
              key={category}
              category={category as PersonaCategory}
              personas={personas}
              isExpanded={expandedCategories.has(category)}
              onToggle={() => toggleCategory(category)}
              onSelectPersona={setSelectedPersona}
            />
          ))}
          {Object.keys(groupedPersonas).length === 0 && (
            <Card className="p-8 text-center">
              <Filter className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No personas found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPersonas.map(persona => (
              <PersonaCard key={persona.id} persona={persona} onSelect={setSelectedPersona} />
            ))}
          </div>
          {filteredPersonas.length === 0 && (
            <Card className="p-8 text-center">
              <Filter className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No personas found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
