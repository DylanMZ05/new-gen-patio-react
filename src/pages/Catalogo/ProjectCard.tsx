import React, { useEffect, useMemo, useRef, useState } from "react";
import { Project } from "./CatalogoCard";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  project: Project;
};

const AUTO_SLIDE_MS = 7000;

const ProjectCard: React.FC<Props> = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);         // modal abierto
  const [currentIndex, setCurrentIndex] = useState(0); // índice dentro del modal
  const [thumbIndex, setThumbIndex] = useState(0);     // índice del slide en la card

  const [hovering, setHovering] = useState(false);     // pausa si hover en card
  const [inView, setInView] = useState(true);          // pausa si fuera de viewport
  const [pageVisible, setPageVisible] = useState(true);// pausa si pestaña oculta
  const [coverLoaded, setCoverLoaded] = useState(false);

  // 👉 Gate global: solo empezamos cuando el contenedor diga "todos listos"
  const [slidesStart, setSlidesStart] = useState(false);

  // Normaliza lista de imágenes
  const images = useMemo<string[]>(
    () =>
      Array.isArray(project.images) && project.images.length > 0
        ? project.images.filter(Boolean)
        : project.imageUrl
        ? [project.imageUrl]
        : [],
    [project.images, project.imageUrl]
  );

  // -------- Slideshow en la CARD (no en el modal) --------
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Observa visibilidad de la card en viewport
  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? true),
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // Observa visibilidad de la pestaña
  useEffect(() => {
    const onVis = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Escucha el evento global que dispara el contenedor cuando TODAS las cards visibles ya cargaron
  useEffect(() => {
    const onStart = () => setSlidesStart(true);
    window.addEventListener("ngp:slides-start", onStart as EventListener);
    return () => window.removeEventListener("ngp:slides-start", onStart as EventListener);
  }, []);

  // Fallback opcional: si el evento nunca llegara por algún motivo, arrancar a los 6s
  useEffect(() => {
    const id = setTimeout(() => setSlidesStart((v) => v || true), 6000);
    return () => clearTimeout(id);
  }, []);

  // Auto-rotación (sincronizada): solo si hay múltiples imágenes, la card está visible,
  // no hay hover, la pestaña está visible, el modal está cerrado, ya cargó la portada
  // y el contenedor dio la señal global.
  useEffect(() => {
    if (images.length < 2) return;
    if (!inView || hovering || !pageVisible || isOpen || !coverLoaded || !slidesStart) return;

    const id = setInterval(() => {
      setThumbIndex((prev) => (prev + 1) % images.length);
    }, AUTO_SLIDE_MS);

    return () => clearInterval(id);
  }, [images.length, inView, hovering, pageVisible, isOpen, coverLoaded, slidesStart]);

  // Si cambian las imágenes, resetea índices
  useEffect(() => {
    setThumbIndex(0);
    setCurrentIndex(0);
  }, [images.map(String).join("|")]);

  // -------- Modal handlers --------
  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentThumbSrc = images[thumbIndex] || "/placeholder.jpg";

  // Variantes de animación: fade + sutil Ken Burns alternando dirección según índice
  const enterScale = thumbIndex % 2 === 0 ? 1.04 : 1.02;
  const exitScale  = thumbIndex % 2 === 0 ? 1.01 : 1.03;
  const enterX = thumbIndex % 2 === 0 ? -8 : 8;  // px sutiles
  const exitX  = thumbIndex % 2 === 0 ? 6 : -6;

  return (
    <>
      <div
        ref={cardRef}
        className="max-w-md w-full bg-white rounded shadow hover:shadow-lg transition overflow-hidden"
      >
        <div
          className="relative w-full h-64 overflow-hidden cursor-pointer"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onClick={() => handleOpen(thumbIndex)} // abre modal en el frame actual
        >
          {/* Fade + Ken Burns suave entre imágenes en la card */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={currentThumbSrc}
              src={currentThumbSrc}
              alt={project.title}
              className="w-full h-64 object-cover will-change-transform"
              initial={{ opacity: 0.0, scale: enterScale, x: enterX }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0.0, scale: exitScale, x: exitX }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              draggable={false}
              loading="lazy"
              onLoad={() => setCoverLoaded(true)}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/placeholder.jpg";
                setCoverLoaded(true);
              }}
            />
          </AnimatePresence>

          {/* Dots solo si hay múltiples imágenes */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 px-2 py-1 rounded-full bg-black/30 backdrop-blur-sm">
              {images.map((_, i) => (
                <span
                  key={`dot-${i}`}
                  className={`h-1.5 w-1.5 rounded-full ${
                    i === thumbIndex ? "bg-white" : "bg-white/60"
                  }`}
                  aria-hidden
                />
              ))}
            </div>
          )}
        </div>

        <div className="pt-3 px-3 pb-4">
          <h2 className="uppercase font-semibold text-xl text-gray-800 mb-2">
            {project.title}
          </h2>
          <ul className="text-sm text-gray-700 space-y-1">
            {project.projectType && (
              <li>
                <span className="font-semibold">Project Type:</span>{" "}
                {project.projectType}
              </li>
            )}
            {project.stain && (
              <li>
                <span className="font-semibold">Stain:</span> {project.stain}
              </li>
            )}
            {project.size && (
              <li>
                <span className="font-semibold">Size:</span> {project.size}
              </li>
            )}
            {project.structureColor && (
              <li>
                <span className="font-semibold">Structure Color:</span>{" "}
                {project.structureColor}
              </li>
            )}
            {project.colorsPanels && (
              <li>
                <span className="font-semibold">Colors Roofing Panels:</span>{" "}
                {project.colorsPanels}
              </li>
            )}
            {project.more && (
              <li>
                <span className="font-semibold">More:</span> {project.more}
              </li>
            )}
            {project.rafterTail && (
              <li>
                <span className="font-semibold">Rafter Tail:</span>{" "}
                {project.rafterTail}
              </li>
            )}
            {project.kneeBrace && (
              <li>
                <span className="font-semibold">Knee Brace:</span>{" "}
                {project.kneeBrace}
              </li>
            )}
            {project.timberSize && (
              <li>
                <span className="font-semibold">Timber Size:</span>{" "}
                {project.timberSize}
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Popup Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
          onClick={handleClose}
        >
          <div
            className="relative max-w-3xl w-full mx-4"
            onClick={(e) => e.stopPropagation()} // evita cerrar al click interno
          >
            {/* Botón cerrar */}
            <button
              className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full p-2 hover:bg-red-600 transition z-50 cursor-pointer"
              onClick={handleClose}
            >
              <X size={24} />
            </button>

            {/* Imagen del modal */}
            <img
              src={images[currentIndex]}
              alt={`Imagen ${currentIndex + 1}`}
              className="w-full max-h-[80vh] object-contain rounded shadow"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/placeholder.jpg";
              }}
            />

            {/* Flechas de navegación */}
            {images.length > 1 && (
              <>
                <button
                  onClick={showPrev}
                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-60 text-white rounded-full p-2 hover:bg-gray-700 transition cursor-pointer"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={showNext}
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-60 text-white rounded-full p-2 hover:bg-gray-700 transition cursor-pointer"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
