// src/pages/Admin/AdminDashboard.tsx
import React, {
  useEffect,
  useState,
  lazy,
  Suspense,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./AdminProjectCard";

import { loadFirestore } from "../../lib/firebaseDb";
import { loadAuth } from "../../lib/firebaseAuth";

const EditProjectModal = lazy(() => import("./EditProjectModal"));
const CreateProjectModal = lazy(() => import("./CreateProjectModal"));

export interface Project {
  id: string;
  title: string;
  imageUrl?: string;
  images?: string[];

  projectType?: string;
  size?: string;
  structureColor?: string;
  colorsPanels?: string;
  colorsRoofingPanels?: string;
  more?: string;

  stain?: string;
  rafterTail?: string;
  kneeBrace?: string;
  timberSize?: string;

  coveredPatios?: string;
  outdoorKitchen?: string;
  composite?: string;
  hybrid?: string;
  addons?: string;
  foundation?: string;

  order?: number;
  createdAt?: any; // Timestamp | string | number
}

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [creatingProject, setCreatingProject] = useState<boolean>(false);

  const [sortMode, setSortMode] = useState<"createdAt" | "alpha">(
    "createdAt"
  );

  const navigate = useNavigate();

  // ==========================
  // Cargar proyectos Firestore
  // ==========================
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const db = await loadFirestore();
        const { collection, getDocs } = await import("firebase/firestore");

        const snap = await getDocs(collection(db, "projects"));
        if (!alive) return;

        const data: Project[] = snap.docs.map((doc) => ({
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

  // ==========================
  // Logout
  // ==========================
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

  // ==========================
  // Helpers de orden
  // ==========================
  function getCreatedAtMs(p: Project): number {
    const raw = p.createdAt;

    // Firestore Timestamp
    if (raw && typeof raw.toMillis === "function") {
      return raw.toMillis();
    }
    // ISO string
    if (typeof raw === "string") {
      const t = Date.parse(raw);
      if (!Number.isNaN(t)) return t;
    }
    // number en ms
    if (typeof raw === "number") {
      return raw;
    }
    return 0;
  }

  const sortedProjects = useMemo(() => {
    const clone = [...projects];

    if (sortMode === "alpha") {
      clone.sort((a, b) => {
        const A = (a.title || "").toLowerCase().trim();
        const B = (b.title || "").toLowerCase().trim();
        if (A < B) return -1;
        if (A > B) return 1;
        return 0;
      });
    } else {
      // createdAt (más nuevo primero)
      clone.sort((a, b) => getCreatedAtMs(b) - getCreatedAtMs(a));
    }

    return clone;
  }, [projects, sortMode]);

  // ==========================
  // RENDER
  // ==========================
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* NAV SUPERIOR FIJO */}
      {/*
        Hacemos la barra fixed para que NUNCA se vaya,
        igual que un navbar.
        Le damos una altura estática aproximada en desktop
        y mobile, y luego empujamos el <main> con padding-top
        para que el contenido no quede escondido debajo.
      */}
      <header
        className="
          fixed top-0 left-0 right-0 z-50
          bg-gray-100/95 backdrop-blur supports-[backdrop-filter]:bg-gray-100/70
          border-b border-gray-300
        "
      >
        <div
          className="
            max-w-[1400px] mx-auto w-full
            px-4 py-3
            flex flex-col gap-4
            lg:flex-row lg:items-start lg:justify-between
          "
        >
          {/* Bloque IZQ: título / subtítulo / sort */}
          <div className="flex flex-col min-w-0">
            {/* fila título + acciones (en mobile también mostramos los botones acá) */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="min-w-0">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-gray-600 leading-snug">
                  Manage projects, images and display info.
                </p>
              </div>

              {/* BOTONES DE ACCIÓN (visible en mobile / tablet) */}
              <div className="flex flex-col xs:flex-row gap-2 sm:self-start lg:hidden">
                <button
                  onClick={() => setCreatingProject(true)}
                  className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition text-xs font-medium"
                >
                  + New Project
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition text-xs font-medium"
                >
                  Log out
                </button>
              </div>
            </div>

            {/* Controles de orden */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-[10px] font-semibold text-gray-700 uppercase tracking-wide">
                Sort
              </span>

              <button
                onClick={() => setSortMode("createdAt")}
                className={`px-3 py-1.5 text-[11px] font-medium rounded-lg border transition
                  ${
                    sortMode === "createdAt"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                Newest first
              </button>

              <button
                onClick={() => setSortMode("alpha")}
                className={`px-3 py-1.5 text-[11px] font-medium rounded-lg border transition
                  ${
                    sortMode === "alpha"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                  }`}
              >
                A → Z
              </button>
            </div>
          </div>

          {/* Bloque DER: acciones (visible sólo en desktop / lg+) */}
          <div className="hidden lg:flex flex-col items-end gap-2 shrink-0">
            <button
              onClick={() => setCreatingProject(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium w-full sm:w-auto"
            >
              + New Project
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium w-full sm:w-auto"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      {/*
        Empujamos el contenido para que no quede bajo el header fijo.
        La altura real del header ronda ~ (py-3 + líneas) ≈ 110-130px en mobile,
        ~90-100px en desktop. Le damos un padding-top seguro.
      */}
      <main className="flex-1 px-4 pb-6 max-w-[1400px] mx-auto w-full pt-[130px] lg:pt-[110px]">
        {loading ? (
          <p className="text-gray-700">Cargando proyectos...</p>
        ) : sortedProjects.length === 0 ? (
          <div className="bg-white border rounded-xl p-6 text-center">
            <p className="text-gray-700">No hay proyectos todavía.</p>
            <button
              onClick={() => setCreatingProject(true)}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
            >
              Crear el primero
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={() => setEditingProject(project)}
              />
            ))}
          </div>
        )}
      </main>

      {/* MODALES LAZY */}
      <Suspense
        fallback={
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[1000]">
            <div className="bg-white rounded-lg shadow-xl px-6 py-4 text-center">
              <p className="text-gray-800 font-medium">Loading editor…</p>
            </div>
          </div>
        }
      >
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
