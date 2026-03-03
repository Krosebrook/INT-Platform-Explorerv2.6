import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { 
  Layers, 
  DollarSign, 
  Link2, 
  Zap, 
  Building2, 
  Bot, 
  Database, 
  Code2,
  CheckCircle2,
  ArrowRight,
  Workflow,
  Globe,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Settings,
  FileText,
  X
} from "lucide-react";
import {
  microsoftProducts,
  productRelationships,
  microsoftLicenses,
  frontierFirmCapabilities,
  mcpIntegrations,
  frontierAgents,
  copilotCreditConsumption,
  agentModeApps,
  frontierModels,
  type MicrosoftProduct,
  type MicrosoftLicenseOption
} from "@/lib/microsoftEcosystemData";

const categoryIcons: Record<MicrosoftProduct["category"], typeof Bot> = {
  "Agent Platform": Bot,
  "Low-Code": Workflow,
  "Enterprise AI": Building2,
  "Data Platform": Database,
  "Developer": Code2
};

const categoryColors: Record<MicrosoftProduct["category"], string> = {
  "Agent Platform": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "Low-Code": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "Enterprise AI": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "Data Platform": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "Developer": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300"
};

function ProductCard({ product, onSelect }: { product: MicrosoftProduct; onSelect: (p: MicrosoftProduct) => void }) {
  const Icon = categoryIcons[product.category];
  
  return (
    <Card 
      className="hover-elevate cursor-pointer transition-all"
      onClick={() => onSelect(product)}
      data-testid={`card-ms-product-${product.id}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#00A4EF]/10">
              <Icon className="h-5 w-5 text-[#00A4EF]" />
            </div>
            <div>
              <CardTitle className="text-base">{product.name}</CardTitle>
              <Badge variant="secondary" className={`mt-1 text-xs ${categoryColors[product.category]}`}>
                {product.category}
              </Badge>
            </div>
          </div>
          {product.mcpSupport && (
            <Badge variant="outline" className="text-xs border-purple-500 text-purple-600 dark:text-purple-400">
              <Link2 className="h-3 w-3 mr-1" />
              MCP
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="flex flex-wrap gap-1">
          {product.keyFeatures.slice(0, 3).map((feature, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {feature.length > 25 ? feature.slice(0, 22) + "..." : feature}
            </Badge>
          ))}
          {product.keyFeatures.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{product.keyFeatures.length - 3} more
            </Badge>
          )}
        </div>
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            <DollarSign className="h-3 w-3 inline mr-1" />
            {product.pricing.model}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function ProductDetailModal({ product, onClose }: { product: MicrosoftProduct; onClose: () => void }) {
  const Icon = categoryIcons[product.category];
  const relationships = productRelationships.filter(r => r.source === product.id || r.target === product.id);
  
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <Card className="max-w-3xl w-full max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <CardHeader className="border-b">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-[#00A4EF]/10">
                <Icon className="h-6 w-6 text-[#00A4EF]" />
              </div>
              <div>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={categoryColors[product.category]}>{product.category}</Badge>
                  {product.mcpSupport && (
                    <Badge variant="outline" className="border-purple-500 text-purple-600 dark:text-purple-400">
                      <Link2 className="h-3 w-3 mr-1" />
                      MCP Enabled
                    </Badge>
                  )}
                  {product.releaseWave && (
                    <Badge variant="secondary">{product.releaseWave}</Badge>
                  )}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-detail">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <CardContent className="p-6 space-y-6">
            <p className="text-muted-foreground">{product.description}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-[#00A4EF]" />
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {product.keyFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#00A4EF]" />
                  AI Capabilities
                </h4>
                <ul className="space-y-2">
                  {product.aiCapabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Bot className="h-4 w-4 mt-0.5 text-purple-500 flex-shrink-0" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-[#00A4EF]" />
                Pricing
              </h4>
              <p className="text-sm text-muted-foreground mb-3">{product.pricing.model}</p>
              <div className="grid gap-3">
                {product.pricing.tiers.map((tier, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/50 border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{tier.name}</span>
                      <Badge variant="secondary">{tier.price}</Badge>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {tier.includes.map((inc, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            {product.agentTypes && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Bot className="h-4 w-4 text-[#00A4EF]" />
                  Agent Types
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.agentTypes.map((type, i) => (
                    <Badge key={i} variant="outline">{type}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {relationships.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-[#00A4EF]" />
                  Integrations
                </h4>
                <div className="space-y-2">
                  {relationships.map((rel, i) => {
                    const otherProductId = rel.source === product.id ? rel.target : rel.source;
                    const otherProduct = microsoftProducts.find(p => p.id === otherProductId);
                    return (
                      <div key={i} className="flex items-center gap-2 text-sm p-2 rounded bg-muted/50">
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{otherProduct?.name}</span>
                        <Badge variant="outline" className="text-xs">{rel.relationshipType}</Badge>
                        <span className="text-muted-foreground">{rel.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Target:</span>
                {product.targetUsers.slice(0, 3).map((user, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{user}</Badge>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-3 border-t">
              <Shield className="h-4 w-4 text-muted-foreground" />
              {product.compliance.map((comp, i) => (
                <Badge key={i} variant="outline" className="text-xs">{comp}</Badge>
              ))}
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}

function LicenseComparisonTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-[#00A4EF]" />
          Licensing & Pricing Comparison
        </CardTitle>
        <CardDescription>Compare Microsoft AI and Power Platform licensing options</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">License</th>
                <th className="text-left py-3 px-4 font-semibold">Price</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Key Inclusions</th>
              </tr>
            </thead>
            <tbody>
              {microsoftLicenses.map((license) => (
                <tr key={license.id} className="border-b hover:bg-muted/50" data-testid={`row-license-${license.id}`}>
                  <td className="py-3 px-4 font-medium">{license.name}</td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary">{license.price}/{license.billingCycle === "monthly" ? "mo" : "yr"}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline">{license.perUser ? "Per User" : "Capacity"}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {license.includes.slice(0, 3).map((inc, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {inc.length > 20 ? inc.slice(0, 18) + "..." : inc}
                        </Badge>
                      ))}
                      {license.includes.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{license.includes.length - 3}</Badge>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function FrontierFirmSection() {
  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            {frontierFirmCapabilities.title}
          </CardTitle>
          <CardDescription>{frontierFirmCapabilities.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-background border" data-testid="stat-adoption-rate">
              <div className="text-2xl font-bold text-purple-500">{frontierFirmCapabilities.statistics.adoptionRate}</div>
              <div className="text-sm text-muted-foreground">Adoption Rate</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-background border" data-testid="stat-outcome-multiplier">
              <div className="text-2xl font-bold text-green-500">{frontierFirmCapabilities.statistics.outcomeMultiplier}</div>
              <div className="text-sm text-muted-foreground">Better Outcomes</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-background border" data-testid="stat-leadership-urgency">
              <div className="text-2xl font-bold text-blue-500">{frontierFirmCapabilities.statistics.leadershipUrgency}</div>
              <div className="text-sm text-muted-foreground">Leaders See Urgency</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-background border" data-testid="stat-integration-timeline">
              <div className="text-2xl font-bold text-orange-500">{frontierFirmCapabilities.statistics.agentIntegrationTimeline}</div>
              <div className="text-sm text-muted-foreground">Integration Timeline</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {frontierFirmCapabilities.pillars.map((pillar, i) => (
              <div key={i} className="p-4 rounded-lg border bg-background">
                <h4 className="font-semibold mb-2">{pillar.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{pillar.description}</p>
                <div className="flex flex-wrap gap-1">
                  {pillar.capabilities.map((cap, j) => (
                    <Badge key={j} variant="secondary" className="text-xs">{cap}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            {frontierModels.title}
          </CardTitle>
          <CardDescription>{frontierModels.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {frontierModels.models.map((model, i) => (
              <div key={i} className="p-4 rounded-lg border bg-background" data-testid={`model-${i}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{model.name}</span>
                  <Badge variant="outline" className="text-xs border-purple-500 text-purple-600 dark:text-purple-400">
                    {model.availableDate ? `${model.status} (${model.availableDate})` : model.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{model.provider}</p>
                <p className="text-sm">{model.bestFor}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {frontierModels.advantages.map((adv, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                {adv}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            Frontier Agents (Copilot Studio)
          </CardTitle>
          <CardDescription>Pre-built autonomous agents available through the Frontier Program</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {frontierAgents.map((agent, i) => (
              <div key={i} className="p-4 rounded-lg border bg-background hover-elevate" data-testid={`frontier-agent-${i}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-semibold">{agent.name}</h4>
                  <Badge 
                    variant={agent.status === "GA" ? "default" : "secondary"}
                    className={agent.status === "Frontier" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" : ""}
                  >
                    {agent.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{agent.capability}</p>
                <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t">
                  <span className="text-xs text-muted-foreground">{agent.availability}</span>
                  <Badge variant="outline" className="text-xs">{agent.useCase.split(",")[0]}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Copilot Credit Consumption
            </CardTitle>
            <CardDescription>How different agent actions consume Copilot Credits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {copilotCreditConsumption.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-4 flex-wrap p-3 rounded-lg border" data-testid={`credit-${i}`}>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm">{item.actionType}</span>
                    <p className="text-xs text-muted-foreground truncate">{item.notes}</p>
                  </div>
                  <Badge variant={item.credits >= 10 ? "destructive" : item.credits >= 5 ? "secondary" : "default"}>
                    {item.credits === 0 ? "Variable" : `${item.credits} credits`}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Agent Mode in Office Apps
            </CardTitle>
            <CardDescription>AI-powered iterative creation in Microsoft 365 apps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {agentModeApps.map((app, i) => (
                <div key={i} className="p-4 rounded-lg border bg-background" data-testid={`agent-mode-${i}`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-semibold">{app.app}</span>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={app.status === "GA" ? "default" : "secondary"}
                        className={app.status === "Frontier" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" : ""}
                      >
                        {app.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{app.availableDate}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{app.capability}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MCPSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5 text-purple-500" />
          {mcpIntegrations.title}
        </CardTitle>
        <CardDescription>{mcpIntegrations.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3">Supported Products</h4>
          <div className="flex flex-wrap gap-2">
            {mcpIntegrations.supportedProducts.map((product, i) => (
              <Badge key={i} variant="outline" className="border-purple-500 text-purple-600 dark:text-purple-400">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                {product}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">MCP Servers</h4>
          <div className="grid gap-3">
            {mcpIntegrations.servers.map((server, i) => (
              <div key={i} className="flex items-center justify-between gap-4 flex-wrap p-3 rounded-lg border" data-testid={`mcp-server-${i}`}>
                <div>
                  <span className="font-medium">{server.name}</span>
                  <p className="text-sm text-muted-foreground">{server.description}</p>
                </div>
                <Badge variant={server.status === "GA" ? "default" : "secondary"}>{server.status}</Badge>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Benefits</h4>
          <ul className="grid md:grid-cols-2 gap-2">
            {mcpIntegrations.benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function ProductRelationshipDiagram() {
  const allCategories: Array<MicrosoftProduct["category"]> = ["Agent Platform", "Low-Code", "Enterprise AI", "Data Platform", "Developer"];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Workflow className="h-5 w-5 text-[#00A4EF]" />
          Product Ecosystem Map
        </CardTitle>
        <CardDescription>How Microsoft AI products connect and integrate</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {allCategories.map(category => {
            const products = microsoftProducts.filter(p => p.category === category);
            if (products.length === 0) return null;
            const Icon = categoryIcons[category];
            return (
              <div key={category} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-[#00A4EF]" />
                  <h4 className="font-semibold">{category}</h4>
                  <Badge variant="secondary">{products.length} products</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 pl-7">
                  {products.map(product => (
                    <div 
                      key={product.id}
                      className={`p-3 rounded-lg border text-center ${categoryColors[category].replace('text-', 'border-').split(' ')[0]}/30`}
                    >
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      {product.mcpSupport && (
                        <Badge variant="outline" className="text-xs mt-1">MCP</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Link2 className="h-4 w-4" />
            Key Integration Patterns
          </h4>
          <div className="grid md:grid-cols-2 gap-3">
            {productRelationships.slice(0, 6).map((rel, i) => {
              const source = microsoftProducts.find(p => p.id === rel.source);
              const target = microsoftProducts.find(p => p.id === rel.target);
              return (
                <div key={i} className="flex items-center gap-2 flex-wrap text-sm p-2 rounded bg-muted/50" data-testid={`relationship-${i}`}>
                  <span className="font-medium">{source?.name}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="font-medium">{target?.name}</span>
                  <Badge variant="outline" className="text-xs ml-auto">{rel.relationshipType}</Badge>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function MicrosoftEcosystemTab() {
  const [selectedProduct, setSelectedProduct] = useState<MicrosoftProduct | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<MicrosoftProduct["category"] | "all">("all");
  
  const filteredProducts = categoryFilter === "all" 
    ? microsoftProducts 
    : microsoftProducts.filter(p => p.category === categoryFilter);
  
  const categories: Array<MicrosoftProduct["category"]> = ["Agent Platform", "Low-Code", "Enterprise AI", "Data Platform", "Developer"];
  
  return (
    <div className="space-y-6" data-testid="tab-microsoft-ecosystem">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#00A4EF]/10">
              <Building2 className="h-6 w-6 text-[#00A4EF]" />
            </div>
            Microsoft Ecosystem Deep Dive
          </h2>
          <p className="text-muted-foreground mt-1">
            Comprehensive 2025 overview of Microsoft's AI and automation platform
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            <Globe className="h-3 w-3 mr-1" />
            {microsoftProducts.length} Products
          </Badge>
          <Badge variant="secondary" className="text-sm">
            <Link2 className="h-3 w-3 mr-1" />
            {microsoftProducts.filter(p => p.mcpSupport).length} MCP-Enabled
          </Badge>
        </div>
      </div>
      
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
          <TabsTrigger value="products" data-testid="subtab-products">
            <Layers className="h-4 w-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="map" data-testid="subtab-map">
            <Workflow className="h-4 w-4 mr-2" />
            Ecosystem Map
          </TabsTrigger>
          <TabsTrigger value="licensing" data-testid="subtab-licensing">
            <DollarSign className="h-4 w-4 mr-2" />
            Licensing
          </TabsTrigger>
          <TabsTrigger value="frontier" data-testid="subtab-frontier">
            <TrendingUp className="h-4 w-4 mr-2" />
            Frontier Firm
          </TabsTrigger>
          <TabsTrigger value="mcp" data-testid="subtab-mcp">
            <Link2 className="h-4 w-4 mr-2" />
            MCP
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="mt-6 space-y-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={categoryFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("all")}
              data-testid="filter-category-all"
            >
              All ({microsoftProducts.length})
            </Button>
            {categories.map(cat => {
              const Icon = categoryIcons[cat];
              const count = microsoftProducts.filter(p => p.category === cat).length;
              return (
                <Button
                  key={cat}
                  variant={categoryFilter === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter(cat)}
                  data-testid={`filter-category-${cat.toLowerCase().replace(/ /g, "-")}`}
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {cat} ({count})
                </Button>
              );
            })}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onSelect={setSelectedProduct}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="map" className="mt-6">
          <ProductRelationshipDiagram />
        </TabsContent>
        
        <TabsContent value="licensing" className="mt-6">
          <LicenseComparisonTable />
        </TabsContent>
        
        <TabsContent value="frontier" className="mt-6">
          <FrontierFirmSection />
        </TabsContent>
        
        <TabsContent value="mcp" className="mt-6">
          <MCPSection />
        </TabsContent>
      </Tabs>
      
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}
