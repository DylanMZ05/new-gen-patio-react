import React from "react";
import { Project } from "./AdminDashboard";

interface Props {
  project: Project;
  onEdit: () => void;
}

const ProjectCard: React.FC<Props> = ({ project, onEdit }) => {
  // addons llega como CSV ("TV Walls,Fire Pit,...")
  const addonsPretty = project.addons
    ? project.addons.split(",").map(a => a.trim()).filter(Boolean).join(", ")
    : "";

  return (
    <div className="bg-white shadow rounded p-4">
      <img
        src={
          project.images && project.images.length > 0
            ? project.images[0]
            : project.imageUrl || "/placeholder.jpg"
        }
        alt={project.title}
        className="w-full h-48 object-cover rounded mb-4"
      />

      <h2 className="text-lg font-semibold">{project.title}</h2>

      <ul className="text-sm text-gray-700 mt-2 space-y-1">
        {project.projectType && (
          <li><strong>Project Type:</strong> {project.projectType}</li>
        )}
        {project.stain && (
          <li><strong>Stain:</strong> {project.stain}</li>
        )}
        {project.size && (
          <li><strong>Size:</strong> {project.size}</li>
        )}
        {project.structureColor && (
          <li><strong>Structure Color:</strong> {project.structureColor}</li>
        )}
        {project.colorsPanels && (
          <li><strong>Colors Roofing Panels:</strong> {project.colorsPanels}</li>
        )}
        {project.more && (
          <li><strong>More:</strong> {project.more}</li>
        )}
        {project.rafterTail && (
          <li><strong>Rafter Tail:</strong> {project.rafterTail}</li>
        )}
        {project.kneeBrace && (
          <li><strong>Knee Brace:</strong> {project.kneeBrace}</li>
        )}
        {project.timberSize && (
          <li><strong>Timber Size:</strong> {project.timberSize}</li>
        )}

        {addonsPretty && (
          <li><strong>Addons:</strong> {addonsPretty}</li>
        )}
      </ul>

      <button
        onClick={onEdit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full cursor-pointer"
      >
        Editar
      </button>
    </div>
  );
};

export default ProjectCard;
