import { useEffect, useMemo, useRef, useState } from "react";
import SectionBlock from "../../components/SectionBlock";
import MarqueeBanner from "../../components/MarqueeBanner";
import ProjectCard from "./ProjectCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { FiFilter } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

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
const filterConfig: {
  [groupLabel: string]: { field: string; options: string[]; inDescription?: boolean };
} = {
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

// 🔧 Helpers para filtrar con compatibilidad retro
const getValuesArray = (raw: unknown): string[] => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(String).map((s) => s.trim()).filter(Boolean);
  return String(raw).split(",").map((s) => s.trim()).filter(Boolean);
};

// Para colorsRoofingPanels: soporta datos viejos
const getFieldValuesWithFallback = (project: any, field: string): string[] => {
  if (field !== "colorsRoofingPanels") return getValuesArray(project[field]);
  const v1 = getValuesArray(project.colorsRoofingPanels);
  if (v1.length) return v1;
  const v2 = getValuesArray(project.colorsPanels);
  if (v2.length) return v2;
  const v3 = getValuesArray(project.structureColors).filter((v) => v === "Wood Imitation Panels");
  return v3;
};

// 🧩 Filtro con acordeón
const FilterGroup = ({
  title,
  field,
  options,
  selectedFilters,
  onChange,
  isOpen,
  onToggle,
  selectedCount,
}: {
  title: string;
  field: string;
  options: string[];
  selectedFilters: Set<string>;
  onChange: (field: string, value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  selectedCount: number;
}) => (
  <div className="border border-gray-200 rounded-xl overflow-hidden bg-white/70 backdrop-blur-sm">
    {/* Header */}
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-100"
      aria-expanded={isOpen}
      aria-controls={`panel-${field}`}
    >
      <span className="font-semibold text-gray-900">{title}</span>

      <div className="flex items-center gap-3">
        <span
          className={`text-xs font-medium rounded-full px-2 py-1 ${
            selectedCount > 0 ? "bg-[#0d4754]/10 text-[#0d4754]" : "bg-gray-100 text-gray-500"
          }`}
        >
          {selectedCount} {selectedCount === 1 ? "Selected" : "Selected"}
        </span>

        <svg
          className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 12l-5-5h10l-5 5z" />
        </svg>
      </div>
    </button>

    {/* Panel */}
    <div
      id={`panel-${field}`}
      className={`px-4 transition-all duration-200 ease-out ${
        isOpen ? "max-h-96 opacity-100 pb-3" : "max-h-0 opacity-0"
      } overflow-hidden`}
    >
      <div className="space-y-2 pt-1">
        {options.map((option) => {
          const key = `${field}::${option}`;
          return (
            <label key={key} className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer"
                checked={selectedFilters.has(key)}
                onChange={() => onChange(field, option)}
              />
              {option}
            </label>
          );
        })}
      </div>
    </div>
  </div>
);

const PatiosAndPergolasCatalog = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // 🔑 Estado de filtros namespaced por campo: `${field}::${option}`
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  // 🪗 Estado de apertura por grupo (acordeón) — SIEMPRE cerrados por default
  const allGroupTitles = Object.keys(filterConfig);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const base: Record<string, boolean> = {};
    allGroupTitles.forEach((t) => (base[t] = false));
    return base;
  });

  // Cargar proyectos
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

  // Abrir/cerrar un grupo
  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // Contador por grupo
  const getSelectedCountForField = (field: string) =>
    [...selectedFilters].filter((k) => k.startsWith(`${field}::`)).length;

  // ====== Filtrado (memoizado para mantener referencia estable) ======
  const filteredProjects = useMemo(() => {
    if (selectedFilters.size === 0) return projects;

    return projects.filter((project) =>
      Object.values(filterConfig).some(({ field }) => {
        const selectedForField = [...selectedFilters]
          .filter((k) => k.startsWith(`${field}::`))
          .map((k) => k.split("::")[1]);

        if (selectedForField.length === 0) return false;

        const valuesArray =
          field === "colorsRoofingPanels"
            ? getFieldValuesWithFallback(project, field)
            : getValuesArray(project[field]);

        return selectedForField.some((opt) => valuesArray.includes(opt));
      })
    );
  }, [projects, selectedFilters]);

  // ========= Preload de portadas =========
  const getCoverImage = (p: any): string | undefined => {
    const imgs = Array.isArray(p.images) ? p.images : [];
    return imgs[0] || p.imageUrl;
  };

  const [loadedCovers, setLoadedCovers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // preloading paralelo (rápido), pero luego revelamos en orden
    filteredProjects.forEach((p) => {
      if (loadedCovers[p.id]) return;
      const cover = getCoverImage(p);

      if (!cover) {
        setLoadedCovers((prev) => ({ ...prev, [p.id]: true }));
        return;
      }

      const img = new Image();
      img.onload = () => setLoadedCovers((prev) => ({ ...prev, [p.id]: true }));
      img.onerror = () => setLoadedCovers((prev) => ({ ...prev, [p.id]: true }));
      img.src = cover;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProjects]);

  // 👉 Revelado progresivo: solo los primeros N contiguos ya cargados
  const contiguousReadyProjects = useMemo(() => {
    const res: any[] = [];
    for (let i = 0; i < filteredProjects.length; i++) {
      const p = filteredProjects[i];
      if (loadedCovers[p.id]) {
        res.push(p);
      } else {
        break; // se corta en el primer no-cargado
      }
    }
    return res;
  }, [filteredProjects, loadedCovers]);

  // ========= Batch dinámico + infinite scroll (SENTINEL) =========
  const computeBatch = () => (window.innerWidth >= 1024 ? 6 : 4);
  const [batchSize, setBatchSize] = useState<number>(computeBatch());
  const [visibleCount, setVisibleCount] = useState<number>(batchSize);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  // Guard para evitar autoload si el contenido inicial no llena la pantalla (mobile)
  const [hasUserScrolled, setHasUserScrolled] = useState<boolean>(false);
  useEffect(() => {
    const onScroll = () => {
      if (!hasUserScrolled && window.scrollY > 20) setHasUserScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasUserScrolled]);

  // refs para estado actual en el observer
  const inFlightRef = useRef(false);
  const visibleRef = useRef(visibleCount);
  const totalReadyRef = useRef(contiguousReadyProjects.length);
  const batchRef = useRef(batchSize);

  useEffect(() => { visibleRef.current = visibleCount; }, [visibleCount]);
  useEffect(() => { totalReadyRef.current = contiguousReadyProjects.length; }, [contiguousReadyProjects.length]);
  useEffect(() => { batchRef.current = batchSize; }, [batchSize]);

  // Actualiza batch y resetea la primera tanda en resize
  useEffect(() => {
    const onResize = () => {
      const nextBatch = computeBatch();
      setBatchSize(nextBatch);
      setVisibleCount(nextBatch);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Reset al cambiar filtros
  useEffect(() => {
    setVisibleCount(() => Math.min(batchSize, contiguousReadyProjects.length || batchSize));
    setIsLoadingMore(false);
    inFlightRef.current = false;
  }, [batchSize, contiguousReadyProjects]);

  // Asegura 1 batch cuando terminan de precargar
  useEffect(() => {
    if (contiguousReadyProjects.length > 0 && visibleCount < batchSize) {
      setVisibleCount(Math.min(batchSize, contiguousReadyProjects.length));
    }
  }, [contiguousReadyProjects.length, visibleCount, batchSize]);

  const displayedProjects = useMemo(
    () => contiguousReadyProjects.slice(0, visibleCount),
    [contiguousReadyProjects, visibleCount]
  );
  const hasMore = visibleCount < contiguousReadyProjects.length;

  // Sentinel siempre en el DOM
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Observer del sentinel (no carga más hasta que el usuario haya scrolleado en mobile)
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const canLoadMore =
          hasMore &&
          !inFlightRef.current &&
          visibleRef.current < totalReadyRef.current &&
          (window.innerWidth >= 1024 || hasUserScrolled); // desktop libre, mobile requiere scroll

        if (entry.isIntersecting && canLoadMore) {
          inFlightRef.current = true;
          setIsLoadingMore(true);

          const next = Math.min(
            visibleRef.current + batchRef.current,
            totalReadyRef.current
          );
          setVisibleCount(next);

          setTimeout(() => {
            setIsLoadingMore(false);
            inFlightRef.current = false;
          }, 250);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.15,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, hasUserScrolled]);

  // Skeletons (mostrar tantos como batch)
  const showSkeletons =
    !loading && displayedProjects.length === 0 && filteredProjects.length > 0;
  const skeletonCount = batchSize;

  // Variants animación
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
  };

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
          <div className="flex items-center gap-2 mb-4">
            <FiFilter className="text-md text-gray-700" />
            <h3 className="text-sm font-semibold text-gray-800">Filters</h3>
          </div>

          <div className="space-y-3">
            {Object.entries(filterConfig).map(([groupTitle, { field, options }]) => (
              <FilterGroup
                key={groupTitle}
                title={groupTitle}
                field={field}
                options={options}
                selectedFilters={selectedFilters}
                onChange={toggleFilter}
                isOpen={openGroups[groupTitle]}
                onToggle={() => toggleGroup(groupTitle)}
                selectedCount={getSelectedCountForField(field)}
              />
            ))}
          </div>
        </div>

        {/* 🔷 Proyectos */}
        <div className="flex-1">
          {loading ? (
            // 🔹 Spinner centrado mientras se trae Firestore
            <div className="flex justify-center items-center py-20">
              <div className="h-10 w-10 rounded-full border-2 border-gray-300 border-t-gray-700 animate-spin" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <p className="text-gray-500">No projects match your filters.</p>
          ) : showSkeletons ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
              {Array.from({ length: skeletonCount }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="w-full max-w-[380px] h-[320px] rounded-xl border border-gray-200 bg-white overflow-hidden"
                >
                  <div className="animate-pulse h-full">
                    <div className="h-48 bg-gray-200" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-3 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center"
              >
                <AnimatePresence>
                  {displayedProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      layout
                      className="w-full"
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* 🔹 Spinner al final cuando se está cargando la siguiente tanda */}
              <div className="flex justify-center items-center mt-6 min-h-6">
                {hasMore && (
                  <div
                    className={`h-8 w-8 rounded-full border-2 border-gray-300 border-t-gray-700 animate-spin ${
                      isLoadingMore ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-200`}
                    aria-label="Loading more projects"
                  />
                )}
              </div>

              {/* Sentinel invisible para el IntersectionObserver */}
              <div ref={sentinelRef} className="h-1 w-full" aria-hidden />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatiosAndPergolasCatalog;
