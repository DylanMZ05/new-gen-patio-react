import React from "react";
import { Project } from "./CatalogoCard";

type Props = {
  project: Project;
};

const ProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <div className="max-w-md w-full">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-64 object-cover"
      />
      <div className="pt-3">
        <h2 className="uppercase font-semibold text-xl text-gray-800 mb-2">
          {project.title}
        </h2>
        <ul className="text-sm text-gray-700 space-y-1">
          <li><span className="font-semibold">Stain:</span> {project.stain}</li>
          <li><span className="font-semibold">Size:</span> {project.size}</li>
          <li><span className="font-semibold">Rafter Tail:</span> {project.rafterTail}</li>
          <li><span className="font-semibold">Knee Brace:</span> {project.kneeBrace}</li>
          <li><span className="font-semibold">Timber Size:</span> {project.timberSize}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectCard;
