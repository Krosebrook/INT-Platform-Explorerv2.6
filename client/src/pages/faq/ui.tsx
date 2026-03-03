import { useState, useMemo } from "react";
import { Card, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Separator } from "@/shared/ui/separator";
import {
  Search,
  HelpCircle,
  MessageCircle,
  Mail,
} from "lucide-react";
import { FAQ_ITEMS, FAQ_CATEGORIES } from "./data";

export function FAQTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, typeof filteredItems> = {};
    for (const item of filteredItems) {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    }
    return groups;
  }, [filteredItems]);

  const categoryOrder = FAQ_CATEGORIES.filter(
    (cat) => groupedItems[cat] && groupedItems[cat].length > 0
  );

  return (
    <div className="space-y-6" data-testid="tab-faq">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-1">
            Find answers to common questions about the platform
          </p>
        </div>
        <Badge
          variant="secondary"
          className="text-sm"
          data-testid="faq-item-count"
        >
          <MessageCircle className="h-3 w-3 mr-1" />
          {filteredItems.length} Question{filteredItems.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Search Bar */}
      <div className="relative" data-testid="faq-search">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search questions and answers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          data-testid="faq-search-input"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2" data-testid="faq-category-filters">
        <Button
          variant={activeCategory === "All" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory("All")}
          data-testid="filter-faq-category-all"
        >
          All
        </Button>
        {FAQ_CATEGORIES.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat)}
            data-testid={`filter-faq-category-${cat
              .toLowerCase()
              .replace(/ & /g, "-")
              .replace(/ /g, "-")}`}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* FAQ Items Grouped by Category */}
      {categoryOrder.length > 0 ? (
        <div className="space-y-8" data-testid="faq-grouped-list">
          {categoryOrder.map((category) => (
            <div key={category} data-testid={`faq-group-${category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold">{category}</h3>
                <Badge variant="secondary" className="text-xs">
                  {groupedItems[category].length}
                </Badge>
              </div>
              <Card>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {groupedItems[category].map((item) => (
                      <AccordionItem
                        key={item.id}
                        value={item.id}
                        className="px-6"
                        data-testid={`faq-item-${item.id}`}
                      >
                        <AccordionTrigger
                          className="text-left"
                          data-testid={`faq-trigger-${item.id}`}
                        >
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent data-testid={`faq-content-${item.id}`}>
                          <p className="text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Card data-testid="faq-no-results">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No questions found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}

      {/* CTA Section */}
      <Separator />
      <Card
        className="border-dashed"
        data-testid="faq-contact-cta"
      >
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <Mail className="h-10 w-10 text-primary mb-3" />
          <h3 className="text-lg font-semibold">
            Can't find what you're looking for?
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">
            Our support team is here to help. Reach out and we'll get back to
            you within 24 hours.
          </p>
          <Button className="mt-4" data-testid="button-contact-support">
            <Mail className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
