import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Definimos la interfaz StepData
export interface StepData {
  title: string;
  options?: { img: string; text: string; nextStep: number | "final" }[];
  fields?: { label: string; id: string; required: boolean }[];
  nextStep?: number | "final";
  previousStep?: number;
}

// Hook para manejar la navegación de pasos y datos
export const useStepNavigation = (steps: Record<number, StepData>) => {
  const location = useLocation();
  
  // Inicializar currentStep basándonos en la URL
  const [currentStep, setCurrentStep] = useState<number>(() => {
    return location.pathname === "/freequote" ? 1 : 1; // Ajusta aquí según necesidad
  });

  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [selections, setSelections] = useState<string[]>([]);

  useEffect(() => {
    console.log("Step Navigation Initialized at step:", currentStep);
  }, [currentStep]);

  // Función para avanzar al siguiente paso
  const nextStep = (step: number | "final", selectedOption?: string) => {
    if (selectedOption) {
      setSelections((prevSelections) => {
        const filteredSelections = prevSelections.filter(
          (item) =>
            !steps[currentStep]?.options?.some((opt: { text: string }) => opt.text === item)
        );
        return [...filteredSelections, selectedOption];
      });
    }

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