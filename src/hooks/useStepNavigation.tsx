// src/hooks/useStepNavigation.ts
import { useState } from "react";

export interface StepData {
  title: string;
  subtitle?: string; // ✅ NUEVO CAMPO opcional
  options?: { img: string; text: string; nextStep: string | number }[];
  fields?: { label: string; id: string; required?: boolean }[];
  nextStep?: string | number;
  previousStep?: number;
}

interface StepsMap {
  [key: number]: StepData;
}

interface UseStepNavigationResult {
  stepData: StepData;
  nextStep: (step: string | number, selectedOption?: string) => void;
  previousStep: () => void;
  updateFormData: (id: string, value: string | number) => void;
  formData: Record<string, string | number>;
  selections: string[];
}

/**
 * Hook que maneja la navegación de pasos en el formulario Free Quote
 */
export const useStepNavigation = (steps: StepsMap): UseStepNavigationResult => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [selections, setSelections] = useState<string[]>([]);

  const stepData = steps[currentStep];

  const nextStep = (step: string | number, selectedOption?: string) => {
    if (selectedOption) {
      setSelections((prev) => [...prev, selectedOption]);
    }

    if (step === "final") {
      setCurrentStep(99); // paso final (Contact and Resume)
      return;
    }

    if (typeof step === "string") {
      const numericStep = parseInt(step, 10);
      if (!isNaN(numericStep)) {
        setCurrentStep(numericStep);
        return;
      }
    }

    if (typeof step === "number") {
      setCurrentStep(step);
    }
  };

  const previousStep = () => {
    const prev = stepData.previousStep;
    if (prev) {
      setCurrentStep(prev);
    }
  };

  const updateFormData = (id: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return {
    stepData,
    nextStep,
    previousStep,
    updateFormData,
    formData,
    selections,
  };
};
