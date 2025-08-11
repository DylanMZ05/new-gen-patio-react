import React, { useState, ChangeEvent, useEffect } from "react";
import { updateDoc, doc, deleteDoc, deleteField } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../../firebase";
import { Project } from "./AdminDashboard";
import { X } from "lucide-react";

interface Props {
  project: Project;
  onClose: () => void;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

// 🔹 Compresor a WebP
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
      const maxSize = 1500;
      const shouldResize = img.width > maxSize || img.height > maxSize;
      const scale = shouldResize ? Math.min(maxSize / img.width, maxSize / img.height) : 1;
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
        1
      );
    };

    reader.readAsDataURL(file);
  });
};

// ⚙️ Opciones de categorías (camelCase)
const categoryOptions: Record<string, string[]> = {
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
};

const splitOrEmpty = (v: any): string[] =>
  typeof v === "string" && v.length > 0 ? v.split(",").map((s) => s.trim()) : [];

const EditProjectModal: React.FC<Props> = ({ project, onClose, setProjects }) => {
  if (!project) return null;

  // Campos editables directos (sin los derivados)
  const [editedFields, setEditedFields] = useState<Partial<Project>>({
    title: project.title,
    size: project.size,
    more: project.more,
  });

  // Cargar selecciones iniciales desde el proyecto (compat retro incluida)
  const [categorySelections, setCategorySelections] = useState<{ [key: string]: string[] }>(() => {
    const initial: { [key: string]: string[] } = {};
    Object.keys(categoryOptions).forEach((category) => {
      if (category !== "colorsRoofingPanels") {
        const values = (project as any)[category];
        initial[category] = splitOrEmpty(values);
      } else {
        // grupo nuevo de panels con fallback a campo viejo
        const fromNew = splitOrEmpty((project as any).colorsRoofingPanels);
        const fromOld = splitOrEmpty((project as any).colorsPanels);
        initial[category] = fromNew.length ? fromNew : fromOld;
      }
    });
    return initial;
  });

  // Soporte para imageUrl (viejo) e images (nuevo)
  const [existingImages, setExistingImages] = useState<string[]>(() => {
    if ((project as any).images && (project as any).images.length > 0) {
      return (project as any).images as string[];
    } else if ((project as any).imageUrl) {
      return [(project as any).imageUrl as string];
    }
    return [];
  });

  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewNewImages, setPreviewNewImages] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [submittingChanges, setSubmittingChanges] = useState(false);

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedFields({ ...editedFields, [e.target.name]: e.target.value });
  };

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      const previews = files.map((f) => URL.createObjectURL(f));
      setNewImages((prev) => [...prev, ...files]);
      setPreviewNewImages((prev) => [...prev, ...previews]);
    }
  };

  const handleRemoveExistingImage = (index: number) => {
    setRemovedImages((prev) => [...prev, existingImages[index]]);
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCategoryToggle = (category: string, value: string) => {
    setCategorySelections((prev) => {
      const current = prev[category] || [];
      return current.includes(value)
        ? { ...prev, [category]: current.filter((v) => v !== value) }
        : { ...prev, [category]: [...current, value] };
    });
  };

  const handleSubmitChanges = async () => {
    setSubmittingChanges(true);

    try {
      const uploadedUrls: string[] = [];

      // Subir nuevas imágenes comprimidas
      for (let i = 0; i < newImages.length; i++) {
        const file = newImages[i];
        const blob = await compressImage(file);
        const storageRef = ref(storage, `projects/${project.id}_${Date.now()}_${i}.webp`);
        await uploadBytes(storageRef, blob, { contentType: "image/webp" });
        const url = await getDownloadURL(storageRef);
        uploadedUrls.push(url);
      }

      // Eliminar del Storage las imágenes quitadas
      for (const url of removedImages) {
        try {
          const path = decodeURIComponent(url.split("/o/")[1].split("?")[0]);
          const storageRef = ref(storage, path);
          await deleteObject(storageRef);
        } catch (err) {
          console.warn("⚠️ No se pudo borrar del storage:", err);
        }
      }

      // Imágenes finales con links nuevos
      const finalImages = [...existingImages, ...uploadedUrls];

      // Derivar descripciones desde filtros
      const projectType =
        categorySelections.coveredPatios?.[0] ||
        categorySelections.outdoorKitchen?.[0] ||
        "";

      const structureColor = (categorySelections.structureColors || []).join(" + ") || "";

      // Panels: usar grupo nuevo (derivado para UI) y guardar csv en key nueva
      const colorsRoofingPanelsCsv = (categorySelections.colorsRoofingPanels || []).join(",") || "";
      const colorsPanels = (categorySelections.colorsRoofingPanels || []).join(" + ") || "";

      // Payload a Firestore (flexible para setear filtros)
      const updatePayload: (Partial<Project> & Record<string, string>) = {
        title: editedFields.title || "",
        size: editedFields.size || "",
        more: editedFields.more || "",
        projectType,
        structureColor,
        colorsPanels, // solo para mostrar
        images: finalImages,
        colorsRoofingPanels: colorsRoofingPanelsCsv,
      };

      // Guardar también los filtros como strings (útil para el catálogo / queries)
      Object.keys(categorySelections).forEach((key) => {
        updatePayload[key] = (categorySelections[key] || []).join(",");
      });

      // Actualizar Firestore (y eliminar campo legado para evitar duplicados)
      await updateDoc(doc(db, "projects", project.id), {
        ...updatePayload,
        colorsPanels: deleteField(), // limpiamos campo viejo para no duplicar
      });

      // ✅ Reponer en estado local con la versión derivada (sin colorsPanels duplicado)
      setExistingImages(finalImages);
      setNewImages([]);
      setPreviewNewImages([]);
      setRemovedImages([]);

      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id
            ? {
                ...p,
                ...updatePayload,
                images: finalImages,
                colorsPanels, // mantener derivado en memoria si tu UI lo usa
              }
            : p
        )
      );

      onClose();
    } catch (err) {
      console.error("❌ Error al guardar cambios:", err);
      alert("Error al guardar los cambios. Verificá la consola.");
    } finally {
      setSubmittingChanges(false);
    }
  };

  const handleDeleteProject = async () => {
    const confirmDelete = window.confirm("¿Seguro que querés eliminar este proyecto?");
    if (!confirmDelete) return;

    try {
      // Borrar imágenes del storage
      for (const url of existingImages) {
        try {
          const path = decodeURIComponent(url.split("/o/")[1].split("?")[0]);
          const storageRef = ref(storage, path);
          await deleteObject(storageRef);
        } catch (err) {
          console.warn("⚠️ No se pudo borrar imagen:", err);
        }
      }

      // Borrar documento en Firestore
      await deleteDoc(doc(db, "projects", project.id));

      // Actualizar UI
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
      onClose();
    } catch (err) {
      console.error("❌ Error al eliminar proyecto:", err);
      alert("No se pudo eliminar el proyecto. Revisá la consola.");
    }
  };

  // (Opcional) asegurar scroll top al abrir modal largo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <h2 className="text-xl font-bold mb-4">Editar Proyecto</h2>

        {/* Campos de texto — sin los derivados */}
        {[
          { name: "title", label: "Title" },
          { name: "size", label: "Size" },
          { name: "more", label: "More" },
        ].map((field) => (
          <div key={field.name} className="mb-3">
            <label className="block text-sm font-medium mb-1">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={(editedFields as any)[field.name] || ""}
              onChange={handleEditChange}
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

        {/* Renderizado de imágenes */}
        {(existingImages.length > 0 || previewNewImages.length > 0) && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            {[
              ...existingImages.map((src, index) => ({
                src,
                type: "existing" as const,
                index,
              })),
              ...previewNewImages.map((src, index) => ({
                src,
                type: "new" as const,
                index,
              })),
            ].map((item, globalIndex) => (
              <div key={`${item.type}-${item.index}`} className="relative group">
                <img
                  src={item.src}
                  alt={`Imagen ${globalIndex + 1}`}
                  className="w-full h-40 object-cover rounded shadow border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() =>
                    item.type === "existing"
                      ? handleRemoveExistingImage(item.index)
                      : handleRemoveNewImage(item.index)
                  }
                  className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full p-1 hover:bg-red-600 transition"
                >
                  <X size={16} />
                </button>
                <p className="absolute bottom-1 right-2 text-xs text-white bg-black bg-opacity-60 px-2 py-1 rounded">
                  {globalIndex + 1}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Subida de nuevas imágenes */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Añadir Imágenes</h3>
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
        </div>

        {/* Botones */}
        <div className="flex justify-end mt-4 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleDeleteProject}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Eliminar
          </button>
          <button
            onClick={handleSubmitChanges}
            disabled={submittingChanges}
            className={`px-4 py-2 rounded text-white transition ${
              submittingChanges
                ? "bg-green-400 cursor-wait"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {submittingChanges ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
