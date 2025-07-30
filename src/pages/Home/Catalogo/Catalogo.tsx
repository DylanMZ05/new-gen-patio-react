import { useEffect, useState } from "react";
import SectionBlock from "../../../components/SectionBlock";
import MarqueeBanner from "../../../components/MarqueeBanner";
import ProjectCard from "./ProjectCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

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

// Todos los filtros por grupo
const filterConfig = {
  "Covered Patios": {
    field: "coveredPatios",
    options: ["Attached Covered Patio", "FreeStanding Pergola", "Cantilevered Pergola"],
  },
  "Outdoor Kitchen": {
    field: "outdoorKitchen",
    options: ["Modern Outdoor Kitchen", "Traditional Outdoor Kitchen"],
  },
  "Structure Colors": {
    field: "panels",
    options: ["Dark Bronze", "White", "Wood Imitation Panels"],
  },
  "Composite": {
    field: "composite",
    options: ["Black", "Wood Imitation"],
  },
  "Hybrid": {
    field: "hybrid",
    options: ["Polycarbonate", "Naked Pergola"],
  },
  "Add-ons": {
    field: "addons",
    options: ["TV Walls", "Privacy Walls", "Slags", "Fire Pit"],
  },
  "Foundation": {
    field: "foundation",
    options: ["Concrete Slab", "Concrete Stamped", "Spray Decking", "Paver", "Tiles", "Turf"],
  },
};

// Componente reutilizable para cada grupo de filtros
const FilterGroup = ({
  title,
  options,
  selectedFilters,
  onChange,
}: {
  title: string;
  options: string[];
  selectedFilters: Set<string>;
  onChange: (value: string) => void;
}) => (
  <div className="text-sm text-gray-800">
    <h3 className="font-semibold text-base mb-2">{title}</h3>
    <div className="space-y-1 pl-2">
      {options.map((option) => (
        <label key={option} className="block">
          <input
            type="checkbox"
            className="mr-2"
            checked={selectedFilters.has(option)}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  </div>
);

const PatiosAndPergolasCatalog = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
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

  // Manejar selección de checkboxes
  const toggleFilter = (value: string) => {
    setSelectedFilters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  };

  // Filtrar proyectos por cualquier coincidencia en los campos configurados
  const filteredProjects = projects.filter((project) => {
    if (selectedFilters.size === 0) return true;

    return Object.values(filterConfig).some(({ field }) => {
      const fieldValue = project[field];
      return fieldValue && selectedFilters.has(fieldValue);
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
            {Object.entries(filterConfig).map(([groupTitle, { options }]) => (
              <FilterGroup
                key={groupTitle}
                title={groupTitle}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
