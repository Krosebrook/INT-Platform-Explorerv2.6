import { useState, useMemo, useCallback } from "react";
import type { Platform, EcosystemType } from "@shared/schema";

/**
 * Filter/search state types extracted from ExplorerTab.
 */
export interface PlatformSearchFilters {
  searchQuery: string;
  activeCategory: string;
  activeTier: string;
  activeEcosystem: EcosystemType | "All";
}

export interface PlatformSearchResult {
  /** Current search query string */
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  /** Active category filter */
  activeCategory: string;
  setActiveCategory: (category: string) => void;

  /** Active tier/priority filter */
  activeTier: string;
  setActiveTier: (tier: string) => void;

  /** Active ecosystem filter */
  activeEcosystem: EcosystemType | "All";
  setActiveEcosystem: (ecosystem: EcosystemType | "All") => void;

  /** Filtered and sorted results */
  filteredPlatforms: Platform[];

  /** Whether any filter is active (non-default) */
  hasActiveFilters: boolean;

  /** Reset all filters to defaults */
  clearFilters: () => void;
}

/**
 * Hook that manages platform search/filter state.
 * Extracted from ExplorerTab's inline search, category, tier, and ecosystem filtering logic.
 *
 * @param platforms - The full array of platforms to search/filter
 * @returns Search state, setters, filtered results, and helper flags
 */
export function usePlatformSearch(platforms: Platform[]): PlatformSearchResult {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTier, setActiveTier] = useState("All");
  const [activeEcosystem, setActiveEcosystem] = useState<EcosystemType | "All">("All");

  const filteredPlatforms = useMemo(() => {
    return platforms.filter((platform) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        platform.name.toLowerCase().includes(query) ||
        platform.verdict.toLowerCase().includes(query) ||
        platform.targetUsers.toLowerCase().includes(query);

      const matchesCategory = activeCategory === "All" || platform.category === activeCategory;
      const matchesTier = activeTier === "All" || platform.priority === activeTier;
      const matchesEcosystem = activeEcosystem === "All" || platform.ecosystem === activeEcosystem;

      return matchesSearch && matchesCategory && matchesTier && matchesEcosystem;
    });
  }, [platforms, searchQuery, activeCategory, activeTier, activeEcosystem]);

  const hasActiveFilters =
    searchQuery !== "" ||
    activeCategory !== "All" ||
    activeTier !== "All" ||
    activeEcosystem !== "All";

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setActiveCategory("All");
    setActiveTier("All");
    setActiveEcosystem("All");
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    activeTier,
    setActiveTier,
    activeEcosystem,
    setActiveEcosystem,
    filteredPlatforms,
    hasActiveFilters,
    clearFilters,
  };
}
