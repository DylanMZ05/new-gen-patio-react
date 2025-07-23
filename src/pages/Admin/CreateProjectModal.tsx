import React, { useState, ChangeEvent } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { Project } from "./AdminDashboard";

interface Props {
  onClose: () => void;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const CreateProjectModal: React.FC<Props> = ({ onClose, setProjects }) => {
  const [fields, setFields] = useState<Partial<Project>>({
    title: "",
    stain: "",
    size: "",
    rafterTail: "",
    kneeBrace: "",
    timberSize: "",
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

  const handleSubmit = async () => {
    if (!fields.title?.trim() || !imageFile) {
      alert("Debes ingresar un título y una imagen.");
      return;
    }

    setSubmitting(true);

    try {
      // 1. Crear documento en Firestore sin imagen aún
      const docRef = await addDoc(collection(db, "projects"), {
        ...fields,
        imageUrl: "", // temporal
      });

      // 2. Subir imagen original a Storage
      const extension = imageFile.name.split(".").pop() || "jpg";
      const storageRef = ref(storage, `projects/${docRef.id}.${extension}`);
      const metadata = { contentType: imageFile.type };

      await uploadBytes(storageRef, imageFile, metadata);
      const imageUrl = await getDownloadURL(storageRef);

      // 3. Actualizar el documento con imageUrl
      await updateDoc(doc(db, "projects", docRef.id), {
        ...fields,
        imageUrl,
      });

      // 4. Actualizar UI local
      setProjects((prev) => [
        ...prev,
        {
          id: docRef.id,
          ...fields,
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

        {["title", "stain", "size", "rafterTail", "kneeBrace", "timberSize"].map((field) => (
          <div key={field} className="mb-3">
            <label className="block text-sm font-medium capitalize mb-1">{field}</label>
            <input
              type="text"
              name={field}
              value={(fields as any)[field] || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}

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
