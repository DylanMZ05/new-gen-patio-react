import React, { useEffect, useState } from "react";
import { StepData } from "../../../hooks/useStepNavigation";

interface StepProps {
  stepData: StepData;
  nextStep: (step: number | string, selectedOption?: string) => void;
  previousStep: () => void;
  updateFormData: (id: string, value: string | number) => void;
  formData: Record<string, string | number>;
  selections: string[];
}

const StepEs: React.FC<StepProps> = ({
  stepData,
  nextStep,
  previousStep,
  updateFormData,
  formData,
  selections,
}) => {
  const [noMeasurements, setNoMeasurements] = useState(false);

  // === TEXTOS TRADUCIDOS ===
  const I_DONT_KNOW_MESSAGE = "No sé mis medidas.";
  const REQUIRED_FIELD_MESSAGE = "Este campo es obligatorio.";
  const MEASURES_UNKNOWN_MESSAGE = "No sé mis medidas.";
  const MESSAGE_HEADER = "*Solicitud de Cotización*";
  const MESSAGE_OPTIONS_TITLE = "Opciones Seleccionadas:";
  const MESSAGE_MEASURES_TITLE = "Medidas:";
  const MESSAGE_NAME_LABEL = "Nombre:";
  const MESSAGE_PHONE_LABEL = "Teléfono:";
  const MESSAGE_EMAIL_LABEL = "Email:";
  const MESSAGE_ZIP_LABEL = "Código Postal:";
  const MESSAGE_NOTES_LABEL = "Notas:";
  const NOT_PROVIDED = "No proporcionado";
  const NOTES_NONE = "Ninguna";
  const FINAL_BUTTON_SEND = "Enviar a WhatsApp 📩";
  const FINAL_BUTTON_COMPLETE = "Completa todos los campos";
  const RESUME_OPTIONS_TITLE = "Opciones seleccionadas:";
  const RESUME_MEASURES_TITLE = "~ Medidas:";
  const BUTTON_CONTINUE = "Continuar";
  const BUTTON_BACK = "Atrás";
  const BUTTON_MEASUREMENTS_UNKNOWN = "No sé mis medidas";


  const isMeasurementStep = stepData.fields?.some((field) =>
    ["width", "length", "height", "linear-feet"].includes(field.id)
  );

  const isMeasurementStepField = (fieldId: string) =>
    ["width", "length", "height", "linear-feet"].includes(fieldId);

  const getFormattedInputs = () => {
    if (noMeasurements) return MEASURES_UNKNOWN_MESSAGE; // ✅ Traducido
    
    return Object.entries(formData)
      .filter(([key]) => isMeasurementStepField(key))
      // Formato: • Ancho: 10
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
    ${MESSAGE_HEADER}
    • *${MESSAGE_OPTIONS_TITLE}* ${selections.join(" | ")}
    ${getFormattedInputs() ? `• *${MESSAGE_MEASURES_TITLE}* \n${getFormattedInputs()}\n` : ""}
    • *${MESSAGE_NAME_LABEL}* ${formData.name || NOT_PROVIDED}
    • *${MESSAGE_PHONE_LABEL}* ${formData.phone || NOT_PROVIDED}
    • *${MESSAGE_EMAIL_LABEL}* ${formData.email || NOT_PROVIDED}
    • *${MESSAGE_ZIP_LABEL}* ${formData.zip || NOT_PROVIDED}
    • *${MESSAGE_NOTES_LABEL}* ${formData.notes || NOTES_NONE}
  `;

  const handleIDontKnow = () => {
    setNoMeasurements(true);
    nextStep(stepData.nextStep!);
  };

  useEffect(() => {
    if (isMeasurementStep) {
      setNoMeasurements(false);
    }
  }, [stepData]);

  return (
    <div className="w-full max-w-[1080px] mb-12 p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
      <header className="text-center">
        {/* 🔹 Título principal */}
        <h2 className="text-2xl font-semibold text-gray-800">{stepData.title}</h2>
        <div className="w-20 h-[3px] bg-[#0d4754] mx-auto mb-1 mt-2 rounded-full"></div>

        {/* 🔸 Subtítulo opcional (para Foundation) */}
        {stepData.subtitle && (
          <p className="text-gray-700 text-base mt-1 mb-3">
            {stepData.subtitle}
          </p>
        )}
      </header>

      {stepData.options && (
        <div className="flex flex-wrap justify-center mt-4 gap-4">
          {stepData.options.map((option, index) => (
            <button
              key={index}
              className="p-2 rounded-lg transition cursor-pointer"
              onClick={() => nextStep(option.nextStep, option.text)}
            >
              <img
                src={option.img}
                alt={`Opción: ${option.text}`} // ✅ Traducido
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
                    {REQUIRED_FIELD_MESSAGE} {/* ✅ Traducido */}
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
              {BUTTON_MEASUREMENTS_UNKNOWN} {/* ✅ Traducido */}
            </button>
          )}
        </fieldset>
      )}

      {stepData.title === "Contacto y Resumen" ? ( // ✅ Comparación con título traducido
        <div className="w-full max-w-md">
          {selections.length > 0 && (
            <div className="bg-gray-200 p-3 rounded-md text-center">
              <h4 className="text-md font-semibold text-gray-700">
                {RESUME_OPTIONS_TITLE} {/* ✅ Traducido */}
              </h4>
              <p>{selections.join(" | ")}</p>
            </div>
          )}

          {getFormattedInputs() && (
            <div className="mt-4 bg-gray-200 p-3 rounded-md">
              <h4 className="text-md font-semibold text-gray-700">
                {RESUME_MEASURES_TITLE}
            </h4> {/* ✅ Traducido */}
              <p>{getFormattedInputs()}</p>
            </div>
          )}

          <button
            onClick={() => {
              const message = buildMessage();
              sessionStorage.setItem("whatsappMessage", message);
              // ✅ Ajuste de la ruta de tracking a la versión ES
              window.open("/get-a-free-quote-houston-tracking/es", "_blank"); 
            }}
            disabled={!allRequiredFieldsFilled}
            className={`w-full py-2 rounded-full transition ${
              allRequiredFieldsFilled
                ? "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            } mt-4`}
          >
            {allRequiredFieldsFilled ? FINAL_BUTTON_SEND : FINAL_BUTTON_COMPLETE} {/* ✅ Traducido */}
          </button>
        </div>
      ) : (
        stepData.fields && (
          <button
            onClick={() => nextStep(stepData.nextStep!)}
            disabled={!allRequiredFieldsFilled}
            className="w-full max-w-75 bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition mt-3 cursor-pointer"
          >
            {BUTTON_CONTINUE} {/* ✅ Traducido */}
          </button>
        )
      )}

      {stepData.previousStep && (
        <button
          onClick={previousStep}
          className="mt-4 text-black/70 hover:text-black/90 cursor-pointer transition"
        >
          {BUTTON_BACK} {/* ✅ Traducido */}
        </button>
      )}
    </div>
  );
};

export default StepEs;