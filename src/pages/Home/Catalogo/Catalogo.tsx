import { useEffect, useState } from "react";
import SectionBlock from "../../../components/SectionBlock";
import MarqueeBanner from "../../../components/MarqueeBanner";
import ProjectCard from "./ProjectCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

// Reutilizable
const FilterGroup = ({ title, options }: { title: string; options: string[] }) => (
  <div className="text-sm text-gray-800">
    <h3 className="font-semibold text-base mb-2">{title}</h3>
    <div className="space-y-1 pl-2">
      {options.map((option) => (
        <label key={option} className="block">
          <input type="checkbox" className="mr-2" />
          {option}
        </label>
      ))}
    </div>
  </div>
);

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

const PatiosAndPergolasCatalog = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
            {/* 🔰 NUEVOS GRUPOS */}
            <FilterGroup
              title="Covered Patios"
              options={[
                "Attached Covered Patio",
                "FreeStanding Pergola",
                "Cantilevered Pergola",
              ]}
            />
            <FilterGroup
              title="Outdoor Kitchen"
              options={[
                "Modern Outdoor Kitchen",
                "Traditional Outdoor Kitchen",
              ]}
            />
            {/* FILTROS EXISTENTES */}
            <FilterGroup title="Panels" options={["Dark Bronze", "White", "Wood Imitation Panels"]} />
            <FilterGroup title="Composite" options={["Black", "Wood Imitation"]} />
            <FilterGroup title="Hybrid" options={["Polycarbonate", "Naked Pergola"]} />
            <FilterGroup title="Add-ons" options={["TV Walls", "Privacy Walls", "Slags", "Fire Pit"]} />
            <FilterGroup title="Foundation" options={["Concrete Slab", "Concrete Stamped", "Spray Decking", "Paver", "Tiles", "Turf"]} />
          </div>
        </div>

        {/* 🔷 Proyectos */}
        <div className="flex-1">
          {loading ? (
            <p className="text-gray-600">Loading projects...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map((project) => (
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
