import { useState } from "react";

export interface StepData {
  title: string;
  options?: { img: string; text: string; nextStep: number | "final" }[];
  fields?: { label: string; id: string; required: boolean }[];
  nextStep?: number | "final";
  previousStep?: number;
}

// Hook para manejar la navegación de pasos y datos
export const useStepNavigation = (steps: Record<number, StepData>) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [selections, setSelections] = useState<string[]>([]);

  // Función para avanzar al siguiente paso
  const nextStep = (step: number | "final", selectedOption?: string) => {
    // Si el usuario seleccionó una opción, la guardamos correctamente
    if (selectedOption) {
      setSelections((prevSelections) => {
        const filteredSelections = prevSelections.filter(
          (item) => !steps[currentStep]?.options?.some((opt) => opt.text === item)
        );
        return [...filteredSelections, selectedOption];
      });
    }

    // Si es el último paso, aseguramos que se guarde la última opción seleccionada
    if (step === "final") {
      setCurrentStep(99); 
      return;
    }

    setCurrentStep(step);
  };

  // Función para retroceder
  const previousStep = () => {
    const prevStep = steps[currentStep]?.previousStep;
    if (prevStep) setCurrentStep(prevStep);
  };

  // Función para actualizar los datos del formulario (medidas y contacto)
  const updateFormData = (id: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return { currentStep, stepData: steps[currentStep], nextStep, previousStep, updateFormData, formData, selections };
};
