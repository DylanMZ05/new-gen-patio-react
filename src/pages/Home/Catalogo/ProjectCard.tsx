import React from "react";
import { Project } from "./CatalogoCard";

type Props = {
  project: Project;
};

const ProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <div className="max-w-md w-full bg-white rounded shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-64 object-cover"
      />
      <div className="pt-3 px-3 pb-4">
        <h2 className="uppercase font-semibold text-xl text-gray-800 mb-2">
          {project.title}
        </h2>
        <ul className="text-sm text-gray-700 space-y-1">
          {project.projectType && (
            <li>
              <span className="font-semibold">Project Type:</span> {project.projectType}
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
              <span className="font-semibold">Structure Color:</span> {project.structureColor}
            </li>
          )}
          {project.colorsPanels && (
            <li>
              <span className="font-semibold">Colors Panels:</span> {project.colorsPanels}
            </li>
          )}
          {project.more && (
            <li>
              <span className="font-semibold">More:</span> {project.more}
            </li>
          )}
          {project.rafterTail && (
            <li>
              <span className="font-semibold">Rafter Tail:</span> {project.rafterTail}
            </li>
          )}
          {project.kneeBrace && (
            <li>
              <span className="font-semibold">Knee Brace:</span> {project.kneeBrace}
            </li>
          )}
          {project.timberSize && (
            <li>
              <span className="font-semibold">Timber Size:</span> {project.timberSize}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProjectCard;
