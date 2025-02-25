import React from "react";
import { StepData } from "../hooks/useStepNavigation";

interface StepProps {
  stepData: StepData;
  nextStep: (step: number | "final") => void;
  previousStep: () => void;
  updateFormData: (id: string, value: string | number) => void;
  formData: Record<string, string | number>;
}

const Step: React.FC<StepProps> = ({ stepData, nextStep, previousStep, updateFormData, formData }) => {
  return (
    <div className="w-full mx-3 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">{stepData.title}</h2>

      {/* Renderizar opciones con imágenes */}
      {stepData.options && (
        <div className="flex flex-col">
          {stepData.options.map((option, index) => (
            <button
              key={index}
              className="p-2 rounded-lg transition cursor-pointer"
              onClick={() => nextStep(option.nextStep)}
            >
              <img src={option.img} alt={option.text} className="w-100 object-cover rounded-md transition-all hover:scale-105" />
              <p className="mt-2 text-center">{option.text}</p>
            </button>
          ))}
        </div>
      )}

      {/* Renderizar inputs del formulario */}
      {stepData.fields && (
        <div className="mt-4">
          {stepData.fields.map((field) => (
            <div key={field.id} className="mb-4">
              <label className="block text-gray-700">{field.label}</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                required={field.required}
                value={formData[field.id] || ""}
                onChange={(e) => updateFormData(field.id, e.target.value)}
              />
            </div>
          ))}
          <button
            onClick={() => nextStep(stepData.nextStep!)}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Continue
          </button>
        </div>
      )}

      {/* Botón para regresar al paso anterior */}
      {stepData.previousStep && (
        <button onClick={previousStep} className="mt-4 text-gray-500 underline">
          Back
        </button>
      )}
    </div>
  );
};

export default Step;
