// src/pages/Admin/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button>
      </div>

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
