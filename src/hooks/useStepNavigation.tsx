import { useState } from "react";

// Definimos la interfaz para un paso en el flujo
export interface StepData {
  title: string;
  progress?: number;
  options?: { img: string; text: string; nextStep: number | "final" }[];
  fields?: { label: string; id: string; required: boolean }[];
  nextStep?: number | "final";
  previousStep?: number;
}

// Hook para manejar la navegación de pasos y almacenar datos del formulario
export const useStepNavigation = (steps: Record<number, StepData>) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<Record<string, string | number>>({});

  // Función para avanzar al siguiente paso
  const nextStep = (step: number | "final") => {
    if (step === "final") {
      console.log("Formulario completado:", formData);
      return;
    }
    setCurrentStep(step);
  };

  // Función para retroceder al paso anterior
  const previousStep = () => {
    const prevStep = steps[currentStep]?.previousStep;
    if (prevStep) setCurrentStep(prevStep);
  };

  // Función para actualizar los datos del formulario
  const updateFormData = (id: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return { currentStep, stepData: steps[currentStep], nextStep, previousStep, updateFormData, formData };
};