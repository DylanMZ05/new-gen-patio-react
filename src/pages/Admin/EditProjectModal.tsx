// src/pages/Admin/EditProjectModal.tsx
import React, {
  useState,
  ChangeEvent,
  useEffect,
  useMemo,
} from "react";
import { X } from "lucide-react";
import { loadFirestore } from "../../lib/firebaseDb";
import { loadStorage } from "../../lib/firebaseStorage";
import { Project } from "./AdminDashboard";

/* ===================== Tipos / helpers ===================== */

type ProjectWithLegacy = Project & {
  colorsRoofingPanels?: string; // CSV persistido (nuevo)
  colorsPanels?: string; // derivado legacy (mostrar)
  imageUrl?: string; // legacy
  images?: string[]; // nuevo
};

const categoryOptions = {
  coveredPatios: [
    "Attached Covered Patio",
    "FreeStanding Pergola",
    "Cantilevered Pergola",
  ],
  outdoorKitchen: [
    "Modern Outdoor Kitchen",
    "Traditional Outdoor Kitchen",
  ],
  structureColors: ["Dark Bronze", "White", "Varied Colors"],
  colorsRoofingPanels: [
    "Dark Bronze",
    "White",
    "Wood Imitation Panels",
  ],
  composite: ["Black", "Wood Imitation"],
  hybrid: ["Polycarbonate", "Naked Pergola"],

  // ⬇⬇⬇ Addons actualizado, incluye lo nuevo
  addons: [
    "TV Walls",
    "Privacy Walls",
    "Slags",
    "Fire Pit",
    "Sconce Light",
    "Enclosure Net",
    "Deco Shades",
    "Waterfall",
  ],

  foundation: [
    "Concrete Slab",
    "Concrete Stamped",
    "Spray Decking",
    "Paver",
    "Tiles",
    "Turf",
  ],
} as const;

type CategoryKey = keyof typeof categoryOptions;

const splitOrEmpty = (v: unknown): string[] =>
  typeof v === "string" && v.length
    ? v.split(",").map((s) => s.trim())
    : [];

const getStringField = (
  obj: unknown,
  key: string
): string | undefined => {
  const v = (obj as Record<string, unknown>)[key];
  return typeof v === "string" ? v : undefined;
};

const compressImage = (file: File): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const fr = new FileReader();
    fr.onload = () => (img.src = fr.result as string);
    fr.onerror = reject;
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
        (blob) =>
          blob
            ? resolve(blob)
            : reject(new Error("Compression failed")),
        "image/webp",
        1
      );
    };
    fr.readAsDataURL(file);
  });

/* ===================== Props ===================== */

