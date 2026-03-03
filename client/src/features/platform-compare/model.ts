import { useState, useCallback } from "react";

/** Maximum number of platforms that can be selected for comparison. */
export const MAX_COMPARE_SELECTIONS = 4;

export interface PlatformCompareResult {
  /** Currently selected platform IDs */
  selectedPlatforms: string[];

  /**
   * Toggle a platform in/out of the selection.
   * If the platform is already selected, it is removed.
   * If the platform is not selected and the max has not been reached, it is added.
   * If the max has been reached, the selection is unchanged.
   */
  togglePlatformSelection: (id: string) => void;

  /** Clear all selected platforms */
  clearSelection: () => void;

  /** Whether the maximum number of selections has been reached */
  isMaxSelected: boolean;
}

/**
 * Hook that manages platform comparison selection state.
 * Extracted from App.tsx's `togglePlatformSelection` function and max-4 constraint.
 *
 * @returns Selection state and mutation functions
 */
export function usePlatformCompare(): PlatformCompareResult {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const togglePlatformSelection = useCallback((id: string) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(id)) {
        return prev.filter((p) => p !== id);
      }
      if (prev.length >= MAX_COMPARE_SELECTIONS) {
        return prev;
      }
      return [...prev, id];
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedPlatforms([]);
  }, []);

  const isMaxSelected = selectedPlatforms.length >= MAX_COMPARE_SELECTIONS;

  return {
    selectedPlatforms,
    togglePlatformSelection,
    clearSelection,
    isMaxSelected,
  };
}
