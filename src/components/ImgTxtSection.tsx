import React from "react";

type ImageTextSectionProps = {
  stepLabel?: string; // Nuevo prop opcional para el subtítulo (ej. "Step 1:")
  title: string;
  text: string;
  imageUrl: string;
  imagePosition?: "left" | "right";
};

const ImageTextSection: React.FC<ImageTextSectionProps> = ({
  stepLabel,
  title,
  text,
  imageUrl,
  imagePosition = "right",
}) => {
  return (
    <section
      className={`flex flex-col ${imagePosition === "left" ? "sm:flex-row-reverse" : "sm:flex-row"} max-w-[1000px] items-start gap-5`}
    >
      <div className="flex flex-col items-center text-center mx-auto sm:mx-0 sm:text-start sm:items-start sm:w-1/2 sm:mt-3 px-5">
        {stepLabel && (
          <span className="text-lg font-semibold text-gray-500 uppercase mb-1">
            {stepLabel}
          </span>
        )}
        <h3 className="text-3xl font-bold text-black/90">{title}</h3>
        <div className="w-24 h-[3px] background-skyblue my-3 rounded-full"></div>
        <p className="text-xl text-gray-700">{text}</p>
      </div>
      <div className="sm:w-1/2 px-5">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-lg shadow-md h-65 w-full object-cover aspect-[3/1]"
        />
      </div>
    </section>
  );
};

export default ImageTextSection;