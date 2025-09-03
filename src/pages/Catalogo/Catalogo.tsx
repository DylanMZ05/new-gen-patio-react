import { useEffect, useMemo, useRef, useState } from "react";
import SectionBlock from "../../components/SectionBlock";
import ProjectCard from "./ProjectCard";
import { collection, getDocsFromCache, getDocsFromServer } from "firebase/firestore";
import { db } from "../../firebase";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import BlockSection from "../../components/BlockSection";

/* ==========================
   CANONICAL URL
=========================== */
const CANONICAL =
  typeof window !== "undefined"
    ? `${window.location.origin}/covered-patio-project-catalog`
    : "https://example.com/covered-patio-project-catalog";

/* ==========================
   HERO DATA
=========================== */
const sectionsData3 = [
  {
    id: 6,
    title: "Covered Patio & Pergola Project Catalog",
    description:
      "Explore our catalog of covered patios and aluminum pergolas—modern, durable, and fully customizable. Browse outdoor kitchen options, structure colors, roofing panels, and add-ons to design your perfect outdoor living space.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/04.webp",
  },
];

/* ==========================
   FILTER CONFIG
=========================== */
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

/* ==========================
   HELPERS (normalización)
=========================== */
const getValuesArray = (raw: unknown): string[] => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(String).map((s) => s.trim()).filter(Boolean);
  return String(raw).split(",").map((s) => s.trim()).filter(Boolean);
};

const getFieldValuesWithFallback = (project: any, field: string): string[] => {
  if (field !== "colorsRoofingPanels") return getValuesArray(project[field]);
  const v1 = getValuesArray(project.colorsRoofingPanels);
  if (v1.length) return v1;
  const v2 = getValuesArray(project.colorsPanels);
  if (v2.length) return v2;
  const v3 = getValuesArray(project.structureColors).filter((v) => v === "Wood Imitation Panels");
  return v3;
};

const toCanonical = (field: string, v: string): string => {
  const s = String(v).trim().toLowerCase();
  if (field === "addons") {
    if (["slag", "slags", "slab", "slabs"].includes(s)) return "slabs";
  }
  return s;
};

const getCanonicalValues = (project: any, field: string): string[] => {
  const raw =
    field === "colorsRoofingPanels"
      ? getFieldValuesWithFallback(project, field)
      : getValuesArray(project[field]);
  return raw.map((v) => toCanonical(field, v));
};

const setsEqual = (a: string[], b: string[]) => {
  const A = Array.from(new Set(a));
  const B = Array.from(new Set(b));
  if (A.length !== B.length) return false;
  return A.every((v) => B.includes(v));
};

