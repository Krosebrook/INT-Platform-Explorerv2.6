import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import {
  BookOpen,
  Search,
  Clock,
  ArrowLeft,
  Tag,
  Calendar,
  FileText,
  ShieldCheck,
  Code2,
  Rocket,
  Bug,
  Lightbulb,
} from "lucide-react";
import {
  KNOWLEDGE_ARTICLES,
  KNOWLEDGE_CATEGORIES,
  type KnowledgeArticle,
} from "./data";

const categoryIcons: Record<string, typeof BookOpen> = {
  Prompting: Lightbulb,
  Security: ShieldCheck,
  API: Code2,
  Deployment: Rocket,
  Troubleshooting: Bug,
};

const categoryColors: Record<string, string> = {
  Prompting:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  Security:
    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  API: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Deployment:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Troubleshooting:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
};

function ArticleCard({
  article,
  onSelect,
}: {
  article: KnowledgeArticle;
  onSelect: (article: KnowledgeArticle) => void;
}) {
  const Icon = categoryIcons[article.category] ?? FileText;

  return (
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onSelect(article)}
      data-testid={`card-article-${article.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Badge
            variant="secondary"
            className={categoryColors[article.category] ?? ""}
          >
            <Icon className="h-3 w-3 mr-1" />
            {article.category}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
            <Clock className="h-3 w-3" />
            {article.readTime}
          </span>
        </div>
        <CardTitle className="text-base leading-snug mt-2">
          {article.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {article.summary}
        </p>
        <div className="flex flex-wrap gap-1">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="text-xs text-muted-foreground px-1 py-0.5">
              +{article.tags.length - 3}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
          <Calendar className="h-3 w-3" />
          Updated {new Date(article.lastUpdated).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function ArticleDetail({
  article,
  onBack,
}: {
  article: KnowledgeArticle;
  onBack: () => void;
}) {
  const Icon = categoryIcons[article.category] ?? FileText;

  return (
    <div className="space-y-6" data-testid="article-detail">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="gap-2"
        data-testid="button-back-to-list"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to list
      </Button>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge
              variant="secondary"
              className={categoryColors[article.category] ?? ""}
            >
              <Icon className="h-3 w-3 mr-1" />
              {article.category}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {article.readTime}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Updated{" "}
              {new Date(article.lastUpdated).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <CardTitle className="text-2xl">{article.title}</CardTitle>
          <p className="text-muted-foreground">{article.summary}</p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
            {article.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function KnowledgeTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] =
    useState<KnowledgeArticle | null>(null);

  const filteredArticles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return KNOWLEDGE_ARTICLES.filter((article) => {
      const matchesCategory =
        activeCategory === "all" || article.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, activeCategory]);

  const handleSelectArticle = useCallback((article: KnowledgeArticle) => {
    setSelectedArticle(article);
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedArticle(null);
  }, []);

  if (selectedArticle) {
    return (
      <div data-testid="tab-knowledge-base">
        <ArticleDetail article={selectedArticle} onBack={handleBackToList} />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="tab-knowledge-base">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            Knowledge Base
          </h2>
          <p className="text-muted-foreground mt-1">
            Guides, best practices, and reference documentation for enterprise
            AI deployment
          </p>
        </div>
        <Badge variant="secondary" className="text-sm" data-testid="badge-article-count">
          <FileText className="h-3 w-3 mr-1" />
          {KNOWLEDGE_ARTICLES.length} Articles
        </Badge>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search articles by title, summary, or tag..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          data-testid="input-search-articles"
        />
      </div>

      {/* Category Tabs */}
      <Tabs
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="w-full"
      >
        <TabsList
          className="flex w-full flex-wrap h-auto gap-1"
          data-testid="tabs-categories"
        >
          <TabsTrigger value="all" data-testid="tab-category-all">
            All ({KNOWLEDGE_ARTICLES.length})
          </TabsTrigger>
          {KNOWLEDGE_CATEGORIES.map((category) => {
            const Icon = categoryIcons[category] ?? FileText;
            const count = KNOWLEDGE_ARTICLES.filter(
              (a) => a.category === category
            ).length;
            return (
              <TabsTrigger
                key={category}
                value={category}
                data-testid={`tab-category-${category.toLowerCase()}`}
              >
                <Icon className="h-4 w-4 mr-1" />
                {category} ({count})
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Showing count */}
        <div
          className="text-sm text-muted-foreground mt-4"
          data-testid="text-showing-count"
        >
          Showing {filteredArticles.length} of {KNOWLEDGE_ARTICLES.length}{" "}
          articles
        </div>

        {/* All tab + individual category tabs share the same grid content */}
        <TabsContent value="all" className="mt-4">
          <ArticleGrid
            articles={filteredArticles}
            onSelect={handleSelectArticle}
          />
        </TabsContent>
        {KNOWLEDGE_CATEGORIES.map((category) => (
          <TabsContent key={category} value={category} className="mt-4">
            <ArticleGrid
              articles={filteredArticles}
              onSelect={handleSelectArticle}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function ArticleGrid({
  articles,
  onSelect,
}: {
  articles: KnowledgeArticle[];
  onSelect: (article: KnowledgeArticle) => void;
}) {
  if (articles.length === 0) {
    return (
      <div
        className="text-center py-16 bg-muted/30 rounded-xl border border-dashed"
        data-testid="empty-state"
      >
        <BookOpen className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
        <h3 className="font-semibold text-lg mb-2">No articles found</h3>
        <p className="text-muted-foreground text-sm">
          Try adjusting your search query or selecting a different category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
