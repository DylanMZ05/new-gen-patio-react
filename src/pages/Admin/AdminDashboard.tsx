// src/pages/Admin/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { projects as localProjects } from "../Home/Catalogo/CatalogoCard";

interface Project {
  id: string;
  title: string;
  imageUrl: string;
  stain?: string;
  size?: string;
  rafterTail?: string;
  kneeBrace?: string;
  timberSize?: string;
}

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [errores, setErrores] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, "projects"));
        const data: Project[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login/dashboard");
  };

  const subirProyectosAFirestore = async () => {
    setUploading(true);
    setUploaded(false);
    setErrores([]);

    for (const project of localProjects) {
      try {
        const proyectoFirestore = {
          ...project,
          imageUrl: project.imageUrl, // se sube como string tal cual
        };

        await setDoc(doc(db, "projects", project.id), proyectoFirestore);
        console.log(`✅ Subido: ${project.title}`);
      } catch (error: any) {
        console.error(`❌ Error al subir ${project.title}:`, error);
        setErrores((prev) => [...prev, `${project.title}: ${error.message || error}`]);
      }
    }

    setUploading(false);
    setUploaded(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={subirProyectosAFirestore}
            disabled={uploading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {uploading ? "Subiendo..." : "Subir proyectos a Firestore"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {uploaded && (
        <div className="mb-4">
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

      {loading ? (
        <p className="text-gray-600">Cargando proyectos...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-600">No hay proyectos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white shadow rounded p-4">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold">{project.title}</h2>
              <ul className="text-sm text-gray-700 mt-2 space-y-1">
                {project.stain && <li><strong>Stain:</strong> {project.stain}</li>}
                {project.size && <li><strong>Size:</strong> {project.size}</li>}
                {project.rafterTail && <li><strong>Rafter Tail:</strong> {project.rafterTail}</li>}
                {project.kneeBrace && <li><strong>Knee Brace:</strong> {project.kneeBrace}</li>}
                {project.timberSize && <li><strong>Timber Size:</strong> {project.timberSize}</li>}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
