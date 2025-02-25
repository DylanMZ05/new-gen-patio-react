import Step from "../../components/Step";
import { useStepNavigation, StepData } from "../../hooks/useStepNavigation";

const steps: Record<number, StepData> = {
  1: {
    title: "What are you looking for?",
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
    title: 'Style',
    options: [
        { img: 'assets/images/Free3.jpg', text: 'Regular', nextStep: 5 },
        { img: 'assets/images/Attached24.jpg', text: 'Cantilever', nextStep: 5 }
    ],
    previousStep: 3
},
  5: {
    title: "Foundation",
    options: [
      { img: "assets/images/Free3.jpg", text: "Concrete", nextStep: "final" },
      { img: "assets/images/Attached24.jpg", text: "Grass & Dirt", nextStep: "final" },
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
    title: "Measurement",
    fields: [{ label: "Linear Feet", id: "linear-feet", required: true }],
    nextStep: 13,
    previousStep: 10,
  },
  12: {
    title: "Measurement",
    fields: [{ label: "Linear Feet", id: "linear-feet", required: true }],
    nextStep: 14,
    previousStep: 10,
  },
  13: {
    title: "Exterior Material",
    options: [
      { img: "assets/images/Free3.jpg", text: "Composite", nextStep: "final" },
      { img: "assets/images/Attached24.jpg", text: "Thermo Wood", nextStep: "final" },
    ],
    nextStep: 12,
    previousStep: 11,
  },
  14: {
    title: "Exterior Material",
    options: [
      { img: "assets/images/Attached24.jpg", text: "Brick", nextStep: "final" },
      { img: "assets/images/Free3.jpg", text: "Stone", nextStep: "final" },
      { img: "assets/images/Attached24.jpg", text: "Stucco", nextStep: "final" },
    ],
    nextStep: 12,
    previousStep: 12,
  },
};

const FreeQuote = () => {
  const { stepData, nextStep, previousStep, updateFormData, formData } = useStepNavigation(steps);

  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Step
        stepData={stepData}
        nextStep={nextStep}
        previousStep={previousStep}
        updateFormData={updateFormData}
        formData={formData}
      />
    </div>
  );
};

export default FreeQuote;
