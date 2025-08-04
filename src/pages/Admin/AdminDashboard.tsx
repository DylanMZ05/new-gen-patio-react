import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import ProjectCard from "./AdminProjectCard";
import EditProjectModal from "./EditProjectModal";
import CreateProjectModal from "./CreateProjectModal";

export interface Project {
  id: string;
  title: string;
  imageUrl?: string;
  images?: string[];

  // Campos generales
  projectType?: string;
  size?: string;
  structureColor?: string;
  colorsPanels?: string;
  more?: string;

  // Campos adicionales
  stain?: string;
  rafterTail?: string;
  kneeBrace?: string;
  timberSize?: string;

  // Campos para filtros
  coveredPatios?: string;
  outdoorKitchen?: string;
  panels?: string;
  composite?: string;
  hybrid?: string;
  addons?: string;
  foundation?: string;
}





const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [creatingProject, setCreatingProject] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, "projects"));
        const data = snapshot.docs.map((doc) => ({
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
        <div className="flex gap-4">
          <button
            onClick={() => setCreatingProject(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            + Nuevo Proyecto
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {loading ? (
        <p>Cargando proyectos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => setEditingProject(project)}
            />
          ))}
        </div>
      )}

      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          setProjects={setProjects}
        />
      )}

      {creatingProject && (
        <CreateProjectModal
          onClose={() => setCreatingProject(false)}
          setProjects={setProjects}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
