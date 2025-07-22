// src/pages/Admin/SubirProyectos.tsx
import { useState } from "react";
import { projects } from "../Catalogo/CatalogoCard";
import { db } from "../../../firebase";
import { setDoc, doc } from "firebase/firestore";

const SubirProyectos = () => {
  const [subiendo, setSubiendo] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [errores, setErrores] = useState<string[]>([]);

  const subirTodo = async () => {
    setSubiendo(true);
    setFinalizado(false);
    setErrores([]);

    for (const project of projects) {
      try {
        const proyectoFirestore = {
          ...project,
          imageUrl: project.imageUrl, // Usamos la string directamente
        };

        await setDoc(doc(db, "projects", project.id), proyectoFirestore);
        console.log(`✅ Subido: ${project.title}`);
      } catch (error: any) {
        console.error(`❌ Error al subir ${project.title}:`, error);
        setErrores((prev) => [...prev, `${project.title}: ${error.message || error}`]);
      }
    }

    setSubiendo(false);
    setFinalizado(true);
  };

  return (
    <div className="p-4">
      <button
        onClick={subirTodo}
        disabled={subiendo}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {subiendo ? "Subiendo..." : "Subir proyectos a Firestore"}
      </button>

      {finalizado && (
        <div className="mt-4">
          {errores.length === 0 ? (
            <p className="text-green-600">✅ Todos los proyectos fueron subidos correctamente.</p>
          ) : (
            <div className="text-red-600">
              <p>⚠️ Algunos proyectos no se subieron:</p>
              <ul className="list-disc pl-6 mt-2">
                {errores.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubirProyectos;
