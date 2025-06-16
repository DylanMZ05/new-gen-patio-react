import React from "react";

interface ImageTextSectionProps {
  title: string;
  text: string;
  imageUrl: string;
  imagePosition: "left" | "right";
  stepLabel?: string;
  imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  children?: React.ReactNode;
}

const ImageTextSection: React.FC<ImageTextSectionProps> = ({
  stepLabel,
  title = "Default Title",
  text,
  imageUrl,
  imagePosition = "right",
  children, // <<<<--- AGREGA ESTO AQUÍ EN LA DESESTRUCTURACIÓN
}) => {
  const sectionId = `section-title-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <article
      className={`flex flex-col ${imagePosition === "left" ? "sm:flex-row-reverse" : "sm:flex-row"} 
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
        <h3 id={sectionId} className="text-3xl font-bold text-black/90">
          {title}
        </h3>
        <div className="w-24 h-[3px] bg-[#0d4754] my-3 rounded-full"></div>
        <p className="text-xl text-gray-700">{text}</p>
      </div>

      {/* Imagen */}
      <figure className="sm:w-1/2 px-5">
        {children ? (
          children
        ) : (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="rounded-lg shadow-md w-150 object-cover aspect-[3/2]"
            onError={(e) => (e.currentTarget.src = "/assets/images/default-image.webp")}
          />
        )}
      </figure>
    </article>
  );
};

export default ImageTextSection;