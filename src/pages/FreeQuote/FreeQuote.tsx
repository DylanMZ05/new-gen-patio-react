import Step from "../../components/Step";
import { useStepNavigation, StepData } from "../../hooks/useStepNavigation";

// Definimos los pasos del flujo
const steps: Record<number, StepData> = {
  1: {
    title: "¿Qué estás buscando?",
    options: [
      { img: "assets/images/Attached24.jpg", text: "Patios & Pergolas", nextStep: 2 },
      { img: "assets/images/Free3.jpg", text: "Cocinas Exteriores", nextStep: 10 },
    ],
  },
  2: {
    title: "Medidas",
    fields: [
      { label: "Ancho (Ft)", id: "width", required: true },
      { label: "Largo (Ft)", id: "length", required: true },
      { label: "Altura (Ft)", id: "height", required: true },
    ],
    nextStep: 3,
    previousStep: 1,
  },
  3: {
    title: "Tipo",
    options: [
      { img: "assets/images/Free3.jpg", text: "Adjunto", nextStep: 5 },
      { img: "assets/images/Attached24.jpg", text: "Independiente", nextStep: 4 },
    ],
    previousStep: 2,
  },
  4: {
    title: "Estilo",
    options: [
      { img: "assets/images/Free3.jpg", text: "Regular", nextStep: 5 },
      { img: "assets/images/Attached24.jpg", text: "Cantilever", nextStep: 5 },
    ],
    previousStep: 3,
  },
  5: {
    title: "Fundación",
    options: [
      { img: "assets/images/Free3.jpg", text: "Concreto", nextStep: "final" },
      { img: "assets/images/Attached24.jpg", text: "Césped & Tierra", nextStep: "final" },
      { img: "assets/images/Free3.jpg", text: "Adoquines & Piedra", nextStep: "final" },
    ],
    previousStep: 4,
  },
  10: {
    title: "Estilo",
    options: [
      { img: "assets/images/Attached24.jpg", text: "Moderno", nextStep: 11 },
      { img: "assets/images/Free3.jpg", text: "Tradicional", nextStep: 12 },
    ],
    previousStep: 1,
  },
  11: {
    title: "Medidas",
    fields: [{ label: "Pies Lineales", id: "linear-feet", required: true }],
    nextStep: 13,
    previousStep: 10,
  },
  12: {
    title: "Medidas",
    fields: [{ label: "Pies Lineales", id: "linear-feet", required: true }],
    nextStep: 14,
    previousStep: 10,
  },
  13: {
    title: "Material Exterior",
    options: [
      { img: "assets/images/Free3.jpg", text: "Compuesto", nextStep: "final" },
      { img: "assets/images/Attached24.jpg", text: "Madera Termo", nextStep: "final" },
    ],
    previousStep: 11,
  },
  14: {
    title: "Material Exterior",
    options: [
      { img: "assets/images/Attached24.jpg", text: "Ladrillo", nextStep: "final" },
      { img: "assets/images/Free3.jpg", text: "Piedra", nextStep: "final" },
      { img: "assets/images/Attached24.jpg", text: "Estuco", nextStep: "final" },
    ],
    previousStep: 12,
  },
  99: {
    title: "Resumen y Contacto",
    fields: [
      { label: "Nombre", id: "name", required: true },
      { label: "Teléfono", id: "phone", required: true },
      { label: "Email", id: "email", required: true },
      { label: "Código Postal", id: "zip", required: true },
      { label: "Notas (Opcional)", id: "notes", required: false },
    ],
    previousStep: 1,
  },
};

const FreeQuote = () => {
  const { stepData, nextStep, previousStep, updateFormData, formData, selections } = useStepNavigation(steps);

  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Step
        stepData={stepData}
        nextStep={nextStep}
        previousStep={previousStep}
        updateFormData={updateFormData}
        formData={formData}
        selections={selections}
      />
    </div>
  );
};

export default FreeQuote;