interface Props {
  project: Project;
  onClose: () => void;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

/* ===================== Componente ===================== */

const EditProjectModal: React.FC<Props> = ({
  project,
  onClose,
  setProjects,
}) => {
  const legacy = project as ProjectWithLegacy;

  const initialSelections = useMemo<
    Record<CategoryKey, string[]>
  >(() => {
    const out = {} as Record<CategoryKey, string[]>;
    (Object.keys(categoryOptions) as CategoryKey[]).forEach(
      (key) => {
        if (key === "colorsRoofingPanels") {
          const fromNew = splitOrEmpty(legacy.colorsRoofingPanels);
          const fromOld = splitOrEmpty(legacy.colorsPanels);
          out[key] = (fromNew.length
            ? fromNew
            : fromOld) as string[];
        } else {
          out[key] = splitOrEmpty(
            getStringField(legacy, key)
          ) as string[];
        }
      }
    );
    return out;
  }, [legacy]);

  const initialImages = useMemo<string[]>(() => {
    if (Array.isArray(legacy.images) && legacy.images.length)
      return legacy.images;
    if (legacy.imageUrl) return [legacy.imageUrl];
    return [];
  }, [legacy]);

  const [editedFields, setEditedFields] = useState<
    Partial<Project>
  >({
    title: project.title,
    size: project.size,
    more: project.more,
  });

  const [categorySelections, setCategorySelections] = useState<
    Record<CategoryKey, string[]>
  >(initialSelections);

  const [existingImages, setExistingImages] =
    useState<string[]>(initialImages);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewNewImages, setPreviewNewImages] = useState<string[]>(
    []
  );
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [submittingChanges, setSubmittingChanges] =
    useState(false);

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEditedFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleImagesChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;
    setNewImages((prev) => [...prev, ...files]);
    setPreviewNewImages((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const handleRemoveExistingImage = (index: number) => {
    setRemovedImages((prev) => [...prev, existingImages[index]]);
    setExistingImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
    setPreviewNewImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleCategoryToggle = (
    category: CategoryKey,
    value: string
  ) =>
    setCategorySelections((prev) => {
      const cur = prev[category] || [];
      return cur.includes(value)
        ? {
            ...prev,
            [category]: cur.filter((v) => v !== value),
          }
        : { ...prev, [category]: [...cur, value] };
    });

  const handleSubmitChanges = async () => {
    setSubmittingChanges(true);
    try {
      const storage = await loadStorage();
      const {
        ref,
        uploadBytes,
        getDownloadURL,
        deleteObject,
      } = await import("firebase/storage");

      const uploadedUrls: string[] = [];
      for (let i = 0; i < newImages.length; i++) {
        const blob = await compressImage(newImages[i]);
        const storageRef = ref(
          storage,
          `projects/${project.id}_${Date.now()}_${i}.webp`
        );
        await uploadBytes(storageRef, blob, {
          contentType: "image/webp",
        });
        uploadedUrls.push(await getDownloadURL(storageRef));
      }

      // Intento de borrar del storage las eliminadas
      for (const url of removedImages) {
        try {
          const path = decodeURIComponent(
            url.split("/o/")[1].split("?")[0]
          );
          const storageRef = ref(storage, path);
          await deleteObject(storageRef);
        } catch (e) {
          console.warn(
            "No se pudo borrar del storage:",
            e
          );
        }
      }

      const finalImages = [
        ...existingImages,
        ...uploadedUrls,
      ];

      // Derivados
      const projectType =
        categorySelections.coveredPatios?.[0] ||
        categorySelections.outdoorKitchen?.[0] ||
        "";

      const structureColor =
        (categorySelections.structureColors || []).join(
          " + "
        ) || "";

      const colorsRoofingPanelsCsv = (
        categorySelections.colorsRoofingPanels || []
      ).join(",") || "";
      const colorsPanels = (
        categorySelections.colorsRoofingPanels || []
      ).join(" + ") || "";

      const basePayload: Partial<Project> & {
        colorsRoofingPanels?: string;
      } = {
        title: editedFields.title || "",
        size: editedFields.size || "",
        more: editedFields.more || "",
        projectType,
        structureColor,
        colorsPanels, // para UI
        colorsRoofingPanels: colorsRoofingPanelsCsv, // CSV
        images: finalImages,
      };

      // Filtros CSV por categoría (incluye addons actualizado)
      const filtersCsv: Record<string, string> = {};
      (Object.keys(categorySelections) as CategoryKey[]).forEach(
        (k) => {
          filtersCsv[k] = (
            categorySelections[k] || []
          ).join(",");
        }
      );

      const db = await loadFirestore();
      const { updateDoc, doc, deleteField } = await import(
        "firebase/firestore"
      );
      await updateDoc(doc(db, "projects", project.id), {
        ...basePayload,
        ...filtersCsv,
        colorsPanels: deleteField(), // limpiamos legacy duplicado
      });

      setExistingImages(finalImages);
      setNewImages([]);
      setPreviewNewImages([]);
      setRemovedImages([]);

      setProjects((prev) =>
        prev.map((p) =>
          p.id === project.id
            ? {
                ...p,
                ...basePayload,
                ...filtersCsv,
                images: finalImages,
                colorsPanels,
              }
            : p
        )
      );

      onClose();
    } catch (e) {
      console.error("❌ Error al guardar cambios:", e);
      alert("Error al guardar los cambios.");
    } finally {
      setSubmittingChanges(false);
    }
  };

  const handleDeleteProject = async () => {
    if (
      !window.confirm(
        "¿Seguro que querés eliminar este proyecto?"
      )
    )
      return;
    try {
      const storage = await loadStorage();
      const { ref, deleteObject } = await import(
        "firebase/storage"
      );
      for (const url of existingImages) {
        try {
          const path = decodeURIComponent(
            url.split("/o/")[1].split("?")[0]
          );
          await deleteObject(ref(storage, path));
        } catch (e) {
          console.warn(
            "No se pudo borrar imagen:",
            e
          );
        }
      }

      const db = await loadFirestore();
      const { deleteDoc, doc } = await import(
        "firebase/firestore"
      );
      await deleteDoc(doc(db, "projects", project.id));

      setProjects((prev) =>
        prev.filter((p) => p.id !== project.id)
      );
      onClose();
    } catch (e) {
      console.error("❌ Error al eliminar:", e);
      alert("No se pudo eliminar el proyecto.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <h2 className="text-xl font-bold mb-4">
          Editar Proyecto
        </h2>

        {/* Campos de texto */}
        {[
          { name: "title", label: "Title" },
          { name: "size", label: "Size" },
          { name: "more", label: "More" },
        ].map(({ name, label }) => (
          <div key={name} className="mb-3">
            <label className="block text-sm font-medium mb-1">
              {label}
            </label>
            <input
              type="text"
              name={name}
              value={
                (editedFields as Record<
                  string,
                  string | undefined
                >)[name] || ""
              }
              onChange={handleEditChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}

        {/* Categorías */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">
            Categorías
          </h3>
          {(Object.entries(categoryOptions) as [
            CategoryKey,
            readonly string[]
          ][]).map(([key, options]) => (
            <div key={key} className="mb-4">
              <p className="font-medium capitalize mb-1">
                {String(key).replace(
                  /([A-Z])/g,
                  " $1"
                )}
              </p>
              <div className="pl-2 space-y-1">
                {options.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={
                        categorySelections[key]?.includes(
                          opt
                        ) || false
                      }
                      onChange={() =>
                        handleCategoryToggle(key, opt)
                      }
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Imágenes */}
        {(existingImages.length > 0 ||
          previewNewImages.length > 0) && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            {[
              ...existingImages.map(
                (src, index) => ({
                  src,
                  type: "existing" as const,
                  index,
                })
              ),
              ...previewNewImages.map(
                (src, index) => ({
                  src,
                  type: "new" as const,
                  index,
                })
              ),
            ].map((item, i) => (
              <div
                key={`${item.type}-${item.index}`}
                className="relative group"
              >
                <img
                  src={item.src}
                  alt={`Imagen ${i + 1}`}
                  className="w-full h-40 object-cover rounded shadow border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() =>
                    item.type === "existing"
                      ? handleRemoveExistingImage(
                          item.index
                        )
                      : handleRemoveNewImage(
                          item.index
                        )
                  }
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-red-600 transition"
                >
                  <X size={16} />
                </button>
                <p className="absolute bottom-1 right-2 text-xs text-white bg-black/60 px-2 py-1 rounded">
                  {i + 1}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Uploader */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">
            Añadir Imágenes
          </h3>
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
            {submittingChanges
              ? "Guardando..."
              : "Guardar Cambios"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
