import React, { useState, ChangeEvent } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { Project } from "./AdminDashboard";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

// 🔹 Compresor a WebP 500px máx
const compressImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };
    reader.onerror = reject;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxSize = 500;
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Error al comprimir imagen"));
        },
        "image/webp",
        0.8
      );
    };

    reader.readAsDataURL(file);
  });
};

const categoryOptions = {
  coveredPatios: ["Attached Covered Patio", "FreeStanding Pergola", "Cantilevered Pergola"],
  outdoorKitchen: ["Modern Outdoor Kitchen", "Traditional Outdoor Kitchen"],
  StructureColors: ["Dark Bronze", "White", "Wood Imitation Panels"],
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

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      setImageFiles((prev) => [...prev, ...files]);
      setPreviewImages((prev) => [
        ...prev,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
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
    if (!fields.title?.trim() || imageFiles.length === 0) {
      alert("Debes ingresar un título y al menos una imagen.");
      return;
    }

    setSubmitting(true);

    try {
      // 1. Crear documento en Firestore sin imágenes aún
      const updatePayload: any = {
        ...fields,
        images: [],
      };

      Object.keys(categorySelections).forEach((key) => {
        updatePayload[key] = categorySelections[key].join(",");
      });

      const docRef = await addDoc(collection(db, "projects"), updatePayload);

      // 2. Subir imágenes comprimidas
      const uploadedUrls: string[] = [];
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const blob = await compressImage(file);
        const storageRef = ref(storage, `projects/${docRef.id}_${i}.webp`);
        await uploadBytes(storageRef, blob, { contentType: "image/webp" });
        const url = await getDownloadURL(storageRef);
        uploadedUrls.push(url);
      }

      // 3. Actualizar documento con URLs finales
      await updateDoc(doc(db, "projects", docRef.id), {
        ...updatePayload,
        images: uploadedUrls,
      });

      // 4. Actualizar estado local
      setProjects((prev) => [
        ...prev,
        {
          id: docRef.id,
          ...updatePayload,
          images: uploadedUrls,
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

        {/* Campos de texto */}
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

        {/* Categorías */}
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

        {/* Subida de imágenes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Imágenes (puedes seleccionar varias)
          </label>
          <label
            htmlFor="fileInput"
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition w-full text-center"
          >
            Seleccionar imágenes
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            className="hidden"
          />

          {/* Previsualización */}
          {previewImages.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              {previewImages.map((src, index) => (
                <div key={index} className="relative group">
                  <img
                    src={src}
                    alt={`Previsualización ${index + 1}`}
                    className="w-full h-40 object-cover rounded shadow border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full p-1 hover:bg-red-600 transition"
                  >
                    <X size={16} />
                  </button>
                  <p className="absolute bottom-1 right-2 text-xs text-white bg-black bg-opacity-60 px-2 py-1 rounded">
                    {index + 1}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botones */}
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
