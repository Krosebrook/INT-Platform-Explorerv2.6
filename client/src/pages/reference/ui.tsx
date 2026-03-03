import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import {
  Search,
  FileText,
  ArrowLeft,
  Calendar,
  User,
  Tag,
  BookOpen,
  Library,
} from "lucide-react";
import {
  REFERENCE_DOCUMENTS,
  REFERENCE_CATEGORIES,
  type ReferenceDocument,
} from "./data";

const TYPE_OPTIONS = ["All", "Whitepaper", "Guide", "Report", "Playbook"] as const;

const categoryColors: Record<string, string> = {
  Executive:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  Technical:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Strategy:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Operations:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
};

const typeColors: Record<string, string> = {
  Whitepaper:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  Guide:
    "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  Report:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  Playbook:
    "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function DocumentCard({
  doc,
  onSelect,
}: {
  doc: ReferenceDocument;
  onSelect: (doc: ReferenceDocument) => void;
}) {
  return (
    <Card
      className="hover-elevate cursor-pointer transition-all"
      onClick={() => onSelect(doc)}
      data-testid={`card-reference-${doc.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-base leading-snug line-clamp-2">
                {doc.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge
                  variant="secondary"
                  className={categoryColors[doc.category] || ""}
                >
                  {doc.category}
                </Badge>
                <Badge
                  variant="outline"
                  className={typeColors[doc.type] || ""}
                >
                  {doc.type}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {doc.summary}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {doc.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(doc.date)}
          </span>
        </div>
        <div className="flex flex-wrap gap-1 pt-2 border-t">
          {doc.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {doc.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{doc.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function DocumentDetailView({
  doc,
  onBack,
}: {
  doc: ReferenceDocument;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6" data-testid="reference-detail-view">
      <Button
        variant="ghost"
        onClick={onBack}
        className="gap-2"
        data-testid="button-back-to-list"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Library
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-3">
              <CardTitle className="text-xl">{doc.title}</CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="secondary"
                  className={categoryColors[doc.category] || ""}
                >
                  {doc.category}
                </Badge>
                <Badge
                  variant="outline"
                  className={typeColors[doc.type] || ""}
                >
                  {doc.type}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {doc.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(doc.date)}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-lg bg-muted/50 border">
            <p className="text-sm font-medium mb-1">Summary</p>
            <p className="text-sm text-muted-foreground">{doc.summary}</p>
          </div>

          <Separator />

          <div className="prose prose-sm dark:prose-invert max-w-none">
            {doc.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="text-sm leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <Separator />

          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {doc.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ReferenceTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeType, setActiveType] = useState<string>("All");
  const [selectedDoc, setSelectedDoc] = useState<ReferenceDocument | null>(null);

  const filteredDocs = useMemo(() => {
    return REFERENCE_DOCUMENTS.filter((doc) => {
      const matchesCategory =
        activeCategory === "All" || doc.category === activeCategory;
      const matchesType = activeType === "All" || doc.type === activeType;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        doc.title.toLowerCase().includes(query) ||
        doc.summary.toLowerCase().includes(query) ||
        doc.author.toLowerCase().includes(query) ||
        doc.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesType && matchesSearch;
    });
  }, [searchQuery, activeCategory, activeType]);

  const handleSelectDoc = useCallback((doc: ReferenceDocument) => {
    setSelectedDoc(doc);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedDoc(null);
  }, []);

  if (selectedDoc) {
    return <DocumentDetailView doc={selectedDoc} onBack={handleBack} />;
  }

  return (
    <div className="space-y-6" data-testid="tab-reference-library">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Library className="h-6 w-6 text-primary" />
            </div>
            Reference Library
          </h2>
          <p className="text-muted-foreground mt-1">
            Browse enterprise AI reference documents, guides, and reports
          </p>
        </div>
        <Badge
          variant="secondary"
          className="text-sm"
          data-testid="reference-doc-count"
        >
          <FileText className="h-3 w-3 mr-1" />
          {filteredDocs.length} Document{filteredDocs.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Search Bar */}
      <div className="relative" data-testid="reference-search">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search documents by title, author, summary, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          data-testid="reference-search-input"
        />
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2" data-testid="reference-category-filters">
        <Button
          variant={activeCategory === "All" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory("All")}
          data-testid="filter-category-all"
        >
          All
        </Button>
        {REFERENCE_CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat)}
            data-testid={`filter-category-${cat.toLowerCase()}`}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Type Filter Badges */}
      <div className="flex flex-wrap gap-2" data-testid="reference-type-filters">
        {TYPE_OPTIONS.map((type) => (
          <Badge
            key={type}
            variant={activeType === type ? "default" : "outline"}
            className={`cursor-pointer select-none ${
              activeType === type ? "" : "hover:bg-muted"
            }`}
            onClick={() => setActiveType(type)}
            data-testid={`filter-type-${type.toLowerCase()}`}
          >
            {type}
          </Badge>
        ))}
      </div>

      {/* Document Grid */}
      {filteredDocs.length > 0 ? (
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          data-testid="reference-document-grid"
        >
          {filteredDocs.map((doc) => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              onSelect={handleSelectDoc}
            />
          ))}
        </div>
      ) : (
        <Card data-testid="reference-no-results">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No documents found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
