import React, { useState, ChangeEvent } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { Project } from "./AdminDashboard";

interface Props {
  onClose: () => void;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const categoryOptions = {
  coveredPatios: ["Attached Covered Patio", "FreeStanding Pergola", "Cantilevered Pergola"],
  outdoorKitchen: ["Modern Outdoor Kitchen", "Traditional Outdoor Kitchen"],
  panels: ["Dark Bronze", "White", "Wood Imitation Panels"],
  composite: ["Black", "Wood Imitation"],
  hybrid: ["Polycarbonate", "Naked Pergola"],
  addons: ["TV Walls", "Privacy Walls", "Slags", "Fire Pit"],
  foundation: ["Concrete Slab", "Concrete Stamped", "Spray Decking", "Paver", "Tiles", "Turf"],
};

const CreateProjectModal: React.FC<Props> = ({ onClose, setProjects }) => {
  const [fields, setFields] = useState<Partial<Project>>({
    title: "",
    projectType: "",
    size: "",
    structureColor: "",
    colorsPanels: "",
    more: "",
  });

  const [categorySelections, setCategorySelections] = useState<{ [key: string]: string[] }>(() => {
    const initial: { [key: string]: string[] } = {};
    Object.keys(categoryOptions).forEach((category) => {
      initial[category] = [];
    });
    return initial;
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleCategoryToggle = (category: string, value: string) => {
    setCategorySelections((prev) => {
      const current = prev[category] || [];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const handleSubmit = async () => {
    if (!fields.title?.trim() || !imageFile) {
      alert("Debes ingresar un título y una imagen.");
      return;
    }

    setSubmitting(true);

    try {
      // 1. Crear documento en Firestore sin imagen aún
      const updatePayload: any = {
        ...fields,
        imageUrl: "", // temporal
      };

      Object.keys(categorySelections).forEach((key) => {
        updatePayload[key] = categorySelections[key].join(",");
      });

      const docRef = await addDoc(collection(db, "projects"), updatePayload);

      // 2. Subir imagen a Storage
      const extension = imageFile.name.split(".").pop() || "jpg";
      const storageRef = ref(storage, `projects/${docRef.id}.${extension}`);
      const metadata = { contentType: imageFile.type };

      await uploadBytes(storageRef, imageFile, metadata);
      const imageUrl = await getDownloadURL(storageRef);

      // 3. Actualizar documento con la URL final
      await updateDoc(doc(db, "projects", docRef.id), {
        ...updatePayload,
        imageUrl,
      });

      // 4. Actualizar estado local
      setProjects((prev) => [
        ...prev,
        {
          id: docRef.id,
          ...updatePayload,
          imageUrl,
        } as Project,
      ]);

      onClose();
    } catch (err) {
      console.error("❌ Error al crear proyecto:", err);
      alert("Ocurrió un error. Verificá la consola.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Crear Proyecto</h2>

        {[
          { name: "title", label: "Title" },
          { name: "projectType", label: "Project Type" },
          { name: "size", label: "Size" },
          { name: "structureColor", label: "Structure Color" },
          { name: "colorsPanels", label: "Colors Panels" },
          { name: "more", label: "More" },
        ].map((field) => (
          <div key={field.name} className="mb-3">
            <label className="block text-sm font-medium mb-1">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={(fields as any)[field.name] || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Categorías</h3>
          {Object.entries(categoryOptions).map(([categoryKey, options]) => (
            <div key={categoryKey} className="mb-4">
              <p className="font-medium capitalize mb-1">
                {categoryKey.replace(/([A-Z])/g, " $1")}
              </p>
              <div className="pl-2 space-y-1">
                {options.map((option) => (
                  <label key={option} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={categorySelections[categoryKey]?.includes(option) || false}
                      onChange={() => handleCategoryToggle(categoryKey, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
          <label
            htmlFor="fileInput"
            className={`flex items-center justify-center px-4 py-2 ${
              imageFile ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } text-white rounded transition w-full text-center`}
          >
            Seleccionar imagen
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            disabled={!!imageFile}
            onChange={handleImageChange}
            className="hidden"
          />

          {previewImage && (
            <div className="mt-3 relative group">
              <img
                src={previewImage}
                alt="Previsualización"
                className="w-full h-56 object-cover rounded shadow border border-gray-200"
              />
              <p className="absolute bottom-1 right-2 text-xs text-white bg-black bg-opacity-60 px-2 py-1 rounded">
                Previsualización
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`px-4 py-2 rounded text-white transition ${
              submitting ? "bg-green-400 cursor-wait" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {submitting ? "Subiendo..." : "Crear Proyecto"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
