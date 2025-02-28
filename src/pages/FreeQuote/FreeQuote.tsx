import Step from "../../components/Step";
import { useStepNavigation, StepData } from "../../hooks/useStepNavigation";

// Definimos los pasos del flujo
const steps: Record<number, StepData> = {
  1: {
    title: "¿What are you looking for",
    options: [
      { img: "assets/images/Attached24.jpg", text: "Patios & Pergolas", nextStep: 2 },
      { img: "assets/images/Free3.jpg", text: "Outdoor Kitchens", nextStep: 10 },
    ],
  },
  2: {
    title: "Measurement",
    fields: [
      { label: "Width (Ft)", id: "width", required: true },
      { label: "Length (Ft)", id: "length", required: true },
      { label: "Height (Ft)", id: "height", required: true },
    ],
    nextStep: 3,
    previousStep: 1,
  },
  3: {
    title: "Type",
    options: [
      { img: "assets/images/Free3.jpg", text: "Attached", nextStep: 5 },
      { img: "assets/images/Attached24.jpg", text: "Freestanding", nextStep: 4 },
    ],
    previousStep: 2,
  },
  4: {
    title: "Style",
    options: [
      { img: "assets/images/Free3.jpg", text: "Regular", nextStep: 5 },
      { img: "assets/images/Attached24.jpg", text: "Cantilever", nextStep: 5 },
    ],
    previousStep: 3,
  },
  5: {
    title: "Foundation",
    options: [
      { img: "assets/images/Free3.jpg", text: "Concrete", nextStep: "final" },
      { img: "assets/images/Attached24.jpg", text: "Turf", nextStep: "final" },
      { img: "assets/images/Free3.jpg", text: "Travertine & Pavers", nextStep: "final" },
    ],
    previousStep: 4,
  },
  10: {
    title: "Style",
    options: [
      { img: "assets/images/Attached24.jpg", text: "Modern", nextStep: 11 },
      { img: "assets/images/Free3.jpg", text: "Traditional", nextStep: 12 },
    ],
    previousStep: 1,
  },
  11: {
    title: "Measures",
    fields: [{ label: "Linear Feet", id: "linear-feet", required: true }],
    nextStep: 13,
    previousStep: 10,
  },
  12: {
    title: "Measures",
    fields: [{ label: "Linear Feet", id: "linear-feet", required: true }],
    nextStep: 14,
    previousStep: 10,
  },
  13: {
    title: "Outer Material",
    options: [
      { img: "assets/images/Free3.jpg", text: "Compound", nextStep: "final" },
      { img: "assets/images/Attached24.jpg", text: "Wood Thermo", nextStep: "final" },
    ],
    previousStep: 11,
  },
  14: {
    title: "Outer Material",
    options: [
      { img: "assets/images/Attached24.jpg", text: "Brick", nextStep: "final" },
      { img: "assets/images/Free3.jpg", text: "Stone", nextStep: "final" },
      { img: "assets/images/Attached24.jpg", text: "Stucco", nextStep: "final" },
    ],
    previousStep: 12,
  },
  99: {
    title: "Contact and Resume",
    fields: [
      { label: "Full Name (First name + Last name)", id: "name", required: true },
      { label: "Phone (Only numbers)", id: "phone", required: true },
      { label: "Email (example@example.com)", id: "email", required: true },
      { label: "Zip Code (Only numbers)", id: "zip", required: true },
      { label: "Notes (Optional)", id: "notes", required: false },
    ],
    previousStep: 1,
  },
};

const FreeQuote = () => {
  const { stepData, nextStep, previousStep, updateFormData, formData, selections } = useStepNavigation(steps);

  return (
    <section className="h-screen flex flex-col items-center justify-center bg-[url(assets/images/Attached24.jpg)]">
      <div className="w-screen h-screen bg-black/70 flex items-center justify-center">
        <Step
          stepData={stepData}
          nextStep={nextStep}
          previousStep={previousStep}
          updateFormData={updateFormData}
          formData={formData}
          selections={selections}
        />
      </div>
    </section>
  );
};

export default FreeQuote;
