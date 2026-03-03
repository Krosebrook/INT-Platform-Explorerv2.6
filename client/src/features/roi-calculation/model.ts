import { useState, useMemo, useCallback } from "react";
import type { ROIInputs, ROIResults } from "@shared/schema";

// Re-export the shared types so consumers can import from the feature
export type { ROIInputs, ROIResults };

/** Productive weeks per year (assumes ~4 weeks PTO/holidays). */
const WEEKS_PER_YEAR = 48;

/** Standard work hours per week. */
const HOURS_PER_WEEK = 40;

/**
 * Pure function that calculates ROI results from the given inputs.
 * Extracted from ROICalculator.tsx's useMemo computation.
 *
 * Formula:
 *   - adoptedEmployees = employees * (adoptionPercentage / 100)
 *   - hourlyRate = averageSalary / (WEEKS_PER_YEAR * 40)
 *   - annualProductivityValue = adoptedEmployees * weeklyProductivityGain * hourlyRate * WEEKS_PER_YEAR
 *   - annualTotalCost = annualPlatformCost + trainingCost
 *   - netBenefit = annualProductivityValue - annualTotalCost
 *   - roiPercentage = (netBenefit / annualTotalCost) * 100
 *   - paybackPeriodMonths = (annualTotalCost / annualProductivityValue) * 12
 */
export function calculateROI(inputs: ROIInputs): ROIResults {
  const adoptedEmployees = Math.round(inputs.employees * (inputs.adoptionPercentage / 100));
  const hourlyRate = inputs.averageSalary / (WEEKS_PER_YEAR * HOURS_PER_WEEK);

  const annualProductivityValue =
    adoptedEmployees * inputs.weeklyProductivityGain * hourlyRate * WEEKS_PER_YEAR;

  const annualTotalCost = inputs.annualPlatformCost + inputs.trainingCost;
  const netBenefit = annualProductivityValue - annualTotalCost;
  const roiPercentage = annualTotalCost > 0 ? (netBenefit / annualTotalCost) * 100 : 0;
  const paybackPeriodMonths =
    annualProductivityValue > 0 ? (annualTotalCost / annualProductivityValue) * 12 : 0;

  return {
    annualProductivityValue: Math.round(annualProductivityValue),
    annualTotalCost: Math.round(annualTotalCost),
    netBenefit: Math.round(netBenefit),
    roiPercentage: Math.round(roiPercentage),
    paybackPeriodMonths: Math.round(paybackPeriodMonths * 10) / 10,
  };
}

/** Default ROI input values (matches the existing ROICalculator defaults). */
export const DEFAULT_ROI_INPUTS: ROIInputs = {
  employees: 500,
  averageSalary: 75000,
  adoptionPercentage: 60,
  weeklyProductivityGain: 7,
  annualPlatformCost: 12000,
  trainingCost: 5000,
};

export interface ROICalculationResult {
  /** Current input values */
  inputs: ROIInputs;

  /** Update a single input field */
  updateInput: <K extends keyof ROIInputs>(key: K, value: ROIInputs[K]) => void;

  /** Reset inputs to defaults */
  resetInputs: () => void;

  /** Computed ROI results (recomputed whenever inputs change) */
  results: ROIResults;
}

/**
 * Hook that manages ROI calculation input state and computed results.
 * Extracted from ROICalculator.tsx.
 *
 * @param initialInputs - Optional initial values (defaults to DEFAULT_ROI_INPUTS)
 * @returns Input state, update function, and computed results
 */
export function useROICalculation(initialInputs?: Partial<ROIInputs>): ROICalculationResult {
  const [inputs, setInputs] = useState<ROIInputs>({
    ...DEFAULT_ROI_INPUTS,
    ...initialInputs,
  });

  const updateInput = useCallback(<K extends keyof ROIInputs>(key: K, value: ROIInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetInputs = useCallback(() => {
    setInputs({ ...DEFAULT_ROI_INPUTS, ...initialInputs });
  }, [initialInputs]);

  const results = useMemo<ROIResults>(() => calculateROI(inputs), [inputs]);

  return {
    inputs,
    updateInput,
    resetInputs,
    results,
  };
}
