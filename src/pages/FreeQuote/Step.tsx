import React, { useEffect, useState } from "react";
import { StepData } from "../../hooks/useStepNavigation";

/**
 * 1. URL DE IMPLEMENTACIÓN ACTUALIZADA:
 * Esta es la URL del script unificado que maneja Contractors y Quotes.
 */
const SCRIPT_URL_QUOTE = "https://script.google.com/macros/s/AKfycbx-zG476yOKXykl2HJ0vregOoFj0OWhZQVAvqgp2S6tHeFbcZyVX66e-qakm1Amox5Szg/exec";

interface StepProps {
  stepData: StepData;
  nextStep: (step: number | string, selectedOption?: string) => void;
  previousStep: () => void;
  updateFormData: (id: string, value: string | number) => void;
  formData: Record<string, string | number>;
  selections: string[];
}

const Step: React.FC<StepProps> = ({
  stepData,
  nextStep,
  previousStep,
  updateFormData,
  formData,
  selections,
}) => {
  const [noMeasurements, setNoMeasurements] = useState(false);

  const isMeasurementStep = stepData.fields?.some((field) =>
    ["width", "length", "height", "linear-feet"].includes(field.id)
  );

  const isMeasurementStepField = (fieldId: string) =>
    ["width", "length", "height", "linear-feet"].includes(fieldId);

  const getFormattedInputs = () => {
    if (noMeasurements) return "I don't know my measurements.";
    return Object.entries(formData)
      .filter(([key]) => isMeasurementStepField(key))
      .map(([key, value]) => `• ${key.replace("-", " ")}: ${value}`)
      .join("\n");
  };

  const allRequiredFieldsFilled = stepData.fields
    ? stepData.fields.every(
        (field) =>
          !field.required ||
          formData[field.id] ||
          (noMeasurements && isMeasurementStepField(field.id))
      )
    : true;

  const buildMessage = () => `
    *Request for Quotation*
    • *Selected options:* ${selections.join(" | ")}
    ${getFormattedInputs() ? `• *Measures:* \n${getFormattedInputs()}\n` : ""}
    • *Name:* ${formData.name || "Not provided"}
    • *Phone:* ${formData.phone || "Not provided"}
    • *Email:* ${formData.email || "Not provided"}
    • *Zip Code:* ${formData.zip || "Not provided"}
    • *Notes:* ${formData.notes || "None"}
  `;

  /**
   * FUNCIÓN DE ENVÍO FINAL
   * Envía los datos al script unificado y procesa la redirección.
   */
  const handleFinalSubmit = async () => {
    const message = buildMessage();

    // Preparamos los datos para el Script Unificado
    const fd = new FormData();
    // INDICAMOS QUE ESTE ES EL FORMULARIO DE COTIZACIÓN (Pestaña PRUEBA)
    fd.append("formType", "quote"); 
    fd.append("name", String(formData.name || ""));
    fd.append("phone", String(formData.phone || ""));
    fd.append("email", String(formData.email || ""));

    try {
      // Envío a Google Sheets (modo no-cors para evitar bloqueos de redirección)
      fetch(SCRIPT_URL_QUOTE, {
        method: "POST",
        body: fd,
        mode: "no-cors", 
      });
      console.log("Data sent to Unified Google Script (Quote).");
    } catch (error) {
      console.error("Error al guardar en Sheets:", error);
    }

    // Lógica de WhatsApp y redirección al Tracking de Houston
    sessionStorage.setItem("whatsappMessage", message);
    window.open("/get-a-free-quote-houston-tracking", "_blank");
  };

  const handleIDontKnow = () => {
    setNoMeasurements(true);
    nextStep(stepData.nextStep!);
  };

  useEffect(() => {
    if (isMeasurementStep) {
      setNoMeasurements(false);
    }
  }, [stepData, isMeasurementStep]);

  return (
    <div className="w-full max-w-[1080px] mb-12 p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
      <header className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">{stepData.title}</h2>
        <div className="w-20 h-[3px] bg-[#0d4754] mx-auto mb-1 mt-2 rounded-full"></div>

        {stepData.subtitle && (
          <p className="text-gray-700 text-base mt-1 mb-3">
            {stepData.subtitle}
          </p>
        )}
      </header>

      {/* Renderizado de Opciones con Imágenes */}
      {stepData.options && (
        <div className="flex flex-wrap justify-center mt-4 gap-4">
          {stepData.options.map((option, index) => (
            <button
              key={index}
              className="p-2 rounded-lg transition cursor-pointer"
              onClick={() => nextStep(option.nextStep, option.text)}
              type="button"
            >
              <img
                src={option.img}
                alt={`Option: ${option.text}`}
                className="w-75 h-50 object-cover rounded-md transition-all hover:scale-105"
                loading="lazy"
                width={300}
                height={200}
                onError={(e) =>
                  (e.currentTarget.src = "/assets/images/default-placeholder.webp")
                }
              />
              <p className="mt-2 text-center text-2xl font-semibold text-black/90">
                {option.text}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* Renderizado de Campos de Formulario */}
      {stepData.fields && (
        <fieldset className="mt-4 w-full max-w-md">
          {stepData.fields.map((field) => (
            <div key={field.id} className="mb-4">
              <label htmlFor={field.id} className="block text-gray-700">
                {field.label}
              </label>
              <input
                id={field.id}
                type="text"
                className={`w-full px-3 py-2 border ${
                  field.required &&
                  !formData[field.id] &&
                  (!noMeasurements || !isMeasurementStepField(field.id))
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required={
                  field.required && (!noMeasurements || !isMeasurementStepField(field.id))
                }
                value={formData[field.id] || ""}
                onChange={(e) => updateFormData(field.id, e.target.value)}
                disabled={noMeasurements && isMeasurementStepField(field.id)}
              />
              {field.required &&
                !formData[field.id] &&
                (!noMeasurements || !isMeasurementStepField(field.id)) && (
                  <p className="text-red-500 text-sm mt-1">
                    This field is required.
                  </p>
                )}
            </div>
          ))}

          {isMeasurementStep && !noMeasurements && (
            <button
              onClick={handleIDontKnow}
              className="w-full text-sm text-blue-600 hover:text-blue-800 underline mt-2 cursor-pointer"
              type="button"
            >
              I don't know my measurements
            </button>
          )}
        </fieldset>
      )}

      {/* Lógica de Resumen Final y Botón de Envío */}
      {stepData.title === "Contact and Resume" ? (
        <div className="w-full max-w-md">
          {selections.length > 0 && (
            <div className="bg-gray-200 p-3 rounded-md text-center">
              <h4 className="text-md font-semibold text-gray-700">
                Selected options:
              </h4>
              <p>{selections.join(" | ")}</p>
            </div>
          )}

          {getFormattedInputs() && (
            <div className="mt-4 bg-gray-200 p-3 rounded-md">
              <h4 className="text-md font-semibold text-gray-700">~ Measures:</h4>
              <pre className="whitespace-pre-wrap font-sans">{getFormattedInputs()}</pre>
            </div>
          )}

          <button
            onClick={handleFinalSubmit}
            disabled={!allRequiredFieldsFilled}
            className={`w-full py-2 rounded-full transition ${
              allRequiredFieldsFilled
                ? "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            } mt-4`}
            type="button"
          >
            {allRequiredFieldsFilled ? "Send to WhatsApp 📩" : "Complete all fields"}
          </button>
        </div>
      ) : (
        // Botón de continuación para pasos intermedios con campos
        stepData.fields && (
          <button
            onClick={() => nextStep(stepData.nextStep!)}
            disabled={!allRequiredFieldsFilled}
            className="w-full max-w-75 bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition mt-3 cursor-pointer"
            type="button"
          >
            Continue
          </button>
        )
      )}

      {/* Botón de Retroceso */}
      {stepData.previousStep && (
        <button
          onClick={previousStep}
          className="mt-4 text-black/70 hover:text-black/90 cursor-pointer transition"
          type="button"
        >
          Back
        </button>
      )}
    </div>
  );
};

export default Step;