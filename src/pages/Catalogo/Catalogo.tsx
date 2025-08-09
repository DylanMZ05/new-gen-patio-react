import { useEffect, useState } from "react";
import SectionBlock from "../../components/SectionBlock";
import MarqueeBanner from "../../components/MarqueeBanner";
import ProjectCard from "./ProjectCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

// Hero section data
const sectionsData3 = [
  {
    id: 6,
    title: "Aluminium Custom Pergola and Cover Patios",
    description:
      "Discover our modern, innovative solutions designed to enhance outdoor living with style, functionality, and durability.",
    backgroundImage:
      "assets/images/Products/Patios&Pergolas/Attached/04.webp",
  },
];

// 🧭 Configuración de filtros
// Nota: Los 4 primeros van en la descripción del proyecto
const filterConfig: {
  [groupLabel: string]: { field: string; options: string[]; inDescription?: boolean };
} = {
  // ✅ Filtros que van en descripción
  "Covered Patios": {
    field: "coveredPatios",
    options: ["Attached Covered Patio", "FreeStanding Pergola", "Cantilevered Pergola"],
    inDescription: true,
  },
  "Outdoor Kitchen": {
    field: "outdoorKitchen",
    options: ["Modern Outdoor Kitchen", "Traditional Outdoor Kitchen"],
    inDescription: true,
  },
  "Structure Colors": {
    field: "structureColors",
    options: ["Dark Bronze", "White", "Varied Colors"],
    inDescription: true,
  },
  "Colors Roofing Panels": {
    field: "colorsRoofingPanels",
    options: ["Dark Bronze", "White", "Wood Imitation Panels"],
    inDescription: true,
  },

  // ❌ Filtros que NO van en descripción
  "Composite": {
    field: "composite",
    options: ["Black", "Wood Imitation"],
    inDescription: false,
  },
  "Hybrid": {
    field: "hybrid",
    options: ["Polycarbonate", "Naked Pergola"],
    inDescription: false,
  },
  "Add-ons": {
    field: "addons",
    options: ["TV Walls", "Privacy Walls", "Slags", "Fire Pit"],
    inDescription: false,
  },
  "Foundation": {
    field: "foundation",
    options: ["Concrete Slab", "Concrete Stamped", "Spray Decking", "Paver", "Tiles", "Turf"],
    inDescription: false,
  },
};

// 🧩 Componente reutilizable para cada grupo de filtros
const FilterGroup = ({
  title,
  field,
  options,
  selectedFilters,
  onChange,
}: {
  title: string;
  field: string;
  options: string[];
  selectedFilters: Set<string>;
  onChange: (field: string, value: string) => void;
}) => (
  <div className="text-sm text-gray-800">
    <h3 className="font-semibold text-base mb-2">{title}</h3>
    <div className="space-y-1 pl-2">
      {options.map((option) => {
        const key = `${field}::${option}`;
        return (
          <label key={key} className="block">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedFilters.has(key)}
              onChange={() => onChange(field, option)}
            />
            {option}
          </label>
        );
      })}
    </div>
  </div>
);

// 🔧 Helpers para filtrar con compatibilidad retro
const getValuesArray = (raw: unknown): string[] => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(String).map((s) => s.trim()).filter(Boolean);
  return String(raw).split(",").map((s) => s.trim()).filter(Boolean);
};

// Para colorsRoofingPanels: soporta datos viejos en colorsPanels o mezclados en structureColors
const getFieldValuesWithFallback = (project: any, field: string): string[] => {
  if (field !== "colorsRoofingPanels") {
    return getValuesArray(project[field]);
  }
  // 1) Nuevo campo correcto
  const v1 = getValuesArray(project.colorsRoofingPanels);
  if (v1.length) return v1;
  // 2) Campo viejo (compat)
  const v2 = getValuesArray(project.colorsPanels);
  if (v2.length) return v2;
  // 3) Casos viejos dentro de structureColors (solo rescata “Wood Imitation Panels”)
  const v3 = getValuesArray(project.structureColors).filter((v) => v === "Wood Imitation Panels");
  return v3;
};

const PatiosAndPergolasCatalog = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // 🔑 Estado de filtros namespaced por campo: `${field}::${option}`
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, "projects"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(data);
      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Manejar selección de checkboxes (namespaced)
  const toggleFilter = (field: string, value: string) => {
    const key = `${field}::${value}`;
    setSelectedFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // Filtrar proyectos: match si coincide con AL MENOS un grupo seleccionado (OR global)
  const filteredProjects = projects.filter((project) => {
    if (selectedFilters.size === 0) return true;

    return Object.values(filterConfig).some(({ field }) => {
      // opciones seleccionadas para ESTE campo
      const selectedForField = [...selectedFilters]
        .filter((k) => k.startsWith(`${field}::`))
        .map((k) => k.split("::")[1]);

      if (selectedForField.length === 0) return false; // no hay filtros de este campo activos

      const valuesArray =
        field === "colorsRoofingPanels"
          ? getFieldValuesWithFallback(project, field)
          : getValuesArray(project[field]);

      // Coincidencia si alguna opción marcada para este campo está en el proyecto
      return selectedForField.some((opt) => valuesArray.includes(opt));
    });
  });

  return (
    <div className="w-full flex flex-col items-center mb-20">
      <SectionBlock sections={sectionsData3} />
      <MarqueeBanner />

      <h2 className="text-4xl font-bold text-center text-black/90 mt-10">
        Our Projects
      </h2>
      <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mx-auto rounded-full"></div>

      {/* Botón para mostrar filtros en mobile */}
      <div className="lg:hidden w-full px-6 mt-6 text-center">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="bg-[#0d4754] hover:bg-[#0d5450] text-white px-4 py-2 rounded-full cursor-pointer"
        >
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="w-full max-w-[1400px] px-6 py-10 flex flex-col lg:flex-row gap-10">
        {/* 🔷 Filtros */}
        <div className={`w-full lg:w-1/4 ${showMobileFilters ? "block" : "hidden"} lg:block`}>
          <div className="space-y-6">
            {Object.entries(filterConfig).map(([groupTitle, { field, options }]) => (
              <FilterGroup
                key={groupTitle}
                title={groupTitle}
                field={field}
                options={options}
                selectedFilters={selectedFilters}
                onChange={toggleFilter}
              />
            ))}
          </div>
        </div>

        {/* 🔷 Proyectos */}
        <div className="flex-1">
          {loading ? (
            <p className="text-gray-600">Loading projects...</p>
          ) : filteredProjects.length === 0 ? (
            <p className="text-gray-500">No projects match your filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatiosAndPergolasCatalog;
