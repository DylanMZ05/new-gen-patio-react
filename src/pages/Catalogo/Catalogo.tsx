import { useEffect, useMemo, useRef, useState } from "react";
import SectionBlock from "../../components/SectionBlock";
import MarqueeBanner from "../../components/MarqueeBanner";
import ProjectCard from "./ProjectCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { FiFilter, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import BlockSection from "../../components/BlockSection";

// URL canónica (si no hay window, fallback genérico)
const CANONICAL =
  typeof window !== "undefined"
    ? `${window.location.origin}/covered-patio-project-catalog`
    : "https://example.com/covered-patio-project-catalog";

// Hero section data (copy optimizado)
const sectionsData3 = [
  {
    id: 6,
    title: "Covered Patio & Pergola Project Catalog",
    description:
      "Explore our catalog of covered patios and aluminum pergolas—modern, durable, and fully customizable. Browse outdoor kitchen options, structure colors, roofing panels, and add-ons to design your perfect outdoor living space.",
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
    options: ["TV Walls", "Privacy Walls", "Slabs", "Fire Pit"],
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

  // 🔑 Estado de filtros namespaced por campo: `${field}::${option}`
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  // 🪗 Estado de apertura por grupo (acordeón) — SIEMPRE cerrados por default
  const allGroupTitles = Object.keys(filterConfig);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const base: Record<string, boolean> = {};
    allGroupTitles.forEach((t) => (base[t] = false));
    return base;
  });

  // ===== Mobile sheet state (tipo Amazon) =====
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [mobileTempSelection, setMobileTempSelection] = useState<Set<string>>(new Set());

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

  const clearAll = () => setSelectedFilters(new Set());
  const removeOne = (key: string) =>
    setSelectedFilters((prev) => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });

  // Mobile sheet helpers
  const sheetOpen = () => {
    setMobileTempSelection(new Set(selectedFilters));
    setMobileSheetOpen(true);
    document.body.style.overflow = "hidden";
  };
  const sheetClose = () => {
    setMobileSheetOpen(false);
    document.body.style.overflow = "auto";
  };
  const sheetApply = () => {
    setSelectedFilters(new Set(mobileTempSelection));
    sheetClose();
  };
  const sheetClear = () => setMobileTempSelection(new Set());
  const sheetToggle = (field: string, value: string) => {
    const key = `${field}::${value}`;
    setMobileTempSelection((prev) => {
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

  // 🧠 Encabezados dinámicos: si hay filtros activos, mostramos H3 de contexto
  const activeFilterLabels = useMemo(() => {
    if (selectedFilters.size === 0) return [];
    return [...selectedFilters].map((k) => {
      const [, value] = k.split("::");
      return value;
    });
  }, [selectedFilters]);

  // Chips para la barra mobile
  const activeFilterChips = [...selectedFilters];

  return (
    <>
      <BlockSection></BlockSection>
      <div className="w-full flex flex-col items-center mb-20">
        {/* SEO */}
        <Helmet>
          <title>Covered Patio &amp; Pergola Project Catalog | Aluminum Designs</title>
          <meta
            name="description"
            content="Browse real covered patio and pergola projects. Filter by type, kitchen, colors, roofing panels, add-ons and foundation. Get ideas and plan your outdoor space."
          />
          <link rel="canonical" href={CANONICAL} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Covered Patio &amp; Pergola Project Catalog | Aluminum Designs" />
          <meta
            property="og:description"
            content="Explore aluminum covered patios and pergolas by type, colors, roofing panels, add-ons and foundation. Filter projects to plan yours."
          />
          <meta name="robots" content="index,follow" />
        </Helmet>

        <SectionBlock sections={sectionsData3} />
        <MarqueeBanner />

        {/* H2 principal de listado */}
        <h2 className="text-4xl font-bold text-center text-black/90 mt-10">
          Our Projects
        </h2>
        <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mx-auto rounded-full"></div>

        {/* Subencabezado contextual cuando hay filtros activos (solo desktop) */}
        {activeFilterLabels.length > 0 && (
          <div className="mt-4 px-6 text-center hidden lg:block">
            <h3 className="text-base font-semibold text-gray-700">
              Showing projects filtered by:
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {activeFilterLabels.join(" · ")}
            </p>
          </div>
        )}

        {/* ===== Barra compacta de filtros (MOBILE, tipo Amazon) ===== */}
        <div className="lg:hidden w-full sticky top-0 z-40 bg-white/90 backdrop-blur supports-[backdrop-filter]:backdrop-blur-sm border-b border-gray-200">
          <div className="px-4 py-2 flex items-center gap-3 overflow-x-auto no-scrollbar">
            <button
              onClick={sheetOpen}
              className="flex items-center gap-2 bg-[#0d4754] text-white px-3 py-1.5 rounded-full text-sm whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="Open filters"
            >
              <FiFilter className="text-base" />
              Filters
            </button>

            {/* Chips de filtros activos */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {activeFilterChips.length === 0 ? (
                <span className="text-gray-500 text-sm">No filters applied</span>
              ) : (
                activeFilterChips.map((key) => {
                  const [, value] = key.split("::");
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm shrink-0"
                    >
                      {value}
                      <button
                        aria-label={`Remove ${value}`}
                        onClick={() => removeOne(key)}
                        className="ml-1 rounded-full p-0.5 hover:bg-gray-200"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  );
                })
              )}
            </div>

            {/* Clear all rápido si hay filtros */}
            {activeFilterChips.length > 0 && (
              <button
                onClick={clearAll}
                className="ml-auto text-sm text-[#0d4754] underline whitespace-nowrap shrink-0"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        <div className="w-full max-w-[1400px] px-6 py-10 flex flex-col lg:flex-row gap-10">
          {/* 🔷 Filtros (DESKTOP) */}
          <aside id="filters-panel" className="w-full lg:w-1/4 hidden lg:block">
            <div className="flex items-center gap-2 mb-4">
              <FiFilter className="text-md text-gray-700" aria-hidden />
              {/* H3 para bloque de filtros */}
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
          </aside>

          {/* 🔷 Proyectos */}
          <section className="flex-1" aria-label="Project catalog results">
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
          </section>
        </div>
      </div>

      {/* ===== Bottom Sheet de filtros (MOBILE) ===== */}
      <AnimatePresence>
        {mobileSheetOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[90] bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={sheetClose}
            />
            {/* Sheet */}
            <motion.div
              key="sheet"
              className="fixed inset-x-0 bottom-0 z-[3000] bg-white rounded-t-2xl shadow-2xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={sheetClose}
                  aria-label="Close filters"
                  className="p-2 rounded hover:bg-gray-100 cursor-pointer"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Contenido scrollable */}
              <div className="max-h-[60vh] overflow-y-auto px-5 py-4 space-y-3">
                {Object.entries(filterConfig).map(([groupTitle, { field, options }]) => {
                  const count = [...mobileTempSelection].filter((k) => k.startsWith(`${field}::`)).length;
                  return (
                    <div key={groupTitle} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                      <div className="w-full flex items-center justify-between px-4 py-3">
                        <span className="font-semibold text-gray-900">{groupTitle}</span>
                        <span className="text-xs font-medium rounded-full px-2 py-1 bg-gray-100 text-gray-600">
                          {count} Selected
                        </span>
                      </div>

                      <div className="px-4 pb-3">
                        <div className="flex flex-wrap gap-2 pt-1">
                          {options.map((option) => {
                            const key = `${field}::${option}`;
                            const active = mobileTempSelection.has(key);
                            return (
                              <button
                                key={key}
                                onClick={() => sheetToggle(field, option)}
                                className={`px-3 py-1.5 rounded-full text-sm border cursor-pointer ${
                                  active
                                    ? "bg-[#0d4754] text-white border-[#0d4754]"
                                    : "bg-white text-gray-800 border-gray-300"
                                }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer acciones */}
              <div className="sticky bottom-0 bg-white border-t px-5 py-3 flex items-center gap-3">
                <button
                  onClick={sheetClear}
                  className="flex-1 border border-gray-300 text-gray-800 rounded-full py-2 font-medium cursor-pointer"
                >
                  Clear
                </button>
                <button
                  onClick={sheetApply}
                  className="flex-1 bg-[#0d4754] text-white rounded-full py-2 font-semibold cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default PatiosAndPergolasCatalog;
