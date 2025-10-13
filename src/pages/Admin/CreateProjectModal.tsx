// src/pages/Admin/CreateProjectModal.tsx
import React, { useState, ChangeEvent } from "react";
import { X } from "lucide-react";
import { Project } from "./AdminDashboard";
import { loadFirestore } from "../../lib/firebaseDb";
import { loadStorage } from "../../lib/firebaseStorage";

/* ===================== Catálogo de categorías ===================== */
const categoryOptions = {
  coveredPatios: ["Attached Covered Patio", "FreeStanding Pergola", "Cantilevered Pergola"],
  outdoorKitchen: ["Modern Outdoor Kitchen", "Traditional Outdoor Kitchen"],
  // Estructura (marco)
  structureColors: ["Dark Bronze", "White", "Varied Colors"],
  // Paneles (techo)
  colorsRoofingPanels: ["Dark Bronze", "White", "Wood Imitation Panels"],
  composite: ["Black", "Wood Imitation"],
  hybrid: ["Polycarbonate", "Naked Pergola"],
  addons: ["TV Walls", "Privacy Walls", "Slags", "Fire Pit"],
  foundation: ["Concrete Slab", "Concrete Stamped", "Spray Decking", "Paver", "Tiles", "Turf"],
} as const;

type CategoryKey = keyof typeof categoryOptions;

/* ===================== Compresor a WebP ===================== */
const compressImage = (file: File): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = () => (img.src = reader.result as string);
    reader.onerror = reject;
    img.onload = () => {
      const max = 1500;
      const scale =
        img.width > max || img.height > max
          ? Math.min(max / img.width, max / img.height)
          : 1;
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Error al comprimir imagen"))),
        "image/webp",
        1
      );
    };
    reader.readAsDataURL(file);
  });

/* ===================== Props ===================== */
interface Props {
  onClose: () => void;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

/* ===================== Componente ===================== */
const CreateProjectModal: React.FC<Props> = ({ onClose, setProjects }) => {
  // Inputs visibles (sin derivados)
  const [fields, setFields] = useState<Partial<Project>>({
    title: "",
    size: "",
    more: "",
  });

  const [categorySelections, setCategorySelections] = useState<
    Record<CategoryKey, string[]>
  >(() => {
    const initial = {} as Record<CategoryKey, string[]>;
    (Object.keys(categoryOptions) as CategoryKey[]).forEach((k) => (initial[k] = []));
    return initial;
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  /* -------- Handlers -------- */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFields((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;
    setImageFiles((p) => [...p, ...files]);
    setPreviewImages((p) => [...p, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((p) => p.filter((_, i) => i !== index));
    setPreviewImages((p) => p.filter((_, i) => i !== index));
  };

  const handleCategoryToggle = (category: CategoryKey, value: string) =>
    setCategorySelections((prev) => {
      const cur = prev[category] || [];
      return cur.includes(value)
        ? { ...prev, [category]: cur.filter((v) => v !== value) }
        : { ...prev, [category]: [...cur, value] };
    });

  /* -------- Submit -------- */
  const handleSubmit = async () => {
    if (!fields.title?.trim() || imageFiles.length === 0) {
      alert("Debes ingresar un título y al menos una imagen.");
      return;
    }

    setSubmitting(true);
    try {
      // 1) Derivados desde filtros
      const projectType =
        categorySelections.coveredPatios?.[0] ||
        categorySelections.outdoorKitchen?.[0] ||
        "";

      const structureColor = (categorySelections.structureColors || []).join(" + ") || "";

      // Panels (persistimos CSV y derivamos string para UI)
      const colorsRoofingPanelsCsv =
        (categorySelections.colorsRoofingPanels || []).join(",") || "";
      const colorsPanels =
        (categorySelections.colorsRoofingPanels || []).join(" + ") || "";

      // 2) Payload base (sin romper tipos de images)
      const basePayload: Partial<Project> & { colorsRoofingPanels?: string } = {
        title: fields.title || "",
        size: fields.size || "",
        more: fields.more || "",
        projectType,
        structureColor,
        colorsPanels,                // para UI
        colorsRoofingPanels: colorsRoofingPanelsCsv, // CSV persistido
        images: [],                  // se completa luego
      };

      // 3) Filtros CSV por categoría
      const filtersCsv: Record<string, string> = {};
      (Object.keys(categorySelections) as CategoryKey[]).forEach((k) => {
        filtersCsv[k] = (categorySelections[k] || []).join(",");
      });

      // 4) Firestore on-demand (crear doc sin imágenes)
      const db = await loadFirestore();
      const { addDoc, collection, doc, updateDoc } = await import("firebase/firestore");
      const docRef = await addDoc(collection(db, "projects"), {
        ...basePayload,
        ...filtersCsv,
      });

      // 5) Subir imágenes comprimidas (Storage on-demand)
      const storage = await loadStorage();
      const { ref, uploadBytes, getDownloadURL } = await import("firebase/storage");

      const uploadedUrls: string[] = [];
      for (let i = 0; i < imageFiles.length; i++) {
        const blob = await compressImage(imageFiles[i]);
        const storageRef = ref(storage, `projects/${docRef.id}_${i}.webp`);
        await uploadBytes(storageRef, blob, { contentType: "image/webp" });
        uploadedUrls.push(await getDownloadURL(storageRef));
      }

      // 6) Actualizar doc con URLs reales
      await updateDoc(doc(db, "projects", docRef.id), {
        ...basePayload,
        ...filtersCsv,
        images: uploadedUrls,
      });

      // 7) Actualizar UI local
      setProjects((prev) => [
        ...prev,
        {
          id: docRef.id,
          ...basePayload,
          ...filtersCsv,
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

  /* ===================== Render ===================== */
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Crear Proyecto</h2>

        {/* Campos de texto */}
        {[
          { name: "title", label: "Title" },
          { name: "size", label: "Size" },
          { name: "more", label: "More" },
        ].map(({ name, label }) => (
          <div key={name} className="mb-3">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type="text"
              name={name}
              value={(fields as Record<string, string | undefined>)[name] || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}

        {/* Categorías */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Categorías</h3>
          {(Object.entries(categoryOptions) as [CategoryKey, readonly string[]][])
            .map(([categoryKey, options]) => (
              <div key={categoryKey} className="mb-4">
                <p className="font-medium capitalize mb-1">
                  {String(categoryKey).replace(/([A-Z])/g, " $1")}
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
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-red-600 transition"
                  >
                    <X size={16} />
                  </button>
                  <p className="absolute bottom-1 right-2 text-xs text-white bg-black/60 px-2 py-1 rounded">
                    {index + 1}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
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
