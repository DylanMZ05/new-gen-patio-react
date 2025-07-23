import React, { useState, ChangeEvent } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { Project } from "./AdminDashboard";

interface Props {
  project: Project;
  onClose: () => void;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

// Función para comprimir la imagen y convertirla a webp
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
        0.75
      );
    };

    reader.readAsDataURL(file);
  });
};

const EditProjectModal: React.FC<Props> = ({ project, onClose, setProjects }) => {
  const [editedFields, setEditedFields] = useState<Partial<Project>>({
    title: project.title,
    stain: project.stain,
    size: project.size,
    rafterTail: project.rafterTail,
    kneeBrace: project.kneeBrace,
    timberSize: project.timberSize,
  });

  const [previewImage, setPreviewImage] = useState(project.imageUrl);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [submittingChanges, setSubmittingChanges] = useState(false);

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedFields({ ...editedFields, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmitChanges = async () => {
    setSubmittingChanges(true);
    let imageUrl = project.imageUrl;

    try {
      if (newImageFile) {
        console.log("📦 Comprimendo imagen...");
        const blob = await compressImage(newImageFile);

        const storageRef = ref(storage, `projects/${project.id}.webp`);
        const metadata = {
          contentType: "image/webp",
        };

        console.log("⬆️ Subiendo imagen comprimida a Firebase Storage...");
        await uploadBytes(storageRef, blob, metadata);
        console.log("✅ Imagen subida");

        imageUrl = await getDownloadURL(storageRef);
        console.log("🔗 URL obtenida:", imageUrl);
      }

      const updatePayload = {
        title: editedFields.title || "",
        stain: editedFields.stain || "",
        size: editedFields.size || "",
        rafterTail: editedFields.rafterTail || "",
        kneeBrace: editedFields.kneeBrace || "",
        timberSize: editedFields.timberSize || "",
        imageUrl,
      };

      console.log("📝 Actualizando documento en Firestore:", updatePayload);
      await updateDoc(doc(db, "projects", project.id), updatePayload);
      console.log("✅ Documento actualizado");

      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, ...updatePayload } : p))
      );

      onClose();
    } catch (err) {
      console.error("❌ Error al guardar cambios:", err);
      alert("Error al guardar los cambios. Verificá la consola.");
    } finally {
      setSubmittingChanges(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Editar Proyecto</h2>

        {["title", "stain", "size", "rafterTail", "kneeBrace", "timberSize"].map((field) => (
          <div key={field} className="mb-3">
            <label className="block text-sm font-medium capitalize mb-1">{field}</label>
            <input
              type="text"
              name={field}
              value={(editedFields as any)[field] || ""}
              onChange={handleEditChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cambiar Imagen</label>
          <label
            htmlFor="fileInput"
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition w-full text-center"
          >
            Seleccionar imagen
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {previewImage && (
            <div className="mt-3 relative group">
              <img
                src={previewImage}
                alt="Previsualización"
                className="w-full h-56 object-cover rounded shadow border border-gray-200 transition-transform group-hover:scale-105"
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
            onClick={handleSubmitChanges}
            disabled={submittingChanges}
            className={`px-4 py-2 rounded text-white transition ${
              submittingChanges
                ? "bg-green-400 cursor-wait"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {submittingChanges ? "Subiendo..." : "Subir Cambios"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
