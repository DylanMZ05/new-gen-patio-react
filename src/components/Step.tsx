import React, { useState } from "react";
import { StepData } from "../hooks/useStepNavigation";
import { X } from "lucide-react"; // Icono de "X" para cerrar el popup

interface StepProps {
  stepData: StepData;
  nextStep: (step: number | "final", selectedOption?: string) => void;
  previousStep: () => void;
  updateFormData: (id: string, value: string | number) => void;
  formData: Record<string, string | number>;
  selections: string[];
}

const Step: React.FC<StepProps> = ({ stepData, nextStep, previousStep, updateFormData, formData, selections }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  // Función para obtener todas las medidas ingresadas
  const getFormattedInputs = () => {
    return Object.entries(formData)
      .filter(([key]) => ["width", "length", "height", "linear-feet"].includes(key))
      .map(([key, value]) => `📏 ${key.replace("-", " ")}: ${value}`)
      .join("\n");
  };

  // Validar que todos los campos requeridos estén completos
  const allRequiredFieldsFilled = stepData.fields
    ? stepData.fields.every((field) => !field.required || formData[field.id])
    : true;

    const allRequiredMeasuresFilled = stepData.fields
  ? stepData.fields
      .filter((field) => ["width", "length", "height", "linear-feet"].includes(field.id)) // Solo los campos de medidas
      .every((field) => !field.required || formData[field.id])
  : true;

  // Construir mensaje para WhatsApp
  const buildMessage = () => {
    return `*Request for Quotation* 📋

    🔹 *Selected options:* ${selections.join(" | ")}
    ${getFormattedInputs() ? `📐 *Measures:* \n${getFormattedInputs()}\n` : ""}
        📌 *Name:* ${formData.name || "Not provided"}
        📌 *Phone:* ${formData.phone || "Not provided"}
        📌 *Email:* ${formData.email || "Not provided"}
        📌 *Zip Code:* ${formData.zip || "Not provided"}
        📝 *Notes:* ${formData.notes || "None"}
    `;
  };

  // Función para copiar mensaje al portapapeles
  const copyToClipboard = (message: string) => {
    navigator.clipboard.writeText(message).then(() => {
      setShowPopup(true);
    }).catch(() => {
      alert("The message could not be copied. Please copy it manually.");
    });
  };

  // Función para enviar el mensaje a WhatsApp
  const handleSendWhatsApp = () => {
    if (!allRequiredFieldsFilled) {
      alert("Please complete all required fields before submitting.");
      return;
    }

    const message = buildMessage();
    copyToClipboard(message); // Copia el mensaje antes de mostrar el popup

    const numeroWhatsApp = "13463800845";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`;
    setWhatsappUrl(url);
  };

  return (
    <div className="w-lvw max-w-[1080px] mx-10 mb-12 p-6 bg-white shadow-lg rounded-lg min-h-150 mt-25 flex flex-col justify-center items-center">
      {/* Título */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 text-center">{stepData.title}</h2>
        <div className="w-20 h-[3px] background-skyblue mx-auto mb-1 mt-2 rounded-full"></div>
      </div>

      {/* Renderizar opciones con imágenes */}
      {stepData.options && (
        <div className="flex flex-col mt-4 md:flex-row">
          {stepData.options.map((option, index) => (
            <button
              key={index}
              className="p-2 rounded-lg transition cursor-pointer"
              onClick={() => nextStep(option.nextStep, option.text)}
            >
              <img src={option.img} alt={option.text} className="w-75 object-cover rounded-md transition-all hover:scale-105" />
              <p className="mt-2 text-center text-2xl font-semibold text-black/90">{option.text}</p>
            </button>
          ))}
        </div>
      )}

      {/* Renderizar inputs del formulario */}
      {stepData.fields && (
        <div className="mt-4 w-full max-w-md">
          {stepData.fields.map((field) => (
            <div key={field.id} className="mb-4">
              <label className="block text-gray-700">{field.label}</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border ${
                  field.required && !formData[field.id] ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required={field.required}
                value={formData[field.id] || ""}
                onChange={(e) => updateFormData(field.id, e.target.value)}
              />
              {field.required && !formData[field.id] && (
                <p className="text-red-500 text-sm mt-1">This field is required.</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Último paso: mostrar resumen y botón de WhatsApp */}
      {stepData.title === "Contact and Resume" ? (
        <div className="w-full max-w-md">
          {/* Mostrar opciones seleccionadas SOLO en el formulario final */}
          {selections.length > 0 && (
            <div className="bg-gray-200 p-3 rounded-md text-center">
              <h4 className="text-md font-semibold text-gray-700">Selected options:</h4>
              <p>{selections.join(" | ")}</p>
            </div>
          )}

          {/* Mostrar las medidas ingresadas */}
          {getFormattedInputs() && (
            <div className="mt-4 bg-gray-200 p-3 rounded-md">
              <h4 className="text-md font-semibold text-gray-700">📐 Measures:</h4>
              <p>{getFormattedInputs()}</p>
            </div>
          )}

          <button
            onClick={handleSendWhatsApp}
            disabled={!allRequiredFieldsFilled}
            className={`w-full py-2 rounded-full transition cursor-pointer ${
              allRequiredFieldsFilled
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            } mt-4`}
          >
            {allRequiredFieldsFilled ? "Send to WhatsApp 📩" : "Complete all fields"}
          </button>
        </div>
      ) : (
        // Mostrar botón "Continue" solo si el paso tiene inputs y no es el último
        stepData.fields && (
          <button
            onClick={() => nextStep(stepData.nextStep!)}
            disabled={!allRequiredMeasuresFilled}
            className="w-full max-w-75 bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition mt-3 cursor-pointer"
          >
            Continue
          </button>
        )
      )}

      {/* Botón para regresar */}
      {stepData.previousStep && (
        <button onClick={previousStep} className="mt-4 text-black/70 hover:text-black/90 cursor-pointer transition">
          Back
        </button>
      )}

       {/* Popup de confirmación */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50">
            <div className="bg-white p-6 mx-5 rounded-lg shadow-lg text-center relative">
              {/* Botón para cerrar el popup */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                <X size={20} />
              </button>

              <p className="text-lg font-semibold">Message Copied</p>
              <p className="text-red-500/80 font-semibold">If you use WhatsApp Desktop, copy it when you enter the chat</p>
              <button
                onClick={() => {
                  setShowPopup(false);
                  window.scrollTo(0, 0); // Llevar al inicio de la página
                  window.open(whatsappUrl, "_blank"); // Redirigir a WhatsApp
                }}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 cursor-pointer"
              >
                Go to WhatsApp
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default Step;