import { useState, useCallback, useMemo } from "react";
import {
  calculateAllPlatformROI,
  type AssessmentFormData,
  type Department,
  type PlatformROI,
} from "@/entities/assessment/data";

// Re-export types so consumers can import from the feature
export type { AssessmentFormData, Department, PlatformROI };

/** Total number of steps in the assessment wizard. */
export const TOTAL_STEPS = 5;

/** Labels for each wizard step. */
export const STEP_LABELS: Record<number, string> = {
  1: "Organization Details",
  2: "Department Configuration",
  3: "Compliance Requirements",
  4: "Desired Integrations",
  5: "Pain Points",
};

/** Initial/empty form data for a new assessment. */
function createInitialFormData(): AssessmentFormData {
  return {
    organization_name: "",
    assessment_date: new Date().toISOString().split("T")[0],
    departments: [],
    compliance_requirements: [],
    desired_integrations: [],
    pain_points: [],
  };
}

export interface AssessmentWizardResult {
  /** The current step number (1-based) */
  currentStep: number;

  /** Total number of steps in the wizard */
  totalSteps: number;

  /** The accumulated form data (answers) */
  formData: AssessmentFormData;

  /** Update the form data */
  setFormData: (data: AssessmentFormData) => void;

  /** Whether the current step's validation passes and user can proceed */
  canProceed: boolean;

  /** Advance to the next step */
  goNext: () => void;

  /** Go back to the previous step */
  goBack: () => void;

  /** Complete the assessment and compute results */
  complete: () => void;

  /** Whether the wizard has been completed and results are available */
  isComplete: boolean;

  /** The computed ROI results (only available when isComplete is true) */
  results: PlatformROI[];

  /** Reset the wizard to the beginning */
  reset: () => void;

  /** Progress percentage (0-100) */
  progress: number;
}

/**
 * Hook that manages the assessment wizard step navigation,
 * form data accumulation, validation, and result computation.
 *
 * Extracted from AssessmentTab.tsx.
 *
 * @returns Wizard state and navigation functions
 */
export function useAssessmentWizard(): AssessmentWizardResult {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<PlatformROI[]>([]);
  const [formData, setFormData] = useState<AssessmentFormData>(createInitialFormData());

  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 1:
        return formData.organization_name.trim() !== "";
      case 2:
        return formData.departments.length > 0;
      default:
        return true;
    }
  }, [currentStep, formData.organization_name, formData.departments.length]);

  const goNext = useCallback(() => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep]);

  const goBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const complete = useCallback(() => {
    const roiResults = calculateAllPlatformROI(formData.departments);
    setResults(roiResults);
    setIsComplete(true);
  }, [formData.departments]);

  const reset = useCallback(() => {
    setCurrentStep(1);
    setIsComplete(false);
    setResults([]);
    setFormData(createInitialFormData());
  }, []);

  const progress = (currentStep / TOTAL_STEPS) * 100;

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    formData,
    setFormData,
    canProceed,
    goNext,
    goBack,
    complete,
    isComplete,
    results,
    reset,
    progress,
  };
}
