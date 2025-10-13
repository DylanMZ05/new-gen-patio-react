// src/pages/Admin/AdminDashboard.tsx
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./AdminProjectCard";

// Firebase on-demand
import { loadFirestore } from "../../lib/firebaseDb";
import { loadAuth } from "../../lib/firebaseAuth";

// Modales pesados → lazy
const EditProjectModal = lazy(() => import("./EditProjectModal"));
const CreateProjectModal = lazy(() => import("./CreateProjectModal"));

export interface Project {
  id: string;
  title: string;
  imageUrl?: string;
  images?: string[];

  // Campos generales
  projectType?: string;
  size?: string;
  structureColor?: string;
  colorsPanels?: string;    // derivado para mostrar
  more?: string;

  // Campos adicionales
  stain?: string;
  rafterTail?: string;
  kneeBrace?: string;
  timberSize?: string;

  // Filtros (guardados como CSV)
  coveredPatios?: string;
  outdoorKitchen?: string;
  composite?: string;
  hybrid?: string;
  addons?: string;
  foundation?: string;
  colorsRoofingPanels?: string; // CSV persistido nuevo (si existe)
}

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [creatingProject, setCreatingProject] = useState<boolean>(false);
  const navigate = useNavigate();

  // ======= Cargar proyectos (Firestore on-demand) =======
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const db = await loadFirestore();
        const { collection, getDocs } = await import("firebase/firestore");

        // Trae sin exigir índices/orden. Si luego agregas createdAt, puedes ordenar.
        const snap = await getDocs(collection(db, "projects"));
        if (!alive) return;

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Project, "id">),
        }));

        setProjects(data);
      } catch (err) {
        console.error("[AdminDashboard] Error fetching projects:", err);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  // ======= Logout (Auth on-demand) =======
  const handleLogout = async () => {
    try {
      const auth = await loadAuth();
      const { signOut } = await import("firebase/auth");
      await signOut(auth);
      navigate("/login/dashboard");
    } catch (e) {
      console.error("[AdminDashboard] Sign out failed:", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
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

      {/* Grid de proyectos */}
      {loading ? (
        <p>Cargando proyectos...</p>
      ) : projects.length === 0 ? (
        <div className="bg-white border rounded-xl p-6 text-center">
          <p className="text-gray-700">No hay proyectos todavía.</p>
          <button
            onClick={() => setCreatingProject(true)}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Crear el primero
          </button>
        </div>
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

      {/* Modales (lazy) */}
      <Suspense fallback={null}>
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
      </Suspense>
    </div>
  );
};

export default AdminDashboard;
