import React from "react";

interface ImageTextSectionProps {
  title: string;
  text: string;
  imageUrl: string;
  imagePosition: "left" | "right";
  stepLabel?: string;
  imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

const ImageTextSection: React.FC<ImageTextSectionProps> = ({
  stepLabel,
  title = "Default Title",
  text,
  imageUrl,
  imagePosition = "right",
}) => {
  const sectionId = `section-title-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <article
      className={`flex flex-col  ${imagePosition === "left" ? "sm:flex-row-reverse" : "sm:flex-row"} 
        max-w-[1000px] gap-5 mt-10`}
      aria-labelledby={sectionId}
    >
      {/* Contenido de Texto */}
      <div className="flex flex-col items-center text-center mx-auto sm:mx-0 sm:text-start sm:items-start sm:w-1/2 sm:mt-3 px-5">
        {stepLabel && (
          <span className="text-lg font-semibold text-gray-500 uppercase mb-1">
            {stepLabel}
          </span>
        )}
        <h2 id={sectionId} className="text-3xl font-bold text-black/90">
          {title}
        </h2>
        <div className="w-24 h-[3px] bg-[#0d4754] my-3 rounded-full"></div>
        <p className="text-xl text-gray-700">{text}</p>
      </div>

      {/* Imagen */}
      <figure className="sm:w-1/2 px-5">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="rounded-lg shadow-md w-full object-cover aspect-video"
          onError={(e) => (e.currentTarget.src = "/assets/images/default-image.webp")} // Imagen por defecto en caso de error
        />
      </figure>
    </article>
  );
};

export default ImageTextSection;
