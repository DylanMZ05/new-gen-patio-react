import SectionBlock from "../../../components/SectionBlock";
import MarqueeBanner from "../../../components/MarqueeBanner";
import ProjectCard from "./ProjectCard";
import { projects } from "./CatalogoCard";

// ✅ Grupo individual de filtros reutilizable
const FilterGroup = ({
  title,
  options,
}: {
  title: string;
  options: string[];
}) => (
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

// ✅ Datos para sección destacada (hero)
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

// ✅ Catálogo principal con filtros responsivos
const PatiosAndPergolasCatalog = () => {
  return (
    <div className="w-full flex flex-col items-center mb-20">
      {/* Hero */}
      <SectionBlock sections={sectionsData3} />
      <MarqueeBanner />

        <h2 className="text-4xl font-bold text-center text-black/90 mt-10">
          Our Projects
        </h2>
        <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mx-auto rounded-full"></div>

      {/* Layout principal responsive */}
      <div className="w-full max-w-[1400px] px-6 py-10 flex flex-col lg:flex-row justify-center gap-10">
        
        {/* 🔷 Filtros: sidebar en desktop, grilla en mobile */}
        <div className="w-full lg:w-50 flex justify-center">
          <div className="hidden lg:block">
            {/* Sidebar vertical en desktop */}
            <div className="space-y-6 text-sm text-gray-800">
              <FilterGroup title="Panels" options={["Dark Bronze", "White", "Wood Imitation Panels"]} />
              <FilterGroup title="Composite" options={["Black", "Wood Imitation"]} />
              <FilterGroup title="Hybrid" options={["Polycarbonate", "Naked Pergola"]} />
              <FilterGroup title="Add-ons" options={["TV Walls", "Privacy Walls", "Slags", "Fire Pit"]} />
              <FilterGroup title="Foundation" options={["Concrete Slab", "Concrete Stamped", "Spray Decking", "Paver", "Tiles", "Turf"]} />
            </div>
          </div>

          {/* Grilla horizontal de filtros en mobile/tablet */}
          <div className="block lg:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <FilterGroup title="Panels" options={["Dark Bronze", "White", "Wood Imitation Panels"]} />
              <FilterGroup title="Composite" options={["Black", "Wood Imitation"]} />
              <FilterGroup title="Hybrid" options={["Polycarbonate", "Naked Pergola"]} />
              <FilterGroup title="Add-ons" options={["TV Walls", "Privacy Walls", "Slags", "Fire Pit"]} />
              <FilterGroup title="Foundation" options={["Concrete Slab", "Concrete Stamped", "Spray Decking", "Paver", "Tiles", "Turf"]} />
            </div>
          </div>
        </div>

        {/* 🔷 Catálogo de proyectos */}
        <div className="flex-1">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatiosAndPergolasCatalog;
