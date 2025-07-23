import React, { useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

const UploadTestButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      console.log("📦 Subiendo archivo:", file.name);

      const ext = file.name.split(".").pop() || "jpg";
      const timestamp = Date.now();
      const path = `projects/prueba-${timestamp}.${ext}`;
      const storageRef = ref(storage, path);

      await uploadBytes(storageRef, file, { contentType: file.type });

      const url = await getDownloadURL(storageRef);
      console.log("✅ Subida exitosa. URL pública:", url);
      alert("✅ Imagen subida correctamente. Revisá la consola.");
    } catch (error) {
      console.error("❌ Error al subir imagen:", error);
      alert("❌ Falló la subida. Verificá la consola.");
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
      >
        📤 Probar Subida
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};

export default UploadTestButton;
