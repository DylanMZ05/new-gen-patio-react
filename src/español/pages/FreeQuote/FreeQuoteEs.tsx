import Step from "./StepEs";
import { useStepNavigation, StepData } from "../../../hooks/useStepNavigation";
import BlockSection from "../../../components/BlockSection";

// Definimos los pasos del flujo
const steps: Record<number, StepData> = {
  1: {
    title: "¿Qué estás buscando?", // ✅ Traducido
    options: [
      { img: "assets/images/Products/Patios&Pergolas/Attached/11.webp", text: "Patios y Pérgolas", nextStep: 2 }, // ✅ Traducido
      { img: "assets/images/Products/OutdoorKitchen/Modern/01.webp", text: "Cocinas Exteriores", nextStep: 10 }, // ✅ Traducido
    ],
  },
  2: {
    title: "Medidas", // ✅ Traducido
    fields: [
      { label: "Ancho (Pies)", id: "width", required: true }, // ✅ Traducido
      { label: "Largo (Pies)", id: "length", required: true }, // ✅ Traducido
      { label: "Altura (Pies)", id: "height", required: true }, // ✅ Traducido
    ],
    nextStep: 3,
    previousStep: 1,
  },
  3: {
    title: "Tipo", // ✅ Traducido
    options: [
      { img: "assets/images/FreeQUOTE/Patios&Pergolas/Attached.webp", text: "Adosado", nextStep: 5 }, // ✅ Traducido
      { img: "assets/images/FreeQUOTE/Patios&Pergolas/Freestanding.webp", text: "Independiente", nextStep: 4 }, // ✅ Traducido
    ],
    previousStep: 2,
  },
  4: {
    title: "Estilo", // ✅ Traducido
    options: [
      { img: "assets/images/FreeQUOTE/Patios&Pergolas/Fresstanding/Regular.webp", text: "Regular", nextStep: 5 }, // ✅ Traducido
      { img: "assets/images/FreeQUOTE/Patios&Pergolas/Fresstanding/Cantilever.webp", text: "Voladizo (Cantilever)", nextStep: 5 }, // ✅ Traducido
    ],
    previousStep: 3,
  },
  5: {
    title: "Cimientos", // ✅ Traducido
    subtitle: "¿Qué tipo de cimientos tienes actualmente?", // ✅ Traducido
    options: [
      { img: "assets/images/FreeQUOTE/Patios&Pergolas/Foundation/Concrete.webp", text: "Concreto", nextStep: "final" }, // ✅ Traducido
      { img: "assets/images/FreeQUOTE/Patios&Pergolas/Foundation/Grass&Dirt.webp", text: "Césped o Tierra", nextStep: "final" }, // ✅ Traducido
      { img: "assets/images/FreeQUOTE/Patios&Pergolas/Foundation/Travertine.webp", text: "Travertino y Adoquines", nextStep: "final" }, // ✅ Traducido
    ],
    previousStep: 4,
  },
  10: {
    title: "Estilo", // ✅ Traducido
    options: [
      { img: "assets/images/FreeQUOTE/OutdoorKitchen/Modern.webp", text: "Moderno", nextStep: 11 }, // ✅ Traducido
      { img: "assets/images/FreeQUOTE/OutdoorKitchen/Traditional.webp", text: "Tradicional", nextStep: 12 }, // ✅ Traducido
    ],
    previousStep: 1,
  },
  11: {
    title: "Medidas", // ✅ Traducido
    fields: [{ label: "Pies Lineales", id: "linear-feet", required: true }], // ✅ Traducido
    nextStep: 13,
    previousStep: 10,
  },
  12: {
    title: "Medidas", // ✅ Traducido
    fields: [{ label: "Pies Lineales", id: "linear-feet", required: true }], // ✅ Traducido
    nextStep: 14,
    previousStep: 10,
  },
  13: {
    title: "Material Exterior", // ✅ Traducido
    options: [
      { img: "assets/images/FreeQUOTE/OutdoorKitchen/Modern/Composite.webp", text: "Compuesto", nextStep: "final" }, // ✅ Traducido
      { img: "assets/images/FreeQUOTE/OutdoorKitchen/Modern/ThermoWood.webp", text: "Madera Térmica (ThermoWood)", nextStep: "final" }, // ✅ Traducido
    ],
    previousStep: 11,
  },
  14: {
    title: "Material Exterior", // ✅ Traducido
    options: [
      { img: "assets/images/FreeQUOTE/OutdoorKitchen/Traditional/Brick.webp", text: "Ladrillo", nextStep: "final" }, // ✅ Traducido
      { img: "assets/images/FreeQUOTE/OutdoorKitchen/Traditional/Stone.webp", text: "Piedra", nextStep: "final" }, // ✅ Traducido
      { img: "assets/images/FreeQUOTE/OutdoorKitchen/Traditional/Stucco.webp", text: "Estuco", nextStep: "final" }, // ✅ Traducido
    ],
    previousStep: 12,
  },
  99: {
    title: "Contacto y Resumen", // ✅ Traducido
    fields: [
      { label: "Nombre Completo (Nombre + Apellido)", id: "name", required: true }, // ✅ Traducido
      { label: "Teléfono (Solo números)", id: "phone", required: true }, // ✅ Traducido
      { label: "Correo Electrónico (ejemplo@ejemplo.com)", id: "email", required: true }, // ✅ Traducido
      { label: "Código Postal (Solo números)", id: "zip", required: true }, // ✅ Traducido
      { label: "Notas (Opcional)", id: "notes", required: false }, // ✅ Traducido
    ],
    previousStep: 1,
  },
};

const FreeQuoteEs = () => {
  const { stepData, nextStep, previousStep, updateFormData, formData, selections } = useStepNavigation(steps);

  // === TEXTOS TRADUCIDOS ===
  const MAIN_TITLE = "Obtén un Presupuesto Gratuito para tu Proyecto de Patio en Houston";
  const LEGEND_TEXT = "Formulario de Pasos para Presupuesto Gratuito";
  
  return (
    <section
      role="region"
      aria-label="Formulario de cotización gratuita" // ✅ Traducido
      className="min-h-screen bg-[url('/assets/images/Products/Patios&Pergolas/Attached/20.webp')] bg-cover bg-center"
    >
      <BlockSection />

      <main className="bg-black/60 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-10">
        {/* Título principal optimizado */}
        <h1 className="text-white/90 text-3xl md:text-4xl font-bold text-center mb-2 max-w-3xl leading-tight">
          {MAIN_TITLE} {/* ✅ Traducido */}
        </h1>
        <div
          className="bg-orange-500 border border-white/10 h-1 w-50 rounded-full mx-auto mb-6"
          aria-hidden="true"
        />

        {/* 🟨 Formulario con ID agregado */}
        <form
          id="free-quote-form"
          className="w-full max-w-4xl mx-auto px-4"
          aria-labelledby="free-quote-heading"
          onSubmit={(e) => e.preventDefault()} // evita que recargue si alguien da Enter
        >
          <fieldset>
            <legend id="free-quote-heading" className="sr-only">
              {LEGEND_TEXT} {/* ✅ Traducido */}
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
        </form>
      </main>
    </section>
  );
};

export default FreeQuoteEs;