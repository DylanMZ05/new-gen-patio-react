import React, { useState } from "react";
import { Project } from "./CatalogoCard";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  project: Project;
};

const ProjectCard: React.FC<Props> = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images =
    project.images && project.images.length > 0
      ? project.images
      : project.imageUrl
      ? [project.imageUrl]
      : [];

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

  return (
    <>
      <div className="max-w-md w-full bg-white rounded shadow hover:shadow-lg transition overflow-hidden">
        <img
          src={images[0] || "/placeholder.jpg"}
          alt={project.title}
          className="w-full h-64 object-cover cursor-pointer"
          onClick={() => handleOpen(0)}
        />
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
                <span className="font-semibold">Colors Panels:</span>{" "}
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
            onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer click dentro
          >
            {/* Botón cerrar */}
            <button
              className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full p-2 hover:bg-red-600 transition z-50 cursor-pointer"
              onClick={handleClose}
            >
              <X size={24} />
            </button>

            {/* Imagen */}
            <img
              src={images[currentIndex]}
              alt={`Imagen ${currentIndex + 1}`}
              className="w-full max-h-[80vh] object-contain rounded shadow"
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
