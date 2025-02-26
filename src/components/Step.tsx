import React from "react";
import { StepData } from "../hooks/useStepNavigation";

interface StepProps {
  stepData: StepData;
  nextStep: (step: number | "final", selectedOption?: string) => void;
  previousStep: () => void;
  updateFormData: (id: string, value: string | number) => void;
  formData: Record<string, string | number>;
  selections: string[];
}

const Step: React.FC<StepProps> = ({ stepData, nextStep, previousStep, updateFormData, formData, selections }) => {
  // Función para obtener todas las medidas ingresadas
  const getFormattedInputs = () => {
    const inputFields = Object.entries(formData)
      .filter(([key]) => key === "width" || key === "length" || key === "height" || key === "linear-feet")
      .map(([key, value]) => `📏 ${key.replace("-", " ")}: ${value}`)
      .join("\n");

    return inputFields;
  };

  // Validar que todos los campos requeridos estén completos
  const allRequiredFieldsFilled = stepData.fields
    ? stepData.fields.every((field) => !field.required || formData[field.id])
    : true;

  // Función para enviar el mensaje a WhatsApp
  const sendWhatsApp = () => {
    if (!allRequiredFieldsFilled) {
      alert("Por favor, completa todos los campos obligatorios antes de enviar.");
      return;
    }
  
    // Capturar las medidas ingresadas
    const medidas = Object.entries(formData)
      .filter(([key]) => key === "width" || key === "length" || key === "height" || key === "linear-feet")
      .map(([key, value]) => `📏 ${key.replace("-", " ")}: ${value}`)
      .join("\n");
  
    // Construir el mensaje correctamente
    const mensaje = `
  *Solicitud de Cotización* 📋
  
  🔹 *Opciones seleccionadas:* ${selections.join(" | ")}
  ${medidas ? `📐 *Medidas:* \n${medidas}\n` : ""}
  📌 *Nombre:* ${formData.name}
  📌 *Teléfono:* ${formData.phone}
  📌 *Email:* ${formData.email}
  📌 *Código Postal:* ${formData.zip}
  📝 *Notas:* ${formData.notes || "Ninguna"}
    `;
  
    // Número de WhatsApp donde se enviará (¡Cámbialo por el real!)
    const numeroWhatsApp = "13463800845"; // Formato internacional sin "+"
  
    // Opción 1: API de WhatsApp (prueba manualmente si funciona)
    const url1 = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensaje)}`;
  
    // Opción 2: wa.me (si la otra opción falla, prueba esta)
    const url2 = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  
    // Intentar abrir ambas opciones
    window.open(url1, "_blank"); // Primero prueba API oficial
    setTimeout(() => window.open(url2, "_blank"), 1000); // Si falla, prueba con wa.me
  };

  return (
    <div className="w-full mx-3 p-6 bg-white shadow-lg rounded-lg min-h-150 flex flex-col justify-center items-center">
      {/* Título */}
      <h2 className="text-2xl font-semibold text-gray-800 text-center">{stepData.title}</h2>
      <div className="w-20 h-[3px] bg-sky-500 mx-auto mb-1 mt-2 rounded-full"></div>

      {/* Renderizar opciones con imágenes */}
      {stepData.options && (
        <div className="flex flex-col mt-4">
          {stepData.options.map((option, index) => (
            <button
              key={index}
              className="p-2 rounded-lg transition cursor-pointer"
              onClick={() => nextStep(option.nextStep, option.text)}
            >
              <img src={option.img} alt={option.text} className="w-75 object-cover rounded-md transition-all hover:scale-105" />
              <p className="mt-2 text-center">{option.text}</p>
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
                <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>
              )}
            </div>
          ))}

          {/* NO mostrar "Continuar" en el último paso */}
          {stepData.title !== "Resumen y Contacto" && (
            <button
              onClick={() => nextStep(stepData.nextStep!)}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Continuar
            </button>
          )}
        </div>
      )}

      {/* Paso final: mostrar resumen y botón de WhatsApp */}
      {stepData.title === "Resumen y Contacto" && (
        <div className="mt-4 w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-700">Has seleccionado:</h3>
          <p className="bg-gray-200 p-3 rounded-md">{selections.join(" | ")}</p>

          {/* Mostrar las medidas ingresadas */}
          {getFormattedInputs() && (
            <div className="mt-4 bg-gray-200 p-3 rounded-md">
              <h4 className="text-md font-semibold text-gray-700">📐 Medidas:</h4>
              <p>{getFormattedInputs()}</p>
            </div>
          )}

          <div className="mt-4">
            <button
              onClick={sendWhatsApp}
              disabled={!allRequiredFieldsFilled}
              className={`w-full py-2 rounded-lg transition ${
                allRequiredFieldsFilled
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              {allRequiredFieldsFilled ? "Enviar a WhatsApp 📩" : "Completa todos los campos"}
            </button>
          </div>
        </div>
      )}

      {/* Botón para regresar */}
      {stepData.previousStep && (
        <button onClick={previousStep} className="mt-4 text-gray-700 hover:text-gray-900 cursor-pointer transition">
          Volver
        </button>
      )}
    </div>
  );
};

export default Step;