/* ==========================
   HEADER HIDE/SHOW OFFSET
=========================== */
function useHeaderHidden() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    const deltaThreshold = 8;
    const minYToHide = 120;
    const onScroll = () => {
      const y = window.scrollY || 0;
      const delta = y - lastY;
      lastY = y;
      if (delta > deltaThreshold && y > minYToHide) setHidden(true);
      else if (delta < -deltaThreshold) setHidden(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return hidden;
}

const HEADER_HEIGHT = 75;
/* Sin banner ni espaciado extra */
const BASE_OFFSET = 0;

/* ==========================
   Altura mínima del panel de resultados
=========================== */
const RESULTS_MIN_VH = 72;

/* ==========================
   COMPONENT
=========================== */
const PatiosAndPergolasCatalog = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ===== Selected filters (shared) ===== */
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  /* ===== Mobile sheet state ===== */
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [mobileTempSelection, setMobileTempSelection] = useState<Set<string>>(new Set());

  /* ===== Top compact bar behavior ===== */
  const isHeaderHidden = useHeaderHidden();
  const stickyTop = isHeaderHidden ? BASE_OFFSET : BASE_OFFSET + HEADER_HEIGHT;

  const [isTopBarStuck, setIsTopBarStuck] = useState(false);
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const topBarSentinelRef = useRef<HTMLDivElement | null>(null);
  const [topBarH, setTopBarH] = useState(0);

  useEffect(() => {
    if (topBarRef.current) setTopBarH(topBarRef.current.getBoundingClientRect().height);
    const s = topBarSentinelRef.current;
    if (!s) return;
    const io = new IntersectionObserver(([entry]) => setIsTopBarStuck(!entry.isIntersecting), {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    });
    io.observe(s);
    return () => io.disconnect();
  }, []);

  /* =========================================================
     SMART STICKY SIDEBAR (fixed con límites del contenedor)
     ========================================================= */
  const boundsRef = useRef<HTMLDivElement | null>(null);
  const sidebarColRef = useRef<HTMLElement | null>(null);
  const sidebarPanelRef = useRef<HTMLDivElement | null>(null);
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});

  const getTopOffset = () => {
    const extra = isTopBarStuck ? topBarH : 0;
    return stickyTop + extra + 12;
  };

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 1024) {
        setSidebarStyle({});
        return;
      }
      const boundsEl = boundsRef.current;
      const colEl = sidebarColRef.current;
      const panelEl = sidebarPanelRef.current;
      if (!boundsEl || !colEl || !panelEl) return;

      const topOffset = getTopOffset();

      const boundsRect = boundsEl.getBoundingClientRect();
      const colRect = colEl.getBoundingClientRect();

      const boundsTop = window.scrollY + boundsRect.top;
      const boundsBottom = boundsTop + boundsEl.offsetHeight;

      const colTop = window.scrollY + colRect.top;
      const colLeft = colRect.left;
      const colWidth = colRect.width;

      const panelHeight = panelEl.offsetHeight;

      const viewportTop = window.scrollY + topOffset;
      const desiredBottom = viewportTop + panelHeight;

      if (viewportTop <= boundsTop) {
        setSidebarStyle({
          position: "absolute",
          top: boundsTop - colTop,
          left: 0,
          width: "100%",
        });
        return;
      }

      if (desiredBottom >= boundsBottom) {
        setSidebarStyle({
          position: "absolute",
          top: boundsBottom - colTop - panelHeight,
          left: 0,
          width: "100%",
        });
        return;
      }

      setSidebarStyle({
        position: "fixed",
        top: topOffset,
        left: colLeft,
        width: colWidth,
      });
    };

    const ro1 = new ResizeObserver(update);
    const ro2 = new ResizeObserver(update);

    if (boundsRef.current) ro1.observe(boundsRef.current);
    if (sidebarColRef.current) ro2.observe(sidebarColRef.current);

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro1.disconnect();
      ro2.disconnect();
    };
  }, [isTopBarStuck, topBarH, stickyTop]);

  /* ===== Evitar saltos al cambiar filtros (desktop) ===== */
  const withStableScroll = (fn: () => void) => {
    if (typeof window === "undefined" || window.innerWidth < 1024) {
      fn();
      return;
    }
    const anchor = sidebarPanelRef.current;
    const prevTop = anchor ? anchor.getBoundingClientRect().top : null;

    fn();

    requestAnimationFrame(() => {
      const nextTop = anchor ? anchor.getBoundingClientRect().top : null;
      if (prevTop != null && nextTop != null) {
        const delta = nextTop - prevTop;
        if (delta !== 0) window.scrollBy(0, delta);
      }
    });
  };

  /* ===== Shared actions (con estabilidad de scroll) ===== */
  const clearAll = () =>
    withStableScroll(() => setSelectedFilters(new Set()));

  const removeOne = (key: string) =>
    withStableScroll(() =>
      setSelectedFilters((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      })
    );

  /* ===== Mobile sheet actions ===== */
  const sheetOpen = () => {
    setMobileTempSelection(new Set(selectedFilters));
    setMobileSheetOpen(true);
    document.body.style.overflow = "hidden";
  };
  const sheetClose = () => {
    setMobileSheetOpen(false);
    document.body.style.overflow = "auto";
  };
  const sheetApply = () =>
    withStableScroll(() => {
      setSelectedFilters(new Set(mobileTempSelection));
      sheetClose();
    });
  const sheetClear = () => setMobileTempSelection(new Set());
  const sheetToggle = (field: string, value: string) => {
    const key = `${field}::${value}`;
    setMobileTempSelection((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  /* ===== Desktop toggle ===== */
  const desktopToggle = (field: string, value: string) => {
    const key = `${field}::${value}`;
    withStableScroll(() => {
      setSelectedFilters((prev) => {
        const next = new Set(prev);
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }
        return next;
      });
    });
  };
  const isSelected = (field: string, value: string) =>
    selectedFilters.has(`${field}::${value}`);

  /* ===== Fetch projects (cache -> server) ===== */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        try {
          const snapshotCache = await getDocsFromCache(collection(db, "projects"));
          if (!snapshotCache.empty) {
            setProjects(snapshotCache.docs.map((d) => ({ id: d.id, ...d.data() })));
            setLoading(false);
          }
        } catch {
          /* no cache */
        }
        const snapshotServer = await getDocsFromServer(collection(db, "projects"));
        setProjects(snapshotServer.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error("Error loading projects:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  /* ===== Selected by field (canonical) ===== */
  const selectedByField = useMemo(() => {
    const map: Record<string, string[]> = {};
    Object.values(filterConfig).forEach(({ field }) => {
      const arr = [...selectedFilters]
        .filter((k) => k.startsWith(`${field}::`))
        .map((k) => k.split("::")[1])
        .map((v) => toCanonical(field, v));
      if (arr.length) map[field] = arr;
    });
    return map;
  }, [selectedFilters]);

  /* ===== Filtering ===== */
  const filteredProjects = useMemo(() => {
    if (Object.keys(selectedByField).length === 0) return projects;
    return projects.filter((project) => {
      for (const [field, selectedOptions] of Object.entries(selectedByField)) {
        const projectValues = getCanonicalValues(project, field);
        if (!setsEqual(projectValues, selectedOptions)) return false;
      }
      return true;
    });
  }, [projects, selectedByField]);

  /* ===== Images preload + progressive reveal ===== */
  const getCoverImage = (p: any): string | undefined => {
    const imgs = Array.isArray(p.images) ? p.images : [];
    return imgs[0] || p.imageUrl;
  };
  const [loadedCovers, setLoadedCovers] = useState<Record<string, boolean>>({});
  useEffect(() => {
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

  const contiguousReadyProjects = useMemo(() => {
    const res: any[] = [];
    for (let i = 0; i < filteredProjects.length; i++) {
      const p = filteredProjects[i];
      if (loadedCovers[p.id]) res.push(p);
      else break;
    }
    return res;
  }, [filteredProjects, loadedCovers]);

  /* ===== Infinite scroll ===== */
  const computeBatch = () => (window.innerWidth >= 1024 ? 6 : 4);
  const [batchSize, setBatchSize] = useState<number>(computeBatch());
  const [visibleCount, setVisibleCount] = useState<number>(batchSize);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasUserScrolled, setHasUserScrolled] = useState<boolean>(false);
  useEffect(() => {
    const onScroll = () => {
      if (!hasUserScrolled && window.scrollY > 20) setHasUserScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasUserScrolled]);

  const inFlightRef = useRef(false);
  const visibleRef = useRef(visibleCount);
  const totalReadyRef = useRef(contiguousReadyProjects.length);
  const batchRef = useRef(batchSize);
  useEffect(() => { visibleRef.current = visibleCount; }, [visibleCount]);
  useEffect(() => { totalReadyRef.current = contiguousReadyProjects.length; }, [contiguousReadyProjects.length]);
  useEffect(() => { batchRef.current = batchSize; }, [batchSize]);

  useEffect(() => {
    const onResize = () => {
      const nextBatch = computeBatch();
      setBatchSize(nextBatch);
      setVisibleCount(nextBatch);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setVisibleCount(() => Math.min(batchSize, contiguousReadyProjects.length || batchSize));
    setIsLoadingMore(false);
    inFlightRef.current = false;
  }, [batchSize, contiguousReadyProjects]);

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

  const sentinelRef = useRef<HTMLDivElement | null>(null);
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
          (window.innerWidth >= 1024 || hasUserScrolled);
        if (entry.isIntersecting && canLoadMore) {
          inFlightRef.current = true;
          setIsLoadingMore(true);
          const next = Math.min(visibleRef.current + batchRef.current, totalReadyRef.current);
          setVisibleCount(next);
          setTimeout(() => {
            setIsLoadingMore(false);
            inFlightRef.current = false;
          }, 250);
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, hasUserScrolled]);

  /* ===== UI helpers ===== */
  const listVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
  };
  const activeFilterLabels = useMemo(() => {
    if (selectedFilters.size === 0) return [];
    return [...selectedFilters].map((k) => k.split("::")[1]);
  }, [selectedFilters]);
  const activeFilterChips = [...selectedFilters];

  const resultsMinStyle: React.CSSProperties = { minHeight: `${RESULTS_MIN_VH}vh` };

  /* ==========================
     DESPLEGABLES (desktop)
  =========================== */
  const allGroupTitles = Object.keys(filterConfig);
  // Por defecto: todos cerrados para que entren todas las cabeceras sin scroll
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const toggleGroup = (title: string) =>
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  const expandAll = () => setOpenGroups(new Set(allGroupTitles));
  const collapseAll = () => setOpenGroups(new Set());

  /* ==========================
     RENDER
  =========================== */
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

        <h2 className="text-4xl font-bold text-center text-black/90 mt-10">Our Projects</h2>
        <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mx-auto rounded-full"></div>

        {activeFilterLabels.length > 0 && (
          <div className="mt-4 px-6 text-center hidden lg:block">
            <h3 className="text-base font-semibold text-gray-700">Showing projects filtered by:</h3>
            <p className="mt-1 text-sm text-gray-600">{activeFilterLabels.join(" · ")}</p>
          </div>
        )}

        {/* Top bar (fixed on scroll) */}
        <div ref={topBarSentinelRef} aria-hidden />
        {isTopBarStuck && <div style={{ height: topBarH }} aria-hidden />}
        <div
          ref={topBarRef}
          className={`w-full ${isTopBarStuck ? "fixed inset-x-0" : "relative"} z-40 bg-white/90 backdrop-blur border-b border-gray-200`}
          style={{
            top: isTopBarStuck ? 0 : undefined,
            transform: isTopBarStuck ? `translateY(${stickyTop}px)` : "none",
            transition: "transform 480ms ease, background-color 300ms ease, box-shadow 300ms ease",
          }}
        >
          <div className="px-4 py-2 flex items-center gap-3 overflow-x-auto no-scrollbar max-w-[1350px] mx-auto">
            {/* Mobile open button (hidden on desktop) */}
            <button
              onClick={sheetOpen}
              className="flex lg:hidden items-center gap-2 bg-[#0d4754] text-white px-3 py-1.5 rounded-full text-sm whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="Open filters"
            >
              <FiFilter className="text-base" />
              Filters
            </button>

            {/* Active chips */}
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

        {/* ======= MAIN LAYOUT (bounds) ======= */}
        <div
          ref={boundsRef}
          className="w-full max-w-[1400px] px-6 py-10 flex flex-col lg:flex-row gap-10"
        >
          {/* 🔶 SIDEBAR DESKTOP */}
          <aside
            ref={sidebarColRef}
            className="hidden lg:block w-[300px] shrink-0 relative"
            aria-label="Filters"
          >
            {/* panel que cambia entre absolute/fixed */}
            <div ref={sidebarPanelRef} style={sidebarStyle}>
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  <div className="flex items-center gap-3">
                    <button onClick={expandAll} className="text-sm text-[#0d4754] underline">Expand all</button>
                    <button onClick={collapseAll} className="text-sm text-[#0d4754] underline">Collapse all</button>
                    {selectedFilters.size > 0 && (
                      <button onClick={clearAll} className="text-sm text-[#0d4754] underline">
                        Clear all
                      </button>
                    )}
                  </div>
                </div>

                {/* Sin scroll interno en desktop; acordeón por grupo */}
                <div className="space-y-3">
                  {Object.entries(filterConfig).map(([groupTitle, { field, options }]) => {
                    const count = [...selectedFilters].filter((k) => k.startsWith(`${field}::`)).length;
                    const isOpen = openGroups.has(groupTitle);
                    return (
                      <div key={groupTitle} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleGroup(groupTitle)}
                          className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 cursor-pointer"
                          aria-expanded={isOpen}
                          aria-controls={`panel-${field}`}
                        >
                          <span className="font-medium text-gray-900">{groupTitle}</span>
                          <span className="flex items-center gap-2">
                            <span className="text-xs font-medium rounded-full px-2 py-0.5 bg-white border border-gray-200 text-gray-600">
                              {count} Selected
                            </span>
                            <FiChevronDown
                              className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            />
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`panel-${field}`}
                              key={`panel-${field}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                              <div className="px-3 py-3">
                                <div className="flex flex-wrap gap-2">
                                  {options.map((option) => {
                                    const active = isSelected(field, option);
                                    return (
                                      <button
                                        key={`${field}::${option}`}
                                        onClick={() => desktopToggle(field, option)}
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
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* 🔷 RESULTADOS */}
          <section className="flex-1" aria-label="Project catalog results">
            {loading ? (
              <div className="w-full flex justify-center items-center" style={resultsMinStyle}>
                <div className="h-10 w-10 rounded-full border-2 border-gray-300 border-t-gray-700 animate-spin" />
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="w-full flex flex-col items-center justify-center" style={resultsMinStyle}>
                <div className="w-full max-w={[720] + 'px'} border border-dashed border-gray-300 rounded-2xl p-8 text-center bg-white/70">
                  <h3 className="text-lg font-semibold text-gray-800">No projects match your filters.</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Try removing some filters or resetting all.
                  </p>
                  <button
                    onClick={clearAll}
                    className="mt-4 px-4 py-2 rounded-full bg-[#0d4754] text-white text-sm font-medium cursor-pointer"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            ) : (() => {
              const showSkeletons =
                !loading && displayedProjects.length === 0 && filteredProjects.length > 0;
              const skeletonCount = batchSize;

              if (showSkeletons) {
                return (
                  <div
                    className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center"
                    style={resultsMinStyle}
                  >
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
                );
              }

              return (
                <>
                  <motion.div
                    variants={listVariants}
                    initial="hidden"
                    animate="show"
                    className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center"
                    style={resultsMinStyle}
                  >
                    <AnimatePresence>
                      {displayedProjects.map((project) => (
                        <motion.div key={project.id} variants={itemVariants} layout className="w-full">
                          <ProjectCard project={project} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  <div className="flex justify-center items-center mt-6 min-h-6">
                    {visibleCount < contiguousReadyProjects.length && (
                      <div
                        className={`h-8 w-8 rounded-full border-2 border-gray-300 border-t-gray-700 animate-spin ${
                          isLoadingMore ? "opacity-100" : "opacity-0"
                        } transition-opacity duration-200`}
                        aria-label="Loading more projects"
                      />
                    )}
                  </div>

                  <div ref={sentinelRef} className="h-1 w-full" aria-hidden />
                </>
              );
            })()}
          </section>
        </div>
      </div>

      {/* ===== Bottom Sheet (mobile) ===== */}
      <AnimatePresence>
        {mobileSheetOpen && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[90] bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={sheetClose}
            />
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
                <button onClick={sheetClose} aria-label="Close filters" className="p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <FiX size={20} />
                </button>
              </div>

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
                                  active ? "bg-[#0d4754] text-white border-[#0d4754]" : "bg-white text-gray-800 border-gray-300"
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

              <div className="sticky bottom-0 bg-white border-t px-5 py-3 flex items-center gap-3">
                <button onClick={sheetClear} className="flex-1 border border-gray-300 text-gray-800 rounded-full py-2 font-medium cursor-pointer">
                  Clear
                </button>
                <button onClick={sheetApply} className="flex-1 bg-[#0d4754] text-white rounded-full py-2 font-semibold cursor-pointer">
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
