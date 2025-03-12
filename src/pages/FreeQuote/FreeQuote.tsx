import Step from "../../components/Step";
import { useStepNavigation, StepData } from "../../hooks/useStepNavigation";

// Definimos los pasos del flujo
const steps: Record<number, StepData> = {
  1: {
    title: "¿What are you looking for",
    options: [
      { img: "assets/images/Products/Patios&Pergolas/Attached/11.webp", text: "Patios & Pergolas", nextStep: 2 },
      { img: "assets/images/Products/OutdoorKitchen/Modern/01.webp", text: "Outdoor Kitchens", nextStep: 10 },
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
      { img: "assets/images/Products/Patios&Pergolas/Attached/12.webp", text: "Attached", nextStep: 5 },
      { img: "assets/images/Products/Patios&Pergolas/Freestanding/11.webp", text: "Freestanding", nextStep: 4 },
    ],
    previousStep: 2,
  },
  4: {
    title: "Style",
    options: [
      { img: "assets/images/Products/Patios&Pergolas/Freestanding/03.webp", text: "Regular", nextStep: 5 },
      { img: "assets/images/Products/Patios&Pergolas/Cantilever/01.webp", text: "Cantilever", nextStep: 5 },
    ],
    previousStep: 3,
  },
  5: {
    title: "Foundation",
    options: [
      { img: "assets/images/Products/Patios&Pergolas/Attached/06.webp", text: "Concrete", nextStep: "final" },
      { img: "assets/images/Products/Grass&Dirt.webp", text: "Grass or Dirt", nextStep: "final" },
      { img: "assets/images/Products/Travertine.webp", text: "Travertine & Pavers", nextStep: "final" },
    ],
    previousStep: 4,
  },
  10: {
    title: "Style",
    options: [
      { img: "assets/images/Products/OutdoorKitchen/Modern/01.webp", text: "Modern", nextStep: 11 },
      { img: "assets/images/Products/OutdoorKitchen/Traditional/03.webp", text: "Traditional", nextStep: 12 },
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
      { img: "assets/images/Products/OutdoorKitchen/Modern/06.webp", text: "Compound", nextStep: "final" },
      { img: "assets/images/Products/OutdoorKitchen/Modern/07.webp", text: "Wood Thermo", nextStep: "final" },
    ],
    previousStep: 11,
  },
  14: {
    title: "Outer Material",
    options: [
      { img: "assets/images/Products/OutdoorKitchen/Traditional/02.webp", text: "Brick", nextStep: "final" },
      { img: "assets/images/Products/OutdoorKitchen/Traditional/07.webp", text: "Stone", nextStep: "final" },
      { img: "assets/images/Products/OutdoorKitchen/Traditional/08.webp", text: "Stucco", nextStep: "final" },
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
    <section className="h-content min-h-screen flex flex-col items-center justify-center bg-[url(assets/images/Products/Patios&Pergolas/Attached/01.webp)]">
      <div className="w-full h-content min-h-screen bg-black/70 flex items-center justify-center">
      <fieldset className="mx-5">
          <legend id="free-quote-heading" className="text-2xl font-semibold text-center text-transparent mx-5">
            Get Your Free Quote
          </legend>

          <Step
            stepData={stepData}
            nextStep={nextStep}
            previousStep={previousStep}
            updateFormData={updateFormData}
            formData={formData}
            selections={selections}
          />
        </fieldset>
      </div>
    </section>
  );
};

export default FreeQuote;
